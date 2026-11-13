import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Sun,
  Moon,
  Compass,
  ArrowRight,
  Code,
  Terminal,
} from 'lucide-react';
import { links } from '../../data/links';
import { profile } from '../../data/profile';
import { useTheme } from '../../hooks/useTheme';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'External Profiles' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About & Journey',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-experience',
      title: 'Work Experience (Triwize)',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Skills Matrix',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects (HospCare & MERN Blog)',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-dsa',
      title: 'DSA & Achievements',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('dsa'),
    },
    {
      id: 'nav-education',
      title: 'Education & Certifications',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('education'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Shivangi',
      category: 'Navigation',
      icon: <Compass className="w-4 h-4 text-accent-500" />,
      action: () => scrollToSection('contact'),
    },

    // Actions
    {
      id: 'act-terminal',
      title: 'Open Interactive Terminal',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'act-resume',
      title: 'Download Resume (PDF)',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-indigo-500" />,
      action: () => {
        onClose();
        if (links.resume) {
          const a = document.createElement('a');
          a.href = links.resume;
          a.download = 'Shivangi_Singh_Resume.pdf';
          a.click();
        }
      },
    },
    {
      id: 'act-theme',
      title: `Toggle Theme (${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`,
      category: 'Actions',
      icon:
        theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-500" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-500" />
        ),
      action: () => {
        toggleTheme();
        onClose();
      },
    },

    // External Profiles
    ...(links.github
      ? [
          {
            id: 'ext-github',
            title: 'GitHub Profile (shivangi792004)',
            category: 'External Profiles' as const,
            icon: <Code className="w-4 h-4 text-zinc-400" />,
            action: () => {
              window.open(links.github!, '_blank', 'noopener,noreferrer');
              onClose();
            },
          },
        ]
      : []),
    ...(links.linkedin
      ? [
          {
            id: 'ext-linkedin',
            title: 'LinkedIn Profile',
            category: 'External Profiles' as const,
            icon: <ExternalLink className="w-4 h-4 text-sky-500" />,
            action: () => {
              window.open(links.linkedin!, '_blank', 'noopener,noreferrer');
              onClose();
            },
          },
        ]
      : []),
    {
      id: 'ext-email',
      title: `Send Email to ${profile.email}`,
      category: 'External Profiles',
      icon: <Mail className="w-4 h-4 text-accent-500" />,
      action: () => {
        window.location.href = links.email || `mailto:${profile.email}`;
        onClose();
      },
    },
    ...(profile.phone
      ? [
          {
            id: 'ext-phone',
            title: `Call Phone / WhatsApp (${profile.phone})`,
            category: 'External Profiles' as const,
            icon: <Phone className="w-4 h-4 text-emerald-500" />,
            action: () => {
              window.location.href = `tel:+${profile.phone?.replace(/\D/g, '')}`;
              onClose();
            },
          },
        ]
      : []),
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Ensure selected item is scrolled into view
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface border border-border-light dark:border-border rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-light dark:border-border gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
            aria-autocomplete="list"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-border-light dark:border-border">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 space-y-1"
          role="listbox"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-600 dark:text-zinc-400">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors text-left ${
                    isSelected
                      ? 'bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span>{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-accent-500" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border-light/70 dark:border-border/60 bg-surface-muted-light dark:bg-zinc-900/40 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
          </div>
          <span>Ctrl/Cmd+K</span>
        </div>
      </div>
    </div>
  );
};
