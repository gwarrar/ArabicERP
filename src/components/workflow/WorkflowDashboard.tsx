import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  Play,
  Pause,
  GitBranch,
  Link as LinkIcon,
  Plus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const WorkflowDashboard = () => {
  // بيانات تجريبية لإحصائيات سير العمل
  const workflowStats = {
    totalWorkflows: 5,
    activeWorkflows: 3,
    completedToday: 2,
    pendingApprovals: 1,
    averageCompletionTime: "4.5 ساعات",
    successRate: 92,
  };

  // بيانات تجريبية لسير العمل النشط
  const activeWorkflows = [
    {
      id: "WF-001",
      name: "دورة الموافقة على المشتريات",
      instances: 24,
      status: "نشط",
      lastRun: "منذ 2 ساعة",
      successRate: 95,
    },
    {
      id: "WF-002",
      name: "معالجة طلبات العملاء",
      instances: 56,
      status: "نشط",
      lastRun: "منذ 1 ساعة",
      successRate: 88,
    },
    {
      id: "WF-003",
      name: "الموافقة على الإجازات",
      instances: 18,
      status: "نشط",
      lastRun: "منذ 12 ساعة",
      successRate: 94,
    },
  ];

  // بيانات تجريبية للعمليات الأخيرة
  const recentInstances = [
    {
      id: "INST-001",
      workflowName: "دورة الموافقة على المشتريات",
      reference: "PO-2024-0125",
      status: "مكتمل",
      completedAt: "منذ 2 ساعة",
      duration: "5 ساعات 15 دقيقة",
    },
    {
      id: "INST-002",
      workflowName: "معالجة طلبات العملاء",
      reference: "ORD-2024-0356",
      status: "قيد التنفيذ",
      completedAt: "-",
      duration: "6 ساعات 30 دقيقة",
    },
    {
      id: "INST-003",
      workflowName: "الموافقة على الإجازات",
      reference: "LV-2024-0089",
      status: "مكتمل",
      completedAt: "منذ 18 ساعة",
      duration: "5 ساعات 10 دقيقة",
    },
    {
      id: "INST-004",
      workflowName: "دورة الموافقة على المشتريات",
      reference: "PO-2024-0124",
      status: "معلق",
      completedAt: "-",
      duration: "1 يوم 7 ساعات",
    },
  ];

  // الحصول على لون الحالة
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "متوقف":
        return "bg-red-100 text-red-800";
      case "مسودة":
        return "bg-amber-100 text-amber-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "معلق":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status) => {
    switch (status) {
      case "نشط":
        return <Play className="h-4 w-4 text-green-600" />;
      case "متوقف":
        return <Pause className="h-4 w-4 text-red-600" />;
      case "مسودة":
        return <FileText className="h-4 w-4 text-amber-600" />;
      case "مكتمل":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "قيد التنفيذ":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "معلق":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">لوحة متابعة سير العمل</h3>
          <p className="text-muted-foreground">
            نظرة عامة على أداء سير العمل والعمليات الجارية
          </p>
        </div>
        <div>
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            إنشاء سير عمل جديد
          </Button>
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي سير العمل النشط
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.activeWorkflows} /{" "}
                  {workflowStats.totalWorkflows}
                </h3>
                <div className="mt-2">
                  <Progress
                    value={
                      (workflowStats.activeWorkflows /
                        workflowStats.totalWorkflows) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <GitBranch className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  معدل نجاح العمليات
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.successRate}%
                </h3>
                <div className="mt-2">
                  <Progress value={workflowStats.successRate} className="h-2" />
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط وقت الإكمال
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.averageCompletionTime}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  عمليات مكتملة اليوم: {workflowStats.completedToday}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* سير العمل النشط */}
      <Card>
        <CardHeader>
          <CardTitle>سير العمل النشط</CardTitle>
          <CardDescription>
            قائمة بسير العمل النشط حالياً في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <GitBranch className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{workflow.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>المعرف: {workflow.id}</span>
                      <span>•</span>
                      <span>آخر تشغيل: {workflow.lastRun}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {workflow.successRate}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        معدل النجاح
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {workflow.instances}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        عملية نشطة
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusBadgeClass(workflow.status)}>
                    {workflow.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* العمليات الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle>العمليات الأخيرة</CardTitle>
          <CardDescription>
            آخر العمليات التي تم تنفيذها في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInstances.map((instance) => (
              <div
                key={instance.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(instance.status)}
                  <div>
                    <h3 className="font-medium">{instance.workflowName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>المرجع: {instance.reference}</span>
                      <span>•</span>
                      <span>
                        {instance.status === "مكتمل"
                          ? `تم الإكمال: ${instance.completedAt}`
                          : `المدة: ${instance.duration}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadgeClass(instance.status)}>
                    {instance.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowDashboard;
