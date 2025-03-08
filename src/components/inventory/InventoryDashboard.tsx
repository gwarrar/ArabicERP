import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "recharts";
import {
  Package,
  Warehouse,
  AlertTriangle,
  TrendingUp,
  ArrowRightLeft,
  DollarSign,
} from "lucide-react";

const InventoryDashboard = () => {
  // Sample data for charts
  const inventoryByCategory = [
    { name: "مواد خام", value: 450 },
    { name: "منتجات نهائية", value: 300 },
    { name: "قطع غيار", value: 200 },
    { name: "مواد تعبئة", value: 150 },
    { name: "أدوات", value: 100 },
  ];

  const inventoryByWarehouse = [
    { name: "المستودع الرئيسي", value: 500 },
    { name: "مستودع المواد الخام", value: 350 },
    { name: "مستودع المنتجات النهائية", value: 250 },
    { name: "مستودع قطع الغيار", value: 150 },
  ];

  const monthlyMovements = [
    { month: "يناير", استلام: 120, صرف: 80, نقل: 40 },
    { month: "فبراير", استلام: 150, صرف: 100, نقل: 50 },
    { month: "مارس", استلام: 180, صرف: 120, نقل: 60 },
    { month: "أبريل", استلام: 200, صرف: 150, نقل: 70 },
    { month: "مايو", استلام: 220, صرف: 170, نقل: 80 },
    { month: "يونيو", استلام: 250, صرف: 200, نقل: 90 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Sample low stock items
  const lowStockItems = [
    {
      name: "مادة خام أ",
      currentStock: 15,
      minStock: 20,
      warehouse: "مستودع المواد الخام",
    },
    {
      name: "قطع غيار س",
      currentStock: 8,
      minStock: 10,
      warehouse: "مستودع قطع الغيار",
    },
    {
      name: "مواد تعبئة ج",
      currentStock: 5,
      minStock: 15,
      warehouse: "المستودع الرئيسي",
    },
    {
      name: "منتج نهائي د",
      currentStock: 12,
      minStock: 15,
      warehouse: "مستودع المنتجات النهائية",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">إجمالي الأصناف</p>
              <h3 className="text-2xl font-bold mt-1">1,200</h3>
              <p className="text-xs text-green-500 mt-1">
                +5.2% عن الشهر السابق
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">قيمة المخزون</p>
              <h3 className="text-2xl font-bold mt-1">1,250,000 ₴</h3>
              <p className="text-xs text-green-500 mt-1">
                +3.8% عن الشهر السابق
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">حركات المخزون</p>
              <h3 className="text-2xl font-bold mt-1">520</h3>
              <p className="text-xs text-green-500 mt-1">
                +12.5% عن الشهر السابق
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowRightLeft className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">
                أصناف منخفضة المخزون
              </p>
              <h3 className="text-2xl font-bold mt-1 text-red-600">12</h3>
              <p className="text-xs text-red-500 mt-1">تحتاج إلى إعادة طلب</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 bg-white">
          <h3 className="text-lg font-semibold mb-4">حركات المخزون الشهرية</h3>
          <div className="h-[300px]">
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

        <Card className="p-4 bg-white">
          <h3 className="text-lg font-semibold mb-4">
            توزيع المخزون حسب الفئة
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryByCategory}
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
                  {inventoryByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} صنف`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">أصناف منخفضة المخزون</h3>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  الصنف
                </th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">
                  المخزون الحالي
                </th>
                <th className="text-center py-2 px-2 font-medium text-muted-foreground">
                  الحد الأدنى
                </th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  المستودع
                </th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 text-sm font-medium">{item.name}</td>
                  <td className="py-2 px-2 text-sm text-center">
                    {item.currentStock}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {item.minStock}
                  </td>
                  <td className="py-2 px-2 text-sm">{item.warehouse}</td>
                  <td className="py-2 px-2 text-sm">
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      منخفض
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Warehouse Summary */}
      <Card className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">ملخص المستودعات</h3>
          <Button variant="outline" size="sm">
            عرض التفاصيل
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryByWarehouse}
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
                  {inventoryByWarehouse.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} صنف`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {inventoryByWarehouse.map((warehouse, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="mr-2 text-sm">{warehouse.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {warehouse.value} صنف
                  </span>
                  <span className="text-xs text-muted-foreground mr-2">
                    (
                    {(
                      (warehouse.value /
                        inventoryByWarehouse.reduce(
                          (sum, w) => sum + w.value,
                          0,
                        )) *
                      100
                    ).toFixed(1)}
                    %)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InventoryDashboard;
