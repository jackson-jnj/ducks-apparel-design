
import { useState } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X } from "lucide-react";
import type { BackgroundPreset } from "@/store/configuratorStore";

interface BackgroundColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
}

const BackgroundColorPicker = ({ isOpen, onClose, onColorSelect }: BackgroundColorPickerProps) => {
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  if (!isOpen) return null;

  const handleColorChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSaturation = (x / rect.width) * 100;
    const newLightness = 100 - (y / rect.height) * 100;
    
    setSaturation(newSaturation);
    setLightness(newLightness);
  };

  const handleDone = () => {
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    onColorSelect(color);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-80 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Background Color</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div 
          className="w-full h-32 rounded-lg mb-4 cursor-crosshair relative"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue}, 100%, 50%)), linear-gradient(to top, black, transparent)`
          }}
          onClick={handleColorChange}
        >
          <div 
            className="absolute w-3 h-3 border-2 border-white rounded-full -translate-x-1.5 -translate-y-1.5 pointer-events-none"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(parseInt(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer mb-4"
          style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
          }}
        />

        <Button onClick={handleDone} className="w-full">
          DONE
        </Button>
      </div>
    </div>
  );
};

const backgroundPresets = [
  { name: "Studio", value: "studio" as BackgroundPreset, color: "#f8f9fa" },
  { name: "White", value: "white" as BackgroundPreset, color: "#ffffff" },
  { name: "Black", value: "black" as BackgroundPreset, color: "#000000" },
  { name: "Gradient", value: "gradient" as BackgroundPreset, color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

export const BackgroundControls = () => {
  const { 
    backgroundPreset, 
    setBackgroundPreset,
    backgroundBlur,
    setBackgroundBlur 
  } = useConfiguratorStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleCustomColor = (color: string) => {
    // You can extend the store to handle custom background colors
    console.log('Custom background color:', color);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Background</h3>
      
      {/* Background presets */}
      <div className="grid grid-cols-2 gap-2">
        {backgroundPresets.map((preset) => (
          <Button
            key={preset.value}
            variant={backgroundPreset === preset.value ? "default" : "outline"}
            size="sm"
            onClick={() => setBackgroundPreset(preset.value)}
            className="justify-start text-xs"
          >
            <div 
              className="w-3 h-3 rounded-sm mr-2 border border-border"
              style={{ background: preset.color }}
            />
            {preset.name}
          </Button>
        ))}
      </div>

      {/* Custom color button */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowColorPicker(true)}
        className="w-full justify-center text-xs"
      >
        Custom Color
      </Button>

      {/* Blur control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-muted-foreground">Blur</label>
          <span className="text-xs text-muted-foreground">{backgroundBlur}%</span>
        </div>
        <Slider
          value={[backgroundBlur]}
          onValueChange={(value) => setBackgroundBlur(value[0])}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      <BackgroundColorPicker 
        isOpen={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        onColorSelect={handleCustomColor}
      />
    </div>
  );
};
