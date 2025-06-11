
import { Button } from "./button";
import { Download, Send } from "lucide-react";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { toast } from "sonner";

export const ExportPanel = () => {
  const { selectedProduct, baseColor, logoConfig } = useConfiguratorStore();

  const handleSnapshot = () => {
    // This would capture the 3D canvas as an image
    // For now, we'll show a toast
    toast.success("Snapshot feature coming soon!");
    console.log("Current configuration:", {
      product: selectedProduct,
      color: baseColor,
      logo: logoConfig
    });
  };

  const handleRequestQuote = () => {
    // This would send the configuration to a backend service
    toast.success("Quote request submitted!");
    console.log("Quote requested for:", {
      product: selectedProduct,
      color: baseColor,
      logo: logoConfig
    });
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Export & Quote</h3>
      
      <div className="space-y-3">
        <Button onClick={handleSnapshot} className="w-full">
          <Download className="w-4 h-4" />
          Save Snapshot
        </Button>
        
        <Button onClick={handleRequestQuote} variant="outline" className="w-full">
          <Send className="w-4 h-4" />
          Request Quote
        </Button>
        
        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <strong>Current Config:</strong><br />
          Product: {selectedProduct}<br />
          Color: {baseColor}<br />
          Logo: {logoConfig.image ? 'Uploaded' : 'None'}
        </div>
      </div>
    </div>
  );
};
