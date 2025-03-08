import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AccountingTabs from "@/components/accounting/AccountingTabs";

const Accounting = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">المحاسبة</h1>
        <AccountingTabs />
      </div>
    </MainLayout>
  );
};

export default Accounting;
