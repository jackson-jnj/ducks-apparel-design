
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ApparelModel } from './ApparelModel';

// Updated model paths with new models
const MODEL_PATHS = {
  'short-sleeve-tshirt': '/oversized_t-shirt/scene.gltf',
  'long-sleeve-tshirt': '/long_sleeve_shirt/scene.gltf',
  'short-sleeve-polo': '/short_sleeve_polo/short_sleeve_polo/scene.gltf',
  'hoodie': '/hoodie_with_hood_up/scene.gltf',
} as const;

// Preload all models for faster switching
const preloadedModels = new Map();
let isPreloading = false;

const preloadAllModels = async () => {
  if (isPreloading) return;
  isPreloading = true;
  
  for (const [productType, modelPath] of Object.entries(MODEL_PATHS)) {
    try {
      const gltf = await useGLTF.preload(modelPath);
      preloadedModels.set(productType, gltf);
      console.log(`Preloaded model: ${productType}`);
    } catch (error) {
      console.warn(`Failed to preload model ${productType}:`, error);
    }
  }
};

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelCache, setModelCache] = useState(new Map());
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Preload models on component mount
  useEffect(() => {
    preloadAllModels();
  }, []);

  // Fast model switching with caching
  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      
      // Check cache first
      if (modelCache.has(selectedProduct)) {
        const cachedModel = modelCache.get(selectedProduct);
        setCurrentModel(cachedModel.scene.clone());
        setIsLoading(false);
        return;
      }

      // Load from preloaded models or fresh load
      try {
        const modelPath = MODEL_PATHS[selectedProduct];
        let gltfData = preloadedModels.get(selectedProduct);
        
        if (!gltfData) {
          gltfData = await useGLTF(modelPath);
        }
        
        if (gltfData?.scene) {
          // Cache the model for instant switching
          setModelCache(prev => new Map(prev).set(selectedProduct, gltfData));
          setCurrentModel(gltfData.scene.clone());
        }
      } catch (error) {
        console.warn(`Failed to load model for ${selectedProduct}:`, error);
        setCurrentModel(null);
      }
      
      setIsLoading(false);
    };

    loadModel();
  }, [selectedProduct, modelCache]);

  // Logo texture loading
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Animation frame with optimized performance
  useFrame((state) => {
    if (groupRef.current && !isLoading) {
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
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          // Clone material to avoid affecting other instances
          if (!child.material.userData.originalColor) {
            child.material = child.material.clone();
            child.material.userData.originalColor = child.material.color.getHex();
          }
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
      {/* GLTF Model with optimized rendering */}
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

// Clean up function for performance
export const clearModelCache = () => {
  preloadedModels.clear();
};
