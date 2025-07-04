
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, PlaneGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { useDesignStore } from '@/store/designStore';
import { useConfiguratorStore } from '@/store/configuratorStore';

interface DesignRendererProps {
  garmentScale: [number, number, number];
}

export const DesignRenderer = ({ garmentScale }: DesignRendererProps) => {
  const { designs, selectedDesignId } = useDesignStore();
  const { cameraView } = useConfiguratorStore();
  const meshRefs = useRef<{ [key: string]: Mesh }>({});

  // Calculate position based on design side and camera view
  const getPositionForDesign = (design: any): [number, number, number] => {
    const [x, y] = design.position;
    const baseZ = 0.51; // Distance from garment surface
    
    // For front designs
    if (design.side === 'front') {
      switch (cameraView) {
        case 'back':
          return [x, y, -baseZ * 3]; // Hide behind garment when viewing back
        case 'side':
          return [baseZ, y, x]; // Side positioning
        default:
          return [x, y, baseZ]; // Front view
      }
    }
    
    // For back designs
    else {
      switch (cameraView) {
        case 'back':
          return [-x, y, baseZ]; // Flip X for back view (mirror effect)
        case 'side':
          return [-baseZ, y, x]; // Side positioning (opposite side)
        default:
          return [x, y, -baseZ * 3]; // Hide behind garment when viewing front
      }
    }
  };

  // Check if design should be visible based on current view and design side
  const isDesignVisible = (design: any): boolean => {
    if (cameraView === 'side') return true; // Always show in side view
    
    if (design.side === 'front' && cameraView === 'front') return true;
    if (design.side === 'back' && cameraView === 'back') return true;
    
    return false;
  };

  return (
    <>
      {designs.map((design) => {
        if (!isDesignVisible(design)) return null;
        
        const position = getPositionForDesign(design);
        const isSelected = selectedDesignId === design.id;
        
        return (
          <mesh
            key={`${design.id}-${cameraView}-${design.side}`}
            ref={(mesh) => {
              if (mesh) meshRefs.current[design.id] = mesh;
            }}
            position={position}
            rotation={[0, 0, design.rotation]}
            scale={[design.scale[0], design.scale[1], 1]}
            userData={{ designId: design.id, side: design.side }}
          >
            <planeGeometry args={[1, 1, 16, 16]} />
            <meshBasicMaterial
              map={useTexture(design.image)}
              transparent
              opacity={design.opacity}
              side={2}
              depthTest={true}
              depthWrite={false}
            />
            
            {/* Selection indicator */}
            {isSelected && (
              <lineSegments>
                <edgesGeometry args={[new PlaneGeometry(1.1, 1.1)]} />
                <lineBasicMaterial color="#00ff00" linewidth={2} />
              </lineSegments>
            )}
          </mesh>
        );
      })}
    </>
  );
};
