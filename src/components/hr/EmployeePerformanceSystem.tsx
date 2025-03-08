import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Users,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Search,
  Plus,
  Star,
  Trophy,
  Gift,
  Target,
  BarChart3,
  Download,
  Printer,
  Settings,
  DollarSign,
} from "lucide-react";

// نموذج بيانات الموظف
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  avatar?: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "onLeave";
  kpis: KPI[];
  tasks: Task[];
  rewards: Reward[];
  performanceScore: number;
}

// نموذج مؤشرات الأداء الرئيسية
interface KPI {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  weight: number; // الوزن النسبي للمؤشر (من 100)
  period: "monthly" | "quarterly" | "yearly";
  status: "exceeded" | "achieved" | "inProgress" | "atRisk" | "failed";
}

// نموذج المهام
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedDate: string;
  status: "completed" | "inProgress" | "pending" | "overdue";
  priority: "high" | "medium" | "low";
  completionPercentage: number;
}

// نموذج الحوافز والجوائز
interface Reward {
  id: string;
  type: "bonus" | "promotion" | "certificate" | "gift" | "leave";
  title: string;
  description: string;
  value?: number; // القيمة المالية إن وجدت
  currency?: string;
  awardDate: string;
  reason: string;
  approvedBy: string;
}

// بيانات تجريبية للموظفين
const employeesData: Employee[] = [
  {
    id: "EMP001",
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "2022-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    email: "ahmed@example.com",
    phone: "+380 50 123 4567",
    status: "active",
    performanceScore: 92,
    kpis: [
      {
        id: "KPI001",
        name: "المبيعات الشهرية",
        description: "إجمالي المبيعات الشهرية بالقيمة المالية",
        target: 100000,
        current: 125000,
        unit: "₴",
        weight: 40,
        period: "monthly",
        status: "exceeded",
      },
      {
        id: "KPI002",
        name: "عملاء جدد",
        description: "عدد العملاء الجدد المضافين شهرياً",
        target: 10,
        current: 12,
        unit: "عميل",
        weight: 30,
        period: "monthly",
        status: "achieved",
      },
      {
        id: "KPI003",
        name: "نسبة الاحتفاظ بالعملاء",
        description: "نسبة الاحتفاظ بالعملاء الحاليين",
        target: 90,
        current: 85,
        unit: "%",
        weight: 30,
        period: "quarterly",
        status: "inProgress",
      },
    ],
    tasks: [
      {
        id: "TASK001",
        title: "إعداد تقرير المبيعات الأسبوعي",
        description: "تحليل أداء المبيعات الأسبوعي وتقديم التوصيات",
        dueDate: "2024-07-25",
        assignedDate: "2024-07-18",
        status: "completed",
        priority: "high",
        completionPercentage: 100,
      },
      {
        id: "TASK002",
        title: "متابعة العملاء المحتملين",
        description: "التواصل مع العملاء المحتملين وتقديم عروض الأسعار",
        dueDate: "2024-07-30",
        assignedDate: "2024-07-20",
        status: "inProgress",
        priority: "medium",
        completionPercentage: 60,
      },
    ],
    rewards: [
      {
        id: "REW001",
        type: "bonus",
        title: "مكافأة الأداء المتميز",
        description: "مكافأة مالية لتجاوز أهداف المبيعات الشهرية",
        value: 5000,
        currency: "₴",
        awardDate: "2024-06-30",
        reason: "تجاوز هدف المبيعات الشهري بنسبة 25%",
        approvedBy: "خالد العتيبي",
      },
      {
        id: "REW002",
        type: "certificate",
        title: "شهادة تقدير",
        description: "شهادة تقدير للأداء المتميز",
        awardDate: "2024-05-15",
        reason: "الالتزام والتفاني في العمل",
        approvedBy: "محمد السالم",
      },
    ],
  },
  {
    id: "EMP002",
    name: "سارة خالد",
    position: "أخصائي تسويق",
    department: "التسويق",
    joinDate: "2022-03-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    email: "sara@example.com",
    phone: "+380 50 234 5678",
    status: "active",
    performanceScore: 88,
    kpis: [
      {
        id: "KPI004",
        name: "حملات تسويقية",
        description: "عدد الحملات التسويقية المنفذة",
        target: 5,
        current: 4,
        unit: "حملة",
        weight: 30,
        period: "monthly",
        status: "inProgress",
      },
      {
        id: "KPI005",
        name: "معدل التحويل",
        description: "نسبة تحويل الزيارات إلى مبيعات",
        target: 5,
        current: 4.2,
        unit: "%",
        weight: 40,
        period: "monthly",
        status: "inProgress",
      },
      {
        id: "KPI006",
        name: "متابعين جدد",
        description: "عدد المتابعين الجدد على منصات التواصل الاجتماعي",
        target: 1000,
        current: 1200,
        unit: "متابع",
        weight: 30,
        period: "monthly",
        status: "exceeded",
      },
    ],
    tasks: [
      {
        id: "TASK003",
        title: "إطلاق حملة تسويقية جديدة",
        description: "تصميم وإطلاق حملة تسويقية للمنتجات الجديدة",
        dueDate: "2024-08-05",
        assignedDate: "2024-07-15",
        status: "inProgress",
        priority: "high",
        completionPercentage: 75,
      },
    ],
    rewards: [
      {
        id: "REW003",
        type: "gift",
        title: "هدية تقديرية",
        description: "هدية تقديرية للجهود المبذولة",
        awardDate: "2024-06-15",
        reason: "النجاح في إطلاق حملة تسويقية مميزة",
        approvedBy: "خالد العتيبي",
      },
    ],
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "2021-11-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    email: "mohammed@example.com",
    phone: "+380 50 345 6789",
    status: "active",
    performanceScore: 85,
    kpis: [
      {
        id: "KPI007",
        name: "تطوير ميزات جديدة",
        description: "عدد الميزات الجديدة المطورة",
        target: 8,
        current: 6,
        unit: "ميزة",
        weight: 40,
        period: "quarterly",
        status: "inProgress",
      },
      {
        id: "KPI008",
        name: "إصلاح الأخطاء البرمجية",
        description: "عدد الأخطاء البرمجية التي تم إصلاحها",
        target: 20,
        current: 18,
        unit: "خطأ",
        weight: 30,
        period: "monthly",
        status: "inProgress",
      },
      {
        id: "KPI009",
        name: "وقت الاستجابة للطلبات",
        description: "متوسط وقت الاستجابة لطلبات الدعم الفني",
        target: 24,
        current: 20,
        unit: "ساعة",
        weight: 30,
        period: "monthly",
        status: "achieved",
      },
    ],
    tasks: [
      {
        id: "TASK004",
        title: "تطوير واجهة المستخدم الجديدة",
        description: "تصميم وتطوير واجهة المستخدم للنظام الجديد",
        dueDate: "2024-08-15",
        assignedDate: "2024-07-01",
        status: "inProgress",
        priority: "high",
        completionPercentage: 80,
      },
    ],
    rewards: [],
  },
];

// مكون إدارة أداء الموظفين والحوافز
const EmployeePerformanceSystem = () => {
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [showRewardDialog, setShowRewardDialog] = useState(false);

  // تصفية الموظفين حسب البحث والقسم
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name.includes(searchTerm) ||
        employee.position.includes(searchTerm) ||
        employee.id.includes(searchTerm)) &&
      (filterDepartment === "all" || employee.department === filterDepartment),
  );

  // الأقسام المتاحة
  const departments = Array.from(
    new Set(employees.map((employee) => employee.department)),
  );

  // حساب متوسط أداء الموظف بناءً على مؤشرات الأداء
  const calculateKpiScore = (kpis: KPI[]): number => {
    if (kpis.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    kpis.forEach((kpi) => {
      const achievementPercentage = Math.min(
        (kpi.current / kpi.target) * 100,
        150,
      );
      totalWeightedScore += (achievementPercentage * kpi.weight) / 100;
      totalWeight += kpi.weight;
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  };

  // حساب متوسط إكمال المهام
  const calculateTaskCompletion = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    return (
      tasks.reduce((sum, task) => sum + task.completionPercentage, 0) /
      tasks.length
    );
  };

  // إضافة مكافأة جديدة
  const addReward = (reward: Reward) => {
    if (selectedEmployee) {
      const updatedEmployee = {
        ...selectedEmployee,
        rewards: [...selectedEmployee.rewards, reward],
      };

      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? updatedEmployee : emp,
        ),
      );

      setSelectedEmployee(updatedEmployee);
      setShowRewardDialog(false);
    }
  };

  // الحصول على لون حالة المؤشر
  const getKpiStatusColor = (status: KPI["status"]): string => {
    switch (status) {
      case "exceeded":
        return "bg-green-500";
      case "achieved":
        return "bg-blue-500";
      case "inProgress":
        return "bg-yellow-500";
      case "atRisk":
        return "bg-orange-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // الحصول على لون حالة المهمة
  const getTaskStatusColor = (status: Task["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "inProgress":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // الحصول على لون أولوية المهمة
  const getTaskPriorityColor = (priority: Task["priority"]): string => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على لون نوع المكافأة
  const getRewardTypeColor = (type: Reward["type"]): string => {
    switch (type) {
      case "bonus":
        return "bg-green-100 text-green-800";
      case "promotion":
        return "bg-purple-100 text-purple-800";
      case "certificate":
        return "bg-blue-100 text-blue-800";
      case "gift":
        return "bg-yellow-100 text-yellow-800";
      case "leave":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة نوع المكافأة
  const getRewardTypeIcon = (type: Reward["type"]) => {
    switch (type) {
      case "bonus":
        return <DollarSign className="h-4 w-4" />;
      case "promotion":
        return <TrendingUp className="h-4 w-4" />;
      case "certificate":
        return <Award className="h-4 w-4" />;
      case "gift":
        return <Gift className="h-4 w-4" />;
      case "leave":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">نظام إدارة أداء الموظفين والحوافز</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
          <Button size="sm" variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="ml-1 h-4 w-4" />
            إضافة موظف
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* قائمة الموظفين */}
        <Card className="p-4 md:col-span-1 bg-white">
          <div className="flex flex-col h-full">
            <div className="space-y-4 mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="بحث عن موظف..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent border-none text-sm focus:outline-none w-full"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">جميع الأقسام</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ScrollArea className="flex-1 h-[600px] pr-4">
              <div className="space-y-2">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedEmployee?.id === employee.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            employee.avatar ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                          }
                          alt={employee.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            employee.status === "active"
                              ? "bg-green-500"
                              : employee.status === "onLeave"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        ></div>
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {employee.position} - {employee.department}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                        <span>الأداء العام</span>
                        <span>{employee.performanceScore}%</span>
                      </div>
                      <Progress
                        value={employee.performanceScore}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* تفاصيل الموظف */}
        <Card className="p-4 md:col-span-3 bg-white">
          {selectedEmployee ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      selectedEmployee.avatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                    }
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedEmployee.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedEmployee.position} -{" "}
                      {selectedEmployee.department}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          selectedEmployee.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedEmployee.status === "active"
                          ? "نشط"
                          : selectedEmployee.status === "onLeave"
                            ? "في إجازة"
                            : "غير نشط"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        تاريخ التعيين:{" "}
                        {new Date(selectedEmployee.joinDate).toLocaleDateString(
                          "ar-EG",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog
                    open={showRewardDialog}
                    onOpenChange={setShowRewardDialog}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Trophy className="ml-1 h-4 w-4" />
                        إضافة مكافأة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>إضافة مكافأة جديدة</DialogTitle>
                        <DialogDescription>
                          إضافة مكافأة أو حافز للموظف {selectedEmployee.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">نوع المكافأة</label>
                          <Select defaultValue="bonus" className="col-span-3">
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع المكافأة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bonus">
                                مكافأة مالية
                              </SelectItem>
                              <SelectItem value="promotion">ترقية</SelectItem>
                              <SelectItem value="certificate">
                                شهادة تقدير
                              </SelectItem>
                              <SelectItem value="gift">هدية</SelectItem>
                              <SelectItem value="leave">
                                إجازة إضافية
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">عنوان المكافأة</label>
                          <Input
                            className="col-span-3"
                            placeholder="عنوان المكافأة"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">الوصف</label>
                          <Input
                            className="col-span-3"
                            placeholder="وصف المكافأة"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">القيمة</label>
                          <Input
                            type="number"
                            className="col-span-2"
                            placeholder="القيمة"
                          />
                          <Select defaultValue="UAH">
                            <SelectTrigger>
                              <SelectValue placeholder="العملة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UAH">₴ (هريفنيا)</SelectItem>
                              <SelectItem value="USD">$ (دولار)</SelectItem>
                              <SelectItem value="EUR">€ (يورو)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">سبب المكافأة</label>
                          <Input
                            className="col-span-3"
                            placeholder="سبب منح المكافأة"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label className="text-right">تاريخ المنح</label>
                          <Input
                            type="date"
                            className="col-span-3"
                            defaultValue={
                              new Date().toISOString().split("T")[0]
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowRewardDialog(false)}
                        >
                          إلغاء
                        </Button>
                        <Button
                          onClick={() => {
                            // إضافة مكافأة جديدة (مثال)
                            addReward({
                              id: `REW${Math.floor(Math.random() * 1000)}`,
                              type: "bonus",
                              title: "مكافأة أداء",
                              description: "مكافأة للأداء المتميز",
                              value: 2000,
                              currency: "₴",
                              awardDate: new Date().toISOString().split("T")[0],
                              reason: "تحقيق أهداف الأداء",
                              approvedBy: "المدير التنفيذي",
                            });
                          }}
                        >
                          إضافة المكافأة
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Settings className="ml-1 h-4 w-4" />
                    إعدادات
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4 border-b">
                  <button
                    className={`pb-2 px-1 ${activeTab === "overview" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    نظرة عامة
                  </button>
                  <button
                    className={`pb-2 px-1 ${activeTab === "kpis" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("kpis")}
                  >
                    مؤشرات الأداء
                  </button>
                  <button
                    className={`pb-2 px-1 ${activeTab === "tasks" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("tasks")}
                  >
                    المهام
                  </button>
                  <button
                    className={`pb-2 px-1 ${activeTab === "rewards" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                    onClick={() => setActiveTab("rewards")}
                  >
                    الحوافز والمكافآت
                  </button>
                </div>

                {/* نظرة عامة */}
                {activeTab === "overview" && (
                  <div className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <BarChart3 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              الأداء العام
                            </p>
                            <h3 className="text-2xl font-bold">
                              {selectedEmployee.performanceScore}%
                            </h3>
                          </div>
                        </div>
                        <Progress
                          value={selectedEmployee.performanceScore}
                          className="h-2 mt-4"
                        />
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Target className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              تحقيق الأهداف
                            </p>
                            <h3 className="text-2xl font-bold">
                              {Math.round(
                                calculateKpiScore(selectedEmployee.kpis),
                              )}
                              %
                            </h3>
                          </div>
                        </div>
                        <Progress
                          value={calculateKpiScore(selectedEmployee.kpis)}
                          className="h-2 mt-4"
                        />
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <CheckCircle className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              إنجاز المهام
                            </p>
                            <h3 className="text-2xl font-bold">
                              {Math.round(
                                calculateTaskCompletion(selectedEmployee.tasks),
                              )}
                              %
                            </h3>
                          </div>
                        </div>
                        <Progress
                          value={calculateTaskCompletion(
                            selectedEmployee.tasks,
                          )}
                          className="h-2 mt-4"
                        />
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">
                          أحدث المهام
                        </h3>
                        <div className="space-y-3">
                          {selectedEmployee.tasks.length > 0 ? (
                            selectedEmployee.tasks.slice(0, 3).map((task) => (
                              <div
                                key={task.id}
                                className="p-3 border rounded-md hover:bg-muted/50"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      تاريخ الاستحقاق:{" "}
                                      {new Date(
                                        task.dueDate,
                                      ).toLocaleDateString("ar-EG")}
                                    </p>
                                  </div>
                                  <Badge
                                    variant={
                                      task.status === "completed"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {task.status === "completed"
                                      ? "مكتمل"
                                      : task.status === "inProgress"
                                        ? "قيد التنفيذ"
                                        : task.status === "pending"
                                          ? "معلق"
                                          : "متأخر"}
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                                    <span>نسبة الإنجاز</span>
                                    <span>{task.completionPercentage}%</span>
                                  </div>
                                  <Progress
                                    value={task.completionPercentage}
                                    className="h-1.5"
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground py-4">
                              لا توجد مهام مسندة حالياً
                            </p>
                          )}
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">
                          أحدث المكافآت
                        </h3>
                        <div className="space-y-3">
                          {selectedEmployee.rewards.length > 0 ? (
                            selectedEmployee.rewards
                              .slice(0, 3)
                              .map((reward) => (
                                <div
                                  key={reward.id}
                                  className="p-3 border rounded-md hover:bg-muted/50"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`p-1.5 rounded-full ${getRewardTypeColor(reward.type)}`}
                                      >
                                        {getRewardTypeIcon(reward.type)}
                                      </div>
                                      <div>
                                        <p className="font-medium">
                                          {reward.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {new Date(
                                            reward.awardDate,
                                          ).toLocaleDateString("ar-EG")}
                                        </p>
                                      </div>
                                    </div>
                                    {reward.value && (
                                      <Badge variant="outline">
                                        {reward.value.toLocaleString()}{" "}
                                        {reward.currency}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm mt-2">
                                    {reward.reason}
                                  </p>
                                </div>
                              ))
                          ) : (
                            <p className="text-center text-muted-foreground py-4">
                              لا توجد مكافآت مسجلة
                            </p>
                          )}
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* مؤشرات الأداء */}
                {activeTab === "kpis" && (
                  <div className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        مؤشرات الأداء الرئيسية
                      </h3>
                      <Button size="sm">
                        <Plus className="ml-1 h-4 w-4" />
                        إضافة مؤشر
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">المعرف</TableHead>
                          <TableHead>المؤشر</TableHead>
                          <TableHead>الهدف</TableHead>
                          <TableHead>الإنجاز الحالي</TableHead>
                          <TableHead>نسبة الإنجاز</TableHead>
                          <TableHead>الوزن النسبي</TableHead>
                          <TableHead>الفترة</TableHead>
                          <TableHead>الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEmployee.kpis.map((kpi) => (
                          <TableRow key={kpi.id}>
                            <TableCell className="font-medium">
                              {kpi.id}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{kpi.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {kpi.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {kpi.target.toLocaleString()} {kpi.unit}
                            </TableCell>
                            <TableCell>
                              {kpi.current.toLocaleString()} {kpi.unit}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span>
                                    {Math.round(
                                      (kpi.current / kpi.target) * 100,
                                    )}
                                    %
                                  </span>
                                </div>
                                <Progress
                                  value={Math.min(
                                    (kpi.current / kpi.target) * 100,
                                    100,
                                  )}
                                  className="h-1.5"
                                />
                              </div>
                            </TableCell>
                            <TableCell>{kpi.weight}%</TableCell>
                            <TableCell>
                              {kpi.period === "monthly"
                                ? "شهري"
                                : kpi.period === "quarterly"
                                  ? "ربع سنوي"
                                  : "سنوي"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${getKpiStatusColor(
                                    kpi.status,
                                  )}`}
                                ></div>
                                <span>
                                  {kpi.status === "exceeded"
                                    ? "متجاوز"
                                    : kpi.status === "achieved"
                                      ? "محقق"
                                      : kpi.status === "inProgress"
                                        ? "قيد التنفيذ"
                                        : kpi.status === "atRisk"
                                          ? "في خطر"
                                          : "غير محقق"}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">
                        تحليل الأداء
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">نقاط القوة</h4>
                          <ul className="space-y-1 text-sm">
                            {selectedEmployee.kpis
                              .filter(
                                (kpi) =>
                                  kpi.status === "exceeded" ||
                                  kpi.status === "achieved",
                              )
                              .map((kpi) => (
                                <li
                                  key={kpi.id}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                  <span>
                                    {kpi.name}:{" "}
                                    {Math.round(
                                      (kpi.current / kpi.target) * 100,
                                    )}
                                    %
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">مجالات التحسين</h4>
                          <ul className="space-y-1 text-sm">
                            {selectedEmployee.kpis
                              .filter(
                                (kpi) =>
                                  kpi.status === "atRisk" ||
                                  kpi.status === "failed",
                              )
                              .map((kpi) => (
                                <li
                                  key={kpi.id}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                  <span>
                                    {kpi.name}:{" "}
                                    {Math.round(
                                      (kpi.current / kpi.target) * 100,
                                    )}
                                    %
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* المهام */}
                {activeTab === "tasks" && (
                  <div className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">المهام المسندة</h3>
                      <Button size="sm">
                        <Plus className="ml-1 h-4 w-4" />
                        إضافة مهمة
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">المعرف</TableHead>
                          <TableHead>المهمة</TableHead>
                          <TableHead>تاريخ الإسناد</TableHead>
                          <TableHead>تاريخ الاستحقاق</TableHead>
                          <TableHead>الأولوية</TableHead>
                          <TableHead>نسبة الإنجاز</TableHead>
                          <TableHead>الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEmployee.tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">
                              {task.id}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{task.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {task.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(task.assignedDate).toLocaleDateString(
                                "ar-EG",
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(task.dueDate).toLocaleDateString(
                                "ar-EG",
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getTaskPriorityColor(task.priority)}
                                variant="outline"
                              >
                                {task.priority === "high"
                                  ? "عالية"
                                  : task.priority === "medium"
                                    ? "متوسطة"
                                    : "منخفضة"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span>{task.completionPercentage}%</span>
                                </div>
                                <Progress
                                  value={task.completionPercentage}
                                  className="h-1.5"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${getTaskStatusColor(
                                    task.status,
                                  )}`}
                                ></div>
                                <span>
                                  {task.status === "completed"
                                    ? "مكتمل"
                                    : task.status === "inProgress"
                                      ? "قيد التنفيذ"
                                      : task.status === "pending"
                                        ? "معلق"
                                        : "متأخر"}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {selectedEmployee.tasks.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>لا توجد مهام مسندة لهذا الموظف</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="ml-1 h-4 w-4" />
                          إضافة مهمة جديدة
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* الحوافز والمكافآت */}
                {activeTab === "rewards" && (
                  <div className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        الحوافز والمكافآت
                      </h3>
                      <Button
                        size="sm"
                        onClick={() => setShowRewardDialog(true)}
                      >
                        <Plus className="ml-1 h-4 w-4" />
                        إضافة مكافأة
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">المعرف</TableHead>
                          <TableHead>نوع المكافأة</TableHead>
                          <TableHead>العنوان</TableHead>
                          <TableHead>تاريخ المنح</TableHead>
                          <TableHead>القيمة</TableHead>
                          <TableHead>السبب</TableHead>
                          <TableHead>معتمد من</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEmployee.rewards.map((reward) => (
                          <TableRow key={reward.id}>
                            <TableCell className="font-medium">
                              {reward.id}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getRewardTypeColor(reward.type)}
                                variant="outline"
                              >
                                {reward.type === "bonus"
                                  ? "مكافأة مالية"
                                  : reward.type === "promotion"
                                    ? "ترقية"
                                    : reward.type === "certificate"
                                      ? "شهادة تقدير"
                                      : reward.type === "gift"
                                        ? "هدية"
                                        : "إجازة إضافية"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{reward.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {reward.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(reward.awardDate).toLocaleDateString(
                                "ar-EG",
                              )}
                            </TableCell>
                            <TableCell>
                              {reward.value
                                ? `${reward.value.toLocaleString()} ${reward.currency}`
                                : "-"}
                            </TableCell>
                            <TableCell>{reward.reason}</TableCell>
                            <TableCell>{reward.approvedBy}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {selectedEmployee.rewards.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Trophy className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>لا توجد مكافآت مسجلة لهذا الموظف</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowRewardDialog(true)}
                        >
                          <Plus className="ml-1 h-4 w-4" />
                          إضافة مكافأة جديدة
                        </Button>
                      </div>
                    )}

                    {selectedEmployee.rewards.length > 0 && (
                      <Card className="p-4">
                        <h3 className="text-lg font-semibold mb-4">
                          ملخص المكافآت
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 border rounded-md">
                            <p className="text-sm text-muted-foreground mb-1">
                              إجمالي المكافآت المالية
                            </p>
                            <p className="font-medium text-lg">
                              {selectedEmployee.rewards
                                .filter((r) => r.type === "bonus")
                                .reduce((sum, r) => sum + (r.value || 0), 0)
                                .toLocaleString()}{" "}
                              ₴
                            </p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <p className="text-sm text-muted-foreground mb-1">
                              عدد الشهادات
                            </p>
                            <p className="font-medium text-lg">
                              {
                                selectedEmployee.rewards.filter(
                                  (r) => r.type === "certificate",
                                ).length
                              }
                            </p>
                          </div>
                          <div className="p-3 border rounded-md">
                            <p className="text-sm text-muted-foreground mb-1">
                              عدد الترقيات
                            </p>
                            <p className="font-medium text-lg">
                              {
                                selectedEmployee.rewards.filter(
                                  (r) => r.type === "promotion",
                                ).length
                              }
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-muted-foreground">
              <Users className="h-16 w-16 mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">
                اختر موظفاً لعرض التفاصيل
              </h3>
              <p className="text-sm max-w-md text-center">
                يمكنك اختيار موظف من القائمة على اليمين لعرض كافة المعلومات
                والتفاصيل الخاصة به
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EmployeePerformanceSystem;
