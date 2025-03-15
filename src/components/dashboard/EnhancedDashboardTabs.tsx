import React, { useState, lazy, Suspense, useEffect } from "react";
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

// Lazy load components to improve performance
const QuickLinks = lazy(() => import("./QuickLinks"));
const JournalEntriesPopup = lazy(
  () => import("../accounting/JournalEntriesPopup"),
);
const CashJournalPopup = lazy(() => import("../accounting/CashJournalPopup"));
const SalesPopup = lazy(() => import("../sales/SalesPopup"));
const PurchasesPopup = lazy(() => import("../purchases/PurchasesPopup"));
const CustomerSupplierPopup = lazy(
  () => import("../shared/CustomerSupplierPopup"),
);

const EnhancedDashboardTabs = () => {
  // State for controlling popups
  const [showJournalEntriesPopup, setShowJournalEntriesPopup] = useState(false);
  const [showCashJournalPopup, setShowCashJournalPopup] = useState(false);
  const [showSalesPopup, setShowSalesPopup] = useState(false);
  const [salesPopupType, setSalesPopupType] = useState("invoice");
  const [showPurchasesPopup, setShowPurchasesPopup] = useState(false);
  const [purchasesPopupType, setPurchasesPopupType] = useState("invoice");
  const [showCustomerSupplierPopup, setShowCustomerSupplierPopup] =
    useState(false);
  const [customerSupplierType, setCustomerSupplierType] = useState("customer");

  // Set up event listeners for opening popups
  useEffect(() => {
    const handleOpenJournalEntriesPopup = (e: any) => {
      setShowJournalEntriesPopup(true);
      // If tab is specified in the event detail, pass it to the popup
      if (e.detail?.tab) {
        // You can store this in state if needed to pass to the popup component
        // For now we'll just log it
        console.log("Opening journal entries popup with tab:", e.detail.tab);
      }
    };
    const handleOpenCashJournalPopup = () => setShowCashJournalPopup(true);
    const handleOpenSalesPopup = (e: any) => {
      setSalesPopupType(e.detail?.type || "invoice");
      setShowSalesPopup(true);
    };
    const handleOpenPurchasesPopup = (e: any) => {
      setPurchasesPopupType(e.detail?.type || "invoice");
      setShowPurchasesPopup(true);
    };
    const handleOpenCustomerSupplierPopup = (e: any) => {
      setCustomerSupplierType(e.detail?.type || "customer");
      setShowCustomerSupplierPopup(true);
    };

    window.addEventListener(
      "openJournalEntriesPopup",
      handleOpenJournalEntriesPopup,
    );
    window.addEventListener("openCashJournalPopup", handleOpenCashJournalPopup);
    window.addEventListener("openSalesPopup", handleOpenSalesPopup);
    window.addEventListener("openPurchasesPopup", handleOpenPurchasesPopup);
    window.addEventListener(
      "openCustomerSupplierPopup",
      handleOpenCustomerSupplierPopup,
    );

    return () => {
      window.removeEventListener(
        "openJournalEntriesPopup",
        handleOpenJournalEntriesPopup,
      );
      window.removeEventListener(
        "openCashJournalPopup",
        handleOpenCashJournalPopup,
      );
      window.removeEventListener("openSalesPopup", handleOpenSalesPopup);
      window.removeEventListener(
        "openPurchasesPopup",
        handleOpenPurchasesPopup,
      );
      window.removeEventListener(
        "openCustomerSupplierPopup",
        handleOpenCustomerSupplierPopup,
      );
    };
  }, []);
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
      action: "تحديث بيانات العميل",
      user: "سارة أحمد",
      time: "منذ 45 دقيقة",
      icon: <Users className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      action: "إضافة منتج جديد للمخزون",
      user: "محمد علي",
      time: "منذ ساعتين",
      icon: <Package className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      action: "تسجيل دفعة مالية",
      user: "خالد عمر",
      time: "منذ 3 ساعات",
      icon: <DollarSign className="h-4 w-4 text-amber-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">لوحة التحكم</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="ml-1 h-3 w-3" />
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-1 h-3 w-3" />
            تصدير
          </Button>
          <Button>
            <RefreshCw className="ml-1 h-3 w-3" />
            تحديث
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="purchases">المشتريات</TabsTrigger>
          <TabsTrigger value="inventory">المخزون</TabsTrigger>
          <TabsTrigger value="finance">المالية</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kpis.map((kpi, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {kpi.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                      <div className="flex items-center mt-1">
                        {kpi.trend === "up" ? (
                          <span className="text-xs text-green-600 flex items-center">
                            <TrendingUp className="h-3 w-3 ml-1" />
                            {kpi.change}
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 flex items-center">
                            <TrendingDown className="h-3 w-3 ml-1" />
                            {kpi.change}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SalesChart />
              <CashFlowChart />
            </div>

            <Suspense
              fallback={
                <div className="p-4 border rounded-md">
                  جاري تحميل الروابط السريعة...
                </div>
              }
            >
              <QuickLinks />
            </Suspense>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-2 border-b last:border-0"
                    >
                      <div className="p-2 bg-gray-100 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.user} - {activity.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>تحليل المبيعات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                محتوى تحليل المبيعات سيظهر هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>تحليل المشتريات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                محتوى تحليل المشتريات سيظهر هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>تحليل المخزون</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                محتوى تحليل المخزون سيظهر هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>التحليل المالي</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                محتوى التحليل المالي سيظهر هنا
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>التقارير</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">محتوى التقارير سيظهر هنا</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Popups for quick links */}
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
            جاري التحميل...
          </div>
        }
      >
        {showJournalEntriesPopup && (
          <JournalEntriesPopup
            open={showJournalEntriesPopup}
            onClose={() => setShowJournalEntriesPopup(false)}
            initialTab="journal"
          />
        )}

        {showCashJournalPopup && (
          <CashJournalPopup
            open={showCashJournalPopup}
            onClose={() => setShowCashJournalPopup(false)}
          />
        )}

        {showSalesPopup && (
          <SalesPopup
            open={showSalesPopup}
            onClose={() => setShowSalesPopup(false)}
            type={salesPopupType}
          />
        )}

        {showPurchasesPopup && (
          <PurchasesPopup
            open={showPurchasesPopup}
            onClose={() => setShowPurchasesPopup(false)}
            type={purchasesPopupType}
          />
        )}

        {showCustomerSupplierPopup && (
          <CustomerSupplierPopup
            open={showCustomerSupplierPopup}
            onClose={() => setShowCustomerSupplierPopup(false)}
            type={customerSupplierType}
          />
        )}
      </Suspense>
    </div>
  );
};

export default EnhancedDashboardTabs;
