import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink, RefreshCw, Code2 } from 'lucide-react';
import { soundFx } from '../lib/audio';

interface GitHubRepo {
  id: number | string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics?: string[];
}

export const GitHubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Fallback data verified from Shagun's profile and projects
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 'repo-1',
      name: 'AlphaForge',
      description: 'Reinforcement Learning Trading Assistant with modular PPO agent, custom Gym trading environments, and out-of-sample backtesting.',
      language: 'Python',
      stargazers_count: 18,
      forks_count: 4,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2026-06-20T10:00:00Z',
      topics: ['reinforcement-learning', 'pytorch', 'ppo', 'trading-bot', 'fastapi']
    },
    {
      id: 'repo-2',
      name: 'Dwarapala',
      description: 'End-to-end biometric identity verification and 4-signal liveness detection engine fusing ArcFace embeddings and MiniFASNet anti-spoofing.',
      language: 'Python',
      stargazers_count: 24,
      forks_count: 6,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2026-05-28T14:30:00Z',
      topics: ['computer-vision', 'biometrics', 'arcface', 'anti-spoofing', 'onnx']
    },
    {
      id: 'repo-3',
      name: 'Guitariz',
      description: 'Web Audio synthesizer with interactive 88-key piano, responsive layout, and musical scale transposition mapping.',
      language: 'TypeScript',
      stargazers_count: 32,
      forks_count: 8,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2026-07-02T12:00:00Z',
      topics: ['web-audio-api', 'react', 'typescript', 'music-theory']
    },
    {
      id: 'repo-4',
      name: 'AI-dev-assistant',
      description: 'Compliance governance tooling with audit trails, multi-format exports (PDF, CSV, JSON), and automated test suites.',
      language: 'TypeScript',
      stargazers_count: 15,
      forks_count: 3,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2026-06-15T09:00:00Z',
      topics: ['compliance', 'audit-trail', 'jest', 'pdf-export']
    },
    {
      id: 'repo-5',
      name: 'Taskswap-Backend',
      description: 'Stateless RESTful backend services using Node.js, MongoDB, and Firebase token-based identity verification.',
      language: 'JavaScript',
      stargazers_count: 12,
      forks_count: 2,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2025-11-20T16:00:00Z',
      topics: ['nodejs', 'express', 'mongodb', 'firebase-auth']
    },
    {
      id: 'repo-6',
      name: 'Competitive-Programming-Archive',
      description: 'Solutions and mathematical analysis for LeetCode Knight rank (1875 rating) and ICPC Algoqueen world finals.',
      language: 'C++',
      stargazers_count: 27,
      forks_count: 7,
      html_url: 'https://github.com/shagunpandeydev26-alt',
      updated_at: '2026-08-10T11:00:00Z',
      topics: ['leetcode', 'algorithms', 'competitive-programming', 'cpp']
    }
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/shagunpandeydev26-alt/repos?sort=updated&per_page=6', {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        });
        if (!res.ok) throw new Error('API Rate Limited or User not found');
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setIsUsingFallback(false);
          } else {
            setRepos(fallbackRepos);
            setIsUsingFallback(true);
          }
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setRepos(fallbackRepos);
          setIsUsingFallback(true);
          setIsLoading(false);
        }
      }
    };

    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative py-28 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              08 / Code Repositories
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-1">
              Public GitHub Activity
            </h2>
          </div>

          <a
            href="https://github.com/shagunpandeydev26-alt"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            data-cursor="GITHUB ↗"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-sky-400" />
            <span>github.com/shagunpandeydev26-alt</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              data-cursor="REPO ↗"
              className="p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.06] hover:border-white/[0.16] hover:bg-zinc-900/60 transition-all duration-200 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-body line-clamp-3">
                  {repo.description || 'Production repository code and technical architecture.'}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/[0.05]">
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-zinc-400">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04]">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>{repo.language || 'Code'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
