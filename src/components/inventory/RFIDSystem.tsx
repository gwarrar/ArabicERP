import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Tag,
  Smartphone,
  BarChart,
  Settings,
} from "lucide-react";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const RFIDDashboard = lazy(() => import("./RFIDDashboard"));
const RFIDTagManagement = lazy(() => import("./RFIDTagManagement"));
const RFIDScannerInterface = lazy(() => import("./RFIDScannerInterface"));
const RFIDReports = lazy(() => import("./RFIDReports"));
const RFIDIntegrationSettings = lazy(() => import("./RFIDIntegrationSettings"));

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

const RFIDSystem = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>نظام RFID</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="tags">
              <Tag className="h-4 w-4 ml-2" />
              إدارة التاجات
            </TabsTrigger>
            <TabsTrigger value="scanner">
              <Smartphone className="h-4 w-4 ml-2" />
              واجهة المسح
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart className="h-4 w-4 ml-2" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 ml-2" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Suspense fallback={<LoadingSkeleton />}>
              <RFIDDashboard />
            </Suspense>
          </TabsContent>

          <TabsContent value="tags">
            <Suspense fallback={<LoadingSkeleton />}>
              <RFIDTagManagement />
            </Suspense>
          </TabsContent>

          <TabsContent value="scanner">
            <Suspense fallback={<LoadingSkeleton />}>
              <RFIDScannerInterface />
            </Suspense>
          </TabsContent>

          <TabsContent value="reports">
            <Suspense fallback={<LoadingSkeleton />}>
              <RFIDReports />
            </Suspense>
          </TabsContent>

          <TabsContent value="settings">
            <Suspense fallback={<LoadingSkeleton />}>
              <RFIDIntegrationSettings />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RFIDSystem;
