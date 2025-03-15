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
  subscriptionsByMonthData,
  customersByPackageData,
  customerRetentionData,
  newCustomersData,
  churnedCustomersData,
} from "@/data/reportsData";

interface SubscriptionReportsProps {
  onReportClick?: (reportType: string, period?: string) => void;
}

const SubscriptionReports: React.FC<SubscriptionReportsProps> = ({
  onReportClick,
}) => {
  const [timeRange, setTimeRange] = useState("last6months");

  // ألوان للرسوم البيانية
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  // معالجة النقر على الرسم البياني
  const handleChartClick = (reportType: string, period?: string) => {
    if (onReportClick) {
      onReportClick(reportType, period);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير الاشتراكات</h2>
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

      {/* ملخص الاشتراكات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              إجمالي الاشتراكات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                subscriptionsByMonthData[subscriptionsByMonthData.length - 1]
                  .total
              }
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 17.9%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              الاشتراكات الجديدة (الشهر الحالي)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                subscriptionsByMonthData[subscriptionsByMonthData.length - 1]
                  .new
              }
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 20.0%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">معدل الاحتفاظ بالعملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                customerRetentionData[customerRetentionData.length - 1]
                  .retention
              }
              %
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-amber-600">↓ 2.1%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* تطور الاشتراكات */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("subscriptions")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">تطور الاشتراكات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subscriptionsByMonthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={(data) => {
                    if (data.activePayload) {
                      handleChartClick(
                        "subscriptions",
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
                    dataKey="new"
                    name="اشتراكات جديدة"
                    fill="#0088FE"
                    onClick={(data) =>
                      handleChartClick("subscriptions", data.month)
                    }
                  />
                  <Bar
                    dataKey="cancelled"
                    name="اشتراكات ملغاة"
                    fill="#FF8042"
                    onClick={(data) =>
                      handleChartClick("subscriptions", data.month)
                    }
                  />
                  <Bar
                    dataKey="total"
                    name="إجمالي الاشتراكات"
                    fill="#00C49F"
                    onClick={(data) =>
                      handleChartClick("subscriptions", data.month)
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع العملاء حسب الباقة */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("package")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع العملاء حسب الباقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick("package")}>
                  <Pie
                    data={customersByPackageData}
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
                    {customersByPackageData.map((entry, index) => (
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

        {/* معدل الاحتفاظ بالعملاء */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleChartClick("retention")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base">معدل الاحتفاظ بالعملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={customerRetentionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onClick={(data) => {
                    if (data.activePayload) {
                      handleChartClick(
                        "retention",
                        data.activePayload[0].payload.month,
                      );
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    name="معدل الاحتفاظ (%)"
                    stroke="#8884d8"
                    activeDot={{
                      r: 8,
                      onClick: (data) =>
                        handleChartClick("retention", data.payload.month),
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جداول البيانات */}
      <div className="grid grid-cols-1 gap-6">
        {/* العملاء الجدد */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">العملاء الجدد</CardTitle>
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
                  <TableHead>معرف العميل</TableHead>
                  <TableHead>اسم العميل</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>تاريخ الاشتراك</TableHead>
                  <TableHead>الإيراد الشهري</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newCustomersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-mono text-sm">
                      {customer.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>{formatDate(customer.date)}</TableCell>
                    <TableCell>₴ {customer.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* العملاء المنتهية اشتراكاتهم */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                العملاء المنتهية اشتراكاتهم
              </CardTitle>
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
                  <TableHead>معرف العميل</TableHead>
                  <TableHead>اسم العميل</TableHead>
                  <TableHead>الباقة</TableHead>
                  <TableHead>تاريخ الإلغاء</TableHead>
                  <TableHead>سبب الإلغاء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {churnedCustomersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-mono text-sm">
                      {customer.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>{formatDate(customer.date)}</TableCell>
                    <TableCell>{customer.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionReports;
