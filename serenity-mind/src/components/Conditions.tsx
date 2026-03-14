"use client";

import { useEffect, useRef } from "react";

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
    title: "Anxiety & Panic",
    description:
      "Generalized anxiety, social anxiety, panic attacks, and phobias that interfere with daily life.",
  },
  {
    title: "Depression",
    description:
      "Persistent sadness, low motivation, and emotional numbness treated with therapy and medication.",
  },
  {
    title: "ADHD",
    description:
      "Attention and focus challenges in adults and adolescents — diagnosis, medication, and coping strategies.",
  },
  {
    title: "PTSD & Trauma",
    description:
      "Processing traumatic experiences through evidence-based approaches like EMDR and trauma-focused CBT.",
  },
  {
    title: "Bipolar Disorder",
    description:
      "Mood stabilization for manic and depressive episodes with ongoing medication management.",
  },
  {
    title: "OCD",
    description:
      "Breaking cycles of intrusive thoughts and compulsive behaviors with specialized treatment.",
  },
  {
    title: "Insomnia & Sleep",
    description:
      "Addressing sleep disturbances at their root — not just symptoms — for lasting improvement.",
  },
  {
    title: "Substance Use",
    description:
      "Compassionate support for addiction and dependency, including medication-assisted treatment.",
  },
];

export default function Conditions() {
  /* Ref for the h1 — we shift its gradient background-position on scroll */
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let rafId: number;
    /* Use rAF loop + getBoundingClientRect so it works even with scroll hijack */
    const tick = () => {
      if (h1Ref.current) {
        const rect = h1Ref.current.getBoundingClientRect();
        /* Map element's viewport position to gradient shift */
        const pos = ((window.innerHeight - rect.top) * 0.5) % 300;
        h1Ref.current.style.backgroundPosition = `${pos}% ${pos}%`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] to-[#141414] overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative px-16 pt-16 pb-24">

        {/* Tag — above the h1 title with large gap */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-40">
          <div className="h-px w-16 bg-[#C4B5FD]/30" />
          <span className="text-[13px] font-semibold text-[#C4B5FD] tracking-[2px]">
            WHAT WE OFFER
          </span>
          <div className="h-px w-16 bg-[#C4B5FD]/30" />
        </div>

        {/* Massive h1 — lilac gradient that shifts on scroll */}
        <h1
          ref={h1Ref}
          style={{
            backgroundImage: "linear-gradient(135deg, #A78BFA, #C4B5FD, #DDD6FE, #B4A0FB, #C4B5FD, #A78BFA, #D4CAFE)",
            backgroundSize: "300% 300%",
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
              className="flex flex-col gap-3 p-7 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(167,139,250,0.45),0_4px_14px_rgba(196,181,253,0.5),0_2px_5px_rgba(237,233,254,0.45)] hover:border-[#A78BFA]/25 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Subsection divider — tag between services and conditions */}
        <div className="relative z-[3] flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-[#C4B5FD]/20" />
          <span className="text-[11px] font-semibold text-[#C4B5FD] tracking-[2px]">
            CONDITIONS WE TREAT
          </span>
          <div className="h-px flex-1 bg-[#C4B5FD]/20" />
        </div>

        {/* Conditions rows — z-[2], rows 2-3 of cards */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 p-7 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(167,139,250,0.45),0_4px_14px_rgba(196,181,253,0.5),0_2px_5px_rgba(237,233,254,0.45)] hover:border-[#A78BFA]/25 hover:-translate-y-1"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
