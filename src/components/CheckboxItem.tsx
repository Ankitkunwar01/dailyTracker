"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, CheckSquare } from 'lucide-react';

type CheckboxItemProps = {
  isCompleted: boolean;
  onToggle: () => void;
  type?: 'circle' | 'square';
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  disabled?: boolean;
};

export default function CheckboxItem({ 
  isCompleted, 
  onToggle, 
  type = 'circle', 
  size = 24,
  activeColor = 'text-blue-500',
  inactiveColor = 'text-neutral-500',
  disabled = false
}: CheckboxItemProps) {
  return (
    <motion.button 
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={(e) => { 
        e.stopPropagation(); 
        if (!disabled) onToggle(); 
      }}
      className={`flex-shrink-0 transition-colors ${disabled ? 'opacity-30 cursor-not-allowed' : ''} ${isCompleted ? activeColor : `${inactiveColor} group-hover:text-neutral-400`}`}
      disabled={disabled}
    >
      {isCompleted ? (
        type === 'circle' ? <CheckCircle2 size={size} className={activeColor.replace('text-', 'fill-') + '/20'} /> : <CheckSquare size={size} className={activeColor.replace('text-', 'fill-') + '/20'} />
      ) : (
        <Circle size={size} />
      )}
    </motion.button>
  );
}
