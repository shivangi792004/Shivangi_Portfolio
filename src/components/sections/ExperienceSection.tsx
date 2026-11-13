import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { experience } from '../../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowDownRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const handleBadgeClick = (badgeName: string) => {
    window.dispatchEvent(
      new CustomEvent('select-skill', { detail: badgeName })
    );
  };

  return (
    <SectionContainer
      id="experience"
      title="Work Experience"
      subtitle="Professional industry contributions and production engineering experience."
    >
      <div className="space-y-6">
        {experience.map((item) => (
          <Card key={item.id} className="p-6 sm:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-border-light dark:border-border pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent-500" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {item.role}
                  </h3>
                </div>
                <p className="text-base font-semibold text-accent-600 dark:text-accent-400 mt-1">
                  {item.company}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  {item.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  {item.location}
                </span>
                {item.isRemote && (
                  <Badge variant="outline" size="sm">
                    Remote
                  </Badge>
                )}
              </div>
            </div>

            {/* Responsibilities & Achievements */}
            <ul className="space-y-3 mb-6" aria-label="Key responsibilities and achievements">
              {item.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-500 shrink-0 mt-1" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Badges with Click-to-Skill interaction */}
            <div className="pt-4 border-t border-border-light/70 dark:border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mr-2">
                  Technologies:
                </span>
                {item.techBadges.map((badge, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBadgeClick(badge)}
                    className="group"
                    title={`Click to view ${badge} in Skills Matrix`}
                    aria-label={`View ${badge} in Skills Matrix`}
                  >
                    <Badge
                      variant="default"
                      size="sm"
                      className="cursor-pointer hover:border-accent-500/60 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                      <span>{badge}</span>
                      <ArrowDownRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Badge>
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono italic">
                &bull; Click any badge to view evidence in Skills Matrix
              </span>
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
};
