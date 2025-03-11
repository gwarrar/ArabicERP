import React, { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  X,
  Plus,
  Download,
  Printer,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import SalesInvoice from "./SalesInvoice";
import SalesInvoiceDetails from "./SalesInvoiceDetails";

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

const SalesInvoicesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">فواتير المبيعات</h2>
        <Button onClick={() => setShowNewInvoice(true)}>
          <Plus className="ml-2 h-4 w-4" />
          فاتورة جديدة
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-700 flex justify-between items-center">
              <span>إجمالي المبيعات</span>
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {formatCurrency(summary.totalSales)}
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {summary.totalInvoices} فاتورة
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-700 flex justify-between items-center">
              <span>المبيعات المكتملة</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {formatCurrency(summary.totalCompleted)}
            </div>
            <p className="text-sm text-green-600 mt-1">
              {summary.completedCount} فاتورة مكتملة
            </p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700 flex justify-between items-center">
              <span>المبالغ المحصلة</span>
              <DollarSign className="h-5 w-5 text-amber-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">
              {formatCurrency(summary.totalPaid)}
            </div>
            <p className="text-sm text-amber-600 mt-1">
              {summary.paidCount} فاتورة مدفوعة
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-red-700 flex justify-between items-center">
              <span>المبالغ المستحقة</span>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">
              {formatCurrency(summary.totalUnpaid)}
            </div>
            <p className="text-sm text-red-600 mt-1">
              {summary.unpaidCount} فاتورة غير مدفوعة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
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

          <Button variant="outline" size="sm" onClick={resetFilters}>
            <Filter className="h-4 w-4 ml-1" />
            إعادة ضبط
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 ml-1" />
            طباعة
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
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
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => setSelectedInvoice(sale)}
                >
                  <TableCell className="font-medium">{sale.id}</TableCell>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoice(sale);
                      }}
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
      </div>

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

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <SalesInvoiceDetails
          open={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default SalesInvoicesTab;
