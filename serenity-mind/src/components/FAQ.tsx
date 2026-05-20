"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * FAQ — accordion-style frequently asked questions.
 * Click to expand/collapse answers.
 * Grouped into two subsections: Getting Started & What to Expect,
 * and Treatment, Structure & Fees.
 */

/* FAQ data — grouped into subsections for clearer scanning */
const faqSections = [
  {
    title: "Getting Started & What to Expect",
    items: [
      {
        question: "What happens during the first appointment?",
        answer: (
          <p>
            The first visit is a comprehensive evaluation focused on
            understanding you (or your child) as a whole person—not just
            symptoms. I take time to learn about current concerns, psychiatric
            history, and life context. This includes a thorough psychiatric
            interview and, when helpful, input from family or other sources.
            Together, we review diagnostic impressions and create a thoughtful,
            individualized treatment plan.
          </p>
        ),
      },
      {
        question: "What is included in a child or adolescent evaluation?",
        answer: (
          <p>
            A child or adolescent evaluation is a comprehensive, two-session
            process (approximately 120 minutes total). It includes interviews
            with the child and caregivers, a detailed developmental and
            psychiatric history, and a careful diagnostic assessment. When
            helpful, input from schools or other providers may also be
            incorporated to support accurate treatment planning.
          </p>
        ),
      },
      {
        question: "Do you offer virtual or in-person appointments?",
        answer: (
          <p>
            Yes. I offer virtual appointments for patients throughout
            California through a secure telehealth platform. I also offer
            limited in-person appointments one day per week for those who
            prefer face-to-face care.
          </p>
        ),
      },
      {
        question: "Do you provide both therapy and medication management?",
        answer: (
          <p>
            Yes. Treatment is individualized and may include medication
            management, psychotherapy, or a combination of both. When
            appropriate, I also incorporate family sessions to support care in
            a more holistic way.
          </p>
        ),
      },
      {
        question: "Do you work with families or schools?",
        answer: (
          <p>
            Yes. With consent and when clinically appropriate, I collaborate
            with families, schools, and other providers to support continuity
            of care and a more complete understanding of each patient&apos;s
            needs.
          </p>
        ),
      },
    ],
  },
  {
    title: "Treatment, Structure & Fees",
    items: [
      {
        question: "What do follow-up visits look like?",
        answer: (
          <p>
            Follow-up visits focus on supporting ongoing progress and adjusting
            care over time. These sessions may include medication management,
            psychotherapy, and discussion of goals, coping strategies, and
            day-to-day functioning.
          </p>
        ),
      },
      {
        question: "Do you accept insurance?",
        answer: (
          <p>
            No. This is a private-pay practice. Superbills may be provided for
            patients seeking out-of-network reimbursement.
          </p>
        ),
      },
      {
        question: "How much do appointments cost?",
        answer: (
          <p>
            Fees vary based on appointment type and duration. A detailed fee
            schedule is available in the{" "}
            <a
              href="#fees"
              className="underline underline-offset-2 text-text-primary hover:text-accent transition-colors"
            >
              Fees section
            </a>{" "}
            above.
          </p>
        ),
      },
      {
        question: "What is your cancellation policy?",
        answer: (
          <p>
            I understand that unexpected situations can arise. I kindly ask for
            at least 48 hours&apos; notice if you need to cancel or reschedule
            an appointment. Late cancellations or missed appointments may be
            subject to a fee. Each situation is reviewed individually, and I
            appreciate your understanding in helping maintain access for all
            patients.
          </p>
        ),
      },
    ],
  },
];

export default function FAQ() {
  /* Track which FAQ item is currently open — stringified "sectionIdx-itemIdx".
     null means none open. Using a composite key so we can group by section. */
  const [openKey, setOpenKey] = useState<string | null>(null);
  const ref = useScrollReveal();

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <section id="faq" className="bg-white scroll-mt-[88px] md:scroll-mt-0">
      <div ref={ref} className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 px-5 md:px-16 py-12 md:py-20">

        {/* Left — section header (sticky on desktop) */}
        <div className="scroll-reveal-child flex flex-col gap-3 lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
          <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
            FAQ
          </span>
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] md:text-[17px] text-text-secondary leading-relaxed">
            Everything you need to know before your first appointment.
          </p>
        </div>

        {/* Right — accordion list grouped by subsection.
            gap-12 between sections so the two groups feel distinctly separate. */}
        <div className="scroll-reveal-child flex-1 flex flex-col gap-12">
          {faqSections.map((section, sIdx) => (
            <div key={section.title} className="flex flex-col">
              {/* Subsection header — lilac "01"/"02" number + sentence-case title.
                  Mirrors the Process section numbering for theme consistency,
                  and creates a clear visual gap above the question list. */}
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-heading text-[28px] font-bold text-[#C4B5FD] leading-none">
                  {String(sIdx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-[22px] md:text-[24px] font-semibold text-text-primary tracking-tight">
                  {section.title}
                </h3>
              </div>

              {/* Questions inside this subsection — medium weight (not semibold)
                  so they read as subordinate to the subsection title above. */}
              {section.items.map((faq, qIdx) => {
                const key = `${sIdx}-${qIdx}`;
                const isOpen = openKey === key;
                return (
                  <div key={key} className="border-b border-border">
                    {/* Question — clickable toggle */}
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="text-[16px] md:text-[17px] font-medium text-text-primary pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Answer — collapsible with smooth height transition */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isOpen ? "max-h-[600px] pb-5" : "max-h-0"
                      }`}
                    >
                      <div className="text-[15px] text-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
