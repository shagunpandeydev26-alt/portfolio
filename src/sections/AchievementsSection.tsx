import React, { useState } from 'react';
import { Trophy, Award, Crown, Zap, Sparkles, Filter } from 'lucide-react';
import { achievementsData, Achievement } from '../data/achievements';
import { soundFx } from '../lib/audio';

interface AchievementsSectionProps {
  onTriggerConfetti: () => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onTriggerConfetti }) => {
  const [filter, setFilter] = useState<'All' | 'Competitive' | 'Hackathons'>('All');

  const filteredAchievements = achievementsData.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Competitive') return item.category === 'Competitive Programming';
    if (filter === 'Hackathons') return item.category === 'Hackathon' || item.category === 'Robotics';
    return true;
  });

  return (
    <section id="achievements" className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              07 / Competitive Rigor &amp; Honors
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Milestones &amp; Algorithms
            </h2>
          </div>

          {/* Interactive filter segmented control */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-lg">
            {(['All', 'Competitive', 'Hackathons'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setFilter(cat);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === cat
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight: LeetCode Knight & ICPC Algoqueen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LeetCode Knight Card */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#121624] via-[#0d101a] to-[#08090f] border border-sky-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col justify-between space-y-8">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  COMPETITIVE PROGRAMMING PROFILE
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Knight at LeetCode
                </h3>
              </div>
              <button
                type="button"
                onClick={onTriggerConfetti}
                data-cursor="CELEBRATE"
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 transition-colors"
                title="Celebrate achievement"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Rating Typography */}
            <div className="space-y-2">
              <div className="text-6xl sm:text-8xl lg:text-9xl font-display font-black text-white tracking-tight tabular-nums leading-none">
                1875
              </div>
              <p className="text-base sm:text-lg text-emerald-400 font-mono font-semibold">
                TOP 5.45% GLOBALLY
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl font-body">
                Consistent high-tier contest competitor with deep proficiency in Dynamic Programming, Graph Algorithms, Disjoint Sets, and Segment Trees.
              </p>
            </div>

            {/* Contest Global Ranks */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase">Weekly Contest 515</span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  Rank 579
                </div>
                <span className="text-[11px] text-sky-400 font-mono">Worldwide Standings</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase">Weekly Contest 513</span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  Rank 597
                </div>
                <span className="text-[11px] text-sky-400 font-mono">Worldwide Standings</span>
              </div>
            </div>
          </div>

          {/* ICPC Algoqueen & Hackathon Spotlight */}
          <div className="lg:col-span-5 rounded-3xl bg-zinc-950/80 border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 uppercase tracking-widest">
                <Trophy className="w-4 h-4" />
                <span>ICPC World Stage</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                World Finalist
              </h3>
              <p className="text-sm font-medium text-sky-300">
                ICPC Algoqueen 2026
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-body">
                Qualified as a World Finalist in the esteemed ICPC Algoqueen computational programming competition, solving complex algorithmic scenarios under international collegiate standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase">
                Women Who Master Hackathon’26
              </div>
              <div className="text-lg font-display font-bold text-white">
                Semi-Finalist
              </div>
              <p className="text-xs text-zinc-400">
                Aspire For Her × Logitech national technology initiative.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-500">
              Verified by official university records and contest leaderboards.
            </div>
          </div>
        </div>

        {/* Hackathon Podium Honors Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Championships &amp; Podium Finishes</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              {filteredAchievements.length} RECORDED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-zinc-950/60 border border-white/[0.06] hover:border-white/[0.14] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span className="text-sky-400 uppercase">{item.category}</span>
                    <span>{item.date}</span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="text-xs font-medium text-zinc-300">
                    {item.organization}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed font-body">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Scope:</span>
                  <span className="text-emerald-400 text-right truncate max-w-[200px]">
                    {item.scale || 'National / Regional'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
