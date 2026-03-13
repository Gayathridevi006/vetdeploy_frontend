import { FEATURES, type Feature } from "@/types/data";

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className="card-hover rounded-2xl p-6 border bg-white"
      style={{
        borderColor: "#e6eaf0",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
      }}
    >
      <div className="text-3xl mb-4">{feature.icon}</div>

      <h3 className="font-display text-lg font-bold mb-2 text-slate-900 group-hover:text-[#c8a96e] transition-colors">
        {feature.title}
      </h3>

      <p className="font-body text-slate-600 text-sm leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-28 px-6"
      style={{ background: "#cfdef0" }}
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-semibold">
            Everything You Need
          </p>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
            Built for Veterans,
            <br />
            <span className="text-[#c8a96e]">By Veterans.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>

      </div>
    </section>
  );
}