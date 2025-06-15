
/**
 * Utility functions for color conversion and parsing
 */
export function hslToString(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

export function rgbToString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function hexToRgb(hex: string): [number, number, number] | null {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map(x => x+x).join("");
  if (c.length !== 6) return null;
  const n = parseInt(c, 16);
  return [ (n >> 16) & 255, (n >> 8) & 255, n & 255 ];
}

export function rgbToHsl(r_: number, g_: number, b_: number): [number, number, number] {
  let r = r_/255, g = g_/255, b = b_/255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h=0, s=0, l=(max+min)/2;
  if (max === min) {
    h = s = 0;
  } else {
    let d = max-min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case r: h=(g-b)/d + (g < b ? 6 : 0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h *= 60;
  }
  return [Math.round(h), Math.round(s*100), Math.round(l*100)];
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c/2, r=0, g=0, b=0;
  if (0<=h && h<60) { r = c; g = x; b = 0; }
  else if (60<=h && h<120) { r = x; g = c; b = 0; }
  else if (120<=h && h<180) { r = 0; g = c; b = x; }
  else if (180<=h && h<240) { r = 0; g = x; b = c; }
  else if (240<=h && h<300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return [Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r,g,b].map(x => x.toString(16).padStart(2, "0")).join("");
}

// Parse a CSS color string to HSL, RGB or HEX.
// Accepts hsl(), rgb(), #hex, etc; returns { h, s, l }
export function parseColor(str: string): { h: number; s: number; l: number } | null {
  if (!str) return null;
  str = str.trim();
  if (str.startsWith("#")) {
    const rgb = hexToRgb(str);
    if (!rgb) return null;
    const [h, s, l] = rgbToHsl(...rgb);
    return { h, s, l };
  }
  if (str.startsWith("rgb")) {
    let nums = str.match(/\d+/g);
    if (!nums || nums.length < 3) return null;
    const [r,g,b] = nums.slice(0,3).map(Number);
    const [h,s,l] = rgbToHsl(r,g,b);
    return { h, s, l };
  }
  if (str.startsWith("hsl")) {
    let nums = str.match(/-?\d+\.?\d*/g);
    if (!nums || nums.length < 3) return null;
    const [h,s,l] = nums.slice(0,3).map(Number);
    return { h, s, l };
  }
  return null;
}
