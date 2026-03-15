"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Accolades — slim logo strip showing affiliations & credentials.
 * Dark background with white logos at reduced opacity.
 * Placed after DoctorBio for immediate trust reinforcement.
 */

/* Logo data — path + alt text for each affiliation */
const logos = [
  { src: "/logos/ncrp.svg", alt: "NCRP Training" },
  { src: "/logos/baylor.svg", alt: "Baylor College of Medicine" },
  { src: "/logos/kaiser.svg", alt: "Kaiser Permanente" },
  { src: "/logos/ucla-health.svg", alt: "UCLA Health" },
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
        {/* Logo row — evenly spaced, dark logos at 30% opacity */}
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="scroll-reveal-child opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {/* Each logo sized to ~120px wide, height auto */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
