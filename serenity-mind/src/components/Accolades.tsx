"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Accolades — slim logo strip showing affiliations & credentials.
 * Dark background with white logos at reduced opacity.
 * Placed after DoctorBio for immediate trust reinforcement.
 */

/* Affiliation logos — SVG files in /public/logos/ */
const logos = [
  { src: "/logos/baylor.svg", alt: "Baylor College of Medicine", badge: "Top 20", badgeClass: "absolute -bottom-5 right-4" },
  { src: "/logos/ucla-health.svg", alt: "UCLA Health", badge: "Top 5", badgeClass: "absolute -bottom-5 -right-3" },
  { src: "/logos/ncrp.svg", alt: "NCRP Training" },
  { src: "/logos/kaiser.svg", alt: "Kaiser Permanente" },
  { src: "/logos/psychology-today.svg", alt: "Psychology Today" },
];

/* Single logo cell — extracted so we can render it identically in
   both the mobile marquee and the desktop static row. */
type LogoData = (typeof logos)[number];
function LogoItem({ logo }: { logo: LogoData }) {
  return (
    <div className="relative flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300 shrink-0">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={40}
        className="h-8 md:h-10 w-auto"
      />
      {/* Ranking badge — award ribbon with text inside */}
      {"badge" in logo && logo.badge && (
        <svg width="24" height="40" viewBox="4 0 24 40" fill="none" className={logo.badgeClass || "absolute -bottom-1 -right-3"}>
          <circle cx="16" cy="14" r="12" fill="#FBBF24" />
          <circle cx="16" cy="14" r="10" fill="#F59E0B" />
          <circle cx="16" cy="14" r="8.5" fill="#FBBF24" />
          <path d="M10 24L6 38L12 32L16 38L20 32L26 38L22 24" fill="#DC2626" />
          <path d="M10 24L6 38L12 32L16 38L20 32L26 38L22 24" fill="#EF4444" opacity="0.8" />
          <text x="16" y="12" textAnchor="middle" fill="#92400E" fontSize="6" fontWeight="bold" fontFamily="system-ui">
            TOP
          </text>
          <text x="16" y="19" textAnchor="middle" fill="#92400E" fontSize="8" fontWeight="bold" fontFamily="system-ui">
            {logo.badge.replace("Top ", "")}
          </text>
        </svg>
      )}
    </div>
  );
}

export default function Accolades() {
  const ref = useScrollReveal();

  return (
    <section className="bg-bg-secondary">
      <div
        ref={ref}
        className="scroll-reveal max-w-[1440px] mx-auto px-5 md:px-16 py-6"
      >
        {/* Mobile — single-row infinite marquee */}
        {/* Logos rendered twice; the keyframe shifts the row -50% so the duplicate
            seamlessly takes over before the original scrolls off.
            py gives the gold "Top X" badges (which hang -bottom-5 past the logos)
            room to render without being clipped by the overflow-hidden. */}
        <div className="md:hidden overflow-hidden scroll-reveal-child py-6">
          <div className="flex items-center gap-x-10 w-max animate-accolades-marquee">
            {[...logos, ...logos].map((logo, i) => (
              <LogoItem key={`${logo.alt}-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* Desktop — static centered row (unchanged behavior) */}
        <div className="hidden md:flex items-center justify-center gap-12 flex-wrap">
          {logos.map((logo) => (
            <div key={logo.alt} className="scroll-reveal-child">
              <LogoItem logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
