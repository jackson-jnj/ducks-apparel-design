
import { useState } from "react";
import { Button } from "./button";
import { Download, Camera, Video, Settings } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { useDesignStore } from "@/store/designStore";
import { useAnimationStore } from "@/store/animationStore";
import { toast } from "sonner";

export const ExportControls = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'image' | 'video'>('image');
  
  const { selectedProduct, baseColor } = useConfiguratorStore();
  const { designs } = useDesignStore();
  const { currentAnimation, animationSpeed } = useAnimationStore();

  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      // Capture canvas as image
      const canvas = document.querySelector('canvas');
      if (!canvas) throw new Error('No canvas found');
      
      const dataURL = canvas.toDataURL('image/png', 1.0);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `garment-${selectedProduct}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      
      toast.success("Image exported successfully!");
    } catch (error) {
      toast.error("Failed to export image");
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportVideo = async () => {
    setIsExporting(true);
    try {
      // This would implement video recording of the canvas
      // For now, show a coming soon message
      toast.success("Video export feature coming soon!");
      
      // Future implementation would use MediaRecorder API:
      // const stream = canvas.captureStream(30);
      // const recorder = new MediaRecorder(stream);
      // Record animation cycles...
      
    } catch (error) {
      toast.error("Failed to export video");
      console.error('Video export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getExportSummary = () => {
    return {
      product: selectedProduct,
      color: baseColor,
      designs: designs.length,
      animation: currentAnimation,
      speed: animationSpeed
    };
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Export & Download</h3>
      
      <div className="space-y-4">
        {/* Export Format Selection */}
        <div>
          <label className="text-xs font-medium mb-2 block">Export Format</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={exportFormat === 'image' ? "default" : "outline"}
              size="sm"
              onClick={() => setExportFormat('image')}
              className="flex items-center justify-center space-x-1"
            >
              <Camera className="w-4 h-4" />
              <span>Image</span>
            </Button>
            <Button
              variant={exportFormat === 'video' ? "default" : "outline"}
              size="sm"
              onClick={() => setExportFormat('video')}
              className="flex items-center justify-center space-x-1"
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </Button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="space-y-2">
          {exportFormat === 'image' ? (
            <Button 
              onClick={handleExportImage}
              disabled={isExporting}
              className="w-full"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export High-Res Image'}
            </Button>
          ) : (
            <Button 
              onClick={handleExportVideo}
              disabled={isExporting}
              className="w-full"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Recording...' : 'Export Animation Video'}
            </Button>
          )}
        </div>

        {/* Export Summary */}
        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <strong>Export will include:</strong>
          <ul className="mt-1 space-y-1">
            <li>• {selectedProduct} in {baseColor}</li>
            <li>• {designs.length} design(s) applied</li>
            <li>• {currentAnimation} animation at {animationSpeed}x speed</li>
            <li>• Current camera view and lighting</li>
          </ul>
        </div>

        {/* Advanced Export Settings */}
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="w-4 h-4" />
          Advanced Export Settings
        </Button>
      </div>
    </div>
  );
};
