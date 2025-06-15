import { useState } from "react";
import { Upload, Settings, ChevronDown, ChevronRight } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { Button } from "./button";
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";

export const SimpleSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    garmentColor: false,
    background: false,
    animation: false,
    cameraAnimation: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ 
    title, 
    section, 
    isPro = false 
  }: { 
    title: string; 
    section: keyof typeof expandedSections;
    isPro?: boolean;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex items-center space-x-2">
        <span className="text-gray-800 font-medium">{title}</span>
        {isPro && (
          <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded">
            Pro
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronDown className="w-4 h-4 text-gray-600" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-600" />
      )}
    </button>
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 space-y-3">
        {/* Upload Design Button */}
        <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 flex items-center justify-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Your Design</span>
        </Button>

        {/* Advanced Controls Button */}
        <Button variant="outline" className="w-full border-gray-300 text-gray-700 rounded-lg py-3 flex items-center justify-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Advanced Controls</span>
        </Button>

        {/* Product Selection */}
        <div className="py-2">
          <ProductSelector />
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-2">
          <SectionHeader title="Garment Color" section="garmentColor" />
          {expandedSections.garmentColor && (
            <div className="pl-4 py-2">
              <ModernColorPicker />
            </div>
          )}

          <SectionHeader title="Background" section="background" />
          {expandedSections.background && (
            <div className="pl-4 py-2">
              <ModernBackgroundPicker />
            </div>
          )}

          <SectionHeader title="Animation" section="animation" isPro />
          {expandedSections.animation && (
            <div className="pl-4 py-2">
              <p className="text-sm text-gray-600">Animation controls (Pro feature)</p>
            </div>
          )}

          <SectionHeader title="Camera Animation" section="cameraAnimation" isPro />
          {expandedSections.cameraAnimation && (
            <div className="pl-4 py-2">
              <p className="text-sm text-gray-600">Camera animation controls (Pro feature)</p>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="pt-4">
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-3">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

// Inline ModernBackgroundPicker for use in sidebar:
const ModernBackgroundColorModal = ({
  isOpen,
  onClose,
  setColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  setColor: (color: string) => void;
}) => {
  const [hue, setHue] = useState(215);
  const [saturation, setSaturation] = useState(46);
  const [lightness, setLightness] = useState(96);

  if (!isOpen) return null;

  const previewColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSaturation = (x / rect.width) * 100;
    const newLightness = 100 - (y / rect.height) * 100;
    setSaturation(newSaturation);
    setLightness(newLightness);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Background Color</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div
          className="w-full h-40 rounded-xl mb-8 cursor-crosshair relative"
          style={{
            background: `linear-gradient(to right, white, hsl(${hue},100%,50%)), linear-gradient(to top, black, transparent)`,
          }}
          onClick={handleAreaClick}
        >
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-2 -translate-y-2 pointer-events-none shadow"
            style={{
              left: `${saturation}%`,
              top: `${100 - lightness}%`,
              background: previewColor,
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Hue</label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={e => setHue(parseInt(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
            }}
          />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl border border-gray-200"
            style={{ background: previewColor }}
          />
          <span className="font-mono text-xs">{previewColor}</span>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          onClick={() => {
            setColor(previewColor);
            onClose();
          }}
        >
          Apply Background
        </Button>
      </div>
    </div>
  );
};

const ModernBackgroundPicker = () => {
  const { backgroundPreset, setBackgroundPreset } = useConfiguratorStore();
  const [showModal, setShowModal] = useState(false);
  const [tempColor, setTempColor] = useState<string>("");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <BgIcon className="w-4 h-4 text-gray-600" />
        <h4 className="text-sm font-medium text-gray-800">Background Color</h4>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={backgroundPreset === "studio" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setBackgroundPreset("studio")}
        >
          Studio
        </Button>
        <Button
          size="sm"
          variant={backgroundPreset === "white" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setBackgroundPreset("white")}
        >
          White
        </Button>
        <Button
          size="sm"
          variant={backgroundPreset === "black" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setBackgroundPreset("black")}
        >
          Black
        </Button>
      </div>
      <Button
        size="sm"
        variant="secondary"
        className="w-full"
        onClick={() => setShowModal(true)}
      >
        <BgIcon className="w-3 h-3 mr-2" /> Custom Color
      </Button>
      <ModernBackgroundColorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        setColor={(color: string) => {
          setTempColor(color);
        }}
      />
      {tempColor && (
        <div className="mt-2 flex gap-2 items-center">
          <span className="text-xs text-gray-500">Preview</span>
          <div className="w-8 h-8 rounded shadow border" style={{ background: tempColor }} />
        </div>
      )}
    </div>
  );
};
