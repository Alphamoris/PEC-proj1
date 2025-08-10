import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  onClick,
  ...props
}, ref) => {

  const baseClasses = "relative inline-flex items-center justify-center font-mono font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

  const variants = {
    primary: "bg-green-400 text-black hover:bg-green-300 focus:ring-green-400 shadow-lg hover:shadow-green-400/25",
    secondary: "bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black focus:ring-green-400",
    outline: "bg-transparent border border-gray-600 text-white hover:border-green-400 hover:text-green-400 focus:ring-green-400",
    ghost: "bg-transparent text-gray-400 hover:text-green-400 hover:bg-green-400/10 focus:ring-green-400",
    danger: "bg-red-500 text-white hover:bg-red-400 focus:ring-red-500 shadow-lg hover:shadow-red-500/25",
    glow: "bg-green-400 text-black hover:bg-green-300 focus:ring-green-400 shadow-lg hover:shadow-green-400/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-xl",
    xl: "px-10 py-5 text-lg rounded-2xl"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const LoadingSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
    />
  );

  const handleClick = (e) => {
    if (disabled || isLoading) return;
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      {...props}
    >
      {/* Background glow effect for glow variant */}
      {variant === 'glow' && (
        <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center space-x-2">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </span>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300 transform -skew-x-12" />
    </motion.button>
  );
});

Button.displayName = "Button";

// Button component variants for specific use cases
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;
export const GlowButton = (props) => <Button variant="glow" {...props} />;

export default Button;
