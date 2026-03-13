"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/home/Navbar";
import { Link } from "lucide-react";

export default function JobsPage() {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("India");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async () => {
    try {
      setLoading(true);

      const res = await api.post("/recommend-jobs", {
        keyword,
        location,
      });

      setJobs(res.data.jobs || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#071428] via-[#0b2045] to-[#0f1e3a] text-white py-12">

        <div className="max-w-4xl mx-auto px-6">

          {/* Back to dashboard */}

          <Link
            href="/dashboard"
            className="text-sm text-[#c8a96e] hover:underline"
          >
            ← Dashboard
          </Link>


        {/* Title */}

        <h1 className="text-3xl font-bold text-center mb-8">
          Veteran Job Recommendations
        </h1>

        {/* Filters */}

        <div className="flex gap-3 mb-8">

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword (Operations Manager)"
            className="flex-1 px-4 py-2 rounded-md bg-[#0d1f3c] border border-slate-600 text-white placeholder:text-slate-400"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="flex-1 px-4 py-2 rounded-md bg-[#0d1f3c] border border-slate-600 text-white placeholder:text-slate-400"
          />

          <button
            onClick={searchJobs}
            className="px-5 py-2 bg-[#c8a96e] text-black rounded-md font-semibold"
          >
            Search
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <p className="text-center text-slate-400">
            Loading jobs...
          </p>
        )}

        {/* Jobs */}

        <div className="space-y-4">

          {jobs.map((job, i) => (

            <div
              key={i}
              className="bg-white/5 border border-slate-700 p-5 rounded-lg backdrop-blur-sm hover:border-[#c8a96e] transition"
            >

              <h2 className="text-lg font-semibold">
                {job.title}
              </h2>

              <p className="text-[#c8a96e]">
                {job.company}
              </p>

              <p className="text-slate-400">
                {job.location}
              </p>

              <a
                href={job.link}
                target="_blank"
                className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm"
              >
                Apply Job
              </a>

            </div>

          ))}

        </div>

      </div>

    </div>

    </>
  );
}