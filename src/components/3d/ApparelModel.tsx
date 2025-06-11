
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const ApparelModel = () => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  
  const { selectedProduct, baseColor, logoConfig } = useConfiguratorStore();
  
  // Load logo texture if available
  const logoTexture = logoConfig.image ? useTexture(logoConfig.image) : null;

  // Simple rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // For now, we'll create a simple geometric representation
  // In a real app, you'd load actual .glb models here
  const renderModel = () => {
    switch (selectedProduct) {
      case 'tshirt':
        return (
          <group ref={groupRef}>
            {/* Main body */}
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 1.5, 0.1]} />
              <meshStandardMaterial color={baseColor} />
              
              {/* Logo decal */}
              {logoTexture && (
                <Decal
                  position={logoConfig.position}
                  rotation={logoConfig.rotation}
                  scale={logoConfig.scale}
                  map={logoTexture}
                />
              )}
            </mesh>
            
            {/* Sleeves */}
            <mesh position={[-0.8, 0.3, 0]} castShadow>
              <boxGeometry args={[0.4, 0.8, 0.1]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
            <mesh position={[0.8, 0.3, 0]} castShadow>
              <boxGeometry args={[0.4, 0.8, 0.1]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
          </group>
        );
        
      case 'hoodie':
        return (
          <group ref={groupRef}>
            {/* Main body */}
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 1.6, 0.15]} />
              <meshStandardMaterial color={baseColor} />
              
              {logoTexture && (
                <Decal
                  position={logoConfig.position}
                  rotation={logoConfig.rotation}
                  scale={logoConfig.scale}
                  map={logoTexture}
                />
              )}
            </mesh>
            
            {/* Hood */}
            <mesh position={[0, 0.9, -0.1]} castShadow>
              <sphereGeometry args={[0.4, 16, 8, 0, Math.PI]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
            
            {/* Sleeves */}
            <mesh position={[-0.85, 0.2, 0]} castShadow>
              <boxGeometry args={[0.45, 1, 0.15]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
            <mesh position={[0.85, 0.2, 0]} castShadow>
              <boxGeometry args={[0.45, 1, 0.15]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
          </group>
        );
        
      case 'totebag':
        return (
          <group ref={groupRef}>
            {/* Main bag */}
            <mesh ref={meshRef} position={[0, -0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 1.2, 0.1]} />
              <meshStandardMaterial color={baseColor} />
              
              {logoTexture && (
                <Decal
                  position={[0, 0.2, 0.51]}
                  rotation={logoConfig.rotation}
                  scale={logoConfig.scale}
                  map={logoTexture}
                />
              )}
            </mesh>
            
            {/* Handles */}
            <mesh position={[-0.3, 0.6, 0]} castShadow>
              <torusGeometry args={[0.15, 0.02, 8, 16]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
            <mesh position={[0.3, 0.6, 0]} castShadow>
              <torusGeometry args={[0.15, 0.02, 8, 16]} />
              <meshStandardMaterial color={baseColor} />
            </mesh>
          </group>
        );
        
      default:
        return null;
    }
  };

  return renderModel();
};
