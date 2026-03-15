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

export default function Accolades() {
  const ref = useScrollReveal();

  return (
    <section className="bg-bg-secondary">
      <div
        ref={ref}
        className="scroll-reveal max-w-[1440px] mx-auto px-16 py-6"
      >
        {/* Logo row — evenly spaced with hover effect */}
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="scroll-reveal-child relative flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {/* Affiliation logo */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              {/* Ranking badge — award ribbon with text inside */}
              {"badge" in logo && logo.badge && (
                <svg width="24" height="40" viewBox="4 0 24 40" fill="none" className={logo.badgeClass || "absolute -bottom-1 -right-3"}>
                  {/* Medal circle — gold gradient */}
                  <circle cx="16" cy="14" r="12" fill="#FBBF24" />
                  <circle cx="16" cy="14" r="10" fill="#F59E0B" />
                  <circle cx="16" cy="14" r="8.5" fill="#FBBF24" />
                  {/* Ribbon tails */}
                  <path d="M10 24L6 38L12 32L16 38L20 32L26 38L22 24" fill="#DC2626" />
                  <path d="M10 24L6 38L12 32L16 38L20 32L26 38L22 24" fill="#EF4444" opacity="0.8" />
                  {/* Text inside medal */}
                  <text x="16" y="12" textAnchor="middle" fill="#92400E" fontSize="6" fontWeight="bold" fontFamily="system-ui">
                    TOP
                  </text>
                  <text x="16" y="19" textAnchor="middle" fill="#92400E" fontSize="8" fontWeight="bold" fontFamily="system-ui">
                    {logo.badge.replace("Top ", "")}
                  </text>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
