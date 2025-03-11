import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CRMDashboard from "./CRMDashboard";
import CustomerList from "./CustomerList";
import CustomersList from "./CustomersList";
import OpportunityPipeline from "./OpportunityPipeline";
import ActivityLog from "./ActivityLog";
import CRMReports from "./CRMReports";
import {
  Users,
  Target,
  Mail,
  Award,
  BarChart3,
  Phone,
  FileText,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CRMTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="customers">
          <Users className="h-4 w-4 ml-2" />
          العملاء
        </TabsTrigger>
        <TabsTrigger value="customers-db">
          <Database className="h-4 w-4 ml-2" />
          العملاء (قاعدة البيانات)
        </TabsTrigger>
        <TabsTrigger value="opportunities">
          <Target className="h-4 w-4 ml-2" />
          الفرص البيعية
        </TabsTrigger>
        <TabsTrigger value="communications">
          <Phone className="h-4 w-4 ml-2" />
          سجل التواصل
        </TabsTrigger>
        <TabsTrigger value="campaigns">
          <Mail className="h-4 w-4 ml-2" />
          الحملات التسويقية
        </TabsTrigger>
        <TabsTrigger value="loyalty">
          <Award className="h-4 w-4 ml-2" />
          برامج الولاء
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <CRMDashboard />
      </TabsContent>

      <TabsContent value="customers">
        <CustomerList />
      </TabsContent>

      <TabsContent value="customers-db">
        <CustomersList />
      </TabsContent>

      <TabsContent value="opportunities">
        <OpportunityPipeline />
      </TabsContent>

      <TabsContent value="communications">
        <ActivityLog />
      </TabsContent>

      <TabsContent value="campaigns">
        <Card>
          <CardHeader>
            <CardTitle>الحملات التسويقية</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هنا سيتم عرض الحملات التسويقية وإدارتها
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="loyalty">
        <Card>
          <CardHeader>
            <CardTitle>برامج الولاء</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هنا سيتم عرض برامج الولاء وإدارتها
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <CRMReports />
      </TabsContent>
    </Tabs>
  );
};

export default CRMTabs;
