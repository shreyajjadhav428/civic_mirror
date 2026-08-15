import { useMemo, useState, useEffect } from "react";
import { getCitizenRequests } from "../api/citizen.api";
import { useAuth } from "../context/AuthContext";
import { normalizeDepartment } from "../constants/departments";

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
              category: normalizeDepartment(c.category || c.department || c.title),
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
    <div className="space-y-6 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* =========================================================
          HEADER SECTION (NO WHITE BOX, MATCHING COMPLAINTS PAGE)
      ========================================================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#2D7FF9] uppercase mb-1">
            <span className="h-[2px] w-3 bg-[#2D7FF9] rounded-full inline-block" />
            CITIZEN WORKSPACE
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1B2A] tracking-tight">
            Track <span className="text-[#2D7FF9]">Repairs</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-normal text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
            Follow reported civic issues from review and assignment through to completion.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold shadow-2xs">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Active Monitoring</span>
            <span className="text-[#0D1B2A] font-bold text-sm">{summary.active} Active Issues</span>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <section
        className="grid gap-4 sm:grid-cols-3"
        aria-label="Repair summary"
      >
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="group relative overflow-hidden rounded-xl border border-[#DCE7F1] bg-white p-4 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs"
          >
            <div
              className={`absolute inset-x-0 top-0 h-[3px] ${
                card.tone === "blue"
                  ? "bg-[#2D7FF9]"
                  : card.tone === "yellow"
                  ? "bg-[#E9A81B]"
                  : "bg-[#00A68E]"
              }`}
            />

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#70859A]">
                  {card.label}
                </p>

                <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#18324C]">
                  {String(card.value).padStart(2, "0")}
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-[#718398]">
                  {card.detail}
                </p>
              </div>

              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
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
                    className="h-3.5 w-3.5"
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
                    className="h-3.5 w-3.5"
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
                    className="h-3.5 w-3.5"
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
      <section className="rounded-xl border border-[#DCE7F1] bg-white p-3 shadow-2xs">
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8193A5]"
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
              className="h-10 w-full rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] pl-10 pr-3.5 text-xs sm:text-sm font-medium text-[#18324C] outline-none transition-colors placeholder:text-[#91A0AF] focus:border-[#9BC5FF] focus:bg-white"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-3.5 text-xs sm:text-sm font-semibold text-[#486278] outline-none transition-colors focus:border-[#9BC5FF] sm:w-[180px] cursor-pointer"
          >
            {["All", ...steps].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      {/* SUB-SECTION HEADER LINE */}
      <div className="flex items-center justify-between pt-1 border-b border-slate-200/60 pb-3">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="h-[2px] w-3 bg-slate-400 rounded-full" />
          ACTIVE MUNICIPAL REPAIRS & TIMELINE ({filteredRepairs.length})
        </span>
        <span className="text-xs font-semibold text-slate-400">
          Realtime Progress Sync
        </span>
      </div>

      {/* REPAIR CARDS */}
      <section className="space-y-3.5" aria-label="Repairs">
        {filteredRepairs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center text-slate-500 font-medium text-sm">
            {loading ? "Loading active municipal repairs..." : "No matching civic repairs found."}
          </div>
        ) : (
          <>
            {filteredRepairs.slice(0, visibleCount).map((repair) => (
              <article
                key={repair.id}
                className="group relative overflow-hidden rounded-xl border border-[#DCE7F1] bg-white shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-slate-300"
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1 ${
                    repair.status === "Resolved"
                      ? "bg-[#008D78]"
                      : repair.status === "In progress"
                      ? "bg-[#2D7FF9]"
                      : "bg-amber-500"
                  }`}
                  aria-hidden="true"
                />

                <div className="p-5 sm:p-6 pl-6 sm:pl-7">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${statusStyles(
                            repair.status,
                          )}`}
                        >
                          {repair.status}
                        </span>

                        <span className="text-xs font-semibold tracking-wider text-slate-400">
                          {repair.id}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                          {repair.category}
                        </span>
                      </div>

                      <h2 className="mt-3 text-base sm:text-lg font-bold tracking-[-0.015em] text-[#18324C]">
                        {repair.title}
                      </h2>

                      <p className="mt-1 text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                        {repair.location}
                        <span className="mx-2 text-[#B3BEC8]">·</span>
                        Submitted {repair.submittedDate}
                      </p>
                    </div>

                    {/* VIEW DETAILS BUTTON */}
                    <button
                      type="button"
                      onClick={() => setSelectedRepair(repair)}
                      className="shrink-0 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0D1B2A] transition-all hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] cursor-pointer shadow-2xs"
                    >
                      View details
                    </button>
                  </div>

                  {/* LATEST UPDATE */}
                  <div className="mt-4 flex gap-3 rounded-xl border border-[#E4EBF2] bg-[#F7F9FC] px-4 py-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-[#2D7FF9] shadow-2xs">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
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
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                        Latest update
                      </p>

                      <p className="mt-0.5 text-xs sm:text-sm font-medium leading-relaxed text-[#536B80]">
                        {repair.update}
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-5">
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
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${colors.circle}`}
                            >
                              {index < repair.currentStep
                                ? "✓"
                                : index + 1}
                            </span>

                            {index < steps.length - 1 && (
                              <span
                                className={`mx-2 h-[2px] min-w-2 flex-1 rounded-full ${colors.line}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 grid grid-cols-3">
                      {steps.map((step, index) => (
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wide ${
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
                </div>
              </article>
            ))}

            {/* RIGHT-ALIGNED SHOW MORE / SHOW LESS BLUE TEXT LINK */}
            {filteredRepairs.length > 10 && (
              <div className="flex justify-end pt-2 pr-1">
                {visibleCount < filteredRepairs.length ? (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="text-[#2D7FF9] font-bold text-xs sm:text-sm hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1"
                  >
                    Show More ({filteredRepairs.length - visibleCount} remaining) →
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleCount(10)}
                    className="text-[#2D7FF9] font-bold text-xs sm:text-sm hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1"
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
            className="max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-2xl transition-all"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="repair-details-title"
          >
            {/* ACCENT */}
            <div
              className={`h-1.5 ${
                selectedRepair.status === "Resolved"
                  ? "bg-[#00A68E]"
                  : selectedRepair.status === "In progress"
                  ? "bg-[#2D7FF9]"
                  : "bg-amber-500"
              }`}
            />

            <div className="max-h-[calc(92vh-6px)] overflow-y-auto">
              <div className="p-6 sm:p-7 space-y-5">
                {/* MODAL HEADER */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3.5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles(
                          selectedRepair.status,
                        )}`}
                      >
                        {selectedRepair.status}
                      </span>

                      <span className="text-xs font-semibold tracking-wider text-slate-400">
                        {selectedRepair.id}
                      </span>

                      <span className="text-slate-300">·</span>

                      <span className="text-xs font-semibold text-slate-600">
                        {selectedRepair.category}
                      </span>
                    </div>

                    <h2
                      id="repair-details-title"
                      className="text-lg sm:text-xl font-bold tracking-tight text-[#0D1B2A]"
                    >
                      {selectedRepair.title}
                    </h2>

                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {selectedRepair.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 cursor-pointer"
                    aria-label="Close repair details"
                  >
                    ✕
                  </button>
                </div>

                {/* INFORMATION GRID */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-400 uppercase block mb-0.5 text-[10px]">Status</span>
                    <span className="font-bold text-[#0D1B2A] text-sm">{selectedRepair.status}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-400 uppercase block mb-0.5 text-[10px]">Department</span>
                    <span className="font-bold text-[#0D1B2A] text-sm">{selectedRepair.department}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-400 uppercase block mb-0.5 text-[10px]">Location</span>
                    <span className="font-bold text-[#0D1B2A] text-sm">{selectedRepair.location}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-400 uppercase block mb-0.5 text-[10px]">Submitted On</span>
                    <span className="font-bold text-[#0D1B2A] text-sm">{selectedRepair.submittedDate}</span>
                  </div>
                </div>

                {/* REPORTED ISSUE */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Reported issue</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    {selectedRepair.description}
                  </p>
                </div>

                {/* PROJECT PROGRESS */}
                <div className="rounded-xl border border-[#DCE7F1] bg-[#FAFCFE] p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Related project progress
                      </p>
                      <p className="text-xs font-bold text-[#18324C]">
                        {selectedRepair.relatedProject}
                      </p>
                    </div>

                    <span className="text-sm font-extrabold text-[#2D7FF9]">
                      {selectedRepair.projectProgress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#E6EDF4]">
                    <div
                      className="h-full rounded-full bg-[#2D7FF9] transition-all duration-500 ease-out"
                      style={{
                        width: `${selectedRepair.projectProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* TIMELINE */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D7FF9]">
                      Request timeline
                    </p>
                    <h3 className="text-sm font-bold text-[#18324C]">
                      What has happened so far
                    </h3>
                  </div>

                  <div className="pl-1 space-y-0">
                    {selectedRepair.timeline.map((item, index) => {
                      const isLast = index === selectedRepair.timeline.length - 1;

                      return (
                        <div
                          key={`${item.title}-${index}`}
                          className="relative flex gap-3.5"
                        >
                          {!isLast && (
                            <span
                              className={`absolute left-[11px] top-6 h-[calc(100%-8px)] w-[1.5px] rounded-full ${
                                item.status === "completed"
                                  ? "bg-[#00A68E]"
                                  : "bg-[#DCE6EF]"
                              }`}
                            />
                          )}

                          <span
                            className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
                              item.status === "completed"
                                ? "border-[#00A68E] bg-[#00A68E] text-white font-bold"
                                : item.status === "current"
                                  ? "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]"
                                  : "border-[#D6E1EB] bg-white text-[#9AAAB9]"
                            }`}
                          >
                            <TimelineIcon status={item.status} />
                          </span>

                          <div className="min-w-0 pb-5">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-xs font-bold text-[#18324C]">
                                {item.title}
                              </h4>
                              <span className="text-[10px] font-semibold text-slate-400">
                                {item.date}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-slate-600 leading-normal">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* LATEST UPDATE */}
                <div className="rounded-xl border border-[#CFE1FF] bg-[#F5F9FF] p-4 flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#2D7FF9] shadow-2xs">
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
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D7FF9]">
                      Latest update
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-[#31516E]">
                      {selectedRepair.update}
                    </p>
                  </div>
                </div>

                {/* WHAT'S NEXT */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#D8E7F9] bg-[#EEF5FF] text-[#2D7FF9]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
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
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D7FF9]">
                        What&apos;s next?
                      </p>
                      <h3 className="text-xs font-bold text-[#18324C]">
                        Next steps for this request
                      </h3>
                    </div>
                  </div>

                  <ol className="space-y-2 pl-1">
                    {selectedRepair.nextSteps.map((nextStep, index) => (
                      <li
                        key={nextStep}
                        className="flex gap-2.5 text-xs font-normal text-slate-600 leading-relaxed"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-[10px] font-bold text-[#2D7FF9]">
                          {index + 1}
                        </span>
                        <span>{nextStep}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Close
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