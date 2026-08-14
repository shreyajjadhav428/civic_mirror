export default function AIResponse({ response }) {
  const safeResponse =
    typeof response === "string" && response.trim()
      ? response.trim()
      : "Based on your request, CivicMirror has identified the issue and prepared the relevant civic information.";

  return (
    <article
      aria-label="CivicMirror AI response"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <header className="flex items-center gap-3">
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xs font-semibold"
          aria-hidden="true"
        >
          AI
        </span>

        <div>
          <h2 className="text-sm font-semibold">
            CivicMirror
          </h2>

          <p className="text-xs text-gray-500">
            AI response
          </p>
        </div>
      </header>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {safeResponse}
      </p>
    </article>
  );
}