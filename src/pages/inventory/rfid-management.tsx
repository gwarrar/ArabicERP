import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import RFIDInventoryManagement from "@/components/inventory/RFIDInventoryManagement";

const RFIDManagementPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">إدارة المخزون باستخدام RFID</h2>
          <p className="text-muted-foreground">
            استخدام تقنية RFID لإدارة المخزون بكفاءة وسرعة عالية
          </p>
        </div>
        <RFIDInventoryManagement />
      </div>
    </MainLayout>
  );
};

export default RFIDManagementPage;
