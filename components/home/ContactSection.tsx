"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#cfdef0" }}>
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-4 text-slate-900">
          Contact Us
        </h2>

        <p className="text-slate-600 mb-10">
          Need help transitioning from military to civilian career?
        </p>

        {/* OPTIONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">

          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg font-semibold"
            style={{
              background: "linear-gradient(135deg,#c8a96e,#a07840)",
              color: "#071831",
            }}
          >
            Contact Us
          </Link>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 rounded-lg border font-semibold"
            style={{
              background: "linear-gradient(135deg,#c8a96e,#a07840)",
              borderColor: "#d6dbe3",
              color: "#1e293b",
            }}
          >
            Quick Form
          </button>

          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border font-semibold"
            style={{
              background: "linear-gradient(135deg,#c8a96e,#a07840)",
              borderColor: "#d6dbe3",
              color: "#1e293b",
            }}
          >
            Open Full Contact Page
          </Link>

        </div>

        {/* QUICK FORM */}
        {showForm && (
          <form
            className="max-w-xl mx-auto space-y-4 bg-white p-8 rounded-xl border"
            style={{
              borderColor: "#e6eaf0",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded border border-slate-200"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-slate-200"
            />

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full p-3 rounded border border-slate-200"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold"
              style={{
                background: "linear-gradient(135deg,#c8a96e,#a07840)",
                color: "#071831",
              }}
            >
              Send Message
            </button>

          </form>
        )}

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">

      <div
        className="p-7 rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          borderColor: "#dbe3ef",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
        }}
      >
        <Mail className="text-[#c8a96e] mb-3" size={28} />
        <p className="text-slate-900 font-semibold text-lg">Email</p>
        <p className="text-slate-600">support@vetdeploy.com</p>
      </div>

      <div
        className="p-7 rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          borderColor: "#dbe3ef",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
        }}
      >
        <Phone className="text-[#c8a96e] mb-3" size={28} />
        <p className="text-slate-900 font-semibold text-lg">Phone</p>
        <p className="text-slate-600">+91 9036524348</p>
      </div>

      <div
        className="p-7 rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          borderColor: "#dbe3ef",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
        }}
      >
        <MapPin className="text-[#c8a96e] mb-3" size={28} />
        <p className="text-slate-900 font-semibold text-lg">Location</p>
        <p className="text-slate-600">Bangalore, India</p>
      </div>

    </div>

      </div>
    </section>
  );
}