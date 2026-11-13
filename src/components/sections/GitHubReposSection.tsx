import React from 'react';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Github, Star, GitFork, ExternalLink, Code } from 'lucide-react';

export const GitHubReposSection: React.FC = () => {
  const { repos, isLoading, error } = useGitHubRepos();

  // Graceful degradation: Hide section completely if network or rate-limit fails
  if (error) {
    return null;
  }

  if (!isLoading && repos.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-border-light dark:border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Github className="w-5 h-5 text-accent-500" />
            <span>Latest Public Repositories</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Dynamic feed streamed from GitHub REST API (cached for performance).
          </p>
        </div>

        <a
          href="https://github.com/shivangi792004"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-accent-600 dark:text-accent-400 hover:underline flex items-center gap-1"
        >
          <span>View All on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {isLoading ? (
        // Skeleton Loaders
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border-light dark:border-border bg-surface-light dark:bg-surface animate-pulse space-y-3"
            >
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
              <div className="pt-2 flex gap-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Repos Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={`Open GitHub repository ${repo.name}`}
            >
              <Card
                variant="interactive"
                className="h-full flex flex-col justify-between p-5 group-hover:border-accent-500/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors truncate">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-accent-500 shrink-0" />
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {repo.description || 'Public GitHub source repository.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 pt-3 border-t border-border-light/70 dark:border-border/60">
                  {repo.language ? (
                    <Badge variant="outline" size="sm" className="text-[10px] py-0 px-2 font-mono">
                      <Code className="w-3 h-3 text-accent-500" />
                      {repo.language}
                    </Badge>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-3">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 font-mono">
                        <Star className="w-3 h-3 text-amber-500" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 font-mono">
                        <GitFork className="w-3 h-3 text-zinc-400" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

