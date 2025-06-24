
import { Button } from "./button";
import { ArrowRight, Play, Sparkles, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const GlassmorphismHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Floating background elements with glassmorphism */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gradient-to-r from-blue-400/25 to-pink-400/25 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-16">
          
          {/* Left side - Glassmorphism Content Panel */}
          <div className="flex-1 max-w-3xl">
            
            {/* Floating Innovation Badge */}
            <div className="relative mb-8">
              <div className="glass absolute inset-0 rounded-2xl blur-sm"></div>
              <div className="relative inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-100 text-sm font-semibold tracking-wide">AI-POWERED 3D MOCKUPS</span>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                  NEXT-GEN
                </div>
              </div>
            </div>

            {/* Power Headline with Glassmorphism */}
            <div className="relative mb-8">
              <div className="glass-dark absolute inset-0 rounded-3xl blur-lg opacity-60"></div>
              <div className="relative bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-sans">
                  Design Real Garments
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    in Real Time
                  </span>
                </h1>
              </div>
            </div>

            {/* Subheadline Panel */}
            <div className="relative mb-8">
              <div className="glass absolute inset-0 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                <p className="text-xl lg:text-2xl text-slate-200 mb-3 leading-relaxed font-light">
                  Ultra-realistic 3D apparel visualization, powered by AI.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Upload your design, pick colors, and see it live on lifelike 3D models with hyper-realistic physics.
                </p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-12">
              {[
                { number: "120K+", label: "Active Designers", icon: Star },
                { number: "5M+", label: "Mockups Created", icon: Zap },
                { number: "99.9%", label: "Satisfaction", icon: Sparkles }
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="glass absolute inset-0 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center shadow-lg hover:shadow-2xl transition-all duration-300">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-slate-300 text-xs font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with Enhanced Glassmorphism */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <Link to="/configurator">
                  <Button 
                    size="lg"
                    className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-12 py-6 text-lg rounded-2xl shadow-2xl transition-all duration-300 group border-0 font-semibold backdrop-blur-xl"
                  >
                    Launch Designer
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="glass absolute inset-0 rounded-2xl blur-sm"></div>
                <Button 
                  variant="outline"
                  size="lg"
                  className="relative border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg rounded-2xl font-semibold transition-all duration-300 backdrop-blur-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See Examples
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="relative">
              <div className="glass absolute inset-0 rounded-xl blur-sm"></div>
              <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
                <p className="text-slate-400 text-sm mb-4 font-medium">Trusted by leading brands worldwide</p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-70">
                  {['NIKE', 'ADIDAS', 'SUPREME', 'UNIQLO'].map((brand) => (
                    <div key={brand} className="font-bold text-xl text-white tracking-wide hover:text-cyan-400 transition-colors">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Floating 3D Preview with Depth Layers */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative group">
              
              {/* Background glow layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-pink-400/10 rounded-3xl blur-2xl scale-105 group-hover:scale-115 transition-transform duration-500"></div>
              
              {/* Main floating panel - Layer 1 */}
              <div className="relative transform hover:scale-105 transition-all duration-700">
                <div className="glass absolute inset-0 rounded-3xl blur-sm"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  
                  {/* 3D Preview Area */}
                  <div className="w-96 h-[500px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl flex items-center justify-center overflow-hidden relative backdrop-blur-xl border border-white/10">
                    
                    {/* Animated 3D Mockup with Enhanced Physics */}
                    <div className="relative transform group-hover:scale-105 transition-all duration-700">
                      <div className="w-52 h-72 bg-gradient-to-br from-slate-700/80 via-slate-600/80 to-slate-800/80 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/20">
                        
                        {/* T-shirt with realistic walking animation */}
                        <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/90 to-purple-600/90 rounded-lg flex items-center justify-center shadow-inner animate-float backdrop-blur-sm">
                          <div className="w-16 h-16 bg-white/30 rounded-lg flex items-center justify-center backdrop-blur-xl">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Physics particles */}
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg backdrop-blur-xl"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg backdrop-blur-xl"></div>
                        <div className="absolute top-1/2 -left-3 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping shadow-lg backdrop-blur-xl"></div>
                      </div>
                      
                      {/* Enhanced floating particles */}
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-70 animate-float backdrop-blur-sm"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: `${2 + Math.random() * 3}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Preview Info */}
                  <div className="mt-8 text-center">
                    <h3 className="text-white font-bold text-xl mb-2">Live 3D Preview</h3>
                    <p className="text-slate-300 text-sm font-medium mb-4">Real-time rendering with AI physics</p>
                    
                    {/* Enhanced feature indicators */}
                    <div className="flex justify-center gap-6 mt-4">
                      {[
                        { label: "Live", color: "green" },
                        { label: "Interactive", color: "blue" },
                        { label: "AI-Powered", color: "purple" }
                      ].map(({ label, color }) => (
                        <div key={label} className="relative">
                          <div className="glass absolute inset-0 rounded-full blur-sm"></div>
                          <div className="relative flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-2 shadow-lg">
                            <div className={`w-2 h-2 bg-${color}-400 rounded-full animate-pulse`}></div>
                            <span className="text-xs text-slate-200 font-medium">{label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating secondary panel - Layer 2 */}
              <div className="absolute -bottom-4 -right-4 w-24 h-32 z-20">
                <div className="glass absolute inset-0 rounded-xl blur-sm"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-xs text-slate-200 font-medium mb-1">Quality</div>
                  <div className="text-lg font-bold text-white">8K</div>
                  <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mt-2"></div>
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
