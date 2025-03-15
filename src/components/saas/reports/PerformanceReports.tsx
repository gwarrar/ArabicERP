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
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import { systemPerformanceData } from "@/data/reportsData";

const PerformanceReports = () => {
  const [timeRange, setTimeRange] = useState("last7days");

  // حساب متوسط زمن الاستجابة
  const averageResponseTime =
    systemPerformanceData.reduce((sum, item) => sum + item.responseTime, 0) /
    systemPerformanceData.length;

  // حساب متوسط نسبة التشغيل
  const averageUptime =
    systemPerformanceData.reduce((sum, item) => sum + item.uptime, 0) /
    systemPerformanceData.length;

  // حساب إجمالي الأخطاء
  const totalErrors = systemPerformanceData.reduce(
    (sum, item) => sum + item.errors,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير أداء النظام</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">آخر 7 أيام</SelectItem>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
              <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>
      </div>

      {/* ملخص أداء النظام */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">متوسط نسبة التشغيل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {averageUptime.toFixed(2)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 0.1%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">متوسط زمن الاستجابة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(averageResponseTime)} مللي ثانية
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↓ 5%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">إجمالي الأخطاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalErrors}</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-amber-600">↑ 10%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نسبة التشغيل */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">نسبة التشغيل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={systemPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[99, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    name="نسبة التشغيل (%)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* زمن الاستجابة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">زمن الاستجابة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={systemPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    name="زمن الاستجابة (مللي ثانية)"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* الأخطاء */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الأخطاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={systemPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="errors" name="عدد الأخطاء" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* مقارنة الأداء */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">مقارنة الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={systemPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="errors"
                    name="عدد الأخطاء"
                    fill="#FF8042"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="responseTime"
                    name="زمن الاستجابة (مللي ثانية)"
                    stroke="#82ca9d"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول تفاصيل الأداء */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">تفاصيل أداء النظام</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اليوم</TableHead>
                <TableHead>نسبة التشغيل</TableHead>
                <TableHead>زمن الاستجابة</TableHead>
                <TableHead>عدد الأخطاء</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemPerformanceData.map((item) => (
                <TableRow key={item.day}>
                  <TableCell className="font-medium">{item.day}</TableCell>
                  <TableCell>{item.uptime}%</TableCell>
                  <TableCell>{item.responseTime} مللي ثانية</TableCell>
                  <TableCell>{item.errors}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${item.uptime >= 99.9 ? "bg-green-100 text-green-800" : item.uptime >= 99.5 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.uptime >= 99.9
                        ? "ممتاز"
                        : item.uptime >= 99.5
                          ? "جيد"
                          : "متوسط"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReports;
