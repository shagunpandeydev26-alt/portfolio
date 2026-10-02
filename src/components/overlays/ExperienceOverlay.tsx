import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Code2 } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { soundFx } from '../../lib/audio';

interface ExperienceOverlayProps {
  progress: number;
}

export const ExperienceOverlay: React.FC<ExperienceOverlayProps> = ({ progress }) => {
  const start = 0.44;
  const peak = 0.54;
  const end = 0.64;

  const [activeExpId, setActiveExpId] = useState(experienceData[0].id);

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

  const activeExp = experienceData.find((e) => e.id === activeExpId) || experienceData[0];

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
              04 / Spatial Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Engineering Trajectory
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">2025 — 2026 TIMELINE</span>
        </div>

        {/* Spatial Year Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 max-w-lg">
          {experienceData.map((exp) => {
            const isSelected = exp.id === activeExpId;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveExpId(exp.id);
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-zinc-900/90 border-sky-400/50 shadow-lg shadow-sky-500/10'
                    : 'bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-white'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-display font-black text-white">
                  {exp.year}
                </div>
                <div className="text-xs font-semibold text-sky-400 truncate mt-1">
                  {exp.organization}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 truncate">
                  {exp.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Exp Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/85 border border-white/[0.08] backdrop-blur-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {activeExp.role} — {activeExp.organization}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {activeExp.period}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {activeExp.location}
                </span>
              </p>
            </div>
            <span className="text-xs font-mono text-sky-400 uppercase">
              {activeExp.type}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed max-w-3xl">
            {activeExp.summary}
          </p>

          {/* Highlights */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Key Architectural Deliverables
            </span>
            <div className="grid gap-2">
              {activeExp.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-body">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open source breakdown if applicable */}
          {activeExp.projectsWorkedOn && (
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                Featured Open Source Repositories
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {activeExp.projectsWorkedOn.map((p) => (
                  <div key={p.name} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate mt-0.5">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
