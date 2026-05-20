"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Fees — practice fee schedule.
 * Styled to match the Expertise section: massive lilac "Fees" h1 in the
 * background, small gray tag at the top, and the price list inside a
 * single backdrop-blur container that overlaps the giant text.
 */

/* Fee schedule — service name, duration, and price */
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
  /* Ref for the giant h1 — we shift its gradient background-position on scroll
     so the lilac sheen drifts as the user moves. Same effect as Conditions. */
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      if (h1Ref.current) {
        const rect = h1Ref.current.getBoundingClientRect();
        const pos = ((window.innerHeight - rect.top) * 0.5) % 300;
        h1Ref.current.style.backgroundPosition = `${pos}% 0%`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="fees" className="bg-bg-secondary overflow-hidden scroll-mt-[88px] md:scroll-mt-0">
      <div
        ref={revealRef}
        className="scroll-reveal max-w-[1440px] mx-auto relative px-5 md:px-16 pt-12 md:pt-16 pb-16 md:pb-24"
      >
        {/* Tag — small gray uppercase label with horizontal rules */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-20 md:mb-40">
          <div className="h-px w-16 bg-text-muted/30" />
          <span className="text-[13px] font-semibold text-text-muted tracking-[2px]">
            PRACTICE FEES
          </span>
          <div className="h-px w-16 bg-text-muted/30" />
        </div>

        {/* Massive lilac h1 — sits behind the pricing container.
            Same clamp() sizing + scroll-driven gradient shift as Conditions. */}
        <h1
          ref={h1Ref}
          style={{
            backgroundImage: "linear-gradient(90deg, #DDD6FE, #C4B5FD, #DDD6FE)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="absolute left-1/2 -translate-x-1/2 top-[60px] md:top-[100px] font-heading text-[clamp(72px,16vw,260px)] font-bold whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal bg-clip-text text-transparent"
        >
          Fees
        </h1>

        {/* Pricing container — z-[2] over the h1, with backdrop-blur so the
            lilac text "frosts" through. Capped width keeps it centered. */}
        <div className="relative z-[2] max-w-[800px] mx-auto rounded-2xl bg-white/50 backdrop-blur-md border border-[#C4B5FD]/30 p-6 md:p-10 scroll-reveal-child">
          {/* Subtitle caption — private-pay disclaimer */}
          <p className="text-[13px] md:text-[14px] text-text-muted mb-6 leading-relaxed">
            Private-pay practice. Superbills available upon request for
            patients seeking out-of-network reimbursement.
          </p>

          {/* Pricing rows — service+duration on the left, fee on the right.
              Each row has a group hover effect:
                - bottom border brightens to a saturated lilac
                - an inset upward-glowing shadow emerges from the bottom edge
                - the service title bounces gently */}
          <div className="flex flex-col">
            {fees.map((f, i) => (
              <div
                key={`${f.service}-${f.duration}`}
                className={`group flex items-center justify-between gap-6 py-4 md:py-5 px-2 -mx-2 rounded-lg transition-all duration-300 hover:border-[#A78BFA]/70 hover:shadow-[inset_0_-16px_24px_-12px_rgba(167,139,250,0.35)] ${
                  i < fees.length - 1 ? "border-b border-[#C4B5FD]/30" : ""
                }`}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-[15px] md:text-[16px] font-medium text-text-primary leading-snug group-hover:animate-[row-title-bounce_0.6s_ease-in-out_infinite]">
                    {f.service}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-text-muted">
                    {f.duration}
                  </p>
                </div>
                <p className="font-heading text-[18px] md:text-[20px] font-bold text-text-primary whitespace-nowrap">
                  {f.fee}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
