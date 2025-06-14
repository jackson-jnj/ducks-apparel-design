
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
  
  // Try to load GLTF models with error handling
  let shortSleeveTshirtScene, longSleeveTshirtScene, hoodieScene;
  
  try {
    const shortSleeveGLTF = useGLTF('/oversized_t-shirt/scene.gltf');
    shortSleeveTshirtScene = shortSleeveGLTF.scene;
  } catch (error) {
    console.warn('Failed to load short sleeve t-shirt model:', error);
  }
  
  try {
    const longSleeveGLTF = useGLTF('/long_sleeve_t-_shirt/scene.gltf');
    longSleeveTshirtScene = longSleeveGLTF.scene;
  } catch (error) {
    console.warn('Failed to load long sleeve t-shirt model:', error);
  }
  
  try {
    const hoodieGLTF = useGLTF('/hoodie_with_hood_up/scene.gltf');
    hoodieScene = hoodieGLTF.scene;
  } catch (error) {
    console.warn('Failed to load hoodie model:', error);
  }
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Check if at least one model is loaded
  useEffect(() => {
    if (shortSleeveTshirtScene || longSleeveTshirtScene || hoodieScene) {
      setModelsLoaded(true);
    }
  }, [shortSleeveTshirtScene, longSleeveTshirtScene, hoodieScene]);

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

  // Apply base color to GLTF model materials
  useEffect(() => {
    let scene;
    switch (selectedProduct) {
      case 'short-sleeve-tshirt':
        scene = shortSleeveTshirtScene;
        break;
      case 'long-sleeve-tshirt':
        scene = longSleeveTshirtScene;
        break;
      case 'short-sleeve-polo':
        scene = shortSleeveTshirtScene; // Using same model for polo temporarily
        break;
      case 'hoodie':
        scene = hoodieScene;
        break;
      default:
        scene = shortSleeveTshirtScene;
    }
    
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, shortSleeveTshirtScene, longSleeveTshirtScene, hoodieScene, selectedProduct]);

  // If no GLTF models are loaded, use fallback geometric model
  if (!modelsLoaded) {
    return <ApparelModel />;
  }

  const getModelConfig = () => {
    switch (selectedProduct) {
      case 'short-sleeve-tshirt':
        return {
          scene: shortSleeveTshirtScene,
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
      case 'long-sleeve-tshirt':
        return {
          scene: longSleeveTshirtScene || shortSleeveTshirtScene,
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
      case 'short-sleeve-polo':
        return {
          scene: shortSleeveTshirtScene,
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
      case 'hoodie':
        return {
          scene: hoodieScene || shortSleeveTshirtScene,
          scale: [1.5, 1.5, 1.5] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] as [number, number, number] : [0, 0.1, 0.2] as [number, number, number]
        };
      default:
        return {
          scene: shortSleeveTshirtScene,
          scale: [1.8, 1.8, 1.8] as [number, number, number],
          position: [0, -1.2, 0] as [number, number, number],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] as [number, number, number] : [0, 0.2, 0.3] as [number, number, number]
        };
    }
  };

  const modelConfig = getModelConfig();

  if (!modelConfig.scene) {
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

// Preload models with error handling
try {
  useGLTF.preload('/oversized_t-shirt/scene.gltf');
} catch (error) {
  console.warn('Failed to preload oversized t-shirt model');
}

try {
  useGLTF.preload('/long_sleeve_t-_shirt/scene.gltf');
} catch (error) {
  console.warn('Failed to preload long sleeve t-shirt model');
}

try {
  useGLTF.preload('/hoodie_with_hood_up/scene.gltf');
} catch (error) {
  console.warn('Failed to preload hoodie model');
}
