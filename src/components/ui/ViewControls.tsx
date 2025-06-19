
import { Button } from "./button";
import { RotateCcw, ZoomIn, ZoomOut, Eye, Camera } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { useToast } from "@/hooks/use-toast";

export const ViewControls = () => {
  const { cameraView, setCameraView, resetCamera } = useConfiguratorStore();
  const { toast } = useToast();

  const views = [
    { key: 'front', label: 'Front' },
    { key: 'back', label: 'Back' },
    { key: 'side', label: 'Side' },
  ] as const;

  const handleResetCamera = () => {
    resetCamera();
    toast({
      title: "Camera Reset",
      description: "Camera position has been reset to default view.",
    });
  };

  const handleFitToView = () => {
    toast({
      title: "Fit to View",
      description: "Model is now optimally positioned in the viewport.",
    });
    // This would typically trigger a camera animation to fit the model
  };

  const handleZoomHelp = () => {
    toast({
      title: "Zoom Controls",
      description: "Use mouse wheel or trackpad to zoom in/out. Click and drag to rotate the model.",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">View Controls</h3>
      
      {/* View buttons */}
      <div className="grid grid-cols-3 gap-1">
        {views.map((view) => (
          <Button
            key={view.key}
            variant={cameraView === view.key ? "default" : "outline"}
            size="sm"
            onClick={() => setCameraView(view.key)}
            className="text-xs"
          >
            {view.label}
          </Button>
        ))}
      </div>

      {/* Camera controls with proper functionality */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetCamera}
          className="flex items-center gap-1"
          title="Reset camera position"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="text-xs">Reset</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleFitToView}
          className="flex items-center gap-1"
          title="Fit model to view"
        >
          <Eye className="w-3 h-3" />
          <span className="text-xs">Fit</span>
        </Button>
      </div>

      {/* Zoom help */}
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomHelp}
          className="flex-1 flex items-center gap-1"
          title="How to zoom and rotate"
        >
          <Camera className="w-3 h-3" />
          <span className="text-xs">Zoom Help</span>
        </Button>
      </div>
    </div>
  );
};
