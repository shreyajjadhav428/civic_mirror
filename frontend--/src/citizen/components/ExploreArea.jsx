import { useState } from "react";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-5
        w-5
        fill-none
        stroke-current
        stroke-[1.8]
        [stroke-linecap:round]
        [stroke-linejoin:round]
      "
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const issueCategories = [
  {
    name: "Roads",
    count: 5,
  },
  {
    name: "Street Lighting",
    count: 3,
  },
  {
    name: "Waste Management",
    count: 2,
  },
  {
    name: "Water Supply",
    count: 2,
  },
];

const areaActivity = [
  {
    title: "Road maintenance reported",
    description: "A road maintenance issue was reported in the area.",
    date: "Today",
  },
  {
    title: "Streetlight request resolved",
    description: "A reported streetlight issue has been marked resolved.",
    date: "Yesterday",
  },
  {
    title: "Park improvement project",
    description: "Improvement work is currently ongoing at a nearby public park.",
    date: "2 days ago",
  },
];

function AreaDetailsModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="area-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Area overview
            </p>

            <h2
              id="area-details-title"
              className="mt-1 text-xl font-semibold text-[#0D1B2A]"
            >
              Shanti Nagar · 110025
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close area details"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
          >
            ✕
          </button>
        </header>

        <section className="mt-6">
          <h3 className="text-sm font-semibold text-[#0D1B2A]">
            Area activity
          </h3>

          <div className="mt-3 space-y-3">
            {areaActivity.map((activity) => (
              <article
                key={activity.title}
                className="rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-sm font-medium text-[#18324C]">
                    {activity.title}
                  </h4>

                  <span className="shrink-0 text-xs text-gray-500">
                    {activity.date}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-semibold text-[#0D1B2A]">
            Issue categories
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {issueCategories.map((category) => (
              <article
                key={category.name}
                className="rounded-lg border border-gray-100 p-4"
              >
                <p className="text-sm font-medium text-[#18324C]">
                  {category.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {category.count} active issues
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-semibold text-[#0D1B2A]">
            Area summary
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-lg font-semibold">12</p>
              <p className="mt-1 text-xs text-gray-500">
                Active issues
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-lg font-semibold">7</p>
              <p className="mt-1 text-xs text-gray-500">
                Resolved
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-lg font-semibold">3</p>
              <p className="mt-1 text-xs text-gray-500">
                Ongoing projects
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-7 flex justify-end border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function ExploreArea() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      className="font-['Inter',sans-serif]"
      aria-labelledby="area-title"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
            Local overview
          </p>

          <h2
            id="area-title"
            className="
              mt-1.5
              m-0
              text-[22px]
              font-extrabold
              tracking-[-0.03em]
              text-[#0D1B2A]
            "
          >
            Explore your area
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="
            self-start
            rounded-lg
            px-3
            py-2
            text-[12px]
            font-semibold
            text-[#2D7FF9]
            sm:self-auto
          "
        >
          View area activity
        </button>
      </div>

      <article
        className="
          overflow-hidden
          rounded-[20px]
          border
          border-[#DCE7F1]
          bg-white
          shadow-[0_8px_28px_rgba(13,27,42,0.055)]
        "
      >
        <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
          <div
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              rounded-xl
              border
              border-[#CFE1F5]
              bg-[#F0F6FF]
              text-[#2D7FF9]
            "
            aria-hidden="true"
          >
            <PinIcon />
          </div>

          <div>
            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7A8DA0]">
              Your area
            </p>

            <p className="mt-0.5 m-0 text-lg font-bold tracking-[-0.02em] text-[#0D1B2A]">
              110025
            </p>

            <p className="mt-0.5 m-0 text-[13px] font-medium text-[#61758A]">
              Shanti Nagar
            </p>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-[#E8EFF5]
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
              text-[12px]
              font-medium
              text-[#64798D]
            "
            aria-label="Area statistics"
          >
            <span>
              <strong className="font-bold text-[#0D1B2A]">12</strong>{" "}
              active issues
            </span>

            <span>
              <strong className="font-bold text-[#0D1B2A]">7</strong>{" "}
              resolved
            </span>

            <span>
              <strong className="font-bold text-[#0D1B2A]">3</strong>{" "}
              ongoing projects
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0D1B2A]
              px-4
              py-2.5
              text-[12px]
              font-bold
              text-white
            "
          >
            Explore area

            <span aria-hidden="true" className="text-[15px]">
              →
            </span>
          </button>
        </div>
      </article>

      {showDetails && (
        <AreaDetailsModal onClose={() => setShowDetails(false)} />
      )}
    </section>
  );
}