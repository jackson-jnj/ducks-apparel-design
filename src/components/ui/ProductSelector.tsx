
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
    <div>
      <h3 className="text-sm font-medium mb-3">Select Product</h3>
      <div className="grid grid-cols-1 gap-2">
        {products.map((product) => (
          <Button
            key={product.type}
            variant={selectedProduct === product.type ? "default" : "outline"}
            onClick={() => setSelectedProduct(product.type)}
            className="justify-start"
          >
            {product.icon}
            {product.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
