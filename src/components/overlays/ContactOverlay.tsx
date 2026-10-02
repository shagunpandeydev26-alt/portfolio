import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { soundFx } from '../../lib/audio';

interface ContactOverlayProps {
  progress: number;
  onOpenResumeModal: () => void;
}

export const ContactOverlay: React.FC<ContactOverlayProps> = ({
  progress,
  onOpenResumeModal
}) => {
  const start = 0.88;
  const peak = 0.95;
  const end = 1.0;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  if (progress < start) return null;

  const norm = Math.min(1, Math.max(0, (progress - start) / (peak - start)));
  const opacity = norm;
  const translateY = (1 - norm) * 60;
  const scale = 0.95 + norm * 0.05;

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    soundFx.playChime();
    setFormStatus('success');
    setStatusMessage('Transmission ready. Opening your default mail client with the drafted inquiry.');

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      style={{
        opacity: Math.max(0, opacity),
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        pointerEvents: opacity < 0.25 ? 'none' : 'auto'
      }}
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full transition-transform duration-75 ease-out select-none"
    >
      {/* Localized Reading Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(7,8,12,0.92)_0%,rgba(7,8,12,0.68)_50%,transparent_100%)] -z-10" />

      <div className="space-y-6">
        {/* Big Finale Typography */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 drop-shadow-md">
            07 / Final Transmission
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase text-white tracking-tight leading-none mt-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Let&apos;s Build Something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-indigo-400">
              Worth Remembering.
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed max-w-md">
              Available for full-time engineering roles, AI/ML research pipelines, and high-impact web architectures.
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-500">
                Direct Inquiries
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profileData.email}`}
                  data-cursor="EMAIL"
                  className="text-base sm:text-lg font-display font-bold text-white hover:text-sky-400 transition-colors"
                >
                  {profileData.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor="COPY"
                  aria-label="Copy email address"
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              {copied && (
                <span className="text-xs font-mono text-emerald-400">Copied to clipboard!</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB ↗"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN ↗"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onOpenResumeModal();
                }}
                data-cursor="RESUME"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-mono text-sky-300 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Right: Transmission Form */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950/85 border border-white/[0.08] p-6 sm:p-8 space-y-4 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="name-contact" className="text-[11px] font-mono text-zinc-400">
                    Your Name *
                  </label>
                  <input
                    id="name-contact"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email-contact" className="text-[11px] font-mono text-zinc-400">
                    Email Address *
                  </label>
                  <input
                    id="email-contact"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. maya@domain.com"
                    className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message-contact" className="text-[11px] font-mono text-zinc-400">
                  Message *
                </label>
                <textarea
                  id="message-contact"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your engineering initiative or opportunity..."
                  className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              {formStatus === 'error' && (
                <p className="text-xs font-mono text-rose-400">{statusMessage}</p>
              )}

              {formStatus === 'success' && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                data-cursor="TRANSMIT"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/[0.06] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
          <div>© 2026 Shagun Pandey · HBTU Kanpur</div>
          <div>Built with React, TypeScript &amp; Three.js</div>
        </div>
      </div>
    </div>
  );
};
