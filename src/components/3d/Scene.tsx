
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
          position: [0, 0, 35], // Moved camera further back for larger models
          fov: 50, // Wider field of view for better visibility
          near: 0.1,
          far: 2000,
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
          {/* Enhanced lighting setup for much larger models */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[20, 20, 15]}
            intensity={4}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-15, 15, -15]}
            intensity={2}
            color="#ffffff"
          />
          
          {/* Rim light for better definition */}
          <directionalLight
            position={[0, 0, -25]}
            intensity={2.5}
            color="#74b9ff"
          />

          {/* Environment lighting */}
          <Environment preset="studio" background={false} />

          {/* Centered and enlarged model */}
          <ModelManager />

          {/* Ground shadows positioned for bigger models */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -12, 0]}
            opacity={0.4}
            width={30}
            height={30}
            blur={2}
            far={15}
          />

          {/* Enhanced orbit controls with much better zoom range */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8} // Allow much closer zoom
            maxDistance={100} // Allow much further zoom
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI - Math.PI / 8}
            target={[0, 0, 0]}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
            zoomSpeed={1.5} // Faster zoom response
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
