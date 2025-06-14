
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ApparelModel } from './ApparelModel';

// Model paths organized for better loading
const MODEL_PATHS = {
  'short-sleeve-tshirt': '/oversized_t-shirt/scene.gltf',
  'long-sleeve-tshirt': '/long_sleeve_t-_shirt/scene.gltf',
  'short-sleeve-polo': '/oversized_t-shirt/scene.gltf', // Using same model for polo
  'hoodie': '/hoodie_with_hood_up/scene.gltf',
} as const;

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Load the current model based on selected product
  const modelPath = MODEL_PATHS[selectedProduct];
  
  // Load GLTF model with error handling
  let gltfData;
  try {
    gltfData = useGLTF(modelPath);
  } catch (error) {
    console.warn(`Failed to load model at ${modelPath}:`, error);
    gltfData = null;
  }
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Update current model when GLTF data changes
  useEffect(() => {
    if (gltfData?.scene) {
      setCurrentModel(gltfData.scene.clone());
      setIsLoading(false);
    } else {
      setCurrentModel(null);
      setIsLoading(true);
    }
  }, [gltfData, selectedProduct]);

  // Animation frame
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02);
      
      // Auto-rotate based on camera view
      const targetRotation = cameraView === 'back' ? Math.PI : 
                           cameraView === 'side' ? Math.PI / 2 : 0;
      
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1;
    }
  });

  // Apply base color to model materials
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, currentModel]);

  // If model is loading or failed to load, use fallback
  if (isLoading || !currentModel) {
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
      default:
        return {
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
    }
  };

  const modelConfig = getModelConfig();

  return (
    <group ref={groupRef}>
      {/* GLTF Model */}
      <primitive 
        object={currentModel} 
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

// Preload models for better performance
Object.values(MODEL_PATHS).forEach(path => {
  try {
    useGLTF.preload(path);
  } catch (error) {
    console.warn(`Failed to preload model at ${path}`);
  }
});
