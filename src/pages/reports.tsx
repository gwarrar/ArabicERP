import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ReportsDashboard from "@/components/reports/ReportsDashboard";

const Reports = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <ReportsDashboard />
      </div>
    </MainLayout>
  );
};

export default Reports;
