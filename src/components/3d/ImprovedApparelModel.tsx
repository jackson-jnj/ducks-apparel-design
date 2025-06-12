
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group, Vector3 } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const ImprovedApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  
  const { 
    selectedProduct, 
    baseColor, 
    logoConfig, 
    cameraView 
  } = useConfiguratorStore();
  
  // Load the GLTF models
  const { scene: tshirtScene } = useGLTF('/oversized_t-shirt/scene.gltf');
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
    const scene = selectedProduct === 'tshirt' ? tshirtScene : hoodieScene;
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, tshirtScene, hoodieScene, selectedProduct]);

  const renderModel = () => {
    switch (selectedProduct) {
      case 'tshirt':
        return (
          <group ref={groupRef}>
            {/* GLTF T-shirt model */}
            <primitive 
              object={tshirtScene.clone()} 
              scale={[1.5, 1.5, 1.5]}
              position={[0, -1, 0]}
              castShadow
              receiveShadow
            />
            
            {/* Logo decal positioned on the t-shirt */}
            {logoTexture && (
              <mesh position={cameraView === 'back' ? [0, 0.2, -0.3] : [0, 0.2, 0.3]}>
                <planeGeometry args={[logoConfig.scale[0] * 2, logoConfig.scale[1] * 2]} />
                <meshBasicMaterial map={logoTexture} transparent />
              </mesh>
            )}
          </group>
        );
        
      case 'hoodie':
        return (
          <group ref={groupRef}>
            {/* GLTF Hoodie model */}
            <primitive 
              object={hoodieScene.clone()} 
              scale={[1.2, 1.2, 1.2]}
              position={[0, -1, 0]}
              castShadow
              receiveShadow
            />
            
            {/* Logo decal positioned on the hoodie */}
            {logoTexture && (
              <mesh position={cameraView === 'back' ? [0, 0.1, -0.2] : [0, 0.1, 0.2]}>
                <planeGeometry args={[logoConfig.scale[0] * 2, logoConfig.scale[1] * 2]} />
                <meshBasicMaterial map={logoTexture} transparent />
              </mesh>
            )}
          </group>
        );
        
      default:
        return null;
    }
  };

  return renderModel();
};

// Preload the GLTF models
useGLTF.preload('/oversized_t-shirt/scene.gltf');
useGLTF.preload('/hoodie_with_hood_up/scene.gltf');
