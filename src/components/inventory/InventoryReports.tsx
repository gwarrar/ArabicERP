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
  Package,
  Warehouse,
  ArrowRightLeft,
  AlertTriangle,
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const InventoryReports = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedReport, setSelectedReport] = useState("inventory-value");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  // Sample data for reports
  const inventoryValueByCategory = [
    { name: "مواد خام", value: 450000 },
    { name: "منتجات نهائية", value: 350000 },
    { name: "قطع غيار", value: 200000 },
    { name: "مواد تعبئة", value: 150000 },
    { name: "أدوات", value: 100000 },
  ];

  const inventoryValueByWarehouse = [
    { name: "المستودع الرئيسي", value: 500000 },
    { name: "مستودع المواد الخام", value: 350000 },
    { name: "مستودع المنتجات النهائية", value: 250000 },
    { name: "مستودع قطع الغيار", value: 150000 },
  ];

  const monthlyMovements = [
    { month: "يناير", استلام: 120, صرف: 80, نقل: 40 },
    { month: "فبراير", استلام: 150, صرف: 100, نقل: 50 },
    { month: "مارس", استلام: 180, صرف: 120, نقل: 60 },
    { month: "أبريل", استلام: 200, صرف: 150, نقل: 70 },
    { month: "مايو", استلام: 220, صرف: 170, نقل: 80 },
    { month: "يونيو", استلام: 250, صرف: 200, نقل: 90 },
  ];

  // Sample data for top products table
  const topProducts = [
    {
      name: "مادة خام أ",
      category: "مواد خام",
      currentStock: 150,
      value: 75000,
      turnoverRate: "3.5",
    },
    {
      name: "منتج نهائي ج",
      category: "منتجات نهائية",
      currentStock: 200,
      value: 120000,
      turnoverRate: "4.2",
    },
    {
      name: "مادة خام ب",
      category: "مواد خام",
      currentStock: 80,
      value: 40000,
      turnoverRate: "2.8",
    },
    {
      name: "قطع غيار س",
      category: "قطع غيار",
      currentStock: 30,
      value: 15000,
      turnoverRate: "1.5",
    },
    {
      name: "مواد تعبئة ج",
      category: "مواد تعبئة",
      currentStock: 100,
      value: 10000,
      turnoverRate: "5.0",
    },
  ];

  // Render the appropriate report based on selection
  const renderReport = () => {
    switch (selectedReport) {
      case "inventory-value":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  قيمة المخزون حسب الفئة
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={inventoryValueByCategory}
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
                      <Bar dataKey="value" name="القيمة" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  قيمة المخزون حسب المستودع
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryValueByWarehouse}
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
                        {inventoryValueByWarehouse.map((entry, index) => (
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

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                أعلى المنتجات من حيث القيمة
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead className="text-center">
                        المخزون الحالي
                      </TableHead>
                      <TableHead className="text-left">القيمة</TableHead>
                      <TableHead className="text-center">
                        معدل الدوران
                      </TableHead>
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
                          {product.currentStock}
                        </TableCell>
                        <TableCell className="text-left">
                          {product.value.toLocaleString()} ₴
                        </TableCell>
                        <TableCell className="text-center">
                          {product.turnoverRate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

      case "inventory-movements":
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                حركات المخزون الشهرية
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyMovements}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="استلام" fill="#0088FE" name="استلام" />
                    <Bar dataKey="صرف" fill="#00C49F" name="صرف" />
                    <Bar dataKey="نقل" fill="#FFBB28" name="نقل" />
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

      case "low-stock":
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                تقرير المنتجات منخفضة المخزون
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead className="text-center">
                        المخزون الحالي
                      </TableHead>
                      <TableHead className="text-center">الحد الأدنى</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead className="text-left">القيمة</TableHead>
                      <TableHead className="text-center">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">قطع غيار س</TableCell>
                      <TableCell>قطع غيار</TableCell>
                      <TableCell className="text-center text-red-600">
                        8
                      </TableCell>
                      <TableCell className="text-center">10</TableCell>
                      <TableCell>مستودع قطع الغيار</TableCell>
                      <TableCell className="text-left">4,000 ₴</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          منخفض
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        مواد تعبئة ج
                      </TableCell>
                      <TableCell>مواد تعبئة</TableCell>
                      <TableCell className="text-center text-red-600">
                        5
                      </TableCell>
                      <TableCell className="text-center">15</TableCell>
                      <TableCell>المستودع الرئيسي</TableCell>
                      <TableCell className="text-left">500 ₴</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          منخفض
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مادة خام أ</TableCell>
                      <TableCell>مواد خام</TableCell>
                      <TableCell className="text-center text-red-600">
                        15
                      </TableCell>
                      <TableCell className="text-center">20</TableCell>
                      <TableCell>مستودع المواد الخام</TableCell>
                      <TableCell className="text-left">7,500 ₴</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                          تحذير
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        منتج نهائي د
                      </TableCell>
                      <TableCell>منتجات نهائية</TableCell>
                      <TableCell className="text-center text-red-600">
                        12
                      </TableCell>
                      <TableCell className="text-center">15</TableCell>
                      <TableCell>مستودع المنتجات النهائية</TableCell>
                      <TableCell className="text-left">12,000 ₴</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                          تحذير
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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

      default:
        return <div>الرجاء اختيار تقرير</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">تقارير المخزون</h2>
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
              <option value="inventory-value">قيمة المخزون</option>
              <option value="inventory-movements">حركات المخزون</option>
              <option value="low-stock">المنتجات منخفضة المخزون</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">المستودع</label>
            <select
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              <option value="all">جميع المستودعات</option>
              <option value="المستودع الرئيسي">المستودع الرئيسي</option>
              <option value="مستودع المواد الخام">مستودع المواد الخام</option>
              <option value="مستودع المنتجات النهائية">
                مستودع المنتجات النهائية
              </option>
              <option value="مستودع قطع الغيار">مستودع قطع الغيار</option>
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
                  إجمالي قيمة المخزون
                </p>
                <h3 className="text-xl font-bold mt-1">1,250,000 ₴</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عدد الأصناف</p>
                <h3 className="text-xl font-bold mt-1">١,٢٠٠ صنف</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">عدد المستودعات</p>
                <h3 className="text-xl font-bold mt-1">٤ مستودعات</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <Warehouse className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  أصناف منخفضة المخزون
                </p>
                <h3 className="text-xl font-bold mt-1 text-red-600">١٢ صنف</h3>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
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

export default InventoryReports;
