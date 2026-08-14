import { useMemo, useState } from "react";

const repairs = [
  {
    id: "CM-24018",
    title: "Streetlight issue near Shanti Nagar Park",
    location: "Shanti Nagar, 110025",
    submittedDate: "14 August 2026",
    status: "In progress",
    currentStep: 2,
    category: "Street lighting",

    update: "An electrical maintenance team has been assigned.",

    department: "Electrical Works",
    relatedProject: "Electrical Maintenance Phase II",
    projectProgress: 82,
    expectedResolution: "18 August 2026",

    description:
      "The streetlight near Shanti Nagar Park has not been working, affecting visibility and safety for people using the road after dark.",

    timeline: [
      {
        title: "Request submitted",
        date: "14 August 2026",
        description:
          "Your civic request was submitted successfully with the reported location.",
        status: "completed",
      },
      {
        title: "Request assigned",
        date: "14 August 2026",
        description:
          "The issue was assigned to the Electrical Works Department for review.",
        status: "completed",
      },
      {
        title: "Repair in progress",
        date: "15 August 2026",
        description:
          "An electrical maintenance team has been assigned and repair work is being coordinated.",
        status: "current",
      },
      {
        title: "Expected resolution",
        date: "18 August 2026",
        description:
          "The issue is expected to be resolved by the assigned maintenance team.",
        status: "upcoming",
      },
    ],

    nextSteps: [
      "The assigned electrical maintenance team will inspect the streetlight.",
      "Repair work will be carried out if the fault is confirmed.",
      "The request will be marked resolved after completion and verification.",
    ],
  },

  {
    id: "CM-24012",
    title: "Water leakage reported near Community Centre",
    location: "Shanti Nagar, 110025",
    submittedDate: "11 August 2026",
    status: "Assigned",
    currentStep: 1,
    category: "Water supply",

    update:
      "The issue has been assigned to the local water services team.",

    department: "Water Services",
    relatedProject: "Shanti Nagar Water Network Maintenance",
    projectProgress: 54,
    expectedResolution: "19 August 2026",

    description:
      "A water leakage has been reported near the Community Centre and may be affecting the surrounding public area.",

    timeline: [
      {
        title: "Request submitted",
        date: "11 August 2026",
        description:
          "Your water supply issue was submitted successfully.",
        status: "completed",
      },
      {
        title: "Request assigned",
        date: "12 August 2026",
        description:
          "The issue was assigned to the local Water Services team.",
        status: "current",
      },
      {
        title: "Repair in progress",
        date: "Pending",
        description:
          "Repair work will begin after the assigned team completes its inspection.",
        status: "upcoming",
      },
      {
        title: "Expected resolution",
        date: "19 August 2026",
        description:
          "The issue is currently expected to be resolved by this date.",
        status: "upcoming",
      },
    ],

    nextSteps: [
      "The Water Services team will inspect the reported leakage.",
      "The required repair work will be scheduled.",
      "The request will be updated after the repair is completed.",
    ],
  },

  {
    id: "CM-23994",
    title: "Road maintenance request on Market Road",
    location: "Market Road, 110025",
    submittedDate: "04 August 2026",
    status: "Resolved",
    currentStep: 3,
    category: "Road maintenance",

    update:
      "Repair work was completed and verified by the local team.",

    department: "Road Maintenance",
    relatedProject: "Market Road Surface Improvement",
    projectProgress: 100,
    expectedResolution: "12 August 2026",

    description:
      "A damaged section of Market Road was reported because it was creating difficulty for vehicles and pedestrians.",

    timeline: [
      {
        title: "Request submitted",
        date: "04 August 2026",
        description:
          "The road maintenance issue was submitted successfully.",
        status: "completed",
      },
      {
        title: "Request assigned",
        date: "05 August 2026",
        description:
          "The request was assigned to the Road Maintenance team.",
        status: "completed",
      },
      {
        title: "Repair in progress",
        date: "08 August 2026",
        description:
          "Road repair work was carried out at the reported location.",
        status: "completed",
      },
      {
        title: "Resolved",
        date: "12 August 2026",
        description:
          "The repair was completed and verified by the local team.",
        status: "completed",
      },
    ],

    nextSteps: [
      "No further action is currently required.",
      "The completed repair has been verified by the local team.",
      "You can reopen or report the issue again if the problem returns.",
    ],
  },
];

const steps = ["Reported", "Assigned", "In progress", "Resolved"];

function statusStyles(status) {
  if (status === "Resolved") {
    return "border-[#BFE9DE] bg-[#E9F8F4] text-[#087F6A]";
  }

  if (status === "In progress") {
    return "border-[#C9DFFF] bg-[#EEF5FF] text-[#2864A8]";
  }

  if (status === "Assigned") {
    return "border-[#F1D58B] bg-[#FFF5DC] text-[#936600]";
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
    if (step === "In progress") {
      return {
        circle: "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]",
        line: "bg-[#DCE6EF]",
      };
    }

    if (step === "Assigned") {
      return {
        circle: "border-[#E5B932] bg-[#FFF5DC] text-[#936600]",
        line: "bg-[#DCE6EF]",
      };
    }

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
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (status === "current") {
    return (
      <span className="h-2.5 w-2.5 rounded-full bg-[#2D7FF9]" />
    );
  }

  return (
    <span className="h-2.5 w-2.5 rounded-full border-2 border-[#B9C7D4]" />
  );
}

export default function TrackRepairs({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedRepair, setSelectedRepair] = useState(null);

  const filteredRepairs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return repairs.filter((repair) => {
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
  }, [searchQuery, status]);

  const summary = {
    active: repairs.filter(
      (repair) => repair.status !== "Resolved",
    ).length,

    progress: repairs.filter(
      (repair) => repair.status === "In progress",
    ).length,

    resolved: repairs.filter(
      (repair) => repair.status === "Resolved",
    ).length,
  };

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
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* =========================================================
          HEADER BANNER (Matching Admin Portal & Overview UI)
      ========================================================= */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[2.5px] w-5 bg-[#2D7FF9] rounded-full inline-block" />
              CITIZEN WORKSPACE
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Track <span className="text-[#2D7FF9]">Repairs</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A] max-w-2xl">
              Follow reported civic issues from review and assignment through to completion.
            </p>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4.5 py-2.5 text-sm font-semibold">
              <span className="text-[#657386] block text-[11px] font-black uppercase tracking-wider">Active Monitoring</span>
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
        className="mt-8 grid gap-4 sm:grid-cols-3"
        aria-label="Repair summary"
      >
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(13,27,42,0.07)]"
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

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#70859A]">
                  {card.label}
                </p>

                <p className="mt-2 text-[30px] font-extrabold tracking-[-0.04em] text-[#18324C]">
                  {String(card.value).padStart(2, "0")}
                </p>

                <p className="mt-1 text-xs font-medium text-[#718398]">
                  {card.detail}
                </p>
              </div>

              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
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
      <section className="mt-8 rounded-2xl border border-[#DCE7F1] bg-white p-3 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8193A5]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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
              className="h-11 w-full rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] pl-9 pr-3 text-sm font-medium text-[#18324C] outline-none transition-colors placeholder:text-[#91A0AF] focus:border-[#9BC5FF] focus:bg-white"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-3 text-sm font-semibold text-[#486278] outline-none focus:border-[#9BC5FF] sm:w-[180px]"
          >
            {["All", ...steps].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      {/* REPAIR CARDS */}
      <section className="mt-6 space-y-4" aria-label="Repairs">
        {filteredRepairs.map((repair) => (
          <article
            key={repair.id}
            className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#C7D9E9] hover:shadow-[0_12px_30px_rgba(13,27,42,0.065)]"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles(
                        repair.status,
                      )}`}
                    >
                      {repair.status}
                    </span>

                    <span className="text-[11px] font-semibold text-[#8A9AAA]">
                      {repair.id}
                    </span>

                    <span className="hidden text-[11px] text-[#B0BBC5] sm:inline">
                      ·
                    </span>

                    <span className="text-[11px] font-medium text-[#8192A2]">
                      {repair.category}
                    </span>
                  </div>

                  <h2 className="mt-3 text-[16px] font-bold tracking-[-0.015em] text-[#18324C] sm:text-[17px]">
                    {repair.title}
                  </h2>

                  <p className="mt-1.5 text-[13px] leading-5 text-[#63768A]">
                    {repair.location}
                    <span className="mx-1.5 text-[#B3BEC8]">·</span>
                    Submitted {repair.submittedDate}
                  </p>
                </div>

                {/* VIEW DETAILS → MY REQUESTS */}
                <button
                  type="button"
                  onClick={() => onNavigate?.("requests")}
                  className="w-fit shrink-0 rounded-lg border border-[#C9D8E6] px-4 py-2.5 text-xs font-bold text-[#31516E] transition-all duration-150 hover:border-[#9BC5FF] hover:bg-[#EEF5FF] hover:text-[#2D7FF9]"
                >
                  View details
                  <span className="ml-1">→</span>
                </button>
              </div>

              {/* LATEST UPDATE */}
              <div className="mt-5 flex gap-3 rounded-xl border border-[#E4EBF2] bg-[#F7F9FC] px-4 py-3.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-[#2D7FF9] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
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

                  <p className="mt-0.5 text-xs font-medium leading-5 text-[#536B80]">
                    {repair.update}
                  </p>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-6">
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
                          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${colors.circle}`}
                        >
                          {index < repair.currentStep
                            ? "✓"
                            : index + 1}
                        </span>

                        {index < steps.length - 1 && (
                          <span
                            className={`mx-1.5 h-[2px] min-w-2 flex-1 rounded-full ${colors.line}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 grid grid-cols-4">
                  {steps.map((step, index) => (
                    <span
                      className={`text-[10px] font-semibold ${
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
              <div className="mt-5 flex flex-col gap-2 border-t border-[#E7EEF4] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] font-medium text-[#718398]">
                  Latest status:{" "}
                  <strong className="font-bold text-[#49647D]">
                    {repair.status}
                  </strong>
                </span>

                {/* VIEW REPAIR DETAILS → MODAL */}
                <button
                  type="button"
                  onClick={() => setSelectedRepair(repair)}
                  className="w-fit text-xs font-bold text-[#2D7FF9] transition-colors hover:text-[#155FC5]"
                >
                  View repair details
                  <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}

        {!filteredRepairs.length && (
          <section className="rounded-2xl border border-dashed border-[#C8D8E6] bg-white/60 px-6 py-14 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-[#EEF5FF] text-[#2D7FF9]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </span>

            <h2 className="mt-4 text-base font-bold text-[#18324C]">
              No repairs found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6C7F92]">
              Adjust the search or status filter to view another repair
              request.
            </p>
          </section>
        )}
      </section>

      {/* REPAIR DETAILS MODAL */}
      {selectedRepair && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/50 p-4 backdrop-blur-[4px] sm:p-6"
          onMouseDown={() => setSelectedRepair(null)}
          role="presentation"
        >
          <section
            className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_28px_80px_rgba(5,18,33,0.24)]"
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
                    : "bg-[#E9A81B]"
              }`}
            />

            <div className="max-h-[calc(92vh-6px)] overflow-y-auto">
              <div className="p-5 sm:p-7">
                {/* MODAL HEADER */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusStyles(
                          selectedRepair.status,
                        )}`}
                      >
                        {selectedRepair.status}
                      </span>

                      <span className="text-[11px] font-bold tracking-[0.05em] text-[#8A9AAA]">
                        {selectedRepair.id}
                      </span>

                      <span className="text-[#B6C1CA]">·</span>

                      <span className="text-[11px] font-semibold text-[#8192A2]">
                        {selectedRepair.category}
                      </span>
                    </div>

                    <h2
                      id="repair-details-title"
                      className="mt-3 text-[21px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]"
                    >
                      {selectedRepair.title}
                    </h2>

                    <p className="mt-1.5 text-[13px] font-medium text-[#718398]">
                      {selectedRepair.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#70859A] transition-colors hover:bg-[#F3F6F9] hover:text-[#0D1B2A]"
                    aria-label="Close repair details"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                {/* CURRENT STATUS */}
                <div className="mt-6 rounded-2xl border border-[#DCE7F1] bg-[#F8FAFC] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                        Current status
                      </p>

                      <p className="mt-1 text-[17px] font-extrabold text-[#18324C]">
                        {selectedRepair.status}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                        Expected resolution
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#2D7FF9]">
                        {selectedRepair.expectedResolution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* REPORTED ISSUE */}
                <section className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                    Reported issue
                  </p>

                  <div className="mt-2 rounded-xl border border-[#E1EAF2] bg-white p-4">
                    <p className="text-[14px] font-medium leading-6 text-[#263D52]">
                      {selectedRepair.description}
                    </p>
                  </div>
                </section>

                {/* INFORMATION GRID */}
                <section className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Location
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                      {selectedRepair.location}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Submitted
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                      {selectedRepair.submittedDate}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Department
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                      {selectedRepair.department}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                      Related project
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                      {selectedRepair.relatedProject}
                    </p>
                  </div>
                </section>

                {/* PROJECT PROGRESS */}
                <section className="mt-6 rounded-2xl border border-[#DCE7F1] bg-[#FAFCFE] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#8293A3]">
                        Related project progress
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#18324C]">
                        {selectedRepair.relatedProject}
                      </p>
                    </div>

                    <span className="text-lg font-extrabold text-[#2D7FF9]">
                      {selectedRepair.projectProgress}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E6EDF4]">
                    <div
                      className="h-full rounded-full bg-[#2D7FF9] transition-all"
                      style={{
                        width: `${selectedRepair.projectProgress}%`,
                      }}
                    />
                  </div>
                </section>

                {/* TIMELINE */}
                <section className="mt-7">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#2D7FF9]">
                      Request timeline
                    </p>

                    <h3 className="mt-1 text-[17px] font-extrabold text-[#18324C]">
                      What has happened so far
                    </h3>
                  </div>

                  <div className="mt-5">
                    {selectedRepair.timeline.map(
                      (item, index) => {
                        const isLast =
                          index ===
                          selectedRepair.timeline.length - 1;

                        return (
                          <div
                            key={`${item.title}-${index}`}
                            className="relative flex gap-4"
                          >
                            {!isLast && (
                              <span
                                className={`absolute left-[11px] top-6 h-[calc(100%-8px)] w-px ${
                                  item.status === "completed"
                                    ? "bg-[#00A68E]"
                                    : "bg-[#DCE6EF]"
                                }`}
                              />
                            )}

                            <span
                              className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                                item.status === "completed"
                                  ? "border-[#00A68E] bg-[#00A68E] text-white"
                                  : item.status === "current"
                                    ? "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]"
                                    : "border-[#D6E1EB] bg-white text-[#9AAAB9]"
                              }`}
                            >
                              <TimelineIcon status={item.status} />
                            </span>

                            <div className="min-w-0 pb-6">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-sm font-bold text-[#18324C]">
                                  {item.title}
                                </h4>

                                <span className="text-[10px] font-semibold text-[#8A9AAA]">
                                  {item.date}
                                </span>
                              </div>

                              <p className="mt-1 text-[12px] leading-5 text-[#63768A]">
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
                <section className="mt-2 rounded-2xl border border-[#CFE1FF] bg-[#F5F9FF] p-4">
                  <div className="flex gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#2D7FF9] shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8v4l2.5 2" />
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                        Latest update
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-6 text-[#31516E]">
                        {selectedRepair.update}
                      </p>
                    </div>
                  </div>
                </section>

                {/* WHAT'S NEXT */}
                <section className="mt-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#D8E7F9] bg-[#EEF5FF] text-[#2D7FF9]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h13" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#2D7FF9]">
                        What&apos;s next?
                      </p>

                      <h3 className="mt-0.5 text-[16px] font-extrabold text-[#18324C]">
                        Next steps for this request
                      </h3>
                    </div>
                  </div>

                  <ol className="mt-4 space-y-3">
                    {selectedRepair.nextSteps.map(
                      (nextStep, index) => (
                        <li
                          key={nextStep}
                          className="flex gap-3 text-[13px] font-medium leading-6 text-[#536B80]"
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-[10px] font-bold text-[#2D7FF9]">
                            {index + 1}
                          </span>

                          <span>{nextStep}</span>
                        </li>
                      ),
                    )}
                  </ol>
                </section>

                {/* FOOTER */}
                <div className="mt-7 flex justify-end border-t border-[#E7EEF4] pt-5">
                  <button
                    type="button"
                    onClick={() => setSelectedRepair(null)}
                    className="rounded-xl bg-[#0D1B2A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#18324C]"
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