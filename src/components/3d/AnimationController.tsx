
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useAnimationStore } from '@/store/animationStore';
import { FabricPhysics, DeformationData } from './FabricPhysics';

interface AnimationControllerProps {
  groupRef: React.RefObject<Group>;
  onDeformationUpdate?: (deformation: DeformationData) => void;
}

export const AnimationController = ({ groupRef, onDeformationUpdate }: AnimationControllerProps) => {
  const { isAnimating } = useAnimationStore();
  const [currentDeformation, setCurrentDeformation] = useState<DeformationData | null>(null);

  const handleDeformation = (deformationData: DeformationData) => {
    setCurrentDeformation(deformationData);
    if (onDeformationUpdate) {
      onDeformationUpdate(deformationData);
    }
  };

  // Only render physics when animating for performance
  if (!isAnimating) return null;

  return (
    <FabricPhysics 
      groupRef={groupRef} 
      onDeformation={handleDeformation}
    />
  );
};
