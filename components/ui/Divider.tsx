import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'accent' | 'strong';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  variant = 'subtle',
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        variant === 'subtle' && 'bg-white/5',
        variant === 'accent' && 'bg-luxury-accent/30',
        variant === 'strong' && 'bg-white/20',
        className
      )}
      {...props}
    />
  );
}
