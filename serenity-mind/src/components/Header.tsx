"use client";

import { Brain } from "lucide-react";
import Link from "next/link";

/**
 * Header — sticky navigation bar (monochrome theme)
 * Logo + nav links + pill-shaped black CTA
 */

/* Navigation links for the top bar */
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    /* Fixed header — sits above the sticky scroll-stop hero */
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-8 py-2.5">
        {/* Logo — brain icon + name */}
        <Link href="/" className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-text-primary" />
          <span className="font-heading text-[15px] font-semibold text-text-primary">
            Serenity Mind
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13px] ${
                /* First link = active state in black */
                i === 0
                  ? "font-medium text-text-primary"
                  : "text-text-muted hover:text-text-primary transition-colors"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA button — pill-shaped black */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-1.5 rounded-full bg-text-primary text-white text-[12px] font-medium hover:bg-[#7C3AED] hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 hover-bounce"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
