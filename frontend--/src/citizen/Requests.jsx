import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCitizenRequests } from "../api/citizen.api";

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
      badge: "border-amber-200 bg-amber-50 text-amber-800",
      accent: "bg-amber-500",
      icon: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    badge: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
    accent: "bg-[#2D7FF9]",
    icon: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
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
  const [requestsList, setRequestsList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadRequests() {
      setLoading(true);
      try {
        const res = await getCitizenRequests();
        if (isMounted && res?.data) {
          setRequestsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching citizen requests from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadRequests();
    return () => {
      isMounted = false;
    };
  }, []);

  const openRequestPage = () => {
    setSelectedRequest(null);
    navigate("/citizen");
  };

  const startConversation = (request) => {
    if (!request) return;

    setSelectedRequest(null);

    sessionStorage.setItem(
      "civicMirrorRequestDraft",
      JSON.stringify({
        message: `Regarding ${request.id} (${request.title}): `,
        fileName: "",
      }),
    );

    navigate("/citizen");
  };

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
              My <span className="text-[#2D7FF9]">Requests</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A] max-w-2xl">
              View the civic issues you have reported and follow their real-time progress.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <button
              type="button"
              onClick={openRequestPage}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2A] px-5 py-3 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer shadow-xs"
            >
              <span className="text-sm leading-none">+</span>
              New Request
            </button>
          </div>
        </div>
      </div>

      {/* SUB-SECTION HEADER LINE */}
      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
          SUBMITTED CIVIC REQUESTS
        </span>
        <span className="text-xs font-bold text-slate-400">
          Realtime Status Sync
        </span>
      </div>

      {/* REQUESTS LIST */}
      <section className="space-y-4" aria-label="Your civic requests">
        {requestsList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-sm">
            {loading ? "Loading your submitted civic requests..." : "No civic requests reported yet."}
          </div>
        ) : (
          requestsList.map((request) => {
            const styles = statusStyles(request.status);

          return (
            <article
              key={request.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2D7FF9]"
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`}
                aria-hidden="true"
              />

              <div className="p-6 pl-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-black ${styles.badge}`}
                      >
                        {request.status}
                      </span>

                      <span className="text-xs font-bold tracking-wider text-slate-400">
                        {request.id}
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-4">
                      <RequestIcon status={request.status} />

                      <div className="min-w-0">
                        <h2 className="text-base font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                          {request.title}
                        </h2>

                        <p className="mt-1.5 max-w-2xl text-xs font-medium leading-relaxed text-slate-600">
                          {request.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
                      <span>
                        <strong className="font-black text-[#0D1B2A]">
                          Location:
                        </strong>{" "}
                        {request.location}
                      </span>

                      <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
                        ·
                      </span>

                      <span>
                        <strong className="font-black text-[#0D1B2A]">
                          Submitted:
                        </strong>{" "}
                        {request.date}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className="shrink-0 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-[#0D1B2A] transition-all hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] cursor-pointer shadow-xs"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          );
        })
      )}
      </section>

      {/* REQUEST DETAILS MODAL */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/40 p-4 backdrop-blur-xs sm:p-6"
          onMouseDown={() => setSelectedRequest(null)}
          role="presentation"
        >
          <section
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-details-title"
          >
            <div
              className={`h-1.5 w-full ${statusStyles(selectedRequest.status).accent}`}
            />

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-black ${
                        statusStyles(selectedRequest.status).badge
                      }`}
                    >
                      {selectedRequest.status}
                    </span>

                    <span className="text-xs font-bold text-slate-400">
                      {selectedRequest.id}
                    </span>
                  </div>

                  <h2
                    id="request-details-title"
                    className="mt-3 text-xl font-black text-[#0D1B2A]"
                  >
                    {selectedRequest.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0D1B2A]"
                  aria-label="Close request details"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Reported issue
                </p>

                <p className="mt-2 text-xs font-semibold leading-relaxed text-[#0D1B2A]">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200/80 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-xs font-black text-[#0D1B2A]">
                    {selectedRequest.location}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Submitted
                  </p>

                  <p className="mt-1 text-xs font-black text-[#0D1B2A]">
                    {selectedRequest.date}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => startConversation(selectedRequest)}
                  className="rounded-xl bg-[#0D1B2A] px-5 py-2.5 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer shadow-xs"
                >
                  Start conversation →
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}