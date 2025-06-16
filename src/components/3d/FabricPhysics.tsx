
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, Mesh, PlaneGeometry, MeshStandardMaterial } from 'three';
import { useAnimationStore } from '@/store/animationStore';

interface FabricPhysicsProps {
  groupRef: React.RefObject<Group>;
  onDeformation?: (deformationData: DeformationData) => void;
}

export interface DeformationData {
  windEffect: number;
  stretchFactor: Vector3;
  bendingPoints: Vector3[];
  waveAmplitude: number;
  currentTime: number;
}

export const FabricPhysics = ({ groupRef, onDeformation }: FabricPhysicsProps) => {
  const { currentAnimation, animationSpeed, isAnimating } = useAnimationStore();
  const timeRef = useRef(0);
  const previousDeformationRef = useRef<DeformationData | null>(null);

  // Fabric simulation parameters
  const fabricProperties = {
    elasticity: 0.8,
    damping: 0.95,
    windResistance: 0.3,
    gravityEffect: 0.1,
    inertia: 0.85
  };

  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimating) return;

    timeRef.current += delta * animationSpeed;
    const group = groupRef.current;
    const time = timeRef.current;

    let deformationData: DeformationData = {
      windEffect: 0,
      stretchFactor: new Vector3(1, 1, 1),
      bendingPoints: [],
      waveAmplitude: 0,
      currentTime: time
    };

    switch (currentAnimation) {
      case 'static':
        // Subtle breathing with micro fabric movements
        const breathingCycle = Math.sin(time * 0.8) * 0.008;
        const microWind = Math.sin(time * 2.3) * 0.003;
        
        group.scale.setScalar(1 + breathingCycle);
        group.rotation.y += microWind;
        
        // Slight fabric flutter at edges
        deformationData.windEffect = Math.sin(time * 1.5) * 0.02;
        deformationData.waveAmplitude = 0.005;
        break;

      case 'walking':
        // Realistic walking with fabric inertia and bounce
        const walkCycle = time * 1.8;
        const stepPhase = Math.sin(walkCycle);
        const bobPhase = Math.sin(walkCycle * 2);
        
        // Body sway and fabric lag
        const sway = stepPhase * 0.025;
        const fabricLag = Math.sin(walkCycle - 0.3) * 0.015; // Fabric follows with delay
        
        group.rotation.z = sway + fabricLag;
        group.position.y += bobPhase * 0.008;
        group.rotation.x = Math.sin(walkCycle * 0.5) * 0.01;
        
        // Dynamic stretch and compression
        const stretchX = 1 + Math.abs(stepPhase) * 0.01;
        const stretchY = 1 - Math.abs(bobPhase) * 0.005;
        group.scale.set(stretchX, stretchY, 1);
        
        // Wind effect from movement
        deformationData.windEffect = Math.abs(stepPhase) * 0.08;
        deformationData.stretchFactor.set(stretchX, stretchY, 1);
        deformationData.waveAmplitude = 0.015;
        
        // Add bending points for realistic wrinkles
        deformationData.bendingPoints = [
          new Vector3(0, 0.3, 0), // Chest area
          new Vector3(0, -0.2, 0), // Waist
          new Vector3(0.2 * stepPhase, 0, 0) // Side stretch
        ];
        break;

      case 'waves':
        // Flowing fabric with complex wave patterns
        const wave1 = Math.sin(time * 1.2) * 0.04;
        const wave2 = Math.cos(time * 0.8 + Math.PI/3) * 0.03;
        const wave3 = Math.sin(time * 2.1 + Math.PI/2) * 0.02;
        
        // Multi-layered wave motion
        group.rotation.x = wave1;
        group.rotation.z = wave2;
        group.rotation.y += wave3 * 0.5;
        
        // Dynamic scaling for flowing effect
        const flowScale = 1 + (wave1 + wave2) * 0.3;
        group.scale.y = flowScale;
        group.scale.x = 1 + wave3 * 0.1;
        
        // Strong wind and wave effects
        deformationData.windEffect = (Math.abs(wave1) + Math.abs(wave2)) * 0.15;
        deformationData.stretchFactor.set(group.scale.x, group.scale.y, 1);
        deformationData.waveAmplitude = 0.04;
        
        // Multiple bending points for complex deformation
        deformationData.bendingPoints = [
          new Vector3(wave2 * 0.3, wave1 * 0.4, 0),
          new Vector3(-wave3 * 0.2, wave2 * 0.3, 0),
          new Vector3(wave1 * 0.1, -wave3 * 0.2, 0),
          new Vector3(0, wave1 * 0.5, wave2 * 0.1)
        ];
        break;
    }

    // Apply smoothing to prevent jarring transitions
    if (previousDeformationRef.current) {
      const prev = previousDeformationRef.current;
      const smoothing = fabricProperties.inertia;
      
      deformationData.windEffect = 
        prev.windEffect * smoothing + deformationData.windEffect * (1 - smoothing);
      deformationData.waveAmplitude = 
        prev.waveAmplitude * smoothing + deformationData.waveAmplitude * (1 - smoothing);
    }

    previousDeformationRef.current = deformationData;
    
    // Notify parent component of deformation data
    if (onDeformation) {
      onDeformation(deformationData);
    }
  });

  return null;
};
