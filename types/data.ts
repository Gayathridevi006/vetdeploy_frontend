// ─── Types ────────────────────────────────────────────────────────────────────
export interface StatItem  { value: string; label: string; suffix?: string }
export interface Step      { num: string; title: string; desc: string; icon: string }
export interface Feature   { icon: string; title: string; desc: string }
export interface Testimonial {
  name: string; rank: string; corps: string;
  quote: string; initials: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────
export const STATS: StatItem[] = [
  { value: "12,400", label: "Veterans Placed",   suffix: "+" },
  { value: "3,800",  label: "Partner Companies", suffix: "+" },
  { value: "94",     label: "Placement Rate",    suffix: "%" },
  { value: "18",     label: "Days Avg. to Hire", suffix: ""  },
];

export const HOW_IT_WORKS: Step[] = [
  { num: "01", title: "Create Your Profile",    icon: "🪖", desc: "Enter your service details, rank, trade, and qualifications in minutes." },
  { num: "02", title: "Match with Employers",   icon: "🎯", desc: "Our algorithm maps your military skills to civilian job requirements automatically." },
  { num: "03", title: "Apply & Get Hired",      icon: "✅", desc: "Connect with top companies eager to hire disciplined, proven leaders." },
];

export const FEATURES: Feature[] = [
  { icon: "🛡️", title: "Veteran-First Platform",  desc: "Built exclusively for armed forces personnel transitioning to civilian careers." },
  { icon: "🤝", title: "Verified Employers",       desc: "Every company is vetted to ensure they value and respect military experience." },
  { icon: "📄", title: "ATS-Ready Resumes",        desc: "Generate a civilian resume from your service record with one click." },
  { icon: "🧭", title: "Career Counselling",       desc: "Free sessions with counsellors who have walked the same path." },
  { icon: "🏆", title: "Priority Listings",        desc: "Get featured to top employers before your profile goes public." },
  { icon: "📱", title: "Mobile First",             desc: "Apply, track, and communicate from anywhere, on any device." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Col. Rajiv Sharma (Retd.)", rank: "Colonel",
    corps: "Indian Army · Engineers", initials: "RS",
    quote: "After 24 years of service, I was lost. This platform matched me with a project management role in 12 days. The transition was seamless.",
  },
  {
    name: "Cdr. Priya Nair (Retd.)", rank: "Commander",
    corps: "Indian Navy · Logistics", initials: "PN",
    quote: "I uploaded my service record and within a week had three interview calls. The ATS resume builder alone is worth everything.",
  },
  {
    name: "Sqn Ldr. Arun Mehta (Retd.)", rank: "Squadron Leader",
    corps: "IAF · Aviation", initials: "AM",
    quote: "The companies here genuinely respect military discipline. Landed a senior ops role at a Tier 1 firm. Cannot recommend this enough.",
  },
];

export const NAV_LINKS = ["How It Works", "Features", "Testimonials", "For Employers", "Contact Us"];