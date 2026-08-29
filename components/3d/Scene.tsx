'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ModelLoader } from './ModelLoader';
import { LoadingState } from './LoadingState';
import { Scroll3DController } from './Scroll3DController';
import { Apartment } from '@/types';

interface SceneProps {
  modelPath?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  controlsRef?: React.RefObject<OrbitControlsImpl | null>;
  triggerRef?: React.RefObject<HTMLDivElement | null>;
  selectedFloorNumber?: number;
  selectedApartment?: Apartment | null;
}

function ApartmentCameraController({
  selectedFloorNumber,
  selectedApartment,
}: {
  selectedFloorNumber?: number;
  selectedApartment?: Apartment | null;
}) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 2, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (selectedFloorNumber) {
      const index = selectedFloorNumber - 80;
      const targetY = -3.2 + index * 0.6;

      if (selectedApartment) {
        // Zoom closer into specific apartment suite position
        targetCamPos.current.set(1.8, targetY + 0.6, 5.2);
        targetLookAt.current.set(0, targetY + 0.2, 0);
      } else {
        targetCamPos.current.set(0, targetY + 1.2, 7.5);
        targetLookAt.current.set(0, targetY, 0);
      }
    }
  }, [selectedFloorNumber, selectedApartment]);

  useFrame((_, delta) => {
    if (selectedFloorNumber) {
      camera.position.lerp(targetCamPos.current, delta * 3.0);
      camera.lookAt(targetLookAt.current);
    }
  });

  return null;
}

export function Scene({
  modelPath,
  enableControls = true,
  autoRotate = false,
  controlsRef,
  triggerRef,
  selectedFloorNumber,
  selectedApartment,
}: SceneProps) {
  const internalControlsRef = useRef<OrbitControlsImpl>(null);
  const activeControlsRef = controlsRef || internalControlsRef;

  return (
    <Canvas
      className="w-full h-full min-h-[400px]"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerspectiveCamera makeDefault position={[0, 3, 14]} fov={45} />

      {/* Architectural Studio Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 8]} intensity={1.6} color="#F5F2EA" castShadow />
      <directionalLight position={[-10, -8, -5]} intensity={0.5} color="#B89B5E" />
      <pointLight position={[0, 6, 0]} intensity={0.9} color="#E0C896" />

      {/* Environment preset */}
      <Environment preset="city" />

      {/* 3D Model Loader with Suspense */}
      <Suspense fallback={<LoadingState />}>
        <ModelLoader
          modelPath={modelPath}
          selectedFloorNumber={selectedFloorNumber}
          selectedApartment={selectedApartment}
        />
      </Suspense>

      {/* Apartment Selection Camera Interpolation Controller */}
      {selectedFloorNumber && (
        <ApartmentCameraController
          selectedFloorNumber={selectedFloorNumber}
          selectedApartment={selectedApartment}
        />
      )}

      {/* Scroll Trigger Controller if triggerRef is passed */}
      {triggerRef && <Scroll3DController triggerRef={triggerRef} />}

      {/* Orbit Controls if enabled */}
      {enableControls && !triggerRef && (
        <OrbitControls
          ref={activeControlsRef}
          enableZoom={true}
          enablePan={true}
          autoRotate={autoRotate && !selectedApartment}
          autoRotateSpeed={0.6}
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      )}
    </Canvas>
  );
}
