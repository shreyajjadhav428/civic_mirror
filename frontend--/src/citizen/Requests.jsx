import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCitizenRequests } from "../api/citizen.api";
import { useAuth } from "../context/AuthContext";
import { OFFICIAL_DEPARTMENTS, normalizeDepartment } from "../constants/departments";

function statusStyles(status) {
  const stLower = (status || "").toLowerCase();
  if (stLower.includes("resolved") || stLower.includes("completed")) {
    return {
      badge: "border-emerald-200 bg-emerald-50 text-[#008D78]",
      accent: "bg-[#008D78]",
      icon: "border-emerald-200 bg-emerald-50 text-[#008D78]",
    };
  }

  if (stLower.includes("progress")) {
    return {
      badge: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
      accent: "bg-[#2D7FF9]",
      icon: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
    };
  }

  return {
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    accent: "bg-amber-500",
    icon: "border-amber-200 bg-amber-50 text-amber-700",
  };
}

function RequestIcon({ status }) {
  const styles = statusStyles(status);

  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${styles.icon}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 3.5h7l4 4V21H7z" />
        <path d="M14 3.5V8h4" />
        <path d="M10 12h5M10 15.5h5M10 19h3" />
      </svg>
    </span>
  );
}

export default function Requests() {
  const { user } = useAuth();
  const [requestsList, setRequestsList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Reset visible pagination count when category filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory]);

  const filteredRequests = requestsList.filter((request) => {
    if (selectedCategory === "All") return true;
    return (request.category || "").toLowerCase() === selectedCategory.toLowerCase();
  });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const userId = user?.id || "user-citizen-1";
        
        // Fetch complaints directly from Supabase complaints table
        const reqRes = await getCitizenRequests(userId);
        if (isMounted && reqRes?.data) {
          const normalized = reqRes.data.map((c) => ({
            ...c,
            category: normalizeDepartment(c.category || c.department || c.title || c.id),
            status: (() => {
              const s = (c.status || "").toLowerCase();
              if (s.includes("resolved") || s.includes("completed")) return "Resolved";
              if (s.includes("progress")) return "In progress";
              return "Reported";
            })()
          }));
          setRequestsList(normalized);
        }
      } catch (err) {
        console.error("Error loading citizen complaints:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const openNewRequest = () => {
    navigate("/citizen");
  };

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* HEADER BANNER */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[2.5px] w-4 bg-[#2D7FF9] rounded-full inline-block" />
              CITIZEN WORKSPACE
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] tracking-tight">
              My <span className="text-[#2D7FF9]">Complaints & Requests</span>
            </h1>
            <p className="mt-2 text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              View and track all your registered civic complaints recorded directly in the municipal database.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openNewRequest}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2A] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#2D7FF9] transition-all cursor-pointer shadow-xs"
            >
              <span className="text-base leading-none">+</span>
              Ask AI / Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* UNIFIED REGISTERED COMPLAINTS SECTION */}
      <section className="space-y-4" aria-label="Your civic requests">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-b border-slate-200/60 pb-3.5">
          <span className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
            <span className="h-[2.5px] w-4 bg-slate-400 rounded-full" />
            REGISTERED CIVIC COMPLAINT TICKETS ({filteredRequests.length})
          </span>

          {/* CATEGORY SORT/FILTER DROPDOWN MENU */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
              Filter by Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#0D1B2A] shadow-2xs outline-none transition focus:border-[#2D7FF9] cursor-pointer"
            >
              <option value="All">All Categories ({requestsList.length})</option>
              {OFFICIAL_DEPARTMENTS.map((dept) => {
                const count = requestsList.filter(
                  (r) => (r.category || "").toLowerCase() === dept.name.toLowerCase()
                ).length;
                return (
                  <option key={dept.name} value={dept.name}>
                    {dept.icon} {dept.name} {count > 0 ? `(${count})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-base">
            {loading
              ? "Loading your submitted civic requests..."
              : selectedCategory !== "All"
              ? `No complaints found matching category "${selectedCategory}".`
              : "No civic complaints registered yet. Use the chat in Overview to report an issue!"}
          </div>
        ) : (
          <>
            {filteredRequests.slice(0, visibleCount).map((request) => {
              const styles = statusStyles(request.status);

              return (
                <article
                  key={request.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1.5 ${styles.accent}`}
                    aria-hidden="true"
                  />

                  <div className="p-6 sm:p-7 pl-7 sm:pl-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${styles.badge}`}
                          >
                            {request.status}
                          </span>

                          <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400">
                            {request.id}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {request.category || "General"}
                          </span>
                        </div>

                        <div className="mt-4 flex items-start gap-4">
                          <RequestIcon status={request.status} />

                          <div className="min-w-0">
                            <h2 className="text-lg sm:text-xl font-bold text-[#0D1B2A] leading-snug">
                              {request.title}
                            </h2>

                            <p className="mt-2 max-w-2xl text-base font-normal leading-relaxed text-slate-600">
                              {request.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-500">
                          <span>
                            <strong className="font-bold text-slate-800">
                              Location:
                            </strong>{" "}
                            {request.location}
                          </span>

                          <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
                            ·
                          </span>

                          <span>
                            <strong className="font-bold text-slate-800">
                              Submitted:
                            </strong>{" "}
                            {request.date}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="shrink-0 self-start rounded-xl border border-slate-200 bg-white px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0D1B2A] transition-all hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] cursor-pointer shadow-xs"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* SHOW MORE / SHOW LESS PAGINATION */}
            {filteredRequests.length > 10 && (
              <div className="flex justify-center pt-4">
                {visibleCount < filteredRequests.length ? (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="group flex items-center gap-2.5 rounded-xl border border-[#2D7FF9] bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-[#2D7FF9] hover:bg-[#2D7FF9] hover:text-white transition-all shadow-xs cursor-pointer"
                  >
                    <span>Show More Requests</span>
                    <span className="rounded-full bg-[#2D7FF9]/10 px-2.5 py-0.5 text-xs font-bold text-[#2D7FF9] group-hover:bg-white group-hover:text-[#2D7FF9] transition">
                      +{filteredRequests.length - visibleCount}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleCount(10)}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
                  >
                    Show Less ↑
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* COMPLAINT DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#2D7FF9] uppercase block mb-1">
                  Complaint Code: {selectedRequest.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D1B2A]">
                  {selectedRequest.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-sm">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Status</span>
                <span className="font-bold text-[#0D1B2A] text-base">{selectedRequest.status}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Category</span>
                <span className="font-bold text-[#0D1B2A] text-base">{selectedRequest.category || "General"}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Location</span>
                <span className="font-bold text-[#0D1B2A] text-base">{selectedRequest.location || "Local Area"}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Submitted On</span>
                <span className="font-bold text-[#0D1B2A] text-base">{selectedRequest.date || "Recent"}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 space-y-1.5">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 block">Description</span>
              <p className="text-base font-normal text-slate-700 leading-relaxed">
                {selectedRequest.description}
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}