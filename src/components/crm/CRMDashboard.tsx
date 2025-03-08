import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "recharts";
import {
  Users,
  UserCheck,
  Target,
  CheckCircle,
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const CRMDashboard = () => {
  // Sample data for KPIs
  const kpiData = {
    newCustomers: 24,
    activeCustomers: 156,
    openOpportunities: 38,
    closedOpportunities: 12,
    conversionRate: 31.5, // percentage
    customerRetention: 87.2, // percentage
  };

  // Sample data for monthly sales performance
  const monthlySalesData = [
    { month: "يناير", sales: 45000, target: 50000 },
    { month: "فبراير", sales: 52000, target: 50000 },
    { month: "مارس", sales: 48000, target: 50000 },
    { month: "أبريل", sales: 61000, target: 55000 },
    { month: "مايو", sales: 55000, target: 55000 },
    { month: "يونيو", sales: 67000, target: 60000 },
  ];

  // Sample data for customer distribution by category
  const customerDistributionData = [
    { name: "عملاء جدد", value: 24 },
    { name: "عملاء عاديون", value: 86 },
    { name: "عملاء مميزون", value: 38 },
    { name: "عملاء VIP", value: 32 },
  ];

  // Sample data for upcoming follow-ups
  const upcomingFollowUps = [
    {
      id: 1,
      customer: "شركة الأفق للتجارة",
      date: "2024-07-20",
      type: "اجتماع",
      priority: "عالية",
    },
    {
      id: 2,
      customer: "مؤسسة النور",
      date: "2024-07-21",
      type: "مكالمة هاتفية",
      priority: "متوسطة",
    },
    {
      id: 3,
      customer: "شركة الرياض للمقاولات",
      date: "2024-07-22",
      type: "عرض تقديمي",
      priority: "عالية",
    },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">العملاء الجدد</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.newCustomers}
                </h3>
                <p className="text-xs text-green-500 mt-1">
                  <ArrowUpRight className="inline h-3 w-3 mr-1" />
                  +12.5% عن الشهر السابق
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">العملاء النشطين</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.activeCustomers}
                </h3>
                <p className="text-xs text-green-500 mt-1">
                  <ArrowUpRight className="inline h-3 w-3 mr-1" />
                  +5.2% عن الشهر السابق
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الفرص المفتوحة</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.openOpportunities}
                </h3>
                <p className="text-xs text-green-500 mt-1">
                  <ArrowUpRight className="inline h-3 w-3 mr-1" />
                  +8.7% عن الشهر السابق
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الفرص المغلقة</p>
                <h3 className="text-2xl font-bold mt-1">
                  {kpiData.closedOpportunities}
                </h3>
                <p className="text-xs text-red-500 mt-1">
                  <ArrowDownRight className="inline h-3 w-3 mr-1" />
                  -3.1% عن الشهر السابق
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Performance Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>أداء المبيعات الشهري</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `${value.toLocaleString()} ₴`}
                  />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    name="المبيعات"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="target"
                    name="المستهدف"
                    fill="#e2e8f0"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Distribution Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>توزيع العملاء حسب الفئة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDistributionData}
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
                    {customerDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} عميل`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications and Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">التنبيهات</CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">
                    5 عملاء لم يتم التواصل معهم منذ أكثر من 30 يوم
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    3 فرص بيعية تحتاج إلى متابعة اليوم
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    تم إضافة 8 عملاء جدد هذا الأسبوع
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Follow-ups */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              المتابعات القادمة
            </CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingFollowUps.map((followUp) => (
                <div
                  key={followUp.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{followUp.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {followUp.date}
                      </span>
                      <span className="text-xs">{followUp.type}</span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${followUp.priority === "عالية" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}
                    >
                      {followUp.priority}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                عرض جميع المتابعات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          إضافة عميل جديد
        </Button>
        <Button className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          إنشاء فرصة بيعية
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          جدولة متابعة
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          إدارة التنبيهات
        </Button>
      </div>
    </div>
  );
};

export default CRMDashboard;
