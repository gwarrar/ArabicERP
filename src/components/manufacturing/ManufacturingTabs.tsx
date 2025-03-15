import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Factory,
  FileText,
  Package,
  Clipboard,
  Settings,
  BarChart3,
  Layers,
  Wrench,
  Calendar,
  Users,
  Truck,
  ShoppingCart,
  Workflow,
  Gauge,
  Boxes,
  Bookmark,
} from "lucide-react";
import ManufacturingDashboard from "./ManufacturingDashboard";
import ProductionOrders from "./ProductionOrders";
import ProductionPlanning from "./ProductionPlanning";
import BillOfMaterialsList from "./BillOfMaterialsList";
import WorkCenters from "./WorkCenters";
import ProductionOperations from "./ProductionOperations";
import MaterialRequirements from "./MaterialRequirements";
import ManufacturingInventory from "./ManufacturingInventory";
import ProductionPerformanceSummary from "./ProductionPerformanceSummary";
import ManufacturingQuickLinks from "./ManufacturingQuickLinks";

const ManufacturingTabs = () => {
  // Handlers for quick links
  const handleOpenProductionOrder = () => {
    // Navigate to production-orders tab
    document
      .querySelector('[value="production-orders"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenBOM = () => {
    // Navigate to bom tab
    document
      .querySelector('[value="bom"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenWorkCenters = () => {
    // Navigate to work-centers tab
    document
      .querySelector('[value="work-centers"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenOperations = () => {
    // Navigate to operations tab
    document
      .querySelector('[value="operations"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenPlanning = () => {
    // Navigate to planning tab
    document
      .querySelector('[value="planning"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenMRP = () => {
    // Navigate to mrp tab
    document
      .querySelector('[value="mrp"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenInventory = () => {
    // Navigate to inventory tab
    document
      .querySelector('[value="inventory"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenPerformance = () => {
    // Navigate to performance tab
    document
      .querySelector('[value="performance"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  return (
    <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
      <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">
            <BarChart3 className="h-4 w-4 ml-2" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="production-orders">
            <Clipboard className="h-4 w-4 ml-2" />
            أوامر الإنتاج
          </TabsTrigger>
          <TabsTrigger value="planning">
            <Calendar className="h-4 w-4 ml-2" />
            تخطيط الإنتاج
          </TabsTrigger>
          <TabsTrigger value="bom">
            <Layers className="h-4 w-4 ml-2" />
            قائمة المواد
          </TabsTrigger>
          <TabsTrigger value="work-centers">
            <Factory className="h-4 w-4 ml-2" />
            مراكز العمل
          </TabsTrigger>
          <TabsTrigger value="operations">
            <Wrench className="h-4 w-4 ml-2" />
            عمليات الإنتاج
          </TabsTrigger>
          <TabsTrigger value="mrp">
            <Truck className="h-4 w-4 ml-2" />
            تخطيط المواد
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="h-4 w-4 ml-2" />
            المخزون
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Gauge className="h-4 w-4 ml-2" />
            أداء الإنتاج
          </TabsTrigger>
          <TabsTrigger value="quick-links">
            <Bookmark className="h-4 w-4 ml-2" />
            روابط سريعة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ManufacturingDashboard />
        </TabsContent>

        <TabsContent value="production-orders">
          <ProductionOrders />
        </TabsContent>

        <TabsContent value="planning">
          <ProductionPlanning />
        </TabsContent>

        <TabsContent value="bom">
          <BillOfMaterialsList />
        </TabsContent>

        <TabsContent value="work-centers">
          <WorkCenters />
        </TabsContent>

        <TabsContent value="operations">
          <ProductionOperations />
        </TabsContent>

        <TabsContent value="mrp">
          <MaterialRequirements />
        </TabsContent>

        <TabsContent value="inventory">
          <ManufacturingInventory />
        </TabsContent>

        <TabsContent value="performance">
          <ProductionPerformanceSummary />
        </TabsContent>

        <TabsContent value="quick-links">
          <ManufacturingQuickLinks
            onOpenProductionOrder={handleOpenProductionOrder}
            onOpenBOM={handleOpenBOM}
            onOpenWorkCenters={handleOpenWorkCenters}
            onOpenOperations={handleOpenOperations}
            onOpenPlanning={handleOpenPlanning}
            onOpenMRP={handleOpenMRP}
            onOpenInventory={handleOpenInventory}
            onOpenPerformance={handleOpenPerformance}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManufacturingTabs;
