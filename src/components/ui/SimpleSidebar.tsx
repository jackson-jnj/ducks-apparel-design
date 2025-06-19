
import { useState } from "react";
import { Upload, Settings, ChevronDown, ChevronRight, ArrowDownToLine, Play, Palette, Camera } from "lucide-react";
import { Button } from "./button";
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { ModernBackgroundPicker } from "./ModernBackgroundPicker";
import { AnimationControls } from "./AnimationControls";
import { DesignUploader } from "./DesignUploader";
import { DesignControls } from "./DesignControls";
import { EnhancedExportControls } from "./EnhancedExportControls";
import { ViewControls } from "./ViewControls";
import { useToast } from "@/hooks/use-toast";

export const SimpleSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    garmentColor: false,
    background: false,
    view: true, // Add view controls
    animation: true,
    designs: true,
    export: false
  });

  const { toast } = useToast();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleQuickUpload = () => {
    // Automatically expand the designs section and show instructions
    setExpandedSections(prev => ({ ...prev, designs: true }));
    toast({
      title: "Design Upload Ready!",
      description: "The 'Designs & Graphics' section is now open below. Use the upload area to add your images!",
      duration: 5000,
    });
    
    // Scroll to designs section
    setTimeout(() => {
      const designsSection = document.querySelector('[data-section="designs"]');
      if (designsSection) {
        designsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAdvancedOptions = () => {
    // Expand all collapsed sections
    setExpandedSections({
      garmentColor: true,
      background: true,
      view: true,
      animation: true,
      designs: true,
      export: true
    });
    
    toast({
      title: "Advanced Options Unlocked!",
      description: "All customization sections are now expanded for full control.",
      duration: 3000,
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
      data-section={section}
    >
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-4 h-4 text-gray-600" />}
        <span className="text-gray-800 font-medium text-sm">{title}</span>
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
        {/* Quick Upload Design Button with real functionality */}
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-3 flex items-center justify-center space-x-2"
          onClick={handleQuickUpload}
        >
          <Upload className="w-4 h-4" />
          <span>Quick Upload Design</span>
        </Button>

        {/* Advanced Controls Button with real functionality */}
        <Button 
          variant="outline" 
          className="w-full border-gray-300 text-gray-700 rounded-lg py-3 flex items-center justify-center space-x-2"
          onClick={handleAdvancedOptions}
        >
          <Settings className="w-4 h-4" />
          <span>Advanced Options</span>
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

          <SectionHeader title="View & Camera" section="view" icon={Camera} />
          {expandedSections.view && (
            <div className="pl-4 py-2">
              <ViewControls />
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
            <div className="pl-4 py-2 space-y-4" data-section="designs">
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
