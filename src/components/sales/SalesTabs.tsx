import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesDashboard from "./SalesDashboard";
import SalesOrderList from "./SalesOrderList";
import SalesReport from "./SalesReport";
import SalesReturn from "./SalesReturn";
import CustomerList from "./CustomerList";
import SalesInvoicesTab from "./SalesInvoicesTab";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  RotateCcw,
  Users,
  Receipt,
} from "lucide-react";

const SalesTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="invoices">
          <Receipt className="h-4 w-4 ml-2" />
          المبيعات
        </TabsTrigger>
        <TabsTrigger value="orders">
          <ShoppingCart className="h-4 w-4 ml-2" />
          الطلبات
        </TabsTrigger>
        <TabsTrigger value="customers">
          <Users className="h-4 w-4 ml-2" />
          العملاء
        </TabsTrigger>
        <TabsTrigger value="returns">
          <RotateCcw className="h-4 w-4 ml-2" />
          المرتجعات
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <SalesDashboard />
      </TabsContent>

      <TabsContent value="invoices">
        <SalesInvoicesTab />
      </TabsContent>

      <TabsContent value="orders">
        <SalesOrderList />
      </TabsContent>

      <TabsContent value="customers">
        <CustomerList />
      </TabsContent>

      <TabsContent value="returns">
        <SalesReturn />
      </TabsContent>

      <TabsContent value="reports">
        <SalesReport />
      </TabsContent>
    </Tabs>
  );
};

export default SalesTabs;
