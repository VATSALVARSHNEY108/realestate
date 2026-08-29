import React from 'react';
import { cn } from '@/lib/utils';

interface PropertyStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

export function PropertyStat({
  label,
  value,
  unit,
  icon,
  className,
  ...props
}: PropertyStatProps) {
  return (
    <div className={cn('flex flex-col space-y-1', className)} {...props}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted font-medium flex items-center gap-1.5">
        {icon && <span className="text-luxury-accent">{icon}</span>}
        {label}
      </span>
      <div className="flex items-baseline space-x-1">
        <span className="font-serif text-lg sm:text-xl text-luxury-primary font-normal">
          {value}
        </span>
        {unit && (
          <span className="text-xs text-luxury-muted font-sans uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
