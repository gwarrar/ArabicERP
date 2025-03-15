import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Download,
  Filter,
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DashboardDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  chartType: string;
  title?: string;
  dataPoint?: any;
}

const DashboardDetailsPopup = ({
  open,
  onClose,
  chartType,
  title = "تفاصيل الرسم البياني",
  dataPoint,
}: DashboardDetailsPopupProps) => {
  // بيانات تجريبية للرسومات البيانية
  const salesData = [
    { name: "يناير", sales: 45000, target: 40000 },
    { name: "فبراير", sales: 52000, target: 45000 },
    { name: "مارس", sales: 48000, target: 50000 },
    { name: "أبريل", sales: 61000, target: 55000 },
    { name: "مايو", sales: 55000, target: 60000 },
    { name: "يونيو", sales: 67000, target: 65000 },
    { name: "يوليو", sales: 72000, target: 70000 },
    { name: "أغسطس", sales: 80000, target: 75000 },
    { name: "سبتمبر", sales: 67000, target: 80000 },
    { name: "أكتوبر", sales: 54000, target: 85000 },
    { name: "نوفمبر", sales: 48000, target: 90000 },
    { name: "ديسمبر", sales: 64000, target: 95000 },
  ];

  const cashFlowData = [
    { name: "يناير", income: 45000, expenses: 35000 },
    { name: "فبراير", income: 52000, expenses: 38000 },
    { name: "مارس", income: 48000, expenses: 42000 },
    { name: "أبريل", income: 61000, expenses: 45000 },
    { name: "مايو", income: 55000, expenses: 48000 },
    { name: "يونيو", income: 67000, expenses: 52000 },
    { name: "يوليو", income: 72000, expenses: 58000 },
    { name: "أغسطس", income: 80000, expenses: 62000 },
    { name: "سبتمبر", income: 67000, expenses: 59000 },
    { name: "أكتوبر", income: 54000, expenses: 51000 },
    { name: "نوفمبر", income: 48000, expenses: 45000 },
    { name: "ديسمبر", income: 64000, expenses: 55000 },
  ];

  const productCategoryData = [
    { name: "ملابس", value: 45 },
    { name: "أحذية", value: 25 },
    { name: "إكسسوارات", value: 15 },
    { name: "أقمشة", value: 10 },
    { name: "أخرى", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // الحصول على عنوان الرسم البياني
  const getChartTitle = () => {
    switch (chartType) {
      case "sales":
        return "تحليل المبيعات";
      case "cashflow":
        return "تحليل التدفق النقدي";
      case "products":
        return "تحليل المنتجات";
      default:
        return title;
    }
  };

  // الحصول على وصف الرسم البياني
  const getChartDescription = () => {
    switch (chartType) {
      case "sales":
        return "تحليل مفصل للمبيعات خلال الفترة الحالية مقارنة بالأهداف";
      case "cashflow":
        return "تحليل الإيرادات والمصروفات والتدفق النقدي";
      case "products":
        return "تحليل المبيعات حسب فئات المنتجات";
      default:
        return "تحليل مفصل للبيانات";
    }
  };

  // الحصول على بيانات الرسم البياني
  const getChartData = () => {
    switch (chartType) {
      case "sales":
        return salesData;
      case "cashflow":
        return cashFlowData;
      case "products":
        return productCategoryData;
      default:
        return salesData;
    }
  };

  // عرض الرسم البياني المناسب
  const renderChart = () => {
    switch (chartType) {
      case "sales":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="المبيعات" fill="#3b82f6" />
              <Bar dataKey="target" name="الهدف" fill="#10b981" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case "cashflow":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={cashFlowData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                name="الإيرادات"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="المصروفات"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "products":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={productCategoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {productCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>لا توجد بيانات متاحة</p>
          </div>
        );
    }
  };

  // عرض ملخص البيانات
  const renderSummary = () => {
    switch (chartType) {
      case "sales":
        const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
        const totalTarget = salesData.reduce(
          (sum, item) => sum + item.target,
          0,
        );
        const salesPerformance = (totalSales / totalTarget) * 100;
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المبيعات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {totalSales.toLocaleString()} ₴
                    </h3>
                  </div>
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">الهدف</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {totalTarget.toLocaleString()} ₴
                    </h3>
                  </div>
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      نسبة الإنجاز
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {salesPerformance.toFixed(1)}%
                    </h3>
                    <div className="flex items-center mt-2">
                      {salesPerformance >= 100 ? (
                        <span className="text-xs text-green-600 flex items-center font-medium">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          تجاوز الهدف
                        </span>
                      ) : (
                        <span className="text-xs text-amber-600 flex items-center font-medium">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          أقل من الهدف
                        </span>
                      )}
                    </div>
                  </div>
                  <LineChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "cashflow":
        const totalIncome = cashFlowData.reduce(
          (sum, item) => sum + item.income,
          0,
        );
        const totalExpenses = cashFlowData.reduce(
          (sum, item) => sum + item.expenses,
          0,
        );
        const netCashFlow = totalIncome - totalExpenses;
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الإيرادات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {totalIncome.toLocaleString()} ₴
                    </h3>
                  </div>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المصروفات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {totalExpenses.toLocaleString()} ₴
                    </h3>
                  </div>
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      صافي التدفق النقدي
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {netCashFlow.toLocaleString()} ₴
                    </h3>
                    <div className="flex items-center mt-2">
                      {netCashFlow >= 0 ? (
                        <span className="text-xs text-green-600 flex items-center font-medium">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          إيجابي
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 flex items-center font-medium">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          سلبي
                        </span>
                      )}
                    </div>
                  </div>
                  <BarChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "products":
        const totalProducts = productCategoryData.reduce(
          (sum, item) => sum + item.value,
          0,
        );
        const topCategory = [...productCategoryData].sort(
          (a, b) => b.value - a.value,
        )[0];
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">عدد الفئات</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {productCategoryData.length}
                    </h3>
                  </div>
                  <PieChart className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">أعلى فئة</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {topCategory.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-blue-600 flex items-center font-medium">
                        {topCategory.value}% من المبيعات
                      </span>
                    </div>
                  </div>
                  <BarChart className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المبيعات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">١٠٠%</h3>
                  </div>
                  <LineChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  // عرض جدول البيانات
  const renderDataTable = () => {
    switch (chartType) {
      case "sales":
        return (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    الشهر
                  </th>
                  <th scope="col" className="px-6 py-3">
                    المبيعات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الهدف
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الفرق
                  </th>
                  <th scope="col" className="px-6 py-3">
                    نسبة الإنجاز
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item, index) => {
                  const difference = item.sales - item.target;
                  const percentage = (item.sales / item.target) * 100;
                  return (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.sales.toLocaleString()} ₴
                      </td>
                      <td className="px-6 py-4">
                        {item.target.toLocaleString()} ₴
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {difference >= 0 ? (
                            <span className="text-green-600 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {difference.toLocaleString()} ₴
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center">
                              <TrendingDown className="h-4 w-4 mr-1" />
                              {Math.abs(difference).toLocaleString()} ₴
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            percentage >= 100
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {percentage.toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case "cashflow":
        return (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    الشهر
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الإيرادات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    المصروفات
                  </th>
                  <th scope="col" className="px-6 py-3">
                    صافي التدفق
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {cashFlowData.map((item, index) => {
                  const netFlow = item.income - item.expenses;
                  return (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.income.toLocaleString()} ₴
                      </td>
                      <td className="px-6 py-4">
                        {item.expenses.toLocaleString()} ₴
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {netFlow >= 0 ? (
                            <span className="text-green-600 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {netFlow.toLocaleString()} ₴
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center">
                              <TrendingDown className="h-4 w-4 mr-1" />
                              {Math.abs(netFlow).toLocaleString()} ₴
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            netFlow >= 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {netFlow >= 0 ? "إيجابي" : "سلبي"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case "products":
        return (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    الفئة
                  </th>
                  <th scope="col" className="px-6 py-3">
                    النسبة
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الترتيب
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...productCategoryData]
                  .sort((a, b) => b.value - a.value)
                  .map((item, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.value}%</td>
                      <td className="px-6 py-4">{index + 1}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            {chartType === "sales" ? (
              <BarChart className="h-5 w-5 text-blue-600" />
            ) : chartType === "cashflow" ? (
              <LineChart className="h-5 w-5 text-green-600" />
            ) : (
              <PieChart className="h-5 w-5 text-purple-600" />
            )}
            <DialogTitle>{getChartTitle()}</DialogTitle>
          </div>
          <DialogDescription>{getChartDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* ملخص البيانات */}
          {renderSummary()}

          {/* الرسم البياني */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {chartType === "sales"
                    ? "المبيعات مقابل الأهداف"
                    : chartType === "cashflow"
                      ? "الإيرادات والمصروفات"
                      : "توزيع المبيعات حسب الفئة"}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="ml-2 h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </div>
              <div className="h-[220px] w-full">{renderChart()}</div>
            </CardContent>
          </Card>

          {/* جدول البيانات */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {chartType === "sales"
                  ? "تفاصيل المبيعات الشهرية"
                  : chartType === "cashflow"
                    ? "تفاصيل التدفق النقدي الشهري"
                    : "تفاصيل فئات المنتجات"}
              </h3>
              {renderDataTable()}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDetailsPopup;
