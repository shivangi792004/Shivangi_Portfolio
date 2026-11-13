import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { DsaSection } from './components/sections/DsaSection';
import { EducationSection } from './components/sections/EducationSection';
import { ContactSection } from './components/sections/ContactSection';
import { CommandPalette } from './components/stretch/CommandPalette';
import { InteractiveTerminal } from './components/stretch/InteractiveTerminal';

const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background text-zinc-900 dark:text-zinc-100 selection:bg-accent-500/20 selection:text-accent-400">
      {/* Accessible Skip to Content Link (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-accent-600 text-white rounded-lg shadow-xl font-semibold text-xs tracking-wide focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Sticky Blur Navbar with Controls */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Semantic Landmark Container */}
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. About & Journey */}
        <AboutSection />

        {/* 3. Work Experience */}
        <ExperienceSection />

        {/* 4. Skills & Contextual Evidence */}
        <SkillsSection />

        {/* 5. Featured Projects & Architecture */}
        <ProjectsSection />

        {/* 6. DSA & Achievements */}
        <DsaSection />

        {/* 7. Education & Certifications */}
        <EducationSection />

        {/* 8. Contact Form */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Stretch Feature 1: Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Stretch Feature 2: Interactive Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export default App;
