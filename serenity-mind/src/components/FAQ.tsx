"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ============================================================
   THEME TOGGLE
   Flip to `false` to restore the original two-column layout
   (sticky header column on the left, accordion on the right).
   When `true`, renders the Expertise/Fees-style layout: giant
   lilac "Questions" word in the background with the accordion
   inside a backdrop-blur container.
   ============================================================ */
const USE_EXPERTISE_THEME = true;

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
              href="#pricing"
              className="underline underline-offset-2 text-text-primary hover:text-accent transition-colors"
            >
              Pricing section
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

/* ------------------------------------------------------------
   Shared accordion item — used by both theme variants.
   Lifts the per-item rendering into one place so both layouts
   stay in sync on click behavior + visual styling.
   ------------------------------------------------------------ */
type AccordionItemProps = {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  /* Border color for the bottom divider — lets the expertise theme
     use a faint lilac while the original theme uses standard border. */
  borderColor?: string;
};
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  borderColor = "border-border",
}: AccordionItemProps) {
  return (
    /* group wrapper enables the per-row hover effects:
       - bottom border brightens to saturated lilac
       - an inset upward-glow appears from the bottom edge
       - the question text bounces gently */
    <div
      className={`group border-b ${borderColor} px-2 -mx-2 rounded-lg transition-all duration-300 hover:border-[#A78BFA]/70 hover:shadow-[inset_0_-16px_24px_-12px_rgba(167,139,250,0.35)]`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[13px] md:text-[14px] font-medium text-text-primary pr-4 group-hover:animate-[row-title-bounce_0.6s_ease-in-out_infinite]">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[600px] pb-5" : "max-h-0"
        }`}
      >
        <div className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  /* Track which FAQ item is currently open — stringified "sectionIdx-itemIdx".
     null means none open. Using a composite key so we can group by section. */
  const [openKey, setOpenKey] = useState<string | null>(null);
  const ref = useScrollReveal();

  /* Ref for the giant "Questions" h1 in the expertise theme.
     Scroll-driven gradient shift, same effect as Conditions + Fees. */
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!USE_EXPERTISE_THEME) return;
    let rafId: number;
    const tick = () => {
      if (h1Ref.current) {
        const rect = h1Ref.current.getBoundingClientRect();
        const pos = ((window.innerHeight - rect.top) * 0.5) % 300;
        h1Ref.current.style.backgroundPosition = `${pos}% 0%`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  /* =====================================================
     EXPERTISE-STYLE LAYOUT (default — USE_EXPERTISE_THEME)
     ===================================================== */
  if (USE_EXPERTISE_THEME) {
    return (
      <section id="faq" className="bg-bg-secondary overflow-hidden scroll-mt-[88px] md:scroll-mt-0">
        <div
          ref={ref}
          className="scroll-reveal max-w-[1440px] mx-auto relative px-5 md:px-16 pt-12 md:pt-16 pb-16 md:pb-24"
        >
          {/* Tag — small gray uppercase label with horizontal rules */}
          <div className="relative z-[3] flex items-center justify-center gap-4 mb-20 md:mb-40">
            <div className="h-px w-16 bg-text-muted/30" />
            <span className="text-[11px] font-semibold text-text-muted tracking-[2px]">
              FREQUENTLY ASKED
            </span>
            <div className="h-px w-16 bg-text-muted/30" />
          </div>

          {/* Massive lilac h1 — same gradient + scroll shift as Conditions/Fees */}
          <h1
            ref={h1Ref}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #DDD6FE, #C4B5FD, #DDD6FE)",
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0%",
            }}
            className="absolute left-1/2 -translate-x-1/2 top-[60px] md:top-[100px] font-heading text-[clamp(72px,16vw,260px)] font-bold whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal bg-clip-text text-transparent"
          >
            Questions
          </h1>

          {/* Accordion container — z-[2] over the h1, with backdrop-blur */}
          <div className="relative z-[2] max-w-[800px] mx-auto rounded-2xl bg-white/50 backdrop-blur-md border border-[#C4B5FD]/30 p-6 md:p-10 scroll-reveal-child">
            <div className="flex flex-col gap-10">
              {faqSections.map((section, sIdx) => (
                <div key={section.title} className="flex flex-col">
                  {/* Subsection header — lilac 01/02 number + title */}
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-heading text-[28px] font-bold text-[#C4B5FD] leading-none">
                      {String(sIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-[22px] md:text-[24px] font-semibold text-text-primary tracking-tight">
                      {section.title}
                    </h3>
                  </div>

                  {/* Questions in this subsection */}
                  {section.items.map((faq, qIdx) => {
                    const key = `${sIdx}-${qIdx}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openKey === key}
                        onToggle={() => toggle(key)}
                        borderColor="border-[#C4B5FD]/30"
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================================
     ORIGINAL TWO-COLUMN LAYOUT (when USE_EXPERTISE_THEME = false)
     Sticky left column with title + section copy, accordion right.
     ===================================================== */
  return (
    <section id="faq" className="bg-white scroll-mt-[88px] md:scroll-mt-0">
      <div
        ref={ref}
        className="scroll-reveal max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 px-5 md:px-16 py-12 md:py-20"
      >
        {/* Left — section header (sticky on desktop) */}
        <div className="scroll-reveal-child flex flex-col gap-3 lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
          <span className="text-[11px] font-semibold text-text-primary tracking-[2px]">
            FAQ
          </span>
          <h2 className="font-heading text-[28px] md:text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-[11px] md:text-[12px] text-text-secondary leading-relaxed">
            Everything you need to know before your first appointment.
          </p>
        </div>

        {/* Right — accordion list grouped by subsection */}
        <div className="scroll-reveal-child flex-1 flex flex-col gap-12">
          {faqSections.map((section, sIdx) => (
            <div key={section.title} className="flex flex-col">
              {/* Subsection header — lilac 01/02 number + title */}
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-heading text-[28px] font-bold text-[#C4B5FD] leading-none">
                  {String(sIdx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-[22px] md:text-[24px] font-semibold text-text-primary tracking-tight">
                  {section.title}
                </h3>
              </div>

              {section.items.map((faq, qIdx) => {
                const key = `${sIdx}-${qIdx}`;
                return (
                  <AccordionItem
                    key={key}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
