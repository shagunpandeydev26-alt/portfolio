import React, { useState } from 'react';
import { Network, Sparkles, Search } from 'lucide-react';
import { skillCategories, SkillCategory } from '../../data/skills';
import { soundFx } from '../../lib/audio';

interface SkillsOverlayProps {
  progress: number;
}

export const SkillsOverlay: React.FC<SkillsOverlayProps> = ({ progress }) => {
  const start = 0.28;
  const peak = 0.38;
  const end = 0.48;

  const [selectedCat, setSelectedCat] = useState<SkillCategory>(skillCategories[0]);
  const [query, setQuery] = useState('');

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

  const filteredSkills = selectedCat.skills.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

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
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-1.5 drop-shadow-md">
              <Network className="w-3.5 h-3.5" />
              03 / 3D Constellation Space
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Systems Architecture Map
            </h2>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter competencies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Categories Segmented Rail */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {skillCategories.map((cat) => {
            const isSelected = cat.id === selectedCat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCat(cat);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-sky-500/20 text-white border border-sky-400/60 shadow-lg shadow-sky-500/10'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Inspector Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/85 border border-white/[0.08] backdrop-blur-md space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {selectedCat.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-body">
                {selectedCat.description}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {filteredSkills.length} SKILLS
            </span>
          </div>

          {/* Unboxed clean competencies grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
            {filteredSkills.map((skill) => (
              <div
                key={skill}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/40 text-xs font-medium text-zinc-200 flex items-center justify-between transition-colors"
              >
                <span>{skill}</span>
                <span className="w-1 h-1 rounded-full bg-sky-400/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
