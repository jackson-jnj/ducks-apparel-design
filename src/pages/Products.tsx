
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";
import { Info } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Free Oversized T-Shirt Mockup",
      image: "/api/placeholder/300/300",
      isFree: true,
    },
    {
      id: 2,
      name: "Cropped, Boy T-Shirt Mockup",
      image: "/api/placeholder/300/300",
      isFree: false,
    },
    {
      id: 3,
      name: "Oversized Sweatshirt Mockup",
      image: "/api/placeholder/300/300",
      isFree: false,
    },
    {
      id: 4,
      name: "Regular T-Shirt Mockup",
      image: "/api/placeholder/300/300",
      isFree: false,
    },
    {
      id: 5,
      name: "Hoodie Mockup",
      image: "/api/placeholder/300/300",
      isFree: false,
    },
    {
      id: 6,
      name: "Hoodie with Hood Up Mockup",
      image: "/api/placeholder/300/300",
      isFree: true,
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
              <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200">
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
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-gray-600" />
                  </div>
                </div>

                {/* Product image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-48 h-56 bg-white rounded-lg shadow-sm flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-40 h-48 bg-gray-50 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">3D Model</span>
                    </div>
                  </div>
                </div>

                {/* Customize button */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 flex items-center space-x-2"
                  >
                    <span>Customize</span>
                    <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs">▶</span>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Product name */}
              <h3 className="text-lg font-medium text-gray-900 mt-4 text-center">
                {product.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Load more section */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl"
          >
            Load More Products
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Products;
