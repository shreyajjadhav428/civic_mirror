import { useState } from "react";

const requests = [
  {
    id: "CM-1024",
    title: "Streetlight not working",
    description: "The streetlight near the main road has not been working.",
    location: "Shanti Nagar",
    date: "Aug 13, 2026",
    status: "Under review",
  },
  {
    id: "CM-1018",
    title: "Road damage near residential area",
    description: "There is a damaged section of road causing difficulty for vehicles.",
    location: "Shanti Nagar",
    date: "Aug 10, 2026",
    status: "In progress",
  },
  {
    id: "CM-1007",
    title: "Garbage collection issue",
    description: "Garbage has not been collected from the area as scheduled.",
    location: "Shanti Nagar",
    date: "Aug 5, 2026",
    status: "Resolved",
  },
];

function statusClasses(status) {
  if (status === "Resolved") return "border-[#BFE9DE] bg-[#E9F8F4] text-[#087F6A]";
  if (status === "In progress") return "border-[#F1D58B] bg-[#FFF5DC] text-[#936600]";
  return "border-[#C9DFFF] bg-[#EEF5FF] text-[#2864A8]";
}

export default function Requests({ onNavigate }) {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="mx-auto max-w-[1120px]">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
          Citizen workspace
        </p>
        <div className="mt-1.5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold tracking-[-0.035em] text-[#0D1B2A]">My Requests</h1>
            <p className="mt-2 text-sm leading-6 text-[#63768A]">
              View the civic issues you have reported and follow their progress.
            </p>
          </div>
          <button type="button" onClick={() => onNavigate("request")} className="rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-xs font-bold text-white">
            + New request
          </button>
        </div>
      </header>

      <section className="mt-8 space-y-4" aria-label="Your civic requests">
        {requests.map((request) => (
          <article key={request.id} className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusClasses(request.status)}`}>
                    {request.status}
                  </span>
                  <span className="text-[11px] font-medium text-[#8A9AAA]">{request.id}</span>
                </div>
                <h2 className="mt-3 text-base font-bold text-[#18324C]">{request.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-[#63768A]">{request.description}</p>
                <p className="mt-4 text-xs text-[#718398]">
                  <strong className="text-[#49647D]">Location:</strong> {request.location}
                  <span className="mx-2">·</span>
                  <strong className="text-[#49647D]">Submitted:</strong> {request.date}
                </p>
              </div>
              <button type="button" onClick={() => setSelectedRequest(request)} className="shrink-0 rounded-lg border border-[#C9D8E6] px-4 py-2.5 text-xs font-bold text-[#31516E] hover:border-[#2D7FF9] hover:bg-[#EEF5FF]">
                View details
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5" onMouseDown={() => setSelectedRequest(null)} role="presentation">
          <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <p className="text-xs font-medium uppercase tracking-wide text-[#718398]">Request details</p>
            <h2 className="mt-1 text-xl font-semibold text-[#0D1B2A]">{selectedRequest.title}</h2>
            <p className="mt-5 text-sm leading-6 text-[#63768A]">{selectedRequest.description}</p>
            <p className="mt-4 text-sm text-[#49647D]">Location: {selectedRequest.location}</p>
            <div className="mt-6 flex justify-end gap-3 border-t border-[#E8EFF5] pt-5">
              <button type="button" onClick={() => setSelectedRequest(null)} className="rounded-lg border border-[#DCE7F1] px-4 py-2 text-sm font-medium">Close</button>
              <button type="button" onClick={() => onNavigate("request")} className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-sm font-medium text-white">Open conversation</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}