import Link from "next/link";

export default function EmployersSection() {
  return (
    <section
      id="for-employers"
      className="relative py-28 px-6"
      style={{ background: "#cfdef0" }}
    >
      <div className="max-w-5xl mx-auto">

        <div
          className="rounded-3xl p-10 md:p-16 text-center border relative overflow-hidden bg-white"
          style={{
            borderColor: "#e6eaf0",
            boxShadow: "0 15px 40px rgba(0,0,0,0.06)"
          }}
        >

          {/* Corner decorations */}
          <div
            className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #c8a96e, transparent)" }}
          />

          <div
            className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
          />

          <p className="font-body text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-semibold relative z-10">
            For Organisations
          </p>

          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 relative z-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Hire Proven Leaders
          </h2>

          <p className="font-body text-slate-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed relative z-10">
            Veterans bring discipline, crisis management, and leadership that no MBA can teach.
            Access our pool of <span className="text-[#c8a96e] font-semibold">12,000+ verified candidates</span> today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">

            <Link
              href="/dashboard/hiring"
              className="font-body font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#c8a96e 0%,#a07840 100%)",
                color: "#071831",
                boxShadow: "0 8px 30px rgba(200,169,110,0.25)"
              }}
            >
              Post a Job →
            </Link>

            <Link
              href="/contact"
              className="font-body font-semibold text-base px-8 py-4 rounded-xl border transition-all duration-200 hover:bg-slate-100"
              style={{
                borderColor: "#d6dbe3",
                color: "#1e293b"
              }}
            >
              Talk to Us
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}