
import { useDesignStore } from "@/store/designStore";
import { Slider } from "./slider";
import { Button } from "./button";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

export const DesignControls = () => {
  const { 
    designs, 
    selectedDesignId, 
    updateDesignPosition,
    updateDesignScale,
    updateDesignRotation,
    updateDesignOpacity,
    resetDesign
  } = useDesignStore();

  const selectedDesign = designs.find(d => d.id === selectedDesignId);

  if (!selectedDesign) {
    return (
      <div>
        <h3 className="text-sm font-medium mb-3">Design Controls</h3>
        <p className="text-sm text-muted-foreground">Select a design to see controls</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Design Controls</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => resetDesign(selectedDesign.id)}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Selected Design Preview */}
        <div className="flex items-center space-x-2 p-2 bg-muted rounded">
          <img
            src={selectedDesign.image}
            alt={selectedDesign.name}
            className="w-8 h-8 object-contain bg-white rounded"
          />
          <span className="text-sm font-medium truncate">{selectedDesign.name}</span>
        </div>

        {/* Position Controls */}
        <div>
          <label className="text-xs font-medium mb-2 block">Position X</label>
          <Slider
            value={[selectedDesign.position[0]]}
            onValueChange={([value]) => 
              updateDesignPosition(selectedDesign.id, [value, selectedDesign.position[1]])
            }
            min={-0.5}
            max={0.5}
            step={0.01}
          />
        </div>
        
        <div>
          <label className="text-xs font-medium mb-2 block">Position Y</label>
          <Slider
            value={[selectedDesign.position[1]]}
            onValueChange={([value]) => 
              updateDesignPosition(selectedDesign.id, [selectedDesign.position[0], value])
            }
            min={-0.5}
            max={0.5}
            step={0.01}
          />
        </div>

        {/* Scale Controls */}
        <div>
          <label className="text-xs font-medium mb-2 block">Scale</label>
          <Slider
            value={[selectedDesign.scale[0]]}
            onValueChange={([value]) => 
              updateDesignScale(selectedDesign.id, [value, value])
            }
            min={0.1}
            max={1.0}
            step={0.01}
          />
        </div>

        {/* Rotation Control */}
        <div>
          <label className="text-xs font-medium mb-2 block">Rotation</label>
          <Slider
            value={[selectedDesign.rotation]}
            onValueChange={([value]) => 
              updateDesignRotation(selectedDesign.id, value)
            }
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
          />
        </div>

        {/* Opacity Control */}
        <div>
          <label className="text-xs font-medium mb-2 block">Opacity</label>
          <Slider
            value={[selectedDesign.opacity]}
            onValueChange={([value]) => 
              updateDesignOpacity(selectedDesign.id, value)
            }
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};
