
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Load all GLTF models
  const { scene: shortSleeveTshirtScene } = useGLTF('/oversized_t-shirt/scene.gltf');
  const { scene: longSleeveTshirtScene } = useGLTF('/long_sleeve_t-_shirt/scene.gltf');
  const { scene: hoodieScene } = useGLTF('/hoodie_with_hood_up/scene.gltf');
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Camera position animation based on view
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01);
      
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

  const getModelConfig = () => {
    switch (selectedProduct) {
      case 'short-sleeve-tshirt':
        return {
          scene: shortSleeveTshirtScene,
          scale: [1.5, 1.5, 1.5],
          position: [0, -1, 0],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] : [0, 0.2, 0.3]
        };
      case 'long-sleeve-tshirt':
        return {
          scene: longSleeveTshirtScene,
          scale: [1.5, 1.5, 1.5],
          position: [0, -1, 0],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] : [0, 0.2, 0.3]
        };
      case 'short-sleeve-polo':
        return {
          scene: shortSleeveTshirtScene, // Using same model for polo temporarily
          scale: [1.5, 1.5, 1.5],
          position: [0, -1, 0],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] : [0, 0.2, 0.3]
        };
      case 'hoodie':
        return {
          scene: hoodieScene,
          scale: [1.2, 1.2, 1.2],
          position: [0, -1, 0],
          logoPosition: cameraView === 'back' ? [0, 0.1, -0.2] : [0, 0.1, 0.2]
        };
      default:
        return {
          scene: shortSleeveTshirtScene,
          scale: [1.5, 1.5, 1.5],
          position: [0, -1, 0],
          logoPosition: cameraView === 'back' ? [0, 0.2, -0.3] : [0, 0.2, 0.3]
        };
    }
  };

  const modelConfig = getModelConfig();

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

// Preload all GLTF models
useGLTF.preload('/oversized_t-shirt/scene.gltf');
useGLTF.preload('/long_sleeve_t-_shirt/scene.gltf');
useGLTF.preload('/hoodie_with_hood_up/scene.gltf');
