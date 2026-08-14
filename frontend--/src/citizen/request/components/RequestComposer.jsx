import { useRef, useState } from "react";
import { FileText, Mic, Paperclip, Send, Sparkles, X } from "lucide-react";

export default function RequestComposer({
  initialValue = "",
  initialAttachment = "",
}) {
  const [message, setMessage] = useState(initialValue);
  const [attachment, setAttachment] = useState(initialAttachment);
  const [isListening, setIsListening] = useState(false);
  const fileInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    console.log("Request interface submission:", {
      message: message.trim(),
      attachment,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="request-message">
        Describe your civic issue
      </label>

      <div className="flex min-h-[58px] items-center gap-1 rounded-full border border-[#C7D6E5] bg-[#F9FBFD] p-2 transition-colors duration-200 focus-within:border-[#8BB9EF]">
        <input
          ref={fileInput}
          type="file"
          className="sr-only"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(event) => setAttachment(event.target.files?.[0]?.name || "")}
        />

        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#5D7288] transition-colors duration-150 hover:bg-[#EAF2FA] hover:text-[#2D7FF9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9]"
          aria-label="Attach photo or document"
        >
          <Paperclip size={18} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() => setIsListening((current) => !current)}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9] ${
            isListening
              ? "bg-[#E4F4F1] text-[#008E79]"
              : "text-[#5D7288] hover:bg-[#EAF2FA] hover:text-[#2D7FF9]"
          }`}
          aria-label={isListening ? "Stop voice input" : "Use voice input"}
          aria-pressed={isListening}
        >
          <Mic size={18} strokeWidth={1.8} className={isListening ? "animate-pulse" : ""} />
        </button>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D9D5FA] bg-[#F4F2FF] text-[#6857E8]" title="CivicMirror AI">
          <Sparkles size={17} strokeWidth={1.8} />
        </span>

        {attachment && (
          <span className="hidden max-w-[145px] items-center gap-1.5 rounded-full border border-[#D8E4EF] bg-white px-2.5 py-1 text-[11px] font-medium text-[#50677D] sm:flex">
            <FileText size={13} />
            <span className="truncate">{attachment}</span>
            <button
              type="button"
              onClick={() => {
                setAttachment("");
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="text-[#8293A3] hover:text-[#C44545]"
              aria-label="Remove attachment"
            >
              <X size={13} />
            </button>
          </span>
        )}

        <textarea
          id="request-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Describe the issue you would like to report..."
          rows={1}
          className="min-w-0 flex-1 resize-none border-0 bg-transparent px-2 py-1 text-sm font-medium leading-5 text-[#18324C] outline-none placeholder:text-[#8798AA]"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9] ${
            message.trim()
              ? "bg-[#0D1B2A] text-white shadow-sm hover:-translate-y-[1px] hover:bg-[#183653]"
              : "cursor-not-allowed bg-[#D7E1EA] text-[#94A3B2]"
          }`}
          aria-label="Submit request"
        >
          <Send size={16} strokeWidth={1.9} />
        </button>
      </div>

      <button
        type="submit"
        disabled={!message.trim()}
        className={`mt-4 inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9] ${
          message.trim()
            ? "bg-[#0D1B2A] text-white hover:bg-[#183653]"
            : "cursor-not-allowed bg-[#D7E1EA] text-[#94A3B2]"
        }`}
      >
        Submit request
      </button>
    </form>
  );
}