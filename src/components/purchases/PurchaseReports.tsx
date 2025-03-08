import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  FileText,
  Printer,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell,
} from "recharts";
import { ukrainianBranches } from "@/data/branches";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const PurchaseReports = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedReport, setSelectedReport] = useState("purchases-by-supplier");

  // Sample data for reports
  const purchasesBySupplier = [
    { name: "شركة الأمل للتوريدات", value: 180000 },
    { name: "مؤسسة النور للتجارة", value: 150000 },
    { name: "شركة الفجر للمعدات", value: 120000 },
    { name: "مؤسسة السلام للتوريدات", value: 90000 },
    { name: "شركة البركة للتجارة", value: 60000 },
  ];

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

  const purchasesByBranch = [
    { name: "كييف", value: 450000 },
    { name: "خاركيف", value: 320000 },
    { name: "أوديسا", value: 280000 },
    { name: "دنيبرو", value: 180000 },
    { name: "لفيف", value: 150000 },
  ];

  // Sample data for top suppliers table
  const topSuppliers = [
    {
      name: "شركة الأمل للتوريدات",
      purchases: 180000,
      invoices: 12,
      avgOrderValue: 15000,
      onTimeDelivery: "95%",
    },
    {
      name: "مؤسسة النور للتجارة",
      purchases: 150000,
      invoices: 10,
      avgOrderValue: 15000,
      onTimeDelivery: "90%",
    },
    {
      name: "شركة الفجر للمعدات",
      purchases: 120000,
      invoices: 8,
      avgOrderValue: 15000,
      onTimeDelivery: "85%",
    },
    {
      name: "مؤسسة السلام للتوريدات",
      purchases: 90000,
      invoices: 6,
      avgOrderValue: 15000,
      onTimeDelivery: "92%",
    },
    {
      name: "شركة البركة للتجارة",
      purchases: 60000,
      invoices: 4,
      avgOrderValue: 15000,
      onTimeDelivery: "88%",
    },
  ];

  // Sample data for top products table
  const topProducts = [
    {
      name: "مادة خام أ",
      category: "مواد خام",
      quantity: 2500,
      totalCost: 125000,
      avgPrice: 50,
    },
    {
      name: "مادة خام ب",
      category: "مواد خام",
      quantity: 1000,
      totalCost: 100000,
      avgPrice: 100,
    },
    {
      name: "قطع غيار س",
      category: "قطع غيار",
      quantity: 200,
      totalCost: 100000,
      avgPrice: 500,
    },
    {
      name: "معدات إنتاج",
      category: "معدات",
      quantity: 10,
      totalCost: 150000,
      avgPrice: 15000,
    },
    {
      name: "مواد تعبئة",
      category: "مواد تعبئة",
      quantity: 10000,
      totalCost: 100000,
      avgPrice: 10,
    },
  ];

  // Render the appropriate report based on selection
  const renderReport = () => {
    switch (selectedReport) {
      case "purchases-by-supplier":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  المشتريات حسب المورد
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={purchasesBySupplier}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()} ₴`}
                      />
                      <Legend />
                      <Bar dataKey="value" name="المشتريات" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">أكبر الموردين</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المورد</TableHead>
                        <TableHead className="text-left">المشتريات</TableHead>
                        <TableHead className="text-center">
                          عدد الفواتير
                        </TableHead>
                        <TableHead className="text-left">
                          متوسط قيمة الطلب
                        </TableHead>
                        <TableHead className="text-center">
                          التسليم في الموعد
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSuppliers.map((supplier, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {supplier.name}
                          </TableCell>
                          <TableCell className="text-left">
                            {supplier.purchases.toLocaleString()} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            {supplier.invoices}
                          </TableCell>
                          <TableCell className="text-left">
                            {supplier.avgOrderValue.toLocaleString()} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            {supplier.onTimeDelivery}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="ml-2 h-4 w-4" />
                طباعة التقرير
              </Button>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير إلى Excel
              </Button>
            </div>
          </div>
        );

      case "purchases-by-category":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  المشتريات حسب الفئة
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={purchasesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
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
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()} ₴`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  أكثر المنتجات شراءً
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-left">
                          إجمالي التكلفة
                        </TableHead>
                        <TableHead className="text-left">متوسط السعر</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProducts.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-center">
                            {product.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-left">
                            {product.totalCost.toLocaleString()} ₴
                          </TableCell>
                          <TableCell className="text-left">
                            {product.avgPrice.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="ml-2 h-4 w-4" />
                طباعة التقرير
              </Button>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير إلى Excel
              </Button>
            </div>
          </div>
        );

      case "monthly-purchases":
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                اتجاهات المشتريات الشهرية
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPurchases}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()} ₴`}
                    />
                    <Legend />
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

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="ml-2 h-4 w-4" />
                طباعة التقرير
              </Button>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير إلى Excel
              </Button>
            </div>
          </div>
        );

      case "purchases-by-branch":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  المشتريات حسب الفرع
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={purchasesByBranch}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()} ₴`}
                      />
                      <Legend />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        name="المشتريات"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  توزيع المشتريات حسب الفرع
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={purchasesByBranch}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {purchasesByBranch.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()} ₴`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Printer className="ml-2 h-4 w-4" />
                طباعة التقرير
              </Button>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير إلى Excel
              </Button>
            </div>
          </div>
        );

      default:
        return <div>الرجاء اختيار تقرير</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">تقارير المشتريات</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              نوع التقرير
            </label>
            <select
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="purchases-by-supplier">
                المشتريات حسب المورد
              </option>
              <option value="purchases-by-category">المشتريات حسب الفئة</option>
              <option value="monthly-purchases">
                اتجاهات المشتريات الشهرية
              </option>
              <option value="purchases-by-branch">المشتريات حسب الفرع</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">الفرع</label>
            <select
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
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

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">من تاريخ</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pr-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">إلى تاريخ</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pr-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button>
              <Filter className="ml-2 h-4 w-4" />
              عرض التقرير
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي المشتريات
                </p>
                <h3 className="text-xl font-bold mt-1">1,080,000 ₴</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  عدد طلبات الشراء
                </p>
                <h3 className="text-xl font-bold mt-1">١٢٨ طلب</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط قيمة الطلب
                </p>
                <h3 className="text-xl font-bold mt-1">٨,٤٣٨ ₴</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عدد الموردين</p>
                <h3 className="text-xl font-bold mt-1">٢٥ مورد</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Report Content */}
        {renderReport()}
      </Card>
    </div>
  );
};

export default PurchaseReports;
