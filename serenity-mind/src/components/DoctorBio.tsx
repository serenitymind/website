"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * DoctorBio — doctor photo + credentials section.
 * Split layout: image left, bio content right.
 */

/* Credentials shown as badges below the bio */
const credentials = [
  "Board Certified Psychiatrist",
  "Adult & Adolescent Care",
  "TFCBT Certified",
  "BCBA Certified",
  "Telehealth Available",
];

export default function DoctorBio() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="bg-bg-secondary">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 px-16 pt-20 pb-8 items-center">

        {/* Left — doctor headshot */}
        <div className="w-full lg:w-[400px] shrink-0 scroll-reveal-child">
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative">
            <Image
              src="/doctor-headshot.jpeg"
              alt="Dr. Eugenia Chen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />
          </div>
        </div>

        {/* Right — bio content */}
        <div className="flex flex-col gap-6 scroll-reveal-child">
          <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
            MEET YOUR DOCTOR
          </span>
          <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Dr. Eugenia Chen, M.D.
          </h2>
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[520px]">
            Dr. Chen is a double board-certified psychiatrist specializing
            in adult and adolescent mental health. With over 15 years of
            clinical experience, she takes a comprehensive, patient-centered
            approach — combining evidence-based treatments with genuine
            empathy to help patients achieve lasting wellness.
          </p>
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[520px]">
            She completed her residency at Johns Hopkins and fellowship at
            UCLA, bringing world-class training to every patient interaction.
            Dr. Chen believes that mental health care should be
            accessible, stigma-free, and tailored to the individual.
          </p>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-3 mt-2">
            {credentials.map((cred) => (
              <span
                key={cred}
                className="px-4 py-2 rounded-full bg-text-primary text-[13px] font-medium text-white hover:-translate-y-1 transition-all duration-200 cursor-default"
              >
                {cred}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
