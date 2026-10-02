import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ExternalLink, ShieldCheck, Mail, Phone, MapPin, Award, BookOpen, Briefcase, Code } from 'lucide-react';
import { profileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { projectsData } from '../data/projects';
import { achievementsData } from '../data/achievements';
import { soundFx } from '../lib/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundFx.playClick();
    // Generate text/markdown or styled blob for direct download
    const resumeText = `SHAGUN PANDEY
Kanpur, Uttar Pradesh, India
Phone: ${profileData.phone} | Email: ${profileData.email}
LinkedIn: ${profileData.linkedinUrl} | GitHub: ${profileData.githubUrl}

============================================================
1. EDUCATION
============================================================
Harcourt Butler Technical University, Kanpur, Uttar Pradesh
Bachelor of Technology in Chemical Engineering (Expected Graduation: June 2028)
June 2024 – Present | GPA: 7.28 / 10.00
Core Fundamentals: Data Structures and Algorithms, Object-Oriented Programming (OOPs), Database Management Systems (DBMS), Operating Systems (OS), Computer Networks (CN)

============================================================
2. TECHNICAL SKILLS
============================================================
Core Programming Languages: C++, C, Python, SQL
Web & Backend Development: HTML, CSS, JavaScript, TypeScript, React.js, Redux Toolkit, Node.js, Next.js, Express.js, Tailwind CSS
Databases & Cloud: MongoDB, MySQL, Google Firestore
Machine Learning & AI: RAG, Reinforcement Learning, Neural Networks, Computer Vision, TensorFlow, Scikit-learn, Stable-Baselines3, Streamlit
Blockchain Development: Solidity, Ethereum
Tools: Git, GitHub, VS Code, IntelliJ IDEA, Claude

============================================================
3. EXPERIENCE
============================================================
GirlScript Summer of Code (GsSoC 2026) | Remote | May 2026 – July 2026
Open Source Contributor (Guitariz, PESiMENs, AI-dev-assistant, Atelier)
- Contributed to existing open-source codebases through feature development, refactoring, and testing.
- Enhanced Guitariz with an interactive 88-key piano, scale mapping, Web Audio integration, and responsive UI improvements.
- Contributed to AI-dev-assistant by implementing compliance reporting/audit trails with PDF, CSV, and JSON exports, backed by 11 automated tests.
- Improved PESiMENs code quality by enforcing ESLint logging rules and removing debug statements; enhanced Atelier with a reusable, sanitized Markdown editor supporting Write/Preview and GitHub-Flavored Markdown.

Taskswap | Kanpur, UP | September 2025 – November 2025
Backend Developer Intern
- Developed stateless RESTful backend services using Node.js and MongoDB for a multi-tenant task distribution platform.
- Implemented authentication and identity-verification flows using token-based authentication integrated with Google Firebase.
- Collaborated with frontend engineers to define and integrate API contracts, coordinating data flow between backend services and clients.

============================================================
4. PROJECTS
============================================================
AlphaForge — Reinforcement Learning Trading Assistant (June 2026)
Python, PyTorch, Stable-Baselines3, FinRL, FastAPI, Streamlit, pytest
- Built a modular PPO reinforcement-learning system with custom trading environments, configurable rewards, training, evaluation, inference, and data pipelines.
- Developed an out-of-sample backtesting framework comparing the RL agent against buy-and-hold and random strategies under identical starting capital and transaction costs.
- Implemented training-window and fabricated-data validation to prevent invalid backtests, with automated pytest coverage and GitHub Actions CI.

Dwarapala — End-to-End Biometric Identity-Verification Engine (May 2026)
Python, PyTorch, OpenCV, ONNX Runtime, scikit-learn, FastAPI, Gradio, InsightFace
- Built an end-to-end face verification and liveness detection pipeline combining ArcFace face embeddings with multi-signal anti-spoofing.
- Implemented 4-signal liveness fusion using MiniFASNet, LBP/FFT texture analysis, temporal micro-motion, and rPPG, with adaptive handling of unavailable signals.
- Achieved 97.98% accuracy, 0.9801 ROC-AUC, and 3.64% EER on LFW across 989 scored pairs; exposed verification through FastAPI, Python API, and Gradio.

============================================================
5. ACHIEVEMENTS
============================================================
- Coding Profile: Knight at LeetCode (Max. Rating: 1875, Top 5.45% globally).
- World Finalist, ICPC Algoqueen 2026.
- Global rank 579 in weekly contest 515 at LeetCode.
- Global rank 597 in weekly contest 513 at LeetCode.
- Semi Finalist, Women Who Master Hackathon'26 (Aspire For Her X Logitech).
- 1st Place, OSCodeX HBTU x Technika '25 Technical Hackathon (Outcompeted 30+ regional selection teams).
- 1st Place, RoboSoccer Blitz, Resonance '25 (in collab with IEEE STB HBTU out of 50+ entries).
- 2nd Runner-Up, UP Regionals, BitNBuild '25 (Global Hackathon initiative organized by GDSC out of 250+ teams).
- 2nd Runner-Up (Overall) & 1st Runner-Up (Healthcare Track), Smart India Hackathon (SIH) '25 Internals (Out of 150+ teams).
- 2nd Runner-Up, Kodekalesh '25 — National Level Hackathon (IDEAKode x GDG HBTU out of 250+ participating teams).
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Shagun_Pandey_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0c0e15] shadow-2xl p-6 sm:p-10"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Resume Document · Verified</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] rounded-lg hover:bg-white/[0.1] transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                data-cursor="DOWNLOAD"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Paper Presentation */}
          <div className="mt-6 bg-[#08090e] border border-white/[0.07] rounded-xl p-6 sm:p-10 font-body text-zinc-300 space-y-8 select-text">
            {/* Header info */}
            <div className="border-b border-white/[0.08] pb-6">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                {profileData.name}
              </h1>
              <p className="text-sm font-medium text-sky-400 mt-1">
                {profileData.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {profileData.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-zinc-500" />
                  {profileData.phone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-zinc-500" />
                  {profileData.email}
                </span>
              </div>
            </div>

            {/* 1. Education */}
            <section className="space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                1. Education
              </h2>
              <div className="pl-2 border-l border-sky-500/30 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-semibold text-white">
                    {profileData.education.institution}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {profileData.education.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  {profileData.education.degree} in {profileData.education.field} (Expected Graduation: {profileData.education.expectedGraduation})
                </p>
                <p className="text-xs text-emerald-400 font-mono font-medium">
                  GPA: {profileData.education.gpa}
                </p>
                <p className="text-xs text-zinc-400 pt-1">
                  <span className="text-zinc-500">Core Fundamentals: </span>
                  {profileData.education.fundamentals.join(', ')}
                </p>
              </div>
            </section>

            {/* 2. Technical Skills */}
            <section className="space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Code className="w-4 h-4" />
                2. Technical Skills
              </h2>
              <div className="grid gap-2 text-xs pl-2 border-l border-emerald-500/30">
                <p>
                  <strong className="text-zinc-200">Core Programming Languages: </strong>
                  <span className="text-zinc-400">C++, C, Python, SQL</span>
                </p>
                <p>
                  <strong className="text-zinc-200">Web &amp; Backend Development: </strong>
                  <span className="text-zinc-400">HTML, CSS, JavaScript, TypeScript, React.js, Redux Toolkit, Node.js, Next.js, Express.js, Tailwind CSS</span>
                </p>
                <p>
                  <strong className="text-zinc-200">Databases &amp; Cloud: </strong>
                  <span className="text-zinc-400">MongoDB, MySQL, Google Firestore</span>
                </p>
                <p>
                  <strong className="text-zinc-200">Machine Learning &amp; AI: </strong>
                  <span className="text-zinc-400">RAG, Reinforcement Learning, Neural Networks, Computer Vision, TensorFlow, Scikit-learn, Stable-Baselines3, Streamlit</span>
                </p>
                <p>
                  <strong className="text-zinc-200">Blockchain Development: </strong>
                  <span className="text-zinc-400">Solidity, Ethereum</span>
                </p>
                <p>
                  <strong className="text-zinc-200">Tools: </strong>
                  <span className="text-zinc-400">Git, GitHub, VS Code, IntelliJ IDEA, Claude</span>
                </p>
              </div>
            </section>

            {/* 3. Experience */}
            <section className="space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                3. Experience
              </h2>
              <div className="space-y-5 pl-2 border-l border-amber-500/30">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                      <span className="font-semibold text-white">
                        {exp.organization} — {exp.role}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {exp.period} · {exp.location}
                      </span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-300">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Projects */}
            <section className="space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Code className="w-4 h-4" />
                4. Projects
              </h2>
              <div className="space-y-5 pl-2 border-l border-purple-500/30">
                {projectsData.slice(0, 2).map((proj) => (
                  <div key={proj.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                      <span className="font-semibold text-white">
                        {proj.title} — {proj.subtitle}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {proj.date}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-sky-400/90">
                      {proj.technologies.join(', ')}
                    </p>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-300">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Achievements */}
            <section className="space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                <Award className="w-4 h-4" />
                5. Achievements
              </h2>
              <ul className="list-disc list-outside ml-6 space-y-1 text-xs text-zinc-300">
                {achievementsData.map((ach) => (
                  <li key={ach.id}>
                    <strong className="text-white">{ach.title}</strong>
                    {ach.scale && <span className="text-zinc-400"> ({ach.scale})</span>}
                    {' — '}{ach.highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
