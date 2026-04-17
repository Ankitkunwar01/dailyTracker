"use client";

import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import GraphChart from '../components/GraphChart';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'];

export default function ProgressPage({ darkMode }: any) {
  const { categoryStats, lineChartData } = useProgress();

  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm`}>
          <h3 className="text-lg font-bold mb-6">Category Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryStats} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryStats.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', borderRadius: '12px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {categoryStats.map((entry: any, index: number) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name} ({entry.value}/{entry.total})
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`p-6 rounded-3xl border ${borderMain} ${cardBg} shadow-sm`}>
          <h3 className="text-lg font-bold mb-6">Learning Velocity</h3>
          <GraphChart data={lineChartData} darkMode={darkMode} />
        </motion.div>
      </div>
    </div>
  );
}
