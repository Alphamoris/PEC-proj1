import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrollRevealText, { ScrollRevealGlow, ScrollRevealWords } from "./ScrollRevealText";
import { GlowButton, SecondaryButton } from "./ui/Button";

const PartnershipSection = () => {
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
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  return (
    <div 
      id="partnership-section"
      ref={sectionRef} 
      className="relative min-h-screen bg-transparent text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Effects */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-32 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-1/2 left-1/4 w-1.5 h-1.5 bg-green-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full opacity-30"></div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-1/3 left-1/3 w-px h-12 sm:h-20 bg-gradient-to-b from-green-400 to-transparent rotate-45"></div>
        <div className="absolute top-2/3 right-1/4 w-px h-10 sm:h-16 bg-gradient-to-b from-white to-transparent rotate-12"></div>
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
                Collaboration Opportunities
              </span>
              <div className="w-8 h-px bg-green-400"></div>
            </div>
            
            <ScrollRevealGlow
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-transformers tracking-tight"
              glowColor="74, 222, 128"
              triggerPoint={0.3}
            >
              WANT TO
              <span className="block text-green-400">PARTNER WITH US?</span>
            </ScrollRevealGlow>
            
            <ScrollRevealWords
              text="Join Tamil Nadu's largest hackathon and connect with the next generation of innovators"
              className="text-gray-200 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
              staggerDelay={0.1}
              triggerPoint={0.2}
            />
          </motion.div>

          {/* Partnership Benefits */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Why Partner */}
            <div className="space-y-8">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-600/30">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <ScrollRevealGlow
                      className="text-2xl sm:text-3xl font-bold text-green-400 font-mono"
                      glowColor="74, 222, 128"
                      triggerPoint={0.4}
                    >
                      Why Partner With Us?
                    </ScrollRevealGlow>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🎯",
                        title: "Talent Acquisition",
                        description: "Connect with 500+ skilled developers, designers, and innovators"
                      },
                      {
                        icon: "🚀",
                        title: "Brand Visibility",
                        description: "Reach thousands through our marketing campaigns and social media"
                      },
                      {
                        icon: "💡",
                        title: "Innovation Access",
                        description: "Discover breakthrough solutions and potential investment opportunities"
                      },
                      {
                        icon: "🤝",
                        title: "Community Impact",
                        description: "Support tech education and entrepreneurship in Tamil Nadu"
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        className="flex items-start space-x-4 p-4 border border-gray-600 rounded-lg bg-black/40 backdrop-blur-sm
                                   hover:border-green-400/50 transition-all duration-300 magnetic perspective-card"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(74, 222, 128, 0.2)"
                        }}
                      >
                        <div className="text-2xl">{benefit.icon}</div>
                        <div>
                          <h4 className="text-white font-semibold text-sm sm:text-base">{benefit.title}</h4>
                          <p className="text-gray-300 text-xs sm:text-sm mt-1">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <motion.div 
                variants={cardVariants}
                className="bg-gradient-to-r from-green-400/10 to-emerald-400/10 backdrop-blur-md rounded-2xl p-6 border border-green-400/30"
              >
                <div className="text-center space-y-4">
                  <h4 className="text-xl sm:text-2xl font-bold text-green-400 font-mono">
                    Ready to Partner?
                  </h4>
                  <p className="text-gray-200 text-sm sm:text-base">
                    Let's discuss how we can create value together
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GlowButton
                      size="md"
                      rightIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      }
                      className="tracking-wide liquid-button cyberpunk-glow animate-electric"
                    >
                      BECOME A SPONSOR
                    </GlowButton>
                    <SecondaryButton
                      size="md"
                      rightIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                      className="tracking-wide"
                    >
                      DOWNLOAD PROSPECTUS
                    </SecondaryButton>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sponsorship Tiers */}
            <div className="space-y-8">
              <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gray-600/30">
                <ScrollRevealGlow
                  className="text-2xl sm:text-3xl font-bold text-green-400 font-mono mb-6"
                  glowColor="74, 222, 128"
                  triggerPoint={0.4}
                >
                  Sponsorship Tiers
                </ScrollRevealGlow>
                
                <div className="space-y-6">
                  {[
                    {
                      tier: "PLATINUM",
                      amount: "₹5,00,000+",
                      color: "from-purple-500 to-pink-500",
                      benefits: ["Title Sponsor", "Logo on all materials", "Keynote opportunity", "Premium booth space", "Dedicated networking session"],
                      highlight: true
                    },
                    {
                      tier: "GOLD",
                      amount: "₹3,00,000+",
                      color: "from-yellow-500 to-orange-500",
                      benefits: ["Co-sponsor status", "Logo on website & banners", "Workshop opportunity", "Booth space", "Resume access"],
                      highlight: false
                    },
                    {
                      tier: "SILVER",
                      amount: "₹1,50,000+",
                      color: "from-gray-400 to-gray-600",
                      benefits: ["Logo on website", "Social media mentions", "Booth space", "Swag distribution", "Networking access"],
                      highlight: false
                    },
                    {
                      tier: "BRONZE",
                      amount: "₹75,000+",
                      color: "from-amber-600 to-orange-700",
                      benefits: ["Logo on website", "Social media shoutout", "Swag distribution", "Basic networking"],
                      highlight: false
                    }
                  ].map((sponsorship, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, rotateY: 2 }}
                      className={`relative overflow-hidden border rounded-xl p-6 bg-black/50 backdrop-blur-sm card-hover cursor-pointer group ${
                        sponsorship.highlight 
                          ? 'border-green-400 shadow-lg shadow-green-400/20 neon-green' 
                          : 'border-gray-600 hover:border-green-400/50'
                      }`}
                    >
                      {sponsorship.highlight && (
                        <div className="absolute top-4 right-4 bg-green-400 text-black text-xs font-mono px-2 py-1 rounded">
                          RECOMMENDED
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-xl sm:text-2xl font-bold font-mono bg-gradient-to-r ${sponsorship.color} bg-clip-text text-transparent`}>
                          {sponsorship.tier}
                        </h4>
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-white">{sponsorship.amount}</div>
                          <div className="text-gray-400 text-xs font-mono">Investment</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {sponsorship.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-200 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partnership Types */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-20"
          >
            <motion.div variants={itemVariants} className="text-center space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-400 font-mono">
                Partnership Opportunities
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Title Sponsor",
                    description: "Exclusive title partnership with maximum visibility",
                    icon: "👑",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Technology Partner",
                    description: "Provide platforms, APIs, or infrastructure support",
                    icon: "⚡",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    title: "Prize Sponsor",
                    description: "Sponsor specific categories or overall prizes",
                    icon: "🏆",
                    gradient: "from-yellow-500 to-orange-500"
                  },
                  {
                    title: "Community Partner",
                    description: "Media coverage, venue, or promotional support",
                    icon: "🤝",
                    gradient: "from-green-500 to-emerald-500"
                  }
                ].map((partnership, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-gray-600/30 text-center
                               hover:border-green-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{partnership.icon}</div>
                    <h4 className={`text-lg font-bold mb-3 bg-gradient-to-r ${partnership.gradient} bg-clip-text text-transparent`}>
                      {partnership.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{partnership.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Contact Information */}
              <motion.div 
                variants={itemVariants}
                className="bg-black/70 backdrop-blur-md rounded-2xl p-8 border border-gray-600/30 mt-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-green-400 font-mono mb-4">Partnership Inquiries</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-200 font-mono">partnerships@pechacks.com</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-200 font-mono">+91 98765 43210</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-green-400 font-mono mb-4">Quick Response</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Our partnership team typically responds within 24 hours. 
                      Download our partnership prospectus for detailed information about benefits and opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>
              
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

export default PartnershipSection;
