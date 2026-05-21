/**
 * Testimonials — dark section with glassmorphism cards.
 * KEY EFFECT: Massive h1 "Stories" at ~15% opacity positioned so
 * top half peeks above cards, bottom half is behind them.
 * Cards use backdrop-blur-md to frost/blur the text behind them.
 * Strong white glow on text creates bloom effect.
 */

/* Star component — filled star (white for dark bg) */
const Star = () => (
  <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

/* Testimonial data — placeholder content */
const testimonials = [
  {
    quote:
      "For the first time in years, I feel like myself again. Dr. Mitchell listened — really listened — and created a plan that actually works for my life.",
    name: "Rachel M.",
    context: "Anxiety & Depression",
    stars: 5,
  },
  {
    quote:
      "I was nervous about medication, but the way everything was explained made me feel completely at ease. The follow-ups are thorough and I never feel rushed.",
    name: "James K.",
    context: "ADHD, Adult",
    stars: 5,
  },
  {
    quote:
      "The telepsychiatry option made all the difference. I travel constantly for work and can still keep my appointments. The care is exceptional.",
    name: "Priya S.",
    context: "Bipolar Disorder",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#0a0a0a] overflow-hidden">
      {/* Extra top padding so the h1 top half is visible above cards */}
      <div className="max-w-[1440px] mx-auto relative px-16 pt-52 pb-24">

        {/* H1 — 15% opacity, strong glow, vertically centered on card top edge */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 top-6 font-heading text-[clamp(180px,22vw,320px)] font-bold text-white whitespace-nowrap select-none pointer-events-none z-[1] leading-none tracking-normal"
        >
          Stories
        </h1>

        {/* Card grid — z-10, sits ON TOP of h1 so backdrop-blur frosts the text */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-5 p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.08]"
            >
              {/* Star rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[11px] md:text-[12px] text-white/60 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div>
                <p className="text-[13px] md:text-[14px] font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-[11px] text-white/30">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
