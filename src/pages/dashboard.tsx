import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import EnhancedDashboardTabs from "@/components/dashboard/EnhancedDashboardTabs";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <EnhancedDashboardTabs />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
