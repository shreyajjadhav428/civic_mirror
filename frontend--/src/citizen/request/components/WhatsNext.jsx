export default function WhatsNext({ nextSteps }) {
  const steps = Array.isArray(nextSteps)
    ? nextSteps.filter(
        (step) => typeof step === "string" && step.trim()
      )
    : [];

  const visibleSteps =
    steps.length > 0
      ? steps
      : [
          "Your request can be reviewed by the relevant civic department.",
          "You can track the progress of this request from My Requests.",
        ];

  return (
    <section
      aria-label="What's next"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <header>
        <h2 className="text-sm font-semibold">What's Next?</h2>

        <p className="mt-1 text-xs text-gray-500">
          What happens after your request
        </p>
      </header>

      <ol className="mt-4 space-y-3">
        {visibleSteps.map((step, index) => (
          <li
            key={index}
            className="flex gap-3 rounded-lg border border-gray-100 p-4"
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium"
              aria-hidden="true"
            >
              {index + 1}
            </span>

            <p className="text-sm leading-6 text-gray-600">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}