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
    <section id="process" className="bg-white relative overflow-hidden">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col gap-12 px-16 py-20 relative z-10">
        {/* Section header — centered */}
        <div className="flex flex-col items-center gap-5 max-w-[600px] mx-auto text-center mb-4">
          {/* Tag with left/right lines — matches Expertise section style */}
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-text-muted/30" />
            <span className="text-[13px] font-semibold text-text-muted tracking-[2px]">
              HOW IT WORKS
            </span>
            <div className="h-px w-16 bg-text-muted/30" />
          </div>
          <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Your Path to Better Mental Health
          </h2>
        </div>

        {/* 4-step grid — white glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="scroll-reveal-child flex flex-col gap-4 p-7 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#C4B5FD]/20 shadow-[0_4px_24px_rgba(196,181,253,0.1)]"
            >
              {/* Step number — lilac */}
              <span className="font-heading text-[48px] font-bold text-[#C4B5FD] leading-none">
                {step.number}
              </span>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Space gradient — stacked lilac arcs, reaching into cards */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] z-0">

        {/* Arc 1 — outermost wide curve */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[450px] w-[160%] h-[650px] rounded-[50%]"
          style={{
            boxShadow: "0 -15px 50px rgba(196,181,253,0.1)",
            border: "1px solid rgba(196,181,253,0.08)",
          }}
        />

        {/* Arc 2 — mid curve */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[380px] w-[130%] h-[550px] rounded-[50%]"
          style={{
            boxShadow: "0 -18px 45px rgba(139,92,246,0.15)",
            border: "1px solid rgba(196,181,253,0.15)",
          }}
        />

        {/* Arc 3 — primary curve, most visible */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[320px] w-[105%] h-[480px] rounded-[50%]"
          style={{
            boxShadow: "0 -20px 40px rgba(139,92,246,0.22), 0 -6px 15px rgba(196,181,253,0.3)",
            border: "1px solid rgba(196,181,253,0.25)",
          }}
        />

        {/* Arc 4 — inner curve, narrower + taller for rounder shape */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[370px] w-[55%] h-[520px] rounded-[50%]"
          style={{
            boxShadow: "0 -12px 30px rgba(167,139,250,0.18)",
            border: "1px solid rgba(196,181,253,0.18)",
          }}
        />

        {/* Arc 5 — innermost core, most circular */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[330px] w-[35%] h-[480px] rounded-[50%]"
          style={{
            boxShadow: "0 -8px 20px rgba(139,92,246,0.15)",
            border: "1px solid rgba(196,181,253,0.12)",
          }}
        />
      </div>
    </section>
  );
}
