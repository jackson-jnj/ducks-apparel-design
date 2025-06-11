
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ImprovedApparelModel } from './ImprovedApparelModel';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PCFSoftShadowMap } from 'three';

export const Scene = () => {
  const { backgroundPreset, backgroundBlur } = useConfiguratorStore();

  const getEnvironmentPreset = () => {
    switch (backgroundPreset) {
      case 'studio': return 'studio';
      case 'white': return 'warehouse';
      case 'black': return 'night';
      case 'gradient': return 'sunset';
      default: return 'studio';
    }
  };

  const getBackgroundColor = () => {
    switch (backgroundPreset) {
      case 'white': return '#ffffff';
      case 'black': return '#000000';
      case 'gradient': return '#667eea';
      default: return '#f8f9fa';
    }
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows={{
          type: PCFSoftShadowMap,
          enabled: true
        }}
        dpr={[1, 2]}
        style={{
          background: getBackgroundColor(),
          filter: `blur(${backgroundBlur * 0.01}px)`
        }}
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.3}
            color="#ffffff"
          />
          
          {/* Rim light */}
          <directionalLight
            position={[0, 0, -10]}
            intensity={0.5}
            color="#4f94ff"
          />

          {/* Environment lighting */}
          <Environment 
            preset={getEnvironmentPreset()}
            background={false}
            blur={backgroundBlur * 0.01}
          />

          {/* Model */}
          <ImprovedApparelModel />

          {/* Ground shadows */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -1.5, 0]}
            opacity={0.2}
            width={5}
            height={5}
            blur={2}
            far={2.5}
          />

          {/* Enhanced orbit controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
