export default function EvidenceSection({ evidence }) {
  const items = Array.isArray(evidence)
    ? evidence.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          (typeof item.title === "string" ||
            typeof item.description === "string")
      )
    : [];

  const fallbackEvidence = [
    {
      title: "Request information",
      description:
        "The response is based on the details provided in your civic request.",
    },
    {
      title: "Civic context",
      description:
        "Relevant civic information can be used to support the assessment of this request.",
    },
  ];

  const visibleEvidence = items.length > 0 ? items : fallbackEvidence;

  return (
    <section
      aria-label="Supporting evidence"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <header>
        <h2 className="text-sm font-semibold">Supporting Evidence</h2>

        <p className="mt-1 text-xs text-gray-500">
          Information supporting the CivicMirror response
        </p>
      </header>

      <div className="mt-4 space-y-3">
        {visibleEvidence.map((item, index) => {
          const title =
            typeof item.title === "string" && item.title.trim()
              ? item.title.trim()
              : `Evidence ${index + 1}`;

          const description =
            typeof item.description === "string" &&
            item.description.trim()
              ? item.description.trim()
              : "Supporting information is available for this request.";

          return (
            <article
              key={item.id ?? index}
              className="rounded-lg border border-gray-100 p-4"
            >
              <h3 className="text-sm font-medium">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}