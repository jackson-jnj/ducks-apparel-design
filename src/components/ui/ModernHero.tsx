
import { Button } from "./button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const ModernHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 overflow-hidden">
      {/* Header */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-12 bg-white/10 px-10 py-4 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="text-2xl font-bold text-white tracking-tight">5ducks</div>
        <nav className="flex gap-8">
          <a href="#home" className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all">Home</a>
          <a href="#about" className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all">About</a>
          <a href="#features" className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all">Features</a>
          <a href="#function" className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all">Function</a>
        </nav>
        <div className="flex gap-3">
          <button className="bg-transparent text-white/80 border border-white/20 px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm">
            Sign In
          </button>
          <button className="bg-white/90 text-indigo-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-white transform hover:-translate-y-0.5 transition-all">
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-40 pb-20 px-15 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-block bg-white/15 text-white/90 px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 inline mr-2" />
              AI-Powered Design Transformation
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Transform Your<br />
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                2D Designs
              </span><br />
              Into Stunning <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">3D</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-xl">
              Complete with wind effects, walking animations, and seamless video exports. 
              Experience the future of digital fashion and design visualization.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/configurator">
                <Button 
                  size="lg"
                  className="bg-white/90 text-indigo-600 hover:bg-white px-8 py-4 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group border-0"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/15 px-8 py-4 text-lg rounded-2xl font-medium backdrop-blur-sm transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Right Visual - 3D Preview */}
          <div className="relative h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full bg-white/10 rounded-3xl border border-white/20 backdrop-blur-xl overflow-hidden">
              {/* Preview Area */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center">
                <div className="relative">
                  {/* 3D Model Placeholder */}
                  <div className="w-52 h-72 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl shadow-2xl relative overflow-hidden">
                    {/* T-shirt shape */}
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-inner">
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute top-1/2 -left-3 w-4 h-4 bg-green-400 rounded-full animate-ping shadow-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Top Badge */}
              <div className="absolute top-6 right-6 bg-white/15 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                Real-time 3D Preview
              </div>
              
              {/* Bottom Controls */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/15 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
                <button className="w-11 h-11 bg-white/90 text-indigo-600 rounded-xl font-medium hover:bg-white transition-all">👕</button>
                <button className="w-11 h-11 bg-transparent text-white/70 hover:bg-white/15 hover:text-white rounded-xl transition-all">🧥</button>
                <button className="w-11 h-11 bg-transparent text-white/70 hover:bg-white/15 hover:text-white rounded-xl transition-all">👖</button>
                <button className="w-11 h-11 bg-transparent text-white/70 hover:bg-white/15 hover:text-white rounded-xl transition-all">👗</button>
                <button className="w-11 h-11 bg-transparent text-white/70 hover:bg-white/15 hover:text-white rounded-xl transition-all">▶️</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 px-15 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 rounded-3xl p-10 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-white/20">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-4">2D to 3D Transform</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Upload your flat 2D designs and instantly transform them into realistic 3D models with proper depth, textures, and materials.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-3xl p-10 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-white/20">🌪️</div>
            <h3 className="text-xl font-semibold text-white mb-4">Wind & Animation Effects</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Add dynamic wind effects, fabric physics, and natural walking animations to showcase your designs in motion.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-3xl p-10 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-white/20">📹</div>
            <h3 className="text-xl font-semibold text-white mb-4">Professional Video Export</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Export high-quality videos and renders ready for social media, marketing campaigns, or client presentations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-white/5 border-t border-white/10 backdrop-blur-sm py-20 px-15 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-2 max-w-md">
              <div className="text-3xl font-bold text-white mb-4 tracking-tight">5ducks</div>
              <p className="text-white/70 leading-relaxed mb-8">
                Transform your 2D designs into stunning 3D models with AI-powered technology. 
                Experience the future of digital fashion and design visualization.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/90 hover:text-indigo-600 transition-all border border-white/10">📧</a>
                <a href="#" className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/90 hover:text-indigo-600 transition-all border border-white/10">🐦</a>
                <a href="#" className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/90 hover:text-indigo-600 transition-all border border-white/10">📘</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Features</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Pricing</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">API</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Documentation</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">About</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Careers</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Press</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Privacy Policy</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Terms of Service</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Cookie Policy</a>
                <a href="#" className="block text-white/70 hover:text-white text-sm transition-all hover:translate-x-1">Security</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm">© 2025 5ducks. All rights reserved.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-all">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-all">Terms</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-all">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
