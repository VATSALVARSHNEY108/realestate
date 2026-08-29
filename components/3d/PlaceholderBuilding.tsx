'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Apartment } from '@/types';

interface BuildingMeshProps {
  selectedFloorNumber?: number;
  selectedApartment?: Apartment | null;
}

export function PlaceholderBuilding({ selectedFloorNumber = 88, selectedApartment }: BuildingMeshProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Pause auto-rotation when a specific apartment is selected for inspection
    if (meshRef.current && !selectedApartment) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Glass Tower Shaft */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 7.5, 2.2]} />
        <meshPhysicalMaterial
          color="#121316"
          metalness={0.9}
          roughness={0.1}
          transmission={0.4}
          ior={1.5}
          reflectivity={0.9}
          clearcoat={1}
        />
      </mesh>

      {/* Architectural Gold Louvers & Floor Slabs */}
      {Array.from({ length: 12 }).map((_, index) => {
        const floorNum = 80 + index;
        const yPos = -3.2 + index * 0.6;
        const isHighlighted = selectedFloorNumber === floorNum;
        const isAptActive = isHighlighted && selectedApartment;

        return (
          <group key={index} position={[0, yPos, 0]}>
            {/* Extended Floor Slab */}
            <mesh>
              <boxGeometry args={[isAptActive ? 3.0 : isHighlighted ? 2.8 : 2.5, isAptActive ? 0.22 : isHighlighted ? 0.16 : 0.08, isAptActive ? 3.0 : isHighlighted ? 2.8 : 2.5]} />
              <meshStandardMaterial
                color={isAptActive ? '#F5F2EA' : isHighlighted ? '#E0C896' : '#B89B5E'}
                metalness={0.9}
                roughness={isAptActive ? 0.01 : isHighlighted ? 0.05 : 0.2}
                emissive={isAptActive ? '#E0C896' : isHighlighted ? '#B89B5E' : '#000000'}
                emissiveIntensity={isAptActive ? 0.9 : isHighlighted ? 0.6 : 0}
              />
            </mesh>
            {/* Corner Columns */}
            <mesh position={[1.1, 0.3, 1.1]}>
              <cylinderGeometry args={[0.04, 0.04, 0.5]} />
              <meshStandardMaterial color={isHighlighted ? '#FFFFFF' : '#E0C896'} metalness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Crown Penthouse Structure */}
      <mesh position={[0, 4.1, 0]}>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial color="#E0C896" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Base Podium */}
      <mesh position={[0, -4.0, 0]}>
        <boxGeometry args={[4.2, 0.5, 4.2]} />
        <meshStandardMaterial color="#171717" roughness={0.6} />
      </mesh>
    </group>
  );
}
