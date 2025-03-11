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
  List,
  Scissors,
  Boxes,
  Box,
  Workflow,
  BarChart,
  Percent,
  Calculator,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface BillOfMaterialsDetailsProps {
  open: boolean;
  onClose: () => void;
  bom: any;
}

const BillOfMaterialsDetails: React.FC<BillOfMaterialsDetailsProps> = ({
  open,
  onClose,
  bom,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  // بيانات تجريبية للمكونات
  const components = [
    {
      id: "COMP-001",
      name: "قماش قطني أبيض",
      sku: "FAB-COT-WHT-001",
      type: "مادة خام",
      quantity: 1.5,
      unit: "متر",
      wastage: 5,
      cost: 25,
      supplier: "شركة النسيج العالمية",
      notes: "قماش قطني 100% بوزن 180 جرام/متر مربع",
    },
    {
      id: "COMP-002",
      name: "خيط بوليستر أبيض",
      sku: "THR-POL-WHT-001",
      type: "مادة خام",
      quantity: 0.2,
      unit: "بكرة",
      wastage: 2,
      cost: 8,
      supplier: "شركة الخيوط المتحدة",
      notes: "",
    },
    {
      id: "COMP-003",
      name: "أزرار بلاستيك أبيض",
      sku: "BTN-PLS-WHT-001",
      type: "مادة خام",
      quantity: 8,
      unit: "قطعة",
      wastage: 1,
      cost: 4,
      supplier: "مصنع الأزرار الحديثة",
      notes: "أزرار بلاستيكية قطر 12 مم",
    },
    {
      id: "COMP-004",
      name: "ياقة قميص",
      sku: "COL-SHR-WHT-001",
      type: "مكون فرعي",
      quantity: 1,
      unit: "قطعة",
      wastage: 0,
      cost: 12,
      supplier: "إنتاج داخلي",
      notes: "مكون فرعي له قائمة مواد خاصة به",
    },
    {
      id: "COMP-005",
      name: "أكمام قميص",
      sku: "SLV-SHR-WHT-001",
      type: "مكون فرعي",
      quantity: 2,
      unit: "قطعة",
      wastage: 0,
      cost: 15,
      supplier: "إنتاج داخلي",
      notes: "مكون فرعي له قائمة مواد خاصة به",
    },
    {
      id: "COMP-006",
      name: "علامة تجارية",
      sku: "LBL-BRD-001",
      type: "مادة خام",
      quantity: 1,
      unit: "قطعة",
      wastage: 0,
      cost: 2,
      supplier: "شركة الطباعة المتميزة",
      notes: "علامة تجارية مطبوعة",
    },
  ];

  // بيانات تجريبية للعمليات
  const operations = [
    {
      id: "OP-001",
      name: "قص القماش",
      workCenter: "قسم القص",
      setupTime: 30,
      runTime: 15,
      laborCost: 20,
      machineRate: 15,
      sequence: 1,
      notes: "قص القماش حسب النمط المحدد",
    },
    {
      id: "OP-002",
      name: "خياطة الأكمام",
      workCenter: "قسم الخياطة",
      setupTime: 15,
      runTime: 25,
      laborCost: 25,
      machineRate: 18,
      sequence: 2,
      notes: "خياطة الأكمام بالجسم الرئيسي",
    },
    {
      id: "OP-003",
      name: "خياطة الياقة",
      workCenter: "قسم الخياطة",
      setupTime: 15,
      runTime: 20,
      laborCost: 25,
      machineRate: 18,
      sequence: 3,
      notes: "خياطة الياقة بالجسم الرئيسي",
    },
    {
      id: "OP-004",
      name: "تركيب الأزرار",
      workCenter: "قسم الخياطة",
      setupTime: 10,
      runTime: 15,
      laborCost: 20,
      machineRate: 12,
      sequence: 4,
      notes: "تركيب الأزرار في المواقع المحددة",
    },
    {
      id: "OP-005",
      name: "تركيب العلامة التجارية",
      workCenter: "قسم الخياطة",
      setupTime: 5,
      runTime: 5,
      laborCost: 15,
      machineRate: 10,
      sequence: 5,
      notes: "خياطة العلامة التجارية في الموقع المحدد",
    },
    {
      id: "OP-006",
      name: "الكي والتغليف",
      workCenter: "قسم التشطيب",
      setupTime: 10,
      runTime: 10,
      laborCost: 15,
      machineRate: 8,
      sequence: 6,
      notes: "كي القميص وتغليفه للشحن",
    },
  ];

  // بيانات تجريبية للإصدارات
  const versions = [
    {
      id: "V1.0",
      date: "2024-01-15",
      createdBy: "أحمد محمد",
      status: "مرحلة سابقة",
      notes: "الإصدار الأولي",
    },
    {
      id: "V1.1",
      date: "2024-03-20",
      createdBy: "سارة أحمد",
      status: "مرحلة سابقة",
      notes: "تعديل نوع الأزرار",
    },
    {
      id: "V1.2",
      date: "2024-05-10",
      createdBy: "محمد علي",
      status: "نشط",
      notes: "تحسين جودة القماش وتغيير المورد",
    },
  ];

  // بيانات تجريبية للمنتجات المرتبطة
  const relatedProducts = [
    {
      id: "PROD-001",
      name: "قميص رجالي أبيض مقاس M",
      sku: "SHR-MEN-WHT-M",
      category: "ملابس رجالية",
      status: "نشط",
    },
    {
      id: "PROD-002",
      name: "قميص رجالي أبيض مقاس L",
      sku: "SHR-MEN-WHT-L",
      category: "ملابس رجالية",
      status: "نشط",
    },
    {
      id: "PROD-003",
      name: "قميص رجالي أبيض مقاس XL",
      sku: "SHR-MEN-WHT-XL",
      category: "ملابس رجالية",
      status: "نشط",
    },
  ];

  // حساب إجمالي التكلفة
  const totalMaterialCost = components.reduce(
    (sum, component) => sum + component.cost * component.quantity,
    0,
  );

  const totalOperationCost = operations.reduce(
    (sum, operation) =>
      sum +
      (operation.laborCost + operation.machineRate) *
        ((operation.setupTime + operation.runTime) / 60),
    0,
  );

  const totalCost = totalMaterialCost + totalOperationCost;

  // تحديد لون الحالة
  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "مسودة":
        return "bg-amber-100 text-amber-800";
      case "متوقف":
        return "bg-red-100 text-red-800";
      case "مرحلة سابقة":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              تفاصيل قائمة المواد
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

        {/* BOM Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 ml-2" />
                معلومات قائمة المواد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم القائمة:</span>
                <span className="font-medium">{bom.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">اسم المنتج:</span>
                <span>{bom.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرمز:</span>
                <span>{bom.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الإصدار:</span>
                <span>{bom.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge className={getStatusColor(bom.status)}>
                  {bom.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Package className="h-4 w-4 ml-2" />
                تفاصيل المنتج
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفئة:</span>
                <span>{bom.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">وحدة القياس:</span>
                <span>{bom.uom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">كمية الإنتاج:</span>
                <span>
                  {bom.batchSize} {bom.uom}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                <span>{bom.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخر تحديث:</span>
                <span>{bom.updatedAt}</span>
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
                <span className="text-muted-foreground">تكلفة المواد:</span>
                <span className="font-medium">
                  {totalMaterialCost.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تكلفة العمليات:</span>
                <span className="font-medium">
                  {totalOperationCost.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  التكلفة الإجمالية:
                </span>
                <span className="font-medium">
                  {totalCost.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تكلفة الوحدة:</span>
                <span>{(totalCost / bom.batchSize).toLocaleString()} ₴</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-700">
                عدد المكونات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {components.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-700">
                عدد العمليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {operations.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-700">
                نسبة تكلفة المواد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">
                {Math.round((totalMaterialCost / totalCost) * 100)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-purple-700">
                نسبة تكلفة العمليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">
                {Math.round((totalOperationCost / totalCost) * 100)}%
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
            <TabsTrigger value="components">
              <Package className="h-4 w-4 ml-2" />
              المكونات
            </TabsTrigger>
            <TabsTrigger value="operations">
              <Workflow className="h-4 w-4 ml-2" />
              العمليات
            </TabsTrigger>
            <TabsTrigger value="versions">
              <Layers className="h-4 w-4 ml-2" />
              الإصدارات
            </TabsTrigger>
            <TabsTrigger value="products">
              <Box className="h-4 w-4 ml-2" />
              المنتجات المرتبطة
            </TabsTrigger>
            <TabsTrigger value="costs">
              <DollarSign className="h-4 w-4 ml-2" />
              تحليل التكاليف
            </TabsTrigger>
          </TabsList>

          {/* التفاصيل */}
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 ml-2" />
                    معلومات قائمة المواد
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        رقم القائمة
                      </p>
                      <p className="font-medium">{bom.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        اسم المنتج
                      </p>
                      <p className="font-medium">{bom.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الرمز</p>
                      <p className="font-medium">{bom.sku}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الإصدار</p>
                      <p className="font-medium">{bom.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الفئة</p>
                      <p className="font-medium">{bom.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        وحدة القياس
                      </p>
                      <p className="font-medium">{bom.uom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        كمية الإنتاج
                      </p>
                      <p className="font-medium">
                        {bom.batchSize} {bom.uom}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <Badge className={getStatusColor(bom.status)}>
                        {bom.status}
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
                        تاريخ الإنشاء
                      </p>
                      <p className="font-medium">{bom.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">بواسطة</p>
                      <p className="font-medium">{bom.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">آخر تحديث</p>
                      <p className="font-medium">{bom.updatedAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">بواسطة</p>
                      <p className="font-medium">{bom.updatedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        نوع القائمة
                      </p>
                      <p className="font-medium">{bom.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المستوى</p>
                      <p className="font-medium">{bom.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الموافقة</p>
                      <p className="font-medium">
                        {bom.approvedBy || "غير معتمد"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاريخ الموافقة
                      </p>
                      <p className="font-medium">{bom.approvedAt || "-"}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      الملاحظات
                    </p>
                    <p>{bom.notes || "لا توجد ملاحظات"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <div className="flex items-start">
                <FileText className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
                <div>
                  <h3 className="font-medium mb-1">ملخص قائمة المواد</h3>
                  <p className="text-sm">
                    قائمة المواد {bom.id} للمنتج {bom.productName} تحتوي على{" "}
                    {components.length} مكون و {operations.length} عملية.
                    التكلفة الإجمالية {totalCost.toLocaleString()} ₴ بمعدل{" "}
                    {(totalCost / bom.batchSize).toLocaleString()} ₴ للوحدة.
                    {bom.status === "نشط" &&
                      " هذه القائمة معتمدة وجاهزة للاستخدام في الإنتاج."}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المكونات */}
          <TabsContent value="components" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المكونات</h3>
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
                  إضافة مكون
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>المكون</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead className="text-center">نسبة الهدر %</TableHead>
                    <TableHead className="text-center">التكلفة</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {components.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell className="font-medium">
                        {component.name}
                      </TableCell>
                      <TableCell>{component.sku}</TableCell>
                      <TableCell>{component.type}</TableCell>
                      <TableCell className="text-center">
                        {component.quantity}
                      </TableCell>
                      <TableCell>{component.unit}</TableCell>
                      <TableCell className="text-center">
                        {component.wastage}%
                      </TableCell>
                      <TableCell className="text-center">
                        {component.cost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>{component.supplier}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    توزيع تكلفة المكونات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center border">
                    <span className="text-muted-foreground">
                      رسم بياني لتوزيع تكاليف المكونات
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">ملخص المكونات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي المكونات:
                    </span>
                    <span className="font-medium">{components.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المواد الخام:</span>
                    <span className="font-medium">
                      {components.filter((c) => c.type === "مادة خام").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      المكونات الفرعية:
                    </span>
                    <span className="font-medium">
                      {components.filter((c) => c.type === "مكون فرعي").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي تكلفة المكونات:
                    </span>
                    <span className="font-medium">
                      {totalMaterialCost.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      متوسط نسبة الهدر:
                    </span>
                    <span className="font-medium">
                      {(
                        components.reduce((sum, c) => sum + c.wastage, 0) /
                        components.length
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* العمليات */}
          <TabsContent value="operations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">العمليات</h3>
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
                  إضافة عملية
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>العملية</TableHead>
                    <TableHead>مركز العمل</TableHead>
                    <TableHead className="text-center">التسلسل</TableHead>
                    <TableHead className="text-center">
                      وقت الإعداد (دقيقة)
                    </TableHead>
                    <TableHead className="text-center">
                      وقت التشغيل (دقيقة)
                    </TableHead>
                    <TableHead className="text-center">تكلفة العمالة</TableHead>
                    <TableHead className="text-center">تكلفة الآلات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell className="font-medium">
                        {operation.name}
                      </TableCell>
                      <TableCell>{operation.workCenter}</TableCell>
                      <TableCell className="text-center">
                        {operation.sequence}
                      </TableCell>
                      <TableCell className="text-center">
                        {operation.setupTime}
                      </TableCell>
                      <TableCell className="text-center">
                        {operation.runTime}
                      </TableCell>
                      <TableCell className="text-center">
                        {operation.laborCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {operation.machineRate.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    مخطط تسلسل العمليات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center border">
                    <span className="text-muted-foreground">
                      مخطط تسلسل العمليات
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">ملخص العمليات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي العمليات:
                    </span>
                    <span className="font-medium">{operations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي وقت الإعداد:
                    </span>
                    <span className="font-medium">
                      {operations.reduce((sum, op) => sum + op.setupTime, 0)}{" "}
                      دقيقة
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي وقت التشغيل:
                    </span>
                    <span className="font-medium">
                      {operations.reduce((sum, op) => sum + op.runTime, 0)}{" "}
                      دقيقة
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      إجمالي تكلفة العمليات:
                    </span>
                    <span className="font-medium">
                      {totalOperationCost.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      الوقت الكلي للإنتاج:
                    </span>
                    <span className="font-medium">
                      {operations.reduce(
                        (sum, op) => sum + op.setupTime + op.runTime,
                        0,
                      )}{" "}
                      دقيقة
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الإصدارات */}
          <TabsContent value="versions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">إصدارات قائمة المواد</h3>
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
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>الإصدار</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>بواسطة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {versions.map((version) => (
                    <TableRow key={version.id}>
                      <TableCell className="font-medium">
                        {version.id}
                      </TableCell>
                      <TableCell>{version.date}</TableCell>
                      <TableCell>{version.createdBy}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(version.status)}>
                          {version.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{version.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {version.status !== "نشط" && (
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 ml-2 mt-0.5 text-amber-600" />
                <div>
                  <h3 className="font-medium mb-1">ملاحظة هامة</h3>
                  <p className="text-sm">
                    تغيير إصدار قائمة المواد سيؤثر على جميع أوامر الإنتاج
                    المستقبلية. الإصدار الحالي النشط هو{" "}
                    {versions.find((v) => v.status === "نشط")?.id}.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* المنتجات المرتبطة */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المنتجات المرتبطة</h3>
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
                  ربط منتج
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead>رمز المنتج</TableHead>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* تحليل التكاليف */}
          <TabsContent value="costs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">تحليل التكاليف</h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="h-4 w-4 ml-2" />
                    توزيع التكاليف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] bg-muted/20 rounded-md flex items-center justify-center border">
                    <span className="text-muted-foreground">
                      رسم بياني لتوزيع التكاليف
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Calculator className="h-4 w-4 ml-2" />
                    ملخص التكاليف
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة المواد الخام:
                      </span>
                      <span className="font-medium">
                        {components
                          .filter((c) => c.type === "مادة خام")
                          .reduce((sum, c) => sum + c.cost * c.quantity, 0)
                          .toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة المكونات الفرعية:
                      </span>
                      <span className="font-medium">
                        {components
                          .filter((c) => c.type === "مكون فرعي")
                          .reduce((sum, c) => sum + c.cost * c.quantity, 0)
                          .toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة العمالة:
                      </span>
                      <span className="font-medium">
                        {operations
                          .reduce(
                            (sum, op) =>
                              sum +
                              op.laborCost * ((op.setupTime + op.runTime) / 60),
                            0,
                          )
                          .toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تكلفة الآلات:
                      </span>
                      <span className="font-medium">
                        {operations
                          .reduce(
                            (sum, op) =>
                              sum +
                              op.machineRate *
                                ((op.setupTime + op.runTime) / 60),
                            0,
                          )
                          .toLocaleString()}{" "}
                        ₴
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-medium">
                      <span>التكلفة الإجمالية:</span>
                      <span>{totalCost.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>تكلفة الوحدة:</span>
                      <span>
                        {(totalCost / bom.batchSize).toLocaleString()} ₴
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        نسبة تكلفة المواد:
                      </span>
                      <span className="font-medium">
                        {Math.round((totalMaterialCost / totalCost) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        نسبة تكلفة العمليات:
                      </span>
                      <span className="font-medium">
                        {Math.round((totalOperationCost / totalCost) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Percent className="h-4 w-4 ml-2" />
                  تحليل المكونات حسب التكلفة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead>المكون</TableHead>
                        <TableHead>النوع</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">
                          تكلفة الوحدة
                        </TableHead>
                        <TableHead className="text-center">
                          التكلفة الإجمالية
                        </TableHead>
                        <TableHead className="text-center">
                          النسبة من الإجمالي
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...components]
                        .sort(
                          (a, b) => b.cost * b.quantity - a.cost * a.quantity,
                        )
                        .map((component) => {
                          const totalComponentCost =
                            component.cost * component.quantity;
                          const percentage =
                            (totalComponentCost / totalCost) * 100;
                          return (
                            <TableRow key={component.id}>
                              <TableCell className="font-medium">
                                {component.name}
                              </TableCell>
                              <TableCell>{component.type}</TableCell>
                              <TableCell className="text-center">
                                {component.quantity} {component.unit}
                              </TableCell>
                              <TableCell className="text-center">
                                {component.cost.toLocaleString()} ₴
                              </TableCell>
                              <TableCell className="text-center">
                                {totalComponentCost.toLocaleString()} ₴
                              </TableCell>
                              <TableCell className="text-center">
                                {percentage.toFixed(1)}%
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
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
            <Button variant="default">
              <Printer className="ml-2 h-4 w-4" />
              طباعة
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BillOfMaterialsDetails;
