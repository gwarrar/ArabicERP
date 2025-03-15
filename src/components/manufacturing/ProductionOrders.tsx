import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  CalendarIcon,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BarChart,
  CheckCircle2,
  Clipboard,
  Factory,
  Hammer,
  Package,
  Printer,
  Truck,
  Users,
  Workflow,
  Zap,
  PauseCircle,
  PlayCircle,
  XCircle,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import ProductionOrderDetails from "./ProductionOrderDetails";

// Sample production orders data
const productionOrdersData = [
  {
    id: "PO-2024-001",
    productName: "قميص قطني",
    quantity: 500,
    unit: "قطعة",
    completedQuantity: 325,
    dueDate: "2024-08-15",
    status: "قيد التنفيذ",
    progress: 65,
    workCenter: "قسم الخياطة",
    priority: "عالية",
    currentStage: "خياطة القميص القطني",
    startDate: "2024-08-01",
    estimatedEndDate: "2024-08-12",
    createdBy: "أحمد محمد",
    createdAt: "2024-07-25",
    customer: "شركة الأزياء العصرية",
    orderNumber: "SO-2024-112",
    productionLine: "خط الإنتاج 1",
    supervisor: "محمد علي",
    salesOrder: "SO-2024-112",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "15 يوم",
    remainingTime: "5 أيام",
    notes: "يجب الانتباه لجودة الخياطة",
  },
  {
    id: "PO-2024-002",
    productName: "بنطلون جينز",
    quantity: 300,
    unit: "قطعة",
    completedQuantity: 0,
    dueDate: "2024-08-20",
    status: "قيد الانتظار",
    progress: 0,
    workCenter: "قسم القص",
    priority: "متوسطة",
    currentStage: "قص قماش الجينز",
    startDate: "2024-08-05",
    estimatedEndDate: "2024-08-18",
    createdBy: "سارة أحمد",
    createdAt: "2024-07-28",
    customer: "متجر الملابس الرجالية",
    orderNumber: "SO-2024-118",
    productionLine: "خط الإنتاج 2",
    supervisor: "سارة أحمد",
    salesOrder: "SO-2024-118",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "15 يوم",
    remainingTime: "15 يوم",
    notes: "",
  },
  {
    id: "PO-2024-003",
    productName: "فستان صيفي",
    quantity: 200,
    unit: "قطعة",
    completedQuantity: 200,
    dueDate: "2024-08-10",
    status: "مكتمل",
    progress: 100,
    workCenter: "قسم التعبئة",
    priority: "عالية",
    currentStage: "مكتمل",
    startDate: "2024-07-25",
    estimatedEndDate: "2024-08-08",
    createdBy: "محمد علي",
    createdAt: "2024-07-20",
    customer: "متجر الأزياء النسائية",
    orderNumber: "SO-2024-105",
    productionLine: "خط الإنتاج 1",
    supervisor: "محمد علي",
    salesOrder: "SO-2024-105",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "15 يوم",
    remainingTime: "0 يوم",
    notes: "",
  },
  {
    id: "PO-2024-004",
    productName: "بلوزة حريرية",
    quantity: 150,
    unit: "قطعة",
    completedQuantity: 45,
    dueDate: "2024-08-25",
    status: "قيد التنفيذ",
    progress: 30,
    workCenter: "قسم التطريز",
    priority: "منخفضة",
    currentStage: "تطريز البلوزة الحريرية",
    startDate: "2024-08-03",
    estimatedEndDate: "2024-08-22",
    createdBy: "فاطمة حسن",
    createdAt: "2024-07-30",
    customer: "بوتيك الأناقة",
    orderNumber: "SO-2024-121",
    productionLine: "خط الإنتاج 3",
    supervisor: "فاطمة حسن",
    salesOrder: "SO-2024-121",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "20 يوم",
    remainingTime: "15 يوم",
    notes: "",
  },
  {
    id: "PO-2024-005",
    productName: "جاكيت شتوي",
    quantity: 100,
    unit: "قطعة",
    completedQuantity: 0,
    dueDate: "2024-09-05",
    status: "قيد الانتظار",
    progress: 0,
    workCenter: "قسم القص",
    priority: "متوسطة",
    currentStage: "قص قماش الجاكيت",
    startDate: "2024-08-10",
    estimatedEndDate: "2024-09-02",
    createdBy: "خالد عبدالله",
    createdAt: "2024-08-01",
    customer: "متجر الملابس الشتوية",
    orderNumber: "SO-2024-125",
    productionLine: "خط الإنتاج 2",
    supervisor: "خالد عبدالله",
    salesOrder: "SO-2024-125",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "25 يوم",
    remainingTime: "25 يوم",
    notes: "",
  },
  {
    id: "PO-2024-006",
    productName: "تي شيرت قطني",
    quantity: 400,
    unit: "قطعة",
    completedQuantity: 400,
    dueDate: "2024-08-05",
    status: "مكتمل",
    progress: 100,
    workCenter: "قسم التعبئة",
    priority: "عالية",
    currentStage: "مكتمل",
    startDate: "2024-07-20",
    estimatedEndDate: "2024-08-03",
    createdBy: "أحمد محمد",
    createdAt: "2024-07-15",
    customer: "شركة الملابس الرياضية",
    orderNumber: "SO-2024-098",
    productionLine: "خط الإنتاج 1",
    supervisor: "أحمد محمد",
    salesOrder: "SO-2024-098",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "15 يوم",
    remainingTime: "0 يوم",
    notes: "",
  },
  {
    id: "PO-2024-007",
    productName: "بيجاما قطنية",
    quantity: 250,
    unit: "قطعة",
    completedQuantity: 0,
    dueDate: "2024-09-10",
    status: "متوقف",
    progress: 0,
    workCenter: "-",
    priority: "منخفضة",
    currentStage: "-",
    startDate: "2024-08-15",
    estimatedEndDate: "2024-09-08",
    createdBy: "سارة أحمد",
    createdAt: "2024-08-02",
    customer: "متجر ملابس النوم",
    orderNumber: "SO-2024-128",
    productionLine: "خط الإنتاج 3",
    supervisor: "سارة أحمد",
    salesOrder: "SO-2024-128",
    targetWarehouse: "مستودع المنتجات الجاهزة",
    estimatedTime: "25 يوم",
    remainingTime: "25 يوم",
    notes: "متوقف بسبب نقص في المواد الخام",
    holdReason: "نقص في المواد الخام",
  },
];

// Sample work centers data
const workCentersData = [
  { id: "WC-001", name: "قسم القص" },
  { id: "WC-002", name: "قسم الخياطة" },
  { id: "WC-003", name: "قسم التطريز" },
  { id: "WC-004", name: "قسم الكي" },
  { id: "WC-005", name: "قسم التعبئة" },
];

const ProductionOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [workCenterFilter, setWorkCenterFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  // Filter and sort production orders
  const filteredOrders = productionOrdersData
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesWorkCenter =
        workCenterFilter === "all" || order.workCenter === workCenterFilter;

      const matchesPriority =
        priorityFilter === "all" || order.priority === priorityFilter;

      return (
        matchesSearch && matchesStatus && matchesWorkCenter && matchesPriority
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "dueDate") {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === "productName") {
        comparison = a.productName.localeCompare(b.productName);
      } else if (sortField === "quantity") {
        comparison = a.quantity - b.quantity;
      } else if (sortField === "progress") {
        comparison = a.progress - b.progress;
      } else if (sortField === "priority") {
        const priorityOrder = { عالية: 1, متوسطة: 2, منخفضة: 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
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

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "مكتمل":
        return "مكتمل";
      case "قيد التنفيذ":
        return "قيد التنفيذ";
      case "قيد الانتظار":
        return "قيد الانتظار";
      case "متوقف":
        return "متوقف";
      default:
        return status;
    }
  };

  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "عالية":
        return "bg-red-100 text-red-800";
      case "متوسطة":
        return "bg-amber-100 text-amber-800";
      case "منخفضة":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle order selection for details view
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // Handle delete order
  const handleDeleteOrder = (orderId) => {
    toast({
      title: "تم حذف أمر الإنتاج",
      description: `تم حذف أمر الإنتاج ${orderId} بنجاح`,
    });
  };

  // Handle add new order
  const handleAddOrder = () => {
    setShowAddOrder(false);
    toast({
      title: "تم إنشاء أمر الإنتاج",
      description: "تم إنشاء أمر الإنتاج الجديد بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن أمر إنتاج..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
                <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                <SelectItem value="قيد الانتظار">قيد الانتظار</SelectItem>
                <SelectItem value="متوقف">متوقف</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={workCenterFilter}
              onValueChange={setWorkCenterFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="مركز العمل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المراكز</SelectItem>
                {workCentersData.map((center) => (
                  <SelectItem key={center.id} value={center.name}>
                    {center.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="عالية">عالية</SelectItem>
                <SelectItem value="متوسطة">متوسطة</SelectItem>
                <SelectItem value="منخفضة">منخفضة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          <Button onClick={() => setShowAddOrder(true)}>
            <Plus className="ml-2 h-4 w-4" />
            أمر إنتاج جديد
          </Button>
        </div>
      </div>

      {/* Production Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                أوامر الإنتاج
              </CardTitle>
              <CardDescription>
                قائمة بجميع أوامر الإنتاج وحالتها
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {filteredOrders.length} أمر إنتاج
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer className="ml-1 h-3 w-3" />
                طباعة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("id")}
                  >
                    <div className="flex items-center">
                      رقم الأمر {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("productName")}
                  >
                    <div className="flex items-center">
                      المنتج {getSortIcon("productName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("quantity")}
                  >
                    <div className="flex items-center">
                      الكمية {getSortIcon("quantity")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("dueDate")}
                  >
                    <div className="flex items-center">
                      تاريخ التسليم {getSortIcon("dueDate")}
                    </div>
                  </TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("progress")}
                  >
                    <div className="flex items-center">
                      التقدم {getSortIcon("progress")}
                    </div>
                  </TableHead>
                  <TableHead>مركز العمل</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("priority")}
                  >
                    <div className="flex items-center">
                      الأولوية {getSortIcon("priority")}
                    </div>
                  </TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleOrderSelect(order)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>
                        {order.completedQuantity}/{order.quantity}
                      </TableCell>
                      <TableCell>{formatDate(order.dueDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={order.progress}
                            className="h-2 w-24"
                          />
                          <span className="text-xs">{order.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.workCenter}</TableCell>
                      <TableCell>
                        <Badge
                          className={getPriorityBadgeClass(order.priority)}
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderSelect(order);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>لا توجد أوامر إنتاج تطابق معايير البحث</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setWorkCenterFilter("all");
                            setPriorityFilter("all");
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
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <ProductionOrderDetails
          open={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          order={selectedOrder}
        />
      )}

      {/* Add Order Dialog */}
      <Dialog open={showAddOrder} onOpenChange={setShowAddOrder}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء أمر إنتاج جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل أمر الإنتاج الجديد
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-medium">
                المنتج *
              </label>
              <Select>
                <SelectTrigger id="product">
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قميص قطني">قميص قطني</SelectItem>
                  <SelectItem value="بنطلون جينز">بنطلون جينز</SelectItem>
                  <SelectItem value="فستان صيفي">فستان صيفي</SelectItem>
                  <SelectItem value="بلوزة حريرية">بلوزة حريرية</SelectItem>
                  <SelectItem value="جاكيت شتوي">جاكيت شتوي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                الكمية *
              </label>
              <Input id="quantity" type="number" placeholder="أدخل الكمية" />
            </div>

            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                تاريخ التسليم *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    <span>اختر تاريخ التسليم</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                الأولوية *
              </label>
              <Select defaultValue="متوسطة">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عالية">عالية</SelectItem>
                  <SelectItem value="متوسطة">متوسطة</SelectItem>
                  <SelectItem value="منخفضة">منخفضة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="workCenter" className="text-sm font-medium">
                مركز العمل الأول *
              </label>
              <Select>
                <SelectTrigger id="workCenter">
                  <SelectValue placeholder="اختر مركز العمل" />
                </SelectTrigger>
                <SelectContent>
                  {workCentersData.map((center) => (
                    <SelectItem key={center.id} value={center.name}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                تاريخ البدء المخطط *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    <span>اختر تاريخ البدء</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="orderNumber" className="text-sm font-medium">
                رقم طلب المبيعات
              </label>
              <Input id="orderNumber" placeholder="أدخل رقم طلب المبيعات" />
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="customer" className="text-sm font-medium">
                العميل
              </label>
              <Input id="customer" placeholder="أدخل اسم العميل" />
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                ملاحظات
              </label>
              <Textarea id="notes" placeholder="أدخل أي ملاحظات إضافية" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddOrder(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddOrder}>إنشاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Production Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي أوامر الإنتاج
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {productionOrdersData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ClipboardList className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  أوامر قيد التنفيذ
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    productionOrdersData.filter(
                      (order) => order.status === "قيد التنفيذ",
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Workflow className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">أوامر مكتملة</p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    productionOrdersData.filter(
                      (order) => order.status === "مكتمل",
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

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">أوامر متأخرة</p>
                <h3 className="text-2xl font-bold mt-2 text-red-600">
                  {
                    productionOrdersData.filter(
                      (order) =>
                        new Date(order.dueDate) < new Date() &&
                        order.status !== "مكتمل",
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionOrders;
