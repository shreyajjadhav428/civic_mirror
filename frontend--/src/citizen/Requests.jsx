import { useState } from "react";
import { useNavigate } from "react-router-dom";

const requests = [
  {
    id: "CM-1024",
    title: "Streetlight not working",
    description:
      "The streetlight near the main road has not been working.",
    location: "Shanti Nagar",
    date: "Aug 13, 2026",
    status: "Under review",
  },
  {
    id: "CM-1018",
    title: "Road damage near residential area",
    description:
      "There is a damaged section of road causing difficulty for vehicles.",
    location: "Shanti Nagar",
    date: "Aug 10, 2026",
    status: "In progress",
  },
  {
    id: "CM-1007",
    title: "Garbage collection issue",
    description:
      "Garbage has not been collected from the area as scheduled.",
    location: "Shanti Nagar",
    date: "Aug 5, 2026",
    status: "Resolved",
  },
];

function statusStyles(status) {
  if (status === "Resolved") {
    return {
      badge: "border-[#BFE9DE] bg-[#E9F8F4] text-[#087F6A]",
      accent: "bg-[#00A68E]",
      icon: "border-[#BFE9DE] bg-[#E9F8F4] text-[#087F6A]",
    };
  }

  if (status === "In progress") {
    return {
      badge: "border-[#F1D58B] bg-[#FFF5DC] text-[#936600]",
      accent: "bg-[#E9A81B]",
      icon: "border-[#F1D58B] bg-[#FFF5DC] text-[#936600]",
    };
  }

  return {
    badge: "border-[#C9DFFF] bg-[#EEF5FF] text-[#2864A8]",
    accent: "bg-[#2D7FF9]",
    icon: "border-[#C9DFFF] bg-[#EEF5FF] text-[#2864A8]",
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
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  const openRequestPage = () => {
    setSelectedRequest(null);
    navigate("/citizen/request");
  };

  const trackRequest = (request) => {
    if (!request) return;

    setSelectedRequest(null);

    navigate("/citizen/repairs", {
      state: {
        requestId: request.id,
        requestTitle: request.title,
      },
    });
  };

  return (
    <div className="mx-auto max-w-[1120px]">
      <header>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          Citizen workspace
        </p>

        <div className="mt-1.5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A]">
              My <span className="text-[#2D7FF9]">Requests</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#63768A]">
              View the civic issues you have reported and follow their progress.
            </p>
          </div>

          <button
            type="button"
            onClick={openRequestPage}
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] px-4 text-xs font-bold text-white shadow-[0_6px_16px_rgba(13,27,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#18324C] hover:shadow-[0_8px_20px_rgba(13,27,42,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9]"
          >
            <span className="text-base leading-none">+</span>
            New request
          </button>
        </div>
      </header>

      <section className="mt-8 space-y-4" aria-label="Your civic requests">
        {requests.map((request) => {
          const styles = statusStyles(request.status);

          return (
            <article
              key={request.id}
              className="group relative overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9D8E6] hover:shadow-[0_12px_30px_rgba(13,27,42,0.075)]"
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`}
                aria-hidden="true"
              />

              <div className="p-5 pl-6 sm:p-6 sm:pl-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
                      >
                        {request.status}
                      </span>

                      <span className="text-[11px] font-semibold tracking-[0.04em] text-[#8A9AAA]">
                        {request.id}
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-3">
                      <RequestIcon status={request.status} />

                      <div className="min-w-0">
                        <h2 className="text-[16px] font-extrabold tracking-[-0.015em] text-[#18324C]">
                          {request.title}
                        </h2>

                        <p className="mt-1.5 max-w-2xl text-[14px] leading-6 text-[#506477]">
                          {request.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium text-[#718398]">
                      <span>
                        <strong className="font-bold text-[#49647D]">
                          Location:
                        </strong>{" "}
                        {request.location}
                      </span>

                      <span
                        className="hidden text-[#C4D0DB] sm:inline"
                        aria-hidden="true"
                      >
                        ·
                      </span>

                      <span>
                        <strong className="font-bold text-[#49647D]">
                          Submitted:
                        </strong>{" "}
                        {request.date}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className="shrink-0 self-start rounded-xl border border-[#C9D8E6] bg-white px-4 py-2.5 text-xs font-bold text-[#31516E] transition-all duration-200 hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2864A8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9]"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/45 p-4 backdrop-blur-[3px] sm:p-6"
          onMouseDown={() => setSelectedRequest(null)}
          role="presentation"
        >
          <section
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_24px_70px_rgba(5,18,33,0.20)]"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-details-title"
          >
            <div
              className={`h-1 w-full ${statusStyles(selectedRequest.status).accent}`}
            />

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        statusStyles(selectedRequest.status).badge
                      }`}
                    >
                      {selectedRequest.status}
                    </span>

                    <span className="text-[11px] font-semibold tracking-[0.04em] text-[#8A9AAA]">
                      {selectedRequest.id}
                    </span>
                  </div>

                  <h2
                    id="request-details-title"
                    className="mt-3 text-xl font-extrabold tracking-[-0.025em] text-[#0D1B2A]"
                  >
                    {selectedRequest.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#70859A] transition-colors hover:bg-[#F4F7FA] hover:text-[#0D1B2A]"
                  aria-label="Close request details"
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

              <div className="mt-6 rounded-xl border border-[#E1EAF2] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#70859A]">
                  Reported issue
                </p>

                <p className="mt-2 text-[14px] font-medium leading-6 text-[#263D52]">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                    Location
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                    {selectedRequest.location}
                  </p>
                </div>

                <div className="rounded-xl border border-[#E1EAF2] bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                    Submitted
                  </p>

                  <p className="mt-1.5 text-sm font-bold text-[#18324C]">
                    {selectedRequest.date}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#E8EFF5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-xl border border-[#DCE7F1] px-4 py-2.5 text-sm font-semibold text-[#49647D] transition-colors hover:bg-[#F7FAFC] hover:text-[#18324C]"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => trackRequest(selectedRequest)}
                  className="rounded-xl bg-[#0D1B2A] px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(13,27,42,0.12)] transition-all hover:bg-[#18324C] hover:shadow-[0_7px_18px_rgba(13,27,42,0.16)]"
                >
                  Track request
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}