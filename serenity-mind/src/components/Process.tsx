"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Process — "How It Works" section.
 * 4-step horizontal flow showing the patient journey.
 * Reduces anxiety about "what happens when I call."
 */

/* Steps data — the patient journey from first call to ongoing care */
const steps = [
  {
    number: "01",
    title: "Book a Consultation",
    description:
      "Schedule a free, confidential 15-minute call to discuss your needs and see if we're the right fit.",
  },
  {
    number: "02",
    title: "Comprehensive Evaluation",
    description:
      "An in-depth diagnostic assessment covering your mental health history, symptoms, and goals.",
  },
  {
    number: "03",
    title: "Personalized Treatment",
    description:
      "A tailored plan combining therapy, medication, or both — designed around your life and preferences.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    description:
      "Regular follow-ups to track progress, adjust treatment, and ensure lasting results.",
  },
];

export default function Process() {
  const ref = useScrollReveal();

  return (
    <section id="process" className="relative overflow-hidden scroll-mt-[88px] md:scroll-mt-0">

      {/* Video background — pre-baked ping-pong (forward+reversed) for smooth looping */}
      <video
        src="/flowers-pingpong.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto relative px-5 md:px-16 pt-12 md:pt-16 pb-16 md:pb-24 z-10">

        {/* Tag — same centered "tag + horizontal rules" pattern as Conditions/Fees.
            Uses white on this section since the background is a multi-toned
            flower video — black gets swallowed by the lavender hues. */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-20 md:mb-40">
          <div className="h-px w-16 bg-white/40" />
          <span className="text-[11px] font-semibold text-white tracking-[2px]">
            HOW IT WORKS
          </span>
          <div className="h-px w-16 bg-white/40" />
        </div>

        {/* Massive white h1 — sits behind the cards, gets frosted by their
            backdrop-blur. Same clamp() sizing as Conditions/Fees/FAQ to
            keep the visual rhythm uniform. White was chosen over black so
            the text stays legible across the multi-colored flower video
            and isn't swallowed by the dark glass cards. */}
        <h1 className="absolute left-1/2 -translate-x-1/2 top-[60px] md:top-[100px] font-heading text-[clamp(72px,16vw,260px)] font-bold whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal text-white drop-shadow-[0_2px_24px_rgba(255,255,255,0.25)]">
          Journey
        </h1>

        {/* 4-step grid — dark glass cards over flower video + giant h1 */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="scroll-reveal-child flex flex-col gap-4 p-5 md:p-7 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10"
            >
              {/* Step number — lilac */}
              <span className="font-heading text-[48px] font-bold text-[#C4B5FD] leading-none">
                {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-white/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
