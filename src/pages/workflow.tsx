import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import WorkflowTabs from "@/components/workflow/WorkflowTabs";

const WorkflowPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">سير العمل والأتمتة</h2>
          <p className="text-muted-foreground">
            إدارة ومتابعة سير العمل وأتمتة العمليات التجارية
          </p>
        </div>
        <WorkflowTabs />
      </div>
    </MainLayout>
  );
};

export default WorkflowPage;
