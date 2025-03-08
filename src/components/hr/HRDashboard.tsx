import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  UserPlus,
  UserCheck,
  Calendar,
  Clock,
  Award,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  ChevronRight,
  Star,
} from "lucide-react";

// بيانات تجريبية للموظفين
const employeesData = [
  {
    id: "EMP001",
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    joinDate: "2022-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    status: "active",
    performanceScore: 92,
  },
  {
    id: "EMP002",
    name: "سارة خالد",
    position: "أخصائي تسويق",
    department: "التسويق",
    joinDate: "2022-03-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    status: "active",
    performanceScore: 88,
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    joinDate: "2021-11-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    status: "active",
    performanceScore: 85,
  },
  {
    id: "EMP004",
    name: "فاطمة أحمد",
    position: "محاسب",
    department: "المالية",
    joinDate: "2022-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    status: "active",
    performanceScore: 95,
  },
  {
    id: "EMP005",
    name: "خالد العتيبي",
    position: "مدير الموارد البشرية",
    department: "الموارد البشرية",
    joinDate: "2021-08-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
    status: "active",
    performanceScore: 90,
  },
  {
    id: "EMP006",
    name: "نورة السالم",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-02-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
    status: "onLeave",
    performanceScore: 82,
  },
  {
    id: "EMP007",
    name: "عبدالله الشمري",
    position: "مندوب مبيعات كبير",
    department: "المبيعات",
    joinDate: "2021-10-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
    status: "active",
    performanceScore: 87,
  },
  {
    id: "EMP008",
    name: "منى القحطاني",
    position: "مندوب مبيعات",
    department: "المبيعات",
    joinDate: "2022-04-12",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mona",
    status: "inactive",
    performanceScore: 78,
  },
  {
    id: "EMP009",
    name: "عمر الزهراني",
    position: "مهندس شبكات",
    department: "تقنية المعلومات",
    joinDate: "2021-09-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    status: "active",
    performanceScore: 89,
  },
  {
    id: "EMP010",
    name: "ليلى العنزي",
    position: "مصممة جرافيك",
    department: "التسويق",
    joinDate: "2022-06-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
    status: "active",
    performanceScore: 91,
  },
];

// بيانات تجريبية للإجازات
const leaveData = [
  { type: "سنوية", value: 45, color: "#0088FE" },
  { type: "مرضية", value: 20, color: "#00C49F" },
  { type: "بدون راتب", value: 10, color: "#FFBB28" },
  { type: "طارئة", value: 15, color: "#FF8042" },
  { type: "أمومة", value: 5, color: "#8884D8" },
];

// بيانات تجريبية للحضور
const attendanceData = [
  { month: "يناير", حضور: 95, غياب: 5 },
  { month: "فبراير", حضور: 92, غياب: 8 },
  { month: "مارس", حضور: 94, غياب: 6 },
  { month: "أبريل", حضور: 97, غياب: 3 },
  { month: "مايو", حضور: 93, غياب: 7 },
  { month: "يونيو", حضور: 96, غياب: 4 },
];

// بيانات تجريبية لتوزيع الأداء
const performanceDistribution = [
  { range: "90-100", count: 3, color: "#4CAF50" },
  { range: "80-89", count: 4, color: "#2196F3" },
  { range: "70-79", count: 2, color: "#FFC107" },
  { range: "60-69", count: 1, color: "#FF9800" },
  { range: "<60", count: 0, color: "#F44336" },
];

// بيانات تجريبية للتوظيف
const recruitmentData = [
  { stage: "طلبات التقديم", count: 45 },
  { stage: "فرز السير الذاتية", count: 30 },
  { stage: "المقابلات الأولية", count: 20 },
  { stage: "المقابلات الفنية", count: 12 },
  { stage: "عروض العمل", count: 8 },
  { stage: "التعيين", count: 5 },
];

// بيانات تجريبية للوظائف الشاغرة
const openPositions = [
  {
    id: "JOB001",
    title: "مدير مبيعات",
    department: "المبيعات",
    applicants: 12,
    status: "open",
    deadline: "2024-08-15",
  },
  {
    id: "JOB002",
    title: "مطور واجهة أمامية",
    department: "تقنية المعلومات",
    applicants: 18,
    status: "open",
    deadline: "2024-08-05",
  },
  {
    id: "JOB003",
    title: "محاسب",
    department: "المالية",
    applicants: 8,
    status: "open",
    deadline: "2024-08-10",
  },
  {
    id: "JOB004",
    title: "مسؤول تسويق رقمي",
    department: "التسويق",
    applicants: 15,
    status: "open",
    deadline: "2024-08-15",
  },
];

// بيانات تجريبية للإجازات القادمة
const upcomingLeaves = [
  {
    id: "LV001",
    employeeName: "نورة السالم",
    type: "سنوية",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
    status: "approved",
  },
  {
    id: "LV002",
    employeeName: "محمد علي",
    type: "مرضية",
    startDate: "2024-08-05",
    endDate: "2024-08-07",
    status: "approved",
  },
  {
    id: "LV003",
    employeeName: "فاطمة أحمد",
    type: "طارئة",
    startDate: "2024-08-12",
    endDate: "2024-08-13",
    status: "pending",
  },
];

// بيانات تجريبية للتدريب
const trainingData = [
  {
    id: "TR001",
    title: "مهارات القيادة",
    participants: 5,
    startDate: "2024-08-15",
    endDate: "2024-08-17",
    status: "upcoming",
  },
  {
    id: "TR002",
    title: "تطوير مهارات البيع",
    participants: 8,
    startDate: "2024-08-20",
    endDate: "2024-08-22",
    status: "upcoming",
  },
  {
    id: "TR003",
    title: "أساسيات الأمن السيبراني",
    participants: 4,
    startDate: "2024-09-05",
    endDate: "2024-09-07",
    status: "upcoming",
  },
];

// بيانات تجريبية لتقييمات الأداء القادمة
const upcomingReviews = [
  {
    id: "REV001",
    employeeName: "أحمد محمد",
    position: "مدير مبيعات",
    reviewDate: "2024-08-10",
    reviewer: "خالد العتيبي",
  },
  {
    id: "REV002",
    employeeName: "سارة خالد",
    position: "أخصائي تسويق",
    reviewDate: "2024-08-12",
    reviewer: "خالد العتيبي",
  },
  {
    id: "REV003",
    employeeName: "محمد علي",
    position: "مطور برمجيات",
    reviewDate: "2024-08-15",
    reviewer: "عمر الزهراني",
  },
];

// مكون لوحة تحكم الموارد البشرية
const HRDashboard = () => {
  // حساب إحصائيات الموظفين
  const totalEmployees = employeesData.length;
  const activeEmployees = employeesData.filter(
    (emp) => emp.status === "active",
  ).length;
  const onLeaveEmployees = employeesData.filter(
    (emp) => emp.status === "onLeave",
  ).length;
  const inactiveEmployees = employeesData.filter(
    (emp) => emp.status === "inactive",
  ).length;

  // حساب متوسط الأداء
  const averagePerformance =
    employeesData.reduce((sum, emp) => sum + emp.performanceScore, 0) /
    totalEmployees;

  // حساب توزيع الأقسام
  const departmentDistribution = employeesData.reduce(
    (acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const departmentData = Object.entries(departmentDistribution).map(
    ([name, value], index) => ({
      name,
      value,
      color: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"][index % 5],
    }),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">لوحة تحكم الموارد البشرية</h2>
        <div className="flex gap-2">
          <Button size="sm">
            <FileText className="ml-1 h-4 w-4" />
            تقرير شامل
          </Button>
        </div>
      </div>

      {/* بطاقات المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <h3 className="text-2xl font-bold mt-1">{totalEmployees}</h3>
                <p className="text-xs text-green-500 mt-1">
                  +2 في الشهر الحالي
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  الموظفين النشطين
                </p>
                <h3 className="text-2xl font-bold mt-1">{activeEmployees}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((activeEmployees / totalEmployees) * 100)}% من
                  الإجمالي
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.round(averagePerformance)}%
                </h3>
                <p className="text-xs text-green-500 mt-1">
                  +3% عن الربع السابق
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الوظائف الشاغرة</p>
                <h3 className="text-2xl font-bold mt-1">
                  {openPositions.length}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {upcomingLeaves.length} موظفين في إجازة
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* توزيع الموظفين حسب القسم */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">توزيع الموظفين حسب القسم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} موظف`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* اتجاهات الحضور */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">
              اتجاهات الحضور (آخر 6 أشهر)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="حضور"
                    stroke="#4CAF50"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="غياب"
                    stroke="#F44336"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع الإجازات حسب النوع */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">توزيع الإجازات حسب النوع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="type"
                    label={({ type, percent }) =>
                      `${type}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} إجازة`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* مسار التوظيف */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">مسار التوظيف</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recruitmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" name="عدد المرشحين" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الأقسام الإضافية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الوظائف الشاغرة */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">الوظائف الشاغرة</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                عرض الكل
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{position.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {position.department} • {position.applicants} متقدم
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="mb-1">
                      {position.status === "open" ? "مفتوحة" : "مغلقة"}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      تنتهي في {position.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* الإجازات القادمة */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">الإجازات القادمة</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                عرض الكل
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{leave.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} • {leave.startDate} إلى {leave.endDate}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${leave.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {leave.status === "approved"
                      ? "موافق عليها"
                      : "قيد الانتظار"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* التدريبات القادمة */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">التدريبات القادمة</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                عرض الكل
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingData.map((training) => (
                <div
                  key={training.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{training.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {training.startDate} إلى {training.endDate} •{" "}
                      {training.participants} مشاركين
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800"
                  >
                    قادم
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* تقييمات الأداء القادمة */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">تقييمات الأداء القادمة</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1">
                عرض الكل
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{review.employeeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.position} • المراجع: {review.reviewer}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{review.reviewDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أفضل الموظفين أداءً */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">أفضل الموظفين أداءً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employeesData
              .sort((a, b) => b.performanceScore - a.performanceScore)
              .slice(0, 6)
              .map((employee) => (
                <div
                  key={employee.id}
                  className="p-4 border rounded-md hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {employee.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">
                        {employee.performanceScore}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {employee.department}
                    </span>
                  </div>
                  <Progress value={employee.performanceScore} className="h-1" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard;
