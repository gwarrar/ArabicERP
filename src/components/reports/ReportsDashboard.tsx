import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  LineChart,
  PieChart,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowRight,
  Printer,
  Filter,
  RefreshCw,
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
} from "recharts";

// Sample data for sales by month chart
const salesByMonthData = [
  { month: "يناير", المبيعات: 45000, المشتريات: 32000 },
  { month: "فبراير", المبيعات: 52000, المشتريات: 34000 },
  { month: "مارس", المبيعات: 49000, المشتريات: 36000 },
  { month: "أبريل", المبيعات: 63000, المشتريات: 40000 },
  { month: "مايو", المبيعات: 58000, المشتريات: 45000 },
  { month: "يونيو", المبيعات: 71000, المشتريات: 42000 },
];

// Sample data for revenue by product category
const revenueByProductCategoryData = [
  { name: "ملابس رجالية", قيمة: 35 },
  { name: "ملابس نسائية", قيمة: 40 },
  { name: "ملابس أطفال", قيمة: 15 },
  { name: "إكسسوارات", قيمة: 10 },
];

// Sample data for inventory status
const inventoryStatusData = [
  { name: "متوفر", قيمة: 65 },
  { name: "منخفض", قيمة: 25 },
  { name: "نفذ", قيمة: 10 },
];

// Sample data for customer growth
const customerGrowthData = [
  { month: "يناير", عملاء_جدد: 120, عملاء_نشطون: 450 },
  { month: "فبراير", عملاء_جدد: 145, عملاء_نشطون: 480 },
  { month: "مارس", عملاء_جدد: 130, عملاء_نشطون: 510 },
  { month: "أبريل", عملاء_جدد: 160, عملاء_نشطون: 550 },
  { month: "مايو", عملاء_جدد: 175, عملاء_نشطون: 590 },
  { month: "يونيو", عملاء_جدد: 190, عملاء_نشطون: 650 },
];

// Sample data for top selling products
const topSellingProductsData = [
  {
    id: "P001",
    name: "قميص قطني رجالي",
    category: "ملابس رجالية",
    sales: 245,
    revenue: 29400,
    growth: 12.5,
  },
  {
    id: "P002",
    name: "فستان صيفي",
    category: "ملابس نسائية",
    sales: 210,
    revenue: 31500,
    growth: 8.3,
  },
  {
    id: "P003",
    name: "بنطلون جينز",
    category: "ملابس رجالية",
    sales: 180,
    revenue: 27000,
    growth: 5.7,
  },
  {
    id: "P004",
    name: "تي شيرت أطفال",
    category: "ملابس أطفال",
    sales: 165,
    revenue: 12375,
    growth: 9.2,
  },
  {
    id: "P005",
    name: "بلوزة نسائية",
    category: "ملابس نسائية",
    sales: 150,
    revenue: 18000,
    growth: 6.8,
  },
];

// Sample data for recent sales
const recentSalesData = [
  {
    id: "S001",
    customer: "شركة الأمل للتجارة",
    date: "2024-07-15",
    amount: 12500,
    status: "مكتمل",
  },
  {
    id: "S002",
    customer: "مؤسسة النور",
    date: "2024-07-14",
    amount: 8750,
    status: "مكتمل",
  },
  {
    id: "S003",
    customer: "شركة البناء الحديث",
    date: "2024-07-13",
    amount: 15300,
    status: "قيد المعالجة",
  },
  {
    id: "S004",
    customer: "مؤسسة الصفا",
    date: "2024-07-12",
    amount: 6200,
    status: "مكتمل",
  },
  {
    id: "S005",
    customer: "متجر الأناقة",
    date: "2024-07-11",
    amount: 9800,
    status: "ملغي",
  },
];

// Colors for pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const ReportsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                <h3 className="text-2xl font-bold mt-2">٣٣٨,٠٠٠ ₴</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +١٢.٥%
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                <h3 className="text-2xl font-bold mt-2">١,١٥٠</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +٨.٣%
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">العملاء النشطون</p>
                <h3 className="text-2xl font-bold mt-2">٦٥٠</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +١٠.٢%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">مستوى المخزون</p>
                <h3 className="text-2xl font-bold mt-2">٣,٤٥٦</h3>
                <p className="text-sm text-amber-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> -٢.١%
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">
            <DollarSign className="h-4 w-4 ml-2" />
            تقارير المبيعات
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="h-4 w-4 ml-2" />
            تقارير المخزون
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 ml-2" />
            تقارير العملاء
          </TabsTrigger>
          <TabsTrigger value="financial">
            <FileText className="h-4 w-4 ml-2" />
            التقارير المالية
          </TabsTrigger>
        </TabsList>

        {/* Sales Reports Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">تقارير المبيعات</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-1 h-3 w-3" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="ml-1 h-3 w-3" />
                الفترة: آخر ٦ أشهر
              </Button>
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

          {/* Sales by Month Chart */}
          <Card>
            <CardHeader>
              <CardTitle>المبيعات والمشتريات الشهرية</CardTitle>
              <CardDescription>
                مقارنة بين المبيعات والمشتريات على مدار الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={salesByMonthData}
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
                    <Bar dataKey="المبيعات" fill="#8884d8" />
                    <Bar dataKey="المشتريات" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Product Category & Top Selling Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الإيرادات حسب فئة المنتج</CardTitle>
                <CardDescription>
                  توزيع الإيرادات على فئات المنتجات المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={revenueByProductCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="قيمة"
                      >
                        {revenueByProductCategoryData.map((entry, index) => (
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
              <CardHeader className="flex justify-between items-start">
                <div>
                  <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
                  <CardDescription>
                    أفضل المنتجات مبيعاً خلال الفترة
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <span className="text-sm">عرض الكل</span>
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellingProductsData.slice(0, 3).map((product, index) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {product.revenue.toLocaleString()} ₴
                        </p>
                        <p
                          className={`text-sm ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {product.growth > 0 ? "+" : ""}
                          {product.growth}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales */}
          <Card>
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle>أحدث المبيعات</CardTitle>
                <CardDescription>
                  آخر المبيعات المسجلة في النظام
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <span className="text-sm">عرض الكل</span>
                <ArrowRight className="h-4 w-4 mr-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSalesData.slice(0, 4).map((sale) => (
                  <div
                    key={sale.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{sale.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sale.date).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {sale.amount.toLocaleString()} ₴
                      </p>
                      <Badge
                        className={`${sale.status === "مكتمل" ? "bg-green-100 text-green-800" : sale.status === "قيد المعالجة" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}
                      >
                        {sale.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Reports Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">تقارير المخزون</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-1 h-3 w-3" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="ml-1 h-3 w-3" />
                تحديث
              </Button>
              <Button variant="outline" size="sm">
                <Download className="ml-1 h-3 w-3" />
                تصدير
              </Button>
            </div>
          </div>

          {/* Inventory Status Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>حالة المخزون</CardTitle>
                <CardDescription>توزيع المخزون حسب الحالة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={inventoryStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="قيمة"
                      >
                        {inventoryStatusData.map((entry, index) => (
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
                <CardTitle>ملخص المخزون</CardTitle>
                <CardDescription>
                  نظرة عامة على حالة المخزون الحالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        إجمالي العناصر
                      </p>
                      <p className="text-2xl font-bold">٣,٤٥٦</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        قيمة المخزون
                      </p>
                      <p className="text-2xl font-bold">٤٥٦,٧٨٠ ₴</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-amber-800">عناصر منخفضة</p>
                      <p className="text-2xl font-bold text-amber-800">٨٦٥</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-800">عناصر نفذت</p>
                      <p className="text-2xl font-bold text-red-800">٣٤٥</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Movement */}
          <Card>
            <CardHeader>
              <CardTitle>حركة المخزون</CardTitle>
              <CardDescription>
                تتبع حركة المخزون خلال الفترة الأخيرة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={salesByMonthData}
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
                      dataKey="المبيعات"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="الصادر"
                    />
                    <Line
                      type="monotone"
                      dataKey="المشتريات"
                      stroke="#82ca9d"
                      name="الوارد"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Reports Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">تقارير العملاء</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-1 h-3 w-3" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="ml-1 h-3 w-3" />
                الفترة: آخر ٦ أشهر
              </Button>
              <Button variant="outline" size="sm">
                <Download className="ml-1 h-3 w-3" />
                تصدير
              </Button>
            </div>
          </div>

          {/* Customer Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>نمو العملاء</CardTitle>
              <CardDescription>
                تتبع نمو العملاء الجدد والنشطين خلال الفترة الأخيرة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={customerGrowthData}
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
                      dataKey="عملاء_جدد"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="عملاء_نشطون"
                      stroke="#82ca9d"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Customer Segments & Top Customers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>شرائح العملاء</CardTitle>
                <CardDescription>توزيع العملاء حسب الشرائح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "عملاء ذهبيون", قيمة: 20 },
                          { name: "عملاء فضيون", قيمة: 30 },
                          { name: "عملاء برونزيون", قيمة: 50 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="قيمة"
                      >
                        {[
                          { name: "عملاء ذهبيون", قيمة: 20 },
                          { name: "عملاء فضيون", قيمة: 30 },
                          { name: "عملاء برونزيون", قيمة: 50 },
                        ].map((entry, index) => (
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
              <CardHeader className="flex justify-between items-start">
                <div>
                  <CardTitle>كبار العملاء</CardTitle>
                  <CardDescription>
                    العملاء الأكثر إنفاقاً خلال الفترة
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <span className="text-sm">عرض الكل</span>
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "C001",
                      name: "شركة الأمل للتجارة",
                      purchases: 12,
                      totalSpent: 145000,
                    },
                    {
                      id: "C002",
                      name: "مؤسسة النور",
                      purchases: 8,
                      totalSpent: 98500,
                    },
                    {
                      id: "C003",
                      name: "شركة البناء الحديث",
                      purchases: 10,
                      totalSpent: 87200,
                    },
                  ].map((customer) => (
                    <div
                      key={customer.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.purchases} طلبات
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {customer.totalSpent.toLocaleString()} ₴
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Reports Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">التقارير المالية</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-1 h-3 w-3" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="ml-1 h-3 w-3" />
                الفترة: آخر ٦ أشهر
              </Button>
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

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الإيرادات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">٣٣٨,٠٠٠ ₴</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +١٢.٥%
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
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
                    <h3 className="text-2xl font-bold mt-2">١٨٩,٠٠٠ ₴</h3>
                    <p className="text-sm text-amber-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +٨.٢%
                    </p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">صافي الربح</p>
                    <h3 className="text-2xl font-bold mt-2">١٤٩,٠٠٠ ₴</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> +١٨.٣%
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue vs Expenses Chart */}
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات مقابل المصروفات</CardTitle>
              <CardDescription>
                مقارنة بين الإيرادات والمصروفات على مدار الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={salesByMonthData}
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
                      dataKey="المبيعات"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="الإيرادات"
                    />
                    <Line
                      type="monotone"
                      dataKey="المشتريات"
                      stroke="#82ca9d"
                      name="المصروفات"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Profit Margin & Revenue by Channel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>هامش الربح</CardTitle>
                <CardDescription>
                  تحليل هامش الربح على مدار الفترة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={[
                        { month: "يناير", هامش_الربح: 42 },
                        { month: "فبراير", هامش_الربح: 45 },
                        { month: "مارس", هامش_الربح: 40 },
                        { month: "أبريل", هامش_الربح: 48 },
                        { month: "مايو", هامش_الربح: 43 },
                        { month: "يونيو", هامش_الربح: 46 },
                      ]}
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
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإيرادات حسب القناة</CardTitle>
                <CardDescription>
                  توزيع الإيرادات على قنوات البيع المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "المتجر الفعلي", قيمة: 45 },
                          { name: "المتجر الإلكتروني", قيمة: 35 },
                          { name: "تطبيق الجوال", قيمة: 15 },
                          { name: "منصات أخرى", قيمة: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="قيمة"
                      >
                        {[
                          { name: "المتجر الفعلي", قيمة: 45 },
                          { name: "المتجر الإلكتروني", قيمة: 35 },
                          { name: "تطبيق الجوال", قيمة: 15 },
                          { name: "منصات أخرى", قيمة: 5 },
                        ].map((entry, index) => (
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsDashboard;
