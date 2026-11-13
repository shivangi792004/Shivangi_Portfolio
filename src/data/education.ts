import { EducationItem, CertificationItem, JourneyMilestone } from '../types';

export const educationList: EducationItem[] = [
  {
    institution: 'Lovely Professional University',
    degree: 'B.Tech in Computer Science and Engineering',
    grade: 'CGPA: 7.9 / 10',
    period: 'Aug 2022 - Jun 2026',
    location: 'Punjab, India',
  },
  {
    institution: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (Class XII) - Science Stream',
    grade: 'Score: 86%',
    period: 'Apr 2021 - Mar 2022',
    location: 'Hyderabad, India',
  },
];

export const certificationsList: CertificationItem[] = [
  {
    title: 'Advanced SQL',
    issuer: 'HackerRank',
    date: 'Feb 2025',
    verifyUrlKey: 'certHackerRankSql',
  },
  {
    title: 'Data Structures and Algorithms with C++',
    issuer: 'Board Infinity',
    date: 'Jul 2024',
    verifyUrlKey: 'certBoardInfinityDsa',
  },
  {
    title: 'Programming in C++: A Hands-on Introduction',
    issuer: 'Coursera',
    date: 'Feb 2024',
    verifyUrlKey: 'certCourseraCpp',
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2022',
    title: 'Computer Science & Engineering at LPU',
    description:
      'Began B.Tech in CSE at Lovely Professional University, building foundational knowledge in algorithms, OOP, and systems.',
    tag: 'Academic Milestone',
  },
  {
    year: '2024',
    title: 'DSA Training & C++ Library System',
    description:
      'Completed 60+ hours with Board Infinity, solving 100+ problems and engineering a file I/O C++ library management system.',
    tag: 'Algorithmic Mastery',
  },
  {
    year: '2025',
    title: 'MERN Full-Stack Blog Platform',
    description:
      'Engineered an authenticated blogging platform with REST APIs, JWT, and cloud deployment on Render + MongoDB Atlas.',
    tag: 'Full-Stack Project',
  },
  {
    year: '2026',
    title: 'HospCare Healthcare Platform',
    description:
      'Co-developed a comprehensive healthcare management system featuring 12+ APIs, 4 indexed collections, and role-based access.',
    tag: 'Full-Stack Engineering',
  },
  {
    year: '2026',
    title: 'Frontend Developer Intern @ Triwize',
    description:
      'Architecting responsive trip-planning UI in React and Tailwind, converting Figma specs to modular components, and integrating live travel APIs.',
    tag: 'Industry Experience',
  },
];

