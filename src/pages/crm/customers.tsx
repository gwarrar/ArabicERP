import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CustomerList from "@/components/crm/CustomerList";

const CustomersPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">إدارة العملاء</h1>
        <CustomerList />
      </div>
    </MainLayout>
  );
};

export default CustomersPage;
