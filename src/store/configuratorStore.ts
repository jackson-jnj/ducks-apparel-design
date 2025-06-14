
import { create } from 'zustand';

export type ProductType = 'short-sleeve-tshirt' | 'long-sleeve-tshirt' | 'short-sleeve-polo' | 'hoodie';
export type CameraView = 'front' | 'back' | 'side';
export type BackgroundPreset = 'studio' | 'white' | 'black' | 'gradient';

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
  cameraView: CameraView;
  backgroundPreset: BackgroundPreset;
  backgroundBlur: number;
  isLoading: boolean;
  
  // Actions
  setSelectedProduct: (product: ProductType) => void;
  setBaseColor: (color: string) => void;
  setLogoImage: (image: string) => void;
  setLogoPosition: (position: [number, number, number]) => void;
  setLogoScale: (scale: [number, number, number]) => void;
  setLogoRotation: (rotation: [number, number, number]) => void;
  setCameraView: (view: CameraView) => void;
  setBackgroundPreset: (preset: BackgroundPreset) => void;
  setBackgroundBlur: (blur: number) => void;
  setLoading: (loading: boolean) => void;
  resetCamera: () => void;
  resetConfiguration: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedProduct: 'short-sleeve-tshirt',
  baseColor: '#FFFFFF',
  logoConfig: {
    image: null,
    position: [0, 0.2, 0.51],
    scale: [0.3, 0.3, 0.3],
    rotation: [0, 0, 0],
  },
  cameraView: 'front',
  backgroundPreset: 'studio',
  backgroundBlur: 0,
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
  setCameraView: (view) => set({ cameraView: view }),
  setBackgroundPreset: (preset) => set({ backgroundPreset: preset }),
  setBackgroundBlur: (blur) => set({ backgroundBlur: blur }),
  setLoading: (loading) => set({ isLoading: loading }),
  resetCamera: () => set({ cameraView: 'front' }),
  resetConfiguration: () => set({
    baseColor: '#FFFFFF',
    cameraView: 'front',
    backgroundPreset: 'studio',
    backgroundBlur: 0,
    logoConfig: {
      image: null,
      position: [0, 0.2, 0.51],
      scale: [0.3, 0.3, 0.3],
      rotation: [0, 0, 0],
    },
  }),
}));
