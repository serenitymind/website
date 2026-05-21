/**
 * Services — dark section with glassmorphism cards.
 * Massive "Services" h1 at high opacity with strong white glow.
 * Top ~45% of text peeks above cards, bottom ~55% behind them.
 * Cards backdrop-blur frosts the text where they overlap.
 */

/* Service data */
const services = [
  {
    title: "Psychiatric Evaluation",
    description:
      "Thorough diagnostic assessments to understand your mental health needs and develop a personalized treatment plan.",
  },
  {
    title: "Medication Management",
    description:
      "Careful prescribing and monitoring of psychiatric medications with regular follow-ups to optimize your treatment.",
  },
  {
    title: "Individual Therapy",
    description:
      "One-on-one sessions using CBT, DBT, and other proven approaches to help you navigate life's challenges.",
  },
  {
    title: "Telepsychiatry",
    description:
      "Convenient virtual appointments from the comfort of your home. Same quality care, accessible anywhere.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative px-16 pt-52 pb-24">

        {/* Massive h1 — bright enough to see, strong glow bloom */}
        {/* Positioned so top ~45% is above cards, bottom ~55% behind */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 top-6 font-heading text-[clamp(180px,22vw,320px)] font-bold text-white whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal"
        >
          Services
        </h1>

        {/* Cards — z-[2] on top of h1, backdrop-blur frosts the text */}
        <div className="relative z-[2] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08]"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-[11px] md:text-[12px] text-white/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
