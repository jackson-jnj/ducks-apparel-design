
import { ProductSelector } from "./ProductSelector";
import { ModernColorPicker } from "./ModernColorPicker";
import { DesignUploader } from "./DesignUploader";
import { DesignControls } from "./DesignControls";
import { AnimationControls } from "./AnimationControls";
import { UltraHighQualityExport } from "./UltraHighQualityExport";
import { BackgroundControls } from "./BackgroundControls";
import { ViewControls } from "./ViewControls";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

export const SimpleSidebar = () => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">3D Designer</h2>
        <p className="text-sm text-gray-500">Customize your apparel mockup</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <ProductSelector />
          <Separator />
          <ModernColorPicker />
          <Separator />
          <DesignUploader />
          <Separator />
          <DesignControls />
          <Separator />
          <ViewControls />
          <Separator />
          <AnimationControls />
          <Separator />
          <BackgroundControls />
          <Separator />
          <UltraHighQualityExport />
        </div>
      </ScrollArea>
    </div>
  );
};
