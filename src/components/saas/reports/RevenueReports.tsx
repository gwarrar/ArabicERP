import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Filter } from "lucide-react";
import {
  revenueByMonthData,
  revenueByPackageData,
  invoicesReportData,
} from "@/data/reportsData";

interface RevenueReportsProps {
  onReportClick?: (reportType: string, period?: string) => void;
}

const RevenueReports: React.FC<RevenueReportsProps> = ({ onReportClick }) => {
  const [timeRange, setTimeRange] = useState("last6months");

  // ألوان للرسوم البيانية
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // حساب إجمالي الإيرادات الشهرية المتكررة
  const totalMRR = revenueByMonthData[revenueByMonthData.length - 1].mrr;

  // حساب إجمالي الإيرادات السنوية المتكررة
  const totalARR = revenueByMonthData[revenueByMonthData.length - 1].arr;

  // حساب متوسط الإيراد لكل مشترك
  const averageRevenuePerCustomer = Math.round(totalMRR / 129); // 129 هو عدد المشتركين من البيانات التجريبية

  // معالجة النقر على الرسم البياني
  const handleChartClick = (reportType: string, period?: string) => {
    if (onReportClick) {
      onReportClick(reportType, period);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير الإيرادات</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
              <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="last6months">آخر 6 أشهر</SelectItem>
              <SelectItem value="lastyear">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>
      </div>

      {/* ملخص الإيرادات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              الإيرادات الشهرية المتكررة (MRR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₴ {totalMRR.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 21.7%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              الإيرادات السنوية المتكررة (ARR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₴ {totalARR.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 21.7%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              متوسط الإيراد لكل مستخدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₴ {averageRevenuePerCustomer.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 3.2%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* تطور الإيرادات الشهرية */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("revenue")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">تطور الإيرادات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueByMonthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={(data) => {
                    if (data.activePayload) {
                      handleChartClick(
                        "revenue",
                        data.activePayload[0].payload.month,
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    name="الإيرادات الشهرية المتكررة"
                    fill="#8884d8"
                    stroke="#8884d8"
                    activeDot={{
                      r: 8,
                      onClick: (data) =>
                        handleChartClick("revenue", data.payload.month),
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع الإيرادات حسب الباقة */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("package")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع الإيرادات حسب الباقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick("package")}>
                  <Pie
                    data={revenueByPackageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data) => handleChartClick("package", data.name)}
                  >
                    {revenueByPackageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    onClick={(data) => handleChartClick("package", data.value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* تقرير الفواتير */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("invoices")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">تقرير الفواتير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={invoicesReportData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={(data) => {
                    if (data.activePayload) {
                      handleChartClick(
                        "invoices",
                        data.activePayload[0].payload.month,
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="issued"
                    name="فواتير صادرة"
                    fill="#0088FE"
                    onClick={(data) => handleChartClick("invoices", data.month)}
                  />
                  <Bar
                    dataKey="paid"
                    name="فواتير مدفوعة"
                    fill="#00C49F"
                    onClick={(data) => handleChartClick("invoices", data.month)}
                  />
                  <Bar
                    dataKey="overdue"
                    name="فواتير متأخرة"
                    fill="#FF8042"
                    onClick={(data) => handleChartClick("invoices", data.month)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* إجمالي قيمة الفواتير */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("invoices")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">إجمالي قيمة الفواتير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={invoicesReportData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={(data) => {
                    if (data.activePayload) {
                      handleChartClick(
                        "invoices",
                        data.activePayload[0].payload.month,
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="إجمالي قيمة الفواتير"
                    stroke="#8884d8"
                    activeDot={{
                      r: 8,
                      onClick: (data) =>
                        handleChartClick("invoices", data.payload.month),
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول تفاصيل الفواتير */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">تفاصيل الفواتير</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-1" />
              تصفية
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الشهر</TableHead>
                <TableHead>فواتير صادرة</TableHead>
                <TableHead>فواتير مدفوعة</TableHead>
                <TableHead>فواتير متأخرة</TableHead>
                <TableHead>نسبة التحصيل</TableHead>
                <TableHead>إجمالي القيمة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesReportData.map((item) => (
                <TableRow key={item.month}>
                  <TableCell className="font-medium">{item.month}</TableCell>
                  <TableCell>{item.issued}</TableCell>
                  <TableCell>{item.paid}</TableCell>
                  <TableCell>{item.overdue}</TableCell>
                  <TableCell>
                    {Math.round((item.paid / item.issued) * 100)}%
                  </TableCell>
                  <TableCell>₴ {item.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueReports;
