"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  darkMode: boolean;
};

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, darkMode }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-sm p-8 rounded-3xl shadow-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
              <CheckCircle2 size={24} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
            <div className={`text-sm mb-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {message}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onCancel}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'}`}
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
