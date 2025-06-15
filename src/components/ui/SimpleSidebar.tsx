
import { useState } from "react";
import { Upload, Settings, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { BackgroundControls } from "./BackgroundControls";

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
              <BackgroundControls />
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
