export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'AI / ML' | 'Biometrics & CV' | 'Open Source' | 'Web Systems';
  date: string;
  technologies: string[];
  description: string;
  problem: string;
  approach: string;
  architecture: string[];
  highlights: string[];
  metrics?: {
    label: string;
    value: string;
    context: string;
  }[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'alphaforge',
    title: 'AlphaForge',
    subtitle: 'Reinforcement Learning Trading Assistant',
    tagline: 'Modular PPO reinforcement learning system with custom trading environments, reward optimization, and out-of-sample backtesting.',
    category: 'AI / ML',
    date: 'June 2026',
    technologies: ['Python', 'PyTorch', 'Stable-Baselines3', 'FinRL', 'FastAPI', 'Streamlit', 'pytest'],
    description: 'Built a modular PPO reinforcement-learning system with custom trading environments, configurable rewards, training, evaluation, inference, and data pipelines.',
    problem: 'Algorithmic trading systems frequently suffer from data leakage and catastrophic overfitting to historical noise, failing when subjected to realistic transaction slippage and regime transitions.',
    approach: 'Engineered an environment based on the OpenAI Gym / Farama Gymnasium protocol, decoupling policy optimization (PPO) from market state synthesis. Built strict out-of-sample backtesting validation and transaction-friction penalty models.',
    architecture: [
      'Gym Trading Environment: Custom observation state containing normalized price returns, rolling volatility, and current inventory position.',
      'PPO Actor-Critic Core: Stable-Baselines3 with clipped surrogate objective, entropy bonus for state exploration, and value loss clipping.',
      'Backtesting & Benchmark Engine: Strict zero-lookahead simulation comparing the learned policy directly against Buy-and-Hold and Monte Carlo Random Walk baseline agents.',
      'Validation Pipeline: Automated pytest test suite and GitHub Actions CI validating training-window integrity and synthesized stress datasets.'
    ],
    highlights: [
      'Modular PPO reinforcement-learning architecture with custom trading environments and configurable reward formulations.',
      'Developed an out-of-sample backtesting framework comparing the RL agent against buy-and-hold and random strategies under identical starting capital and transaction costs.',
      'Implemented training-window and fabricated-data validation to prevent invalid backtests, backed by automated pytest coverage and GitHub Actions CI.',
      'Built interactive parameter exploration interface with Streamlit and low-latency inference endpoint via FastAPI.'
    ],
    metrics: [
      { label: 'Evaluation Protocol', value: 'Out-of-Sample', context: 'Zero-lookahead strict validation split' },
      { label: 'Baseline Comparison', value: 'Buy-and-Hold', context: 'Benchmarked with equal capital & transaction fees' },
      { label: 'Test Suite', value: 'Automated CI', context: 'Pytest test cases integrated with GitHub Actions' }
    ],
    githubUrl: 'https://github.com/shagunpandeydev26-alt',
    featured: true
  },
  {
    id: 'dwarapala',
    title: 'Dwarapala',
    subtitle: 'End-to-End Biometric Identity-Verification Engine',
    tagline: 'Production-grade face verification and anti-spoofing engine fusing ArcFace embeddings with 4-signal liveness detection.',
    category: 'Biometrics & CV',
    date: 'May 2026',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'ONNX Runtime', 'scikit-learn', 'FastAPI', 'Gradio', 'InsightFace'],
    description: 'Built an end-to-end face verification and liveness detection pipeline combining ArcFace face embeddings with multi-signal anti-spoofing.',
    problem: 'Biometric security pipelines are critically vulnerable to presentation attacks (high-resolution photo cutouts, screen replays, silicone masks) and face degradation under uneven lighting.',
    approach: 'Formulated an ensemble anti-spoofing pipeline that fuses 4 orthogonal signals: deep CNN liveness classification, frequency-domain texture analysis (FFT/LBP), temporal micro-motion analysis, and remote photoplethysmography (rPPG biological pulse extraction). Verified with angular-margin ArcFace 512D embeddings.',
    architecture: [
      'Facial Alignment: 5-point landmark detection and affine transformation to canonical coordinate system.',
      '4-Signal Liveness Fusion: MiniFASNet neural score + LBP/FFT texture analysis + optical micro-motion + rPPG pulse spectral peak analysis.',
      'Adaptive Signal Fallback: Dynamic re-weighting matrix when individual biometric signals are degraded or unavailable.',
      'Feature Embedding: 512-dimensional ArcFace deep representations scored via cosine similarity thresholding.',
      'Deployment Engine: ONNX Runtime acceleration wrapped in asynchronous FastAPI endpoints with Gradio interactive interface.'
    ],
    highlights: [
      'Built an end-to-end face verification and liveness detection pipeline combining ArcFace face embeddings with multi-signal anti-spoofing.',
      'Implemented 4-signal liveness fusion using MiniFASNet, LBP/FFT texture analysis, temporal micro-motion, and rPPG, with adaptive handling of unavailable signals.',
      'Achieved 97.98% accuracy, 0.9801 ROC-AUC, and 3.64% EER on LFW across 989 scored pairs.',
      'Exposed verification through FastAPI, Python API, and Gradio client.'
    ],
    metrics: [
      { label: 'LFW Accuracy', value: '97.98%', context: 'Benchmarked on 989 scored verification pairs' },
      { label: 'ROC-AUC', value: '0.9801', context: 'High true-positive separation curve' },
      { label: 'Equal Error Rate', value: '3.64%', context: 'Balanced false-accept and false-reject threshold' }
    ],
    githubUrl: 'https://github.com/shagunpandeydev26-alt',
    featured: true
  },
  {
    id: 'guitariz',
    title: 'Guitariz',
    subtitle: 'Interactive Instrument & Audio Synthesis Platform',
    tagline: '88-key interactive virtual piano with scale mapping and Web Audio API synthesis.',
    category: 'Open Source',
    date: 'June 2026',
    technologies: ['TypeScript', 'React', 'Web Audio API', 'Tailwind CSS'],
    description: 'Enhanced Guitariz in GsSoC 2026 with an interactive 88-key piano, modal scale mapping, Web Audio synthesis, and responsive performance across touch and desktop.',
    problem: 'Browser-based instruments frequently encounter audible audio clipping, high input latency, and broken responsiveness on mobile screen aspect ratios.',
    approach: 'Leveraged Web Audio API AudioContext oscillators and gain envelopes with polyphonic voice pooling. Built dynamic viewport layout calculations for full 88-key scrolling and responsive touch interaction.',
    architecture: [
      'Audio Synthesis Node: Polyphonic oscillator graph with custom attack-decay-sustain-release (ADSR) envelope shaping.',
      'Musical Theory Engine: Mathematical mapping of pitch frequencies across 7 octaves + semitone transpositions.',
      'Responsive Viewport Canvas: Smooth horizontal touch scroll with zero layout jitter.'
    ],
    highlights: [
      'Enhanced Guitariz with an interactive 88-key piano and scale mapping.',
      'Direct Web Audio integration providing low-latency polyphonic synthesis.',
      'Responsive UI improvements supporting smooth touch interaction on mobile devices.'
    ],
    githubUrl: 'https://github.com/shagunpandeydev26-alt',
    featured: false
  },
  {
    id: 'ai-dev-assistant',
    title: 'AI-Dev-Assistant',
    subtitle: 'Governance & Compliance Tooling Suite',
    tagline: 'Audit trail reporting with structured PDF, CSV, and JSON exports backed by automated test suites.',
    category: 'Open Source',
    date: 'June 2026',
    technologies: ['TypeScript', 'Node.js', 'Jest', 'Export Pipelines'],
    description: 'Implemented enterprise-grade compliance reporting and audit trails with multi-format exports (PDF, CSV, JSON) backed by 11 automated test suites in GsSoC 2026.',
    problem: 'AI-assisted developer tools lack auditability and verifiable compliance records required by enterprise engineering teams.',
    approach: 'Engineered an immutable event logger and serialization pipeline supporting multiple structured output formats with zero-loss schema validation.',
    architecture: [
      'Audit Event Collector: Normalized schema capturing developer prompts, system responses, and timestamped actions.',
      'Export Serializers: Stream-based formatters for PDF document generation, RFC 4180 CSV tables, and structured JSON.',
      'Verification Suite: 11 automated unit and integration tests enforcing payload integrity.'
    ],
    highlights: [
      'Contributed compliance reporting and audit trails to the AI-dev-assistant repository.',
      'Delivered structured exports in PDF, CSV, and JSON formats.',
      'Authored 11 comprehensive automated tests ensuring zero regressions.'
    ],
    githubUrl: 'https://github.com/shagunpandeydev26-alt',
    featured: false
  }
];
