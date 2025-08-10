import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import MobileMenu from "./MobileMenu";
import Button, { GlowButton } from "./ui/Button";

function AstronautModel({ onRotationUpdate }) {
  const { scene } = useGLTF("/astronaut-on-suit.glb");
  const modelRef = useRef();
  const [opacity, setOpacity] = useState(0);

  const clonedScene = scene.clone();

  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.8);
      child.material.clippingPlanes = [clipPlane];
      child.material.clipShadows = true;
      child.material.transparent = true;
      child.material.opacity = opacity;
      child.material.needsUpdate = true;
    }
  });

  useEffect(() => {
    let animationFrame;
    let startTime = null;
    const duration = 1000;

    const animateOpacity = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setOpacity(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateOpacity);
      }
    };

    animationFrame = requestAnimationFrame(animateOpacity);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      const rotationY = -window.scrollY * 0.0025;
      modelRef.current.rotation.y = rotationY;
      if (onRotationUpdate) onRotationUpdate(rotationY);

      const maxScroll = 300;
      const scrollAmount = Math.min(window.scrollY, maxScroll);
      const riseProgress = scrollAmount * 0.001;
      modelRef.current.position.y = -2.9 + riseProgress;

      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={modelRef} position={[0, -1.5, 0]}>
      <primitive object={clonedScene} scale={[7, 7, 7]} />
    </group>
  );
}

const HudFrame = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [rotation, setRotation] = useState(0);
  const [hudOpacity, setHudOpacity] = useState(1);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollY, [0, 300], [0, -200]);
  const titleOpacity = useTransform(scrollY, [200, 300], [1, 0]);

  // HUD fade effect based on scroll
  useEffect(() => {
    const hudFadeStart = window.innerHeight * 0.6; // Start fading HUD elements earlier
    const hudFadeEnd = window.innerHeight * 0.9; // Complete fade before about section
    const stickyNavStart = window.innerHeight * 0.92; // Show sticky nav slightly before about section
    
    const handleScroll = () => {
      // Show sticky nav when about section is about to be visible
      if (window.scrollY > stickyNavStart) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
      
      // Fade out HUD elements completely before about section
      if (window.scrollY > hudFadeStart) {
        const fadeProgress = Math.min((window.scrollY - hudFadeStart) / (hudFadeEnd - hudFadeStart), 1);
        setHudOpacity(1 - fadeProgress);
      } else {
        setHudOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `perspective(1000px) rotateY(${
        -rotation * 0.2
      }rad)`;
    }
  }, [rotation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setTimeout(() => setLoaded(true), 100);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Responsive breakpoints
  const isMobile = windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Responsive values
  const mainTitleSize = isMobile
    ? "text-5xl"
    : isTablet
    ? "text-7xl"
    : "text-[10vw]";
  const navItemSpacing = isMobile
    ? "space-x-2"
    : isTablet
    ? "space-x-4"
    : "space-x-6";
  const frameInset = isMobile ? "inset-3" : isTablet ? "inset-6" : "inset-10";
  const modelScale = isMobile ? 5 : isTablet ? 6 : 7;
  const modelPositionY = isMobile ? -3.5 : -2.9;

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Nav item click handler
  const handleNavClick = (item) => {
    console.log(`Navigating to ${item}`);
    
    switch(item) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'about':
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'problem':
        const problemSection = document.getElementById('problem-statement-section');
        if (problemSection) {
          problemSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'partnership':
      case 'sponsors':
        const partnershipSection = document.getElementById('partnership-section');
        if (partnershipSection) {
          partnershipSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'domains':
      case 'prizes':
      case 'contact':
        // Placeholder for future sections
        console.log(`${item} section will be implemented`);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-transparent text-white overflow-hidden"
      ref={containerRef}
      style={{ opacity: hudOpacity, transition: 'opacity 0.3s ease-out' }}
    >
      {/* 3D Astronaut Model */}
      <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 z-5">
        <Canvas
          camera={{
            position: isMobile ? [0, 1, 5] : [0, 1.5, 5],
            fov: isMobile ? 45 : 35,
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[7, 7, 7]} intensity={1} />
          <AstronautModel onRotationUpdate={setRotation} />
        </Canvas>
      </div>

      {/* Perspective transform container */}
      <div
        ref={contentRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{
          transition: "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Main HUD Container - Removed pointer-events: none */}
      <motion.div
        className={`fixed ${frameInset} border border-gray-700 z-20 flex flex-col`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top center notch/tab - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center z-20 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-4 h-2 sm:w-6 sm:h-3 border-t border-l border-gray-700 rounded-tl-sm"></div>
            <div
              className={`w-24 h-2 sm:w-48 sm:h-3 border-t border-gray-700`}
            ></div>
            <div className="w-4 h-2 sm:w-6 sm:h-3 border-t border-r border-gray-700 rounded-tr-sm"></div>
          </motion.div>
        )}

        {/* Corners - All decorative elements have pointer-events-none */}
        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0",
        ].map((position, i) => (
          <React.Fragment key={i}>
            <motion.div
              className={`absolute ${position} w-px h-2 sm:h-3 bg-gray-700 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            <motion.div
              className={`absolute ${position} w-2 sm:w-3 h-px bg-gray-700 pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </React.Fragment>
        ))}

        {/* Midpoints - Hidden on mobile */}
        {!isMobile && (
          <>
            {[
              "top-1/2 left-0",
              "top-1/2 right-0",
              "top-0 left-1/2",
              "bottom-0 left-1/2",
            ].map((position, i) => (
              <React.Fragment key={i}>
                <motion.div
                  className={`absolute ${position} transform -translate-y-1/2 w-2 sm:w-3 h-px bg-gray-700 pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className={`absolute ${position} transform -translate-y-1/2 w-px h-2 sm:h-3 bg-gray-700 pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
              </React.Fragment>
            ))}
          </>
        )}

        {/* Navbar - Interactive elements */}
        <motion.div
          className={`h-6 sm:h-8 flex items-center justify-between px-2 sm:px-4 bg-black relative`}
          style={{
            clipPath:
              "polygon(0% 0%, 10px 100%, calc(100% - 10px) 100%, 100% 0%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Left side - Date */}
          <motion.div
            className="text-white font-mono text-xs sm:text-lg font-semibold whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isMobile ? "DEC 2025" : "DECEMBER 2025"}
          </motion.div>

          {/* Center nav items - Hidden on small mobile */}
          {windowSize.width > 480 && !isMobile && (
            <motion.div
              className={`flex ${navItemSpacing} absolute left-1/2 transform -translate-x-1/2`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, staggerChildren: 0.1 }}
            >
              <motion.button
                className="text-green-400 font-mono text-xs sm:text-sm hover:text-green-300 active:text-green-200 transition-colors min-h-[44px] px-3 flex items-center"
                variants={itemVariants}
                onClick={() => handleNavClick("home")}
              >
                HOME
              </motion.button>
              <motion.button
                className="text-gray-400 font-mono text-xs sm:text-sm hover:text-white active:text-gray-200 transition-colors min-h-[44px] px-3 flex items-center"
                variants={itemVariants}
                onClick={() => handleNavClick("about")}
              >
                ABOUT
              </motion.button>
              <motion.button
                className="text-gray-400 font-mono text-xs sm:text-sm hover:text-white active:text-gray-200 transition-colors min-h-[44px] px-3 flex items-center"
                variants={itemVariants}
                onClick={() => handleNavClick("problem")}
              >
                PROBLEM
              </motion.button>
              {isDesktop && (
                <motion.button
                  className="text-gray-400 font-mono text-xs sm:text-sm hover:text-white active:text-gray-200 transition-colors min-h-[44px] px-3 flex items-center"
                  variants={itemVariants}
                  onClick={() => handleNavClick("prizes")}
                >
                  PRIZES
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Mobile menu button */}
          {(isMobile || windowSize.width <= 480) && (
            <motion.button
              className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-green-400/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}

          {/* Right side - Local time */}
          <motion.div
            className="text-white font-mono text-xs sm:text-lg font-semibold pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {formatTime(currentTime)}
          </motion.div>

          {/* Decorative borders with pointer-events-none */}
          <motion.div
            className="absolute left-16 sm:left-32 lg:left-48 bottom-0 w-px h-full bg-gray-700 pointer-events-none"
            style={{
              clipPath: "polygon(0% 0%, 100% 100%, 100% 0%)",
              height: "calc(100% + 1px)",
              width: "8px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />

          <motion.div
            className="absolute right-16 sm:right-32 lg:right-48 bottom-0 w-px h-full bg-gray-700 pointer-events-none"
            style={{
              clipPath: "polygon(0% 0%, 0% 100%, 100% 0%)",
              height: "calc(100% + 1px)",
              width: "8px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />

          <motion.div
            className="absolute bottom-0 left-16 right-16 sm:left-32 sm:right-32 lg:left-48 lg:right-48 h-px bg-gray-700 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Bottom Left Text */}
          <motion.div
            className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 text-[0.65rem] sm:text-[1.30rem] text-white font-bold leading-tight pointer-events-none`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <p>Tamilnadu's</p>
            <p>Largest</p>
            <p>Hackathon</p>
          </motion.div>

          {/* Bottom Right Text */}
          <motion.div
            className={`absolute bottom-3 sm:bottom-6 right-3 sm:right-6 text-[0.65rem] sm:text-[1.30rem] text-white font-bold text-right leading-tight pointer-events-none`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <p>36 - hr</p>
            <p>Hackathon</p>
          </motion.div>

          {/* Since Year - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className={`absolute left-3 sm:left-6 top-[58%] text-[1.5rem] sm:text-xs text-gray-500 rotate-90 origin-left tracking-widest pointer-events-none`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              since <br /> 2025
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scrollable Title */}
      <motion.div
        ref={titleRef}
        className={`fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4 z-30 pointer-events-none`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: "backOut" }}
        style={{
          y: titleY,
          opacity: titleOpacity,
        }}
      >
        <h1
          className={`text-white ${mainTitleSize} tracking-tight font-extrabold font-transformers ${
            isMobile ? "whitespace-normal" : "whitespace-nowrap"
          }`}
        >
          PEC {isMobile && <br />}HACKS
        </h1>
      </motion.div>

      {/* Sticky Navigation */}
      {showStickyNav && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 glass border-b border-green-500/30"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <motion.div
              className="text-green-400 font-mono text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PEC HACKS 3.0
            </motion.div>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <motion.nav
                className="hidden md:flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  className="text-green-400 font-mono text-sm hover:text-green-300 transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("home")}
                >
                  HOME
                </button>
                <button
                  className="text-gray-400 font-mono text-sm hover:text-white transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("about")}
                >
                  ABOUT
                </button>
                <button
                  className="text-gray-400 font-mono text-sm hover:text-white transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("problem")}
                >
                  PROBLEM
                </button>
                <button
                  className="text-gray-400 font-mono text-sm hover:text-white transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("prizes")}
                >
                  PRIZES
                </button>
                <button
                  className="text-gray-400 font-mono text-sm hover:text-white transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("partnership")}
                >
                  PARTNERSHIP
                </button>
                <button
                  className="text-gray-400 font-mono text-sm hover:text-white transition-colors min-h-[44px] px-3 flex items-center"
                  onClick={() => handleNavClick("contact")}
                >
                  CONTACT
                </button>
              </motion.nav>
            )}

            {/* Mobile menu button for sticky nav */}
            {isMobile && (
              <motion.button
                className="text-gray-400 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-green-400/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setMobileMenuOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </div>
  );
};

export default HudFrame;
