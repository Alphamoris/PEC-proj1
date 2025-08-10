import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ 
  message, 
  type = "success", 
  duration = 3000, 
  onClose,
  position = "top-right" 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      bg: "bg-green-400/90",
      text: "text-black",
      icon: "✓",
      border: "border-green-400"
    },
    error: {
      bg: "bg-red-500/90",
      text: "text-white",
      icon: "⚠",
      border: "border-red-500"
    },
    warning: {
      bg: "bg-yellow-500/90",
      text: "text-black",
      icon: "⚡",
      border: "border-yellow-500"
    },
    info: {
      bg: "bg-blue-500/90",
      text: "text-white",
      icon: "ℹ",
      border: "border-blue-500"
    }
  };

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
  };

  const currentType = types[type];
  const positionClass = positions[position];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed ${positionClass} z-50 max-w-sm`}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`${currentType.bg} ${currentType.text} backdrop-blur-md rounded-lg border ${currentType.border} shadow-lg p-4 flex items-center space-x-3 max-w-xs`}>
          <div className="text-lg flex-shrink-0">
            {currentType.icon}
          </div>
          
          <div className="flex-1">
            <p className="font-mono text-sm font-semibold">
              {message}
            </p>
          </div>
          
          <motion.button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose && onClose(), 300);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-current hover:opacity-70 transition-opacity flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Notification Manager Component
export const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Expose addNotification globally
  useEffect(() => {
    window.showNotification = addNotification;
    return () => {
      delete window.showNotification;
    };
  }, []);

  return (
    <div className="pointer-events-none">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

// Helper function to show notifications
export const showNotification = (message, type = "success", options = {}) => {
  if (window.showNotification) {
    window.showNotification({ message, type, ...options });
  }
};

export default Notification;
