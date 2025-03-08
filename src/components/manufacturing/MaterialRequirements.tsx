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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  TrendingUp,
  TrendingDown,
  Wrench,
  Tool,
  Cog,
  Gauge,
  Activity,
  Layers,
  UserPlus,
  UserMinus,
  Forklift,
  Warehouse,
  Conveyor,
  Box,
  Boxes,
  ShoppingCart,
  BarChart4,
  PieChart,
  Repeat,
  History,
  Scissors,
  Ruler,
  Droplet,
  Palette,
  Shirt,
  Scroll,
  FileBarChart,
  FileSpreadsheet,
  FilePlus,
  FileCheck,
  FileWarning,
  FileX,
  FileText2,
  FileMinus,
  FileInput,
  FileOutput,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
} from "recharts";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Sample material requirements data
const materialRequirementsData = [
  {
    id: "MR-001",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    materialId: "RM-001",
    materialName: "قماش قطني",
    requiredQuantity: 250,
    allocatedQuantity: 250,
    issuedQuantity: 250,
    remainingQuantity: 0,
    unit: "متر",
    status: "completed",
    dueDate: "2024-08-01",
    issueDate: "2024-08-01",
    notes: "تم صرف المواد بالكامل",
  },
  {
    id: "MR-002",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    materialId: "RM-005",
    materialName: "خيوط قطنية",
    requiredQuantity: 20,
    allocatedQuantity: 20,
    issuedQuantity: 20,
    remainingQuantity: 0,
    unit: "بكرة",
    status: "completed",
    dueDate: "2024-08-01",
    issueDate: "2024-08-01",
    notes: "تم صرف المواد بالكامل",
  },
  {
    id: "MR-003",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    materialId: "RM-006",
    materialName: "أزرار بلاستيكية",
    requiredQuantity: 3000,
    allocatedQuantity: 3000,
    issuedQuantity: 2000,
    remainingQuantity: 1000,
    unit: "قطعة",
    status: "in-progress",
    dueDate: "2024-08-03",
    issueDate: "2024-08-01",
    notes: "تم صرف جزء من المواد",
  },
  {
    id: "MR-004",
    productionOrder: "PO-2024-002",
    product: "بنطلون جينز",
    materialId: "RM-002",
    materialName: "قماش جينز",
    requiredQuantity: 450,
    allocatedQuantity: 450,
    issuedQuantity: 0,
    remainingQuantity: 450,
    unit: "متر",
    status: "pending",
    dueDate: "2024-08-05",
    issueDate: "",
    notes: "في انتظار موعد الصرف",
  },
  {
    id: "MR-005",
    productionOrder: "PO-2024-002",
    product: "بنطلون جينز",
    materialId: "RM-007",
    materialName: "سحابات معدنية",
    requiredQuantity: 300,
    allocatedQuantity: 300,
    issuedQuantity: 0,
    remainingQuantity: 300,
    unit: "قطعة",
    status: "pending",
    dueDate: "2024-08-05",
    issueDate: "",
    notes: "في انتظار موعد الصرف",
  },
  {
    id: "MR-006",
    productionOrder: "PO-2024-004",
    product: "بلوزة حريرية",
    materialId: "RM-003",
    materialName: "قماش حرير",
    requiredQuantity: 120,
    allocatedQuantity: 120,
    issuedQuantity: 120,
    remainingQuantity: 0,
    unit: "متر",
    status: "completed",
    dueDate: "2024-08-03",
    issueDate: "2024-08-03",
    notes: "تم صرف المواد بالكامل",
  },
  {
    id: "MR-007",
    productionOrder: "PO-2024-004",
    product: "بلوزة حريرية",
    materialId: "RM-005",
    materialName: "خيوط قطنية",
    requiredQuantity: 10,
    allocatedQuantity: 10,
    issuedQuantity: 10,
    remainingQuantity: 0,
    unit: "بكرة",
    status: "completed",
    dueDate: "2024-08-03",
    issueDate: "2024-08-03",
    notes: "تم صرف المواد بالكامل",
  },
];

// Sample bill of materials data
const billOfMaterialsData = [
  {
    id: "BOM-001",
    product: "قميص قطني",
    version: "1.0",
    status: "active",
    createdBy: "أحمد محمد",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-10",
    materials: [
      {
        materialId: "RM-001",
        materialName: "قماش قطني",
        quantity: 0.5,
        unit: "متر",
        wastage: 5,
        notes: "قماش قطني عالي الجودة",
      },
      {
        materialId: "RM-005",
        materialName: "خيوط قطنية",
        quantity: 0.04,
        unit: "بكرة",
        wastage: 2,
        notes: "خيوط للخياطة الأساسية",
      },
      {
        materialId: "RM-006",
        materialName: "أزرار بلاستيكية",
        quantity: 6,
        unit: "قطعة",
        wastage: 1,
        notes: "أزرار متوسطة الحجم",
      },
    ],
  },
  {
    id: "BOM-002",
    product: "بنطلون جينز",
    version: "1.2",
    status: "active",
    createdBy: "سارة أحمد",
    createdAt: "2024-02-20",
    updatedAt: "2024-07-05",
    materials: [
      {
        materialId: "RM-002",
        materialName: "قماش جينز",
        quantity: 1.5,
        unit: "متر",
        wastage: 8,
        notes: "قماش جينز ثقيل",
      },
      {
        materialId: "RM-005",
        materialName: "خيوط قطنية",
        quantity: 0.08,
        unit: "بكرة",
        wastage: 3,
        notes: "خيوط متينة للخياطة",
      },
      {
        materialId: "RM-007",
        materialName: "سحابات معدنية",
        quantity: 1,
        unit: "قطعة",
        wastage: 1,
        notes: "سحاب معدني متين",
      },
      {
        materialId: "RM-006",
        materialName: "أزرار بلاستيكية",
        quantity: 1,
        unit: "قطعة",
        wastage: 1,
        notes: "زر كبير للخصر",
      },
    ],
  },
  {
    id: "BOM-003",
    product: "بلوزة حريرية",
    version: "1.1",
    status: "active",
    createdBy: "محمد علي",
    createdAt: "2024-03-10",
    updatedAt: "2024-06-25",
    materials: [
      {
        materialId: "RM-003",
        materialName: "قماش حرير",
        quantity: 0.8,
        unit: "متر",
        wastage: 6,
        notes: "قماش حرير ناعم",
      },
      {
        materialId: "RM-005",
        materialName: "خيوط قطنية",
        quantity: 0.06,
        unit: "بكرة",
        wastage: 2,
        notes: "خيوط للخياطة الدقيقة",
      },
      {
        materialId: "RM-006",
        materialName: "أزرار بلاستيكية",
        quantity: 5,
        unit: "قطعة",
        wastage: 1,
        notes: "أزرار صغيرة للأكمام والياقة",
      },
    ],
  },
];

// Sample material requirements by category data for charts
const materialRequirementsByCategoryChartData = [
  { name: "أقمشة", قيمة: 65 },
  { name: "خيوط", قيمة: 15 },
  { name: "إكسسوارات", قيمة: 20 },
];

// Sample material requirements by status data for charts
const materialRequirementsByStatusChartData = [
  { name: "مكتمل", قيمة: 45 },
  { name: "قيد التنفيذ", قيمة: 30 },
  { name: "معلق", قيمة: 25 },
];

// Sample material requirements by production order data for charts
const materialRequirementsByOrderChartData = [
  { name: "PO-2024-001", قيمة: 40 },
  { name: "PO-2024-002", قيمة: 30 },
  { name: "PO-2024-004", قيمة: 20 },
  { name: "أخرى", قيمة: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const MaterialRequirements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("requirements");
  const [showAddRequirement, setShowAddRequirement] = useState(false);
  const [showRequirementDetails, setShowRequirementDetails] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [showBomDetails, setShowBomDetails] = useState(false);
  const [selectedBom, setSelectedBom] = useState(null);
  const { toast } = useToast();

  // Filter material requirements based on search, status and order
  const filteredRequirements = materialRequirementsData.filter(
    (requirement) => {
      const matchesSearch =
        requirement.materialName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        requirement.productionOrder
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        requirement.product.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || requirement.status === statusFilter;
      const matchesOrder =
        orderFilter === "all" || requirement.productionOrder === orderFilter;
      return matchesSearch && matchesStatus && matchesOrder;
    },
  );

  // Filter bill of materials based on search
  const filteredBoms = billOfMaterialsData.filter((bom) => {
    const matchesSearch = bom.product
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Handle requirement selection for details view
  const handleRequirementSelect = (requirement) => {
    setSelectedRequirement(requirement);
    setShowRequirementDetails(true);
  };

  // Handle BOM selection for details view
  const handleBomSelect = (bom) => {
    setSelectedBom(bom);
    setShowBomDetails(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "in-progress":
        return "قيد التنفيذ";
      case "pending":
        return "معلق";
      case "active":
        return "نشط";
      case "inactive":
        return "غير نشط";
      case "draft":
        return "مسودة";
      default:
        return status;
    }
  };

  // Handle issue materials
  const handleIssueMaterials = (requirement) => {
    toast({
      title: "تم صرف المواد",
      description: `تم صرف المواد لأمر الإنتاج ${requirement.productionOrder}`,
    });
  };

  // Handle add new requirement
  const handleAddRequirement = () => {
    setShowAddRequirement(false);
    toast({
      title: "تم إضافة متطلبات المواد",
      description: "تم إضافة متطلبات المواد الجديدة بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="requirements">
            <ClipboardList className="h-4 w-4 ml-2" />
            متطلبات المواد
          </TabsTrigger>
          <TabsTrigger value="bom">
            <Layers className="h-4 w-4 ml-2" />
            قوائم المواد
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 ml-2" />
            تحليل المتطلبات
          </TabsTrigger>
        </TabsList>

        {/* Material Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن متطلبات..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                </SelectContent>
              </Select>

              <Select value={orderFilter} onValueChange={setOrderFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="أمر الإنتاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأوامر</SelectItem>
                  <SelectItem value="PO-2024-001">PO-2024-001</SelectItem>
                  <SelectItem value="PO-2024-002">PO-2024-002</SelectItem>
                  <SelectItem value="PO-2024-004">PO-2024-004</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button onClick={() => setShowAddRequirement(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة متطلبات
              </Button>
            </div>
          </div>

          {/* Material Requirements Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    متطلبات المواد
                  </CardTitle>
                  <CardDescription>
                    قائمة بمتطلبات المواد لأوامر الإنتاج
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredRequirements.length} متطلب
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
                      <TableHead>رقم المتطلب</TableHead>
                      <TableHead>أمر الإنتاج</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>المادة</TableHead>
                      <TableHead>الكمية المطلوبة</TableHead>
                      <TableHead>الكمية المصروفة</TableHead>
                      <TableHead>الوحدة</TableHead>
                      <TableHead>تاريخ الاستحقاق</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequirements.length > 0 ? (
                      filteredRequirements.map((requirement) => (
                        <TableRow key={requirement.id}>
                          <TableCell className="font-medium">
                            {requirement.id}
                          </TableCell>
                          <TableCell>{requirement.productionOrder}</TableCell>
                          <TableCell>{requirement.product}</TableCell>
                          <TableCell>{requirement.materialName}</TableCell>
                          <TableCell>{requirement.requiredQuantity}</TableCell>
                          <TableCell>{requirement.issuedQuantity}</TableCell>
                          <TableCell>{requirement.unit}</TableCell>
                          <TableCell>
                            {formatDate(requirement.dueDate)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeClass(
                                requirement.status,
                              )}
                            >
                              {getStatusText(requirement.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleRequirementSelect(requirement)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {requirement.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleIssueMaterials(requirement)
                                  }
                                >
                                  <FileCheck className="h-4 w-4 text-green-600" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Search className="h-8 w-8 mb-2" />
                            <p>لا توجد متطلبات مواد تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                                setOrderFilter("all");
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

          {/* Material Requirements Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المتطلبات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {materialRequirementsData.length}
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
                      متطلبات مكتملة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        materialRequirementsData.filter(
                          (req) => req.status === "completed",
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
                    <p className="text-sm text-muted-foreground">
                      متطلبات معلقة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        materialRequirementsData.filter(
                          (req) => req.status === "pending",
                        ).length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bill of Materials Tab */}
        <TabsContent value="bom" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن قائمة مواد..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة قائمة مواد
              </Button>
            </div>
          </div>

          {/* Bill of Materials Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    قوائم المواد
                  </CardTitle>
                  <CardDescription>
                    قوائم المواد المطلوبة لتصنيع المنتجات
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredBoms.length} قائمة
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
                      <TableHead>رقم القائمة</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الإصدار</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>عدد المواد</TableHead>
                      <TableHead>تاريخ التحديث</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBoms.length > 0 ? (
                      filteredBoms.map((bom) => (
                        <TableRow key={bom.id}>
                          <TableCell className="font-medium">
                            {bom.id}
                          </TableCell>
                          <TableCell>{bom.product}</TableCell>
                          <TableCell>{bom.version}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(bom.status)}>
                              {getStatusText(bom.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{bom.materials.length}</TableCell>
                          <TableCell>{formatDate(bom.updatedAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleBomSelect(bom)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FilePlus className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Search className="h-8 w-8 mb-2" />
                            <p>لا توجد قوائم مواد تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
                              }}
                            >
                              إعادة تعيين البحث
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
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Material Requirements by Category Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  متطلبات المواد حسب الفئة
                </CardTitle>
                <CardDescription>
                  توزيع متطلبات المواد حسب فئة المواد
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={materialRequirementsByCategoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="قيمة"
                    >
                      {materialRequirementsByCategoryChartData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ),
                      )}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Material Requirements by Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  متطلبات المواد حسب الحالة
                </CardTitle>
                <CardDescription>
                  توزيع متطلبات المواد حسب حالة الصرف
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={materialRequirementsByStatusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="قيمة"
                    >
                      {materialRequirementsByStatusChartData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ),
                      )}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Material Requirements by Production Order Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  متطلبات المواد حسب أمر الإنتاج
                </CardTitle>
                <CardDescription>
                  توزيع متطلبات المواد حسب أوامر الإنتاج
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={materialRequirementsByOrderChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar
                      dataKey="قيمة"
                      fill="#8884d8"
                      name="النسبة المئوية (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Material Requirement Details Dialog */}
      {selectedRequirement && (
        <Dialog
          open={showRequirementDetails}
          onOpenChange={setShowRequirementDetails}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل متطلب المواد</DialogTitle>
              <DialogDescription>
                عرض تفاصيل متطلب المواد {selectedRequirement.id}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات أساسية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">رقم المتطلب:</div>
                    <div>{selectedRequirement.id}</div>
                    <div className="font-medium">أمر الإنتاج:</div>
                    <div>{selectedRequirement.productionOrder}</div>
                    <div className="font-medium">المنتج:</div>
                    <div>{selectedRequirement.product}</div>
                    <div className="font-medium">المادة:</div>
                    <div>{selectedRequirement.materialName}</div>
                    <div className="font-medium">رقم المادة:</div>
                    <div>{selectedRequirement.materialId}</div>
                    <div className="font-medium">الحالة:</div>
                    <div>
                      <Badge
                        className={getStatusBadgeClass(
                          selectedRequirement.status,
                        )}
                      >
                        {getStatusText(selectedRequirement.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات الكميات
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">الكمية المطلوبة:</div>
                    <div>
                      {selectedRequirement.requiredQuantity}{" "}
                      {selectedRequirement.unit}
                    </div>
                    <div className="font-medium">الكمية المخصصة:</div>
                    <div>
                      {selectedRequirement.allocatedQuantity}{" "}
                      {selectedRequirement.unit}
                    </div>
                    <div className="font-medium">الكمية المصروفة:</div>
                    <div>
                      {selectedRequirement.issuedQuantity}{" "}
                      {selectedRequirement.unit}
                    </div>
                    <div className="font-medium">الكمية المتبقية:</div>
                    <div>
                      {selectedRequirement.remainingQuantity}{" "}
                      {selectedRequirement.unit}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات التواريخ
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">تاريخ الاستحقاق:</div>
                    <div>{formatDate(selectedRequirement.dueDate)}</div>
                    <div className="font-medium">تاريخ الصرف:</div>
                    <div>{formatDate(selectedRequirement.issueDate)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    ملاحظات
                  </h3>
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {selectedRequirement.notes || "لا توجد ملاحظات"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    نسبة الإكمال
                  </h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>الكمية المصروفة / الكمية المطلوبة</span>
                    <span>
                      {Math.round(
                        (selectedRequirement.issuedQuantity /
                          selectedRequirement.requiredQuantity) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      (selectedRequirement.issuedQuantity /
                        selectedRequirement.requiredQuantity) *
                        100,
                    )}
                    className="h-2"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex gap-2 justify-end">
                    {selectedRequirement.status === "pending" && (
                      <Button
                        onClick={() =>
                          handleIssueMaterials(selectedRequirement)
                        }
                      >
                        <FileCheck className="ml-1 h-3 w-3" />
                        صرف المواد
                      </Button>
                    )}
                    <Button variant="outline">
                      <Edit className="ml-1 h-3 w-3" />
                      تعديل
                    </Button>
                    <Button variant="outline">
                      <FileText className="ml-1 h-3 w-3" />
                      تقرير
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* BOM Details Dialog */}
      {selectedBom && (
        <Dialog open={showBomDetails} onOpenChange={setShowBomDetails}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل قائمة المواد</DialogTitle>
              <DialogDescription>
                عرض تفاصيل قائمة المواد للمنتج {selectedBom.product}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">رقم القائمة:</div>
                  <div>{selectedBom.id}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">المنتج:</div>
                  <div>{selectedBom.product}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">الإصدار:</div>
                  <div>{selectedBom.version}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">الحالة:</div>
                  <div>
                    <Badge className={getStatusBadgeClass(selectedBom.status)}>
                      {getStatusText(selectedBom.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">تم الإنشاء بواسطة:</div>
                  <div>{selectedBom.createdBy}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">تاريخ الإنشاء:</div>
                  <div>{formatDate(selectedBom.createdAt)}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">تاريخ التحديث:</div>
                  <div>{formatDate(selectedBom.updatedAt)}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">عدد المواد:</div>
                  <div>{selectedBom.materials.length}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">قائمة المواد</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>الوحدة</TableHead>
                        <TableHead>نسبة الهدر (%)</TableHead>
                        <TableHead>ملاحظات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedBom.materials.map((material, index) => (
                        <TableRow key={index}>
                          <TableCell>{material.materialName}</TableCell>
                          <TableCell>{material.quantity}</TableCell>
                          <TableCell>{material.unit}</TableCell>
                          <TableCell>{material.wastage}%</TableCell>
                          <TableCell>{material.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Edit className="ml-1 h-3 w-3" />
                  تعديل
                </Button>
                <Button variant="outline">
                  <FilePlus className="ml-1 h-3 w-3" />
                  إنشاء نسخة جديدة
                </Button>
                <Button variant="outline">
                  <Download className="ml-1 h-3 w-3" />
                  تصدير
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Material Requirement Dialog */}
      <Dialog open={showAddRequirement} onOpenChange={setShowAddRequirement}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة متطلبات مواد جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل متطلبات المواد الجديدة
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="production-order" className="text-sm font-medium">
                أمر الإنتاج *
              </label>
              <Select>
                <SelectTrigger id="production-order">
                  <SelectValue placeholder="اختر أمر الإنتاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PO-2024-001">PO-2024-001</SelectItem>
                  <SelectItem value="PO-2024-002">PO-2024-002</SelectItem>
                  <SelectItem value="PO-2024-004">PO-2024-004</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                  <SelectItem value="بلوزة حريرية">بلوزة حريرية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="material" className="text-sm font-medium">
                المادة *
              </label>
              <Select>
                <SelectTrigger id="material">
                  <SelectValue placeholder="اختر المادة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RM-001">RM-001 - قماش قطني</SelectItem>
                  <SelectItem value="RM-002">RM-002 - قماش جينز</SelectItem>
                  <SelectItem value="RM-003">RM-003 - قماش حرير</SelectItem>
                  <SelectItem value="RM-004">RM-004 - خيوط بوليستر</SelectItem>
                  <SelectItem value="RM-005">RM-005 - خيوط قطنية</SelectItem>
                  <SelectItem value="RM-006">
                    RM-006 - أزرار بلاستيكية
                  </SelectItem>
                  <SelectItem value="RM-007">RM-007 - سحابات معدنية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                الكمية المطلوبة *
              </label>
              <Input
                id="quantity"
                type="number"
                placeholder="أدخل الكمية المطلوبة"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                الوحدة *
              </label>
              <Select>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="متر">متر</SelectItem>
                  <SelectItem value="بكرة">بكرة</SelectItem>
                  <SelectItem value="قطعة">قطعة</SelectItem>
                  <SelectItem value="كجم">كجم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="due-date" className="text-sm font-medium">
                تاريخ الاستحقاق *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    <span>اختر تاريخ الاستحقاق</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                الحالة *
              </label>
              <Select defaultValue="pending">
                <SelectTrigger id="status">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                ملاحظات
              </label>
              <Textarea id="notes" placeholder="أدخل أي ملاحظات إضافية" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddRequirement(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleAddRequirement}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaterialRequirements;
