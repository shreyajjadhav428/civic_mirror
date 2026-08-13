import React, { useEffect, useState } from "react";
import hero1Image from "../assets/hero1.png";

const HAS_LOADED_KEY = "cm_hero_loaded";

export default function Hero() {
  const [isFirstVisit] = useState(() => {
    try {
      return !sessionStorage.getItem(HAS_LOADED_KEY);
    } catch {
      return false;
    }
  });

  const [progress, setProgress] = useState(() => (isFirstVisit ? 0 : 100));
  const [isLoaded, setIsLoaded] = useState(() => !isFirstVisit);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ── reduced-motion detection ────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  /* ── initial loader progress (runs ONLY once on first session visit) ── */
  useEffect(() => {
    if (!isFirstVisit || isLoaded) return;

    let frameId;
    const duration = 400; // fast initial progress fill for first visit
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const fraction = Math.min(1, elapsed / duration);
      const nextProgress = Math.min(100, Math.round(fraction * 100));
      setProgress(nextProgress);

      if (fraction < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        try {
          sessionStorage.setItem(HAS_LOADED_KEY, "true");
        } catch (e) {
          // ignore
        }
        setIsLoaded(true);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isFirstVisit, isLoaded]);

  /* ── natural smooth scroll handler ───────────────────────── */
  const scrollToSection = (e, targetId) => {
    if (e) e.preventDefault();

    if (!targetId || targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 70;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
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
          background-color: #0D1B2A;
        }

        /* ── CINEMATIC BACKGROUND LAYER ──────────────────── */
        .cm-hero__bg {
          position: absolute;
          inset: -4%;
          z-index: 0;
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          opacity: 1;
          transition: opacity 0.4s ease-out;
        }

        .cm-hero__bg--visible {
          opacity: 1;
        }

        @keyframes cm-drift {
          from { transform: scale(1.00) translateY(0px); }
          to   { transform: scale(1.05) translateY(-12px); }
        }

        /* ── OVERLAY LAYERS REMOVED (Background image rendered naturally) ────── */

        /* ── FLOATING HEADER (Fades in absolute at top) ──── */
        .cm-header {
          position: fixed;
          top: 16px;
          left: 5%;
          right: 5%;
          z-index: 1000;
          padding: 20px 32px;
          display: flex;
          flex-direction: column;
          gap: 0;
          background: rgba(13, 27, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .cm-header--visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .cm-header__top-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .cm-header__right-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cm-header__brand {
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.33rem, 2.79vw, 1.71rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF;
          white-space: nowrap;
        }
        .cm-header__brand-mirror { color: #2D7FF9; }

        .cm-header__desktop-nav-container {
          display: flex;
          align-items: center;
        }

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

        .cm-header__login--desktop {
          display: inline-block;
        }

        @media (max-width: 640px) {
          .cm-header__login--desktop {
            display: none;
          }
        }

        .cm-header__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .cm-header__hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: #FFFFFF;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .cm-header__hamburger-bar--open-1 {
          transform: translateY(7px) rotate(45deg);
        }
        .cm-header__hamburger-bar--open-2 {
          opacity: 0;
        }
        .cm-header__hamburger-bar--open-3 {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile dropdown menu styles */
        .cm-header__mobile-menu {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 24px;
          margin-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: cm-slide-down 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cm-header__mobile-link {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .cm-header__mobile-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.05);
        }

        .cm-header__login--mobile {
          align-self: flex-start;
          margin-left: 12px;
          margin-top: 8px;
        }

        @keyframes cm-slide-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          font-size: clamp(3.05rem, 12.19vw, 6.48rem);
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
          text-shadow: 0 10px 35px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 0, 0, 0.9);
          filter: drop-shadow(0 12px 36px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 65px rgba(0, 0, 0, 0.85));
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
          font-weight: 500;
          line-height: 1.65;
          letter-spacing: 0.015em;
          color: #FFFFFF;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.95), 0 1px 6px rgba(0, 0, 0, 0.9);
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85));
          margin: 0;
          max-width: 580px;
          text-align: center;
          opacity: 1;
          transform: translateY(90px);
          visibility: visible;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .cm-hero__tagline--visible {
          opacity: 1;
          transform: translateY(90px);
          visibility: visible;
        }

        /* Primary CTA (Symmetrically Positioned Below Center) */
        .cm-hero__cta {
          position: absolute;
          top: calc(50% + clamp(3.2rem, 8vw, 4.5rem));
          left: 50%;
          transform: translate(-50%, 0);
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
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition: opacity 0.3s ease, transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .cm-hero__cta--visible {
          opacity: 1;
          transform: translate(-50%, 0);
          visibility: visible;
          pointer-events: auto;
          transition: opacity 0.3s ease, transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
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
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 12px;
          text-decoration: none;
          opacity: 1;
          pointer-events: auto;
          transition: color 0.2s ease, opacity 0.3s ease;
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
            top: 12px;
            left: 4%;
            right: 4%;
            padding: 16px 18px;
            border-radius: 16px;
          }
          .cm-header__nav {
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .cm-header__desktop-nav-container {
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

      <section id="hero" className="cm-hero" aria-label="CivicMirror landing hero">
        {/* Cinematic background */}
        <div
          className={`cm-hero__bg ${isLoaded ? "cm-hero__bg--visible" : ""}`}
          role="presentation"
          aria-hidden="true"
          style={{ backgroundImage: `url(${hero1Image})` }}
        />

        {/* Natural background without dark overlay cast */}

        {/* Floating transparent Header */}
        <header className={`cm-header ${isLoaded ? "cm-header--visible" : ""} ${isMobileMenuOpen ? "cm-header--open" : ""}`} role="banner">
          <div className="cm-header__top-row">
            <a
              href="#hero"
              onClick={(e) => {
                scrollToSection(e, "hero");
                setIsMobileMenuOpen(false);
              }}
              className="cm-header__brand"
              aria-label="CivicMirror — home"
            >
              CIVIC<span className="cm-header__brand-mirror">MIRROR</span>
            </a>

            <nav aria-label="Primary navigation" className="cm-header__desktop-nav-container">
              <ul className="cm-header__nav">
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => scrollToSection(e, "how-it-works")}
                    className="cm-header__nav-link"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#mission"
                    onClick={(e) => scrollToSection(e, "mission")}
                    className="cm-header__nav-link"
                  >
                    Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => scrollToSection(e, "about")}
                    className="cm-header__nav-link"
                  >
                    Vision
                  </a>
                </li>
              </ul>
            </nav>

            <div className="cm-header__right-actions">
              <a href="/login" className="cm-header__login cm-header__login--desktop">
                Login
              </a>
              <button
                className="cm-header__hamburger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className={`cm-header__hamburger-bar ${isMobileMenuOpen ? "cm-header__hamburger-bar--open-1" : ""}`} />
                <span className={`cm-header__hamburger-bar ${isMobileMenuOpen ? "cm-header__hamburger-bar--open-2" : ""}`} />
                <span className={`cm-header__hamburger-bar ${isMobileMenuOpen ? "cm-header__hamburger-bar--open-3" : ""}`} />
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="cm-header__mobile-menu">
              <a
                href="#how-it-works"
                onClick={(e) => {
                  scrollToSection(e, "how-it-works");
                  setIsMobileMenuOpen(false);
                }}
                className="cm-header__mobile-link"
              >
                How It Works
              </a>
              <a
                href="#mission"
                onClick={(e) => {
                  scrollToSection(e, "mission");
                  setIsMobileMenuOpen(false);
                }}
                className="cm-header__mobile-link"
              >
                Mission
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  scrollToSection(e, "about");
                  setIsMobileMenuOpen(false);
                }}
                className="cm-header__mobile-link"
              >
                Vision
              </a>
              <a
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="cm-header__login cm-header__login--mobile"
              >
                Login
              </a>
            </div>
          )}
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
            {/* Tagline: Centered at exactly 50% vertically */}
            <p className="cm-hero__tagline cm-hero__tagline--visible">
              Making Public Decisions Understandable, Transparent, and Explainable through
              Artificial Intelligence.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          className={`cm-scroll ${isLoaded ? "cm-scroll--visible" : ""}`}
          onClick={(e) => scrollToSection(e, "mission")}
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
