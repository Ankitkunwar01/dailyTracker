"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Circle, CheckSquare, ListTodo } from 'lucide-react';
import CheckboxItem from './CheckboxItem';

type TodoListProps = {
  todos: any[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  darkMode: boolean;
};

export default function TodoList({ todos, onToggle, onDelete, darkMode }: TodoListProps) {
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  if (todos.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-3xl border border-dashed ${borderMain} ${cardBg}`}>
        <ListTodo size={40} className={`mx-auto mb-4 ${textMuted} opacity-50`} />
        <h3 className="text-lg font-medium mb-1">Clear schedule</h3>
        <p className={`text-sm ${textMuted}`}>Add tasks above to organize your day.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map(todo => (
          <motion.div 
            key={todo.id} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            layout
            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${todo.completed ? `bg-blue-500/5 border-blue-500/20` : `${cardBg} ${borderMain} hover:border-blue-500/30`}`}
          >
            <div className="flex items-center gap-4">
              <CheckboxItem isCompleted={todo.completed} onToggle={() => onToggle(todo.id)} type="square" />
              <span className={`text-sm font-medium transition-colors ${todo.completed ? `${textMuted} line-through` : ''}`}>
                {todo.text}
              </span>
            </div>
            <button onClick={() => onDelete(todo.id)} className={`opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all`}>
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
