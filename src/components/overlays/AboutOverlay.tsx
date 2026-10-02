import React from 'react';
import { BookOpen, GraduationCap, Layers, Cpu, Trophy, Code2 } from 'lucide-react';
import { profileData } from '../../data/profile';

interface AboutOverlayProps {
  progress: number;
}

export const AboutOverlay: React.FC<AboutOverlayProps> = ({ progress }) => {
  const start = 0.12;
  const peak = 0.22;
  const end = 0.32;

  if (progress < start || progress > end) return null;

  // Fade in from start to peak, fade out from peak to end
  let opacity = 0;
  let translateY = 0;
  let scale = 1;

  if (progress <= peak) {
    const norm = (progress - start) / (peak - start);
    opacity = norm;
    translateY = (1 - norm) * 80;
    scale = 0.94 + norm * 0.06;
  } else {
    const norm = (progress - peak) / (end - peak);
    opacity = 1 - norm;
    translateY = -norm * 80;
    scale = 1 - norm * 0.06;
  }

  return (
    <div
      style={{
        opacity: Math.max(0, opacity),
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        pointerEvents: opacity < 0.25 ? 'none' : 'auto'
      }}
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full transition-transform duration-75 ease-out select-none"
    >
      {/* Localized Cinematic Reading Vignette */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(7,8,12,0.92)_0%,rgba(7,8,12,0.65)_50%,transparent_100%)] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Editorial Statement */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 drop-shadow-md">
            <span>02 / The Discipline</span>
            <span className="text-zinc-600">·</span>
            <span>HBTU KANPUR</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            I Build
            <br />
            Systems
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              That Move.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-200 font-body leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {profileData.bio[0]}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {profileData.bio[1]}
          </p>
        </div>

        {/* Right Column: Academic Standing & Fundamentals */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/[0.08] shadow-2xl space-y-5 backdrop-blur-md">
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  Academic Foundation
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {profileData.education.institution}
                </h3>
                <p className="text-xs text-zinc-400">
                  {profileData.education.degree} in {profileData.education.field} · {profileData.education.period}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Current GPA</span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  {profileData.education.gpa}
                </div>
              </div>
            </div>

            {/* Core Fundamentals Unboxed */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Core Computer Science Rigor
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-zinc-300">
                {profileData.education.fundamentals.map((fund) => (
                  <div
                    key={fund}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{fund}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
