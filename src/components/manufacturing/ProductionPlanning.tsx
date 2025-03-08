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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ChartBarIcon,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  Edit,
  FileText,
  Filter,
  LineChart,
  Link,
  ListFilter,
  Loader,
  Package,
  PieChart,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Share,
  ShoppingCart,
  Sliders,
  Trash,
  Truck,
  Upload,
  Users,
  AlertCircle,
  BarChart,
  BarChart2,
  BarChart3,
  BarChart4,
  Bell,
  Calendar as CalendarIcon2,
  CheckSquare,
  ChevronUp,
  Copy,
  CreditCard,
  Database,
  DollarSign,
  Eye,
  EyeOff,
  FileBarChart,
  FileText2,
  Flag,
  Folder,
  FolderPlus,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Globe,
  Grid,
  HardDrive,
  Hash,
  Headphones,
  Heart,
  HelpCircle,
  Home,
  Image,
  Inbox,
  Info,
  Layers,
  Layout,
  LifeBuoy,
  List,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Map,
  MapPin,
  Maximize,
  Minimize,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  MousePointer,
  Move,
  Music,
  Navigation,
  Paperclip,
  Pause,
  Percent,
  Phone,
  Play,
  PlusCircle,
  PlusSquare,
  Pocket,
  Power,
  Printer,
  Radio,
  Repeat,
  RotateCcw,
  RotateCw,
  Rss,
  Scissors,
  Send,
  Server,
  Shield,
  ShieldOff,
  ShoppingBag,
  Shuffle,
  Sidebar,
  SkipBack,
  SkipForward,
  Slack,
  Slash,
  Smartphone,
  Speaker,
  Square,
  Star,
  StopCircle,
  Sun,
  Sunrise,
  Sunset,
  Tablet,
  Tag,
  Target,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  ToggleLeft,
  ToggleRight,
  Tool,
  Trash2,
  TrendingDown,
  TrendingUp,
  Triangle,
  Tv,
  Twitter,
  Type,
  Umbrella,
  Underline,
  Unlock,
  UploadCloud,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  UserX,
  Video,
  VideoOff,
  Voicemail,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Watch,
  Wifi,
  WifiOff,
  Wind,
  X,
  XCircle,
  XOctagon,
  XSquare,
  Youtube,
  Zap,
  ZapOff,
  ZoomIn,
  ZoomOut,
  Factory,
  Hammer,
  Cog,
  Wrench,
  Clipboard,
  Boxes,
  Box,
  Forklift,
  Conveyor,
  Warehouse,
  Recycle,
  Thermometer,
  Microscope,
  Beaker,
  Ruler,
  Scale,
  Droplet,
  Atom,
  Molecule,
  Dna,
  Virus,
  Bacteria,
  Pill,
  Capsule,
  Syringe,
  Vial,
  Flask,
  TestTube,
  Pipette,
  Centrifuge,
  Microscope2,
  Spectroscope,
  Chromatography,
  Distillation,
  Filtration,
  Extraction,
  Crystallization,
  Precipitation,
  Titration,
  Electrolysis,
  Fermentation,
  Polymerization,
  Catalysis,
  Oxidation,
  Reduction,
  Hydrolysis,
  Dehydration,
  Condensation,
  Substitution,
  Addition,
  Elimination,
  Rearrangement,
  Isomerization,
  Cyclization,
  Decyclization,
  Hydrogenation,
  Dehydrogenation,
  Halogenation,
  Dehalogenation,
  Nitration,
  Sulfonation,
  Amination,
  Diazotization,
  Esterification,
  Saponification,
  Alkylation,
  Acylation,
  Glycosylation,
  Phosphorylation,
  Methylation,
  Acetylation,
  Deacetylation,
  Demethylation,
  Dephosphorylation,
  Deglycosylation,
  Dealkylation,
  Deacylation,
  Gauge,
  Timer,
  AlertTriangle,
  Hourglass,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Activity,
  Workflow,
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
import {
  format,
  addDays,
  addMonths,
  isBefore,
  isAfter,
  parseISO,
} from "date-fns";
import { ar } from "date-fns/locale";

// Sample production plans data
const productionPlansData = [
  {
    id: "PP-2024-001",
    name: "خطة إنتاج الربع الثالث",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    status: "active",
    progress: 35,
    totalOrders: 12,
    completedOrders: 4,
    totalUnits: 3500,
    completedUnits: 1200,
    createdBy: "أحمد محمد",
    createdAt: "2024-06-15",
  },
  {
    id: "PP-2024-002",
    name: "خطة إنتاج الملابس الشتوية",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    status: "planned",
    progress: 0,
    totalOrders: 8,
    completedOrders: 0,
    totalUnits: 2500,
    completedUnits: 0,
    createdBy: "سارة أحمد",
    createdAt: "2024-06-20",
  },
  {
    id: "PP-2024-003",
    name: "خطة إنتاج الملابس الصيفية",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    status: "completed",
    progress: 100,
    totalOrders: 15,
    completedOrders: 15,
    totalUnits: 4200,
    completedUnits: 4200,
    createdBy: "محمد علي",
    createdAt: "2024-01-10",
  },
  {
    id: "PP-2024-004",
    name: "خطة إنتاج ملابس العيد",
    startDate: "2024-04-01",
    endDate: "2024-06-15",
    status: "completed",
    progress: 100,
    totalOrders: 10,
    completedOrders: 10,
    totalUnits: 3000,
    completedUnits: 3000,
    createdBy: "فاطمة حسن",
    createdAt: "2024-03-05",
  },
  {
    id: "PP-2024-005",
    name: "خطة إنتاج الربع الرابع",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    status: "draft",
    progress: 0,
    totalOrders: 0,
    completedOrders: 0,
    totalUnits: 0,
    completedUnits: 0,
    createdBy: "خالد عبدالله",
    createdAt: "2024-07-20",
  },
];

// Sample demand forecast data
const demandForecastData = [
  {
    product: "قميص قطني",
    jan: 300,
    feb: 320,
    mar: 350,
    apr: 380,
    may: 400,
    jun: 450,
    jul: 500,
    aug: 520,
    sep: 480,
    oct: 420,
    nov: 380,
    dec: 350,
  },
  {
    product: "بنطلون جينز",
    jan: 200,
    feb: 210,
    mar: 230,
    apr: 250,
    may: 270,
    jun: 300,
    jul: 320,
    aug: 330,
    sep: 310,
    oct: 280,
    nov: 250,
    dec: 230,
  },
  {
    product: "فستان صيفي",
    jan: 100,
    feb: 120,
    mar: 150,
    apr: 200,
    may: 250,
    jun: 300,
    jul: 320,
    aug: 300,
    sep: 250,
    oct: 180,
    nov: 120,
    dec: 100,
  },
  {
    product: "بلوزة حريرية",
    jan: 150,
    feb: 160,
    mar: 180,
    apr: 200,
    may: 220,
    jun: 240,
    jul: 250,
    aug: 240,
    sep: 220,
    oct: 200,
    nov: 180,
    dec: 160,
  },
  {
    product: "جاكيت شتوي",
    jan: 250,
    feb: 220,
    mar: 180,
    apr: 120,
    may: 80,
    jun: 50,
    jul: 30,
    aug: 50,
    sep: 100,
    oct: 180,
    nov: 250,
    dec: 300,
  },
];

// Sample scheduled operations data
const scheduledOperationsData = [
  {
    id: "OP-2024-001",
    name: "قص القماش القطني",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    workCenter: "قسم القص",
    startDate: "2024-08-01",
    endDate: "2024-08-02",
    status: "completed",
    progress: 100,
    assignedTo: "فريق القص أ",
    priority: "عالية",
  },
  {
    id: "OP-2024-002",
    name: "خياطة القميص القطني",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    workCenter: "قسم الخياطة",
    startDate: "2024-08-03",
    endDate: "2024-08-06",
    status: "in-progress",
    progress: 65,
    assignedTo: "فريق الخياطة ب",
    priority: "عالية",
  },
  {
    id: "OP-2024-003",
    name: "تطريز القميص القطني",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    workCenter: "قسم التطريز",
    startDate: "2024-08-07",
    endDate: "2024-08-08",
    status: "planned",
    progress: 0,
    assignedTo: "فريق التطريز أ",
    priority: "عالية",
  },
  {
    id: "OP-2024-004",
    name: "كي القميص القطني",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    workCenter: "قسم الكي",
    startDate: "2024-08-09",
    endDate: "2024-08-10",
    status: "planned",
    progress: 0,
    assignedTo: "فريق الكي أ",
    priority: "عالية",
  },
  {
    id: "OP-2024-005",
    name: "تعبئة القميص القطني",
    productionOrder: "PO-2024-001",
    product: "قميص قطني",
    workCenter: "قسم التعبئة",
    startDate: "2024-08-11",
    endDate: "2024-08-12",
    status: "planned",
    progress: 0,
    assignedTo: "فريق التعبئة ب",
    priority: "عالية",
  },
  {
    id: "OP-2024-006",
    name: "قص قماش الجينز",
    productionOrder: "PO-2024-002",
    product: "بنطلون جينز",
    workCenter: "قسم القص",
    startDate: "2024-08-05",
    endDate: "2024-08-06",
    status: "planned",
    progress: 0,
    assignedTo: "فريق القص ب",
    priority: "متوسطة",
  },
  {
    id: "OP-2024-007",
    name: "خياطة بنطلون الجينز",
    productionOrder: "PO-2024-002",
    product: "بنطلون جينز",
    workCenter: "قسم الخياطة",
    startDate: "2024-08-07",
    endDate: "2024-08-10",
    status: "planned",
    progress: 0,
    assignedTo: "فريق الخياطة أ",
    priority: "متوسطة",
  },
];

// Sample material requirements data
const materialRequirementsData = [
  {
    id: "MRP-2024-001",
    material: "قماش قطني",
    requiredQuantity: 2500,
    availableQuantity: 800,
    shortageQuantity: 1700,
    suggestedPurchase: 2000,
    requiredDate: "2024-07-25",
    status: "shortage",
    supplier: "مصنع النسيج المتحد",
    leadTime: 7,
  },
  {
    id: "MRP-2024-002",
    material: "قماش جينز",
    requiredQuantity: 1800,
    availableQuantity: 1200,
    shortageQuantity: 600,
    suggestedPurchase: 1000,
    requiredDate: "2024-07-28",
    status: "shortage",
    supplier: "شركة الأقمشة العالمية",
    leadTime: 10,
  },
  {
    id: "MRP-2024-003",
    material: "خيوط بوليستر",
    requiredQuantity: 200,
    availableQuantity: 50,
    shortageQuantity: 150,
    suggestedPurchase: 200,
    requiredDate: "2024-07-30",
    status: "critical",
    supplier: "مصنع الخيوط الحديثة",
    leadTime: 5,
  },
  {
    id: "MRP-2024-004",
    material: "أزرار بلاستيكية",
    requiredQuantity: 5000,
    availableQuantity: 6000,
    shortageQuantity: 0,
    suggestedPurchase: 0,
    requiredDate: "2024-08-05",
    status: "sufficient",
    supplier: "شركة الإكسسوارات الأولى",
    leadTime: 3,
  },
  {
    id: "MRP-2024-005",
    material: "سحابات معدنية",
    requiredQuantity: 1000,
    availableQuantity: 400,
    shortageQuantity: 600,
    suggestedPurchase: 800,
    requiredDate: "2024-08-02",
    status: "shortage",
    supplier: "مصنع المستلزمات المعدنية",
    leadTime: 6,
  },
];

// Sample monthly production data for charts
const monthlyProductionData = [
  { month: "يناير", الإنتاج: 2800, الطلب: 2700 },
  { month: "فبراير", الإنتاج: 3000, الطلب: 2900 },
  { month: "مارس", الإنتاج: 3200, الطلب: 3100 },
  { month: "أبريل", الإنتاج: 3400, الطلب: 3300 },
  { month: "مايو", الإنتاج: 3600, الطلب: 3500 },
  { month: "يونيو", الإنتاج: 3800, الطلب: 3700 },
  { month: "يوليو", الإنتاج: 4000, الطلب: 3900 },
  { month: "أغسطس", الإنتاج: 4200, الطلب: 4100 },
  { month: "سبتمبر", الإنتاج: 4000, الطلب: 3900 },
  { month: "أكتوبر", الإنتاج: 3800, الطلب: 3700 },
  { month: "نوفمبر", الإنتاج: 3600, الطلب: 3500 },
  { month: "ديسمبر", الإنتاج: 3400, الطلب: 3300 },
];

// Sample product mix data for pie chart
const productMixData = [
  { name: "قميص قطني", value: 35 },
  { name: "بنطلون جينز", value: 25 },
  { name: "فستان صيفي", value: 15 },
  { name: "بلوزة حريرية", value: 10 },
  { name: "جاكيت شتوي", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ProductionPlanning = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showAddOperation, setShowAddOperation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Filter production plans based on search and filters
  const filteredPlans = productionPlansData.filter((plan) => {
    const matchesSearch = plan.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "planned":
        return "مخططة";
      case "completed":
        return "مكتملة";
      case "draft":
        return "مسودة";
      default:
        return status;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Handle create purchase requisition
  const handleCreatePurchaseRequisition = (material) => {
    toast({
      title: "تم إنشاء طلب الشراء",
      description: `تم إنشاء طلب شراء للمادة: ${material.material} بكمية ${material.suggestedPurchase}`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="plans">
            <ClipboardList className="h-4 w-4 ml-2" />
            خطط الإنتاج
          </TabsTrigger>
          <TabsTrigger value="forecast">
            <LineChart className="h-4 w-4 ml-2" />
            توقعات الطلب
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 ml-2" />
            جدولة العمليات
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Package className="h-4 w-4 ml-2" />
            متطلبات المواد
          </TabsTrigger>
        </TabsList>

        {/* Production Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن خطة إنتاج..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={() => setShowAddPlan(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إنشاء خطة جديدة
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <div
                  className={`h-1 ${plan.status === "active" ? "bg-green-500" : plan.status === "planned" ? "bg-blue-500" : plan.status === "completed" ? "bg-purple-500" : "bg-gray-500"}`}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge className={getStatusBadgeClass(plan.status)}>
                      {getStatusText(plan.status)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">التقدم:</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          أوامر الإنتاج:
                        </span>
                        <div className="font-medium">
                          {plan.completedOrders}/{plan.totalOrders}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الوحدات:</span>
                        <div className="font-medium">
                          {plan.completedUnits}/{plan.totalUnits}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePlanSelect(plan)}
                      >
                        <Eye className="ml-1 h-3 w-3" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="ml-1 h-3 w-3" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Production Plan Summary */}
          {selectedPlan && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      {selectedPlan.name}
                    </CardTitle>
                    <CardDescription>
                      {formatDate(selectedPlan.startDate)} -{" "}
                      {formatDate(selectedPlan.endDate)}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusBadgeClass(selectedPlan.status)}>
                    {getStatusText(selectedPlan.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">تفاصيل الخطة</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            الحالة
                          </p>
                          <p className="font-medium">
                            {getStatusText(selectedPlan.status)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            التقدم
                          </p>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={selectedPlan.progress}
                              className="h-2 w-24"
                            />
                            <span>{selectedPlan.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            أوامر الإنتاج
                          </p>
                          <p className="font-medium">
                            {selectedPlan.completedOrders}/
                            {selectedPlan.totalOrders}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            الوحدات المنتجة
                          </p>
                          <p className="font-medium">
                            {selectedPlan.completedUnits}/
                            {selectedPlan.totalUnits}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            تم الإنشاء بواسطة
                          </p>
                          <p className="font-medium">
                            {selectedPlan.createdBy}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            تاريخ الإنشاء
                          </p>
                          <p className="font-medium">
                            {formatDate(selectedPlan.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">الإجراءات</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="ml-1 h-3 w-3" />
                            تعديل الخطة
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="ml-1 h-3 w-3" />
                            إضافة أمر إنتاج
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="ml-1 h-3 w-3" />
                            تصدير
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">تقدم الخطة</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          {
                            name: "أوامر الإنتاج",
                            المكتمل: selectedPlan.completedOrders,
                            المتبقي:
                              selectedPlan.totalOrders -
                              selectedPlan.completedOrders,
                          },
                          {
                            name: "الوحدات المنتجة",
                            المكتمل: selectedPlan.completedUnits,
                            المتبقي:
                              selectedPlan.totalUnits -
                              selectedPlan.completedUnits,
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar
                          dataKey="المكتمل"
                          stackId="a"
                          fill="#8884d8"
                          name="مكتمل"
                        />
                        <Bar
                          dataKey="المتبقي"
                          stackId="a"
                          fill="#82ca9d"
                          name="متبقي"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Demand Forecast Tab */}
        <TabsContent value="forecast" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المنتجات</SelectItem>
                  {demandForecastData.map((item, index) => (
                    <SelectItem key={index} value={item.product}>
                      {item.product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="ml-2 h-4 w-4" />
                تحديث التوقعات
              </Button>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إضافة توقع جديد
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                توقعات الطلب الشهرية
              </CardTitle>
              <CardDescription>
                توقعات الطلب على المنتجات للعام الحالي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>يناير</TableHead>
                      <TableHead>فبراير</TableHead>
                      <TableHead>مارس</TableHead>
                      <TableHead>أبريل</TableHead>
                      <TableHead>مايو</TableHead>
                      <TableHead>يونيو</TableHead>
                      <TableHead>يوليو</TableHead>
                      <TableHead>أغسطس</TableHead>
                      <TableHead>سبتمبر</TableHead>
                      <TableHead>أكتوبر</TableHead>
                      <TableHead>نوفمبر</TableHead>
                      <TableHead>ديسمبر</TableHead>
                      <TableHead>الإجمالي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandForecastData
                      .filter(
                        (item) =>
                          selectedProduct === "all" ||
                          item.product === selectedProduct,
                      )
                      .map((item, index) => {
                        const total =
                          item.jan +
                          item.feb +
                          item.mar +
                          item.apr +
                          item.may +
                          item.jun +
                          item.jul +
                          item.aug +
                          item.sep +
                          item.oct +
                          item.nov +
                          item.dec;
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.product}
                            </TableCell>
                            <TableCell>{item.jan}</TableCell>
                            <TableCell>{item.feb}</TableCell>
                            <TableCell>{item.mar}</TableCell>
                            <TableCell>{item.apr}</TableCell>
                            <TableCell>{item.may}</TableCell>
                            <TableCell>{item.jun}</TableCell>
                            <TableCell>{item.jul}</TableCell>
                            <TableCell>{item.aug}</TableCell>
                            <TableCell>{item.sep}</TableCell>
                            <TableCell>{item.oct}</TableCell>
                            <TableCell>{item.nov}</TableCell>
                            <TableCell>{item.dec}</TableCell>
                            <TableCell className="font-bold">{total}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  مخطط توقعات الطلب
                </CardTitle>
                <CardDescription>
                  عرض بياني لتوقعات الطلب على مدار العام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      type="category"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    {demandForecastData
                      .filter(
                        (item) =>
                          selectedProduct === "all" ||
                          item.product === selectedProduct,
                      )
                      .map((item, index) => (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey="value"
                          data={[
                            { name: "يناير", value: item.jan },
                            { name: "فبراير", value: item.feb },
                            { name: "مارس", value: item.mar },
                            { name: "أبريل", value: item.apr },
                            { name: "مايو", value: item.may },
                            { name: "يونيو", value: item.jun },
                            { name: "يوليو", value: item.jul },
                            { name: "أغسطس", value: item.aug },
                            { name: "سبتمبر", value: item.sep },
                            { name: "أكتوبر", value: item.oct },
                            { name: "نوفمبر", value: item.nov },
                            { name: "ديسمبر", value: item.dec },
                          ]}
                          name={item.product}
                          stroke={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  مقارنة الإنتاج والطلب
                </CardTitle>
                <CardDescription>
                  مقارنة بين الإنتاج المخطط والطلب المتوقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyProductionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="الإنتاج" fill="#8884d8" />
                    <Bar dataKey="الطلب" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                توزيع المنتجات
              </CardTitle>
              <CardDescription>
                نسبة كل منتج من إجمالي الإنتاج المخطط
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-md">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={productMixData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productMixData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن عملية..." className="pr-9" />
              </div>

              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="مركز العمل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المراكز</SelectItem>
                    <SelectItem value="قسم القص">قسم القص</SelectItem>
                    <SelectItem value="قسم الخياطة">قسم الخياطة</SelectItem>
                    <SelectItem value="قسم التطريز">قسم التطريز</SelectItem>
                    <SelectItem value="قسم الكي">قسم الكي</SelectItem>
                    <SelectItem value="قسم التعبئة">قسم التعبئة</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="planned">مخططة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={() => setShowAddOperation(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة عملية
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                جدول العمليات
              </CardTitle>
              <CardDescription>
                جدولة العمليات الإنتاجية وتتبع حالتها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم العملية</TableHead>
                      <TableHead>اسم العملية</TableHead>
                      <TableHead>أمر الإنتاج</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>مركز العمل</TableHead>
                      <TableHead>تاريخ البدء</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التقدم</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledOperationsData.map((operation) => (
                      <TableRow key={operation.id}>
                        <TableCell className="font-medium">
                          {operation.id}
                        </TableCell>
                        <TableCell>{operation.name}</TableCell>
                        <TableCell>{operation.productionOrder}</TableCell>
                        <TableCell>{operation.product}</TableCell>
                        <TableCell>{operation.workCenter}</TableCell>
                        <TableCell>{formatDate(operation.startDate)}</TableCell>
                        <TableCell>{formatDate(operation.endDate)}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              operation.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : operation.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {operation.status === "completed"
                              ? "مكتملة"
                              : operation.status === "in-progress"
                                ? "قيد التنفيذ"
                                : "مخططة"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={operation.progress}
                              className="h-2 w-24"
                            />
                            <span className="text-xs">
                              {operation.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
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

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                مخطط جانت للعمليات
              </CardTitle>
              <CardDescription>
                عرض مرئي لجدولة العمليات على مدار الوقت
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 h-[400px] bg-gray-50 overflow-x-auto">
                <div className="min-w-[800px] h-full">
                  {/* Simplified Gantt Chart Visualization */}
                  <div className="flex h-10 border-b">
                    <div className="w-40 flex-shrink-0 border-r p-2 font-medium">
                      العملية
                    </div>
                    {Array.from({ length: 15 }, (_, i) => (
                      <div
                        key={i}
                        className="w-20 flex-shrink-0 border-r p-2 text-center text-xs"
                      >
                        {format(addDays(new Date("2024-08-01"), i), "dd MMM", {
                          locale: ar,
                        })}
                      </div>
                    ))}
                  </div>

                  {scheduledOperationsData.map((operation, index) => {
                    const startDate = new Date(operation.startDate);
                    const endDate = new Date(operation.endDate);
                    const startDay = Math.floor(
                      (startDate - new Date("2024-08-01")) /
                        (24 * 60 * 60 * 1000),
                    );
                    const duration =
                      Math.floor(
                        (endDate - startDate) / (24 * 60 * 60 * 1000),
                      ) + 1;

                    return (
                      <div
                        key={operation.id}
                        className="flex h-12 border-b hover:bg-gray-100"
                      >
                        <div className="w-40 flex-shrink-0 border-r p-2 flex items-center">
                          <span className="text-sm truncate">
                            {operation.name}
                          </span>
                        </div>
                        <div className="flex-grow relative">
                          <div
                            className={`absolute h-8 top-2 rounded-md flex items-center justify-center text-xs text-white font-medium ${
                              operation.status === "completed"
                                ? "bg-green-500"
                                : operation.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                            style={{
                              left: `${startDay * 80}px`,
                              width: `${duration * 80 - 4}px`,
                            }}
                          >
                            {operation.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Material Requirements Tab */}
        <TabsContent value="materials" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن مادة..." className="pr-9" />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="sufficient">متوفر</SelectItem>
                  <SelectItem value="shortage">نقص</SelectItem>
                  <SelectItem value="critical">حرج</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>
              <Truck className="ml-2 h-4 w-4" />
              إنشاء طلبات الشراء
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                متطلبات المواد
              </CardTitle>
              <CardDescription>
                تخطيط احتياجات المواد بناءً على خطط الإنتاج
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المادة</TableHead>
                      <TableHead>الكمية المطلوبة</TableHead>
                      <TableHead>الكمية المتوفرة</TableHead>
                      <TableHead>النقص</TableHead>
                      <TableHead>الشراء المقترح</TableHead>
                      <TableHead>تاريخ الطلب</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>مدة التوريد</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materialRequirementsData.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          {material.material}
                        </TableCell>
                        <TableCell>{material.requiredQuantity}</TableCell>
                        <TableCell>{material.availableQuantity}</TableCell>
                        <TableCell>{material.shortageQuantity}</TableCell>
                        <TableCell>{material.suggestedPurchase}</TableCell>
                        <TableCell>
                          {formatDate(material.requiredDate)}
                        </TableCell>
                        <TableCell>{material.supplier}</TableCell>
                        <TableCell>{material.leadTime} أيام</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              material.status === "sufficient"
                                ? "bg-green-100 text-green-800"
                                : material.status === "shortage"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {material.status === "sufficient"
                              ? "متوفر"
                              : material.status === "shortage"
                                ? "نقص"
                                : "حرج"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {material.status !== "sufficient" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleCreatePurchaseRequisition(material)
                              }
                            >
                              <Truck className="ml-1 h-3 w-3" />
                              طلب شراء
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  حالة المخزون
                </CardTitle>
                <CardDescription>
                  مقارنة بين الكميات المطلوبة والمتوفرة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={materialRequirementsData.map((item) => ({
                      name: item.material,
                      المطلوب: item.requiredQuantity,
                      المتوفر: item.availableQuantity,
                      قيد_الطلب: item.onOrder,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="المطلوب" fill="#8884d8" />
                    <Bar dataKey="المتوفر" fill="#82ca9d" />
                    <Bar dataKey="قيد_الطلب" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  جدول التوريد
                </CardTitle>
                <CardDescription>
                  جدول زمني لوصول المواد المطلوبة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 h-[300px] bg-gray-50 overflow-x-auto">
                  <div className="min-w-[800px] h-full">
                    {/* Simplified Supply Timeline */}
                    <div className="flex h-10 border-b">
                      <div className="w-40 flex-shrink-0 border-r p-2 font-medium">
                        المادة
                      </div>
                      {Array.from({ length: 15 }, (_, i) => (
                        <div
                          key={i}
                          className="w-20 flex-shrink-0 border-r p-2 text-center text-xs"
                        >
                          {format(addDays(new Date(), i), "dd MMM", {
                            locale: ar,
                          })}
                        </div>
                      ))}
                    </div>

                    {materialRequirementsData
                      .filter((material) => material.status !== "sufficient")
                      .map((material, index) => {
                        const requiredDate = new Date(material.requiredDate);
                        const leadTime = material.leadTime;
                        const orderDate = new Date(requiredDate);
                        orderDate.setDate(orderDate.getDate() - leadTime);

                        const today = new Date();
                        const startDay = Math.max(
                          0,
                          Math.floor(
                            (orderDate - today) / (24 * 60 * 60 * 1000),
                          ),
                        );

                        return (
                          <div
                            key={material.id}
                            className="flex h-12 border-b hover:bg-gray-100"
                          >
                            <div className="w-40 flex-shrink-0 border-r p-2 flex items-center">
                              <span className="text-sm truncate">
                                {material.material}
                              </span>
                            </div>
                            <div className="flex-grow relative">
                              <div
                                className="absolute h-8 top-2 bg-blue-500 rounded-md flex items-center justify-center text-xs text-white font-medium"
                                style={{
                                  left: `${startDay * 80}px`,
                                  width: `${leadTime * 80 - 4}px`,
                                }}
                              >
                                مدة التوريد: {leadTime} أيام
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Production Plan Dialog */}
      <Dialog open={showAddPlan} onOpenChange={setShowAddPlan}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء خطة إنتاج جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل خطة الإنتاج الجديدة
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-name" className="text-right">
                اسم الخطة
              </Label>
              <Input
                id="plan-name"
                placeholder="اسم خطة الإنتاج"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                تاريخ البدء
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-start text-right font-normal"
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                تاريخ الانتهاء
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-start text-right font-normal"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    <span>اختر تاريخ الانتهاء</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-status" className="text-right">
                الحالة
              </Label>
              <Select defaultValue="draft">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="planned">مخططة</SelectItem>
                  <SelectItem value="active">نشطة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan-description" className="text-right">
                الوصف
              </Label>
              <Textarea
                id="plan-description"
                placeholder="وصف خطة الإنتاج"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlan(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setShowAddPlan(false)}>إنشاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Operation Dialog */}
      <Dialog open={showAddOperation} onOpenChange={setShowAddOperation}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عملية جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل العملية الإنتاجية الجديدة
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="operation-name" className="text-right">
                اسم العملية
              </Label>
              <Input
                id="operation-name"
                placeholder="اسم العملية"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="production-order" className="text-right">
                أمر الإنتاج
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر أمر الإنتاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PO-2024-001">
                    PO-2024-001 - قميص قطني
                  </SelectItem>
                  <SelectItem value="PO-2024-002">
                    PO-2024-002 - بنطلون جينز
                  </SelectItem>
                  <SelectItem value="PO-2024-003">
                    PO-2024-003 - فستان صيفي
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="work-center" className="text-right">
                مركز العمل
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر مركز العمل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قسم القص">قسم القص</SelectItem>
                  <SelectItem value="قسم الخياطة">قسم الخياطة</SelectItem>
                  <SelectItem value="قسم التطريز">قسم التطريز</SelectItem>
                  <SelectItem value="قسم الكي">قسم الكي</SelectItem>
                  <SelectItem value="قسم التعبئة">قسم التعبئة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                تاريخ البدء
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-start text-right font-normal"
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                تاريخ الانتهاء
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="col-span-3 justify-start text-right font-normal"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    <span>اختر تاريخ الانتهاء</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assigned-to" className="text-right">
                تعيين إلى
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الفريق" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فريق القص أ">فريق القص أ</SelectItem>
                  <SelectItem value="فريق القص ب">فريق القص ب</SelectItem>
                  <SelectItem value="فريق الخياطة أ">فريق الخياطة أ</SelectItem>
                  <SelectItem value="فريق الخياطة ب">فريق الخياطة ب</SelectItem>
                  <SelectItem value="فريق التطريز أ">فريق التطريز أ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                الأولوية
              </Label>
              <Select defaultValue="متوسطة">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عالية">عالية</SelectItem>
                  <SelectItem value="متوسطة">متوسطة</SelectItem>
                  <SelectItem value="منخفضة">منخفضة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddOperation(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setShowAddOperation(false)}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductionPlanning;
