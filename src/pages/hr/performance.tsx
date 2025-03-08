import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HRTabs from "@/components/hr/HRTabs";

const PerformancePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          إدارة الموارد البشرية
        </h1>
        <HRTabs />
      </div>
    </MainLayout>
  );
};

export default PerformancePage;
