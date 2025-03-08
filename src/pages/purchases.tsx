import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PurchasesTabs from "@/components/purchases/PurchasesTabs";

const Purchases = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">المشتريات</h1>
        <PurchasesTabs />
      </div>
    </MainLayout>
  );
};

export default Purchases;
