
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, Mesh, Object3D } from 'three';
import { useAnimationStore } from '@/store/animationStore';

interface HyperRealisticPhysicsProps {
  groupRef: React.RefObject<Group>;
  onDeformation?: (deformationData: DeformationData) => void;
}

export interface DeformationData {
  windEffect: number;
  stretchFactor: Vector3;
  bendingPoints: Vector3[];
  waveAmplitude: number;
  currentTime: number;
  fabricTension: number;
  weightDistribution: Vector3[];
  clothFold: Vector3[];
}

export const HyperRealisticPhysics = ({ groupRef, onDeformation }: HyperRealisticPhysicsProps) => {
  const { currentAnimation, animationSpeed, isAnimating } = useAnimationStore();
  const timeRef = useRef(0);
  const previousStateRef = useRef<any>({});
  const fabricMemoryRef = useRef<Vector3[]>([]);

  // Advanced fabric simulation parameters for hyper-realism
  const fabricProperties = {
    elasticity: 0.92,
    damping: 0.88,
    windResistance: 0.25,
    gravityEffect: 0.15,
    inertia: 0.75,
    tensionResponse: 0.45,
    clothWeight: 0.3,
    frictionCoefficient: 0.6,
    springConstant: 0.8,
    dampingForce: 0.12
  };

  // Initialize fabric memory points for realistic cloth behavior
  useEffect(() => {
    fabricMemoryRef.current = Array.from({ length: 16 }, () => new Vector3(0, 0, 0));
  }, []);

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
      currentTime: time,
      fabricTension: 0,
      weightDistribution: [],
      clothFold: []
    };

    switch (currentAnimation) {
      case 'walking':
        // Hyper-realistic human walking simulation
        const walkFreq = 1.8; // Human walking frequency
        const walkCycle = time * walkFreq;
        
        // Primary gait cycle phases
        const heelStrike = Math.sin(walkCycle);
        const toeOff = Math.sin(walkCycle + Math.PI);
        const midSwing = Math.cos(walkCycle + Math.PI/2);
        
        // Secondary motion: torso sway and rotation
        const torsoSway = Math.sin(walkCycle * 0.5) * 0.02; // Subtle side-to-side
        const torsoRotation = Math.sin(walkCycle) * 0.008; // Counter-rotation
        const shoulderMovement = Math.sin(walkCycle + Math.PI) * 0.01;
        
        // Vertical bounce (center of mass trajectory)
        const verticalBounce = Math.abs(Math.sin(walkCycle * 2)) * 0.012;
        const pelvisRotation = Math.sin(walkCycle) * 0.015;
        
        // Apply realistic body mechanics to garment
        group.rotation.z = torsoSway + (Math.sin(walkCycle * 1.2) * 0.003); // Body lean
        group.rotation.y = torsoRotation;
        group.rotation.x = Math.sin(walkCycle * 0.3) * 0.005; // Forward/back tilt
        group.position.y += verticalBounce;
        
        // Advanced fabric dynamics
        const stepImpact = Math.abs(heelStrike) * 0.8;
        const fabricLag = Math.sin(walkCycle - 0.4) * 0.02; // Fabric follows with realistic delay
        const armSwing = Math.sin(walkCycle + Math.PI) * 0.008;
        
        // Realistic fabric stretching based on body movement
        const chestExpansion = 1 + (Math.sin(walkCycle * 3) * 0.003); // Breathing
        const waistCompression = 1 - (Math.abs(pelvisRotation) * 0.4);
        const shoulderStretch = 1 + (Math.abs(shoulderMovement) * 0.6);
        
        group.scale.set(
          shoulderStretch + fabricLag * 0.5,
          chestExpansion * waistCompression,
          1 + (stepImpact * 0.002)
        );
        
        // Advanced fabric physics: momentum and inertia
        const momentum = new Vector3(
          heelStrike * 0.008,
          verticalBounce * 0.5,
          toeOff * 0.003
        );
        
        // Cloth folding at stress points
        const stressPoints = [
          new Vector3(shoulderMovement * 0.8, 0.4, armSwing * 0.3), // Shoulder area
          new Vector3(-shoulderMovement * 0.6, 0.2, -armSwing * 0.2), // Opposite shoulder
          new Vector3(pelvisRotation * 0.4, -0.1, fabricLag * 0.5), // Waist
          new Vector3(torsoSway * 0.3, -0.3, stepImpact * 0.2), // Hip area
          new Vector3(0, 0.1, fabricLag * 0.8) // Chest center
        ];
        
        // Weight distribution simulation
        const weightPoints = [
          new Vector3(stepImpact * 0.15, -0.4, 0), // Gravitational pull
          new Vector3(momentum.x * 0.7, momentum.y * 0.3, 0), // Movement weight
          new Vector3(fabricLag * 0.2, -0.2, momentum.z * 0.4) // Fabric weight
        ];
        
        // Wind effect from movement
        const movementWind = (Math.abs(heelStrike) + Math.abs(toeOff)) * 0.06;
        
        deformationData = {
          windEffect: movementWind,
          stretchFactor: new Vector3(shoulderStretch, chestExpansion, 1),
          bendingPoints: stressPoints,
          waveAmplitude: stepImpact * 0.02,
          currentTime: time,
          fabricTension: stepImpact * 0.8 + Math.abs(fabricLag) * 0.6,
          weightDistribution: weightPoints,
          clothFold: stressPoints.slice(0, 3) // Primary fold points
        };
        
        // Memory-based fabric behavior (cloth remembers previous states)
        fabricMemoryRef.current.forEach((memory, index) => {
          const influence = 0.1 + (index / fabricMemoryRef.current.length) * 0.05;
          memory.lerp(momentum, influence);
          
          // Apply memory influence to subtle secondary movements
          const memoryInfluence = memory.multiplyScalar(0.03);
          group.position.add(memoryInfluence);
        });
        
        break;

      case 'waves':
        // Enhanced wave physics for fabric flow
        const wave1 = Math.sin(time * 1.4) * 0.05;
        const wave2 = Math.cos(time * 0.9 + Math.PI/3) * 0.04;
        const wave3 = Math.sin(time * 2.3 + Math.PI/2) * 0.025;
        const wave4 = Math.cos(time * 0.6 + Math.PI) * 0.03;
        
        group.rotation.x = wave1;
        group.rotation.z = wave2;
        group.rotation.y += wave3 * 0.3;
        
        const flowScale = 1 + (wave1 + wave2 + wave4) * 0.2;
        group.scale.set(
          1 + wave3 * 0.15,
          flowScale,
          1 + (wave1 * wave2) * 0.1
        );
        
        deformationData = {
          windEffect: (Math.abs(wave1) + Math.abs(wave2) + Math.abs(wave4)) * 0.12,
          stretchFactor: new Vector3(group.scale.x, group.scale.y, group.scale.z),
          bendingPoints: [
            new Vector3(wave2 * 0.4, wave1 * 0.5, wave4 * 0.2),
            new Vector3(-wave3 * 0.3, wave2 * 0.4, -wave1 * 0.15),
            new Vector3(wave1 * 0.2, -wave3 * 0.3, wave2 * 0.25),
            new Vector3(wave4 * 0.15, wave1 * 0.6, -wave3 * 0.1)
          ],
          waveAmplitude: 0.05,
          currentTime: time,
          fabricTension: Math.abs(wave1 * wave2) * 0.6,
          weightDistribution: [new Vector3(0, -0.1, 0)],
          clothFold: []
        };
        break;

      default: // static with micro-movements
        const breathe = Math.sin(time * 0.8) * 0.006;
        const subtleWind = Math.sin(time * 2.1) * 0.002;
        
        group.scale.setScalar(1 + breathe);
        group.rotation.y += subtleWind * 0.3;
        
        deformationData = {
          windEffect: Math.abs(subtleWind) * 0.01,
          stretchFactor: new Vector3(1, 1 + breathe, 1),
          bendingPoints: [new Vector3(0, breathe * 0.5, 0)],
          waveAmplitude: 0.003,
          currentTime: time,
          fabricTension: Math.abs(breathe) * 0.2,
          weightDistribution: [new Vector3(0, -0.05, 0)],
          clothFold: []
        };
        break;
    }

    // Apply advanced smoothing with momentum conservation
    if (previousStateRef.current.deformation) {
      const prev = previousStateRef.current.deformation;
      const smoothing = fabricProperties.inertia;
      
      deformationData.windEffect = 
        prev.windEffect * smoothing + deformationData.windEffect * (1 - smoothing);
      deformationData.waveAmplitude = 
        prev.waveAmplitude * smoothing + deformationData.waveAmplitude * (1 - smoothing);
      deformationData.fabricTension = 
        prev.fabricTension * smoothing + deformationData.fabricTension * (1 - smoothing);
    }

    previousStateRef.current.deformation = deformationData;
    
    if (onDeformation) {
      onDeformation(deformationData);
    }
  });

  return null;
};
