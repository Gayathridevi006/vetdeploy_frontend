"use client";

import Link from "next/link";

// Fixed star positions to avoid hydration mismatch
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size:    i % 5 === 0 ? 2 : 1,
  top:     ((i * 137.508) % 100).toFixed(2),   // golden-angle distribution
  left:    ((i * 97.3)    % 100).toFixed(2),
  opacity: (((i * 31) % 40) / 100 + 0.1).toFixed(2),
}));

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 mesh-bg diagonal-divider"
      style={{ background: "linear-gradient(160deg, #060d1a 0%, #0b1e3d 50%, #081429 100%)" }}
    >
      {/* Stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ width: s.size, height: s.size, top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity }}
        />
      ))}

      {/* Gold horizon glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="animate-fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-xs font-medium tracking-widest uppercase font-body"
          style={{ borderColor: "rgba(200,169,110,0.3)", background: "rgba(200,169,110,0.07)", color: "#c8a96e" }}
        >
          <span className="float-icon">🎖️</span>
          India's #1 Platform for Military Professionals
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up-2 font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6">
          <span style={{ color: "#f0e6d3" }}>Your Service</span>
          <br />
          <span className="shimmer-text">Deserves More.</span>
        </h1>

        {/* Sub-headline */}
        <p className="animate-fade-up-3 font-body text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We bridge the gap between military excellence and civilian opportunity.
          Trusted by{" "}
          <span style={{ color: "#c8a96e" }}>12,400+ veterans</span>{" "}
          across Army, Navy, and Air Force.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
             href="/login"
            className="pulse-btn font-body font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            style={{
              background:  "linear-gradient(135deg, #c8a96e 0%, #e8c98e 50%, #c8a96e 100%)",
              color:       "#0a1628",
              boxShadow:   "0 8px 30px rgba(200,169,110,0.3)",
            }}
          >
            Start Your Transition →
          </Link>
          <Link
            href="/dashboard/hiring"
            className="font-body font-semibold text-base px-8 py-4 rounded-xl border transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#e2e8f0" }}
          >
            Hire Veterans
          </Link>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-in mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-body">
          {["🏛️ Ministry of Defence Partner", "✅ Verified Employers Only", "🔒 100% Free for Veterans"].map((b) => (
            <span key={b} className="flex items-center gap-1">{b}</span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-body animate-bounce">
        <span>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}