
import { Button } from "./button";
import { RotateCcw, ZoomIn, ZoomOut, Eye } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";

export const ViewControls = () => {
  const { cameraView, setCameraView, resetCamera } = useConfiguratorStore();

  const views = [
    { key: 'front', label: 'Front' },
    { key: 'back', label: 'Back' },
    { key: 'side', label: 'Side' },
  ] as const;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">View</h3>
      
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

      {/* Camera controls */}
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={resetCamera}
          className="flex-1"
          title="Reset view"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          title="Fit to view"
        >
          <Eye className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
