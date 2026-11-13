import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileText, Terminal, Command, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Button } from '../ui/Button';
import { links } from '../../data/links';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'DSA', href: '#dsa', id: 'dsa' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenTerminal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = useScrollSpy(
    NAV_ITEMS.map((item) => item.id),
    120
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        isScrolled
          ? 'bg-background-light/85 dark:bg-background/85 backdrop-blur-md border-b border-border-light/70 dark:border-border/70 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={handleBrandClick}
          className="group flex items-center gap-2 font-mono text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-accent-500 transition-colors"
          aria-label="Shivangi Singh Portfolio Home - Scroll to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            S
          </span>
          <span className="hidden sm:inline font-sans font-bold">Shivangi Singh</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative',
                  isActive
                    ? 'text-accent-600 dark:text-accent-400 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Command Palette Trigger Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-border-light dark:border-border"
            aria-label="Open command palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="text-[10px] font-mono text-zinc-500 px-1 py-0.2 rounded bg-surface-light dark:bg-zinc-900 border border-border-light dark:border-border">
              ⌘K
            </kbd>
          </button>

          {/* Terminal Trigger Button */}
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Open interactive developer terminal"
            title="Open Interactive Terminal"
          >
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {/* Resume CTA */}
          {links.resume && (
            <Button
              href={links.resume}
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex text-xs"
              target="_blank"
              rel="noopener noreferrer"
              download="Shivangi_Singh_Resume.pdf"
              aria-label="Download Shivangi Singh Resume"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </Button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg md:hidden text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-light dark:border-border bg-surface-light dark:bg-surface px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  activeSection === item.id
                    ? 'bg-accent-50 text-accent-700 dark:bg-accent-950/40 dark:text-accent-300 font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-border-light dark:border-border flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-border-light dark:border-border bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Search className="h-3.5 w-3.5 text-accent-500" />
              <span>Quick Command Search (⌘K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-border-light dark:border-border bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Terminal className="h-3.5 w-3.5 text-emerald-500" />
              <span>Open Interactive Terminal</span>
            </button>
            {links.resume && (
              <Button
                href={links.resume}
                variant="primary"
                size="sm"
                className="w-full justify-center text-xs"
                target="_blank"
                rel="noopener noreferrer"
                download="Shivangi_Singh_Resume.pdf"
              >
                <FileText className="h-3.5 w-3.5 mr-2" />
                View Resume (PDF)
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
