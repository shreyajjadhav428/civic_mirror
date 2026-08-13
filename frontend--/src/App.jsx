import React from "react";

import Loader from "./landing/Loader";
import Mission from "./landing/Mission";
import HowItWorks from "./landing/HowItWorks";
import Footer from "./landing/Footer";

function TemporaryHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D1B2A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(45,127,249,0.22),transparent_35%)]" />

      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 text-xs font-bold tracking-[0.3em] text-[#8DBBFF]">
          TEMPORARY HERO
        </p>

        <h1 className="text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl">
          HERO
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
          Your friend&apos;s final CivicMirror hero section will replace this
          placeholder.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/60">
        <span className="text-[10px] font-bold tracking-[0.2em]">
          SCROLL TO EXPLORE
        </span>
        <span className="animate-bounce text-lg">↓</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#FAFAFC]">
      <Loader />

      <TemporaryHero />

      <Mission />

      <HowItWorks />
      <Footer/>
    </main>
  );
}