import React, { useState } from "react";
import HoloInterface from "./components/HoloInterface";
import HudFrame from "./components/HudFrame";
import StarfieldBackground from "./components/StarfieldBackground";
import AboutSection from "./components/AboutSection";

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showHero, setShowHero] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => setShowHero(true), 500);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Starfield background - always present */}
      <StarfieldBackground />

      {/* Preloader - fades out */}
      {showPreloader && (
        <HoloInterface onAnimationComplete={handlePreloaderComplete} />
      )}

      {/* Main content area */}
      <div className="relative z-10">
        {/* Hero section - fades in after preloader */}
        {showHero && (
          <div
            className={`transition-opacity duration-500 ${
              showHero ? "opacity-100" : "opacity-0"
            }`}
          >
            <HudFrame />
          </div>
        )}

        {/* Scrollable content section */}
        {showHero && (
          <div className="relative">
            {/* About Section */}
            <div className="pt-[100vh] relative z-10">
              <AboutSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
