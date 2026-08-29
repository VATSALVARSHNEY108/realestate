import React from 'react';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { AlertCircle } from 'lucide-react';

interface FallbackStateProps {
  message?: string;
  fallbackImage?: string;
}

export function FallbackState({
  message = 'WebGL 3D Context Unavailable',
  fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
}: FallbackStateProps) {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center p-6">
      <ImageWrapper
        src={fallbackImage}
        alt="Architectural Residence"
        aspectRatio="video"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="relative z-10 glass-card p-6 rounded-xl border border-white/10 max-w-sm text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-luxury-accent mx-auto" />
        <h4 className="font-serif text-lg text-luxury-primary">{message}</h4>
        <p className="text-luxury-muted text-xs font-light leading-relaxed">
          Your browser or device does not currently support WebGL rendering. Viewing architectural static view instead.
        </p>
      </div>
    </div>
  );
}
