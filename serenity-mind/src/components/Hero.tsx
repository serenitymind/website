import { ShieldCheck, Phone } from "lucide-react";

/**
 * Hero — main landing section
 * Badge, headline, subheadline, dual CTAs, and hero image placeholder
 */
export default function Hero() {
  return (
    <section className="bg-bg-primary">
      <div className="max-w-[1440px] mx-auto flex items-center gap-16 px-16 py-20">
        {/* Text content — left side */}
        <div className="flex-1 flex flex-col gap-7">
          {/* Trust badge */}
          <div className="flex items-center gap-1.5 bg-accent-soft px-4 py-1.5 rounded-full w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">
              Board-Certified Psychiatrists
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[52px] font-bold text-text-primary leading-[1.1] tracking-tight">
            Your Mental Health Deserves Expert Care
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-text-secondary leading-relaxed">
            Compassionate, evidence-based psychiatric care for adults and
            adolescents. We help you find clarity, balance, and lasting
            well-being.
          </p>

          {/* Dual CTAs */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 rounded-md bg-accent text-text-on-dark text-base font-medium hover:bg-accent-hover transition-colors"
            >
              Schedule Consultation
            </a>
            <a
              href="tel:5551234567"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md border border-accent text-accent text-base font-medium hover:bg-accent-soft transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call (555) 123-4567
            </a>
          </div>
        </div>

        {/* Hero image placeholder — right side */}
        <div className="hidden lg:block w-[560px] h-[440px] rounded-xl bg-bg-secondary overflow-hidden">
          {/* Replace with actual image */}
          <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
            Hero Image Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
