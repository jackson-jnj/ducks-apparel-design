
import { useState, useRef } from "react";
import { Button } from "./button";
import { Download, Camera, Video, Settings, FileImage, Play } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { useDesignStore } from "@/store/designStore";
import { useAnimationStore } from "@/store/animationStore";
import { toast } from "sonner";
import { Slider } from "./slider";

export const EnhancedExportControls = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'image' | 'video'>('image');
  const [imageQuality, setImageQuality] = useState(1.0);
  const [videoFormat, setVideoFormat] = useState<'mp4' | 'webm'>('mp4');
  const [videoDuration, setVideoDuration] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const { selectedProduct, baseColor } = useConfiguratorStore();
  const { designs } = useDesignStore();
  const { currentAnimation, setAnimation } = useAnimationStore();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const getCanvas = (): HTMLCanvasElement | null => {
    return document.querySelector('canvas');
  };

  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const canvas = getCanvas();
      if (!canvas) throw new Error('Canvas not found');
      
      // Create high-resolution canvas
      const originalWidth = canvas.width;
      const originalHeight = canvas.height;
      const scaleFactor = imageQuality === 1.0 ? 2 : imageQuality; // 2x for high quality
      
      // Temporarily increase canvas resolution
      canvas.width = originalWidth * scaleFactor;
      canvas.height = originalHeight * scaleFactor;
      
      // Wait for next frame to ensure render
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const dataURL = canvas.toDataURL('image/png', 1.0);
      
      // Restore original size
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      
      // Create download
      const link = document.createElement('a');
      link.download = `3d-mockup-${selectedProduct}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      
      toast.success("High-quality PNG exported successfully!");
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
      const canvas = getCanvas();
      if (!canvas) throw new Error('Canvas not found');
      
      // Set animation to waves for video
      const originalAnimation = currentAnimation;
      setAnimation('waves');
      
      recordedChunksRef.current = [];
      
      const stream = canvas.captureStream(30);
      const mimeType = videoFormat === 'mp4' ? 'video/mp4' : 'video/webm';
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm'
      });
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { 
          type: videoFormat === 'mp4' ? 'video/mp4' : 'video/webm' 
        });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `3d-mockup-animation-${selectedProduct}-${Date.now()}.${videoFormat}`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
        setAnimation(originalAnimation); // Restore original animation
        toast.success("Animation video exported successfully!");
        setIsExporting(false);
      };
      
      mediaRecorderRef.current.start();
      
      // Stop recording after specified duration
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, videoDuration * 1000);
      
    } catch (error) {
      toast.error("Failed to export video");
      console.error('Video export error:', error);
      setIsExporting(false);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Export & Download</h3>
      
      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="text-xs font-medium mb-2 block">Export Format</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={exportFormat === 'image' ? "default" : "outline"}
              size="sm"
              onClick={() => setExportFormat('image')}
              className="flex items-center justify-center space-x-2"
            >
              <FileImage className="w-4 h-4" />
              <span>PNG Image</span>
            </Button>
            <Button
              variant={exportFormat === 'video' ? "default" : "outline"}
              size="sm"
              onClick={() => setExportFormat('video')}
              className="flex items-center justify-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </Button>
          </div>
        </div>

        {/* Quality/Duration Controls */}
        {exportFormat === 'image' ? (
          <div>
            <label className="text-xs font-medium mb-2 block">
              Image Quality ({Math.round(imageQuality * 100)}%)
            </label>
            <Slider
              value={[imageQuality]}
              onValueChange={([value]) => setImageQuality(value)}
              min={0.5}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-2 block">
                Duration ({videoDuration}s)
              </label>
              <Slider
                value={[videoDuration]}
                onValueChange={([value]) => setVideoDuration(value)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-2 block">Video Format</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={videoFormat === 'mp4' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVideoFormat('mp4')}
                >
                  MP4
                </Button>
                <Button
                  variant={videoFormat === 'webm' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVideoFormat('webm')}
                >
                  WebM
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        <Button 
          onClick={exportFormat === 'image' ? handleExportImage : handleExportVideo}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? (
            exportFormat === 'image' ? 'Exporting Image...' : `Recording... (${videoDuration}s)`
          ) : (
            exportFormat === 'image' ? 'Export High-Res PNG' : 'Export Animation Video'
          )}
        </Button>

        {/* Export Preview */}
        <div className="text-xs text-muted-foreground bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border">
          <strong className="text-blue-900">Export Preview:</strong>
          <ul className="mt-2 space-y-1 text-blue-800">
            <li>• {selectedProduct} in {baseColor}</li>
            <li>• {designs.length} design(s) applied</li>
            <li>• {exportFormat === 'video' ? 'Waves animation' : 'Current view'}</li>
            <li>• {exportFormat === 'image' ? `${Math.round(imageQuality * 100)}% quality` : `${videoDuration}s duration`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
