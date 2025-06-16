
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, PlaneGeometry, MeshBasicMaterial, Vector3, Matrix4 } from 'three';
import { useDesignStore } from '@/store/designStore';
import { DeformationData } from './FabricPhysics';

interface DesignMapperProps {
  deformationData: DeformationData | null;
  garmentScale: [number, number, number];
}

export const DesignMapper = ({ deformationData, garmentScale }: DesignMapperProps) => {
  const { designs } = useDesignStore();
  const meshRefs = useRef<{ [key: string]: Mesh }>({});

  // Function to calculate deformed position and scale for designs
  const calculateDeformedTransform = (
    originalPosition: [number, number], 
    originalScale: [number, number],
    originalRotation: number,
    deformation: DeformationData
  ) => {
    if (!deformation) return { position: originalPosition, scale: originalScale, rotation: originalRotation };

    const [x, y] = originalPosition;
    const [scaleX, scaleY] = originalScale;
    
    // Apply fabric stretch
    const stretchedScale: [number, number] = [
      scaleX * deformation.stretchFactor.x,
      scaleY * deformation.stretchFactor.y
    ];

    // Calculate position with wave deformation
    const waveOffsetX = Math.sin(deformation.currentTime * 2 + y * 5) * deformation.waveAmplitude * 0.1;
    const waveOffsetY = Math.cos(deformation.currentTime * 1.5 + x * 3) * deformation.waveAmplitude * 0.05;
    
    // Apply wind effect based on position (higher = more wind effect)
    const windFactor = (y + 0.5) * deformation.windEffect * 0.1;
    const windOffsetX = Math.sin(deformation.currentTime * 3) * windFactor;
    
    // Calculate bending effect from nearby bending points
    let bendOffsetX = 0;
    let bendOffsetY = 0;
    
    deformation.bendingPoints.forEach(bendPoint => {
      const distance = Math.sqrt((x - bendPoint.x) ** 2 + (y - bendPoint.y) ** 2);
      const influence = Math.max(0, 1 - distance * 2); // Influence decreases with distance
      
      bendOffsetX += bendPoint.x * influence * 0.05;
      bendOffsetY += bendPoint.y * influence * 0.05;
    });

    const deformedPosition: [number, number] = [
      x + waveOffsetX + windOffsetX + bendOffsetX,
      y + waveOffsetY + bendOffsetY
    ];

    // Add slight rotation from deformation
    const deformationRotation = 
      (waveOffsetX * 2) + (windOffsetX * 1.5) + (bendOffsetX * 3);

    return {
      position: deformedPosition,
      scale: stretchedScale,
      rotation: originalRotation + deformationRotation
    };
  };

  return (
    <>
      {designs.map((design) => {
        const deformedTransform = calculateDeformedTransform(
          design.position,
          design.scale,
          design.rotation,
          deformationData
        );

        return (
          <mesh 
            key={design.id}
            ref={(mesh) => {
              if (mesh) meshRefs.current[design.id] = mesh;
            }}
            position={[
              deformedTransform.position[0], 
              deformedTransform.position[1], 
              0.51
            ]}
            rotation={[0, 0, deformedTransform.rotation]}
            scale={[deformedTransform.scale[0], deformedTransform.scale[1], 1]}
          >
            <planeGeometry args={[1, 1, 8, 8]} /> {/* Higher segmentation for deformation */}
            <meshBasicMaterial 
              map={useTexture(design.image)} 
              transparent 
              opacity={design.opacity}
            />
          </mesh>
        );
      })}
    </>
  );
};
