"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/types/data";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileMenu,  setMobileMenu]  = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const hideGetStarted =
  pathname === "/login" ||
  pathname === "/signup" ||
  pathname === "/jobs";

  const hideNavLinks =
  pathname === "/jobs" ||
  pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">

          <Image
            src="/vetdeploy-logo.png"
            alt="VetDeploy Logo"
            width={32}
            height={32}
          />

            <span
              className="font-display text-xl font-bold tracking-tight transition-colors"
              style={{ color: scrolled ? "#0f172a" : "#0f1a2e" }}
            >
            Vetdeploy
            </span>

        </div>

        {/* Desktop links */}
          {!hideNavLinks && (
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  className="nav-link font-body text-sm text-slate-600 font-medium"
                >
                  {l}
                </a>
              ))}
            </div>
          )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              href="/dashboard/profile"
              className="font-body text-sm font-semibold px-4 py-3 rounded-full transition-all duration-200 hover:shadow-lg"
              style={{
                background:  "linear-gradient(135deg, #c8a96e, #a07840)",
                color:       "#0f1a2e",
                boxShadow:   "0 4px 15px rgba(200,169,110,0.25)",
              }}
            >
              {user?.name?.[0].toUpperCase() || "Profile"}
            </Link>
          ): !hideGetStarted && (
          <Link
            href="/signup"
              className="font-body text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              style={{
                background:  "linear-gradient(135deg, #c8a96e, #a07840)",
                color:       "#0f1a2e",
                boxShadow:   "0 4px 15px rgba(200,169,110,0.25)",
              }}
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 bg-slate-300 transition-all"
              style={{
                transform:
                  mobileMenu && i === 0 ? "rotate(45deg) translate(4px,4px)"  :
                  mobileMenu && i === 1 ? "scaleX(0)"                          :
                  mobileMenu && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div
          className="md:hidden px-6 pb-6 pt-2 border-t border-white/5"
          style={{ background: "rgba(6,13,26,0.97)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="block py-3 text-slate-300 text-sm border-b border-white/5 font-body"
              onClick={() => setMobileMenu(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            {isAuthenticated ? (
            <>
              <Link
                href="/dashboard/profile"
                className="flex-1 text-center font-body font-semibold py-3 rounded-lg text-sm border border-white/10 text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                {user?.name || "Profile"}
              </Link>
              <button
                className="flex-1 text-center font-body font-semibold py-3 rounded-lg text-sm border border-white/10 text-slate-300"
                onClick={() => {
                  logout();
                  setMobileMenu(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex-1 text-center font-body font-semibold py-3 rounded-lg text-sm border border-white/10 text-slate-300"
                onClick={() => setMobileMenu(false)}
              >
                Sign In
              </Link>
              <Link
                href={isAuthenticated ? "/dashboard/profile" : "/login"}
                className="flex-1 text-center font-body font-semibold py-3 rounded-lg text-sm"
                style={{ background: "linear-gradient(135deg, #c8a96e, #a07840)", color: "#0f1a2e" }}
                onClick={() => setMobileMenu(false)}
              >
                Get Started
              </Link>
            </>
          )}
          </div>
        </div>
      )}
    </nav>
  );
}