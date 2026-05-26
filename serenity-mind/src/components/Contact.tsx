"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Contact — final CTA section with contact form + info.
 * Split layout: form left, contact details right.
 *
 * Form posts to /api/contact which forwards via Resend.
 *
 * IMPORTANT: this form intentionally does NOT collect clinical/PHI
 * details. Free Resend isn't BAA-signed, so PHI must not flow through
 * it. The note field placeholder explicitly steers users away from
 * sharing health details.
 */

/* Contact details shown on the right side */
const contactInfo = [
  { icon: Phone, label: "(424) 226-2323" },
  { icon: Mail, label: "hello@serenitymindmd.com" },
  { icon: MapPin, label: "11340 W Olympic Blvd # 203, Los Angeles, CA 90064" },
  { icon: Clock, label: "I offer structured weekday availability, including select evening appointments." },
];

/* Available preferred-contact-method choices */
const CONTACT_METHODS = ["Phone", "Email", "Both"] as const;

/* Form submit states — used to swap the UI after submit */
type SubmitState = "idle" | "submitting" | "success" | "error";

/* Initial form state — kept in one place so resetting is one statement */
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  referredBy: "", /* optional — provider name if referred by another clinician */
  contactMethod: "phone", /* default matches the i===0 selection */
  message: "",
  website: "", /* honeypot — must stay empty for real users */
};

export default function Contact() {
  const ref = useScrollReveal();

  /* Controlled form state — single object keeps the change handler simple */
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* Generic input handler — updates a single field by `name` */
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      setForm(initialForm); /* clear fields so success is unambiguous */
    } catch (err) {
      console.error("Contact submit failed:", err);
      setErrorMsg(
        "Couldn't reach the server. Please try again or call the number on the page.",
      );
      setState("error");
    }
  };

  /* Shared input class — keeps the existing visual style for all inputs */
  const inputCls =
    "w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors";

  return (
    <section id="contact" className="bg-white scroll-mt-[88px] md:scroll-mt-0">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 px-5 md:px-16 py-12 md:py-20">

        {/* Left — form */}
        <div className="flex-1 flex flex-col gap-8 scroll-reveal-child">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold text-text-primary tracking-[2px]">
              GET IN TOUCH
            </span>
            <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
              Book Your Free Consultation
            </h2>
            <p className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
              Complete the form below to request a brief consultation and
              discuss whether the practice may be a good fit for your needs.
            </p>
          </div>

          {/* SUCCESS STATE — replace the form once a submission goes through */}
          {state === "success" ? (
            <div className="flex flex-col gap-3 p-6 md:p-8 rounded-2xl bg-bg-card border border-border">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-text-primary shrink-0" />
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  Thanks — your request was sent.
                </h3>
              </div>
              <p className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
                Dr. Chen will follow up by phone or email within 1–2 business
                days. If you don&apos;t hear back, please call the number on
                the right.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="self-start text-[11px] font-medium text-text-primary underline underline-offset-2 hover:text-accent transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {/* Honeypot — visually hidden, real users skip it; bots fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={onChange}
                className="hidden"
                aria-hidden="true"
              />

              {/* Name row — first + last side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={onChange}
                  required
                  autoComplete="given-name"
                  className={inputCls}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={onChange}
                  autoComplete="family-name"
                  className={inputCls}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
                className={inputCls}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={onChange}
                required
                autoComplete="tel"
                className={inputCls}
              />

              {/* Optional referral field — name of the referring provider
                  if the visitor was referred. Helps Dr. Chen close the loop
                  with the referring clinician when relevant. */}
              <input
                type="text"
                name="referredBy"
                placeholder="Referred by (optional) — name of provider"
                value={form.referredBy}
                onChange={onChange}
                maxLength={120}
                className={inputCls}
              />

              <textarea
                name="message"
                placeholder="Optional — scheduling preferences or general questions."
                value={form.message}
                onChange={onChange}
                rows={4}
                maxLength={1000}
                className={`${inputCls} resize-none`}
              />

              {/* Preferred contact method — segmented radio pills. Controlled
                  so the value gets included in the submission payload.
                  Placed below the message so the form flows: who you are →
                  what you want to say → how to reach you. */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-text-secondary">
                  Preferred method of contact
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((option) => {
                    const value = option.toLowerCase();
                    return (
                      <label key={option} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={value}
                          checked={form.contactMethod === value}
                          onChange={onChange}
                          className="peer sr-only"
                        />
                        <span className="block w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-secondary text-center transition-colors peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-text-primary">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Footer disclaimer — replaces the prior misleading
                  "HIPAA-compliant encryption" line. Honest about what
                  this form is and isn't. Placed above the submit button
                  so users see the no-PHI guidance before sending. */}
              <p className="text-[11px] text-text-muted leading-relaxed">
                This form is for initial contact only. Please do not share
                specific clinical or health information here — we&apos;ll
                discuss those securely by phone during your free
                consultation.
              </p>

              {/* Submit button — disabled while submitting */}
              <button
                type="submit"
                disabled={state === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-text-primary text-white text-[15px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 w-full md:w-fit hover-bounce disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {state === "submitting" ? "Sending..." : "Request Consultation"}
                {state !== "submitting" && <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Error message — shown only when submit fails */}
              {state === "error" && errorMsg && (
                <p className="text-[11px] text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Right — contact details */}
        <div className="lg:w-[360px] shrink-0 flex flex-col gap-8 scroll-reveal-child">
          {/* Contact info cards */}
          <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl bg-bg-card">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Contact Information
            </h3>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                  <span className="text-[11px] md:text-[12px] text-text-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick note about consultations */}
          <div className="p-6 md:p-8 rounded-2xl bg-text-primary text-white">
            <h3 className="font-heading text-lg font-semibold mb-3">
              Free Confidential Consultation
            </h3>
            <p className="text-[11px] md:text-[12px] text-white/70 leading-relaxed">
              Not sure where to start? You can schedule a free 15-minute phone
              consultation to briefly discuss your needs and determine whether
              working together may be a good fit. There is no obligation to
              proceed with treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
