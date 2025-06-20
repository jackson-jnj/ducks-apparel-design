
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3 } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useDesignStore } from '@/store/designStore';
import { AnimationController } from './AnimationController';
import { DesignRenderer } from './DesignRenderer';

// Much larger model configuration for better visibility
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [20, 20, 20] as [number, number, number], // Even bigger
    yOffset: 0,
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [20, 20, 20] as [number, number, number], // Even bigger
    yOffset: 0,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [20, 20, 20] as [number, number, number], // Even bigger
    yOffset: 0,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [20, 20, 20] as [number, number, number], // Even bigger
    yOffset: 0,
  },
} as const;

export const ModelManager = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedProduct, baseColor, cameraView } = useConfiguratorStore();
  const { designs } = useDesignStore();
  const config = MODEL_CONFIG[selectedProduct];

  // Load the GLTF model
  const { scene } = useGLTF(config.path, true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!scene) {
      setError(`Failed to load model for ${selectedProduct}`);
      setIsLoading(false);
      return;
    }

    console.log(`Loading model: ${selectedProduct} with scale:`, config.scale);

    // Clone and center the model properly
    const model = scene.clone(true);
    
    // Calculate bounding box and center the model
    const bbox = new Box3().setFromObject(model);
    const center = bbox.getCenter(new Vector3());
    
    // Center the model at origin (0,0,0)
    model.position.set(-center.x, -center.y, -center.z);
    
    setCurrentModel(model);
    setIsLoading(false);
    
    console.log(`Model ${selectedProduct} loaded successfully with bbox:`, bbox);
  }, [scene, selectedProduct, config.scale]);

  // Apply color to model materials
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          
          // Standard fabric properties
          child.material.roughness = 0.8;
          child.material.metalness = 0.0;
          child.material.transparent = false;
          
          child.material.needsUpdate = true;
        }
      });
    }
  }, [currentModel, baseColor]);

  // Camera view rotation
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI :
        cameraView === 'side' ? Math.PI / 2 : 0;
      groupRef.current.rotation.y = targetRotation;
    }
  });

  if (error) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 8, 0.6]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }

  if (isLoading || !currentModel) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 8, 0.6]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      </group>
    );
  }

  return (
    <group
      ref={groupRef}
      scale={config.scale}
      position={[0, config.yOffset, 0]}
    >
      <primitive object={currentModel} />
      <DesignRenderer garmentScale={config.scale} />
      <AnimationController groupRef={groupRef} />
    </group>
  );
};

// Preload all models
Object.values(MODEL_CONFIG).forEach(({ path }) => {
  useGLTF.preload(path);
});
