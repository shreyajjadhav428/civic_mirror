import React, { useEffect, useState } from "react";
import hero1Image from "../assets/hero1.png";

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ── reduced-motion detection ────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  /* ── loader animation progress ───────────────────────────── */
  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    const duration = 2000; // ms for loading animation (slightly slower for elegance)
    const startTime = performance.now();

    let frameId;
    const animate = (time) => {
      const elapsed = time - startTime;
      const fraction = Math.min(1, elapsed / duration);
      
      // Decelerating cubic ease out to feel natural and premium
      const easedFraction = 1 - Math.pow(1 - fraction, 3);
      const nextProgress = Math.min(100, Math.round(easedFraction * 100));
      setProgress(nextProgress);

      if (fraction < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Deliberate hold at 100% so user sees completion before transition begins
        const t = setTimeout(() => {
          setIsLoaded(true);
        }, 400);
        return () => clearTimeout(t);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  /* ── scroll handler ──────────────────────────────────────── */
  const handleScroll = () => {
    const target = document.getElementById("mission") || document.querySelector("section:nth-of-type(2)");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        /* ── RESET / SCOPE ───────────────────────────────── */
        .cm-hero *,
        .cm-hero *::before,
        .cm-hero *::after {
          box-sizing: border-box;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
        }

        /* ── HERO SHELL ──────────────────────────────────── */
        .cm-hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #FFFFFF;
          isolation: isolate;
          background-color: #F7F8F6;
        }

        /* ── CINEMATIC BACKGROUND LAYER ──────────────────── */
        .cm-hero__bg {
          position: absolute;
          inset: -4%;
          z-index: 0;
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          will-change: transform;
          animation: cm-drift 30s ease-in-out infinite alternate;
          opacity: 0;
          transition: opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cm-hero__bg--visible {
          opacity: 1;
        }

        @keyframes cm-drift {
          from { transform: scale(1.00) translateY(0px); }
          to   { transform: scale(1.05) translateY(-12px); }
        }

        /* ── OVERLAY LAYERS (Only active when loaded) ────── */
        .cm-hero__overlay-1 {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(13, 27, 42, 0.74);
          opacity: 0;
          transition: opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cm-hero__overlay-2 {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(13, 27, 42, 0.0) 0%,
            rgba(13, 27, 42, 0.3) 55%,
            rgba(13, 27, 42, 0.6) 80%,
            rgba(13, 27, 42, 0.9) 100%
          );
          opacity: 0;
          transition: opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cm-hero__overlay--visible {
          opacity: 1;
        }

        /* ── FLOATING HEADER (Fades in absolute at top) ──── */
        .cm-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: rgba(13, 27, 42, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-10px);
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.5s, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.5s;
        }

        .cm-header--visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .cm-header__brand {
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.05rem, 2.2vw, 1.35rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF;
          white-space: nowrap;
        }
        .cm-header__brand-mirror { color: #2D7FF9; }

        .cm-header__nav {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .cm-header__nav-link {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cm-header__nav-link:hover { color: #FFFFFF; }
        .cm-header__nav-link:focus-visible {
          outline: 2px solid #2D7FF9;
          outline-offset: 4px;
          border-radius: 3px;
        }

        .cm-header__login {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FFFFFF;
          text-decoration: none;
          padding: 9px 22px;
          background: #2D7FF9;
          border-radius: 6px;
          transition: background 0.22s ease, box-shadow 0.22s ease;
          border: 1px solid rgba(45, 127, 249, 0.4);
        }
        .cm-header__login:hover {
          background: #1E4FA3;
          box-shadow: 0 4px 20px rgba(45, 127, 249, 0.45);
        }

        .cm-header__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .cm-header__hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: #FFFFFF;
          border-radius: 2px;
        }

        /* ── CENTER STACK ────────────────────────────────── */
        .cm-hero__center-stack {
          position: relative;
          z-index: 5;
          width: 100%;
          height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── BRAND WORDMARK (Symmetrically Positioned Above Center) ── */
        .cm-hero__wordmark {
          position: absolute;
          bottom: calc(50% + clamp(3.2rem, 8vw, 4.5rem));
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          padding: 0;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2rem, 8vw, 4.25rem);
          font-weight: 900;
          letter-spacing: 0.035em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
          width: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cm-hero__wordmark-civic { color: #FFFFFF; }
        .cm-hero__wordmark-mirror { color: #2D7FF9; }

        /* ── TRANSITION CONTAINERS (Tagline/Progress Centered exactly at 50%) ── */
        .cm-hero__transition-area {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 620px;
          padding: 0 24px;
          display: grid;
          grid-template-areas: "stack";
          align-items: center;
          justify-items: center;
        }

        /* Loading Progress Area */
        .cm-hero__progress-container {
          grid-area: stack;
          width: 100%;
          max-width: 440px;
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s;
          visibility: visible;
        }

        .cm-hero__progress-container--hidden {
          opacity: 0;
          transform: scale(0.96);
          pointer-events: none;
          visibility: hidden;
        }

        .cm-hero__progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 999px;
          padding: 1px;
          overflow: hidden;
        }

        .cm-hero__progress-fill {
          height: 100%;
          background: #2D7FF9;
          border-radius: 999px;
          transition: width 80ms linear;
        }

        .cm-hero__progress-label {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-family: Inter, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Tagline (Loaded state) */
        .cm-hero__tagline {
          grid-area: stack;
          width: 100%;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-weight: 400;
          line-height: 1.65;
          letter-spacing: 0.015em;
          color: rgba(255, 255, 255, 0.82);
          margin: 0;
          max-width: 580px;
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          visibility: hidden;
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s, visibility 1.2s step-start 0.5s;
        }

        .cm-hero__tagline--visible {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }

        /* Primary CTA (Symmetrically Positioned Below Center) */
        .cm-hero__cta {
          position: absolute;
          top: calc(50% + clamp(3.2rem, 8vw, 4.5rem));
          left: 50%;
          transform: translate(-50%, 12px);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: Inter, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF;
          padding: 16px 42px;
          background: #2D7FF9;
          border-radius: 8px;
          border: 1px solid rgba(45, 127, 249, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.1s, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1) 1.1s, visibility 1.2s step-start 1.1s;
        }

        .cm-hero__cta--visible {
          opacity: 1;
          transform: translate(-50%, 0);
          visibility: visible;
          pointer-events: auto;
          /* Clear delays once loaded for hover responsiveness */
          transition: opacity 0.8s ease, transform 0.2s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .cm-hero__cta:hover {
          background: #1E4FA3;
          box-shadow: 0 8px 32px rgba(45, 127, 249, 0.5);
          transform: translate(-50%, -2px);
        }
        .cm-hero__cta:active { transform: translate(-50%, 0); }
        .cm-hero__cta-arrow {
          font-size: 1rem;
          transition: transform 0.2s ease;
        }
        .cm-hero__cta:hover .cm-hero__cta-arrow {
          transform: translateX(4px);
        }

        /* ── SCROLL INDICATOR ────────────────────────────── */
        .cm-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          padding: 8px 12px;
          transition: color 0.2s ease, opacity 1.2s ease 1.5s;
          text-decoration: none;
          opacity: 0;
          pointer-events: none;
        }
        .cm-scroll--visible {
          opacity: 1;
          pointer-events: auto;
        }
        .cm-scroll:hover { color: rgba(255, 255, 255, 0.8); }

        .cm-scroll__label {
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .cm-scroll__arrow {
          font-size: 1.1rem;
          animation: cm-bounce 2s ease-in-out infinite;
        }

        @keyframes cm-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }

        /* ── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 768px) {
          .cm-header {
            padding: 18px 24px;
          }
          .cm-header__nav {
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .cm-header__nav {
            display: none;
          }
          .cm-header__hamburger {
            display: flex;
          }
        }

        /* ── REDUCED MOTION ──────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .cm-hero__bg {
            animation: none;
          }
          .cm-hero__tagline,
          .cm-hero__cta,
          .cm-header,
          .cm-scroll {
            transition: none;
            opacity: 1;
            transform: translate(-50%, 0) !important;
          }
          .cm-scroll__arrow {
            animation: none;
          }
        }
      `}</style>

      <section className="cm-hero" aria-label="CivicMirror landing hero">
        {/* Cinematic background */}
        <div
          className={`cm-hero__bg ${isLoaded ? "cm-hero__bg--visible" : ""}`}
          role="presentation"
          aria-hidden="true"
          style={{ backgroundImage: `url(${hero1Image})` }}
        />

        {/* Cinematic dark overlays */}
        <div
          className={`cm-hero__overlay-1 ${isLoaded ? "cm-hero__overlay--visible" : ""}`}
          aria-hidden="true"
        />
        <div
          className={`cm-hero__overlay-2 ${isLoaded ? "cm-hero__overlay--visible" : ""}`}
          aria-hidden="true"
        />

        {/* Floating transparent Header */}
        <header className={`cm-header ${isLoaded ? "cm-header--visible" : ""}`} role="banner">
          <a href="/" className="cm-header__brand" aria-label="CivicMirror — home">
            CIVIC<span className="cm-header__brand-mirror">MIRROR</span>
          </a>

          <nav aria-label="Primary navigation">
            <ul className="cm-header__nav">
              <li>
                <a href="#how-it-works" className="cm-header__nav-link">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#mission" className="cm-header__nav-link">
                  Mission
                </a>
              </li>
              <li>
                <a href="#about" className="cm-header__nav-link">
                  Vision
                </a>
              </li>
              <li>
                <a href="/login" className="cm-header__login" aria-label="Login to CivicMirror">
                  Login
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="cm-header__hamburger"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            <span className="cm-header__hamburger-bar" />
            <span className="cm-header__hamburger-bar" />
            <span className="cm-header__hamburger-bar" />
          </button>
        </header>

        {/* Unified Centered Layout Stack */}
        <div className="cm-hero__center-stack">
          {/* Main Wordmark (Symmetrically positioned above tagline) */}
          <h1 className="cm-hero__wordmark" aria-label="CivicMirror">
            <span className="cm-hero__wordmark-civic">CIVIC</span>
            <span className="cm-hero__wordmark-mirror">MIRROR</span>
          </h1>

          {/* Transition area: centered at exactly 50% vertically */}
          <div className="cm-hero__transition-area">
            {/* Loading Progress Bar Container */}
            <div
              className={`cm-hero__progress-container ${
                isLoaded ? "cm-hero__progress-container--hidden" : ""
              }`}
              role="status"
              aria-live="polite"
              aria-label={`Loading ${progress}%`}
            >
              <div
                className="cm-hero__progress-track"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
              >
                <div
                  className="cm-hero__progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="cm-hero__progress-label">Loading... {progress}%</p>
            </div>

            {/* Tagline: Centered at exactly 50% vertically */}
            <p
              className={`cm-hero__tagline ${
                isLoaded ? "cm-hero__tagline--visible" : ""
              }`}
            >
              Making Public Decisions Understandable, Transparent, and Explainable through
              Artificial Intelligence.
            </p>
          </div>

          {/* LOGIN CTA: Symmetrically positioned below tagline */}
          <a
            href="/login"
            className={`cm-hero__cta ${isLoaded ? "cm-hero__cta--visible" : ""}`}
            aria-label="Login to CivicMirror"
            id="hero-login-cta"
          >
            LOGIN
            <span className="cm-hero__cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          className={`cm-scroll ${isLoaded ? "cm-scroll--visible" : ""}`}
          onClick={handleScroll}
          aria-label="Scroll down to explore CivicMirror"
          type="button"
        >
          <span className="cm-scroll__label">Explore CivicMirror</span>
          <span className="cm-scroll__arrow" aria-hidden="true">↓</span>
        </button>
      </section>
    </>
  );
}
