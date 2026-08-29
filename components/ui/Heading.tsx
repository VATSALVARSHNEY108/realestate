import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  serif?: boolean;
}

export function Heading({
  level = 'h2',
  children,
  serif = true,
  className,
  ...props
}: HeadingProps) {
  const baseClasses = cn(
    serif ? 'font-serif font-normal' : 'font-sans font-medium',
    'text-luxury-primary tracking-wide leading-tight'
  );

  if (level === 'display') {
    return (
      <h1
        className={cn(baseClasses, 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight', className)}
        {...props}
      >
        {children}
      </h1>
    );
  }

  if (level === 'h1') {
    return (
      <h1
        className={cn(baseClasses, 'text-3xl sm:text-5xl md:text-6xl', className)}
        {...props}
      >
        {children}
      </h1>
    );
  }

  if (level === 'h2') {
    return (
      <h2
        className={cn(baseClasses, 'text-2xl sm:text-4xl md:text-5xl', className)}
        {...props}
      >
        {children}
      </h2>
    );
  }

  if (level === 'h3') {
    return (
      <h3
        className={cn(baseClasses, 'text-xl sm:text-2xl md:text-3xl', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }

  return (
    <h4
      className={cn(baseClasses, 'text-lg sm:text-xl', className)}
      {...props}
    >
      {children}
    </h4>
  );
}
