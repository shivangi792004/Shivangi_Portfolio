import React from 'react';
import { journeyMilestones } from '../../data/education';
import { Badge } from '../ui/Badge';

export const JourneyTimeline: React.FC = () => {
  return (
    <div className="relative border-l-2 border-border-light dark:border-border ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10 my-8">
      {journeyMilestones.map((item, index) => (
        <div key={index} className="relative group">
          {/* Timeline Dot Indicator */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
            <span className="h-3.5 w-3.5 rounded-full bg-surface-light dark:bg-surface border-2 border-accent-500 group-hover:scale-125 transition-transform" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <span className="font-mono text-xs font-semibold text-accent-600 dark:text-accent-400">
              {item.year}
            </span>
            <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h4>
            <Badge variant="outline" size="sm" className="w-fit text-[11px]">
              {item.tag}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

