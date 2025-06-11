
import { HexColorPicker } from "react-colorful";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { useState } from "react";
import { Button } from "./button";
import { Palette } from "lucide-react";

const presetColors = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'
];

export const ColorPicker = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Base Color</h3>
      
      {/* Current color display */}
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-8 h-8 rounded border-2 border-border cursor-pointer"
          style={{ backgroundColor: baseColor }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <span className="text-sm font-mono">{baseColor}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPicker(!showPicker)}
        >
          <Palette className="w-4 h-4" />
        </Button>
      </div>

      {/* Preset colors */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {presetColors.map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            onClick={() => setBaseColor(color)}
          />
        ))}
      </div>

      {/* Color picker */}
      {showPicker && (
        <div className="space-y-3">
          <HexColorPicker color={baseColor} onChange={setBaseColor} />
        </div>
      )}
    </div>
  );
};
