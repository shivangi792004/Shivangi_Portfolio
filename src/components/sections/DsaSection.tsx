import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { dsaStats } from '../../data/dsa';
import { links } from '../../data/links';
import { Trophy, Code2, Award, ExternalLink, CheckCircle } from 'lucide-react';

export const DsaSection: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'LeetCode':
        return <Code2 className="w-6 h-6 text-amber-500" />;
      case 'HackerRank':
        return <Award className="w-6 h-6 text-emerald-500" />;
      default:
        return <Trophy className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <SectionContainer
      id="dsa"
      title="DSA & Achievements"
      subtitle="Algorithmic problem-solving milestones, competitive ratings, and intensive technical training."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dsaStats.map((stat, idx) => {
            const profileUrl = links[stat.profileUrlKey];

            return (
              <Card
                key={idx}
                className="flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 w-fit">
                      {getIcon(stat.platform)}
                    </div>
                    <Badge variant="outline" size="sm" className="text-[11px] font-mono">
                      {stat.platform}
                    </Badge>
                  </div>

                  {/* Animated Counter with Static Authenticity */}
                  <div className="my-4">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                      {stat.headline}
                    </p>
                    <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight flex items-baseline gap-1">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={1200}
                      />
                    </div>
                    <p className="text-sm font-semibold text-accent-600 dark:text-accent-400 mt-1.5">
                      {stat.secondaryLabel}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {stat.periodLabel}
                    </p>
                  </div>

                  {/* Details List */}
                  <ul className="space-y-2 mt-6 pt-4 border-t border-border-light dark:border-border">
                    {stat.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-accent-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Profile Verification Link (Rendered strictly if non-null) */}
                {profileUrl && (
                  <div className="mt-6 pt-4 border-t border-border-light/70 dark:border-border/60">
                    <Button
                      href={profileUrl}
                      variant="outline"
                      size="sm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-xs"
                      aria-label={`View ${stat.platform} verified profile`}
                    >
                      <span>View {stat.platform} Profile</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Note on data integrity */}
        <div className="text-center">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            &bull; All milestone numbers are static and strictly verified. No simulated or live scraping scripts.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

