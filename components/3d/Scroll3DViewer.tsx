'use client';

import React, { Component, ReactNode, useEffect, useState } from 'react';
import { Scene } from './Scene';
import { FallbackState } from './FallbackState';
import { Compass } from 'lucide-react';

interface Scroll3DViewerProps {
  modelPath?: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[Scroll3DViewer] WebGL Exception:', error);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackState message="WebGL Rendering Error" />;
    }
    return this.props.children;
  }
}

export function Scroll3DViewer({
  modelPath,
  triggerRef,
  className = 'w-full h-[600px]',
}: Scroll3DViewerProps) {
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    // Safe WebGL Context Detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return <FallbackState message="WebGL Not Supported" />;
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 ${className}`}>
      {/* Scroll Overlay Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 glass-card px-3.5 py-2 rounded-full border border-luxury-accent/30 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-luxury-accent animate-spin-slow" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-primary font-medium">
          Scroll-Driven 3D Spatial Journey
        </span>
      </div>

      {/* 3D Scene Viewport */}
      <WebGLErrorBoundary>
        <Scene modelPath={modelPath} triggerRef={triggerRef} />
      </WebGLErrorBoundary>
    </div>
  );
}
