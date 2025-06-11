
import { Button } from "./button";
import { Slider } from "./slider";
import { useConfiguratorStore } from "@/store/configuratorStore";

const backgroundPresets = [
  { name: "Studio", value: "studio", color: "#f8f9fa" },
  { name: "White", value: "white", color: "#ffffff" },
  { name: "Black", value: "black", color: "#000000" },
  { name: "Gradient", value: "gradient", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

export const BackgroundControls = () => {
  const { 
    backgroundPreset, 
    setBackgroundPreset,
    backgroundBlur,
    setBackgroundBlur 
  } = useConfiguratorStore();

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
