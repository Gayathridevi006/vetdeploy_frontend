"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Loader2, Building2, Briefcase, Phone, Mail, Target, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { formSchema } from "@/types/schema";

// ─── Schema ─────────────────────────────────────────────────────────────────


type FormValues = z.infer<typeof formSchema>;

// ─── Styled input class ──────────────────────────────────────────────────────

const inputClass =
  "bg-[#0d1f3c]/60 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-[#4f9cf9]/60 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md h-11 text-sm transition-colors";

const labelClass = "text-slate-300 text-xs font-semibold tracking-wide mb-1.5";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HiringPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recruiterType: undefined,
      phone: "",
      email: "",
    } as any,
  });

  const recruiterType = form.watch("recruiterType");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/hiring/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) console.warn(data.detail);
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 text-white"
      style={{
        background:
          "linear-gradient(160deg, #060e1f 0%, #091834 45%, #0c1e3e 100%)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow blob */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-150 h-100 pointer-events-none rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, #3b82f6 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative w-full max-w-175">

        {/* Header */}
        <div className=" ">



          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-sm font-medium mb-8 transition-all duration-200 group hover:gap-3"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800/60 border border-slate-700/50 group-hover:border-slate-500 group-hover:bg-slate-700/60 transition-all duration-200">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </span>
            Back to Dashboard
          </button>
        </div>
        <div className="mb-7">
          <h1
            className="text-3xl font-bold tracking-tight mb-1"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Hire Your Talents
          </h1>
          <p className="text-slate-400 text-sm">
            Register as a recruiter to access verified veteran profiles
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top accent */}
          <div className="h-0.75 w-full bg-linear-to-r from-[#3b82f6]/90 via-[#60a5fa]/60 to-[#3b82f6]/20" />

          <div className="p-7">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-[#3b82f6]/25 to-[#1d4ed8]/10 border border-[#3b82f6]/25 mb-4 shadow-lg shadow-blue-900/20">
                <Target className="w-6 h-6 text-[#60a5fa]" />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* ── Recruiter Type ── */}
                <FormField
                  control={form.control}
                  name="recruiterType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        I am a <span className="text-[#60a5fa]">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          {[
                            {
                              value: "company",
                              label: "Company",
                              icon: <Building2 className="w-4 h-4" />,
                            },
                            {
                              value: "consultant",
                              label: "Consultant",
                              icon: <Briefcase className="w-4 h-4" />,
                            },
                          ].map((opt) => {
                            const selected = field.value === opt.value;
                            return (
                              <label
                                key={opt.value}
                                htmlFor={`type-${opt.value}`}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 text-sm font-medium",
                                  selected
                                    ? "border-[#3b82f6]/70 bg-[#3b82f6]/15 text-[#93c5fd]"
                                    : "border-slate-600/50 bg-[#0d1f3c]/40 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                                )}
                              >
                                <RadioGroupItem
                                  value={opt.value}
                                  id={`type-${opt.value}`}
                                  className="sr-only"
                                />
                                <span
                                  className={cn(
                                    selected
                                      ? "text-[#60a5fa]"
                                      : "text-slate-500"
                                  )}
                                >
                                  {opt.icon}
                                </span>
                                {opt.label}
                              </label>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* ── Company Fields ── */}
                {recruiterType === "company" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Separator className="bg-slate-700/40" />
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#60a5fa]/70">
                      Company Details
                    </p>

                    <FormField
                      control={form.control}
                      name={"companyName" as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Name of Organisation{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Tata Consultancy Services"
                              className={inputClass}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"recruiterName" as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Name of Recruiter{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Full name"
                              className={inputClass}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"designation" as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Designation{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. HR Manager / Talent Acquisition"
                              className={inputClass}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* ── Consultant Fields ── */}
                {recruiterType === "consultant" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Separator className="bg-slate-700/40" />
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#60a5fa]/70">
                      Consultancy Details
                    </p>

                    <FormField
                      control={form.control}
                      name={"consultantOrg" as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Name of Consultancy{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. ABC Staffing Solutions"
                              className={inputClass}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={"consultantLocation" as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Organisation Location{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="City, State"
                              className={inputClass}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* ── Common Fields ── */}
                {recruiterType && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <Separator className="bg-slate-700/40" />
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#60a5fa]/70">
                      Contact Details
                    </p>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Phone <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <Input
                                {...field}
                                placeholder="+91 98765 43210"
                                className={cn(inputClass, "pl-9")}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Work Email ID{" "}
                            <span className="text-[#60a5fa]">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="you@company.com"
                                className={cn(inputClass, "pl-9")}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || !recruiterType}
                  className="w-full h-12 rounded-xl font-semibold tracking-wide text-sm mt-2 transition-all duration-200 disabled:opacity-40"
                  style={{
                    background:
                      loading || !recruiterType
                        ? "#1e3a5f"
                        : "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)",
                    color: "white",
                    boxShadow:
                      !loading && recruiterType
                        ? "0 4px 20px rgba(59,130,246,0.35)"
                        : "none",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering…
                    </>
                  ) : (
                    "Register →"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          Fields marked <span className="text-[#60a5fa]">*</span> are required
        </p>
      </div>
    </div>
  );
}