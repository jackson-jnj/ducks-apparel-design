
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Object3D } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useDesignStore } from '@/store/designStore';
import { AnimationController } from './AnimationController';
import { DesignMapper } from './DesignMapper';
import { DeformationData } from './FabricPhysics';
import { MODEL_CONFIG } from './ModelConfig';
import { ModelLoader, preloadModels } from './ModelLoader';
import { MaterialManager } from './MaterialManager';

export const ModelManager = () => {
  const groupRef = useRef<Group>(null);
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [groupPosition, setGroupPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [bboxObj, setBboxObj] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deformationData, setDeformationData] = useState<DeformationData | null>(null);

  const { selectedProduct, baseColor, cameraView } = useConfiguratorStore();
  const { designs } = useDesignStore();
  const config = MODEL_CONFIG[selectedProduct];

  const handleModelLoad = (model: Object3D, position: [number, number, number]) => {
    setCurrentModel(model);
    setGroupPosition(position);
  };

  // Camera view rotation
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = cameraView === 'back' ? Math.PI :
        cameraView === 'side' ? Math.PI / 2 : 0;
      groupRef.current.rotation.y = targetRotation;
    }
  });

  const handleDeformationUpdate = (deformation: DeformationData) => {
    setDeformationData(deformation);
  };

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
      position={groupPosition}
    >
      {/* Model Loading Logic */}
      <ModelLoader
        config={config}
        selectedProduct={selectedProduct}
        onModelLoad={handleModelLoad}
        onBboxLoad={setBboxObj}
        onLoadingChange={setIsLoading}
        onError={setError}
      />

      {/* Material Management */}
      <MaterialManager
        model={currentModel}
        baseColor={baseColor}
        selectedProduct={selectedProduct}
      />

      {/* Model centered at [0,0,0] */}
      <primitive object={currentModel} />
      
      {/* Render designs with dynamic deformation mapping */}
      <DesignMapper 
        deformationData={deformationData}
        garmentScale={config.scale}
      />
      
      {/* Show bounding box for debugging */}
      {bboxObj && <primitive object={bboxObj} />}
      
      {/* Enhanced Animation Controller with fabric physics */}
      <AnimationController 
        groupRef={groupRef} 
        onDeformationUpdate={handleDeformationUpdate}
      />
    </group>
  );
};

// Preload all models
preloadModels(Object.values(MODEL_CONFIG).map(({ path }) => path));
