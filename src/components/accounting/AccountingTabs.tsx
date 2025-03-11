import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountingDashboard from "./AccountingDashboard";
import JournalEntries from "./JournalEntries";
import AccountTree from "./AccountTree";
import FinancialReports from "./FinancialReports";
import CurrencyExchangeRates from "./CurrencyExchangeRates";
import CostCenters from "./CostCenters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  FileText,
  CreditCard,
  DollarSign,
  BarChart3,
  RefreshCw,
  Building,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  Printer,
  Filter,
  ArrowUpDown,
  HelpCircle,
  Settings,
  BookOpen,
  CreditCard as CreditCardIcon,
  Landmark,
  Receipt,
  PieChart,
  TrendingUp,
} from "lucide-react";

const AccountingTabs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate] = useState(
    new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
  const [currentPeriod] = useState("الربع الثالث 2024");

  return (
    <div className="space-y-6">
      {/* Header with search and quick actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">النظام المحاسبي</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 ml-1" />
            <span>{currentDate}</span>
            <span className="mx-2">|</span>
            <BookOpen className="h-4 w-4 ml-1" />
            <span>الفترة المحاسبية: {currentPeriod}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في النظام المحاسبي..."
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
            <Settings className="h-4 w-4 ml-1" />
            الإعدادات
          </Button>

          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 ml-1" />
            المساعدة
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="overflow-hidden">
          <div className="h-1 bg-blue-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  الإيرادات (الشهر الحالي)
                </p>
                <h3 className="text-2xl font-bold mt-1">₴ 125,430</h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 ml-1" />
                  +12.5% من الشهر السابق
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
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
                  المصروفات (الشهر الحالي)
                </p>
                <h3 className="text-2xl font-bold mt-1">₴ 87,650</h3>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <TrendingUp className="h-3 w-3 ml-1" />
                  +5.2% من الشهر السابق
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Receipt className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-1 bg-purple-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الرصيد النقدي</p>
                <h3 className="text-2xl font-bold mt-1">₴ 342,800</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 ml-1" />
                  تحديث: اليوم 09:30
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Landmark className="h-5 w-5 text-purple-600" />
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
                  القيود المحاسبية
                </p>
                <h3 className="text-2xl font-bold mt-1">1,245</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <FileText className="h-3 w-3 ml-1" />
                  156 قيد هذا الشهر
                </div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">
            <BarChart3 className="h-4 w-4 ml-2" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="journal">
            <FileText className="h-4 w-4 ml-2" />
            دفتر اليومية
          </TabsTrigger>
          <TabsTrigger value="accounts">
            <Calculator className="h-4 w-4 ml-2" />
            شجرة الحسابات
          </TabsTrigger>
          <TabsTrigger value="costcenters">
            <Building className="h-4 w-4 ml-2" />
            مراكز التكلفة
          </TabsTrigger>
          <TabsTrigger value="exchange">
            <RefreshCw className="h-4 w-4 ml-2" />
            أسعار الصرف
          </TabsTrigger>
          <TabsTrigger value="reports">
            <DollarSign className="h-4 w-4 ml-2" />
            التقارير المالية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AccountingDashboard />
        </TabsContent>

        <TabsContent value="journal">
          <JournalEntries />
        </TabsContent>

        <TabsContent value="accounts">
          <AccountTree />
        </TabsContent>

        <TabsContent value="costcenters">
          <CostCenters />
        </TabsContent>

        <TabsContent value="exchange">
          <CurrencyExchangeRates />
        </TabsContent>

        <TabsContent value="reports">
          <FinancialReports />
        </TabsContent>
      </Tabs>

      {/* Quick Links Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">روابط سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <CreditCardIcon className="h-6 w-6 text-blue-600" />
            <span>إنشاء قيد محاسبي</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <Receipt className="h-6 w-6 text-green-600" />
            <span>تسجيل مصروف</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <PieChart className="h-6 w-6 text-purple-600" />
            <span>تقرير الميزانية</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
          >
            <Landmark className="h-6 w-6 text-amber-600" />
            <span>تسوية حساب بنكي</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountingTabs;
