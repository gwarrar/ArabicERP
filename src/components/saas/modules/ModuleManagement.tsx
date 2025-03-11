import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, Package, Settings } from "lucide-react";
import ModulesList from "./ModulesList";
import ModulePackageAssignment from "./ModulePackageAssignment";

const ModuleManagement = () => {
  const [activeTab, setActiveTab] = useState("modules");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="modules">
            <Layers className="h-4 w-4 ml-2" />
            الوحدات
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <Package className="h-4 w-4 ml-2" />
            تعيين الوحدات للباقات
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 ml-2" />
            إعدادات الوحدات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-0">
          <ModulesList />
        </TabsContent>

        <TabsContent value="assignments" className="mt-0">
          <ModulePackageAssignment />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="p-6 border rounded-md bg-muted/20">
            <h3 className="text-lg font-medium mb-4">إعدادات الوحدات</h3>
            <p className="text-muted-foreground">
              هذا القسم قيد التطوير. سيتيح لك تخصيص إعدادات كل وحدة وتكوين
              السلوك الافتراضي للوحدات الجديدة.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleManagement;
