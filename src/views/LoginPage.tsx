"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ darkMode }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email, pass)) setError("Invalid email or password");
  };

  const bgMain = darkMode ? 'bg-[#0a0a0a]' : 'bg-neutral-100';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const inputBg = darkMode ? 'bg-neutral-950' : 'bg-neutral-50';
  const textMain = darkMode ? 'text-white' : 'text-neutral-900';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`flex min-h-screen items-center justify-center transition-colors duration-500 ${bgMain} ${textMain}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border ${cardBg} ${borderMain}`}>
        <div className="flex justify-center mb-6"><div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center"><Layers size={24} /></div></div>
        <h1 className="text-2xl font-bold text-center mb-2">AI Learning OS</h1>
        <p className={`text-center text-sm mb-8 ${textMuted}`}>Sign in to your intelligent workspace</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={`block text-xs font-medium mb-1 ${textMuted}`}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg} border ${borderMain} ${textMain}`} placeholder="Enter your email" />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${textMuted}`}>Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg} border ${borderMain} ${textMain}`} placeholder="Enter your password" />
          </div>
          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
          <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">Enter Workspace</button>
        </form>
        <div className={`mt-6 text-center text-xs ${textMuted}`}>
          {/* <p>Demo Credentials:</p><p>user@gmail.com / user123@</p> */}
        </div>
      </motion.div>
    </div>
  );
}
