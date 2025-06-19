
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3, Mesh, BoxGeometry, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useDesignStore } from '@/store/designStore';
import { HyperRealisticPhysics } from './HyperRealisticPhysics';
import { DesignRenderer } from './DesignRenderer';

// Simplified and corrected model configuration
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [3, 3, 3] as [number, number, number],
    yOffset: -1.5,
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [3, 3, 3] as [number, number, number],
    yOffset: -1.5,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [3, 3, 3] as [number, number, number],
    yOffset: -1.5,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [3, 3, 3] as [number, number, number],
    yOffset: -1.5,
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

    // Clone and center the model properly
    const model = scene.clone(true);
    
    // Calculate bounding box and center the model
    const bbox = new Box3().setFromObject(model);
    const center = bbox.getCenter(new Vector3());
    
    // Center the model at origin
    model.position.set(-center.x, -center.y, -center.z);
    
    setCurrentModel(model);
    setIsLoading(false);
  }, [scene, selectedProduct]);

  // Apply color to model materials with enhanced fabric properties
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          
          // Enhanced fabric properties for realism
          child.material.roughness = 0.85;
          child.material.metalness = 0.02;
          child.material.transparent = false;
          child.material.envMapIntensity = 0.3;
          
          // Add subtle subsurface scattering effect
          if (child.material.transmission !== undefined) {
            child.material.transmission = 0.1;
          }
          
          child.material.needsUpdate = true;
        }
      });
    }
  }, [currentModel, baseColor]);

  // Camera view rotation with smooth transitions
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI :
        cameraView === 'side' ? Math.PI / 2 : 0;
      
      // Smooth camera transitions
      const currentY = groupRef.current.rotation.y;
      const diff = targetRotation - currentY;
      
      // Handle angle wrapping
      let adjustedDiff = diff;
      if (Math.abs(diff) > Math.PI) {
        adjustedDiff = diff > 0 ? diff - 2 * Math.PI : diff + 2 * Math.PI;
      }
      
      groupRef.current.rotation.y += adjustedDiff * 0.1;
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
      position={[0, config.yOffset, 0]}
    >
      <primitive object={currentModel} />
      <DesignRenderer garmentScale={config.scale} />
      <HyperRealisticPhysics groupRef={groupRef} />
    </group>
  );
};

// Preload all models
Object.values(MODEL_CONFIG).forEach(({ path }) => {
  useGLTF.preload(path);
});
