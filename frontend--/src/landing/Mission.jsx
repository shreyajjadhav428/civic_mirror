
import React, { useEffect, useRef, useState } from "react";

const themes = [
  {
    number: "01",
    title: "Build Trust",
    description:
      "Create clearer, more accountable public systems that citizens can rely on.",
  },
  {
    number: "02",
    title: "Make Decisions Transparent",
    description:
      "Turn complex public decisions into information people can understand and examine.",
  },
  {
    number: "03",
    title: "Reduce Administrative Repetition",
    description:
      "Remove routine friction so public teams can spend more time on meaningful work.",
  },
  {
    number: "04",
    title: "Prioritize Resources Intelligently",
    description:
      "Help governments use evidence to direct attention, time, and funding where they matter most.",
  },
];

export default function Mission() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      mediaQuery.matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#F7F8F6] font-sans text-[#0D1B2A]"
    >
      {/* =====================================================
          VISION
      ===================================================== */}

      <div
        id="about"
        className={`grid w-full grid-cols-1 bg-[#16405F] text-white transition-all duration-700 ease-out lg:grid-cols-2 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        {/* VISION */}

        <article className="flex min-h-[290px] items-center px-7 py-10 sm:px-12 lg:min-h-[330px] lg:px-[10%] lg:py-12">
          <div className="flex w-full max-w-[620px] items-start gap-5 sm:gap-7">
            {/* Lightbulb SVG */}

            <svg
              viewBox="0 0 112 112"
              className="mt-1 h-16 w-16 shrink-0 text-[#FFC107] sm:h-20 sm:w-20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M56 21v-8M31 31l-6-6M81 31l6-6M22 56h-8M90 56h8M31 81l-6 6M81 81l6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity=".8"
              />

              <path
                d="M56 31a25 25 0 0 0-15 45c4 3 6 7 6 12h18c0-5 2-9 6-12a25 25 0 0 0-15-45Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path
                d="M46 95h20M49 102h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M44 59c0-7 5-13 12-13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="motion-safe:animate-pulse"
              />
            </svg>

            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">
                VISION
              </span>

              <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.55rem)] font-semibold leading-none tracking-[-0.04em]">
                Decisions people understand.
              </h2>

              <p className="mt-5 max-w-[510px] text-[1rem] leading-[1.7] text-white/70 sm:text-[1.05rem]">
                A future where public decisions can be{" "}
                <span className="font-semibold text-[#FFC107]">
                  clearly backed by evidence
                </span>{" "}
                and explained to citizens.
              </p>
            </div>
          </div>
        </article>

        {/* VISION DECORATIVE SPACE */}

        <div className="hidden border-l border-white/25 lg:block" />
      </div>

      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div className="h-px w-full bg-white" />

      {/* =====================================================
          MISSION
      ===================================================== */}

      <div
        id="mission"
        className={`grid w-full grid-cols-1 bg-[#16405F] text-white transition-all duration-700 delay-100 ease-out lg:grid-cols-2 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        {/* MISSION */}

        <article className="order-2 flex min-h-[290px] items-center px-7 py-10 sm:px-12 lg:order-1 lg:min-h-[330px] lg:px-[10%] lg:py-12">
          <div className="flex w-full max-w-[620px] items-start gap-5 sm:gap-7">
            {/* Target SVG */}

            <svg
              viewBox="0 0 112 112"
              className="mt-1 h-16 w-16 shrink-0 text-red-400 sm:h-20 sm:w-20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="56"
                cy="56"
                r="38"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".45"
              />

              <circle
                cx="56"
                cy="56"
                r="25"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".7"
              />

              <circle
                cx="56"
                cy="56"
                r="11"
                stroke="currentColor"
                strokeWidth="2.5"
              />

              <circle
                cx="56"
                cy="56"
                r="4"
                fill="currentColor"
                className="motion-safe:animate-pulse"
              />

              <path
                d="M17 27 48 50"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="m17 27 12 2-5 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-red-400">
                MISSION
              </span>

              <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.55rem)] font-semibold leading-none tracking-[-0.04em]">
                Better public systems.
              </h2>

              <p className="mt-5 max-w-[510px] text-[1rem] leading-[1.7] text-white/70 sm:text-[1.05rem]">
                CivicMirror exists to{" "}
                <span className="font-semibold text-red-400">
                  improve trust
                </span>
                , make public decisions transparent, reduce repetitive
                administrative work, and help governments prioritize
                resources intelligently.
              </p>
            </div>
          </div>
        </article>

        {/* BALANCING SPACE */}

        <div className="order-1 hidden border-l border-white/25 lg:order-2 lg:block" />
      </div>

      {/* =====================================================
          FOUR PRINCIPLES
      ===================================================== */}

      <div
        className={`mx-auto w-full max-w-[1320px] px-4 pb-16 pt-12 transition-all duration-700 delay-150 ease-out sm:px-6 sm:pt-14 lg:px-8 lg:pb-[6.5rem] lg:pt-[4.5rem] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <div className="grid w-full grid-cols-1 gap-4 bg-transparent sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {themes.map((theme, index) => (
            <article
              key={theme.number}
              className="group relative min-w-0 min-h-[225px] rounded-2xl overflow-hidden border border-[#0D1B2A]/[0.15] bg-[#FCFDFC] px-6 py-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(13,27,42,0.08)]"
            >
              {/* Hover accent */}

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  index % 2 === 0
                    ? "bg-[#2D7FF9]"
                    : "bg-[#00A68E]"
                }`}
              />

              {/* Number */}

              <span
                className={`mb-9 block text-[1.15rem] font-bold tracking-[0.08em] ${
                  index % 2 === 0
                    ? "text-[#00A68E]"
                    : "text-[#2D7FF9]"
                }`}
              >
                {theme.number}
              </span>

              {/* Title */}

              <h3 className="mb-2.5 text-[clamp(1rem,1.4vw,1.25rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#0D1B2A]">
                {theme.title}
              </h3>

              {/* Description */}

              <p className="m-0 max-w-72 text-[0.9rem] font-normal leading-[1.55] text-[#0D1B2A]/[0.68]">
                {theme.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}