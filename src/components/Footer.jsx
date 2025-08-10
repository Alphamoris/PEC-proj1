import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollRevealText, { ScrollRevealGlow } from "./ScrollRevealText";
import { GlowButton, SecondaryButton } from "./ui/Button";

const Footer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <footer 
      ref={sectionRef}
      className="relative bg-black/90 backdrop-blur-md text-white border-t border-green-400/30 mt-20"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-16 right-1/3 w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-green-400 to-transparent rotate-45 opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <ScrollRevealGlow
                className="text-3xl sm:text-4xl font-extrabold font-transformers tracking-tight"
                glowColor="74, 222, 128"
                triggerPoint={0.3}
              >
                PEC <span className="text-green-400">HACKS</span>
              </ScrollRevealGlow>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-md">
                Tamil Nadu's largest hackathon bringing together the brightest minds to solve 
                real-world challenges through innovation and technology.
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-green-400 font-mono">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-200 text-sm">Panimalar Engineering College, Chennai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-200 text-sm font-mono">info@pechacks.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-200 text-sm font-mono">+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-green-400 font-mono">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: "Instagram", icon: "📸", link: "#" },
                  { name: "Twitter", icon: "🐦", link: "#" },
                  { name: "LinkedIn", icon: "💼", link: "#" },
                  { name: "Discord", icon: "🎮", link: "#" },
                  { name: "YouTube", icon: "📺", link: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    variants={socialVariants}
                    href={social.link}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      boxShadow: "0 0 15px rgba(74, 222, 128, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-black/70 border border-gray-600 rounded-lg flex items-center justify-center
                               hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 group"
                    title={social.name}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-bold text-green-400 font-mono">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { name: "Home", link: "#" },
                { name: "About", link: "#about-section" },
                { name: "Problem Statement", link: "#problem-statement-section" },
                { name: "Domains", link: "#" },
                { name: "Timeline", link: "#" },
                { name: "Prizes", link: "#" },
                { name: "Sponsors", link: "#partnership-section" },
                { name: "FAQ", link: "#" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.link}
                  whileHover={{ x: 5, color: "#4ade80" }}
                  className="block text-gray-200 hover:text-green-400 text-sm transition-colors duration-300 font-mono"
                  onClick={(e) => {
                    if (link.link.startsWith('#') && link.link.length > 1) {
                      e.preventDefault();
                      const element = document.getElementById(link.link.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Resources & Support */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-bold text-green-400 font-mono">Resources</h4>
            <nav className="space-y-3">
              {[
                { name: "Registration", link: "#" },
                { name: "Guidelines", link: "#" },
                { name: "Code of Conduct", link: "#" },
                { name: "API Documentation", link: "#" },
                { name: "Mentors", link: "#" },
                { name: "Workshop", link: "#" },
                { name: "Support", link: "#" },
                { name: "Media Kit", link: "#" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.link}
                  whileHover={{ x: 5, color: "#4ade80" }}
                  className="block text-gray-200 hover:text-green-400 text-sm transition-colors duration-300 font-mono"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Separator */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          {/* Partnership & Sponsor CTA */}
          <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-600/30">
            <div className="text-center space-y-4">
              <h4 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">
                Interested in Sponsoring or Partnering?
              </h4>
              <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto">
                Join Tamil Nadu's largest hackathon and connect with the next generation of innovators. 
                Multiple partnership opportunities available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton
                  size="md"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                >
                  BECOME A SPONSOR
                </GlowButton>
                <SecondaryButton
                  size="md"
                  rightIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  CONTACT US
                </SecondaryButton>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center md:text-left"
            >
              <span className="text-gray-400 text-sm font-mono">
                © 2025 PEC HACKS 3.0. All rights reserved.
              </span>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 text-sm font-mono transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-green-400 text-sm font-mono transition-colors">
                  Terms of Service
                </a>
              </div>
            </motion.div>

            {/* Tech Stack Badge */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-2 bg-black/50 border border-gray-600 rounded-lg px-4 py-2"
            >
              <span className="text-gray-400 text-xs font-mono">Powered by</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-xs font-bold">React</span>
                <span className="text-gray-500">•</span>
                <span className="text-green-400 text-xs font-bold">Three.js</span>
                <span className="text-gray-500">•</span>
                <span className="text-green-400 text-xs font-bold">Tailwind</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative bottom line */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-4 border-t border-gray-800 flex justify-center"
          >
            <div className="flex items-center space-x-4 opacity-60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="w-3 h-3 border border-green-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
