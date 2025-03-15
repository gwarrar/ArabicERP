import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import RFIDSalesIntegration from "@/components/sales/RFIDSalesIntegration";

const RFIDSalesIntegrationPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">نظام المبيعات مع RFID</h2>
          <p className="text-muted-foreground">
            استخدام تقنية RFID لتسريع وتحسين عمليات المبيعات والفوترة
          </p>
        </div>
        <RFIDSalesIntegration />
      </div>
    </MainLayout>
  );
};

export default RFIDSalesIntegrationPage;
