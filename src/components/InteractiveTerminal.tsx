import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Minimize2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFx } from '../lib/audio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  cmd: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: 'init',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-semibold">
            Shagun Pandey Engineering Shell [v2.6.0]
          </p>
          <p className="text-zinc-500">
            Type <span className="text-sky-400 font-mono">help</span> to list available commands.
          </p>
        </div>
      )
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    soundFx.playClick();
    const args = trimmed.toLowerCase().split(' ');
    const cmd = args[0];

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs text-zinc-400 font-mono">
            <p><span className="text-sky-400">whoami</span> - Display engineer profile identity</p>
            <p><span className="text-sky-400">skills</span> - Print core technology stack</p>
            <p><span className="text-sky-400">projects</span> - View production ML &amp; Web projects</p>
            <p><span className="text-sky-400">stats</span> - View competitive programming metrics</p>
            <p><span className="text-sky-400">education</span> - Display university and GPA details</p>
            <p><span className="text-sky-400">contact</span> - Display email and verified links</p>
            <p><span className="text-sky-400">clear</span> - Clear terminal session output</p>
            <p><span className="text-sky-400">exit</span> - Close terminal console</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p className="text-white font-bold">{profileData.name}</p>
            <p>{profileData.title} · Kanpur, India</p>
            <p className="text-zinc-400">{profileData.headline}</p>
            <p className="text-sky-300 italic">"{profileData.statement}"</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p><span className="text-emerald-400">AI / ML:</span> PyTorch, TensorFlow, RAG, Reinforcement Learning, OpenCV, Scikit-learn, Stable-Baselines3</p>
            <p><span className="text-sky-400">Web / Full Stack:</span> TypeScript, React.js, Next.js, Redux Toolkit, Node.js, Express.js, Tailwind CSS</p>
            <p><span className="text-amber-400">Languages:</span> C++, C, Python, SQL, Solidity</p>
            <p><span className="text-purple-400">Databases:</span> MongoDB, MySQL, Google Firestore</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p><span className="text-sky-400 font-bold">1. AlphaForge</span> (June 2026) - RL Trading Assistant (PPO, custom trading environments, out-of-sample backtesting, pytest CI)</p>
            <p><span className="text-emerald-400 font-bold">2. Dwarapala</span> (May 2026) - Biometric Identity Verification Engine (ArcFace embeddings, 4-signal liveness fusion, 97.98% LFW accuracy)</p>
            <p><span className="text-amber-400 font-bold">3. GsSoC 2026</span> - Open source contributions to Guitariz (88-key piano), AI-dev-assistant, Atelier, PESiMENs</p>
          </div>
        );
        break;

      case 'stats':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p>🏆 <span className="text-amber-400 font-bold">LeetCode Knight:</span> Max Rating 1875 (Top 5.45% Globally)</p>
            <p>👑 <span className="text-yellow-400 font-bold">ICPC Algoqueen 2026:</span> World Finalist</p>
            <p>⚡ <span className="text-sky-400 font-bold">Contest Ranks:</span> Global 579 (Weekly Contest 515), Global 597 (Weekly Contest 513)</p>
            <p>🎯 <span className="text-emerald-400 font-bold">Dwarapala Benchmark:</span> 97.98% Acc · 0.9801 ROC-AUC · 3.64% EER on LFW</p>
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p className="text-white font-bold">Harcourt Butler Technical University (HBTU)</p>
            <p>B.Tech in Chemical Engineering (2024 – 2028)</p>
            <p>GPA: <span className="text-emerald-400 font-bold">7.28 / 10.00</span></p>
            <p className="text-zinc-400">Core: DSA, OOPs, DBMS, Operating Systems, Computer Networks</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs text-zinc-300 space-y-1 font-mono">
            <p>Email: <a href={`mailto:${profileData.email}`} className="text-sky-400 underline">{profileData.email}</a></p>
            <p>GitHub: <a href={profileData.githubUrl} target="_blank" rel="noreferrer" className="text-sky-400 underline">{profileData.githubUrl}</a></p>
            <p>LinkedIn: <a href={profileData.linkedinUrl} target="_blank" rel="noreferrer" className="text-sky-400 underline">{profileData.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs font-mono">
            Command not recognized: <span className="text-white">{cmd}</span>. Type <span className="text-sky-400">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output: outputNode }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-xl border border-white/[0.12] bg-[#090b10] shadow-2xl overflow-hidden font-mono text-sm"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0d1017] px-4 py-2.5 select-none">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs text-zinc-400 ml-3 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  shagun@system:~ (zsh)
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Minimize terminal"
                  className="hover:text-white"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close terminal"
                  className="hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Output Body */}
            <div className="p-4 max-h-[380px] overflow-y-auto space-y-3 bg-[#080a0f]/90">
              {history.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="text-emerald-400">shagun@dev:~$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 border-t border-white/[0.08] bg-[#0c0f16] px-4 py-2.5"
            >
              <span className="text-xs text-emerald-400">shagun@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command (e.g. help, projects, stats)..."
                className="w-full bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
