"use client";

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

type NavbarProps = {
  view: string;
  selectedCalendarDate: string;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  darkMode: boolean;
};

export default function Navbar({ view, selectedCalendarDate, searchQuery, setSearchQuery, darkMode }: NavbarProps) {
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';

  const getTitle = () => {
    switch (view) {
      case "dashboard": return "Welcome Back, User 👋";
      case "tasks": return `Tasks for ${selectedCalendarDate}`;
      case "roadmap": return "Structured Learning Path";
      case "courses": return "Recommended Resources";
      case "progress": return "Learning Velocity";
      case "settings": return "System Settings";
      default: return "AI Learning OS";
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case "dashboard": return "Here is an overview of your progress today.";
      case "tasks": return "Plan your day and stay consistent.";
      case "roadmap": return "Master topics step-by-step.";
      case "courses": return "Learn from the best content.";
      case "progress": return "Visualize your growth and streaks.";
      default: return "Intelligent workspace.";
    }
  };

  return (
    <header className={`px-6 md:px-10 py-4 border-b ${borderMain} ${cardBg} backdrop-blur-md sticky top-0 z-10 flex items-center justify-between`}>
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <h2 className="text-xl md:text-2xl font-bold capitalize">{getTitle()}</h2>
        <p className={`text-sm ${textMuted} mt-0.5`}>{getSubtitle()}</p>
      </motion.div>

      {view !== "settings" && view !== "progress" && (
        <div className="hidden md:flex relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className={textMuted} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg} border ${borderMain}`}
          />
        </div>
      )}
    </header>
  );
}
