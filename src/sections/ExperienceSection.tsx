import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, CheckCircle2, ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import { experienceData, ExperienceItem } from '../data/experience';
import { soundFx } from '../lib/audio';

export const ExperienceSection: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experienceData[0].id);

  const activeExp = experienceData.find((e) => e.id === selectedExpId) || experienceData[0];

  return (
    <section id="experience" className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#08090d]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              04 / Timeline &amp; Roles
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Engineering Track Record
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            2025 — 2026 CHRONOLOGY
          </div>
        </div>

        {/* Spatial Year Navigators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experienceData.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedExpId(exp.id);
                }}
                data-cursor="SELECT"
                className={`p-6 sm:p-8 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-zinc-900/90 border-sky-400/50 shadow-xl shadow-sky-500/10'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-4xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                      {exp.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-2">
                      {exp.organization}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-400 font-medium">
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.period}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {exp.location}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Spatial Detail View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-2xl bg-zinc-950/70 border border-white/[0.08] space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                Core Deliverables &amp; Architectural Impact
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {activeExp.role} at {activeExp.organization}
              </h3>
              <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
                {activeExp.summary}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Key Contributions &amp; System Hardening
              </h4>
              <div className="grid gap-3">
                {activeExp.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-body">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* GsSoC Open Source Projects Breakdown (if applicable) */}
            {activeExp.projectsWorkedOn && (
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Open Source Repositories Enhanced
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeExp.projectsWorkedOn.map((p) => (
                    <div
                      key={p.name}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-display font-bold text-white">
                          {p.name}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          Active Contributor
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {p.description}
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {p.contributions.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-sky-400 font-bold">›</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500">Stack:</span>
              {activeExp.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-white/[0.04] rounded-md border border-white/[0.06] text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
