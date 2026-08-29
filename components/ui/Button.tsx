import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-300 tracking-widest uppercase text-xs cursor-pointer select-none',
        variant === 'primary' && 'bg-luxury-accent text-luxury-bg hover:bg-luxury-accent-light shadow-lg hover:shadow-luxury-accent/20 border border-luxury-accent',
        variant === 'secondary' && 'border border-luxury-accent/40 text-luxury-primary hover:bg-luxury-accent/10 hover:border-luxury-accent',
        variant === 'text' && 'text-luxury-muted hover:text-luxury-primary p-0 tracking-widest underline-offset-8 hover:underline uppercase bg-transparent',
        variant === 'icon' && 'p-3 rounded-full border border-white/10 text-luxury-primary hover:border-luxury-accent hover:text-luxury-accent bg-luxury-surface/50',
        variant !== 'icon' && size === 'sm' && 'px-4 py-2 text-[10px]',
        variant !== 'icon' && size === 'md' && 'px-6 py-3 text-xs',
        variant !== 'icon' && size === 'lg' && 'px-8 py-4 text-xs',
        className
      )}
      {...props}
    >
      {icon && <span className={cn(children ? 'mr-2' : '')}>{icon}</span>}
      {children}
    </button>
  );
}
