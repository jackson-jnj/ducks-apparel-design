
import React, { useState, useRef } from "react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { X, Palette } from "lucide-react";
import { Button } from "./button";

type ModalProps = { isOpen: boolean; onClose: () => void };
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const getColorFromHSL = (h:number, s:number, l:number) => `hsl(${h}, ${s}%, ${l}%)`;

function useDrag(onMove: (s:number, l:number) => void, areaRef: React.RefObject<HTMLDivElement>) {
  React.useEffect(() => {
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
      className="relative w-full h-48 rounded-2xl mb-6 cursor-crosshair shadow-inner animate-fade-in"
      style={{
        background: `linear-gradient(to right, #fff, hsl(${hue},100%,50%)), linear-gradient(to top, #000, transparent)`,
        touchAction: "none"
      }}
      onMouseDown={onPointer}
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
  );
};

const ColorPickerModal = ({ isOpen, onClose }: ModalProps) => {
  const { baseColor, setBaseColor } = useConfiguratorStore();
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  // Update HSL if baseColor changes
  React.useEffect(() => {
    // Parse baseColor string as hsl(...) or #fff
    let h = 200, s = 50, l = 50;
    if (baseColor.startsWith("hsl")) {
      const match = baseColor.match(/hsl\((\d+), ?(\d+)%?, ?(\d+)%?\)/);
      if (match) {
        h = Number(match[1]);
        s = Number(match[2]);
        l = Number(match[3]);
      }
    }
    setHue(h); setSaturation(s); setLightness(l);
  }, [baseColor, isOpen]);

  React.useEffect(() => {
    setBaseColor(getColorFromHSL(hue, saturation, lightness));
    // eslint-disable-next-line
  }, [hue, saturation, lightness]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl border border-gray-100 relative animate-scale-in">
        {/* Close button */}
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
          <Palette className="w-5 h-5 text-blue-500" />
          Garment Color
        </h3>
        {/* Modern Color Area */}
        <ColorArea
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          onChange={(s, l) => { setSaturation(s); setLightness(l); }}
        />
        {/* Hue Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hue</label>
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
        {/* Preview */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl border border-gray-200 shadow-inner"
            style={{ background: getColorFromHSL(hue, saturation, lightness) }}
          />
          <div>
            <span className="text-sm text-gray-600">Current</span>
            <span className="block text-xs font-mono">{getColorFromHSL(hue, saturation, lightness)}</span>
          </div>
        </div>
        <Button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
        >
          Apply Color
        </Button>
      </div>
    </div>
  );
};

export const ModernColorPicker = () => {
  const { baseColor } = useConfiguratorStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-800">Garment Color</h3>
      </div>
      <button
        className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer flex items-center justify-center text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
        style={{ backgroundColor: baseColor }}
        onClick={() => setIsModalOpen(true)}
      >
        <span className="drop-shadow-sm">Click to Change Color</span>
      </button>
      <ColorPickerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
