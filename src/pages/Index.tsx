
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { ApparelModel } from "@/components/3d/ApparelModel";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { useConfiguratorStore } from "@/store/configuratorStore";

const Index = () => {
  const { selectedProduct } = useConfiguratorStore();

  return (
    <div className="min-h-screen bg-background flex">
      {/* 3D Viewer */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          className="bg-gradient-to-b from-slate-50 to-slate-100"
        >
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <ApparelModel />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={8}
            />
          </Suspense>
        </Canvas>
        
        {/* Overlay Header */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h1 className="text-2xl font-bold text-foreground">
              3D Product Configurator
            </h1>
            <p className="text-muted-foreground">
              Customize your {selectedProduct} in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 bg-card border-l border-border">
        <ControlPanel />
      </div>
    </div>
  );
};

export default Index;
