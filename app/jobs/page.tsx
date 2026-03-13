"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/home/Navbar";
import { Home, MapPin, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobsPage() {

  const router = useRouter();

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

      <div className="min-h-screen bg-[#e9eff8] pt-24 pb-12">

        <div className="max-w-5xl mx-auto px-6">

          {/* Back Button */}

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:border-[#c8a96e] hover:text-[#c8a96e] transition"
          >
            <Home size={16} />
            Back to Home
          </button>


          {/* Title */}

          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Veteran Job Recommendations
            </h1>
            <p className="text-slate-500">
              Discover civilian opportunities tailored for veterans
            </p>
          </div>


          {/* Search Card */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-10 flex flex-col md:flex-row gap-3">

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keyword (Operations Manager)"
              className="flex-1 px-4 py-2 rounded-md border border-slate-300"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="flex-1 px-4 py-2 rounded-md border border-slate-300"
            />

            <button
              onClick={searchJobs}
              className="px-6 py-2 bg-[#c8a96e] text-black rounded-md font-semibold hover:opacity-90"
            >
              Search
            </button>

          </div>


          {/* Loading */}

          {loading && (
            <div className="text-center text-slate-500">
              Loading jobs...
            </div>
          )}


          {/* Empty State */}

          {!loading && jobs.length === 0 && (
            <div className="text-center text-slate-500">
              No jobs found
            </div>
          )}


          {/* Jobs List */}

          <div className="space-y-5">

            {jobs.map((job, i) => (

              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-lg font-semibold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="text-[#a07c36] font-medium mt-1">
                      {job.company}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                      <MapPin size={14} />
                      {job.location}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                      <Briefcase size={14} />
                      Veteran Friendly Role
                    </div>

                  </div>


                  {/* Apply Button */}

                  <a
                    href={job.link}
                    target="_blank"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
                  >
                    Apply
                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}