import React from 'react';
import { ArrowRight, Sparkles, FileText, Mail } from 'lucide-react';
import { Container } from '../layout/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CodeEditorPreview } from '../visual/CodeEditorPreview';
import { profile } from '../../data/profile';
import { links } from '../../data/links';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Introduction and summary"
      className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-border-light/60 dark:border-border/60"
    >
      {/* Subtle Dot Matrix Background */}
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Authentic Profile Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Frontend Developer Intern @ Triwize
              </Badge>
              {profile.openToOpportunities && (
                <Badge variant="success" size="sm">
                  <Sparkles className="w-3 h-3" />
                  Open to opportunities
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
              {profile.heroHeading}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
              {profile.heroText}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="#projects" variant="primary" size="md">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="#contact" variant="secondary" size="md">
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </Button>
              {links.resume && (
                <Button
                  href={links.resume}
                  variant="outline"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Shivangi_Singh_Resume.pdf"
                  aria-label="Download Shivangi Singh Resume"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Code Editor Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CodeEditorPreview />
          </div>
        </div>
      </Container>
    </section>
  );
};

