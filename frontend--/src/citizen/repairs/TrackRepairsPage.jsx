import { useMemo, useState } from "react";
import CitizenSidebar from "../components/CitizenSidebar";
import CitizenTopBar from "../components/CitizenTopBar";
import RepairCard from "./components/RepairCard";
import RepairFilters from "./components/RepairFilters";
import { repairData } from "./data/repairData";

export default function TrackRepairsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredRepairs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return repairData.filter((repair) => {
      const matchesStatus =
        selectedStatus === "All" || repair.status === selectedStatus;

      const matchesSearch =
        !query ||
        [
          repair.title,
          repair.location,
          repair.category,
          repair.id,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, selectedStatus]);

  const summary = {
    active: repairData.filter((repair) => repair.status !== "Resolved").length,
    progress: repairData.filter((repair) => repair.status === "In progress").length,
    resolved: repairData.filter((repair) => repair.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenTopBar />
      <CitizenSidebar />

      <main className="min-h-screen px-5 pb-12 pt-[92px] min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)] min-[861px]:px-8 min-[861px]:pt-[104px] lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1120px]">
          <header className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2D7FF9]">
              Repair tracking
            </p>
            <h1 className="mt-2 text-[30px] font-bold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
              Track your repairs
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#64778B] sm:text-[15px]">
              Follow the progress of civic issues you have reported, from review
              and assignment through to completion.
            </p>
          </header>

          <section className="mt-8 flex flex-col divide-y divide-[#DCE7F1] rounded-xl border border-[#DCE7F1] bg-white shadow-[0_5px_16px_rgba(13,27,42,0.035)] sm:flex-row sm:divide-x sm:divide-y-0" aria-label="Repair summary">
            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-[#2D7FF9]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
                  Active repairs
                </p>
                <p className="mt-0.5 text-xl font-bold tracking-[-0.03em] text-[#18324C]">
                  {summary.active}
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-[#6857E8]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
                  In progress
                </p>
                <p className="mt-0.5 text-xl font-bold tracking-[-0.03em] text-[#18324C]">
                  {summary.progress}
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 px-5 py-4">
              <span className="h-2 w-2 rounded-full bg-[#00A68E]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
                  Resolved
                </p>
                <p className="mt-0.5 text-xl font-bold tracking-[-0.03em] text-[#18324C]">
                  {summary.resolved}
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8">
            <RepairFilters
              searchQuery={searchQuery}
              selectedStatus={selectedStatus}
              onSearchChange={setSearchQuery}
              onStatusChange={setSelectedStatus}
            />
          </div>

          <section className="mt-6" aria-label="Repair records">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#18324C]">
                {filteredRepairs.length} repair{filteredRepairs.length === 1 ? "" : "s"}
              </p>
              <p className="text-xs text-[#718398]">Most recent first</p>
            </div>

            {filteredRepairs.length > 0 ? (
              <div className="space-y-4">
                {filteredRepairs.map((repair) => (
                  <RepairCard key={repair.id} repair={repair} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#C8D8E6] bg-white/55 px-6 py-14 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-[#ECF8F5] text-[#008B76]">
                  ✓
                </span>
                <h2 className="mt-4 text-base font-semibold text-[#18324C]">
                  No repairs found
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6C7F92]">
                  Try adjusting your search or status filter to view a different repair request.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}