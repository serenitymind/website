"use client";

import { Brain } from "lucide-react";
import Link from "next/link";

/**
 * Header — sticky navigation bar (V2 white/purple theme)
 * Logo + nav links + pill-shaped purple CTA
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
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-16 py-5">
        {/* Logo — brain icon + name */}
        <Link href="/" className="flex items-center gap-2.5">
          <Brain className="w-[26px] h-[26px] text-accent" />
          <span className="font-heading text-xl font-semibold text-text-primary">
            Serenity Mind
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm ${
                /* First link = active state in purple */
                i === 0
                  ? "font-medium text-accent"
                  : "text-text-muted hover:text-text-secondary transition-colors"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA button — pill-shaped purple */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-7 py-3 rounded-full bg-accent text-text-on-dark text-[13px] font-medium hover:bg-accent-hover transition-colors"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
