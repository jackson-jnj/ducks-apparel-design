
import { Scene } from "@/components/3d/Scene";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { useConfiguratorStore } from "@/store/configuratorStore";

const Index = () => {
  const { selectedProduct } = useConfiguratorStore();

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* 3D Viewer */}
      <div className="flex-1 relative min-h-[60vh] lg:min-h-screen">
        <Scene />
        
        {/* Floating Header */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
            <h1 className="text-xl font-bold text-foreground">
              Product Studio
            </h1>
            <p className="text-sm text-muted-foreground capitalize">
              {selectedProduct.replace('totebag', 'tote bag')} configurator
            </p>
          </div>
        </div>

        {/* Mobile hint */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 lg:hidden">
          <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground">
            Drag to rotate • Pinch to zoom
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 bg-card border-t lg:border-t-0 lg:border-l border-border">
        <ControlPanel />
      </div>
    </div>
  );
};

export default Index;
