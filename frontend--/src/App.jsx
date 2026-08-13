import React, { useState, useEffect } from "react";
import Login from "./pages/Login";

import Hero from "./landing/Hero";
import Mission from "./landing/Mission";
import HowItWorks from "./landing/HowItWorks";
import Footer from "./landing/Footer";
import Loader from "./landing/Loader";

const LOADER_STORAGE_KEY = "has_seen_civic_mirror_loader";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Monitor location movements
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Override pushState to dynamically trigger state refresh for SPAs
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

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

  if (currentPath === "/login") {
    return <Login />;
  }

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