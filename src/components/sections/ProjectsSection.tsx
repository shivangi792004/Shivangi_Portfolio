import React, { useState } from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ArchitectureFlow } from '../visual/ArchitectureFlow';
import { GitHubReposSection } from './GitHubReposSection';
import { projects } from '../../data/projects';
import { links } from '../../data/links';
import { ProjectItem } from '../../types';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] =
    useState<ProjectItem | null>(null);

  const tags = ['All', 'MERN Stack'];

  const filteredProjects = projects.filter((project) => {
    if (selectedTag === 'All') return true;
    if (selectedTag === 'MERN Stack') return project.stack.includes('MERN');
    return true;
  });

  return (
    <SectionContainer
      id="projects"
      title="Featured Projects"
      subtitle="Production-grade full-stack architectures built with security, data integrity, and clean UX."
    >
      <div className="space-y-8">
        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2" role="tablist">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              role="tab"
              aria-selected={selectedTag === tag}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const githubUrl = links[project.githubUrlKey];
            const liveUrl = project.liveUrlKey ? links[project.liveUrlKey] : null;

            return (
              <Card
                key={project.id}
                variant="interactive"
                className="flex flex-col justify-between p-6 sm:p-8"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-accent-600 dark:text-accent-400 mt-1">
                        {project.subtitle} &bull; {project.period}
                      </p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 my-6">
                    {project.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 my-6">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-border-light dark:border-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {githubUrl && (
                      <Button
                        href={githubUrl}
                        variant="outline"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} code on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </Button>
                    )}
                    {liveUrl && (
                      <Button
                        href={liveUrl}
                        variant="primary"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </Button>
                    )}
                  </div>

                  <Button
                    onClick={() => setActiveModalProject(project)}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    aria-label={`View architecture details for ${project.title}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Deep Dive &amp; Architecture</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Dynamic GitHub Repositories Feed with Graceful Fallback */}
        <GitHubReposSection />
      </div>

      {/* Architecture & Case Study Detail Modal */}
      {activeModalProject && (
        <Modal
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
          title={`${activeModalProject.title} — System Architecture`}
        >
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-600 dark:text-accent-400 font-semibold">
                {activeModalProject.subtitle} &bull; {activeModalProject.stack}
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                Co-engineered with strict full-stack boundaries, robust data validation, and role-based security.
              </p>
            </div>

            {/* Architecture Flow SVG / Component */}
            {activeModalProject.architectureNodes && (
              <ArchitectureFlow
                client={activeModalProject.architectureNodes.client}
                api={activeModalProject.architectureNodes.api}
                auth={activeModalProject.architectureNodes.auth}
                database={activeModalProject.architectureNodes.database}
              />
            )}

            {/* Technical Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent-500" />
                <span>Verified Engineering Implementation</span>
              </h4>
              <ul className="space-y-2">
                {activeModalProject.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Case Study Fields: Only Render if Present & Non-Empty */}
            {activeModalProject.problem && (
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase text-zinc-500">Problem</h5>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{activeModalProject.problem}</p>
              </div>
            )}
            {activeModalProject.challenges && (
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase text-zinc-500">Challenges</h5>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{activeModalProject.challenges}</p>
              </div>
            )}
            {activeModalProject.learnings && (
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase text-zinc-500">Learnings</h5>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{activeModalProject.learnings}</p>
              </div>
            )}
            {activeModalProject.architectureNotes && (
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase text-zinc-500">Architecture Notes</h5>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{activeModalProject.architectureNotes}</p>
              </div>
            )}

            {/* Modal Footer Links */}
            <div className="pt-4 border-t border-border-light dark:border-border flex items-center justify-end gap-3">
              {links[activeModalProject.githubUrlKey] && (
                <Button
                  href={links[activeModalProject.githubUrlKey]}
                  variant="outline"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </Button>
              )}
              {activeModalProject.liveUrlKey && links[activeModalProject.liveUrlKey] && (
                <Button
                  href={links[activeModalProject.liveUrlKey]}
                  variant="primary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Application</span>
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </SectionContainer>
  );
};

