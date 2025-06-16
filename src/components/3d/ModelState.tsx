
import { useState } from 'react';
import { Object3D } from 'three';
import { DeformationData } from './FabricPhysics';

export interface ModelStateData {
  currentModel: Object3D | null;
  groupPosition: [number, number, number];
  bboxObj: Object3D | null;
  isLoading: boolean;
  error: string | null;
  deformationData: DeformationData | null;
}

export const useModelState = () => {
  const [currentModel, setCurrentModel] = useState<Object3D | null>(null);
  const [groupPosition, setGroupPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [bboxObj, setBboxObj] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deformationData, setDeformationData] = useState<DeformationData | null>(null);

  const handleModelLoad = (model: Object3D, position: [number, number, number]) => {
    setCurrentModel(model);
    setGroupPosition(position);
  };

  const handleDeformationUpdate = (deformation: DeformationData) => {
    setDeformationData(deformation);
  };

  return {
    state: {
      currentModel,
      groupPosition,
      bboxObj,
      isLoading,
      error,
      deformationData,
    },
    actions: {
      handleModelLoad,
      setBboxObj,
      setIsLoading,
      setError,
      handleDeformationUpdate,
    },
  };
};
