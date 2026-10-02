import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Cpu, ShieldAlert, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { projectsData, Project } from '../data/projects';
import { AlphaForgeCanvas } from '../components/AlphaForgeCanvas';
import { DwarapalaCanvas } from '../components/DwarapalaCanvas';
import { soundFx } from '../lib/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeProjectId, setActiveProjectId] = useState<string>('alphaforge');

  const alphaforge = projectsData.find((p) => p.id === 'alphaforge')!;
  const dwarapala = projectsData.find((p) => p.id === 'dwarapala')!;

  const handleOpenCaseStudy = (proj: Project) => {
    soundFx.playClick();
    onSelectProject(proj);
  };

  return (
    <section id="work" className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              05 / Flagship Engineering Artifacts
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Production Systems Showcase
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            DEEP LEARNING · REINFORCEMENT LEARNING · BIOMETRICS
          </div>
        </div>

        {/* Project 01: ALPHAFORGE */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-950/90 to-zinc-900/40 p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-sky-400 uppercase tracking-wider">
                <span>01. RL TRADING INTELLIGENCE</span>
                <span className="text-zinc-600">·</span>
                <span>{alphaforge.date}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                {alphaforge.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body">
                {alphaforge.description}
              </p>

              {/* Verified Metrics / Rigor */}
              <div className="grid grid-cols-3 gap-3 border-y border-white/[0.06] py-4">
                {alphaforge.metrics?.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <span className="text-xs font-mono uppercase text-zinc-500">{m.label}</span>
                    <p className="text-sm sm:text-base font-display font-bold text-sky-300 tabular-nums">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies unboxed list */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                {alphaforge.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/[0.04] rounded-md border border-white/[0.06] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenCaseStudy(alphaforge)}
                  data-cursor="CASE STUDY"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <span>Explore Full Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={alphaforge.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB ↗"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Interactive RL Canvas Simulation */}
            <div className="lg:col-span-6">
              <AlphaForgeCanvas />
            </div>
          </div>
        </div>

        {/* Project 02: DWARAPALA */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-950/90 to-zinc-900/40 p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Interactive Biometric HUD */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <DwarapalaCanvas />
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <span>02. COMPUTER VISION &amp; BIOMETRIC SECURITY</span>
                <span className="text-zinc-600">·</span>
                <span>{dwarapala.date}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                {dwarapala.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-body">
                {dwarapala.description}
              </p>

              {/* Verified Metrics / Rigor */}
              <div className="grid grid-cols-3 gap-3 border-y border-white/[0.06] py-4">
                {dwarapala.metrics?.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <span className="text-xs font-mono uppercase text-zinc-500">{m.label}</span>
                    <p className="text-sm sm:text-base font-display font-bold text-emerald-400 tabular-nums">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies unboxed list */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                {dwarapala.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/[0.04] rounded-md border border-white/[0.06] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenCaseStudy(dwarapala)}
                  data-cursor="CASE STUDY"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <span>Explore Full Architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={dwarapala.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB ↗"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
