
import { create } from 'zustand';

export interface Design {
  id: string;
  image: string;
  name: string;
  position: [number, number];
  scale: [number, number];
  rotation: number;
  opacity: number;
}

interface DesignStore {
  designs: Design[];
  selectedDesignId: string | null;
  
  // Actions
  addDesign: (image: string, name: string) => void;
  removeDesign: (id: string) => void;
  selectDesign: (id: string | null) => void;
  updateDesignPosition: (id: string, position: [number, number]) => void;
  updateDesignScale: (id: string, scale: [number, number]) => void;
  updateDesignRotation: (id: string, rotation: number) => void;
  updateDesignOpacity: (id: string, opacity: number) => void;
  resetDesign: (id: string) => void;
}

export const useDesignStore = create<DesignStore>((set, get) => ({
  designs: [],
  selectedDesignId: null,
  
  addDesign: (image, name) => {
    const newDesign: Design = {
      id: Date.now().toString(),
      image,
      name,
      position: [0, 0],
      scale: [0.3, 0.3],
      rotation: 0,
      opacity: 1,
    };
    set((state) => ({ 
      designs: [...state.designs, newDesign],
      selectedDesignId: newDesign.id
    }));
  },
  
  removeDesign: (id) => set((state) => ({
    designs: state.designs.filter(d => d.id !== id),
    selectedDesignId: state.selectedDesignId === id ? null : state.selectedDesignId
  })),
  
  selectDesign: (id) => set({ selectedDesignId: id }),
  
  updateDesignPosition: (id, position) => set((state) => ({
    designs: state.designs.map(d => d.id === id ? { ...d, position } : d)
  })),
  
  updateDesignScale: (id, scale) => set((state) => ({
    designs: state.designs.map(d => d.id === id ? { ...d, scale } : d)
  })),
  
  updateDesignRotation: (id, rotation) => set((state) => ({
    designs: state.designs.map(d => d.id === id ? { ...d, rotation } : d)
  })),
  
  updateDesignOpacity: (id, opacity) => set((state) => ({
    designs: state.designs.map(d => d.id === id ? { ...d, opacity } : d)
  })),
  
  resetDesign: (id) => set((state) => ({
    designs: state.designs.map(d => d.id === id ? {
      ...d,
      position: [0, 0],
      scale: [0.3, 0.3],
      rotation: 0,
      opacity: 1
    } : d)
  })),
}));
