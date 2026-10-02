export interface SkillCategory {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI / Machine Learning',
    shortLabel: 'AI / ML',
    description: 'Deep neural networks, reinforcement learning policies, vision pipelines, and RAG architectures.',
    skills: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'RAG',
      'Reinforcement Learning',
      'Neural Networks',
      'Computer Vision',
      'Scikit-learn',
      'Stable-Baselines3',
      'Streamlit'
    ],
    color: '#38bdf8'
  },
  {
    id: 'web',
    name: 'Web & Frontend Engineering',
    shortLabel: 'WEB',
    description: 'Component architecture, responsive state management, and high-fidelity interface design.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Redux Toolkit',
      'Next.js',
      'Tailwind CSS'
    ],
    color: '#60a5fa'
  },
  {
    id: 'backend',
    name: 'Backend & Cloud Systems',
    shortLabel: 'BACKEND',
    description: 'Stateless REST services, distributed task queues, token auth, and cloud databases.',
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'Google Firestore',
      'REST APIs'
    ],
    color: '#34d399'
  },
  {
    id: 'languages',
    name: 'Core Languages',
    shortLabel: 'LANGUAGES',
    description: 'Low-level systems programming, algorithms, mathematical computing, and data querying.',
    skills: [
      'C++',
      'C',
      'Python',
      'SQL'
    ],
    color: '#f59e0b'
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    shortLabel: 'DATABASES',
    description: 'Document and relational paradigms, indexing, transactional integrity, and cloud persistence.',
    skills: [
      'MongoDB',
      'MySQL',
      'Google Firestore'
    ],
    color: '#ec4899'
  },
  {
    id: 'tools',
    name: 'Developer Tools & Workflows',
    shortLabel: 'TOOLS',
    description: 'Version control, developer environments, CI pipelines, and AI engineering tools.',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'IntelliJ IDEA',
      'Claude'
    ],
    color: '#a78bfa'
  },
  {
    id: 'blockchain',
    name: 'Blockchain Development',
    shortLabel: 'BLOCKCHAIN',
    description: 'Decentralized state machines, EVM smart contracts, and Web3 paradigms.',
    skills: [
      'Solidity',
      'Ethereum'
    ],
    color: '#2dd4bf'
  }
];
