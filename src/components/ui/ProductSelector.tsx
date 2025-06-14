
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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-800 mb-4">Select Product</h3>
      <div className="grid grid-cols-1 gap-2">
        {products.map((product) => (
          <button
            key={product.type}
            onClick={() => setSelectedProduct(product.type)}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-150 hover:scale-[1.02] ${
              selectedProduct === product.type 
                ? "bg-blue-50 border-blue-500 text-blue-700" 
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {product.icon}
            <span className="text-sm font-medium">{product.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
