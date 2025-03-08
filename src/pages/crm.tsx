import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CRMTabs from "@/components/crm/CRMTabs";

const CRM = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">إدارة العملاء</h1>
        <CRMTabs />
      </div>
    </MainLayout>
  );
};

export default CRM;
