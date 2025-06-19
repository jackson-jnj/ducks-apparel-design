import { useState } from "react";
import { Upload, Settings, ChevronDown, ChevronRight, ArrowDownToLine, Play, Palette } from "lucide-react";
import { Button } from "./button";
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { ModernBackgroundPicker } from "./ModernBackgroundPicker";
import { AnimationControls } from "./AnimationControls";
import { DesignUploader } from "./DesignUploader";
import { DesignControls } from "./DesignControls";
import { EnhancedExportControls } from "./EnhancedExportControls";
import { useToast } from "@/hooks/use-toast";

export const SimpleSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    garmentColor: false,
    background: false,
    animation: true, // Start expanded
    designs: true, // Start expanded
    export: false
  });

  const { toast } = useToast();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleUpload = () => {
    toast({
      title: "Upload Design",
      description: "Use the design upload section below to add your graphics!",
    });
  };

  const handleAdvanced = () => {
    toast({
      title: "Advanced Controls",
      description: "Advanced product controls available in expanded sections.",
    });
  };

  const SectionHeader = ({
    title,
    section,
    isPro = false,
    icon: Icon
  }: {
    title: string;
    section: keyof typeof expandedSections;
    isPro?: boolean;
    icon?: any;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
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
    <div className="w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 space-y-3">
        {/* Upload Design Button */}
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
          onClick={handleUpload}
        >
          <Upload className="w-4 h-4" />
          <span>Quick Upload</span>
        </Button>

        {/* Advanced Controls Button */}
        <Button variant="outline" className="w-full border-gray-300 text-gray-700 rounded-lg py-3 flex items-center justify-center space-x-2"
          onClick={handleAdvanced}
        >
          <Settings className="w-4 h-4" />
          <span>Advanced Controls</span>
        </Button>

        {/* Product Selection */}
        <div className="py-2">
          <ProductSelector />
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-2">
          <SectionHeader title="Garment Color" section="garmentColor" icon={Palette} />
          {expandedSections.garmentColor && (
            <div className="pl-4 py-2">
              <ModernColorPicker />
            </div>
          )}

          <SectionHeader title="Background" section="background" />
          {expandedSections.background && (
            <div className="pl-4 py-2">
              <ModernBackgroundPicker isOpen={true} onClose={() => {}} />
            </div>
          )}

          <SectionHeader title="Animation" section="animation" icon={Play} />
          {expandedSections.animation && (
            <div className="pl-4 py-2">
              <AnimationControls />
            </div>
          )}

          <SectionHeader title="Designs & Graphics" section="designs" icon={Upload} />
          {expandedSections.designs && (
            <div className="pl-4 py-2 space-y-4">
              <DesignUploader />
              <DesignControls />
            </div>
          )}

          <SectionHeader title="Export & Download" section="export" icon={ArrowDownToLine} />
          {expandedSections.export && (
            <div className="pl-4 py-2">
              <EnhancedExportControls />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
