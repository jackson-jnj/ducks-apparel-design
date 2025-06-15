import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3, Mesh, BoxGeometry, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

// Remove debug bounding box
const DEBUG_BBOX = false;

// Center/scaling configuration for each model
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [3.5, 3.5, 3.5],
    baseYOffset: -1.6, // will auto-calculate perfect vertical centering per model
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [3.5, 3.5, 3.5],
    baseYOffset: -1.6,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [3.5, 3.5, 3.5],
    baseYOffset: -1.6,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [3.3, 3.3, 3.3],
    baseYOffset: -1.65,
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

    // Adjust group position for perfect vertical centering: we want the base of the model to rest at Y=baseYOffset.
    // The group is centered at origin, so let's offset Y such that the bottom bound is at baseYOffset.
    // After model.position = -center, model's base is at -center.y + bbox.min.y
    // group will be positioned at [0, dynamicY, 0], with dynamicY = config.baseYOffset - (bbox.min.y + model.position.y)
    const lowestY = bbox.min.y + model.position.y;
    const groupPosition = [0, config.baseYOffset - lowestY, 0];

    setCurrentModel({
      ...model,
      userData: { __groupPosition: groupPosition }, // For dynamic centering
    });
    setIsLoading(false);
  }, [scene, selectedProduct]);

  // Apply color to model
  useEffect(() => {
    if (currentModel) {
      currentModel.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material = child.material.clone();
          child.material.color.set(baseColor);
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
      // Debug log transforms
      if ((window as any)._lov_modelFrames === undefined) (window as any)._lov_modelFrames = 0;
      if (++(window as any)._lov_modelFrames % 60 === 1) {
        console.log("groupRef transform:", groupRef.current.position, groupRef.current.rotation, groupRef.current.scale);
        if (currentModel)
          console.log("currentModel position:", currentModel.position, "rotation:", currentModel.rotation);
      }
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
      // group is now positioned so that model is exactly centered in all directions & base is visually at the bottom.
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
