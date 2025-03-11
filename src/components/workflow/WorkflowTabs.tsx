import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowManager from "./WorkflowManager";
import WorkflowDashboard from "./WorkflowDashboard";
import WorkflowEngine from "./WorkflowEngine";
import WorkflowIntegration from "./WorkflowIntegration";
import WorkflowDesigner from "./WorkflowDesigner";

const WorkflowTabs = () => {
  return (
    <Tabs defaultValue="manager" className="w-full">
      <TabsList className="mb-6 w-full justify-start overflow-x-auto">
        <TabsTrigger value="dashboard">لوحة المتابعة</TabsTrigger>
        <TabsTrigger value="manager">إدارة سير العمل</TabsTrigger>
        <TabsTrigger value="engine">محرك سير العمل</TabsTrigger>
        <TabsTrigger value="integration">التكامل</TabsTrigger>
        <TabsTrigger value="designer">مصمم سير العمل</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <WorkflowDashboard />
      </TabsContent>

      <TabsContent value="manager">
        <WorkflowManager />
      </TabsContent>

      <TabsContent value="engine">
        <WorkflowEngine />
      </TabsContent>

      <TabsContent value="integration">
        <WorkflowIntegration />
      </TabsContent>

      <TabsContent value="designer">
        <WorkflowDesigner />
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowTabs;
