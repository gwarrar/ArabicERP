import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Download,
  Filter,
  Printer,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  BarChart,
  PieChart,
  LineChart,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Sample financial data
const financialSummaryData = [
  {
    id: "1",
    category: "إيرادات المبيعات",
    amount: 338000,
    previousPeriod: 300000,
    change: 12.67,
    type: "إيرادات",
  },
  {
    id: "2",
    category: "تكلفة البضاعة المباعة",
    amount: 189000,
    previousPeriod: 175000,
    change: 8.00,
    type: "مصروفات",
  },
  {
    id: "3",
    category: "إجمالي الربح",
    amount: 149000,
    previousPeriod: 125000,
    change: 19.20,
    type: "ربح",
  },
  {
    id: "4",
    category: "مصاريف تشغيلية",
    amount: 85000,
    previousPeriod: 80000,
    change: 6.25,
    type: "مصروفات",
  },
  {
    id: "5",
    category: "صافي الربح",
    amount: 64000,
    previousPeriod: 45000,
    change: 42.22,
    type: "ربح",
  },
];

// Sample monthly financial data
const monthlyFinancialData = [
  {
    month: "يناير",
    إيرادات: 45000,
    مصروفات: 32000,
    ربح: 13000,
  },
  {
    month: "فبراير",
    إيرادات: 52000,
    مصروفات: 34000,
    ربح: 18000,
  },
  {
    month: "مارس",
    إيرادات: 49000,
    مصروفات: 36000,
    ربح: 13000,
  },
  {
    month: "أبريل",
    إيرادات: 63000,
    مصروفات: 40000,
    ربح: 23000,
  },
  {
    month: "مايو",
    إيرادات: 58000,
    مصروفات: 45000,
    ربح: 13000,
  },
  {
    month: "يونيو",
    إيرادات: 71000,
    مصروفات: 42000,
    ربح: 29000,
  },
];

// Sample expense breakdown data
const expenseBreakdownData = [
  { name: "رواتب وأجور", قيمة: 45 },
  { name: "إيجارات", قيمة: 20 },
  { name: "مرافق", قيمة: 15 },
  { name: "تسويق وإعلان", قيمة: 10 },
  { name: "أخرى", قيمة: 10 },
];

// Sample cash flow data
const cashFlowData = [
  {
    month: "يناير",
    التدفق_النقدي_التشغيلي: 15000,
    التدفق_النقدي_الاستثماري: -5000,
    التدفق_النقدي_التمويلي: -2000,
  },
  {
    month: "فبراير",
    التدفق_النقدي_التشغيلي: 18000,
    التدفق_النقدي_الاستثماري: -3000,
    التدفق_النقدي_التمويلي: -2000,
  },
  {
    month: "مارس",
    التدفق_النقدي_التشغيلي: 14000,
    التدفق_النقدي_الاستثماري: -8000,
    التدفق_النقدي_التمويلي: -2000,
  },
  {
    month: "أبريل",
    التدفق_النقدي_التشغيلي: 22000,
    التدفق_النقدي_الاستثماري: -4000,
    التدفق_النقدي_التمويلي: -2000,
  },
  {
    month: "مايو",
    التدفق_النقدي_التشغيلي: 16000,
    التدفق_النقدي_الاستثماري: -6000,
    التدفق_النقدي_التمويلي: -2000,
  },
  {
    month: "يونيو",
    التدفق_النقدي_التشغيلي: 25000,
    التدفق_النقدي_الاستثماري: -10000,
    التدفق_النقدي_التمويلي: -2000,
  },
];

// Colors for pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState("income-statement");
  const [period, setPeriod] = useState("monthly");

  // Calculate total revenue, expenses and profit
  const totalRevenue = financialSummaryData.find(
    (item) => item.category === "إيرادات المبيعات",
  ).amount;
  const totalExpenses = financialSummaryData.find(
    (item) => item.category === "تكلفة البضاعة المباعة",
  ).amount;
  const totalProfit = financialSummaryData.find(
    (item) => item.category === "صافي الربح",
  ).amount;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">التقارير المالية</h2>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">شهري</SelectItem>
              <SelectItem value="quarterly">ربع سنوي</SelectItem>
              <SelectItem value="yearly">سنوي</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="ml-1 h-3 w-3" />
            تصدير
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="ml-1 h-3 w-3" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalRevenue.toLocaleString()} ₴
                </h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +١٢.٧%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalExpenses.toLocaleString()} ₴
                </h3>
                <p className="text-sm text-amber-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +٨.٠%
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">صافي الربح</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalProfit.toLocaleString()} ₴
                </h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +٤٢.٢%
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Report Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="income-statement">
            <FileText className="h-4 w-4 ml-2" />
            قائمة الدخل
          </TabsTrigger>
          <TabsTrigger value="cash-flow">
            <LineChart className="h-4 w-4 ml-2" />
            التدفق النقدي
          </TabsTrigger>
          <TabsTrigger value="expense-analysis">
            <PieChart className="h-4 w-4 ml-2" />
            تحليل المصروفات
          </TabsTrigger>
          <TabsTrigger value="profitability">
            <BarChart className="h-4 w-4 ml-2" />
            تحليل الربحية
          </TabsTrigger>
        </TabsList>

        {/* Income Statement Tab */}
        <TabsContent value="income-statement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قائمة الدخل</CardTitle>
              <CardDescription>
                ملخص الإيرادات والمصروفات والأرباح للفترة الحالية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead className="text-right">المبلغ (₴)</TableHead>
                      <TableHead className="text-right">الفترة السابقة (₴)</TableHead>
                      <TableHead className="text-right">التغيير (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialSummaryData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.previousPeriod.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`flex items-center justify-end ${item.change > 0 ? (item.type === "مصروفات" ? "text-amber-600" : "text-green-600") : (item.type === "مصروفات" ? "text-green-600" : "text-amber-600")}`}
                          >
                            {item.change > 0 ? (
                              <TrendingUp className="h-3 w-3 ml-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 ml-1" />
                            )}
                            {item.change.toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات والمصروفات والأرباح</CardTitle>
              <CardDescription>
                مقارنة الإيرادات والمصروفات والأرباح على مدار الأشهر الستة
                الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={monthlyFinancialData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="إيرادات" fill="#8884d8" />
                    <Bar dataKey="مصروفات" fill="#82ca9d" />
                    <Bar dataKey="ربح" fill="#ffc658" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cash-flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل التدفق النقدي</CardTitle>
              <CardDescription>
                تحليل التدفقات النقدية التشغيلية والاستثمارية والتمويلية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={cashFlowData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="التدفق_النقدي_التشغيلي"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="التدفق_النقدي_الاستثماري"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="التدفق_النقدي_التمويلي"
                      stroke="#ffc658"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>صافي التدفق النقدي</CardTitle>
              <CardDescription>
                صافي التدفق النقدي على مدار الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={cashFlowData.map((item) => ({
                      month: item.month,
                      صافي_التدفق_النقدي:
                        item.التدفق_النقدي_التشغيلي +
                        item.التدفق_النقدي_الاستثماري +
                        item.التدفق_النقدي_التمويلي,
                    }))}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="صافي_التدفق_النقدي"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Analysis Tab */}
        <TabsContent value="expense-analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المصروفات</CardTitle>
                <CardDescription>
                  توزيع المصروفات حسب الفئات المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={expenseBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="قيمة"
                      >
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل المصروفات</CardTitle>
                <CardDescription>
                  تفاصيل المصروفات حسب الفئات المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الفئة</TableHead>
                        <TableHead className="text-right">النسبة (%)</TableHead>
                        <TableHead className="text-right">المبلغ (₴)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenseBreakdownData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.قيمة}%
                          </TableCell>
                          <TableCell className="text-right">
                            {Math.round(
                              (item.قيمة / 100) * totalExpenses,
                            ).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تطور المصروفات</CardTitle>
              <CardDescription>
                تطور المصروفات على مدار الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={monthlyFinancialData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="مصروفات"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profitability Analysis Tab */}
        <TabsContent value="profitability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الربحية</CardTitle>
              <CardDescription>
                تحليل الربحية على مدار الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={monthlyFinancialData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="ربح"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>هامش الربح</CardTitle>
                <CardDescription>
                  هامش الربح على مدار الأشهر الستة الماضية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={monthlyFinancialData.map((item) => ({
                        month: item.month,
                        هامش_الربح: Math.round(
                          (item.ربح / item.إيرادات) * 100,
                        ),
                      }))}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line
                        type="monotone"
                        dataKey="هامش_الربح"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </RechartsLineChart>
