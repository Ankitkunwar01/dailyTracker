"use client";

import { motion } from 'framer-motion';

export default function SettingsPage({ darkMode, setDarkMode, resetAll, textMuted }: any) {
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm`}>
        <h3 className="text-lg font-bold mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div><p className="font-medium">Dark Mode</p><p className={`text-sm ${textMuted}`}>Switch between light and dark themes.</p></div>
          <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-500' : 'bg-neutral-300'}`}>
            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-sm" animate={{ x: darkMode ? 24 : 0 }} />
          </button>
        </div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-3xl border border-red-500/20 bg-red-500/5 shadow-sm">
        <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
        <p className={`text-sm ${textMuted} mb-4`}>Permanently delete all your progress, tasks, and notes.</p>
        <button onClick={() => confirm("Are you sure? This cannot be undone.") && resetAll()} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors">Reset All Data</button>
      </motion.div>
    </div>
  );
}
