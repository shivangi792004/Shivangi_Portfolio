import { useState, useEffect } from 'react';
import { GitHubRepo } from '../types';

const GITHUB_USERNAME = 'shivangi792004';
const CACHE_KEY = `gh_repos_${GITHUB_USERNAME}`;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in ms

interface CachedData {
  timestamp: number;
  data: GitHubRepo[];
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      // 1. Check sessionStorage cache first
      try {
        const cachedStr = sessionStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached: CachedData = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < CACHE_DURATION) {
            if (isMounted) {
              setRepos(cached.data);
              setIsLoading(false);
            }
            return;
          }
        }
      } catch (e) {
        // Ignore storage parse issues and proceed to fetch
      }

      // 2. Fetch fresh data from GitHub REST API
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned status ${response.status}`);
        }

        const data: any[] = await response.json();
        const formattedRepos: GitHubRepo[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          html_url: item.html_url,
          language: item.language,
          stargazers_count: item.stargazers_count,
          forks_count: item.forks_count,
          updated_at: item.updated_at,
        }));

        if (isMounted) {
          setRepos(formattedRepos);
          setIsLoading(false);
          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), data: formattedRepos })
            );
          } catch (e) {
            // Ignore storage quota errors
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Failed to load GitHub repositories');
          setIsLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { repos, isLoading, error };
}

