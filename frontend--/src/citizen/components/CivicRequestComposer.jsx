import { useRef, useState } from "react";

function AttachmentIcon() {
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
      <path d="m20.5 11.5-8.7 8.7a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.1 9.2a1.8 1.8 0 0 1-2.6-2.6l8.3-8.3" />
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
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 3-7.4 18-3.5-7.1L3 10.4 21 3Z" />
      <path d="m10.1 13.9 4.5-4.5" />
    </svg>
  );
}

function CivicAIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <defs>
        <linearGradient
          id="civic-ai-gradient"
          x1="3"
          y1="3"
          x2="21"
          y2="21"
        >
          <stop offset="0%" stopColor="#2D7FF9" />
          <stop offset="52%" stopColor="#6857E8" />
          <stop offset="100%" stopColor="#00A68E" />
        </linearGradient>
      </defs>

      <path
        d="M12 2.5 14.2 9.8 21.5 12l-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2L12 2.5Z"
        fill="url(#civic-ai-gradient)"
      />
    </svg>
  );
}

function Tooltip({ children, text }) {
  return (
    <div className="group/tooltip relative flex items-center">
      {children}

      <div
        role="tooltip"
        className="
          pointer-events-none
          absolute
          bottom-[calc(100%+9px)]
          left-1/2
          z-50
          -translate-x-1/2
          translate-y-1
          whitespace-nowrap
          rounded-md
          bg-[#0D1B2A]
          px-2.5
          py-1.5
          text-[11px]
          font-medium
          text-white
          opacity-0
          shadow-lg
          transition-all
          duration-150
          group-hover/tooltip:translate-y-0
          group-hover/tooltip:opacity-100
        "
      >
        {text}

        <span
          className="
            absolute
            left-1/2
            top-full
            -translate-x-1/2
            border-[4px]
            border-transparent
            border-t-[#0D1B2A]
          "
        />
      </div>
    </div>
  );
}

export default function CivicRequestComposer() {
  const [request, setRequest] = useState("");
  const [fileName, setFileName] = useState("");
  const [isListening, setIsListening] = useState(false);

  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const handleVoiceClick = () => {
    setIsListening((current) => !current);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!request.trim()) return;

    console.log("Civic request:", {
      request: request.trim(),
      file: fileName,
    });
  };

  return (
    <section
      className="
        fixed
        bottom-4
        left-4
        right-4
        z-50
        font-['Inter',sans-serif]

        min-[861px]:left-[272px]
        min-[861px]:right-6
      "
      aria-label="Civic request composer"
    >
      <form
        onSubmit={handleSubmit}
        className="
          mx-auto
          flex
          h-[58px]
          w-full
          max-w-[820px]
          items-center
          gap-1
          rounded-full
          border
          border-[#3B4D5D]
          bg-[#263746]/[0.98]
          px-2
          shadow-[0_10px_30px_rgba(0,0,0,0.20)]
          backdrop-blur-xl
          transition-all
          duration-200
          focus-within:border-[#526779]
          focus-within:shadow-[0_12px_34px_rgba(0,0,0,0.24)]
        "
      >
        <label className="sr-only" htmlFor="civic-request">
          Describe your civic issue
        </label>

        {/* LEFT ACTIONS */}
        <div className="flex shrink-0 items-center gap-0.5">
          {/* Hidden file input */}
          <input
            ref={fileInput}
            className="sr-only"
            id="request-file"
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {/* ATTACH */}
          <Tooltip text="Attach photo or document">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="
                grid
                h-9
                w-9
                place-items-center
                rounded-full
                text-white
                transition-all
                duration-150
                hover:bg-[#35495A]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#2D7FF9]/25
              "
              aria-label="Attach photo or document"
            >
              <AttachmentIcon />
            </button>
          </Tooltip>

          {/* VOICE */}
          <Tooltip
            text={
              isListening
                ? "Stop voice input"
                : "Use voice input"
            }
          >
            <button
              type="button"
              onClick={handleVoiceClick}
              className={`
                grid
                h-9
                w-9
                place-items-center
                rounded-full
                transition-all
                duration-150
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#2D7FF9]/25
                ${
                  isListening
                    ? "bg-[#D8E9FA] text-[#2D7FF9]"
                    : "text-white hover:bg-[#35495A] hover:text-white"
                }
              `}
              aria-label={
                isListening
                  ? "Stop voice input"
                  : "Use voice input"
              }
              aria-pressed={isListening}
            >
              <span className={isListening ? "animate-pulse" : ""}>
                <VoiceIcon />
              </span>
            </button>
          </Tooltip>

          {/* CIVICMIRROR AI */}
          <Tooltip text="CivicMirror AI assistant">
            <button
              type="button"
              className="
                ml-0.5
                grid
                h-9
                w-9
                place-items-center
                rounded-full
                border
                border-[#506273]
                bg-[#334655]
                shadow-[0_2px_7px_rgba(13,27,42,0.07)]
                transition-all
                duration-150
                hover:-translate-y-[1px]
                hover:bg-white
                hover:shadow-[0_4px_10px_rgba(13,27,42,0.10)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#6857E8]/25
              "
              aria-label="CivicMirror AI assistant"
            >
              <CivicAIIcon />
            </button>
          </Tooltip>
        </div>

        {/* FILE INDICATOR */}
        {fileName && (
          <div
            className="
              hidden
              max-w-[150px]
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              border-[#CCD8E2]
              text-white
              px-2.5
              py-1
              text-[10px]
              font-medium
              text-[#53697D]
              sm:flex
            "
          >
            <span className="truncate">
              {fileName}
            </span>

            <button
              type="button"
              onClick={() => {
                setFileName("");

                if (fileInput.current) {
                  fileInput.current.value = "";
                }
              }}
              className="
                shrink-0
                text-[#8293A3]
                transition-colors
                hover:text-[#C84D4D]
              "
              aria-label="Remove attachment"
            >
              ×
            </button>
          </div>
        )}

        {/* WRITING SPACE */}
        <textarea
          id="civic-request"
          value={request}
          onChange={(event) => setRequest(event.target.value)}
          placeholder="Message CivicMirror..."
          rows={1}
          className="
            min-w-0
            flex-1
            resize-none
            overflow-hidden
            border-0
            bg-transparent
            px-2
            py-1
            text-[13px]
            font-medium
            leading-5
            text-white
            outline-none
            placeholder:text-[#8394A5]
            focus:ring-0
          "
          onInput={(event) => {
            event.currentTarget.style.height = "24px";

            event.currentTarget.style.height = `${Math.min(
              event.currentTarget.scrollHeight,
              80
            )}px`;
          }}
        />

        {/* SEND */}
        <Tooltip
          text={
            request.trim()
              ? "Send request"
              : "Type a message"
          }
        >
          <button
            type="submit"
            disabled={!request.trim()}
            className={`
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              transition-all
              duration-200
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2D7FF9]/25
              ${
                request.trim()
                  ? "bg-[#0D1B2A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.20)] hover:-translate-y-[1px] hover:bg-[#183653]"
                  : "cursor-not-allowed bg-[#D3DDE6] text-[#94A3B2]"
              }
            `}
            aria-label="Send civic request"
          >
            <SendIcon />
          </button>
        </Tooltip>
      </form>
    </section>
  );
}