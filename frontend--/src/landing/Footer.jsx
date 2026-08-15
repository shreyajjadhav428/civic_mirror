import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const scrollToSection = (e, targetId) => {
    if (e) e.preventDefault();
    if (!targetId || targetId === "hero" || targetId === "top") {
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
    <footer className="bg-[#0D1B2A] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-10 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-12">
          <div className="max-w-md">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="inline-block text-[1.24rem] font-black tracking-[0.08em]"
            >
              CIVIC<span className="relative inline-block text-[#2D7FF9] after:absolute after:bottom-[-2.5px] after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100">MIRROR</span>
            </a>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Making Public Decisions Understandable, Transparent, and
              Explainable.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-y-3 text-sm font-semibold tracking-wide md:items-end">
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "about")}
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => scrollToSection(e, "how-it-works")}
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  Sign Up / Create Account
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-7 text-center">
          <p className="text-xs font-medium tracking-wide text-white/45">
            © CivicMirror AI
          </p>
        </div>
      </div>
    </footer>
  );
}