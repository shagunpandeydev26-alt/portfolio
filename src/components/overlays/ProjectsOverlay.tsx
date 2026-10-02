import React, { useState } from 'react';
import { ChevronRight, Github, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { projectsData, Project } from '../../data/projects';
import { AlphaForgeCanvas } from '../AlphaForgeCanvas';
import { DwarapalaCanvas } from '../DwarapalaCanvas';
import { soundFx } from '../../lib/audio';

interface ProjectsOverlayProps {
  progress: number;
  onSelectProject: (project: Project) => void;
}

export const ProjectsOverlay: React.FC<ProjectsOverlayProps> = ({
  progress,
  onSelectProject
}) => {
  const start = 0.60;
  const peak = 0.71;
  const end = 0.82;

  const [activeTab, setActiveTab] = useState<'alphaforge' | 'dwarapala'>('alphaforge');

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

  const alphaforge = projectsData.find((p) => p.id === 'alphaforge')!;
  const dwarapala = projectsData.find((p) => p.id === 'dwarapala')!;
  const activeProj = activeTab === 'alphaforge' ? alphaforge : dwarapala;

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
      <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] pointer-events-none bg-[radial-gradient(ellipse_at_25%_50%,rgba(7,8,12,0.94)_0%,rgba(7,8,12,0.68)_50%,transparent_100%)] -z-10" />

      <div className="space-y-6">
        {/* Header with Project Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              05 / Flagship Artifacts
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Production Systems
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900/80 border border-white/[0.08]">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('alphaforge');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'alphaforge'
                  ? 'bg-sky-500/20 text-white border border-sky-400/50 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              01. AlphaForge (RL)
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('dwarapala');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dwarapala'
                  ? 'bg-emerald-500/20 text-white border border-emerald-400/50 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              02. Dwarapala (Biometrics)
            </button>
          </div>
        </div>

        {/* Dynamic Project Presentation Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/85 border border-white/[0.08] backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Project Details & Case Study CTAs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
                <span>{activeProj.category}</span>
                <span className="text-zinc-600">·</span>
                <span>{activeProj.date}</span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                  {activeProj.title}
                </h3>
                <p className="text-sm font-medium text-zinc-300 mt-1">
                  {activeProj.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-body">
                {activeProj.description}
              </p>

              {/* Verified Metrics Strip */}
              {activeProj.metrics && (
                <div className="grid grid-cols-3 gap-2 border-y border-white/[0.06] py-3">
                  {activeProj.metrics.map((m) => (
                    <div key={m.label} className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">{m.label}</span>
                      <div className="text-base sm:text-lg font-display font-bold text-white tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">{m.context}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Unboxed Tech Stack */}
              <div className="flex flex-wrap gap-1.5 text-xs font-mono text-zinc-400">
                {activeProj.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onSelectProject(activeProj);
                  }}
                  data-cursor="CASE STUDY"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={activeProj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB ↗"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right: Live Interactive Simulation Viewport */}
            <div className="lg:col-span-6">
              {activeTab === 'alphaforge' ? (
                <AlphaForgeCanvas />
              ) : (
                <DwarapalaCanvas />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
