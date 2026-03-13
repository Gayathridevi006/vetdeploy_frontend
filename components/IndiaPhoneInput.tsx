"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IndiaPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  inputStyle?: React.CSSProperties;
  error?: string;
}

export function IndiaPhoneInput({ value, onChange, inputStyle, error }: IndiaPhoneInputProps) {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip everything except digits
    const digits = e.target.value.replace(/\D/g, "");

    // Indian mobile numbers: 10 digits, starting with 6–9
    if (digits.length <= 10) {
      onChange(digits);
    }
  };

  const handleBlur = () => setTouched(true);

  // Validation
  const isValid  = /^[6-9]\d{9}$/.test(value);
  const showError = touched && value.length > 0 && !isValid;
  const showOk    = touched && isValid;

  // Format for display: XXXXX XXXXX
  const formatted = value
    ? value.slice(0, 5) + (value.length > 5 ? " " + value.slice(5) : "")
    : "";

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="phone"
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "rgba(0, 180, 255, 0.7)" }}
      >
        Contact Number
      </Label>

      <div className="relative flex">
        {/* Left accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 z-10"
          style={{ background: showError ? "rgba(255,80,80,0.7)" : showOk ? "rgba(0,220,130,0.7)" : "rgba(0, 180, 255, 0.4)" }}
        />

        {/* +91 prefix — locked, non-editable */}
        <div
          className="flex items-center gap-1.5 pl-4 pr-3 text-sm font-semibold tracking-wider select-none shrink-0 border-r"
          style={{
            ...inputStyle,
            borderRadius: "var(--radius) 0 0 var(--radius)",
            borderRight: "1px solid rgba(0,180,255,0.2)",
            color: "rgba(0,180,255,0.9)",
            cursor: "default",
            minWidth: 72,
          }}
        >
          {/* Indian flag */}
          <span className="text-base leading-none" aria-hidden>🇮🇳</span>
          <span>+91</span>
        </div>

        {/* Number input */}
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={formatted}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={11} /* 10 digits + 1 space */
          placeholder="98765 43210"
          autoComplete="tel-national"
          style={{
            ...inputStyle,
            borderRadius: "0 var(--radius) var(--radius) 0",
            borderLeft: "none",
            letterSpacing: "0.12em",
            color: showError ? "rgba(255,120,120,0.95)" : showOk ? "rgba(0,220,130,0.95)" : undefined,
          }}
          className="text-sm text-white tracking-wider flex-1"
        />

        {/* Status icon */}
        {touched && value.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
            {showOk    && <span style={{ color: "rgba(0,220,130,0.9)"  }}>✓</span>}
            {showError && <span style={{ color: "rgba(255,100,100,0.9)" }}>✗</span>}
          </div>
        )}
      </div>

      {/* Validation messages */}
      {showError && (
        <p className="text-xs mt-1" style={{ color: "rgba(255,100,100,0.8)" }}>
          {value.length < 10
            ? `${10 - value.length} more digit${10 - value.length !== 1 ? "s" : ""} needed`
            : "Indian mobile numbers start with 6, 7, 8, or 9"}
        </p>
      )}
      {showOk && (
        <p className="text-xs mt-1" style={{ color: "rgba(0,210,120,0.7)" }}>
          Valid Indian mobile number
        </p>
      )}
    </div>
  );
}