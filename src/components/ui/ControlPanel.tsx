
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { ViewControls } from "./ViewControls";
import { BackgroundControls } from "./BackgroundControls";
import { LogoUploader } from "./LogoUploader";
import { LogoControls } from "./LogoControls";
import { ExportPanel } from "./ExportPanel";
import { Separator } from "./separator";

export const ControlPanel = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="text-center py-2">
          <h2 className="text-lg font-semibold text-foreground">Configure</h2>
          <p className="text-xs text-muted-foreground">Customize your product</p>
        </div>
        
        <div className="space-y-4">
          <ProductSelector />
          <Separator />
          <ModernColorPicker />
          <Separator />
          <ViewControls />
          <Separator />
          <BackgroundControls />
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
