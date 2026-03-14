/**
 * Conditions Treated — dark glassmorphism section.
 * Massive "Conditions" h1 behind cards with backdrop-blur.
 * Tag label sits above the h1.
 */

/* Condition data — matches common psychiatric practice offerings */
const conditions = [
  {
    title: "Anxiety & Panic",
    description:
      "Generalized anxiety, social anxiety, panic attacks, and phobias that interfere with daily life.",
  },
  {
    title: "Depression",
    description:
      "Persistent sadness, low motivation, and emotional numbness treated with therapy and medication.",
  },
  {
    title: "ADHD",
    description:
      "Attention and focus challenges in adults and adolescents — diagnosis, medication, and coping strategies.",
  },
  {
    title: "PTSD & Trauma",
    description:
      "Processing traumatic experiences through evidence-based approaches like EMDR and trauma-focused CBT.",
  },
  {
    title: "Bipolar Disorder",
    description:
      "Mood stabilization for manic and depressive episodes with ongoing medication management.",
  },
  {
    title: "OCD",
    description:
      "Breaking cycles of intrusive thoughts and compulsive behaviors with specialized treatment.",
  },
  {
    title: "Insomnia & Sleep",
    description:
      "Addressing sleep disturbances at their root — not just symptoms — for lasting improvement.",
  },
  {
    title: "Substance Use",
    description:
      "Compassionate support for addiction and dependency, including medication-assisted treatment.",
  },
];

export default function Conditions() {
  return (
    <section className="bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative px-16 pt-16 pb-24">

        {/* Tag — above the h1 title with large gap */}
        <div className="relative z-[3] flex items-center justify-center gap-4 mb-40">
          <div className="h-px w-16 bg-white/20" />
          <span className="text-[13px] font-semibold text-white/40 tracking-[2px]">
            AREAS OF EXPERTISE
          </span>
          <div className="h-px w-16 bg-white/20" />
        </div>

        {/* Massive h1 — pure white, behind cards */}
        <h1 className="absolute left-1/2 -translate-x-1/2 top-[100px] font-heading text-[clamp(140px,16vw,260px)] font-bold text-white whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal">
          Conditions
        </h1>

        {/* Card grid — z-[2], dark glass cards blur the h1 behind them */}
        <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((condition) => (
            <div
              key={condition.title}
              className="flex flex-col gap-3 p-7 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08]"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {condition.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {condition.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
