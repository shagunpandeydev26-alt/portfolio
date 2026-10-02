import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Scan, RefreshCw } from 'lucide-react';
import { soundFx } from '../lib/audio';

export const DwarapalaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [livenessScore, setLivenessScore] = useState('0.984');
  const [cosineSim, setCosineSim] = useState('0.872');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scanY = 0;
    let dir = 1;
    let frame = 0;

    // Face mesh landmarks (5-point canonical + surrounding hull)
    const landmarks = [
      { x: 0.38, y: 0.42 }, // Left eye
      { x: 0.62, y: 0.42 }, // Right eye
      { x: 0.50, y: 0.54 }, // Nose tip
      { x: 0.42, y: 0.68 }, // Left mouth corner
      { x: 0.58, y: 0.68 }, // Right mouth corner
      { x: 0.50, y: 0.72 }, // Chin
      { x: 0.28, y: 0.40 }, // Left cheek
      { x: 0.72, y: 0.40 }, // Right cheek
      { x: 0.50, y: 0.24 }, // Forehead
    ];

    const render = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw biometric grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      const cellSize = 30;
      for (let x = 0; x < w; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw central verification circular target
      const cx = w * 0.5;
      const cy = h * 0.5;
      const r = Math.min(w, h) * 0.38;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating dashed ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.arc(cx, cy, r + 8, frame * 0.02, frame * 0.02 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw face mesh landmarks & interconnections
      const screenPoints = landmarks.map((pt) => ({
        x: pt.x * w,
        y: pt.y * h
      }));

      // Interconnecting lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < screenPoints.length; i++) {
        for (let j = i + 1; j < screenPoints.length; j++) {
          const dx = screenPoints[i].x - screenPoints[j].x;
          const dy = screenPoints[i].y - screenPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < w * 0.3) {
            ctx.beginPath();
            ctx.moveTo(screenPoints[i].x, screenPoints[i].y);
            ctx.lineTo(screenPoints[j].x, screenPoints[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw landmark dots
      for (let pt of screenPoints) {
        ctx.beginPath();
        ctx.fillStyle = '#38bdf8';
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // subtle glow ring
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw moving horizontal scanning laser
      if (isScanning) {
        scanY += dir * 1.8;
        if (scanY > h || scanY < 0) dir *= -1;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.85)';
        ctx.lineWidth = 2;
        ctx.moveTo(w * 0.15, scanY);
        ctx.lineTo(w * 0.85, scanY);
        ctx.stroke();

        // Gradient laser scrim
        const laserGrad = ctx.createLinearGradient(0, scanY - 24, 0, scanY);
        laserGrad.addColorStop(0, 'transparent');
        laserGrad.addColorStop(1, 'rgba(52, 211, 153, 0.12)');
        ctx.fillStyle = laserGrad;
        ctx.fillRect(w * 0.15, scanY - 24, w * 0.7, 24);
      }

      frame++;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isScanning]);

  const handleRescan = () => {
    soundFx.playClick();
    setLivenessScore((0.97 + Math.random() * 0.02).toFixed(3));
    setCosineSim((0.86 + Math.random() * 0.05).toFixed(3));
    soundFx.playChime();
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-5 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-300 font-semibold">4-Signal Liveness &amp; ArcFace Verification</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>PASS (989 Pairs)</span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-56 sm:h-64 rounded-xl bg-[#090b10] border border-white/[0.06] overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={580}
          height={260}
          className="w-full h-full object-cover"
        />

        {/* HUD Live Metrics Overlay */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/[0.08] text-[10px] font-mono space-y-1">
          <div className="text-zinc-400">MiniFASNet Liveness: <span className="text-emerald-400 font-bold">{livenessScore}</span></div>
          <div className="text-zinc-400">ArcFace Cosine Sim: <span className="text-sky-400 font-bold">{cosineSim}</span></div>
        </div>

        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/[0.08] text-[10px] font-mono text-zinc-400">
          <div>Texture (FFT/LBP): <span className="text-emerald-400">Verified</span></div>
          <div>rPPG Pulse Spectrum: <span className="text-emerald-400">Active (72 bpm)</span></div>
        </div>
      </div>

      {/* Footer controls & trigger */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="text-[11px] font-mono text-zinc-500">
          Evaluated on LFW Benchmark: 97.98% Accuracy · 0.9801 ROC-AUC
        </div>
        <button
          type="button"
          onClick={handleRescan}
          data-cursor="RE-SCAN"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Re-verify Face</span>
        </button>
      </div>
    </div>
  );
};
