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
  Loader2,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useWorkflow,
  useWorkflowTemplates,
  useWorkflowHistory,
} from "@/hooks/useWorkflow";

const WorkflowManagerWithDB = () => {
  const {
    workflows,
    loading,
    error,
    fetchWorkflows,
    updateWorkflow,
    deleteWorkflow,
  } = useWorkflow();
  const { templates, loading: templatesLoading } = useWorkflowTemplates();
  const { history, loading: historyLoading } = useWorkflowHistory();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("active");

  // تصفية سير العمل حسب البحث والفلاتر
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.workflow_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // تغيير حالة سير العمل
  const handleToggleStatus = async (workflowId, currentStatus) => {
    const newStatus = currentStatus === "نشط" ? "متوقف" : "نشط";
    const result = await updateWorkflow(workflowId, { status: newStatus });
    if (result.success) {
      await fetchWorkflows();
    }
  };

  // حذف سير عمل
  const handleDeleteWorkflow = async (workflowId) => {
    if (confirm("هل أنت متأكد من حذف سير العمل هذا؟")) {
      const result = await deleteWorkflow(workflowId);
      if (result.success) {
        await fetchWorkflows();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">
            إدارة سير العمل (مع قاعدة البيانات)
          </h3>
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

      {/* عرض الخطأ إذا وجد */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    workflows.length
                  )}
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
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    workflows.filter((wf) => wf.status === "نشط").length
                  )}
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
                  {historyLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    history.filter((h) => h.status === "قيد التنفيذ").length
                  )}
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
                  {historyLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    history.filter(
                      (h) =>
                        h.status === "مكتمل" &&
                        new Date(h.completed_at).toDateString() ===
                          new Date().toDateString(),
                    ).length
                  )}
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
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="mr-2">جاري تحميل البيانات...</span>
                </div>
              ) : (
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
                            {workflow.workflow_id}
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
                          <TableCell>
                            {new Date(workflow.last_run).toLocaleString(
                              "ar-SA",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </TableCell>
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
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleToggleStatus(
                                      workflow.workflow_id,
                                      workflow.status,
                                    )
                                  }
                                >
                                  {workflow.status === "نشط" ? (
                                    <>
                                      <Pause className="ml-2 h-4 w-4" />
                                      إيقاف
                                    </>
                                  ) : (
                                    <>
                                      <Play className="ml-2 h-4 w-4" />
                                      تشغيل
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteWorkflow(workflow.workflow_id)
                                  }
                                >
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
              )}
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

          {templatesLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="mr-2">جاري تحميل القوالب...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
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
                        <span>{template.usage_count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          تاريخ الإنشاء:
                        </span>
                        <span>
                          {new Date(template.created_at).toLocaleDateString(
                            "ar-SA",
                          )}
                        </span>
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
          )}
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
              {historyLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="mr-2">جاري تحميل السجل...</span>
                </div>
              ) : (
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
                    {history.map((instance) => (
                      <TableRow key={instance.id}>
                        <TableCell className="font-medium">
                          {instance.instance_id}
                        </TableCell>
                        <TableCell>{instance.workflow_name}</TableCell>
                        <TableCell>{instance.reference}</TableCell>
                        <TableCell>
                          {new Date(instance.started_at).toLocaleString(
                            "ar-SA",
                            {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          {instance.completed_at
                            ? new Date(instance.completed_at).toLocaleString(
                                "ar-SA",
                                {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "-"}
                        </TableCell>
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
                        <TableCell>{instance.current_step}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowManagerWithDB;
