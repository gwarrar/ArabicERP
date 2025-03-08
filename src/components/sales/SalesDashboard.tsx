import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ukrainianBranches, branchSalesData } from "@/data/branches";
import { customers, topSellingProducts } from "@/data/salesData";
import { SalesInvoice } from "./SalesInvoice";
import { POSInterface } from "./POSInterface";
import { CustomerDetails } from "./CustomerDetails";

// KPI Card Component
const KPICard = ({
  title,
  value,
  change,
  icon,
  period = "أسبوعي",
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

// Sample sales data
const recentSales = [
  {
    id: "1",
    invoiceNumber: "INV-2024-0125",
    customer: "شركة الأفق للتجارة",
    date: "2024-07-15",
    amount: 12500,
    status: "completed",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-0124",
    customer: "مؤسسة النور",
    date: "2024-07-14",
    amount: 8750,
    status: "completed",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-0123",
    customer: "شركة الرياض للمقاولات",
    date: "2024-07-12",
    amount: 15000,
    status: "pending",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const SalesDashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState("monthly");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showNewInvoiceDialog, setShowNewInvoiceDialog] = useState(false);
  const [showPOSDialog, setShowPOSDialog] = useState(false);

  // Filtered data based on period and branch
  const [salesData, setSalesData] = useState<any[]>([]);
  const [productSalesData, setProductSalesData] = useState<any[]>([]);

  // Update data when filter changes
  useEffect(() => {
    // Filter sales data
    if (selectedBranch === "all") {
      // Aggregate data for all branches
      const aggregatedSales = branchSalesData[
        filterPeriod as keyof typeof branchSalesData
      ].reduce((acc: { [key: string]: number }, item) => {
        acc[item.branch] = item.sales;
        return acc;
      }, {});

      setSalesData(
        Object.entries(aggregatedSales).map(([branch, sales]) => ({
          branch,
          sales,
        })),
      );
    } else {
      // Filter data for selected branch
      const branchSales = branchSalesData[
        filterPeriod as keyof typeof branchSalesData
      ].filter((item) => item.branch === selectedBranch);
      setSalesData(branchSales);
    }

    // Set product sales data
    setProductSalesData(
      topSellingProducts.map((product) => ({
        name: product.name,
        value: product.sales,
      })),
    );
  }, [filterPeriod, selectedBranch]);

  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerDialog(true);
  };

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
          <Button size="sm" onClick={() => setShowPOSDialog(true)}>
            <ShoppingCart className="ml-1 h-4 w-4" />
            نقطة البيع
          </Button>
          <Button size="sm" onClick={() => setShowNewInvoiceDialog(true)}>
            <Plus className="ml-1 h-4 w-4" />
            فاتورة جديدة
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="إجمالي المبيعات"
          value={`${
            selectedBranch === "all"
              ? branchSalesData[filterPeriod as keyof typeof branchSalesData]
                  .reduce((sum, item) => sum + item.sales, 0)
                  .toLocaleString()
              : branchSalesData[filterPeriod as keyof typeof branchSalesData]
                  .find((item) => item.branch === selectedBranch)
                  ?.sales.toLocaleString() || "0"
          } ₴`}
          change={5.7}
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
          title="عدد الطلبات"
          value="١٥٦ طلب"
          change={3.2}
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
          value="١,٦٠٠ ₴"
          change={2.1}
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
          title="العملاء النشطين"
          value="٨٥ عميل"
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
            <h3 className="text-lg font-semibold">
              {selectedBranch === "all"
                ? "المبيعات حسب الفرع"
                : `مبيعات فرع ${selectedBranch}`}
            </h3>
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
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
                <Bar
                  dataKey="sales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="المبيعات"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أفضل المنتجات مبيعاً</h3>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productSalesData}
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
                  {productSalesData.map((entry, index) => (
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

      {/* Recent Sales and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">أحدث المبيعات</h3>
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
                    رقم الفاتورة
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    العميل
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
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm">{sale.invoiceNumber}</td>
                    <td className="py-2 px-2 text-sm">{sale.customer}</td>
                    <td className="py-2 px-2 text-sm">{sale.date}</td>
                    <td className="py-2 px-2 text-sm text-left">
                      {sale.amount.toLocaleString()} ₴
                    </td>
                    <td className="py-2 px-2 text-sm">
                      <span
                        className={`px-2 py-1 text-xs ${
                          sale.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        } rounded-full`}
                      >
                        {sale.status === "completed" ? "مكتملة" : "معلقة"}
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
            <h3 className="text-lg font-semibold">أفضل المنتجات مبيعاً</h3>
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
                    المنتج
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    الفئة
                  </th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                    المبيعات
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    الإيرادات
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.slice(0, 3).map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 text-sm font-medium">
                      {product.name}
                    </td>
                    <td className="py-2 px-2 text-sm">{product.category}</td>
                    <td className="py-2 px-2 text-sm">
                      {product.quantity} وحدة
                    </td>
                    <td className="py-2 px-2 text-sm text-left">
                      {product.sales.toLocaleString()} ₴
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">أفضل العملاء</h3>
          <Button variant="ghost" size="sm">
            <Users className="h-4 w-4 ml-1" />
            عرض الكل
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  العميل
                </th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  عدد الطلبات
                </th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  آخر طلب
                </th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                  إجمالي المشتريات
                </th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.slice(0, 5).map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <td className="py-2 px-2 text-sm font-medium">
                    {customer.name}
                  </td>
                  <td className="py-2 px-2 text-sm">{customer.orderCount}</td>
                  <td className="py-2 px-2 text-sm">{customer.lastOrder}</td>
                  <td className="py-2 px-2 text-sm text-left">
                    {customer.totalSpent.toLocaleString()} ₴
                  </td>
                  <td className="py-2 px-2 text-sm">
                    <span
                      className={`px-2 py-1 text-xs ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      } rounded-full`}
                    >
                      {customer.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل العميل</DialogTitle>
          </DialogHeader>
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </DialogContent>
      </Dialog>

      {/* New Invoice Dialog */}
      <Dialog
        open={showNewInvoiceDialog}
        onOpenChange={setShowNewInvoiceDialog}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>فاتورة مبيعات جديدة</DialogTitle>
          </DialogHeader>
          <SalesInvoice onSave={() => setShowNewInvoiceDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* POS Dialog */}
      <Dialog open={showPOSDialog} onOpenChange={setShowPOSDialog}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>نقطة البيع</DialogTitle>
          </DialogHeader>
          <POSInterface onSave={() => setShowPOSDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesDashboard;
