import { useRef, useState } from "react";

const initialRequest = {
  message: "There is a large pothole near my street that is affecting traffic.",
  createdAt: "14 Aug 2026",
  location: "Shanti Nagar, 110025",
  aiResponse: "CivicMirror has identified this as a road maintenance issue. The request can be directed to the relevant civic department for review.",
  explanation: "The request describes damage to a public road, which falls under civic road maintenance responsibilities.",
  evidence: [
    "Your description indicates a road surface problem affecting people in the area.",
    "Road damage can be classified under public infrastructure and maintenance.",
  ],
  nextSteps: [
    "The request can be reviewed by the relevant civic department.",
    "You can track the progress of this request from My Requests.",
  ],
};

export default function Request({ onNavigate }) {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [pincode, setPincode] = useState("110025");
  const [area, setArea] = useState("Shanti Nagar");
  const [followUp, setFollowUp] = useState("");
  const fileInput = useRef(null);

  const request = message.trim()
    ? { ...initialRequest, message: message.trim(), location: `${area}, ${pincode}` }
    : initialRequest;

  return (
    <div className="mx-auto max-w-[1120px]">
      <header className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2D7FF9]">
          New civic request
        </p>
        <h1 className="mt-2 text-[30px] font-bold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
          What would you like to report?
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#64778B] sm:text-[15px]">
          Describe an issue using text, a photo, document, or voice. CivicMirror will help prepare a clear civic request.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          <form className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] sm:p-6">
            <input
              ref={fileInput}
              type="file"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
            <div className="flex min-h-[58px] items-center gap-1 rounded-full border border-[#C7D6E5] bg-[#F9FBFD] p-2">
              <button type="button" onClick={() => fileInput.current?.click()} className="grid h-9 w-9 place-items-center rounded-full text-[#5D7288]" aria-label="Attach file">
                ⌇
              </button>
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full text-[#5D7288]" aria-label="Voice input">
                ◉
              </button>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#D9D5FA] bg-[#F4F2FF] text-[#6857E8]">✦</span>
              {fileName && <span className="hidden max-w-32 truncate text-[11px] text-[#50677D] sm:block">{fileName}</span>}
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Describe the issue you would like to report..."
                rows={1}
                className="min-w-0 flex-1 resize-none border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#18324C] outline-none"
              />
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-[#0D1B2A] text-white" aria-label="Submit request">
                ↑
              </button>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("requests")}
              className="mt-4 h-10 rounded-lg bg-[#0D1B2A] px-4 text-sm font-semibold text-white"
            >
              Submit request
            </button>
          </form>

          <section className="mt-6 space-y-5" aria-label="CivicMirror request conversation">
            <article className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_6px_18px_rgba(13,27,42,0.04)]">
              <p className="text-sm font-semibold text-[#18324C]">Your request</p>
              <time className="mt-0.5 block text-[11px] text-[#8293A3]">{request.createdAt}</time>
              <p className="mt-4 text-sm leading-6 text-[#49647D]">{request.message}</p>
              <p className="mt-4 border-t border-[#E7EEF4] pt-3 text-xs text-[#718398]">
                Location: <span className="font-medium text-[#49647D]">{request.location}</span>
              </p>
            </article>

            <article className="rounded-xl border border-[#DCE7F1] bg-white p-5">
              <p className="text-sm font-semibold text-[#18324C]">CivicMirror</p>
              <p className="mt-1 text-xs text-[#718398]">AI response</p>
              <p className="mt-4 text-sm leading-6 text-[#49647D]">{request.aiResponse}</p>
            </article>

            <article className="rounded-xl border border-[#DCE7F1] bg-white p-5">
              <h2 className="text-sm font-semibold text-[#18324C]">Why?</h2>
              <p className="mt-1 text-xs text-[#718398]">How CivicMirror reached this response</p>
              <p className="mt-4 text-sm leading-6 text-[#49647D]">{request.explanation}</p>
            </article>

            <article className="rounded-xl border border-[#DCE7F1] bg-white p-5">
              <h2 className="text-sm font-semibold text-[#18324C]">Supporting evidence</h2>
              <div className="mt-4 space-y-3">
                {request.evidence.map((item, index) => (
                  <p className="rounded-lg border border-[#E7EEF4] p-4 text-sm leading-6 text-[#63768A]" key={item}>
                    <strong className="mr-2 text-[#18324C]">Evidence {index + 1}.</strong>{item}
                  </p>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-[#DCE7F1] bg-white p-5">
              <h2 className="text-sm font-semibold text-[#18324C]">What&apos;s next?</h2>
              <ol className="mt-4 space-y-3">
                {request.nextSteps.map((step, index) => (
                  <li className="flex gap-3 text-sm leading-6 text-[#63768A]" key={step}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-xs font-semibold text-[#2D7FF9]">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setFollowUp("");
              }}
              className="rounded-xl border border-[#DCE7F1] bg-white p-5"
            >
              <label className="text-sm font-semibold text-[#18324C]" htmlFor="follow-up">
                Continue the conversation
              </label>
              <textarea
                id="follow-up"
                value={followUp}
                onChange={(event) => setFollowUp(event.target.value)}
                placeholder="Ask a follow-up question..."
                rows={3}
                className="mt-3 w-full resize-none rounded-lg border border-[#DCE7F1] p-3 text-sm outline-none"
              />
              <div className="mt-3 flex justify-end">
                <button type="submit" disabled={!followUp.trim()} className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
                  Send
                </button>
              </div>
            </form>
          </section>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#18324C]">Request location</h2>
              <button type="button" onClick={() => setIsEditingLocation((value) => !value)} className="text-xs font-semibold text-[#2D7FF9]">
                {isEditingLocation ? "Done" : "Edit"}
              </button>
            </div>
            <label className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
              Pincode
              <input value={pincode} disabled={!isEditingLocation} onChange={(event) => setPincode(event.target.value)} className="mt-1.5 block w-full border-0 bg-transparent p-0 text-sm font-semibold normal-case text-[#18324C] outline-none" />
            </label>
            <div className="my-4 h-px bg-[#E6EEF5]" />
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
              Area
              <input value={area} disabled={!isEditingLocation} onChange={(event) => setArea(event.target.value)} className="mt-1.5 block w-full border-0 bg-transparent p-0 text-sm font-semibold normal-case text-[#18324C] outline-none" />
            </label>
          </section>

          <section className="rounded-xl border border-[#DCE7F1] bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">How it works</p>
            <ol className="mt-4 space-y-3 text-sm leading-5 text-[#63768A]">
              <li><strong className="mr-2 text-[#18324C]">1.</strong>Describe the issue.</li>
              <li><strong className="mr-2 text-[#18324C]">2.</strong>Add supporting details.</li>
              <li><strong className="mr-2 text-[#18324C]">3.</strong>Review before submitting.</li>
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}