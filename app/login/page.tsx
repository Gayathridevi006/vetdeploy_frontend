"use client";
import api from "@/lib/api";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Eye, EyeOff, Anchor } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   const result = await login(email, password);

  //   if (!result.success) {
  //     setError(result.message || "Authentication failed");
  //   } else {
  //     router.push("/dashboard");
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  try {
    const result = await login(email, password);

    if (!result.success) {
      toast.error(result.message || "Authentication failed");
      return;
    }

    toast.success("Login successful 🎉");

    // Check if transition profile exists
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get(`/transition/email/${user.email}`);

      if (res.data.exists) {
        router.push("/jobs");
      } else {
        router.push("/dashboard/transition");
      }

    } catch {
      router.push("/dashboard/transition");
    }

  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #020b18 0%, #041424 50%, #06192e 100%)",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Animated grid overlay */}
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
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 100, 180, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Corner decorations */}
      <span className="absolute top-6 left-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">
        ◈ NAVCOM-SYS
      </span>
      <span className="absolute top-6 right-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">
        CLASSIFIED ◈
      </span>
      <span className="absolute bottom-6 left-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">
        ◈ ENC-256-AES
      </span>
      <span className="absolute bottom-6 right-6 text-[#00b4ff] opacity-20 text-xs tracking-widest">
        SEC-LEVEL: TOP ◈
      </span>

      {/* Card */}
      <div
        className="relative w-full max-w-md mx-4"
        style={{
          background: "rgba(4, 20, 36, 0.92)",
          border: "1px solid rgba(0, 180, 255, 0.2)",
          boxShadow:
            "0 0 0 1px rgba(0, 180, 255, 0.05), 0 0 40px rgba(0, 100, 180, 0.15), inset 0 1px 0 rgba(0, 180, 255, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, transparent, #0077cc, #00b4ff, #0077cc, transparent)",
          }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
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
                  <Anchor className="w-7 h-7" style={{ color: "#00b4ff" }} />
                </div>
                <div
                  className="absolute -inset-1 opacity-20 blur-sm"
                  style={{
                    background: "#00b4ff",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
              </div>
            </div>

            
            <h1
              className="text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#e8f4ff", letterSpacing: "0.15em" }}
            >
              Welcome back!
            </h1>
           
          </div>

          {/* Divider */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ opacity: 0.3 }}
          >
            <div className="flex-1 h-px" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
            <Shield className="w-3 h-3" style={{ color: "#00b4ff" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(0, 180, 255, 0.4)" }} />
          </div>

         
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "rgba(0, 180, 255, 0.7)" }}
              >
                Email
              </Label>
              <div className="relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "rgba(0, 180, 255, 0.4)" }}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="pl-4 text-sm tracking-wider"
                  style={{
                    background: "rgba(0, 30, 60, 0.5)",
                    border: "1px solid rgba(0, 100, 180, 0.3)",
                    borderLeft: "none",
                    color: "#c8e8ff",
                    outline: "none",
                    caretColor: "#00b4ff",
                  }}
                  placeholder="officer@navy.mil"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "rgba(0, 180, 255, 0.7)" }}
              >
                Password
              </Label>
              <div className="relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "rgba(0, 180, 255, 0.4)" }}
                />
                

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pl-4 pr-10 text-sm tracking-wider"
                  style={{
                    background: "rgba(0, 30, 60, 0.5)",
                    border: "1px solid rgba(0, 100, 180, 0.3)",
                    borderLeft: "none",
                    color: "#c8e8ff",
                    caretColor: "#00b4ff",
                  }}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
                  style={{ color: "#00b4ff" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                
              </div>
              <a
                href="/signup"
                className="hover:underline transition-colors absolute right-10"
                style={{ color: "rgba(0, 180, 255, 0.7)" }}
              >
                Forget-password
              </a>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 tracking-[0.25em] uppercase text-xs font-bold relative overflow-hidden transition-all duration-200"
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
                    Authenticating...
                  </span>
                ) : (
                  "► Login"
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: "rgba(0, 180, 255, 0.35)" }}>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="hover:underline transition-colors"
                style={{ color: "rgba(0, 180, 255, 0.7)" }}
              >
                Signup
              </a>
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0, 180, 255, 0.2), transparent)",
          }}
        />

        {/* Status bar */}
        <div
          className="px-4 py-2 flex justify-between items-center"
          style={{
            background: "rgba(0, 10, 20, 0.5)",
            borderTop: "1px solid rgba(0, 180, 255, 0.08)",
          }}
        >
          <span className="text-xs" style={{ color: "rgba(0, 180, 255, 0.25)", fontSize: "10px" }}>
            SYS::AUTH_MODULE_v3.1
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "rgba(0, 255, 100, 0.5)", fontSize: "10px" }}>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ background: "#00ff64" }}
            />
            SECURE CHANNEL ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}