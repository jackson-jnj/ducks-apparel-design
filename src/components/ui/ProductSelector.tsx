
import { Button } from "./button";
import { useConfiguratorStore, ProductType } from "@/store/configuratorStore";
import { Shirt, ShirtIcon as Hoodie } from "lucide-react";

const products: { type: ProductType; label: string; icon: React.ReactNode }[] = [
  { type: 'short-sleeve-tshirt', label: 'Short Sleeve T-Shirt', icon: <Shirt className="w-4 h-4" /> },
  { type: 'long-sleeve-tshirt', label: 'Long Sleeve T-Shirt', icon: <Shirt className="w-4 h-4" /> },
  { type: 'short-sleeve-polo', label: 'Short Sleeve Polo', icon: <Shirt className="w-4 h-4" /> },
  { type: 'hoodie', label: 'Hoodie', icon: <Hoodie className="w-4 h-4" /> },
];

export const ProductSelector = () => {
  const { selectedProduct, setSelectedProduct } = useConfiguratorStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-800">Select Product</h3>
      <div className="grid grid-cols-1 gap-3">
        {products.map((product) => (
          <Button
            key={product.type}
            variant={selectedProduct === product.type ? "default" : "outline"}
            onClick={() => setSelectedProduct(product.type)}
            className={`justify-start h-12 rounded-lg transition-all duration-200 ${
              selectedProduct === product.type 
                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600" 
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
            }`}
          >
            {product.icon}
            <span className="ml-2">{product.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
