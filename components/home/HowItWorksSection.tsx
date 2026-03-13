import { HOW_IT_WORKS, type Step } from "@/types/data";

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className="card-hover relative rounded-2xl p-7 border bg-white"
      style={{
        borderColor: "#e6eaf0",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Floating icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 float-icon"
        style={{
          background: "rgba(200,169,110,0.12)",
          border: "1px solid rgba(200,169,110,0.25)",
        }}
      >
        {step.icon}
      </div>

      {/* Ghost number */}
      <div
        className="font-display text-5xl font-black absolute top-6 right-6 opacity-[0.06] select-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#c8a96e",
        }}
      >
        {step.num}
      </div>

      <h3
        className="font-display text-xl font-bold mb-2 text-slate-900"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {step.title}
      </h3>

      <p className="font-body text-slate-600 text-sm leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6 diagonal-divider-2"
      style={{
        background: "linear-gradient(180deg, #cfdef0 0%, #eef2f8 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-semibold">
            Simple Process
          </p>

          <h2
            className="font-display text-4xl md:text-5xl font-bold text-slate-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">

          {/* Connector line */}
          <div
            className="hidden md:block absolute top-[52px] h-px pointer-events-none"
            style={{
              left: "calc(16.7% + 16px)",
              right: "calc(16.7% + 16px)",
              background:
                "linear-gradient(90deg, transparent, rgba(200,169,110,0.4), rgba(200,169,110,0.4), transparent)",
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