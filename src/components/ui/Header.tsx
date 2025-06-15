
import { Maximize2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">V</span>
        </div>
      </Link>
      
      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        <Link 
          to="/configurator"
          className={`hover:text-gray-900 cursor-pointer transition-colors ${
            location.pathname === '/configurator' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          3D Mockup Generator
        </Link>
        <Link 
          to="/products" 
          className={`hover:text-gray-900 cursor-pointer transition-colors ${
            location.pathname === '/products' ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          Products
        </Link>
        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Pricing</span>
        <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Pro Plan Login</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Upgrade
        </button>
      </nav>
      
      {/* Fullscreen button */}
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Maximize2 className="w-5 h-5 text-gray-600" />
      </button>
    </header>
  );
};
