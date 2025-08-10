import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedCounter = ({ 
  startValue,
  endValue, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  className = "",
  delay = 0 
}) => {
  const [count, setCount] = useState(startValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });

  // Extract numeric value from string like "500+", "₹5L+", etc.
  const extractNumber = (value) => {
    if (typeof value === 'number') return value;
    
    const str = value.toString();
    
    // Handle special cases
    if (str.includes('₹') && str.includes('L')) {
      const num = parseFloat(str.replace(/[₹L+]/g, ''));
      return num; // Return in lakhs for animation
    }
    
    // Extract number, removing non-numeric characters except decimal point
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Format the display value
  const formatValue = (currentValue, originalValue) => {
    const str = originalValue.toString();
    
    if (str.includes('₹') && str.includes('L')) {
      return `₹${currentValue.toFixed(currentValue < 1 ? 1 : 0)}L${str.includes('+') ? '+' : ''}`;
    }
    
    if (str.includes('+')) {
      return `${Math.floor(currentValue)}+`;
    }
    
    return currentValue.toString();
  };

  const numericEndValue = extractNumber(endValue);

  useEffect(() => {
    if (isInView && !hasAnimated && numericEndValue > 0) {
      setHasAnimated(true);
      
      const startTime = Date.now() + delay;
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = easeOutQuart * numericEndValue;
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, numericEndValue, duration, delay]);

  const displayValue = hasAnimated ? formatValue(count, endValue) : (typeof endValue === 'string' ? endValue.replace(/[0-9]/g, '0') : '0');

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <motion.span
        className="relative z-10"
        animate={hasAnimated ? { 
          textShadow: [
            "0 0 0px rgba(74, 222, 128, 0)",
            "0 0 10px rgba(74, 222, 128, 0.5)",
            "0 0 20px rgba(74, 222, 128, 0.3)",
            "0 0 10px rgba(74, 222, 128, 0.1)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {prefix}{displayValue}{suffix}
      </motion.span>
      
      {/* Glow effect */}
      {hasAnimated && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: "#4ade80" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
