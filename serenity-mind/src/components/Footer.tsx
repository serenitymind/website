import { Brain } from "lucide-react";

/**
 * Footer — minimal site footer.
 * Logo, nav links, contact info, legal text.
 */

/* Footer nav columns */
const footerLinks = {
  services: [
    { label: "Psychiatric Evaluation", href: "#services" },
    { label: "Medication Management", href: "#services" },
    { label: "Individual Therapy", href: "#services" },
    { label: "Telepsychiatry", href: "#services" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-[1440px] mx-auto px-16 py-16">
        {/* Top row — logo + nav columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3 lg:w-[300px]">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-white" />
              <span className="font-heading text-[15px] font-semibold">
                Serenity Mind
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Compassionate, evidence-based psychiatric care for adults and
              adolescents in Beverly Hills and beyond.
            </p>
          </div>

          {/* Services column */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold text-white/40 tracking-[2px]">
              SERVICES
            </span>
            {footerLinks.services.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold text-white/40 tracking-[2px]">
              COMPANY
            </span>
            {footerLinks.company.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold text-white/40 tracking-[2px]">
              CONTACT
            </span>
            <span className="text-sm text-white/60">(424) 555-0192</span>
            <span className="text-sm text-white/60">hello@serenitymind.com</span>
            <span className="text-sm text-white/60">
              9461 Charleville Blvd
              <br />
              Beverly Hills, CA 90212
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom row — copyright + legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Serenity Mind Psychiatry. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              HIPAA Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
