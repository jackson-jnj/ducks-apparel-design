
import { useConfiguratorStore } from "@/store/configuratorStore";

const colorPalette = [
  "#FFFFFF", // White
  "#000000", // Black
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
  "#FFC0CB", // Pink
  "#A52A2A", // Brown
  "#808080", // Gray
  "#008000", // Dark Green
  "#000080", // Navy
];

export const ColorStrip = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Colors</h3>
      <div className="flex flex-wrap gap-2">
        {colorPalette.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              baseColor === color 
                ? "border-primary shadow-md ring-2 ring-primary/20" 
                : "border-border hover:border-primary/50"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setBaseColor(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};
