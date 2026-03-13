"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/home/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import api from "@/lib/api";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface TransitionProfile {
  name: string;
  email: string;
  dob: string;
  category?: string;
  rank?: string;
  role?: string;
  jobProfile: string;
  serviceNo: string;
  certification?: string;
  qualification: string;
  place: string;
  state: string;
  resume: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [transitionProfile, setTransitionProfile] = useState<TransitionProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchTransitionProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/transition/email/${user?.email}`);

      if (response.data.exists) {
        setTransitionProfile(response.data.profile);
      } else {
        setTransitionProfile(null);
      }

      setError(null);

    } catch (err) {
      console.error("Failed to fetch transition profile:", err);
      setError("Could not load transition profile");
      setTransitionProfile(null);
    } finally {
      setLoading(false);
    }
  };

  if (user?.email) {
    fetchTransitionProfile();
  }

}, [user?.email]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8" style={{ background: "#060d1a" }}>
        <div className="max-w-4xl mx-auto">
          {/* User Info Card */}
          <div
            className="rounded-2xl border p-8 mb-8"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              borderColor: "rgba(200,169,110,0.2)",
            }}
          >
            <h1 className="text-4xl font-bold mb-6" style={{ color: "#f0e6d3" }}>
              Your Profile
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "rgba(200,169,110,0.1)" }}>
                <span className="text-slate-400">Name</span>
                <span className="font-semibold text-white">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "rgba(200,169,110,0.1)" }}>
                <span className="text-slate-400">Email</span>
                <span className="font-semibold text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center" style={{ borderColor: "rgba(200,169,110,0.1)" }}>
                <span className="text-slate-400">Role</span>
                <span className="font-semibold text-white capitalize">{user?.role}</span>
              </div>
            </div>
          </div>

          {/* Transition Profile Section */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#c8a96e" }} />
              <span className="ml-2 text-slate-400">Loading transition profile...</span>
            </div>
          ) : error ? (
            <div
              className="rounded-2xl border p-8 mb-8 flex items-start gap-4"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(200,169,110,0.2)",
              }}
            >
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                <p className="text-slate-400">{error}</p>
              </div>
            </div>
          ) : transitionProfile ? (
            <div
              className="rounded-2xl border p-8 mb-8"
              style={{
                background: "linear-gradient(180deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.04) 100%)",
                borderColor: "rgba(76, 175, 80, 0.3)",
              }}
            >
              <div className="flex items-start gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-green-300 mb-1">Transition Profile Created</h2>
                  <p className="text-slate-400">Your transition profile has been successfully saved</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-300 uppercase tracking-wider text-xs" style={{ color: "#c8a96e" }}>
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Service Number", value: transitionProfile.serviceNo },
                      { label: "Rank", value: transitionProfile.rank || "N/A" },
                      { label: "Job Profile", value: transitionProfile.jobProfile },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Location */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-300 uppercase tracking-wider text-xs" style={{ color: "#c8a96e" }}>
                    Qualifications & Location
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Qualification", value: transitionProfile.qualification },
                      { label: "Certification", value: transitionProfile.certification || "N/A" },
                      { label: "Place", value: transitionProfile.place },
                      { label: "State", value: transitionProfile.state },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category & Role */}
              {(transitionProfile.category || transitionProfile.role) && (
                <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(200,169,110,0.1)" }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {transitionProfile.category && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Category</p>
                        <p className="text-white font-medium">{transitionProfile.category}</p>
                      </div>
                    )}
                    {transitionProfile.role && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Role</p>
                        <p className="text-white font-medium">{transitionProfile.role}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <Link
                  href="/dashboard/transition"
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #c8a96e, #a07840)",
                    color: "#0f1a2e",
                  }}
                >
                  Update Profile
                </Link>
                <Link
                  href="/jobs"
                  className="px-6 py-3 rounded-lg font-semibold text-sm border"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    color: "#c8a96e",
                  }}
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border p-8 mb-8"
              style={{
                background: "linear-gradient(180deg, rgba(200,169,110,0.08) 0%, rgba(200,169,110,0.04) 100%)",
                borderColor: "rgba(200,169,110,0.2)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#f0e6d3" }}>
                Get Started
              </h2>
              <p className="text-slate-400 mb-6">
                You haven't created a transition profile yet. Choose what you'd like to do:
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard/transition"
                  className="flex-1 px-6 py-4 rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg text-center"
                  style={{
                    background: "linear-gradient(135deg, #c8a96e, #a07840)",
                    color: "#0f1a2e",
                  }}
                >
                  Start Your Transition
                </Link>
                <Link
                  href="/dashboard/hiring"
                  className="flex-1 px-6 py-4 rounded-lg font-semibold text-sm border text-center transition-all duration-200 hover:border-opacity-100"
                  style={{
                    borderColor: "rgba(200,169,110,0.3)",
                    color: "#c8a96e",
                  }}
                >
                  Hire Leader
                </Link>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="flex gap-4">
            <button
              onClick={() => logout()}
              className="px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200"
              style={{
                borderColor: "rgba(200,169,110,0.3)",
                color: "#c8a96e",
              }}
            >
              Logout
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg font-semibold text-sm border transition-all duration-200"
              style={{
                borderColor: "rgba(200,169,110,0.3)",
                color: "#c8a96e",
              }}
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
