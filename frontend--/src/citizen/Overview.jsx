import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const statistics = [
  { label: "Active requests", value: "04", detail: "Currently being reviewed", tone: "blue" },
  { label: "Resolved requests", value: "08", detail: "Successfully completed", tone: "teal" },
  { label: "Area updates", value: "12", detail: "Recent civic activity", tone: "purple" },
];

const recentRequests = [
  { title: "Streetlight issue near Shanti Nagar", date: "Today", status: "Pending" },
  { title: "Road maintenance request", date: "Yesterday", status: "Resolved" },
  { title: "Water leakage reported", date: "Aug 08", status: "Pending" },
];

export default function Overview() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInput = useRef(null);

  const submitRequest = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    navigate("/citizen/request");
  };

  return (
    <>
      <section className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
          Citizen workspace
        </p>
        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A]">
          Welcome to Civic<span className="text-[#2D7FF9]">Mirror</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#63768A]">
          View civic activity in your area, track your requests, and report an issue when something needs attention.
        </p>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(270px,0.78fr)_minmax(0,1.65fr)]">
        <section>
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
              Civic activity
            </p>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]">
              Your overview
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {statistics.map((stat) => (
              <article
                className="rounded-[20px] border border-[#DFE8F0] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)]"
                key={stat.label}
              >
                <span className={`h-1 w-8 rounded-full ${
                  stat.tone === "teal"
                    ? "bg-[#00A68E]"
                    : stat.tone === "purple"
                      ? "bg-[#6857E8]"
                      : "bg-[#2D7FF9]"
                }`} />
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.09em] text-[#718398]">
                  {stat.label}
                </p>
                <p className="mt-1 text-[30px] font-extrabold tracking-[-0.04em] text-[#18324C]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#718398]">{stat.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
                Request history
              </p>
              <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]">
                Recent requests
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("requests")}
              className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#2D7FF9] hover:bg-[#EEF5FF]"
            >
              View all
            </button>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#DFE8F0] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
            {recentRequests.map((request, index) => (
              <button
                key={request.title}
                type="button"
                onClick={() => onNavigate("requests")}
                className={`flex w-full items-center gap-4 px-5 py-[18px] text-left hover:bg-[#FAFCFE] ${
                  index !== recentRequests.length - 1 ? "border-b border-[#E8EEF4]" : ""
                }`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#DCE7F1] bg-[#F5F8FB] text-[#60788E]">
                  ◌
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-bold text-[#40586D]">
                    {request.title}
                  </span>
                  <span className="mt-1 block text-[12px] font-medium text-[#7B8FA2]">
                    {request.date}
                  </span>
                </span>
                <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                  request.status === "Resolved"
                    ? "bg-[#E9F8F4] text-[#087F6A]"
                    : "bg-[#FFF5DC] text-[#936600]"
                }`}>
                  {request.status}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
              Local overview
            </p>
            <h2 className="mt-1 text-[22px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]">
              Explore your area
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("updates")}
            className="rounded-lg px-3 py-2 text-[12px] font-semibold text-[#2D7FF9]"
          >
            View area activity
          </button>
        </div>

        <article className="overflow-hidden rounded-[20px] border border-[#DCE7F1] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
          <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#CFE1F5] bg-[#F0F6FF] text-[#2D7FF9]">
              ●
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7A8DA0]">
                Your area
              </p>
              <p className="mt-0.5 text-lg font-bold text-[#0D1B2A]">110025</p>
              <p className="mt-0.5 text-[13px] font-medium text-[#61758A]">Shanti Nagar</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#E8EFF5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-[12px] font-medium text-[#64798D]">
              <strong className="text-[#0D1B2A]">12</strong> active issues ·{" "}
              <strong className="text-[#0D1B2A]">7</strong> resolved ·{" "}
              <strong className="text-[#0D1B2A]">3</strong> ongoing projects
            </p>
            <button
              type="button"
              onClick={() => onNavigate("updates")}
              className="rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-[12px] font-bold text-white"
            >
              Explore area
            </button>
          </div>
        </article>
      </section>

      <section className="fixed bottom-4 left-4 right-4 z-20 min-[861px]:left-[272px] min-[861px]:right-6">
        <form
          onSubmit={submitRequest}
          className="mx-auto flex h-[58px] w-full max-w-[820px] items-center gap-1 rounded-full border border-[#3B4D5D] bg-[#263746]/[0.98] px-2 shadow-[0_10px_30px_rgba(0,0,0,0.20)] backdrop-blur-xl"
        >
          <input
            ref={fileInput}
            className="sr-only"
            type="file"
            onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-[#35495A]"
            aria-label="Attach photo or document"
          >
            ⌇
          </button>
          <span className="grid h-9 w-9 place-items-center rounded-full text-[#D8E9FA]">✦</span>
          {fileName && <span className="hidden max-w-28 truncate text-[10px] text-[#DCE8F5] sm:block">{fileName}</span>}
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message CivicMirror..."
            rows={1}
            className="min-w-0 flex-1 resize-none border-0 bg-transparent px-2 py-1 text-[13px] font-medium text-white outline-none placeholder:text-[#8394A5]"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1B2A] text-white disabled:cursor-not-allowed disabled:bg-[#D3DDE6]"
            aria-label="Open request page"
          >
            ↑
          </button>
        </form>
      </section>
    </>
  );
}