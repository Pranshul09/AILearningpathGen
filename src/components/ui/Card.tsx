import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const baseClasses = 'bg-white rounded-2xl shadow-sm border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-200 cursor-pointer' : '';

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};