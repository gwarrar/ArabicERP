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
  ShoppingBag,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Ship,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import PurchaseOrderForm from "./PurchaseOrderForm";
import PurchaseInvoiceDetails from "./PurchaseInvoiceDetails";

const PurchaseInvoicesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  // Sample purchase invoices data
  const [invoices, setInvoices] = useState([
    {
      id: "INV-2024-0125",
      externalId: "S-0458",
      supplier: "شركة الأمل للتوريدات",
      date: "2024-07-15",
      dueDate: "2024-08-15",
      branch: "كييف",
      amount: 45000,
      status: "pending",
      paymentStatus: "مدفوع",
      items: [
        { product: "مادة خام أ", quantity: 500, price: 50, total: 25000 },
        { product: "مادة خام ب", quantity: 200, price: 100, total: 20000 },
      ],
      relatedPO: "PO-2024-0125",
    },
    {
      id: "INV-2024-0124",
      externalId: "N-1234",
      supplier: "مؤسسة النور للتجارة",
      date: "2024-07-14",
      dueDate: "2024-08-14",
      branch: "خاركيف",
      amount: 32000,
      status: "received",
      paymentStatus: "غير مدفوع",
      items: [
        {
          product: "قطع غيار س",
          quantity: 40,
          actualQuantity: 38,
          actualWeight: 190,
          price: 500,
          total: 20000,
          notes: "نقص قطعتين عن الكمية المطلوبة",
        },
        {
          product: "قطع غيار ص",
          quantity: 60,
          actualQuantity: 60,
          actualWeight: 120,
          price: 200,
          total: 12000,
        },
      ],
      relatedPO: "PO-2024-0124",
      receivedDate: "2024-07-16",
    },
    {
      id: "INV-2024-0123",
      externalId: "F-5678",
      supplier: "شركة الفجر للمعدات",
      date: "2024-07-01",
      dueDate: "2024-07-31",
      branch: "أوديسا",
      amount: 28500,
      status: "added_to_container",
      paymentStatus: "جزئي",
      items: [
        {
          product: "معدات إنتاج",
          quantity: 1,
          actualQuantity: 1,
          price: 15000,
          total: 15000,
        },
        {
          product: "أدوات صيانة",
          quantity: 3,
          actualQuantity: 3,
          price: 4500,
          total: 13500,
        },
      ],
      relatedPO: "PO-2024-0123",
      receivedDate: "2024-07-15",
      containerId: "CNT-001",
      containerName: "كونتينر الملابس الشتوية",
    },
    {
      id: "INV-2024-0122",
      externalId: "S-0445",
      supplier: "مؤسسة السلام للتوريدات",
      date: "2024-06-15",
      dueDate: "2024-07-15",
      branch: "دنيبرو",
      amount: 18500,
      status: "approved",
      paymentStatus: "مدفوع",
      items: [
        { product: "مواد تعبئة", quantity: 1000, price: 10, total: 10000 },
        { product: "ملصقات", quantity: 5000, price: 1.7, total: 8500 },
      ],
      relatedPO: "PO-2024-0122",
    },
    {
      id: "INV-2024-0121",
      externalId: "B-9012",
      supplier: "شركة البركة للتجارة",
      date: "2024-06-01",
      dueDate: "2024-07-01",
      branch: "كييف",
      amount: 22000,
      status: "cancelled",
      paymentStatus: "مسترجع",
      items: [
        { product: "مواد خام ج", quantity: 300, price: 40, total: 12000 },
        { product: "مواد خام د", quantity: 200, price: 50, total: 10000 },
      ],
      relatedPO: "PO-2024-0121",
    },
  ]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const totalPurchases = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );
    const completedPurchases = invoices.filter(
      (invoice) =>
        invoice.status === "approved" ||
        invoice.status === "received" ||
        invoice.status === "added_to_container",
    );
    const totalCompleted = completedPurchases.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );
    const paidPurchases = invoices.filter(
      (invoice) => invoice.paymentStatus === "مدفوع",
    );
    const totalPaid = paidPurchases.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );
    const unpaidPurchases = invoices.filter(
      (invoice) => invoice.paymentStatus === "غير مدفوع",
    );
    const totalUnpaid = unpaidPurchases.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );

    return {
      totalPurchases,
      totalInvoices: invoices.length,
      totalCompleted,
      completedCount: completedPurchases.length,
      totalPaid,
      paidCount: paidPurchases.length,
      totalUnpaid,
      unpaidCount: unpaidPurchases.length,
    };
  }, [invoices]);

  // Filter purchase invoices data
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.externalId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;
      // Implement date filtering as needed
      const matchesDate = dateFilter === "all" || true;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateFilter, invoices]);

  // Handle new invoice save
  const handleSaveInvoice = () => {
    setShowNewInvoice(false);
    // In a real app, you would add the new invoice to the invoices array
    // and update the state
  };

  // Handle invoice update
  const handleUpdateInvoice = (updatedInvoice: any) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice,
    );
    setInvoices(updatedInvoices);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "approved":
        return "معتمدة";
      case "received":
        return "مستلمة";
      case "added_to_container":
        return "مضافة إلى كونتينر";
      case "completed":
        return "مكتملة";
      case "cancelled":
        return "ملغية";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "received":
        return "bg-purple-100 text-purple-800";
      case "added_to_container":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">فواتير المشتريات</h2>
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
              <span>إجمالي المشتريات</span>
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {formatCurrency(summary.totalPurchases)}
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {summary.totalInvoices} فاتورة
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-700 flex justify-between items-center">
              <span>المشتريات المكتملة</span>
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
              <span>المبالغ المدفوعة</span>
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
              <SelectItem value="pending">قيد الانتظار</SelectItem>
              <SelectItem value="approved">معتمدة</SelectItem>
              <SelectItem value="received">مستلمة</SelectItem>
              <SelectItem value="added_to_container">
                مضافة إلى كونتينر
              </SelectItem>
              <SelectItem value="completed">مكتملة</SelectItem>
              <SelectItem value="cancelled">ملغية</SelectItem>
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

      {/* Purchase Invoices Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>رقم الفاتورة</TableHead>
              <TableHead>رقم فاتورة المورد</TableHead>
              <TableHead>المورد</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>تاريخ الاستحقاق</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>حالة الدفع</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => {
                    setSelectedInvoice(invoice);
                    setShowInvoiceDetails(true);
                  }}
                >
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.externalId}</TableCell>
                  <TableCell>{invoice.supplier}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell>{invoice.branch}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusClass(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${invoice.paymentStatus === "مدفوع" ? "bg-green-50 text-green-700 border-green-200" : invoice.paymentStatus === "غير مدفوع" ? "bg-red-50 text-red-700 border-red-200" : invoice.paymentStatus === "جزئي" ? "bg-amber-50 text-amber-700 border-amber-200" : invoice.paymentStatus === "مسترجع" ? "bg-gray-50 text-gray-700 border-gray-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
                    >
                      {invoice.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      {invoice.status === "received" &&
                        !invoice.containerId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInvoice(invoice);
                              setShowInvoiceDetails(true);
                            }}
                          >
                            <Ship className="h-4 w-4 ml-1" />
                            كونتينر
                          </Button>
                        )}
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
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
                فاتورة مشتريات جديدة
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
            <DialogDescription>إنشاء فاتورة مشتريات جديدة</DialogDescription>
          </DialogHeader>

          <PurchaseOrderForm onSave={handleSaveInvoice} />
        </DialogContent>
      </Dialog>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <PurchaseInvoiceDetails
          open={showInvoiceDetails}
          onClose={() => setShowInvoiceDetails(false)}
          invoice={selectedInvoice}
          onSave={handleUpdateInvoice}
        />
      )}
    </div>
  );
};

export default PurchaseInvoicesTab;
