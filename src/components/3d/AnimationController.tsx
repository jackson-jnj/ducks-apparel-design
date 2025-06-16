
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useAnimationStore } from '@/store/animationStore';

interface AnimationControllerProps {
  groupRef: React.RefObject<Group>;
}

export const AnimationController = ({ groupRef }: AnimationControllerProps) => {
  const { currentAnimation, animationSpeed, isAnimating } = useAnimationStore();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimating) return;

    timeRef.current += delta * animationSpeed;
    const group = groupRef.current;

    switch (currentAnimation) {
      case 'static':
        // Subtle breathing/idle animation
        group.scale.setScalar(1 + Math.sin(timeRef.current * 0.5) * 0.01);
        group.rotation.y += Math.sin(timeRef.current * 0.3) * 0.002;
        break;

      case 'walking':
        // Walking simulation with gentle swaying
        const walkCycle = timeRef.current * 2;
        group.rotation.z = Math.sin(walkCycle) * 0.02;
        group.position.y += Math.sin(walkCycle * 2) * 0.01;
        group.rotation.y += Math.sin(walkCycle * 0.5) * 0.005;
        break;

      case 'waves':
        // Wave-like fabric movement
        const wave = timeRef.current * 1.5;
        group.rotation.x = Math.sin(wave) * 0.03;
        group.rotation.z = Math.cos(wave * 0.7) * 0.02;
        group.scale.y = 1 + Math.sin(wave * 1.2) * 0.015;
        break;
    }
  });

  return null;
};
