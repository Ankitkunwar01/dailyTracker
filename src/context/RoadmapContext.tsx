"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data';
import { useAuth } from './AuthContext';

type Topic = {
  id: string;
  title: string;
  day?: string;
  completed: boolean;
  notes: string;
  difficulty: "easy" | "medium" | "hard";
  course_links: { title: string, url: string }[];
};

type Category = {
  name: string;
  topics: Topic[];
};

type Data = {
  categories: Category[];
};

type RoadmapContextType = {
  data: Data;
  loading: boolean;
  toggleTopic: (catIndex: number, topicIndex: number) => void;
  updateNotes: (catIndex: number, topicIndex: number, notes: string) => void;
  undoTopic: (catIndex: number, topicIndex: number) => void;
  resetAll: () => void;
};

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

const augmentedData: Data = {
  categories: initialData.categories.map(c => ({
    name: c.name,
    topics: c.topics.map(t => {
      const diffRandom = t.title.length % 3;
      const difficulty = diffRandom === 0 ? "easy" : diffRandom === 1 ? "medium" : "hard";
      return {
        ...t,
        difficulty,
        course_links: [
          { title: "YouTube Tutorial", url: `https://www.youtube.com/results?search_query=${encodeURIComponent(t.title + ' tutorial')}` },
          { title: "FreeCodeCamp", url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(t.title)}` }
        ]
      } as Topic;
    })
  }))
};

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<Data>(augmentedData);
  const [loading, setLoading] = useState(true);

  const userEmail = "ankit@gmail.com";

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user?email=${userEmail}`);
      const userData = await res.json();

      if (userData && !userData.error) {
        const completedIds = userData.completedIds || [];
        const notesMap = userData.notes || {};

        const updatedData = {
          categories: augmentedData.categories.map(cat => ({
            ...cat,
            topics: cat.topics.map(topic => ({
              ...topic,
              completed: completedIds.includes(topic.id),
              notes: notesMap[topic.id] || ""
            }))
          }))
        };
        setData(updatedData);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const syncToCloud = async (newData: Data) => {
    const completedIds: string[] = [];
    const notesMap: Record<string, string> = {};

    newData.categories.forEach(cat => {
      cat.topics.forEach(t => {
        if (t.completed) completedIds.push(t.id);
        if (t.notes) notesMap[t.id] = t.notes;
      });
    });

    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, completedIds, notes: notesMap })
      });
    } catch (err) {
      console.error("Failed to sync roadmap data:", err);
    }
  };

  const toggleTopic = (catIndex: number, topicIndex: number) => {
    const newData = { ...data };
    const topic = newData.categories[catIndex].topics[topicIndex];
    topic.completed = !topic.completed;
    setData(newData);
    syncToCloud(newData);
  };

  const undoTopic = (catIndex: number, topicIndex: number) => {
    const newData = { ...data };
    newData.categories[catIndex].topics[topicIndex].completed = false;
    setData(newData);
    syncToCloud(newData);
  };

  const updateNotes = (catIndex: number, topicIndex: number, notes: string) => {
    const newData = { ...data };
    newData.categories[catIndex].topics[topicIndex].notes = notes;
    setData(newData);
    syncToCloud(newData);
  };

  const resetAll = () => {
    // Session is in-memory, so reload will log out and reset UI.
    window.location.reload();
  };

  return (
    <RoadmapContext.Provider value={{ data, loading, toggleTopic, updateNotes, undoTopic, resetAll }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) throw new Error("useRoadmap must be used within RoadmapProvider");
  return context;
}
