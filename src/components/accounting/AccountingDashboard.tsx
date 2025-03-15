import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Wallet,
  BarChart3,
  Calendar,
  Users,
  Filter,
  Plus,
  FileText,
  MapPin,
  TrendingUp,
  Receipt,
  Landmark,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
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
import { defaultAccounts } from "@/data/accounts";
import {
  ukrainianBranches,
  branchSalesData,
  branchExpensesData,
  branchCashFlowData,
} from "@/data/branches";
import { CashTransaction } from "./CashTransaction";
import { NewJournalEntry } from "./NewJournalEntry";
import { CashJournal } from "./CashJournal";
import ReactDOM from "react-dom";
import { SheetTabs } from "@/components/ui/sheet-tabs";
import AccountingQuickLinks from "./AccountingQuickLinks";

// KPI Card Component
const KPICard = ({
  title,
  value,
  change,
  icon,
  period = "أسبوعي",
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  period?: string;
}) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-1">
            <span
              className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              <span className="mr-1 text-xs">{Math.abs(change)}%</span>
            </span>
            <span className="text-muted-foreground text-xs mr-2">{period}</span>
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Recent Transactions
const recentTransactions = [
  {
    id: "1",
    date: "٢٠٢٤/٠٧/١٥",
    description: "فاتورة مبيعات #1234",
    amount: 12500,
    type: "income",
  },
  {
    id: "2",
    date: "٢٠٢٤/٠٧/١٤",
    description: "دفع رواتب الموظفين",
    amount: 35000,
    type: "expense",
  },
  {
    id: "3",
    date: "٢٠٢٤/٠٧/١٢",
    description: "فاتورة مبيعات #1233",
    amount: 8750,
    type: "income",
  },
  {
    id: "4",
    date: "٢٠٢٤/٠٧/١٠",
    description: "دفع إيجار المكتب",
    amount: 15000,
    type: "expense",
  },
  {
    id: "5",
    date: "٢٠٢٤/٠٧/٠٨",
    description: "فاتورة مبيعات #1232",
    amount: 9200,
    type: "income",
  },
];

// Customer Balances
const customerBalances = [
  { id: "1", name: "شركة الأفق للتجارة", balance: 45000 },
  { id: "2", name: "مؤسسة النور", balance: 32000 },
  { id: "3", name: "شركة الرياض للمقاولات", balance: 28500 },
  { id: "4", name: "مؤسسة السلام التجارية", balance: 18750 },
  { id: "5", name: "شركة الخليج للتوريدات", balance: 15200 },
];

// Supplier Balances
const supplierBalances = [
  { id: "1", name: "شركة التوريدات العالمية", balance: 38000 },
  { id: "2", name: "مصنع المستقبل", balance: 27500 },
  { id: "3", name: "شركة الإمداد", balance: 22000 },
  { id: "4", name: "مؤسسة الصناعات المتطورة", balance: 16800 },
  { id: "5", name: "شركة التقنية الحديثة", balance: 12500 },
];

const AccountingDashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState("monthly");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);

  // Filtered data based on period and branch
  const [salesData, setSalesData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [branchCashBalances, setBranchCashBalances] = useState<any[]>([]);

  // Update data when filter changes
  useEffect(() => {
    // Filter sales data
    if (selectedBranch === "all") {
      // Aggregate data for all branches
      setSalesData(
        branchSalesData[filterPeriod as keyof typeof branchSalesData],
      );

      // Aggregate expenses data
      const totalExpenses = branchExpensesData[
        filterPeriod as keyof typeof branchExpensesData
      ].reduce((total, item) => total + item.expenses, 0);

      // Create pie chart data for expenses
      setExpensesData([
        { name: "رواتب", value: totalExpenses * 0.45 }, // 45% of expenses
        { name: "إيجار", value: totalExpenses * 0.2 }, // 20% of expenses
        { name: "مرافق", value: totalExpenses * 0.1 }, // 10% of expenses
        { name: "تسويق", value: totalExpenses * 0.15 }, // 15% of expenses
        { name: "أخرى", value: totalExpenses * 0.1 }, // 10% of expenses
      ]);

      // Aggregate cash flow data
      setCashFlowData(
        branchCashFlowData[filterPeriod as keyof typeof branchCashFlowData],
      );
    } else {
      // Filter data for selected branch
      const branchSales = branchSalesData[
        filterPeriod as keyof typeof branchSalesData
      ].filter((item) => item.branch === selectedBranch);
      setSalesData(branchSales);

      // Get expenses for selected branch
      const branchExpense =
        branchExpensesData[
          filterPeriod as keyof typeof branchExpensesData
        ].find((item) => item.branch === selectedBranch)?.expenses || 0;

      // Create pie chart data for expenses
      setExpensesData([
        { name: "رواتب", value: branchExpense * 0.45 }, // 45% of expenses
        { name: "إيجار", value: branchExpense * 0.2 }, // 20% of expenses
        { name: "مرافق", value: branchExpense * 0.1 }, // 10% of expenses
        { name: "تسويق", value: branchExpense * 0.15 }, // 15% of expenses
        { name: "أخرى", value: branchExpense * 0.1 }, // 10% of expenses
      ]);

      // Filter cash flow data for selected branch
      const branchCashFlow = branchCashFlowData[
        filterPeriod as keyof typeof branchCashFlowData
      ].filter((item) => item.branch === selectedBranch);
      setCashFlowData(branchCashFlow);
    }

    // Set branch cash balances
    setBranchCashBalances(
      ukrainianBranches.map((branch) => ({
        branch: branch.name,
        balance: branch.cashBalance,
      })),
    );
  }, [filterPeriod, selectedBranch]);

  const openTransactionSheet = (defaultTab: string) => {
    // Check if sheet already exists
    const existingSheet = document.getElementById("transaction-sheet");
    if (existingSheet) return;

    // Create a container for the sheet
    const container = document.createElement("div");
    container.id = "transaction-sheet";
    document.body.appendChild(container);

    // Render the sheet tabs component
    const root = ReactDOM.createRoot(container);
    root.render(
      <SheetTabs
        title="المعاملات المالية"
        defaultTab={defaultTab}
        tabs={[
          {
            id: "payment",
            label: "مدفوعات",
            content: (
              <CashTransaction
                type="payment"
                accounts={defaultAccounts}
                onSave={() => {}}
              />
            ),
          },
          {
            id: "receipt",
            label: "مقبوضات",
            content: (
              <CashTransaction
                type="receipt"
                accounts={defaultAccounts}
                onSave={() => {}}
              />
            ),
          },
          {
            id: "new-entry",
            label: "قيد يومية",
            content: (
              <NewJournalEntry accounts={defaultAccounts} onSave={() => {}} />
            ),
          },
          {
            id: "cash-journal",
            label: "يومية الصندوق",
            content: <CashJournal accounts={defaultAccounts} />,
          },
        ]}
        onClose={() => {
          setTimeout(() => {
            root.unmount();
            container.remove();
          }, 300);
        }}
      />,
    );
  };

  // Handlers for quick links
  const handleOpenJournalEntries = () => {
    // Navigate to journal-entries tab
    document
      .querySelector('[value="journal"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenCashJournal = () => {
    // Open cash journal sheet
    openTransactionSheet("cash-journal");
  };

  const handleOpenAccountTree = () => {
    // Navigate to account-tree tab
    document
      .querySelector('[value="accounts"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenFinancialReports = () => {
    // Navigate to financial-reports tab
    document
      .querySelector('[value="reports"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenCostCenters = () => {
    // Navigate to cost-centers tab
    document
      .querySelector('[value="costcenters"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleOpenCurrencyExchange = () => {
    // Navigate to currency-exchange tab
    document
      .querySelector('[value="exchange"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  return (
    <div className="space-y-6">
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
      {/* Filter and Quick Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">جميع الفروع</option>
              {ukrainianBranches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option value="daily">يومي</option>
              <option value="weekly">أسبوعي</option>
              <option value="monthly">شهري</option>
              <option value="yearly">سنوي</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => openTransactionSheet("cash-journal")}
          >
            <Plus className="ml-1 h-4 w-4" />
            يومية الصندوق
          </Button>
          <Button size="sm" onClick={() => openTransactionSheet("receipt")}>
            <Plus className="ml-1 h-4 w-4" />
            إضافة مقبوضات
          </Button>
          <Button size="sm" onClick={() => openTransactionSheet("payment")}>
            <Plus className="ml-1 h-4 w-4" />
            إضافة مدفوعات
          </Button>
          <Button size="sm" onClick={() => openTransactionSheet("new-entry")}>
            <Plus className="ml-1 h-4 w-4" />
            قيد محاسبي
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="المبيعات"
          value={`${
            selectedBranch === "all"
              ? branchSalesData[filterPeriod as keyof typeof branchSalesData]
                  .reduce((sum, item) => sum + item.sales, 0)
                  .toLocaleString()
              : branchSalesData[filterPeriod as keyof typeof branchSalesData]
                  .find((item) => item.branch === selectedBranch)
                  ?.sales.toLocaleString() || "0"
          } ₴`}
          change={
            filterPeriod === "daily"
              ? 8.5
              : filterPeriod === "weekly"
                ? 6.2
                : filterPeriod === "monthly"
                  ? 4.8
                  : 3.5
          }
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
        <KPICard
          title="المصروفات"
          value={`${
            selectedBranch === "all"
              ? branchExpensesData[
                  filterPeriod as keyof typeof branchExpensesData
                ]
                  .reduce((sum, item) => sum + item.expenses, 0)
                  .toLocaleString()
              : branchExpensesData[
                  filterPeriod as keyof typeof branchExpensesData
                ]
                  .find((item) => item.branch === selectedBranch)
                  ?.expenses.toLocaleString() || "0"
          } ₴`}
          change={
            filterPeriod === "daily"
              ? -3.2
              : filterPeriod === "weekly"
                ? -2.5
                : filterPeriod === "monthly"
                  ? -1.8
                  : -1.2
          }
          icon={<CreditCard className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
        <KPICard
          title="الرصيد النقدي"
          value={`${
            selectedBranch === "all"
              ? ukrainianBranches
                  .reduce((sum, branch) => sum + branch.cashBalance, 0)
                  .toLocaleString()
              : ukrainianBranches
                  .find((branch) => branch.name === selectedBranch)
                  ?.cashBalance.toLocaleString() || "0"
          } ₴`}
          change={5.7}
          icon={<Wallet className="h-5 w-5 text-primary" />}
          period="حالي"
        />
        <KPICard
          title="الذمم المدينة"
          value={`${selectedBranch === "all" ? "85,000" : "12,500"} ₴`}
          change={2.3}
          icon={<Users className="h-5 w-5 text-primary" />}
          period="حالي"
        />
      </div>

      {/* Quick Links */}
      <AccountingQuickLinks
        onOpenJournalEntries={handleOpenJournalEntries}
        onOpenCashJournal={handleOpenCashJournal}
        onOpenAccountTree={handleOpenAccountTree}
        onOpenFinancialReports={handleOpenFinancialReports}
        onOpenCostCenters={handleOpenCostCenters}
        onOpenCurrencyExchange={handleOpenCurrencyExchange}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {selectedBranch === "all"
                ? "المبيعات حسب الفرع"
                : `مبيعات فرع ${selectedBranch}`}
            </h3>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 ml-1" />
              تقرير كامل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
                <Bar
                  dataKey="sales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="المبيعات"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {selectedBranch === "all"
                ? "التدفق النقدي لجميع الفروع"
                : `التدفق النقدي لفرع ${selectedBranch}`}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {filterPeriod === "daily"
                  ? "يومي"
                  : filterPeriod === "weekly"
                    ? "أسبوعي"
                    : filterPeriod === "monthly"
                      ? "شهري"
                      : "سنوي"}
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="الإيرادات"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="المصروفات"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Additional Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {selectedBranch === "all"
                ? "توزيع المصروفات"
                : `توزيع مصروفات ${selectedBranch}`}
            </h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expensesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أرصدة الصناديق في الفروع</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openTransactionSheet("cash-journal")}
            >
              <Wallet className="h-4 w-4 ml-1" />
              يومية الصندوق
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الفرع
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الموقع
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    الرصيد النقدي
                  </th>
                </tr>
              </thead>
              <tbody>
                {ukrainianBranches.map((branch) => (
                  <tr key={branch.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm">{branch.name}</td>
                    <td className="py-2 px-2 text-sm">{branch.location}</td>
                    <td className="py-2 px-2 text-sm text-left text-blue-600">
                      {branch.cashBalance.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Customer & Supplier Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أرصدة العملاء</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCustomerDialog(true)}
            >
              عرض الكل
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    العميل
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الفرع
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    الرصيد
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerBalances.slice(0, 3).map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm">{customer.name}</td>
                    <td className="py-2 px-2 text-sm">
                      {selectedBranch !== "all"
                        ? selectedBranch
                        : ukrainianBranches[
                            Math.floor(Math.random() * ukrainianBranches.length)
                          ].name}
                    </td>
                    <td className="py-2 px-2 text-sm text-left text-blue-600">
                      {customer.balance.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أرصدة الموردين</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSupplierDialog(true)}
            >
              عرض الكل
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    المورد
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الفرع
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    الرصيد
                  </th>
                </tr>
              </thead>
              <tbody>
                {supplierBalances.slice(0, 3).map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm">{supplier.name}</td>
                    <td className="py-2 px-2 text-sm">
                      {selectedBranch !== "all"
                        ? selectedBranch
                        : ukrainianBranches[
                            Math.floor(Math.random() * ukrainianBranches.length)
                          ].name}
                    </td>
                    <td className="py-2 px-2 text-sm text-left text-red-600">
                      {supplier.balance.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Customer Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>أرصدة العملاء</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">
                    العميل
                  </th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">
                    الفرع
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">
                    الرصيد
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerBalances.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{customer.name}</td>
                    <td className="py-3 px-4">
                      {selectedBranch !== "all"
                        ? selectedBranch
                        : ukrainianBranches[
                            Math.floor(Math.random() * ukrainianBranches.length)
                          ].name}
                    </td>
                    <td className="py-3 px-4 text-left text-blue-600">
                      {customer.balance.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Supplier Dialog */}
      <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>أرصدة الموردين</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">
                    المورد
                  </th>
                  <th className="text-right py-2 px-4 font-medium text-muted-foreground">
                    الفرع
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">
                    الرصيد
                  </th>
                </tr>
              </thead>
              <tbody>
                {supplierBalances.map((supplier) => (
                  <tr key={supplier.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{supplier.name}</td>
                    <td className="py-3 px-4">
                      {selectedBranch !== "all"
                        ? selectedBranch
                        : ukrainianBranches[
                            Math.floor(Math.random() * ukrainianBranches.length)
                          ].name}
                    </td>
                    <td className="py-3 px-4 text-left text-red-600">
                      {supplier.balance.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountingDashboard;
