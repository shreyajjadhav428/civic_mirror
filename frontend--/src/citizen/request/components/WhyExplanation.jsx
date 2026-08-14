export default function WhyExplanation({ explanation }) {
  const safeExplanation =
    typeof explanation === "string" && explanation.trim()
      ? explanation.trim()
      : "This response is based on the information provided in your request and the relevant civic context available to CivicMirror.";

  return (
    <section
      aria-label="Why CivicMirror gave this response"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <header>
        <h2 className="text-sm font-semibold">Why?</h2>

        <p className="mt-1 text-xs text-gray-500">
          How CivicMirror reached this response
        </p>
      </header>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {safeExplanation}
      </p>
    </section>
  );
}