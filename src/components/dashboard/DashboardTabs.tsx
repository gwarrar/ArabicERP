import React, { useState, lazy, Suspense, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Factory,
  BarChart2,
  Users,
  Calendar,
  ArrowRightLeft,
  AlertTriangle,
  Clock,
  Star,
  GraduationCap,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
} from "lucide-react";
import KPICards from "./KPICards";
import SalesChart from "./SalesChart";
import CashFlowChart from "./CashFlowChart";
import QuickReports from "./QuickReports";
import TabQuickLinks from "./TabQuickLinks";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardDetailsPopup from "./DashboardDetailsPopup";
import KPIDetailsPopup from "./KPIDetailsPopup";

const DashboardTabs = () => {
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
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [isKPIPopupOpen, setIsKPIPopupOpen] = useState(false);

  // معالجة النقر على الرسم البياني
  const handleChartClick = (chartType: string, period?: string) => {
    setSelectedChart(chartType);
    setSelectedPeriod(period || null);
    setIsPopupOpen(true);
  };

  // معالجة النقر على بطاقة المؤشر
  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType);
    setIsKPIPopupOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        لوحة التحكم الرئيسية
      </h1>

      <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
        <Tabs defaultValue="main" className="w-full" dir="rtl">
          <TabsList className="mb-6">
            <TabsTrigger
              value="main"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <LayoutDashboard className="h-5 w-5 ml-2 text-primary" />
              <span className="font-medium">الرئيسية</span>
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5 ml-2 text-green-600" />
              <span className="font-medium">المبيعات</span>
            </TabsTrigger>
            <TabsTrigger
              value="purchases"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Truck className="h-5 w-5 ml-2 text-blue-600" />
              <span className="font-medium">المشتريات</span>
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Package className="h-5 w-5 ml-2 text-amber-600" />
              <span className="font-medium">المخزون</span>
            </TabsTrigger>
            <TabsTrigger
              value="manufacturing"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Factory className="h-5 w-5 ml-2 text-purple-600" />
              <span className="font-medium">التصنيع</span>
            </TabsTrigger>
            <TabsTrigger
              value="accounting"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <BarChart2 className="h-5 w-5 ml-2 text-indigo-600" />
              <span className="font-medium">المحاسبة</span>
            </TabsTrigger>
            <TabsTrigger
              value="crm"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Users className="h-5 w-5 ml-2 text-cyan-600" />
              <span className="font-medium">العملاء</span>
            </TabsTrigger>
            <TabsTrigger
              value="hr"
              className="px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Users className="h-5 w-5 ml-2 text-rose-600" />
              <span className="font-medium">الموارد البشرية</span>
            </TabsTrigger>
          </TabsList>

          {/* لوحة التحكم الرئيسية */}
          <TabsContent value="main">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <QuickLinks />
              </Suspense>
              <KPICards onCardClick={handleKPIClick} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SalesChart onChartClick={handleChartClick} />
                <CashFlowChart onChartClick={handleChartClick} />
              </div>
              <QuickReports />
            </div>
          </TabsContent>

          {/* لوحة تحكم المبيعات */}
          <TabsContent value="sales">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="sales" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("sales")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي المبيعات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1,250,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +12.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("orders")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        عدد الطلبات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">156</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +8.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("avg_order_value")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط قيمة الطلب
                      </p>
                      <h3 className="text-2xl font-bold mt-1">8,012 ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +3.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BarChart2 className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("customers_count")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        عدد العملاء
                      </p>
                      <h3 className="text-2xl font-bold mt-1">85</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +5.0% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </Card>
              </div>
              <SalesChart onChartClick={handleChartClick} />
            </div>
          </TabsContent>

          {/* لوحة تحكم المشتريات */}
          <TabsContent value="purchases">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="purchases" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("purchases")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي المشتريات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">850,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +7.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("purchase_orders")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        عدد أوامر الشراء
                      </p>
                      <h3 className="text-2xl font-bold mt-1">42</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +4.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("purchase_avg_value")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط قيمة الطلب
                      </p>
                      <h3 className="text-2xl font-bold mt-1">20,238 ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +2.8% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BarChart2 className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("suppliers")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        عدد الموردين
                      </p>
                      <h3 className="text-2xl font-bold mt-1">28</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +2.0% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </Card>
              </div>
              <CashFlowChart onChartClick={handleChartClick} />
            </div>
          </TabsContent>

          {/* لوحة تحكم المخزون */}
          <TabsContent value="inventory">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="inventory" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("total_items")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي الأصناف
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1,200</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +5.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("inventory_value")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        قيمة المخزون
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1,250,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +3.8% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("inventory_movements")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        حركات المخزون
                      </p>
                      <h3 className="text-2xl font-bold mt-1">520</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +12.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <ArrowRightLeft className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("low_stock")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        أصناف منخفضة المخزون
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-red-600">
                        12
                      </h3>
                      <p className="text-xs text-red-500 mt-1">
                        تحتاج إلى إعادة طلب
                      </p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* لوحة تحكم التصنيع */}
          <TabsContent value="manufacturing">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="manufacturing" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("production_volume")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        حجم الإنتاج
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1,850</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +8.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Factory className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("production_efficiency")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        كفاءة الإنتاج
                      </p>
                      <h3 className="text-2xl font-bold mt-1">92.5%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +2.3% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("defect_rate")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        معدل العيوب
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1.2%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        -0.3% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("on_time_delivery")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        التسليم في الموعد
                      </p>
                      <h3 className="text-2xl font-bold mt-1">95.8%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +1.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">اتجاهات الإنتاج</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-end justify-between">
                      {[
                        { month: "يناير", value: 1200 },
                        { month: "فبراير", value: 1350 },
                        { month: "مارس", value: 1280 },
                        { month: "أبريل", value: 1420 },
                        { month: "مايو", value: 1650 },
                        { month: "يونيو", value: 1850 },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-12 flex items-end justify-center">
                            <div
                              className="w-8 bg-purple-500 rounded-t-sm absolute bottom-0"
                              style={{
                                height: `${(item.value / 2000) * 200}px`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground mt-2">
                            {item.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      استخدام مراكز العمل
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "خط الإنتاج 1", usage: 92 },
                        { name: "خط الإنتاج 2", usage: 87 },
                        { name: "خط الإنتاج 3", usage: 78 },
                        { name: "خط التجميع", usage: 95 },
                        { name: "قسم التغليف", usage: 88 },
                      ].map((center, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {center.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {center.usage}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${center.usage > 90 ? "bg-green-500" : center.usage > 80 ? "bg-blue-500" : "bg-amber-500"}`}
                              style={{ width: `${center.usage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* لوحة تحكم المحاسبة */}
          <TabsContent value="accounting">
            <div className="space-y-6">
              {/* بطاقات المؤشرات الرئيسية */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow border-t-4 border-t-green-500"
                  onClick={() => handleKPIClick("total_revenue")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي الإيرادات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">2,450,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <ArrowUpCircle className="h-3 w-3 mr-1" />
                        +12.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ArrowUpCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow border-t-4 border-t-red-500"
                  onClick={() => handleKPIClick("total_expenses")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي المصروفات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1,850,000 ₴</h3>
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <ArrowDownCircle className="h-3 w-3 mr-1" />
                        +8.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ArrowDownCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow border-t-4 border-t-blue-500"
                  onClick={() => handleKPIClick("net_profit")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        صافي الربح
                      </p>
                      <h3 className="text-2xl font-bold mt-1">600,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15.3% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow border-t-4 border-t-indigo-500"
                  onClick={() => handleKPIClick("cash_balance")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        الرصيد النقدي
                      </p>
                      <h3 className="text-2xl font-bold mt-1">850,000 ₴</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5.8% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* الرسوم البيانية والمؤشرات */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                      تحليل الإيرادات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[250px] flex items-center justify-center">
                      <div className="w-[300px] h-[300px] relative rounded-full bg-gray-50 flex items-center justify-center">
                        {[
                          { name: "المبيعات", value: 65, color: "#3b82f6" },
                          { name: "الخدمات", value: 20, color: "#10b981" },
                          { name: "الاستثمارات", value: 10, color: "#f59e0b" },
                          { name: "أخرى", value: 5, color: "#6366f1" },
                        ].map((segment, index, array) => {
                          let rotation = 0;
                          for (let i = 0; i < index; i++) {
                            rotation += (array[i].value / 100) * 360;
                          }
                          return (
                            <div
                              key={index}
                              className="absolute top-0 left-0 w-full h-full"
                              style={{
                                clipPath: `conic-gradient(from ${rotation}deg, transparent ${(segment.value / 100) * 360}deg, transparent 0)`,
                              }}
                            >
                              <div
                                className="w-full h-full rounded-full"
                                style={{ backgroundColor: segment.color }}
                              />
                            </div>
                          );
                        })}
                        <div className="w-[150px] h-[150px] bg-white rounded-full z-10"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {[
                        { name: "المبيعات", value: 65, color: "#3b82f6" },
                        { name: "الخدمات", value: 20, color: "#10b981" },
                        { name: "الاستثمارات", value: 10, color: "#f59e0b" },
                        { name: "أخرى", value: 5, color: "#6366f1" },
                      ].map((segment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                          />
                          <span className="text-xs font-medium">
                            {segment.name} ({segment.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      المؤشرات المالية الرئيسية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {[
                        { name: "هامش الربح الإجمالي", value: 42, target: 40 },
                        { name: "هامش الربح الصافي", value: 24.5, target: 22 },
                        { name: "العائد على الأصول", value: 18.2, target: 15 },
                        { name: "نسبة السيولة", value: 2.1, target: 2.0 },
                        {
                          name: "نسبة الدين إلى حقوق الملكية",
                          value: 0.8,
                          target: 1.0,
                        },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {metric.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">
                                {metric.value}%
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  metric.value >= metric.target
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                }
                              >
                                {metric.value >= metric.target ? (
                                  <>
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    فوق الهدف
                                  </>
                                ) : (
                                  <>
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                    تحت الهدف
                                  </>
                                )}
                              </Badge>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${metric.value >= metric.target ? "bg-green-500" : "bg-amber-500"}`}
                              style={{
                                width: `${(metric.value / (metric.target * 1.5)) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* لوحة تحكم إدارة العملاء */}
          <TabsContent value="crm">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="crm" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("new_customers")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">عملاء جدد</p>
                      <h3 className="text-2xl font-bold mt-1">24</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +15% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <UserPlus className="h-6 w-6 text-cyan-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("customer_retention")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        معدل الاحتفاظ بالعملاء
                      </p>
                      <h3 className="text-2xl font-bold mt-1">92.5%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +2.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("conversion_rate")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        معدل التحويل
                      </p>
                      <h3 className="text-2xl font-bold mt-1">28.3%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +3.2% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("sales_pipeline")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        قيمة خط أنابيب المبيعات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">1.2M ₴</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +18% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      خط أنابيب المبيعات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          stage: "العملاء المحتملين",
                          count: 120,
                          value: 2400000,
                        },
                        { stage: "الاتصال الأولي", count: 85, value: 1800000 },
                        { stage: "الاجتماع", count: 64, value: 1500000 },
                        { stage: "العرض", count: 42, value: 1200000 },
                        { stage: "التفاوض", count: 28, value: 850000 },
                        { stage: "مغلق/فوز", count: 18, value: 650000 },
                      ].map((stage, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {stage.stage}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {stage.count} عميل
                              </span>
                              <span className="text-sm">
                                {(stage.value / 1000000).toFixed(1)}M ₴
                              </span>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                              style={{ width: `${(stage.count / 120) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">تحليل العملاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">حسب القطاع</h4>
                        {[
                          { name: "التجزئة", percentage: 35 },
                          { name: "الخدمات", percentage: 25 },
                          { name: "التصنيع", percentage: 20 },
                          { name: "التكنولوجيا", percentage: 15 },
                          { name: "أخرى", percentage: 5 },
                        ].map((sector, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">{sector.name}</span>
                              <span className="text-xs">
                                {sector.percentage}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 rounded-full"
                                style={{ width: `${sector.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">حسب الحجم</h4>
                        {[
                          { name: "شركات كبيرة", percentage: 30 },
                          { name: "شركات متوسطة", percentage: 45 },
                          { name: "شركات صغيرة", percentage: 25 },
                        ].map((size, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">{size.name}</span>
                              <span className="text-xs">
                                {size.percentage}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${size.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}

                        <h4 className="text-sm font-medium mt-6">
                          حسب المنطقة
                        </h4>
                        {[
                          { name: "المنطقة الشمالية", percentage: 40 },
                          { name: "المنطقة الجنوبية", percentage: 30 },
                          { name: "المنطقة الشرقية", percentage: 20 },
                          { name: "المنطقة الغربية", percentage: 10 },
                        ].map((region, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">{region.name}</span>
                              <span className="text-xs">
                                {region.percentage}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${region.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* لوحة تحكم الموارد البشرية */}
          <TabsContent value="hr">
            <div className="space-y-6">
              <Suspense
                fallback={
                  <div className="p-4 border rounded-md">
                    جاري تحميل الروابط السريعة...
                  </div>
                }
              >
                <TabQuickLinks tabId="hr" />
              </Suspense>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("employees_count")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        عدد الموظفين
                      </p>
                      <h3 className="text-2xl font-bold mt-1">128</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +5 موظفين عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("employee_turnover")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        معدل دوران الموظفين
                      </p>
                      <h3 className="text-2xl font-bold mt-1">4.2%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        -1.5% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <ArrowRightLeft className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("avg_performance")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط درجة الأداء
                      </p>
                      <h3 className="text-2xl font-bold mt-1">87.5%</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +2.3% عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </Card>
                <Card
                  className="p-4 bg-white cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleKPIClick("training_hours")}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        ساعات التدريب
                      </p>
                      <h3 className="text-2xl font-bold mt-1">450</h3>
                      <p className="text-xs text-green-500 mt-1">
                        +120 ساعة عن الشهر السابق
                      </p>
                    </div>
                    <div className="p-2 bg-rose-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-rose-600" />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      توزيع الموظفين حسب القسم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center">
                      <div className="w-[300px] h-[300px] relative rounded-full bg-gray-50 flex items-center justify-center">
                        {[
                          { name: "المبيعات", value: 35, color: "#3b82f6" },
                          { name: "التسويق", value: 15, color: "#10b981" },
                          {
                            name: "تقنية المعلومات",
                            value: 20,
                            color: "#f59e0b",
                          },
                          { name: "المالية", value: 10, color: "#6366f1" },
                          { name: "الإنتاج", value: 15, color: "#ec4899" },
                          { name: "أخرى", value: 5, color: "#8b5cf6" },
                        ].map((segment, index, array) => {
                          let rotation = 0;
                          for (let i = 0; i < index; i++) {
                            rotation += (array[i].value / 100) * 360;
                          }
                          return (
                            <div
                              key={index}
                              className="absolute top-0 left-0 w-full h-full"
                              style={{
                                clipPath: `conic-gradient(from ${rotation}deg, transparent ${(segment.value / 100) * 360}deg, transparent 0)`,
                              }}
                            >
                              <div
                                className="w-full h-full rounded-full"
                                style={{ backgroundColor: segment.color }}
                              />
                            </div>
                          );
                        })}
                        <div className="w-[150px] h-[150px] bg-white rounded-full z-10"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {[
                        { name: "المبيعات", value: 35, color: "#3b82f6" },
                        { name: "التسويق", value: 15, color: "#10b981" },
                        {
                          name: "تقنية المعلومات",
                          value: 20,
                          color: "#f59e0b",
                        },
                        { name: "المالية", value: 10, color: "#6366f1" },
                        { name: "الإنتاج", value: 15, color: "#ec4899" },
                        { name: "أخرى", value: 5, color: "#8b5cf6" },
                      ].map((segment, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: segment.color }}
                          />
                          <span className="text-xs">
                            {segment.name} ({segment.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">اتجاهات الأداء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "المبيعات", current: 92, previous: 88 },
                        { name: "التسويق", current: 87, previous: 85 },
                        { name: "تقنية المعلومات", current: 90, previous: 86 },
                        { name: "المالية", current: 85, previous: 82 },
                        { name: "الإنتاج", current: 88, previous: 84 },
                      ].map((dept, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {dept.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {dept.previous}%
                              </span>
                              <span className="text-sm">{dept.current}%</span>
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-gray-300 rounded-full"
                              style={{ width: `${dept.previous}%` }}
                            />
                            <div
                              className="absolute h-full bg-blue-500 rounded-full"
                              style={{ width: `${dept.current}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-4">
                        الوظائف الشاغرة
                      </h4>
                      <div className="space-y-2">
                        {[
                          {
                            position: "مطور واجهة أمامية",
                            department: "تقنية المعلومات",
                            applicants: 18,
                          },
                          {
                            position: "مندوب مبيعات",
                            department: "المبيعات",
                            applicants: 12,
                          },
                          {
                            position: "محاسب",
                            department: "المالية",
                            applicants: 8,
                          },
                          {
                            position: "مسؤول تسويق رقمي",
                            department: "التسويق",
                            applicants: 15,
                          },
                        ].map((job, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 border rounded-md"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {job.position}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {job.department}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {job.applicants} متقدم
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* نافذة تفاصيل الرسم البياني */}
      {selectedChart && (
        <DashboardDetailsPopup
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          chartType={selectedChart}
          period={selectedPeriod || undefined}
        />
      )}

      {/* نافذة تفاصيل مؤشر الأداء */}
      {selectedKPI && (
        <KPIDetailsPopup
          open={isKPIPopupOpen}
          onClose={() => setIsKPIPopupOpen(false)}
          kpiType={selectedKPI}
        />
      )}

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
            initialTab="new-entry"
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

export default DashboardTabs;
