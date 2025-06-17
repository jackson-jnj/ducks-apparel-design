
import { useState, useRef, useCallback } from "react";
import { Button } from "./button";
import { Download, Camera, Video, Settings, FileImage, Play, Zap } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { useDesignStore } from "@/store/designStore";
import { useAnimationStore } from "@/store/animationStore";
import { toast } from "sonner";
import { Slider } from "./slider";

export const UltraHighQualityExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'image' | 'video'>('image');
  const [imageQuality, setImageQuality] = useState(4.0); // 4K default
  const [videoFormat, setVideoFormat] = useState<'mp4' | 'webm'>('mp4');
  const [videoDuration, setVideoDuration] = useState(5);
  const [includeBackground, setIncludeBackground] = useState(true);
  const [exportResolution, setExportResolution] = useState<'4K' | '8K' | '16K'>('4K');
  
  const { selectedProduct, baseColor, backgroundColor } = useConfiguratorStore();
  const { designs } = useDesignStore();
  const { currentAnimation, setAnimation } = useAnimationStore();
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const getResolutionMultiplier = () => {
    switch (exportResolution) {
      case '4K': return 4;
      case '8K': return 8;
      case '16K': return 16;
      default: return 4;
    }
  };

  const getCanvas = (): HTMLCanvasElement | null => {
    return document.querySelector('canvas');
  };

  const createHighQualityCanvas = useCallback((originalCanvas: HTMLCanvasElement, multiplier: number) => {
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d')!;
    
    // Set high resolution
    const originalWidth = originalCanvas.width;
    const originalHeight = originalCanvas.height;
    
    offscreenCanvas.width = originalWidth * multiplier;
    offscreenCanvas.height = originalHeight * multiplier;
    
    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    return { offscreenCanvas, ctx, originalWidth, originalHeight };
  }, []);

  const renderWithBackground = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (includeBackground && backgroundColor !== 'transparent') {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (backgroundColor.includes('gradient')) {
        // Parse gradient colors
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(0.5, '#7c3aed');
        gradient.addColorStop(1, '#1e293b');
      } else {
        gradient.addColorStop(0, backgroundColor);
        gradient.addColorStop(1, backgroundColor);
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [includeBackground, backgroundColor]);

  const handleExportUltraHDImage = async () => {
    setIsExporting(true);
    try {
      const originalCanvas = getCanvas();
      if (!originalCanvas) throw new Error('3D canvas not found');
      
      const multiplier = getResolutionMultiplier();
      const { offscreenCanvas, ctx } = createHighQualityCanvas(originalCanvas, multiplier);
      
      // Render background
      renderWithBackground(offscreenCanvas, ctx);
      
      // Wait for high-quality render
      await new Promise(resolve => {
        const renderHighQuality = () => {
          // Temporarily increase original canvas size for better sampling
          const originalWidth = originalCanvas.width;
          const originalHeight = originalCanvas.height;
          
          originalCanvas.width = originalWidth * 2;
          originalCanvas.height = originalHeight * 2;
          
          requestAnimationFrame(() => {
            // Draw the enhanced canvas
            ctx.drawImage(originalCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
            
            // Restore original size
            originalCanvas.width = originalWidth;
            originalCanvas.height = originalHeight;
            
            resolve(null);
          });
        };
        
        renderHighQuality();
      });
      
      // Convert to high-quality PNG
      const dataURL = offscreenCanvas.toDataURL('image/png', 1.0);
      
      // Create download with proper filename
      const link = document.createElement('a');
      link.download = `ultra-hd-mockup-${selectedProduct}-${exportResolution}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
      
      toast.success(`Ultra HD ${exportResolution} PNG exported successfully!`);
    } catch (error) {
      toast.error("Failed to export ultra HD image");
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportUltraHDVideo = async () => {
    setIsExporting(true);
    try {
      const originalCanvas = getCanvas();
      if (!originalCanvas) throw new Error('3D canvas not found');
      
      // Set animation for video
      const originalAnimation = currentAnimation;
      setAnimation('walking');
      
      // Create high-quality video stream
      const stream = originalCanvas.captureStream(60); // 60fps for smooth motion
      const mimeType = videoFormat === 'mp4' ? 'video/mp4; codecs="avc1.42E01E"' : 'video/webm; codecs="vp9"';
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm',
        videoBitsPerSecond: 50000000 // 50Mbps for ultra high quality
      });
      
      const recordedChunks: Blob[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { 
          type: videoFormat === 'mp4' ? 'video/mp4' : 'video/webm' 
        });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.download = `ultra-hd-animation-${selectedProduct}-${videoDuration}s-${Date.now()}.${videoFormat}`;
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
        setAnimation(originalAnimation);
        toast.success("Ultra HD animation video exported successfully!");
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
      toast.error("Failed to export ultra HD video");
      console.error('Video export error:', error);
      setIsExporting(false);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 text-purple-500" />
        Ultra HD Export
      </h3>
      
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
              <span>Ultra HD PNG</span>
            </Button>
            <Button
              variant={exportFormat === 'video' ? "default" : "outline"}
              size="sm"
              onClick={() => setExportFormat('video')}
              className="flex items-center justify-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>HD Video</span>
            </Button>
          </div>
        </div>

        {/* Resolution Controls for Images */}
        {exportFormat === 'image' && (
          <div>
            <label className="text-xs font-medium mb-2 block">Resolution Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {['4K', '8K', '16K'].map((res) => (
                <Button
                  key={res}
                  variant={exportResolution === res ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExportResolution(res as any)}
                  className="text-xs"
                >
                  {res}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Video Controls */}
        {exportFormat === 'video' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-2 block">
                Duration ({videoDuration}s)
              </label>
              <Slider
                value={[videoDuration]}
                onValueChange={([value]) => setVideoDuration(value)}
                min={2}
                max={15}
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

        {/* Background Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium">Include Background</label>
          <Button
            variant={includeBackground ? "default" : "outline"}
            size="sm"
            onClick={() => setIncludeBackground(!includeBackground)}
            className="h-8"
          >
            {includeBackground ? 'Yes' : 'No'}
          </Button>
        </div>

        {/* Export Button */}
        <Button 
          onClick={exportFormat === 'image' ? handleExportUltraHDImage : handleExportUltraHDVideo}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? (
            exportFormat === 'image' ? `Exporting ${exportResolution}...` : `Recording HD Video...`
          ) : (
            exportFormat === 'image' ? `Export ${exportResolution} PNG` : 'Export HD Video'
          )}
        </Button>

        {/* Export Preview */}
        <div className="text-xs text-muted-foreground bg-gradient-to-r from-purple-50 to-cyan-50 p-3 rounded-lg border">
          <strong className="text-purple-900">Export Settings:</strong>
          <ul className="mt-2 space-y-1 text-purple-800">
            <li>• {selectedProduct} in {baseColor}</li>
            <li>• {designs.length} design(s) applied</li>
            <li>• {exportFormat === 'video' ? 'Walking animation' : 'Current view'}</li>
            <li>• {exportFormat === 'image' ? `${exportResolution} resolution` : `${videoDuration}s @ 60fps`}</li>
            <li>• Background: {includeBackground ? 'Included' : 'Transparent'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
