import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Container } from './Container';
import { links } from '../../data/links';
import { profile } from '../../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border-light dark:border-border bg-surface-muted-light dark:bg-background py-12 transition-colors">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {profile.name}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              {profile.title} &bull; {profile.location}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {links.email && (
              <a
                href={links.email}
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium ml-2"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-light/70 dark:border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 gap-2">
          <p>&copy; {currentYear} Shivangi Singh. All rights reserved.</p>
          <p>Built with React, TypeScript & Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
};

