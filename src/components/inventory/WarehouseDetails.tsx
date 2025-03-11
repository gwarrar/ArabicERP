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
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface WarehouseDetailsProps {
  open: boolean;
  onClose: () => void;
  warehouse: any;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({
  open,
  onClose,
  warehouse,
}) => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // بيانات تجريبية للمخزون
  const inventoryItems = [
    {
      id: "ITM-001",
      name: "قماش قطني أبيض",
      sku: "FAB-COT-WHT-001",
      category: "أقمشة",
      unit: "متر",
      quantity: 1250,
      minQuantity: 200,
      maxQuantity: 2000,
      location: "A-01-01",
      status: "متوفر",
      lastUpdated: "2024-07-15",
      value: 62500,
    },
    {
      id: "ITM-002",
      name: "قماش قطني أسود",
      sku: "FAB-COT-BLK-002",
      category: "أقمشة",
      unit: "متر",
      quantity: 850,
      minQuantity: 150,
      maxQuantity: 1500,
      location: "A-01-02",
      status: "متوفر",
      lastUpdated: "2024-07-14",
      value: 46750,
    },
    {
      id: "ITM-003",
      name: "خيط بوليستر أبيض",
      sku: "THR-POL-WHT-001",
      category: "خيوط",
      unit: "بكرة",
      quantity: 350,
      minQuantity: 50,
      maxQuantity: 500,
      location: "B-02-01",
      status: "متوفر",
      lastUpdated: "2024-07-10",
      value: 8750,
    },
    {
      id: "ITM-004",
      name: "أزرار بلاستيك أسود",
      sku: "BTN-PLS-BLK-001",
      category: "إكسسوارات",
      unit: "قطعة",
      quantity: 5000,
      minQuantity: 1000,
      maxQuantity: 10000,
      location: "C-03-01",
      status: "متوفر",
      lastUpdated: "2024-07-12",
      value: 2500,
    },
    {
      id: "ITM-005",
      name: "سحاب معدني",
      sku: "ZIP-MTL-001",
      category: "إكسسوارات",
      unit: "قطعة",
      quantity: 120,
      minQuantity: 200,
      maxQuantity: 2000,
      location: "C-03-02",
      status: "منخفض",
      lastUpdated: "2024-07-13",
      value: 1800,
    },
  ];

  // بيانات تجريبية لحركات المخزون
  const stockMovements = [
    {
      id: "MOV-001",
      date: "2024-07-15",
      type: "استلام",
      reference: "PO-2024-0125",
      items: 3,
      quantity: 500,
      user: "أحمد محمد",
      notes: "استلام من المورد",
    },
    {
      id: "MOV-002",
      date: "2024-07-14",
      type: "صرف",
      reference: "ORD-2024-0198",
      items: 2,
      quantity: 150,
      user: "خالد العبدالله",
      notes: "صرف للإنتاج",
    },
    {
      id: "MOV-003",
      date: "2024-07-12",
      type: "تحويل",
      reference: "TRF-2024-0056",
      items: 1,
      quantity: 200,
      user: "سارة الأحمد",
      notes: "تحويل إلى المستودع الفرعي",
    },
    {
      id: "MOV-004",
      date: "2024-07-10",
      type: "استلام",
      reference: "PO-2024-0120",
      items: 4,
      quantity: 1000,
      user: "أحمد محمد",
      notes: "استلام من المورد",
    },
    {
      id: "MOV-005",
      date: "2024-07-08",
      type: "تعديل",
      reference: "ADJ-2024-0012",
      items: 1,
      quantity: 50,
      user: "محمد العلي",
      notes: "تعديل بعد الجرد",
    },
  ];

  // بيانات تجريبية للطلبات المعلقة
  const pendingOrders = [
    {
      id: "ORD-2024-0205",
      date: "2024-07-16",
      customer: "شركة الأمل للتجارة",
      items: 3,
      status: "قيد التجهيز",
      dueDate: "2024-07-18",
    },
    {
      id: "ORD-2024-0210",
      date: "2024-07-17",
      customer: "مؤسسة النور",
      items: 2,
      status: "قيد التجهيز",
      dueDate: "2024-07-19",
    },
  ];

  // بيانات تجريبية للتنبيهات
  const alerts = [
    {
      id: "ALT-001",
      item: "سحاب معدني",
      type: "منخفض",
      message: "الكمية أقل من الحد الأدنى",
      date: "2024-07-13",
    },
    {
      id: "ALT-002",
      item: "قماش قطني أبيض",
      type: "قريب من الحد الأقصى",
      message: "الكمية تقترب من الحد الأقصى",
      date: "2024-07-15",
    },
  ];

  // تصفية عناصر المخزون
  const filteredInventory = inventoryItems.filter((item) => {
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // استخراج الفئات الفريدة
  const categories = [...new Set(inventoryItems.map((item) => item.category))];

  // حساب إجماليات المخزون
  const totalItems = inventoryItems.length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.value, 0);
  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity < item.minQuantity,
  ).length;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              تفاصيل المستودع
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

        {/* Warehouse Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Warehouse className="h-4 w-4 ml-2" />
                معلومات المستودع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">اسم المستودع:</span>
                <span className="font-medium">{warehouse.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرمز:</span>
                <span>{warehouse.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">النوع:</span>
                <span>{warehouse.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المساحة:</span>
                <span>{warehouse.area} متر مربع</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge
                  className={
                    warehouse.status === "نشط"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {warehouse.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <MapPin className="h-4 w-4 ml-2" />
                معلومات الموقع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">العنوان:</span>
                <span>{warehouse.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المدينة:</span>
                <span>{warehouse.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المنطقة:</span>
                <span>{warehouse.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرمز البريدي:</span>
                <span>{warehouse.postalCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الإحداثيات:</span>
                <span dir="ltr">{warehouse.coordinates || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <User className="h-4 w-4 ml-2" />
                معلومات الاتصال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المسؤول:</span>
                <span>{warehouse.manager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الهاتف:</span>
                <span dir="ltr">{warehouse.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  البريد الإلكتروني:
                </span>
                <span className="text-blue-600 hover:underline">
                  {warehouse.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">عدد الموظفين:</span>
                <span>{warehouse.employeesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ساعات العمل:</span>
                <span>{warehouse.workingHours}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-700">
                إجمالي الأصناف
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">
                {totalItems} صنف
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-700">
                قيمة المخزون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {totalValue.toLocaleString()} ₴
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-700">
                أصناف منخفضة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">
                {lowStockItems} صنف
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">
              <Package className="h-4 w-4 ml-2" />
              المخزون
            </TabsTrigger>
            <TabsTrigger value="movements">
              <Truck className="h-4 w-4 ml-2" />
              حركات المخزون
            </TabsTrigger>
            <TabsTrigger value="orders">
              <FileText className="h-4 w-4 ml-2" />
              الطلبات المعلقة
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <AlertTriangle className="h-4 w-4 ml-2" />
              التنبيهات
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart2 className="h-4 w-4 ml-2" />
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          {/* المخزون */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">محتويات المستودع</h3>
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
                  إضافة صنف
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث باسم الصنف أو الرمز..."
                  className="pr-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="h-10 rounded-md border border-input bg-background px-3 py-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="h-10 rounded-md border border-input bg-background px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">جميع الحالات</option>
                <option value="متوفر">متوفر</option>
                <option value="منخفض">منخفض</option>
                <option value="غير متوفر">غير متوفر</option>
              </select>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الصنف</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">القيمة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-24 text-center text-muted-foreground"
                      >
                        لا توجد نتائج مطابقة للبحث
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-center">
                          {item.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              item.status === "متوفر"
                                ? "bg-green-100 text-green-800"
                                : item.status === "منخفض"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.value.toLocaleString()} ₴
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* حركات المخزون */}
          <TabsContent value="movements" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">حركات المخزون</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="default" size="sm">
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                  صرف
                </Button>
                <Button variant="default" size="sm">
                  <ArrowDownLeft className="h-4 w-4 ml-1" />
                  استلام
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الحركة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead className="text-center">عدد الأصناف</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">
                        {movement.id}
                      </TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            movement.type === "استلام"
                              ? "bg-green-100 text-green-800"
                              : movement.type === "صرف"
                                ? "bg-red-100 text-red-800"
                                : movement.type === "تحويل"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                          }
                        >
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{movement.reference}</TableCell>
                      <TableCell className="text-center">
                        {movement.items}
                      </TableCell>
                      <TableCell className="text-center">
                        {movement.quantity}
                      </TableCell>
                      <TableCell>{movement.user}</TableCell>
                      <TableCell>{movement.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* الطلبات المعلقة */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">الطلبات المعلقة</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead className="text-center">عدد الأصناف</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ التسليم</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-muted-foreground"
                      >
                        لا توجد طلبات معلقة
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="text-center">
                          {order.items}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* التنبيهات */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">تنبيهات المخزون</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصنف</TableHead>
                    <TableHead>نوع التنبيه</TableHead>
                    <TableHead>الرسالة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-muted-foreground"
                      >
                        لا توجد تنبيهات
                      </TableCell>
                    </TableRow>
                  ) : (
                    alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">
                          {alert.item}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              alert.type === "منخفض"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }
                          >
                            {alert.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.message}</TableCell>
                        <TableCell>{alert.date}</TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* الإحصائيات */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* إحصائيات المخزون */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Package className="h-4 w-4 ml-2" />
                    إحصائيات المخزون
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        إجمالي الأصناف:
                      </span>
                      <span className="font-medium">{totalItems} صنف</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        قيمة المخزون:
                      </span>
                      <span className="font-medium">
                        {totalValue.toLocaleString()} ₴
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        أصناف منخفضة:
                      </span>
                      <span className="font-medium">{lowStockItems} صنف</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        معدل دوران المخزون:
                      </span>
                      <span className="font-medium">4.5 مرة/سنة</span>
                    </div>
                  </div>

                  <div className="h-[150px] bg-muted/20 rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">
                      رسم بياني لقيمة المخزون
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* إحصائيات الحركات */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Truck className="h-4 w-4 ml-2" />
                    إحصائيات الحركات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        إجمالي الحركات:
                      </span>
                      <span className="font-medium">
                        {stockMovements.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        عمليات الاستلام:
                      </span>
                      <span className="font-medium">
                        {
                          stockMovements.filter((m) => m.type === "استلام")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        عمليات الصرف:
                      </span>
                      <span className="font-medium">
                        {stockMovements.filter((m) => m.type === "صرف").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        عمليات التحويل:
                      </span>
                      <span className="font-medium">
                        {
                          stockMovements.filter((m) => m.type === "تحويل")
                            .length
                        }
                      </span>
                    </div>
                  </div>

                  <div className="h-[150px] bg-muted/20 rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">
                      رسم بياني للحركات الشهرية
                    </span>
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
            <Button>
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarehouseDetails;
