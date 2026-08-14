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

export default function ExploreArea() {
  return (
    <section
      className="font-['Inter',sans-serif]"
      aria-labelledby="area-title"
    >
      {/* Section heading */}
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
          className="
            self-start
            rounded-lg
            px-3
            py-2
            text-[12px]
            font-semibold
            text-[#2D7FF9]
            transition-all
            duration-200
            hover:bg-[#EEF5FF]
            hover:text-[#1E4FA3]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#2D7FF9]
            sm:self-auto
          "
        >
          View area activity
        </button>
      </div>

      {/* Area card */}
      <article
        className="
          overflow-hidden
          rounded-[20px]
          border
          border-[#DCE7F1]
          bg-white
          shadow-[0_8px_28px_rgba(13,27,42,0.055)]
          transition-all
          duration-300
          hover:-translate-y-[2px]
          hover:shadow-[0_14px_34px_rgba(13,27,42,0.08)]
        "
      >
        {/* Location */}
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

        {/* Metrics */}
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
              <strong className="font-bold text-[#0D1B2A]">
                12
              </strong>{" "}
              active issues
            </span>

            <span>
              <strong className="font-bold text-[#0D1B2A]">
                7
              </strong>{" "}
              resolved
            </span>

            <span>
              <strong className="font-bold text-[#0D1B2A]">
                3
              </strong>{" "}
              ongoing projects
            </span>
          </div>

          <button
            type="button"
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
              shadow-[0_5px_14px_rgba(13,27,42,0.12)]
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:bg-[#183653]
              hover:shadow-[0_8px_18px_rgba(13,27,42,0.16)]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#2D7FF9]
              active:translate-y-0
            "
          >
            Explore area

            <span
              aria-hidden="true"
              className="text-[15px] transition-transform duration-200"
            >
              →
            </span>
          </button>
        </div>
      </article>
    </section>
  );
}