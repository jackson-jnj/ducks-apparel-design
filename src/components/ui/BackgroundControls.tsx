import { useState } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Image as BgIcon } from "lucide-react";
import type { BackgroundPreset } from "@/store/configuratorStore";

const ModernBackgroundColorModal = ({
  isOpen,
  onClose,
  setColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  setColor: (color: string) => void;
}) => {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(15);
  const [lightness, setLightness] = useState(96);

  if (!isOpen) return null;

  const previewColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSaturation = (x / rect.width) * 100;
    const newLightness = 100 - (y / rect.height) * 100;
    setSaturation(newSaturation);
    setLightness(newLightness);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Background Color</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div
          className="w-full h-40 rounded-xl mb-8 cursor-crosshair relative"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue},100%,50%)), linear-gradient(to top, black, transparent)`,
          }}
          onClick={handleAreaClick}
        >
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-2 -translate-y-2 pointer-events-none shadow"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              background: previewColor,
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hue</label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={e => setHue(parseInt(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
            }}
          />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl border border-gray-200"
            style={{ background: previewColor }}
          />
          <span className="font-mono text-xs">{previewColor}</span>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={() => {
            setColor(previewColor);
            onClose();
          }}
        >
          Apply Background
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
  const [customColor, setCustomColor] = useState<string | null>(null);

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
      <ModernBackgroundColorModal
        isOpen={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        setColor={(color: string) => setCustomColor(color)}
      />
      {customColor && (
        <div className="mt-2 flex gap-2 items-center">
          <span className="text-xs text-gray-500">Preview</span>
          <div className="w-8 h-8 rounded shadow border" style={{ background: customColor }} />
        </div>
      )}

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
    </div>
  );
};
