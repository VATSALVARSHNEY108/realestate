'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomType } from './ProceduralInteriorMesh';

interface InteriorCameraControllerProps {
  activeRoom: RoomType;
}

export function InteriorCameraController({ activeRoom }: InteriorCameraControllerProps) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 4, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    switch (activeRoom) {
      case 'Living Room':
        targetCamPos.current.set(-1.5, 2.5, 2.0);
        targetLookAt.current.set(-1.5, 0.5, -1.5);
        break;
      case 'Kitchen':
        targetCamPos.current.set(1.5, 2.5, 1.5);
        targetLookAt.current.set(1.5, 0.5, -1.5);
        break;
      case 'Bedroom':
        targetCamPos.current.set(-1.5, 2.5, 4.5);
        targetLookAt.current.set(-1.5, 0.5, 1.5);
        break;
      case 'Bathroom':
        targetCamPos.current.set(1.5, 2.5, 4.5);
        targetLookAt.current.set(1.5, 0.5, 1.5);
        break;
      case 'Balcony':
        targetCamPos.current.set(0, 2.0, 5.5);
        targetLookAt.current.set(0, 0.5, 3.2);
        break;
      default:
        targetCamPos.current.set(0, 4, 8);
        targetLookAt.current.set(0, 0, 0);
    }
  }, [activeRoom]);

  useFrame((_, delta) => {
    camera.position.lerp(targetCamPos.current, delta * 3.0);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
