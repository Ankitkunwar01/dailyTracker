"use client";

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useTasks } from '../context/TaskContext';
import LoginPage from '../views/LoginPage';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../views/Dashboard';
import RoadmapPage from '../views/RoadmapPage';
import DailyTasksPage from '../views/DailyTasksPage';
import ProgressPage from '../views/ProgressPage';
import CoursesPage from '../views/CoursesPage';
import SettingsPage from '../views/SettingsPage';
import { Loader2 } from 'lucide-react';

export default function AppShell() {
  const { isAuthenticated } = useAuth();
  const { loading: roadmapLoading } = useRoadmap();
  const { loading: tasksLoading } = useTasks();

  if (!isAuthenticated) return <LoginPage darkMode={true} />;

  if (roadmapLoading || tasksLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <MainLayout>
      <ViewManager />
    </MainLayout>
  );
}

function ViewManager({ view, setView, searchQuery, darkMode, setDarkMode, handleToggleTopic, handleToggleTodo, resetAll }: any) {
  switch (view) {
    case "dashboard": return <Dashboard setView={setView} handleToggleTopic={handleToggleTopic} handleToggleTodo={handleToggleTodo} darkMode={darkMode} />;
    case "roadmap": return <RoadmapPage searchQuery={searchQuery} darkMode={darkMode} handleToggleTopic={handleToggleTopic} />;
    case "tasks": return <DailyTasksPage darkMode={darkMode} handleToggleTodo={handleToggleTodo} />;
    case "progress": return <ProgressPage darkMode={darkMode} />;
    case "courses": return <CoursesPage darkMode={darkMode} />;
    case "settings": return <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} resetAll={resetAll} textMuted={darkMode ? 'text-neutral-400' : 'text-neutral-500'} />;
    default: return <Dashboard setView={setView} handleToggleTopic={handleToggleTopic} handleToggleTodo={handleToggleTodo} darkMode={darkMode} />;
  }
}
