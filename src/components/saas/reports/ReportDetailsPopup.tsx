import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Printer, BarChart2, X } from "lucide-react";
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
  AreaChart,
  Area,
} from "recharts";

interface ReportDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  reportType: string;
  period?: string;
}

const ReportDetailsPopup: React.FC<ReportDetailsPopupProps> = ({
  open,
  onClose,
  reportType,
  period,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageFilter, setPackageFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState(period || "all");
  const [showChart, setShowChart] = useState(true);

  // تحديد عنوان النافذة بناءً على نوع التقرير
  const getTitle = () => {
    switch (reportType) {
      case "subscriptions":
        return "تفاصيل الاشتراكات";
      case "revenue":
        return "تفاصيل الإيرادات";
      case "retention":
        return "تفاصيل معدل الاحتفاظ بالعملاء";
      case "churn":
        return "تفاصيل معدل التسرب";
      case "arpu":
        return "تفاصيل متوسط الإيراد لكل مستخدم";
      case "package":
        return "تفاصيل توزيع الباقات";
      default:
        return "تفاصيل التقرير";
    }
  };

  // بيانات تجريبية للاشتراكات
  const getSubscriptionsData = () => [
    {
      month: "يناير",
      total: 45,
      new: 15,
      canceled: 5,
      growth: "+28.6%",
    },
    {
      month: "فبراير",
      total: 56,
      new: 18,
      canceled: 7,
      growth: "+24.4%",
    },
    {
      month: "مارس",
      total: 69,
      new: 22,
      canceled: 9,
      growth: "+23.2%",
    },
    {
      month: "أبريل",
      total: 85,
      new: 25,
      canceled: 9,
      growth: "+23.2%",
    },
    {
      month: "مايو",
      total: 106,
      new: 30,
      canceled: 9,
      growth: "+24.7%",
    },
    {
      month: "يونيو",
      total: 129,
      new: 35,
      canceled: 12,
      growth: "+21.7%",
    },
  ];

  // بيانات تجريبية للإيرادات
  const getRevenueData = () => [
    {
      month: "يناير",
      revenue: 35000,
      newRevenue: 5000,
      churnedRevenue: 2000,
      growth: "+9.4%",
    },
    {
      month: "فبراير",
      revenue: 38000,
      newRevenue: 6000,
      churnedRevenue: 3000,
      growth: "+8.6%",
    },
    {
      month: "مارس",
      revenue: 41000,
      newRevenue: 5500,
      churnedRevenue: 2500,
      growth: "+7.9%",
    },
    {
      month: "أبريل",
      revenue: 44000,
      newRevenue: 6500,
      churnedRevenue: 3500,
      growth: "+7.3%",
    },
    {
      month: "مايو",
      revenue: 47000,
      newRevenue: 7000,
      churnedRevenue: 4000,
      growth: "+6.8%",
    },
    {
      month: "يونيو",
      revenue: 50000,
      newRevenue: 7500,
      churnedRevenue: 4500,
      growth: "+6.4%",
    },
  ];

  // بيانات تجريبية لمعدل الاحتفاظ بالعملاء
  const getRetentionData = () => [
    { month: "يناير", retention: 92, churn: 8 },
    { month: "فبراير", retention: 93, churn: 7 },
    { month: "مارس", retention: 91, churn: 9 },
    { month: "أبريل", retention: 94, churn: 6 },
    { month: "مايو", retention: 95, churn: 5 },
    { month: "يونيو", retention: 93, churn: 7 },
  ];

  // بيانات تجريبية لمعدل التسرب
  const getChurnData = () => [
    {
      month: "يناير",
      churnRate: 3.5,
      totalCustomers: 70,
      churnedCustomers: 3,
      reason: "تكلفة مرتفعة",
    },
    {
      month: "فبراير",
      churnRate: 3.0,
      totalCustomers: 75,
      churnedCustomers: 2,
      reason: "ميزات غير كافية",
    },
    {
      month: "مارس",
      churnRate: 2.8,
      totalCustomers: 80,
      churnedCustomers: 2,
      reason: "تكلفة مرتفعة",
    },
    {
      month: "أبريل",
      churnRate: 2.6,
      totalCustomers: 85,
      churnedCustomers: 2,
      reason: "انتقال لمنافس",
    },
    {
      month: "مايو",
      churnRate: 2.5,
      totalCustomers: 90,
      churnedCustomers: 2,
      reason: "إغلاق الشركة",
    },
    {
      month: "يونيو",
      churnRate: 2.0,
      totalCustomers: 95,
      churnedCustomers: 2,
      reason: "تكلفة مرتفعة",
    },
  ];

  // بيانات تجريبية لمتوسط الإيراد لكل مستخدم
  const getARPUData = () => [
    {
      month: "يناير",
      arpu: 350,
      arpuBasic: 300,
      arpuAdvanced: 400,
      arpuPremium: 500,
    },
    {
      month: "فبراير",
      arpu: 360,
      arpuBasic: 310,
      arpuAdvanced: 410,
      arpuPremium: 510,
    },
    {
      month: "مارس",
      arpu: 370,
      arpuBasic: 320,
      arpuAdvanced: 420,
      arpuPremium: 520,
    },
    {
      month: "أبريل",
      arpu: 380,
      arpuBasic: 330,
      arpuAdvanced: 430,
      arpuPremium: 530,
    },
    {
      month: "مايو",
      arpu: 390,
      arpuBasic: 340,
      arpuAdvanced: 440,
      arpuPremium: 540,
    },
    {
      month: "يونيو",
      arpu: 400,
      arpuBasic: 350,
      arpuAdvanced: 450,
      arpuPremium: 550,
    },
  ];

  // بيانات تجريبية لتوزيع الباقات
  const getPackageDistributionData = () => [
    { name: "الباقة الأساسية", value: 45, color: "#0088FE" },
    { name: "الباقة المتقدمة", value: 35, color: "#00C49F" },
    { name: "الباقة المتكاملة", value: 20, color: "#FFBB28" },
  ];

  // تحديد البيانات المناسبة بناءً على نوع التقرير
  const getData = () => {
    switch (reportType) {
      case "subscriptions":
        return getSubscriptionsData();
      case "revenue":
        return getRevenueData();
      case "retention":
        return getRetentionData();
      case "churn":
        return getChurnData();
      case "arpu":
        return getARPUData();
      case "package":
        return getPackageDistributionData();
      default:
        return [];
    }
  };

  // تصفية البيانات بناءً على معايير البحث
  const filteredData = getData().filter((item: any) => {
    // تنفيذ منطق التصفية حسب نوع التقرير
    if (periodFilter !== "all" && item.month !== periodFilter) {
      return false;
    }

    if (searchTerm === "") {
      return true;
    }

    // البحث في جميع الحقول النصية
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  // تحديد أعمدة الجدول بناءً على نوع التقرير
  const renderTableHeaders = () => {
    switch (reportType) {
      case "subscriptions":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>إجمالي الاشتراكات</TableHead>
            <TableHead>اشتراكات جديدة</TableHead>
            <TableHead>اشتراكات ملغاة</TableHead>
            <TableHead>معدل النمو</TableHead>
          </TableRow>
        );
      case "revenue":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الإيرادات</TableHead>
            <TableHead>إيرادات جديدة</TableHead>
            <TableHead>إيرادات مفقودة</TableHead>
            <TableHead>معدل النمو</TableHead>
          </TableRow>
        );
      case "retention":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>معدل الاحتفاظ</TableHead>
            <TableHead>معدل التسرب</TableHead>
          </TableRow>
        );
      case "churn":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>معدل التسرب</TableHead>
            <TableHead>إجمالي العملاء</TableHead>
            <TableHead>العملاء المتسربين</TableHead>
            <TableHead>سبب التسرب الرئيسي</TableHead>
          </TableRow>
        );
      case "arpu":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>متوسط الإيراد لكل مستخدم</TableHead>
            <TableHead>الباقة الأساسية</TableHead>
            <TableHead>الباقة المتقدمة</TableHead>
            <TableHead>الباقة المتكاملة</TableHead>
          </TableRow>
        );
      case "package":
        return (
          <TableRow>
            <TableHead>الباقة</TableHead>
            <TableHead>عدد المشتركين</TableHead>
            <TableHead>النسبة المئوية</TableHead>
          </TableRow>
        );
      default:
        return <TableRow></TableRow>;
    }
  };

  // عرض صفوف الجدول بناءً على نوع التقرير
  const renderTableRows = () => {
    if (filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="h-24 text-center text-muted-foreground"
          >
            لا توجد بيانات متاحة
          </TableCell>
        </TableRow>
      );
    }

    switch (reportType) {
      case "subscriptions":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.total}</TableCell>
            <TableCell>{item.new}</TableCell>
            <TableCell>{item.canceled}</TableCell>
            <TableCell>
              <span className="text-green-600">{item.growth}</span>
            </TableCell>
          </TableRow>
        ));
      case "revenue":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.revenue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.newRevenue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.churnedRevenue.toLocaleString()}</TableCell>
            <TableCell>
              <span className="text-green-600">{item.growth}</span>
            </TableCell>
          </TableRow>
        ));
      case "retention":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.retention}%</TableCell>
            <TableCell>{item.churn}%</TableCell>
          </TableRow>
        ));
      case "churn":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.churnRate}%</TableCell>
            <TableCell>{item.totalCustomers}</TableCell>
            <TableCell>{item.churnedCustomers}</TableCell>
            <TableCell>{item.reason}</TableCell>
          </TableRow>
        ));
      case "arpu":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.arpu}</TableCell>
            <TableCell>₴ {item.arpuBasic}</TableCell>
            <TableCell>₴ {item.arpuAdvanced}</TableCell>
            <TableCell>₴ {item.arpuPremium}</TableCell>
          </TableRow>
        ));
      case "package":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell>
              {Math.round(
                (item.value /
                  filteredData.reduce(
                    (sum: number, i: any) => sum + i.value,
                    0,
                  )) *
                  100,
              )}
              %
            </TableCell>
          </TableRow>
        ));
      default:
        return null;
    }
  };

  // عرض الرسم البياني المناسب بناءً على نوع التقرير
  const renderChart = () => {
    switch (reportType) {
      case "subscriptions":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" name="اشتراكات جديدة" fill="#82ca9d" />
              <Bar dataKey="canceled" name="اشتراكات ملغاة" fill="#ff8042" />
              <Bar dataKey="total" name="إجمالي الاشتراكات" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "revenue":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="الإيرادات"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="newRevenue"
                name="إيرادات جديدة"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="churnedRevenue"
                name="إيرادات مفقودة"
                stroke="#ff8042"
                fill="#ff8042"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "retention":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, "النسبة"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="retention"
                name="معدل الاحتفاظ"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="churn"
                name="معدل التسرب"
                stroke="#ff8042"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "churn":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip formatter={(value) => [`${value}%`, "معدل التسرب"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="churnRate"
                name="معدل التسرب"
                stroke="#ff8042"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "arpu":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₴ ${value}`, "القيمة"]} />
              <Legend />
              <Bar
                dataKey="arpu"
                name="متوسط الإيراد لكل مستخدم"
                fill="#8884d8"
              />
              <Bar dataKey="arpuBasic" name="الباقة الأساسية" fill="#0088FE" />
              <Bar
                dataKey="arpuAdvanced"
                name="الباقة المتقدمة"
                fill="#00C49F"
              />
              <Bar
                dataKey="arpuPremium"
                name="الباقة المتكاملة"
                fill="#FFBB28"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "package":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {getTitle()}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
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

            {reportType !== "package" && (
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="يناير">يناير</SelectItem>
                  <SelectItem value="فبراير">فبراير</SelectItem>
                  <SelectItem value="مارس">مارس</SelectItem>
                  <SelectItem value="أبريل">أبريل</SelectItem>
                  <SelectItem value="مايو">مايو</SelectItem>
                  <SelectItem value="يونيو">يونيو</SelectItem>
                </SelectContent>
              </Select>
            )}

            {(reportType === "arpu" || reportType === "subscriptions") && (
              <Select value={packageFilter} onValueChange={setPackageFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الباقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الباقات</SelectItem>
                  <SelectItem value="basic">الباقة الأساسية</SelectItem>
                  <SelectItem value="advanced">الباقة المتقدمة</SelectItem>
                  <SelectItem value="premium">الباقة المتكاملة</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setPackageFilter("all");
                setPeriodFilter("all");
              }}
              className="h-10"
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
              className="h-10"
            >
              <BarChart2 className="h-4 w-4 ml-1" />
              {showChart ? "إخفاء الرسم البياني" : "عرض الرسم البياني"}
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Chart (if enabled) */}
        {showChart && (
          <div className="h-64 mb-4 border rounded-md">{renderChart()}</div>
        )}

        {/* Data Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsPopup;
