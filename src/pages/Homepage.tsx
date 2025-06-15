
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/Header";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between min-h-[600px]">
          {/* Left side - Content */}
          <div className="flex-1 max-w-2xl">
            {/* Stats badge */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
              </div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                120K
              </div>
              <div className="text-gray-600">
                <span className="font-semibold text-black">Join 120,000+</span> brands<br />
                already designing in 3D.
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
              3D Animated<br />
              Mockups in<br />
              Seconds.
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your 2D designs into stunning 3D –<br />
              complete with <span className="font-semibold text-black">wind effects</span>, <span className="font-semibold text-black">walking animations</span>,<br />
              and seamless <span className="font-semibold text-black">video exports</span>.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center space-x-6">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl"
              >
                Get Started
              </Button>
              <span className="text-gray-500 text-sm">No sign up required!</span>
            </div>
          </div>

          {/* Right side - 3D T-shirt */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 bg-gray-900 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="w-72 h-80 bg-white rounded-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <div className="w-56 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-40 bg-orange-200 rounded mx-auto mb-2 flex items-center justify-center">
                        <span className="text-orange-800 font-bold text-xs">Design</span>
                      </div>
                      <p className="text-xs text-gray-500">3D T-Shirt Mockup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
