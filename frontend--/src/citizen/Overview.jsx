import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const statistics = [
  {
    label: "Active requests",
    value: "04",
    detail: "Currently being reviewed",
    tone: "blue",
    icon: "requests",
  },
  {
    label: "Resolved requests",
    value: "08",
    detail: "Successfully completed",
    tone: "teal",
    icon: "resolved",
  },
  {
    label: "Tracked repairs",
    value: "12",
    detail: "Recent civic activity",
    tone: "purple",
    icon: "updates",
  },
];

const recentRequests = [
  {
    title: "Streetlight issue near Shanti Nagar",
    date: "Today",
    status: "Pending",
    icon: "light",
  },
  {
    title: "Road maintenance request",
    date: "Yesterday",
    status: "Resolved",
    icon: "road",
  },
  {
    title: "Water leakage reported",
    date: "Aug 08",
    status: "Pending",
    icon: "water",
  },
];

function StatisticIcon({ type }) {
  if (type === "requests") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 3.5h7l4 4v13H7z" />
        <path d="M14 3.5v5h5" />
        <path d="M10 13h5M10 16.5h4" />
      </svg>
    );
  }

  if (type === "resolved") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12 2.3 2.3 4.8-5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4" />
    </svg>
  );
}

function RequestIcon({ type }) {
  if (type === "light") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[17px] w-[17px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8.7 14.5a6 6 0 1 1 6.6 0c-.9.7-1.3 1.4-1.3 2.5h-4c0-1.1-.4-1.8-1.3-2.5Z" />
        <path d="M12 2v1.5M4.9 4.9l1 1M19.1 4.9l-1 1" />
      </svg>
    );
  }

  if (type === "road") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[17px] w-[17px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 3 5 21M16 3l3 18" />
        <path d="M12 4v3M12 10v4M12 17v3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v18" />
      <path d="M7 7h10M7 7c0 3 1.8 4.5 5 4.5S17 10 17 7" />
      <path d="M7 17h10" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10.2c0 5.3-8 10.3-8 10.3S4 15.5 4 10.2a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M5 14.5v4a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5v-4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8-1.8 6.2-1.8-6.2L4 10.8 10.2 9 12 2.8Z"
        fill="url(#aiGradient)"
      />

      <defs>
        <linearGradient
          id="aiGradient"
          x1="5"
          y1="5"
          x2="19"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D7FF9" />
          <stop offset="0.55" stopColor="#6857E8" />
          <stop offset="1" stopColor="#9B5DE5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3M9 21h6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="m6.5 10.5 5.5-5.5 5.5 5.5" />
    </svg>
  );
}

export default function Overview() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const fileInput = useRef(null);

  const submitRequest = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    sessionStorage.setItem(
      "civicMirrorRequestDraft",
      JSON.stringify({
        message: trimmedMessage,
        fileName,
      }),
    );

    setMessage("");
    setFileName("");

    navigate("/citizen/request");
  };

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* =========================================================
          HEADER BANNER (Matching Admin Portal Design System)
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
              Civic <span className="text-[#2D7FF9]">Overview</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A] max-w-2xl">
              Review civic activity in your area, track your requests, and report an issue when something needs attention.
            </p>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4.5 py-2.5 text-sm font-semibold">
              <span className="text-[#657386] block text-[11px] font-black uppercase tracking-wider">Active Location</span>
              <span className="text-[#0D1B2A] font-black text-lg">400012 • Shanti Nagar</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-SECTION HEADER LINE */}
      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
          CIVIC ACTIVITY & REQUEST HISTORY
        </span>
        <span className="text-xs font-bold text-slate-400">
          Realtime Synchronization
        </span>
      </div>

      {/* =========================================================
          OVERVIEW STATISTICS & RECENT REQUESTS GRID
      ========================================================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(270px,0.85fr)_minmax(0,1.65fr)]">
        {/* Overview Activity Stats */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0D1B2A]">
              YOUR OVERVIEW
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {statistics.map((stat) => {
              const isBlue = stat.tone === "blue";
              const isTeal = stat.tone === "teal";

              const iconBackground = isBlue
                ? "bg-[#EEF5FF] text-[#2D7FF9] border-[#D5E7FF]"
                : isTeal
                  ? "bg-[#EAF9F5] text-[#00A68E] border-[#D1EEE7]"
                  : "bg-[#F1EFFF] text-[#6857E8] border-[#DDD8FF]";

              const accent = isBlue
                ? "bg-[#2D7FF9]"
                : isTeal
                  ? "bg-[#00A68E]"
                  : "bg-[#6857E8]";

              return (
                <article
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2D7FF9]"
                  key={stat.label}
                >
                  <div
                    className={`absolute left-0 top-0 h-full w-[4px] ${accent}`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl border ${iconBackground}`}
                    >
                      <StatisticIcon type={stat.icon} />
                    </span>

                    <span
                      className={`h-1.5 w-8 rounded-full opacity-80 ${accent}`}
                    />
                  </div>

                  <p className="mt-4 text-xs font-black uppercase tracking-wider text-[#657386]">
                    {stat.label}
                  </p>

                  <div className="mt-0.5 flex items-end gap-2">
                    <p className="text-3xl font-black tracking-tight text-[#0D1B2A]">
                      {stat.value}
                    </p>
                  </div>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {stat.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Recent Requests List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0D1B2A]">
              RECENT REQUESTS
            </h2>

            <button
              type="button"
              onClick={() => navigate("/citizen/requests")}
              className="rounded-xl px-3 py-1 text-xs font-extrabold text-[#2D7FF9] hover:bg-blue-50 transition-colors"
            >
              View all requests →
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
            {recentRequests.map((request, index) => (
              <button
                key={request.title}
                type="button"
                onClick={() => navigate("/citizen/requests")}
                className={`group flex w-full items-center gap-4 px-6 py-4.5 text-left transition-colors duration-150 hover:bg-slate-50/80 ${
                  index !== recentRequests.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-[#0D1B2A] transition-colors group-hover:border-[#2D7FF9] group-hover:bg-[#EEF5FF] group-hover:text-[#2D7FF9]">
                  <RequestIcon type={request.icon} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                    {request.title}
                  </span>

                  <span className="mt-0.5 block text-xs font-semibold text-slate-400">
                    {request.date}
                  </span>
                </span>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
                    request.status === "Resolved"
                      ? "bg-emerald-50 text-[#008D78] border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {request.status}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* =========================================================
          LOCAL AREA OVERVIEW
      ========================================================= */}
      <section className="pt-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#0D1B2A]">
            EXPLORE YOUR AREA
          </h2>

          <button
            type="button"
            onClick={() => navigate("/citizen/repairs")}
            className="rounded-xl px-3 py-1 text-xs font-extrabold text-[#2D7FF9] hover:bg-blue-50 transition-colors"
          >
            Track area repairs →
          </button>
        </div>

        <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between gap-5 p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#2D7FF9]/30 bg-[#EEF5FF] text-[#2D7FF9]">
                <LocationIcon />
              </span>

              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Your Primary Sector
                </p>

                <p className="mt-0.5 text-xl font-black text-[#0D1B2A]">
                  Pincode 400012
                </p>

                <p className="mt-0.5 text-xs font-bold text-slate-500">
                  Shanti Nagar Ward
                </p>
              </div>
            </div>

            <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-black text-[#008D78] sm:block">
              Active Civic Monitoring ✓
            </span>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-600">
              <strong className="text-[#0D1B2A] font-black">12</strong> active issues
              <span className="mx-2 text-slate-300">·</span>
              <strong className="text-[#008D78] font-black">7</strong> resolved
              <span className="mx-2 text-slate-300">·</span>
              <strong className="text-[#2D7FF9] font-black">3</strong> ongoing projects
            </p>

            <button
              type="button"
              onClick={() => navigate("/citizen/repairs")}
              className="rounded-xl bg-[#0D1B2A] px-5 py-2.5 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer shadow-xs"
            >
              Track Repairs →
            </button>
          </div>
        </article>
      </section>

      {/* =========================================================
          STICKY REQUEST COMPOSER
      ========================================================= */}
      <section className="fixed bottom-4 left-4 right-4 z-20 min-[861px]:left-[272px] min-[861px]:right-6">
        <form
          onSubmit={submitRequest}
          className="mx-auto flex min-h-[58px] w-full max-w-[820px] items-center gap-1 rounded-full border border-[#3B4D5D] bg-[#0D1B2A]/[0.98] px-2 shadow-[0_10px_30px_rgba(0,0,0,0.20)] backdrop-blur-xl"
        >
          <input
            ref={fileInput}
            className="sr-only"
            type="file"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name || "")
            }
          />

          {/* Upload */}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#D8E9FA] transition-colors hover:bg-[#1C334D] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF] cursor-pointer"
            aria-label="Attach photo or document"
          >
            <UploadIcon />
          </button>

          {/* AI */}
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#0D1B2A] transition-transform hover:scale-[1.04] hover:bg-[#F8FBFF] cursor-pointer"
            aria-label="AI assistance"
          >
            <SparkleIcon />
          </button>

          {/* Selected file */}
          {fileName && (
            <span className="hidden max-w-28 truncate rounded-full border border-[#496071] bg-[#314454] px-2.5 py-1 text-[10px] font-medium text-[#DCE8F5] sm:block">
              {fileName}
            </span>
          )}

          {/* Message */}
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message CivicMirror..."
            rows={1}
            className="min-h-[34px] min-w-0 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-[13px] font-medium text-white outline-none placeholder:text-[#8394A5]"
          />

          {/* Voice */}
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#D8E9FA] transition-colors hover:bg-[#1C334D] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF] cursor-pointer"
            aria-label="Use voice input"
          >
            <MicIcon />
          </button>

          {/* Send */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="
              grid h-9 w-9 shrink-0 place-items-center rounded-full
              bg-white text-[#0D1B2A]
              transition-all duration-200
              hover:bg-[#F3F7FB]
              hover:shadow-[0_3px_12px_rgba(255,255,255,0.12)]
              disabled:cursor-not-allowed
              disabled:bg-slate-600
              disabled:text-slate-400
              cursor-pointer
            "
            aria-label="Open request page"
          >
            <SendIcon />
          </button>
        </form>
      </section>
    </div>
  );
}