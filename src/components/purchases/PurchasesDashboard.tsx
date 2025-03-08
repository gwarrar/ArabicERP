import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Users,
  Filter,
  Plus,
  FileText,
  MapPin,
  Calendar,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
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
} from "recharts";
import { ukrainianBranches } from "@/data/branches";

// KPI Card Component
const KPICard = ({
  title,
  value,
  change,
  icon,
  period = "شهري",
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  period?: string;
}) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-1">
            <span
              className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              <span className="mr-1 text-xs">{Math.abs(change)}%</span>
            </span>
            <span className="text-muted-foreground text-xs mr-2">{period}</span>
          </div>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};

// Sample purchase data
const recentPurchases = [
  {
    id: "PO-2024-0125",
    supplier: "شركة الأمل للتوريدات",
    date: "2024-07-15",
    amount: 45000,
    status: "approved",
  },
  {
    id: "PO-2024-0124",
    supplier: "مؤسسة النور للتجارة",
    date: "2024-07-14",
    amount: 32000,
    status: "sent",
  },
  {
    id: "PO-2024-0123",
    supplier: "شركة الفجر للمعدات",
    date: "2024-07-12",
    amount: 28500,
    status: "draft",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Sample data for charts
const purchasesByCategory = [
  { name: "مواد خام", value: 450000 },
  { name: "قطع غيار", value: 250000 },
  { name: "معدات", value: 180000 },
  { name: "مواد تعبئة", value: 120000 },
  { name: "متنوع", value: 80000 },
];

const monthlyPurchases = [
  { month: "يناير", purchases: 280000 },
  { month: "فبراير", purchases: 320000 },
  { month: "مارس", purchases: 350000 },
  { month: "أبريل", purchases: 300000 },
  { month: "مايو", purchases: 380000 },
  { month: "يونيو", purchases: 420000 },
  { month: "يوليو", purchases: 450000 },
];

const topSuppliers = [
  { name: "شركة الأمل للتوريدات", purchases: 180000 },
  { name: "مؤسسة النور للتجارة", purchases: 150000 },
  { name: "شركة الفجر للمعدات", purchases: 120000 },
  { name: "مؤسسة السلام للتوريدات", purchases: 90000 },
  { name: "شركة البركة للتجارة", purchases: 60000 },
];

const PurchasesDashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState("monthly");
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <div className="space-y-6">
      {/* Filter and Quick Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">جميع الفروع</option>
              {ukrainianBranches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option value="daily">يومي</option>
              <option value="weekly">أسبوعي</option>
              <option value="monthly">شهري</option>
              <option value="yearly">سنوي</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Plus className="ml-1 h-4 w-4" />
            طلب شراء جديد
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="إجمالي المشتريات"
          value="1,080,000 ₴"
          change={7.2}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
        <KPICard
          title="عدد طلبات الشراء"
          value="١٢٨ طلب"
          change={4.5}
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
        <KPICard
          title="متوسط قيمة الطلب"
          value="٨,٤٣٨ ₴"
          change={2.8}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
        <KPICard
          title="الموردين النشطين"
          value="٢٥ مورد"
          change={1.5}
          icon={<Users className="h-5 w-5 text-primary" />}
          period={
            filterPeriod === "daily"
              ? "يومي"
              : filterPeriod === "weekly"
                ? "أسبوعي"
                : filterPeriod === "monthly"
                  ? "شهري"
                  : "سنوي"
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">اتجاهات المشتريات الشهرية</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {filterPeriod === "daily"
                  ? "يومي"
                  : filterPeriod === "weekly"
                    ? "أسبوعي"
                    : filterPeriod === "monthly"
                      ? "شهري"
                      : "سنوي"}
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPurchases}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
                <Bar
                  dataKey="purchases"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="المشتريات"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">توزيع المشتريات حسب الفئة</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={purchasesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {purchasesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Purchases and Top Suppliers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أحدث طلبات الشراء</h3>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 ml-1" />
              عرض الكل
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    رقم الطلب
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    المورد
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    التاريخ
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    المبلغ
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm">{purchase.id}</td>
                    <td className="py-2 px-2 text-sm">{purchase.supplier}</td>
                    <td className="py-2 px-2 text-sm">{purchase.date}</td>
                    <td className="py-2 px-2 text-sm text-left">
                      {purchase.amount.toLocaleString()} ₴
                    </td>
                    <td className="py-2 px-2 text-sm">
                      <span
                        className={`px-2 py-1 text-xs ${
                          purchase.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : purchase.status === "sent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        } rounded-full`}
                      >
                        {purchase.status === "approved"
                          ? "معتمد"
                          : purchase.status === "sent"
                            ? "مرسل"
                            : "مسودة"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أكبر الموردين</h3>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 ml-1" />
              تقرير كامل
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    المورد
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    إجمالي المشتريات
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    النسبة
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSuppliers.map((supplier, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      {supplier.name}
                    </td>
                    <td className="py-2 px-2 text-sm text-left">
                      {supplier.purchases.toLocaleString()} ₴
                    </td>
                    <td className="py-2 px-2 text-sm text-right">
                      {(
                        (supplier.purchases /
                          topSuppliers.reduce(
                            (sum, s) => sum + s.purchases,
                            0,
                          )) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PurchasesDashboard;
