"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRoadmap } from '../context/RoadmapContext';
import CategoryCard from '../components/CategoryCard';

export default function RoadmapPage({ searchQuery, darkMode, handleToggleTopic }: any) {
  const { data, updateNotes } = useRoadmap();
  const [activeCategory, setActiveCategory] = useState("All");

  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';
  const textMain = darkMode ? 'text-neutral-200' : 'text-neutral-800';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...data.categories.map(c => c.name)].map(cat => (
          <button 
            key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-500 text-white shadow-md' : `${inputBg} border ${borderMain} ${textMuted} hover:${textMain}`}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {data.categories.filter(c => activeCategory === "All" || c.name === activeCategory).map((category, cIdx) => (
        <CategoryCard 
          key={category.name} category={category} catIndex={cIdx} 
          onToggleTopic={handleToggleTopic} onUpdateNotes={updateNotes} 
          darkMode={darkMode} searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
