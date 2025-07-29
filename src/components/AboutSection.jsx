import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.2, once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <div 
      id="about-section"
      ref={sectionRef} 
      className="relative min-h-screen bg-transparent text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Effects */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full opacity-30"></div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 left-1/3 w-px h-12 sm:h-20 bg-gradient-to-b from-green-400 to-transparent rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-px h-10 sm:h-16 bg-gradient-to-b from-white to-transparent rotate-12"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center"
        >
          {/* Left Column - Main Content */}
          <motion.div variants={itemVariants} className="space-y-8 bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600/30">
            {/* Section Header */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                <div className="w-8 h-px bg-green-400"></div>
                <span className="text-green-400 font-mono text-sm tracking-widest uppercase">
                  About Event
                </span>
                <div className="w-8 h-px bg-green-400"></div>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-transformers tracking-tight"
              >
                PEC HACKS
                <span className="block text-green-400">3.0</span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <p className="text-gray-100 text-base sm:text-lg lg:text-xl leading-relaxed">
                Welcome to <span className="text-green-400 font-bold">PEC HACKS 3.0</span>, 
                Tamil Nadu's most prestigious hackathon that brings together the brightest minds 
                in technology, innovation, and creativity.
              </p>
              
              <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed">
                For 36 hours straight, participants will push the boundaries of what's possible, 
                creating solutions that matter. From AI and machine learning to web development 
                and mobile applications, this is where ideas transform into reality.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">
                What Makes It Special?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "🚀", text: "Cutting-edge Technologies" },
                  { icon: "🏆", text: "Exciting Prizes" },
                  { icon: "👥", text: "Expert Mentorship" },
                  { icon: "🌟", text: "Networking Opportunities" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg bg-black/40 backdrop-blur-sm"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-100 font-mono text-sm">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Info */}
          <motion.div variants={itemVariants} className="space-y-8 bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600/30">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { number: "36", label: "Hours", suffix: "hr" },
                { number: "500+", label: "Participants", suffix: "" },
                { number: "₹5L+", label: "Prize Pool", suffix: "" },
                { number: "2025", label: "Since", suffix: "" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  className="text-center p-4 sm:p-6 border border-gray-600 rounded-lg bg-black/50 backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 font-mono">
                    {stat.number}
                  </div>
                  <div className="text-gray-200 text-sm sm:text-base font-mono mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Event Details */}
            <motion.div 
              variants={itemVariants}
              className="border border-gray-600 rounded-lg p-6 bg-black/50 backdrop-blur-sm space-y-4"
            >
              <h3 className="text-xl font-bold text-green-400 font-mono">Event Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Date", value: "December 2025" },
                  { label: "Duration", value: "36 Hours Non-stop" },
                  { label: "Location", value: "PEC Campus" },
                  { label: "Format", value: "Hybrid (On-site + Online)" }
                ].map((detail, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-200 font-mono text-sm">{detail.label}</span>
                    <span className="text-white font-semibold text-sm">{detail.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(74, 222, 128, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-green-400 text-black font-bold rounded-lg transition-all duration-300 hover:bg-green-300 font-mono text-sm tracking-wide"
              >
                <span>REGISTER NOW</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Timeline Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 pt-16 border-t border-gray-800"
        >
          <motion.div variants={itemVariants} className="text-center space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono">
              Ready to Transform Ideas into Reality?
            </h3>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Join hundreds of innovators, developers, and dreamers in Tamil Nadu's 
              most exciting hackathon experience.
            </p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center items-center space-x-4 opacity-60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="w-3 h-3 border border-green-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
