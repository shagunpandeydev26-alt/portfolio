import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MasterExperience } from './3d/MasterExperience';
import { HeroOverlay } from './overlays/HeroOverlay';
import { AboutOverlay } from './overlays/AboutOverlay';
import { SkillsOverlay } from './overlays/SkillsOverlay';
import { ExperienceOverlay } from './overlays/ExperienceOverlay';
import { ProjectsOverlay } from './overlays/ProjectsOverlay';
import { AchievementsOverlay } from './overlays/AchievementsOverlay';
import { ContactOverlay } from './overlays/ContactOverlay';
import { StageHud } from './StageHud';
import { Project } from '../data/projects';
import { soundFx } from '../lib/audio';

gsap.registerPlugin(ScrollTrigger);

interface CinematicStageProps {
  onOpenResumeModal: () => void;
  onSelectProject: (project: Project) => void;
  onTriggerConfetti: () => void;
  onRegisterScrollTo?: (fn: (targetProgress: number) => void) => void;
}

export const CinematicStage: React.FC<CinematicStageProps> = ({
  onOpenResumeModal,
  onSelectProject,
  onTriggerConfetti,
  onRegisterScrollTo
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll to a specific fraction along the master timeline
  const handleScrollTo = useCallback((targetProgress: number) => {
    if (!trackRef.current) return;
    const totalScrollable = trackRef.current.offsetHeight - window.innerHeight;
    const targetY = targetProgress * totalScrollable;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.4 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (onRegisterScrollTo) {
      onRegisterScrollTo(handleScrollTo);
    }
  }, [onRegisterScrollTo, handleScrollTo]);

  // Setup Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePosRef.current = { x, y };
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Setup Lenis + GSAP ScrollTrigger
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Setup Master ScrollTrigger on the track
    const track = trackRef.current;
    if (!track) return;

    // First user gesture listener to prime Web Audio
    const primeAudio = () => soundFx.ensureRunning();
    window.addEventListener('pointerdown', primeAudio, { once: true });
    window.addEventListener('wheel', primeAudio, { once: true });

    let scrollStopTimer: number | null = null;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const vel = self.getVelocity ? self.getVelocity() : 0;
        soundFx.updateState({
          progress: self.progress,
          scrollVelocity: vel,
          cameraX: mousePosRef.current.x,
          cameraY: mousePosRef.current.y,
          cameraZ: 22 - self.progress * 10
        });

        if (scrollStopTimer) window.clearTimeout(scrollStopTimer);
        scrollStopTimer = window.setTimeout(() => {
          soundFx.updateState({
            progress: self.progress,
            scrollVelocity: 0,
            cameraX: mousePosRef.current.x,
            cameraY: mousePosRef.current.y,
            cameraZ: 22 - self.progress * 10
          });
        }, 110);
      }
    });

    return () => {
      if (scrollStopTimer) window.clearTimeout(scrollStopTimer);
      window.removeEventListener('pointerdown', primeAudio);
      window.removeEventListener('wheel', primeAudio);
      trigger.kill();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#07080c] select-none">
      {/* 
        Persistent Viewport-Sized 3D Stage (Fixed in Place)
        Does NOT move vertically; stays pinned while scroll scrubs progress.
      */}
      <div className="fixed inset-0 z-10 w-full h-full pointer-events-none overflow-hidden">
        {/* Persistent React Three Fiber 3D Stage */}
        <MasterExperience
          progress={scrollProgress}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />

        {/* Spatial HTML Overlay Scenes that Morph in 3D Perspective */}
        <div className="relative w-full h-full z-20">
          <HeroOverlay
            progress={scrollProgress}
            onOpenResumeModal={onOpenResumeModal}
            onScrollTo={handleScrollTo}
          />

          <AboutOverlay
            progress={scrollProgress}
          />

          <SkillsOverlay
            progress={scrollProgress}
          />

          <ExperienceOverlay
            progress={scrollProgress}
          />

          <ProjectsOverlay
            progress={scrollProgress}
            onSelectProject={onSelectProject}
          />

          <AchievementsOverlay
            progress={scrollProgress}
            onTriggerConfetti={onTriggerConfetti}
          />

          <ContactOverlay
            progress={scrollProgress}
            onOpenResumeModal={onOpenResumeModal}
          />
        </div>
      </div>

      {/* Floating Interactive Stage HUD & Chapter Scrubber */}
      <StageHud
        progress={scrollProgress}
        onScrollTo={handleScrollTo}
      />

      {/*
        Virtual Scroll Track:
        Provides the scroll height (e.g. 700vh) to continuously drive the GSAP timeline
        without destroying or moving the fixed WebGL stage.
      */}
      <div
        ref={trackRef}
        className="relative w-full h-[700vh] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
