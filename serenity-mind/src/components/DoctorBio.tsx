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
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Dr. Eugenia Chen is a board-certified adult psychiatrist who completed
            her medical degree at Baylor College of Medicine, followed by psychiatry
            residency training with Kaiser Permanente. She went on to complete
            specialized fellowship training in Child and Adolescent Psychiatry at
            the University of California, Los Angeles (UCLA), where she also served
            as Fellowship Wellness Chief. Dr. Chen has additional focus in parent
            and infant mental health, and her clinical work includes children,
            adolescents, young adults, and adults.
          </p>
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Dr. Eugenia Chen takes a thoughtful and collaborative approach to care,
            integrating evidence-based treatment, psychotherapy, and an understanding
            of each patient&apos;s environment and life experiences to support meaningful
            and lasting mental wellness. Her work has been shaped by research,
            community advocacy, and trauma-informed care, with multiple publications
            and national presentations focused on youth mental health and complex
            psychiatric conditions. Outside of work, Dr. Chen enjoys spending time
            with her dog, traveling, scuba diving, cooking, and exploring new
            restaurants. She values wellness, curiosity, and connection with family
            and community, and brings this same sense of warmth and balance into the
            care she provides for her patients.
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
