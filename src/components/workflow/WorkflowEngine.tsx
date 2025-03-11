import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  Calendar,
  ArrowRight,
  Eye,
  Settings,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// نموذج لحالة سير العمل
interface WorkflowState {
  id: string;
  workflowId: string;
  workflowName: string;
  reference: string;
  currentStepId: string;
  currentStepName: string;
  status: string;
  startedAt: string;
  lastUpdatedAt: string;
  completedAt?: string;
  initiatedBy: string;
  assignedTo?: string;
  data: Record<string, any>;
  history: WorkflowHistoryItem[];
}

// نموذج لعنصر في سجل سير العمل
interface WorkflowHistoryItem {
  id: string;
  stepId: string;
  stepName: string;
  action?: string;
  status: string;
  timestamp: string;
  user: string;
  notes?: string;
}

// بيانات تجريبية لحالات سير العمل
const workflowStates: WorkflowState[] = [
  {
    id: "INST-001",
    workflowId: "WF-001",
    workflowName: "دورة الموافقة على المشتريات",
    reference: "PO-2024-0125",
    currentStepId: "completed",
    currentStepName: "مكتمل",
    status: "مكتمل",
    startedAt: "2024-08-15 09:30",
    lastUpdatedAt: "2024-08-15 14:45",
    completedAt: "2024-08-15 14:45",
    initiatedBy: "أحمد محمد",
    data: {
      purchaseOrderNumber: "PO-2024-0125",
      supplier: "شركة الصين للملابس",
      totalAmount: 12500,
      items: [
        { name: "قماش قطني", quantity: 200, unit: "متر", price: 50 },
        { name: "خيوط بوليستر", quantity: 50, unit: "بكرة", price: 30 },
      ],
    },
    history: [
      {
        id: "HIST-001-1",
        stepId: "request",
        stepName: "طلب الشراء",
        action: "submit",
        status: "مكتمل",
        timestamp: "2024-08-15 09:30",
        user: "أحمد محمد",
        notes: "تم إنشاء طلب الشراء",
      },
      {
        id: "HIST-001-2",
        stepId: "initialApproval",
        stepName: "الموافقة الأولية",
        action: "approve",
        status: "مكتمل",
        timestamp: "2024-08-15 11:15",
        user: "محمد علي",
        notes: "تمت الموافقة على الطلب من قبل مدير القسم",
      },
      {
        id: "HIST-001-3",
        stepId: "finalApproval",
        stepName: "الموافقة النهائية",
        action: "approve",
        status: "مكتمل",
        timestamp: "2024-08-15 13:30",
        user: "خالد العبدالله",
        notes: "تمت الموافقة النهائية على الطلب",
      },
      {
        id: "HIST-001-4",
        stepId: "createPurchaseOrder",
        stepName: "إنشاء أمر شراء",
        action: "complete",
        status: "مكتمل",
        timestamp: "2024-08-15 14:45",
        user: "فاطمة حسن",
        notes: "تم إنشاء أمر الشراء بنجاح",
      },
    ],
  },
  {
    id: "INST-002",
    workflowId: "WF-002",
    workflowName: "معالجة طلبات العملاء",
    reference: "ORD-2024-0356",
    currentStepId: "reviewOrder",
    currentStepName: "مراجعة الطلب",
    status: "قيد التنفيذ",
    startedAt: "2024-08-15 10:15",
    lastUpdatedAt: "2024-08-15 10:15",
    initiatedBy: "محمد علي",
    assignedTo: "سارة أحمد",
    data: {
      orderNumber: "ORD-2024-0356",
      customer: "شركة الأفق للتجارة",
      totalAmount: 8750,
      items: [
        { name: "قميص قطني", quantity: 25, unit: "قطعة", price: 250 },
        { name: "بنطلون جينز", quantity: 10, unit: "قطعة", price: 350 },
      ],
    },
    history: [
      {
        id: "HIST-002-1",
        stepId: "createOrder",
        stepName: "إنشاء الطلب",
        action: "submit",
        status: "مكتمل",
        timestamp: "2024-08-15 10:15",
        user: "محمد علي",
        notes: "تم إنشاء طلب العميل",
      },
    ],
  },
  {
    id: "INST-003",
    workflowId: "WF-003",
    workflowName: "الموافقة على الإجازات",
    reference: "LV-2024-0089",
    currentStepId: "completed",
    currentStepName: "مكتمل",
    status: "مكتمل",
    startedAt: "2024-08-14 11:20",
    lastUpdatedAt: "2024-08-14 16:30",
    completedAt: "2024-08-14 16:30",
    initiatedBy: "سارة أحمد",
    data: {
      leaveType: "سنوية",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      days: 10,
      reason: "إجازة سنوية",
    },
    history: [
      {
        id: "HIST-003-1",
        stepId: "request",
        stepName: "طلب الإجازة",
        action: "submit",
        status: "مكتمل",
        timestamp: "2024-08-14 11:20",
        user: "سارة أحمد",
        notes: "تم إنشاء طلب الإجازة",
      },
      {
        id: "HIST-003-2",
        stepId: "managerApproval",
        stepName: "موافقة المدير",
        action: "approve",
        status: "مكتمل",
        timestamp: "2024-08-14 14:45",
        user: "خالد العبدالله",
        notes: "تمت الموافقة على طلب الإجازة",
      },
      {
        id: "HIST-003-3",
        stepId: "hrApproval",
        stepName: "موافقة الموارد البشرية",
        action: "approve",
        status: "مكتمل",
        timestamp: "2024-08-14 16:30",
        user: "فاطمة حسن",
        notes: "تمت الموافقة النهائية على طلب الإجازة",
      },
    ],
  },
  {
    id: "INST-004",
    workflowId: "WF-001",
    workflowName: "دورة الموافقة على المشتريات",
    reference: "PO-2024-0124",
    currentStepId: "finalApproval",
    currentStepName: "الموافقة النهائية",
    status: "معلق",
    startedAt: "2024-08-14 09:00",
    lastUpdatedAt: "2024-08-14 13:45",
    initiatedBy: "فاطمة حسن",
    assignedTo: "خالد العبدالله",
    data: {
      purchaseOrderNumber: "PO-2024-0124",
      supplier: "شركة الأحذية العالمية",
      totalAmount: 18750,
      items: [{ name: "أحذية رياضية", quantity: 25, unit: "زوج", price: 750 }],
    },
    history: [
      {
        id: "HIST-004-1",
        stepId: "request",
        stepName: "طلب الشراء",
        action: "submit",
        status: "مكتمل",
        timestamp: "2024-08-14 09:00",
        user: "فاطمة حسن",
        notes: "تم إنشاء طلب الشراء",
      },
      {
        id: "HIST-004-2",
        stepId: "initialApproval",
        stepName: "الموافقة الأولية",
        action: "approve",
        status: "مكتمل",
        timestamp: "2024-08-14 13:45",
        user: "محمد علي",
        notes: "تمت الموافقة على الطلب من قبل مدير القسم",
      },
    ],
  },
];

const WorkflowEngine = () => {
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowState | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [statusFilter, setStatusFilter] = useState("all");

  // تصفية حالات سير العمل حسب الحالة
  const filteredWorkflows = workflowStates.filter(
    (workflow) => statusFilter === "all" || workflow.status === statusFilter,
  );

  // الحصول على لون الحالة
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "معلق":
        return "bg-amber-100 text-amber-800";
      case "ملغي":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتمل":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "قيد التنفيذ":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "معلق":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "ملغي":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // حساب المدة المستغرقة
  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate.replace(" ", "T"));
    const end = endDate ? new Date(endDate.replace(" ", "T")) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHrs >= 24) {
      const days = Math.floor(diffHrs / 24);
      const hours = diffHrs % 24;
      return `${days} يوم${days > 1 ? " " : ""} ${hours} ساعة${hours > 1 ? " " : ""}`;
    } else {
      return `${diffHrs} ساعة${diffHrs > 1 ? " " : ""} ${diffMins} دقيقة${diffMins > 1 ? " " : ""}`;
    }
  };

  // عرض تفاصيل سير العمل
  const renderWorkflowDetails = () => {
    if (!selectedWorkflow) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">معلومات أساسية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المعرف:</span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    سير العمل:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.workflowName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المرجع:</span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">الحالة:</span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(selectedWorkflow.status)}
                    <Badge
                      className={getStatusBadgeClass(selectedWorkflow.status)}
                    >
                      {selectedWorkflow.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">التوقيت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    تاريخ البدء:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.startedAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    آخر تحديث:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.lastUpdatedAt}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    تاريخ الانتهاء:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedWorkflow.completedAt || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">المدة:</span>
                  <span className="text-sm font-medium">
                    {calculateDuration(
                      selectedWorkflow.startedAt,
                      selectedWorkflow.completedAt,
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الخطوة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {selectedWorkflow.status === "مكتمل" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-600" />
                  )}
                  <div>
                    <h3 className="font-medium">
                      {selectedWorkflow.currentStepName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedWorkflow.status === "مكتمل"
                        ? "تم إكمال سير العمل"
                        : `بانتظار الإجراء من ${selectedWorkflow.assignedTo || "النظام"}`}
                    </p>
                  </div>
                </div>
                {selectedWorkflow.status !== "مكتمل" && (
                  <div className="flex gap-2">
                    <Button size="sm">
                      <ArrowRight className="ml-1 h-3 w-3" />
                      متابعة
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">بيانات سير العمل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(selectedWorkflow.data).map(([key, value]) => {
                if (typeof value === "object" && Array.isArray(value)) {
                  return (
                    <div key={key} className="space-y-2">
                      <h3 className="text-sm font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            {value.length > 0 &&
                              Object.keys(value[0]).map((header) => (
                                <TableHead key={header}>
                                  {header.charAt(0).toUpperCase() +
                                    header.slice(1)}
                                </TableHead>
                              ))}
                          </TableHeader>
                          <TableBody>
                            {value.map((item, index) => (
                              <TableRow key={index}>
                                {Object.values(item).map((val, i) => (
                                  <TableCell key={i}>{val}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  );
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // عرض سجل سير العمل
  const renderWorkflowHistory = () => {
    if (!selectedWorkflow) return null;

    return (
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          {selectedWorkflow.history.map((item, index) => (
            <div key={item.id} className="relative mb-6 pl-8">
              <div
                className={`absolute left-2 top-1 w-6 h-6 rounded-full flex items-center justify-center ${item.status === "مكتمل" ? "bg-green-100" : "bg-blue-100"}`}
              >
                {item.status === "مكتمل" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <div className="bg-white p-4 border rounded-md shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{item.stepName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                  <Badge className={getStatusBadgeClass(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{item.user}</span>
                </div>
                {item.action && (
                  <div className="mb-2">
                    <Badge variant="outline">
                      {item.action === "submit"
                        ? "تقديم"
                        : item.action === "approve"
                          ? "موافقة"
                          : item.action === "reject"
                            ? "رفض"
                            : item.action === "complete"
                              ? "إكمال"
                              : item.action}
                    </Badge>
                  </div>
                )}
                {item.notes && <p className="text-sm">{item.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">محرك سير العمل</h2>
          <p className="text-muted-foreground">
            متابعة وإدارة حالات سير العمل النشطة
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
              <SelectItem value="معلق">معلق</SelectItem>
              <SelectItem value="مكتمل">مكتمل</SelectItem>
              <SelectItem value="ملغي">ملغي</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Settings className="ml-2 h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* قائمة حالات سير العمل */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">حالات سير العمل</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedWorkflow?.id === workflow.id ? "bg-blue-50" : ""}`}
                  onClick={() => {
                    setSelectedWorkflow(workflow);
                    setActiveTab("details");
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{workflow.workflowName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {workflow.reference}
                      </p>
                    </div>
                    <Badge className={getStatusBadgeClass(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{workflow.startedAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <User className="h-3 w-3" />
                    <span>{workflow.initiatedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* تفاصيل سير العمل المحدد */}
        <Card className="md:col-span-2">
          {selectedWorkflow ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedWorkflow.workflowName}</CardTitle>
                    <CardDescription>
                      {selectedWorkflow.reference}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="ml-1 h-3 w-3" />
                      عرض المستند
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">التفاصيل</TabsTrigger>
                    <TabsTrigger value="history">السجل</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    {renderWorkflowDetails()}
                  </TabsContent>
                  <TabsContent value="history">
                    {renderWorkflowHistory()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
              <FileText className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                اختر حالة سير عمل لعرض التفاصيل
              </h3>
              <p>اختر من القائمة على اليمين لعرض التفاصيل</p>
            </div>
          )}
        </Card>
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={!selectedWorkflow}>
          <ChevronRight className="ml-2 h-4 w-4" />
          السابق
        </Button>
        <Button variant="outline" disabled={!selectedWorkflow}>
          التالي
          <ChevronLeft className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkflowEngine;
