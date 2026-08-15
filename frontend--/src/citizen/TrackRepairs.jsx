import { useMemo, useState, useEffect } from "react";
import { getCitizenRequests } from "../api/citizen.api";
import { useAuth } from "../context/AuthContext";

const steps = ["Reported", "In progress", "Resolved"];

function statusStyles(status) {
  const stLower = (status || "").toLowerCase();
  if (stLower.includes("resolved") || stLower.includes("completed")) {
    return "border-[#BFE9DE] bg-[#E9F8F4] text-[#087F6A]";
  }

  if (stLower.includes("progress")) {
    return "border-[#C9DFFF] bg-[#EEF5FF] text-[#2864A8]";
  }

  return "border-[#D9E5F0] bg-[#F3F7FA] text-[#5F7489]";
}

function getStepColor(step, index, currentStep) {
  if (index < currentStep) {
    return {
      circle: "border-[#00A68E] bg-[#00A68E] text-white",
      line: "bg-[#00A68E]",
    };
  }

  if (index === currentStep) {
    return {
      circle: "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]",
      line: "bg-[#DCE6EF]",
    };
  }

  return {
    circle: "border-[#D6E1EB] bg-white text-[#9AAAB9]",
    line: "bg-[#DCE6EF]",
  };
}

function TimelineIcon({ status }) {
  if (status === "completed") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (status === "current") {
    return (
      <span className="h-3 w-3 rounded-full bg-[#2D7FF9]" />
    );
  }

  return (
    <span className="h-3 w-3 rounded-full border-[2.5px] border-[#B9C7D4]" />
  );
}

export default function TrackRepairs({ onNavigate }) {
  const { user } = useAuth();
  const [repairsList, setRepairsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  // Reset pagination when search or status filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, status]);

  useEffect(() => {
    let isMounted = true;

    async function loadRepairs() {
      setLoading(true);
      try {
        const res = await getCitizenRequests(user?.id || "user-citizen-1");
        if (isMounted && res?.data) {
          const formatted = res.data.map((c) => {
            const stRaw = c.status || "Pending";
            let normStatus = "Reported";
            let currentStep = 0;
            let progress = 25;

            if (stRaw.toLowerCase().includes("resolved") || stRaw.toLowerCase().includes("completed")) {
              normStatus = "Resolved";
              currentStep = 2;
              progress = 100;
            } else if (stRaw.toLowerCase().includes("progress")) {
              normStatus = "In progress";
              currentStep = 1;
              progress = 65;
            }

            return {
              id: c.id,
              title: c.title || `${c.category || "Civic"} Maintenance Request`,
              location: c.location || "Shanti Nagar, 110025",
              submittedDate: c.date || "Recent",
              status: normStatus,
              currentStep,
              category: c.category || "General Services",
              update: normStatus === "Resolved"
                ? "Repair work completed and verified by municipal team."
                : (normStatus === "In progress"
                  ? "Municipal maintenance team assigned and work is underway."
                  : "Request reported and routed to local department."),
              department: c.category ? `${c.category} Dept` : "Municipal Services",
              relatedProject: `${c.category || "Civic"} Infrastructure Operations`,
              projectProgress: progress,
              expectedResolution: normStatus === "Resolved"
                ? (c.date || "Completed")
                : normStatus === "In progress"
                ? "Under active repair"
                : "Pending departmental review",
              description: c.description || "No description provided.",
              timeline: [
                {
                  title: "Request submitted",
                  date: c.date || "Submitted",
                  description: "Civic request submitted and registered into database.",
                  status: "completed",
                },
                {
                  title: "Repair in progress",
                  date: normStatus === "Reported" ? "Pending" : "In Progress",
                  description: "Departmental team inspects and coordinates repair operation.",
                  status: currentStep >= 1 ? (currentStep === 1 ? "current" : "completed") : "upcoming",
                },
                {
                  title: "Expected resolution",
                  date: normStatus === "Resolved"
                    ? (c.date || "Completed")
                    : normStatus === "In progress"
                    ? "Under active repair"
                    : "Pending review",
                  description: "Issue expected to be completed and verified.",
                  status: currentStep === 2 ? "completed" : "upcoming",
                },
              ],
              nextSteps: [
                "Municipal department inspects the reported issue.",
                "Maintenance crew carries out necessary infrastructure repairs.",
                "Request is marked resolved upon completion.",
              ],
            };
          });

          setRepairsList(formatted);
        }
      } catch (err) {
        console.error("Error fetching repairs list from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadRepairs();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const filteredRepairs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return repairsList.filter((repair) => {
      const matchesStatus =
        status === "All" || repair.status === status;

      const matchesQuery =
        !query ||
        [
          repair.title,
          repair.location,
          repair.category,
          repair.id,
          repair.department,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [repairsList, searchQuery, status]);

  const summary = useMemo(() => ({
    active: repairsList.filter((r) => r.status !== "Resolved").length,
    progress: repairsList.filter((r) => r.status === "In progress").length,
    resolved: repairsList.filter((r) => r.status === "Resolved").length,
  }), [repairsList]);

  const summaryCards = [
    {
      label: "Active repairs",
      value: summary.active,
      detail: "Currently being handled",
      tone: "blue",
    },
    {
      label: "In progress",
      value: summary.progress,
      detail: "Work is underway",
      tone: "yellow",
    },
    {
      label: "Resolved",
      value: summary.resolved,
      detail: "Successfully completed",
      tone: "green",
    },
  ];

  return (
    <div className="space-y-10 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* =========================================================
          HEADER BANNER
      ========================================================= */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[2px] w-5 bg-[#2D7FF9] rounded-full inline-block" />
              CITIZEN WORKSPACE
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Track <span className="text-[#2D7FF9]">Repairs</span>
            </h1>
            <p className="mt-2 text-base font-medium text-[#59687A] max-w-2xl">
              Follow reported civic issues from review and assignment through to completion.
            </p>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 shadow-sm text-sm font-semibold">
              <span className="text-[#657386] block text-[11px] font-black uppercase tracking-wider mb-1">Active Monitoring</span>
              <span className="text-[#0D1B2A] font-black text-lg">{summary.active} Active Issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-SECTION HEADER LINE */}
      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
          ACTIVE MUNICIPAL REPAIRS & TIMELINE
        </span>
        <span className="text-xs font-bold text-slate-400">
          Realtime Progress Sync
        </span>
      </div>

      {/* SUMMARY */}
      <section
        className="mt-6 grid gap-5 sm:grid-cols-3"
        aria-label="Repair summary"
      >
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(13,27,42,0.07)]"
          >
            <div
              className={`absolute inset-x-0 top-0 h-[4px] ${
                card.tone === "blue"
                  ? "bg-[#2D7FF9]"
                  : card.tone === "yellow"
                    ? "bg-[#E9A81B]"
                    : "bg-[#00A68E]"
              }`}
            />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#70859A]">
                  {card.label}
                </p>

                <p className="mt-1.5 text-3xl font-extrabold tracking-[-0.04em] text-[#18324C]">
                  {String(card.value).padStart(2, "0")}
                </p>

                <p className="mt-1 text-xs font-medium text-[#718398]">
                  {card.detail}
                </p>
              </div>

              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  card.tone === "blue"
                    ? "bg-[#EEF5FF] text-[#2D7FF9]"
                    : card.tone === "yellow"
                      ? "bg-[#FFF5DC] text-[#B27A00]"
                      : "bg-[#E9F8F4] text-[#008B76]"
                }`}
              >
                {card.tone === "blue" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 17V9" />
                    <path d="M10 17V5" />
                    <path d="M16 17v-7" />
                    <path d="M22 17V3" />
                  </svg>
                )}

                {card.tone === "yellow" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v5" />
                    <path d="M12 16v5" />
                    <path d="M3 12h5" />
                    <path d="M16 12h5" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                )}

                {card.tone === "green" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* SEARCH + FILTER */}
      <section className="mt-8 rounded-2xl border border-[#DCE7F1] bg-white p-3.5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8193A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search repairs..."
              className="h-12 w-full rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] pl-11 pr-4 text-base font-medium text-[#18324C] outline-none transition-colors placeholder:text-[#91A0AF] focus:border-[#9BC5FF] focus:bg-white"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-4 text-base font-semibold text-[#486278] outline-none transition-colors focus:border-[#9BC5FF] sm:w-[200px]"
          >
            {["All", ...steps].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      {/* REPAIR CARDS */}
      <section className="mt-6 space-y-5" aria-label="Repairs">
        {filteredRepairs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-sm">
            {loading ? "Loading active municipal repairs..." : "No matching civic repairs found."}
          </div>
        ) : (
          <>
            {filteredRepairs.slice(0, visibleCount).map((repair) => (
              <article
                key={repair.id}
                className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-200 hover:-translate-y-1 hover:border-[#C7D9E9] hover:shadow-[0_12px_30px_rgba(13,27,42,0.065)]"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${statusStyles(
                            repair.status,
                          )}`}
                        >
                          {repair.status}
                        </span>

                        <span className="text-xs font-bold text-[#8A9AAA]">
                          {repair.id}
                        </span>

                        <span className="hidden text-xs text-[#B0BBC5] sm:inline">
                          ·
                        </span>

                        <span className="text-xs font-semibold text-[#8192A2]">
                          {repair.category}
                        </span>
                      </div>

                      <h2 className="mt-3.5 text-lg font-bold tracking-[-0.015em] text-[#18324C] sm:text-xl">
                        {repair.title}
                      </h2>

                      <p className="mt-1.5 text-[15px] leading-6 text-[#63768A]">
                        {repair.location}
                        <span className="mx-2 text-[#B3BEC8]">·</span>
                        Submitted {repair.submittedDate}
                      </p>
                    </div>

                    {/* VIEW DETAILS BUTTON */}
                    <button
                      type="button"
                      onClick={() => setSelectedRepair(repair)}
                      className="w-fit shrink-0 rounded-lg border border-[#C9D8E6] px-5 py-2.5 text-sm font-bold text-[#31516E] transition-all duration-150 hover:border-[#9BC5FF] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] cursor-pointer"
                    >
                      View details
                      <span className="ml-1.5">→</span>
                    </button>
                  </div>

                  {/* LATEST UPDATE */}
                  <div className="mt-6 flex gap-3.5 rounded-xl border border-[#E4EBF2] bg-[#F7F9FC] px-5 py-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#2D7FF9] shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8v4l2.5 2" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                        Latest update
                      </p>

                      <p className="mt-1 text-[15px] font-medium leading-6 text-[#536B80]">
                        {repair.update}
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-7">
                    <div className="flex items-center">
                      {steps.map((step, index) => {
                        const colors = getStepColor(
                          step,
                          index,
                          repair.currentStep,
                        );

                        return (
                          <div
                            className={`flex min-w-0 flex-1 items-center ${
                              index === steps.length - 1
                                ? "flex-none"
                                : ""
                            }`}
                            key={step}
                          >
                            <span
                              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${colors.circle}`}
                            >
                              {index < repair.currentStep
                                ? "✓"
                                : index + 1}
                            </span>

                            {index < steps.length - 1 && (
                              <span
                                className={`mx-2 h-[2.5px] min-w-2 flex-1 rounded-full ${colors.line}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 grid grid-cols-3">
                      {steps.map((step, index) => (
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wide ${
                            index <= repair.currentStep
                              ? "text-[#526A7F]"
                              : "text-[#9AAAB9]"
                          } ${
                            index === 0
                              ? "text-left"
                              : index === steps.length - 1
                                ? "text-right"
                                : "text-center"
                          }`}
                          key={step}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-[#E7EEF4] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[13px] font-medium text-[#718398]">
                      Latest status:{" "}
                      <strong className="font-bold text-[#49647D]">
                        {repair.status}
                      </strong>
                    </span>

                    {/* VIEW REPAIR DETAILS → MODAL */}
                    <button
                      type="button"
                      onClick={() => setSelectedRepair(repair)}
                      className="w-fit text-[13px] font-bold text-[#2D7FF9] transition-colors hover:text-[#155FC5] cursor-pointer"
                    >
                      View repair details
                      <span className="ml-1.5">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* SHOW MORE / SHOW LESS BUTTON */}
            {filteredRepairs.length > 10 && (
              <div className="flex justify-center pt-4">
                {visibleCount < filteredRepairs.length ? (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="group flex items-center gap-2.5 rounded-xl border border-[#2D7FF9] bg-white px-8 py-3.5 text-xs font-black text-[#2D7FF9] hover:bg-[#2D7FF9] hover:text-white transition-all shadow-xs cursor-pointer"
                  >
                    <span>Show More Repairs</span>
                    <span className="rounded-full bg-[#2D7FF9]/10 px-2.5 py-0.5 text-[10px] font-black text-[#2D7FF9] group-hover:bg-white group-hover:text-[#2D7FF9] transition">
                      +{filteredRepairs.length - visibleCount}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleCount(10)}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
                  >
                    Show Less ↑
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* REPAIR DETAILS MODAL */}
      {selectedRepair && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/60 p-4 backdrop-blur-[6px] sm:p-6"
          onMouseDown={() => setSelectedRepair(null)}
          role="presentation"
        >
          <section
            className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_28px_80px_rgba(5,18,33,0.3)] transition-all"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="repair-details-title"
          >
            {/* ACCENT */}
            <div
              className={`h-2 ${
                selectedRepair.status === "Resolved"
                  ? "bg-[#00A68E]"
                  : selectedRepair.status === "In progress"
                    ? "bg-[#2D7FF9]"
                    : "bg-[#E9A81B]"
              }`}
            />

            <div className="max-h-[calc(92vh-8px)] overflow-y-auto">
              <div className="p-6 sm:p-8">
                {/* MODAL HEADER */}
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${statusStyles(
                          selectedRepair.status,
                        )}`}
                      >
                        {selectedRepair.status}
                      </span>

                      <span className="text-xs font-bold tracking-[0.05em] text-[#8A9AAA]">
                        {selectedRepair.id}
                      </span>

                      <span className="text-[#B6C1CA]">·</span>

                      <span className="text-xs font-semibold text-[#8192A2]">
                        {selectedRepair.category}
                      </span>
                    </div>

                    <h2
                      id="repair-details-title"
                      className="mt-4 text-2xl font-black tracking-[-0.02em] text-[#0D1B2A]"
                    >
                      {selectedRepair.title}
                    </h2>

                    <p className="mt-2 text-[15px] font-medium text-[#718398]">
                      {selectedRepair.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#70859A] transition-colors hover:bg-[#F3F6F9] hover:text-[#0D1B2A]"
                    aria-label="Close repair details"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                {/* CURRENT STATUS */}
                <div className="mt-7 rounded-2xl border border-[#DCE7F1] bg-[#F8FAFC] p-5">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                        Current status
                      </p>
                      <p className="mt-1.5 text-xl font-extrabold text-[#18324C]">
                        {selectedRepair.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* REPORTED ISSUE */}
                <section className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                    Reported issue
                  </p>

                  <div className="mt-2.5 rounded-xl border border-[#E1EAF2] bg-white p-5 shadow-sm">
                    <p className="text-base font-medium leading-7 text-[#263D52]">
                      {selectedRepair.description}
                    </p>
                  </div>
                </section>

                {/* INFORMATION GRID */}
                <section className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Location
                    </p>
                    <p className="mt-1.5 text-base font-bold text-[#18324C]">
                      {selectedRepair.location}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Submitted
                    </p>
                    <p className="mt-1.5 text-base font-bold text-[#18324C]">
                      {selectedRepair.submittedDate}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Department
                    </p>
                    <p className="mt-1.5 text-base font-bold text-[#18324C]">
                      {selectedRepair.department}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Related project
                    </p>
                    <p className="mt-1.5 text-base font-bold text-[#18324C]">
                      {selectedRepair.relatedProject}
                    </p>
                  </div>
                </section>

                {/* PROJECT PROGRESS */}
                <section className="mt-7 rounded-2xl border border-[#DCE7F1] bg-[#FAFCFE] p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                        Related project progress
                      </p>

                      <p className="mt-1.5 text-base font-bold text-[#18324C]">
                        {selectedRepair.relatedProject}
                      </p>
                    </div>

                    <span className="text-xl font-extrabold text-[#2D7FF9]">
                      {selectedRepair.projectProgress}%
                    </span>
                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E6EDF4]">
                    <div
                      className="h-full rounded-full bg-[#2D7FF9] transition-all duration-500 ease-out"
                      style={{
                        width: `${selectedRepair.projectProgress}%`,
                      }}
                    />
                  </div>
                </section>

                {/* TIMELINE */}
                <section className="mt-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#2D7FF9]">
                      Request timeline
                    </p>

                    <h3 className="mt-1.5 text-lg font-extrabold text-[#18324C]">
                      What has happened so far
                    </h3>
                  </div>

                  <div className="mt-6 pl-1">
                    {selectedRepair.timeline.map(
                      (item, index) => {
                        const isLast =
                          index ===
                          selectedRepair.timeline.length - 1;

                        return (
                          <div
                            key={`${item.title}-${index}`}
                            className="relative flex gap-5"
                          >
                            {!isLast && (
                              <span
                                className={`absolute left-[13px] top-7 h-[calc(100%-10px)] w-[2px] rounded-full ${
                                  item.status === "completed"
                                    ? "bg-[#00A68E]"
                                    : "bg-[#DCE6EF]"
                                }`}
                              />
                            )}

                            <span
                              className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                                item.status === "completed"
                                  ? "border-[#00A68E] bg-[#00A68E] text-white"
                                  : item.status === "current"
                                    ? "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]"
                                    : "border-[#D6E1EB] bg-white text-[#9AAAB9]"
                              }`}
                            >
                              <TimelineIcon status={item.status} />
                            </span>

                            <div className="min-w-0 pb-7">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <h4 className="text-[15px] font-bold text-[#18324C]">
                                  {item.title}
                                </h4>

                                <span className="text-xs font-semibold text-[#8A9AAA]">
                                  {item.date}
                                </span>
                              </div>

                              <p className="mt-1.5 text-sm leading-6 text-[#63768A]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </section>

                {/* LATEST UPDATE */}
                <section className="mt-2 rounded-2xl border border-[#CFE1FF] bg-[#F5F9FF] p-5">
                  <div className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#2D7FF9] shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8v4l2.5 2" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                        Latest update
                      </p>

                      <p className="mt-1.5 text-base font-semibold leading-7 text-[#31516E]">
                        {selectedRepair.update}
                      </p>
                    </div>
                  </div>
                </section>

                {/* WHAT'S NEXT */}
                <section className="mt-7">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8E7F9] bg-[#EEF5FF] text-[#2D7FF9]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h13" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#2D7FF9]">
                        What&apos;s next?
                      </p>

                      <h3 className="mt-1 text-lg font-extrabold text-[#18324C]">
                        Next steps for this request
                      </h3>
                    </div>
                  </div>

                  <ol className="mt-5 space-y-4">
                    {selectedRepair.nextSteps.map(
                      (nextStep, index) => (
                        <li
                          key={nextStep}
                          className="flex gap-3.5 text-[15px] font-medium leading-7 text-[#536B80]"
                        >
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-[11px] font-bold text-[#2D7FF9]">
                            {index + 1}
                          </span>

                          <span>{nextStep}</span>
                        </li>
                      ),
                    )}
                  </ol>
                </section>

                {/* FOOTER */}
                <div className="mt-8 flex justify-end border-t border-[#E7EEF4] pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="rounded-xl bg-[#0D1B2A] px-6 py-3 text-[15px] font-bold text-white transition-all hover:bg-[#18324C] hover:shadow-md"
                  >
                    Close details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}