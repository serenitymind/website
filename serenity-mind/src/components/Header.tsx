"use client";

import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import Link from "next/link";

/**
 * Header — sticky navigation bar (monochrome theme)
 * Logo + nav links + pill-shaped black CTA
 * Active link highlights based on which section is in view.
 */

/* Navigation links — match actual page sections */
const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "How It Works", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/* Section IDs to observe (excludes "Home" which is the fallback) */
const sectionIds = navLinks
  .filter((l) => l.href !== "#")
  .map((l) => l.href.slice(1));

export default function Header() {
  /* Track which nav link is active — defaults to Home */
  const [activeHref, setActiveHref] = useState("#");

  useEffect(() => {
    /* Observe each section — when it enters the viewport, mark it active */
    const observer = new IntersectionObserver(
      (entries) => {
        /* Find the first entry that is intersecting (top-down priority) */
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
            return;
          }
        }
      },
      /* rootMargin: offset for fixed header (~48px), trigger at 30% visible */
      { rootMargin: "-48px 0px -60% 0px", threshold: 0 },
    );

    /* Observe all section elements */
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    /* Fallback: if scrolled to top, set Home active */
    const handleScroll = () => {
      if (window.scrollY < 100) setActiveHref("#");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

        {/* Navigation links — active link shown in bold black */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13px] transition-colors ${
                activeHref === link.href
                  ? "font-medium text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA button — pill-shaped black */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-1.5 rounded-full bg-text-primary text-white text-[12px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 hover-bounce"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
