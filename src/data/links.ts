import { LinkRegistry } from '../types';

export const links: LinkRegistry = {
  // Verified Primary Profiles
  github: 'https://github.com/shivangi792004',
  linkedin: 'https://linkedin.com/in/shivangisingh04/',
  email: 'mailto:shivangisingh8688@gmail.com',
  phone: 'tel:+918688128210',
  resume: '/Shivangi_Singh_Resume.pdf',

  // Profile Links
  leetCode: 'https://leetcode.com/u/shivangi792004/',
  hackerRank: 'https://www.hackerrank.com/profile/shivangi792004',
  boardInfinityTraining: 'https://github.com/shivangi792004/DSA-C-Plus-Plus',

  // Projects Links
  hospCareGithub: 'https://github.com/shivangi792004/HospCare',
  hospCareLive: 'https://hosp-care-qoov.vercel.app/',
  mernBlogGithub: 'https://github.com/shivangi792004/mern-blog',
  mernBlogLive: 'https://mern-blog-jn6u.onrender.com',

  // Certification Verification Links
  certHackerRankSql: 'https://www.hackerrank.com/certificates/advanced-sql',
  certBoardInfinityDsa: 'https://www.boardinfinity.com/certificates/dsa-cpp',
  certCourseraCpp: 'https://www.coursera.org/account/accomplishments/verify',
};

export const getLink = (key: string): string | null => {
  return links[key] || null;
};

