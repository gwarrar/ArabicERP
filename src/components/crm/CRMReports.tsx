import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  BarChart2,
  Calendar,
  Download,
  FileText,
  Filter,
  LineChart,
  PieChart,
  Printer,
  RefreshCw,
  Search,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { customers, opportunities, communications } from "@/data/crmData";
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

const CRMReports = () => {
  const [activeTab, setActiveTab] = useState("performance");
  const [dateRange, setDateRange] = useState("month");
  const [selectedReport, setSelectedReport] = useState("sales");

  // Calculate KPIs
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(
    (customer) => customer.status === "active",
  ).length;
  const newCustomersThisMonth = customers.filter(
    (customer) =>
      customer.firstOrder &&
      new Date(customer.firstOrder) >
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
  ).length;
  const customerRetentionRate = Math.round(
    (activeCustomers / totalCustomers) * 100,
  );

  // Calculate sales metrics
  const totalOpportunities = opportunities.length;
  const wonOpportunities = opportunities.filter(
    (opp) => opp.stage === "closed_won",
  ).length;
  const lostOpportunities = opportunities.filter(
    (opp) => opp.stage === "closed_lost",
  ).length;
  const conversionRate = Math.round(
    (wonOpportunities / totalOpportunities) * 100,
  );

  // Calculate total sales value
  const totalSalesValue = opportunities
    .filter((opp) => opp.stage === "closed_won")
    .reduce((sum, opp) => sum + opp.value, 0);

  // Calculate average deal size
  const averageDealSize = Math.round(totalSalesValue / (wonOpportunities || 1));

  // Calculate weighted pipeline value
  const weightedPipelineValue = opportunities
    .filter((opp) => opp.stage !== "closed_won" && opp.stage !== "closed_lost")
    .reduce((sum, opp) => sum + opp.value * (opp.probability / 100), 0);

  // Sample data for charts
  const monthlySalesData = [
    { name: "يناير", قيمة: 45000 },
    { name: "فبراير", قيمة: 52000 },
    { name: "مارس", قيمة: 48000 },
    { name: "أبريل", قيمة: 61000 },
    { name: "مايو", قيمة: 55000 },
    { name: "يونيو", قيمة: 67000 },
    { name: "يوليو", قيمة: 72000 },
    { name: "أغسطس", قيمة: 68000 },
    { name: "سبتمبر", قيمة: 74000 },
    { name: "أكتوبر", قيمة: 78000 },
    { name: "نوفمبر", قيمة: 82000 },
    { name: "ديسمبر", قيمة: 91000 },
  ];

  const conversionRateData = [
    { name: "مؤهل أولي", نسبة: 100 },
    { name: "مؤهل", نسبة: 80 },
    { name: "تقديم عرض", نسبة: 60 },
    { name: "تفاوض", نسبة: 40 },
    { name: "مغلق (ناجح)", نسبة: 25 },
  ];

  const customerSegmentationData = [
    { name: "عملاء جدد", value: 30 },
    { name: "عملاء عاديين", value: 45 },
    { name: "عملاء VIP", value: 15 },
    { name: "عملاء غير نشطين", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Sample data for sales by region
  const salesByRegionData = [
    { name: "أوديسا", قيمة: 35000 },
    { name: "كييف", قيمة: 28000 },
    { name: "خاركيف", قيمة: 22000 },
    { name: "لفيف", قيمة: 18000 },
    { name: "دنيبرو", قيمة: 15000 },
  ];

  // Sample data for sales by product category
  const salesByProductData = [
    { name: "الأثاث المكتبي", قيمة: 42000 },
    { name: "الأجهزة الإلكترونية", قيمة: 38000 },
    { name: "المستلزمات المكتبية", قيمة: 25000 },
    { name: "خدمات الصيانة", قيمة: 18000 },
    { name: "البرمجيات", قيمة: 15000 },
  ];

  // Sample data for customer acquisition cost
  const customerAcquisitionData = [
    { name: "يناير", تكلفة: 1200 },
    { name: "فبراير", تكلفة: 1150 },
    { name: "مارس", تكلفة: 1100 },
    { name: "أبريل", تكلفة: 1050 },
    { name: "مايو", تكلفة: 1000 },
    { name: "يونيو", تكلفة: 950 },
  ];

  // Sample data for customer lifetime value
  const customerLifetimeValueData = [
    { name: "عملاء جدد", قيمة: 15000 },
    { name: "عملاء عاديين", قيمة: 35000 },
    { name: "عملاء VIP", قيمة: 75000 },
  ];

  // Function to get chart data based on selected report and date range
  const getChartData = () => {
    switch (selectedReport) {
      case "sales":
        return monthlySalesData;
      case "conversion":
        return conversionRateData;
      case "region":
        return salesByRegionData;
      case "product":
        return salesByProductData;
      case "acquisition":
        return customerAcquisitionData;
      case "lifetime":
        return customerLifetimeValueData;
      default:
        return monthlySalesData;
    }
  };

  // Function to get chart type based on selected report
  const getChartType = () => {
    switch (selectedReport) {
      case "sales":
        return "bar";
      case "conversion":
        return "line";
      case "region":
        return "bar";
      case "product":
        return "bar";
      case "acquisition":
        return "line";
      case "lifetime":
        return "bar";
      default:
        return "bar";
    }
  };

  // Function to get chart title based on selected report
  const getChartTitle = () => {
    switch (selectedReport) {
      case "sales":
        return "تحليل المبيعات الشهرية";
      case "conversion":
        return "معدل التحويل حسب مراحل المبيعات";
      case "region":
        return "المبيعات حسب المنطقة";
      case "product":
        return "المبيعات حسب فئة المنتج";
      case "acquisition":
        return "تكلفة اكتساب العملاء";
      case "lifetime":
        return "القيمة العمرية للعميل";
      default:
        return "تحليل المبيعات";
    }
  };

  // Function to get chart data key based on selected report
  const getChartDataKey = () => {
    switch (selectedReport) {
      case "sales":
        return "قيمة";
      case "conversion":
        return "نسبة";
      case "region":
        return "قيمة";
      case "product":
        return "قيمة";
      case "acquisition":
        return "تكلفة";
      case "lifetime":
        return "قيمة";
      default:
        return "قيمة";
    }
  };

  // Function to render the appropriate chart based on the selected report
  const renderChart = () => {
    const chartType = getChartType();
    const chartData = getChartData();
    const dataKey = getChartDataKey();

    if (selectedReport === "segmentation") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={customerSegmentationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {customerSegmentationData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <RechartsTooltip formatter={(value) => [`${value}%`, "النسبة"]} />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip
              formatter={(value) => [`${value.toLocaleString()} ₴`, dataKey]}
            />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
          </RechartsBarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip
              formatter={(value) => [
                dataKey === "تكلفة"
                  ? `${value.toLocaleString()} ₴`
                  : `${value}%`,
                dataKey,
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalSalesValue.toLocaleString()} ₴
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-muted-foreground mr-1">
                مقارنة بالشهر السابق
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">معدل التحويل</p>
                <h3 className="text-2xl font-bold mt-2">{conversionRate}%</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+5%</span>
              <span className="text-muted-foreground mr-1">
                مقارنة بالشهر السابق
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط قيمة الصفقة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {averageDealSize.toLocaleString()} ₴
                </h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <BarChart2 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-muted-foreground mr-1">
                مقارنة بالشهر السابق
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عملاء جدد</p>
                <h3 className="text-2xl font-bold mt-2">
                  {newCustomersThisMonth}
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-muted-foreground mr-1">
                مقارنة بالشهر السابق
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="performance">
            <BarChart className="h-4 w-4 ml-2" />
            تقارير الأداء
          </TabsTrigger>
          <TabsTrigger value="sales">
            <LineChart className="h-4 w-4 ml-2" />
            تحليل المبيعات
          </TabsTrigger>
          <TabsTrigger value="customers">
            <PieChart className="h-4 w-4 ml-2" />
            تحليل العملاء
          </TabsTrigger>
        </TabsList>

        {/* Performance Reports Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
                <div className="flex gap-2">
                  <Select
                    value={dateRange}
                    onValueChange={(value) => setDateRange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">آخر أسبوع</SelectItem>
                      <SelectItem value="month">آخر شهر</SelectItem>
                      <SelectItem value="quarter">آخر ربع سنة</SelectItem>
                      <SelectItem value="year">آخر سنة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    تحديث
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">مؤشرات المبيعات</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          إجمالي الفرص
                        </TableCell>
                        <TableCell className="text-left">
                          {totalOpportunities}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          الفرص المغلقة (ناجحة)
                        </TableCell>
                        <TableCell className="text-left">
                          {wonOpportunities}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          الفرص المغلقة (خاسرة)
                        </TableCell>
                        <TableCell className="text-left">
                          {lostOpportunities}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          معدل التحويل
                        </TableCell>
                        <TableCell className="text-left">
                          {conversionRate}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          متوسط قيمة الصفقة
                        </TableCell>
                        <TableCell className="text-left">
                          {averageDealSize.toLocaleString()} ₴
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          قيمة خط الأنابيب المرجحة
                        </TableCell>
                        <TableCell className="text-left">
                          {weightedPipelineValue.toLocaleString()} ₴
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">مؤشرات العملاء</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          إجمالي العملاء
                        </TableCell>
                        <TableCell className="text-left">
                          {totalCustomers}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          العملاء النشطين
                        </TableCell>
                        <TableCell className="text-left">
                          {activeCustomers}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          العملاء الجدد (هذا الشهر)
                        </TableCell>
                        <TableCell className="text-left">
                          {newCustomersThisMonth}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          معدل الاحتفاظ بالعملاء
                        </TableCell>
                        <TableCell className="text-left">
                          {customerRetentionRate}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          متوسط قيمة العميل
                        </TableCell>
                        <TableCell className="text-left">32,500 ₴</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          تكلفة اكتساب العميل
                        </TableCell>
                        <TableCell className="text-left">1,200 ₴</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">مؤشرات النشاط</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          إجمالي الاتصالات
                        </TableCell>
                        <TableCell className="text-left">
                          {communications.length}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          المكالمات الهاتفية
                        </TableCell>
                        <TableCell className="text-left">
                          {
                            communications.filter((c) => c.type === "phone")
                              .length
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          رسائل البريد الإلكتروني
                        </TableCell>
                        <TableCell className="text-left">
                          {
                            communications.filter((c) => c.type === "email")
                              .length
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">الزيارات</TableCell>
                        <TableCell className="text-left">
                          {
                            communications.filter((c) => c.type === "visit")
                              .length
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          متوسط وقت الاستجابة
                        </TableCell>
                        <TableCell className="text-left">4.5 ساعة</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          معدل الرضا
                        </TableCell>
                        <TableCell className="text-left">92%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Analysis Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تحليل المبيعات</CardTitle>
                <div className="flex gap-2">
                  <Select
                    value={selectedReport}
                    onValueChange={(value) => setSelectedReport(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <BarChart className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="اختر التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">المبيعات الشهرية</SelectItem>
                      <SelectItem value="conversion">معدل التحويل</SelectItem>
                      <SelectItem value="region">
                        المبيعات حسب المنطقة
                      </SelectItem>
                      <SelectItem value="product">
                        المبيعات حسب المنتج
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={dateRange}
                    onValueChange={(value) => setDateRange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">آخر أسبوع</SelectItem>
                      <SelectItem value="month">آخر شهر</SelectItem>
                      <SelectItem value="quarter">آخر ربع سنة</SelectItem>
                      <SelectItem value="year">آخر سنة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{getChartTitle()}</h3>
                {renderChart()}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-blue-800">
                        إجمالي المبيعات
                      </h4>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {totalSalesValue.toLocaleString()} ₴
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-green-800">
                        معدل النمو
                      </h4>
                      <p className="text-2xl font-bold text-green-900 mt-2">
                        +18%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-purple-800">
                        متوسط قيمة الصفقة
                      </h4>
                      <p className="text-2xl font-bold text-purple-900 mt-2">
                        {averageDealSize.toLocaleString()} ₴
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Analysis Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تحليل العملاء</CardTitle>
                <div className="flex gap-2">
                  <Select
                    value={selectedReport}
                    onValueChange={(value) => setSelectedReport(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <PieChart className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="اختر التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="segmentation">
                        تقسيم العملاء
                      </SelectItem>
                      <SelectItem value="acquisition">
                        تكلفة اكتساب العملاء
                      </SelectItem>
                      <SelectItem value="lifetime">
                        القيمة العمرية للعميل
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={dateRange}
                    onValueChange={(value) => setDateRange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">آخر شهر</SelectItem>
                      <SelectItem value="quarter">آخر ربع سنة</SelectItem>
                      <SelectItem value="year">آخر سنة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{getChartTitle()}</h3>
                {renderChart()}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-blue-800">
                        إجمالي العملاء
                      </h4>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {totalCustomers}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-green-800">
                        معدل الاحتفاظ
                      </h4>
                      <p className="text-2xl font-bold text-green-900 mt-2">
                        {customerRetentionRate}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-amber-800">
                        عملاء جدد (هذا الشهر)
                      </h4>
                      <p className="text-2xl font-bold text-amber-900 mt-2">
                        {newCustomersThisMonth}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Reports */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>التقارير المخصصة</CardTitle>
            <Button>
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4">
                +
              </span>
              إنشاء تقرير جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="بحث في التقارير..." className="pr-10" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم التقرير</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>آخر تحديث</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    تقرير المبيعات الربع سنوي
                  </TableCell>
                  <TableCell>مبيعات</TableCell>
                  <TableCell>2024-06-15</TableCell>
                  <TableCell>2024-07-01</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    تحليل أداء المنتجات
                  </TableCell>
                  <TableCell>منتجات</TableCell>
                  <TableCell>2024-05-20</TableCell>
                  <TableCell>2024-06-25</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    تقرير رضا العملاء
                  </TableCell>
                  <TableCell>عملاء</TableCell>
                  <TableCell>2024-06-10</TableCell>
                  <TableCell>2024-07-05</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Printer className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button variant="outline">
          <Download className="ml-2 h-4 w-4" />
          تصدير PDF
        </Button>
        <Button variant="outline">
          <Download className="ml-2 h-4 w-4" />
          تصدير Excel
        </Button>
      </div>
    </div>
  );
};

export default CRMReports;
