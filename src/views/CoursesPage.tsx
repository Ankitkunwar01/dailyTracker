"use client";

import { motion } from 'framer-motion';
import { useRoadmap } from '../context/RoadmapContext';
import { Video, BookOpen, ExternalLink } from 'lucide-react';

export default function CoursesPage({ darkMode }: any) {
  const { data } = useRoadmap();
  
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.categories.flatMap(c => c.topics.slice(0, 3)).map((topic: any, i: number) => (
        <motion.div key={topic.id + i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm flex flex-col`}>
          <div className="flex items-center gap-2 mb-3">
             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${borderMain} ${textMuted}`}>{topic.day || 'Extra'}</span>
          </div>
          <h4 className="text-lg font-bold mb-4 flex-1">{topic.title}</h4>
          
          <div className="space-y-2 mt-auto">
            {topic.course_links?.map((link: any, j: number) => (
              <a 
                key={j} href={link.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-between p-3 rounded-xl border ${borderMain} ${inputBg} hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group`}
              >
                <span className="text-sm font-medium flex items-center gap-2">
                  {j === 0 ? <Video size={16} className="text-red-500" /> : <BookOpen size={16} className="text-emerald-500" />}
                  {link.title}
                </span>
                <ExternalLink size={14} className={`${textMuted} group-hover:text-blue-500`} />
              </a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
