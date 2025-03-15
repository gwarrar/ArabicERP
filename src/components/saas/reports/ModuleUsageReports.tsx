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
  AreaChart,
  Area,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Download } from "lucide-react";
import { moduleUsageData, dailyUsageData } from "@/data/reportsData";

const ModuleUsageReports = () => {
  const [timeRange, setTimeRange] = useState("last30days");

  // حساب متوسط استخدام الوحدات
  const averageModuleUsage =
    moduleUsageData.reduce((sum, item) => sum + item.usage, 0) /
    moduleUsageData.length;

  // حساب أكثر الوحدات استخداماً
  const mostUsedModule = [...moduleUsageData].sort(
    (a, b) => b.usage - a.usage,
  )[0];

  // حساب أقل الوحدات استخداماً
  const leastUsedModule = [...moduleUsageData].sort(
    (a, b) => a.usage - b.usage,
  )[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير استخدام الوحدات</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">آخر 7 أيام</SelectItem>
              <SelectItem value="last30days">آخر 30 يوم</SelectItem>
              <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
              <SelectItem value="last6months">آخر 6 أشهر</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>
      </div>

      {/* ملخص استخدام الوحدات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">متوسط استخدام الوحدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(averageModuleUsage)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 5.2%</span> مقارنة بالفترة
              السابقة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">أكثر الوحدات استخداماً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{mostUsedModule.name}</div>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{mostUsedModule.usage}%</span>
              </div>
              <Progress value={mostUsedModule.usage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">أقل الوحدات استخداماً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{leastUsedModule.name}</div>
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{leastUsedModule.usage}%</span>
              </div>
              <Progress value={leastUsedModule.usage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* استخدام الوحدات */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">استخدام الوحدات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={moduleUsageData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="usage"
                    name="نسبة الاستخدام (%)"
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* الاستخدام اليومي */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الاستخدام اليومي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyUsageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="عدد المستخدمين النشطين"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تفاصيل استخدام الوحدات */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">تفاصيل استخدام الوحدات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moduleUsageData.map((module) => (
              <div key={module.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{module.name}</span>
                  <span>{module.usage}%</span>
                </div>
                <Progress value={module.usage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleUsageReports;
