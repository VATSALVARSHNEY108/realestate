import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'wide';
  priority?: boolean;
  sizes?: string;
}

export function ImageWrapper({
  src,
  alt,
  aspectRatio = 'video',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  ...props
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-luxury-card group',
        aspectRatio === 'square' && 'aspect-square',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'portrait' && 'aspect-[3/4]',
        aspectRatio === 'wide' && 'aspect-[21/9]',
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
