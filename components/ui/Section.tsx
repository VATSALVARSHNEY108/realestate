import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
}

export function Section({
  children,
  className,
  spacing = 'lg',
  bordered = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative w-full',
        spacing === 'none' && 'py-0',
        spacing === 'sm' && 'py-12 sm:py-16',
        spacing === 'md' && 'py-16 sm:py-24',
        spacing === 'lg' && 'py-24 sm:py-32',
        spacing === 'xl' && 'py-32 sm:py-44',
        bordered && 'border-b border-white/5',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
