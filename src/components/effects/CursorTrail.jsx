import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CursorTrail = ({ 
  color = "#4ade80", 
  trailLength = 20, 
  enabled = true,
  size = 8 
}) => {
  const [trails, setTrails] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const addTrail = useCallback((x, y) => {
    const newTrail = {
      id: Date.now() + Math.random(),
      x,
      y,
      timestamp: Date.now()
    };

    setTrails(prev => {
      const newTrails = [newTrail, ...prev];
      return newTrails.slice(0, trailLength);
    });
  }, [trailLength]);

  useEffect(() => {
    if (!enabled) return;

    let animationId;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Throttle trail creation for performance
      if (!animationId) {
        animationId = requestAnimationFrame(() => {
          addTrail(e.clientX, e.clientY);
          animationId = null;
        });
      }
    };

    // Clean up old trails periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 1000));
    }, 100);

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled, addTrail]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute rounded-full"
            style={{
              left: trail.x - size / 2,
              top: trail.y - size / 2,
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}60`
            }}
            initial={{
              opacity: 0.8,
              scale: 1
            }}
            animate={{
              opacity: 0,
              scale: 0.1
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 2,
          height: size * 2,
          backgroundColor: `${color}40`,
          boxShadow: `0 0 ${size * 4}px ${color}80`,
          left: mousePosition.x - size,
          top: mousePosition.y - size,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CursorTrail;
