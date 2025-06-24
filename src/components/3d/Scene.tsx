
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ModelManager } from './ModelManager';
import { ModelLoadingSpinner } from './ModelLoader';
import { PCFSoftShadowMap } from 'three';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const Scene = () => {
  const backgroundColor = useConfiguratorStore((state) => state.backgroundColor);

  return (
    <div
      className="w-full h-full flex items-center justify-center relative"
      style={{
        minHeight: 0,
        minWidth: 0,
        maxHeight: "calc(100vh - 80px)",
        maxWidth: "100vw",
        overflow: "hidden",
        margin: "0 auto",
        background: backgroundColor,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.5, 8],
          fov: 32,
          near: 0.1,
          far: 1000,
        }}
        shadows={{
          type: PCFSoftShadowMap,
          enabled: true,
        }}
        dpr={[1, 2]}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "auto",
          background: "transparent",
        }}
      >
        <Suspense fallback={<ModelLoadingSpinner />}>
          {/* Optimized lighting setup */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.8}
            color="#ffffff"
          />

          {/* Environment lighting */}
          <Environment preset="studio" background={false} />

          {/* Model with simplified loading system */}
          <ModelManager />

          {/* Ground shadows */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -2.5, 0]}
            opacity={0.4}
            width={8}
            height={8}
            blur={2}
            far={4}
          />

          {/* Orbit controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={30}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
