
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3, Mesh, BoxGeometry, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

// Remove debug bounding box
const DEBUG_BBOX = false;

// Center/scaling configuration for each model - increased scale and adjusted positioning
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [4.5, 4.5, 4.5], // Increased from 3.5
    baseYOffset: -0.5, // Moved up from -1.2
    collarYOffset: 0.64,
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [4.5, 4.5, 4.5], // Increased from 3.5
    baseYOffset: -0.5, // Moved up from -1.2
    collarYOffset: 0.70,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [4.5, 4.5, 4.5], // Increased from 3.5
    baseYOffset: -0.48, // Moved up from -1.18
    collarYOffset: 0.52,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [4.3, 4.3, 4.3], // Increased from 3.3
    baseYOffset: -0.48, // Moved up from -1.18
    collarYOffset: 0.48,
  },
} as const;

export const ModelManager = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [bboxObj, setBboxObj] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedProduct, baseColor, cameraView } = useConfiguratorStore();
  const config = MODEL_CONFIG[selectedProduct];

  // Load the GLTF model
  const { scene } = useGLTF(config.path, true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!scene) {
      setError(`Failed to load model for ${selectedProduct}`);
      setIsLoading(false);
      return;
    }

    // Clone the loaded scene
    const model = scene.clone(true);

    // Center the model: compute bounding box, center vertically & horizontally at [0,0,0]
    const bbox = new Box3().setFromObject(model);
    const center = bbox.getCenter(new Vector3());
    const size = bbox.getSize(new Vector3());

    // Center the model at origin
    model.position.set(-center.x, -center.y, -center.z);

    // For debug visualization, make a wireframe box
    if (DEBUG_BBOX) {
      const edges = new EdgesGeometry(new BoxGeometry(size.x, size.y, size.z));
      const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xff00ff }));
      // The bounding box also needs to be at origin after recentering
      line.position.set(0, 0, 0);
      setBboxObj(line);
    } else {
      setBboxObj(null);
    }

    // New: Try to center around neckline/collar for visual balance
    // Visual Y center ≈ collar/top ~ bbox.max.y
    // Place model so that center of canvas aligns with collar minus an offset (for a little headroom)
    const yFromOriginToTop = bbox.max.y + model.position.y;
    // This offset places the collar line closer to the canvas center.
    // You may tweak the collarYOffset per garment for best results!
    const groupPosition: [number, number, number] = [
      0,
      config.baseYOffset - yFromOriginToTop + (config.collarYOffset ?? 0),
      0
    ];

    model.userData.__groupPosition = groupPosition;
    setCurrentModel(model);

    setIsLoading(false);
  }, [scene, selectedProduct]);

  // Apply color to model with improved material properties for realistic fabric appearance
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
          
          // Improve fabric realism
          child.material.roughness = 0.8; // More fabric-like surface
          child.material.metalness = 0.0; // No metallic properties for fabric
          
          // Add subtle normal mapping effect if available
          if (child.material.normalMap) {
            child.material.normalScale.set(0.5, 0.5);
          }
          
          child.material.needsUpdate = true;
        }
      });
    }
  }, [currentModel, baseColor, selectedProduct]);

  // Camera view rotation (keeps model visually centered because group is at [0,...,0])
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI :
        cameraView === 'side' ? Math.PI / 2 : 0;
      groupRef.current.rotation.y = targetRotation;
    }
  });

  if (error) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }

  if (isLoading || !currentModel) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      </group>
    );
  }

  // Read dynamic group centering position (falls back to [0, config.baseYOffset, 0])
  const groupPosition: [number, number, number] = (currentModel.userData && currentModel.userData.__groupPosition) || [0, config.baseYOffset, 0];

  return (
    <group
      ref={groupRef}
      scale={config.scale}
      position={groupPosition}
    >
      {/* Model centered at [0,0,0] */}
      <primitive object={currentModel} />
      {/* Show bounding box for debugging */}
      {bboxObj && <primitive object={bboxObj} />}
    </group>
  );
};

// Preload all models
Object.values(MODEL_CONFIG).forEach(({ path }) => {
  useGLTF.preload(path);
});
