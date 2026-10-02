import React, { useState, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { FullscreenMenu } from './components/FullscreenMenu';
import { CommandPalette } from './components/CommandPalette';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CinematicStage } from './components/CinematicStage';
import { Project } from './data/projects';
import { soundFx } from './lib/audio';

export default function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToRef = useRef<((progress: number) => void) | null>(null);

  const handleRegisterScrollTo = useCallback((fn: (progress: number) => void) => {
    scrollToRef.current = fn;
  }, []);

  const handleNavigate = (targetProgress: number) => {
    let targetScene = 'hero';
    if (targetProgress <= 0.12) targetScene = 'hero';
    else if (targetProgress <= 0.28) targetScene = 'about';
    else if (targetProgress <= 0.44) targetScene = 'skills';
    else if (targetProgress <= 0.60) targetScene = 'experience';
    else if (targetProgress <= 0.72) targetScene = 'alphaforge';
    else if (targetProgress <= 0.80) targetScene = 'dwarapala';
    else if (targetProgress <= 0.90) targetScene = 'achievements';
    else targetScene = 'contact';

    soundFx.triggerArrival(targetScene);
    if (scrollToRef.current) {
      scrollToRef.current(targetProgress);
    }
  };

  const triggerConfetti = () => {
    soundFx.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#34d399', '#fbbf24', '#a855f7']
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07080c] text-[#e4e7ec] selection:bg-sky-500/30 selection:text-white">
      {/* Cinematic Initial Preloader */}
      <Preloader onComplete={() => setIsPreloaderDone(true)} />

      {/* Spring Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Strict 3-Zone Top Navigation Bar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCommandPalette={() => setIsCmdOpen(true)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 
        The Fixed Cinematic 3D Stage (The Core Experience)
        Scroll controls continuous 3D camera choreography & spatial scene morphing
      */}
      <main className="relative z-10">
        <CinematicStage
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onSelectProject={(p) => setSelectedProject(p)}
          onTriggerConfetti={triggerConfetti}
          onRegisterScrollTo={handleRegisterScrollTo}
        />
      </main>

      {/* Fullscreen Navigation Overlay */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onOpenTerminalModal={() => setIsTerminalOpen(true)}
        onTriggerConfetti={triggerConfetti}
        onNavigate={handleNavigate}
      />

      {/* Interactive Developer Terminal Easter Egg */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Case Study Full Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Official Resume Viewer & Downloader Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
