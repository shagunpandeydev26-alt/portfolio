import React from 'react';
import { motion } from 'motion/react';
import { GitPullRequest, ExternalLink, Music, Shield, Terminal, FileCode } from 'lucide-react';
import { soundFx } from '../lib/audio';

export const OpenSourceSection: React.FC = () => {
  const openSourceProjects = [
    {
      name: 'Guitariz',
      category: 'Audio Synthesis & Theory',
      icon: <Music className="w-5 h-5 text-sky-400" />,
      role: 'Core Feature Contributor',
      period: 'GsSoC 2026',
      description: 'Engineered an interactive 88-key virtual piano with realistic touch response, modal musical scale mapping, and Web Audio API synthesis.',
      deliverables: [
        'Polyphonic 88-key browser piano architecture',
        'Web Audio oscillator and gain envelope synthesis',
        'Responsive mobile touch layout optimization'
      ],
      link: 'https://github.com/shagunpandeydev26-alt'
    },
    {
      name: 'AI-dev-assistant',
      category: 'Compliance & Developer Tooling',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      role: 'Compliance Architecture',
      period: 'GsSoC 2026',
      description: 'Implemented enterprise audit trails and governance reporting pipelines supporting structured PDF, CSV, and JSON multi-format exports.',
      deliverables: [
        'Audit trail logging and security serialization',
        'Structured exports across PDF, CSV, and JSON formats',
        'Authored 11 comprehensive automated test suites'
      ],
      link: 'https://github.com/shagunpandeydev26-alt'
    },
    {
      name: 'Atelier',
      category: 'Creative Authoring Studio',
      icon: <FileCode className="w-5 h-5 text-amber-400" />,
      role: 'Markdown Component Architecture',
      period: 'GsSoC 2026',
      description: 'Built a reusable, sanitized Markdown editor featuring live side-by-side Write/Preview and full GitHub-Flavored Markdown (GFM) compatibility.',
      deliverables: [
        'Synchronized side-by-side preview scrolling',
        'HTML sanitization preventing XSS injection',
        'GFM tables, task checkboxes, and syntax blocks'
      ],
      link: 'https://github.com/shagunpandeydev26-alt'
    },
    {
      name: 'PESiMENs',
      category: 'Platform Architecture & Quality',
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      role: 'Performance & Linting Hardening',
      period: 'GsSoC 2026',
      description: 'Improved codebase reliability by establishing strict ESLint logging constraints, purging debug statements, and enforcing runtime purity.',
      deliverables: [
        'ESLint logging constraints across repository',
        'Purged debug artifacts from client bundle',
        'Performance optimization across core modules'
      ],
      link: 'https://github.com/shagunpandeydev26-alt'
    }
  ];

  return (
    <section className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#08090e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              06 / Community Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Open Source Stewardship
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            <span>GIRLSCRIPT SUMMER OF CODE (GSSOC 2026)</span>
          </div>
        </div>

        {/* Dynamic Cards Grid with Subtle Staggered Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openSourceProjects.map((repo, idx) => (
            <div
              key={repo.name}
              className={`p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 space-y-5 ${
                idx % 2 === 1 ? 'md:translate-y-4' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    {repo.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {repo.name}
                    </h3>
                    <p className="text-xs text-sky-400 font-mono">
                      {repo.category}
                    </p>
                  </div>
                </div>

                <a
                  href={repo.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  data-cursor="REPO ↗"
                  aria-label={`View ${repo.name} on GitHub`}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                {repo.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-body">
                  {repo.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{repo.role}</span>
                <span>{repo.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
