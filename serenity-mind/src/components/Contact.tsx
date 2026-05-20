"use client";

import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Contact — final CTA section with contact form + info.
 * Split layout: form left, contact details right.
 * "Free Confidential Consultation" as the hook.
 */

/* Contact details shown on the right side */
const contactInfo = [
  { icon: Phone, label: "(424) 226-2323" },
  { icon: Mail, label: "hello@serenitymindmd.com" },
  { icon: MapPin, label: "11340 W Olympic Blvd # 203, Los Angeles, CA 90064" },
  { icon: Clock, label: "I offer structured weekday availability, including select evening appointments." },
];

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="bg-white scroll-mt-[88px] md:scroll-mt-0">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 px-5 md:px-16 py-12 md:py-20">

        {/* Left — form */}
        <div className="flex-1 flex flex-col gap-8 scroll-reveal-child">
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
              GET IN TOUCH
            </span>
            <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
              Book Your Free Consultation
            </h2>
            <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed">
              Complete the form below to request a brief consultation and
              discuss whether the practice may be a good fit for your needs.
            </p>
          </div>

          {/* Contact form — static for now, no backend */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name row — first + last side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors"
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors"
            />

            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors"
            />

            {/* Preferred contact method — segmented radio pills.
                Uses native radio inputs (hidden via sr-only) so no React
                state is needed; the label styles itself via peer-checked. */}
            <div className="flex flex-col gap-2">
              <span className="text-[13px] text-text-secondary">
                Preferred method of contact
              </span>
              <div className="grid grid-cols-3 gap-2">
                {["Phone", "Email", "Both"].map((option, i) => (
                  <label
                    key={option}
                    className="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contact-method"
                      value={option.toLowerCase()}
                      defaultChecked={i === 0}
                      className="peer sr-only"
                    />
                    <span className="block w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-secondary text-center transition-colors peer-checked:border-text-primary peer-checked:bg-text-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-text-primary">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Briefly describe what you're looking for help with..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-[15px] text-text-primary placeholder:text-text-muted outline-none focus:border-text-primary transition-colors resize-none"
            />

            {/* Submit button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-text-primary text-white text-[15px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 w-full md:w-fit hover-bounce"
            >
              Request Consultation
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-text-muted">
              Your information is protected by HIPAA-compliant encryption.
            </p>
          </form>
        </div>

        {/* Right — contact details */}
        <div className="lg:w-[360px] shrink-0 flex flex-col gap-8 scroll-reveal-child">
          {/* Contact info cards */}
          <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl bg-bg-card">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              Contact Information
            </h3>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-text-muted mt-0.5 shrink-0" />
                  <span className="text-[15px] text-text-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick note about consultations */}
          <div className="p-6 md:p-8 rounded-2xl bg-text-primary text-white">
            <h3 className="font-heading text-lg font-semibold mb-3">
              Free Confidential Consultation
            </h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              Not sure where to start? You can schedule a free 15-minute phone
              consultation to briefly discuss your needs and determine whether
              working together may be a good fit. There is no obligation to
              proceed with treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
