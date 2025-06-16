
import { useRef } from 'react';
import { Group } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { MODEL_CONFIG } from './ModelConfig';
import { ModelLoader } from './ModelLoader';
import { MaterialManager } from './MaterialManager';
import { AnimationController } from './AnimationController';
import { DesignMapper } from './DesignMapper';
import { ModelEffects } from './ModelEffects';
import { ModelStateData } from './ModelState';
import { DeformationData } from './FabricPhysics';

interface ModelRendererProps {
  state: ModelStateData;
  onModelLoad: (model: any, position: [number, number, number]) => void;
  onBboxLoad: (bbox: any) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
  onDeformationUpdate: (deformation: DeformationData) => void;
}

export const ModelRenderer = ({
  state,
  onModelLoad,
  onBboxLoad,
  onLoadingChange,
  onError,
  onDeformationUpdate,
}: ModelRendererProps) => {
  const groupRef = useRef<Group>(null);
  const { selectedProduct, baseColor } = useConfiguratorStore();
  const config = MODEL_CONFIG[selectedProduct];

  if (state.error) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }

  if (state.isLoading || !state.currentModel) {
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
      position={state.groupPosition}
    >
      {/* Model Loading Logic */}
      <ModelLoader
        config={config}
        selectedProduct={selectedProduct}
        onModelLoad={onModelLoad}
        onBboxLoad={onBboxLoad}
        onLoadingChange={onLoadingChange}
        onError={onError}
      />

      {/* Material Management */}
      <MaterialManager
        model={state.currentModel}
        baseColor={baseColor}
        selectedProduct={selectedProduct}
      />

      {/* Model centered at [0,0,0] */}
      <primitive object={state.currentModel} />
      
      {/* Render designs with dynamic deformation mapping */}
      <DesignMapper 
        deformationData={state.deformationData}
        garmentScale={config.scale}
      />
      
      {/* Show bounding box for debugging */}
      {state.bboxObj && <primitive object={state.bboxObj} />}
      
      {/* Enhanced Animation Controller with fabric physics */}
      <AnimationController 
        groupRef={groupRef} 
        onDeformationUpdate={onDeformationUpdate}
      />

      {/* Camera effects */}
      <ModelEffects groupRef={groupRef} />
    </group>
  );
};
