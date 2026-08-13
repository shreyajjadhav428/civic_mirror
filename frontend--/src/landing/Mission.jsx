
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const reducedMotion = mediaQuery.matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
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
      className="
        w-full
        overflow-hidden
        bg-[#F7F8F6]
        font-sans
        text-[#0D1B2A]
      "
    >

      {/* =====================================================
          VISION
      ===================================================== */}

      <div
        className={`
          grid
          w-full
          grid-cols-1
          lg:grid-cols-[40%_60%]
          transition-all
          duration-700
          ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }
        `}
      >

        {/* BLUE VISION RECTANGLE */}

        <div
          className="
            relative
            flex
            min-h-[230px]
            items-center
            justify-center
            bg-[#2D7FF9]
            px-8
            py-10
            sm:min-h-[270px]
            sm:px-10
            lg:min-h-[310px]
            lg:justify-end
            lg:px-14
          "
        >

          {/* Decorative symbol */}

          <div
            className="
              absolute
              left-7
              top-7
              h-9
              w-9
              rounded-full
              border
              border-white/40
              sm:left-9
              sm:top-9
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-2
                w-2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white
              "
            />
          </div>

          {/* Vision title */}

          <div className="w-full max-w-[400px] lg:ml-auto">

            <span
              className="
                block
                text-[0.78rem]
                font-bold
                tracking-[0.2em]
                text-white/70
              "
            >
              01
            </span>

            <h2
              className="
                mt-3
                whitespace-nowrap
                text-[2.2rem]
                font-bold
                uppercase
                leading-none
                tracking-[-0.045em]
                text-white
                sm:text-[2.7rem]
                lg:text-[3.15rem]
              "
            >
              Our Vision
            </h2>

          </div>
        </div>


        {/* VISION CONTENT */}

        <div
          className="
            flex
            min-h-[230px]
            items-center
            px-7
            py-10
            sm:min-h-[270px]
            sm:px-12
            sm:py-11
            lg:min-h-[310px]
            lg:px-[7%]
            lg:py-12
          "
        >

          <div className="max-w-[700px]">

            <div
              className="
                mb-5
                h-px
                w-14
                bg-[#2D7FF9]
              "
            />

            <h3
              className="
                m-0
                whitespace-nowrap
                text-[2rem]
                font-semibold
                leading-none
                tracking-[-0.04em]
                text-[#0D1B2A]
                sm:text-[2.35rem]
                lg:text-[2.7rem]
              "
            >
              Decisions people understand.
            </h3>

            <p
              className="
                mt-5
                max-w-[650px]
                text-[1.02rem]
                leading-[1.7]
                text-[#0D1B2A]/[0.7]
                sm:text-[1.08rem]
              "
            >
              A future where public decisions can be{" "}
              <span className="font-semibold text-[#00A68E]">
                clearly backed by evidence
              </span>{" "}
              and explained to citizens.
            </p>

          </div>
        </div>

      </div>


      {/* =====================================================
          CENTER DIVIDER
      ===================================================== */}

      <div
        className="
          mx-auto
          h-px
          w-full
          bg-[#0D1B2A]/[0.12]
        "
      />


      {/* =====================================================
          MISSION
      ===================================================== */}

      <div
        className={`
          grid
          w-full
          grid-cols-1
          lg:grid-cols-[60%_40%]
          transition-all
          duration-700
          delay-100
          ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }
        `}
      >

        {/* MISSION CONTENT */}

        <div
          className="
            order-2
            flex
            min-h-[230px]
            items-center
            px-7
            py-10
            sm:min-h-[270px]
            sm:px-12
            sm:py-11
            lg:order-1
            lg:min-h-[310px]
            lg:px-[8%]
            lg:py-12
          "
        >

          <div className="max-w-[700px]">

            <div
              className="
                mb-5
                h-px
                w-14
                bg-[#00A68E]
              "
            />

            <h3
              className="
                m-0
                whitespace-nowrap
                text-[2rem]
                font-semibold
                leading-none
                tracking-[-0.04em]
                text-[#0D1B2A]
                sm:text-[2.35rem]
                lg:text-[2.7rem]
              "
            >
              Better public systems.
            </h3>

            <p
              className="
                mt-5
                max-w-[650px]
                text-[1.02rem]
                leading-[1.7]
                text-[#0D1B2A]/[0.7]
                sm:text-[1.08rem]
              "
            >
              CivicMirror exists to{" "}
              <span className="font-semibold text-[#2D7FF9]">
                improve trust
              </span>
              , make public decisions transparent, reduce repetitive
              administrative work, and help governments prioritize
              resources intelligently.
            </p>

          </div>
        </div>


        {/* TEAL MISSION RECTANGLE */}

        <div
          className="
            relative
            order-1
            flex
            min-h-[230px]
            items-center
            justify-center
            bg-[#00A68E]
            px-8
            py-10
            sm:min-h-[270px]
            sm:px-10
            lg:order-2
            lg:min-h-[310px]
            lg:justify-start
            lg:px-14
          "
        >

          {/* Decorative symbol */}

          <div
            className="
              absolute
              right-7
              top-7
              flex
              h-9
              w-9
              items-center
              justify-center
              sm:right-9
              sm:top-9
            "
          >

            <div
              className="
                h-6
                w-6
                rotate-45
                border-2
                border-white/60
              "
            />

            <div
              className="
                absolute
                h-2
                w-2
                rounded-full
                bg-white
              "
            />

          </div>


          {/* Mission title */}

          <div className="w-full max-w-[400px] lg:mr-auto">

            <span
              className="
                block
                text-[0.78rem]
                font-bold
                tracking-[0.2em]
                text-white/70
              "
            >
              02
            </span>

            <h2
              className="
                mt-3
                whitespace-nowrap
                text-[2.2rem]
                font-bold
                uppercase
                leading-none
                tracking-[-0.045em]
                text-white
                sm:text-[2.7rem]
                lg:text-[3.15rem]
              "
            >
              Our Mission
            </h2>

          </div>
        </div>

      </div>


      {/* =====================================================
          FOUR PRINCIPLES — UNCHANGED
      ===================================================== */}

      <div
        className={`
          mx-auto
          w-full
          max-w-[1180px]
          px-4
          pb-16
          pt-12
          sm:px-6
          sm:pt-14
          lg:px-8
          lg:pb-[6.5rem]
          lg:pt-[4.5rem]
          transition-all
          duration-700
          delay-150
          ease-out
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }
        `}
      >

        <div
          className="
            grid
            w-full
            grid-cols-1
            border-b
            border-[#0D1B2A]/[0.15]
            border-t-2
            border-t-[#0D1B2A]
            bg-white
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {themes.map((theme, index) => (
            <article
              key={theme.number}
              className={`
                group
                relative
                min-w-0
                min-h-[225px]
                px-4
                py-7
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#F7F8F6]/70

                ${
                  index !== 0
                    ? "border-t border-[#0D1B2A]/[0.15] sm:border-l"
                    : ""
                }

                ${
                  index === 2
                    ? "lg:border-l"
                    : ""
                }

                ${
                  index === 0
                    ? "lg:pl-1"
                    : "lg:px-6"
                }

                ${
                  index === 3
                    ? "lg:pr-1"
                    : ""
                }

                ${
                  index >= 2
                    ? "lg:border-t-0"
                    : ""
                }
              `}
            >

              {/* Hover bottom accent */}

              <div
                className={`
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-1
                  origin-left
                  scale-x-0
                  transition-transform
                  duration-300
                  group-hover:scale-x-100
                  ${
                    index % 2 === 0
                      ? "bg-[#2D7FF9]"
                      : "bg-[#00A68E]"
                  }
                `}
              />

              {/* Number */}

              <span
                className={`
                  mb-9
                  block
                  text-[1.15rem]
                  font-bold
                  tracking-[0.08em]
                  ${
                    index % 2 === 0
                      ? "text-[#00A68E]"
                      : "text-[#2D7FF9]"
                  }
                `}
              >
                {theme.number}
              </span>

              {/* Title */}

              <h3
                className="
                  mb-2.5
                  text-[clamp(1rem,1.4vw,1.25rem)]
                  font-bold
                  leading-[1.15]
                  tracking-[-0.025em]
                  text-[#0D1B2A]
                "
              >
                {theme.title}
              </h3>

              {/* Description */}

              <p
                className="
                  m-0
                  max-w-72
                  text-[0.9rem]
                  font-normal
                  leading-[1.55]
                  text-[#0D1B2A]/[0.68]
                "
              >
                {theme.description}
              </p>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}

