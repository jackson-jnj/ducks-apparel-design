
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
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen min-h-0 min-w-0 bg-gray-50 flex flex-col z-0 overflow-hidden">
      {/* Header always visible/fixed */}
      <Header />
      {/* Main content: sidebar + scene, fixed and NO scroll */}
      <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
        {/* Sidebar */}
        <SimpleSidebar />
        {/* 3D Viewer section (centered both directions, always fills available space) */}
        <div className="flex-1 flex items-center justify-center relative min-h-0 min-w-0 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <Scene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
