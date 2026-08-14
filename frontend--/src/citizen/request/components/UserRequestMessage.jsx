export default function UserRequestMessage({ request }) {
  const safeRequest =
    request && typeof request === "object" ? request : {};

  const message =
    typeof safeRequest.message === "string" && safeRequest.message.trim()
      ? safeRequest.message.trim()
      : "I would like to report a civic issue in my area.";

  const createdAt =
    typeof safeRequest.createdAt === "string" && safeRequest.createdAt.trim()
      ? safeRequest.createdAt
      : null;

  const location =
    typeof safeRequest.location === "string" && safeRequest.location.trim()
      ? safeRequest.location
      : null;

  return (
    <article className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_6px_18px_rgba(13,27,42,0.04)]">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-full border border-[#9BC5FF] bg-[#EEF5FF] text-xs font-bold text-[#1D548F]"
            aria-hidden="true"
          >
            C
          </span>

          <div>
            <h2 className="text-sm font-semibold text-[#18324C]">
              Your request
            </h2>
            {createdAt && (
              <time className="mt-0.5 block text-[11px] text-[#8293A3]">
                {createdAt}
              </time>
            )}
          </div>
        </div>
      </header>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-[#49647D]">
        {message}
      </p>

      {location && (
        <p className="mt-4 border-t border-[#E7EEF4] pt-3 text-xs text-[#718398]">
          Location: <span className="font-medium text-[#49647D]">{location}</span>
        </p>
      )}
    </article>
  );
}