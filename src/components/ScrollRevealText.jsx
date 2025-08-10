import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Throttle function for better performance
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const ScrollRevealText = ({ 
  children, 
  className = "", 
  startOpacity = 0.1, 
  endOpacity = 1,
  triggerPoint = 0.5, // When to start the effect (0.5 = halfway through viewport)
  duration = 0.5, // Animation duration in seconds
  enableBrightnessEffect = true,
  threshold = 0.1 // Intersection observer threshold
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to opacity
  const opacity = useTransform(
    scrollYProgress, 
    [0, triggerPoint, 1], 
    [startOpacity, endOpacity, endOpacity]
  );

  // Transform scroll progress to brightness filter
  const brightness = useTransform(
    scrollYProgress,
    [0, triggerPoint, 1],
    [0.3, 1.2, 1.2]
  );

  // Transform scroll progress to text-shadow for glow effect
  const textShadow = useTransform(
    scrollYProgress,
    [0, triggerPoint, 1],
    [
      "0 0 0px rgba(255, 255, 255, 0)",
      "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(74, 222, 128, 0.2)",
      "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(74, 222, 128, 0.2)"
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      ref={elementRef}
      className={`scroll-reveal-text ${className}`}
      style={{
        opacity: isVisible ? opacity : startOpacity,
        filter: enableBrightnessEffect ? `brightness(${brightness})` : "none",
        textShadow: enableBrightnessEffect ? textShadow : "none",
        transition: `all ${duration}s ease-out`,
      }}
      initial={{ opacity: startOpacity }}
      animate={{ opacity: isVisible ? "auto" : startOpacity }}
    >
      {children}
    </motion.div>
  );
};

// Advanced scroll reveal text with word-by-word illumination
export const ScrollRevealWords = ({ 
  text, 
  className = "",
  startOpacity = 0.1,
  endOpacity = 1,
  staggerDelay = 0.1,
  triggerPoint = 0.3
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`scroll-reveal-words ${className}`}>
      {words.map((word, index) => {
        const wordProgress = useTransform(
          scrollYProgress,
          [triggerPoint + (index * staggerDelay * 0.1), triggerPoint + ((index + 1) * staggerDelay * 0.1)],
          [startOpacity, endOpacity]
        );

        const wordBrightness = useTransform(
          scrollYProgress,
          [triggerPoint + (index * staggerDelay * 0.1), triggerPoint + ((index + 1) * staggerDelay * 0.1)],
          [0.4, 1.2]
        );

        return (
          <motion.span
            key={index}
            style={{
              opacity: isVisible ? wordProgress : startOpacity,
              filter: `brightness(${wordBrightness})`,
              transition: "all 0.3s ease-out",
            }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

// Premium glow effect for special text
export const ScrollRevealGlow = ({ 
  children, 
  className = "",
  glowColor = "74, 222, 128", // RGB values for green-400
  startOpacity = 0.1,
  endOpacity = 1,
  triggerPoint = 0.4
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, triggerPoint, 1],
    [startOpacity, endOpacity, endOpacity]
  );

  const glowIntensity = useTransform(
    scrollYProgress,
    [0, triggerPoint, 1],
    [0, 0.8, 0.8]
  );

  const textShadow = useTransform(
    glowIntensity,
    [0, 0.8],
    [
      `0 0 0px rgba(${glowColor}, 0)`,
      `0 0 10px rgba(${glowColor}, 0.6), 0 0 20px rgba(${glowColor}, 0.4), 0 0 30px rgba(${glowColor}, 0.2)`
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={elementRef}
      className={`scroll-reveal-glow ${className}`}
      style={{
        opacity: isVisible ? opacity : startOpacity,
        textShadow: isVisible ? textShadow : `0 0 0px rgba(${glowColor}, 0)`,
        transition: "all 0.4s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealText;
