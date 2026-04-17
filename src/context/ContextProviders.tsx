"use client";

import React from 'react';
import { AuthProvider } from './AuthContext';
import { RoadmapProvider } from './RoadmapContext';
import { TaskProvider } from './TaskContext';
import { ProgressProvider } from './ProgressContext';

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RoadmapProvider>
        <TaskProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </TaskProvider>
      </RoadmapProvider>
    </AuthProvider>
  );
}
