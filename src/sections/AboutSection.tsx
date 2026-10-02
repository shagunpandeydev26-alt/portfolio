import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Cpu, Layers, Trophy, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';

export const AboutSection: React.FC = () => {
  const domains = [
    {
      title: 'Full-Stack & Web Engineering',
      desc: 'Architecting responsive client experiences with React, TypeScript, and Tailwind CSS, backed by stateless REST services in Node.js and MongoDB.',
      icon: <Layers className="w-5 h-5 text-sky-400" />
    },
    {
      title: 'AI / Machine Learning & CV',
      desc: 'Formulating Deep Learning architectures: PPO reinforcement learning in FinRL, ArcFace 512D embeddings, and 4-signal biometric anti-spoofing fusion.',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Competitive Algorithmic Mastery',
      desc: 'Knight on LeetCode (Rating 1875, Top 5.45% globally) and ICPC Algoqueen 2026 World Finalist with top global contest ranks.',
      icon: <Trophy className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Open Source Stewardship',
      desc: 'Contributing to high-visibility open-source projects (GsSoC 2026): 88-key piano audio synthesis, compliance audit reporting, and sanitized Markdown editors.',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />
    }
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#08090d]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              02 / Profile &amp; Foundations
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              The Engineering Discipline
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            HARCOURT BUTLER TECHNICAL UNIVERSITY
          </div>
        </div>

        {/* Editorial Big Typography Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
              I Build
              <br />
              Systems
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                That Move.
              </span>
            </h3>

            <div className="space-y-4 text-base text-zinc-300 leading-relaxed font-body pt-4">
              {profileData.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: Key Focus Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] transition-all space-y-3"
              >
                <div className="p-2 rounded-lg bg-white/[0.04] w-fit">
                  {domain.icon}
                </div>
                <h4 className="text-base font-semibold text-white">
                  {domain.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Highlight (Non-boring, architecturally structured) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GraduationCap className="w-48 h-48 text-sky-400" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Academic Rigor &amp; Computer Science Fundamentals</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {profileData.education.institution}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-medium">
                  {profileData.education.degree} in {profileData.education.field}
                </p>
                <p className="text-xs text-zinc-400 font-mono">
                  {profileData.education.location} · {profileData.education.period} · Expected Graduation: {profileData.education.expectedGraduation}
                </p>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center md:text-left">
                <span className="text-xs font-mono text-zinc-400 uppercase">Grade Point Average</span>
                <div className="text-3xl font-display font-bold text-white mt-1 tabular-nums">
                  {profileData.education.gpa}
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">Continuous Standing</span>
              </div>
            </div>

            {/* Core Fundamentals Grid */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Core Computer Science Fundamentals
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {profileData.education.fundamentals.map((fund) => (
                  <div
                    key={fund}
                    className="px-4 py-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-xs font-medium text-zinc-300 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{fund}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
