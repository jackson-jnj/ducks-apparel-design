
import { useState } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Button } from "./button";
import { X } from "lucide-react";

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColorPickerModal = ({ isOpen, onClose }: ColorPickerModalProps) => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [selectedColor, setSelectedColor] = useState(baseColor);
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [alpha, setAlpha] = useState(100);

  if (!isOpen) return null;

  const handleColorChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSaturation = (x / rect.width) * 100;
    const newLightness = 100 - (y / rect.height) * 100;
    
    setSaturation(newSaturation);
    setLightness(newLightness);
    
    const color = `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;
    setSelectedColor(color);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    const color = `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
    setSelectedColor(color);
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlpha(parseInt(e.target.value));
  };

  const handleDone = () => {
    setBaseColor(selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-80 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Color Picker</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Main color area */}
        <div 
          className="w-full h-48 rounded-lg mb-4 cursor-crosshair relative"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue}, 100%, 50%)), linear-gradient(to top, black, transparent)`
          }}
          onClick={handleColorChange}
        >
          <div 
            className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-2 -translate-y-2 pointer-events-none"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        {/* Hue slider */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
          />
        </div>

        {/* Alpha slider */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max="100"
            value={alpha}
            onChange={handleAlphaChange}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-transparent to-current"
          />
        </div>

        {/* Color values */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <div>
            <label className="text-muted-foreground">Hex</label>
            <div className="font-mono">{selectedColor}</div>
          </div>
          <div>
            <label className="text-muted-foreground">Alpha</label>
            <div className="font-mono">{alpha}</div>
          </div>
        </div>

        {/* Done button */}
        <Button onClick={handleDone} className="w-full">
          DONE
        </Button>
      </div>
    </div>
  );
};

export const ModernColorPicker = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const presetColors = [
    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#008000', '#000080'
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Colors</h3>
      
      {/* Current color display */}
      <div 
        className="w-full h-12 rounded-lg border-2 border-border cursor-pointer flex items-center justify-center text-white font-medium shadow-sm hover:scale-105 transition-transform"
        style={{ backgroundColor: baseColor }}
        onClick={() => setIsModalOpen(true)}
      >
        Custom Color
      </div>

      {/* Preset colors grid */}
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            className="w-full aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-110"
            style={{ 
              backgroundColor: color,
              borderColor: baseColor === color ? '#3b82f6' : '#e5e7eb'
            }}
            onClick={() => setBaseColor(color)}
            title={color}
          />
        ))}
      </div>

      <ColorPickerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
