import { TESTIMONIALS, type Testimonial } from "@/types/data";

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#c8a96e">
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, featured }: { testimonial: Testimonial; featured: boolean }) {
  return (
    <div
      className="card-hover rounded-2xl p-7 border flex flex-col"
      style={{
        background:  featured
          ? "linear-gradient(145deg, rgba(200,169,110,0.08) 0%, rgba(200,169,110,0.03) 100%)"
          : "rgba(255,255,255,0.025)",
        borderColor: featured ? "rgba(200,169,110,0.25)" : "rgba(255,255,255,0.06)",
      }}
    >
      <StarRating />

      <blockquote className="font-body text-slate-300 text-sm leading-relaxed mb-6 flex-1 italic">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-body"
          style={{
            background: "rgba(200,169,110,0.2)",
            color:      "#c8a96e",
            border:     "1px solid rgba(200,169,110,0.3)",
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="font-body text-sm font-semibold" style={{ color: "#f0e6d3" }}>
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-slate-500">{testimonial.corps}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-28 px-6"
      style={{ background: "linear-gradient(180deg, #060d1a 0%, #081629 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-3 font-semibold">
            Voices From the Field
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
          >
            Real Veterans,
            <br />
            Real Careers.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} featured={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}