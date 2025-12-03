import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BeeLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light = white/yellow (for dark bg), dark = black/yellow (for light bg)
  animated?: boolean;
}

export const BeeLogo: React.FC<BeeLogoProps> = ({ className = "w-12 h-12", variant = 'dark', animated = false }) => {
  const bodyColor = variant === 'dark' ? '#000000' : '#FFFFFF';
  const strokeColor = variant === 'dark' ? '#333333' : '#E5E5E5';
  
  // Animation variants
  const wingVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, 10, -5, 10, 0],
      transition: { 
        duration: 0.2, 
        repeat: Infinity, 
        repeatType: "reverse" as const,
        repeatDelay: 0.1
      }
    }
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative ${className} ${animated ? 'filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]' : ''}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        {/* Antennae */}
        <path d="M40 35 Q 35 20 25 25" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M60 35 Q 65 20 75 25" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="25" cy="25" r="2" fill={strokeColor} />
        <circle cx="75" cy="25" r="2" fill={strokeColor} />

        {/* Wings (Back) */}
        <motion.g
           initial="initial"
           animate={animated ? "animate" : "initial"}
           variants={wingVariants}
           style={{ originX: 0.5, originY: 0.5 }}
        >
          <path 
            d="M25 45 C10 40 -5 20 15 10 C30 5 45 35 45 45" 
            fill={variant === 'dark' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}
            stroke={strokeColor} 
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <path 
            d="M75 45 C90 40 105 20 85 10 C70 5 55 35 55 45" 
            fill={variant === 'dark' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}
            stroke={strokeColor} 
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </motion.g>

        {/* Body Segments */}
        <ellipse cx="50" cy="55" rx="22" ry="32" fill={bodyColor} stroke={strokeColor} strokeWidth="1" />
        
        {/* Stripes - Curved for volume */}
        <path d="M32 45 Q 50 50 68 45" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 58 Q 50 63 70 58" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" />
        <path d="M35 70 Q 50 73 65 70" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />

        {/* Lightning Bolt (The Stinger) */}
        <motion.path 
          variants={animated ? pulseVariants : {}}
          animate={animated ? "animate" : "initial"}
          d="M52 35 L42 55 H52 L42 85 L68 55 H56 L62 35 Z" 
          fill="#FFD700"
          stroke={bodyColor}
          strokeWidth="1"
        />
        
        {/* Shine on body */}
        <ellipse cx="40" cy="45" rx="5" ry="8" fill="white" fillOpacity="0.2" transform="rotate(-15 40 45)" />
      </svg>
    </div>
  );
};
