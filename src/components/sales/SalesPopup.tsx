import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  X,
  Plus,
  Download,
  Printer,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Calendar,
  User,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import SalesInvoice from "./SalesInvoice";

// Sample sales data
const salesData = [
  {
    id: "INV-2024-0001",
    date: "2024-07-20",
    customer: "شركة الأمل للتجارة",
    amount: 15000,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 5,
  },
  {
    id: "INV-2024-0002",
    date: "2024-07-19",
    customer: "مؤسسة النور",
    amount: 8500,
    status: "مكتمل",
    paymentStatus: "غير مدفوع",
    items: 3,
  },
  {
    id: "INV-2024-0003",
    date: "2024-07-18",
    customer: "شركة البناء الحديث",
    amount: 22000,
    status: "قيد التنفيذ",
    paymentStatus: "جزئي",
    items: 8,
  },
  {
    id: "INV-2024-0004",
    date: "2024-07-17",
    customer: "مؤسسة الصفا التجارية",
    amount: 12500,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 4,
  },
  {
    id: "INV-2024-0005",
    date: "2024-07-16",
    customer: "شركة الفجر للإلكترونيات",
    amount: 18000,
    status: "ملغي",
    paymentStatus: "مسترجع",
    items: 6,
  },
  {
    id: "INV-2024-0006",
    date: "2024-07-15",
    customer: "شركة الأمل للتجارة",
    amount: 9500,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 2,
  },
  {
    id: "INV-2024-0007",
    date: "2024-07-14",
    customer: "مؤسسة النور",
    amount: 14000,
    status: "مكتمل",
    paymentStatus: "غير مدفوع",
    items: 5,
  },
];

// Calculate summary statistics
const calculateSummary = () => {
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const completedSales = salesData.filter((sale) => sale.status === "مكتمل");
  const totalCompleted = completedSales.reduce(
    (sum, sale) => sum + sale.amount,
    0,
  );
  const paidSales = salesData.filter((sale) => sale.paymentStatus === "مدفوع");
  const totalPaid = paidSales.reduce((sum, sale) => sum + sale.amount, 0);
  const unpaidSales = salesData.filter(
    (sale) => sale.paymentStatus === "غير مدفوع",
  );
  const totalUnpaid = unpaidSales.reduce((sum, sale) => sum + sale.amount, 0);

  return {
    totalSales,
    totalInvoices: salesData.length,
    totalCompleted,
    completedCount: completedSales.length,
    totalPaid,
    paidCount: paidSales.length,
    totalUnpaid,
    unpaidCount: unpaidSales.length,
  };
};

interface SalesPopupProps {
  open: boolean;
  onClose: () => void;
}

const SalesPopup: React.FC<SalesPopupProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  // Calculate summary (memoized)
  const summary = useMemo(() => calculateSummary(), []);

  // Filter sales data
  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      const matchesSearch =
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || sale.status === statusFilter;
      // Implement date filtering as needed
      const matchesDate = dateFilter === "all" || true;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateFilter]);

  // Handle new invoice save
  const handleSaveInvoice = () => {
    setShowNewInvoice(false);
    // In a real app, you would add the new invoice to the salesData array
    // and update the state
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">المبيعات</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>إدارة وعرض فواتير المبيعات</DialogDescription>
          </DialogHeader>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-blue-700">إجمالي المبيعات</p>
                  <h3 className="text-xl font-bold text-blue-800 mt-1">
                    {formatCurrency(summary.totalSales)}
                  </h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {summary.totalInvoices} فاتورة
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">المبيعات المكتملة</p>
                  <h3 className="text-xl font-bold text-green-800 mt-1">
                    {formatCurrency(summary.totalCompleted)}
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                {summary.completedCount} فاتورة مكتملة
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-amber-700">المبالغ المحصلة</p>
                  <h3 className="text-xl font-bold text-amber-800 mt-1">
                    {formatCurrency(summary.totalPaid)}
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                {summary.paidCount} فاتورة مدفوعة
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-red-700">المبالغ المستحقة</p>
                  <h3 className="text-xl font-bold text-red-800 mt-1">
                    {formatCurrency(summary.totalUnpaid)}
                  </h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <p className="text-xs text-red-600 mt-2">
                {summary.unpaidCount} فاتورة غير مدفوعة
              </p>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="invoices">الفواتير</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    className="w-[200px] pr-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="h-9"
                >
                  <Filter className="h-4 w-4 ml-1" />
                  إعادة ضبط
                </Button>
                <Button className="h-9" onClick={() => setShowNewInvoice(true)}>
                  <Plus className="h-4 w-4 ml-1" />
                  فاتورة جديدة
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                  <SelectItem value="ملغي">ملغي</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-auto border rounded-md">
              <TabsContent
                value="invoices"
                className="h-full m-0 overflow-auto"
              >
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>حالة الدفع</TableHead>
                      <TableHead>عدد الأصناف</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.length > 0 ? (
                      filteredSales.map((sale) => (
                        <TableRow
                          key={sale.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">
                            {sale.id}
                          </TableCell>
                          <TableCell>{formatDate(sale.date)}</TableCell>
                          <TableCell>{sale.customer}</TableCell>
                          <TableCell>{formatCurrency(sale.amount)}</TableCell>
                          <TableCell>
                            <StatusBadge status={sale.status} />
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${sale.paymentStatus === "مدفوع" ? "bg-green-50 text-green-700 border-green-200" : sale.paymentStatus === "غير مدفوع" ? "bg-red-50 text-red-700 border-red-200" : sale.paymentStatus === "جزئي" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
                            >
                              {sale.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{sale.items}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-24 text-center text-muted-foreground"
                        >
                          لا توجد نتائج مطابقة للبحث
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent
                value="analytics"
                className="h-full m-0 overflow-auto p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      المبيعات الشهرية
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني للمبيعات الشهرية هنا
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      توزيع المبيعات حسب العملاء
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني لتوزيع المبيعات حسب العملاء هنا
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      توزيع المبيعات حسب المنتجات
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني لتوزيع المبيعات حسب المنتجات هنا
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      مؤشرات الأداء الرئيسية
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          متوسط قيمة الفاتورة
                        </p>
                        <p className="text-xl font-bold">
                          {formatCurrency(
                            summary.totalSales / summary.totalInvoices,
                          )}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          نسبة التحصيل
                        </p>
                        <p className="text-xl font-bold">
                          {Math.round(
                            (summary.totalPaid / summary.totalSales) * 100,
                          )}
                          %
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          نسبة الإكمال
                        </p>
                        <p className="text-xl font-bold">
                          {Math.round(
                            (summary.completedCount / summary.totalInvoices) *
                              100,
                          )}
                          %
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          متوسط عدد الأصناف
                        </p>
                        <p className="text-xl font-bold">
                          {Math.round(
                            salesData.reduce(
                              (sum, sale) => sum + sale.items,
                              0,
                            ) / salesData.length,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* New Invoice Dialog */}
      <Dialog
        open={showNewInvoice}
        onOpenChange={(open) => !open && setShowNewInvoice(false)}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                فاتورة مبيعات جديدة
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewInvoice(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>إنشاء فاتورة مبيعات جديدة</DialogDescription>
          </DialogHeader>

          <SalesInvoice onSave={handleSaveInvoice} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesPopup;
