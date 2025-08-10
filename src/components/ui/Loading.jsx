import React from "react";
import { motion } from "framer-motion";

const Loading = ({ 
  size = "md", 
  variant = "spinner", 
  color = "green",
  text = "",
  fullScreen = false,
  className = ""
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colors = {
    green: "text-green-400 border-green-400",
    white: "text-white border-white",
    gray: "text-gray-400 border-gray-400"
  };

  const Spinner = () => (
    <motion.div
      className={`border-2 border-transparent border-t-current rounded-full ${sizes[size]} ${colors[color]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 bg-current rounded-full ${colors[color]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <motion.div
      className={`rounded-full bg-current ${sizes[size]} ${colors[color]}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );

  const MatrixRain = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-current rounded-full"
          style={{ height: Math.random() * 20 + 10 }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1
          }}
          className={colors[color]}
        />
      ))}
    </div>
  );

  const HackerText = () => {
    const chars = "01010101";
    return (
      <div className="flex space-x-1">
        {chars.split("").map((char, i) => (
          <motion.span
            key={i}
            className={`font-mono text-xs ${colors[color]}`}
            animate={{
              opacity: [0.3, 1, 0.3],
              color: ["currentColor", "#4ade80", "currentColor"]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return <Dots />;
      case "pulse":
        return <Pulse />;
      case "matrix":
        return <MatrixRain />;
      case "hacker":
        return <HackerText />;
      default:
        return <Spinner />;
    }
  };

  const content = (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {renderVariant()}
      {text && (
        <motion.p
          className={`text-sm font-mono ${colors[color]}`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Loading;
