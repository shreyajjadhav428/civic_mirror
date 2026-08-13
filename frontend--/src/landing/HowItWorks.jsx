import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "REQUEST",
    description: "A resident asks a civic question.",
    detail:
      "The citizen starts by submitting a question, complaint, or civic issue they want CivicMirror to understand.",
    color: "#FFC107",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" />
        <path d="M8 8h8M8 11.5h5" />
      </svg>
    ),
  },
  {
    title: "AI UNDERSTANDS",
    description: "Intent and local context are identified.",
    detail:
      "CivicMirror interprets the request, identifies its intent, and understands the relevant local context.",
    color: "#5B5BD6",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="1" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M9 10h.01M15 10h.01M9 14h6" />
      </svg>
    ),
  },
  {
    title: "MUNICIPAL KNOWLEDGE",
    description: "Relevant civic sources are retrieved.",
    detail:
      "Relevant municipal records, projects, departments, and other trusted civic information are retrieved.",
    color: "#00A68E",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 21h18M5 21V10h14v11M3 10h18L12 3 3 10Z" />
        <path d="M8 13v5M12 13v5M16 13v5" />
      </svg>
    ),
  },
  {
    title: "AI REASONING",
    description: "Policy and evidence are evaluated.",
    detail:
      "The system reasons across the available municipal knowledge and evidence to understand the issue.",
    color: "#5B5BD6",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18h6M10 21h4M8.4 15.5A6.5 6.5 0 1 1 15.6 15.5c-.95.72-1.6 1.65-1.6 2.5h-4c0-.85-.65-1.78-1.6-2.5Z" />
        <path d="M12 5v5M9.5 8.5 12 10l2.5-1.5" />
      </svg>
    ),
  },
  {
    title: "EVIDENCE",
    description: "Supporting records are made visible.",
    detail:
      "Supporting municipal records and relevant evidence are surfaced so citizens can understand where the answer comes from.",
    color: "#00A68E",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    title: "EXPLANATION",
    description: "A clear answer is delivered.",
    detail:
      "The final response explains the issue clearly, connects it to evidence, and makes the reasoning understandable to citizens.",
    color: "#2D7FF9",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-it-works-heading"
      className="overflow-hidden bg-[#FAFAFC] px-5 py-20 text-[#0D1B2A] sm:px-8 md:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <span className="mb-4 block text-[11px] font-extrabold tracking-[0.2em] text-[#1E4FA3]">
            CIVIC INTELLIGENCE, MADE CLEAR
          </span>

          <h2
            id="how-it-works-heading"
            className="text-3xl font-black tracking-[0.025em] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            HOW CIVIC<span className="text-[#2D7FF9]">MIRROR</span> WORKS
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#4B5563] sm:text-base">
            A transparent path from a citizen&apos;s question to an
            evidence-grounded civic explanation.
          </p>
        </header>

        {/* DESKTOP FLOW */}
        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-[1400px] px-2">
            {/* Main horizontal flow line */}
            <div className="absolute left-[4%] right-[4%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#D6E6F7]" />

            <div className="grid grid-cols-6 gap-1">
              {steps.map((step, index) => {
                const isTop = index % 2 === 0;

                return (
                  <article
                    key={step.title}
                    className={`group relative h-[480px] transition-all duration-700 ease-out ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 120 + 150}ms`,
                    }}
                  >
                    {/* =========================
                        TOP CIRCLE
                    ========================== */}
                    {isTop && (
                      <>
                        <div className="absolute left-1/2 top-[34px] z-20 -translate-x-1/2">
                          <div
                            tabIndex={0}
                            className="relative flex h-[88px] w-[88px] cursor-pointer items-center justify-center rounded-full border-[3px] bg-white shadow-[0_12px_35px_rgba(13,27,42,0.10)] outline-none transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_rgba(13,27,42,0.17)] group-focus-visible:ring-4 group-focus-visible:ring-[#2D7FF9]/20"
                            style={{ borderColor: step.color }}
                          >
                            <div
                              className="absolute inset-[7px] rounded-full opacity-10"
                              style={{ backgroundColor: step.color }}
                            />

                            <svg
                              viewBox="0 0 24 24"
                              className="relative h-9 w-9 fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
                              style={{ color: step.color }}
                              aria-hidden="true"
                            >
                              {step.icon.props.children}
                            </svg>

                            <span
                              className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white"
                              style={{ backgroundColor: step.color }}
                            />
                          </div>

                          {/* TOP HOVER PANEL */}
                          <div className="pointer-events-none absolute left-1/2 top-[108px] z-50 w-[300px] -translate-x-1/2 translate-y-3 rounded-2xl border border-[#D6E6F7] bg-white p-6 text-left opacity-0 shadow-[0_22px_55px_rgba(13,27,42,0.16)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <div
                              className="mb-4 h-1.5 w-12 rounded-full"
                              style={{ backgroundColor: step.color }}
                            />

                            <p className="text-[10px] font-black tracking-[0.18em] text-[#4B5563]">
                              STEP {String(index + 1).padStart(2, "0")}
                            </p>

                            <h4 className="mt-2 text-lg font-extrabold tracking-tight text-[#0D1B2A]">
                              {step.title}
                            </h4>

                            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                              {step.detail}
                            </p>
                          </div>
                        </div>

                        {/* Connector from circle to arrow */}
                        <div className="absolute left-1/2 top-[122px] z-10 h-[68px] w-px -translate-x-1/2 bg-[#D6E6F7]" />
                      </>
                    )}

                    {/* =========================
                        BOTTOM CIRCLE
                    ========================== */}
                    {!isTop && (
                      <>
                        <div className="absolute bottom-[34px] left-1/2 z-20 -translate-x-1/2">
                          <div
                            tabIndex={0}
                            className="relative flex h-[88px] w-[88px] cursor-pointer items-center justify-center rounded-full border-[3px] bg-white shadow-[0_12px_35px_rgba(13,27,42,0.10)] outline-none transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-[0_20px_45px_rgba(13,27,42,0.17)] group-focus-visible:ring-4 group-focus-visible:ring-[#2D7FF9]/20"
                            style={{ borderColor: step.color }}
                          >
                            <div
                              className="absolute inset-[7px] rounded-full opacity-10"
                              style={{ backgroundColor: step.color }}
                            />

                            <svg
                              viewBox="0 0 24 24"
                              className="relative h-9 w-9 fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
                              style={{ color: step.color }}
                              aria-hidden="true"
                            >
                              {step.icon.props.children}
                            </svg>

                            <span
                              className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-2 border-white"
                              style={{ backgroundColor: step.color }}
                            />
                          </div>

                          {/* BOTTOM HOVER PANEL */}
                          <div className="pointer-events-none absolute bottom-[108px] left-1/2 z-50 w-[300px] -translate-x-1/2 translate-y-3 rounded-2xl border border-[#D6E6F7] bg-white p-6 text-left opacity-0 shadow-[0_22px_55px_rgba(13,27,42,0.16)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                            <div
                              className="mb-4 h-1.5 w-12 rounded-full"
                              style={{ backgroundColor: step.color }}
                            />

                            <p className="text-[10px] font-black tracking-[0.18em] text-[#4B5563]">
                              STEP {String(index + 1).padStart(2, "0")}
                            </p>

                            <h4 className="mt-2 text-lg font-extrabold tracking-tight text-[#0D1B2A]">
                              {step.title}
                            </h4>

                            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                              {step.detail}
                            </p>
                          </div>
                        </div>

                        {/* Connector from arrow to circle */}
                        <div className="absolute bottom-[122px] left-1/2 z-10 h-[68px] w-px -translate-x-1/2 bg-[#D6E6F7]" />
                      </>
                    )}

                    {/* =========================
                        BROAD ARROW
                    ========================== */}
                    <div
                      className={`absolute left-1/2 top-1/2 z-10 flex h-[86px] w-[205px] -translate-x-1/2 -translate-y-1/2 items-center justify-center px-7 text-center shadow-[0_12px_28px_rgba(13,27,42,0.10)] transition-all duration-300 group-hover:scale-[1.025] group-hover:shadow-[0_18px_38px_rgba(13,27,42,0.16)]`}
                      style={{
                        backgroundColor: step.color,
                        clipPath:
                          "polygon(0 15%, 78% 15%, 78% 0, 100% 50%, 78% 100%, 78% 85%, 0 85%)",
                      }}
                    >
                      <span className="max-w-[145px] text-[13px] font-black leading-[1.25] tracking-[0.07em] text-white">
                        {step.title}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE FLOW */}
        <div className="relative mx-auto max-w-xl lg:hidden">
          <div className="absolute bottom-8 left-[39px] top-8 w-[3px] rounded-full bg-[#D6E6F7]" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className={`group relative flex gap-5 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 110 + 120}ms`,
                }}
              >
                <div
                  tabIndex={0}
                  className="relative z-10 flex h-[78px] w-[78px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[3px] bg-white shadow-[0_10px_28px_rgba(13,27,42,0.10)] outline-none transition-all duration-300 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[#2D7FF9]/20"
                  style={{ borderColor: step.color }}
                >
                  <div
                    className="absolute inset-[6px] rounded-full opacity-10"
                    style={{ backgroundColor: step.color }}
                  />

                  <svg
                    viewBox="0 0 24 24"
                    className="relative h-8 w-8 fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"
                    style={{ color: step.color }}
                    aria-hidden="true"
                  >
                    {step.icon.props.children}
                  </svg>
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <div
                    className="flex min-h-[68px] items-center justify-center px-6 text-center shadow-[0_10px_24px_rgba(13,27,42,0.08)]"
                    style={{
                      backgroundColor: step.color,
                      clipPath:
                        "polygon(0 12%, 86% 12%, 86% 0, 100% 50%, 86% 100%, 86% 88%, 0 88%)",
                    }}
                  >
                    <span className="max-w-[230px] text-[12px] font-black leading-tight tracking-[0.07em] text-white">
                      {step.title}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                    {step.description}
                  </p>

                  <div className="mt-4 rounded-2xl border border-[#D6E6F7] bg-white p-5 shadow-[0_12px_30px_rgba(13,27,42,0.08)]">
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#4B5563]">
                      STEP {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#0D1B2A]">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
