"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

type GraphChartProps = {
  data: { name: string, tasks: number }[];
  darkMode: boolean;
};

export default function GraphChart({ data, darkMode }: GraphChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#e5e7eb'} vertical={false} />
          <XAxis dataKey="name" stroke={darkMode ? '#888' : '#6b7280'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke={darkMode ? '#888' : '#6b7280'} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
