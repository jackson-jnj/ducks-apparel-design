
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, PlaneGeometry, MeshBasicMaterial, Vector3, CanvasTexture, Texture } from 'three';
import { useDesignStore } from '@/store/designStore';
import { useConfiguratorStore } from '@/store/configuratorStore';

interface DesignRendererProps {
  garmentScale: [number, number, number];
}

export const DesignRenderer = ({ garmentScale }: DesignRendererProps) => {
  const { designs, selectedDesignId } = useDesignStore();
  const { cameraView } = useConfiguratorStore();
  const meshRefs = useRef<{ [key: string]: Mesh }>({});
  const { scene } = useThree();

  // Calculate position based on camera view
  const getPositionForView = (design: any) => {
    const baseZ = 0.51; // Always in front of garment
    const [x, y] = design.position;
    
    switch (cameraView) {
      case 'back':
        return [x, y, -baseZ]; // Behind garment for back view
      case 'side':
        return [baseZ, y, x]; // Side positioning
      default:
        return [x, y, baseZ]; // Front view
    }
  };

  // Enhanced texture loading with proper sizing
  const createDesignTexture = (imageUrl: string): Texture => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw image centered and scaled properly
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = imageUrl;
    
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  return (
    <>
      {designs.map((design) => {
        const position = getPositionForView(design);
        const isSelected = selectedDesignId === design.id;
        
        return (
          <mesh
            key={`${design.id}-${cameraView}`}
            ref={(mesh) => {
              if (mesh) meshRefs.current[design.id] = mesh;
            }}
            position={position}
            rotation={[0, 0, design.rotation]}
            scale={[design.scale[0], design.scale[1], 1]}
            userData={{ designId: design.id }}
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
