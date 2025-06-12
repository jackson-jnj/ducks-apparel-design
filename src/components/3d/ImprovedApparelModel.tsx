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
  
  // Load the t-shirt GLTF model
  const { scene: tshirtScene } = useGLTF('/oversized_t-shirt/scene.gltf');
  
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

  // Enhanced materials with PBR properties
  const createMaterial = () => ({
    color: baseColor,
    roughness: 0.8,
    metalness: 0.1,
    envMapIntensity: 0.5,
  });

  // Apply base color to GLTF model materials
  useEffect(() => {
    if (selectedProduct === 'tshirt' && tshirtScene) {
      tshirtScene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.color.set(baseColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [baseColor, tshirtScene, selectedProduct]);

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
            {/* Main body */}
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 1.6, 0.18]} />
              <meshStandardMaterial {...createMaterial()} />
              
              {logoTexture && (
                <Decal
                  position={cameraView === 'back' ? [0, 0.2, -0.1] : [0, 0.2, 0.1]}
                  rotation={logoConfig.rotation}
                  scale={logoConfig.scale}
                  map={logoTexture}
                />
              )}
            </mesh>
            
            {/* Enhanced hood with better geometry */}
            <mesh position={[0, 0.9, -0.1]} castShadow>
              <sphereGeometry args={[0.45, 16, 12, 0, Math.PI]} />
              <meshStandardMaterial {...createMaterial()} />
            </mesh>
            
            {/* Hood drawstrings */}
            <mesh position={[-0.1, 0.6, 0.1]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[0.1, 0.6, 0.1]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            
            {/* Sleeves */}
            <mesh position={[-0.85, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.28, 1, 12]} />
              <meshStandardMaterial {...createMaterial()} />
            </mesh>
            <mesh position={[0.85, 0.2, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.28, 1, 12]} />
              <meshStandardMaterial {...createMaterial()} />
            </mesh>
          </group>
        );
        
      case 'totebag':
        return (
          <group ref={groupRef}>
            {/* Main bag with better proportions */}
            <mesh ref={meshRef} position={[0, -0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 1.2, 0.12]} />
              <meshStandardMaterial {...createMaterial()} />
              
              {logoTexture && (
                <Decal
                  position={[0, 0.2, 0.07]}
                  rotation={logoConfig.rotation}
                  scale={logoConfig.scale}
                  map={logoTexture}
                />
              )}
            </mesh>
            
            {/* Enhanced handles with better geometry */}
            <mesh position={[-0.3, 0.6, 0]} castShadow>
              <torusGeometry args={[0.15, 0.025, 12, 24]} />
              <meshStandardMaterial {...createMaterial()} />
            </mesh>
            <mesh position={[0.3, 0.6, 0]} castShadow>
              <torusGeometry args={[0.15, 0.025, 12, 24]} />
              <meshStandardMaterial {...createMaterial()} />
            </mesh>
            
            {/* Bottom reinforcement */}
            <mesh position={[0, -0.8, 0]} castShadow>
              <boxGeometry args={[1, 0.05, 0.12]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
          </group>
        );
        
      default:
        return null;
    }
  };

  return renderModel();
};

// Preload the GLTF model
useGLTF.preload('/oversized_t-shirt/scene.gltf');
