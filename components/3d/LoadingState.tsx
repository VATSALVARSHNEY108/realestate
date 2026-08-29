'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { Sparkles } from 'lucide-react';

export function LoadingState() {
  return (
    <Html center>
      <div className="glass-panel p-4 rounded-xl border border-luxury-accent/30 flex items-center space-x-3 text-luxury-primary whitespace-nowrap">
        <Sparkles className="w-5 h-5 text-luxury-accent animate-spin-slow" />
        <span className="text-xs uppercase tracking-widest font-medium">
          Loading 3D Spatial Scene...
        </span>
      </div>
    </Html>
  );
}
