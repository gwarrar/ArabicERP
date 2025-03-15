import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ErrorBoundary from "@/components/ErrorBoundary";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
        {/* Sidebar - Fixed position */}
        <div className="fixed top-0 right-0 h-full z-30">
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header - Fixed position */}
          <div
            className={cn(
              "fixed top-0 left-0 z-20 transition-all duration-300",
              sidebarCollapsed ? "right-[70px]" : "right-[280px]",
            )}
          >
            <Header />
          </div>

          <main
            className={cn(
              "flex-1 overflow-y-auto p-6 transition-all duration-300 mt-[64px]",
              sidebarCollapsed ? "mr-[70px]" : "mr-[280px]",
            )}
          >
            <div className="w-full max-w-[1232px] mx-auto bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
