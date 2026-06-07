"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Expertise — unified dark glassmorphism section.
 * Merges services + conditions into one grid (3 rows of 4).
 * Massive "Expertise" h1 behind cards with backdrop-blur.
 * Tag label sits above the h1.
 * H1 uses a scroll-driven lilac gradient that shifts on scroll.
 */

/* Services — how we deliver care (first row) */
const services = [
  {
    title: "Psychiatric Evaluation",
    description:
      "Thorough diagnostic assessments to understand your mental health needs and develop a personalized treatment plan.",
  },
  {
    title: "Medication Management",
    description:
      "Careful prescribing and monitoring of psychiatric medications with regular follow-ups to optimize your treatment.",
  },
  {
    title: "Individual Therapy",
    description:
      "One-on-one sessions using CBT, DBT, and other proven approaches to help you navigate life's challenges.",
  },
  {
    title: "Telepsychiatry",
    description:
      "Convenient virtual appointments from the comfort of your home. Same quality care, accessible anywhere.",
  },
];

/* Conditions — what we treat (rows 2-3) */
const conditions = [
  {
    title: "Anxiety Disorders",
    description:
      "Generalized anxiety, social anxiety, panic disorder, phobias, and school-related anxiety.",
  },
  {
    title: "Mood Disorders",
    description:
      "Depression, bipolar disorder, irritability, and mood dysregulation.",
  },
  {
    title: "Attention & Executive Functioning",
    description:
      "ADHD, attention difficulties, executive functioning challenges, and emotional regulation concerns.",
  },
  {
    title: "Trauma & Stress-Related Disorders",
    description:
      "PTSD, acute stress, adjustment difficulties, and trauma-related symptoms.",
  },
  {
    title: "Child & Adolescent Behavioral Challenges",
    description:
      "Irritability, aggression, oppositional behaviors, school difficulties, and emotional dysregulation.",
  },
  {
    title: "Developmental & Neurodiverse Conditions",
    description:
      "Autism spectrum disorder, learning differences, and social communication challenges.",
  },
  {
    title: "Family Therapy & Parent Guidance",
    description:
      "Parent support, family dynamics, behavioral strategies, and caregiver guidance.",
  },
  {
    title: "Maternal & Infant Mental Health",
    description:
      "Perinatal depression and anxiety, postpartum adjustment, bonding challenges, and early parenthood support.",
  },
];

/* Practice pricing — intentionally surfaced via a subtle collapsible at the
   end of this section rather than its own section, so cost doesn't greet
   visitors up front and scare them off. */
const fees = [
  {
    service: "Initial Psychiatric Evaluation (Adult)",
    duration: "60–90 min",
    fee: "$650–850",
  },
  {
    service: "Child & Adolescent Comprehensive Evaluation",
    duration: "120 min — over 2 sessions",
    fee: "$1,300",
  },
  {
    service: "Follow-Up Medication Management",
    duration: "25 min",
    fee: "$300",
  },
  {
    service:
      "Extended Follow-Up Visit (Individual Therapy / Medication Management + Therapy)",
    duration: "50 min",
    fee: "$450",
  },
  { service: "Family Therapy / Parent Guidance", duration: "60 min", fee: "$550" },
];

export default function Conditions() {
  /* Ref for the h1 — we shift its gradient background-position on scroll */
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    let rafId: number;
    /* Use rAF loop + getBoundingClientRect so it works even with scroll hijack */
    const tick = () => {
      if (h1Ref.current) {
        const rect = h1Ref.current.getBoundingClientRect();
        /* Map element's viewport position to gradient shift */
        const pos = ((window.innerHeight - rect.top) * 0.5) % 300;
        /* Only shift X — keeps gradient purely horizontal */
        h1Ref.current.style.backgroundPosition = `${pos}% 0%`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="expertise" className="bg-bg-secondary overflow-hidden scroll-mt-[88px] md:scroll-mt-0">
      <div ref={revealRef} className="scroll-reveal max-w-[1440px] mx-auto relative px-5 md:px-16 pt-12 md:pt-16 pb-16 md:pb-24">

        {/* Tag — above the h1 title with large gap */}
        {/* mb shrinks on mobile so the absolute h1 doesn't crash into the cards */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-20 md:mb-40">
          <div className="h-px w-16 bg-text-muted/30" />
          <span className="text-[11px] font-semibold text-text-muted tracking-[2px]">
            WHAT WE OFFER
          </span>
          <div className="h-px w-16 bg-text-muted/30" />
        </div>

        {/* Massive h1 — lilac gradient that shifts on scroll */}
        {/* On mobile we sit it higher (top-[60px]) and shrink the min size so it doesn't overflow the viewport width */}
        <h1
          ref={h1Ref}
          style={{
            backgroundImage: "linear-gradient(90deg, #DDD6FE, #C4B5FD, #DDD6FE)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="absolute left-1/2 -translate-x-1/2 top-[60px] md:top-[100px] font-heading text-[clamp(72px,16vw,260px)] font-bold whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal bg-clip-text text-transparent"
        >
          Expertise
        </h1>

        {/* Services row — z-[2], first row of cards */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="scroll-reveal-child flex flex-col gap-3 p-5 md:p-7 rounded-2xl bg-white/50 backdrop-blur-md border border-[#C4B5FD]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)] hover:border-[#A78BFA]/60 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Subsection divider — tag between services and conditions */}
        <div className="relative z-[3] flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-text-muted/20" />
          <span className="text-[11px] font-semibold text-text-muted tracking-[2px]">
            CONDITIONS WE TREAT
          </span>
          <div className="h-px flex-1 bg-text-muted/20" />
        </div>

        {/* Conditions rows — z-[2], rows 2-3 of cards */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((item) => (
            <div
              key={item.title}
              className="scroll-reveal-child flex flex-col gap-3 p-5 md:p-7 rounded-2xl bg-white/50 backdrop-blur-md border border-[#C4B5FD]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)] hover:border-[#A78BFA]/60 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing — "price-anchor teaser" approach. A labeled PRICING divider
            with a visible "starting at $300" line gives visitors a gentle price
            anchor (softens sticker shock) while the full fee schedule stays one
            deliberate click away. */}
        <div className="relative z-[3] max-w-[640px] mx-auto mt-12 text-center">
          {/* Labeled divider — matches the "CONDITIONS WE TREAT" header rhythm */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 bg-text-muted/20" />
            <span className="text-[11px] font-semibold text-text-muted tracking-[2px]">
              PRICING
            </span>
            <div className="h-px flex-1 bg-text-muted/20" />
          </div>

          {/* Anchor line — surfaces one number without dumping the full list */}
          <p className="text-[13px] md:text-[14px] text-text-secondary">
            Follow-up sessions starting at{" "}
            <span className="font-heading font-semibold text-text-primary">
              $300
            </span>{" "}
            · private-pay practice
          </p>

          {/* Expander — subtle accent text link reveals the full fee schedule.
              Native <details> = no JS, full keyboard/screen-reader support. */}
          <details className="group mt-3">
            {/* Summary link — swaps label + rotates arrow when open */}
            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-fit mx-auto flex items-center gap-1.5 text-[12px] font-medium text-accent hover:underline underline-offset-4 select-none">
              <span className="group-open:hidden">View full fee schedule</span>
              <span className="hidden group-open:inline">
                Hide full fee schedule
              </span>
              {/* Chevron — rotates 180° when the dropdown is open */}
              <svg
                className="w-3 h-3 transition-transform duration-300 group-open:rotate-180"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>

            {/* Expanded panel — compact fee list inside a frosted card.
              Type is smaller/muted vs. the old standalone section to stay subtle. */}
          <div className="mt-5 rounded-2xl bg-white/50 backdrop-blur-md border border-[#C4B5FD]/30 p-5 md:p-7">
            {/* Private-pay disclaimer */}
            <p className="text-[11px] text-text-muted mb-4 leading-relaxed">
              Private-pay practice. Superbills available upon request for
              patients seeking out-of-network reimbursement.
            </p>
            <div className="flex flex-col">
              {fees.map((f, i) => (
                <div
                  key={f.service}
                  className={`flex items-center justify-between gap-4 py-2 ${
                    i < fees.length - 1 ? "border-b border-[#C4B5FD]/20" : ""
                  }`}
                >
                  {/* Service + duration on the left, muted */}
                  <p className="text-[11px] md:text-[12px] text-text-secondary leading-snug">
                    {f.service}
                    <span className="text-text-muted"> · {f.duration}</span>
                  </p>
                  {/* Fee on the right — small and understated */}
                  <p className="font-heading text-[13px] md:text-[14px] font-semibold text-text-primary whitespace-nowrap">
                    {f.fee}
                  </p>
                </div>
              ))}
            </div>
          </div>
          </details>
        </div>

      </div>
    </section>
  );
}
