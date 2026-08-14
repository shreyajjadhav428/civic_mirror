
export default function WelcomeSection() {
  return (
    <section
      className="relative max-w-3xl font-['Inter',sans-serif]"
      aria-labelledby="welcome-title"
    >
      {/* Eyebrow */}
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-[2px] w-8 rounded-full bg-[#2D7FF9]"
        />

        <p className="m-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#55708A]">
          Your civic space
        </p>
      </div>

      {/* Main heading */}
      <h1
        id="welcome-title"
        className="m-0 text-[2.15rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-[#0D1B2A] sm:text-[2.45rem]"
      >
        Welcome to Civic
        <span className="text-[#2D7FF9]">Mirror</span>
      </h1>

      {/* Main question */}
      <h2 className="mt-4 max-w-2xl text-[1.35rem] font-semibold leading-[1.35] tracking-[-0.02em] text-[#263B50] sm:text-[1.5rem]">
        How can we help with the{" "}
        <span className="text-[#2D7FF9]">city?</span>
      </h2>

      {/* Supporting text */}
      <p className="mt-3 max-w-xl text-[14px] leading-6 text-[#64778A] sm:text-[15px]">
        Report an issue, understand a civic decision, or explore what&apos;s
        happening in your area.
      </p>

      {/* Subtle civic accent */}
      <div
        aria-hidden="true"
        className="mt-6 flex items-center gap-1.5"
      >
        <span className="h-1 w-8 rounded-full bg-[#2D7FF9]" />
        <span className="h-1 w-5 rounded-full bg-[#00A68E]" />
        <span className="h-1 w-3 rounded-full bg-[#F2B84B]" />
      </div>
    </section>
  );
}

