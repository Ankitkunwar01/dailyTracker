"use client";

import { motion } from 'framer-motion';
import { Activity, CheckSquare, BookOpen, Video, BarChart2, Settings, Layers, LogOut, ChevronRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

type SidebarProps = {
  view: string;
  setView: (v: any) => void;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  darkMode: boolean;
  onLogout: () => void;
  currentMonth: number;
  currentYear: number;
  daysInMonth: number;
  firstDay: number;
  selectedCalendarDate: string;
  onDateClick: (d: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function Sidebar({
  view, setView, progress, completedTopics, totalTopics, darkMode, onLogout,
  currentMonth, currentYear, daysInMonth, firstDay, selectedCalendarDate, onDateClick, onPrevMonth, onNextMonth
}: SidebarProps) {
  const bgSidebar = darkMode ? 'bg-[#121212]' : 'bg-white';
  const textMain = darkMode ? 'text-neutral-200' : 'text-neutral-800';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';

  return (
    <aside className={`w-72 ${bgSidebar} border-r ${borderMain} flex flex-col h-full shrink-0`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
          <Layers size={18} />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">Learning OS</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className={`p-4 rounded-2xl border ${borderMain} ${cardBg} flex items-center gap-4`}>
          <ProgressBar progress={progress} size={60} radius={26} strokeWidth={4} />
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Progress</div>
            <div className="text-[11px] text-neutral-300"><span className="text-white font-medium">{completedTopics}</span> / {totalTopics} topics</div>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Views</div>
          {[
            { id: "dashboard", icon: <Activity size={16} />, label: "Dashboard" },
            { id: "tasks", icon: <CheckSquare size={16} />, label: "Daily Tasks" },
            { id: "roadmap", icon: <BookOpen size={16} />, label: "Roadmap" },
            { id: "courses", icon: <Video size={16} />, label: "Courses" },
            { id: "backend-roadmap", icon: <Layers size={16} />, label: "Backend Roadmap" },
            { id: "progress", icon: <BarChart2 size={16} />, label: "Progress" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${view === item.id ? `bg-blue-500 text-white shadow-md shadow-blue-500/20` : `hover:${cardBg} ${textMuted} hover:${textMain}`}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`p-4 rounded-2xl border ${borderMain} ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-xs font-bold ${textMain}`}>
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
            </h3>
            <div className="flex gap-1">
              <button onClick={onPrevMonth} className={`p-1 rounded-md hover:bg-neutral-500/20 ${textMuted}`}><ChevronRight size={12} className="rotate-180" /></button>
              <button onClick={onNextMonth} className={`p-1 rounded-md hover:bg-neutral-500/20 ${textMuted}`}><ChevronRight size={12} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-1 text-neutral-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dStr = new Date(currentYear, currentMonth, day).toDateString();
              const isSelected = selectedCalendarDate === dStr;
              const isToday = new Date().toDateString() === dStr;
              return (
                <button
                  key={day}
                  onClick={() => onDateClick(dStr)}
                  className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${isSelected ? 'bg-blue-500 text-white font-bold' : isToday ? 'bg-blue-500/20 text-blue-500 font-bold' : `hover:bg-neutral-500/20 ${textMain}`}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`p-4 border-t ${borderMain}`}>
        <button onClick={() => setView('settings')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${view === 'settings' ? `bg-neutral-500/20 ${textMain}` : `${textMuted} hover:${textMain}`}`}>
          <Settings size={16} /> Settings
        </button>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">US</div>
            <div className="text-xs">
              <p className={`font-semibold ${textMain}`}>User</p>
              <p className={textMuted}>Learner</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
