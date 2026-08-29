'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type RoomType = 'Living Room' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Balcony';

interface InteriorMeshProps {
  activeRoom: RoomType;
  lightMode: 'day' | 'night';
}

export function ProceduralInteriorMesh({ activeRoom, lightMode }: InteriorMeshProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  const wallColor = lightMode === 'day' ? '#171717' : '#0B0B0B';
  const accentColor = activeRoom === 'Balcony' ? '#C5A880' : '#B89B5E';

  return (
    <group ref={groupRef}>
      {/* Apartment Floor Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[6, 0.2, 6]} />
        <meshStandardMaterial color="#2E323D" roughness={0.3} />
      </mesh>

      {/* Main Living Room Lounge Area */}
      <group position={[-1.5, 0.5, -1.5]}>
        {/* Sofa */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.8, 0.4, 0.8]} />
          <meshStandardMaterial color={activeRoom === 'Living Room' ? accentColor : wallColor} />
        </mesh>
        {/* Coffee Table */}
        <mesh position={[0, 0.15, 0.8]}>
          <boxGeometry args={[1.0, 0.2, 0.5]} />
          <meshStandardMaterial color="#B89B5E" metalness={0.7} />
        </mesh>
      </group>

      {/* Kitchen Island Area */}
      <group position={[1.5, 0.5, -1.5]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.6, 0.8, 0.8]} />
          <meshStandardMaterial color={activeRoom === 'Kitchen' ? accentColor : '#1F2128'} />
        </mesh>
      </group>

      {/* Bedroom Sanctuary Suite */}
      <group position={[-1.5, 0.5, 1.5]}>
        {/* King Bed */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.6, 0.4, 1.8]} />
          <meshStandardMaterial color={activeRoom === 'Bedroom' ? accentColor : wallColor} />
        </mesh>
      </group>

      {/* Bathroom Spa */}
      <group position={[1.5, 0.5, 1.5]}>
        {/* Tub */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.6, 16]} />
          <meshStandardMaterial color={activeRoom === 'Bathroom' ? accentColor : '#2E323D'} />
        </mesh>
      </group>

      {/* Balcony Overlook Platform */}
      <mesh position={[0, 0.1, 3.2]}>
        <boxGeometry args={[5, 0.1, 1]} />
        <meshStandardMaterial color={activeRoom === 'Balcony' ? '#E0C896' : '#1F2128'} metalness={0.8} />
      </mesh>
    </group>
  );
}
