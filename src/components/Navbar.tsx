import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Command, Menu } from 'lucide-react';
import { soundFx } from '../lib/audio';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onNavigate?: (targetProgress: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  onOpenCommandPalette,
  onOpenResumeModal,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  const navLinks = [
    { label: 'About', target: 0.22 },
    { label: 'Skills', target: 0.38 },
    { label: 'Experience', target: 0.54 },
    { label: 'Work', target: 0.70 },
    { label: 'Milestones', target: 0.86 },
    { label: 'Contact', target: 0.96 }
  ];

  const handleLinkClick = (e: React.MouseEvent, target: number) => {
    e.preventDefault();
    soundFx.playClick();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080c]/80 backdrop-blur-md border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={(e) => handleLinkClick(e, 0.0)}
          data-cursor="HOME"
          className="text-lg md:text-xl font-display font-extrabold tracking-tight text-white hover:text-sky-400 transition-colors uppercase whitespace-nowrap cursor-pointer"
        >
          Shagun.
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              data-cursor="GO"
              onClick={(e) => handleLinkClick(e, link.target)}
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-sky-400 decoration-1 whitespace-nowrap cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
            aria-label={isMuted ? 'Enable sound effects' : 'Mute sound effects'}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          </button>

          {/* Quick Command Palette Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenCommandPalette();
            }}
            data-cursor="CMD+K"
            aria-label="Open Command Palette"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-zinc-400 hover:text-white bg-zinc-900/60 border border-white/[0.08] rounded-md hover:border-white/[0.2] transition-colors whitespace-nowrap"
          >
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </button>

          {/* Download / View Resume Action */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenResumeModal();
            }}
            data-cursor="CV"
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900/80 border border-sky-500/30 rounded-lg hover:border-sky-400 hover:bg-sky-500/10 transition-colors whitespace-nowrap"
          >
            Resume
          </button>

          {/* Menu Trigger */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenMenu();
            }}
            data-cursor="MENU"
            aria-label="Open Fullscreen Menu"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] rounded-lg transition-colors whitespace-nowrap"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
