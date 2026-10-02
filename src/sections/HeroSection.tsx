import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, FileText, ChevronRight } from 'lucide-react';
import { HeroVisual } from '../components/HeroVisual';
import { profileData } from '../data/profile';
import { soundFx } from '../lib/audio';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero content grid: Asymmetric editorial composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Bold Asymmetric Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Metadata Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              AVAILABLE FOR 2026/2027 ROLES
            </span>
            <span>·</span>
            <span>HBTU KANPUR</span>
          </div>

          {/* Large Hero Name */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.88]"
            >
              Shagun
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                Pandey
              </span>
            </motion.h1>
          </div>

          {/* Supporting Technical Domains */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono text-zinc-400">
            <span className="text-sky-400 font-semibold">SOFTWARE ENGINEER</span>
            <span className="text-zinc-600">/</span>
            <span>AI &amp; MACHINE LEARNING</span>
            <span className="text-zinc-600">/</span>
            <span>WEB SYSTEMS</span>
            <span className="text-zinc-600">/</span>
            <span>OPEN SOURCE</span>
          </div>

          {/* Core Statement */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal max-w-xl leading-relaxed">
            "{profileData.headline}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#work"
              onClick={() => soundFx.playClick()}
              data-cursor="EXPLORE"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-all duration-200 shadow-lg shadow-sky-500/20 group"
            >
              <span>View Work</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

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

        {/* Right Column: Three.js Interactive Neural Geometry */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full aspect-square max-w-[480px]">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom bar with subtle scroll indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-zinc-500">
        <div className="hidden sm:flex items-center gap-4">
          <span>01 / 07</span>
          <span>·</span>
          <span>CORE RUNTIME READY</span>
        </div>

        <a
          href="#about"
          onClick={() => soundFx.playClick()}
          data-cursor="SCROLL"
          className="flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mx-auto sm:mx-0"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>

        <div className="hidden sm:block text-right">
          <span>KANPUR, UP · HBTU 2028</span>
        </div>
      </div>
    </section>
  );
};
