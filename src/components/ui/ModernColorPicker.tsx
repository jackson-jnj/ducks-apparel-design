
import React, { useState, useRef, useEffect } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Palette } from "lucide-react";
import { Button } from "./button";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const getColorFromHSL = (h:number, s:number, l:number) => `hsl(${h}, ${s}%, ${l}%)`;

function useDrag(onMove: (s:number, l:number) => void, areaRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    let dragging = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || !areaRef.current) return;
      const rect = areaRef.current.getBoundingClientRect();
      const x = clamp(e.clientX - rect.left, 0, rect.width);
      const y = clamp(e.clientY - rect.top, 0, rect.height);
      const saturation = clamp((x / rect.width) * 100, 0, 100);
      const lightness = clamp(100 - (y / rect.height) * 100, 0, 100);
      onMove(saturation, lightness);
    };
    const onUp = () => { dragging = false };
    const onDown = () => { dragging = true };

    const areaElement = areaRef.current;
    if (areaElement) {
        areaElement.addEventListener("mousedown", onDown);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      if (areaElement) {
        areaElement.removeEventListener("mousedown", onDown);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [onMove, areaRef]);
}

const ColorArea = ({
  hue, saturation, lightness, onChange,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (s: number, l: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useDrag(onChange, ref);

  const onPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    const s = clamp((x / rect.width) * 100, 0, 100);
    const l = clamp(100 - (y / rect.height) * 100, 0, 100);
    onChange(s, l);
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-40 rounded-lg mb-4 cursor-crosshair shadow-inner"
      style={{
        background: `linear-gradient(to right, #fff, hsl(${hue},100%,50%)), linear-gradient(to top, #000, transparent)`,
        touchAction: "none"
      }}
      onMouseDown={onPointer}
    >
      <div
        className="absolute w-4 h-4 border-2 border-white rounded-full pointer-events-none shadow-md"
        style={{
          left: `calc(${saturation}% - 8px)`,
          top: `calc(${100 - lightness}% - 8px)`,
          background: getColorFromHSL(hue, saturation, lightness),
        }}
      />
    </div>
  );
};

export const ModernColorPicker = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [isPickerOpen, setPickerOpen] = useState(false);
  
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  useEffect(() => {
    if (isPickerOpen) {
      let h = 200, s = 50, l = 50;
      if (baseColor.startsWith("hsl")) {
        const match = baseColor.match(/hsl\((\d+), ?(\d+)%?, ?(\d+)%?\)/);
        if (match) {
          h = Number(match[1]);
          s = Number(match[2]);
          l = Number(match[3]);
        }
      }
      setHue(h);
      setSaturation(s);
      setLightness(l);
    }
  }, [isPickerOpen, baseColor]);

  useEffect(() => {
    if (isPickerOpen) {
      setBaseColor(getColorFromHSL(hue, saturation, lightness));
    }
  }, [hue, saturation, lightness, isPickerOpen, setBaseColor]);
  
  if (!isPickerOpen) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-800">Garment Color</h3>
        </div>
        <button
          className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer flex items-center justify-center text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
          style={{ backgroundColor: baseColor }}
          onClick={() => setPickerOpen(true)}
        >
          <span className="drop-shadow-sm">Click to Change Color</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800 flex gap-2 items-center">
          <Palette className="w-4 h-4 text-gray-600" />
          <span>Garment Color</span>
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPickerOpen(false)}
          className="h-8 w-8 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ColorArea
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onChange={(s, l) => { setSaturation(s); setLightness(l); }}
      />
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Hue</label>
        <input
          aria-label="Hue"
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={e => setHue(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
          }}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-lg border border-gray-200"
          style={{ background: getColorFromHSL(hue, saturation, lightness) }}
        />
        <div className="text-xs">
          <span className="text-gray-600">Current</span>
          <span className="block font-mono">{getColorFromHSL(hue, saturation, lightness)}</span>
        </div>
      </div>
      
      <Button
        onClick={() => setPickerOpen(false)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm"
      >
        Done
      </Button>
    </div>
  );
};
