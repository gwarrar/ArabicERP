import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SalesInvoiceWithRFID from "@/components/sales/SalesInvoiceWithRFID";

const SalesInvoiceRFIDPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <SalesInvoiceWithRFID />
      </div>
    </MainLayout>
  );
};

export default SalesInvoiceRFIDPage;
