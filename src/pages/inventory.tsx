import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import InventoryTabs from "@/components/inventory/InventoryTabs";

const Inventory = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          إدارة المستودعات والمخزون
        </h1>
        <InventoryTabs />
      </div>
    </MainLayout>
  );
};

export default Inventory;
