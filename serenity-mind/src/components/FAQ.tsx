"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * FAQ — accordion-style frequently asked questions.
 * Click to expand/collapse answers.
 * Covers insurance, appointments, ages, sessions, fees, and cancellation.
 */

/* FAQ data — real practice questions & answers */
const faqs = [
  {
    question: "Do you accept insurance?",
    answer: (
      <p>At this time, I do not accept insurance. However, I am happy to provide a superbill upon request, which you may submit to your insurance company for possible reimbursement depending on your plan.</p>
    ),
  },
  {
    question: "Do you offer virtual or in-person appointments?",
    answer: (
      <>
        <p>Yes. My practice currently offers primarily virtual appointments through a secure telehealth platform across California. Virtual care allows patients to access treatment conveniently and privately from home or another safe space.</p>
        <p className="mt-3">I am working to offer in-person appointments in the future, and updates will be posted as those options become available.</p>
      </>
    ),
  },
  {
    question: "What ages do you treat?",
    answer: (
      <>
        <p>I work with patients across the lifespan, including:</p>
        <ul className="mt-2 ml-4 flex flex-col gap-1 list-disc list-inside">
          <li>Children</li>
          <li>Adolescents</li>
          <li>College students and young adults</li>
          <li>Adults</li>
        </ul>
        <p className="mt-3">Treatment is always tailored to the developmental stage and needs of each individual.</p>
      </>
    ),
  },
  {
    question: "What do sessions look like?",
    answer: (
      <>
        <p>I provide both psychotherapy and medication management, depending on what is most helpful for each patient. Services may include:</p>
        <ul className="mt-2 ml-4 flex flex-col gap-1 list-disc list-inside">
          <li>Psychiatric evaluations and diagnostic assessments</li>
          <li>Medication support</li>
          <li>Individual psychotherapy</li>
          <li>Family sessions</li>
          <li>Collaborative meetings with schools or other providers when clinically appropriate</li>
        </ul>
        <p className="mt-3">Treatment is not just about medications. I focus on therapy, compassionate understanding of each patient&apos;s environment and stressors, and holistic care that addresses the full picture of the individual. This may include lifestyle strategies, coping skills, family support, and collaborative planning along with any pharmacologic treatment.</p>
      </>
    ),
  },
  {
    question: "What is your approach to treatment?",
    answer: (
      <p>Every patient&apos;s experience is unique. My approach is collaborative and individualized, focusing on understanding the full picture of each person&apos;s life, symptoms, and goals. Treatment may involve therapy, medication, lifestyle strategies, family involvement, or a combination of approaches. I aim to support patients throughout their journey, adjusting the plan as their needs evolve.</p>
    ),
  },
  {
    question: "How often will I have appointments?",
    answer: (
      <p>Appointment frequency is individualized based on your needs and goals. Some patients may start with more frequent visits early in treatment, while others transition to less frequent follow-ups as symptoms improve. We will collaboratively determine the schedule that best supports your progress and adjust it over time as needed.</p>
    ),
  },
  {
    question: "What are your fees?",
    answer: (
      /* Fee schedule — responsive table */
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 font-semibold text-text-primary">Service</th>
              <th className="py-2 pr-4 font-semibold text-text-primary">Duration</th>
              <th className="py-2 font-semibold text-text-primary">Fee</th>
            </tr>
          </thead>
          <tbody className="text-text-secondary">
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4">Adult initial consultation</td>
              <td className="py-2.5 pr-4">60–90 min</td>
              <td className="py-2.5">$750–850</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4">Child/teen intake (comprehensive, 2–3 sessions)</td>
              <td className="py-2.5 pr-4">60 min each; total 120–180 min</td>
              <td className="py-2.5">$800 per session</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4">Medication follow-up</td>
              <td className="py-2.5 pr-4">25 min</td>
              <td className="py-2.5">$350</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2.5 pr-4">Individual therapy</td>
              <td className="py-2.5 pr-4">50 min</td>
              <td className="py-2.5">$500–525</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4">Family therapy or parent guidance</td>
              <td className="py-2.5 pr-4">60 min</td>
              <td className="py-2.5">$600</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    question: "What is your cancellation policy?",
    answer: (
      <p>I understand that life can be unpredictable, and sometimes you may need to reschedule or cancel an appointment. Please provide at least 24–48 hours notice if you need to make changes. Each situation is handled on a case-by-case basis, and late cancellations or missed appointments may incur a fee. I appreciate your understanding, which helps keep the schedule running smoothly for all patients.</p>
    ),
  },
];

export default function FAQ() {
  /* Track which FAQ item is currently open (-1 = none) */
  const [openIndex, setOpenIndex] = useState(-1);
  const ref = useScrollReveal();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section id="faq" className="bg-bg-secondary">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 px-16 py-20">

        {/* Left — section header (sticky on desktop) */}
        <div className="scroll-reveal-child flex flex-col gap-3 lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
          <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
            FAQ
          </span>
          <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] text-text-secondary leading-relaxed">
            Everything you need to know before your first appointment.
          </p>
        </div>

        {/* Right — accordion list */}
        <div className="scroll-reveal-child flex-1 flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              {/* Question — clickable toggle */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-heading text-[17px] font-semibold text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer — collapsible with smooth height transition */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === i ? "max-h-[600px] pb-5" : "max-h-0"
                }`}
              >
                <div className="text-[15px] text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
