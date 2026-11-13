import React from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  subtitle,
  children,
  className,
  ...props
}) => {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn('py-16 md:py-24 border-b border-border-light/60 dark:border-border/60 transition-colors', className)}
      {...props}
    >
      <Container>
        {title && (
          <div className="mb-12">
            <h2
              id={`${id}-heading`}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
                {subtitle}
              </p>
            )}
            <div className="mt-4 h-0.5 w-12 bg-accent-500 rounded-full" />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

