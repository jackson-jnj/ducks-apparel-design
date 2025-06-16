
import { useEffect } from 'react';
import { Object3D } from 'three';

interface MaterialManagerProps {
  model: Object3D | null;
  baseColor: string;
  selectedProduct: string;
}

export const MaterialManager = ({ model, baseColor, selectedProduct }: MaterialManagerProps) => {
  useEffect(() => {
    if (model) {
      model.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          
          // Improve fabric realism with enhanced properties
          child.material.roughness = 0.85; // More fabric-like surface
          child.material.metalness = 0.0; // No metallic properties for fabric
          child.material.envMapIntensity = 0.3; // Subtle environment reflection
          
          // Add subtle normal mapping effect if available
          if (child.material.normalMap) {
            child.material.normalScale.set(0.6, 0.6);
          }
          
          // Enhanced fabric properties for better physics interaction
          child.material.transparent = false;
          child.material.side = 2; // DoubleSide for better deformation visibility
          
          child.material.needsUpdate = true;
        }
      });
    }
  }, [model, baseColor, selectedProduct]);

  return null;
};
