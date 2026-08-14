function RequestStatus({ status }) {
  if (status === "resolved") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-[#CBE8E1]
          bg-[#F0FAF7]
          px-2.5
          py-1
          text-[10px]
          font-bold
          text-[#008C78]
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A68E]" />
        Resolved
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#F0DFC0]
        bg-[#FFF9EC]
        px-2.5
        py-1
        text-[10px]
        font-bold
        text-[#9B6A00]
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#E9A81B]" />
      Pending
    </span>
  );
}

function RequestIcon() {
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
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H11l-4.5 4v-4.2A2.5 2.5 0 0 1 5 13.5v-7Z" />
    </svg>
  );
}

const requests = [
  {
    title: "Streetlight issue near Shanti Nagar",
    date: "Today",
    status: "pending",
  },
  {
    title: "Road maintenance request",
    date: "Yesterday",
    status: "resolved",
  },
  {
    title: "Water leakage reported",
    date: "Aug 08",
    status: "pending",
  },
];

export default function RecentRequests() {
  return (
    <section
      className="font-['Inter',sans-serif]"
      aria-labelledby="recent-requests-title"
    >
      {/* Heading */}
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <span className="h-[2px] w-7 rounded-full bg-[#2D7FF9]" />

            <p className="m-0 text-[10px] font-bold tracking-[0.16em] text-[#627A92]">
              REQUEST HISTORY
            </p>
          </div>

          <h2
            id="recent-requests-title"
            className="
              m-0
              text-[22px]
              font-extrabold
              tracking-[-0.03em]
              text-[#0D1B2A]
            "
          >
            Recent requests
          </h2>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            px-2.5
            py-1.5
            text-[11px]
            font-bold
            text-[#2D7FF9]
            transition-colors
            hover:bg-[#EEF5FF]
            hover:text-[#1E4FA3]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#2D7FF9]
          "
        >
          View all
        </button>
      </div>

      {/* Request list */}
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
        {requests.map((request, index) => (
          <button
            key={request.title}
            type="button"
            className={`
              group
              flex
              w-full
              items-center
              gap-4
              px-5
              py-[18px]
              text-left
              transition-colors
              duration-200
              hover:bg-[#FAFCFE]
              ${
                index !== requests.length - 1
                  ? "border-b border-[#E8EEF4]"
                  : ""
              }
            `}
          >
            {/* Request icon */}
            <span
              className="
                grid
                h-9
                w-9
                shrink-0
                place-items-center
                rounded-xl
                border
                border-[#DCE7F1]
                bg-[#F5F8FB]
                text-[#60788E]
                transition-colors
                group-hover:border-[#CFE1F5]
                group-hover:bg-[#F0F6FF]
                group-hover:text-[#2D7FF9]
              "
            >
              <RequestIcon />
            </span>

            {/* Request details */}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-bold tracking-[-0.01em] text-[#40586D]">
                {request.title}
              </span>

              <span className="mt-1 block text-[12px] font-medium text-[#7B8FA2]">
                {request.date}
              </span>
            </span>

            {/* Status */}
            <RequestStatus status={request.status} />
          </button>
        ))}
      </div>
    </section>
  );
}