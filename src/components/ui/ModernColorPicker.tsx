
import React, { useState, useEffect } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Palette } from "lucide-react";
import { Button } from "./button";
import {
  hslToString,
  parseColor,
  rgbToHex,
  hslToRgb,
  rgbToHsl,
} from "./colorUtils";

// Clamping utility
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ColorArea = ({
  hue, saturation, lightness, onChange
}: {
  hue: number; saturation: number; lightness: number;
  onChange: (s: number, l: number) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Support drag on palette area
  useEffect(() => {
    let down = false;
    const handle = (e: MouseEvent) => {
      if (!down || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = clamp(e.clientX - rect.left, 0, rect.width);
      const y = clamp(e.clientY - rect.top, 0, rect.height);
      const sat = clamp((x / rect.width) * 100, 0, 100);
      const light = clamp(100 - (y / rect.height) * 100, 0, 100);
      onChange(sat, light);
    };
    const up = () => { down = false; };
    const downFn = () => { down = true; };
    const area = ref.current;
    if (area) area.addEventListener("mousedown", downFn);
    document.addEventListener("mousemove", handle);
    document.addEventListener("mouseup", up);
    return () => {
      if (area) area.removeEventListener("mousedown", downFn);
      document.removeEventListener("mousemove", handle);
      document.removeEventListener("mouseup", up);
    };
  }, [onChange]);

  const onPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    const sat = clamp((x / rect.width) * 100, 0, 100);
    const light = clamp(100 - (y / rect.height) * 100, 0, 100);
    onChange(sat, light);
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-40 rounded-lg mb-4 cursor-crosshair shadow-inner bg-white"
      style={{
        background: `linear-gradient(to right, #fff, hsl(${hue},100%,50%)), linear-gradient(to top, #000, transparent)`,
        touchAction: "none"
      }}
      onMouseDown={onPointer}
      tabIndex={0}
    >
      <div
        className="absolute w-4 h-4 border-2 border-white rounded-full pointer-events-none shadow-md"
        style={{
          left: `calc(${saturation}% - 8px)`,
          top: `calc(${100 - lightness}% - 8px)`,
          background: hslToString(hue, saturation, lightness),
          boxShadow: "0 0 0 2px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)"
        }}
      />
    </div>
  );
};

export const ModernColorPicker = () => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  // Picker state (single source of truth: h, s, l)
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [input, setInput] = useState<string>("");

  // Only sync FROM store TO local state (one direction to prevent infinite loop)
  useEffect(() => {
    const parsed = parseColor(baseColor);
    if (parsed) {
      setHue(parsed.h);
      setSaturation(parsed.s);
      setLightness(parsed.l);
      setInput(hslToString(parsed.h, parsed.s, parsed.l));
    } else {
      setHue(200); setSaturation(50); setLightness(50);
      setInput(hslToString(200, 50, 50));
    }
  }, [baseColor]);

  // Update store and input when user interacts with color area
  const handleColorAreaChange = (s: number, l: number) => {
    setSaturation(s);
    setLightness(l);
    const hsl = hslToString(hue, s, l);
    setBaseColor(hsl);
    setInput(hsl);
  };

  // Update store and input when user changes hue
  const handleHueChange = (newHue: number) => {
    setHue(newHue);
    const hsl = hslToString(newHue, saturation, lightness);
    setBaseColor(hsl);
    setInput(hsl);
  };

  // Text input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    setInput(raw);
    const parsed = parseColor(raw);
    if (parsed) {
      setHue(parsed.h);
      setSaturation(parsed.s);
      setLightness(parsed.l);
      setBaseColor(hslToString(parsed.h, parsed.s, parsed.l));
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800 flex gap-2 items-center">
          <Palette className="w-4 h-4 text-gray-600" />
          <span>Garment Color</span>
        </h3>
      </div>
      <ColorArea
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onChange={handleColorAreaChange}
      />
      <div className="mb-2">
        <label className="block text-xs font-medium text-gray-700 mb-1">Hue</label>
        <input
          aria-label="Hue"
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={e => handleHueChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          style={{
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
          }}
        />
      </div>
      {/* Custom color input */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Custom Color (hex/rgb/hsl)</label>
        <input
          type="text"
          className="w-full border rounded-md px-2 py-1 text-xs font-mono"
          value={input}
          onChange={handleInputChange}
          placeholder="#123456 or rgb(1,2,3) or hsl(1,2%,3%)"
        />
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-lg border border-gray-200"
          style={{ background: hslToString(hue, saturation, lightness) }}
        />
        <div className="text-xs">
          <span className="text-gray-600">Current</span>
          <span className="block font-mono">{hslToString(hue, saturation, lightness)}</span>
        </div>
      </div>
    </div>
  );
};
