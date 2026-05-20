"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Fees — practice fee schedule shown as a row-based price list.
 * Sits between Process and FAQ so visitors see pricing before objections.
 * Anchor #fees lets the FAQ "How much do appointments cost?" answer link here.
 */

/* Fee schedule — service name, duration, and price.
   Order roughly: initial evals → ongoing care → specialty sessions. */
const fees = [
  {
    service: "Initial Psychiatric Evaluation (Adult)",
    duration: "60–90 min",
    fee: "$650–850",
  },
  {
    service: "Child & Adolescent Comprehensive Evaluation",
    duration: "120 min — completed over 2 sessions",
    fee: "$1,300",
  },
  {
    service: "Follow-Up Med Management",
    duration: "30 min",
    fee: "$300",
  },
  {
    service: "Follow-Up Med Management",
    duration: "45 min",
    fee: "$425",
  },
  {
    service: "Extended Follow-Up — Psychotherapy + Med Management",
    duration: "60 min",
    fee: "$550",
  },
  {
    service: "Family Therapy / Parent Guidance (complex cases)",
    duration: "60 min",
    fee: "$550",
  },
];

export default function Fees() {
  const ref = useScrollReveal();

  return (
    <section id="fees" className="bg-white scroll-mt-[88px] md:scroll-mt-0">
      <div
        ref={ref}
        className="scroll-reveal max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-12 px-5 md:px-16 py-12 md:py-20"
      >
        {/* Section header — matches the centered "tag + h2" pattern from Process */}
        <div className="scroll-reveal-child flex flex-col items-center gap-5 max-w-[600px] mx-auto text-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-text-primary/30" />
            <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
              PRACTICE FEES
            </span>
            <div className="h-px w-16 bg-text-primary/30" />
          </div>
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Transparent Fee Schedule
          </h2>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed">
            Private-pay practice. Superbills available upon request for
            patients seeking out-of-network reimbursement.
          </p>
        </div>

        {/* Fee list — row-based layout (service+duration on the left, fee on the right).
            Capped at max-w-[800px] so it doesn't sprawl across the full grid width. */}
        <div className="scroll-reveal-child w-full max-w-[800px] mx-auto">
          {fees.map((f, i) => (
            <div
              key={`${f.service}-${f.duration}`}
              className={`flex items-center justify-between gap-6 py-5 ${
                i < fees.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Left: service name + duration in muted small text */}
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-[15px] md:text-[16px] font-medium text-text-primary leading-snug">
                  {f.service}
                </p>
                <p className="text-[13px] md:text-[14px] text-text-muted">
                  {f.duration}
                </p>
              </div>

              {/* Right: fee in the heading font + bold for emphasis */}
              <p className="font-heading text-[18px] md:text-[20px] font-bold text-text-primary whitespace-nowrap">
                {f.fee}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
