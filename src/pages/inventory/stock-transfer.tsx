import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import StockTransferWithRFID from "@/components/inventory/StockTransferWithRFID";

const StockTransferPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <StockTransferWithRFID />
      </div>
    </MainLayout>
  );
};

export default StockTransferPage;
