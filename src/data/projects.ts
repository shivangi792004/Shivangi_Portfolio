import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'hospcare',
    title: 'HospCare',
    subtitle: 'Healthcare Management System',
    stack: 'MERN Stack',
    period: 'May 2026',
    bullets: [
      'Co-developed a full-stack platform connecting patients and doctors for appointment booking, scheduling and medical-record management.',
      'JWT authentication, bcrypt password hashing, role-based access for patients and doctors.',
      '12+ REST API endpoints; MongoDB schema of 4 collections, indexed for fast appointment lookups.',
    ],
    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'bcrypt',
      'REST APIs',
    ],
    githubUrlKey: 'hospCareGithub',
    liveUrlKey: 'hospCareLive',
    architectureNodes: {
      client: 'React.js Client Interface',
      api: 'Express.js REST API (12+ Endpoints)',
      auth: 'JWT & Role-Based Middleware',
      database: 'MongoDB (4 Indexed Collections)',
    },
    // Optional case study fields - left undefined/empty per rules (never invented)
  },
  {
    id: 'mern-blog',
    title: 'MERN Blog',
    subtitle: 'Full-Stack Blogging Platform',
    stack: 'MERN Stack & Tailwind CSS',
    period: 'Oct 2025',
    bullets: [
      'Users can create, edit, delete, browse and search posts.',
      'Express.js REST APIs, JWT authentication, bcryptjs password hashing.',
      'Protected routes with React Router; responsive React + Tailwind UI.',
      'Frontend and backend deployed as a single service on Render; MongoDB Atlas for storage.',
    ],
    tags: [
      'React.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'JWT',
      'Render',
    ],
    githubUrlKey: 'mernBlogGithub',
    liveUrlKey: 'mernBlogLive',
    architectureNodes: {
      client: 'React.js & Tailwind CSS UI',
      api: 'Express.js REST API Layer',
      auth: 'JWT & bcryptjs Auth Layer',
      database: 'MongoDB Atlas Cloud Database',
    },
  },
];

