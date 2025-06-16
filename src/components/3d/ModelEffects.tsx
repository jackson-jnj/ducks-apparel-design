
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

interface ModelEffectsProps {
  groupRef: React.RefObject<Group>;
}

export const ModelEffects = ({ groupRef }: ModelEffectsProps) => {
  const { cameraView } = useConfiguratorStore();

  // Camera view rotation effect
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI :
        cameraView === 'side' ? Math.PI / 2 : 0;
      groupRef.current.rotation.y = targetRotation;
    }
  });

  return null;
};
