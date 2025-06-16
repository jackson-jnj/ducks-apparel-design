
import { useAnimationStore } from "@/store/animationStore";
import { Button } from "./button";
import { Slider } from "./slider";
import { Switch } from "./switch";
import { Play, Pause, Zap, User, Waves } from "lucide-react";

export const AnimationControls = () => {
  const { 
    currentAnimation, 
    animationSpeed, 
    isAnimating,
    setAnimation, 
    setAnimationSpeed, 
    toggleAnimation 
  } = useAnimationStore();

  const animations = [
    { id: 'static' as const, label: 'Static', icon: Pause },
    { id: 'walking' as const, label: 'Walking', icon: User },
    { id: 'waves' as const, label: 'Waves', icon: Waves },
  ];

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Animation Controls</h3>
      
      <div className="space-y-4">
        {/* Animation Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm">Enable Animation</label>
          <Switch checked={isAnimating} onCheckedChange={toggleAnimation} />
        </div>

        {/* Animation Type Selection */}
        <div>
          <label className="text-xs font-medium mb-2 block">Animation Type</label>
          <div className="grid grid-cols-3 gap-2">
            {animations.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentAnimation === id ? "default" : "outline"}
                size="sm"
                onClick={() => setAnimation(id)}
                className="flex flex-col items-center p-2 h-auto"
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Speed Control */}
        <div>
          <label className="text-xs font-medium mb-2 block">
            Speed: {animationSpeed.toFixed(1)}x
          </label>
          <Slider
            value={[animationSpeed]}
            onValueChange={([value]) => setAnimationSpeed(value)}
            min={0.1}
            max={3.0}
            step={0.1}
            disabled={!isAnimating}
          />
        </div>

        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
          <strong>Current:</strong> {currentAnimation} at {animationSpeed}x speed
        </div>
      </div>
    </div>
  );
};
