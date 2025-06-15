import React, { useRef, useEffect, useState } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Image } from "lucide-react";
import { Button } from "./button";
import {
  hslToString,
  parseColor,
} from "./colorUtils";
import { ColorArea } from "./ColorArea";
import { PickerHeader } from "./PickerHeader";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ModernBackgroundPicker = ({
  isOpen,
  onClose,
  onColorSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect?: (color: string) => void;
}) => {
  // Get color from store directly
  const { setBackgroundPreset, setBackgroundColor, backgroundColor } = useConfiguratorStore((s) => ({
    setBackgroundPreset: s.setBackgroundPreset,
    setBackgroundColor: s.setBackgroundColor,
    backgroundColor: s.backgroundColor,
  }));

  // Picker color state (local for UI only, but initialized from store)
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(30);
  const [lightness, setLightness] = useState(98);
  const [input, setInput] = useState<string>("");

  // Always sync color picker state to store color on open
  useEffect(() => {
    if (isOpen && backgroundColor) {
      const parsed = parseColor(backgroundColor);
      if (parsed) {
        setHue(parsed.h);
        setSaturation(parsed.s);
        setLightness(parsed.l);
        setInput(hslToString(parsed.h, parsed.s, parsed.l));
      }
    }
  // eslint-disable-next-line
  }, [isOpen, backgroundColor]);

  // Whenever picker state changes, push color to store (and trigger preview)
  useEffect(() => {
    if (!isOpen) return;
    const colorString = hslToString(hue, saturation, lightness);
    setBackgroundPreset("white");
    setBackgroundColor(colorString);
    if (onColorSelect) onColorSelect(colorString);
    setInput(colorString);
    // eslint-disable-next-line
  }, [hue, saturation, lightness, isOpen]);

  // Text input handler (hex/rgb/hsl)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    setInput(raw);
    const parsed = parseColor(raw);
    if (parsed) {
      setHue(parsed.h);
      setSaturation(parsed.s);
      setLightness(parsed.l);
    }
  };

  // The Done button just closes the picker (color already live)
  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <PickerHeader
        title="Background Color"
        icon={<Image className="w-4 h-4 text-sky-600" />}
        onClose={onClose}
      />
      <ColorArea
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onChange={(s, l) => { setSaturation(s); setLightness(l); }}
      />
      <div className="mb-2">
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
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Custom Color (hex/rgb/hsl)</label>
        <input
          type="text"
          className="w-full border rounded-md px-2 py-1 text-xs font-mono"
          value={input}
          onChange={handleInputChange}
          placeholder="#abcdef or rgb(0,0,0) or hsl(1,2%,3%)"
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
      <Button
        onClick={handleApply}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-lg py-2"
      >
        Done
      </Button>
    </div>
  );
};

export default ModernBackgroundPicker;
