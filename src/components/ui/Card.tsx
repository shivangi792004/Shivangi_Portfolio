import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'flat';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-surface-light dark:bg-surface border border-border-light dark:border-border rounded-xl p-6 shadow-sm',
    interactive:
      'bg-surface-light dark:bg-surface border border-border-light dark:border-border rounded-xl p-6 shadow-sm hover:border-accent-500/50 hover:shadow-md transition-all duration-200 group',
    flat:
      'bg-surface-muted-light dark:bg-surface-muted border border-border-light/80 dark:border-border/80 rounded-xl p-6',
  };

  return (
    <div className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};

