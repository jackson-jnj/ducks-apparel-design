
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Object3D, Box3, Vector3, Mesh, BoxGeometry, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

const DEBUG_BBOX = true;

// Model configurations: Drastically increase the scale for small models
const MODEL_CONFIG = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [2.1, 2.1, 2.1],
    position: [0, -1.6, 0], // closer to origin
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [2.1, 2.1, 2.1], // Increased scale dramatically
    position: [0, -1.6, 0],
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [2.1, 2.1, 2.1], // Increased scale dramatically
    position: [0, -1.6, 0],
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [1.9, 1.9, 1.9],
    position: [0, -1.7, 0],
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

  // Load model (no error returned from useGLTF)
  const { scene } = useGLTF(config.path, true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!scene) {
      setError(`Failed to load model for ${selectedProduct}`);
      setIsLoading(false);
      return;
    }

    // CLONE so we don't affect cached scene
    const model = scene.clone(true);

    // Compute bounding box
    const bbox = new Box3().setFromObject(model);
    const center = bbox.getCenter(new Vector3());
    const size = bbox.getSize(new Vector3());
    // Center model at [0,0,0]
    model.position.sub(center);

    // Debug: log bounds and location
    console.log(`Model: ${selectedProduct} - size:`, size, 'center:', center);

    // For debug visualization, make a wireframe box
    if (DEBUG_BBOX) {
      const edges = new EdgesGeometry(new BoxGeometry(size.x, size.y, size.z));
      const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xff00ff }));
      // Center the bbox mesh
      line.position.copy(model.position.add(center));
      setBboxObj(line);
    } else {
      setBboxObj(null);
    }

    setCurrentModel(model);
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

  // Camera view rotation
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

  return (
    <group
      ref={groupRef}
      scale={config.scale}
      position={config.position}
    >
      {/* Model at [0, 0, 0] */}
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
