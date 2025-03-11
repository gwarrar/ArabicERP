import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Printer,
  Edit,
  X,
  FileText,
  Package,
  Truck,
  DollarSign,
  Calendar,
  BarChart2,
  Download,
  ExternalLink,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  Warehouse,
  MapPin,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  PlayCircle,
  Clipboard,
  Settings,
  Wrench,
  Users,
  Layers,
  Timer,
  Activity,
  Zap,
  Cog,
  Hammer,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface ProductionOperationDetailsProps {
  open: boolean;
  onClose: () => void;
  operation: any;
}

const ProductionOperationDetails: React.FC<ProductionOperationDetailsProps> = ({
  open,
  onClose,
  operation,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  // بيانات تجريبية للعمال المخصصين للعملية
  const assignedWorkers = [
    {
      id: "WRK-001",
      name: "أحمد محمد",
      role: "مشغل آلة",
      department: "قسم الخياطة",
      hoursAllocated: 8,
      hoursWorked: 6,
      status: "قيد العمل",
      efficiency: 95,
      notes: "",
    },
    {
      id: "WRK-002",
      name: "سارة أحمد",
      role: "فني جودة",
      department: "قسم الخياطة",
      hoursAllocated: 4,
      hoursWorked: 3,
      status: "قيد العمل",
      efficiency: 90,
      notes: "",
    },
    {
      id: "WRK-003",
      name: "محمد علي",
      role: "مساعد إنتاج",
      department: "قسم الخياطة",
      hoursAllocated: 8,
      hoursWorked: 5,
      status: "قيد العمل",
      efficiency: 85,
      notes: "",
    },
  ];

  // بيانات تجريبية للمعدات المستخدمة في العملية
  const usedEquipment = [
    {
      id: "EQ-001",
      name: "ماكينة خياطة صناعية",
      type: "خياطة",
      model: "JUKI DDL-8700",
      hoursAllocated: 8,
      hoursUsed: 6,
      status: "قيد التشغيل",
      operator: "أحمد محمد",
      efficiency: 92,
      notes: "",
    },
    {
      id: "EQ-002",
      name: "ماكينة تنظيف الخيوط",
      type: "تنظيف",
      model: "JUKI MO-6714S",
      hoursAllocated: 4,
      hoursUsed: 3,
      status: "قيد التشغيل",
      operator: "سارة أحمد",
      efficiency: 95,
      notes: "",
    },
  ];

  // بيانات تجريبية للمواد المستخدمة في العملية
  const usedMaterials = [
    {
      id: "MAT-001",
      name: "قماش قطني أبيض",
      sku: "FAB-COT-WHT-001",
      unit: "متر",
      plannedQuantity: 50,
      actualQuantity: 48,
      variance: -2,
      status: "مكتمل",
      notes: "وفر في استخدام المواد",
    },
    {
      id: "MAT-002",
      name: "خيط بوليستر أبيض",
      sku: "THR-POL-WHT-001",
      unit: "بكرة",
      plannedQuantity: 2,
      actualQuantity: 2,
      variance: 0,
      status: "مكتمل",
      notes: "",
    },
  ];

  // بيانات تجريبية للمخرجات
  const outputs = [
    {
      id: "OUT-001",
      name: "قميص نصف مخيط",
      sku: "SHR-MEN-WHT-M-SEMI",
      unit: "قطعة",
      plannedQuantity: 100,
      completedQuantity: 85,
      defectiveQuantity: 2,
      remainingQuantity: 15,
      status: "قيد التنفيذ",
      notes: "",
    },
  ];

  // بيانات تجريبية لسجل الجودة
  const qualityLogs = [
    {
      id: "QL-001",
      date: "2024-07-15 09:30",
      inspector: "سارة أحمد",
      type: "فحص دوري",
      result: "مطابق",
      notes: "جميع المعايير ضمن الحدود المقبولة",
    },
    {
      id: "QL-002",
      date: "2024-07-15 13:45",
      inspector: "سارة أحمد",
      type: "فحص دوري",
      result: "مطابق",
      notes: "جميع المعايير ضمن الحدود المقبولة",
    },
    {
      id: "QL-003",
      date: "2024-07-15 11:15",
      inspector: "سارة أحمد",
      type: "فحص عيوب",
      result: "غير مطابق",
      notes: "تم اكتشاف عيوب في الخياطة لقطعتين، تم عزلهما",
    },
  ];

  // بيانات تجريبية لسجل التوقف
  const downtimeLogs = [
    {
      id: "DT-001",
      startTime: "2024-07-15 10:15",
      endTime: "2024-07-15 10:45",
      duration: 30,
      reason: "صيانة طارئة",
      equipment: "ماكينة خياطة صناعية",
      reportedBy: "أحمد محمد",
      notes: "تم إصلاح مشكلة في الإبرة",
    },
    {
      id: "DT-002",
      startTime: "2024-07-15 14:00",
      endTime: "2024-07-15 14:15",
      duration: 15,
      reason: "استراحة العمال",
      equipment: "-",
      reportedBy: "محمد علي",
      notes: "استراحة مجدولة",
    },
  ];

  // حساب إجمالي وقت التوقف
  const totalDowntime = downtimeLogs.reduce(
    (sum, log) => sum + log.duration,
    0,
  );

  // حساب نسبة الإنجاز
  const completionPercentage = Math.round(
    (outputs[0].completedQuantity / outputs[0].plannedQuantity) * 100,
  );

  // حساب معدل الإنتاج في الساعة
  const productionRate = Math.round(
    outputs[0].completedQuantity /
      (operation.actualDuration - totalDowntime / 60),
  );

  // تحديد لون حالة العملية
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "قيد الانتظار":
        return "bg-amber-100 text-amber-800";
      case "متوقف":
        return "bg-red-100 text-red-800";
      case "قيد التشغيل":
        return "bg-blue-100 text-blue-800";
      case "قيد العمل":
        return "bg-blue-100 text-blue-800";
      case "مطابق":
        return "bg-green-100 text-green-800";
      case "غير مطابق":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // تحديد لون التباين في الكميات
  const getVarianceColor = (variance: number) => {
    if (variance < 0) return "text-green-600";
    if (variance > 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              تفاصيل عملية الإنتاج
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Operation Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 ml-2" />
                معلومات العملية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم العملية:</span>
                <span className="font-medium">{operation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">اسم العملية:</span>
                <span>{operation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">أمر الإنتاج:</span>
                <span>{operation.productionOrder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">مركز العمل:</span>
                <span>{operation.workCenter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المشرف:</span>
                <span>{operation.supervisor}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Clock className="h-4 w-4 ml-2" />
                حالة العملية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge className={getStatusColor(operation.status)}>
                  {operation.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نسبة الإنجاز:</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <div className="mt-2">
                <Progress value={completionPercentage} className="h-2" />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ البدء:</span>
                <span>{operation.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  تاريخ الانتهاء المتوقع:
                </span>
                <span>{operation.expectedEndDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Activity className="h-4 w-4 ml-2" />
                مؤشرات الأداء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المدة المخططة:</span>
                <span className="font-medium">
                  {operation.plannedDuration} ساعة
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المدة الفعلية:</span>
                <span className="font-medium">
                  {operation.actualDuration} ساعة
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">وقت التوقف:</span>
                <span className="font-medium">{totalDowntime} دقيقة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">معدل الإنتاج:</span>
                <span className="font-medium">{productionRate} قطعة/ساعة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">كفاءة العملية:</span>
                <span className="font-medium">{operation.efficiency}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-700">
                الكمية المنجزة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {outputs[0].completedQuantity} / {outputs[0].plannedQuantity}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-700">
                كفاءة العملية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {operation.efficiency}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-700">
                معدل الإنتاج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">
                {productionRate} قطعة/ساعة
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                الوحدات المعيبة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">
                {outputs[0].defectiveQuantity} (
                {Math.round(
                  (outputs[0].defectiveQuantity /
                    outputs[0].completedQuantity) *
                    100,
                )}
                %)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 ml-2" />
              التفاصيل
            </TabsTrigger>
            <TabsTrigger value="workers">
              <Users className="h-4 w-4 ml-2" />
              العمال
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Wrench className="h-4 w-4 ml-2" />
              المعدات
            </TabsTrigger>
            <TabsTrigger value="materials">
              <Package className="h-4 w-4 ml-2" />
              المواد
            </TabsTrigger>
            <TabsTrigger value="outputs">
              <Layers className="h-4 w-4 ml-2" />
              المخرجات
            </TabsTrigger>
            <TabsTrigger value="quality">
              <CheckCircle className="h-4 w-4 ml-2" />
              الجودة
            </TabsTrigger>
            <TabsTrigger value="downtime">
              <PauseCircle className="h-4 w-4 ml-2" />
              التوقفات
            </TabsTrigger>
          </TabsList>

          {/* التفاصيل */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 ml-2" />
                    معلومات العملية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        رقم العملية
                      </p>
                      <p className="font-medium">{operation.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        اسم العملية
                      </p>
                      <p className="font-medium">{operation.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        أمر الإنتاج
                      </p>
                      <p className="font-medium">{operation.productionOrder}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المنتج</p>
                      <p className="font-medium">{operation.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        مركز العمل
                      </p>
                      <p className="font-medium">{operation.workCenter}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المشرف</p>
                      <p className="font-medium">{operation.supervisor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ البدء
                      </p>
                      <p className="font-medium">{operation.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الانتهاء المتوقع
                      </p>
                      <p className="font-medium">{operation.expectedEndDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الأولوية</p>
                      <p className="font-medium">{operation.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Activity className="h-4 w-4 ml-2" />
                    مؤشرات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المدة المخططة
                      </p>
                      <p className="font-medium">
                        {operation.plannedDuration} ساعة
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المدة الفعلية
                      </p>
                      <p className="font-medium">
                        {operation.actualDuration} ساعة
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        وقت التوقف
                      </p>
                      <p className="font-medium">{totalDowntime} دقيقة</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        نسبة التوقف
                      </p>
                      <p className="font-medium">
                        {Math.round(
                          (totalDowntime / 60 / operation.actualDuration) * 100,
                        )}
                        %
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        معدل الإنتاج
                      </p>
                      <p className="font-medium">{productionRate} قطعة/ساعة</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المعدل المستهدف
                      </p>
                      <p className="font-medium">
                        {operation.targetRate} قطعة/ساعة
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        كفاءة العملية
                      </p>
                      <p className="font-medium">{operation.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        نسبة الوحدات المعيبة
                      </p>
                      <p className="font-medium">
                        {Math.round(
                          (outputs[0].defectiveQuantity /
                            outputs[0].completedQuantity) *
                            100,
                        )}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      نسبة الإنجاز
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={completionPercentage}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium">
                        {completionPercentage}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <div className="flex items-start">
                <FileText className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
                <div>
                  <h3 className="font-medium mb-1">ملخص العملية</h3>
                  <p className="text-sm">
                    عملية {operation.name} في مركز العمل {operation.workCenter}{" "}
                    بنسبة إنجاز {completionPercentage}%. تم إنتاج{" "}
                    {outputs[0].completedQuantity} وحدة من أصل{" "}
                    {outputs[0].plannedQuantity} وحدة مخططة بمعدل{" "}
                    {productionRate} قطعة/ساعة.
                    {operation.status === "قيد التنفيذ" &&
                      " العملية تسير وفق الخطة المحددة."}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* العمال */}
          <TabsContent value="workers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">العمال المخصصين للعملية</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة عامل
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم العامل</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead className="text-center">
                      الساعات المخصصة
                    </TableHead>
                    <TableHead className="text-center">
                      الساعات المستخدمة
                    </TableHead>
                    <TableHead className="text-center">الكفاءة</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedWorkers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell className="font-medium">
                        {worker.name}
                      </TableCell>
                      <TableCell>{worker.role}</TableCell>
                      <TableCell>{worker.department}</TableCell>
                      <TableCell className="text-center">
                        {worker.hoursAllocated}
                      </TableCell>
                      <TableCell className="text-center">
                        {worker.hoursWorked}
                      </TableCell>
                      <TableCell className="text-center">
                        {worker.efficiency}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
              <div className="flex items-start">
                <Users className="h-5 w-5 ml-2 mt-0.5 text-amber-600" />
                <div>
                  <h3 className="font-medium mb-1">ملخص العمالة</h3>
                  <p className="text-sm">
                    إجمالي العمال المخصصين: {assignedWorkers.length} عامل |
                    إجمالي ساعات العمل المخططة:{" "}
                    {assignedWorkers.reduce(
                      (sum, worker) => sum + worker.hoursAllocated,
                      0,
                    )}{" "}
                    ساعة | إجمالي ساعات العمل الفعلية:{" "}
                    {assignedWorkers.reduce(
                      (sum, worker) => sum + worker.hoursWorked,
                      0,
                    )}{" "}
                    ساعة | متوسط الكفاءة:{" "}
                    {Math.round(
                      assignedWorkers.reduce(
                        (sum, worker) => sum + worker.efficiency,
                        0,
                      ) / assignedWorkers.length,
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المعدات */}
          <TabsContent value="equipment" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                المعدات المستخدمة في العملية
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة معدة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المعدة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الموديل</TableHead>
                    <TableHead className="text-center">
                      الساعات المخصصة
                    </TableHead>
                    <TableHead className="text-center">
                      الساعات المستخدمة
                    </TableHead>
                    <TableHead className="text-center">الكفاءة</TableHead>
                    <TableHead>المشغل</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usedEquipment.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell className="font-medium">
                        {equipment.name}
                      </TableCell>
                      <TableCell>{equipment.type}</TableCell>
                      <TableCell>{equipment.model}</TableCell>
                      <TableCell className="text-center">
                        {equipment.hoursAllocated}
                      </TableCell>
                      <TableCell className="text-center">
                        {equipment.hoursUsed}
                      </TableCell>
                      <TableCell className="text-center">
                        {equipment.efficiency}%
                      </TableCell>
                      <TableCell>{equipment.operator}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <div className="flex items-start">
                <Wrench className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
                <div>
                  <h3 className="font-medium mb-1">ملخص المعدات</h3>
                  <p className="text-sm">
                    إجمالي المعدات المستخدمة: {usedEquipment.length} معدة |
                    إجمالي ساعات التشغيل المخططة:{" "}
                    {usedEquipment.reduce(
                      (sum, eq) => sum + eq.hoursAllocated,
                      0,
                    )}{" "}
                    ساعة | إجمالي ساعات التشغيل الفعلية:{" "}
                    {usedEquipment.reduce((sum, eq) => sum + eq.hoursUsed, 0)}{" "}
                    ساعة | متوسط الكفاءة:{" "}
                    {Math.round(
                      usedEquipment.reduce(
                        (sum, eq) => sum + eq.efficiency,
                        0,
                      ) / usedEquipment.length,
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المواد */}
          <TabsContent value="materials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                المواد المستخدمة في العملية
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة مادة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المادة</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead className="text-center">
                      الكمية المخططة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية الفعلية
                    </TableHead>
                    <TableHead className="text-center">الفرق</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usedMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        {material.name}
                      </TableCell>
                      <TableCell>{material.sku}</TableCell>
                      <TableCell>{material.unit}</TableCell>
                      <TableCell className="text-center">
                        {material.plannedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.actualQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={getVarianceColor(material.variance)}>
                          {material.variance > 0 ? "+" : ""}
                          {material.variance}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(material.status)}>
                          {material.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{material.notes || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              <div className="flex items-start">
                <Package className="h-5 w-5 ml-2 mt-0.5 text-green-600" />
                <div>
                  <h3 className="font-medium mb-1">ملخص استهلاك المواد</h3>
                  <p className="text-sm">
                    إجمالي المواد المستخدمة: {usedMaterials.length} مادة |
                    إجمالي الكميات المخططة:{" "}
                    {usedMaterials.reduce(
                      (sum, material) => sum + material.plannedQuantity,
                      0,
                    )}{" "}
                    وحدة | إجمالي الكميات الفعلية:{" "}
                    {usedMaterials.reduce(
                      (sum, material) => sum + material.actualQuantity,
                      0,
                    )}{" "}
                    وحدة | إجمالي الفرق:{" "}
                    {usedMaterials.reduce(
                      (sum, material) => sum + material.variance,
                      0,
                    )}{" "}
                    وحدة
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المخرجات */}
          <TabsContent value="outputs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">مخرجات العملية</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead className="text-center">
                      الكمية المخططة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المكتملة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المعيبة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المتبقية
                    </TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outputs.map((output) => (
                    <TableRow key={output.id}>
                      <TableCell className="font-medium">
                        {output.name}
                      </TableCell>
                      <TableCell>{output.sku}</TableCell>
                      <TableCell>{output.unit}</TableCell>
                      <TableCell className="text-center">
                        {output.plannedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {output.completedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {output.defectiveQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {output.remainingQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(output.status)}>
                          {output.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{output.notes || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <h4 className="text-base font-medium mb-2">نسبة الإنجاز</h4>
              <div className="flex items-center gap-4">
                <Progress value={completionPercentage} className="h-2 flex-1" />
                <span className="font-medium">{completionPercentage}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">الكمية المكتملة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {outputs[0].completedQuantity} {outputs[0].unit}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">الكمية المعيبة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-red-600">
                    {outputs[0].defectiveQuantity} {outputs[0].unit}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">نسبة العيوب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">
                    {Math.round(
                      (outputs[0].defectiveQuantity /
                        outputs[0].completedQuantity) *
                        100,
                    )}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الجودة */}
          <TabsContent value="quality" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">سجل الجودة</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة فحص
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفحص</TableHead>
                    <TableHead>التاريخ والوقت</TableHead>
                    <TableHead>المفتش</TableHead>
                    <TableHead>نوع الفحص</TableHead>
                    <TableHead className="text-center">النتيجة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.inspector}</TableCell>
                      <TableCell>{log.type}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(log.result)}>
                          {log.result}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-700">
                    عمليات الفحص
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-green-800">
                    {qualityLogs.length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-green-700">
                    فحوصات مطابقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-green-800">
                    {qualityLogs.filter((log) => log.result === "مطابق").length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-red-700">
                    فحوصات غير مطابقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-red-800">
                    {
                      qualityLogs.filter((log) => log.result === "غير مطابق")
                        .length
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* التوقفات */}
          <TabsContent value="downtime" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">سجل التوقفات</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة توقف
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم التوقف</TableHead>
                    <TableHead>وقت البدء</TableHead>
                    <TableHead>وقت الانتهاء</TableHead>
                    <TableHead className="text-center">المدة (دقيقة)</TableHead>
                    <TableHead>سبب التوقف</TableHead>
                    <TableHead>المعدة المتأثرة</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downtimeLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.startTime}</TableCell>
                      <TableCell>{log.endTime}</TableCell>
                      <TableCell className="text-center">
                        {log.duration}
                      </TableCell>
                      <TableCell>{log.reason}</TableCell>
                      <TableCell>{log.equipment}</TableCell>
                      <TableCell>{log.reportedBy}</TableCell>
                      <TableCell>{log.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-amber-700">
                    عدد التوقفات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-amber-800">
                    {downtimeLogs.length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-amber-700">
                    إجمالي وقت التوقف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-amber-800">
                    {totalDowntime} دقيقة
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-amber-700">
                    نسبة التوقف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-amber-800">
                    {Math.round(
                      (totalDowntime / 60 / operation.actualDuration) * 100,
                    )}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={onClose}>
              <X className="ml-2 h-4 w-4" />
              إغلاق
            </Button>
            <Button variant="default">
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
            {operation.status === "قيد التنفيذ" && (
              <Button variant="default">
                <CheckCircle className="ml-2 h-4 w-4" />
                إكمال العملية
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductionOperationDetails;
