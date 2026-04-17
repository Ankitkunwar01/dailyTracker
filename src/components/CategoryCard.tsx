"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TopicCard from './TopicCard';

type CategoryCardProps = {
  category: any;
  catIndex: number;
  onToggleTopic: (catIndex: number, topicIndex: number) => void;
  onUpdateNotes: (catIndex: number, topicIndex: number, notes: string) => void;
  darkMode: boolean;
  searchQuery: string;
};

export default function CategoryCard({ 
  category, 
  catIndex, 
  onToggleTopic, 
  onUpdateNotes, 
  darkMode,
  searchQuery
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredTopics = category.topics.filter((t: any) => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredTopics.length === 0) return null;

  const catProgress = Math.round((category.topics.filter((t: any)=>t.completed).length / category.topics.length)*100);
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <motion.div layout className={`rounded-3xl border ${borderMain} ${cardBg} overflow-hidden shadow-sm mb-6`}>
      <div 
        className="p-6 cursor-pointer hover:bg-neutral-500/5 transition-colors flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-xl font-bold flex items-center gap-3">
            {category.name}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catProgress === 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {catProgress}%
            </span>
          </h3>
          <p className={`text-sm mt-1 ${textMuted}`}>{category.topics.length} Topics</p>
        </div>
        <ChevronDown size={20} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-inherit"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTopics.map((topic: any) => {
                const topicIndex = category.topics.findIndex((t: any) => t.id === topic.id);
                return (
                  <TopicCard 
                    key={topic.id}
                    topic={topic}
                    catName={category.name}
                    onToggle={() => onToggleTopic(catIndex, topicIndex)}
                    onUpdateNotes={(notes) => onUpdateNotes(catIndex, topicIndex, notes)}
                    darkMode={darkMode}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
