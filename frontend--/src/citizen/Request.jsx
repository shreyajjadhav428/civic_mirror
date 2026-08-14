import { useEffect, useRef, useState } from "react";

const initialRequest = {
  message: "There is a large pothole near my street that is affecting traffic.",
  createdAt: "14 Aug 2026",
  location: "Shanti Nagar, 110025",
  aiResponse:
    "CivicMirror has identified this as a road maintenance issue. The request can be directed to the relevant civic department for review.",
  explanation:
    "The request describes damage to a public road, which falls under civic road maintenance responsibilities.",
  evidence: [
    "Your description indicates a road surface problem affecting people in the area.",
    "Road damage can be classified under public infrastructure and maintenance.",
  ],
  nextSteps: [
    "The request can be reviewed by the relevant civic department.",
    "You can track the progress of this request from My Requests.",
  ],
};

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M5 13.5v4.25A2.25 2.25 0 0 0 7.25 20h9.5A2.25 2.25 0 0 0 19 17.75V13.5" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8.5" y="3.5" width="7" height="11" rx="3.5" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5 13.7 9l5.3 1.8-5.3 1.7L12 18l-1.7-5.5L5 10.8 10.3 9 12 3.5Z" />
      <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </svg>
  );
}

function MapPinIcon() {
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
      <path d="M20 10c0 5.2-8 11-8 11S4 15.2 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowRight({ tone = "blue" }) {
  const tones = {
    blue: {
      wrapper: "bg-[#EEF5FF] text-[#2D7FF9] border-[#D6E7FF]",
    },
    teal: {
      wrapper: "bg-[#EAF9F5] text-[#00A68E] border-[#D2F0E8]",
    },
    gold: {
      wrapper: "bg-[#FFF7E2] text-[#C58A00] border-[#F5E6BA]",
    },
  };

  return (
    <span
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${tones[tone].wrapper}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function AiDiamond() {
  return (
    <span
      className="relative grid h-10 w-10 shrink-0 rotate-45 place-items-center rounded-[11px] border border-[#8DBDFF]/50 bg-[linear-gradient(135deg,#2D7FF9_0%,#5E8CFF_45%,#8069E8_100%)] shadow-[0_7px_18px_rgba(45,127,249,0.24)]"
      aria-hidden="true"
    >
      <span className="-rotate-45">
        <SparkleIcon />
      </span>
    </span>
  );
}

export default function Request({ onNavigate }) {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [pincode, setPincode] = useState("110025");
  const [area, setArea] = useState("Shanti Nagar");
  const [followUp, setFollowUp] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInput = useRef(null);

  /*
   * Read the request draft created by Overview.
   */
  useEffect(() => {
    const savedDraft = sessionStorage.getItem(
      "civicMirrorRequestDraft",
    );

    if (!savedDraft) return;

    try {
      const draft = JSON.parse(savedDraft);

      if (draft.message) {
        setMessage(draft.message);
      }

      if (draft.fileName) {
        setFileName(draft.fileName);
      }

      /*
       * Remove the temporary draft after reading it.
       * This prevents an old message from appearing
       * every time the Request page is opened.
       */
      sessionStorage.removeItem("civicMirrorRequestDraft");
    } catch {
      sessionStorage.removeItem("civicMirrorRequestDraft");
    }
  }, []);

  const request = message.trim()
    ? {
        ...initialRequest,
        message: message.trim(),
        location: `${area}, ${pincode}`,
      }
    : initialRequest;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    setIsSubmitted(true);

    /*
     * This is currently frontend-only.
     * Later this is where we will send the request
     * to the backend API.
     */
  };

  return (
    <div className="mx-auto max-w-[1120px]">
      {/* =========================================================
          PAGE INTRO
      ========================================================= */}

      <header className="max-w-[900px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          New civic request
        </p>

        <h1 className="mt-2 text-[32px] font-extrabold tracking-[-0.04em] text-[#0D1B2A] sm:text-[36px]">
          What would you like to report?
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#64778B] sm:whitespace-nowrap sm:text-[15px]">
          Describe an issue using text, a photo, document, or voice. CivicMirror
          will help prepare a clear civic request.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section>
          {/* =====================================================
              REQUEST COMPOSER
          ===================================================== */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_10px_30px_rgba(13,27,42,0.055)] sm:p-6"
          >
            <input
              ref={fileInput}
              type="file"
              className="sr-only"
              onChange={(event) =>
                setFileName(event.target.files?.[0]?.name || "")
              }
            />

            <div className="flex min-h-[60px] items-center gap-1.5 rounded-full border border-[#C7D6E5] bg-[#F9FBFD] p-2 transition-all duration-200 focus-within:border-[#9BC5FF] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(45,127,249,0.06)]">
              {/* UPLOAD */}

              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#526B82] transition-all duration-150 hover:bg-[#EAF2FA] hover:text-[#2D7FF9]"
                aria-label="Attach file"
              >
                <UploadIcon />
              </button>

              {/* VOICE */}

              <button
                type="button"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#526B82] transition-all duration-150 hover:bg-[#EAF8F5] hover:text-[#00A68E]"
                aria-label="Voice input"
              >
                <VoiceIcon />
              </button>

              {/* AI */}

              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#CFC7FF] bg-[linear-gradient(135deg,#F2F0FF,#E9F1FF)] text-[#5B65E8] shadow-[0_2px_8px_rgba(104,87,232,0.08)]"
                aria-label="CivicMirror AI"
              >
                <SparkleIcon />
              </span>

              {/* FILE */}

              {fileName && (
                <span className="hidden max-w-32 truncate rounded-full bg-[#EEF4FA] px-2.5 py-1 text-[10px] font-medium text-[#50677D] sm:block">
                  {fileName}
                </span>
              )}

              {/* MESSAGE */}

              <textarea
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setIsSubmitted(false);
                }}
                placeholder="Describe the issue you would like to report..."
                rows={1}
                className="min-w-0 flex-1 resize-none border-0 bg-transparent px-2 py-1 text-sm font-medium text-[#18324C] outline-none placeholder:text-[#8B9BAB]"
              />

              {/* SEND */}

              <button
                type="submit"
                disabled={!message.trim()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#0D1B2A] shadow-[0_2px_8px_rgba(13,27,42,0.08)] transition-all duration-150 hover:bg-[#EEF4F9] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Submit request"
              >
                <SendIcon />
              </button>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={!message.trim()}
              className="mt-4 h-10 rounded-lg bg-[#0D1B2A] px-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#183B60] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitted ? "Request submitted" : "Submit request"}
            </button>

            {isSubmitted && (
              <div className="mt-4 rounded-xl border border-[#CFE8DF] bg-[#F0FAF7] px-4 py-3">
                <p className="text-sm font-semibold text-[#087F6A]">
                  Your request has been prepared successfully.
                </p>

                <p className="mt-1 text-xs leading-5 text-[#55776E]">
                  Backend submission will be connected here later.
                </p>
              </div>
            )}
          </form>

          {/* =====================================================
              CONVERSATION
          ===================================================== */}

          <section
            className="mt-6 space-y-5"
            aria-label="CivicMirror request conversation"
          >
            {/* YOUR REQUEST */}

            <article className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_7px_22px_rgba(13,27,42,0.045)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00A68E]" />

                    <p className="text-[15px] font-bold text-[#087F6A]">
                      Your request
                    </p>
                  </div>

                  <time className="mt-1 block text-[11px] font-medium text-[#8293A3]">
                    {request.createdAt}
                  </time>
                </div>

                <span className="rounded-full bg-[#EAF9F5] px-2.5 py-1 text-[10px] font-bold text-[#087F6A]">
                  Submitted
                </span>
              </div>

              <p className="mt-5 text-[15px] font-medium leading-7 text-[#172B3D]">
                {request.message}
              </p>

              <div className="mt-5 flex items-center gap-2 border-t border-[#E7EEF4] pt-4 text-xs text-[#718398]">
                <MapPinIcon />

                <span>
                  Location:{" "}
                  <span className="font-semibold text-[#334D64]">
                    {request.location}
                  </span>
                </span>
              </div>
            </article>

            {/* AI RESPONSE */}

            <article className="rounded-2xl border border-[#B9D3F1] bg-[linear-gradient(180deg,#FBFDFF_0%,#F7FAFE_100%)] p-5 shadow-[0_10px_28px_rgba(45,127,249,0.075)] sm:p-6">
              <div className="flex items-start gap-4">
                <AiDiamond />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[15px] font-bold text-[#0D1B2A]">
                      Civic<span className="text-[#2D7FF9]">Mirror</span>
                    </p>

                    <span className="rounded-full border border-[#CFE1FF] bg-[#EDF5FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#2D7FF9]">
                      AI response
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] font-medium text-[#718398]">
                    CivicMirror intelligence
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] font-medium leading-7 text-[#172B3D]">
                {request.aiResponse}
              </p>
            </article>

            {/* WHY */}

            <article className="rounded-2xl border border-[#E8DDAF] bg-[linear-gradient(180deg,#FFFDF7_0%,#FFFDF9_100%)] p-5 shadow-[0_7px_22px_rgba(201,162,39,0.055)] sm:p-6">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#F1DFA0] bg-[#FFF6D9] text-[#B47B00]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 10.5v5" />
                    <path d="M12 7.5h.01" />
                  </svg>
                </span>

                <div>
                  <h2 className="text-[15px] font-bold text-[#9A6A00]">
                    Why?
                  </h2>

                  <p className="mt-1 text-[11px] font-medium text-[#8B7A52]">
                    How CivicMirror reached this response
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[15px] font-medium leading-7 text-[#172B3D]">
                {request.explanation}
              </p>
            </article>

            {/* EVIDENCE */}

            <article className="rounded-2xl border border-[#CFE6DF] bg-white p-5 shadow-[0_7px_22px_rgba(13,27,42,0.04)] sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#CBE8E0] bg-[#ECF9F5] text-[#087F6A]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5 9.2 17 19 7" />
                  </svg>
                </span>

                <div>
                  <h2 className="text-[15px] font-bold text-[#087F6A]">
                    Supporting evidence
                  </h2>

                  <p className="mt-0.5 text-[11px] font-medium text-[#718398]">
                    Details used to understand your report
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {request.evidence.map((item, index) => (
                  <div
                    className="rounded-xl border border-[#E1ECE9] bg-[#FAFDFC] p-4"
                    key={item}
                  >
                    <p className="text-[14px] font-medium leading-6 text-[#263D4D]">
                      <strong className="mr-2 font-bold text-[#087F6A]">
                        Evidence {index + 1}.
                      </strong>

                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* WHAT'S NEXT */}

            <article className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_7px_22px_rgba(13,27,42,0.04)] sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#D8E7F9] bg-[#EEF5FF] text-[#2D7FF9]">
                  <SendIcon />
                </span>

                <div>
                  <h2 className="text-[15px] font-bold text-[#18324C]">
                    What&apos;s next?
                  </h2>

                  <p className="mt-0.5 text-[11px] font-medium text-[#718398]">
                    The next steps for your request
                  </p>
                </div>
              </div>

              <ol className="mt-5 space-y-3">
                {request.nextSteps.map((step, index) => (
                  <li
                    className="flex gap-3 text-[14px] font-medium leading-6 text-[#263D4D]"
                    key={step}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF5FF] text-[11px] font-bold text-[#2D7FF9]">
                      {index + 1}
                    </span>

                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            {/* FOLLOW UP */}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setFollowUp("");
              }}
              className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_7px_22px_rgba(13,27,42,0.04)] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#D8E7F9] bg-[#EEF5FF] text-[#2D7FF9]">
                  <VoiceIcon />
                </span>

                <div>
                  <label
                    className="text-[15px] font-bold text-[#18324C]"
                    htmlFor="follow-up"
                  >
                    Continue the conversation
                  </label>

                  <p className="mt-0.5 text-[11px] font-medium text-[#718398]">
                    Ask CivicMirror for clarification or more help
                  </p>
                </div>
              </div>

              <textarea
                id="follow-up"
                value={followUp}
                onChange={(event) => setFollowUp(event.target.value)}
                placeholder="Ask a follow-up question..."
                rows={3}
                className="mt-5 w-full resize-none rounded-xl border border-[#DCE7F1] bg-[#FAFCFE] p-4 text-[14px] font-medium leading-6 text-[#172B3D] outline-none transition-all duration-150 placeholder:text-[#8B9BAB] focus:border-[#9BC5FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(45,127,249,0.06)]"
              />

              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={!followUp.trim()}
                  className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#183B60] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </form>
          </section>
        </section>

        {/* =========================================================
            RIGHT SIDEBAR
        ========================================================= */}

        <aside className="space-y-5">
          {/* LOCATION */}

          <section className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF5FF] text-[#2D7FF9]">
                  <MapPinIcon />
                </span>

                <h2 className="text-sm font-bold text-[#18324C]">
                  Request location
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsEditingLocation((value) => !value)
                }
                className="rounded-md px-2 py-1 text-xs font-bold text-[#2D7FF9] transition-colors hover:bg-[#EEF5FF]"
              >
                {isEditingLocation ? "Done" : "Edit"}
              </button>
            </div>

            <label className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
              Pincode

              <input
                value={pincode}
                disabled={!isEditingLocation}
                onChange={(event) => setPincode(event.target.value)}
                className="mt-1.5 block w-full border-0 bg-transparent p-0 text-sm font-bold normal-case text-[#18324C] outline-none disabled:opacity-100"
              />
            </label>

            <div className="my-4 h-px bg-[#E6EEF5]" />

            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
              Area

              <input
                value={area}
                disabled={!isEditingLocation}
                onChange={(event) => setArea(event.target.value)}
                className="mt-1.5 block w-full border-0 bg-transparent p-0 text-sm font-bold normal-case text-[#18324C] outline-none disabled:opacity-100"
              />
            </label>

            {/* MAP PREVIEW */}

            <div className="mt-5 overflow-hidden rounded-xl border border-[#DCE7F1] bg-[#F5F9FC]">
              <div className="relative h-[130px] overflow-hidden bg-[linear-gradient(135deg,#EAF2F7_0%,#F7FAFC_48%,#E8F1F7_100%)]">
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute left-[15%] top-[15%] h-px w-[80%] rotate-[18deg] bg-[#B7CBD9]" />
                  <div className="absolute left-[5%] top-[62%] h-px w-[95%] -rotate-[12deg] bg-[#B7CBD9]" />
                  <div className="absolute left-[40%] top-[-10%] h-[150%] w-px rotate-[28deg] bg-[#B7CBD9]" />
                </div>

                <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
                  <span className="absolute h-12 w-12 animate-ping rounded-full bg-[#2D7FF9]/10" />

                  <span className="relative grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#2D7FF9] text-white shadow-[0_4px_12px_rgba(45,127,249,0.28)]">
                    <MapPinIcon />
                  </span>
                </div>
              </div>

              <div className="border-t border-[#DCE7F1] px-3 py-2">
                <p className="text-[10px] font-semibold text-[#718398]">
                  Location preview
                </p>

                <p className="mt-0.5 text-[11px] font-bold text-[#18324C]">
                  {area}, {pincode}
                </p>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}

          <section className="relative overflow-hidden rounded-2xl border border-[#DCE7F1] bg-[#0D1B2A] p-5 text-white shadow-[0_12px_30px_rgba(13,27,42,0.16)]">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#2D7FF9]/10 blur-2xl" />

            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#00A68E]/10 blur-2xl" />

            <p className="relative text-[10px] font-bold uppercase tracking-[0.13em] text-[#9DC6FF]">
              How it works
            </p>

            <div className="relative mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-[11px] font-bold text-white ring-1 ring-white/10">
                  01
                </span>

                <span className="text-[13px] font-semibold text-[#E8F1F9]">
                  Describe the issue
                </span>
              </div>

              <div className="ml-3.5 h-5 border-l border-dashed border-[#2D7FF9]/60" />

              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#00A68E]/15 text-[11px] font-bold text-[#6DE1CC] ring-1 ring-[#00A68E]/20">
                  02
                </span>

                <span className="text-[13px] font-semibold text-[#E8F1F9]">
                  Add supporting details
                </span>
              </div>

              <div className="ml-3.5 h-5 border-l border-dashed border-[#00A68E]/60" />

              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#E9A81B]/15 text-[11px] font-bold text-[#FFD77A] ring-1 ring-[#E9A81B]/20">
                  03
                </span>

                <span className="text-[13px] font-semibold text-[#E8F1F9]">
                  Review before submitting
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}