import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CRMReports from "@/components/crm/CRMReports";

const ReportsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          التقارير والتحليلات
        </h1>
        <CRMReports />
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
