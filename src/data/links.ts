import { LinkRegistry } from '../types';

export const links: LinkRegistry = {
  // Verified Primary Profiles
  github: 'https://github.com/shivangi792004',
  linkedin: 'https://linkedin.com/in/shivangisingh04/',
  email: 'mailto:shivangisingh8688@gmail.com',
  phone: 'tel:+918688128210',
  resume: '/Shivangi_Singh_Resume.pdf',

  // Profile Links
  leetCode: 'https://leetcode.com/u/shivangisingh8688/',
  hackerRank: 'https://www.hackerrank.com/profile/shivangisingh861',
  boardInfinityTraining: 'https://github.com/shivangi792004/Library_Management_System',

  // Projects Links
  hospCareGithub: 'https://github.com/shivangi792004/HospCare',
  hospCareLive: 'https://hosp-care-qoov.vercel.app/',
  mernBlogGithub: 'https://github.com/shivangi792004/mern-blog',
  mernBlogLive: 'https://mern-blog-jn6u.onrender.com',

  // Certification Verification Links (Authentic credentials from CV)
  certHackerRankSql: 'https://www.hackerrank.com/certificates/f73d0f19c2e5',
  certBoardInfinityDsa: 'https://drive.google.com/file/d/1ncsMsxQX8utXM8ANN9p8MlPsrldCTCCI/view?usp=sharing',
  certCourseraCpp: 'https://drive.google.com/file/d/1k2Ld4nNX4vwpJ-UcQ99sH7QVBAeuuIHM/view?usp=sharing',
};

export const getLink = (key: string): string | null => {
  return links[key] || null;
};

