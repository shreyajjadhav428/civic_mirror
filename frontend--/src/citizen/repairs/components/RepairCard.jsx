import RepairProgress from "./RepairProgress";

const statusStyles = {
  Reported: "border-[#D9E5F0] bg-[#F3F7FA] text-[#5F7489]",
  Assigned: "border-[#D9D5FA] bg-[#F5F3FF] text-[#6857E8]",
  "In progress": "border-[#CFE2FF] bg-[#EEF5FF] text-[#246FD8]",
  Resolved: "border-[#CDECE5] bg-[#ECF8F5] text-[#008B76]",
};

export default function RepairCard({ repair }) {
  return (
    <article className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_6px_18px_rgba(13,27,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#C7D9E9] hover:shadow-[0_10px_22px_rgba(13,27,42,0.07)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#8092A4]">
              {repair.id}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#B7C5D2]" />
            <span className="text-xs font-medium text-[#718398]">
              {repair.category}
            </span>
          </div>

          <h2 className="mt-2 text-[16px] font-semibold tracking-[-0.015em] text-[#18324C]">
            {repair.title}
          </h2>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6C7F92]">
            <span>{repair.location}</span>
            <span>Submitted {repair.submittedDate}</span>
          </div>
        </div>

        <span className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[repair.status]}`}>
          {repair.status}
        </span>
      </div>

      <p className="mt-4 rounded-lg bg-[#F7F9FC] px-3 py-2.5 text-xs leading-5 text-[#63768A]">
        {repair.update}
      </p>

      <RepairProgress currentStep={repair.currentStep} />

      <div className="mt-5 flex items-center justify-between border-t border-[#E7EEF4] pt-4">
        <span className="text-xs font-medium text-[#718398]">
          Latest status: {repair.status}
        </span>

        <button
          className="text-xs font-semibold text-[#2D7FF9] transition-colors duration-150 hover:text-[#1E4FA3]"
          type="button"
        >
          View details →
        </button>
      </div>
    </article>
  );
}