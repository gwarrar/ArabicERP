import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User,
  FileText,
  BarChart2,
  ShoppingCart,
  CheckSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Award,
  Trophy,
  Crown,
  Gift,
  Sparkles,
} from "lucide-react";

interface EmployeeDetailsPopupProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
  rewardSettings?: any;
}

// Dummy data for employee details
const employeeInvoices = [
  {
    id: "INV-001",
    date: "2024-08-05",
    customer: "شركة الأمل",
    amount: 12500,
    status: "مدفوعة",
  },
  {
    id: "INV-002",
    date: "2024-08-10",
    customer: "مؤسسة النور",
    amount: 8750,
    status: "مدفوعة",
  },
  {
    id: "INV-003",
    date: "2024-08-15",
    customer: "شركة البناء الحديث",
    amount: 15000,
    status: "معلقة",
  },
  {
    id: "INV-004",
    date: "2024-08-20",
    customer: "مؤسسة الإعمار",
    amount: 9500,
    status: "معلقة",
  },
];

const employeeTasks = [
  {
    id: "TASK-001",
    title: "متابعة عميل شركة الأمل",
    dueDate: "2024-08-25",
    status: "قيد التنفيذ",
    priority: "عالية",
  },
  {
    id: "TASK-002",
    title: "تقديم عرض سعر لمؤسسة النور",
    dueDate: "2024-08-27",
    status: "مكتملة",
    priority: "متوسطة",
  },
  {
    id: "TASK-003",
    title: "اجتماع مع شركة البناء الحديث",
    dueDate: "2024-08-30",
    status: "قيد التنفيذ",
    priority: "عالية",
  },
  {
    id: "TASK-004",
    title: "متابعة طلبية مؤسسة الإعمار",
    dueDate: "2024-09-02",
    status: "لم تبدأ",
    priority: "منخفضة",
  },
];

const employeePerformanceHistory = [
  { month: "يناير", performance: 82, sales: 78000 },
  { month: "فبراير", performance: 85, sales: 82000 },
  { month: "مارس", performance: 80, sales: 76000 },
  { month: "أبريل", performance: 88, sales: 90000 },
  { month: "مايو", performance: 90, sales: 95000 },
  { month: "يونيو", performance: 92, sales: 98000 },
  { month: "يوليو", performance: 94, sales: 105000 },
  { month: "أغسطس", performance: 95, sales: 125000 },
];

const EmployeeDetailsPopup: React.FC<EmployeeDetailsPopupProps> = ({
  employee,
  isOpen,
  onClose,
  rewardSettings,
}) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            تفاصيل الموظف: {employee.name}
          </DialogTitle>
          <DialogDescription>
            عرض تفاصيل الأداء والمبيعات والمهام للموظف
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline" className="mt-1">
                {employee.position}
              </Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">{employee.department}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge
                className={`${employee.rank <= 3 ? "bg-amber-200 text-amber-800" : "bg-muted"}`}
              >
                الترتيب: {employee.rank}
              </Badge>
              {employee.trend === "up" ? (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> تحسن
                </Badge>
              ) : employee.trend === "down" ? (
                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 transform rotate-180" /> تراجع
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-800">مستقر</Badge>
              )}
            </div>
          </div>
          <div className="text-center border-r pr-4">
            <div className="text-3xl font-bold">{employee.performance}%</div>
            <div className="text-sm text-muted-foreground">الأداء العام</div>
            <Progress value={employee.performance} className="h-2 mt-2 w-32" />
          </div>
          <div className="text-center border-r pr-4">
            <div className="text-3xl font-bold">
              ₴ {employee.sales.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي المبيعات</div>
            <div className="text-xs text-muted-foreground mt-1">
              {employee.sales >= employee.target ? (
                <span className="text-green-600">
                  تجاوز الهدف بنسبة{" "}
                  {Math.round((employee.sales / employee.target - 1) * 100)}%
                </span>
              ) : (
                <span className="text-amber-600">
                  {Math.round((employee.sales / employee.target) * 100)}% من
                  الهدف
                </span>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger
              value="performance"
              className="flex items-center gap-1"
            >
              <BarChart2 className="h-4 w-4" />
              الأداء
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              الفواتير
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              المهام
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              الإنجازات
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              المكافآت
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <BarChart2 className="h-5 w-5 inline-block ml-2" />
                  تاريخ الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-right font-medium">
                          الشهر
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          نسبة الأداء
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          المبيعات
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          التغيير
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeePerformanceHistory.map((month, index) => {
                        const prevMonth =
                          index > 0
                            ? employeePerformanceHistory[index - 1]
                            : null;
                        const performanceChange = prevMonth
                          ? month.performance - prevMonth.performance
                          : 0;
                        const salesChange = prevMonth
                          ? month.sales - prevMonth.sales
                          : 0;

                        return (
                          <tr
                            key={month.month}
                            className="border-t hover:bg-muted/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium">
                              {month.month}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={month.performance}
                                  className="h-2 w-24"
                                />
                                <span>{month.performance}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              ₴ {month.sales.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-col">
                                <span
                                  className={`text-xs ${performanceChange > 0 ? "text-green-600" : performanceChange < 0 ? "text-red-600" : "text-gray-600"}`}
                                >
                                  {performanceChange > 0 ? "+" : ""}
                                  {performanceChange}% أداء
                                </span>
                                <span
                                  className={`text-xs ${salesChange > 0 ? "text-green-600" : salesChange < 0 ? "text-red-600" : "text-gray-600"}`}
                                >
                                  {salesChange > 0 ? "+" : ""}₴{" "}
                                  {salesChange.toLocaleString()} مبيعات
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <TrendingUp className="h-5 w-5 inline-block ml-2" />
                    مؤشرات الأداء الرئيسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        نسبة تحقيق الهدف
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round((employee.sales / employee.target) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(employee.sales / employee.target) * 100}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        معدل إغلاق الصفقات
                      </span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">رضا العملاء</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        الالتزام بالمواعيد
                      </span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <DollarSign className="h-5 w-5 inline-block ml-2" />
                    تحليل المبيعات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                      <div>
                        <div className="text-sm font-medium">
                          متوسط قيمة الصفقة
                        </div>
                        <div className="text-2xl font-bold">₴ 12,500</div>
                      </div>
                      <ShoppingCart className="h-10 w-10 text-primary/40" />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                      <div>
                        <div className="text-sm font-medium">
                          عدد العملاء الجدد
                        </div>
                        <div className="text-2xl font-bold">5</div>
                      </div>
                      <User className="h-10 w-10 text-primary/40" />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                      <div>
                        <div className="text-sm font-medium">
                          معدل النمو الشهري
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          +15%
                        </div>
                      </div>
                      <TrendingUp className="h-10 w-10 text-green-500/40" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <FileText className="h-5 w-5 inline-block ml-2" />
                  فواتير المبيعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-right font-medium">
                          رقم الفاتورة
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          التاريخ
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          العميل
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          المبلغ
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          الحالة
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-t hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium">
                            {invoice.id}
                          </td>
                          <td className="py-3 px-4">{invoice.date}</td>
                          <td className="py-3 px-4">{invoice.customer}</td>
                          <td className="py-3 px-4 font-medium">
                            ₴ {invoice.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${invoice.status === "مدفوعة" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-muted/30 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        إجمالي المبيعات (الشهر الحالي)
                      </span>
                      <div className="text-2xl font-bold">₴ 45,750</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        عدد الفواتير
                      </span>
                      <div className="text-2xl font-bold">4</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        نسبة التحصيل
                      </span>
                      <div className="text-2xl font-bold text-green-600">
                        52%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <CheckSquare className="h-5 w-5 inline-block ml-2" />
                  المهام والأنشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-right font-medium">
                          رقم المهمة
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          العنوان
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          تاريخ الاستحقاق
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          الأولوية
                        </th>
                        <th className="py-3 px-4 text-right font-medium">
                          الحالة
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeTasks.map((task) => (
                        <tr
                          key={task.id}
                          className="border-t hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium">{task.id}</td>
                          <td className="py-3 px-4">{task.title}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {task.dueDate}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${task.priority === "عالية" ? "bg-red-100 text-red-800" : task.priority === "متوسطة" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}
                            >
                              {task.priority}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${task.status === "مكتملة" ? "bg-green-100 text-green-800" : task.status === "قيد التنفيذ" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {task.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="text-sm text-green-600 font-medium">
                      مكتملة
                    </div>
                    <div className="text-2xl font-bold">1</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="text-sm text-blue-600 font-medium">
                      قيد التنفيذ
                    </div>
                    <div className="text-2xl font-bold">2</div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <div className="text-sm text-gray-600 font-medium">
                      لم تبدأ
                    </div>
                    <div className="text-2xl font-bold">1</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Award className="h-5 w-5 inline-block ml-2" />
                  الإنجازات والجوائز
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-600" />
                      الإنجازات
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {employee.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 p-2 bg-white rounded border border-amber-100"
                        >
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        مؤشرات الأداء
                      </h3>
                      <div className="mt-3 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>المبيعات مقابل الهدف</span>
                            <span>
                              {Math.round(
                                (employee.sales / employee.target) * 100,
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(employee.sales / employee.target) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>الأداء العام</span>
                            <span>{employee.performance}%</span>
                          </div>
                          <Progress
                            value={employee.performance}
                            className="h-2 mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        النشاط الأخير
                      </h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex justify-between p-2 bg-white rounded border border-green-100">
                          <span>آخر فاتورة</span>
                          <span className="font-medium">منذ 3 أيام</span>
                        </li>
                        <li className="flex justify-between p-2 bg-white rounded border border-green-100">
                          <span>آخر مهمة مكتملة</span>
                          <span className="font-medium">منذ 5 أيام</span>
                        </li>
                        <li className="flex justify-between p-2 bg-white rounded border border-green-100">
                          <span>آخر عميل جديد</span>
                          <span className="font-medium">منذ أسبوع</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <Trophy className="h-5 w-5 inline-block ml-2 text-amber-500" />
                  المكافآت والحوافز
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Ranking */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Crown className="h-5 w-5 text-amber-500" />
                      الترتيب الحالي
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-800 text-2xl font-bold">
                        {employee.rank}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">
                          الترتيب من أصل 8 موظف
                        </div>
                        <div className="flex items-center gap-2">
                          {employee.trend === "up" ? (
                            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" /> تحسن من المركز{" "}
                              {employee.previousRank}
                            </Badge>
                          ) : employee.trend === "down" ? (
                            <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 transform rotate-180" />{" "}
                              تراجع من المركز {employee.previousRank}
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800">
                              مستقر
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reward Information */}
                  {employee.rank <= 3 && rewardSettings && (
                    <div className="p-4 bg-white rounded-lg border border-amber-200 shadow-sm">
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                        <Gift className="h-5 w-5 text-amber-500" />
                        مكافأة الأداء
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-amber-50 border-2 border-amber-300">
                          <div className="text-xl font-bold text-amber-800">
                            {rewardSettings.rewards[employee.rank - 1].currency}
                            {rewardSettings.rewards[
                              employee.rank - 1
                            ].amount.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">
                            {employee.rank === 1
                              ? "المركز الأول"
                              : employee.rank === 2
                                ? "المركز الثاني"
                                : "المركز الثالث"}
                          </div>
                          <div className="text-sm">{rewardSettings.title}</div>
                          <div className="mt-2">
                            <Badge className="bg-amber-100 text-amber-800">
                              {rewardSettings.currentMonth}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h3 className="text-md font-bold flex items-center gap-2 mb-3">
                        <BarChart2 className="h-5 w-5 text-blue-500" />
                        مؤشرات الأداء
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>الأداء العام</span>
                            <span>{employee.performance}%</span>
                          </div>
                          <Progress
                            value={employee.performance}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>تحقيق الهدف</span>
                            <span>
                              {Math.round(
                                (employee.sales / employee.target) * 100,
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={(employee.sales / employee.target) * 100}
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>معدل إغلاق الصفقات</span>
                            <span>78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>رضا العملاء</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border">
                      <h3 className="text-md font-bold flex items-center gap-2 mb-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        المبيعات والإنجازات
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                          <div className="text-sm font-medium">
                            إجمالي المبيعات
                          </div>
                          <div className="font-bold">
                            ₴ {employee.sales.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                          <div className="text-sm font-medium">الهدف</div>
                          <div className="font-bold">
                            ₴ {employee.target.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                          <div className="text-sm font-medium">
                            متوسط قيمة الصفقة
                          </div>
                          <div className="font-bold">₴ 12,500</div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                          <div className="text-sm font-medium">
                            عدد العملاء الجدد
                          </div>
                          <div className="font-bold">5</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Criteria */}
                  {rewardSettings && (
                    <div className="p-4 bg-white rounded-lg border">
                      <h3 className="text-md font-bold flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        معايير التقييم
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {rewardSettings.criteria.map((criterion, index) => (
                          <li key={index}>{criterion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsPopup;
