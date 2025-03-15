import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowManager from "./WorkflowManager";
import WorkflowDashboard from "./WorkflowDashboard";
import WorkflowEngine from "./WorkflowEngine";
import WorkflowIntegration from "./WorkflowIntegration";
import WorkflowDesigner from "./WorkflowDesigner";
import WorkflowAnalytics from "./WorkflowAnalytics";
import WorkflowTemplates from "./WorkflowTemplates";

const WorkflowTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
        <TabsList className="mb-2">
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="designer">مصمم سير العمل</TabsTrigger>
          <TabsTrigger value="integration">التكامل</TabsTrigger>
          <TabsTrigger value="engine">محرك سير العمل</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="manager">إدارة سير العمل</TabsTrigger>
          <TabsTrigger value="dashboard">لوحة المتابعة</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="dashboard">
        <WorkflowDashboard />
      </TabsContent>

      <TabsContent value="manager">
        <WorkflowManager />
      </TabsContent>

      <TabsContent value="templates">
        <WorkflowTemplates />
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

      <TabsContent value="analytics">
        <WorkflowAnalytics />
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowTabs;
