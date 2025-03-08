import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Download,
  Filter,
  Printer,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample sales data
const salesData = [
  {
    id: "INV-2024-001",
    customer: "شركة الأمل للتجارة",
    date: "2024-07-15",
    amount: 12500,
    status: "مكتمل",
    paymentMethod: "تحويل بنكي",
    items: 8,
  },
  {
    id: "INV-2024-002",
    customer: "مؤسسة النور",
    date: "2024-07-14",
    amount: 8750,
    status: "مكتمل",
    paymentMethod: "بطاقة ائتمان",
    items: 5,
  },
  {
    id: "INV-2024-003",
    customer: "شركة البناء الحديث",
    date: "2024-07-13",
    amount: 15300,
    status: "قيد المعالجة",
    paymentMethod: "تحويل بنكي",
    items: 12,
  },
  {
    id: "INV-2024-004",
    customer: "مؤسسة الصفا",
    date: "2024-07-12",
    amount: 6200,
    status: "مكتمل",
    paymentMethod: "نقدي",
    items: 3,
  },
  {
    id: "INV-2024-005",
    customer: "متجر الأناقة",
    date: "2024-07-11",
    amount: 9800,
    status: "ملغي",
    paymentMethod: "بطاقة ائتمان",
    items: 7,
  },
  {
    id: "INV-2024-006",
    customer: "شركة التقنية الحديثة",
    date: "2024-07-10",
    amount: 18500,
    status: "مكتمل",
    paymentMethod: "تحويل بنكي",
    items: 15,
  },
  {
    id: "INV-2024-007",
    customer: "مؤسسة الريادة",
    date: "2024-07-09",
    amount: 7300,
    status: "مكتمل",
    paymentMethod: "نقدي",
    items: 4,
  },
];

// Sample sales by category data
const salesByCategoryData = [
  { name: "ملابس رجالية", قيمة: 125000 },
  { name: "ملابس نسائية", قيمة: 150000 },
  { name: "ملابس أطفال", قيمة: 75000 },
  { name: "إكسسوارات", قيمة: 45000 },
];

// Sample sales by month data
const salesByMonthData = [
  { month: "يناير", المبيعات: 45000 },
  { month: "فبراير", المبيعات: 52000 },
  { month: "مارس", المبيعات: 49000 },
  { month: "أبريل", المبيعات: 63000 },
  { month: "مايو", المبيعات: 58000 },
  { month: "يونيو", المبيعات: 71000 },
];

// Colors for pie charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const SalesReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Filter and sort sales data
  const filteredSales = salesData
    .filter((sale) => {
      const matchesSearch =
        sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || sale.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === "amount") {
        comparison = a.amount - b.amount;
      } else if (sortField === "customer") {
        comparison = a.customer.localeCompare(b.customer);
      } else if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA");
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "قيد المعالجة":
        return "bg-blue-100 text-blue-800";
      case "ملغي":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => {
    if (sale.status !== "ملغي") {
      return sum + sale.amount;
    }
    return sum;
  }, 0);

  // Calculate total completed sales
  const completedSales = salesData.filter(
    (sale) => sale.status === "مكتمل",
  ).length;

  // Calculate average sale amount
  const averageSaleAmount =
    totalSales / salesData.filter((sale) => sale.status !== "ملغي").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تقارير المبيعات</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="ml-1 h-3 w-3" />
            الفترة: آخر ٣٠ يوم
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-1 h-3 w-3" />
            تصدير
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="ml-1 h-3 w-3" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalSales.toLocaleString()} ₴
                </h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +١٢.٥%
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  عدد المبيعات المكتملة
                </p>
                <h3 className="text-2xl font-bold mt-2">{completedSales}</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +٨.٣%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط قيمة المبيعات
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {averageSaleAmount.toLocaleString()} ₴
                </h3>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +٥.٢%
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المبيعات حسب الفئة</CardTitle>
            <CardDescription>
              توزيع المبيعات على فئات المنتجات المختلفة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="قيمة"
                  >
                    {salesByCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المبيعات الشهرية</CardTitle>
            <CardDescription>
              تتبع المبيعات على مدار الأشهر الستة الماضية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesByMonthData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="المبيعات" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>سجل المبيعات</CardTitle>
              <CardDescription>
                قائمة بجميع المبيعات المسجلة في النظام
              </CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن مبيعات..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="قيد المعالجة">قيد المعالجة</SelectItem>
                  <SelectItem value="ملغي">ملغي</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="ml-2 h-4 w-4" />
                تصفية متقدمة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("id")}
                  >
                    <div className="flex items-center">
                      رقم الفاتورة {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("customer")}
                  >
                    <div className="flex items-center">
                      العميل {getSortIcon("customer")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("date")}
                  >
                    <div className="flex items-center">
                      التاريخ {getSortIcon("date")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("amount")}
                  >
                    <div className="flex items-center">
                      المبلغ {getSortIcon("amount")}
                    </div>
                  </TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell>{sale.amount.toLocaleString()} ₴</TableCell>
                      <TableCell>{sale.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>لا توجد مبيعات تطابق معايير البحث</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setDateFilter("all");
                          }}
                        >
                          إعادة تعيين المرشحات
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
