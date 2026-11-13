import React, { useState, useMemo, useEffect } from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { skillCategories } from '../../data/skills';
import { SkillItem } from '../../types';
import { Search, Sparkles, CheckCircle, Info, X } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Languages',
  'Web',
  'Databases',
  'Tools & DevOps',
  'Core CS',
] as const;

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Listen for custom skill selection events (e.g. from Experience tech badges)
  useEffect(() => {
    const handleCustomSelect = (e: CustomEvent<string>) => {
      const skillName = e.detail;
      const allSkills = skillCategories.flatMap((c) => c.items);
      const match = allSkills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );
      if (match) {
        setSelectedCategory('All');
        setSelectedSkill(match);
        const section = document.getElementById('skills');
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('select-skill' as any, handleCustomSelect);
    return () =>
      window.removeEventListener('select-skill' as any, handleCustomSelect);
  }, []);

  // Enhanced search: searches both skill name AND verified project/experience context!
  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return skillCategories
      .filter((cat) =>
        selectedCategory === 'All' ? true : cat.category === selectedCategory
      )
      .flatMap((cat) =>
        cat.items.map((item) => ({ ...item, category: cat.category }))
      )
      .filter((item) => {
        if (!q) return true;
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesUsage = item.usedIn.some((u) => u.toLowerCase().includes(q));
        const matchesCategory = item.category.toLowerCase().includes(q);
        return matchesName || matchesUsage || matchesCategory;
      });
  }, [selectedCategory, searchQuery]);

  const toggleSkill = (skill: SkillItem) => {
    setSelectedSkill((prev) => (prev?.name === skill.name ? null : skill));
  };

  return (
    <SectionContainer
      id="skills"
      title="Technical Skills & Evidence"
      subtitle="Categorized technologies mapped strictly to where each was applied in production or projects."
    >
      <div className="space-y-8">
        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Chips */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter skills by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box with Clear Button */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search skill, project, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              className="w-full pl-9 pr-8 py-1.5 text-sm rounded-lg border border-border-light dark:border-border bg-surface-light dark:bg-surface text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label="Search skills or applications"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            return (
              <button
                key={skill.name}
                onClick={() => toggleSkill(skill)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 group ${
                  isSelected
                    ? 'border-accent-500 bg-accent-50/50 dark:bg-accent-950/40 ring-1 ring-accent-500'
                    : 'border-border-light dark:border-border bg-surface-light dark:bg-surface hover:border-accent-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
                aria-label={`View evidence for ${skill.name}`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {skill.category}
                  </span>
                  {isSelected && (
                    <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                  )}
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  {skill.usedIn.length} verified{' '}
                  {skill.usedIn.length === 1 ? 'usage' : 'usages'}
                </span>
              </button>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-zinc-600 dark:text-zinc-400 text-sm">
            No matching skills or projects found for "{searchQuery}".
          </div>
        )}

        {/* Contextual Evidence Card (Triggered on Click / Selection) */}
        <div className="mt-6">
          {selectedSkill ? (
            <Card className="border-accent-500/40 bg-accent-50/30 dark:bg-zinc-900/60 p-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-light dark:border-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-500" />
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Verified Application: {selectedSkill.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="sm">
                    Authentic Project Facts
                  </Badge>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1 rounded-md text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs flex items-center gap-1"
                    aria-label="Close evidence panel"
                  >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Documented Usage in Shivangi's Portfolio:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedSkill.usedIn.map((usage, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-light dark:bg-zinc-950 border border-border-light dark:border-border flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {usage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-border-light dark:border-border text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 bg-surface-muted-light/50 dark:bg-surface-muted/30">
              <Info className="w-4 h-4 text-accent-500 shrink-0" />
              <span>
                Click on any skill above to view verified project &amp; experience context where Shivangi applied it. Click again or use search to filter.
              </span>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};
