import { ArrowRight } from "lucide-react";

/**
 * About — "Why Serenity Mind?" section
 * Layout: split header (title left, description right)
 * + 3-card grid (1 featured wide card + 2 smaller cards)
 * Matches the USD Bloom reference layout
 */

export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 px-16 py-20">

        {/* Top row — split header: title left, description right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Left: heading + CTA pill */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
              Why Serenity Mind?
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-border text-[13px] font-medium text-text-primary hover:bg-gray-50 transition-colors w-fit"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right: description paragraph */}
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[440px]">
            We combine clinical expertise with genuine compassion to deliver
            psychiatric care that fits your life — not the other way around.
          </p>
        </div>

        {/* Bottom row — 3-card grid: 1 featured (wide) + 2 standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Featured card — spans 2 columns */}
          <div className="lg:col-span-2 rounded-2xl bg-bg-card p-8 flex flex-col justify-end min-h-[280px]">
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
              Evidence-based treatment
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-[360px]">
              Every treatment plan is grounded in peer-reviewed research and
              adapted to your unique history, goals, and lifestyle.
            </p>
          </div>

          {/* Card 2 — standard size */}
          <div className="rounded-2xl bg-bg-card p-8 flex flex-col justify-end min-h-[280px]">
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
              Flexible scheduling
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              In-person and virtual appointments available evenings and weekends.
              No long wait times.
            </p>
          </div>

          {/* Card 3 — standard size */}
          <div className="rounded-2xl bg-bg-card p-8 flex flex-col justify-end min-h-[280px]">
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
              Whole-person care
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We treat the full picture — medication, therapy, and lifestyle —
              so progress lasts beyond the session.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
