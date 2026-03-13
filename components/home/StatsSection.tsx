"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, type StatItem } from "../../types/data";

function useCountUp(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const numeric = parseInt(stat.value.replace(/,/g, ""), 10);
  const count = useCountUp(numeric, 2200, animate);
  const display = animate
    ? count >= 1000 ? count.toLocaleString("en-IN") : count.toString()
    : "0";

  return (
    <div className="text-center bg-white rounded-xl p-6 border"
      style={{
        borderColor:"#e6eaf0",
        boxShadow:"0 10px 25px rgba(0,0,0,0.05)"
      }}
    >
      <div
        className="text-4xl md:text-5xl font-black mb-1 tabular-nums"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#c8a96e" }}
      >
        {display}
        <span className="text-2xl">{stat.suffix}</span>
      </div>

      <p className="font-body text-slate-600 text-sm tracking-widest uppercase font-medium">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 px-6"
      style={{ background: "#cfdef0" }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s: StatItem) => (
            <StatCard key={s.label} stat={s} animate={visible} />
          ))}
        </div>

      </div>
    </section>
  );
}