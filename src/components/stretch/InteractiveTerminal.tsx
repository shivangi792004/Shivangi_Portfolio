import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { profile } from '../../data/profile';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { skillCategories } from '../../data/skills';
import { links } from '../../data/links';
import { educationList } from '../../data/education';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
  'resume',
  'clear',
  'exit',
  'whoami',
  'date',
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-bold">
            Shivangi Singh [Interactive Portfolio Terminal v1.0]
          </p>
          <p className="text-xs text-zinc-400">
            Type <span className="text-accent-400 font-semibold">'help'</span> to see available commands. Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">Tab</kbd> for auto-complete.
          </p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const cmd = trimmed.toLowerCase();

    if (!cmd) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-zinc-400 uppercase tracking-wider font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
              <div><span className="text-accent-400 font-bold">about</span> - Background &amp; education summary</div>
              <div><span className="text-accent-400 font-bold">skills</span> - Categorized technical competencies</div>
              <div><span className="text-accent-400 font-bold">projects</span> - Production-grade full-stack projects</div>
              <div><span className="text-accent-400 font-bold">experience</span> - Professional engineering internship</div>
              <div><span className="text-accent-400 font-bold">contact</span> - Direct email &amp; profile links</div>
              <div><span className="text-accent-400 font-bold">resume</span> - Download official PDF resume</div>
              <div><span className="text-accent-400 font-bold">clear</span> - Clear terminal screen buffer</div>
              <div><span className="text-accent-400 font-bold">exit</span> - Close interactive terminal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="font-bold text-zinc-100">{profile.name} — {profile.title}</p>
            <p className="leading-relaxed text-zinc-400">{profile.intro}</p>
            <div className="pt-1 text-zinc-400">
              <span className="text-accent-400 font-semibold">Education: </span>
              {educationList[0].degree} ({educationList[0].grade}) &bull; {educationList[0].institution}
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="font-semibold text-zinc-100">Verified Technical Stack:</p>
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="pl-2">
                <span className="text-indigo-400 font-semibold">{cat.category}: </span>
                <span className="text-zinc-400">{cat.items.map((i) => i.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-3 text-xs text-zinc-300">
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-accent-500 pl-3 space-y-1">
                <p className="font-bold text-zinc-100">{p.title} — {p.subtitle} ({p.stack})</p>
                <ul className="list-disc list-inside text-zinc-400 space-y-0.5">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-emerald-500 pl-3 space-y-1">
                <p className="font-bold text-zinc-100">{exp.role} @ {exp.company}</p>
                <p className="text-[11px] text-zinc-500">{exp.period} &bull; {exp.location}</p>
                <ul className="list-disc list-inside text-zinc-400 space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-zinc-300">
            <p><span className="text-accent-400 font-semibold">Email: </span>{profile.email}</p>
            {profile.phone && <p><span className="text-emerald-400 font-semibold">Phone: </span>{profile.phone}</p>}
            {links.linkedin && <p><span className="text-sky-400 font-semibold">LinkedIn: </span>{links.linkedin}</p>}
            {links.github && <p><span className="text-zinc-400 font-semibold">GitHub: </span>{links.github}</p>}
          </div>
        );
        break;

      case 'resume':
        if (links.resume) {
          const a = document.createElement('a');
          a.href = links.resume;
          a.download = 'Shivangi_Singh_Resume.pdf';
          a.click();
        }
        output = (
          <p className="text-xs text-emerald-400">
            &check; Initiating download for Shivangi_Singh_Resume.pdf...
          </p>
        );
        break;

      case 'whoami':
        output = (
          <p className="text-xs text-zinc-300">
            Guest Recruiter / Engineering Leader exploring Shivangi Singh's Portfolio.
          </p>
        );
        break;

      case 'date':
        output = (
          <p className="text-xs text-zinc-300 font-mono">
            {new Date().toUTCString()}
          </p>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: {trimmed}. Type <span className="underline font-semibold">'help'</span> for a list of available commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete commands
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInput(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx =
        cmdIndex === -1 ? commandHistory.length - 1 : Math.max(cmdIndex - 1, 0);
      setCmdIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex === -1) return;
      if (cmdIndex < commandHistory.length - 1) {
        const nextIdx = cmdIndex + 1;
        setCmdIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else {
        setCmdIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive developer terminal"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Terminal Window */}
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm z-10 flex flex-col h-[520px] max-h-[85vh]">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-600 transition-colors"
              onClick={onClose}
              title="Close terminal"
            />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-zinc-400 font-medium ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-accent-400" />
              shivangi@portfolio:~ (zsh)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output Console Buffer */}
        <div
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-accent-400 font-semibold">
                    shivangi@portfolio:~$
                  </span>
                  <span className="text-zinc-100">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <div className="px-4 py-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-2">
          <span className="text-accent-400 text-xs sm:text-sm font-semibold shrink-0">
            shivangi@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
            aria-label="Terminal input prompt"
          />
          <button
            onClick={() => handleCommand(input)}
            className="text-zinc-500 hover:text-zinc-300 p-1"
            aria-label="Submit command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
