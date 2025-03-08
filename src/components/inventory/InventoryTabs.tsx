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
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="warehouses">
          <Warehouse className="h-4 w-4 ml-2" />
          المستودعات
        </TabsTrigger>
        <TabsTrigger value="warehouse-map">
          <Map className="h-4 w-4 ml-2" />
          خريطة المستودع
        </TabsTrigger>
        <TabsTrigger value="receive-materials">
          <Truck className="h-4 w-4 ml-2" />
          استلام المواد
        </TabsTrigger>
        <TabsTrigger value="categories">
          <FolderTree className="h-4 w-4 ml-2" />
          مجموعات المنتجات
        </TabsTrigger>
        <TabsTrigger value="products">
          <Package className="h-4 w-4 ml-2" />
          المنتجات
        </TabsTrigger>
        <TabsTrigger value="fabric-rolls">
          <QrCode className="h-4 w-4 ml-2" />
          رولونات القماش
        </TabsTrigger>
        <TabsTrigger value="movements">
          <ArrowRightLeft className="h-4 w-4 ml-2" />
          حركة المخزون
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
      </TabsList>

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
    </Tabs>
  );
};

export default InventoryTabs;
