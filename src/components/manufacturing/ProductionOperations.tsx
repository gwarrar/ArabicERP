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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Timer,
  Hourglass,
  Activity,
  PauseCircle,
  PlayCircle,
  StopCircle,
  XCircle,
  Layers,
  Cog,
  Tool,
  Wrench,
  Gauge,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Sample operations data
const operationsData = [
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
    duration: 8, // hours
    actualDuration: 7.5, // hours
    materials: [{ name: "قماش قطني", quantity: 250, unit: "متر" }],
    notes: "تم قص القماش بنجاح وفقاً للمواصفات المطلوبة",
    completedBy: "أحمد محمد",
    completedAt: "2024-08-02 15:30",
    qualityCheck: "passed",
    nextOperation: "خياطة القميص القطني",
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
    duration: 24, // hours
    actualDuration: 16, // hours so far
    materials: [
      { name: "قماش قطني مقصوص", quantity: 250, unit: "قطعة" },
      { name: "خيوط بوليستر", quantity: 50, unit: "متر" },
      { name: "أزرار بلاستيكية", quantity: 2500, unit: "قطعة" },
    ],
    notes: "جاري العمل على خياطة القمصان، تم إنجاز 65% من العمل",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "تطريز القميص القطني",
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
    duration: 16, // hours
    actualDuration: 0, // hours
    materials: [
      { name: "قميص مخيط", quantity: 500, unit: "قطعة" },
      { name: "خيوط تطريز", quantity: 100, unit: "متر" },
    ],
    notes: "مخطط للبدء في 7 أغسطس",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "كي القميص القطني",
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
    duration: 12, // hours
    actualDuration: 0, // hours
    materials: [{ name: "قميص مطرز", quantity: 500, unit: "قطعة" }],
    notes: "مخطط للبدء في 9 أغسطس",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "تعبئة القميص القطني",
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
    duration: 8, // hours
    actualDuration: 0, // hours
    materials: [
      { name: "قميص مكوي", quantity: 500, unit: "قطعة" },
      { name: "علب كرتون", quantity: 500, unit: "قطعة" },
      { name: "أكياس بلاستيكية", quantity: 500, unit: "قطعة" },
    ],
    notes: "مخطط للبدء في 11 أغسطس",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "",
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
    duration: 10, // hours
    actualDuration: 0, // hours
    materials: [{ name: "قماش جينز", quantity: 450, unit: "متر" }],
    notes: "مخطط للبدء في 5 أغسطس",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "خياطة بنطلون الجينز",
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
    duration: 30, // hours
    actualDuration: 0, // hours
    materials: [
      { name: "قماش جينز مقصوص", quantity: 300, unit: "قطعة" },
      { name: "خيوط بوليستر", quantity: 100, unit: "متر" },
      { name: "سحابات معدنية", quantity: 300, unit: "قطعة" },
      { name: "أزرار معدنية", quantity: 300, unit: "قطعة" },
    ],
    notes: "مخطط للبدء في 7 أغسطس",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "كي بنطلون الجينز",
  },
  {
    id: "OP-2024-008",
    name: "تطريز البلوزة الحريرية",
    productionOrder: "PO-2024-004",
    product: "بلوزة حريرية",
    workCenter: "قسم التطريز",
    startDate: "2024-08-03",
    endDate: "2024-08-05",
    status: "in-progress",
    progress: 30,
    assignedTo: "فريق التطريز ب",
    priority: "منخفضة",
    duration: 20, // hours
    actualDuration: 6, // hours so far
    materials: [
      { name: "بلوزة مخيطة", quantity: 150, unit: "قطعة" },
      { name: "خيوط تطريز", quantity: 75, unit: "متر" },
    ],
    notes: "جاري العمل على تطريز البلوزات، تم إنجاز 30% من العمل",
    completedBy: "",
    completedAt: "",
    qualityCheck: "pending",
    nextOperation: "كي البلوزة الحريرية",
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

// Sample production orders data
const productionOrdersData = [
  { id: "PO-2024-001", name: "قميص قطني" },
  { id: "PO-2024-002", name: "بنطلون جينز" },
  { id: "PO-2024-003", name: "فستان صيفي" },
  { id: "PO-2024-004", name: "بلوزة حريرية" },
  { id: "PO-2024-005", name: "جاكيت شتوي" },
];

// Sample teams data
const teamsData = [
  { id: "TEAM-001", name: "فريق القص أ" },
  { id: "TEAM-002", name: "فريق القص ب" },
  { id: "TEAM-003", name: "فريق الخياطة أ" },
  { id: "TEAM-004", name: "فريق الخياطة ب" },
  { id: "TEAM-005", name: "فريق التطريز أ" },
  { id: "TEAM-006", name: "فريق التطريز ب" },
  { id: "TEAM-007", name: "فريق الكي أ" },
  { id: "TEAM-008", name: "فريق التعبئة أ" },
  { id: "TEAM-009", name: "فريق التعبئة ب" },
];

const ProductionOperations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [workCenterFilter, setWorkCenterFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("all");
  const [showAddOperation, setShowAddOperation] = useState(false);
  const [showOperationDetails, setShowOperationDetails] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [sortField, setSortField] = useState("startDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  // Filter and sort operations
  const filteredOperations = operationsData
    .filter((operation) => {
      const matchesSearch =
        operation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        operation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        operation.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        operation.productionOrder
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || operation.status === statusFilter;

      const matchesWorkCenter =
        workCenterFilter === "all" || operation.workCenter === workCenterFilter;

      const matchesOrder =
        orderFilter === "all" || operation.productionOrder === orderFilter;

      return (
        matchesSearch && matchesStatus && matchesWorkCenter && matchesOrder
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "startDate") {
        comparison = new Date(a.startDate) - new Date(b.startDate);
      } else if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "product") {
        comparison = a.product.localeCompare(b.product);
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
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-amber-100 text-amber-800";
      case "on-hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "مكتملة";
      case "in-progress":
        return "قيد التنفيذ";
      case "planned":
        return "مخططة";
      case "on-hold":
        return "متوقفة";
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

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case "planned":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "on-hold":
        return <PauseCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Handle operation selection for details view
  const handleOperationSelect = (operation) => {
    setSelectedOperation(operation);
    setShowOperationDetails(true);
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

  // Handle delete operation
  const handleDeleteOperation = (operationId) => {
    toast({
      title: "تم حذف العملية",
      description: `تم حذف العملية ${operationId} بنجاح`,
    });
  };

  // Handle add new operation
  const handleAddOperation = () => {
    setShowAddOperation(false);
    toast({
      title: "تم إنشاء العملية",
      description: "تم إنشاء العملية الجديدة بنجاح",
    });
  };

  // Handle start operation
  const handleStartOperation = (operationId) => {
    toast({
      title: "تم بدء العملية",
      description: `تم بدء العملية ${operationId} بنجاح`,
    });
  };

  // Handle complete operation
  const handleCompleteOperation = (operationId) => {
    toast({
      title: "تم إكمال العملية",
      description: `تم إكمال العملية ${operationId} بنجاح`,
    });
  };

  // Handle pause operation
  const handlePauseOperation = (operationId) => {
    toast({
      title: "تم إيقاف العملية مؤقتاً",
      description: `تم إيقاف العملية ${operationId} مؤقتاً`,
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
              placeholder="بحث عن عملية..."
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
                <SelectItem value="completed">مكتملة</SelectItem>
                <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                <SelectItem value="planned">مخططة</SelectItem>
                <SelectItem value="on-hold">متوقفة</SelectItem>
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

            <Select value={orderFilter} onValueChange={setOrderFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="أمر الإنتاج" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأوامر</SelectItem>
                {productionOrdersData.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.id} - {order.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          <Button onClick={() => setShowAddOperation(true)}>
            <Plus className="ml-2 h-4 w-4" />
            عملية جديدة
          </Button>
        </div>
      </div>

      {/* Operations Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي العمليات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {operationsData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Hammer className="h-5 w-5 text-blue-600" />
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
                  {
                    operationsData.filter((op) => op.status === "in-progress")
                      .length
                  }
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <PlayCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عمليات مكتملة</p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    operationsData.filter((op) => op.status === "completed")
                      .length
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
                <p className="text-sm text-muted-foreground">عمليات مخططة</p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    operationsData.filter((op) => op.status === "planned")
                      .length
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

      {/* Operations Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                العمليات الإنتاجية
              </CardTitle>
              <CardDescription>
                قائمة بجميع العمليات الإنتاجية وحالتها
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {filteredOperations.length} عملية
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
                      رقم العملية {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("name")}
                  >
                    <div className="flex items-center">
                      اسم العملية {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead>أمر الإنتاج</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("product")}
                  >
                    <div className="flex items-center">
                      المنتج {getSortIcon("product")}
                    </div>
                  </TableHead>
                  <TableHead>مركز العمل</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("startDate")}
                  >
                    <div className="flex items-center">
                      تاريخ البدء {getSortIcon("startDate")}
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
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOperations.length > 0 ? (
                  filteredOperations.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell className="font-medium">
                        {operation.id}
                      </TableCell>
                      <TableCell>{operation.name}</TableCell>
                      <TableCell>{operation.productionOrder}</TableCell>
                      <TableCell>{operation.product}</TableCell>
                      <TableCell>{operation.workCenter}</TableCell>
                      <TableCell>{formatDate(operation.startDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(operation.status)}
                          <Badge
                            className={getStatusBadgeClass(operation.status)}
                          >
                            {getStatusText(operation.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={operation.progress}
                            className="h-2 w-24"
                          />
                          <span className="text-xs">{operation.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOperationSelect(operation)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {operation.status === "planned" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStartOperation(operation.id)}
                            >
                              <Play className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                          {operation.status === "in-progress" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handlePauseOperation(operation.id)
                                }
                              >
                                <Pause className="h-4 w-4 text-amber-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleCompleteOperation(operation.id)
                                }
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteOperation(operation.id)}
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
                        <p>لا توجد عمليات تطابق معايير البحث</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setWorkCenterFilter("all");
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

      {/* Work Centers Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            حالة مراكز العمل
          </CardTitle>
          <CardDescription>
            نظرة عامة على حالة مراكز العمل والعمليات الجارية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workCentersData.map((center) => {
              const centerOperations = operationsData.filter(
                (op) => op.workCenter === center.name,
              );
              const activeOperations = centerOperations.filter(
                (op) => op.status === "in-progress",
              );
              const plannedOperations = centerOperations.filter(
                (op) => op.status === "planned",
              );
              const completedOperations = centerOperations.filter(
                (op) => op.status === "completed",
              );
              const utilizationPercentage =
                activeOperations.length > 0 ? 100 : 0; // Simplified for demo

              return (
                <Card key={center.id} className="overflow-hidden">
                  <div
                    className={`h-1 ${activeOperations.length > 0 ? "bg-blue-500" : "bg-gray-300"}`}
                  ></div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-base">
                          {center.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {activeOperations.length > 0 ? "نشط" : "غير نشط"}
                        </p>
                      </div>
                      <div className="p-2 rounded-full bg-gray-100">
                        <Factory className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>نسبة الاستخدام</span>
                          <span>{utilizationPercentage}%</span>
                        </div>
                        <Progress
                          value={utilizationPercentage}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">
                            {activeOperations.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            قيد التنفيذ
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-amber-600">
                            {plannedOperations.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            مخططة
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">
                            {completedOperations.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            مكتملة
                          </div>
                        </div>
                      </div>

                      {activeOperations.length > 0 && (
                        <div className="border-t pt-2 mt-2">
                          <p className="text-xs text-muted-foreground mb-1">
                            العملية الحالية:
                          </p>
                          <div className="flex items-center gap-1">
                            <PlayCircle className="h-3 w-3 text-blue-600" />
                            <p className="text-sm font-medium">
                              {activeOperations[0].name}
                            </p>
                          </div>
                        </div>
                      )}

                      {plannedOperations.length > 0 &&
                        activeOperations.length === 0 && (
                          <div className="border-t pt-2 mt-2">
                            <p className="text-xs text-muted-foreground mb-1">
                              العملية القادمة:
                            </p>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-amber-600" />
                              <p className="text-sm font-medium">
                                {plannedOperations[0].name}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Operation Details Dialog */}
      {selectedOperation && (
        <Dialog
          open={showOperationDetails}
          onOpenChange={setShowOperationDetails}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل العملية {selectedOperation.id}</DialogTitle>
              <DialogDescription>
                عرض تفاصيل العملية الإنتاجية والتقدم الحالي
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات أساسية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">رقم العملية:</div>
                    <div>{selectedOperation.id}</div>
                    <div className="font-medium">اسم العملية:</div>
                    <div>{selectedOperation.name}</div>
                    <div className="font-medium">أمر الإنتاج:</div>
                    <div>{selectedOperation.productionOrder}</div>
                    <div className="font-medium">المنتج:</div>
                    <div>{selectedOperation.product}</div>
                    <div className="font-medium">مركز العمل:</div>
                    <div>{selectedOperation.workCenter}</div>
                    <div className="font-medium">الحالة:</div>
                    <div>
                      <Badge
                        className={getStatusBadgeClass(
                          selectedOperation.status,
                        )}
                      >
                        {getStatusText(selectedOperation.status)}
                      </Badge>
                    </div>
                    <div className="font-medium">الأولوية:</div>
                    <div>
                      <Badge
                        className={getPriorityBadgeClass(
                          selectedOperation.priority,
                        )}
                      >
                        {selectedOperation.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات الجدولة
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">تاريخ البدء:</div>
                    <div>{formatDate(selectedOperation.startDate)}</div>
                    <div className="font-medium">تاريخ الانتهاء المخطط:</div>
                    <div>{formatDate(selectedOperation.endDate)}</div>
                    <div className="font-medium">المدة المخططة:</div>
                    <div>{selectedOperation.duration} ساعة</div>
                    <div className="font-medium">المدة الفعلية:</div>
                    <div>{selectedOperation.actualDuration} ساعة</div>
                    <div className="font-medium">تم التعيين إلى:</div>
                    <div>{selectedOperation.assignedTo}</div>
                    {selectedOperation.completedBy && (
                      <>
                        <div className="font-medium">تم الإكمال بواسطة:</div>
                        <div>{selectedOperation.completedBy}</div>
                        <div className="font-medium">تاريخ الإكمال:</div>
                        <div>{selectedOperation.completedAt}</div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    ملاحظات
                  </h3>
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {selectedOperation.notes || "لا توجد ملاحظات"}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    التقدم
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>نسبة الإكمال:</span>
                      <span>{selectedOperation.progress}%</span>
                    </div>
                    <Progress
                      value={selectedOperation.progress}
                      className="h-2"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    المواد المستخدمة
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المادة</TableHead>
                          <TableHead>الكمية</TableHead>
                          <TableHead>الوحدة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOperation.materials.map((material, index) => (
                          <TableRow key={index}>
                            <TableCell>{material.name}</TableCell>
                            <TableCell>{material.quantity}</TableCell>
                            <TableCell>{material.unit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات إضافية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">فحص الجودة:</div>
                    <div>
                      {selectedOperation.qualityCheck === "passed" ? (
                        <Badge className="bg-green-100 text-green-800">
                          ناجح
                        </Badge>
                      ) : selectedOperation.qualityCheck === "failed" ? (
                        <Badge className="bg-red-100 text-red-800">فاشل</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">
                          معلق
                        </Badge>
                      )}
                    </div>
                    <div className="font-medium">العملية التالية:</div>
                    <div>{selectedOperation.nextOperation || "-"}</div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex gap-2 justify-end">
                    {selectedOperation.status === "planned" && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleStartOperation(selectedOperation.id)
                        }
                      >
                        <Play className="ml-1 h-3 w-3" />
                        بدء العملية
                      </Button>
                    )}
                    {selectedOperation.status === "in-progress" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handlePauseOperation(selectedOperation.id)
                          }
                        >
                          <Pause className="ml-1 h-3 w-3" />
                          إيقاف مؤقت
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleCompleteOperation(selectedOperation.id)
                          }
                        >
                          <CheckCircle className="ml-1 h-3 w-3" />
                          إكمال
                        </Button>
                      </>
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

      {/* Add Operation Dialog */}
      <Dialog open={showAddOperation} onOpenChange={setShowAddOperation}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عملية جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل العملية الإنتاجية الجديدة
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="operation-name" className="text-sm font-medium">
                اسم العملية *
              </label>
              <Input id="operation-name" placeholder="أدخل اسم العملية" />
            </div>

            <div className="space-y-2">
              <label htmlFor="production-order" className="text-sm font-medium">
                أمر الإنتاج *
              </label>
              <Select>
                <SelectTrigger id="production-order">
                  <SelectValue placeholder="اختر أمر الإنتاج" />
                </SelectTrigger>
                <SelectContent>
                  {productionOrdersData.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.id} - {order.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="work-center" className="text-sm font-medium">
                مركز العمل *
              </label>
              <Select>
                <SelectTrigger id="work-center">
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
              <label htmlFor="assigned-to" className="text-sm font-medium">
                تعيين إلى *
              </label>
              <Select>
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="اختر الفريق" />
                </SelectTrigger>
                <SelectContent>
                  {teamsData.map((team) => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="start-date" className="text-sm font-medium">
                تاريخ البدء *
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

            <div className="space-y-2">
              <label htmlFor="end-date" className="text-sm font-medium">
                تاريخ الانتهاء *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
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

            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                المدة المقدرة (ساعات) *
              </label>
              <Input
                id="duration"
                type="number"
                placeholder="أدخل المدة المقدرة"
              />
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

            <div className="col-span-2 space-y-2">
              <label htmlFor="materials" className="text-sm font-medium">
                المواد المطلوبة
              </label>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-2">
                  سيتم تحديد المواد المطلوبة تلقائياً بناءً على المنتج وقائمة
                  المواد
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="ml-1 h-3 w-3" />
                  تعديل المواد
                </Button>
              </div>
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
              onClick={() => setShowAddOperation(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleAddOperation}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductionOperations;
