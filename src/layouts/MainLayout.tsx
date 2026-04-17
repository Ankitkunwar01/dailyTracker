"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useTasks } from '../context/TaskContext';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

type View = "dashboard" | "tasks" | "roadmap" | "courses" | "progress" | "settings";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const { data, toggleTopic, undoTopic, resetAll } = useRoadmap();
  const { 
    todos, streak, selectedCalendarDate, setSelectedCalendarDate, toggleTodo, incrementStreak 
  } = useTasks();
  const { overallProgress, completedTopics, totalTopics } = useProgress();

  const [view, setView] = useState<View>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  // Calendar logic
  const todayDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(todayDate.getMonth());
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const addToast = (message: string, undoAction?: any) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, undoAction }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  const handleToggleTopic = (cIdx: number, tIdx: number) => {
    const topic = data.categories[cIdx].topics[tIdx];
    if (!topic.completed) {
      setPendingAction({ type: 'topic', cIdx, tIdx, title: topic.title });
      setShowConfirmModal(true);
    } else {
      toggleTopic(cIdx, tIdx);
    }
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      setPendingAction({ type: 'task', id, title: todo.text });
      setShowConfirmModal(true);
    } else {
      toggleTodo(id);
    }
  };

  const confirmCompletion = () => {
    if (!pendingAction) return;
    if (pendingAction.type === 'topic') {
      toggleTopic(pendingAction.cIdx, pendingAction.tIdx);
      incrementStreak();
      addToast(`Completed: ${pendingAction.title}`, { type: 'topic', cIdx: pendingAction.cIdx, tIdx: pendingAction.tIdx });
    } else {
      toggleTodo(pendingAction.id);
      addToast(`Task Completed: ${pendingAction.title}`, { type: 'task', id: pendingAction.id });
    }
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const handleUndo = (undo: any) => {
    if (undo.type === 'topic') undoTopic(undo.cIdx, undo.tIdx);
    else toggleTodo(undo.id);
  };

  const bgMain = darkMode ? 'bg-[#0a0a0a]' : 'bg-[#f8fafc]';
  const textMain = darkMode ? 'text-neutral-200' : 'text-neutral-800';

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${bgMain} ${textMain}`}>
      <Sidebar 
        view={view} setView={setView} progress={overallProgress} 
        completedTopics={completedTopics} totalTopics={totalTopics} 
        darkMode={darkMode} onLogout={logout} 
        currentMonth={currentMonth} currentYear={currentYear}
        daysInMonth={daysInMonth} firstDay={firstDay}
        selectedCalendarDate={selectedCalendarDate}
        onDateClick={(d) => { setSelectedCalendarDate(d); setView("tasks"); }}
        onPrevMonth={() => currentMonth === 0 ? (setCurrentMonth(11), setCurrentYear(currentYear-1)) : setCurrentMonth(currentMonth-1)}
        onNextMonth={() => currentMonth === 11 ? (setCurrentMonth(0), setCurrentYear(currentYear+1)) : setCurrentMonth(currentMonth+1)}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar 
          view={view} selectedCalendarDate={selectedCalendarDate} 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
          darkMode={darkMode} 
        />

        <div className={`flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth scrollbar-thin ${darkMode ? 'scrollbar-thumb-neutral-800' : 'scrollbar-thumb-neutral-300'}`}>
          <div className="max-w-5xl mx-auto pb-20">
            {React.cloneElement(children as React.ReactElement<any>, { 
              view, setView, searchQuery, darkMode, setDarkMode, 
              handleToggleTopic, handleToggleTodo, resetAll
            })}
          </div>
        </div>
      </main>

      <ConfirmModal 
        isOpen={showConfirmModal} title="Mark as Complete?" 
        message={<p>Are you sure you want to mark <span className="font-semibold text-blue-500">"{pendingAction?.title}"</span> as completed?</p>}
        onConfirm={confirmCompletion} onCancel={() => setShowConfirmModal(false)} darkMode={darkMode}
      />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-between gap-3 min-w-[280px] max-w-sm pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1 rounded-full shrink-0"><CheckCircle2 size={16} /></div>
                <p className="text-sm font-medium truncate">{toast.message}</p>
              </div>
              {toast.undoAction && (
                <button onClick={() => handleUndo(toast.undoAction)} className="text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-2 py-1 rounded-md transition-colors">
                  Undo
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
