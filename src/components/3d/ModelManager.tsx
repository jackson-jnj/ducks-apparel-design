
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3 } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useAnimationStore } from '@/store/animationStore';
import { DesignRenderer } from './DesignRenderer';

// Simplified model configuration
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [1.8, 1.8, 1.8] as [number, number, number],
    yOffset: -1.2,
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [0.01, 0.01, 0.01] as [number, number, number],
    yOffset: -1.2,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [0.01, 0.01, 0.01] as [number, number, number],
    yOffset: -1.2,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [1.5, 1.5, 1.5] as [number, number, number],
    yOffset: -1.2,
  },
} as const;

export const ModelManager = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedProduct, baseColor, cameraView } = useConfiguratorStore();
  const { currentAnimation, animationSpeed, isAnimating } = useAnimationStore();
  const config = MODEL_CONFIG[selectedProduct];

  // Load the GLTF model
  const { scene } = useGLTF(config.path, true);

  useEffect(() => {
    console.log(`Loading model for ${selectedProduct}`);
    setIsLoading(true);
    setError(null);

    if (!scene) {
      console.error(`Failed to load model for ${selectedProduct}`);
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
    
    console.log(`Model loaded successfully: ${selectedProduct}`);
    setCurrentModel(model);
    setIsLoading(false);
  }, [scene, selectedProduct]);

  // Apply color to model materials
  useEffect(() => {
    if (currentModel) {
      console.log(`Applying color ${baseColor} to model`);
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          child.material.roughness = 0.8;
          child.material.metalness = 0.1;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [currentModel, baseColor]);

  // Animation and camera view rotation
  useFrame((state) => {
    if (groupRef.current && currentModel) {
      const time = state.clock.elapsedTime;
      
      // Camera view rotation
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

      // Apply animations if enabled
      if (isAnimating) {
        switch (currentAnimation) {
          case 'walking':
            // Realistic walking animation
            const walkFreq = 1.5 * animationSpeed;
            const walkCycle = time * walkFreq;
            
            // Body sway and movement
            const sway = Math.sin(walkCycle) * 0.02;
            const bounce = Math.abs(Math.sin(walkCycle * 2)) * 0.015;
            const tilt = Math.sin(walkCycle) * 0.008;
            
            groupRef.current.rotation.z = sway;
            groupRef.current.rotation.x = tilt;
            groupRef.current.position.y = config.yOffset + bounce;
            
            // Subtle scale changes for fabric movement
            const breathe = 1 + Math.sin(walkCycle * 3) * 0.005;
            groupRef.current.scale.set(
              config.scale[0] * breathe,
              config.scale[1] * (1 + bounce * 0.1),
              config.scale[2]
            );
            break;

          case 'waves':
            // Wave-like motion
            const wave1 = Math.sin(time * 0.8 * animationSpeed) * 0.03;
            const wave2 = Math.cos(time * 1.2 * animationSpeed) * 0.02;
            
            groupRef.current.rotation.x = wave1;
            groupRef.current.rotation.z = wave2;
            
            const waveScale = 1 + (wave1 + wave2) * 0.1;
            groupRef.current.scale.set(
              config.scale[0] * waveScale,
              config.scale[1],
              config.scale[2]
            );
            break;

          default: // static
            // Subtle breathing animation
            const breatheStatic = 1 + Math.sin(time * 0.5) * 0.008;
            groupRef.current.scale.set(
              config.scale[0] * breatheStatic,
              config.scale[1],
              config.scale[2]
            );
            break;
        }
      } else {
        // Reset to default when not animating
        groupRef.current.scale.set(...config.scale);
        groupRef.current.position.y = config.yOffset;
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;
      }
    }
  });

  if (error) {
    console.error('Model error:', error);
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
    console.log('Model loading...');
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
    </group>
  );
};

// Preload all models
Object.values(MODEL_CONFIG).forEach(({ path }) => {
  useGLTF.preload(path);
});
