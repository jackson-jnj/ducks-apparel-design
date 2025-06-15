
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { ModelManager } from './ModelManager';
import { ModelLoadingSpinner } from './ModelLoader';
import { PCFSoftShadowMap } from 'three';

export const Scene = () => {
  return (
    <div className="w-full h-full relative" style={{ background: '#2d3436' }}>
      <Canvas
        camera={{ 
          position: [0, 0, 4], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows={{
          type: PCFSoftShadowMap,
          enabled: true
        }}
        dpr={[1, 2]}
        style={{
          background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
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
            position={[0, -1.5, 0]}
            opacity={0.4}
            width={8}
            height={8}
            blur={2}
            far={4}
          />

          {/* Enhanced orbit controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
            autoRotate={false}
            dampingFactor={0.08}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
