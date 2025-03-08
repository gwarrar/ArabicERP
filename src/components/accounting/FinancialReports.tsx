import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, FileText, Printer, Download, RefreshCw } from "lucide-react";
import { ukrainianBranches } from "@/data/branches";

const FinancialReports = () => {
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">التقارير المالية</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <Tabs defaultValue="balance-sheet">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="balance-sheet">الميزانية العمومية</TabsTrigger>
          <TabsTrigger value="income-statement">قائمة الدخل</TabsTrigger>
          <TabsTrigger value="cash-flow">التدفقات النقدية</TabsTrigger>
          <TabsTrigger value="profit-loss">الأرباح والخسائر</TabsTrigger>
        </TabsList>

        {/* Balance Sheet */}
        <TabsContent value="balance-sheet">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الفرع</label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    {ukrainianBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-[200px] pr-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button>
              <RefreshCw className="ml-2 h-4 w-4" />
              تحديث
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assets Section */}
            <div className="border rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">الأصول</h4>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                      الحساب
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                      الرصيد
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">النقدية</td>
                    <td className="py-2 px-2 text-sm text-left">125,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      الذمم المدينة
                    </td>
                    <td className="py-2 px-2 text-sm text-left">85,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">المخزون</td>
                    <td className="py-2 px-2 text-sm text-left">210,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      الأصول الثابتة
                    </td>
                    <td className="py-2 px-2 text-sm text-left">350,000 ₴</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="py-2 px-2 text-sm">إجمالي الأصول</td>
                    <td className="py-2 px-2 text-sm text-left">770,000 ₴</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Liabilities & Equity Section */}
            <div className="border rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4">
                الخصوم وحقوق الملكية
              </h4>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                      الحساب
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                      الرصيد
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      الذمم الدائنة
                    </td>
                    <td className="py-2 px-2 text-sm text-left">95,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">القروض</td>
                    <td className="py-2 px-2 text-sm text-left">150,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">رأس المال</td>
                    <td className="py-2 px-2 text-sm text-left">400,000 ₴</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      الأرباح المحتجزة
                    </td>
                    <td className="py-2 px-2 text-sm text-left">125,000 ₴</td>
                  </tr>
                  <tr className="font-medium">
                    <td className="py-2 px-2 text-sm">
                      إجمالي الخصوم وحقوق الملكية
                    </td>
                    <td className="py-2 px-2 text-sm text-left">770,000 ₴</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Income Statement */}
        <TabsContent value="income-statement">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الفرع</label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    {ukrainianBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الفترة</label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">شهري</SelectItem>
                    <SelectItem value="quarter">ربع سنوي</SelectItem>
                    <SelectItem value="year">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-[200px] pr-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button>
              <RefreshCw className="ml-2 h-4 w-4" />
              تحديث
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    البند
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    المبلغ
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    النسبة
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">المبيعات</td>
                  <td className="py-2 px-2 text-sm text-left">1,222,500 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">100%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">
                    تكلفة المبيعات
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-733,500 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">-60%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">إجمالي الربح</td>
                  <td className="py-2 px-2 text-sm text-left">489,000 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">40%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">
                    مصاريف البيع والتسويق
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-122,250 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">-10%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">
                    المصاريف الإدارية والعمومية
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-183,375 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">-15%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">الربح التشغيلي</td>
                  <td className="py-2 px-2 text-sm text-left">183,375 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">15%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">
                    إيرادات أخرى
                  </td>
                  <td className="py-2 px-2 text-sm text-left">12,225 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">1%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">مصاريف أخرى</td>
                  <td className="py-2 px-2 text-sm text-left">-24,450 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">-2%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">صافي الربح قبل الضريبة</td>
                  <td className="py-2 px-2 text-sm text-left">171,150 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">14%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">ضريبة الدخل</td>
                  <td className="py-2 px-2 text-sm text-left">-34,230 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">-2.8%</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-2 px-2 text-sm">صافي الربح</td>
                  <td className="py-2 px-2 text-sm text-left">136,920 ₴</td>
                  <td className="py-2 px-2 text-sm text-left">11.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Cash Flow */}
        <TabsContent value="cash-flow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الفرع</label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    {ukrainianBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الفترة</label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">شهري</SelectItem>
                    <SelectItem value="quarter">ربع سنوي</SelectItem>
                    <SelectItem value="year">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-[200px] pr-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button>
              <RefreshCw className="ml-2 h-4 w-4" />
              تحديث
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    البند
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    المبلغ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    التدفقات النقدية من الأنشطة التشغيلية
                  </td>
                  <td className="py-2 px-2 text-sm text-left"></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    صافي الربح
                  </td>
                  <td className="py-2 px-2 text-sm text-left">136,920 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    الاستهلاك والإطفاء
                  </td>
                  <td className="py-2 px-2 text-sm text-left">25,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    التغير في الذمم المدينة
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-15,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    التغير في المخزون
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-30,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    التغير في الذمم الدائنة
                  </td>
                  <td className="py-2 px-2 text-sm text-left">20,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    صافي النقد من الأنشطة التشغيلية
                  </td>
                  <td className="py-2 px-2 text-sm text-left">136,920 ₴</td>
                </tr>

                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    التدفقات النقدية من الأنشطة الاستثمارية
                  </td>
                  <td className="py-2 px-2 text-sm text-left"></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    شراء أصول ثابتة
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-50,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    بيع أصول ثابتة
                  </td>
                  <td className="py-2 px-2 text-sm text-left">10,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    صافي النقد من الأنشطة الاستثمارية
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-40,000 ₴</td>
                </tr>

                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    التدفقات النقدية من الأنشطة التمويلية
                  </td>
                  <td className="py-2 px-2 text-sm text-left"></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    سداد قروض
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-20,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    توزيعات أرباح
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-15,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">
                    صافي النقد من الأنشطة التمويلية
                  </td>
                  <td className="py-2 px-2 text-sm text-left">-35,000 ₴</td>
                </tr>

                <tr className="font-medium">
                  <td className="py-2 px-2 text-sm">صافي التغير في النقدية</td>
                  <td className="py-2 px-2 text-sm text-left">61,920 ₴</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-2 px-2 text-sm">النقدية في بداية الفترة</td>
                  <td className="py-2 px-2 text-sm text-left">63,080 ₴</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-2 px-2 text-sm">النقدية في نهاية الفترة</td>
                  <td className="py-2 px-2 text-sm text-left">125,000 ₴</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Profit & Loss */}
        <TabsContent value="profit-loss">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الفرع</label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفرع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    {ukrainianBranches.map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الفترة</label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">شهري</SelectItem>
                    <SelectItem value="quarter">ربع سنوي</SelectItem>
                    <SelectItem value="year">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-[200px] pr-10"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button>
              <RefreshCw className="ml-2 h-4 w-4" />
              تحديث
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    البند
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    المبلغ
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">الإيرادات</td>
                  <td className="py-2 px-2 text-sm text-left"></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    إيرادات المبيعات
                  </td>
                  <td className="py-2 px-2 text-sm text-left">1,200,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    إيرادات أخرى
                  </td>
                  <td className="py-2 px-2 text-sm text-left">22,500 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">إجمالي الإيرادات</td>
                  <td className="py-2 px-2 text-sm text-left">1,222,500 ₴</td>
                </tr>

                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">المصروفات</td>
                  <td className="py-2 px-2 text-sm text-left"></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    تكلفة المبيعات
                  </td>
                  <td className="py-2 px-2 text-sm text-left">733,500 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    الرواتب
                  </td>
                  <td className="py-2 px-2 text-sm text-left">183,375 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    الإيجار
                  </td>
                  <td className="py-2 px-2 text-sm text-left">60,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    المرافق
                  </td>
                  <td className="py-2 px-2 text-sm text-left">25,000 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    التسويق
                  </td>
                  <td className="py-2 px-2 text-sm text-left">37,250 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium pr-6">
                    مصروفات أخرى
                  </td>
                  <td className="py-2 px-2 text-sm text-left">46,450 ₴</td>
                </tr>
                <tr className="border-b hover:bg-muted/50 font-medium">
                  <td className="py-2 px-2 text-sm">إجمالي المصروفات</td>
                  <td className="py-2 px-2 text-sm text-left">1,085,575 ₴</td>
                </tr>

                <tr className="font-medium">
                  <td className="py-2 px-2 text-sm">صافي الربح</td>
                  <td className="py-2 px-2 text-sm text-left">136,925 ₴</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default FinancialReports;
