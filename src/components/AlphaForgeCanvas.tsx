import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Activity } from 'lucide-react';
import { soundFx } from '../lib/audio';

export const AlphaForgeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [episodeStep, setEpisodeStep] = useState(140);
  const [currentReward, setCurrentReward] = useState('+14.2%');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Simulation price path and agent reward path
    const pointsCount = 48;
    const rlPath: number[] = [];
    const benchmarkPath: number[] = [];

    let rlVal = 100;
    let benchVal = 100;

    for (let i = 0; i < pointsCount; i++) {
      benchVal += (Math.sin(i * 0.3) * 1.5 + (Math.random() - 0.48) * 2.2);
      rlVal += (Math.sin(i * 0.3) * 1.8 + Math.cos(i * 0.2) * 1.2 + (Math.random() - 0.4) * 2.5);
      benchmarkPath.push(benchVal);
      rlPath.push(rlVal);
    }

    const render = () => {
      if (!ctx || !canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const stepX = width / (pointsCount - 1);
      const minVal = 85;
      const maxVal = 145;
      const scaleY = (val: number) => height - ((val - minVal) / (maxVal - minVal)) * height * 0.7 - height * 0.15;

      // Draw Baseline (Buy & Hold) Path
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      for (let i = 0; i < pointsCount; i++) {
        const x = i * stepX;
        const y = scaleY(benchmarkPath[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw RL Agent Policy Path
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < pointsCount; i++) {
        const x = i * stepX;
        const animatedOffset = Math.sin(t * 0.05 + i * 0.2) * 1.5;
        const y = scaleY(rlPath[i] + animatedOffset);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw RL Agent State Marker
      const activeIdx = Math.floor((Math.sin(t * 0.03) * 0.5 + 0.5) * (pointsCount - 1));
      const agentX = activeIdx * stepX;
      const agentY = scaleY(rlPath[activeIdx]);

      ctx.beginPath();
      ctx.fillStyle = '#34d399';
      ctx.arc(agentX, agentY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Outer ripple
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.arc(agentX, agentY, 9 + Math.sin(t * 0.1) * 3, 0, Math.PI * 2);
      ctx.stroke();

      if (isRunning) {
        t += 1;
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  const handleStep = () => {
    soundFx.playClick();
    setEpisodeStep((prev) => prev + 1);
    setCurrentReward(`+${(12 + Math.random() * 4).toFixed(1)}%`);
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-5 space-y-4">
      {/* Control bar */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span className="text-zinc-300 font-semibold">RL Trading Simulation Viewport</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-500">PPO Ep. #{episodeStep}</span>
          <span className="text-emerald-400 font-bold tabular-nums">Reward: {currentReward}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-[#090b10] border border-white/[0.06] overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={580}
          height={260}
          className="w-full h-full object-cover"
        />
        {/* Dynamic labels */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2.5 h-0.5 bg-sky-400 inline-block" />
            PPO Agent Policy
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2.5 h-0.5 bg-zinc-400 border-dashed inline-block" />
            Buy &amp; Hold Baseline
          </span>
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="text-[11px] font-mono text-zinc-500">
          State Space: Normalized returns · Inventory · Volatility
        </div>
        <button
          type="button"
          onClick={handleStep}
          data-cursor="STEP"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium transition-colors"
        >
          <Play className="w-3 h-3" />
          <span>Step Episode</span>
        </button>
      </div>
    </div>
  );
};
