
import { Button } from "./button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const ModernHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-16">
          
          {/* Left side - Content */}
          <div className="flex-1 max-w-3xl text-center lg:text-left">
            
            {/* Innovation Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full px-5 py-3 mb-8 shadow-sm">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 text-sm font-semibold tracking-wide">AI-POWERED 3D MOCKUPS</span>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                NEW
              </div>
            </div>

            {/* Power Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] font-sans">
              Design Real Garments
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                in Real Time
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-slate-600 mb-4 leading-relaxed max-w-2xl font-light">
              Ultra-realistic 3D apparel visualization, powered by AI.
            </p>
            
            <p className="text-lg text-slate-500 mb-12 leading-relaxed max-w-2xl">
              Upload your design, pick colors, and see it live on lifelike 3D models — all in seconds. 
              Perfect for fashion brands, creators, and visionaries.
            </p>

            {/* Trust Statistics */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">120K+</div>
                <div className="text-slate-500 text-sm font-medium">Active Designers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">5M+</div>
                <div className="text-slate-500 text-sm font-medium">Mockups Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <div className="text-slate-500 text-sm font-medium">Satisfaction Rate</div>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link to="/configurator">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-0 font-semibold"
                >
                  Launch Designer
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-4 text-lg rounded-2xl font-semibold transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                See Examples
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="text-center lg:text-left">
              <p className="text-slate-400 text-sm mb-4 font-medium">Trusted by leading brands worldwide</p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-60">
                <div className="font-bold text-xl text-slate-700 tracking-wide">NIKE</div>
                <div className="font-bold text-xl text-slate-700 tracking-wide">ADIDAS</div>
                <div className="font-bold text-xl text-slate-700 tracking-wide">SUPREME</div>
                <div className="font-bold text-xl text-slate-700 tracking-wide">UNIQLO</div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive 3D Preview */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative group">
              
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              
              {/* Main preview container */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                
                {/* 3D Preview Area */}
                <div className="w-96 h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center overflow-hidden relative group">
                  
                  {/* Animated 3D Mockup */}
                  <div className="relative transform group-hover:scale-105 transition-all duration-700">
                    <div className="w-52 h-72 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl shadow-2xl relative overflow-hidden">
                      
                      {/* T-shirt shape */}
                      <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-inner">
                        <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Floating design elements */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute top-1/2 -left-3 w-4 h-4 bg-green-400 rounded-full animate-ping shadow-lg"></div>
                    </div>
                    
                    {/* Floating UI Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60 animate-float"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Preview Info */}
                <div className="mt-8 text-center">
                  <h3 className="text-slate-900 font-bold text-xl mb-2">Live 3D Preview</h3>
                  <p className="text-slate-500 text-sm font-medium">Real-time rendering with AI physics</p>
                  
                  {/* Feature indicators */}
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-600 font-medium">Live</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-600 font-medium">Interactive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-600 font-medium">AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};
