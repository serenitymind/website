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
  "QME Certified",
  "Telehealth Available",
];

export default function DoctorBio() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="bg-bg-secondary scroll-mt-[88px] md:scroll-mt-0">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 px-5 md:px-16 pt-12 md:pt-20 pb-8 items-center">

        {/* Left — doctor headshot — full width on mobile to match the bio text width */}
        <div className="w-full lg:w-[400px] shrink-0 scroll-reveal-child">
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative">
            <Image
              src="/doctor-headshot.jpeg"
              alt="Dr. Eugenia Chen"
              fill
              className="object-cover object-[center_15%]"
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
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Dr. Eugenia Chen, M.D.
          </h2>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Dr. Eugenia Chen is a board-certified adult psychiatrist and
            board-eligible child and adolescent psychiatrist. She completed her
            medical degree at Baylor College of Medicine, followed by psychiatry
            residency training at Kaiser Permanente and fellowship training in
            Child and Adolescent Psychiatry at the University of California, Los
            Angeles (UCLA), where she served as Fellowship Wellness Chief.
          </p>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Dr. Chen is a bilingual Mandarin speaker with a focus in parent-infant
            and maternal mental health as an area of distinction. She is certified
            in Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) and is a Board
            Certified Behavior Analyst (BCBA). Her clinical work spans children,
            adolescents, young adults, and adults, with an emphasis on family
            therapy and parent guidance as part of comprehensive care.
          </p>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            She has also participated in leadership and committee work with the
            APA Workplace Committee and AACAP.
          </p>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Dr. Chen takes a thoughtful and collaborative approach to care,
            integrating evidence-based treatment, psychotherapy, and an
            understanding of each patient&apos;s environment and life experiences
            to support meaningful and lasting mental wellness. Her work is shaped
            by research, community advocacy, and trauma-informed care, with
            publications and national presentations focused on youth mental health
            and complex psychiatric conditions.
          </p>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-[640px]">
            Outside of work, Dr. Chen enjoys spending time with her family and
            dog, traveling, scuba diving, cooking, and exploring new restaurants.
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
