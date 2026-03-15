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
      "Generalized anxiety, social anxiety, panic disorder, phobias.",
  },
  {
    title: "Mood Disorders",
    description:
      "Depression, bipolar disorder, mood dysregulation.",
  },
  {
    title: "Attention & Focus Disorders",
    description:
      "ADHD, executive function difficulties.",
  },
  {
    title: "Trauma & Stress-Related Disorders",
    description:
      "PTSD, acute stress, adjustment difficulties.",
  },
  {
    title: "Behavioral & Emotional Challenges in Children",
    description:
      "Irritability, aggression, defiance, school difficulties.",
  },
  {
    title: "Developmental & Neurodiverse Conditions",
    description:
      "Autism spectrum, learning differences, social communication challenges.",
  },
  {
    title: "Family & Parent Guidance Needs",
    description:
      "Parent support, family dynamics, relational challenges.",
  },
  {
    title: "Maternal & Infant Mental Health",
    description:
      "Perinatal depression, anxiety, bonding challenges.",
  },
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
    <section id="expertise" className="bg-bg-secondary overflow-hidden">
      <div ref={revealRef} className="scroll-reveal max-w-[1440px] mx-auto relative px-16 pt-16 pb-24">

        {/* Tag — above the h1 title with large gap */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-40">
          <div className="h-px w-16 bg-text-muted/30" />
          <span className="text-[13px] font-semibold text-text-muted tracking-[2px]">
            WHAT WE OFFER
          </span>
          <div className="h-px w-16 bg-text-muted/30" />
        </div>

        {/* Massive h1 — lilac gradient that shifts on scroll */}
        <h1
          ref={h1Ref}
          style={{
            backgroundImage: "linear-gradient(90deg, #DDD6FE, #C4B5FD, #DDD6FE)",
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%",
          }}
          className="absolute left-1/2 -translate-x-1/2 top-[100px] font-heading text-[clamp(140px,16vw,260px)] font-bold whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal bg-clip-text text-transparent"
        >
          Expertise
        </h1>

        {/* Services row — z-[2], first row of cards */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="scroll-reveal-child flex flex-col gap-3 p-7 rounded-2xl bg-white/40 backdrop-blur-sm border border-[#C4B5FD]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)] hover:border-[#A78BFA]/60 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Subsection divider — tag between services and conditions */}
        <div className="relative z-[3] flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-text-muted/20" />
          <span className="text-[13px] font-semibold text-text-muted tracking-[2px]">
            CONDITIONS WE TREAT
          </span>
          <div className="h-px flex-1 bg-text-muted/20" />
        </div>

        {/* Conditions rows — z-[2], rows 2-3 of cards */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((item) => (
            <div
              key={item.title}
              className="scroll-reveal-child flex flex-col gap-3 p-7 rounded-2xl bg-white/40 backdrop-blur-sm border border-[#C4B5FD]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)] hover:border-[#A78BFA]/60 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
