
import { useState } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Button } from "./button";
import { X, Palette } from "lucide-react";

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
    setBaseColor(color); // Real-time update
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    const color = `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
    setSelectedColor(color);
    setBaseColor(color); // Real-time update
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-start z-50 pl-4">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Garment Color</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Main color area */}
        <div 
          className="w-full h-48 rounded-xl mb-6 cursor-crosshair relative shadow-inner"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue}, 100%, 50%)), linear-gradient(to top, black, transparent)`
          }}
          onClick={handleColorChange}
        >
          <div 
            className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-2 -translate-y-2 pointer-events-none shadow-lg"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        </div>

        {/* Hue slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hue</label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer shadow-sm"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
          />
        </div>

        {/* Color preview */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-xl shadow-md border border-gray-200"
            style={{ backgroundColor: selectedColor }}
          />
          <div>
            <p className="text-sm text-gray-600">Current Color</p>
            <p className="font-mono text-xs text-gray-800">{selectedColor}</p>
          </div>
        </div>

        {/* Apply button */}
        <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2">
          Apply Color
        </Button>
      </div>
    </div>
  );
};

export const ModernColorPicker = () => {
  const { baseColor } = useConfiguratorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-800">Garment Color</h3>
      </div>
      
      {/* Current color display */}
      <button
        className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer flex items-center justify-center text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
        style={{ backgroundColor: baseColor }}
        onClick={() => setIsModalOpen(true)}
      >
        <span className="drop-shadow-sm">Click to Change Color</span>
      </button>

      <ColorPickerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

