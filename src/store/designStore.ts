
import { create } from 'zustand';

export interface Design {
  id: string;
  image: string;
  name: string;
  position: [number, number];
  scale: [number, number];
  rotation: number;
  opacity: number;
  side: 'front' | 'back'; // New field for design placement
}

interface DesignStore {
  designs: Design[];
  selectedDesignId: string | null;
  activeSide: 'front' | 'back'; // Current side being edited
  
  // Actions
  addDesign: (image: string, name: string, side: 'front' | 'back') => void;
  removeDesign: (id: string) => void;
  selectDesign: (id: string | null) => void;
  updateDesignPosition: (id: string, position: [number, number]) => void;
  updateDesignScale: (id: string, scale: [number, number]) => void;
  updateDesignRotation: (id: string, rotation: number) => void;
  updateDesignOpacity: (id: string, opacity: number) => void;
  resetDesign: (id: string) => void;
  setActiveSide: (side: 'front' | 'back') => void;
  
  // Getters
  getFrontDesigns: () => Design[];
  getBackDesigns: () => Design[];
  getActiveDesigns: () => Design[];
}

export const useDesignStore = create<DesignStore>((set, get) => ({
  designs: [],
  selectedDesignId: null,
  activeSide: 'front',
  
  addDesign: (image, name, side) => {
    const newDesign: Design = {
      id: Date.now().toString(),
      image,
      name,
      position: [0, 0],
      scale: [0.3, 0.3],
      rotation: 0,
      opacity: 1,
      side,
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
  
  setActiveSide: (side) => set({ activeSide: side, selectedDesignId: null }),
  
  // Getters
  getFrontDesigns: () => get().designs.filter(d => d.side === 'front'),
  getBackDesigns: () => get().designs.filter(d => d.side === 'back'),
  getActiveDesigns: () => get().designs.filter(d => d.side === get().activeSide),
}));
