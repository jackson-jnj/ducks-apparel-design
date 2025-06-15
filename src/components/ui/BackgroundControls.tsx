
import { useState } from "react";
import { Slider } from "./slider";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { ModernBackgroundPicker } from "./ModernBackgroundPicker";

export const BackgroundControls = () => {
  const {
    backgroundBlur,
    setBackgroundBlur
  } = useConfiguratorStore();
  const [showColorPicker, setShowColorPicker] = useState(false);

  // For the demo, this handler only logs but you can set real-time effect by storing color in your store.
  const handleCustomColor = (color: string) => {
    // TODO: Extend configuratorStore to handle a custom background color and pipe into your renderer.
    console.log('Set background color to:', color);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Background</h3>

      <button
        className="w-full h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
        onClick={() => setShowColorPicker(true)}
      >
        <span className="text-gray-700 font-medium">Choose Custom Background</span>
      </button>

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

      <ModernBackgroundPicker
        isOpen={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        onColorSelect={handleCustomColor}
      />
    </div>
  );
};
