
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
          position: [0, 0, 15], // Moved camera back to accommodate larger models
          fov: 35, // Slightly wider field of view
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
          {/* Enhanced lighting setup for larger models */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-8, 8, -8]}
            intensity={1.2}
            color="#ffffff"
          />
          
          {/* Rim light for better definition */}
          <directionalLight
            position={[0, 0, -15]}
            intensity={1.5}
            color="#74b9ff"
          />

          {/* Environment lighting */}
          <Environment preset="studio" background={false} />

          {/* Centered and enlarged model */}
          <ModelManager />

          {/* Ground shadows positioned lower for bigger models */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -4, 0]}
            opacity={0.4}
            width={12}
            height={12}
            blur={2}
            far={6}
          />

          {/* Orbit controls adjusted for larger models */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={25}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]} // Target the center where models are positioned
            autoRotate={false}
            enableDamping={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
