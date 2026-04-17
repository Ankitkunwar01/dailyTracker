"use client";

import { motion } from 'framer-motion';

type ProgressBarProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  radius?: number;
  showText?: boolean;
};

export default function ProgressBar({ progress, size = 80, strokeWidth = 6, radius = 34, showText = true }: ProgressBarProps) {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-neutral-800" />
        <motion.circle 
          cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-blue-500" 
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="absolute flex items-center justify-center text-sm font-bold text-white">
          {progress}%
        </div>
      )}
    </div>
  );
}
