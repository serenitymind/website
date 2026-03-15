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
    <section id="process" className="relative overflow-hidden">

      {/* Video background — pre-baked ping-pong (forward+reversed) for smooth looping */}
      <video
        src="/flowers-pingpong.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col gap-12 px-16 py-20 relative z-10">
        {/* Section header — white text over video */}
        <div className="flex flex-col items-center gap-5 max-w-[600px] mx-auto text-center mb-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-[13px] font-semibold text-white/80 tracking-[2px]">
              HOW IT WORKS
            </span>
            <div className="h-px w-16 bg-white/40" />
          </div>
          <h2 className="font-heading text-[40px] font-bold text-white tracking-tight leading-[1.1]">
            Your Path to Better Mental Health
          </h2>
        </div>

        {/* 4-step grid — dark glass cards over flower video */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="scroll-reveal-child flex flex-col gap-4 p-7 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10"
            >
              {/* Step number — lilac */}
              <span className="font-heading text-[48px] font-bold text-[#C4B5FD] leading-none">
                {step.number}
              </span>
              <h3 className="font-heading text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
