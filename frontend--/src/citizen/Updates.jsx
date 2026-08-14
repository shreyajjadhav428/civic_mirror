import { useEffect, useState } from "react";

const updates = [
  {
    type: "Project update",
    title: "Main Road Improvement Project",
    description:
      "Road maintenance work is currently underway in the area. Residents may notice temporary changes to traffic movement.",
    date: "14 Aug 2026",
    tone: "blue",
    number: "01",
  },
  {
    type: "Civic announcement",
    title: "Scheduled Water Supply Maintenance",
    description:
      "Maintenance work may temporarily affect water supply in selected areas. Normal service is expected to resume after completion.",
    date: "13 Aug 2026",
    tone: "yellow",
    number: "02",
  },
  {
    type: "Local update",
    title: "Community Park Improvement",
    description:
      "Improvement work is being carried out at a nearby public park to enhance facilities and the surrounding public space.",
    date: "11 Aug 2026",
    tone: "green",
    number: "03",
  },
];

function ArrowIcon() {
  return (
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
  );
}

function UpdateIcon({ tone }) {
  const classes =
    tone === "blue"
      ? "bg-[#EEF5FF] text-[#2D7FF9]"
      : tone === "yellow"
        ? "bg-[#FFF5DC] text-[#B27A00]"
        : "bg-[#E9F8F4] text-[#008B76]";

  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${classes}`}
    >
      {tone === "blue" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19V8" />
          <path d="M10 19V5" />
          <path d="M16 19v-8" />
          <path d="M22 19V3" />
        </svg>
      )}

      {tone === "yellow" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )}

      {tone === "green" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      )}
    </span>
  );
}

function updateToneClasses(tone) {
  if (tone === "yellow") {
    return {
      accent: "bg-[#E9A81B]",
      text: "text-[#A97600]",
      softBackground: "bg-[#FFF8E8]",
      border: "border-[#F1D58B]",
    };
  }

  if (tone === "green") {
    return {
      accent: "bg-[#00A68E]",
      text: "text-[#008B76]",
      softBackground: "bg-[#E9F8F4]",
      border: "border-[#BFE9DE]",
    };
  }

  return {
    accent: "bg-[#2D7FF9]",
    text: "text-[#2D7FF9]",
    softBackground: "bg-[#EEF5FF]",
    border: "border-[#C9DFFF]",
  };
}

export default function Updates() {
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(() => {
    if (!selectedUpdate) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedUpdate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedUpdate]);

  const selectedTone = selectedUpdate
    ? updateToneClasses(selectedUpdate.tone)
    : null;

  return (
    <div className="mx-auto max-w-[1120px]">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          Citizen workspace
        </p>

        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A] sm:text-[32px]">
          City Updates
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#63768A] sm:text-[15px]">
          Stay informed about announcements, projects, and service updates
          happening in your area.
        </p>
      </header>

      {/* Area status strip */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_24px_rgba(13,27,42,0.045)]">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF5FF] text-[#2D7FF9]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Your area
              </p>

              <p className="mt-0.5 text-sm font-bold text-[#18324C]">
                Shanti Nagar · 110025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#008B76]">
            <span className="h-2 w-2 rounded-full bg-[#00A68E]" />
            Updates available
          </div>
        </div>
      </section>

      {/* Updates */}
      <section
        className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        aria-label="City updates"
      >
        {updates.map((update) => (
          <article
            key={update.title}
            className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#C8D9E8] hover:shadow-[0_16px_36px_rgba(13,27,42,0.075)] sm:p-6"
          >
            <div
              className={`absolute inset-x-0 top-0 h-[3px] ${
                update.tone === "blue"
                  ? "bg-[#2D7FF9]"
                  : update.tone === "yellow"
                    ? "bg-[#E9A81B]"
                    : "bg-[#00A68E]"
              }`}
            />

            <div className="flex items-start justify-between">
              <UpdateIcon tone={update.tone} />

              <span className="text-[30px] font-extrabold tracking-[-0.05em] text-[#EDF2F6] transition-colors duration-300 group-hover:text-[#DCE6EF]">
                {update.number}
              </span>
            </div>

            <p
              className={`mt-6 text-[10px] font-bold uppercase tracking-[0.12em] ${
                update.tone === "blue"
                  ? "text-[#2D7FF9]"
                  : update.tone === "yellow"
                    ? "text-[#B27A00]"
                    : "text-[#008B76]"
              }`}
            >
              {update.type}
            </p>

            <h2 className="mt-2 text-[17px] font-extrabold leading-6 tracking-[-0.02em] text-[#18324C]">
              {update.title}
            </h2>

            <p className="mt-2 text-[13px] leading-6 text-[#63768A]">
              {update.description}
            </p>

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between border-t border-[#E8EFF5] pt-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#98A6B3]">
                    Published
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold text-[#6E8193]">
                    {update.date}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUpdate(update)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-bold transition-all duration-200 ${
                    update.tone === "blue"
                      ? "text-[#2D7FF9] hover:bg-[#EEF5FF]"
                      : update.tone === "yellow"
                        ? "text-[#A97600] hover:bg-[#FFF8E8]"
                        : "text-[#008B76] hover:bg-[#E9F8F4]"
                  }`}
                >
                  Read update
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom information */}
      <section className="mt-6 rounded-2xl border border-[#DCE7F1] bg-[#F7FAFD] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#6857E8] shadow-[0_2px_8px_rgba(13,27,42,0.05)]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7h.01" />
            </svg>
          </span>

          <p className="text-xs leading-5 text-[#6A7D91]">
            City updates help you stay aware of planned work, public services,
            and changes that may affect your area.
          </p>
        </div>
      </section>

      {selectedUpdate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/45 p-4 backdrop-blur-[3px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedUpdate(null);
            }
          }}
          role="presentation"
        >
          <section
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_24px_70px_rgba(5,18,33,0.20)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-update-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={`h-1 w-full ${selectedTone.accent}`} />

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <UpdateIcon tone={selectedUpdate.tone} />

                  <div className="min-w-0">
                    <p className={`text-[10px] font-bold uppercase tracking-[0.12em] ${selectedTone.text}`}>
                      {selectedUpdate.type}
                    </p>

                    <h2
                      id="city-update-dialog-title"
                      className="mt-1.5 text-xl font-extrabold tracking-[-0.025em] text-[#0D1B2A]"
                    >
                      {selectedUpdate.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  aria-label="Close city update"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#70859A] transition-colors hover:bg-[#F4F7FA] hover:text-[#0D1B2A]"
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

              <div className={`mt-6 rounded-xl border ${selectedTone.border} ${selectedTone.softBackground} p-4`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#70859A]">
                  Published
                </p>

                <p className="mt-1 text-sm font-bold text-[#18324C]">
                  {selectedUpdate.date}
                </p>
              </div>

              <section className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                  City update
                </p>

                <p className="mt-2 text-sm leading-6 text-[#63768A]">
                  {selectedUpdate.description}
                </p>
              </section>

              <section className="mt-5 rounded-xl border border-[#E1EAF2] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#70859A]">
                  About this update
                </p>

                <p className="mt-2 text-xs leading-5 text-[#63768A]">
                  This is a city and public-service update relevant to your area.
                </p>
              </section>

              <div className="mt-6 flex justify-end border-t border-[#E8EFF5] pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  className="rounded-xl border border-[#DCE7F1] px-4 py-2.5 text-sm font-semibold text-[#49647D] transition-colors hover:bg-[#F7FAFC] hover:text-[#18324C]"
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}