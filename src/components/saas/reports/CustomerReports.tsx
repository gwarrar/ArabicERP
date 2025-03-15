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
  customersByPackageData,
  customerRetentionData,
  customersByRegionData,
  newCustomersData,
  churnedCustomersData,
} from "@/data/reportsData";

const CustomerReports = () => {
  const [timeRange, setTimeRange] = useState("last6months");

  // ألوان للرسوم البيانية
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  // حساب إجمالي عدد العملاء
  const totalCustomers = customersByPackageData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // حساب عدد العملاء الجدد
  const newCustomersCount = newCustomersData.length;

  // حساب معدل فقدان العملاء
  const churnRate = Math.round(
    (churnedCustomersData.length / totalCustomers) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير العملاء</h2>
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

      {/* ملخص العملاء */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">إجمالي العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCustomers}</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 12.5%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">العملاء الجدد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newCustomersCount}</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 8.3%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">معدل فقدان العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{churnRate}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-amber-600">↑ 1.2%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* توزيع العملاء حسب الباقة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع العملاء حسب الباقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                  >
                    {customersByPackageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* معدل الاحتفاظ بالعملاء */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">معدل الاحتفاظ بالعملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={customerRetentionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع العملاء حسب المنطقة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع العملاء حسب المنطقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customersByRegionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="عدد العملاء" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع العملاء حسب المنطقة (دائري) */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع العملاء حسب المنطقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customersByRegionData}
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
                    {customersByRegionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
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

export default CustomerReports;
