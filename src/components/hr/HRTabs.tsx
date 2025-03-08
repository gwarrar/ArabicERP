import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Award,
  FileText,
  Calendar,
  BarChart3,
  Briefcase,
  GraduationCap,
  Table,
  LayoutDashboard,
} from "lucide-react";
import EmployeePerformanceSystem from "./EmployeePerformanceSystem";
import EmployeePerformanceTable from "./EmployeePerformanceTable";
import AttendanceManagement from "./AttendanceManagement";
import HRDashboard from "./HRDashboard";
import EmployeeList from "./EmployeeList";
import RecruitmentManagement from "./RecruitmentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HRTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="dashboard">
          <LayoutDashboard className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="employees">
          <Users className="h-4 w-4 ml-2" />
          الموظفين
        </TabsTrigger>
        <TabsTrigger value="performance">
          <Award className="h-4 w-4 ml-2" />
          الأداء والحوافز
        </TabsTrigger>
        <TabsTrigger value="performance-table">
          <Table className="h-4 w-4 ml-2" />
          جدول الأداء والمبيعات
        </TabsTrigger>
        <TabsTrigger value="attendance">
          <Calendar className="h-4 w-4 ml-2" />
          الحضور والإجازات
        </TabsTrigger>
        <TabsTrigger value="recruitment">
          <Briefcase className="h-4 w-4 ml-2" />
          التوظيف
        </TabsTrigger>
        <TabsTrigger value="training">
          <GraduationCap className="h-4 w-4 ml-2" />
          التدريب والتطوير
        </TabsTrigger>
        <TabsTrigger value="reports">
          <BarChart3 className="h-4 w-4 ml-2" />
          التقارير
        </TabsTrigger>
        <TabsTrigger value="documents">
          <FileText className="h-4 w-4 ml-2" />
          المستندات
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <HRDashboard />
      </TabsContent>

      <TabsContent value="employees">
        <EmployeeList />
      </TabsContent>

      <TabsContent value="performance">
        <EmployeePerformanceSystem />
      </TabsContent>

      <TabsContent value="performance-table">
        <EmployeePerformanceTable />
      </TabsContent>

      <TabsContent value="attendance">
        <AttendanceManagement />
      </TabsContent>

      <TabsContent value="recruitment">
        <RecruitmentManagement />
      </TabsContent>

      <TabsContent value="training">
        <Card>
          <CardHeader>
            <CardTitle>التدريب والتطوير</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هنا سيتم عرض برامج التدريب وخطط التطوير
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>التقارير</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هنا سيتم عرض تقارير الموارد البشرية
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <Card>
          <CardHeader>
            <CardTitle>المستندات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              هنا سيتم عرض مستندات الموظفين والسياسات
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default HRTabs;
