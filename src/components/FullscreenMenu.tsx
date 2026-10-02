import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFx } from '../lib/audio';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onNavigate?: (targetProgress: number) => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const menuItems = [
    { number: '01', title: 'HOME', target: 0.0 },
    { number: '02', title: 'ABOUT', target: 0.22 },
    { number: '03', title: 'SKILLS', target: 0.38 },
    { number: '04', title: 'EXPERIENCE', target: 0.54 },
    { number: '05', title: 'WORK', target: 0.70 },
    { number: '06', title: 'ACHIEVEMENTS', target: 0.86 },
    { number: '07', title: 'CONTACT', target: 0.96 }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07080c]/98 backdrop-blur-2xl p-6 sm:p-12"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <span className="text-xl font-display font-extrabold uppercase tracking-tight text-white">
              Shagun.
            </span>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              data-cursor="CLOSE"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase text-zinc-400 hover:text-white bg-white/[0.06] rounded-md transition-colors"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-auto py-8">
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.number}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                    if (onNavigate) {
                      onNavigate(item.target);
                    }
                  }}
                  data-cursor="GO"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="group flex items-center gap-4 text-3xl sm:text-5xl md:text-6xl font-display font-bold text-zinc-400 hover:text-white transition-colors text-left cursor-pointer"
                >
                  <span className="font-mono text-xs sm:text-sm font-normal text-sky-400/80 group-hover:text-sky-300">
                    {item.number}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-200">
                    {item.title}
                  </span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-sky-400 ml-2" />
                </motion.button>
              ))}
            </nav>

            {/* Sidebar quick info */}
            <div className="flex flex-col justify-end space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-12">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Location &amp; University
                </span>
                <p className="text-sm text-zinc-300">
                  Kanpur, Uttar Pradesh, India
                </p>
                <p className="text-xs text-zinc-500">
                  Harcourt Butler Technical University (B.Tech 2024–2028)
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Direct Inquiries
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  data-cursor="EMAIL"
                  className="block text-sm text-sky-400 hover:underline"
                >
                  {profileData.email}
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                    onOpenResumeModal();
                  }}
                  data-cursor="VIEW"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-sky-500/20 border border-sky-400/40 rounded-lg hover:bg-sky-500/30 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume Viewer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-6">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profileData.email}`}
                data-cursor="MAIL"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
            <span>© 2026 SHAGUN PANDEY</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
