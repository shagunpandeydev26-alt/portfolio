export interface Achievement {
  id: string;
  title: string;
  category: 'Competitive Programming' | 'Hackathon' | 'Award' | 'Robotics';
  organization: string;
  date: string;
  statNumber?: string;
  statLabel?: string;
  highlight: string;
  details: string;
  scale?: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'leetcode-knight',
    title: 'Knight at LeetCode',
    category: 'Competitive Programming',
    organization: 'LeetCode',
    date: '2025 – 2026',
    statNumber: '1875',
    statLabel: 'Max Contest Rating',
    scale: 'Top 5.45% Globally',
    highlight: 'Earned the prestigious Knight badge, placing in the top 5.45% of competitive programmers worldwide.',
    details: 'Demonstrated mastery across advanced algorithmic techniques including Dynamic Programming, Graph Theory, Segment Trees, and Greedy Paradigms under high-pressure timed contests.'
  },
  {
    id: 'icpc-algoqueen',
    title: 'World Finalist, ICPC Algoqueen',
    category: 'Competitive Programming',
    organization: 'ICPC (International Collegiate Programming Contest)',
    date: '2026',
    statNumber: 'Finalist',
    statLabel: 'Global Tier',
    scale: 'International Collegiate Finalist',
    highlight: 'Selected as World Finalist for ICPC Algoqueen 2026 representing HBTU.',
    details: 'Competed in algorithmic challenges under ICPC standards testing computational problem solving and time complexity optimization.'
  },
  {
    id: 'leetcode-wc-515',
    title: 'Global Rank 579',
    category: 'Competitive Programming',
    organization: 'LeetCode Weekly Contest 515',
    date: '2026',
    statNumber: '579',
    statLabel: 'Worldwide Rank',
    scale: 'Thousands of global contestants',
    highlight: 'Achieved Global Rank 579 in LeetCode Weekly Contest 515.',
    details: 'Solved high-difficulty algorithmic problems under timed competitive constraints.'
  },
  {
    id: 'leetcode-wc-513',
    title: 'Global Rank 597',
    category: 'Competitive Programming',
    organization: 'LeetCode Weekly Contest 513',
    date: '2026',
    statNumber: '597',
    statLabel: 'Worldwide Rank',
    scale: 'Thousands of global contestants',
    highlight: 'Achieved Global Rank 597 in LeetCode Weekly Contest 513.',
    details: 'Demonstrated rapid analytical problem solving and efficient code execution.'
  },
  {
    id: 'oscodex-hbtu',
    title: '1st Place Winner',
    category: 'Hackathon',
    organization: 'OSCodeX HBTU × Technika ’25 Technical Hackathon',
    date: '2025',
    statNumber: '1st',
    statLabel: 'Championship Trophy',
    scale: 'Outcompeted 30+ regional selection teams',
    highlight: 'Secured 1st Place out of 30+ regional selection teams at OSCodeX HBTU × Technika ’25.',
    details: 'Engineered a full-stack technical solution with robust architecture, meeting demanding evaluation criteria from industry judges.'
  },
  {
    id: 'robosoccer-blitz',
    title: '1st Place Champion',
    category: 'Robotics',
    organization: 'RoboSoccer Blitz, Resonance ’25 (in collab with IEEE STB HBTU)',
    date: '2025',
    statNumber: '1st',
    statLabel: 'Winner',
    scale: 'Out of 50+ qualified entries',
    highlight: 'Won 1st Place in RoboSoccer Blitz at Resonance ’25 organized with IEEE STB HBTU.',
    details: 'Engineered high-speed wireless hardware-software control algorithms and responsive maneuvering mechanisms.'
  },
  {
    id: 'bitnbuild-up',
    title: '2nd Runner-Up, UP Regionals',
    category: 'Hackathon',
    organization: 'BitNBuild ’25 (Global Hackathon initiative organized by GDSC)',
    date: '2025',
    statNumber: 'Top 3',
    statLabel: 'Regional Podium',
    scale: 'Out of 250+ competing teams',
    highlight: 'Placed 2nd Runner-Up across the entire Uttar Pradesh region in BitNBuild ’25.',
    details: 'Delivered an innovative product prototype solving real-world challenges, recognized by Google Developer Student Clubs.'
  },
  {
    id: 'sih-internals',
    title: '2nd Runner-Up (Overall) & 1st Runner-Up (Healthcare)',
    category: 'Hackathon',
    organization: 'Smart India Hackathon (SIH) ’25 Internals',
    date: '2025',
    statNumber: 'Dual',
    statLabel: 'Podium Honors',
    scale: 'Out of 150+ university teams',
    highlight: 'Earned 2nd Runner-Up Overall and 1st Runner-Up in the Healthcare Track at SIH ’25 Internals.',
    details: 'Developed a healthcare system prototype focusing on secure data architecture and user-friendly diagnostics accessibility.'
  },
  {
    id: 'kodekalesh',
    title: '2nd Runner-Up',
    category: 'Hackathon',
    organization: 'Kodekalesh ’25 — National Level Hackathon (IDEAKode × GDG HBTU)',
    date: '2025',
    statNumber: 'Top 3',
    statLabel: 'National Finalist',
    scale: 'Out of 250+ participating teams',
    highlight: 'Achieved 2nd Runner-Up in national-level hackathon organized by IDEAKode × GDG HBTU.',
    details: 'Collaborated on end-to-end rapid prototyping under 24-hour sprint conditions.'
  },
  {
    id: 'women-who-master',
    title: 'Semi-Finalist',
    category: 'Hackathon',
    organization: 'Women Who Master Hackathon’26 (Aspire For Her × Logitech)',
    date: '2026',
    statNumber: 'Semi',
    statLabel: 'Finalist',
    scale: 'National competitive selection',
    highlight: 'Selected as Semi Finalist in the Women Who Master Hackathon’26.',
    details: 'Recognized for impactful technology design supporting accessibility and digital equity.'
  }
];
