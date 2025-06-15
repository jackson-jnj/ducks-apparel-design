
import React, { useRef, useEffect } from "react";
import { hslToString } from "./colorUtils";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type ColorAreaProps = {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (s: number, l: number) => void;
};

/**
 * The color area for hue/saturation/lightness selection in ModernBackgroundPicker.
 */
export const ColorArea: React.FC<ColorAreaProps> = ({
  hue,
  saturation,
  lightness,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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
