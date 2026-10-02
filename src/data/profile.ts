export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  expectedGraduation: string;
  gpa: string;
  fundamentals: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  headline: string;
  statement: string;
  bio: string[];
  education: Education;
  stats: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
}

export const profileData: Profile = {
  name: 'Shagun Pandey',
  title: 'Software Engineer & AI/ML Developer',
  location: 'Kanpur, Uttar Pradesh, India',
  phone: '+91-9335855411',
  email: 'shagunpandeydev.2004@gmail.com',
  githubUrl: 'https://github.com/shagunpandeydev26-alt',
  linkedinUrl: 'https://linkedin.com/in/shagun',
  headline: 'Building intelligent systems and interactive digital experiences.',
  statement: 'I BUILD SYSTEMS THAT MOVE.',
  bio: [
    'I am an engineer focused on the intersection of modern full-stack systems, deep learning architectures, and creative interface engineering.',
    'Currently pursuing my Bachelor of Technology at Harcourt Butler Technical University (HBTU), Kanpur, alongside rigorous work in distributed backend services, reinforcement learning, biometric computer vision, and high-performance web applications.',
    'From shipping production-ready RESTful services with Node.js and MongoDB to engineering liveness-detection pipelines with ArcFace and MiniFASNet, I build software that is mathematically sound, architecturally clean, and aesthetically refined.'
  ],
  education: {
    institution: 'Harcourt Butler Technical University',
    degree: 'Bachelor of Technology',
    field: 'Chemical Engineering',
    location: 'Kanpur, Uttar Pradesh',
    period: 'June 2024 – Present',
    expectedGraduation: 'June 2028',
    gpa: '7.28 / 10.00',
    fundamentals: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming (OOPs)',
      'Database Management Systems (DBMS)',
      'Operating Systems (OS)',
      'Computer Networks (CN)'
    ]
  },
  stats: [
    { label: 'LeetCode Rating', value: '1875', sublabel: 'Knight · Top 5.45% Globally' },
    { label: 'Contest Global Rank', value: '579', sublabel: 'LeetCode Weekly Contest 515' },
    { label: 'Biometric Verification', value: '97.98%', sublabel: 'Accuracy on LFW Benchmark' },
    { label: 'Academic Standing', value: '7.28', sublabel: 'GPA at HBTU Kanpur' }
  ]
};
