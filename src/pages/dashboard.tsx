import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const DashboardPage = () => {
  return (
    <MainLayout>
      <DashboardTabs />
    </MainLayout>
  );
};

export default DashboardPage;
