"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * FAQ — accordion-style frequently asked questions.
 * Click to expand/collapse answers.
 * Common questions that reduce friction before booking.
 */

/* FAQ data — questions patients ask before their first visit */
const faqs = [
  {
    question: "Do you accept insurance?",
    answer:
      "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, and United Healthcare. We also offer competitive self-pay rates and can provide superbills for out-of-network reimbursement.",
  },
  {
    question: "What should I expect at my first visit?",
    answer:
      "Your initial appointment is a comprehensive 60-minute evaluation. We'll discuss your symptoms, medical history, lifestyle, and goals. By the end, you'll have a clear understanding of your diagnosis and a preliminary treatment plan.",
  },
  {
    question: "Do you offer virtual appointments?",
    answer:
      "Yes. We offer telepsychiatry appointments via secure video for both initial evaluations and follow-ups. Virtual visits are available to patients throughout the state and are covered by most insurance plans.",
  },
  {
    question: "How long does treatment typically take?",
    answer:
      "It depends on your specific needs. Some patients see improvement within weeks of starting medication, while therapy-focused treatment may span several months. We'll set clear milestones and adjust as you progress.",
  },
  {
    question: "Is everything I share confidential?",
    answer:
      "Absolutely. All sessions are protected by doctor-patient confidentiality and HIPAA regulations. Your privacy is foundational to the trust we build together.",
  },
  {
    question: "What ages do you treat?",
    answer:
      "We treat adolescents (ages 13+) and adults. For younger children, we can provide referrals to trusted child psychiatry specialists in our network.",
  },
];

export default function FAQ() {
  /* Track which FAQ item is currently open (-1 = none) */
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section id="faq" className="bg-bg-secondary">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 px-16 py-20">

        {/* Left — section header (sticky on desktop) */}
        <div className="flex flex-col gap-3 lg:w-[360px] shrink-0 lg:sticky lg:top-24 lg:self-start">
          <span className="text-[13px] font-semibold text-text-primary tracking-[2px]">
            FAQ
          </span>
          <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Common Questions
          </h2>
          <p className="text-[17px] text-text-secondary leading-relaxed">
            Everything you need to know before your first appointment.
          </p>
        </div>

        {/* Right — accordion list */}
        <div className="flex-1 flex flex-col">
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
                  openIndex === i ? "max-h-[300px] pb-5" : "max-h-0"
                }`}
              >
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
