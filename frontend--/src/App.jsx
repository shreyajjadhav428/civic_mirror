import React, { useState } from "react";
import Login from "./pages/Login";

import Hero from "./landing/Hero";
import Mission from "./landing/Mission";
import HowItWorks from "./landing/HowItWorks";
import Footer from "./landing/Footer";
import Loader from "./landing/Loader";

const LOADER_STORAGE_KEY = "has_seen_civic_mirror_loader";

export default function App() {
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return !localStorage.getItem(LOADER_STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const handleLoaderComplete = () => {
    try {
      localStorage.setItem(LOADER_STORAGE_KEY, "true");
    } catch {
      // ignore storage error
    }

    setShowLoader(false);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFC]">
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <Hero />
      <Mission />
      <HowItWorks />

      <Footer />
    </main>
  );
}