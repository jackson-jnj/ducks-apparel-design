
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ApparelModel } from './ApparelModel';

// Model paths with correct file structure
const MODEL_PATHS = {
  'short-sleeve-tshirt': '/oversized_t-shirt/scene.gltf',
  'long-sleeve-tshirt': '/long_sleeve_shirt/scene.gltf',
  'short-sleeve-polo': '/short_sleeve_polo/short_sleeve_polo/scene.gltf',
  'hoodie': '/hoodie_with_hood_up/scene.gltf',
} as const;

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelError, setModelError] = useState(false);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Load the current model using useGLTF hook
  const modelPath = MODEL_PATHS[selectedProduct];
  
  // Use the hook unconditionally but handle errors with error boundary pattern
  let gltf;
  let error = false;
  
  try {
    gltf = useGLTF(modelPath);
  } catch (e) {
    console.warn(`Failed to load model ${selectedProduct}:`, e);
    error = true;
  }

  // Logo texture loading
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Handle loading states
  useEffect(() => {
    if (error) {
      setModelError(true);
      setIsLoading(false);
    } else if (gltf?.scene) {
      setModelError(false);
      setIsLoading(false);
    }
  }, [gltf, error, selectedProduct]);

  // Animation frame with optimized performance
  useFrame((state) => {
    if (groupRef.current && !isLoading && !modelError) {
      // Subtle breathing animation
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02);
      
      // Smooth camera view rotation
      const targetRotation = cameraView === 'back' ? Math.PI : 
                           cameraView === 'side' ? Math.PI / 2 : 0;
      
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1;
    }
  });

  // Apply base color with optimized material updates
  useEffect(() => {
    if (gltf?.scene && !error) {
      const model = gltf.scene.clone();
      model.traverse((child: any) => {
        if (child.isMesh && child.material) {
          // Clone material to avoid affecting other instances
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, gltf, error]);

  // If model failed to load or is loading, use fallback
  if (isLoading || modelError || !gltf?.scene) {
    console.log(`Using fallback model for ${selectedProduct}, error: ${modelError}, loading: ${isLoading}`);
    return <ApparelModel />;
  }

  const getModelConfig = () => {
    switch (selectedProduct) {
      case 'hoodie':
        return {
          scale: [1.5, 1.5, 1.5] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] as [number, number, number] : [0, 0.1, 0.2] as [number, number, number]
        };
      case 'short-sleeve-polo':
        return {
          scale: [0.01, 0.01, 0.01] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] as [number, number, number] : [0, 0.1, 0.2] as [number, number, number]
        };
      case 'long-sleeve-tshirt':
        return {
          scale: [0.01, 0.01, 0.01] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] as [number, number, number] : [0, 0.1, 0.2] as [number, number, number]
        };
      default: // short-sleeve-tshirt
        return {
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
    }
  };

  const modelConfig = getModelConfig();
  const model = gltf.scene.clone();

  return (
    <group ref={groupRef}>
      {/* GLTF Model with optimized rendering */}
      <primitive 
        object={model} 
        scale={modelConfig.scale}
        position={modelConfig.position}
        castShadow
        receiveShadow
      />
      
      {/* Logo decal */}
      {logoTexture && (
        <mesh position={modelConfig.logoPosition}>
          <planeGeometry args={[logoConfig.scale[0] * 2, logoConfig.scale[1] * 2]} />
          <meshBasicMaterial map={logoTexture} transparent />
        </mesh>
      )}
    </group>
  );
};
