import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'HOME', id: 'home', icon: '🏠' },
    { name: 'ABOUT', id: 'about', icon: '📖' },
    { name: 'PROBLEM', id: 'problem', icon: '⚡' },
    { name: 'PRIZES', id: 'prizes', icon: '🏆' },
    { name: 'SPONSORS', id: 'partnership', icon: '🤝' },
    { name: 'CONTACT', id: 'contact', icon: '📞' }
  ];

  const handleItemClick = (id) => {
    onNavigate(id);
    onClose();
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/95 backdrop-blur-md border-l border-green-400/30 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-400 rounded-md flex items-center justify-center">
                  <span className="text-black font-bold text-xs">P</span>
                </div>
                <h3 className="text-green-400 font-mono font-bold text-sm">PEC HACKS 3.0</h3>
              </div>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Navigation Items */}
            <div className="p-4">
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      backgroundColor: "rgba(74, 222, 128, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-green-400/50 transition-all duration-300 text-left group"
                  >
                    <div className="w-8 h-8 bg-gray-800 group-hover:bg-green-400/20 rounded-md flex items-center justify-center transition-colors">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white group-hover:text-green-400 font-mono font-medium text-sm transition-colors">
                        {item.name}
                      </div>
                    </div>

                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-400/10 to-emerald-400/10 border border-green-400/30 rounded-lg"
              >
                <h4 className="text-green-400 font-mono font-bold text-sm mb-3">Ready to Hack?</h4>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-400 text-black font-bold py-2.5 rounded-md font-mono text-xs tracking-wide hover:bg-green-300 transition-colors"
                >
                  REGISTER NOW
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <p className="text-gray-400 text-xs mb-3 font-mono">Follow Us</p>
                <div className="flex space-x-2">
                  {[
                    { name: "Instagram", icon: "📸" },
                    { name: "Twitter", icon: "🐦" },
                    { name: "LinkedIn", icon: "💼" },
                    { name: "Discord", icon: "🎮" }
                  ].map((social, index) => (
                    <motion.button
                      key={social.name}
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 bg-gray-800 hover:bg-green-400/20 border border-gray-700 hover:border-green-400/50 rounded-md flex items-center justify-center transition-all duration-300"
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
