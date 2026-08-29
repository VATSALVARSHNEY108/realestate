'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scroll3DControllerProps {
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function Scroll3DController({ triggerRef }: Scroll3DControllerProps) {
  const { camera } = useThree();
  const progressRef = useRef<{ value: number }>({ value: 0 });

  // Interpolation targets
  const targetCamPos = useRef(new THREE.Vector3(0, 2, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress; // 0.0 -> 1.0
          progressRef.current.value = progress;

          // Sequence Logic:
          // 0% -> distant camera (0, 3, 14)
          // 20% -> approach (0, 2.5, 11)
          // 40% -> slight rotation / side angle (3, 2, 9)
          // 60% -> focus on building core (1.5, 1, 7)
          // 80% -> floor level emphasis (0.5, 2.5, 5.5)
          // 100% -> final presentation position (0, 0.5, 4.5)

          if (progress <= 0.2) {
            const t = progress / 0.2;
            targetCamPos.current.set(0, THREE.MathUtils.lerp(3, 2.5, t), THREE.MathUtils.lerp(14, 11, t));
            targetLookAt.current.set(0, 0, 0);
          } else if (progress <= 0.4) {
            const t = (progress - 0.2) / 0.2;
            targetCamPos.current.set(THREE.MathUtils.lerp(0, 3, t), THREE.MathUtils.lerp(2.5, 2, t), THREE.MathUtils.lerp(11, 9, t));
            targetLookAt.current.set(0, 0, 0);
          } else if (progress <= 0.6) {
            const t = (progress - 0.4) / 0.2;
            targetCamPos.current.set(THREE.MathUtils.lerp(3, 1.5, t), THREE.MathUtils.lerp(2, 1, t), THREE.MathUtils.lerp(9, 7, t));
            targetLookAt.current.set(0, 0.5, 0);
          } else if (progress <= 0.8) {
            const t = (progress - 0.6) / 0.2;
            targetCamPos.current.set(THREE.MathUtils.lerp(1.5, 0.5, t), THREE.MathUtils.lerp(1, 2.5, t), THREE.MathUtils.lerp(7, 5.5, t));
            targetLookAt.current.set(0, 2, 0);
          } else {
            const t = (progress - 0.8) / 0.2;
            targetCamPos.current.set(THREE.MathUtils.lerp(0.5, 0, t), THREE.MathUtils.lerp(2.5, 0.5, t), THREE.MathUtils.lerp(5.5, 4.5, t));
            targetLookAt.current.set(0, 1, 0);
          }
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [triggerRef]);

  // Smooth frame interpolation using lerp
  useFrame((_, delta) => {
    camera.position.lerp(targetCamPos.current, delta * 3);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}
