import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SaaSAdminDashboard from "./SaaSAdminDashboard";
import SubscriptionsList from "./subscriptions/SubscriptionsList";
import PackagesAndPricing from "./packages/PackagesAndPricing";
import ModuleManagement from "./modules/ModuleManagement";
import BackupManagement from "./backups/BackupManagement";
import SaaSReports from "./reports/SaaSReports";
import {
  BarChart3,
  Users,
  Package,
  Layers,
  Database,
  FileText,
} from "lucide-react";

const SaaSAdminTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="subscriptions">
          <Users className="h-4 w-4 ml-2" />
          إدارة الاشتراكات
        </TabsTrigger>
        <TabsTrigger value="packages">
          <Package className="h-4 w-4 ml-2" />
          الباقات والتسعير
        </TabsTrigger>
        <TabsTrigger value="modules">
          <Layers className="h-4 w-4 ml-2" />
          إدارة الوحدات
        </TabsTrigger>
        <TabsTrigger value="backups">
          <Database className="h-4 w-4 ml-2" />
          النسخ الاحتياطية
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <SaaSAdminDashboard />
      </TabsContent>

      <TabsContent value="subscriptions">
        <SubscriptionsList />
      </TabsContent>

      <TabsContent value="packages">
        <PackagesAndPricing />
      </TabsContent>

      <TabsContent value="modules">
        <ModuleManagement />
      </TabsContent>

      <TabsContent value="backups">
        <BackupManagement />
      </TabsContent>

      <TabsContent value="reports">
        <SaaSReports />
      </TabsContent>
    </Tabs>
  );
};

export default SaaSAdminTabs;
