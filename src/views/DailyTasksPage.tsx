"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ListTodo } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TodoList from '../components/TodoList';

export default function DailyTasksPage({ darkMode, handleToggleTodo }: any) {
  const { todos, selectedCalendarDate, addTodo, updateTodo, deleteTodo, toggleTodo } = useTasks();
  const [newTodoText, setNewTodoText] = useState("");

  const activeTodos = todos.filter(t => t.date === selectedCalendarDate);
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;
    addTodo(newTodoText.trim());
    setNewTodoText("");
  };

  const todayStr = new Date().toDateString();
  const isPastDate = selectedCalendarDate !== todayStr && new Date(selectedCalendarDate) < new Date(todayStr);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="mb-8 relative">
        <input
          type="text" 
          placeholder={isPastDate ? `Cannot add tasks to past dates (${selectedCalendarDate})` : `Add a new task for ${selectedCalendarDate}...`}
          value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isPastDate && handleAddTodo()}
          disabled={isPastDate}
          className={`w-full pl-5 pr-12 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputBg} border ${borderMain} shadow-inner ${isPastDate ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <motion.button 
          whileHover={isPastDate ? {} : { scale: 1.05 }} 
          whileTap={isPastDate ? {} : { scale: 0.95 }}
          onClick={handleAddTodo}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-colors disabled:opacity-50"
          disabled={!newTodoText.trim() || isPastDate}
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <TodoList 
        todos={activeTodos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo} 
        onUpdate={updateTodo}
        darkMode={darkMode} 
      />
    </div>
  );
}
