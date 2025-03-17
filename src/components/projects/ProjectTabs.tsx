import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectDashboard from "./ProjectDashboard";
import ProjectList from "./ProjectList";

const ProjectTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="w-full" dir="rtl">
      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b">
          <div className="flex items-center justify-between px-4 py-2">
            <TabsList className="grid w-full md:w-auto grid-cols-5 h-9">
              <TabsTrigger value="dashboard" className="text-xs md:text-sm">
                لوحة التحكم
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-xs md:text-sm">
                المشاريع
              </TabsTrigger>
              <TabsTrigger value="tasks" className="text-xs md:text-sm">
                المهام
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs md:text-sm">
                الموارد
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs md:text-sm">
                التقارير
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="dashboard" className="p-0">
          <ProjectDashboard />
        </TabsContent>

        <TabsContent value="projects" className="p-0">
          <ProjectList />
        </TabsContent>

        <TabsContent value="tasks" className="p-0">
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">مهام المشاريع</h2>
            <p className="text-gray-500">
              سيتم تنفيذ هذا القسم في المرحلة التالية
            </p>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="p-0">
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">موارد المشاريع</h2>
            <p className="text-gray-500">
              سيتم تنفيذ هذا القسم في المرحلة التالية
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="p-0">
          <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">تقارير المشاريع</h2>
            <p className="text-gray-500">
              سيتم تنفيذ هذا القسم في المرحلة التالية
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabs;
