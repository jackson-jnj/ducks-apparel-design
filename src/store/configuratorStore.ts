
import { create } from 'zustand';

export type ProductType = 'tshirt' | 'hoodie' | 'totebag';

interface LogoConfig {
  image: string | null;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

interface ConfiguratorState {
  selectedProduct: ProductType;
  baseColor: string;
  logoConfig: LogoConfig;
  isLoading: boolean;
  
  // Actions
  setSelectedProduct: (product: ProductType) => void;
  setBaseColor: (color: string) => void;
  setLogoImage: (image: string) => void;
  setLogoPosition: (position: [number, number, number]) => void;
  setLogoScale: (scale: [number, number, number]) => void;
  setLogoRotation: (rotation: [number, number, number]) => void;
  setLoading: (loading: boolean) => void;
  resetConfiguration: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedProduct: 'tshirt',
  baseColor: '#ffffff',
  logoConfig: {
    image: null,
    position: [0, 0.2, 0.51],
    scale: [0.3, 0.3, 0.3],
    rotation: [0, 0, 0],
  },
  isLoading: false,

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setBaseColor: (color) => set({ baseColor: color }),
  setLogoImage: (image) => 
    set((state) => ({
      logoConfig: { ...state.logoConfig, image }
    })),
  setLogoPosition: (position) =>
    set((state) => ({
      logoConfig: { ...state.logoConfig, position }
    })),
  setLogoScale: (scale) =>
    set((state) => ({
      logoConfig: { ...state.logoConfig, scale }
    })),
  setLogoRotation: (rotation) =>
    set((state) => ({
      logoConfig: { ...state.logoConfig, rotation }
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  resetConfiguration: () => set({
    baseColor: '#ffffff',
    logoConfig: {
      image: null,
      position: [0, 0.2, 0.51],
      scale: [0.3, 0.3, 0.3],
      rotation: [0, 0, 0],
    },
  }),
}));
