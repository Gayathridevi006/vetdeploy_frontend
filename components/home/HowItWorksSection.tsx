import { HOW_IT_WORKS, type Step } from "@/types/data";

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="card-hover relative rounded-2xl p-7 border"
      style={{
        background:    "rgba(255,255,255,0.025)",
        borderColor:   "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Floating icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 float-icon"
        style={{
          background:  "rgba(200,169,110,0.1)",
          border:      "1px solid rgba(200,169,110,0.2)",
        }}
      >
        {step.icon}
      </div>

      {/* Ghost number */}
      <div
        className="font-display text-5xl font-black absolute top-6 right-6 opacity-[0.07] select-none"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#c8a96e" }}
      >
        {step.num}
      </div>

      <h3
        className="font-display text-xl font-bold mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
      >
        {step.title}
      </h3>
      <p className="font-body text-slate-400 text-sm leading-relaxed">{step.desc}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6 diagonal-divider-2"
      style={{ background: "linear-gradient(180deg, #060d1a 0%, #0b1930 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-semibold">
            Simple Process
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-[52px] h-px pointer-events-none"
            style={{
              left:       "calc(16.7% + 16px)",
              right:      "calc(16.7% + 16px)",
              background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), rgba(200,169,110,0.3), transparent)",
            }}
          />

          {HOW_IT_WORKS.map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}