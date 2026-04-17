"use client";

import { motion } from 'framer-motion';
import CheckboxItem from './CheckboxItem';
import { PlayCircle, Video, BookOpen, ExternalLink } from 'lucide-react';

type TopicCardProps = {
  topic: any;
  catName: string;
  onToggle: () => void;
  onUpdateNotes: (notes: string) => void;
  darkMode: boolean;
};

export default function TopicCard({ topic, catName, onToggle, onUpdateNotes, darkMode }: TopicCardProps) {
  const diffColor = topic.difficulty === "easy" ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : 
                    topic.difficulty === "medium" ? "text-orange-500 bg-orange-500/10 border-orange-500/20" : 
                    "text-red-500 bg-red-500/10 border-red-500/20";

  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <motion.div layout className={`p-5 rounded-2xl border transition-all ${topic.completed ? `bg-blue-500/5 border-blue-500/20` : `${cardBg} ${borderMain} hover:border-blue-500/40 shadow-sm`}`}>
      <div className="flex items-start gap-4">
        <CheckboxItem isCompleted={topic.completed} onToggle={onToggle} />
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${diffColor}`}>
              {topic.difficulty}
            </span>
            {topic.day && <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${borderMain} ${textMuted}`}>{topic.day}</span>}
          </div>
          <h4 className={`text-base font-semibold mb-3 ${topic.completed ? `line-through opacity-60` : ''}`}>{topic.title}</h4>
          
          <textarea
            placeholder="Add personal notes here..."
            value={topic.notes}
            onChange={(e) => onUpdateNotes(e.target.value)}
            className={`w-full p-3 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none transition-all ${darkMode ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'}`}
            rows={topic.notes ? Math.max(2, topic.notes.split('\n').length) : 2}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {topic.course_links?.map((link: any, j: number) => (
              <a 
                key={j} href={link.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${darkMode ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                {j === 0 ? <Video size={14} /> : <BookOpen size={14} />}
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
