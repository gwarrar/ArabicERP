import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ErrorBoundary from "@/components/ErrorBoundary";
import ExchangeRateFloatingWidget from "../dashboard/ExchangeRateFloatingWidget";

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
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main
            className={cn(
              "flex-1 overflow-y-auto p-6 transition-all duration-300 mt-[64px] flex justify-center",
              sidebarCollapsed ? "mr-[70px]" : "mr-[280px]",
            )}
          >
            <div className="w-[1232px] mx-auto bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </main>
          <ExchangeRateFloatingWidget />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
