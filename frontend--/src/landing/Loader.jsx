import React, { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);

    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setIsLeaving(true);
      const finishTimer = window.setTimeout(() => {
        setIsDestroyed(true);
        onComplete?.();
      }, 300);

      return () => window.clearTimeout(finishTimer);
    }

    const isMobile = window.innerWidth < 768;

    let frameId;
    let pauseTimer;
    let fadeTimer;

    const duration = isMobile ? 1000 : 4000;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(animate);
      } else {
        pauseTimer = window.setTimeout(() => {
          setIsLeaving(true);

          fadeTimer = window.setTimeout(() => {
            setIsDestroyed(true);
            onComplete?.();
          }, isMobile ? 100 : 400);
        }, isMobile ? 50 : 200);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(pauseTimer);
      window.clearTimeout(fadeTimer);
    };
  }, [onComplete, reducedMotion]);

  if (isDestroyed) return null;

  return (
    <>
      <style>{`

        /* ==============================
           LOADER
        ============================== */

        .civicmirror-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 24px;

          background: #0D1B2A;
          color: #FFFFFF;

          opacity: 1;
          transition: opacity 500ms ease;
        }


        /* ==============================
           MAIN CONTENT
        ============================== */

        .civicmirror-loader__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 100%;

          animation: civicmirror-fade-in 700ms ease both;
        }


        /* ==============================
           WORDMARK + BAR WRAPPER
           
           IMPORTANT:
           This wrapper determines the
           exact width of both the text
           and the progress bar.
        ============================== */

        .civicmirror-loader__stack {
          display: flex;
          flex-direction: column;
          align-items: stretch;

          width: max-content;
          max-width: 100%;
        }


        /* ==============================
           WORDMARK
        ============================== */

        .civicmirror-loader__wordmark {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;

          margin: 0 0 clamp(34px, 6vw, 46px);
          padding: 0;

          font-family:
            "Arial Black",
            "Montserrat",
            "Helvetica Neue",
            Arial,
            sans-serif;

          font-size: clamp(2.54rem, 10.16vw, 5.40rem);
          font-weight: 900;

          letter-spacing: 0.035em;
          line-height: 1;

          text-transform: uppercase;
          white-space: nowrap;

          /* Removes any baseline weirdness */
          vertical-align: middle;
        }


        /* ==============================
           CIVIC
        ============================== */

        .civicmirror-loader__civic {
          display: block;

          color: #FFFFFF;

          line-height: 1;
        }


        /* ==============================
           MIRROR
        ============================== */

        .civicmirror-loader__mirror {
          display: block;

          color: #2D7FF9;

          line-height: 1;
        }


        /* ==============================
           PROGRESS AREA
        ============================== */

        .civicmirror-loader__progress-area {
          width: 100%;

          animation:
            civicmirror-fade-in
            700ms
            140ms
            ease
            both;
        }


        /* ==============================
           PROGRESS TRACK
        ============================== */

        .civicmirror-loader__track {
          width: 100%;
          height: 7px;

          box-sizing: border-box;

          padding: 1px;

          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.95);

          border-radius: 999px;

          background: rgba(255, 255, 255, 0.06);

          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04);
        }


        /* ==============================
           BLUE PROGRESS
        ============================== */

        .civicmirror-loader__fill {
          height: 100%;

          width: var(--progress);

          background: #2D7FF9;

          border-radius: 999px;

          transition: width 80ms linear;
        }


        /* ==============================
           LOADING TEXT
        ============================== */

        .civicmirror-loader__label {
          margin: 14px 0 0;

          color: rgba(255, 255, 255, 0.82);

          font-family: Arial, sans-serif;

          font-size: clamp(
            0.76rem,
            2.5vw,
            0.9rem
          );

          font-weight: 700;

          letter-spacing: 0.12em;

          text-align: center;
        }


        /* ==============================
           EXIT
        ============================== */

        .civicmirror-loader--leaving {
          opacity: 0;
          pointer-events: none;
        }


        /* ==============================
           FADE IN
        ============================== */

        @keyframes civicmirror-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* ==============================
           MOBILE
        ============================== */

        /* Mobile: speed up animations to reduce TBT */
        @media (max-width: 767px) {
          .civicmirror-loader__content {
            animation-duration: 200ms;
          }
          .civicmirror-loader__progress-area {
            animation-duration: 200ms;
            animation-delay: 50ms;
          }
          .civicmirror-loader__fill {
            transition: width 40ms linear;
          }
          .civicmirror-loader {
            transition: opacity 200ms ease;
          }
        }

        @media (max-width: 600px) {

          .civicmirror-loader {
            padding: 20px;
          }

          .civicmirror-loader__stack {
            width: 100%;
          }

          .civicmirror-loader__wordmark {
            font-size: clamp(
              1.8rem,
              9vw,
              3rem
            );
          }

          .civicmirror-loader__track {
            height: 6px;
          }
        }


        /* ==============================
           REDUCED MOTION
        ============================== */

        @media (prefers-reduced-motion: reduce) {

          .civicmirror-loader,
          .civicmirror-loader__content,
          .civicmirror-loader__progress-area,
          .civicmirror-loader__fill {
            animation: none;
            transition: none;
          }
        }

      `}</style>

      <div
        className={`civicmirror-loader${
          isLeaving ? " civicmirror-loader--leaving" : ""
        }`}
        role="status"
        aria-live="polite"
        aria-label={`Loading ${progress}%`}
      >

        <div className="civicmirror-loader__content">

          {/* 
            The stack automatically takes the exact
            width of "CIVIC MIRROR".
          */}

          <div className="civicmirror-loader__stack">

            <h1 className="civicmirror-loader__wordmark">

              <span className="civicmirror-loader__civic">
                CIVIC
              </span>

              <span className="civicmirror-loader__mirror">
                MIRROR
              </span>

            </h1>


            <div className="civicmirror-loader__progress-area">

              <div
                className="civicmirror-loader__track"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
              >

                <div
                  className="civicmirror-loader__fill"
                  style={{
                    "--progress": `${progress}%`,
                  }}
                />

              </div>


              <p className="civicmirror-loader__label">
                Loading... {progress}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}