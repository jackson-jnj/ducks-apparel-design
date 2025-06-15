
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ModelManager } from './ModelManager';
import { ModelLoadingSpinner } from './ModelLoader';
import { PCFSoftShadowMap } from 'three';

export const Scene = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative bg-gradient-to-b from-[#2d3436] to-[#636e72]"
      style={{
        minHeight: 0,
        minWidth: 0,
        maxHeight: "calc(100vh - 80px)",
        maxWidth: "100vw",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.5, 8],    // Moved camera back further and up
          fov: 32,                 // Even narrower FOV for better fit
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
          {/* Lighting setup optimized for dark background */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2}
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
          
          {/* Rim light for better definition */}
          <directionalLight
            position={[0, 0, -10]}
            intensity={1}
            color="#74b9ff"
          />

          {/* Environment lighting */}
          <Environment preset="studio" background={false} />

          {/* Model with new loading system */}
          <ModelManager />

          {/* Ground shadows */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -2.5, 0]}    // Moved shadows down
            opacity={0.4}
            width={8}
            height={8}
            blur={2}
            far={4}
          />

          {/* Enhanced orbit controls - REDUCED DAMPING FOR MORE STATIC MOVEMENT */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}              // Allow zooming much closer
            maxDistance={30}             // Allow zooming much further
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}          // Reset target to center
            autoRotate={false}
            dampingFactor={0.01}        // Much lower damping for instant response
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
