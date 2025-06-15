import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

// Model configurations
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [1.8, 1.8, 1.8],
    position: [0, -1.2, 0],
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [0.01, 0.01, 0.01],
    position: [0, -1.2, 0],
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [0.01, 0.01, 0.01],
    position: [0, -1.2, 0],
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [1.5, 1.5, 1.5],
    position: [0, -1.2, 0],
  },
} as const;

export const ModelManager = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedProduct, baseColor, cameraView } = useConfiguratorStore();
  
  const config = MODEL_CONFIG[selectedProduct];
  
  // Load model (no error returned from useGLTF)
  const { scene } = useGLTF(config.path, true);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Check if the scene is present
    if (!scene) {
      setError(`Failed to load model for ${selectedProduct}`);
      setIsLoading(false);
      return;
    }

    const clonedScene = scene.clone();
    setCurrentModel(clonedScene);
    setIsLoading(false);
  // Only re-run if scene or product changes
  }, [scene, selectedProduct]);
  
  // Apply color to model
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [currentModel, baseColor, selectedProduct]);
  
  // Handle camera view rotation
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI : 
                           cameraView === 'side' ? Math.PI / 2 : 0;
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05;
    }
  });
  
  if (error) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }
  
  if (isLoading || !currentModel) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      </group>
    );
  }
  
  return (
    <group 
      ref={groupRef}
      scale={config.scale}
      position={config.position}
    >
      <primitive object={currentModel} />
    </group>
  );
};

// Preload all models
Object.values(MODEL_CONFIG).forEach(({ path }) => {
  useGLTF.preload(path);
});
