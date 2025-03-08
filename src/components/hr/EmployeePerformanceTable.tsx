import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Printer,
  BarChart2,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Star,
} from "lucide-react";

// نموذج بيانات الموظف الموسع
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
  performanceScore: number;
  // بيانات المبيعات
  sales: {
    totalSales: number; // إجمالي المبيعات
    targetSales: number; // المستهدف
    salesAchievement: number; // نسبة تحقيق المستهدف
    deals: {
      total: number; // إجمالي الصفقات
      won: number; // الصفقات الناجحة
      lost: number; // الصفقات الخاسرة
      pending: number; // الصفقات المعلقة
    };
    averageDealSize: number; // متوسط حجم الصفقة
    conversionRate: number; // معدل التحويل
  };
  // بيانات العمل
  work: {
    tasksCompleted: number; // المهام المكتملة
    totalTasks: number; // إجمالي المهام
    projectsInvolved: number; // المشاريع المشارك فيها
    attendanceRate: number; // نسبة الحضور
    overtimeHours: number; // ساعات العمل الإضافية
  };
  // بيانات العملاء
  customers: {
    total: number; // إجمالي العملاء
    new: number; // العملاء الجدد
    retained: number; // العملاء المحتفظ بهم
    satisfactionRate: number; // معدل رضا العملاء
  };
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
    sales: {
      totalSales: 1250000,
      targetSales: 1000000,
      salesAchievement: 125,
      deals: {
        total: 45,
        won: 38,
        lost: 5,
        pending: 2,
      },
      averageDealSize: 32895,
      conversionRate: 84.4,
    },
    work: {
      tasksCompleted: 78,
      totalTasks: 85,
      projectsInvolved: 12,
      attendanceRate: 98.5,
      overtimeHours: 15,
    },
    customers: {
      total: 42,
      new: 12,
      retained: 30,
      satisfactionRate: 95,
    },
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
    sales: {
      totalSales: 850000,
      targetSales: 800000,
      salesAchievement: 106.25,
      deals: {
        total: 32,
        won: 25,
        lost: 4,
        pending: 3,
      },
      averageDealSize: 34000,
      conversionRate: 78.1,
    },
    work: {
      tasksCompleted: 65,
      totalTasks: 72,
      projectsInvolved: 8,
      attendanceRate: 96.2,
      overtimeHours: 8,
    },
    customers: {
      total: 28,
      new: 8,
      retained: 20,
      satisfactionRate: 92,
    },
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2021-11-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    email: "mohammed@example.com",
    phone: "+380 50 345 6789",
    status: "active",
    performanceScore: 85,
    sales: {
      totalSales: 720000,
      targetSales: 700000,
      salesAchievement: 102.86,
      deals: {
        total: 28,
        won: 22,
        lost: 6,
        pending: 0,
      },
      averageDealSize: 32727,
      conversionRate: 78.6,
    },
    work: {
      tasksCompleted: 58,
      totalTasks: 65,
      projectsInvolved: 6,
      attendanceRate: 94.8,
      overtimeHours: 12,
    },
    customers: {
      total: 25,
      new: 5,
      retained: 20,
      satisfactionRate: 88,
    },
  },
  {
    id: "EMP004",
    name: "فاطمة أحمد",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    email: "fatima@example.com",
    phone: "+380 50 456 7890",
    status: "active",
    performanceScore: 95,
    sales: {
      totalSales: 1350000,
      targetSales: 1200000,
      salesAchievement: 112.5,
      deals: {
        total: 48,
        won: 42,
        lost: 4,
        pending: 2,
      },
      averageDealSize: 32143,
      conversionRate: 87.5,
    },
    work: {
      tasksCompleted: 82,
      totalTasks: 85,
      projectsInvolved: 10,
      attendanceRate: 99.2,
      overtimeHours: 18,
    },
    customers: {
      total: 45,
      new: 15,
      retained: 30,
      satisfactionRate: 96,
    },
  },
  {
    id: "EMP005",
    name: "خالد العتيبي",
    position: "مدير فريق المبيعات",
    department: "المبيعات",
    joinDate: "2021-08-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
    email: "khalid@example.com",
    phone: "+380 50 567 8901",
    status: "active",
    performanceScore: 90,
    sales: {
      totalSales: 1150000,
      targetSales: 1100000,
      salesAchievement: 104.55,
      deals: {
        total: 40,
        won: 35,
        lost: 3,
        pending: 2,
      },
      averageDealSize: 32857,
      conversionRate: 87.5,
    },
    work: {
      tasksCompleted: 75,
      totalTasks: 80,
      projectsInvolved: 15,
      attendanceRate: 97.5,
      overtimeHours: 20,
    },
    customers: {
      total: 38,
      new: 10,
      retained: 28,
      satisfactionRate: 93,
    },
  },
  {
    id: "EMP006",
    name: "نورة السالم",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-02-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    email: "noura@example.com",
    phone: "+380 50 678 9012",
    status: "active",
    performanceScore: 82,
    sales: {
      totalSales: 680000,
      targetSales: 700000,
      salesAchievement: 97.14,
      deals: {
        total: 25,
        won: 20,
        lost: 5,
        pending: 0,
      },
      averageDealSize: 34000,
      conversionRate: 80,
    },
    work: {
      tasksCompleted: 55,
      totalTasks: 65,
      projectsInvolved: 5,
      attendanceRate: 95.5,
      overtimeHours: 5,
    },
    customers: {
      total: 22,
      new: 6,
      retained: 16,
      satisfactionRate: 90,
    },
  },
  {
    id: "EMP007",
    name: "عبدالله الشمري",
    position: "مندوب مبيعات كبير",
    department: "المبيعات",
    joinDate: "2021-10-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
    email: "abdullah@example.com",
    phone: "+380 50 789 0123",
    status: "active",
    performanceScore: 87,
    sales: {
      totalSales: 950000,
      targetSales: 900000,
      salesAchievement: 105.56,
      deals: {
        total: 35,
        won: 30,
        lost: 3,
        pending: 2,
      },
      averageDealSize: 31667,
      conversionRate: 85.7,
    },
    work: {
      tasksCompleted: 70,
      totalTasks: 75,
      projectsInvolved: 8,
      attendanceRate: 96.8,
      overtimeHours: 15,
    },
    customers: {
      total: 32,
      new: 8,
      retained: 24,
      satisfactionRate: 92,
    },
  },
  {
    id: "EMP008",
    name: "منى القحطاني",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-04-12",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mona",
    email: "mona@example.com",
    phone: "+380 50 890 1234",
    status: "active",
    performanceScore: 78,
    sales: {
      totalSales: 620000,
      targetSales: 650000,
      salesAchievement: 95.38,
      deals: {
        total: 22,
        won: 18,
        lost: 4,
        pending: 0,
      },
      averageDealSize: 34444,
      conversionRate: 81.8,
    },
    work: {
      tasksCompleted: 50,
      totalTasks: 60,
      projectsInvolved: 4,
      attendanceRate: 93.5,
      overtimeHours: 8,
    },
    customers: {
      total: 20,
      new: 5,
      retained: 15,
      satisfactionRate: 85,
    },
  },
];

// نوع البيانات للتصفية
type FilterType = {
  searchTerm: string;
  department: string;
  performanceMin: number;
  performanceMax: number;
  salesMin: number;
  salesMax: number;
  sortBy: keyof typeof sortOptions;
  sortDirection: "asc" | "desc";
};

// خيارات الترتيب
const sortOptions = {
  name: "الاسم",
  performanceScore: "الأداء العام",
  "sales.totalSales": "إجمالي المبيعات",
  "sales.salesAchievement": "نسبة تحقيق المستهدف",
  "sales.conversionRate": "معدل التحويل",
  "work.tasksCompleted": "المهام المكتملة",
  "work.attendanceRate": "نسبة الحضور",
  "customers.total": "إجمالي العملاء",
  "customers.satisfactionRate": "رضا العملاء",
};

// مكون جدول أداء الموظفين
const EmployeePerformanceTable: React.FC = () => {
  // حالة التصفية
  const [filters, setFilters] = useState<FilterType>({
    searchTerm: "",
    department: "all",
    performanceMin: 0,
    performanceMax: 100,
    salesMin: 0,
    salesMax: 2000000,
    sortBy: "performanceScore",
    sortDirection: "desc",
  });

  // حالة الموظفين المحددين للمقارنة
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // الأقسام المتاحة
  const departments = Array.from(
    new Set(employeesData.map((employee) => employee.department)),
  );

  // تحديث حالة التصفية
  const handleFilterChange = (key: keyof FilterType, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  // تبديل اتجاه الترتيب
  const toggleSortDirection = () => {
    setFilters({
      ...filters,
      sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
    });
  };

  // تحديد/إلغاء تحديد موظف للمقارنة
  const toggleEmployeeSelection = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      // لا تسمح بتحديد أكثر من 3 موظفين للمقارنة
      if (selectedEmployees.length < 3) {
        setSelectedEmployees([...selectedEmployees, employeeId]);
      }
    }
  };

  // الحصول على قيمة حقل متداخل من كائن
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  };

  // تصفية وترتيب الموظفين
  const filteredEmployees = useMemo(() => {
    return employeesData
      .filter((employee) => {
        // تصفية حسب البحث
        const matchesSearch =
          employee.name.includes(filters.searchTerm) ||
          employee.position.includes(filters.searchTerm) ||
          employee.id.includes(filters.searchTerm);

        // تصفية حسب القسم
        const matchesDepartment =
          filters.department === "all" ||
          employee.department === filters.department;

        // تصفية حسب الأداء
        const matchesPerformance =
          employee.performanceScore >= filters.performanceMin &&
          employee.performanceScore <= filters.performanceMax;

        // تصفية حسب المبيعات
        const matchesSales =
          employee.sales.totalSales >= filters.salesMin &&
          employee.sales.totalSales <= filters.salesMax;

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesPerformance &&
          matchesSales
        );
      })
      .sort((a, b) => {
        // الحصول على قيم الترتيب
        const aValue = getNestedValue(a, filters.sortBy);
        const bValue = getNestedValue(b, filters.sortBy);

        // ترتيب تصاعدي أو تنازلي
        if (filters.sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [filters]);

  // الموظفون المحددون للمقارنة
  const employeesToCompare = useMemo(() => {
    return employeesData.filter((employee) =>
      selectedEmployees.includes(employee.id),
    );
  }, [selectedEmployees]);

  // تنسيق الأرقام
  const formatNumber = (num: number, currency: boolean = false) => {
    return currency ? `${num.toLocaleString()} ₴` : num.toLocaleString();
  };

  // تنسيق النسب المئوية
  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  // الحصول على لون حالة الأداء
  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    if (score >= 60) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  // الحصول على لون حالة تحقيق المستهدف
  const getAchievementColor = (percentage: number): string => {
    if (percentage >= 110) return "bg-green-100 text-green-800";
    if (percentage >= 100) return "bg-blue-100 text-blue-800";
    if (percentage >= 90) return "bg-yellow-100 text-yellow-800";
    if (percentage >= 80) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">جدول أداء الموظفين والمبيعات</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
          <Button size="sm" variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* قسم التصفية */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">بحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="بحث باسم الموظف أو المنصب..."
                  className="pr-10"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    handleFilterChange("searchTerm", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">القسم</label>
              <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent border-none text-sm focus:outline-none w-full"
                  value={filters.department}
                  onChange={(e) =>
                    handleFilterChange("department", e.target.value)
                  }
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

            <div className="space-y-2">
              <label className="text-sm font-medium">ترتيب حسب</label>
              <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-transparent border-none text-sm focus:outline-none w-full"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  {Object.entries(sortOptions).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSortDirection}
                >
                  {filters.sortDirection === "asc" ? (
                    <span className="text-xs">↑</span>
                  ) : (
                    <span className="text-xs">↓</span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                نطاق الأداء ({filters.performanceMin}% -{" "}
                {filters.performanceMax}%)
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.performanceMin}
                  onChange={(e) =>
                    handleFilterChange(
                      "performanceMin",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full"
                />
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.performanceMax}
                  onChange={(e) =>
                    handleFilterChange(
                      "performanceMax",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                نطاق المبيعات ({formatNumber(filters.salesMin, true)} -{" "}
                {formatNumber(filters.salesMax, true)})
              </label>
              <div className="flex items-center gap-4">
                <Input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={filters.salesMin}
                  onChange={(e) =>
                    handleFilterChange("salesMin", parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <Input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={filters.salesMax}
                  onChange={(e) =>
                    handleFilterChange("salesMax", parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول الموظفين */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">تحديد</TableHead>
                  <TableHead>الموظف</TableHead>
                  <TableHead>الأداء العام</TableHead>
                  <TableHead>المبيعات</TableHead>
                  <TableHead>تحقيق المستهدف</TableHead>
                  <TableHead>الصفقات</TableHead>
                  <TableHead>معدل التحويل</TableHead>
                  <TableHead>المهام</TableHead>
                  <TableHead>العملاء</TableHead>
                  <TableHead>رضا العملاء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد بيانات مطابقة للتصفية</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => toggleEmployeeSelection(employee.id)}
                          disabled={
                            selectedEmployees.length >= 3 &&
                            !selectedEmployees.includes(employee.id)
                          }
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              employee.avatar ||
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                            }
                            alt={employee.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {employee.position} - {employee.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <Badge
                              className={getPerformanceColor(
                                employee.performanceScore,
                              )}
                              variant="outline"
                            >
                              {employee.performanceScore}%
                            </Badge>
                          </div>
                          <Progress
                            value={employee.performanceScore}
                            className="h-1.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">
                            {formatNumber(employee.sales.totalSales, true)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getAchievementColor(
                            employee.sales.salesAchievement,
                          )}
                          variant="outline"
                        >
                          {formatPercentage(employee.sales.salesAchievement)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{employee.sales.deals.won}</span>
                            <span className="text-muted-foreground mx-1">
                              /
                            </span>
                            <span>{employee.sales.deals.total}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatPercentage(employee.sales.conversionRate)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                            <span>{employee.work.tasksCompleted}</span>
                            <span className="text-muted-foreground mx-1">
                              /
                            </span>
                            <span>{employee.work.totalTasks}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {employee.customers.total}
                            </span>
                            <span className="text-xs text-green-600">
                              (+{employee.customers.new})
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>
                            {formatPercentage(
                              employee.customers.satisfactionRate,
                            )}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* قسم المقارنة */}
      {selectedEmployees.length > 0 && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>مقارنة أداء الموظفين المحددين</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* مقارنة الأداء العام */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    الأداء العام
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesToCompare.map((employee) => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{employee.name}</span>
                        <span className="text-sm font-medium">
                          {employee.performanceScore}%
                        </span>
                      </div>
                      <Progress
                        value={employee.performanceScore}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* مقارنة المبيعات */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesToCompare.map((employee) => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{employee.name}</span>
                        <span className="text-sm font-medium">
                          {formatNumber(employee.sales.totalSales, true)}
                        </span>
                      </div>
                      <Progress
                        value={(employee.sales.totalSales / 2000000) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* مقارنة تحقيق المستهدف */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    تحقيق المستهدف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesToCompare.map((employee) => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{employee.name}</span>
                        <span className="text-sm font-medium">
                          {formatPercentage(employee.sales.salesAchievement)}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(employee.sales.salesAchievement, 150)}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* مقارنة معدل التحويل */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    معدل التحويل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesToCompare.map((employee) => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{employee.name}</span>
                        <span className="text-sm font-medium">
                          {formatPercentage(employee.sales.conversionRate)}
                        </span>
                      </div>
                      <Progress
                        value={employee.sales.conversionRate}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* مقارنة رضا العملاء */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    رضا العملاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employeesToCompare.map((employee) => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{employee.name}</span>
                        <span className="text-sm font-medium">
                          {formatPercentage(
                            employee.customers.satisfactionRate,
                          )}
                        </span>
                      </div>
                      <Progress
                        value={employee.customers.satisfactionRate}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedEmployees([])}
                className="w-full"
              >
                إلغاء تحديد الموظفين
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeePerformanceTable;
