const statuses = [
  "All",
  "Reported",
  "Assigned",
  "In progress",
  "Resolved",
];

export default function RepairFilters({
  searchQuery,
  selectedStatus,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <section className="rounded-xl border border-[#DCE7F1] bg-white p-3 shadow-[0_5px_16px_rgba(13,27,42,0.04)]">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search repairs</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8294A6]">
            ⌕
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search repairs..."
            className="h-10 w-full rounded-lg border border-[#DCE7F1] bg-[#FBFCFE] py-2 pl-9 pr-3 text-sm text-[#18324C] outline-none transition-colors placeholder:text-[#93A2B1] focus:border-[#8DBBFF] focus:ring-2 focus:ring-[#2D7FF9]/10"
          />
        </label>

        <label className="sm:w-[170px]">
          <span className="sr-only">Filter by status</span>
          <select
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-[#DCE7F1] bg-[#FBFCFE] px-3 text-sm font-medium text-[#486278] outline-none transition-colors focus:border-[#8DBBFF] focus:ring-2 focus:ring-[#2D7FF9]/10"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All statuses" : status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}