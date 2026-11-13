export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string | null;
  intro: string;
  heroHeading: string;
  heroText: string;
  openToOpportunities: boolean;
  badges: string[];
}

export interface LinkRegistry {
  github: string | null;
  linkedin: string | null;
  email: string | null;
  phone: string | null;
  resume: string | null;
  leetCode: string | null;
  hackerRank: string | null;
  boardInfinityTraining: string | null;
  hospCareGithub: string | null;
  hospCareLive: string | null;
  mernBlogGithub: string | null;
  mernBlogLive: string | null;
  certHackerRankSql: string | null;
  certBoardInfinityDsa: string | null;
  certCourseraCpp: string | null;
  [key: string]: string | null;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isRemote: boolean;
  bullets: string[];
  techBadges: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  stack: string;
  period: string;
  isTeamCapstone?: boolean;
  bullets: string[];
  tags: string[];
  githubUrlKey: string;
  liveUrlKey?: string;
  // Architecture and case study (optional - only render if present & non-empty)
  problem?: string;
  challenges?: string;
  learnings?: string;
  architectureNotes?: string;
  architectureNodes?: {
    client: string;
    api: string;
    auth: string;
    database: string;
  };
}

export interface SkillItem {
  name: string;
  usedIn: string[]; // List of projects or experience items where this skill was used
}

export interface SkillCategory {
  category: 'Languages' | 'Web' | 'Databases' | 'Tools & DevOps' | 'Core CS';
  items: SkillItem[];
}

export interface DSAStatistic {
  platform: 'LeetCode' | 'HackerRank' | 'Board Infinity';
  headline: string;
  value: number;
  suffix: string;
  secondaryLabel: string;
  periodLabel: string;
  details: string[];
  profileUrlKey: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  period: string;
  location: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  verifyUrlKey: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

