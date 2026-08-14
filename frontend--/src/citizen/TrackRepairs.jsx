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
  },
  {
    id: "CM-24012",
    title: "Water leakage reported near Community Centre",
    location: "Shanti Nagar, 110025",
    submittedDate: "11 August 2026",
    status: "Assigned",
    currentStep: 1,
    category: "Water supply",
    update: "The issue has been assigned to the local water services team.",
  },
  {
    id: "CM-23994",
    title: "Road maintenance request on Market Road",
    location: "Market Road, 110025",
    submittedDate: "04 August 2026",
    status: "Resolved",
    currentStep: 3,
    category: "Road maintenance",
    update: "Repair work was completed and verified by the local team.",
  },
];

const steps = ["Reported", "Assigned", "In progress", "Resolved"];

const statusStyles = {
  Reported: "border-[#D9E5F0] bg-[#F3F7FA] text-[#5F7489]",
  Assigned: "border-[#D9D5FA] bg-[#F5F3FF] text-[#6857E8]",
  "In progress": "border-[#CFE2FF] bg-[#EEF5FF] text-[#246FD8]",
  Resolved: "border-[#CDECE5] bg-[#ECF8F5] text-[#008B76]",
};

export default function TrackRepairs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filteredRepairs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return repairs.filter((repair) => {
      const matchesStatus = status === "All" || repair.status === status;
      const matchesQuery =
        !query ||
        [repair.title, repair.location, repair.category, repair.id]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [searchQuery, status]);

  const summary = {
    active: repairs.filter((repair) => repair.status !== "Resolved").length,
    progress: repairs.filter((repair) => repair.status === "In progress").length,
    resolved: repairs.filter((repair) => repair.status === "Resolved").length,
  };

  return (
    <div className="mx-auto max-w-[1120px]">
      <header className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2D7FF9]">Repair tracking</p>
        <h1 className="mt-2 text-[30px] font-bold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">Track your repairs</h1>
        <p className="mt-3 text-sm leading-6 text-[#64778B]">Follow reported civic issues from review and assignment through to completion.</p>
      </header>

      <section className="mt-8 flex flex-col divide-y divide-[#DCE7F1] rounded-xl border border-[#DCE7F1] bg-white shadow-[0_5px_16px_rgba(13,27,42,0.035)] sm:flex-row sm:divide-x sm:divide-y-0">
        {[
          ["Active repairs", summary.active, "#2D7FF9"],
          ["In progress", summary.progress, "#6857E8"],
          ["Resolved", summary.resolved, "#00A68E"],
        ].map(([label, value, color]) => (
          <div className="flex flex-1 items-center gap-3 px-5 py-4" key={label}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">{label}</p>
              <p className="mt-0.5 text-xl font-bold text-[#18324C]">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-[#DCE7F1] bg-white p-3 shadow-[0_5px_16px_rgba(13,27,42,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search repairs..."
            className="h-10 flex-1 rounded-lg border border-[#DCE7F1] bg-[#FBFCFE] px-3 text-sm outline-none focus:border-[#8DBBFF]"
          />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-lg border border-[#DCE7F1] bg-[#FBFCFE] px-3 text-sm font-medium text-[#486278] sm:w-[170px]">
            {["All", ...steps].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </section>

      <section className="mt-6 space-y-4">
        {filteredRepairs.map((repair) => (
          <article key={repair.id} className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_6px_18px_rgba(13,27,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#C7D9E9] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div>
                <p className="text-[11px] font-bold tracking-[0.08em] text-[#8092A4]">{repair.id} · {repair.category}</p>
                <h2 className="mt-2 text-[16px] font-semibold text-[#18324C]">{repair.title}</h2>
                <p className="mt-2 text-xs text-[#6C7F92]">{repair.location} · Submitted {repair.submittedDate}</p>
              </div>
              <span className={`h-fit w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[repair.status]}`}>{repair.status}</span>
            </div>

            <p className="mt-4 rounded-lg bg-[#F7F9FC] px-3 py-2.5 text-xs leading-5 text-[#63768A]">{repair.update}</p>

            <div className="mt-5">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div className={`flex min-w-0 flex-1 items-center ${index === 3 ? "flex-none" : ""}`} key={step}>
                    <span className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] font-bold ${
                      index < repair.currentStep
                        ? "border-[#00A68E] bg-[#00A68E] text-white"
                        : index === repair.currentStep
                          ? "border-[#2D7FF9] bg-[#EEF5FF] text-[#2D7FF9]"
                          : "border-[#D6E1EB] bg-white text-[#9AAAB9]"
                    }`}>
                      {index < repair.currentStep ? "✓" : index + 1}
                    </span>
                    {index < 3 && <span className={`mx-1 h-px min-w-2 flex-1 ${index < repair.currentStep ? "bg-[#00A68E]" : "bg-[#DCE6EF]"}`} />}
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-4 text-center">
                {steps.map((step, index) => <span className={`text-[10px] ${index <= repair.currentStep ? "text-[#486278]" : "text-[#9AAAB9]"}`} key={step}>{step}</span>)}
              </div>
            </div>

            <div className="mt-5 flex justify-between border-t border-[#E7EEF4] pt-4">
              <span className="text-xs text-[#718398]">Latest status: {repair.status}</span>
              <button type="button" className="text-xs font-semibold text-[#2D7FF9]">View details →</button>
            </div>
          </article>
        ))}

        {!filteredRepairs.length && (
          <section className="rounded-xl border border-dashed border-[#C8D8E6] bg-white/55 px-6 py-14 text-center">
            <h2 className="text-base font-semibold text-[#18324C]">No repairs found</h2>
            <p className="mt-2 text-sm text-[#6C7F92]">Adjust the search or status filter to view another repair request.</p>
          </section>
        )}
      </section>
    </div>
  );
}