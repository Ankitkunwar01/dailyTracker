"use client";

import { motion } from 'framer-motion';
import { BarChart2, Flame, CheckCircle2, ListTodo, ChevronRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useTasks } from '../context/TaskContext';
import { useRoadmap } from '../context/RoadmapContext';
import GraphChart from '../components/GraphChart';
import CheckboxItem from '../components/CheckboxItem';

export default function Dashboard({ setView, handleToggleTopic, handleToggleTodo, darkMode }: any) {
  const { overallProgress, completedTopics, lineChartData } = useProgress();
  const { streak, todos, selectedCalendarDate } = useTasks();
  const { data } = useRoadmap();

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';

  const activeTodos = todos.filter(t => t.date === selectedCalendarDate);

  // Find next topic
  let nextTopic: any = null;
  let nextCatName = "";
  let cIdx = 0, tIdx = 0;
  for (let i = 0; i < data.categories.length; i++) {
    for (let j = 0; j < data.categories[i].topics.length; j++) {
      if (!data.categories[i].topics[j].completed) {
        nextTopic = data.categories[i].topics[j];
        nextCatName = data.categories[i].name;
        cIdx = i; tIdx = j;
        break;
      }
    }
    if (nextTopic) break;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><BarChart2 size={24} /></div>
          <div><p className={`text-sm font-medium ${textMuted}`}>Overall Progress</p><h4 className="text-2xl font-bold">{overallProgress}%</h4></div>
        </motion.div>
        <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><Flame size={24} /></div>
          <div><p className={`text-sm font-medium ${textMuted}`}>Current Streak</p><h4 className="text-2xl font-bold">{streak} Days</h4></div>
        </motion.div>
        <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm flex items-center gap-4`}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><CheckCircle2 size={24} /></div>
          <div><p className={`text-sm font-medium ${textMuted}`}>Completed</p><h4 className="text-2xl font-bold">{completedTopics}</h4></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm`}>
            <h3 className="text-lg font-bold mb-4">Continue Learning</h3>
            {nextTopic ? (
              <div className={`p-4 rounded-2xl border ${borderMain} ${inputBg} flex justify-between items-center`}>
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">{nextCatName}</span>
                    {nextTopic.day && <span className="text-xs font-medium text-neutral-500">{nextTopic.day}</span>}
                  </div>
                  <h4 className="font-semibold">{nextTopic.title}</h4>
                </div>
                <button onClick={() => handleToggleTopic(cIdx, tIdx)} className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-md"><CheckCircle2 size={20} /></button>
              </div>
            ) : <p className={textMuted}>You've completed everything! 🎉</p>}
          </motion.div>
          <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm`}>
            <h3 className="text-lg font-bold mb-4">Activity Overview</h3>
            <GraphChart data={lineChartData} darkMode={darkMode} />
          </motion.div>
        </div>
        <motion.div variants={itemVariants} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm h-full`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Today's Tasks</h3><button onClick={() => setView("tasks")} className="text-xs font-semibold text-blue-500 hover:underline">View All</button></div>
          {activeTodos.length === 0 ? (
            <div className="text-center py-10"><ListTodo size={32} className={`mx-auto mb-2 ${textMuted} opacity-50`} /><p className={`text-sm ${textMuted}`}>No tasks set for today.</p></div>
          ) : (
            <div className="space-y-3">
              {activeTodos.slice(0,5).map(t => (
                <div key={t.id} className="flex items-center gap-3">
                  <CheckboxItem isCompleted={t.completed} onToggle={() => handleToggleTodo(t.id)} type="square" size={18} />
                  <span className={`text-sm truncate ${t.completed ? `line-through opacity-50` : ''}`}>{t.text}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
