
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3 } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

// Model configurations: Tweaked Y so all are in view based on their center, scaled for consistent fit
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [2.05, 2.05, 2.05],
    position: [0, -1.05, 0], // more down for oversized
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [0.012, 0.012, 0.012],
    position: [0, -1.01, 0],
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [0.012, 0.012, 0.012],
    position: [0, -1.015, 0],
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [1.7, 1.7, 1.7],
    position: [0, -1.12, 0],
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

    if (!scene) {
      setError(`Failed to load model for ${selectedProduct}`);
      setIsLoading(false);
      return;
    }

    const clonedScene = scene.clone();

    // Debug: log model bounds to adjust centering/scale if needed
    const bbox = new Box3().setFromObject(clonedScene);
    const size = bbox.getSize(new Vector3());
    const center = bbox.getCenter(new Vector3());
    // eslint-disable-next-line no-console
    console.log(`Model: ${selectedProduct} - size:`, size, 'center:', center);

    setCurrentModel(clonedScene);
    setIsLoading(false);
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

