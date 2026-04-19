"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type Todo = {
  id: string;
  _id?: string; // MongoDB ID
  text: string;
  completed: boolean;
  date: string;
};

type TaskContextType = {
  todos: Todo[];
  streak: number;
  loading: boolean;
  selectedCalendarDate: string;
  setSelectedCalendarDate: (date: string) => void;
  addTodo: (text: string) => void;
  updateTodo: (id: string, text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  incrementStreak: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(new Date().toDateString());

  const userEmail = "ankit@gmail.com";

  // useEffect moved to the bottom

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks?email=${userEmail}`);
      const data = await res.json();
      if (!data.error) {
        const fetchedTodos = data.map((t: { _id: string; text: string; completed: boolean; date: string }) => ({ ...t, id: t._id }));
        setTodos(fetchedTodos);

        // Rollover logic: move incomplete tasks from past to today
        const todayStr = new Date().toDateString();
        const incompletePastTasks = fetchedTodos.filter((t: Todo) => 
          !t.completed && 
          t.date !== todayStr && 
          new Date(t.date) < new Date(todayStr)
        );

        if (incompletePastTasks.length > 0) {
          let updated = false;
          const newTodos = [...fetchedTodos];
          
          for (const task of incompletePastTasks) {
            const alreadyExistsToday = fetchedTodos.some((t: Todo) => 
              t.text === task.text && t.date === todayStr
            );
            
            if (!alreadyExistsToday) {
              const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, text: task.text, date: todayStr })
              });
              const newTask = await res.json();
              if (!newTask.error) {
                newTodos.push({ ...newTask, id: newTask._id });
                updated = true;
              }
            }
          }
          if (updated) setTodos(newTodos);
        }
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreak = async () => {
    try {
      const res = await fetch(`/api/user?email=${userEmail}`);
      const data = await res.json();
      if (!data.error) setStreak(data.streak || 0);
    } catch (err) {
      console.error("Failed to fetch streak:", err);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, text, date: selectedCalendarDate })
      });
      const newTask = await res.json();
      if (!newTask.error) {
        setTodos(prev => [...prev, { ...newTask, id: newTask._id }]);
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const updateTodo = async (id: string, text: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));

      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, id, text })
      });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // Don't allow toggling for past dates to preserve history
    const todayStr = new Date().toDateString();
    if (todo.date !== todayStr && new Date(todo.date) < new Date(todayStr)) {
      return;
    }

    try {
      const newCompleted = !todo.completed;
      setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: newCompleted } : t));

      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, id, completed: newCompleted })
      });
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setTodos(prev => prev.filter(t => t.id !== id));
      await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const incrementStreak = async () => {
    try {
      const newStreak = streak + 1;
      setStreak(newStreak);
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, streak: newStreak })
      });
    } catch (err) {
      console.error("Failed to increment streak:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStreak();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); 

  return (
    <TaskContext.Provider value={{ todos, streak, loading, selectedCalendarDate, setSelectedCalendarDate, addTodo, updateTodo, toggleTodo, deleteTodo, incrementStreak }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) throw new Error("useTasks must be used within TaskProvider");
  return context;
}
