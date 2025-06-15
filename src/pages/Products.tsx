
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Info } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Oversized T-Shirt",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center",
      isFree: true,
      modelPath: "oversized_t-shirt"
    },
    {
      id: 2,
      name: "Long Sleeve T-Shirt",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center",
      isFree: false,
      modelPath: "long_sleeve_shirt"
    },
    {
      id: 3,
      name: "Short Sleeve Polo",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=600&fit=crop&crop=center",
      isFree: false,
      modelPath: "short_sleeve_polo"
    },
    {
      id: 4,
      name: "Hoodie with Hood Up",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
      isFree: true,
      modelPath: "hoodie_with_hood_up"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Convert your 2D Designs to 3D
          </h1>
          <p className="text-xl text-gray-600">
            Select one of our blanks, add your designs, and export.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200">
                {/* Free badge */}
                {product.isFree && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Free
                    </span>
                  </div>
                )}

                {/* Info icon */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Product image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product content */}
                <div className="p-6">
                  {/* Product name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {product.name}
                  </h3>

                  {/* Customize button */}
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl h-12 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>Customize</span>
                    <div className="w-5 h-5 bg-gray-800 group-hover/btn:bg-gray-900 rounded flex items-center justify-center transition-colors">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more section */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">More products coming soon!</p>
          <Button 
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl"
            disabled
          >
            Load More Products
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Products;
