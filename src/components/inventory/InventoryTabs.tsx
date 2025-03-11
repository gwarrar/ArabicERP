import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Lazy load components to improve performance
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InventoryDashboard = lazy(() => import("./InventoryDashboard"));
const WarehousesList = lazy(() => import("./WarehousesList"));
const ProductsList = lazy(() => import("./ProductsList"));
const ProductCategories = lazy(() => import("./ProductCategories"));
const StockMovements = lazy(() => import("./StockMovements"));
const InventoryReports = lazy(() => import("./InventoryReports"));
const FabricRollsList = lazy(() => import("./FabricRollsList"));
const WarehouseMap = lazy(() => import("./WarehouseMap"));
const ReceiveMaterials = lazy(() => import("./ReceiveMaterials"));
const InventoryCount = lazy(() => import("./InventoryCount"));
const EnhancedWarehouseMap = lazy(() => import("./EnhancedWarehouseMap"));
const RFIDIntegrationSettings = lazy(() => import("./RFIDIntegrationSettings"));
const RFIDTagManagement = lazy(() => import("./RFIDTagManagement"));
const RFIDDashboard = lazy(() => import("./RFIDDashboard"));
import {
  BarChart3,
  FileText,
  Package,
  Layers,
  ArrowRightLeft,
  Warehouse,
  FolderTree,
  QrCode,
  Map,
  Truck,
  BoxesIcon,
  Clipboard,
  Smartphone,
  Settings,
  Tag,
  LayoutDashboard,
} from "lucide-react";

// Loading skeleton for tab content
const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );
};

const InventoryTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <div className="border-b mb-6">
        <TabsList className="mb-4 w-full justify-start overflow-x-auto flex-wrap h-auto p-0">
          <TabsTrigger value="dashboard" className="rounded-md m-1">
            <BarChart3 className="h-4 w-4 ml-2" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="warehouses" className="rounded-md m-1">
            <Warehouse className="h-4 w-4 ml-2" />
            المستودعات
          </TabsTrigger>
          <TabsTrigger value="warehouse-map" className="rounded-md m-1">
            <Map className="h-4 w-4 ml-2" />
            خريطة المستودع
          </TabsTrigger>
          <TabsTrigger value="enhanced-map" className="rounded-md m-1">
            <Map className="h-4 w-4 ml-2" />
            خريطة تفاعلية
          </TabsTrigger>
          <TabsTrigger value="inventory-count" className="rounded-md m-1">
            <Clipboard className="h-4 w-4 ml-2" />
            الجرد
          </TabsTrigger>
          <TabsTrigger value="receive-materials" className="rounded-md m-1">
            <Truck className="h-4 w-4 ml-2" />
            استلام المواد
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-md m-1">
            <FolderTree className="h-4 w-4 ml-2" />
            مجموعات المنتجات
          </TabsTrigger>
          <TabsTrigger value="products" className="rounded-md m-1">
            <Package className="h-4 w-4 ml-2" />
            المنتجات
          </TabsTrigger>
          <TabsTrigger value="fabric-rolls" className="rounded-md m-1">
            <QrCode className="h-4 w-4 ml-2" />
            رولونات القماش
          </TabsTrigger>
          <TabsTrigger value="movements" className="rounded-md m-1">
            <ArrowRightLeft className="h-4 w-4 ml-2" />
            حركة المخزون
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-md m-1">
            <FileText className="h-4 w-4 ml-2" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="rfid-dashboard" className="rounded-md m-1">
            <LayoutDashboard className="h-4 w-4 ml-2" />
            لوحة RFID
          </TabsTrigger>
          <TabsTrigger value="rfid-tags" className="rounded-md m-1">
            <Tag className="h-4 w-4 ml-2" />
            تاجات RFID
          </TabsTrigger>
          <TabsTrigger value="rfid-settings" className="rounded-md m-1">
            <Smartphone className="h-4 w-4 ml-2" />
            إعدادات RFID
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="dashboard">
        <Suspense fallback={<LoadingSkeleton />}>
          <InventoryDashboard />
        </Suspense>
      </TabsContent>

      <TabsContent value="warehouses">
        <Suspense fallback={<LoadingSkeleton />}>
          <WarehousesList />
        </Suspense>
      </TabsContent>

      <TabsContent value="warehouse-map">
        <Suspense fallback={<LoadingSkeleton />}>
          <WarehouseMap />
        </Suspense>
      </TabsContent>

      <TabsContent value="enhanced-map">
        <Suspense fallback={<LoadingSkeleton />}>
          <EnhancedWarehouseMap />
        </Suspense>
      </TabsContent>

      <TabsContent value="inventory-count">
        <Suspense fallback={<LoadingSkeleton />}>
          <InventoryCount />
        </Suspense>
      </TabsContent>

      <TabsContent value="receive-materials">
        <Suspense fallback={<LoadingSkeleton />}>
          <ReceiveMaterials />
        </Suspense>
      </TabsContent>

      <TabsContent value="categories">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductCategories />
        </Suspense>
      </TabsContent>

      <TabsContent value="products">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductsList />
        </Suspense>
      </TabsContent>

      <TabsContent value="fabric-rolls">
        <Suspense fallback={<LoadingSkeleton />}>
          <FabricRollsList />
        </Suspense>
      </TabsContent>

      <TabsContent value="movements">
        <Suspense fallback={<LoadingSkeleton />}>
          <StockMovements />
        </Suspense>
      </TabsContent>

      <TabsContent value="reports">
        <Suspense fallback={<LoadingSkeleton />}>
          <InventoryReports />
        </Suspense>
      </TabsContent>

      <TabsContent value="rfid-dashboard">
        <Suspense fallback={<LoadingSkeleton />}>
          <RFIDDashboard />
        </Suspense>
      </TabsContent>

      <TabsContent value="rfid-tags">
        <Suspense fallback={<LoadingSkeleton />}>
          <RFIDTagManagement />
        </Suspense>
      </TabsContent>

      <TabsContent value="rfid-settings">
        <Suspense fallback={<LoadingSkeleton />}>
          <RFIDIntegrationSettings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
