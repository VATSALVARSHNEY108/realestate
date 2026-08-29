'use client';

import React, { Component, ReactNode, useEffect, useState, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Scene } from './Scene';
import { FallbackState } from './FallbackState';
import { Button } from '@/components/ui/Button';
import { RotateCcw, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { Apartment } from '@/types';

interface ViewerProps {
  modelPath?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  selectedFloorNumber?: number;
  selectedApartment?: Apartment | null;
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
    console.warn('[BuildingViewer] WebGL Exception:', error);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackState message="WebGL Rendering Error" />;
    }
    return this.props.children;
  }
}

export function ThreeDViewer({
  modelPath,
  enableControls = true,
  autoRotate = false,
  selectedFloorNumber,
  selectedApartment,
  className = 'w-full h-[500px]',
}: ViewerProps) {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

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

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  };

  if (!isSupported) {
    return <FallbackState message="WebGL Not Supported" />;
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 ${className}`}>
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 glass-card px-3.5 py-2 rounded-full border border-luxury-accent/30 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-luxury-accent animate-spin-slow" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-primary font-medium">
          {selectedApartment
            ? `Inspecting Suite ${selectedApartment.number}`
            : selectedFloorNumber
            ? `Level ${selectedFloorNumber} Active`
            : '3D Interactive Building Model'}
        </span>
      </div>

      {/* Control Actions Floating Panel */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-2 glass-card p-2 rounded-xl border border-white/10">
        <Button variant="icon" icon={<ZoomIn className="w-4 h-4" />} title="Zoom In" onClick={handleZoomIn} />
        <Button variant="icon" icon={<ZoomOut className="w-4 h-4" />} title="Zoom Out" onClick={handleZoomOut} />
        <Button variant="icon" icon={<RotateCcw className="w-4 h-4" />} title="Reset Camera View" onClick={handleResetCamera} />
      </div>

      {/* 3D Scene Viewport */}
      <WebGLErrorBoundary>
        <Scene
          modelPath={modelPath}
          enableControls={enableControls}
          autoRotate={autoRotate && !prefersReducedMotion && !selectedFloorNumber && !selectedApartment}
          controlsRef={controlsRef}
          selectedFloorNumber={selectedFloorNumber}
          selectedApartment={selectedApartment}
        />
      </WebGLErrorBoundary>
    </div>
  );
}
