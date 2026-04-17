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
};

export default function CheckboxItem({ 
  isCompleted, 
  onToggle, 
  type = 'circle', 
  size = 24,
  activeColor = 'text-blue-500',
  inactiveColor = 'text-neutral-500'
}: CheckboxItemProps) {
  return (
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`flex-shrink-0 transition-colors ${isCompleted ? activeColor : `${inactiveColor} group-hover:text-neutral-400`}`}
    >
      {isCompleted ? (
        type === 'circle' ? <CheckCircle2 size={size} className={activeColor.replace('text-', 'fill-') + '/20'} /> : <CheckSquare size={size} className={activeColor.replace('text-', 'fill-') + '/20'} />
      ) : (
        <Circle size={size} />
      )}
    </motion.button>
  );
}
