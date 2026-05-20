import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Receives the Contact form submission and forwards it to Dr. Chen
 * by email via Resend.
 *
 * Env vars required (set in Vercel project settings):
 *   - RESEND_API_KEY     — from https://resend.com/api-keys
 *   - CONTACT_TO_EMAIL   — destination address (e.g. hello@serenitymindmd.com)
 *   - CONTACT_FROM_EMAIL — verified sender (e.g. "Serenity Mind <noreply@serenitymindmd.com>")
 *                          falls back to "onboarding@resend.dev" for testing.
 *
 * IMPORTANT — this endpoint is intentionally minimal. We do NOT collect
 * clinical/PHI data here; the form only accepts name/email/phone and an
 * optional non-clinical note. Keep it that way unless you upgrade to a
 * BAA-signed Resend Pro plan.
 */

/* Tiny, non-strict email regex — enough to reject obvious garbage.
   Real validation happens when we try to reply. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* NOTE: we intentionally do NOT instantiate Resend at module scope.
   Next.js's build step ("Collecting page data") imports this module,
   and `new Resend(undefined)` throws if RESEND_API_KEY is missing,
   which would crash the entire production build on Vercel.
   Instead we construct it lazily inside the request handler, AFTER
   the env-var check below has confirmed the key is present. */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      contactMethod = "",
      message = "",
      /* Honeypot — real users never fill this hidden field.
         If it's non-empty, silently accept + drop (no email sent). */
      website = "",
    } = body ?? {};

    if (website) {
      /* Bot caught. Pretend success so the bot doesn't retry differently. */
      return NextResponse.json({ ok: true });
    }

    /* Basic required-field checks */
    const fName = String(firstName).trim();
    const mail = String(email).trim();
    const phn = String(phone).trim();
    if (!fName || !mail || !phn) {
      return NextResponse.json(
        { error: "First name, email, and phone are required." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(mail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    /* Length caps — defends against pasted garbage */
    if (fName.length > 100 || String(lastName).length > 100 || phn.length > 40) {
      return NextResponse.json({ error: "Field too long." }, { status: 400 });
    }
    const note = String(message).slice(0, 1000); /* hard cap any message */

    /* Resolve env config */
    const to = process.env.CONTACT_TO_EMAIL;
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Serenity Mind <onboarding@resend.dev>"; /* dev fallback */

    if (!to || !process.env.RESEND_API_KEY) {
      console.error("/api/contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL env var");
      return NextResponse.json(
        { error: "Server is not yet configured to send mail." },
        { status: 500 },
      );
    }

    /* Lazy-construct the Resend client at request time — see note at top of file.
       At this point we know RESEND_API_KEY is present, so the constructor is safe. */
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fullName = `${fName} ${String(lastName).trim()}`.trim();
    const subject = `New consultation inquiry — ${fullName}`;

    /* Normalize the contact-method value — only accept one of the
       three known choices, otherwise leave it blank in the email. */
    const allowedMethods = ["phone", "email", "both"];
    const method = allowedMethods.includes(String(contactMethod))
      ? String(contactMethod)
      : "";

    /* Plain text body — no HTML rendering needed. Replies go to the
       visitor's email address so Dr. Chen can just hit "reply". */
    const text = [
      "New consultation inquiry from the Serenity Mind website",
      "",
      `Name:               ${fullName}`,
      `Email:              ${mail}`,
      `Phone:              ${phn}`,
      `Preferred contact:  ${method || "(not specified)"}`,
      "",
      note ? `Note:\n${note}` : "(no note provided)",
      "",
      "—",
      "Reply directly to this email to reach the visitor.",
    ].join("\n");

    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: mail,
      subject,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Couldn't send right now. Please try again or call the number on the page." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again later." },
      { status: 500 },
    );
  }
}
