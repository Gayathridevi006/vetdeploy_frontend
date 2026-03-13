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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Upload, FileText, AlertCircle, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { formTransitionSchema } from "@/types/schema";

// ─── Schema ────────────────────────────────────────────────────────────────


type FormValues = z.infer<typeof formTransitionSchema>;

// ─── Data ───────────────────────────────────────────────────────────────────

const ARMED_FORCES = ["Navy", "Army", "Air Force"];

const RANKS = ["Captain", "Commander", "Major", "Colonel", "Lieutenant", "Brigadier", "General"];

const QUALIFICATIONS = [
  "10th", "12th", "Diploma", "ITI", "B.A", "B.Com", "B.Sc",
  "B.Tech / B.E", "M.A", "M.Com", "M.Sc", "M.Tech / M.E",
  "MBA", "PG Diploma", "PhD", "Other",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

// ─── Section Header ─────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#c8a96e] mb-1">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      <div className="mt-2 h-px bg-linear-to-r from-[#c8a96e]/40 to-transparent" />
    </div>
  );
}

// ─── Field wrapper for consistent styling ───────────────────────────────────

function FieldRow({ children, cols = 1 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div className={cn("grid gap-4 mb-4", cols === 2 && "grid-cols-2")}>
      {children}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TransitionPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeOption, setResumeOption] = useState<"upload" | "ats" | "none" | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formTransitionSchema),
    defaultValues: {
      commissioned: undefined,
      armedForces: "",
      rank: "",
      // backend required additions
      name: user?.name ?? "",
      email: user?.email ?? "",
      dob: "",
      category: "",
      role: "",
      certification: "",
      qualification: "",
      institute: "",
      place: "",
      state: "",
      resume: undefined,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

   const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const payload = {
        name: values.name,
        email: user?.email,   // add this
        dob: values.dob,
        category: values.category || null,
        rank: values.rank || null,
        role: values.role || null,
        jobProfile: values.jobProfile,
        serviceNo: values.serviceNo,
        certification: values.certification || "",
        qualification: values.qualification,
        place: values.place,
        state: values.state,
        resume: resumeOption || values.resume || "",
      };

      await api.post("transition", payload);

      localStorage.setItem("transitionComplete", "true");

      router.push("/jobs");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-[#0d1f3c]/60 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-[#c8a96e]/60 focus:ring-0 rounded-md h-10 text-sm transition-colors";

  const selectTriggerClass =
    "bg-[#0d1f3c]/60 border-slate-600/50 text-white focus:border-[#c8a96e]/60 focus:ring-0 rounded-md h-10 text-sm [&>span]:text-white data-[placeholder]:text-slate-500";

  const labelClass = "text-slate-300 text-xs font-medium tracking-wide mb-1.5";

  return (
    <div
      className="min-h-screen text-white flex items-start justify-center py-12 px-4"
      style={{
        background: "linear-gradient(160deg, #071428 0%, #0b2045 40%, #0f1e3a 100%)",
      }}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-175">
        {/* Header */}
        <div className=" mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white text-sm font-medium mb-8 transition-all duration-200 group hover:gap-3"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800/60 border border-slate-700/50 group-hover:border-slate-500 group-hover:bg-slate-700/60 transition-all duration-200">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </span>
            Back to Dashboard
          </button>

          <div className="text-center">
            <h1
              className="text-3xl font-bold tracking-tight mb-1"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Basic Information
            </h1>
            <p className="text-slate-400 text-sm">
              Welcome,{" "}
              <span className="text-[#c8a96e] font-medium">{user?.name}</span>.
              Complete your service profile below.
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#c8a96e]/80 via-[#e8c98e]/60 to-[#c8a96e]/20" />

          <div className="p-8">
            <Form {...form}>
              <div className="flex item-center justify-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#c8a96e]/20 to-[#c8a96e]/5 border border-[#c8a96e]/30 mb-4">
                  <span className="text-2xl">🪖</span>
                </div>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* ── Section 1: Service Details ── */}
                <div>
                  <SectionHeader
                    title="Service Details"
                    subtitle="Your military service information"
                  />

                  {/* Commissioned */}
                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="commissioned"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Commissioned <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex gap-6"
                            >
                              {["yes", "no"].map((val) => (
                                <div key={val} className="flex items-center gap-2">
                                  <RadioGroupItem
                                    value={val}
                                    id={`commissioned-${val}`}
                                    className="border-slate-500 text-[#c8a96e] data-[state=checked]:border-[#c8a96e]"
                                  />
                                  <Label
                                    htmlFor={`commissioned-${val}`}
                                    className="text-slate-300 text-sm capitalize cursor-pointer"
                                  >
                                    {val}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FieldRow cols={2}>
                    {/* Armed Forces */}
                    <FormField
                      control={form.control}
                      name="armedForces"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Armed Forces <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select branch" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1f3c] border-slate-600 text-white">
                              {ARMED_FORCES.map((f) => (
                                <SelectItem key={f} value={f.toLowerCase().replace(" ", "")} className="focus:bg-[#c8a96e]/10 focus:text-white">
                                  {f}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Rank */}
                    <FormField
                      control={form.control}
                      name="rank"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Rank <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select rank" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1f3c] border-slate-600 text-white">
                              {RANKS.map((r) => (
                                <SelectItem key={r} value={r.toLowerCase()} className="focus:bg-[#c8a96e]/10 focus:text-white">
                                  {r}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow cols={2}>
                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Category</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Combat, Technical" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Role */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Role</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Your service role" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow cols={2}>
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Full Name <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter full name" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                    <FormLabel className={labelClass}>Email</FormLabel>
                    <FormControl>
                      <Input value={user?.email} disabled className={inputClass} />
                    </FormControl>
                  </FormItem>

                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Date of Birth <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className={cn(inputClass, "date-input")} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow cols={2}>
                    {/* DOJ */}
                    <FormField
                      control={form.control}
                      name="doj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Date of Joining <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className={cn(inputClass, "date-input")} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* DOD */}
                    <FormField
                      control={form.control}
                      name="dod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Date of Discharge <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className={cn(inputClass, "date-input")} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow cols={2}>
                    {/* Years */}
                    <FormField
                      control={form.control}
                      name="years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Years of Service <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="number" {...field} placeholder="e.g. 15" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Service No */}
                    <FormField
                      control={form.control}
                      name="serviceNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Service No <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. IC-12345" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow cols={2}>
                    {/* Job Profile */}
                    <FormField
                      control={form.control}
                      name="jobProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Job Profile / Trade <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Commandant / CHM / Driver" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>
                </div>

                <Separator className="bg-slate-700/50" />

                {/* ── Section 2: Education ── */}
                <div>
                  <SectionHeader
                    title="Education & Certification"
                    subtitle="Academic qualifications and professional certifications"
                  />

                  <FieldRow cols={2}>
                    {/* Qualification */}
                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Qualification <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select qualification" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1f3c] border-slate-600 text-white max-h-60">
                              {QUALIFICATIONS.map((q) => (
                                <SelectItem key={q} value={q} className="focus:bg-[#c8a96e]/10 focus:text-white">
                                  {q}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Certification */}
                    <FormField
                      control={form.control}
                      name="certification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Certification</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. PMP, Six Sigma" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>

                  <FieldRow>
                    {/* Institute */}
                    <FormField
                      control={form.control}
                      name="institute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>University / School / Institute</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Name of institution" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>
                </div>

                <Separator className="bg-slate-700/50" />

                {/* ── Section 3: Location ── */}
                <div>
                  <SectionHeader title="Location" subtitle="Current place of residence" />

                  <FieldRow cols={2}>
                    {/* Place */}
                    <FormField
                      control={form.control}
                      name="place"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            Place <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="City / Town" className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* State */}
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>
                            State <span className="text-[#c8a96e]">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className={selectTriggerClass}>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0d1f3c] border-slate-600 text-white max-h-60">
                              {INDIAN_STATES.map((s) => (
                                <SelectItem key={s} value={s} className="focus:bg-[#c8a96e]/10 focus:text-white">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </FieldRow>
                </div>

                <Separator className="bg-slate-700/50" />

                {/* ── Section 4: Resume ── */}
                <div>
                  <SectionHeader title="Resume" subtitle="Upload or generate your resume" />

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className={labelClass}>
                          Do you have a resume? <span className="text-[#c8a96e]">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            {["yes", "no"].map((val) => (
                              <div key={val} className="flex items-center gap-2">
                                <RadioGroupItem
                                  value={val}
                                  id={`resume-${val}`}
                                  className="border-slate-500 text-[#c8a96e] data-[state=checked]:border-[#c8a96e]"
                                />
                                <Label
                                  htmlFor={`resume-${val}`}
                                  className="text-slate-300 text-sm capitalize cursor-pointer"
                                >
                                  {val}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Resume action tiles */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        key: "none",
                        icon: <AlertCircle className="w-4 h-4" />,
                        label: "No Resume",
                        desc: "Skip for now",
                      },
                      {
                        key: "ats",
                        icon: <FileText className="w-4 h-4" />,
                        label: "ATS Resume",
                        desc: "Create ATS-optimised",
                      },
                      {
                        key: "upload",
                        icon: <Upload className="w-4 h-4" />,
                        label: "Upload",
                        desc: "Upload your own",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setResumeOption(opt.key as "upload" | "ats" | "none")}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200 text-xs",
                          resumeOption === opt.key
                            ? "border-[#c8a96e]/60 bg-[#c8a96e]/10 text-[#c8a96e]"
                            : "border-slate-600/50 bg-[#0d1f3c]/40 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                        )}
                      >
                        {opt.icon}
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-[10px] opacity-70">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  {resumeOption === "upload" && (
                    <div className="mt-3 border border-dashed border-slate-600 rounded-xl p-5 text-center text-slate-400 text-xs bg-[#0d1f3c]/30 cursor-pointer hover:border-[#c8a96e]/40 transition-colors">
                      <Upload className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                      Click to browse or drag & drop your resume (PDF, DOCX)
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl font-semibold tracking-wide text-sm transition-all duration-200"
                  style={{
                    background: loading
                      ? "#374151"
                      : "linear-gradient(135deg, #c8a96e 0%, #e8c98e 50%, #c8a96e 100%)",
                    color: loading ? "#9ca3af" : "#0f172a",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving Profile…
                    </>
                  ) : (
                    "Save Profile →"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4">
          Fields marked <span className="text-[#c8a96e]">*</span> are required
        </p>
      </div>

      {/* Inline styles for date input calendar icon color */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  );
}