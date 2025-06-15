
import { useEffect } from "react";
import { Scene } from "@/components/3d/Scene";
import { Header } from "@/components/ui/Header";
import { SimpleSidebar } from "@/components/ui/SimpleSidebar";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  // Lock scrolling ONLY on this page
  useEffect(() => {
    // Store previous value to restore
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 min-h-screen bg-gray-50 flex flex-col z-0">
      {/* Header always visible/fixed */}
      <Header />
      {/* Main content with sidebar and perfect center */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <SimpleSidebar />
        {/* 3D Viewer section (centered both directions, always fills available space) */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <div className="w-full h-full flex items-center justify-center max-h-[calc(100vh-80px)]">
            <Scene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
