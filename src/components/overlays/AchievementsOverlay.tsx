import React, { useState } from 'react';
import { Crown, Trophy, Award, Sparkles } from 'lucide-react';
import { achievementsData } from '../../data/achievements';
import { soundFx } from '../../lib/audio';

interface AchievementsOverlayProps {
  progress: number;
  onTriggerConfetti: () => void;
}

export const AchievementsOverlay: React.FC<AchievementsOverlayProps> = ({
  progress,
  onTriggerConfetti
}) => {
  const start = 0.78;
  const peak = 0.86;
  const end = 0.94;

  const [activeTab, setActiveTab] = useState<'all' | 'cp' | 'hackathons'>('all');

  if (progress < start || progress > end) return null;

  let opacity = 0;
  let translateY = 0;
  let scale = 1;

  if (progress <= peak) {
    const norm = (progress - start) / (peak - start);
    opacity = norm;
    translateY = (1 - norm) * 70;
    scale = 0.95 + norm * 0.05;
  } else {
    const norm = (progress - peak) / (end - peak);
    opacity = 1 - norm;
    translateY = -norm * 70;
    scale = 1 - norm * 0.05;
  }

  const filtered = achievementsData.filter((a) => {
    if (activeTab === 'cp') return a.category === 'Competitive Programming';
    if (activeTab === 'hackathons') return a.category === 'Hackathon' || a.category === 'Robotics';
    return true;
  });

  return (
    <div
      style={{
        opacity: Math.max(0, opacity),
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        pointerEvents: opacity < 0.25 ? 'none' : 'auto'
      }}
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full transition-transform duration-75 ease-out select-none"
    >
      {/* Localized Reading Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(7,8,12,0.92)_0%,rgba(7,8,12,0.68)_50%,transparent_100%)] -z-10" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 drop-shadow-md">
              06 / Competitive Rigor
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Milestones &amp; Honors
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 rounded-xl border border-white/[0.08]">
            {(['all', 'cp', 'hackathons'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-sky-500/20 text-white border border-sky-400/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab === 'cp' ? 'Competitive CP' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight: LeetCode Knight & ICPC Algoqueen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LeetCode Knight */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950/85 border border-sky-500/30 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  Knight at LeetCode
                </span>
                <div className="text-5xl sm:text-6xl font-display font-black text-white mt-1 tabular-nums">
                  1875
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                  TOP 5.45% GLOBALLY
                </div>
              </div>

              <button
                type="button"
                onClick={onTriggerConfetti}
                data-cursor="CELEBRATE"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Weekly Contest 515</span>
                <div className="text-xl sm:text-2xl font-display font-bold text-white tabular-nums">
                  Global Rank 579
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Weekly Contest 513</span>
                <div className="text-xl sm:text-2xl font-display font-bold text-white tabular-nums">
                  Global Rank 597
                </div>
              </div>
            </div>
          </div>

          {/* ICPC Algoqueen & Logitech Hackathon */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-950/85 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                ICPC World Finalist
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                ICPC Algoqueen 2026
              </h3>
              <p className="text-xs text-zinc-400 font-body leading-relaxed">
                Qualified as an international World Finalist in computational algorithms under standard ICPC competitive constraints.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="text-xs font-display font-bold text-white">
                Women Who Master Hackathon’26
              </div>
              <div className="text-[11px] text-zinc-400">
                Semi-Finalist · Aspire For Her × Logitech
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Podium Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filtered.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-zinc-950/70 border border-white/[0.06] space-y-1.5"
            >
              <div className="text-[10px] font-mono text-sky-400 uppercase">
                {item.organization.split(' ')[0]} · {item.date}
              </div>
              <div className="text-sm font-display font-bold text-white truncate">
                {item.title}
              </div>
              <div className="text-[11px] text-zinc-400 truncate font-body">
                {item.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
