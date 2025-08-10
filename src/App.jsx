import React, { useState } from "react";
import HoloInterface from "./components/HoloInterface";
import HudFrame from "./components/HudFrame";
import StarfieldBackground from "./components/StarfieldBackground";
import AboutSection from "./components/AboutSection";
import ProblemStatement from "./components/ProblemStatement";
import PartnershipSection from "./components/PartnershipSection";
import Footer from "./components/Footer";
import { NotificationManager } from "./components/ui/Notification";
import CursorTrail from "./components/effects/CursorTrail";

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showHero, setShowHero] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setTimeout(() => setShowHero(true), 500);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Starfield background - always present */}
      <StarfieldBackground />

      {/* Preloader - fades out */}
      {showPreloader && (
        <HoloInterface onAnimationComplete={handlePreloaderComplete} />
      )}

      {/* Main content area */}
      <div className="relative z-10 w-full">
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
          <div className="relative w-full">
            {/* About Section */}
            <div className="pt-[100vh] relative z-10 w-full">
              <AboutSection />
            </div>
            
            {/* Problem Statement Section */}
            <div className="relative z-10 w-full">
              <ProblemStatement />
            </div>
            
            {/* Partnership Section */}
            <div className="relative z-10 w-full">
              <PartnershipSection />
            </div>
            
            {/* Footer */}
            <div className="relative z-10 w-full">
              <Footer />
            </div>
          </div>
        )}
      </div>
      
      
      <CursorTrail 
        color="#4ade80" 
        trailLength={15} 
        enabled={showHero}
        size={8}
      />
      
      {/* Global Notification Manager */}
      <NotificationManager />
    </div>
  );
};

export default App;
