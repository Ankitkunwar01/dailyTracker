"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X, ListTodo } from 'lucide-react';
import CheckboxItem from './CheckboxItem';

type TodoListProps = {
  todos: any[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  darkMode: boolean;
};

export default function TodoList({ todos, onToggle, onDelete, onUpdate, darkMode }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';

  const startEditing = (todo: any) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (id: string) => {
    if (editText.trim()) {
      onUpdate(id, editText.trim());
    }
    setEditingId(null);
  };

  if (todos.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center py-16 rounded-3xl border border-dashed ${borderMain} ${cardBg}`}>
        <ListTodo size={40} className={`mx-auto mb-4 ${textMuted} opacity-50`} />
        <h3 className="text-lg font-medium mb-1">Clear schedule</h3>
        <p className={`text-sm ${textMuted}`}>Add tasks above to organize your day.</p>
      </motion.div>
    );
  }

  const todayStr = new Date().toDateString();

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {todos.map(todo => {
          const isPast = todo.date !== todayStr && new Date(todo.date) < new Date(todayStr);
          
          return (
            <motion.div 
              key={todo.id} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              layout
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${todo.completed ? `bg-blue-500/5 border-blue-500/20` : `${cardBg} ${borderMain} hover:border-blue-500/30`}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <CheckboxItem 
                  isCompleted={todo.completed} 
                  onToggle={() => !isPast && onToggle(todo.id)} 
                  type="square" 
                  disabled={isPast}
                />
                
                {editingId === todo.id ? (
                  <input
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(todo.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className={`flex-1 bg-transparent border-b border-blue-500 focus:outline-none text-sm font-medium py-1`}
                  />
                ) : (
                  <span className={`text-sm font-medium transition-colors ${todo.completed ? `${textMuted} line-through` : ''}`}>
                    {todo.text}
                    {isPast && !todo.completed && <span className="ml-2 text-[10px] uppercase tracking-wider text-red-500/60 font-bold">(Incomplete)</span>}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {editingId === todo.id ? (
                  <>
                    <button onClick={() => handleUpdate(todo.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-all">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-neutral-500 hover:bg-neutral-500/10 rounded-lg transition-all">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    {!isPast && (
                      <button onClick={() => startEditing(todo)} className={`opacity-0 group-hover:opacity-100 p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all`}>
                        <Edit2 size={16} />
                      </button>
                    )}
                    <button onClick={() => onDelete(todo.id)} className={`opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all`}>
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
