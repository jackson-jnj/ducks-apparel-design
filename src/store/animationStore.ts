
import { create } from 'zustand';

export type AnimationState = 'static' | 'walking' | 'waves';

interface AnimationStore {
  currentAnimation: AnimationState;
  animationSpeed: number;
  isAnimating: boolean;
  
  // Actions
  setAnimation: (animation: AnimationState) => void;
  setAnimationSpeed: (speed: number) => void;
  toggleAnimation: () => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  currentAnimation: 'static',
  animationSpeed: 1.0,
  isAnimating: true,
  
  setAnimation: (animation) => set({ currentAnimation: animation }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  toggleAnimation: () => set((state) => ({ isAnimating: !state.isAnimating })),
}));
