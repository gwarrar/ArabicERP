import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SalesTabs from "@/components/sales/SalesTabs";

const Sales = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">المبيعات</h1>
        <SalesTabs />
      </div>
    </MainLayout>
  );
};

export default Sales;
