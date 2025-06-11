
import { ProductSelector } from "./ProductSelector";
import { ColorPicker } from "./ColorPicker";
import { LogoUploader } from "./LogoUploader";
import { LogoControls } from "./LogoControls";
import { ExportPanel } from "./ExportPanel";
import { Separator } from "./separator";

export const ControlPanel = () => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Product Configuration</h2>
        
        <div className="space-y-6">
          <ProductSelector />
          
          <Separator />
          
          <ColorPicker />
          
          <Separator />
          
          <LogoUploader />
          
          <Separator />
          
          <LogoControls />
          
          <Separator />
          
          <ExportPanel />
        </div>
      </div>
    </div>
  );
};
