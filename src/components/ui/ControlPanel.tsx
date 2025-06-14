
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { ViewControls } from "./ViewControls";
import { BackgroundControls } from "./BackgroundControls";
import { LogoUploader } from "./LogoUploader";
import { LogoControls } from "./LogoControls";
import { ExportPanel } from "./ExportPanel";
import { Settings, Upload } from "lucide-react";

export const ControlPanel = () => {
  return (
    <div className="h-full overflow-y-auto bg-white border-l border-gray-200">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Customize</h2>
          </div>
          <p className="text-sm text-gray-500">Personalize your design</p>
        </div>
        
        {/* Upload Design Button */}
        <button className="w-full bg-black text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Your Design
        </button>
        
        {/* Advanced Controls Button */}
        <button className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
          <Settings className="w-4 h-4" />
          Advanced Controls
        </button>
        
        <div className="space-y-6">
          <ProductSelector />
          <ModernColorPicker />
          <ViewControls />
          <BackgroundControls />
          <LogoUploader />
          <LogoControls />
          <ExportPanel />
        </div>
      </div>
    </div>
  );
};
