"use client";

import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * About — "Why Serenity Mind?" section
 * Layout: split header (title left, description right)
 * + 3-card grid (1 featured wide card + 2 smaller cards)
 * Matches the USD Bloom reference layout
 */

export default function About() {
  const ref = useScrollReveal();

  return (
    <section className="bg-white">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-10 px-5 md:px-16 py-12 md:py-20">

        {/* Top row — split header: title left, description right */}
        {/* On mobile we want: heading → description → CTA (CTA last). */}
        {/* On desktop we keep the original two-column layout: (heading+CTA) left, description right. */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: heading + (desktop-only CTA inline beneath heading) */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
              Why Serenity Mind?
            </h2>
            {/* Desktop CTA — sits under the heading like before */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-text-primary text-white text-[13px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 w-fit hover-bounce"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right: description paragraph */}
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[440px]">
            I combine clinical expertise with compassionate care to provide
            personalized psychiatric treatment.
          </p>

          {/* Mobile-only CTA — appears at the bottom of the stack (after the description) */}
          <a
            href="#contact"
            className="md:hidden inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-text-primary text-white text-[13px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 w-fit hover-bounce"
          >
            Get started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom row — 3-card grid: 1 featured (wide) + 2 standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Featured card — spans 2 columns, looping video */}
          {/* Scale up ~10% to crop Veo watermark from bottom edge */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[280px] relative scroll-reveal-child">
            <img
              src="/child-interaction.jpeg"
              alt="Doctor interacting with child patient"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Card 2 — standard size, dark lilac gradient */}
          <div className="rounded-2xl bg-gradient-to-br from-[#4A3560] to-[#5E4480] p-6 md:p-8 flex flex-col gap-3 md:gap-0 md:justify-between min-h-0 md:min-h-[280px] scroll-reveal-child">
            <h3 className="font-heading text-xl font-semibold text-white">
              Flexible schedule & Evening slots
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Virtual appointments across California, including evening slots,
              with minimal wait times to start care when you need it.
            </p>
          </div>

          {/* Card 3 — evidence-based, dark lilac gradient */}
          <div className="rounded-2xl bg-gradient-to-br from-[#4A3560] to-[#5E4480] p-6 md:p-8 flex flex-col gap-3 md:gap-0 md:justify-between min-h-0 md:min-h-[280px] scroll-reveal-child">
            <h3 className="font-heading text-xl font-semibold text-white">
              Evidence-based, compassionate care
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Personalized treatment combining therapy, medication management,
              and family support, guided by the latest evidence-based practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
