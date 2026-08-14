import React from "react";

const statistics = [
  {
    label: "Total requests",
    value: "24",
    detail: "Requests submitted by you",
    tone: "blue",
    icon: "total",
  },
  {
    label: "Pending",
    value: "7",
    detail: "Requests currently in progress",
    tone: "amber",
    icon: "pending",
  },
  {
    label: "Resolved",
    value: "17",
    detail: "Requests successfully resolved",
    tone: "teal",
    icon: "resolved",
  },
];

function StatIcon({ type }) {
  if (type === "total") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h5M8 17h3" />
      </svg>
    );
  }

  if (type === "pending") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12 2.3 2.3 4.8-5" />
    </svg>
  );
}

function StatGraphic({ type }) {
  if (type === "total") {
    return (
      <div
        className="relative h-[46px] w-[78px] shrink-0"
        aria-hidden="true"
      >
        <div className="absolute bottom-1 left-0 h-1.5 w-1.5 rounded-full bg-[#2D7FF9]" />

        <div className="absolute bottom-3 left-4 h-2.5 w-2.5 rounded-full bg-[#5B5BD6]/70" />

        <div className="absolute bottom-0 left-8 h-2 w-2 rounded-full bg-[#2D7FF9]/60" />

        <div className="absolute bottom-4 left-[48px] h-3 w-3 rounded-full bg-[#2D7FF9]/20" />

        <div className="absolute bottom-1 left-[66px] h-2.5 w-2.5 rounded-full bg-[#00A68E]/60" />

        <svg
          viewBox="0 0 78 46"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <path
            d="M2 36C15 31 23 33 33 27C43 21 48 23 57 16C65 10 70 12 76 5"
            stroke="#2D7FF9"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (type === "pending") {
    return (
      <div
        className="relative grid h-[50px] w-[50px] shrink-0 place-items-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 50 50"
          className="absolute inset-0 h-full w-full -rotate-90"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#F3E4C2"
            strokeWidth="4"
          />

          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#D99A24"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="126"
            strokeDashoffset="43"
          />
        </svg>

        <span className="text-[9px] font-bold text-[#9B6A00]">
          active
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative grid h-[50px] w-[50px] shrink-0 place-items-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-[#00A68E]/[0.07]" />

      <div className="relative grid h-[39px] w-[39px] place-items-center rounded-full border border-[#8ED8CC] bg-[#F1FBF8] text-[#008C78]">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 12 3 3 7-7" />
        </svg>
      </div>
    </div>
  );
}

const toneStyles = {
  blue: {
    icon: "border-[#CFE1F7] bg-[#F1F7FE] text-[#2D7FF9]",
    accent: "bg-[#2D7FF9]",
  },

  amber: {
    icon: "border-[#F0DFC0] bg-[#FFF9EC] text-[#B77A0B]",
    accent: "bg-[#E9A81B]",
  },

  teal: {
    icon: "border-[#C5E8E1] bg-[#EFFAF7] text-[#00A68E]",
    accent: "bg-[#00A68E]",
  },
};

export default function DashboardStatistics() {
  return (
    <section
      className="font-['Inter',sans-serif]"
      aria-labelledby="statistics-title"
    >
      {/* Panel heading */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <span className="h-[2px] w-7 rounded-full bg-[#5B5BD6]" />

            <p className="m-0 text-[10px] font-bold tracking-[0.16em] text-[#627A92]">
              YOUR CIVIC ACTIVITY
            </p>
          </div>

          <h2
            id="statistics-title"
            className="m-0 text-[22px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]"
          >
            Your requests
          </h2>
        </div>
      </div>

      {/* Activity panel */}
      <div
        className="
          overflow-hidden
          rounded-[20px]
          border
          border-[#DFE8F0]
          bg-white
          shadow-[0_8px_28px_rgba(13,27,42,0.055)]
        "
      >
        {statistics.map((stat, index) => {
          const style = toneStyles[stat.tone];

          return (
            <article
              key={stat.label}
              className={`
                relative
                px-5
                py-[18px]
                transition-colors
                duration-200
                hover:bg-[#FAFCFE]
                ${
                  index !== statistics.length - 1
                    ? "border-b border-[#E8EEF4]"
                    : ""
                }
              `}
            >
              {/* Accent line */}
              <div
                className={`
                  absolute
                  left-0
                  top-1/2
                  h-9
                  w-[3px]
                  -translate-y-1/2
                  rounded-r-full
                  ${style.accent}
                `}
              />

              <div className="flex items-center justify-between gap-4">
                {/* Left content */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`
                      grid
                      h-10
                      w-10
                      shrink-0
                      place-items-center
                      rounded-xl
                      border
                      ${style.icon}
                    `}
                  >
                    <StatIcon type={stat.icon} />
                  </span>

                  <div className="min-w-0">
                    <p className="m-0 text-[14px] font-bold tracking-[-0.01em] text-[#40586D]">
                      {stat.label}
                    </p>

                    <p className="mt-1 truncate text-[12px] leading-5 text-[#7B8FA2]">
                      {stat.detail}
                    </p>
                  </div>
                </div>

                {/* Right content */}
                <div className="flex shrink-0 items-center gap-4">
                  <p className="m-0 text-[31px] font-extrabold tracking-[-0.05em] text-[#0D1B2A]">
                    {stat.value}
                  </p>

                  <StatGraphic type={stat.icon} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}