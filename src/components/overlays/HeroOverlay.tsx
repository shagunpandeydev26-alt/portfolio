import React from 'react';
import { ArrowDown, ChevronRight, FileText, Github, Linkedin } from 'lucide-react';
import { profileData } from '../../data/profile';
import { soundFx } from '../../lib/audio';

interface HeroOverlayProps {
  progress: number;
  onOpenResumeModal: () => void;
  onScrollTo: (targetProgress: number) => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  progress,
  onOpenResumeModal,
  onScrollTo
}) => {
  // Visible in range [0.0, 0.16]
  const start = 0.0;
  const end = 0.16;

  if (progress > end) return null;

  // Compute spatial transform based on progress
  const norm = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  const opacity = 1 - norm * 1.5;
  const translateY = -norm * 140;
  const scale = 1 - norm * 0.18;
  const translateZ = -norm * 200;

  return (
    <div
      style={{
        opacity: Math.max(0, opacity),
        transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`,
        pointerEvents: opacity < 0.2 ? 'none' : 'auto'
      }}
      className="absolute inset-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full transition-transform duration-75 ease-out select-none"
    >
      {/* Localized Cinematic Reading Vignette */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] pointer-events-none bg-[radial-gradient(ellipse_at_25%_50%,rgba(7,8,12,0.92)_0%,rgba(7,8,12,0.65)_50%,transparent_100%)] -z-10" />

      {/* Top Header Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-300 drop-shadow-md">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          AVAILABLE FOR 2026/2027 ROLES
        </span>
        <span className="text-zinc-500">·</span>
        <span>HARCOURT BUTLER TECHNICAL UNIVERSITY</span>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="max-w-3xl space-y-6 my-auto">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.85] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Shagun
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
            Pandey
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono text-zinc-300 drop-shadow-md">
          <span className="text-sky-400 font-bold">SOFTWARE ENGINEER</span>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-medium">AI &amp; MACHINE LEARNING</span>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-medium">WEB SYSTEMS</span>
          <span className="text-zinc-600">/</span>
          <span className="text-white font-medium">OPEN SOURCE</span>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-normal leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          "{profileData.headline}"
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onScrollTo(0.64); // Jump to Projects
            }}
            data-cursor="PROJECTS"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-all duration-200 shadow-lg shadow-sky-500/20 group"
          >
            <span>Explore Work</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenResumeModal();
            }}
            data-cursor="RESUME"
            className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all duration-200"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Download Resume</span>
          </button>

          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            data-cursor="GITHUB ↗"
            className="p-3 text-zinc-300 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profileData.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            data-cursor="LINKEDIN ↗"
            className="p-3 text-zinc-300 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-6 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2 text-sky-400/90 animate-pulse">
          <ArrowDown className="w-4 h-4" />
          <span>SCROLL TO ADVANCE 3D TIMELINE</span>
        </div>
        <span>CHAPTER 01 / 07</span>
      </div>
    </div>
  );
};
