import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  Filter,
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

interface KPIDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  kpiType: string;
  title?: string;
  value?: string;
  change?: number;
}

const KPIDetailsPopup = ({
  open,
  onClose,
  kpiType,
  title = "تفاصيل المؤشر",
  value = "٠",
  change = 0,
}: KPIDetailsPopupProps) => {
  // بيانات تجريبية للرسومات البيانية
  const monthlyData = [
    { name: "يناير", value: 45000 },
    { name: "فبراير", value: 52000 },
    { name: "مارس", value: 48000 },
    { name: "أبريل", value: 61000 },
    { name: "مايو", value: 55000 },
    { name: "يونيو", value: 67000 },
    { name: "يوليو", value: 72000 },
    { name: "أغسطس", value: 80000 },
    { name: "سبتمبر", value: 67000 },
    { name: "أكتوبر", value: 54000 },
    { name: "نوفمبر", value: 48000 },
    { name: "ديسمبر", value: 64000 },
  ];

  const weeklyData = [
    { name: "السبت", value: 12000 },
    { name: "الأحد", value: 19000 },
    { name: "الإثنين", value: 15000 },
    { name: "الثلاثاء", value: 18000 },
    { name: "الأربعاء", value: 14000 },
    { name: "الخميس", value: 11000 },
    { name: "الجمعة", value: 8000 },
  ];

  const dailyData = [
    { name: "صباحاً", value: 25000 },
    { name: "ظهراً", value: 35000 },
    { name: "مساءً", value: 20000 },
  ];

  // بيانات تجريبية للجدول
  const tableData = [
    { id: 1, name: "منتج 1", value: 12500, change: 5.2 },
    { id: 2, name: "منتج 2", value: 9800, change: -2.1 },
    { id: 3, name: "منتج 3", value: 7600, change: 3.8 },
    { id: 4, name: "منتج 4", value: 6200, change: 1.5 },
    { id: 5, name: "منتج 5", value: 5100, change: -0.8 },
  ];

  // الحصول على عنوان المؤشر
  const getKPITitle = () => {
    switch (kpiType) {
      case "sales":
        return "إجمالي المبيعات";
      case "profits":
        return "الأرباح";
      case "customers":
        return "العملاء الجدد";
      case "invoices":
        return "فواتير مستحقة";
      case "daily_sales":
        return "المبيعات اليومية";
      case "daily_purchases":
        return "المشتريات اليومية";
      case "daily_profits":
        return "الأرباح اليومية";
      case "daily_expenses":
        return "المصروفات اليومية";
      default:
        return title;
    }
  };

  // الحصول على أيقونة المؤشر
  const getKPIIcon = () => {
    switch (kpiType) {
      case "sales":
        return <DollarSign className="h-5 w-5 text-blue-600" />;
      case "profits":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "customers":
        return <Users className="h-5 w-5 text-purple-600" />;
      case "invoices":
        return <FileText className="h-5 w-5 text-amber-600" />;
      case "daily_sales":
        return <DollarSign className="h-5 w-5 text-blue-600" />;
      case "daily_purchases":
        return <ShoppingCart className="h-5 w-5 text-amber-600" />;
      case "daily_profits":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "daily_expenses":
        return <CreditCard className="h-5 w-5 text-red-600" />;
      default:
        return <BarChart className="h-5 w-5 text-gray-600" />;
    }
  };

  // الحصول على وصف المؤشر
  const getKPIDescription = () => {
    switch (kpiType) {
      case "sales":
        return "تفاصيل إجمالي المبيعات خلال الفترة الحالية مقارنة بالفترات السابقة";
      case "profits":
        return "تحليل الأرباح والهوامش خلال الفترة الحالية";
      case "customers":
        return "تفاصيل العملاء الجدد وتوزيعهم حسب المصدر";
      case "invoices":
        return "تفاصيل الفواتير المستحقة وحالة السداد";
      case "daily_sales":
        return "تفاصيل المبيعات اليومية وتوزيعها حسب الساعة والمنتجات";
      case "daily_purchases":
        return "تفاصيل المشتريات اليومية وتوزيعها حسب الموردين والأصناف";
      case "daily_profits":
        return "تحليل الأرباح اليومية ومقارنتها بالأيام السابقة";
      case "daily_expenses":
        return "تفاصيل المصروفات اليومية وتوزيعها حسب الأقسام";
      default:
        return "تفاصيل المؤشر وتحليل البيانات";
    }
  };

  // بيانات تجريبية للمؤشرات اليومية
  const hourlyData = [
    { name: "08:00", value: 1200 },
    { name: "09:00", value: 1800 },
    { name: "10:00", value: 2100 },
    { name: "11:00", value: 1500 },
    { name: "12:00", value: 1300 },
    { name: "13:00", value: 1100 },
    { name: "14:00", value: 1400 },
    { name: "15:00", value: 1600 },
    { name: "16:00", value: 1200 },
    { name: "17:00", value: 900 },
    { name: "18:00", value: 700 },
    { name: "19:00", value: 500 },
  ];

  // الحصول على بيانات المؤشر
  const getKPIData = () => {
    switch (kpiType) {
      case "sales":
        return monthlyData;
      case "profits":
        return monthlyData.map((item) => ({
          ...item,
          value: item.value * 0.3,
        }));
      case "customers":
        return monthlyData.map((item) => ({
          ...item,
          value: Math.round(item.value / 1000),
        }));
      case "invoices":
        return monthlyData.map((item) => ({
          ...item,
          value: item.value * 0.15,
        }));
      case "daily_sales":
        return hourlyData;
      case "daily_purchases":
        return hourlyData.map((item) => ({
          ...item,
          value: Math.round(item.value * 0.65),
        }));
      case "daily_profits":
        return hourlyData.map((item) => ({
          ...item,
          value: Math.round(item.value * 0.35),
        }));
      case "daily_expenses":
        return hourlyData.map((item) => ({
          ...item,
          value: Math.round(item.value * 0.15),
        }));
      default:
        return monthlyData;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getKPIIcon()}
            <DialogTitle>{getKPITitle()}</DialogTitle>
          </div>
          <DialogDescription>{getKPIDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* ملخص المؤشر */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      القيمة الحالية
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    <div className="flex items-center mt-2">
                      {change >= 0 ? (
                        <span className="text-xs text-green-600 flex items-center font-medium">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          {Math.abs(change)}%
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 flex items-center font-medium">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          {Math.abs(change)}%
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground mr-2">
                        منذ الشهر الماضي
                      </span>
                    </div>
                  </div>
                  {getKPIIcon()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط شهري</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {kpiType === "sales"
                        ? "٥٩,٥٠٠ ₴"
                        : kpiType === "profits"
                          ? "١٧,٨٥٠ ₴"
                          : kpiType === "customers"
                            ? "٥٩"
                            : kpiType === "invoices"
                              ? "٨,٩٢٥ ₴"
                              : "٠"}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-blue-600 flex items-center font-medium">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        تحليل
                      </span>
                    </div>
                  </div>
                  <BarChart className="h-5 w-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      النمو السنوي
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {kpiType === "sales"
                        ? "١٥.٨%"
                        : kpiType === "profits"
                          ? "١٢.٣%"
                          : kpiType === "customers"
                            ? "٨.٧%"
                            : kpiType === "invoices"
                              ? "-٥.٢%"
                              : "٠%"}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-purple-600 flex items-center font-medium">
                        <Calendar className="h-3 w-3 mr-1" />
                        مقارنة سنوية
                      </span>
                    </div>
                  </div>
                  <LineChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* تبويبات التحليل */}
          <Tabs defaultValue="monthly">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="monthly">شهري</TabsTrigger>
                <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
                <TabsTrigger value="daily">يومي</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="ml-2 h-4 w-4" />
                  تصفية
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير
                </Button>
              </div>
            </div>

            <TabsContent value="monthly">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={getKPIData()}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={weeklyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8b5cf6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={dailyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* جدول التفاصيل */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {kpiType === "sales"
                  ? "أفضل المنتجات مبيعاً"
                  : kpiType === "profits"
                    ? "أعلى المنتجات ربحية"
                    : kpiType === "customers"
                      ? "مصادر العملاء الجدد"
                      : kpiType === "invoices"
                        ? "الفواتير المستحقة"
                        : "التفاصيل"}
              </h3>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {kpiType === "sales" ||
                        kpiType === "profits" ||
                        kpiType === "invoices"
                          ? "المنتج"
                          : "المصدر"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {kpiType === "customers" ? "عدد العملاء" : "القيمة"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        التغيير
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.id} className="bg-white border-b">
                        <td className="px-6 py-4">{item.id}</td>
                        <td className="px-6 py-4 font-medium">{item.name}</td>
                        <td className="px-6 py-4">
                          {kpiType === "customers"
                            ? item.value
                            : `${item.value.toLocaleString()} ₴`}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {item.change >= 0 ? (
                              <span className="text-green-600 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                {item.change}%
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center">
                                <TrendingDown className="h-4 w-4 mr-1" />
                                {Math.abs(item.change)}%
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KPIDetailsPopup;
