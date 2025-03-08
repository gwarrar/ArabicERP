import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Factory,
  Hammer,
  Cog,
  ClipboardList,
  BarChart3,
  Package,
  Truck,
  QrCode,
} from "lucide-react";
import ProductionOrders from "@/components/manufacturing/ProductionOrders";
import ProductionOperations from "@/components/manufacturing/ProductionOperations";
import ManufacturingDashboard from "@/components/manufacturing/ManufacturingDashboard";
import WorkCenters from "@/components/manufacturing/WorkCenters";
import InventoryManagement from "@/components/manufacturing/InventoryManagement";
import MaterialRequirements from "@/components/manufacturing/MaterialRequirements";

const Manufacturing = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">التصنيع</h1>

        <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ClipboardList className="h-4 w-4 ml-2" />
              أوامر الإنتاج
            </TabsTrigger>
            <TabsTrigger value="operations">
              <Hammer className="h-4 w-4 ml-2" />
              العمليات
            </TabsTrigger>
            <TabsTrigger value="bom">
              <Cog className="h-4 w-4 ml-2" />
              قوائم المواد
            </TabsTrigger>
            <TabsTrigger value="workcenters">
              <Factory className="h-4 w-4 ml-2" />
              مراكز العمل
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Package className="h-4 w-4 ml-2" />
              المخزون واللوجستيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ManufacturingDashboard />
          </TabsContent>

          <TabsContent value="orders">
            <ProductionOrders />
          </TabsContent>

          <TabsContent value="operations">
            <ProductionOperations />
          </TabsContent>

          <TabsContent value="bom">
            <MaterialRequirements />
          </TabsContent>

          <TabsContent value="workcenters">
            <WorkCenters />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Manufacturing;
