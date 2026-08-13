import React from "react";

import Hero from "./landing/Hero";
import Mission from "./landing/Mission";
import HowItWorks from "./landing/HowItWorks";
import Footer from "./landing/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <Hero />

      <div id="mission">
        <Mission />
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <Footer />
    </div>
  );
}