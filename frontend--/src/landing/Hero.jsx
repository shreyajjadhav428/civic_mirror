import React, { useEffect, useState } from "react";

import hero1Image from "../assets/hero1.jpg";
import { Link, useNavigate } from "react-router-dom";

const HAS_LOADED_KEY = "cm_hero_loaded";

export default function Hero() {
  const navigate = useNavigate();
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

        /* ── TOP NAVBAR (Full width transparent without outline/blur, animated hover bottom line) ──── */
        .cm-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          padding: 18px 5%;
          display: flex;
          flex-direction: column;
          gap: 0;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: none;
          border-radius: 0;
          box-shadow: none;
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          overflow: hidden;
          transition: background 0.3s ease;
        }

        .cm-header--open {
          background: rgba(13, 27, 42, 0.95);
        }

        /* Animated bottom outline line on hover (Full width) */
        .cm-header::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, rgba(45, 127, 249, 0.1) 0%, #2D7FF9 50%, rgba(45, 127, 249, 0.1) 100%);
          box-shadow: 0 0 12px rgba(45, 127, 249, 0.85), 0 0 20px rgba(45, 127, 249, 0.45);
          transform: scaleX(0);
          transform-origin: center;
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
        }

        .cm-header:hover::after {
          transform: scaleX(1);
          opacity: 1;
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
        .cm-header__brand-mirror {
          color: #2D7FF9;
          position: relative;
          display: inline-block;
        }
        .cm-header__brand-mirror::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2.5px;
          background-color: #FFFFFF;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cm-header__brand-mirror:hover::after {
          transform: scaleX(1);
        }

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

        .cm-header__signup {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FFFFFF;
          text-decoration: none;
          padding: 9px 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          transition: background 0.22s ease, border-color 0.22s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .cm-header__signup:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .cm-header__login--desktop, .cm-header__signup--desktop {
          display: inline-block;
        }

        @media (max-width: 640px) {
          .cm-header__login--desktop, .cm-header__signup--desktop {
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

        /* ── HERO LEFT-ALIGNED CONTENT CONTAINER (Just below navbar) ── */
        .cm-hero__left-content {
          position: absolute;
          top: clamp(104px, 15vh, 140px);
          left: clamp(24px, 5vw, 64px);
          max-width: 660px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 14px;
          pointer-events: auto;
        }

        /* ── BRAND WORDMARK (Strict Left Alignment, No dark shadow) ── */
        .cm-hero__wordmark {
          margin: 0;
          padding: 0;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(2.5rem, 5.8vw, 4.5rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          line-height: 1.05;
          text-transform: uppercase;
          white-space: nowrap;
          text-align: left !important;
          display: flex;
          align-items: center;
          justify-content: flex-start !important;
          gap: 0.22em;
          color: #FFFFFF;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4);
          filter: none !important;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cm-hero__wordmark--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cm-hero__wordmark-civic { color: #FFFFFF; }
        .cm-hero__wordmark-mirror {
          color: #2D7FF9;
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        .cm-hero__wordmark-mirror::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 5px;
          background-color: #FFFFFF;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cm-hero__wordmark-mirror:hover::after {
          transform: scaleX(1);
        }

        /* ── TAGLINE (Strict Left Alignment, Refined Lazy-Loading reveal) ── */
        .cm-hero__tagline {
          width: 100%;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(0.95rem, 1.4vw, 1.2rem);
          font-weight: 450;
          line-height: 1.6;
          letter-spacing: 0.015em;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: none !important;
          filter: none !important;
          margin: 0;
          max-width: 580px;
          text-align: left !important;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }

        .cm-hero__tagline--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Primary CTA (Left-aligned underneath tagline) */
        .cm-hero__cta {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: Inter, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #FFFFFF;
          padding: 13px 32px;
          background: #2D7FF9;
          border-radius: 8px;
          border: 1px solid rgba(45, 127, 249, 0.5);
          opacity: 0;
          transform: translateY(28px);
          pointer-events: auto;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.38s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.38s, background 0.2s ease, box-shadow 0.2s ease;
        }

        .cm-hero__cta--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cm-hero__cta:hover {
          background: #1E4FA3;
          box-shadow: 0 8px 28px rgba(45, 127, 249, 0.45);
          transform: translateY(-2px);
        }
        .cm-hero__cta:active { transform: translateY(0); }
        .cm-hero__cta-arrow {
          font-size: 1rem;
          transition: transform 0.2s ease;
        }
        .cm-hero__cta:hover .cm-hero__cta-arrow {
          transform: translateX(4px);
        }

        /* ── SCROLL INDICATOR (Bottom-Right Positioned) ────── */
        .cm-scroll {
          position: absolute;
          bottom: clamp(32px, 5vh, 52px);
          right: clamp(24px, 5vw, 64px);
          z-index: 10;
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
          opacity: 0;
          transform: translateY(16px);
          pointer-events: auto;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, color 0.2s ease;
        }
        .cm-scroll--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cm-scroll:hover { color: rgba(255, 255, 255, 1); }

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
          .cm-hero__left-content {
            top: clamp(96px, 13vh, 120px);
            left: 4vw;
            right: 4vw;
            max-width: 100%;
          }
          .cm-scroll {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .cm-header__desktop-nav-container {
            display: none;
          }
          .cm-header__hamburger {
            display: flex;
          }
          .cm-hero__wordmark {
            font-size: clamp(2rem, 8vw, 3rem);
          }
        }

        /* ── REDUCED MOTION ──────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .cm-hero__bg {
            animation: none;
          }
          .cm-hero__wordmark,
          .cm-hero__tagline,
          .cm-hero__cta,
          .cm-header,
          .cm-scroll {
            transition: none;
            opacity: 1;
            transform: none !important;
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
              C<span className="cm-header__brand-mirror">M</span>
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
              <a
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
                className="cm-header__signup cm-header__signup--desktop"
              >
                Sign Up
              </a>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="cm-header__login cm-header__login--desktop"
              >
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
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="cm-header__signup cm-header__signup--mobile"
              >
                Sign Up
              </a>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="cm-header__login cm-header__login--mobile"
              >
                Login
              </a>
            </div>
          )}
        </header>

        {/* Hero Left-Aligned Content Container */}
        <div className="cm-hero__left-content">
          {/* Main Wordmark (Left-aligned, clean typography) */}
          <h1
            className={`cm-hero__wordmark ${isLoaded ? "cm-hero__wordmark--visible" : ""}`}
            aria-label="CivicMirror"
          >
            <span className="cm-hero__wordmark-civic">CIVIC</span>
            <span className="cm-hero__wordmark-mirror">MIRROR</span>
          </h1>

          {/* Project Tagline (Left-aligned) */}
          <p
            className={`cm-hero__tagline ${isLoaded ? "cm-hero__tagline--visible" : ""}`}
          >
            Making Public Decisions Understandable, Transparent, and Explainable through
            Artificial Intelligence.
          </p>

          {/* Primary CTA buttons (Left-aligned) */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className={`cm-hero__cta ${isLoaded ? "cm-hero__cta--visible" : ""}`}
            >
              <span>Get Started / Sign Up</span>
              <span className="cm-hero__cta-arrow" aria-hidden="true">→</span>
            </a>
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className={`inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-black tracking-widest text-white uppercase backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span>Login</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator (Bottom-Right) */}
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
