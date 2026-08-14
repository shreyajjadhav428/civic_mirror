import { useState } from "react";

export default function FollowUpComposer({ onSubmit }) {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    if (typeof onSubmit === "function") {
      onSubmit(trimmedMessage);
    }

    setMessage("");
  }

  return (
    <section
      aria-label="Continue the conversation"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <header>
        <h2 className="text-sm font-semibold">Continue the conversation</h2>

        <p className="mt-1 text-xs text-gray-500">
          Ask a follow-up question or provide more information.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="follow-up-message" className="sr-only">
          Follow-up message
        </label>

        <textarea
          id="follow-up-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask a follow-up question..."
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}