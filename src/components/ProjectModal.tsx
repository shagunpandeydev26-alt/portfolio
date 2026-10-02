import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { Project } from '../data/projects';
import { soundFx } from '../lib/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'evaluation'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('overview');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 md:p-10 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0c0e15] shadow-2xl p-6 sm:p-10"
        >
          {/* Top Bar */}
          <div className="flex items-start justify-between border-b border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
                <span>Case Study</span>
                <span className="text-zinc-600">·</span>
                <span>{project.category}</span>
                <span className="text-zinc-600">·</span>
                <span>{project.date}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              data-cursor="CLOSE"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Segmented Filter Navigation */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] py-4">
            {(['overview', 'architecture', 'evaluation'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Body Content based on Tab */}
          <div className="py-6 space-y-8">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 mb-2">
                    01. Problem Definition
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    02. Engineering Approach
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.approach}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 mb-3">
                    03. Technologies &amp; Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white/[0.05] rounded-md border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 mb-2">
                  System Architecture &amp; Data Pipeline
                </h3>
                <div className="grid gap-3">
                  {project.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3.5"
                    >
                      <Cpu className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'evaluation' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 mb-3">
                    Verified Benchmark Results &amp; Metrics
                  </h3>
                  {project.metrics && project.metrics.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center"
                        >
                          <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                            {m.value}
                          </span>
                          <p className="text-xs font-medium text-sky-300 mt-1">
                            {m.label}
                          </p>
                          <p className="text-[11px] text-zinc-500 mt-1">
                            {m.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400">
                      Standardized test execution with automated CI pipelines.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB ↗"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-zinc-400" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified in Resume &amp; Public Code</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
