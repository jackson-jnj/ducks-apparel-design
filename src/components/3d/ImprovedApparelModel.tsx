
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group, Vector3 } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Load GLTF models with error handling
  const { scene: tshirtScene, error: tshirtError } = useGLTF('/oversized_t-shirt/scene.gltf');
  const { scene: hoodieScene, error: hoodieError } = useGLTF('/hoodie_with_hood_up/scene.gltf');
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Handle loading errors
  useEffect(() => {
    if (tshirtError || hoodieError) {
      console.error('Model loading error:', tshirtError || hoodieError);
      setModelLoadError('Failed to load 3D model');
    }
  }, [tshirtError, hoodieError]);

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
    const scene = selectedProduct === 'hoodie' ? hoodieScene : tshirtScene;
    
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, tshirtScene, hoodieScene, selectedProduct]);

  const getModelConfig = () => {
    switch (selectedProduct) {
      case 'tshirt':
        return {
          scene: tshirtScene,
          scale: new Vector3(1.5, 1.5, 1.5),
          position: new Vector3(0, -1, 0),
          logoPosition: cameraView === 'back' ? new Vector3(0, 0.2, -0.3) : new Vector3(0, 0.2, 0.3)
        };
      case 'hoodie':
        return {
          scene: hoodieScene,
          scale: new Vector3(1.2, 1.2, 1.2),
          position: new Vector3(0, -1, 0),
          logoPosition: cameraView === 'back' ? new Vector3(0, 0.1, -0.2) : new Vector3(0, 0.1, 0.2)
        };
      default:
        return {
          scene: tshirtScene,
          scale: new Vector3(1.5, 1.5, 1.5),
          position: new Vector3(0, -1, 0),
          logoPosition: cameraView === 'back' ? new Vector3(0, 0.2, -0.3) : new Vector3(0, 0.2, 0.3)
        };
    }
  };

  const modelConfig = getModelConfig();

  // Show error message if models failed to load
  if (modelLoadError) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 3, 0.5]} />
          <meshBasicMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }

  // Don't render if no scene is available
  if (!modelConfig.scene) {
    return null;
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

// Preload available GLTF models
useGLTF.preload('/oversized_t-shirt/scene.gltf');
useGLTF.preload('/hoodie_with_hood_up/scene.gltf');
