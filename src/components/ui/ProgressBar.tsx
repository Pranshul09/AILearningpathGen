import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};