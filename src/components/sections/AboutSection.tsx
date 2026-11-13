import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { JourneyTimeline } from '../visual/JourneyTimeline';
import { profile } from '../../data/profile';
import { Card } from '../ui/Card';
import { Code2, Compass, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <SectionContainer
      id="about"
      title="About Shivangi"
      subtitle="Background, engineering focus, and progressive milestone journey."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic Bio & Philosophy */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed text-base space-y-4">
            <p className="font-medium text-zinc-900 dark:text-zinc-100 text-lg leading-snug">
              {profile.intro}
            </p>
          </Card>

          {/* Quick Focus Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Card variant="flat" className="p-4 space-y-2">
              <Code2 className="w-5 h-5 text-accent-500" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Frontend Focus
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                React.js, Tailwind, component architecture, and responsive design.
              </p>
            </Card>

            <Card variant="flat" className="p-4 space-y-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Full-Stack Systems
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Node.js, Express.js REST APIs, JWT authentication &amp; MongoDB.
              </p>
            </Card>

            <Card variant="flat" className="p-4 space-y-2">
              <Compass className="w-5 h-5 text-sky-500" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Core Foundations
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Strong DSA problem solving, OOP design, and database modeling.
              </p>
            </Card>
          </div>
        </div>

        {/* Right Column: Real Milestone Journey Timeline */}
        <div className="lg:col-span-6">
          <div className="border border-border-light dark:border-border rounded-xl p-6 sm:p-8 bg-surface-light dark:bg-surface shadow-sm">
            <div className="flex items-center justify-between border-b border-border-light dark:border-border pb-4 mb-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>Milestone Journey</span>
              </h3>
              <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">2022 &rarr; 2026</span>
            </div>
            <JourneyTimeline />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

