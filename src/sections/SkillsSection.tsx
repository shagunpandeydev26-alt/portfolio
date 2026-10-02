import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Network } from 'lucide-react';
import { skillCategories, SkillCategory } from '../data/skills';
import { soundFx } from '../lib/audio';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>(skillCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = skillCategories.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter((cat) => cat.skills.length > 0);

  const handleSelect = (cat: SkillCategory) => {
    soundFx.playClick();
    setSelectedCategory(cat);
  };

  return (
    <section id="skills" className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              03 / Technical Topography
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Interactive Systems Map
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills (e.g. PyTorch, TypeScript)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>
        </div>

        {/* Central Architecture Visualization & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Constellation Map of Categories */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950/60 border border-white/[0.08] p-6 sm:p-10 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 z-10">
              <span className="flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-sky-400" />
                CENTRAL CORE ARCHITECTURE
              </span>
              <span>7 CATEGORIES</span>
            </div>

            {/* Central Node & Orbit Nodes */}
            <div className="relative my-auto py-12 flex items-center justify-center">
              {/* Central SHAGUN Node */}
              <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0e111a] border-2 border-sky-400/50 shadow-2xl shadow-sky-500/20 text-center select-none">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                  CORE
                </span>
                <span className="text-sm sm:text-base font-display font-extrabold text-white">
                  SHAGUN
                </span>
                <span className="text-[9px] font-mono text-zinc-400">
                  ENGINEER
                </span>
              </div>

              {/* Connecting Orbit Ring */}
              <div className="absolute inset-0 m-auto w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/[0.08] pointer-events-none" />
              <div className="absolute inset-0 m-auto w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-sky-500/10 pointer-events-none" />
            </div>

            {/* Category Selector Buttons (Architecture Nodes) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 z-10 pt-4 border-t border-white/[0.06]">
              {skillCategories.map((cat) => {
                const isSelected = selectedCategory.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelect(cat)}
                    data-cursor="INSPECT"
                    className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-white border border-sky-400/60 shadow-sm'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="truncate">{cat.shortLabel}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Dynamic Skills Inspector */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
                  Category Inspector
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {selectedCategory.name}
                </h3>
              </div>
              <span
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: selectedCategory.color }}
              />
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
              {selectedCategory.description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Active Competencies ({selectedCategory.skills.length})
              </span>

              {/* Verified Clean Unboxed Skills (Anti-Slop Zero-Pill Discipline) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedCategory.skills.map((skill) => (
                  <div
                    key={skill}
                    className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-200 font-medium flex items-center justify-between group hover:border-sky-500/30 transition-colors"
                  >
                    <span>{skill}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-sky-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Context Summary */}
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
              Verified against production code repositories and evaluated coursework.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
