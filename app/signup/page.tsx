"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, Anchor, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { IndiaPhoneInput } from "@/components/IndiaPhoneInput";
import { usePathname } from "next/navigation";
const ROLES = [
  { value: "user", label: "User" },
];

export default function SignupForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //   const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const hideGetStarted =
  pathname === "/login" ||
  pathname === "/signup";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Access codes do not match");
      return;
    }
    if (!role) {
      toast.error("role assignment is required");
      return;
    }


    try {
      const result = await register(name, email, phone, password, role);

      if (!result.success) {
        toast.error(result.message || "Authentication failed");
        return;
      }
      toast.success(result.message || "Login successful 🎉");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(0, 30, 60, 0.5)",
    border: "1px solid rgba(0, 100, 180, 0.3)",
    borderLeft: "none",
    color: "#c8e8ff",
    caretColor: "#00b4ff",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{
        background: "linear-gradient(135deg, #020b18 0%, #041424 50%, #06192e 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 180, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 80, 160, 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Corner labels */}
      <span className="absolute top-6 left-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">◈ NAVCOM-REG</span>
      <span className="absolute top-6 right-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">RESTRICTED ◈</span>
      <span className="absolute bottom-6 left-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">◈ FORM-NV-447</span>
      <span className="absolute bottom-6 right-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">AUTH-LEVEL: A ◈</span>

      {/* Card */}
      <div
        className="relative w-full max-w-[700PX] mx-4"
        style={{
          background: "rgba(4, 20, 36, 0.93)",
          border: "1px solid rgba(0, 180, 255, 0.2)",
          boxShadow:
            "0 0 0 1px rgba(0, 180, 255, 0.05), 0 0 40px rgba(0, 100, 180, 0.15), inset 0 1px 0 rgba(0, 180, 255, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top accent */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, #0077cc, #00b4ff, #0077cc, transparent)" }} />

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    background: "rgba(0, 119, 204, 0.1)",
                    border: "1px solid rgba(0, 180, 255, 0.3)",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <UserPlus className="w-7 h-7" style={{ color: "#00b4ff" }} />
                </div>
                <div
                  className="absolute -inset-1 opacity-20 blur-sm"
                  style={{ background: "#00b4ff", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                />
              </div>
            </div>
            <div className="text-xs tracking-[0.3em] mb-1 " style={{ color: "#00b4ff" }}>
              SIGNU TO HAVE AN ACCOUNT
            </div>
            <h1 className="text-2xl font-bold uppercase" style={{ color: "#e8f4ff", letterSpacing: "0.15em" }}>
              Personnel Registration
            </h1>
            {/* <div className="text-xs mt-1 tracking-widest" style={{ color: "rgba(0, 180, 255, 0.5)" }}>
              — NEW CREDENTIAL REQUEST —
            </div> */}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5" style={{ opacity: 0.3 }}>
            <div className="flex-1 h-px" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
            <Anchor className="w-3 h-3" style={{ color: "#00b4ff" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
          </div>

          {/* {error && (
            <Alert className="mb-4" style={{ background: "rgba(180, 30, 30, 0.15)", border: "1px solid rgba(255, 80, 80, 0.3)", color: "#ff8080" }}>
              <AlertDescription className="text-xs tracking-wider uppercase">⚠ {error}</AlertDescription>
            </Alert>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-4 ">

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
                <Input
                  id="name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  required className="pl-4 text-sm tracking-wider"
                  style={inputStyle} placeholder="Lt. John A. Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                Email
              </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
                <Input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required className="pl-4 text-sm tracking-wider"
                  style={inputStyle} placeholder="officer@gmail.mil"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <IndiaPhoneInput
                value={phone}
                onChange={setPhone}
                inputStyle={inputStyle}
              />
            </div>

            {/* Role — native <select> fully styled to match the design system */}
            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                Rank / Assignment
              </Label>
              <div className="relative">
                {/* Left accent stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 z-10" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full h-10 pl-4 pr-8 text-sm tracking-wider appearance-none focus:outline-none focus:ring-0"
                  style={{
                    background: "rgba(0, 30, 60, 0.5)",
                    border: "1px solid rgba(0, 100, 180, 0.3)",
                    borderLeft: "none",
                    color: role ? "#c8e8ff" : "rgba(140, 190, 220, 0.45)",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                >
                  <option value="" disabled style={{ background: "#04141f", color: "rgba(140,190,220,0.45)" }}>
                    Select role...
                  </option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value} style={{ background: "#04141f", color: "#c8e8ff" }}>
                      {r.label}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(0, 180, 255, 0.5)" }}>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                Enter your Password
              </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
                <Input
                  id="password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required className="pl-4 pr-10 text-sm tracking-wider"
                  style={inputStyle} placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                  style={{ color: "#00b4ff" }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                Confirm Your Password
              </Label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
                <Input
                  id="confirm" type={showConfirm ? "text" : "password"} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required className="pl-4 pr-10 text-sm tracking-wider"
                  style={{
                    ...inputStyle,
                    color: confirmPassword && confirmPassword !== password ? "#ff8080" : "#c8e8ff",
                  }}
                  placeholder="Re-enter access code"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                  style={{ color: "#00b4ff" }}>
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs tracking-widest" style={{ color: "#ff6060" }}>⚠ CODES DO NOT MATCH</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit" disabled={loading}
                className="w-full h-11 tracking-[0.25em] uppercase text-xs font-bold transition-all duration-200"
                style={{
                  background: loading
                    ? "rgba(0, 80, 140, 0.5)"
                    : "linear-gradient(135deg, rgba(0, 80, 160, 0.8) 0%, rgba(0, 140, 220, 0.6) 100%)",
                  border: "1px solid rgba(0, 180, 255, 0.4)",
                  color: "#c8e8ff",
                  boxShadow: loading ? "none" : "0 0 20px rgba(0, 120, 200, 0.2)",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Request...
                  </span>
                ) : (
                  "Sigin Up"
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-xs" style={{ color: "rgba(0, 180, 255, 0.35)" }}>
              Already have an account?{" "}
              <a href="/login" className="hover:underline transition-colors" style={{ color: "rgba(0, 180, 255, 0.7)" }}>
                 Login 
              </a>
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.2), transparent)" }} />

        {/* Status bar */}
        <div className="px-4 py-2 flex justify-between items-center"
          style={{ background: "rgba(0, 10, 20, 0.5)", borderTop: "1px solid rgba(0, 180, 255, 0.08)" }}>
          <span style={{ color: "rgba(0, 180, 255, 0.25)", fontSize: "10px" }}>SYS::REG_MODULE_v3.1</span>
          <span className="flex items-center gap-1.5" style={{ color: "rgba(0, 255, 100, 0.5)", fontSize: "10px" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#00ff64" }} />
            ENCRYPTED TRANSMISSION
          </span>
        </div>
      </div>
    </div>
  );
}