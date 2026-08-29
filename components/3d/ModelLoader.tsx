'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';
import { PlaceholderBuilding } from './PlaceholderBuilding';
import { Apartment } from '@/types';

interface ModelLoaderProps {
  modelPath?: string;
  selectedFloorNumber?: number;
  selectedApartment?: Apartment | null;
}

function GLTFAsset({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1} />;
}

export function ModelLoader({ modelPath, selectedFloorNumber, selectedApartment }: ModelLoaderProps) {
  if (!modelPath) {
    return <PlaceholderBuilding selectedFloorNumber={selectedFloorNumber} selectedApartment={selectedApartment} />;
  }

  return <GLTFAsset path={modelPath} />;
}
