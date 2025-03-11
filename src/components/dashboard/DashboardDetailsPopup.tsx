import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Printer, BarChart2, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface DashboardDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  chartType: string;
  period?: string;
}

const DashboardDetailsPopup: React.FC<DashboardDetailsPopupProps> = ({
  open,
  onClose,
  chartType,
  period,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState(period || "all");
  const [showChart, setShowChart] = useState(true);

  // تحديد عنوان النافذة بناءً على نوع الرسم البياني
  const getTitle = () => {
    switch (chartType) {
      case "sales":
        return "تفاصيل المبيعات";
      case "cashflow":
        return "تفاصيل التدفق النقدي";
      case "inventory":
        return "تفاصيل المخزون";
      case "purchases":
        return "تفاصيل المشتريات";
      default:
        return "تفاصيل البيانات";
    }
  };

  // بيانات تجريبية للمبيعات
  const getSalesData = () => [
    { month: "يناير", sales: 4000, target: 4500, growth: "-11.1%" },
    { month: "فبراير", sales: 5000, target: 4500, growth: "+25.0%" },
    { month: "مارس", sales: 3500, target: 4500, growth: "-30.0%" },
    { month: "أبريل", sales: 6000, target: 5000, growth: "+71.4%" },
    { month: "مايو", sales: 5500, target: 5000, growth: "-8.3%" },
    { month: "يونيو", sales: 7000, target: 5500, growth: "+27.3%" },
  ];

  // بيانات تجريبية للتدفق النقدي
  const getCashFlowData = () => [
    { month: "يناير", income: 45000, expenses: 32000, net: 13000 },
    { month: "فبراير", income: 52000, expenses: 34000, net: 18000 },
    { month: "مارس", income: 49000, expenses: 36000, net: 13000 },
    { month: "أبريل", income: 63000, expenses: 40000, net: 23000 },
    { month: "مايو", income: 58000, expenses: 45000, net: 13000 },
    { month: "يونيو", income: 71000, expenses: 42000, net: 29000 },
  ];

  // بيانات تجريبية للمخزون
  const getInventoryData = () => [
    { category: "الملابس", inStock: 1200, lowStock: 50, outOfStock: 10 },
    { category: "الأحذية", inStock: 800, lowStock: 30, outOfStock: 5 },
    { category: "الإكسسوارات", inStock: 500, lowStock: 20, outOfStock: 2 },
    { category: "الحقائب", inStock: 300, lowStock: 15, outOfStock: 3 },
    {
      category: "المنتجات المنزلية",
      inStock: 700,
      lowStock: 25,
      outOfStock: 8,
    },
  ];

  // بيانات تجريبية للمشتريات
  const getPurchasesData = () => [
    { month: "يناير", purchases: 30000, orders: 15, avgOrderValue: 2000 },
    { month: "فبراير", purchases: 35000, orders: 18, avgOrderValue: 1944 },
    { month: "مارس", purchases: 28000, orders: 12, avgOrderValue: 2333 },
    { month: "أبريل", purchases: 42000, orders: 20, avgOrderValue: 2100 },
    { month: "مايو", purchases: 38000, orders: 16, avgOrderValue: 2375 },
    { month: "يونيو", purchases: 45000, orders: 22, avgOrderValue: 2045 },
  ];

  // تحديد البيانات المناسبة بناءً على نوع الرسم البياني
  const getData = () => {
    switch (chartType) {
      case "sales":
        return getSalesData();
      case "cashflow":
        return getCashFlowData();
      case "inventory":
        return getInventoryData();
      case "purchases":
        return getPurchasesData();
      default:
        return [];
    }
  };

  // تصفية البيانات بناءً على معايير البحث
  const filteredData = getData().filter((item: any) => {
    // تنفيذ منطق التصفية حسب نوع الرسم البياني
    if (
      chartType !== "inventory" &&
      periodFilter !== "all" &&
      item.month !== periodFilter
    ) {
      return false;
    }

    if (
      chartType === "inventory" &&
      categoryFilter !== "all" &&
      item.category !== categoryFilter
    ) {
      return false;
    }

    if (searchTerm === "") {
      return true;
    }

    // البحث في جميع الحقول النصية
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  // تحديد أعمدة الجدول بناءً على نوع الرسم البياني
  const renderTableHeaders = () => {
    switch (chartType) {
      case "sales":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>المبيعات</TableHead>
            <TableHead>المستهدف</TableHead>
            <TableHead>نسبة النمو</TableHead>
          </TableRow>
        );
      case "cashflow":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الإيرادات</TableHead>
            <TableHead>المصروفات</TableHead>
            <TableHead>صافي التدفق النقدي</TableHead>
          </TableRow>
        );
      case "inventory":
        return (
          <TableRow>
            <TableHead>الفئة</TableHead>
            <TableHead>المنتجات المتوفرة</TableHead>
            <TableHead>منتجات منخفضة المخزون</TableHead>
            <TableHead>منتجات نفذت من المخزون</TableHead>
          </TableRow>
        );
      case "purchases":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>إجمالي المشتريات</TableHead>
            <TableHead>عدد الطلبات</TableHead>
            <TableHead>متوسط قيمة الطلب</TableHead>
          </TableRow>
        );
      default:
        return <TableRow></TableRow>;
    }
  };

  // عرض صفوف الجدول بناءً على نوع الرسم البياني
  const renderTableRows = () => {
    if (filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="h-24 text-center text-muted-foreground"
          >
            لا توجد بيانات متاحة
          </TableCell>
        </TableRow>
      );
    }

    switch (chartType) {
      case "sales":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.sales.toLocaleString()}</TableCell>
            <TableCell>₴ {item.target.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.growth.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.growth}
              </span>
            </TableCell>
          </TableRow>
        ));
      case "cashflow":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.income.toLocaleString()}</TableCell>
            <TableCell>₴ {item.expenses.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={item.net >= 0 ? "text-green-600" : "text-red-600"}
              >
                ₴ {item.net.toLocaleString()}
              </span>
            </TableCell>
          </TableRow>
        ));
      case "inventory":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.inStock}</TableCell>
            <TableCell>
              <span className="text-amber-600">{item.lowStock}</span>
            </TableCell>
            <TableCell>
              <span className="text-red-600">{item.outOfStock}</span>
            </TableCell>
          </TableRow>
        ));
      case "purchases":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.purchases.toLocaleString()}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>₴ {item.avgOrderValue.toLocaleString()}</TableCell>
          </TableRow>
        ));
      default:
        return null;
    }
  };

  // عرض الرسم البياني المناسب بناءً على نوع الرسم البياني
  const renderChart = () => {
    switch (chartType) {
      case "sales":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="sales" name="المبيعات" fill="#3b82f6" />
              <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "cashflow":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="income" name="الإيرادات" fill="#10b981" />
              <Bar dataKey="expenses" name="المصروفات" fill="#ef4444" />
              <Bar dataKey="net" name="صافي التدفق النقدي" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "inventory":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" name="المنتجات المتوفرة" fill="#3b82f6" />
              <Bar
                dataKey="lowStock"
                name="منتجات منخفضة المخزون"
                fill="#f59e0b"
              />
              <Bar
                dataKey="outOfStock"
                name="منتجات نفذت من المخزون"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "purchases":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="purchases"
                name="إجمالي المشتريات"
                stroke="#3b82f6"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgOrderValue"
                name="متوسط قيمة الطلب"
                stroke="#10b981"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {getTitle()}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="w-[200px] pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {chartType !== "inventory" && (
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="يناير">يناير</SelectItem>
                  <SelectItem value="فبراير">فبراير</SelectItem>
                  <SelectItem value="مارس">مارس</SelectItem>
                  <SelectItem value="أبريل">أبريل</SelectItem>
                  <SelectItem value="مايو">مايو</SelectItem>
                  <SelectItem value="يونيو">يونيو</SelectItem>
                </SelectContent>
              </Select>
            )}

            {chartType === "inventory" && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="الملابس">الملابس</SelectItem>
                  <SelectItem value="الأحذية">الأحذية</SelectItem>
                  <SelectItem value="الإكسسوارات">الإكسسوارات</SelectItem>
                  <SelectItem value="الحقائب">الحقائب</SelectItem>
                  <SelectItem value="المنتجات المنزلية">
                    المنتجات المنزلية
                  </SelectItem>
                </SelectContent>
              </Select>
            )}

            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفروع</SelectItem>
                <SelectItem value="main">الفرع الرئيسي</SelectItem>
                <SelectItem value="north">الفرع الشمالي</SelectItem>
                <SelectItem value="south">الفرع الجنوبي</SelectItem>
                <SelectItem value="east">الفرع الشرقي</SelectItem>
                <SelectItem value="west">الفرع الغربي</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setBranchFilter("all");
                setCategoryFilter("all");
                setPeriodFilter("all");
              }}
              className="h-10"
            >
              <Filter className="h-4 w-4 ml-1" />
              إعادة ضبط
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChart(!showChart)}
              className="h-10"
            >
              <BarChart2 className="h-4 w-4 ml-1" />
              {showChart ? "إخفاء الرسم البياني" : "عرض الرسم البياني"}
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Chart (if enabled) */}
        {showChart && (
          <div className="h-64 mb-4 border rounded-md">{renderChart()}</div>
        )}

        {/* Data Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDetailsPopup;
