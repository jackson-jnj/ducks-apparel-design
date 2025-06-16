
import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Object3D } from 'three';
import { ModelConfigItem, DEBUG_BBOX } from './ModelConfig';
import { useModelTransformer } from './ModelTransformer';

interface ModelLoaderProps {
  config: ModelConfigItem;
  selectedProduct: string;
  onModelLoad: (model: Object3D, groupPosition: [number, number, number]) => void;
  onBboxLoad: (bbox: Object3D | null) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export const ModelLoader = ({ 
  config, 
  selectedProduct, 
  onModelLoad, 
  onBboxLoad, 
  onLoadingChange, 
  onError 
}: ModelLoaderProps) => {
  const { scene } = useGLTF(config.path, true);
  const { centerModel, createDebugBBox } = useModelTransformer();

  useEffect(() => {
    onLoadingChange(true);
    onError(null);

    if (!scene) {
      onError(`Failed to load model for ${selectedProduct}`);
      onLoadingChange(false);
      return;
    }

    // Clone the loaded scene
    const model = scene.clone(true);

    // Center the model and get positioning data
    const { size, groupPosition } = centerModel(model, config);

    // Create debug bounding box if needed
    if (DEBUG_BBOX) {
      const bboxObj = createDebugBBox(size);
      onBboxLoad(bboxObj);
    } else {
      onBboxLoad(null);
    }

    onModelLoad(model, groupPosition);
    onLoadingChange(false);
  }, [scene, selectedProduct, config, centerModel, createDebugBBox, onModelLoad, onBboxLoad, onLoadingChange, onError]);

  return null;
};

// Preload all models
export const preloadModels = (modelPaths: string[]) => {
  modelPaths.forEach((path) => {
    useGLTF.preload(path);
  });
};
