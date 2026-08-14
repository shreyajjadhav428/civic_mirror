import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const processingSteps = [
  "Understanding request",
  "Identifying issue",
  "Finding related records",
  "Identifying department",
  "Retrieving municipal data",
  "Generating explanation",
];

const evidenceItems = [
  {
    title: "Electrical Maintenance Work Order",
    reference: "Work Order #EW-4921",
    department: "Electrical Works",
    date: "10 August 2026",
    detail:
      "Maintenance operations are currently active in Shanti Nagar and include public streetlight infrastructure.",
  },
  {
    title: "Engineering Dependency Report",
    reference: "Dependency Report #ED-118",
    department: "Engineering Services",
    date: "11 August 2026",
    detail:
      "The reported streetlight repair is linked to the active electrical maintenance operation in the area.",
  },
  {
    title: "Budget Allocation",
    reference: "Budget Record #BA-204",
    department: "Municipal Finance",
    date: "08 August 2026",
    detail:
      "Funds have been allocated to the Electrical Maintenance Phase II project.",
  },
  {
    title: "Project Status Report",
    reference: "Status Report #PS-082",
    department: "Electrical Works",
    date: "14 August 2026",
    detail:
      "Electrical Maintenance Phase II is currently in progress at 82% completion.",
  },
];

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20.5 11.5-8.7 8.7a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.1 9.2a1.8 1.8 0 0 1-2.6-2.6l8.3-8.3" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[16px] w-[16px]">
      <defs>
        <linearGradient id="civic-ai-gradient" x1="3" y1="3" x2="21" y2="21">
          <stop offset="0%" stopColor="#2D7FF9" />
          <stop offset="55%" stopColor="#6857E8" />
          <stop offset="100%" stopColor="#00A68E" />
        </linearGradient>
      </defs>
      <path d="M12 2.5 14.2 9.8 21.5 12l-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2L12 2.5Z" fill="url(#civic-ai-gradient)" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 3-7.4 18-3.5-7.1L3 10.4 21 3Z" />
      <path d="m10.1 13.9 4.5-4.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function CityMapTexture() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="city-map-tile"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <g
            transform="scale(.5)"
            stroke="#3B5D73"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 50h150l50 50h200M150 50V0M200 100v300M0 250h180l40 30h180M80 50v200M320 100v180M320 180h80M0 350h200c50 0 80 30 120 50" />
            <path d="M250 0q0 50 50 50t100-50M50 400q0-100 70-80t80 30M0 150q50 0 50 50t30 50" />

            <g
              fill="#54758A"
              stroke="#3B5D73"
              strokeWidth="1.5"
            >
              <rect x="20" y="10" width="30" height="20" rx="2" />
              <rect x="95" y="60" width="40" height="40" rx="3" />
              <rect x="105" y="110" width="30" height="20" rx="2" />
              <rect x="20" y="100" width="40" height="30" rx="2" />
              <rect x="20" y="140" width="20" height="20" rx="2" />
              <rect x="220" y="20" width="50" height="25" rx="2" />
              <polygon points="280,60 300,60 300,80 290,90 280,80" />
              <rect x="340" y="20" width="30" height="20" rx="1" />
              <rect x="220" y="120" width="60" height="40" rx="2" />
              <rect x="230" y="170" width="20" height="20" rx="1" />
              <polygon points="340,120 370,120 370,150 355,160 340,150" />
              <circle cx="140" cy="190" r="18" />
              <rect x="100" y="170" width="20" height="20" rx="2" />
              <circle cx="120" cy="290" r="12" />
              <rect x="30" y="270" width="35" height="45" rx="2" />
              <rect x="80" y="270" width="20" height="20" rx="1" />
              <rect x="20" y="360" width="40" height="25" rx="2" />
              <polygon points="230,300 270,300 270,330 230,330" />
              <rect x="340" y="200" width="40" height="50" rx="2" />
              <rect x="350" y="300" width="20" height="20" rx="2" />
              <circle cx="280" cy="360" r="10" />
              <rect x="220" y="360" width="30" height="20" rx="2" />
            </g>

            <path
              d="M60 70v2M65 70v2M160 20v2M280 120h5M280 130h5M330 340v5M150 220v20"
              stroke="#173047"
              strokeDasharray="2 4"
            />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#city-map-tile)" />
    </svg>
  );
}

function UserMessage({ message }) {
  return (
    <article className="ml-auto max-w-[88%] sm:max-w-[72%]">
      <p className="mb-2 text-right text-[10px] font-bold tracking-[0.1em] text-[#607F99]">YOU</p>
      <div className="rounded-xl border border-[#BFD4E7] bg-[#F9FCFF] px-4 py-3.5 text-[16px] leading-7 text-[#0D1B2A] shadow-[0_5px_14px_rgba(42,77,108,0.08)]">
        {message.text}
      </div>
      {message.fileName && (
        <span className="mt-2 inline-flex max-w-full items-center gap-2 rounded-lg border border-[#C9DBEA] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#49647D]">
          <UploadIcon />
          <span className="truncate">{message.fileName}</span>
        </span>
      )}
    </article>
  );
}

function AIMessage({ message }) {
  return (
    <article className="max-w-[88%] sm:max-w-[76%]">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md border border-[#C8D9E8] bg-white">
          <SparkleIcon />
        </span>
        <p className="text-[10px] font-bold tracking-[0.1em] text-[#2C659A]">CIVICMIRROR AI</p>
      </div>
      <div className="rounded-xl border border-[#C9DCEB] bg-white px-4 py-3.5 text-[16px] leading-7 font-medium text-[#0D1B2A] shadow-[0_5px_14px_rgba(42,77,108,0.07)]">
        {message.text}
      </div>
    </article>
  );
}

function ProcessingIndicator() {
  return (
    <section className="max-w-[620px] rounded-xl border border-[#C7DAEA] bg-white p-5 shadow-[0_7px_18px_rgba(42,77,108,0.08)]">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#C8D9E8] bg-[#F3F8FD]">
          <SparkleIcon />
        </span>
        <div>
          <p className="text-[11px] font-bold tracking-[0.1em] text-[#2C659A]">CIVICMIRROR AI</p>
          <p className="mt-0.5 text-xs text-[#71889C]">Analyzing your civic request</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {processingSteps.map((step, index) => (
          <div className="flex items-center justify-between text-xs" key={step}>
            <span className={index === processingSteps.length - 1 ? "text-[#0D1B2A]" : "text-[#536D83]"}>{step}</span>
            {index === processingSteps.length - 1 ? <span className="h-2 w-2 animate-pulse rounded-full bg-[#2D7FF9]" /> : <span className="font-bold text-[#00A68E]">✓</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

function ExplanationCard() {
  const details = [
    ["Issue", "Streetlight Issue"],
    ["Area", "Shanti Nagar"],
    ["Status", "Pending"],
    ["Department", "Electrical Works"],
    ["Related project", "Electrical Maintenance Phase II"],
    ["Estimated resolution", "18 August 2026"],
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-[#B3CDE1] bg-[#173047] shadow-[0_12px_28px_rgba(26,60,88,0.18)]">
      <div className="h-[3px] bg-[#2D7FF9]" />
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/10">
            <SparkleIcon />
          </span>
          <div>
            <p className="text-[11px] font-bold tracking-[0.11em] text-[#B8D8FA]">CIVICMIRROR EXPLANATION</p>
            <p className="mt-0.5 text-xs text-[#A8BECE]">Evidence-backed civic assessment</p>
          </div>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label}>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8CA9BF]">{label}</p>
            <p className="mt-1.5 text-sm font-semibold text-[#F1F7FB]">{value}</p>
          </div>
        ))}

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8CA9BF]">Project progress</p>
            <p className="text-xs font-bold text-[#B8D8FA]">82%</p>
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#294860]">
            <span className="block h-full w-[82%] rounded-full bg-[#2D7FF9]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyCard({ expanded, onToggle }) {
  const reasons = [
    "An electrical maintenance project is currently active in your area.",
    "The project already covers this infrastructure.",
    "The repair is dependent on the ongoing maintenance work.",
    "Completing the existing operation avoids duplicated work.",
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-[#C6D9E8] bg-white shadow-[0_7px_18px_rgba(42,77,108,0.07)]">
      <div className="h-[3px] bg-[#2D7FF9]" />
      <button type="button" onClick={onToggle} aria-expanded={expanded} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F8FBFE]">
        <div>
          <p className="text-[11px] font-bold tracking-[0.11em] text-[#2C659A]">WHY?</p>
          <p className="mt-1 text-sm font-semibold text-[#18324C]">Why is this happening?</p>
        </div>
        <span className="text-lg text-[#2D7FF9]">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <ol className="space-y-3 border-t border-[#E0EAF2] px-5 py-5">
          {reasons.map((reason, index) => (
            <li className="flex gap-3" key={reason}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#BFE5DC] bg-[#EFFAF7] text-[11px] font-bold text-[#008B76]">{index + 1}</span>
              <p className="pt-0.5 text-sm leading-6 text-[#314D66]">{reason}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function EvidenceCard({ onSelect }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#C6D9E8] bg-white shadow-[0_7px_18px_rgba(42,77,108,0.07)]">
      <div className="h-[3px] bg-[#00A68E]" />
      <div className="p-5">
        <p className="text-[11px] font-bold tracking-[0.11em] text-[#008B76]">EVIDENCE</p>
        <p className="mt-1 text-sm text-[#536D83]">4 municipal records support this explanation.</p>

        <div className="mt-4 grid gap-2">
          {evidenceItems.map((item) => (
            <button type="button" onClick={() => onSelect(item)} className="group flex items-center justify-between gap-4 rounded-xl border border-[#C8DCEB] bg-[#F8FBFE] px-4 py-3.5 text-left shadow-[0_4px_12px_rgba(23,48,71,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7FAFD1] hover:bg-white hover:shadow-[0_8px_20px_rgba(23,48,71,0.10)]" key={item.reference}>
              <span>
                <span className="block text-sm font-semibold text-[#18324C]">{item.title}</span>
                <span className="mt-1 block text-[11px] text-[#71889C]">{item.reference}</span>
              </span>
              <span className="text-lg font-semibold text-[#2D7FF9] transition-transform duration-200 group-hover:translate-x-1">
  →
</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const timeline = [
    ["Request submitted", "✓"],
    ["AI analysis", "✓"],
    ["Department identified", "✓"],
    ["Project dependency", "✓"],
    ["Expected resolution", "18 August 2026"],
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-[#C6D9E8] bg-white shadow-[0_7px_18px_rgba(42,77,108,0.07)]">
      <div className="h-[3px] bg-[#2D7FF9]" />
      <div className="p-5">
        <p className="text-[11px] font-bold tracking-[0.11em] text-[#2C659A]">WHAT&apos;S NEXT?</p>
        <div className="mt-4 space-y-3">
          {timeline.map(([label, value], index) => (
            <div className="flex items-center gap-3" key={label}>
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${index === timeline.length - 1 ? "bg-[#2D7FF9]" : "bg-[#00A68E]"}`} />
              <p className="flex-1 text-xs font-semibold uppercase tracking-[0.07em] text-[#536D83]">{label}</p>
              <span className="text-xs font-semibold text-[#18324C]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EvidenceDrawer({ evidence, onClose }) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07111D]/35" onMouseDown={onClose} role="presentation">
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col border-l border-[#BFD3E4] bg-[#F6FAFD] shadow-[-18px_0_42px_rgba(28,58,84,0.2)]" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
        <div className="flex items-start justify-between border-b border-[#D8E5EE] px-5 py-5">
          <div>
            <p className="text-[11px] font-bold tracking-[0.11em] text-[#2C659A]">EVIDENCE</p>
            <h2 id="evidence-drawer-title" className="mt-2 text-lg font-bold text-[#18324C]">{evidence.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-[#60788F] hover:bg-[#E8F1F8] hover:text-[#18324C]" aria-label="Close evidence drawer">
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-5 py-6">
          <p className="text-sm font-medium text-[#2D7FF9]">{evidence.reference}</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71889C]">Department</p>
              <p className="mt-1.5 text-sm font-semibold text-[#29445D]">{evidence.department}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71889C]">Date</p>
              <p className="mt-1.5 text-sm font-semibold text-[#29445D]">{evidence.date}</p>
            </div>
          </div>
          <section className="rounded-xl border border-[#CADDEA] bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#71889C]">Relevant information</p>
            <p className="mt-2 text-sm leading-6 text-[#536D83]">“{evidence.detail}”</p>
          </section>
        </div>
      </aside>
    </div>
  );
}

function Composer({ value, fileName, isProcessing, onChange, onFileChange, onRemoveFile, onSubmit, fileInputRef }) {
  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    if (!isProcessing) event.currentTarget.form?.requestSubmit();
  };

  const resizeTextarea = (event) => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-[#C5D9E8] bg-[#EAF2F8]/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:px-6">
      <div className="mx-auto w-full max-w-[820px]">
        {fileName && (
          <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-[#C9DBEA] bg-white px-3 py-2 text-[11px] text-[#49647D] shadow-sm">
            <span className="flex min-w-0 items-center gap-2">
              <UploadIcon />
              <span className="truncate">{fileName}</span>
            </span>
            <button type="button" onClick={onRemoveFile} className="text-[#71889C] hover:text-[#18324C]" aria-label="Remove attachment">
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="flex items-end gap-1 rounded-xl border border-[#BFD3E4] bg-white p-2 shadow-[0_7px_18px_rgba(42,77,108,0.09)]">
          <input ref={fileInputRef} type="file" className="sr-only" accept="image/*,.pdf,.doc,.docx" onChange={onFileChange} />
          <button type="button" onClick={() => fileInputRef.current?.click()} title="Attach photo or document" aria-label="Attach photo or document" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#60788F] transition-colors hover:bg-[#EDF5FB] hover:text-[#2D7FF9]">
            <UploadIcon />
          </button>

          <textarea
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              resizeTextarea(event);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up..."
            rows={1}
            className="max-h-32 min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2 py-2 text-sm leading-5 text-[#0D1B2A] outline-none placeholder:text-[#8B9EAF]"
          />

          <span title="CivicMirror AI" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#D8D4FA] bg-[#F4F2FF]">
            <SparkleIcon />
          </span>

          <button type="button" title="Voice input" aria-label="Voice input" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#60788F] transition-colors hover:bg-[#EDF5FB] hover:text-[#2D7FF9]">
            <MicIcon />
          </button>

          <button type="submit" disabled={isProcessing || (!value.trim() && !fileName)} title="Send message" aria-label="Send message" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0D1B2A] text-white transition-colors hover:bg-[#183653] disabled:cursor-not-allowed disabled:bg-[#B8C8D6]">
            <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
}

export default function Overview() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedWhy, setExpandedWhy] = useState(true);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const conversationEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const hasConversation = messages.length > 0 || isProcessing;

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isProcessing]);

  const getFollowUpResponse = (message, isFirstMessage) => {
    if (isFirstMessage) {
      return "Your streetlight issue has been identified and assigned to the Electrical Works Department. I found an active maintenance project in your area that is relevant to this request.";
    }

    const normalized = message.toLowerCase();

    if (normalized.includes("project") || normalized.includes("responsible")) {
      return "The related project is Electrical Maintenance Phase II, which is currently 82% complete.";
    }

    if (normalized.includes("delay") || normalized.includes("delayed")) {
      return "If the maintenance project is delayed, the streetlight repair may also be delayed because the infrastructure work is linked to the existing project.";
    }

    if (normalized.includes("budget") || normalized.includes("cost")) {
      return "The project has utilized ₹18,40,000 of its ₹22,00,000 allocated budget.";
    }

    return "I have reviewed your follow-up in the context of the current civic records. The existing explanation and supporting evidence remain available in this conversation.";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = input.trim();

    if (!text && !fileName) return;

    const isFirstMessage = messages.length === 0;
    const userMessage = {
      id: `${Date.now()}-user`,
      type: "user",
      text: text || "I have attached a document for review.",
      fileName,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInput("");
    setFileName("");
    setIsProcessing(true);

    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      sessionStorage.setItem("civicMirrorRequestDraft", userMessage.text);
    } catch {
      // Frontend-only storage is optional.
    }

    window.setTimeout(() => {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `${Date.now()}-ai`,
          type: "ai",
          text: getFollowUpResponse(userMessage.text, isFirstMessage),
          showAnalysis: isFirstMessage,
        },
      ]);
      setIsProcessing(false);
    }, 1600);

    void navigate;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-10 flex min-h-0 flex-col overflow-hidden bg-[#E3EDF5] font-['Inter',sans-serif] min-[861px]:left-[248px]">
      <CityMapTexture />

      <div className="relative flex min-h-0 flex-1 flex-col pt-[72px] min-[861px]:pt-[72px]">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 [scrollbar-color:#B8CDDE_transparent] [scrollbar-width:thin] sm:px-7 sm:py-8" aria-label="CivicMirror conversation">
          {!hasConversation ? (
            <section className="flex min-h-full flex-col items-center justify-center pb-10 text-center">
              <p className="text-[11px] font-bold tracking-[0.13em] text-[#2C659A]">CIVICMIRROR AI</p>

              <h1 className="group mt-3 text-[34px] font-extrabold tracking-[-0.045em] text-[#0D1B2A] sm:text-[42px]">
                Welcome to{" "}
                <span className="relative inline-block">
                  Civic<span className="text-[#2D7FF9]">Mirror</span>
                  <span className="absolute bottom-[-3px] left-0 h-px w-full origin-left scale-x-0 bg-[#0D1B2A] transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </h1>

              <p className="mt-3 text-lg font-medium text-[#536D83]">How can we help you today?</p>
            </section>
          ) : (
            <section className="mx-auto w-full max-w-[840px] space-y-7 pb-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-5">
                  {message.type === "user" ? (
                    <UserMessage message={message} />
                  ) : (
                    <>
                      <AIMessage message={message} />
                      {message.showAnalysis && (
                        <div className="space-y-5 pt-1">
                          <ExplanationCard />
                          <WhyCard expanded={expandedWhy} onToggle={() => setExpandedWhy((value) => !value)} />
                          <EvidenceCard onSelect={setSelectedEvidence} />
                          <Timeline />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {isProcessing && <ProcessingIndicator />}
              <div ref={conversationEndRef} />
            </section>
          )}
        </div>

        <Composer
          value={input}
          fileName={fileName}
          isProcessing={isProcessing}
          onChange={setInput}
          onSubmit={handleSubmit}
          onFileChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
          onRemoveFile={() => {
            setFileName("");
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          fileInputRef={fileInputRef}
        />
      </div>

      <EvidenceDrawer evidence={selectedEvidence} onClose={() => setSelectedEvidence(null)} />
    </div>
  );
}