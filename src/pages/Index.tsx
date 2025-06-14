
import { Scene } from "@/components/3d/Scene";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Maximize2 } from "lucide-react";

const Index = () => {
  const { selectedProduct } = useConfiguratorStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* 3D Viewer */}
      <div className="flex-1 relative min-h-[60vh] lg:min-h-screen">
        <Scene />
        
        {/* Floating Header */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/20">
            <h1 className="text-xl font-bold text-gray-800">
              Product Studio
            </h1>
            <p className="text-sm text-gray-500 capitalize">
              Designing {selectedProduct.replace('-', ' ')}
            </p>
          </div>
        </div>

        {/* Fullscreen button */}
        <div className="absolute top-6 right-6 z-10">
          <button className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/20 hover:bg-white transition-colors">
            <Maximize2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile hint */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 lg:hidden">
          <div className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 text-xs text-gray-600 shadow-lg border border-white/20">
            Drag to rotate • Pinch to zoom
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 shadow-xl">
        <ControlPanel />
      </div>
    </div>
  );
};

export default Index;
