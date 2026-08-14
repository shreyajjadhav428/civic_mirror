export default function RequestHeader() {
  return (
    <header className="max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2D7FF9]">
        New civic request
      </p>

      <h1 className="mt-2 text-[30px] font-bold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
        What would you like to report?
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-[#64778B] sm:text-[15px]">
        Describe an issue in your area using text, a photo, document, or voice.
        CivicMirror will help you prepare a clear civic request.
      </p>
    </header>
  );
}