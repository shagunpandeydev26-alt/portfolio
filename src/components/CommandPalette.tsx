import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  FolderGit2,
  Briefcase,
  Terminal,
  FileText,
  Mail,
  Home,
  ExternalLink,
  Volume2,
  Sparkles,
  X
} from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFx } from '../lib/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onOpenTerminalModal: () => void;
  onTriggerConfetti: () => void;
  onNavigate?: (targetProgress: number) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenTerminalModal,
  onTriggerConfetti,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playClick();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Go to Top / Hero Scene',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.0);
      }
    },
    {
      id: 'about',
      title: 'View About & Academic Foundations',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-sky-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.22);
      }
    },
    {
      id: 'skills',
      title: 'View 3D Skills Constellation',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.38);
      }
    },
    {
      id: 'experience',
      title: 'View Work Experience & GsSoC Timeline',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.54);
      }
    },
    {
      id: 'projects',
      title: 'View Flagship Projects (AlphaForge & Dwarapala)',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.70);
      }
    },
    {
      id: 'milestones',
      title: 'View Milestones (LeetCode Knight 1875)',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.86);
      }
    },
    {
      id: 'contact',
      title: 'Contact Shagun Pandey',
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      action: () => {
        onClose();
        if (onNavigate) onNavigate(0.96);
      }
    },
    {
      id: 'resume',
      title: 'View & Download Resume',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        onOpenResumeModal();
      }
    },
    {
      id: 'contact',
      title: 'Contact Shagun Pandey',
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-pink-400" />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'github',
      title: 'Visit GitHub Profile',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-zinc-300" />,
      action: () => {
        window.open(profileData.githubUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Visit LinkedIn Profile',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-zinc-300" />,
      action: () => {
        window.open(profileData.linkedinUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'terminal',
      title: 'Easter Egg: Open System Terminal',
      category: 'Developer Tools',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenTerminalModal();
      },
      shortcut: 'TERM'
    },
    {
      id: 'audio-test',
      title: 'Easter Egg: Play Chord Synthesizer',
      category: 'Audio',
      icon: <Volume2 className="w-4 h-4 text-sky-400" />,
      action: () => {
        soundFx.playChime();
        soundFx.playNote(52);
        setTimeout(() => soundFx.playNote(55), 100);
        setTimeout(() => soundFx.playNote(59), 200);
      }
    },
    {
      id: 'algoqueen',
      title: 'Celebrate: ICPC Algoqueen World Finalist',
      category: 'Milestones',
      icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
      action: () => {
        onClose();
        onTriggerConfetti();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      soundFx.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      soundFx.playHover();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        soundFx.playClick();
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-md pt-20 px-4 sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-xl border border-white/[0.12] bg-[#0c0e14] shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Command Palette"
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        cmd.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-sky-500/15 text-white border border-sky-500/30'
                          : 'text-zinc-300 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="shrink-0">{cmd.icon}</span>
                        <span className="font-medium">{cmd.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {cmd.category}
                        </span>
                        {cmd.shortcut && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                            {cmd.shortcut}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with keyboard guidance */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-black/40 px-4 py-2 text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <span>Shagun Pandey System</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
