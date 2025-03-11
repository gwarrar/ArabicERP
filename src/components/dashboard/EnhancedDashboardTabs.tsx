import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Printer,
  Settings,
  HelpCircle,
  Bell,
  ChevronRight,
  Clock,
  Truck,
  FileText,
  BarChart,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  CreditCard,
  Wallet,
  Landmark,
  Building,
  Target,
  Maximize,
  Minimize,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import SalesChart from "./SalesChart";
import CashFlowChart from "./CashFlowChart";
import ExchangeRateWidget from "./ExchangeRateWidget";

const EnhancedDashboardTabs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate] = useState(
    new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // بيانات تجريبية للإحصائيات
  const stats = {
    sales: {
      today: 12500,
      yesterday: 10800,
      thisMonth: 325000,
      lastMonth: 298000,
      percentChange: 9.06,
      trend: "up",
    },
    purchases: {
      today: 8200,
      yesterday: 7500,
      thisMonth: 215000,
      lastMonth: 205000,
      percentChange: 4.87,
      trend: "up",
    },
    profit: {
      today: 4300,
      yesterday: 3300,
      thisMonth: 110000,
      lastMonth: 93000,
      percentChange: 18.27,
      trend: "up",
    },
    expenses: {
      today: 2100,
      yesterday: 2500,
      thisMonth: 65000,
      lastMonth: 72000,
      percentChange: -9.72,
      trend: "down",
    },
  };

  // بيانات تجريبية للمهام والتنبيهات
  const tasks = [
    {
      id: 1,
      title: "مراجعة فواتير المشتريات",
      dueDate: "اليوم",
      priority: "عالية",
      status: "pending",
    },
    {
      id: 2,
      title: "تحديث قوائم الجرد",
      dueDate: "غداً",
      priority: "متوسطة",
      status: "in-progress",
    },
    {
      id: 3,
      title: "إعداد تقرير المبيعات الشهري",
      dueDate: "بعد 3 أيام",
      priority: "عالية",
      status: "pending",
    },
    {
      id: 4,
      title: "مراجعة طلبات العملاء الجديدة",
      dueDate: "اليوم",
      priority: "منخفضة",
      status: "completed",
    },
  ];

  const alerts = [
    {
      id: 1,
      title: "انخفاض مخزون المنتج #1052",
      type: "warning",
      time: "منذ 30 دقيقة",
    },
    {
      id: 2,
      title: "فاتورة مشتريات جديدة بانتظار الموافقة",
      type: "info",
      time: "منذ ساعة",
    },
    {
      id: 3,
      title: "اكتمال شحنة المنتجات #45892",
      type: "success",
      time: "منذ 3 ساعات",
    },
    {
      id: 4,
      title: "تأخر سداد العميل رقم #C-2024-15",
      type: "error",
      time: "منذ يوم",
    },
  ];

  // بيانات تجريبية للمؤشرات الرئيسية
  const kpis = [
    { title: "معدل دوران المخزون", value: "4.2x", change: "+0.3", trend: "up" },
    {
      title: "متوسط قيمة الطلب",
      value: "₴ 1,250",
      change: "+5.2%",
      trend: "up",
    },
    { title: "نسبة التحصيل", value: "92%", change: "-1.5%", trend: "down" },
    { title: "معدل النمو الشهري", value: "8.7%", change: "+2.1%", trend: "up" },
  ];

  // بيانات تجريبية للأنشطة الأخيرة
  const recentActivities = [
    {
      id: 1,
      action: "إنشاء فاتورة مبيعات جديدة",
      user: "أحمد محمد",
      time: "منذ 15 دقيقة",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      action: "استلام شحنة من المورد",
      user: "سارة أحمد",
      time: "منذ 45 دقيقة",
      icon: <Truck className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      action: "تحديث بيانات العميل",
      user: "محمد علي",
      time: "منذ ساعة",
      icon: <Users className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      action: "إضافة منتج جديد للمخزون",
      user: "فاطمة حسن",
      time: "منذ 3 ساعات",
      icon: <Package className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 5,
      action: "تسجيل مصروفات تشغيلية",
      user: "خالد العبدالله",
      time: "منذ 5 ساعات",
      icon: <DollarSign className="h-4 w-4 text-red-500" />,
    },
  ];

  // الحصول على أيقونة الاتجاه
  const getTrendIcon = (trend, size = 4) => {
    if (trend === "up")
      return <TrendingUp className={`h-${size} w-${size} text-green-500`} />;
    if (trend === "down")
      return <TrendingDown className={`h-${size} w-${size} text-red-500`} />;
    return null;
  };

  // الحصول على لون الأولوية
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "عالية":
        return "text-red-500";
      case "متوسطة":
        return "text-amber-500";
      case "منخفضة":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // الحصول على لون وأيقونة نوع التنبيه
  const getAlertTypeInfo = (type) => {
    switch (type) {
      case "warning":
        return {
          color: "bg-amber-100 text-amber-800",
          icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
        };
      case "info":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Bell className="h-4 w-4 text-blue-500" />,
        };
      case "success":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        };
      case "error":
        return {
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="h-4 w-4 text-red-500" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Bell className="h-4 w-4 text-gray-500" />,
        };
    }
  };

  // الحصول على لون حالة المهمة
  const getTaskStatusInfo = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        };
      case "in-progress":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Clock className="h-4 w-4 text-blue-500" />,
        };
      case "pending":
        return {
          color: "bg-amber-100 text-amber-800",
          icon: <Clock className="h-4 w-4 text-amber-500" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Clock className="h-4 w-4 text-gray-500" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with search and quick actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">لوحة التحكم الرئيسية</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 ml-1" />
            <span>{currentDate}</span>
            <span className="mx-2">|</span>
            <Clock className="h-4 w-4 ml-1" />
            <span>آخر تحديث: منذ 5 دقائق</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث سريع..."
              className="w-[250px] pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-1" />
            تصفية
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>

          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 ml-1" />
            تحديث
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4 ml-1" />
            ) : (
              <Maximize className="h-4 w-4 ml-1" />
            )}
            {isFullscreen ? "تصغير" : "تكبير"}
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="overflow-hidden">
          <div className="h-1 bg-blue-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  المبيعات (اليوم)
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ₴ {stats.sales.today.toLocaleString()}
                </h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  {getTrendIcon(stats.sales.trend, 3)}
                  <span className="ml-1">
                    {stats.sales.percentChange.toFixed(1)}% من الأمس
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-1 bg-green-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  المشتريات (اليوم)
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ₴ {stats.purchases.today.toLocaleString()}
                </h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  {getTrendIcon(stats.purchases.trend, 3)}
                  <span className="ml-1">
                    {stats.purchases.percentChange.toFixed(1)}% من الأمس
                  </span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Truck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-1 bg-purple-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الأرباح (اليوم)</p>
                <h3 className="text-2xl font-bold mt-1">
                  ₴ {stats.profit.today.toLocaleString()}
                </h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  {getTrendIcon(stats.profit.trend, 3)}
                  <span className="ml-1">
                    {stats.profit.percentChange.toFixed(1)}% من الأمس
                  </span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-1 bg-amber-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  المصروفات (اليوم)
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ₴ {stats.expenses.today.toLocaleString()}
                </h3>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  {getTrendIcon(stats.expenses.trend, 3)}
                  <span className="ml-1">
                    {Math.abs(stats.expenses.percentChange).toFixed(1)}% من
                    الأمس
                  </span>
                </div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        dir="rtl"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 ml-2" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="sales">
            <ShoppingCart className="h-4 w-4 ml-2" />
            المبيعات
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="h-4 w-4 ml-2" />
            المخزون
          </TabsTrigger>
          <TabsTrigger value="finance">
            <DollarSign className="h-4 w-4 ml-2" />
            المالية
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 ml-2" />
            العملاء
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 ml-2" />
            التقارير
          </TabsTrigger>
        </TabsList>

        {/* نظرة عامة */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* الرسوم البيانية */}
            <div className="md:col-span-2 space-y-6">
              {/* مخطط المبيعات */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      تحليل المبيعات
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        الشهر الحالي
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    مقارنة المبيعات اليومية للشهر الحالي مع الشهر السابق
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <SalesChart />
                  </div>
                </CardContent>
              </Card>

              {/* مخطط التدفق النقدي */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      التدفق النقدي
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        الربع الحالي
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    تحليل الإيرادات والمصروفات والأرباح
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <CashFlowChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* القسم الجانبي */}
            <div className="space-y-6">
              {/* المهام والتنبيهات */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      المهام والتنبيهات
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      عرض الكل
                      <ChevronRight className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">المهام</h4>
                      <div className="space-y-2">
                        {tasks.slice(0, 3).map((task) => {
                          const statusInfo = getTaskStatusInfo(task.status);
                          return (
                            <div
                              key={task.id}
                              className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
                            >
                              <div className="flex items-start gap-2">
                                {statusInfo.icon}
                                <div>
                                  <p className="text-sm font-medium">
                                    {task.title}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>موعد التسليم: {task.dueDate}</span>
                                    <span
                                      className={`${getPriorityColor(task.priority)}`}
                                    >
                                      • {task.priority}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Badge className={statusInfo.color}>
                                {task.status === "completed"
                                  ? "مكتمل"
                                  : task.status === "in-progress"
                                    ? "قيد التنفيذ"
                                    : "معلق"}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">التنبيهات</h4>
                      <div className="space-y-2">
                        {alerts.slice(0, 3).map((alert) => {
                          const alertInfo = getAlertTypeInfo(alert.type);
                          return (
                            <div
                              key={alert.id}
                              className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
                            >
                              <div className="flex items-start gap-2">
                                {alertInfo.icon}
                                <div>
                                  <p className="text-sm font-medium">
                                    {alert.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {alert.time}
                                  </p>
                                </div>
                              </div>
                              <Badge className={alertInfo.color}>
                                {alert.type === "warning"
                                  ? "تحذير"
                                  : alert.type === "info"
                                    ? "معلومات"
                                    : alert.type === "success"
                                      ? "نجاح"
                                      : "خطأ"}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* أسعار الصرف */}
              <ExchangeRateWidget />

              {/* المؤشرات الرئيسية */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    مؤشرات الأداء الرئيسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {kpis.map((kpi, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{kpi.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{kpi.value}</span>
                          <div
                            className={`flex items-center text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          >
                            {getTrendIcon(kpi.trend, 3)}
                            <span>{kpi.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* الأنشطة الأخيرة */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  الأنشطة الأخيرة
                </CardTitle>
                <Button variant="ghost" size="sm">
                  عرض الكل
                  <ChevronRight className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          بواسطة: {activity.user}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* روابط سريعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <FileText className="h-6 w-6 text-blue-600" />
              <span>إنشاء فاتورة جديدة</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <Package className="h-6 w-6 text-green-600" />
              <span>إضافة منتج للمخزون</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <Users className="h-6 w-6 text-purple-600" />
              <span>إضافة عميل جديد</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            >
              <BarChart className="h-6 w-6 text-amber-600" />
              <span>عرض تقارير المبيعات</span>
            </Button>
          </div>
        </TabsContent>

        {/* المبيعات */}
        <TabsContent value="sales">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* إحصائيات المبيعات */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>ملخص المبيعات</CardTitle>
                <CardDescription>
                  إحصائيات المبيعات للفترة الحالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      إجمالي المبيعات (الشهر)
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 325,430</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +8.5% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      عدد الطلبات
                    </span>
                    <span className="text-2xl font-bold mt-1">256</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +12% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      متوسط قيمة الطلب
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 1,270</span>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingDown className="h-3 w-3 ml-1" />
                      -3.2% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      نسبة المرتجعات
                    </span>
                    <span className="text-2xl font-bold mt-1">2.4%</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingDown className="h-3 w-3 ml-1" />
                      -0.5% من الشهر السابق
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* قائمة الفواتير الأخيرة */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>الفواتير الأخيرة</CardTitle>
                  <Button variant="outline" size="sm">
                    عرض الكل
                    <ChevronRight className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        INV-2024-0125
                      </TableCell>
                      <TableCell>شركة الأفق للتجارة</TableCell>
                      <TableCell>10 أغسطس 2024</TableCell>
                      <TableCell>₴ 12,500</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          مدفوعة
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        INV-2024-0124
                      </TableCell>
                      <TableCell>مؤسسة النور للمقاولات</TableCell>
                      <TableCell>9 أغسطس 2024</TableCell>
                      <TableCell>₴ 8,750</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">
                          معلقة
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        INV-2024-0123
                      </TableCell>
                      <TableCell>شركة الرياض للتجارة</TableCell>
                      <TableCell>8 أغسطس 2024</TableCell>
                      <TableCell>₴ 15,200</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          مدفوعة
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        INV-2024-0122
                      </TableCell>
                      <TableCell>مؤسسة الخليج للمقاولات</TableCell>
                      <TableCell>7 أغسطس 2024</TableCell>
                      <TableCell>₴ 9,300</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">
                          متأخرة
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* أفضل المنتجات مبيعاً */}
            <Card>
              <CardHeader>
                <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">قميص قطني</p>
                        <p className="text-xs text-muted-foreground">
                          125 وحدة
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">₴ 62,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">بنطلون جينز</p>
                        <p className="text-xs text-muted-foreground">98 وحدة</p>
                      </div>
                    </div>
                    <span className="font-medium">₴ 58,800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">بلوزة حريرية</p>
                        <p className="text-xs text-muted-foreground">87 وحدة</p>
                      </div>
                    </div>
                    <span className="font-medium">₴ 43,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">فستان صيفي</p>
                        <p className="text-xs text-muted-foreground">65 وحدة</p>
                      </div>
                    </div>
                    <span className="font-medium">₴ 39,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* المخزون */}
        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* إحصائيات المخزون */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>ملخص المخزون</CardTitle>
                <CardDescription>حالة المخزون الحالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      إجمالي المنتجات
                    </span>
                    <span className="text-2xl font-bold mt-1">1,245</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +15 منتج جديد هذا الشهر
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      قيمة المخزون
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 1.2M</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +5.2% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      منتجات منخفضة المخزون
                    </span>
                    <span className="text-2xl font-bold mt-1">24</span>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +8 من الأسبوع الماضي
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      معدل دوران المخزون
                    </span>
                    <span className="text-2xl font-bold mt-1">4.2x</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +0.3 من الربع السابق
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* المنتجات منخفضة المخزون */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>المنتجات منخفضة المخزون</CardTitle>
                  <Button variant="outline" size="sm">
                    طلب توريد
                    <ChevronRight className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الكود</TableHead>
                      <TableHead>المخزون الحالي</TableHead>
                      <TableHead>الحد الأدنى</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">قماش قطني</TableCell>
                      <TableCell>RM-001</TableCell>
                      <TableCell>50 متر</TableCell>
                      <TableCell>100 متر</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">
                          منخفض جداً
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        خيوط بوليستر
                      </TableCell>
                      <TableCell>RM-004</TableCell>
                      <TableCell>25 بكرة</TableCell>
                      <TableCell>30 بكرة</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">
                          منخفض
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        أزرار بلاستيكية
                      </TableCell>
                      <TableCell>RM-006</TableCell>
                      <TableCell>500 قطعة</TableCell>
                      <TableCell>1000 قطعة</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">
                          منخفض
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">قماش جينز</TableCell>
                      <TableCell>RM-002</TableCell>
                      <TableCell>80 متر</TableCell>
                      <TableCell>150 متر</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">
                          منخفض جداً
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* حركة المخزون */}
            <Card>
              <CardHeader>
                <CardTitle>حركة المخزون الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-full">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">استلام</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        اليوم 10:30
                      </span>
                    </div>
                    <p className="text-sm">استلام 200 متر قماش قطني</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-red-100 rounded-full">
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="font-medium">صرف</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        اليوم 09:15
                      </span>
                    </div>
                    <p className="text-sm">صرف 50 متر قماش جينز للإنتاج</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-full">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">استلام</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        أمس 14:45
                      </span>
                    </div>
                    <p className="text-sm">استلام 1000 قطعة أزرار بلاستيكية</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-red-100 rounded-full">
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="font-medium">صرف</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        أمس 11:30
                      </span>
                    </div>
                    <p className="text-sm">صرف 30 بكرة خيوط بوليستر للإنتاج</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* المالية */}
        <TabsContent value="finance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* إحصائيات مالية */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>الملخص المالي</CardTitle>
                <CardDescription>الوضع المالي للشهر الحالي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      الإيرادات
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 325,430</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +12.5% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      المصروفات
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 187,650</span>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +5.2% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      صافي الربح
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 137,780</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +18.3% من الشهر السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      هامش الربح
                    </span>
                    <span className="text-2xl font-bold mt-1">42.3%</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +2.1% من الشهر السابق
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* القيود المحاسبية الأخيرة */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>القيود المحاسبية الأخيرة</CardTitle>
                  <Button variant="outline" size="sm">
                    عرض الكل
                    <ChevronRight className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم القيد</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>النوع</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        JE-2024-0325
                      </TableCell>
                      <TableCell>10 أغسطس 2024</TableCell>
                      <TableCell>تسجيل فاتورة مبيعات</TableCell>
                      <TableCell>₴ 12,500</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          دائن
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        JE-2024-0324
                      </TableCell>
                      <TableCell>9 أغسطس 2024</TableCell>
                      <TableCell>دفع رواتب الموظفين</TableCell>
                      <TableCell>₴ 45,000</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">مدين</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        JE-2024-0323
                      </TableCell>
                      <TableCell>8 أغسطس 2024</TableCell>
                      <TableCell>تسجيل فاتورة مشتريات</TableCell>
                      <TableCell>₴ 18,750</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">مدين</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        JE-2024-0322
                      </TableCell>
                      <TableCell>7 أغسطس 2024</TableCell>
                      <TableCell>تحصيل من العملاء</TableCell>
                      <TableCell>₴ 22,300</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          دائن
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* الحسابات البنكية */}
            <Card>
              <CardHeader>
                <CardTitle>الحسابات البنكية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-full">
                          <Landmark className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">البنك الأول</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        الرصيد الحالي
                      </span>
                      <span className="font-medium">₴ 245,320</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 rounded-full">
                          <Landmark className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium">البنك الثاني</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        الرصيد الحالي
                      </span>
                      <span className="font-medium">₴ 97,480</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-full">
                          <Wallet className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-medium">الصندوق النقدي</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        الرصيد الحالي
                      </span>
                      <span className="font-medium">₴ 15,250</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* العملاء */}
        <TabsContent value="customers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* إحصائيات العملاء */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>ملخص العملاء</CardTitle>
                <CardDescription>إحصائيات العملاء والمبيعات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      إجمالي العملاء
                    </span>
                    <span className="text-2xl font-bold mt-1">248</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +12 عميل جديد هذا الشهر
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      متوسط قيمة العميل
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 4,250</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +8.3% من الربع السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      معدل الاحتفاظ بالعملاء
                    </span>
                    <span className="text-2xl font-bold mt-1">92%</span>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +2.5% من العام السابق
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      الذمم المدينة
                    </span>
                    <span className="text-2xl font-bold mt-1">₴ 87,500</span>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingUp className="h-3 w-3 ml-1" />
                      +12.3% من الشهر السابق
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* قائمة العملاء النشطين */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>العملاء النشطين</CardTitle>
                  <Button variant="outline" size="sm">
                    عرض الكل
                    <ChevronRight className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم العميل</TableHead>
                      <TableHead>نوع العميل</TableHead>
                      <TableHead>المبيعات (هذا العام)</TableHead>
                      <TableHead>آخر طلب</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        شركة الأفق للتجارة
                      </TableCell>
                      <TableCell>شركة</TableCell>
                      <TableCell>₴ 125,750</TableCell>
                      <TableCell>10 أغسطس 2024</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        مؤسسة النور للمقاولات
                      </TableCell>
                      <TableCell>شركة</TableCell>
                      <TableCell>₴ 98,200</TableCell>
                      <TableCell>9 أغسطس 2024</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        شركة الرياض للتجارة
                      </TableCell>
                      <TableCell>شركة</TableCell>
                      <TableCell>₴ 87,500</TableCell>
                      <TableCell>8 أغسطس 2024</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          نشط
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        مؤسسة الخليج للمقاولات
                      </TableCell>
                      <TableCell>شركة</TableCell>
                      <TableCell>₴ 65,300</TableCell>
                      <TableCell>7 أغسطس 2024</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">
                          متأخر السداد
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* الفرص البيعية */}
            <Card>
              <CardHeader>
                <CardTitle>الفرص البيعية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-full">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">
                          شركة المستقبل للتقنية
                        </span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        مؤهل
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        القيمة المتوقعة
                      </span>
                      <span className="font-medium">₴ 45,000</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-full">
                          <Target className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">
                          مؤسسة الإبداع للديكور
                        </span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        مفاوضات
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        القيمة المتوقعة
                      </span>
                      <span className="font-medium">₴ 28,500</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-full">
                          <Target className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-medium">شركة الأمل للتجارة</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        عرض سعر
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        القيمة المتوقعة
                      </span>
                      <span className="font-medium">₴ 35,750</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* التقارير المتاحة */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>التقارير المتاحة</CardTitle>
                <CardDescription>
                  اختر من التقارير المتاحة أدناه
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <BarChart className="h-8 w-8 text-blue-600" />
                    <span className="font-medium">تقرير المبيعات</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل المبيعات حسب الفترة والمنتج
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <PieChart className="h-8 w-8 text-green-600" />
                    <span className="font-medium">تقرير المخزون</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل المخزون والمنتجات
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <LineChart className="h-8 w-8 text-purple-600" />
                    <span className="font-medium">تقرير الأرباح والخسائر</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل الإيرادات والمصروفات
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <Users className="h-8 w-8 text-amber-600" />
                    <span className="font-medium">تقرير العملاء</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل العملاء والمبيعات
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <Truck className="h-8 w-8 text-red-600" />
                    <span className="font-medium">تقرير الموردين</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل المشتريات والموردين
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  >
                    <Wallet className="h-8 w-8 text-blue-600" />
                    <span className="font-medium">تقرير التدفق النقدي</span>
                    <span className="text-xs text-muted-foreground">
                      تحليل التدفقات النقدية
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* التقارير المفضلة */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>التقارير المفضلة</CardTitle>
                  <Button variant="outline" size="sm">
                    تخصيص
                    <Settings className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">
                          تقرير المبيعات الشهري
                        </span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        تم التحديث اليوم
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      مقارنة المبيعات الشهرية مع الأشهر السابقة
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-1" />
                        تصدير
                      </Button>
                      <Button size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-green-600" />
                        <span className="font-medium">تقرير المخزون</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        تم التحديث اليوم
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      تحليل المخزون الحالي والمنتجات منخفضة المخزون
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-1" />
                        تصدير
                      </Button>
                      <Button size="sm">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* جدول التقارير */}
            <Card>
              <CardHeader>
                <CardTitle>جدول التقارير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-full">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">
                          تقرير المبيعات الأسبوعي
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        موعد الإرسال
                      </span>
                      <span className="text-sm">كل يوم أحد 08:00</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-full">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">تقرير المخزون</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        موعد الإرسال
                      </span>
                      <span className="text-sm">كل يوم اثنين 08:00</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 rounded-full">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium">
                          تقرير الأرباح الشهري
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        موعد الإرسال
                      </span>
                      <span className="text-sm">أول كل شهر 08:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDashboardTabs;
