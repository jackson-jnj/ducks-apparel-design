
import { Maximize2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="ml-2 font-bold text-gray-900">3D Mockup Studio</span>
      </Link>
      
      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        <Link 
          to="/configurator"
          className={`hover:text-blue-600 cursor-pointer transition-colors font-medium ${
            location.pathname === '/configurator' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          3D Studio
        </Link>
        <Link 
          to="/products" 
          className={`hover:text-blue-600 cursor-pointer transition-colors font-medium ${
            location.pathname === '/products' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          Products
        </Link>
        <Link 
          to="/pricing" 
          className={`hover:text-blue-600 cursor-pointer transition-colors font-medium ${
            location.pathname === '/pricing' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          Pricing
        </Link>
        <span className="text-gray-600 hover:text-blue-600 cursor-pointer font-medium">Support</span>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium">
          Get Started
        </button>
      </nav>
      
      {/* Fullscreen button */}
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Maximize2 className="w-5 h-5 text-gray-600" />
      </button>
    </header>
  );
};
