
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ApparelModel } from './ApparelModel';

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Optimized model loading with better error handling
  let shortSleeveTshirtScene, longSleeveTshirtScene, hoodieScene;
  
  try {
    const shortSleeveGLTF = useGLTF('/oversized_t-shirt/scene.gltf');
    shortSleeveTshirtScene = shortSleeveGLTF.scene;
    console.log('Short sleeve model loaded successfully');
  } catch (error) {
    console.warn('Short sleeve model not available, using fallback');
  }
  
  try {
    const longSleeveGLTF = useGLTF('/long_sleeve_t-_shirt/scene.gltf');
    longSleeveTshirtScene = longSleeveGLTF.scene;
    console.log('Long sleeve model loaded successfully');
  } catch (error) {
    console.warn('Long sleeve model not available, using fallback');
  }
  
  try {
    const hoodieGLTF = useGLTF('/hoodie_with_hood_up/scene.gltf');
    hoodieScene = hoodieGLTF.scene;
    console.log('Hoodie model loaded successfully');
  } catch (error) {
    console.warn('Hoodie model not available, using fallback');
  }
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Check if at least one model is loaded or use fallback
  useEffect(() => {
    setModelsLoaded(true); // Always set to true, we'll use fallback if needed
  }, []);

  // Smooth animation frame
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.01;
      groupRef.current.scale.setScalar(breathingScale);
      
      // Smooth camera view transitions
      const targetRotation = cameraView === 'back' ? Math.PI : 
                           cameraView === 'side' ? Math.PI / 2 : 0;
      
      const rotationDiff = targetRotation - groupRef.current.rotation.y;
      groupRef.current.rotation.y += rotationDiff * 0.08;
    }
  });

  // Apply base color to materials with better performance
  useEffect(() => {
    const applyColorToScene = (scene: any) => {
      if (!scene) return;
      
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              mat.color.set(baseColor);
              mat.needsUpdate = true;
            });
          } else {
            child.material.color.set(baseColor);
            child.material.needsUpdate = true;
          }
        }
      });
    };

    switch (selectedProduct) {
      case 'short-sleeve-tshirt':
      case 'short-sleeve-polo':
        applyColorToScene(shortSleeveTshirtScene);
        break;
      case 'long-sleeve-tshirt':
        applyColorToScene(longSleeveTshirtScene || shortSleeveTshirtScene);
        break;
      case 'hoodie':
        applyColorToScene(hoodieScene || shortSleeveTshirtScene);
        break;
    }
  }, [baseColor, shortSleeveTshirtScene, longSleeveTshirtScene, hoodieScene, selectedProduct]);

  const getModelConfig = () => {
    const baseConfig = {
      scale: [1.8, 1.8, 1.8] as [number, number, number],
      position: [0, -1.2, 0] as [number, number, number],
    };

    switch (selectedProduct) {
      case 'short-sleeve-tshirt':
      case 'short-sleeve-polo':
        return {
          ...baseConfig,
          scene: shortSleeveTshirtScene,
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
      case 'long-sleeve-tshirt':
        return {
          ...baseConfig,
          scene: longSleeveTshirtScene || shortSleeveTshirtScene,
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
      case 'hoodie':
        return {
          ...baseConfig,
          scale: [1.5, 1.5, 1.5] as [number, number, number],
          scene: hoodieScene || shortSleeveTshirtScene,
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] as [number, number, number] : [0, 0.1, 0.2] as [number, number, number]
        };
      default:
        return {
          ...baseConfig,
          scene: shortSleeveTshirtScene,
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
    }
  };

  const modelConfig = getModelConfig();

  // Use fallback model if no GLTF model is available
  if (!modelConfig.scene) {
    console.log('Using fallback geometric model for:', selectedProduct);
    return <ApparelModel />;
  }

  return (
    <group ref={groupRef}>
      {/* GLTF Model */}
      <primitive 
        object={modelConfig.scene.clone()} 
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

// Preload models silently
try {
  useGLTF.preload('/oversized_t-shirt/scene.gltf');
} catch (error) {
  // Silent fail for preloading
}

try {
  useGLTF.preload('/hoodie_with_hood_up/scene.gltf');
} catch (error) {
  // Silent fail for preloading
}
