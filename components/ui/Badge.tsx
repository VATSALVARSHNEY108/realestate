import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'outline' | 'surface';
  children: React.ReactNode;
}

export function Badge({
  variant = 'gold',
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-medium border transition-colors',
        variant === 'gold' && 'bg-luxury-accent/10 border-luxury-accent/30 text-luxury-accent',
        variant === 'outline' && 'border-white/10 text-luxury-muted bg-transparent',
        variant === 'surface' && 'bg-luxury-surface border-white/5 text-luxury-primary',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
