import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UISettings from "./UISettings";
import UserManagement from "./UserManagement";
import IntegrationSettings from "./IntegrationSettings";
import PrintTemplates from "./PrintTemplates";
import LocalizationSettings from "./LocalizationSettings";
import DatabaseSettings from "./DatabaseSettings";
import DatabaseSetup from "./DatabaseSetup";
import AIIntegrationSettings from "./AIIntegrationSettings";
import {
  Palette,
  Users,
  Link,
  Globe,
  Database,
  Bell,
  Shield,
  Printer,
  Server,
  Sparkles,
} from "lucide-react";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="ui" className="w-full" dir="rtl">
      <div className="flex flex-col gap-2">
        {/* الصف الأول من التبويبات */}
        <TabsList>
          <TabsTrigger value="ui">
            <Palette className="h-4 w-4 ml-2" />
            واجهة المستخدم
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 ml-2" />
            المستخدمين والصلاحيات
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Link className="h-4 w-4 ml-2" />
            التكامل مع الأنظمة
          </TabsTrigger>
          <TabsTrigger value="localization">
            <Globe className="h-4 w-4 ml-2" />
            الإعدادات المحلية
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="h-4 w-4 ml-2" />
            قاعدة البيانات
          </TabsTrigger>
        </TabsList>

        {/* الصف الثاني من التبويبات */}
        <TabsList>
          <TabsTrigger value="database-setup">
            <Server className="h-4 w-4 ml-2" />
            إعداد قاعدة البيانات
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 ml-2" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 ml-2" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="print">
            <Printer className="h-4 w-4 ml-2" />
            الطباعة
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="h-4 w-4 ml-2" />
            الذكاء الاصطناعي
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="ui">
        <UISettings />
      </TabsContent>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="integrations">
        <IntegrationSettings />
      </TabsContent>

      <TabsContent value="localization">
        <LocalizationSettings />
      </TabsContent>

      <TabsContent value="database">
        <DatabaseSettings />
      </TabsContent>

      <TabsContent value="database-setup">
        <DatabaseSetup />
      </TabsContent>

      <TabsContent value="notifications">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات الإشعارات</h2>
          <p className="text-muted-foreground mb-4">قريباً...</p>
        </div>
      </TabsContent>

      <TabsContent value="security">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-bold mb-4">إعدادات الأمان</h2>
          <p className="text-muted-foreground mb-4">قريباً...</p>
        </div>
      </TabsContent>

      <TabsContent value="print">
        <PrintTemplates />
      </TabsContent>

      <TabsContent value="ai">
        <AIIntegrationSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
