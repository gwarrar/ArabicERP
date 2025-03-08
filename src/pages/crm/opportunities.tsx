import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import OpportunityPipeline from "@/components/crm/OpportunityPipeline";

const OpportunitiesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          إدارة الفرص والصفقات
        </h1>
        <OpportunityPipeline />
      </div>
    </MainLayout>
  );
};

export default OpportunitiesPage;
