"use client";

import { useEffect, useState } from "react";
import { Brain, Menu, X } from "lucide-react";
import Link from "next/link";

/**
 * Header — sticky navigation bar (monochrome theme)
 * Logo + nav links + pill-shaped black CTA
 * Active link highlights based on which section is in view.
 */

/* Navigation links — match actual page sections (and their on-page order) */
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Meet the Doctor", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "How It Works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* Section IDs to observe (excludes "Home" which is the fallback) */
const sectionIds = navLinks
  .filter((l) => l.href !== "#")
  .map((l) => l.href.slice(1));

export default function Header() {
  /* Track which nav link is active — defaults to Home */
  const [activeHref, setActiveHref] = useState("#");
  /* Mobile menu open/closed — drawer slides down below the header */
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    /* Scroll-position based scrollspy.
       For each scroll event, walk sectionIds in DOM order and pick the last
       one whose top has scrolled past the trigger line (just below the
       fixed banner+header). Simpler and more reliable than IntersectionObserver
       for this case — IO had a "dead zone" between sections taller than the
       active rootMargin which left the wrong link highlighted. */
    const TRIGGER_Y = 120; /* px from viewport top — sits just below banner+header */

    const updateActive = () => {
      /* At the very top of the page → Home */
      if (window.scrollY < 100) {
        setActiveHref("#");
        return;
      }

      /* Find the last section whose top has crossed the trigger line.
         Sections are read in DOM order, so the latest match is the section
         the user has just scrolled into. */
      let activeId: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= TRIGGER_Y) {
          activeId = id;
        } else {
          break;
        }
      }

      setActiveHref(activeId ? `#${activeId}` : "#");
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive(); /* set initial state on mount */

    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <>
    {/* Announcement banner — thin strip above the nav */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-text-primary text-white text-center text-[11px] py-1.5 font-medium tracking-wide">
      Now accepting new patients — <a href="#contact" className="underline underline-offset-2 hover:text-white/80 transition-colors">book a free consultation</a>
    </div>

    {/* Fixed header — sits below the announcement banner */}
    <header className="fixed top-[28px] left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 py-2.5">
        {/* Logo — brain icon + name */}
        <Link href="/" className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-text-primary" />
          <span className="font-heading text-[15px] font-semibold text-text-primary">
            Serenity Mind
          </span>
          {/* Subtitle — visible on all sizes (was hidden below sm) */}
          <span className="text-[10px] sm:text-[11px] text-text-muted whitespace-nowrap">
            by Eugenia Chen, M.D.
          </span>
        </Link>

        {/* Navigation links — active link shown in bold black */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[11px] transition-colors ${
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
          className="hidden md:inline-flex items-center px-5 py-1.5 rounded-full bg-text-primary text-white text-[11px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 hover-bounce"
        >
          Book Appointment
        </a>

        {/* Mobile hamburger button — visible below md breakpoint */}
        {/* Toggles the slide-down drawer below the header */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-text-primary hover:bg-bg-secondary transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer — slides down when hamburger toggled */}
      {/* Hidden at md+ since the inline nav handles desktop */}
      <div
        className={`md:hidden overflow-hidden border-t border-border transition-[max-height] duration-200 ease-out ${
          mobileOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3 gap-1 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-3 rounded-md text-[15px] transition-colors ${
                activeHref === link.href
                  ? "font-medium text-text-primary bg-bg-secondary"
                  : "text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              {link.label}
            </a>
          ))}
          {/* Pill CTA inside drawer — full width on mobile */}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-text-primary text-white text-[14px] font-medium"
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </header>
    </>
  );
}
