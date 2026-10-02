import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useReducedMotion } from '../hooks/usePortfolio';
import { soundFx } from '../lib/audio';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Calibration Progress Simulation
  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsReadyToEnter(true);
          }, 150);
          return 100;
        }
        const step = Math.floor(Math.random() * 9) + 4;
        return Math.min(100, prev + step);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [reducedMotion, onComplete]);

  // Handle User-Initiated Cinematic Warp into the World
  const handleEnterWorld = () => {
    if (isWarping) return;
    setIsWarping(true);

    // Trigger the Hatom visceral powerup riser + sub-bass slam
    soundFx.playInitiationSequence();

    // Sequence the warp explosion into the 3D scene
    setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 400);
    }, 1100);
  };

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: 'blur(12px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050608] p-6 sm:p-12 lg:p-16 select-none overflow-hidden"
        >
          {/* Ambient Background Grid & Radial Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Top Metadata Header */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="text-zinc-300 font-semibold">HATOM ACOUSTIC MATRIX</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">v4.2 PROD</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SPATIAL 3D EXPERIENCE</span>
            </div>
          </div>

          {/* Central Holographic Interaction Portal */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
            {/* Concentric Rotating Gyro Rings */}
            <div className="relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-sky-500/25"
              />

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-sky-400/30 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
              />

              {/* Inner Pulsing Core */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-10 rounded-full bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-emerald-500/10 border border-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                {/* Center Audio Waveform Reactor */}
                <div className="flex items-center gap-1.5 h-8">
                  {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5, 0.8].map((factor, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isReadyToEnter ? [8, 30 * factor, 8] : [4, 14 * factor, 4]
                      }}
                      transition={{
                        duration: 0.8 + i * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="w-1 rounded-full bg-gradient-to-t from-sky-400 to-emerald-300"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Warp Shockwave Animation (on click) */}
              {isWarping && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.9 }}
                  animate={{ scale: 28, opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-full border-4 border-sky-300 bg-sky-400/20 shadow-[0_0_80px_rgba(56,189,248,0.9)] pointer-events-none"
                />
              )}
            </div>

            {/* Title & Interaction Prompt */}
            <div className="mt-8 text-center max-w-lg space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase"
              >
                Shagun Pandey
              </motion.h1>

              <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider">
                SOFTWARE ARCHITECT &middot; AI SYSTEMS &middot; CREATIVE TECH
              </p>

              {/* Ready to Enter Action Button (Hatom Experience Trigger) */}
              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {!isReadyToEnter ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>INITIALIZING SYSTEMS &amp; ASSETS... {progress}%</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="ready"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleEnterWorld}
                      disabled={isWarping}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden border border-sky-400/50 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-emerald-500/20 shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_45px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                    >
                      {/* Sweeping Shimmer Beam */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white uppercase">
                        {isWarping ? 'WARPING INTO WORLD...' : 'ENTER EXPERIENCE'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Headphone Recommendation Tag */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
                <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>HEADPHONES RECOMMENDED &middot; ACTION THEME AUDIO ENABLED</span>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar & Telemetry */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{isReadyToEnter ? 'SYNAPSE READY &middot; CLICK TO INITIALIZE' : 'CALIBRATING 3D SHADER RUNTIME'}</span>
              <span className="text-zinc-300 font-bold tabular-nums">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-zinc-800/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
