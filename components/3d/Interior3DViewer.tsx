'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import { ProceduralInteriorMesh, RoomType } from './ProceduralInteriorMesh';
import { InteriorCameraController } from './InteriorCameraController';
import { LoadingState } from './LoadingState';
import { FallbackState } from './FallbackState';
import { Button } from '@/components/ui/Button';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface InteriorViewerProps {
  className?: string;
}

const ROOMS: RoomType[] = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Balcony'];

export function Interior3DViewer({ className = 'w-full h-[550px]' }: InteriorViewerProps) {
  const [activeRoom, setActiveRoom] = useState<RoomType>('Living Room');
  const [lightMode, setLightMode] = useState<'day' | 'night'>('day');
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsSupported(false);
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return <FallbackState message="WebGL Interior Not Supported" />;
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 ${className}`}>
      {/* Top Floating Room Selector Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 glass-card p-3 rounded-xl border border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {ROOMS.map((room) => (
            <Button
              key={room}
              variant={activeRoom === room ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveRoom(room)}
            >
              {room}
            </Button>
          ))}
        </div>

        {/* Day / Night Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={lightMode === 'day' ? 'primary' : 'secondary'}
            size="sm"
            icon={<Sun className="w-3.5 h-3.5" />}
            onClick={() => setLightMode('day')}
          >
            Day
          </Button>
          <Button
            variant={lightMode === 'night' ? 'primary' : 'secondary'}
            size="sm"
            icon={<Moon className="w-3.5 h-3.5" />}
            onClick={() => setLightMode('night')}
          >
            Night
          </Button>
        </div>
      </div>

      {/* R3F Canvas Viewport */}
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={50} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={lightMode === 'day' ? 0.9 : 0.2} />
        <directionalLight
          position={[10, 15, 8]}
          intensity={lightMode === 'day' ? 1.8 : 0.3}
          color={lightMode === 'day' ? '#F5F2EA' : '#8A8F9E'}
        />
        <pointLight
          position={[0, 3, 0]}
          intensity={lightMode === 'day' ? 0.5 : 1.5}
          color={lightMode === 'day' ? '#E0C896' : '#B89B5E'}
        />

        <Environment preset={lightMode === 'day' ? 'apartment' : 'night'} />

        <Suspense fallback={<LoadingState />}>
          <ProceduralInteriorMesh activeRoom={activeRoom} lightMode={lightMode} />
        </Suspense>

        <InteriorCameraController activeRoom={activeRoom} />

        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>

      {/* Bottom Floating Info Badge */}
      <div className="absolute bottom-4 left-4 z-10 glass-card px-4 py-2 rounded-full border border-luxury-accent/30 flex items-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-luxury-accent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-primary font-medium">
          Inspecting {activeRoom} ({lightMode.toUpperCase()} MODE)
        </span>
      </div>
    </div>
  );
}
