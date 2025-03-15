import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Lazy load components to improve performance
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  FileText,
  Package,
  ArrowRightLeft,
  Warehouse,
  FolderTree,
  QrCode,
  Map,
  Truck,
  Clipboard,
  Tag,
  Bookmark,
  Boxes,
} from "lucide-react";

const InventoryDashboard = lazy(() => import("./InventoryDashboard"));
const WarehousesList = lazy(() => import("./WarehousesList"));
const ProductsList = lazy(() => import("./ProductsList"));
const ProductCategories = lazy(() => import("./ProductCategories"));
const EnhancedProductCategories = lazy(
  () => import("./EnhancedProductCategories"),
);
const StockMovements = lazy(() => import("./StockMovements"));
const InventoryReports = lazy(() => import("./InventoryReports"));
const FabricRollsList = lazy(() => import("./FabricRollsList"));
const WarehouseMap = lazy(() => import("./WarehouseMap"));
const ReceiveMaterials = lazy(() => import("./ReceiveMaterials"));
const InventoryCount = lazy(() => import("./InventoryCount"));
const EnhancedWarehouseMap = lazy(() => import("./EnhancedWarehouseMap"));
const InventoryQuickLinks = lazy(() => import("./InventoryQuickLinks"));

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

// Import the RFID components
import RFIDSystem from "./RFIDSystem";
import RFIDInventoryManagement from "./RFIDInventoryManagement";

const InventoryTabs = () => {
  const [showReservations, setShowReservations] = useState(false);

  // Handlers for quick links
  const handleOpenContainerReceiving = () => {
    // Navigate to receive-materials tab
    document
      .querySelector('[value="receive-materials"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenStockTransfer = () => {
    // Navigate to stock transfer page
    window.location.href = "/inventory/stock-transfer";
  };

  const handleOpenInventoryCount = () => {
    // Navigate to inventory-count tab
    document
      .querySelector('[value="inventory-count"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenReservations = () => {
    // Open reservations dialog
    setShowReservations(true);
  };

  const handleOpenRFIDSystem = () => {
    // Navigate to rfid-system tab
    document
      .querySelector('[value="rfid-system"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenWarehouseMap = () => {
    // Navigate to warehouse-map tab
    document
      .querySelector('[value="warehouse-map"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenReports = () => {
    // Navigate to reports tab
    document
      .querySelector('[value="reports"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenProductCategories = () => {
    // Navigate to enhanced-categories tab
    document
      .querySelector('[value="enhanced-categories"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <div className="border-b mb-6 bg-muted rounded-md p-2">
        <div className="flex flex-col gap-2">
          {/* الصف الأول من التبويبات */}
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="enhanced-categories">
              <FolderTree className="h-4 w-4 ml-2" />
              مجموعات المواد
            </TabsTrigger>
            <TabsTrigger value="fabric-rolls">
              <QrCode className="h-4 w-4 ml-2" />
              رولونات القماش
            </TabsTrigger>
            <TabsTrigger value="warehouses">
              <Warehouse className="h-4 w-4 ml-2" />
              المستودعات
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

          {/* الصف الثاني من التبويبات */}
          <TabsList>
            <TabsTrigger value="inventory-count">
              <Clipboard className="h-4 w-4 ml-2" />
              الجرد
            </TabsTrigger>
            <TabsTrigger value="receive-materials">
              <Truck className="h-4 w-4 ml-2" />
              استلام المواد
            </TabsTrigger>
            <TabsTrigger value="rfid-system">
              <Tag className="h-4 w-4 ml-2" />
              نظام RFID
            </TabsTrigger>
            <TabsTrigger value="rfid-inventory">
              <Tag className="h-4 w-4 ml-2" />
              إدارة المخزون RFID
            </TabsTrigger>
            <TabsTrigger value="warehouse-map">
              <Map className="h-4 w-4 ml-2" />
              خريطة المستودع
            </TabsTrigger>
            <TabsTrigger value="quick-links">
              <Bookmark className="h-4 w-4 ml-2" />
              روابط سريعة
            </TabsTrigger>
          </TabsList>
        </div>
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

      <TabsContent value="rfid-system">
        <Suspense fallback={<LoadingSkeleton />}>
          <RFIDSystem />
        </Suspense>
      </TabsContent>

      <TabsContent value="rfid-inventory">
        <Suspense fallback={<LoadingSkeleton />}>
          <RFIDInventoryManagement />
        </Suspense>
      </TabsContent>

      <TabsContent value="enhanced-categories">
        <Suspense fallback={<LoadingSkeleton />}>
          <EnhancedProductCategories />
        </Suspense>
      </TabsContent>

      <TabsContent value="quick-links">
        <Suspense fallback={<LoadingSkeleton />}>
          <InventoryQuickLinks
            onOpenContainerReceiving={handleOpenContainerReceiving}
            onOpenStockTransfer={handleOpenStockTransfer}
            onOpenInventoryCount={handleOpenInventoryCount}
            onOpenReservations={handleOpenReservations}
            onOpenRFIDSystem={handleOpenRFIDSystem}
            onOpenWarehouseMap={handleOpenWarehouseMap}
            onOpenReports={handleOpenReports}
            onOpenProductCategories={handleOpenProductCategories}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
