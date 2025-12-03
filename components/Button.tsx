import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 min-h-[44px] rounded-md font-bold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-yellow text-brand-black hover:bg-yellow-400 shadow-md hover:shadow-lg hover:shadow-yellow-400/40",
    outline: "border-2 border-brand-yellow text-brand-black hover:bg-brand-yellow hover:text-brand-black",
    ghost: "text-brand-black hover:text-brand-yellow bg-transparent"
  };

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
