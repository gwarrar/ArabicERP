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

// Sample work centers data
const workCentersData = [
  {
    id: "WC-001",
    name: "قسم القص",
    capacity: 500,
    currentLoad: 350,
    efficiency: 85,
    status: "active",
    operators: 5,
    machines: 3,
    supervisor: "أحمد محمد",
    location: "الطابق الأول - المبنى الرئيسي",
    description:
      "قسم متخصص في قص الأقمشة بمختلف أنواعها وفقاً للمواصفات المطلوبة",
    maintenanceSchedule: "كل أسبوعين",
    lastMaintenance: "2024-07-15",
    nextMaintenance: "2024-07-29",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 2,
    completedOrders: 45,
    createdAt: "2023-01-10",
  },
  {
    id: "WC-002",
    name: "قسم الخياطة",
    capacity: 800,
    currentLoad: 720,
    efficiency: 92,
    status: "active",
    operators: 12,
    machines: 8,
    supervisor: "سارة أحمد",
    location: "الطابق الأول - المبنى الرئيسي",
    description:
      "قسم متخصص في خياطة القطع المقصوصة وتجميعها وفقاً للتصاميم المعتمدة",
    maintenanceSchedule: "أسبوعياً",
    lastMaintenance: "2024-07-20",
    nextMaintenance: "2024-07-27",
    workingHours: "8:00 - 16:00",
    shifts: 2,
    activeOrders: 3,
    completedOrders: 78,
    createdAt: "2023-01-10",
  },
  {
    id: "WC-003",
    name: "قسم التطريز",
    capacity: 300,
    currentLoad: 150,
    efficiency: 78,
    status: "active",
    operators: 4,
    machines: 2,
    supervisor: "محمد علي",
    location: "الطابق الثاني - المبنى الرئيسي",
    description: "قسم متخصص في تطريز القطع المخيطة وفقاً للتصاميم المعتمدة",
    maintenanceSchedule: "كل أسبوعين",
    lastMaintenance: "2024-07-18",
    nextMaintenance: "2024-08-01",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 1,
    completedOrders: 32,
    createdAt: "2023-02-15",
  },
  {
    id: "WC-004",
    name: "قسم الكي",
    capacity: 600,
    currentLoad: 480,
    efficiency: 88,
    status: "active",
    operators: 6,
    machines: 4,
    supervisor: "فاطمة حسن",
    location: "الطابق الثاني - المبنى الرئيسي",
    description: "قسم متخصص في كي القطع المنتهية وتجهيزها للتعبئة",
    maintenanceSchedule: "شهرياً",
    lastMaintenance: "2024-07-05",
    nextMaintenance: "2024-08-05",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 2,
    completedOrders: 56,
    createdAt: "2023-02-20",
  },
  {
    id: "WC-005",
    name: "قسم التعبئة",
    capacity: 1000,
    currentLoad: 600,
    efficiency: 90,
    status: "active",
    operators: 8,
    machines: 2,
    supervisor: "خالد عبدالله",
    location: "الطابق الثاني - المبنى الرئيسي",
    description: "قسم متخصص في تعبئة المنتجات النهائية وتجهيزها للشحن",
    maintenanceSchedule: "كل شهرين",
    lastMaintenance: "2024-06-15",
    nextMaintenance: "2024-08-15",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 1,
    completedOrders: 67,
    createdAt: "2023-03-01",
  },
  {
    id: "WC-006",
    name: "قسم الطباعة",
    capacity: 400,
    currentLoad: 200,
    efficiency: 82,
    status: "maintenance",
    operators: 3,
    machines: 2,
    supervisor: "عمر يوسف",
    location: "الطابق الثالث - المبنى الرئيسي",
    description: "قسم متخصص في طباعة التصاميم على القطع المخيطة",
    maintenanceSchedule: "شهرياً",
    lastMaintenance: "2024-07-22",
    nextMaintenance: "2024-08-22",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 0,
    completedOrders: 28,
    createdAt: "2023-05-10",
  },
  {
    id: "WC-007",
    name: "قسم الفحص والجودة",
    capacity: 700,
    currentLoad: 350,
    efficiency: 95,
    status: "active",
    operators: 7,
    machines: 1,
    supervisor: "ليلى محمود",
    location: "الطابق الثالث - المبنى الرئيسي",
    description: "قسم متخصص في فحص جودة المنتجات النهائية قبل التعبئة",
    maintenanceSchedule: "كل ثلاثة أشهر",
    lastMaintenance: "2024-05-15",
    nextMaintenance: "2024-08-15",
    workingHours: "8:00 - 16:00",
    shifts: 1,
    activeOrders: 2,
    completedOrders: 89,
    createdAt: "2023-06-01",
  },
];

// Sample machines data
const machinesData = [
  {
    id: "M-001",
    name: "ماكينة قص أوتوماتيكية",
    model: "CUT-2000",
    manufacturer: "شركة المعدات الصناعية",
    workCenter: "قسم القص",
    status: "active",
    efficiency: 90,
    maintenanceSchedule: "شهرياً",
    lastMaintenance: "2024-07-10",
    nextMaintenance: "2024-08-10",
    purchaseDate: "2022-05-15",
    warrantyEnd: "2025-05-15",
    operatingHours: 2500,
    maxCapacity: 200,
    currentLoad: 150,
  },
  {
    id: "M-002",
    name: "ماكينة خياطة صناعية",
    model: "SEW-5000",
    manufacturer: "شركة معدات الخياطة العالمية",
    workCenter: "قسم الخياطة",
    status: "active",
    efficiency: 95,
    maintenanceSchedule: "أسبوعياً",
    lastMaintenance: "2024-07-18",
    nextMaintenance: "2024-07-25",
    purchaseDate: "2022-06-20",
    warrantyEnd: "2025-06-20",
    operatingHours: 3200,
    maxCapacity: 100,
    currentLoad: 90,
  },
  {
    id: "M-003",
    name: "ماكينة تطريز متعددة الرؤوس",
    model: "EMB-800",
    manufacturer: "شركة معدات التطريز المتقدمة",
    workCenter: "قسم التطريز",
    status: "maintenance",
    efficiency: 78,
    maintenanceSchedule: "كل أسبوعين",
    lastMaintenance: "2024-07-20",
    nextMaintenance: "2024-08-03",
    purchaseDate: "2022-08-10",
    warrantyEnd: "2025-08-10",
    operatingHours: 1800,
    maxCapacity: 150,
    currentLoad: 0,
  },
  {
    id: "M-004",
    name: "ماكينة كي بخارية",
    model: "IRON-3000",
    manufacturer: "شركة معدات الكي الصناعية",
    workCenter: "قسم الكي",
    status: "active",
    efficiency: 88,
    maintenanceSchedule: "شهرياً",
    lastMaintenance: "2024-07-05",
    nextMaintenance: "2024-08-05",
    purchaseDate: "2022-09-15",
    warrantyEnd: "2025-09-15",
    operatingHours: 2100,
    maxCapacity: 180,
    currentLoad: 120,
  },
  {
    id: "M-005",
    name: "ماكينة تعبئة وتغليف",
    model: "PACK-1500",
    manufacturer: "شركة معدات التعبئة والتغليف",
    workCenter: "قسم التعبئة",
    status: "active",
    efficiency: 92,
    maintenanceSchedule: "كل شهرين",
    lastMaintenance: "2024-06-15",
    nextMaintenance: "2024-08-15",
    purchaseDate: "2022-10-20",
    warrantyEnd: "2025-10-20",
    operatingHours: 1500,
    maxCapacity: 500,
    currentLoad: 300,
  },
];

// Sample operators data
const operatorsData = [
  {
    id: "OP-001",
    name: "محمد أحمد",
    position: "مشغل ماكينة قص",
    workCenter: "قسم القص",
    shift: "صباحي",
    experience: 5,
    skills: ["قص الأقمشة", "ضبط الماكينات", "فحص الجودة"],
    efficiency: 92,
    status: "active",
    joinDate: "2020-05-10",
  },
  {
    id: "OP-002",
    name: "فاطمة علي",
    position: "مشغلة ماكينة خياطة",
    workCenter: "قسم الخياطة",
    shift: "صباحي",
    experience: 7,
    skills: ["خياطة متقدمة", "تجميع القطع", "فحص الجودة"],
    efficiency: 95,
    status: "active",
    joinDate: "2018-08-15",
  },
  {
    id: "OP-003",
    name: "أحمد محمود",
    position: "مشغل ماكينة تطريز",
    workCenter: "قسم التطريز",
    shift: "صباحي",
    experience: 4,
    skills: ["تطريز", "برمجة التصاميم", "صيانة أولية"],
    efficiency: 88,
    status: "active",
    joinDate: "2021-03-20",
  },
  {
    id: "OP-004",
    name: "سارة حسن",
    position: "مشغلة ماكينة كي",
    workCenter: "قسم الكي",
    shift: "صباحي",
    experience: 3,
    skills: ["كي", "فحص الجودة", "تجهيز للتعبئة"],
    efficiency: 90,
    status: "leave",
    joinDate: "2022-01-10",
  },
  {
    id: "OP-005",
    name: "خالد عبدالرحمن",
    position: "مشغل ماكينة تعبئة",
    workCenter: "قسم التعبئة",
    shift: "صباحي",
    experience: 2,
    skills: ["تعبئة", "تغليف", "ترتيب المخزون"],
    efficiency: 85,
    status: "active",
    joinDate: "2022-06-15",
  },
];

// Sample work center efficiency data
const workCenterEfficiencyData = [
  { name: "قسم القص", كفاءة: 85, هدف: 90 },
  { name: "قسم الخياطة", كفاءة: 92, هدف: 90 },
  { name: "قسم التطريز", كفاءة: 78, هدف: 90 },
  { name: "قسم الكي", كفاءة: 88, هدف: 90 },
  { name: "قسم التعبئة", كفاءة: 90, هدف: 90 },
  { name: "قسم الطباعة", كفاءة: 82, هدف: 90 },
  { name: "قسم الفحص والجودة", كفاءة: 95, هدف: 90 },
];

// Sample work center utilization data
const workCenterUtilizationData = [
  { name: "قسم القص", نسبة_الاستخدام: 70 },
  { name: "قسم الخياطة", نسبة_الاستخدام: 90 },
  { name: "قسم التطريز", نسبة_الاستخدام: 50 },
  { name: "قسم الكي", نسبة_الاستخدام: 80 },
  { name: "قسم التعبئة", نسبة_الاستخدام: 60 },
  { name: "قسم الطباعة", نسبة_الاستخدام: 50 },
  { name: "قسم الفحص والجودة", نسبة_الاستخدام: 50 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const WorkCenters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddWorkCenter, setShowAddWorkCenter] = useState(false);
  const [showWorkCenterDetails, setShowWorkCenterDetails] = useState(false);
  const [selectedWorkCenter, setSelectedWorkCenter] = useState(null);
  const [activeTab, setActiveTab] = useState("centers");
  const { toast } = useToast();

  // Filter work centers based on search and status
  const filteredWorkCenters = workCentersData.filter((center) => {
    const matchesSearch = center.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || center.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle work center selection for details view
  const handleWorkCenterSelect = (center) => {
    setSelectedWorkCenter(center);
    setShowWorkCenterDetails(true);
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
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "leave":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "نشط";
      case "maintenance":
        return "صيانة";
      case "inactive":
        return "غير نشط";
      case "leave":
        return "إجازة";
      default:
        return status;
    }
  };

  // Handle add new work center
  const handleAddWorkCenter = () => {
    setShowAddWorkCenter(false);
    toast({
      title: "تم إضافة مركز العمل",
      description: "تم إضافة مركز العمل الجديد بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="centers">
            <Factory className="h-4 w-4 ml-2" />
            مراكز العمل
          </TabsTrigger>
          <TabsTrigger value="machines">
            <Cog className="h-4 w-4 ml-2" />
            الآلات والمعدات
          </TabsTrigger>
          <TabsTrigger value="operators">
            <Users className="h-4 w-4 ml-2" />
            المشغلين
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 ml-2" />
            تحليل الأداء
          </TabsTrigger>
        </TabsList>

        {/* Work Centers Tab */}
        <TabsContent value="centers" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن مركز عمل..."
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
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button onClick={() => setShowAddWorkCenter(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مركز عمل
              </Button>
            </div>
          </div>

          {/* Work Centers Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    مراكز العمل
                  </CardTitle>
                  <CardDescription>
                    قائمة بمراكز العمل وحالتها الحالية
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredWorkCenters.length} مركز
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
                      <TableHead>اسم المركز</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>السعة</TableHead>
                      <TableHead>الحمل الحالي</TableHead>
                      <TableHead>الكفاءة</TableHead>
                      <TableHead>المشغلين</TableHead>
                      <TableHead>الآلات</TableHead>
                      <TableHead>المشرف</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkCenters.length > 0 ? (
                      filteredWorkCenters.map((center) => (
                        <TableRow key={center.id}>
                          <TableCell className="font-medium">
                            {center.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeClass(center.status)}
                            >
                              {getStatusText(center.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{center.capacity}</TableCell>
                          <TableCell>{center.currentLoad}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span>{center.efficiency}%</span>
                              {center.efficiency >= 85 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{center.operators}</TableCell>
                          <TableCell>{center.machines}</TableCell>
                          <TableCell>{center.supervisor}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleWorkCenterSelect(center)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
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
                            <p>لا توجد مراكز عمل تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
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
              </div>
            </CardContent>
          </Card>

          {/* Work Centers Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي مراكز العمل
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {workCentersData.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Factory className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      متوسط الكفاءة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {Math.round(
                        workCentersData.reduce(
                          (sum, center) => sum + center.efficiency,
                          0,
                        ) / workCentersData.length,
                      )}
                      %
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Gauge className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      متوسط نسبة الاستخدام
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {Math.round(
                        workCentersData.reduce(
                          (sum, center) =>
                            sum + (center.currentLoad / center.capacity) * 100,
                          0,
                        ) / workCentersData.length,
                      )}
                      %
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Activity className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Machines Tab */}
        <TabsContent value="machines" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن آلة..." className="pr-9" />
              </div>

              <Select defaultValue="all">
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

              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشطة</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="inactive">غير نشطة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Wrench className="ml-2 h-4 w-4" />
                جدولة صيانة
              </Button>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة آلة
              </Button>
            </div>
          </div>

          {/* Machines Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    الآلات والمعدات
                  </CardTitle>
                  <CardDescription>
                    قائمة بالآلات والمعدات وحالتها الحالية
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {machinesData.length} آلة
                  </Badge>
                  <Button variant="outline" size="sm">
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
                      <TableHead>اسم الآلة</TableHead>
                      <TableHead>الموديل</TableHead>
                      <TableHead>مركز العمل</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الكفاءة</TableHead>
                      <TableHead>آخر صيانة</TableHead>
                      <TableHead>الصيانة القادمة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {machinesData.map((machine) => (
                      <TableRow key={machine.id}>
                        <TableCell className="font-medium">
                          {machine.name}
                        </TableCell>
                        <TableCell>{machine.model}</TableCell>
                        <TableCell>{machine.workCenter}</TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusBadgeClass(machine.status)}
                          >
                            {getStatusText(machine.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{machine.efficiency}%</span>
                            {machine.efficiency >= 85 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDate(machine.lastMaintenance)}
                        </TableCell>
                        <TableCell>
                          {formatDate(machine.nextMaintenance)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Wrench className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن مشغل..." className="pr-9" />
              </div>

              <Select defaultValue="all">
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

              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="leave">إجازة</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <UserPlus className="ml-2 h-4 w-4" />
                تعيين مشغل
              </Button>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة مشغل
              </Button>
            </div>
          </div>

          {/* Operators Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    المشغلين
                  </CardTitle>
                  <CardDescription>
                    قائمة بالمشغلين وحالتهم الحالية
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {operatorsData.length} مشغل
                  </Badge>
                  <Button variant="outline" size="sm">
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
                      <TableHead>اسم المشغل</TableHead>
                      <TableHead>المنصب</TableHead>
                      <TableHead>مركز العمل</TableHead>
                      <TableHead>الوردية</TableHead>
                      <TableHead>الخبرة (سنوات)</TableHead>
                      <TableHead>الكفاءة</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operatorsData.map((operator) => (
                      <TableRow key={operator.id}>
                        <TableCell className="font-medium">
                          {operator.name}
                        </TableCell>
                        <TableCell>{operator.position}</TableCell>
                        <TableCell>{operator.workCenter}</TableCell>
                        <TableCell>{operator.shift}</TableCell>
                        <TableCell>{operator.experience}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{operator.efficiency}%</span>
                            {operator.efficiency >= 85 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusBadgeClass(operator.status)}
                          >
                            {getStatusText(operator.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Work Center Efficiency Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  كفاءة مراكز العمل
                </CardTitle>
                <CardDescription>
                  مقارنة كفاءة مراكز العمل مع الأهداف المحددة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workCenterEfficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar
                      dataKey="كفاءة"
                      fill="#8884d8"
                      name="الكفاءة الحالية (%)"
                    />
                    <Bar dataKey="هدف" fill="#82ca9d" name="الهدف (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Work Center Utilization Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  استخدام مراكز العمل
                </CardTitle>
                <CardDescription>نسبة استخدام كل مركز عمل</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workCenterUtilizationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar
                      dataKey="نسبة_الاستخدام"
                      fill="#8884d8"
                      name="نسبة الاستخدام (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operators Efficiency Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  كفاءة المشغلين
                </CardTitle>
                <CardDescription>
                  مقارنة كفاءة المشغلين حسب مراكز العمل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={operatorsData.map((operator) => ({
                      name: operator.name,
                      كفاءة: operator.efficiency,
                      مركز_العمل: operator.workCenter,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="كفاءة" fill="#8884d8" name="الكفاءة (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Machines Efficiency Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  كفاءة الآلات
                </CardTitle>
                <CardDescription>
                  مقارنة كفاءة الآلات حسب مراكز العمل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={machinesData.map((machine) => ({
                      name: machine.name,
                      كفاءة: machine.efficiency,
                      مركز_العمل: machine.workCenter,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="كفاءة" fill="#82ca9d" name="الكفاءة (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Work Center Dialog */}
      <Dialog open={showAddWorkCenter} onOpenChange={setShowAddWorkCenter}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مركز عمل جديد</DialogTitle>
            <DialogDescription>أدخل تفاصيل مركز العمل الجديد</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="center-name" className="text-sm font-medium">
                اسم المركز *
              </label>
              <Input id="center-name" placeholder="أدخل اسم مركز العمل" />
            </div>

            <div className="space-y-2">
              <label htmlFor="capacity" className="text-sm font-medium">
                السعة الإنتاجية *
              </label>
              <Input
                id="capacity"
                type="number"
                placeholder="أدخل السعة الإنتاجية"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="supervisor" className="text-sm font-medium">
                المشرف *
              </label>
              <Input id="supervisor" placeholder="أدخل اسم المشرف" />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                الموقع *
              </label>
              <Input id="location" placeholder="أدخل موقع مركز العمل" />
            </div>

            <div className="space-y-2">
              <label htmlFor="operators" className="text-sm font-medium">
                عدد المشغلين *
              </label>
              <Input
                id="operators"
                type="number"
                placeholder="أدخل عدد المشغلين"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="machines" className="text-sm font-medium">
                عدد الآلات *
              </label>
              <Input
                id="machines"
                type="number"
                placeholder="أدخل عدد الآلات"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="shifts" className="text-sm font-medium">
                عدد الورديات *
              </label>
              <Select defaultValue="1">
                <SelectTrigger id="shifts">
                  <SelectValue placeholder="اختر عدد الورديات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">وردية واحدة</SelectItem>
                  <SelectItem value="2">ورديتان</SelectItem>
                  <SelectItem value="3">ثلاث ورديات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="maintenance-schedule"
                className="text-sm font-medium"
              >
                جدول الصيانة *
              </label>
              <Select defaultValue="monthly">
                <SelectTrigger id="maintenance-schedule">
                  <SelectValue placeholder="اختر جدول الصيانة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">أسبوعياً</SelectItem>
                  <SelectItem value="biweekly">كل أسبوعين</SelectItem>
                  <SelectItem value="monthly">شهرياً</SelectItem>
                  <SelectItem value="quarterly">كل ثلاثة أشهر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                الوصف
              </label>
              <Textarea
                id="description"
                placeholder="أدخل وصف مركز العمل"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddWorkCenter(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleAddWorkCenter}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Work Center Details Dialog */}
      {selectedWorkCenter && (
        <Dialog
          open={showWorkCenterDetails}
          onOpenChange={setShowWorkCenterDetails}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل مركز العمل</DialogTitle>
              <DialogDescription>
                عرض تفاصيل مركز العمل {selectedWorkCenter.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات أساسية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">اسم المركز:</div>
                    <div>{selectedWorkCenter.name}</div>
                    <div className="font-medium">الحالة:</div>
                    <div>
                      <Badge
                        className={getStatusBadgeClass(
                          selectedWorkCenter.status,
                        )}
                      >
                        {getStatusText(selectedWorkCenter.status)}
                      </Badge>
                    </div>
                    <div className="font-medium">السعة الإنتاجية:</div>
                    <div>{selectedWorkCenter.capacity}</div>
                    <div className="font-medium">الحمل الحالي:</div>
                    <div>{selectedWorkCenter.currentLoad}</div>
                    <div className="font-medium">الكفاءة:</div>
                    <div>{selectedWorkCenter.efficiency}%</div>
                    <div className="font-medium">المشرف:</div>
                    <div>{selectedWorkCenter.supervisor}</div>
                    <div className="font-medium">الموقع:</div>
                    <div>{selectedWorkCenter.location}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    الموارد
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">عدد المشغلين:</div>
                    <div>{selectedWorkCenter.operators}</div>
                    <div className="font-medium">عدد الآلات:</div>
                    <div>{selectedWorkCenter.machines}</div>
                    <div className="font-medium">ساعات العمل:</div>
                    <div>{selectedWorkCenter.workingHours}</div>
                    <div className="font-medium">عدد الورديات:</div>
                    <div>{selectedWorkCenter.shifts}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    الصيانة
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">جدول الصيانة:</div>
                    <div>{selectedWorkCenter.maintenanceSchedule}</div>
                    <div className="font-medium">آخر صيانة:</div>
                    <div>{formatDate(selectedWorkCenter.lastMaintenance)}</div>
                    <div className="font-medium">الصيانة القادمة:</div>
                    <div>{formatDate(selectedWorkCenter.nextMaintenance)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    الوصف
                  </h3>
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {selectedWorkCenter.description}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    الإحصائيات
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">أوامر الإنتاج النشطة:</div>
                    <div>{selectedWorkCenter.activeOrders}</div>
                    <div className="font-medium">أوامر الإنتاج المكتملة:</div>
                    <div>{selectedWorkCenter.completedOrders}</div>
                    <div className="font-medium">نسبة الاستخدام:</div>
                    <div>
                      {Math.round(
                        (selectedWorkCenter.currentLoad /
                          selectedWorkCenter.capacity) *
                          100,
                      )}
                      %
                    </div>
                    <div className="font-medium">تاريخ الإنشاء:</div>
                    <div>{formatDate(selectedWorkCenter.createdAt)}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    نسبة الاستخدام
                  </h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>الحمل الحالي / السعة الإنتاجية</span>
                    <span>
                      {Math.round(
                        (selectedWorkCenter.currentLoad /
                          selectedWorkCenter.capacity) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.round(
                      (selectedWorkCenter.currentLoad /
                        selectedWorkCenter.capacity) *
                        100,
                    )}
                    className="h-2"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">
                      <Edit className="ml-1 h-3 w-3" />
                      تعديل
                    </Button>
                    <Button variant="outline">
                      <Wrench className="ml-1 h-3 w-3" />
                      جدولة صيانة
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
    </div>
  );
};

export default WorkCenters;
