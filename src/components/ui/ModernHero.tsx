
import { Button } from "./button";
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const ModernHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left side - Content */}
          <div className="flex-1 max-w-3xl mb-12 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">AI-Powered 3D Mockups</span>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                NEW
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Create Stunning
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                {" "}3D Mockups
              </span>
              <br />
              in Seconds
            </h1>

            {/* Description */}
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Transform your designs into photorealistic 3D garments with{" "}
              <span className="text-purple-300 font-semibold">AI-powered animations</span>,{" "}
              <span className="text-pink-300 font-semibold">fabric physics</span>, and{" "}
              <span className="text-yellow-300 font-semibold">cinematic exports</span>.
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">120K+</div>
                <div className="text-white/60 text-sm">Active Designers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5M+</div>
                <div className="text-white/60 text-sm">Mockups Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-white/60 text-sm">Satisfaction Rate</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/configurator">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Creating Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 text-white/60 text-sm">
              <p className="mb-3">Trusted by leading brands worldwide</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="font-bold text-lg">NIKE</div>
                <div className="font-bold text-lg">ADIDAS</div>
                <div className="font-bold text-lg">SUPREME</div>
                <div className="font-bold text-lg">UNIQLO</div>
              </div>
            </div>
          </div>

          {/* Right side - 3D Preview Card */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing orb background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-150"></div>
              
              {/* Main preview card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center overflow-hidden relative">
                  {/* 3D mockup placeholder with animation */}
                  <div className="relative">
                    <div className="w-48 h-64 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 rounded-lg shadow-lg transform hover:rotate-3 transition-all duration-500 hover:scale-105">
                      <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-8 h-8 text-orange-800" />
                      </div>
                      {/* Floating design elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 bg-white rounded-full opacity-40 animate-float`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Card footer */}
                <div className="mt-6 text-center">
                  <h3 className="text-white font-semibold text-lg mb-2">Live 3D Preview</h3>
                  <p className="text-white/60 text-sm">Real-time rendering with physics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};
