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

  const userEmail = "user@gmail.com";

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchStreak();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/tasks?email=${userEmail}`);
      const data = await res.json();
      if (!data.error) {
        setTodos(data.map((t: any) => ({ ...t, id: t._id })));
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
        setTodos([...todos, { ...newTask, id: newTask._id }]);
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const newCompleted = !todo.completed;
      setTodos(todos.map(t => t.id === id ? { ...t, completed: newCompleted } : t));

      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, id: todo._id, completed: newCompleted })
      });
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setTodos(todos.filter(t => t.id !== id));
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

  return (
    <TaskContext.Provider value={{ todos, streak, loading, selectedCalendarDate, setSelectedCalendarDate, addTodo, toggleTodo, deleteTodo, incrementStreak }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) throw new Error("useTasks must be used within TaskProvider");
  return context;
}
