import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollRevealText, { ScrollRevealGlow, ScrollRevealWords } from "./ScrollRevealText";
import { GlowButton } from "./ui/Button";

const ProblemStatement = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
      id="problem-statement-section"
      ref={sectionRef} 
      className="relative min-h-screen bg-transparent text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Effects */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-40 left-10 w-1 h-1 bg-white rounded-full opacity-30"></div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/4 right-1/3 w-px h-12 sm:h-20 bg-gradient-to-b from-green-400 to-transparent rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-px h-10 sm:h-16 bg-gradient-to-b from-white to-transparent rotate-12"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 lg:space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-px bg-green-400"></div>
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase">
                Challenge Overview
              </span>
              <div className="w-8 h-px bg-green-400"></div>
            </div>
            
            <ScrollRevealGlow
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-transformers tracking-tight"
              glowColor="74, 222, 128"
              triggerPoint={0.3}
            >
              PROBLEM
              <span className="block text-green-400">STATEMENT</span>
            </ScrollRevealGlow>
            
            <ScrollRevealWords
              text="Shape the future by solving real-world challenges that impact millions of lives"
              className="text-gray-200 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
              staggerDelay={0.08}
              triggerPoint={0.2}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Main Problem */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-600/30">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <ScrollRevealGlow
                      className="text-2xl sm:text-3xl font-bold text-green-400 font-mono"
                      glowColor="74, 222, 128"
                      triggerPoint={0.4}
                    >
                      The Challenge
                    </ScrollRevealGlow>
                  </div>
                  
                  <p className="text-gray-100 text-base sm:text-lg leading-relaxed">
                    In an era of rapid technological advancement, we face unprecedented challenges that require 
                    innovative solutions. From climate change and healthcare accessibility to digital literacy 
                    and sustainable development, the problems of today demand fresh perspectives and cutting-edge technology.
                  </p>
                  
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    <span className="text-green-400 font-bold">PEC HACKS 3.0</span> challenges you to think beyond 
                    conventional boundaries and create solutions that can make a tangible impact on society.
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <motion.div 
                variants={cardVariants}
                className="bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600/30"
              >
                <h4 className="text-xl font-bold text-green-400 font-mono mb-6">Impact Potential</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "1B+", label: "People Affected", icon: "👥" },
                    { number: "50+", label: "Problem Domains", icon: "🌍" },
                    { number: "∞", label: "Possibilities", icon: "💡" },
                    { number: "24/7", label: "Solution Needed", icon: "⏰" }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 border border-gray-600 rounded-lg bg-black/50 backdrop-blur-sm"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xl sm:text-2xl font-bold text-green-400 font-mono">
                        {stat.number}
                      </div>
                      <div className="text-gray-200 text-xs sm:text-sm font-mono mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Problem Domains */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-600/30">
                <ScrollRevealGlow
                  className="text-2xl sm:text-3xl font-bold text-green-400 font-mono mb-6"
                  glowColor="74, 222, 128"
                  triggerPoint={0.4}
                >
                  Focus Domains
                </ScrollRevealGlow>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Healthcare & Wellness",
                      description: "Digital health solutions, telemedicine, mental health apps",
                      icon: "🏥",
                      color: "from-red-500 to-pink-500"
                    },
                    {
                      title: "Climate & Sustainability",
                      description: "Environmental monitoring, renewable energy, waste management",
                      icon: "🌱",
                      color: "from-green-500 to-emerald-500"
                    },
                    {
                      title: "Education & Accessibility",
                      description: "EdTech platforms, inclusive learning, skill development",
                      icon: "📚",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      title: "Smart Cities & IoT",
                      description: "Urban planning, traffic management, smart infrastructure",
                      icon: "🏙️",
                      color: "from-purple-500 to-violet-500"
                    },
                    {
                      title: "FinTech & Blockchain",
                      description: "Digital payments, cryptocurrency, financial inclusion",
                      icon: "💰",
                      color: "from-yellow-500 to-orange-500"
                    },
                    {
                      title: "AI & Machine Learning",
                      description: "Automation, predictive analytics, intelligent systems",
                      icon: "🤖",
                      color: "from-indigo-500 to-purple-500"
                    }
                  ].map((domain, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(74, 222, 128, 0.1)" }}
                      className="group border border-gray-600 rounded-lg p-4 bg-black/40 backdrop-blur-sm 
                                 hover:border-green-400/50 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                          {domain.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm sm:text-base group-hover:text-green-400 transition-colors">
                            {domain.title}
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">
                            {domain.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div 
                variants={cardVariants}
                className="bg-gradient-to-r from-green-400/10 to-emerald-400/10 backdrop-blur-md rounded-2xl p-6 border border-green-400/30"
              >
                <div className="text-center space-y-4">
                  <h4 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">
                    Ready to Make an Impact?
                  </h4>
                  <p className="text-gray-200 text-sm sm:text-base">
                    Choose your domain, assemble your team, and let's build the future together.
                  </p>
                  <GlowButton
                    size="md"
                    rightIcon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    }
                    className="tracking-wide"
                  >
                    START BUILDING
                  </GlowButton>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Section - Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-20 pt-16 border-t border-gray-800"
          >
            <motion.div variants={itemVariants} className="text-center space-y-8">
              <ScrollRevealGlow
                className="text-2xl sm:text-3xl font-bold text-green-400 font-mono"
                glowColor="74, 222, 128"
                triggerPoint={0.3}
              >
                Problem-Solution Framework
              </ScrollRevealGlow>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    step: "01",
                    title: "Identify",
                    description: "Analyze real-world problems and understand their root causes",
                    icon: "🔍"
                  },
                  {
                    step: "02", 
                    title: "Innovate",
                    description: "Design creative solutions using cutting-edge technology",
                    icon: "💡"
                  },
                  {
                    step: "03",
                    title: "Implement",
                    description: "Build functional prototypes that can create lasting impact",
                    icon: "🚀"
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600/30 text-center"
                  >
                    <div className="text-4xl mb-4">{phase.icon}</div>
                    <div className="text-green-400 font-mono text-sm mb-2">STEP {phase.step}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{phase.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{phase.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-center items-center space-x-4 opacity-60 pt-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <div className="w-3 h-3 border border-green-400 rotate-45"></div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemStatement;
