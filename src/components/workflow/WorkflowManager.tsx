import React, { useState } from "react";
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
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash,
  Eye,
  Play,
  Pause,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Settings,
  MoreHorizontal,
  BarChart2,
  Link as LinkIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// بيانات تجريبية لسير العمل
const workflowsData = [
  {
    id: "WF-001",
    name: "دورة الموافقة على المشتريات",
    description: "سير عمل للموافقة على طلبات الشراء",
    category: "المشتريات",
    status: "نشط",
    steps: 5,
    createdBy: "أحمد محمد",
    createdAt: "2024-08-10",
    lastRun: "2024-08-15",
    instances: 24,
  },
  {
    id: "WF-002",
    name: "معالجة طلبات العملاء",
    description: "سير عمل لمعالجة طلبات العملاء الجديدة",
    category: "المبيعات",
    status: "نشط",
    steps: 4,
    createdBy: "محمد علي",
    createdAt: "2024-08-05",
    lastRun: "2024-08-15",
    instances: 56,
  },
  {
    id: "WF-003",
    name: "الموافقة على الإجازات",
    description: "سير عمل للموافقة على طلبات الإجازات",
    category: "الموارد البشرية",
    status: "نشط",
    steps: 3,
    createdBy: "سارة أحمد",
    createdAt: "2024-07-20",
    lastRun: "2024-08-14",
    instances: 18,
  },
  {
    id: "WF-004",
    name: "إصدار الفواتير",
    description: "سير عمل لإصدار وإرسال الفواتير للعملاء",
    category: "المالية",
    status: "متوقف",
    steps: 6,
    createdBy: "فاطمة حسن",
    createdAt: "2024-06-15",
    lastRun: "2024-07-30",
    instances: 42,
  },
  {
    id: "WF-005",
    name: "إعداد التقارير الشهرية",
    description: "سير عمل لإعداد ومراجعة التقارير الشهرية",
    category: "التقارير",
    status: "مسودة",
    steps: 4,
    createdBy: "خالد العبدالله",
    createdAt: "2024-08-12",
    lastRun: "-",
    instances: 0,
  },
];

// بيانات تجريبية لقوالب سير العمل
const workflowTemplatesData = [
  {
    id: "TPL-001",
    name: "قالب الموافقة العام",
    description: "قالب عام لعمليات الموافقة متعددة المستويات",
    category: "عام",
    steps: 4,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 35,
  },
  {
    id: "TPL-002",
    name: "قالب معالجة الطلبات",
    description: "قالب لمعالجة طلبات العملاء والموردين",
    category: "المبيعات",
    steps: 5,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 28,
  },
  {
    id: "TPL-003",
    name: "قالب إصدار المستندات",
    description: "قالب لإصدار ومراجعة المستندات والتقارير",
    category: "المستندات",
    steps: 6,
    createdBy: "النظام",
    createdAt: "2024-05-01",
    usageCount: 15,
  },
];

// بيانات تجريبية لسجل سير العمل
const workflowHistoryData = [
  {
    id: "INST-001",
    workflowId: "WF-001",
    workflowName: "دورة الموافقة على المشتريات",
    reference: "PO-2024-0125",
    startedAt: "2024-08-15 09:30",
    completedAt: "2024-08-15 14:45",
    duration: "5 ساعات 15 دقيقة",
    status: "مكتمل",
    initiatedBy: "أحمد محمد",
    currentStep: "مكتمل",
  },
  {
    id: "INST-002",
    workflowId: "WF-002",
    workflowName: "معالجة طلبات العملاء",
    reference: "ORD-2024-0356",
    startedAt: "2024-08-15 10:15",
    completedAt: "-",
    duration: "6 ساعات 30 دقيقة",
    status: "قيد التنفيذ",
    initiatedBy: "محمد علي",
    currentStep: "مراجعة الطلب",
  },
  {
    id: "INST-003",
    workflowId: "WF-003",
    workflowName: "الموافقة على الإجازات",
    reference: "LV-2024-0089",
    startedAt: "2024-08-14 11:20",
    completedAt: "2024-08-14 16:30",
    duration: "5 ساعات 10 دقيقة",
    status: "مكتمل",
    initiatedBy: "سارة أحمد",
    currentStep: "مكتمل",
  },
  {
    id: "INST-004",
    workflowId: "WF-001",
    workflowName: "دورة الموافقة على المشتريات",
    reference: "PO-2024-0124",
    startedAt: "2024-08-14 09:00",
    completedAt: "-",
    duration: "1 يوم 7 ساعات",
    status: "معلق",
    initiatedBy: "فاطمة حسن",
    currentStep: "الموافقة النهائية",
  },
  {
    id: "INST-005",
    workflowId: "WF-002",
    workflowName: "معالجة طلبات العملاء",
    reference: "ORD-2024-0355",
    startedAt: "2024-08-13 14:30",
    completedAt: "2024-08-13 17:45",
    duration: "3 ساعات 15 دقيقة",
    status: "مكتمل",
    initiatedBy: "خالد العبدالله",
    currentStep: "مكتمل",
  },
];

const WorkflowManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("active");

  // تصفية سير العمل حسب البحث والفلاتر
  const filteredWorkflows = workflowsData.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || workflow.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || workflow.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          <h3 className="text-xl font-bold">إدارة سير العمل</h3>
          <p className="text-muted-foreground">
            إنشاء وإدارة سير العمل وأتمتة العمليات التجارية
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي سير العمل
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowsData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">سير عمل نشط</p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowsData.filter((wf) => wf.status === "نشط").length}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Play className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  عمليات قيد التنفيذ
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    workflowHistoryData.filter(
                      (wf) => wf.status === "قيد التنفيذ",
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  عمليات مكتملة (اليوم)
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    workflowHistoryData.filter(
                      (wf) =>
                        wf.status === "مكتمل" &&
                        wf.completedAt.startsWith("2024-08-15"),
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تبويبات سير العمل */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">سير العمل النشط</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="history">السجل</TabsTrigger>
        </TabsList>

        {/* تبويب سير العمل النشط */}
        <TabsContent value="active" className="space-y-4">
          {/* أدوات البحث والتصفية */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن سير عمل..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="المشتريات">المشتريات</SelectItem>
                    <SelectItem value="المبيعات">المبيعات</SelectItem>
                    <SelectItem value="المالية">المالية</SelectItem>
                    <SelectItem value="الموارد البشرية">
                      الموارد البشرية
                    </SelectItem>
                    <SelectItem value="التقارير">التقارير</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="متوقف">متوقف</SelectItem>
                    <SelectItem value="مسودة">مسودة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button variant="outline">
                <Settings className="ml-2 h-4 w-4" />
                الإعدادات
              </Button>
            </div>
          </div>

          {/* جدول سير العمل */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المعرف</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>الخطوات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر تشغيل</TableHead>
                    <TableHead>العمليات النشطة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkflows.length > 0 ? (
                    filteredWorkflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">
                          {workflow.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{workflow.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {workflow.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.category}</TableCell>
                        <TableCell>{workflow.steps}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(workflow.status)}
                            <Badge
                              className={getStatusBadgeClass(workflow.status)}
                            >
                              {workflow.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.lastRun}</TableCell>
                        <TableCell>{workflow.instances}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="ml-2 h-4 w-4" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="ml-2 h-4 w-4" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="ml-2 h-4 w-4" />
                                نسخ
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {workflow.status === "نشط" ? (
                                <DropdownMenuItem>
                                  <Pause className="ml-2 h-4 w-4" />
                                  إيقاف
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="ml-2 h-4 w-4" />
                                  تشغيل
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="ml-2 h-4 w-4" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-8 w-8 mb-2" />
                          <p>لا توجد نتائج تطابق معايير البحث</p>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSearchQuery("");
                              setCategoryFilter("all");
                              setStatusFilter("all");
                            }}
                          >
                            إعادة تعيين المرشحات
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب القوالب */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">قوالب سير العمل</h3>
            <Button variant="outline" size="sm">
              <Plus className="ml-2 h-4 w-4" />
              إنشاء قالب جديد
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflowTemplatesData.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        عدد الخطوات:
                      </span>
                      <span>{template.steps}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        عدد الاستخدامات:
                      </span>
                      <span>{template.usageCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        تاريخ الإنشاء:
                      </span>
                      <span>{template.createdAt}</span>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض
                  </Button>
                  <Button size="sm">
                    <Plus className="ml-2 h-4 w-4" />
                    استخدام
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* تبويب السجل */}
        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">سجل سير العمل</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-2 h-4 w-4" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المعرف</TableHead>
                    <TableHead>سير العمل</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead>تاريخ البدء</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الخطوة الحالية</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowHistoryData.map((instance) => (
                    <TableRow key={instance.id}>
                      <TableCell className="font-medium">
                        {instance.id}
                      </TableCell>
                      <TableCell>{instance.workflowName}</TableCell>
                      <TableCell>{instance.reference}</TableCell>
                      <TableCell>{instance.startedAt}</TableCell>
                      <TableCell>{instance.completedAt}</TableCell>
                      <TableCell>{instance.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(instance.status)}
                          <Badge
                            className={getStatusBadgeClass(instance.status)}
                          >
                            {instance.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{instance.currentStep}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowManager;
