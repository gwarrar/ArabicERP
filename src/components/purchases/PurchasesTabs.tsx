import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchasesDashboard from "./PurchasesDashboard";
import PurchaseOrdersList from "./PurchaseOrdersList";
import SuppliersList from "./SuppliersList";
import PurchaseInvoicesTab from "./PurchaseInvoicesTab";
import PurchaseReports from "./PurchaseReports";
import ContainersList from "./ContainersList";
import ContainerReports from "./ContainerReports";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  Users,
  Receipt,
  Ship,
  BarChart2,
} from "lucide-react";

const PurchasesTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="invoices">
          <Receipt className="h-4 w-4 ml-2" />
          المشتريات
        </TabsTrigger>
        <TabsTrigger value="orders">
          <ShoppingCart className="h-4 w-4 ml-2" />
          طلبات الشراء
        </TabsTrigger>
        <TabsTrigger value="containers">
          <Ship className="h-4 w-4 ml-2" />
          الكونتينرات
        </TabsTrigger>
        <TabsTrigger value="suppliers">
          <Users className="h-4 w-4 ml-2" />
          الموردين
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <PurchasesDashboard />
      </TabsContent>

      <TabsContent value="invoices">
        <PurchaseInvoicesTab />
      </TabsContent>

      <TabsContent value="orders">
        <PurchaseOrdersList />
      </TabsContent>

      <TabsContent value="containers">
        <ContainersList />
      </TabsContent>

      <TabsContent value="suppliers">
        <SuppliersList />
      </TabsContent>

      <TabsContent value="reports">
        <PurchaseReports />
      </TabsContent>
    </Tabs>
  );
};

export default PurchasesTabs;
