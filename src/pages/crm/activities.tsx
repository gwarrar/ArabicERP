import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ActivityLog from "@/components/crm/ActivityLog";

const ActivitiesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          سجل النشاط والتواصل
        </h1>
        <ActivityLog />
      </div>
    </MainLayout>
  );
};

export default ActivitiesPage;
