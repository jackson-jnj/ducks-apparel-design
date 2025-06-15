
import { Scene } from "@/components/3d/Scene";
import { Header } from "@/components/ui/Header";
import { SimpleSidebar } from "@/components/ui/SimpleSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <SimpleSidebar />
        
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          <Scene />
        </div>
      </div>
    </div>
  );
};

export default Index;
