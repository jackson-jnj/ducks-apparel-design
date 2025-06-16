
export type ProductType = 'short-sleeve-tshirt' | 'long-sleeve-tshirt' | 'short-sleeve-polo' | 'hoodie';

export interface ModelConfigItem {
  path: string;
  scale: [number, number, number];
  baseYOffset: number;
  collarYOffset: number;
}

export const MODEL_CONFIG: Record<ProductType, ModelConfigItem> = {
  'short-sleeve-tshirt': {
    path: '/oversized_t-shirt/scene.gltf',
    scale: [4.5, 4.5, 4.5] as [number, number, number],
    baseYOffset: -0.5,
    collarYOffset: 0.64,
  },
  'long-sleeve-tshirt': {
    path: '/long_sleeve_shirt/scene.gltf',
    scale: [4.5, 4.5, 4.5] as [number, number, number],
    baseYOffset: -0.5,
    collarYOffset: 0.70,
  },
  'short-sleeve-polo': {
    path: '/short_sleeve_polo/scene.gltf',
    scale: [4.5, 4.5, 4.5] as [number, number, number],
    baseYOffset: -0.48,
    collarYOffset: 0.52,
  },
  'hoodie': {
    path: '/hoodie_with_hood_up/scene.gltf',
    scale: [4.3, 4.3, 4.3] as [number, number, number],
    baseYOffset: -0.48,
    collarYOffset: 0.48,
  },
} as const;

// Debug configuration
export const DEBUG_BBOX = false;
