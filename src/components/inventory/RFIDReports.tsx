import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Download,
  FileText,
  Tag,
  Smartphone,
  Package,
  Warehouse,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Printer,
  Search,
  Clock,
  Link,
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

const RFIDReports = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "inventory" | "tags" | "devices"
  >("overview");
  const [dateRange, setDateRange] = useState<
    "day" | "week" | "month" | "quarter" | "year"
  >("month");
  const [searchQuery, setSearchQuery] = useState("");

  // بيانات تجريبية للإحصائيات
  const stats = {
    totalScans: 1245,
    totalTags: 245,
    inventoryAccuracy: 96.2,
    scanningSpeed: 120, // عناصر في الدقيقة
    avgScanTime: 3.5, // دقائق
    tagsDistribution: [
      { name: "مرتبطة", value: 210 },
      { name: "غير مرتبطة", value: 30 },
      { name: "تالفة", value: 5 },
    ],
    inventoryDiscrepancies: [
      { name: "مطابق", value: 215 },
      { name: "فرق بسيط", value: 18 },
      { name: "فرق كبير", value: 12 },
    ],
  };

  // بيانات تجريبية للمسح الشهري
  const monthlyScanData = [
    { name: "يناير", scans: 980, tags: 220 },
    { name: "فبراير", scans: 1050, tags: 225 },
    { name: "مارس", scans: 1100, tags: 230 },
    { name: "أبريل", scans: 1200, tags: 235 },
    { name: "مايو", scans: 1150, tags: 240 },
    { name: "يونيو", scans: 1245, tags: 245 },
  ];

  // بيانات تجريبية لدقة الجرد
  const inventoryAccuracyData = [
    { name: "يناير", accuracy: 92.5 },
    { name: "فبراير", accuracy: 93.8 },
    { name: "مارس", accuracy: 94.2 },
    { name: "أبريل", accuracy: 95.0 },
    { name: "مايو", accuracy: 95.5 },
    { name: "يونيو", accuracy: 96.2 },
  ];

  // بيانات تجريبية لتقرير الجرد
  const inventoryReportData = [
    {
      id: "INV-001",
      date: "2024-06-15",
      location: "المستودع الرئيسي",
      scannedItems: 245,
      expectedItems: 250,
      matchingItems: 215,
      minorDiscrepancies: 18,
      majorDiscrepancies: 12,
      accuracy: 96.2,
      duration: "00:45:30",
      operator: "أحمد محمد",
    },
    {
      id: "INV-002",
      date: "2024-05-20",
      location: "مستودع المواد الخام",
      scannedItems: 120,
      expectedItems: 125,
      matchingItems: 110,
      minorDiscrepancies: 8,
      majorDiscrepancies: 2,
      accuracy: 95.8,
      duration: "00:30:15",
      operator: "محمد علي",
    },
    {
      id: "INV-003",
      date: "2024-04-10",
      location: "مستودع المنتجات النهائية",
      scannedItems: 180,
      expectedItems: 185,
      matchingItems: 165,
      minorDiscrepancies: 12,
      majorDiscrepancies: 3,
      accuracy: 94.5,
      duration: "00:40:20",
      operator: "فاطمة أحمد",
    },
  ];

  // بيانات تجريبية لتقرير التاجات
  const tagsReportData = [
    {
      id: "TAG-001",
      tagId: "RFID-TAG-001",
      productId: "PROD-001",
      productName: "قماش قطني أبيض",
      status: "linked",
      scanCount: 45,
      lastScan: "2024-06-22 10:15",
      firstSeen: "2024-01-15",
      location: "المستودع الرئيسي - A01",
    },
    {
      id: "TAG-002",
      tagId: "RFID-TAG-002",
      productId: "PROD-002",
      productName: "خيط بوليستر أسود",
      status: "linked",
      scanCount: 32,
      lastScan: "2024-06-21 09:30",
      firstSeen: "2024-01-20",
      location: "المستودع الرئيسي - B03",
    },
    {
      id: "TAG-003",
      tagId: "RFID-TAG-003",
      productId: "",
      productName: "",
      status: "unlinked",
      scanCount: 18,
      lastScan: "2024-06-20 14:45",
      firstSeen: "2024-02-05",
      location: "المستودع الرئيسي - C02",
    },
    {
      id: "TAG-004",
      tagId: "RFID-TAG-004",
      productId: "PROD-003",
      productName: "أزرار بلاستيكية",
      status: "linked",
      scanCount: 27,
      lastScan: "2024-06-22 11:20",
      firstSeen: "2024-02-10",
      location: "المستودع الرئيسي - D01",
    },
    {
      id: "TAG-005",
      tagId: "RFID-TAG-005",
      productId: "",
      productName: "",
      status: "damaged",
      scanCount: 5,
      lastScan: "2024-05-20 16:10",
      firstSeen: "2024-02-15",
      location: "المستودع الرئيسي - A04",
    },
  ];

  // بيانات تجريبية لتقرير الأجهزة
  const devicesReportData = [
    {
      id: "DEV-001",
      name: "RFID Scanner 1",
      type: "handheld",
      scanCount: 520,
      lastScan: "2024-06-22 10:15",
      uptime: 98.5,
      batteryHealth: 92,
      errors: 2,
      operator: "أحمد محمد",
    },
    {
      id: "DEV-002",
      name: "RFID Gateway 1",
      type: "fixed",
      scanCount: 725,
      lastScan: "2024-06-22 10:10",
      uptime: 99.8,
      batteryHealth: null,
      errors: 0,
      operator: "النظام",
    },
    {
      id: "DEV-003",
      name: "RFID Scanner 2",
      type: "handheld",
      scanCount: 320,
      lastScan: "2024-06-21 09:45",
      uptime: 95.2,
      batteryHealth: 78,
      errors: 5,
      operator: "محمد علي",
    },
    {
      id: "DEV-004",
      name: "RFID Gateway 2",
      type: "fixed",
      scanCount: 680,
      lastScan: "2024-06-20 15:30",
      uptime: 97.5,
      batteryHealth: null,
      errors: 3,
      operator: "النظام",
    },
  ];

  // تصفية بيانات التاجات حسب البحث
  const filteredTagsData = tagsReportData.filter(
    (tag) =>
      tag.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // الحصول على لون حالة التاج
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "linked":
        return <Badge className="bg-green-100 text-green-800">مرتبط</Badge>;
      case "unlinked":
        return <Badge className="bg-amber-100 text-amber-800">غير مرتبط</Badge>;
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      case "damaged":
        return <Badge className="bg-red-100 text-red-800">تالف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // الألوان للرسوم البيانية
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  // عرض نظرة عامة
  const renderOverview = () => {
    return (
      <div className="space-y-6">
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    إجمالي عمليات المسح
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.totalScans}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-600 flex items-center font-medium">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.5% من الشهر الماضي
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    إجمالي التاجات
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stats.totalTags}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-600 flex items-center font-medium">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      2.1% من الشهر الماضي
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Tag className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">دقة الجرد</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.inventoryAccuracy}%
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-600 flex items-center font-medium">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      0.7% من الشهر الماضي
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">سرعة المسح</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.scanningSpeed} عنصر/دقيقة
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-600 flex items-center font-medium">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      5.3% من الشهر الماضي
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* الرسوم البيانية */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>عمليات المسح والتاجات</CardTitle>
              <Select
                defaultValue={dateRange}
                onValueChange={(value) => setDateRange(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الفترة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">اليوم</SelectItem>
                  <SelectItem value="week">الأسبوع</SelectItem>
                  <SelectItem value="month">الشهر</SelectItem>
                  <SelectItem value="quarter">الربع</SelectItem>
                  <SelectItem value="year">السنة</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={monthlyScanData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="scans"
                      name="عمليات المسح"
                      fill="#3b82f6"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="tags"
                      name="التاجات"
                      fill="#8b5cf6"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>دقة الجرد</CardTitle>
              <Select
                defaultValue={dateRange}
                onValueChange={(value) => setDateRange(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الفترة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">اليوم</SelectItem>
                  <SelectItem value="week">الأسبوع</SelectItem>
                  <SelectItem value="month">الشهر</SelectItem>
                  <SelectItem value="quarter">الربع</SelectItem>
                  <SelectItem value="year">السنة</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={inventoryAccuracyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[90, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      name="دقة الجرد (%)"
                      stroke="#10b981"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* توزيع التاجات والفروقات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>توزيع التاجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={stats.tagsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {stats.tagsDistribution.map((entry, index) => (
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
                <div className="space-y-4 w-full max-w-xs">
                  {stats.tagsDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          {item.name}
                        </span>
                        <span className="text-sm">
                          {item.value} (
                          {Math.round((item.value / stats.totalTags) * 100)}%)
                        </span>
                      </div>
                      <Progress
                        value={Math.round((item.value / stats.totalTags) * 100)}
                        className="h-2"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                            width: `${Math.round((item.value / stats.totalTags) * 100)}%`,
                          }}
                        ></div>
                      </Progress>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>فروقات الجرد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={stats.inventoryDiscrepancies}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {stats.inventoryDiscrepancies.map((entry, index) => (
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
                <div className="space-y-4 w-full max-w-xs">
                  {stats.inventoryDiscrepancies.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          {item.name}
                        </span>
                        <span className="text-sm">
                          {item.value} (
                          {Math.round(
                            (item.value /
                              stats.inventoryDiscrepancies.reduce(
                                (a, b) => a + b.value,
                                0,
                              )) *
                              100,
                          )}
                          %)
                        </span>
                      </div>
                      <Progress
                        value={Math.round(
                          (item.value /
                            stats.inventoryDiscrepancies.reduce(
                              (a, b) => a + b.value,
                              0,
                            )) *
                            100,
                        )}
                        className="h-2"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                            width: `${Math.round((item.value / stats.inventoryDiscrepancies.reduce((a, b) => a + b.value, 0)) * 100)}%`,
                          }}
                        ></div>
                      </Progress>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // عرض تقرير الجرد
  const renderInventoryReport = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">تقارير الجرد</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="ml-2 h-4 w-4" />
              تحديد الفترة
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ملخص عمليات الجرد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط دقة الجرد
                      </p>
                      <h3 className="text-2xl font-bold mt-1">95.5%</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط مدة الجرد
                      </p>
                      <h3 className="text-2xl font-bold mt-1">38.5 دقيقة</h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي عمليات الجرد
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {inventoryReportData.length}
                      </h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Warehouse className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الجرد</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>العناصر الممسوحة</TableHead>
                  <TableHead>العناصر المتوقعة</TableHead>
                  <TableHead>الدقة</TableHead>
                  <TableHead>المدة</TableHead>
                  <TableHead>المنفذ</TableHead>
                  <TableHead>التفاصيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryReportData.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{report.scannedItems}</TableCell>
                    <TableCell>{report.expectedItems}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          report.accuracy >= 95
                            ? "bg-green-100 text-green-800"
                            : report.accuracy >= 90
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {report.accuracy}%
                      </Badge>
                    </TableCell>
                    <TableCell>{report.duration}</TableCell>
                    <TableCell>{report.operator}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الفروقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {inventoryReportData.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {report.id} - {report.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          مطابق
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {report.matchingItems}
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {Math.round(
                              (report.matchingItems / report.scannedItems) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          فرق بسيط
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {report.minorDiscrepancies}
                          </span>
                          <Badge className="bg-amber-100 text-amber-800">
                            {Math.round(
                              (report.minorDiscrepancies /
                                report.scannedItems) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          فرق كبير
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {report.majorDiscrepancies}
                          </span>
                          <Badge className="bg-red-100 text-red-800">
                            {Math.round(
                              (report.majorDiscrepancies /
                                report.scannedItems) *
                                100,
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // عرض تقرير التاجات
  const renderTagsReport = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">تقارير التاجات</h2>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن تاج..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="ml-2 h-4 w-4" />
              تصفية
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات التاجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي التاجات
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.totalTags}
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Tag className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاجات مرتبطة
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.tagsDistribution[0].value}
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <Link className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاجات غير مرتبطة
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.tagsDistribution[1].value}
                      </h3>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-full">
                      <Tag className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        تاجات تالفة
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.tagsDistribution[2].value}
                      </h3>
                    </div>
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>معرف التاج</TableHead>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>عدد المسح</TableHead>
                  <TableHead>آخر مسح</TableHead>
                  <TableHead>أول ظهور</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>التفاصيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTagsData.length > 0 ? (
                  filteredTagsData.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell className="font-medium">{tag.tagId}</TableCell>
                      <TableCell>
                        {tag.productId ? (
                          <div>
                            <div>{tag.productName}</div>
                            <div className="text-xs text-muted-foreground">
                              {tag.productId}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(tag.status)}</TableCell>
                      <TableCell>{tag.scanCount}</TableCell>
                      <TableCell>{tag.lastScan}</TableCell>
                      <TableCell>{tag.firstSeen}</TableCell>
                      <TableCell>{tag.location}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Tag className="h-8 w-8 mb-2" />
                        <p>لا توجد تاجات مطابقة لمعايير البحث</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  // عرض تقرير الأجهزة
  const renderDevicesReport = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">تقارير الأجهزة</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="ml-2 h-4 w-4" />
              تحديد الفترة
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>أداء الأجهزة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        متوسط وقت التشغيل
                      </p>
                      <h3 className="text-2xl font-bold mt-1">97.8%</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي عمليات المسح
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {devicesReportData.reduce(
                          (sum, device) => sum + device.scanCount,
                          0,
                        )}
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي الأخطاء
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {devicesReportData.reduce(
                          (sum, device) => sum + device.errors,
                          0,
                        )}
                      </h3>
                    </div>
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>معرف الجهاز</TableHead>
                  <TableHead>اسم الجهاز</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>عدد المسح</TableHead>
                  <TableHead>وقت التشغيل</TableHead>
                  <TableHead>صحة البطارية</TableHead>
                  <TableHead>الأخطاء</TableHead>
                  <TableHead>المشغل</TableHead>
                  <TableHead>آخر مسح</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devicesReportData.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.id}</TableCell>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>
                      {device.type === "handheld" ? "محمول باليد" : "ثابت"}
                    </TableCell>
                    <TableCell>{device.scanCount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          device.uptime >= 95
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {device.uptime}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {device.batteryHealth !== null ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              device.batteryHealth >= 80
                                ? "text-green-600"
                                : device.batteryHealth >= 60
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }
                          >
                            {device.batteryHealth}%
                          </span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${device.batteryHealth >= 80 ? "bg-green-500" : device.batteryHealth >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                              style={{ width: `${device.batteryHealth}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          device.errors === 0
                            ? "bg-green-100 text-green-800"
                            : device.errors <= 3
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {device.errors}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.operator}</TableCell>
                    <TableCell>{device.lastScan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع عمليات المسح حسب الجهاز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={devicesReportData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar
                    dataKey="scanCount"
                    name="عدد عمليات المسح"
                    fill="#3b82f6"
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">تقارير RFID</h2>
          <p className="text-muted-foreground">تحليل وإحصائيات نظام RFID</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="ml-2 h-4 w-4" />
            تحديد الفترة
          </Button>
          <Button>
            <Download className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <BarChart className="ml-2 h-4 w-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="ml-2 h-4 w-4" />
            تقارير الجرد
          </TabsTrigger>
          <TabsTrigger value="tags">
            <Tag className="ml-2 h-4 w-4" />
            تقارير التاجات
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="ml-2 h-4 w-4" />
            تقارير الأجهزة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">{renderOverview()}</TabsContent>

        <TabsContent value="inventory">{renderInventoryReport()}</TabsContent>

        <TabsContent value="tags">{renderTagsReport()}</TabsContent>

        <TabsContent value="devices">{renderDevicesReport()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default RFIDReports;
