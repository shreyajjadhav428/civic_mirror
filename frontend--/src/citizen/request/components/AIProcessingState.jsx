export default function AIProcessingState() {
  return (
    <section
      role="status"
      aria-live="polite"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <div className="flex items-center gap-3">
        <span
          className="h-4 w-4 animate-pulse rounded-full bg-gray-400"
          aria-hidden="true"
        />

        <div>
          <h2 className="text-sm font-medium">
            CivicMirror is processing your request
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Analyzing your request and preparing a response.
          </p>
        </div>
      </div>
    </section>
  );
}