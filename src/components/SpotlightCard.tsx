import React from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(255, 255, 255, 0.1)", // Kept for prop compatibility
  ...props 
}: SpotlightCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        rotateX: 2, 
        rotateY: -2, 
        translateZ: 20,
        boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.15)",
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative overflow-hidden rounded-3xl group ${className}`}
      {...props}
    >
      {/* 5D Sheen/Glow Overlay - Hardware accelerated opacity transition instead of tracking mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${spotlightColor} 0%, transparent 60%)`,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Content wrapper */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
