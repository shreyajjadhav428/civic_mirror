import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-10 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between md:gap-16 md:pb-12">
          <div className="max-w-md">
            <a
              href="/"
              className="inline-block text-lg font-black tracking-[0.08em] transition-colors duration-200 hover:text-[#2D7FF9]"
            >
              CIVIC<span className="text-[#2D7FF9]">MIRROR</span>
            </a>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Making Public Decisions Understandable, Transparent, and
              Explainable.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold tracking-wide">
              <li>
                <a
                  href="#about"
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-white/70 transition-colors duration-200 hover:text-[#2D7FF9]"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/login"
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