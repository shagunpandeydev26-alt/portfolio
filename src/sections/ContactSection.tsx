import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, Copy, Check, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFx } from '../lib/audio';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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
    setStatusMessage('Message prepared. Triggering your default mail client with the drafted message.');

    // Construct mailto link fallback with user input
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="contact" className="relative pt-28 pb-14 px-6 sm:px-10 lg:px-16 border-t border-white/[0.08] bg-[#07080c] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Giant Finale Typography */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
            09 / Finale &amp; Inquiries
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold uppercase text-white tracking-tight leading-[0.9]">
            Let&apos;s Build
            <br />
            Something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-indigo-400">
              Worth Remembering.
            </span>
          </h2>
        </div>

        {/* Content Grid: Contact Details & Validated Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-md">
              Whether you are building high-throughput backend services, architecting deep learning systems, or formulating next-generation web products, my inbox is open.
            </p>

            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                Direct Contact
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profileData.email}`}
                  data-cursor="EMAIL"
                  className="text-lg sm:text-xl font-display font-bold text-white hover:text-sky-400 transition-colors"
                >
                  {profileData.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor="COPY"
                  aria-label="Copy email address"
                  className="p-2 text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="text-xs font-mono text-emerald-400 block">
                  Email copied to clipboard!
                </span>
              )}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB ↗"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN ↗"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onOpenResumeModal();
                }}
                data-cursor="RESUME"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-mono text-sky-300 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Resume Document</span>
              </button>
            </div>
          </div>

          {/* Right: Validated Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-8 sm:p-10 space-y-6">
            <h3 className="text-xl font-display font-bold text-white">
              Send a Transmission
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-400">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-400">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. elena@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-zinc-400">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your engineering initiative or opportunity..."
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-sky-400/60 resize-none"
                />
              </div>

              {formStatus === 'error' && (
                <p className="text-xs font-mono text-rose-400">
                  {statusMessage}
                </p>
              )}

              {formStatus === 'success' && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                data-cursor="TRANSMIT"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Footer Signature */}
        <div className="border-t border-white/[0.08] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 Shagun Pandey · All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <div>
            Built with React, TypeScript &amp; curiosity.
          </div>
        </div>
      </div>
    </footer>
  );
};
