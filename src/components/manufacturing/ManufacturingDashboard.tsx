import React from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductionPerformanceSummary from "./ProductionPerformanceSummary";
import {
  Factory,
  Hammer,
  Cog,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Users,
  Calendar,
  Search,
  Filter,
  Plus,
  Settings,
  ArrowUpDown,
  ChevronDown,
  Layers,
  Gauge,
  Percent,
  Timer,
  AlertTriangle,
  FileText,
  Boxes,
  Wrench,
  Clipboard,
  Hourglass,
  CheckCircle,
  XCircle,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  Zap,
  Activity,
  Workflow,
  Forklift,
  Warehouse,
  Conveyor,
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
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Sample production orders data
const productionOrdersData = [
  {
    id: "PO-2024-001",
    product: "قميص قطني",
    quantity: 500,
    dueDate: "2024-08-15",
    status: "in-progress",
    progress: 65,
    workCenter: "قسم الخياطة",
    priority: "عالية",
  },
  {
    id: "PO-2024-002",
    product: "بنطلون جينز",
    quantity: 300,
    dueDate: "2024-08-20",
    status: "planned",
    progress: 0,
    workCenter: "قسم القص",
    priority: "متوسطة",
  },
  {
    id: "PO-2024-003",
    product: "فستان صيفي",
    quantity: 200,
    dueDate: "2024-08-10",
    status: "completed",
    progress: 100,
    workCenter: "قسم الخياطة",
    priority: "عالية",
  },
  {
    id: "PO-2024-004",
    product: "بلوزة حريرية",
    quantity: 150,
    dueDate: "2024-08-25",
    status: "in-progress",
    progress: 30,
    workCenter: "قسم التطريز",
    priority: "منخفضة",
  },
  {
    id: "PO-2024-005",
    product: "جاكيت شتوي",
    quantity: 100,
    dueDate: "2024-09-05",
    status: "planned",
    progress: 0,
    workCenter: "قسم القص",
    priority: "متوسطة",
  },
];

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
  },
];

// Sample material requirements data
const materialRequirementsData = [
  {
    id: "MAT-001",
    name: "قماش قطني",
    required: 1500,
    available: 800,
    onOrder: 1000,
    status: "low",
    supplier: "مصنع النسيج المتحد",
    leadTime: 7,
  },
  {
    id: "MAT-002",
    name: "قماش جينز",
    required: 800,
    available: 1200,
    onOrder: 0,
    status: "ok",
    supplier: "شركة الأقمشة العالمية",
    leadTime: 10,
  },
  {
    id: "MAT-003",
    name: "خيوط بوليستر",
    required: 200,
    available: 50,
    onOrder: 200,
    status: "critical",
    supplier: "مصنع الخيوط الحديثة",
    leadTime: 5,
  },
  {
    id: "MAT-004",
    name: "أزرار بلاستيكية",
    required: 5000,
    available: 6000,
    onOrder: 0,
    status: "ok",
    supplier: "شركة الإكسسوارات الأولى",
    leadTime: 3,
  },
  {
    id: "MAT-005",
    name: "سحابات معدنية",
    required: 1000,
    available: 400,
    onOrder: 800,
    status: "low",
    supplier: "مصنع المستلزمات المعدنية",
    leadTime: 6,
  },
];

// Sample quality control data
const qualityControlData = [
  {
    id: "QC-001",
    product: "قميص قطني",
    batchNumber: "B-2024-001",
    inspectionDate: "2024-08-05",
    status: "passed",
    defectRate: 1.2,
    inspector: "أحمد محمد",
    notes: "جودة ممتازة، تم اجتياز جميع الاختبارات",
  },
  {
    id: "QC-002",
    product: "بنطلون جينز",
    batchNumber: "B-2024-002",
    inspectionDate: "2024-08-04",
    status: "failed",
    defectRate: 5.8,
    inspector: "سارة أحمد",
    notes: "مشاكل في الخياطة، يجب إعادة العمل",
  },
  {
    id: "QC-003",
    product: "فستان صيفي",
    batchNumber: "B-2024-003",
    inspectionDate: "2024-08-03",
    status: "passed",
    defectRate: 0.5,
    inspector: "محمد علي",
    notes: "جودة ممتازة، لا توجد ملاحظات",
  },
  {
    id: "QC-004",
    product: "بلوزة حريرية",
    batchNumber: "B-2024-004",
    inspectionDate: "2024-08-02",
    status: "warning",
    defectRate: 3.2,
    inspector: "فاطمة حسن",
    notes: "بعض المشاكل في التطريز، تحتاج مراجعة",
  },
  {
    id: "QC-005",
    product: "جاكيت شتوي",
    batchNumber: "B-2024-005",
    inspectionDate: "2024-08-01",
    status: "passed",
    defectRate: 1.8,
    inspector: "خالد عبدالله",
    notes: "جودة جيدة، بعض الملاحظات البسيطة",
  },
];

// Sample KPI data
const kpiData = [
  {
    name: "معدل التسليم في الوقت المحدد",
    value: 92,
    target: 95,
    trend: "up",
    change: 3,
    unit: "%",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "وقت دورة الإنتاج",
    value: 4.2,
    target: 4.0,
    trend: "down",
    change: -0.3,
    unit: "أيام",
    icon: <Timer className="h-5 w-5" />,
  },
  {
    name: "الفعالية الكلية للمعدات",
    value: 85,
    target: 90,
    trend: "up",
    change: 2,
    unit: "%",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    name: "معدل الجودة",
    value: 98.5,
    target: 99,
    trend: "up",
    change: 0.5,
    unit: "%",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
];

// Sample production performance data
const productionPerformanceData = [
  { name: "يناير", المخطط: 1200, الفعلي: 1150 },
  { name: "فبراير", المخطط: 1300, الفعلي: 1280 },
  { name: "مارس", المخطط: 1400, الفعلي: 1420 },
  { name: "أبريل", المخطط: 1500, الفعلي: 1480 },
  { name: "مايو", المخطط: 1600, الفعلي: 1550 },
  { name: "يونيو", المخطط: 1700, الفعلي: 1750 },
  { name: "يوليو", المخطط: 1800, الفعلي: 1820 },
];

// Sample defect types data
const defectTypesData = [
  { name: "عيوب الخياطة", value: 45 },
  { name: "عيوب القماش", value: 25 },
  { name: "عيوب الألوان", value: 15 },
  { name: "عيوب التشطيب", value: 10 },
  { name: "أخرى", value: 5 },
];

// Sample work center utilization data
const workCenterUtilizationData = [
  { name: "قسم القص", نسبة_الاستخدام: 70 },
  { name: "قسم الخياطة", نسبة_الاستخدام: 90 },
  { name: "قسم التطريز", نسبة_الاستخدام: 50 },
  { name: "قسم الكي", نسبة_الاستخدام: 80 },
  { name: "قسم التعبئة", نسبة_الاستخدام: 60 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ManufacturingDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.name}</p>
                  <div className="flex items-end gap-1 mt-2">
                    <h3 className="text-2xl font-bold">{kpi.value}</h3>
                    <span className="text-sm">{kpi.unit}</span>
                  </div>
                </div>
                <div
                  className={`p-2 rounded-full ${kpi.trend === "up" ? "bg-green-100" : "bg-amber-100"}`}
                >
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span
                  className={`font-medium ${kpi.trend === "up" ? "text-green-600" : "text-amber-600"}`}
                >
                  {kpi.trend === "up" ? "+" : ""}
                  {kpi.change}
                  {kpi.unit}
                </span>
                <span className="text-muted-foreground mr-1">
                  مقارنة بالشهر السابق
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>
                    الهدف: {kpi.target}
                    {kpi.unit}
                  </span>
                  <span>{Math.round((kpi.value / kpi.target) * 100)}%</span>
                </div>
                <Progress
                  value={Math.round((kpi.value / kpi.target) * 100)}
                  className="h-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Performance Summary */}
      <Card>
        <CardContent className="p-6">
          <ProductionPerformanceSummary />
        </CardContent>
      </Card>

      {/* Production Orders and Work Centers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Orders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                أوامر الإنتاج
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-1" />
                أمر جديد
              </Button>
            </div>
            <CardDescription>حالة أوامر الإنتاج الحالية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الأمر</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>تاريخ التسليم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>التقدم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productionOrdersData.slice(0, 4).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status === "completed"
                            ? "مكتمل"
                            : order.status === "in-progress"
                              ? "قيد التنفيذ"
                              : "مخطط"}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" size="sm">
                عرض جميع أوامر الإنتاج
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Work Centers */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                مراكز العمل
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 ml-1" />
                إدارة
              </Button>
            </div>
            <CardDescription>حالة واستخدام مراكز العمل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المركز</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الكفاءة</TableHead>
                    <TableHead>الحمل الحالي</TableHead>
                    <TableHead>نسبة الاستخدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workCentersData.slice(0, 4).map((center) => (
                    <TableRow key={center.id}>
                      <TableCell className="font-medium">
                        {center.name}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
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
                      <TableCell>
                        {center.currentLoad} / {center.capacity}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(center.currentLoad / center.capacity) * 100}
                            className={`h-2 w-24 ${center.currentLoad / center.capacity > 0.9 ? "bg-red-100" : ""}`}
                          />
                          <span className="text-xs">
                            {Math.round(
                              (center.currentLoad / center.capacity) * 100,
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" size="sm">
                عرض جميع مراكز العمل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Material Requirements and Quality Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Material Requirements */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                متطلبات المواد
              </CardTitle>
              <Button variant="outline" size="sm">
                <Truck className="h-4 w-4 ml-1" />
                طلب شراء
              </Button>
            </div>
            <CardDescription>حالة المواد الخام والمكونات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المادة</TableHead>
                    <TableHead>المطلوب</TableHead>
                    <TableHead>المتوفر</TableHead>
                    <TableHead>قيد الطلب</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialRequirementsData.slice(0, 4).map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        {material.name}
                      </TableCell>
                      <TableCell>{material.required}</TableCell>
                      <TableCell>{material.available}</TableCell>
                      <TableCell>{material.onOrder}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            material.status === "ok"
                              ? "bg-green-100 text-green-800"
                              : material.status === "low"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {material.status === "ok"
                            ? "متوفر"
                            : material.status === "low"
                              ? "منخفض"
                              : "حرج"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" size="sm">
                عرض جميع المواد
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quality Control */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                مراقبة الجودة
              </CardTitle>
              <Button variant="outline" size="sm">
                <Clipboard className="h-4 w-4 ml-1" />
                تقرير جديد
              </Button>
            </div>
            <CardDescription>نتائج فحص الجودة الأخيرة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>رقم الدفعة</TableHead>
                    <TableHead>تاريخ الفحص</TableHead>
                    <TableHead>نسبة العيوب</TableHead>
                    <TableHead>النتيجة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qualityControlData.slice(0, 4).map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">
                        {inspection.product}
                      </TableCell>
                      <TableCell>{inspection.batchNumber}</TableCell>
                      <TableCell>{inspection.inspectionDate}</TableCell>
                      <TableCell>{inspection.defectRate}%</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            inspection.status === "passed"
                              ? "bg-green-100 text-green-800"
                              : inspection.status === "warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {inspection.status === "passed"
                            ? "ناجح"
                            : inspection.status === "warning"
                              ? "تحذير"
                              : "فشل"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="link" size="sm">
                عرض جميع تقارير الجودة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              أداء الإنتاج
            </CardTitle>
            <CardDescription>مقارنة الإنتاج المخطط والفعلي</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="المخطط" fill="#8884d8" />
                <Bar dataKey="الفعلي" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Defect Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              أنواع العيوب
            </CardTitle>
            <CardDescription>توزيع العيوب حسب النوع</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-md">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={defectTypesData}
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
                    {defectTypesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

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
              <Tooltip />
              <Legend />
              <Bar dataKey="نسبة_الاستخدام" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManufacturingDashboard;
