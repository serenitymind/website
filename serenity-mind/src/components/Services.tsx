import { Brain, Pill, MessageCircle, Video } from "lucide-react";

/**
 * Services — 4-card grid showing core psychiatry offerings
 * Each card: icon + title + description
 */

/* Service data — easy to extend later */
const services = [
  {
    icon: Brain,
    title: "Psychiatric Evaluation",
    description:
      "Thorough diagnostic assessments to understand your mental health needs and develop a personalized treatment plan.",
  },
  {
    icon: Pill,
    title: "Medication Management",
    description:
      "Careful prescribing and monitoring of psychiatric medications with regular follow-ups to optimize your treatment.",
  },
  {
    icon: MessageCircle,
    title: "Individual Therapy",
    description:
      "One-on-one sessions using CBT, DBT, and other proven approaches to help you navigate life's challenges.",
  },
  {
    icon: Video,
    title: "Telepsychiatry",
    description:
      "Convenient virtual appointments from the comfort of your home. Same quality care, accessible anywhere.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12 px-16 py-20">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 max-w-[700px]">
          <span className="text-[13px] font-semibold text-accent tracking-[2px]">
            OUR SERVICES
          </span>
          <h2 className="font-heading text-[40px] font-bold text-text-primary text-center tracking-tight">
            Comprehensive Psychiatric Care
          </h2>
          <p className="text-[17px] text-text-secondary text-center leading-relaxed">
            We offer a full range of mental health services tailored to your
            unique needs.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 p-7 rounded-2xl bg-bg-card border border-border-purple"
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
