import React from 'react';
import { soundFx } from '../lib/audio';

interface StageHudProps {
  progress: number;
  onScrollTo: (targetProgress: number) => void;
}

export const StageHud: React.FC<StageHudProps> = ({ progress, onScrollTo }) => {
  const chapters = [
    { label: 'Hero', target: 0.04, min: 0.0, max: 0.14 },
    { label: 'About', target: 0.22, min: 0.14, max: 0.30 },
    { label: 'Skills', target: 0.38, min: 0.30, max: 0.46 },
    { label: 'Experience', target: 0.54, min: 0.46, max: 0.62 },
    { label: 'Projects', target: 0.70, min: 0.62, max: 0.80 },
    { label: 'Honors', target: 0.86, min: 0.80, max: 0.92 },
    { label: 'Contact', target: 0.96, min: 0.92, max: 1.0 }
  ];

  const currentIdx = chapters.findIndex((c) => progress >= c.min && progress <= c.max);
  const activeIdx = currentIdx !== -1 ? currentIdx : 0;

  return (
    <aside
      aria-label="3D timeline navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-xl w-[92%] sm:w-auto bg-[#0c0e15]/90 border border-white/[0.1] backdrop-blur-xl px-4 py-2.5 rounded-full shadow-2xl flex items-center justify-between sm:gap-6 select-none"
    >
      {/* Chapter Steps */}
      <div className="flex items-center gap-1 sm:gap-2">
        {chapters.map((ch, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={ch.label}
              type="button"
              onClick={() => {
                soundFx.playClick();
                onScrollTo(ch.target);
              }}
              data-cursor="GOTO"
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span className="hidden sm:inline mr-1">0{idx + 1}</span>
              <span>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress percentage & bar */}
      <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/[0.08] text-[11px] font-mono text-zinc-400 shrink-0">
        <span className="tabular-nums text-white font-bold">
          {Math.round(progress * 100).toString().padStart(2, '0')}%
        </span>
      </div>
    </aside>
  );
};
