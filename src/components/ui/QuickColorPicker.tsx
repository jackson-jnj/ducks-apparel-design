
import { useState } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Palette } from "lucide-react";

const presetColors = [
  '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000'
];

export const QuickColorPicker = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [customColor, setCustomColor] = useState(baseColor);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    setBaseColor(color);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-800">Garment Color</h3>
      </div>
      
      {/* Current Color Display */}
      <div className="mb-4">
        <div 
          className="w-full h-12 rounded-lg border-2 border-gray-200 shadow-sm"
          style={{ backgroundColor: baseColor }}
        />
      </div>

      {/* Preset Colors */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {presetColors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-150 hover:scale-110 ${
              baseColor === color ? 'border-blue-500 shadow-md' : 'border-gray-200'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setBaseColor(color)}
          />
        ))}
      </div>

      {/* Custom Color Input */}
      <div className="space-y-2">
        <label className="text-xs text-gray-600">Custom Color</label>
        <input
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer"
        />
      </div>
    </div>
  );
};
