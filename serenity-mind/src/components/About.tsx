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
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: heading + CTA pill */}
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
              Why Serenity Mind?
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-text-primary text-white text-[13px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 w-fit hover-bounce"
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

          {/* Featured card — spans 2 columns, looping video */}
          {/* Scale up ~10% to crop Veo watermark from bottom edge */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden min-h-[280px] relative">
            <video
              src="/patient-growth.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-110 origin-top"
            />
          </div>

          {/* Card 2 — standard size, dark lilac */}
          <div className="rounded-2xl bg-[#2D1F3D] p-8 flex flex-col justify-between min-h-[280px]">
            <h3 className="font-heading text-xl font-semibold text-white">
              Flexible scheduling
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              In-person and virtual appointments available evenings and weekends.
              No long wait times.
            </p>
          </div>

          {/* Card 3 — evidence-based, dark lilac */}
          <div className="rounded-2xl bg-[#2D1F3D] p-8 flex flex-col justify-between min-h-[280px]">
            <h3 className="font-heading text-xl font-semibold text-white">
              Evidence-based care
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Every plan is grounded in research and treats the full picture:
              medication, therapy, and lifestyle, adapted to your unique goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
