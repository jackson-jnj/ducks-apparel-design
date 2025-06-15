
import React, { useRef, useEffect, useState } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Image } from "lucide-react";
import { Button } from "./button";

// Utility functions for limiting range
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

    if (areaRef.current) areaRef.current.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      if (areaRef.current) areaRef.current.removeEventListener("mousedown", onDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [onMove, areaRef]);
}

type ModernBackgroundPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect?: (color: string) => void;
};

export const ModernBackgroundPicker = ({
  isOpen,
  onClose,
  onColorSelect,
}: ModernBackgroundPickerProps) => {
  const { setBackgroundPreset } = useConfiguratorStore();
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(30);
  const [lightness, setLightness] = useState(98);
  const [previewColor, setPreviewColor] = useState(getColorFromHSL(220, 30, 98));
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviewColor(getColorFromHSL(hue, saturation, lightness));
  }, [hue, saturation, lightness]);

  useDrag((s, l) => {
    setSaturation(s);
    setLightness(l);
  }, areaRef);

  const handlePointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    const s = clamp((x / rect.width) * 100, 0, 100);
    const l = clamp(100 - (y / rect.height) * 100, 0, 100);
    setSaturation(s);
    setLightness(l);
  };

  const handleApply = () => {
    setBackgroundPreset("white");
    if (onColorSelect) onColorSelect(previewColor);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl border border-gray-100 relative animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </Button>
        <h3 className="text-lg font-semibold mb-6 text-gray-900 flex gap-2 items-center">
          <Image className="w-5 h-5 text-sky-600" />
          Background Color
        </h3>
        <div
          ref={areaRef}
          className="relative w-full h-44 rounded-xl mb-6 cursor-crosshair shadow-inner animate-fade-in"
          style={{
            background: `linear-gradient(to right, #fff, hsl(${hue},100%,50%)), linear-gradient(to top, #000, transparent)`,
            touchAction: "none"
          }}
          onMouseDown={handlePointer}
        >
          <div
            className="absolute w-5 h-5 border-2 border-white rounded-full pointer-events-none shadow-lg transition-all duration-100"
            style={{
              left: `calc(${saturation}% - 10px)`,
              top: `calc(${100 - lightness}% - 10px)`,
              background: getColorFromHSL(hue, saturation, lightness),
              boxShadow: "0 0 0 2px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)",
            }}
          />
        </div>
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Hue</label>
          <input
            aria-label="Hue"
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={e => setHue(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer shadow transition-all"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
          />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl border border-gray-200 shadow-inner"
            style={{ background: previewColor }}
          />
          <div>
            <span className="text-sm text-gray-600">Preview</span>
            <span className="block text-xs font-mono">{previewColor}</span>
          </div>
        </div>
        <Button
          onClick={handleApply}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-lg py-2"
        >
          Apply Color
        </Button>
      </div>
    </div>
  );
};
