import React from "react";
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
import { Download, Calendar } from "lucide-react";

interface PricingAnalyticsProps {
  packages: any[];
}

const PricingAnalytics: React.FC<PricingAnalyticsProps> = ({ packages }) => {
  // بيانات تجريبية للإيرادات حسب الباقة
  const revenueByPackage = packages
    .filter((pkg) => pkg.status === "نشط")
    .map((pkg) => ({
      name: pkg.name,
      monthlyRevenue: pkg.monthlyPrice * Math.floor(Math.random() * 50 + 10),
      subscribers: Math.floor(Math.random() * 50 + 10),
    }));

  // بيانات تجريبية لتوزيع المشتركين حسب الباقة
  const subscriberDistribution = packages
    .filter((pkg) => pkg.status === "نشط")
    .map((pkg) => ({
      name: pkg.name,
      value: Math.floor(Math.random() * 50 + 10),
    }));

  // بيانات تجريبية لاتجاه الإيرادات الشهرية
  const monthlyRevenueTrend = [
    { name: "يناير", revenue: 15000 },
    { name: "فبراير", revenue: 18000 },
    { name: "مارس", revenue: 22000 },
    { name: "أبريل", revenue: 25000 },
    { name: "مايو", revenue: 28000 },
    { name: "يونيو", revenue: 32000 },
  ];

  // بيانات تجريبية لمعدل التحويل حسب الباقة
  const conversionRateByPackage = packages
    .filter((pkg) => pkg.status === "نشط")
    .map((pkg) => ({
      name: pkg.name,
      conversionRate: Math.floor(Math.random() * 30 + 10),
    }));

  // ألوان للرسوم البيانية
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تحليلات التسعير</h2>
        <div className="flex gap-2">
          <Select defaultValue="last6months">
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
              إجمالي الإيرادات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₴{" "}
              {revenueByPackage
                .reduce((sum, item) => sum + item.monthlyRevenue, 0)
                .toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 12.5%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">إجمالي المشتركين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {subscriberDistribution
                .reduce((sum, item) => sum + item.value, 0)
                .toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 8.3%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">متوسط الإيراد لكل مشترك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₴{" "}
              {Math.round(
                revenueByPackage.reduce(
                  (sum, item) => sum + item.monthlyRevenue,
                  0,
                ) /
                  revenueByPackage.reduce(
                    (sum, item) => sum + item.subscribers,
                    0,
                  ),
              ).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-green-600">↑ 4.2%</span> مقارنة بالشهر
              السابق
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* الإيرادات حسب الباقة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الإيرادات حسب الباقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByPackage}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="monthlyRevenue"
                    name="الإيرادات الشهرية"
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* توزيع المشتركين حسب الباقة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              توزيع المشتركين حسب الباقة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriberDistribution}
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
                    {subscriberDistribution.map((entry, index) => (
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

        {/* اتجاه الإيرادات الشهرية */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">اتجاه الإيرادات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyRevenueTrend}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="الإيرادات"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* معدل التحويل حسب الباقة */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">معدل التحويل حسب الباقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conversionRateByPackage}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="conversionRate"
                    name="معدل التحويل (%)"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* توصيات التسعير */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">توصيات التسعير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-blue-50">
              <h3 className="font-medium text-blue-800 mb-1">
                زيادة الإيرادات من الباقة الأساسية
              </h3>
              <p className="text-sm text-blue-700">
                بناءً على تحليل البيانات، يمكن زيادة سعر الباقة الأساسية بنسبة
                5-10% مع إضافة ميزة جديدة دون التأثير على معدل التحويل.
              </p>
            </div>

            <div className="p-4 border rounded-md bg-green-50">
              <h3 className="font-medium text-green-800 mb-1">
                تحسين معدل الاحتفاظ بالعملاء
              </h3>
              <p className="text-sm text-green-700">
                تقديم خصم إضافي 5% على الاشتراكات السنوية للباقة المتقدمة لتشجيع
                المزيد من العملاء على الاشتراك لفترة أطول.
              </p>
            </div>

            <div className="p-4 border rounded-md bg-amber-50">
              <h3 className="font-medium text-amber-800 mb-1">
                تعزيز الترقية إلى الباقات الأعلى
              </h3>
              <p className="text-sm text-amber-700">
                إضافة ميزات حصرية جديدة للباقة المتكاملة لتشجيع المزيد من
                العملاء على الترقية من الباقة المتقدمة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingAnalytics;
