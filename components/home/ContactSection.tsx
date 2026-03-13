"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#04090f" }}>
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-4" style={{ color: "#f0e6d3" }}>
          Contact Us
        </h2>

        <p className="text-slate-400 mb-10">
          Need help transitioning from military to civilian career?
        </p>

        {/* OPTIONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">

          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg font-semibold inline-block"
            style={{
              background: "linear-gradient(135deg,#c8a96e,#a07840)",
              color: "#0f1a2e",
            }}
          >
            Contact Us
          </Link>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-3 rounded-lg border font-semibold"
            style={{
              borderColor: "rgba(200,169,110,0.4)",
              color: "#c8a96e",
            }}
          >
            Quick Form
          </button>

          <Link
            href="/contact"
            className="px-8 py-3 rounded-lg border font-semibold"
            style={{
              borderColor: "rgba(200,169,110,0.4)",
              color: "#c8a96e",
            }}
          >
            Open Full Contact Page
          </Link>

        </div>

        {/* QUICK FORM */}
        {showForm && (
          <form
            className="max-w-xl mx-auto space-y-4 bg-slate-900 p-8 rounded-xl border"
            style={{ borderColor: "rgba(200,169,110,0.2)" }}
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-slate-800 border border-white/10"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-slate-800 border border-white/10"
            />

            <textarea
              rows={4}
              placeholder="Message"
              className="w-full p-3 rounded bg-slate-800 border border-white/10"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold"
              style={{
                background: "linear-gradient(135deg,#c8a96e,#a07840)",
                color: "#0f1a2e",
              }}
            >
              Send Message
            </button>

          </form>
        )}

        {/* CONTACT INFO */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">

          <div className="p-6 border border-white/10 rounded-lg">
            <Mail className="text-[#c8a96e] mb-2" />
            <p className="text-white font-semibold">Email</p>
            <p className="text-slate-400">support@vetdeploy.com</p>
          </div>

          <div className="p-6 border border-white/10 rounded-lg">
            <Phone className="text-[#c8a96e] mb-2" />
            <p className="text-white font-semibold">Phone</p>
            <p className="text-slate-400">+91 9036524348</p>
          </div>

          <div className="p-6 border border-white/10 rounded-lg">
            <MapPin className="text-[#c8a96e] mb-2" />
            <p className="text-white font-semibold">Location</p>
            <p className="text-slate-400">Bangalore, India</p>
          </div>

        </div>

      </div>
    </section>
  );
}