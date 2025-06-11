
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Slider } from "./slider";
import { Button } from "./button";
import { RotateCcw } from "lucide-react";

export const LogoControls = () => {
  const { logoConfig, setLogoPosition, setLogoScale, setLogoRotation } = useConfiguratorStore();

  if (!logoConfig.image) {
    return (
      <div>
        <h3 className="text-sm font-medium mb-3">Logo Controls</h3>
        <p className="text-sm text-muted-foreground">Upload a logo to see controls</p>
      </div>
    );
  }

  const resetLogo = () => {
    setLogoPosition([0, 0.2, 0.51]);
    setLogoScale([0.3, 0.3, 0.3]);
    setLogoRotation([0, 0, 0]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Logo Controls</h3>
        <Button variant="outline" size="sm" onClick={resetLogo}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Position Controls */}
        <div>
          <label className="text-xs font-medium mb-2 block">Position X</label>
          <Slider
            value={[logoConfig.position[0]]}
            onValueChange={([value]) => 
              setLogoPosition([value, logoConfig.position[1], logoConfig.position[2]])
            }
            min={-0.5}
            max={0.5}
            step={0.01}
          />
        </div>
        
        <div>
          <label className="text-xs font-medium mb-2 block">Position Y</label>
          <Slider
            value={[logoConfig.position[1]]}
            onValueChange={([value]) => 
              setLogoPosition([logoConfig.position[0], value, logoConfig.position[2]])
            }
            min={-0.5}
            max={0.8}
            step={0.01}
          />
        </div>

        {/* Scale Controls */}
        <div>
          <label className="text-xs font-medium mb-2 block">Scale</label>
          <Slider
            value={[logoConfig.scale[0]]}
            onValueChange={([value]) => 
              setLogoScale([value, value, value])
            }
            min={0.1}
            max={0.8}
            step={0.01}
          />
        </div>

        {/* Rotation Controls */}
        <div>
          <label className="text-xs font-medium mb-2 block">Rotation</label>
          <Slider
            value={[logoConfig.rotation[2]]}
            onValueChange={([value]) => 
              setLogoRotation([logoConfig.rotation[0], logoConfig.rotation[1], value])
            }
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};
