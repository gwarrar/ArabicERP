import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Printer,
  BarChart2,
  Calendar,
  Ship,
  DollarSign,
  Clock,
  Package,
  Truck,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ContainerReports = () => {
  const [reportType, setReportType] = useState("summary");
  const [dateRange, setDateRange] = useState("last30");
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(true);

  // بيانات تجريبية للتقارير
  const summaryData = [
    {
      month: "يناير",
      containers: 5,
      value: 450000,
      expenses: 35000,
      status: "completed",
    },
    {
      month: "فبراير",
      containers: 3,
      value: 320000,
      expenses: 28000,
      status: "completed",
    },
    {
      month: "مارس",
      containers: 4,
      value: 380000,
      expenses: 32000,
      status: "completed",
    },
    {
      month: "أبريل",
      containers: 6,
      value: 520000,
      expenses: 42000,
      status: "completed",
    },
    {
      month: "مايو",
      containers: 4,
      value: 420000,
      expenses: 36000,
      status: "completed",
    },
    {
      month: "يونيو",
      containers: 5,
      value: 480000,
      expenses: 40000,
      status: "in_progress",
    },
  ];

  const statusData = [
    { status: "قيد الانتظار", count: 2, value: 180000 },
    { status: "في الطريق", count: 3, value: 320000 },
    { status: "وصل", count: 1, value: 120000 },
    { status: "تم التخليص", count: 2, value: 220000 },
    { status: "تم الاستلام", count: 4, value: 380000 },
    { status: "مكتمل", count: 15, value: 1450000 },
  ];

  const expensesData = [
    { type: "شحن", amount: 85000, percentage: 42 },
    { type: "جمارك", amount: 45000, percentage: 22 },
    { type: "تخليص", amount: 25000, percentage: 12 },
    { type: "نقل", amount: 30000, percentage: 15 },
    { type: "تأمين", amount: 12000, percentage: 6 },
    { type: "أخرى", amount: 6000, percentage: 3 },
  ];

  const suppliersData = [
    {
      supplier: "شركة الصين للملابس",
      containers: 8,
      value: 720000,
      expenses: 58000,
      avgDeliveryDays: 35,
    },
    {
      supplier: "شركة الأحذية العالمية",
      containers: 5,
      value: 450000,
      expenses: 42000,
      avgDeliveryDays: 32,
    },
    {
      supplier: "شركة الإكسسوارات الفاخرة",
      containers: 3,
      value: 380000,
      expenses: 35000,
      avgDeliveryDays: 40,
    },
    {
      supplier: "شركة الأقمشة العالمية",
      containers: 6,
      value: 520000,
      expenses: 48000,
      avgDeliveryDays: 38,
    },
    {
      supplier: "شركة المواد الخام",
      containers: 4,
      value: 320000,
      expenses: 30000,
      avgDeliveryDays: 30,
    },
  ];

  const productsData = [
    {
      category: "ملابس",
      items: 25,
      value: 850000,
      containers: 12,
      avgCost: 34000,
    },
    {
      category: "أحذية",
      items: 18,
      value: 720000,
      containers: 8,
      avgCost: 40000,
    },
    {
      category: "إكسسوارات",
      items: 15,
      value: 450000,
      containers: 5,
      avgCost: 30000,
    },
    {
      category: "أقمشة",
      items: 20,
      value: 680000,
      containers: 7,
      avgCost: 34000,
    },
    {
      category: "مواد خام",
      items: 12,
      value: 380000,
      containers: 4,
      avgCost: 31667,
    },
  ];

  // تحديد البيانات المناسبة للتقرير المحدد
  const getReportData = () => {
    switch (reportType) {
      case "summary":
        return summaryData;
      case "status":
        return statusData;
      case "expenses":
        return expensesData;
      case "suppliers":
        return suppliersData;
      case "products":
        return productsData;
      default:
        return [];
    }
  };

  // تصفية البيانات حسب البحث
  const filteredData = getReportData().filter((item: any) => {
    if (searchTerm === "") return true;

    // البحث في جميع الحقول النصية
    return Object.entries(item).some(
      ([key, value]) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  // عرض الرسم البياني المناسب للتقرير المحدد
  const renderChart = () => {
    switch (reportType) {
      case "summary":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} ₴`, "القيمة"]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="value"
                name="قيمة الكونتينرات"
                fill="#3b82f6"
              />
              <Bar
                yAxisId="right"
                dataKey="expenses"
                name="المصاريف"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "status":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="status"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {filteredData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "#f59e0b",
                        "#3b82f6",
                        "#8b5cf6",
                        "#6366f1",
                        "#06b6d4",
                        "#10b981",
                      ][index % 6]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} ₴`, "القيمة"]}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "expenses":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
                nameKey="type"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {filteredData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "#ef4444",
                        "#f59e0b",
                        "#10b981",
                        "#3b82f6",
                        "#8b5cf6",
                        "#6366f1",
                      ][index % 6]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} ₴`, "المبلغ"]}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "suppliers":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="supplier" width={150} />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} ₴`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="value" name="قيمة الكونتينرات" fill="#3b82f6" />
              <Bar dataKey="expenses" name="المصاريف" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "products":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} ₴`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="value" name="القيمة الإجمالية" fill="#3b82f6" />
              <Bar dataKey="avgCost" name="متوسط التكلفة" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  // عرض جدول البيانات المناسب للتقرير المحدد
  const renderTable = () => {
    switch (reportType) {
      case "summary":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الشهر</TableHead>
                <TableHead className="text-center">عدد الكونتينرات</TableHead>
                <TableHead className="text-center">القيمة الإجمالية</TableHead>
                <TableHead className="text-center">إجمالي المصاريف</TableHead>
                <TableHead className="text-center">نسبة المصاريف</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.month}</TableCell>
                  <TableCell className="text-center">
                    {item.containers}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.value.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {item.expenses.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {((item.expenses / item.value) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {item.status === "completed" ? "مكتمل" : "قيد التنفيذ"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "status":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-center">عدد الكونتينرات</TableHead>
                <TableHead className="text-center">القيمة الإجمالية</TableHead>
                <TableHead className="text-center">
                  النسبة من الإجمالي
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-center">{item.count}</TableCell>
                  <TableCell className="text-center">
                    {item.value.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {(
                      (item.value /
                        filteredData.reduce(
                          (sum: number, i: any) => sum + i.value,
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
        );

      case "expenses":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نوع المصروف</TableHead>
                <TableHead className="text-center">المبلغ</TableHead>
                <TableHead className="text-center">
                  النسبة من الإجمالي
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="text-center">
                    {item.amount.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {item.percentage}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "suppliers":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المورد</TableHead>
                <TableHead className="text-center">عدد الكونتينرات</TableHead>
                <TableHead className="text-center">القيمة الإجمالية</TableHead>
                <TableHead className="text-center">إجمالي المصاريف</TableHead>
                <TableHead className="text-center">نسبة المصاريف</TableHead>
                <TableHead className="text-center">
                  متوسط أيام التسليم
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell className="text-center">
                    {item.containers}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.value.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {item.expenses.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {((item.expenses / item.value) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {item.avgDeliveryDays} يوم
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      case "products":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>فئة المنتج</TableHead>
                <TableHead className="text-center">عدد الأصناف</TableHead>
                <TableHead className="text-center">القيمة الإجمالية</TableHead>
                <TableHead className="text-center">عدد الكونتينرات</TableHead>
                <TableHead className="text-center">متوسط التكلفة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-center">{item.items}</TableCell>
                  <TableCell className="text-center">
                    {item.value.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-center">
                    {item.containers}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.avgCost.toLocaleString()} ₴
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return null;
    }
  };

  // الحصول على عنوان التقرير
  const getReportTitle = () => {
    switch (reportType) {
      case "summary":
        return "تقرير ملخص الكونتينرات";
      case "status":
        return "تقرير حالة الكونتينرات";
      case "expenses":
        return "تقرير مصاريف الكونتينرات";
      case "suppliers":
        return "تقرير الموردين";
      case "products":
        return "تقرير المنتجات";
      default:
        return "تقرير الكونتينرات";
    }
  };

  // الحصول على أيقونة التقرير
  const getReportIcon = () => {
    switch (reportType) {
      case "summary":
        return <BarChart2 className="h-5 w-5 text-blue-600" />;
      case "status":
        return <Ship className="h-5 w-5 text-blue-600" />;
      case "expenses":
        return <DollarSign className="h-5 w-5 text-blue-600" />;
      case "suppliers":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "products":
        return <Package className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير الكونتينرات</h2>
      </div>

      {/* أنواع التقارير */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={reportType === "summary" ? "default" : "outline"}
          size="sm"
          onClick={() => setReportType("summary")}
          className="flex items-center"
        >
          <BarChart2 className="h-4 w-4 ml-1" />
          ملخص الكونتينرات
        </Button>
        <Button
          variant={reportType === "status" ? "default" : "outline"}
          size="sm"
          onClick={() => setReportType("status")}
          className="flex items-center"
        >
          <Ship className="h-4 w-4 ml-1" />
          حالة الكونتينرات
        </Button>
        <Button
          variant={reportType === "expenses" ? "default" : "outline"}
          size="sm"
          onClick={() => setReportType("expenses")}
          className="flex items-center"
        >
          <DollarSign className="h-4 w-4 ml-1" />
          مصاريف الكونتينرات
        </Button>
        <Button
          variant={reportType === "suppliers" ? "default" : "outline"}
          size="sm"
          onClick={() => setReportType("suppliers")}
          className="flex items-center"
        >
          <Truck className="h-4 w-4 ml-1" />
          الموردين
        </Button>
        <Button
          variant={reportType === "products" ? "default" : "outline"}
          size="sm"
          onClick={() => setReportType("products")}
          className="flex items-center"
        >
          <Package className="h-4 w-4 ml-1" />
          المنتجات
        </Button>
      </div>

      {/* فلاتر التقرير */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="w-[200px] pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30">آخر 30 يوم</SelectItem>
              <SelectItem value="last90">آخر 90 يوم</SelectItem>
              <SelectItem value="last180">آخر 180 يوم</SelectItem>
              <SelectItem value="year">السنة الحالية</SelectItem>
              <SelectItem value="custom">فترة مخصصة</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchTerm("")}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 ml-1" />
            إعادة ضبط
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="flex items-center"
          >
            <BarChart2 className="h-4 w-4 ml-1" />
            {showChart ? "إخفاء الرسم البياني" : "عرض الرسم البياني"}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Printer className="h-4 w-4 ml-1" />
            طباعة
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>
      </div>

      {/* بطاقة التقرير */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            {getReportIcon()}
            {getReportTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* الرسم البياني */}
          {showChart && (
            <div className="border rounded-lg p-4 bg-white">
              {renderChart()}
            </div>
          )}

          {/* جدول البيانات */}
          <div className="border rounded-lg overflow-hidden">
            {renderTable()}
          </div>
        </CardContent>
      </Card>

      {/* معلومات إضافية */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <div className="flex items-start">
          <FileText className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
          <div>
            <h3 className="font-medium mb-1">معلومات التقرير</h3>
            <p className="text-sm">
              يعرض هذا التقرير بيانات الكونتينرات والشحنات خلال الفترة المحددة.
              يمكنك تغيير نوع التقرير والفترة الزمنية للحصول على تحليلات مختلفة.
              لتصدير التقرير بتنسيق Excel أو PDF، استخدم زر "تصدير".
            </p>
            <div className="mt-2 flex items-center">
              <ArrowRight className="h-4 w-4 ml-1 text-blue-600" />
              <span className="text-sm font-medium">
                للحصول على تقارير مخصصة أكثر تفصيلاً، يرجى التواصل مع قسم تقنية
                المعلومات.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerReports;
