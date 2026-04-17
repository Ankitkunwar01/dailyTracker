"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { useRoadmap } from './RoadmapContext';
import { useTasks } from './TaskContext';

type CategoryStat = {
  name: string;
  value: number;
  total: number;
};

type ProgressContextType = {
  overallProgress: number;
  completedTopics: number;
  totalTopics: number;
  categoryStats: CategoryStat[];
  lineChartData: { name: string, tasks: number }[];
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { data } = useRoadmap();
  const { todos, completedTopics: compTopicsFromRoadmap } = { todos: [], completedTopics: 0 }; // Placeholder for compTopicsFromRoadmap

  const stats = useMemo(() => {
    let totalTopics = 0;
    let completedTopics = 0;
    const categoryStats: CategoryStat[] = [];

    data.categories.forEach(c => {
      let cTotal = 0;
      let cComp = 0;
      c.topics.forEach(t => {
        totalTopics++;
        cTotal++;
        if (t.completed) {
          completedTopics++;
          cComp++;
        }
      });
      categoryStats.push({ name: c.name, value: cComp, total: cTotal });
    });

    const overallProgress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

    // Mock weekly velocity
    const lineChartData = [
      { name: 'Mon', tasks: 2 },
      { name: 'Tue', tasks: 3 },
      { name: 'Wed', tasks: 1 },
      { name: 'Thu', tasks: 4 },
      { name: 'Fri', tasks: completedTopics > 0 ? 2 : 0 },
      { name: 'Sat', tasks: 0 },
      { name: 'Sun', tasks: 0 },
    ];

    return { overallProgress, completedTopics, totalTopics, categoryStats, lineChartData };
  }, [data]);

  return (
    <ProgressContext.Provider value={stats}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}
