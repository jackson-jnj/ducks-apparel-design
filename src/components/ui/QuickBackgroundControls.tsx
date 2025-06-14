
import { useState } from "react";
import { Button } from "./button";
import { Slider } from "./slider";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Image } from "lucide-react";
import type { BackgroundPreset } from "@/store/configuratorStore";

const backgroundPresets = [
  { name: "Studio", value: "studio" as BackgroundPreset, gradient: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" },
  { name: "White", value: "white" as BackgroundPreset, gradient: "#ffffff" },
  { name: "Black", value: "black" as BackgroundPreset, gradient: "#000000" },
  { name: "Gradient", value: "gradient" as BackgroundPreset, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

export const QuickBackgroundControls = () => {
  const { 
    backgroundPreset, 
    setBackgroundPreset,
    backgroundBlur,
    setBackgroundBlur 
  } = useConfiguratorStore();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Image className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-800">Background</h3>
      </div>
      
      {/* Background Presets */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {backgroundPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setBackgroundPreset(preset.value)}
            className={`relative h-16 rounded-lg border-2 transition-all duration-150 hover:scale-105 overflow-hidden ${
              backgroundPreset === preset.value ? 'border-blue-500 shadow-md' : 'border-gray-200'
            }`}
            style={{ background: preset.gradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs font-medium ${
                preset.value === 'black' ? 'text-white' : 'text-gray-700'
              }`}>
                {preset.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Blur Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-600">Blur</label>
          <span className="text-xs text-gray-500">{backgroundBlur}%</span>
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
