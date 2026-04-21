"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, ArrowRight, Zap, Target, BookOpen, CheckCircle2, XCircle, Trophy, Terminal, Database, Server, Shield, Globe } from 'lucide-react';
import { backendRoadmapData } from '../data/backendRoadmap';

export default function BackendRoadmapPage({ darkMode }: { darkMode: boolean }) {
  const borderMain = darkMode ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = darkMode ? 'bg-neutral-900/80' : 'bg-white';
  const textMuted = darkMode ? 'text-neutral-400' : 'text-neutral-500';
  const textMain = darkMode ? 'text-neutral-200' : 'text-neutral-800';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const phaseIcons = [
    <Terminal key="1" size={20} />,
    <Server key="2" size={20} />,
    <Shield key="3" size={20} />,
    <Globe key="4" size={20} />,
    <Trophy key="5" size={20} />
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold tracking-wide uppercase"
        >
          <Zap size={14} /> The Top 1% Strategy
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
        >
          Backend Engineering Roadmap
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-lg md:text-xl ${textMuted} max-w-3xl mx-auto leading-relaxed`}
        >
          A comprehensive guide from foundations to advanced systems. 
          Build deep, ship real things, and master the trade-offs.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-24 relative"
      >
        {/* Timeline line */}
        <div className={`absolute left-10 top-20 bottom-0 w-0.5 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'} hidden lg:block`} />

        {backendRoadmapData.categories.map((phase, pIdx) => (
          <motion.div key={phase.name} variants={itemVariants} className="relative lg:pl-28">
            {/* Phase Badge (LG+) */}
            <div className={`absolute left-4 top-0 w-12 h-12 rounded-2xl ${darkMode ? 'bg-neutral-900' : 'bg-white'} border-2 ${darkMode ? 'border-blue-500/30' : 'border-blue-500/20'} flex items-center justify-center z-10 hidden lg:flex shadow-2xl shadow-blue-500/10 text-blue-500`}>
                {phaseIcons[pIdx]}
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-blue-500 tracking-widest uppercase bg-blue-500/10 px-2 py-0.5 rounded">{phase.weeks}</span>
                  <span className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>• {phase.focus}</span>
                </div>
                <h2 className="text-3xl font-black tracking-tight">{phase.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.topics.map((topic, tIdx) => (
                  <div 
                    key={topic.id}
                    className={`group p-6 rounded-3xl border ${borderMain} ${cardBg} hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest">{topic.weeks}</span>
                        <div className={`flex items-center gap-1 text-[10px] font-bold ${textMuted}`}>
                          <Clock size={10} /> {topic.duration}
                        </div>
                      </div>
                      <h3 className="font-bold text-base group-hover:text-blue-500 transition-colors leading-tight">{topic.title}</h3>
                      <p className={`text-xs ${textMuted} leading-relaxed`}>{topic.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Phase Project */}
                <div className={`p-6 rounded-[2rem] border-2 border-dashed ${darkMode ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-500/10 bg-blue-50/50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                      <Target size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest">Phase Project</h4>
                      <p className="text-sm font-bold leading-relaxed">{phase.project}</p>
                    </div>
                  </div>
                </div>

                {/* Skip List */}
                {phase.skip && (
                  <div className={`p-6 rounded-[2rem] border ${borderMain} ${darkMode ? 'bg-red-500/5' : 'bg-red-50/30'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                        <XCircle size={20} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">Skip — Don&apos;t Waste Time On:</h4>
                        <ul className="grid grid-cols-1 gap-1">
                          {phase.skip.map((item, i) => (
                            <li key={i} className={`text-[11px] font-medium ${textMuted} flex items-center gap-2`}>
                              <div className="w-1 h-1 rounded-full bg-red-500/40" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Top 1% Checkpoints */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-12 rounded-[4rem] border ${borderMain} ${cardBg} shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/20 mb-6">
                <Trophy size={32} />
            </div>
            <h3 className="text-3xl font-black tracking-tight">You&apos;re Top 1% When:</h3>
            <p className={`text-sm ${textMuted} uppercase tracking-widest font-bold`}>The Master Craftsman Checkpoints</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {backendRoadmapData.checkpoints.map((checkpoint, i) => (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${borderMain} bg-neutral-500/5`}>
                <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <p className="text-sm font-medium leading-relaxed">{checkpoint}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <p className={`text-sm font-black text-blue-500 uppercase tracking-[0.3em]`}>
              Build deep. Ship real things. Master the trade-offs.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
