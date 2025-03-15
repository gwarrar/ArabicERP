import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountingDashboard from "./AccountingDashboard";
import JournalEntries from "./JournalEntries";
import AccountTree from "./AccountTree";
import FinancialReports from "./FinancialReports";
import CurrencyExchangeRates from "./CurrencyExchangeRates";
import CostCenters from "./CostCenters";
import CashAccounts from "./CashAccounts";
import EnhancedCashAccounts from "./EnhancedCashAccounts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import JournalEntriesPopup from "./JournalEntriesPopup";
import AccountingQuickLinks from "./AccountingQuickLinks";
import CashJournalPopup from "./CashJournalPopup";
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
  Bookmark,
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

  // State for popups
  const [isJournalPopupOpen, setIsJournalPopupOpen] = useState(false);
  const [isCashJournalPopupOpen, setIsCashJournalPopupOpen] = useState(false);

  // Handlers for quick links
  const handleOpenJournalEntries = () => {
    // Open journal entries popup
    setIsJournalPopupOpen(true);
  };

  const handleOpenCashJournal = () => {
    // Open cash journal popup
    setIsCashJournalPopupOpen(true);
  };

  const handleOpenAccountTree = () => {
    // Navigate to accounts tab
    document
      .querySelector('[value="accounts"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenFinancialReports = () => {
    // Navigate to reports tab
    document
      .querySelector('[value="reports"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenCostCenters = () => {
    // Navigate to costcenters tab
    document
      .querySelector('[value="costcenters"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenCurrencyExchange = () => {
    // Navigate to exchange tab
    document
      .querySelector('[value="exchange"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenBankAccounts = () => {
    // Navigate to cash-accounts tab
    document
      .querySelector('[value="cash-accounts"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenTaxSettings = () => {
    // Tax settings functionality (not available in current tabs)
    console.log("Open tax settings");
  };

  return (
    <div className="space-y-6">
      {/* Journal Entries Popup */}
      {isJournalPopupOpen && (
        <JournalEntriesPopup onClose={() => setIsJournalPopupOpen(false)} />
      )}

      {/* Cash Journal Popup */}
      {isCashJournalPopupOpen && (
        <CashJournalPopup onClose={() => setIsCashJournalPopupOpen(false)} />
      )}

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

      {/* Main Tabs */}
      <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
        <Tabs defaultValue="cash-accounts" className="w-full" dir="rtl">
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
            <TabsTrigger value="cash-accounts">
              <DollarSign className="h-4 w-4 ml-2" />
              الصناديق
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

          <TabsContent value="cash-accounts">
            <EnhancedCashAccounts />
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
      </div>

      {/* Quick Links Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">روابط سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleOpenJournalEntries}
          >
            <CreditCardIcon className="h-6 w-6 text-blue-600" />
            <span>إنشاء قيد محاسبي</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleOpenCashJournal}
          >
            <Receipt className="h-6 w-6 text-green-600" />
            <span>تسجيل مصروف</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleOpenFinancialReports}
          >
            <PieChart className="h-6 w-6 text-purple-600" />
            <span>تقرير الميزانية</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2"
            onClick={handleOpenBankAccounts}
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
