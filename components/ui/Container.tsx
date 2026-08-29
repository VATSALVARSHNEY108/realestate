import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({
  children,
  className,
  clean = false,
  size = 'lg',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12',
        clean ? 'p-0 max-w-none' : '',
        !clean && size === 'sm' && 'max-w-4xl',
        !clean && size === 'md' && 'max-w-6xl',
        !clean && size === 'lg' && 'max-w-7xl',
        !clean && size === 'xl' && 'max-w-[96rem]',
        !clean && size === 'full' && 'max-w-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
