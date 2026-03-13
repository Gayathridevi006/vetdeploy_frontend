"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import GlobalStyles from "@/components/home/Globalstyles";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: "support@vetdeploy.com",
    description: "Reach out to our team",
    href: "mailto:support@vetdeploy.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9036524348",
    description: "Call us anytime",
    href: "tel:+919036524348",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    description: "Our headquarters",
    href: "#",
  },
];

const FAQS = [
  {
    question: "How long does it take to respond to inquiries?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.",
  },
  {
    question: "Can I schedule a demo of the platform?",
    answer:
      "Absolutely! Please fill out the contact form with 'Demo Request' as the subject, and our team will get back to you within 2 hours.",
  },
  {
    question: "What are your business hours?",
    answer:
      "We're available Monday to Friday, 9 AM to 6 PM IST. Email inquiries are answered 24/7.",
  },
  {
    question: "Do you offer premium support packages?",
    answer:
      "Yes! We offer customized support plans for enterprise clients. Reach out to our sales team for more information.",
  },
  {
    question: "How can employers get in touch with your recruiting team?",
    answer:
      "Employers can use our dedicated form or email employers@vetdeploy.com to discuss hiring military professionals.",
  },
  {
    question: "Is my data secure when submitting the contact form?",
    answer:
      "Yes, all data is encrypted and stored securely. We comply with GDPR and other data protection regulations.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await fetch("https://13.233.56.90/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden grain" style={{ background: "#060d1a", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <GlobalStyles />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-12"
        style={{ background: "linear-gradient(160deg, #060d1a 0%, #0b1e3d 50%, #081429 100%)" }}
      >
        {/* Gradient glow */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(200,169,110,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-xs font-medium tracking-widest uppercase"
            style={{ borderColor: "rgba(200,169,110,0.3)", background: "rgba(200,169,110,0.07)", color: "#c8a96e" }}
          >
            <span>📞</span>
            Get in Touch
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6" style={{ color: "#f0e6d3" }}>
            We're Here to Help
          </h1>

          {/* Subheading */}
          <p className="font-body text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Have questions about Vetdeploy? Our dedicated team is ready to support your journey. Reach out to us through any of these channels.
          </p>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="relative py-20 px-6" style={{ background: "#04090f" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {CONTACT_METHODS.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.href}
                  className="group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: "rgba(200,169,110,0.06)",
                    border: "1px solid rgba(200,169,110,0.2)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(200,169,110,0.15)" }}
                    >
                      <Icon size={24} style={{ color: "#c8a96e" }} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-lg font-bold mb-1" style={{ color: "#f0e6d3" }}>
                        {method.label}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3">{method.description}</p>
                      <p className="font-body font-semibold" style={{ color: "#c8a96e" }}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f0e6d3" }}>
              Send us a Message
            </h2>
            <p className="text-slate-400 text-lg">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {submitted && (
            <div
              className="mb-8 p-4 rounded-lg border animate-pulse"
              style={{
                background: "rgba(76,175,80,0.1)",
                borderColor: "#4caf50",
              }}
            >
              <p className="text-green-300 font-body font-semibold">
                ✓ Thank you for reaching out! We'll get back to you shortly.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display font-semibold mb-2" style={{ color: "#f0e6d3" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    "--tw-ring-color": "#c8a96e",
                  } as React.CSSProperties}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold mb-2" style={{ color: "#f0e6d3" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    "--tw-ring-color": "#c8a96e",
                  } as React.CSSProperties}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone & Subject Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-display font-semibold mb-2" style={{ color: "#f0e6d3" }}>
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    "--tw-ring-color": "#c8a96e",
                  } as React.CSSProperties}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-display font-semibold mb-2" style={{ color: "#f0e6d3" }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border text-white transition-all focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    "--tw-ring-color": "#c8a96e",
                  } as React.CSSProperties}
                >
                  <option value="">Select a subject...</option>
                  <option value="general">General Inquiry</option>
                  <option value="demo">Demo Request</option>
                  <option value="support">Technical Support</option>
                  <option value="recruiting">Recruiting Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-display font-semibold mb-2" style={{ color: "#f0e6d3" }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 resize-none"
                style={{
                  borderColor: "rgba(200,169,110,0.3)",
                  "--tw-ring-color": "#c8a96e",
                } as React.CSSProperties}
                placeholder="Tell us how we can help..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-body font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg disabled:opacity-70"
              style={{
                background: "linear-gradient(135deg, #c8a96e, #a07840)",
                color: "#0f1a2e",
                boxShadow: "0 4px 15px rgba(200,169,110,0.25)",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-6" style={{ background: "#04090f" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "#f0e6d3" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Find quick answers to common questions about Vetdeploy.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: expandedFaq === idx ? "#c8a96e" : "rgba(200,169,110,0.2)",
                  background: expandedFaq === idx ? "rgba(200,169,110,0.08)" : "rgba(200,169,110,0.03)",
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-opacity-50 transition-all"
                >
                  <h3 className="font-display font-semibold text-lg" style={{ color: "#f0e6d3" }}>
                    {faq.question}
                  </h3>
                  <div
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-transform duration-300"
                    style={{
                      background: "rgba(200,169,110,0.15)",
                      transform: expandedFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <span style={{ color: "#c8a96e" }}>▼</span>
                  </div>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-4 border-t" style={{ borderColor: "rgba(200,169,110,0.1)" }}>
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div
          className="max-w-3xl mx-auto p-12 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(139,105,20,0.05) 100%)",
            border: "1px solid rgba(200,169,110,0.2)",
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f0e6d3" }}>
            Ready to Join Vetdeploy?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Start your transformation today and unlock new opportunities for your military career.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-body font-semibold transition-all duration-200 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #c8a96e, #a07840)",
              color: "#0f1a2e",
              boxShadow: "0 4px 15px rgba(200,169,110,0.25)",
            }}
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}