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
  Building,
  Clipboard,
  Settings,
  Trophy,
} from "lucide-react";
import EmployeePerformanceSystem from "./EmployeePerformanceSystem";
import EmployeePerformanceTable from "./EmployeePerformanceTable";
import AttendanceManagement from "./AttendanceManagement";
import HRDashboard from "./HRDashboard";
import EmployeeList from "./EmployeeList";
import RecruitmentManagement from "./RecruitmentManagement";
import PerformanceRewardsTab from "./PerformanceRewardsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HRTabs = () => {
  return (
    <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
      <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
        <div className="flex flex-col gap-2">
          {/* الصف الأول من التبويبات */}
          <TabsList>
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="employees">
              <Users className="h-4 w-4 ml-2" />
              الموظفين
            </TabsTrigger>
            <TabsTrigger value="performance-rewards">
              <Trophy className="h-4 w-4 ml-2" />
              الأداء والمكافآت
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
          </TabsList>

          {/* الصف الثاني من التبويبات */}
          <TabsList>
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
            <TabsTrigger value="departments">
              <Building className="h-4 w-4 ml-2" />
              الأقسام
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <HRDashboard />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeList />
        </TabsContent>

        <TabsContent value="performance-rewards">
          <PerformanceRewardsTab />
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

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>الأقسام</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                هنا سيتم عرض الأقسام والهيكل التنظيمي للشركة
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRTabs;
