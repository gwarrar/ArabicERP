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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface ProductionOrderDetailsProps {
  open: boolean;
  onClose: () => void;
  order: any;
}

const ProductionOrderDetails: React.FC<ProductionOrderDetailsProps> = ({
  open,
  onClose,
  order,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  // بيانات تجريبية للمواد الخام
  const rawMaterials = [
    {
      id: "RM-001",
      name: "قماش قطني أبيض",
      sku: "FAB-COT-WHT-001",
      unit: "متر",
      requiredQuantity: 120,
      allocatedQuantity: 120,
      consumedQuantity: 110,
      remainingQuantity: 10,
      status: "مكتمل",
      warehouse: "مستودع المواد الخام",
      notes: "",
    },
    {
      id: "RM-002",
      name: "خيط بوليستر أبيض",
      sku: "THR-POL-WHT-001",
      unit: "بكرة",
      requiredQuantity: 5,
      allocatedQuantity: 5,
      consumedQuantity: 4,
      remainingQuantity: 1,
      status: "مكتمل",
      warehouse: "مستودع المواد الخام",
      notes: "",
    },
    {
      id: "RM-003",
      name: "أزرار بلاستيك أبيض",
      sku: "BTN-PLS-WHT-001",
      unit: "قطعة",
      requiredQuantity: 500,
      allocatedQuantity: 500,
      consumedQuantity: 480,
      remainingQuantity: 20,
      status: "مكتمل",
      warehouse: "مستودع المواد الخام",
      notes: "",
    },
  ];

  // بيانات تجريبية للمنتجات النهائية
  const finishedProducts = [
    {
      id: "FP-001",
      name: "قميص رجالي أبيض مقاس M",
      sku: "SHR-MEN-WHT-M",
      unit: "قطعة",
      plannedQuantity: 100,
      completedQuantity: 95,
      defectiveQuantity: 2,
      remainingQuantity: 5,
      status: "قيد التنفيذ",
      warehouse: "مستودع المنتجات الجاهزة",
      notes: "",
    },
  ];

  // بيانات تجريبية لمراحل الإنتاج
  const productionStages = [
    {
      id: "STG-001",
      name: "القص",
      startDate: "2024-07-10",
      endDate: "2024-07-11",
      duration: "2 يوم",
      status: "مكتمل",
      workCenter: "قسم القص",
      operator: "أحمد محمد",
      completionPercentage: 100,
      notes: "",
    },
    {
      id: "STG-002",
      name: "الخياطة",
      startDate: "2024-07-12",
      endDate: "2024-07-14",
      duration: "3 أيام",
      status: "مكتمل",
      workCenter: "قسم الخياطة",
      operator: "سارة أحمد",
      completionPercentage: 100,
      notes: "",
    },
    {
      id: "STG-003",
      name: "التشطيب",
      startDate: "2024-07-15",
      endDate: null,
      duration: "2 يوم",
      status: "قيد التنفيذ",
      workCenter: "قسم التشطيب",
      operator: "محمد علي",
      completionPercentage: 80,
      notes: "",
    },
    {
      id: "STG-004",
      name: "الفحص والتغليف",
      startDate: null,
      endDate: null,
      duration: "1 يوم",
      status: "قيد الانتظار",
      workCenter: "قسم الفحص والتغليف",
      operator: "خالد العبدالله",
      completionPercentage: 0,
      notes: "",
    },
  ];

  // بيانات تجريبية للموارد البشرية
  const humanResources = [
    {
      id: "HR-001",
      name: "أحمد محمد",
      role: "عامل قص",
      department: "قسم القص",
      hoursAllocated: 16,
      hoursWorked: 16,
      status: "مكتمل",
      notes: "",
    },
    {
      id: "HR-002",
      name: "سارة أحمد",
      role: "عامل خياطة",
      department: "قسم الخياطة",
      hoursAllocated: 24,
      hoursWorked: 24,
      status: "مكتمل",
      notes: "",
    },
    {
      id: "HR-003",
      name: "محمد علي",
      role: "عامل تشطيب",
      department: "قسم التشطيب",
      hoursAllocated: 16,
      hoursWorked: 12,
      status: "قيد التنفيذ",
      notes: "",
    },
    {
      id: "HR-004",
      name: "خالد العبدالله",
      role: "عامل فحص وتغليف",
      department: "قسم الفحص والتغليف",
      hoursAllocated: 8,
      hoursWorked: 0,
      status: "قيد الانتظار",
      notes: "",
    },
  ];

  // بيانات تجريبية للمعدات
  const equipment = [
    {
      id: "EQ-001",
      name: "ماكينة قص آلية",
      type: "قص",
      hoursAllocated: 16,
      hoursUsed: 16,
      status: "مكتمل",
      operator: "أحمد محمد",
      notes: "",
    },
    {
      id: "EQ-002",
      name: "ماكينة خياطة صناعية",
      type: "خياطة",
      hoursAllocated: 24,
      hoursUsed: 24,
      status: "مكتمل",
      operator: "سارة أحمد",
      notes: "",
    },
    {
      id: "EQ-003",
      name: "ماكينة تشطيب",
      type: "تشطيب",
      hoursAllocated: 16,
      hoursUsed: 12,
      status: "قيد التنفيذ",
      operator: "محمد علي",
      notes: "",
    },
  ];

  // بيانات تجريبية للتكاليف
  const costs = [
    {
      category: "المواد الخام",
      plannedCost: 25000,
      actualCost: 24500,
      variance: -500,
      notes: "وفر في استهلاك المواد",
    },
    {
      category: "العمالة",
      plannedCost: 12000,
      actualCost: 12000,
      variance: 0,
      notes: "",
    },
    {
      category: "المعدات",
      plannedCost: 8000,
      actualCost: 8000,
      variance: 0,
      notes: "",
    },
    {
      category: "النفقات العامة",
      plannedCost: 5000,
      actualCost: 5200,
      variance: 200,
      notes: "زيادة في استهلاك الكهرباء",
    },
  ];

  // حساب إجماليات التكاليف
  const totalPlannedCost = costs.reduce(
    (sum, cost) => sum + cost.plannedCost,
    0,
  );
  const totalActualCost = costs.reduce((sum, cost) => sum + cost.actualCost, 0);
  const totalVariance = costs.reduce((sum, cost) => sum + cost.variance, 0);

  // حساب نسبة الإنجاز الإجمالية
  const overallProgress = Math.round(
    (productionStages.reduce(
      (sum, stage) => sum + stage.completionPercentage,
      0,
    ) /
      (productionStages.length * 100)) *
      100,
  );

  // حساب نسبة إنجاز المنتجات
  const productProgress = Math.round(
    (finishedProducts[0].completedQuantity /
      finishedProducts[0].plannedQuantity) *
      100,
  );

  // تحديد لون حالة الإنتاج
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // تحديد لون التباين في التكاليف
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
              تفاصيل أمر الإنتاج
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

        {/* Production Order Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 ml-2" />
                معلومات أمر الإنتاج
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الأمر:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المنتج:</span>
                <span>{order.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الكمية:</span>
                <span>
                  {order.quantity} {order.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ البدء:</span>
                <span>{order.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  تاريخ الانتهاء المخطط:
                </span>
                <span>{order.dueDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Clock className="h-4 w-4 ml-2" />
                حالة الإنتاج
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المرحلة الحالية:</span>
                <span>{order.currentStage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">نسبة الإنجاز:</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <div className="mt-2">
                <Progress value={overallProgress} className="h-2" />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الوقت المتبقي:</span>
                <span>{order.remainingTime || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="h-4 w-4 ml-2" />
                ملخص التكاليف
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">التكلفة المخططة:</span>
                <span className="font-medium">
                  {totalPlannedCost.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">التكلفة الفعلية:</span>
                <span className="font-medium">
                  {totalActualCost.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفرق:</span>
                <span
                  className={`font-medium ${getVarianceColor(totalVariance)}`}
                >
                  {totalVariance > 0 ? "+" : ""}
                  {totalVariance.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تكلفة الوحدة:</span>
                <span>
                  {Math.round(
                    totalActualCost / finishedProducts[0].completedQuantity,
                  ).toLocaleString()}{" "}
                  ₴
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-700">
                نسبة الإنجاز
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {overallProgress}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-700">
                المنتجات المكتملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {finishedProducts[0].completedQuantity} /{" "}
                {finishedProducts[0].plannedQuantity}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-700">
                المراحل المكتملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">
                {
                  productionStages.filter((stage) => stage.status === "مكتمل")
                    .length
                }{" "}
                / {productionStages.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">
                المنتجات المعيبة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-800">
                {finishedProducts[0].defectiveQuantity} (
                {Math.round(
                  (finishedProducts[0].defectiveQuantity /
                    finishedProducts[0].completedQuantity) *
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
            <TabsTrigger value="materials">
              <Package className="h-4 w-4 ml-2" />
              المواد الخام
            </TabsTrigger>
            <TabsTrigger value="products">
              <Layers className="h-4 w-4 ml-2" />
              المنتجات النهائية
            </TabsTrigger>
            <TabsTrigger value="stages">
              <Clipboard className="h-4 w-4 ml-2" />
              مراحل الإنتاج
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Users className="h-4 w-4 ml-2" />
              الموارد البشرية
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Wrench className="h-4 w-4 ml-2" />
              المعدات
            </TabsTrigger>
            <TabsTrigger value="costs">
              <DollarSign className="h-4 w-4 ml-2" />
              التكاليف
            </TabsTrigger>
          </TabsList>

          {/* التفاصيل */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 ml-2" />
                    معلومات أمر الإنتاج
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الأمر</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المرجع</p>
                      <p className="font-medium">{order.reference || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المنتج</p>
                      <p className="font-medium">{order.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الكمية</p>
                      <p className="font-medium">
                        {order.quantity} {order.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الإنشاء
                      </p>
                      <p className="font-medium">{order.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المنشئ</p>
                      <p className="font-medium">{order.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ البدء
                      </p>
                      <p className="font-medium">{order.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الانتهاء المخطط
                      </p>
                      <p className="font-medium">{order.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الأولوية</p>
                      <p className="font-medium">{order.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Settings className="h-4 w-4 ml-2" />
                    معلومات إضافية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        خط الإنتاج
                      </p>
                      <p className="font-medium">{order.productionLine}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المشرف</p>
                      <p className="font-medium">{order.supervisor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        طلب المبيعات المرتبط
                      </p>
                      <p className="font-medium">{order.salesOrder || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">العميل</p>
                      <p className="font-medium">{order.customer || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المستودع المستهدف
                      </p>
                      <p className="font-medium">{order.targetWarehouse}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        وقت الإنتاج المقدر
                      </p>
                      <p className="font-medium">{order.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      الملاحظات
                    </p>
                    <p>{order.notes || "لا توجد ملاحظات"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <div className="flex items-start">
                <FileText className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
                <div>
                  <h3 className="font-medium mb-1">معلومات الحالة</h3>
                  <p className="text-sm">
                    أمر الإنتاج {order.id} في مرحلة {order.currentStage} بنسبة
                    إنجاز {overallProgress}%. تم إنتاج{" "}
                    {finishedProducts[0].completedQuantity} وحدة من أصل{" "}
                    {finishedProducts[0].plannedQuantity} وحدة مخططة.
                    {order.status === "قيد التنفيذ" &&
                      " من المتوقع الانتهاء في الموعد المحدد."}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المواد الخام */}
          <TabsContent value="materials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المواد الخام</h3>
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
                    <TableHead>المادة</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead className="text-center">
                      الكمية المطلوبة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المخصصة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المستهلكة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المتبقية
                    </TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead>المستودع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rawMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        {material.name}
                      </TableCell>
                      <TableCell>{material.sku}</TableCell>
                      <TableCell>{material.unit}</TableCell>
                      <TableCell className="text-center">
                        {material.requiredQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.allocatedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.consumedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {material.remainingQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(material.status)}>
                          {material.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{material.warehouse}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* المنتجات النهائية */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المنتجات النهائية</h3>
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
                    <TableHead>المستودع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finishedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell className="text-center">
                        {product.plannedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.completedQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.defectiveQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.remainingQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.warehouse}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <h4 className="text-base font-medium mb-2">نسبة الإنجاز</h4>
              <div className="flex items-center gap-4">
                <Progress value={productProgress} className="h-2 flex-1" />
                <span className="font-medium">{productProgress}%</span>
              </div>
            </div>
          </TabsContent>

          {/* مراحل الإنتاج */}
          <TabsContent value="stages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">مراحل الإنتاج</h3>
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
                    <TableHead>المرحلة</TableHead>
                    <TableHead>تاريخ البدء</TableHead>
                    <TableHead>تاريخ الانتهاء</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>مركز العمل</TableHead>
                    <TableHead>المشغل</TableHead>
                    <TableHead className="text-center">نسبة الإنجاز</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionStages.map((stage) => (
                    <TableRow key={stage.id}>
                      <TableCell className="font-medium">
                        {stage.name}
                      </TableCell>
                      <TableCell>{stage.startDate || "-"}</TableCell>
                      <TableCell>{stage.endDate || "-"}</TableCell>
                      <TableCell>{stage.duration}</TableCell>
                      <TableCell>{stage.workCenter}</TableCell>
                      <TableCell>{stage.operator}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={stage.completionPercentage}
                            className="h-2 flex-1"
                          />
                          <span>{stage.completionPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(stage.status)}>
                          {stage.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          {stage.status === "قيد التنفيذ" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="إيقاف مؤقت"
                            >
                              <PauseCircle className="h-4 w-4 text-amber-600" />
                            </Button>
                          )}
                          {stage.status === "قيد الانتظار" && (
                            <Button variant="ghost" size="icon" title="بدء">
                              <PlayCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          {stage.status === "مكتمل" && (
                            <Button variant="ghost" size="icon" title="مكتمل">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* الموارد البشرية */}
          <TabsContent value="resources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">الموارد البشرية</h3>
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
                    <TableHead>الاسم</TableHead>
                    <TableHead>الدور</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead className="text-center">
                      الساعات المخصصة
                    </TableHead>
                    <TableHead className="text-center">
                      الساعات المستخدمة
                    </TableHead>
                    <TableHead className="text-center">
                      نسبة الاستخدام
                    </TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {humanResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">
                        {resource.name}
                      </TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>{resource.department}</TableCell>
                      <TableCell className="text-center">
                        {resource.hoursAllocated}
                      </TableCell>
                      <TableCell className="text-center">
                        {resource.hoursWorked}
                      </TableCell>
                      <TableCell className="text-center">
                        {Math.round(
                          (resource.hoursWorked / resource.hoursAllocated) *
                            100,
                        )}
                        %
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* المعدات */}
          <TabsContent value="equipment" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المعدات</h3>
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
                    <TableHead>المعدة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead className="text-center">
                      الساعات المخصصة
                    </TableHead>
                    <TableHead className="text-center">
                      الساعات المستخدمة
                    </TableHead>
                    <TableHead className="text-center">
                      نسبة الاستخدام
                    </TableHead>
                    <TableHead>المشغل</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell className="text-center">
                        {item.hoursAllocated}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.hoursUsed}
                      </TableCell>
                      <TableCell className="text-center">
                        {Math.round(
                          (item.hoursUsed / item.hoursAllocated) * 100,
                        )}
                        %
                      </TableCell>
                      <TableCell>{item.operator}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* التكاليف */}
          <TabsContent value="costs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">التكاليف</h3>
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
                    <TableHead>الفئة</TableHead>
                    <TableHead className="text-center">
                      التكلفة المخططة
                    </TableHead>
                    <TableHead className="text-center">
                      التكلفة الفعلية
                    </TableHead>
                    <TableHead className="text-center">الفرق</TableHead>
                    <TableHead>ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costs.map((cost, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {cost.category}
                      </TableCell>
                      <TableCell className="text-center">
                        {cost.plannedCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {cost.actualCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={getVarianceColor(cost.variance)}>
                          {cost.variance > 0 ? "+" : ""}
                          {cost.variance.toLocaleString()} ₴
                        </span>
                      </TableCell>
                      <TableCell>{cost.notes || "-"}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-medium">
                    <TableCell>الإجمالي</TableCell>
                    <TableCell className="text-center">
                      {totalPlannedCost.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-center">
                      {totalActualCost.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={getVarianceColor(totalVariance)}>
                        {totalVariance > 0 ? "+" : ""}
                        {totalVariance.toLocaleString()} ₴
                      </span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="h-4 w-4 ml-2" />
                    تحليل التكاليف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة الوحدة المخططة:
                      </span>
                      <span>
                        {Math.round(
                          totalPlannedCost /
                            finishedProducts[0].plannedQuantity,
                        ).toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة الوحدة الفعلية:
                      </span>
                      <span>
                        {Math.round(
                          totalActualCost /
                            finishedProducts[0].completedQuantity,
                        ).toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        نسبة المواد الخام من التكلفة:
                      </span>
                      <span>
                        {Math.round(
                          (costs[0].actualCost / totalActualCost) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        نسبة العمالة من التكلفة:
                      </span>
                      <span>
                        {Math.round(
                          (costs[1].actualCost / totalActualCost) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        الانحراف عن الميزانية:
                      </span>
                      <span className={getVarianceColor(totalVariance)}>
                        {Math.round((totalVariance / totalPlannedCost) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center border">
                <span className="text-muted-foreground">
                  رسم بياني لتوزيع التكاليف
                </span>
              </div>
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
            {order.status === "قيد التنفيذ" && (
              <Button variant="default">
                <CheckCircle className="ml-2 h-4 w-4" />
                إكمال الإنتاج
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductionOrderDetails;
