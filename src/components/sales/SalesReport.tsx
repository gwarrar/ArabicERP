import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FileText,
  Printer,
  Download,
  RefreshCw,
  BarChart3,
  MapPin,
} from "lucide-react";
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
import { ukrainianBranches } from "@/data/branches";
import { topSellingProducts, salesStatistics } from "@/data/salesData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const SalesReport = () => {
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Sample data for charts
  const salesByCategory = [
    { name: "ملابس", value: 450000 },
    { name: "أحذية", value: 200000 },
    { name: "إكسسوارات", value: 170000 },
  ];

  const salesByBranch = [
    { name: "كييف", sales: 350000 },
    { name: "خاركيف", sales: 250000 },
    { name: "أوديسا", sales: 200000 },
    { name: "دنيبرو", sales: 150000 },
  ];

  const salesTrend = [
    { name: "يناير", sales: 120000 },
    { name: "فبراير", sales: 135000 },
    { name: "مارس", sales: 150000 },
    { name: "أبريل", sales: 140000 },
    { name: "مايو", sales: 160000 },
    { name: "يونيو", sales: 175000 },
    { name: "يوليو", sales: 190000 },
  ];

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">تقارير المبيعات</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">الفرع</label>
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">الفترة</label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">يومي</SelectItem>
              <SelectItem value="week">أسبوعي</SelectItem>
              <SelectItem value="month">شهري</SelectItem>
              <SelectItem value="quarter">ربع سنوي</SelectItem>
              <SelectItem value="year">سنوي</SelectItem>
              <SelectItem value="custom">مخصص</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">من تاريخ</label>
          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="w-[150px] pr-10"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">إلى تاريخ</label>
          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="w-[150px] pr-10"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-end">
          <Button>
            <RefreshCw className="ml-2 h-4 w-4" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">إجمالي المبيعات</h3>
          <p className="text-2xl font-bold mt-2">
            {salesStatistics.monthly.totalSales.toLocaleString()} ₴
          </p>
          <p className="text-xs text-green-500 mt-1">+4.5% عن الشهر السابق</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">عدد الطلبات</h3>
          <p className="text-2xl font-bold mt-2">
            {salesStatistics.monthly.orderCount.toLocaleString()}
          </p>
          <p className="text-xs text-green-500 mt-1">+3.2% عن الشهر السابق</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">متوسط قيمة الطلب</h3>
          <p className="text-2xl font-bold mt-2">
            {salesStatistics.monthly.averageOrderValue.toLocaleString()} ₴
          </p>
          <p className="text-xs text-green-500 mt-1">+1.8% عن الشهر السابق</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground">الفئة الأكثر مبيعاً</h3>
          <p className="text-2xl font-bold mt-2">
            {salesStatistics.monthly.topCategory}
          </p>
          <p className="text-xs text-muted-foreground mt-1">40% من المبيعات</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">اتجاه المبيعات</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
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

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">المبيعات حسب الفئة</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
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
                  {salesByCategory.map((entry, index) => (
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
      </div>

      {/* Top Products Table */}
      <Card className="p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">أفضل المنتجات مبيعاً</h3>
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4 ml-1" />
            تقرير كامل
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead className="text-center">الكمية المباعة</TableHead>
                <TableHead className="text-left">إجمالي المبيعات</TableHead>
                <TableHead className="text-center">نسبة المبيعات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-center">
                    {product.quantity} وحدة
                  </TableCell>
                  <TableCell className="text-left">
                    {product.sales.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {(
                      (product.sales /
                        topSellingProducts.reduce(
                          (sum, p) => sum + p.sales,
                          0,
                        )) *
                      100
                    ).toFixed(1)}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Sales by Branch */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">المبيعات حسب الفرع</h3>
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4 ml-1" />
            تقرير كامل
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الفرع</TableHead>
                <TableHead className="text-left">إجمالي المبيعات</TableHead>
                <TableHead className="text-center">عدد الطلبات</TableHead>
                <TableHead className="text-left">متوسط قيمة الطلب</TableHead>
                <TableHead className="text-center">نسبة المبيعات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesByBranch.map((branch, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{branch.name}</TableCell>
                  <TableCell className="text-left">
                    {branch.sales.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {Math.round(branch.sales / 1250)}
                  </TableCell>
                  <TableCell className="text-left">1,250 ₴</TableCell>
                  <TableCell className="text-center">
                    {(
                      (branch.sales /
                        salesByBranch.reduce((sum, b) => sum + b.sales, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </Card>
  );
};

export default SalesReport;
