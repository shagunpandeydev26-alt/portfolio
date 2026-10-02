export interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  type: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  projectsWorkedOn?: {
    name: string;
    description: string;
    contributions: string[];
    githubUrl?: string;
  }[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'gssoc-2026',
    year: '2026',
    period: 'May 2026 – July 2026',
    role: 'Open Source Contributor',
    organization: 'GirlScript Summer of Code (GsSoC 2026)',
    location: 'Remote',
    type: 'Open Source Program',
    technologies: ['TypeScript', 'JavaScript', 'Web Audio API', 'React', 'Node.js', 'ESLint', 'Jest / Testing'],
    summary: 'Contributed to high-impact production open-source codebases through core feature development, architectural refactoring, UI/UX polish, and rigorous automated testing.',
    highlights: [
      'Contributed to existing open-source codebases including Guitariz, PESiMENs, AI-dev-assistant, and Atelier through feature development, refactoring, and testing.',
      'Enhanced Guitariz with an interactive 88-key piano, scale mapping, Web Audio integration, and responsive UI improvements.',
      'Contributed to AI-dev-assistant by implementing compliance reporting and audit trails with PDF, CSV, and JSON exports, backed by 11 automated tests.',
      'Improved PESiMENs code quality by enforcing ESLint logging rules and removing debug statements; enhanced Atelier with a reusable, sanitized Markdown editor supporting Write/Preview and GitHub-Flavored Markdown.'
    ],
    projectsWorkedOn: [
      {
        name: 'Guitariz',
        description: 'Interactive music theory and instrument platform.',
        contributions: [
          'Engineered an interactive 88-key piano with realistic touch response',
          'Integrated Web Audio synthesis and modal musical scale mapping',
          'Delivered responsive UI improvements across touch and desktop'
        ],
        githubUrl: 'https://github.com/shagunpandeydev26-alt'
      },
      {
        name: 'AI-dev-assistant',
        description: 'Developer productivity tooling with compliance governance.',
        contributions: [
          'Engineered audit trail compliance reporting',
          'Built structured exports for PDF, CSV, and JSON formats',
          'Authored 11 comprehensive automated tests ensuring zero regressions'
        ],
        githubUrl: 'https://github.com/shagunpandeydev26-alt'
      },
      {
        name: 'PESiMENs',
        description: 'Institutional management and workflow platform.',
        contributions: [
          'Enforced strict ESLint logging rules across the codebase',
          'Cleaned and purged intrusive debug statements to enhance production performance'
        ],
        githubUrl: 'https://github.com/shagunpandeydev26-alt'
      },
      {
        name: 'Atelier',
        description: 'Creative studio and document authoring suite.',
        contributions: [
          'Architected a reusable, sanitized Markdown editor with side-by-side Write/Preview',
          'Added full support for GitHub-Flavored Markdown (tables, code blocks, task lists)'
        ],
        githubUrl: 'https://github.com/shagunpandeydev26-alt'
      }
    ]
  },
  {
    id: 'taskswap-2025',
    year: '2025',
    period: 'September 2025 – November 2025',
    role: 'Backend Developer Intern',
    organization: 'Taskswap',
    location: 'Kanpur, UP',
    type: 'Internship',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Google Firebase', 'REST APIs', 'JWT / Auth'],
    summary: 'Engineered stateless backend microservices and security identity architecture for a high-concurrency multi-tenant task distribution platform.',
    highlights: [
      'Developed stateless RESTful backend services using Node.js and MongoDB for a multi-tenant task distribution platform.',
      'Implemented authentication and identity-verification flows using token-based authentication integrated with Google Firebase.',
      'Collaborated with frontend engineers to define and integrate API contracts, coordinating data flow between backend services and clients.'
    ]
  }
];
