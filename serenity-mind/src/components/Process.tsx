/**
 * Process — "How It Works" section.
 * 4-step horizontal flow showing the patient journey.
 * Reduces anxiety about "what happens when I call."
 */

/* Steps data — the patient journey from first call to ongoing care */
const steps = [
  {
    number: "01",
    title: "Book a Consultation",
    description:
      "Schedule a free, confidential 15-minute call to discuss your needs and see if we're the right fit.",
  },
  {
    number: "02",
    title: "Comprehensive Evaluation",
    description:
      "An in-depth diagnostic assessment covering your mental health history, symptoms, and goals.",
  },
  {
    number: "03",
    title: "Personalized Treatment",
    description:
      "A tailored plan combining therapy, medication, or both — designed around your life and preferences.",
  },
  {
    number: "04",
    title: "Ongoing Support",
    description:
      "Regular follow-ups to track progress, adjust treatment, and ensure lasting results.",
  },
];

export default function Process() {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 px-16 py-20">
        {/* Section header — centered */}
        <div className="flex flex-col items-center gap-5 max-w-[600px] mx-auto text-center mb-4">
          {/* Tag with left/right lines — matches Expertise section style */}
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-text-muted/30" />
            <span className="text-[13px] font-semibold text-text-muted tracking-[2px]">
              HOW IT WORKS
            </span>
            <div className="h-px w-16 bg-text-muted/30" />
          </div>
          <h2 className="font-heading text-[40px] font-bold text-text-primary tracking-tight leading-[1.1]">
            Your Path to Better Mental Health
          </h2>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              {/* Step number */}
              <span className="font-heading text-[48px] font-bold text-text-muted/40 leading-none">
                {step.number}
              </span>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
