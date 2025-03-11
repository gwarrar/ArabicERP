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
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Calendar,
  User,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Truck,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import PurchaseOrderForm from "./PurchaseOrderForm";

// Sample purchases data
const purchasesData = [
  {
    id: "PO-2024-0001",
    date: "2024-07-20",
    supplier: "شركة المتحدة للتوريدات",
    amount: 25000,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 8,
  },
  {
    id: "PO-2024-0002",
    date: "2024-07-19",
    supplier: "مصنع الجودة للأقمشة",
    amount: 18500,
    status: "مكتمل",
    paymentStatus: "غير مدفوع",
    items: 5,
  },
  {
    id: "PO-2024-0003",
    date: "2024-07-18",
    supplier: "شركة الإمداد العالمية",
    amount: 32000,
    status: "قيد التنفيذ",
    paymentStatus: "جزئي",
    items: 12,
  },
  {
    id: "PO-2024-0004",
    date: "2024-07-17",
    supplier: "مصنع الشرق للخيوط",
    amount: 15500,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 6,
  },
  {
    id: "PO-2024-0005",
    date: "2024-07-16",
    supplier: "شركة التقنية للمعدات",
    amount: 28000,
    status: "ملغي",
    paymentStatus: "مسترجع",
    items: 9,
  },
  {
    id: "PO-2024-0006",
    date: "2024-07-15",
    supplier: "شركة المتحدة للتوريدات",
    amount: 12500,
    status: "مكتمل",
    paymentStatus: "مدفوع",
    items: 4,
  },
  {
    id: "PO-2024-0007",
    date: "2024-07-14",
    supplier: "مصنع الجودة للأقمشة",
    amount: 22000,
    status: "مكتمل",
    paymentStatus: "غير مدفوع",
    items: 7,
  },
];

// Calculate summary statistics
const calculateSummary = () => {
  const totalPurchases = purchasesData.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );
  const completedPurchases = purchasesData.filter(
    (purchase) => purchase.status === "مكتمل",
  );
  const totalCompleted = completedPurchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );
  const paidPurchases = purchasesData.filter(
    (purchase) => purchase.paymentStatus === "مدفوع",
  );
  const totalPaid = paidPurchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );
  const unpaidPurchases = purchasesData.filter(
    (purchase) => purchase.paymentStatus === "غير مدفوع",
  );
  const totalUnpaid = unpaidPurchases.reduce(
    (sum, purchase) => sum + purchase.amount,
    0,
  );

  return {
    totalPurchases,
    totalOrders: purchasesData.length,
    totalCompleted,
    completedCount: completedPurchases.length,
    totalPaid,
    paidCount: paidPurchases.length,
    totalUnpaid,
    unpaidCount: unpaidPurchases.length,
  };
};

interface PurchasesPopupProps {
  open: boolean;
  onClose: () => void;
}

const PurchasesPopup: React.FC<PurchasesPopupProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showNewOrder, setShowNewOrder] = useState(false);

  // Calculate summary (memoized)
  const summary = useMemo(() => calculateSummary(), []);

  // Filter purchases data
  const filteredPurchases = useMemo(() => {
    return purchasesData.filter((purchase) => {
      const matchesSearch =
        purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || purchase.status === statusFilter;
      // Implement date filtering as needed
      const matchesDate = dateFilter === "all" || true;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, statusFilter, dateFilter]);

  // Handle new purchase order save
  const handleSaveOrder = () => {
    setShowNewOrder(false);
    // In a real app, you would add the new order to the purchasesData array
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
              <DialogTitle className="text-xl font-bold">المشتريات</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>إدارة وعرض أوامر الشراء</DialogDescription>
          </DialogHeader>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-blue-700">إجمالي المشتريات</p>
                  <h3 className="text-xl font-bold text-blue-800 mt-1">
                    {formatCurrency(summary.totalPurchases)}
                  </h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {summary.totalOrders} أمر شراء
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-700">المشتريات المكتملة</p>
                  <h3 className="text-xl font-bold text-green-800 mt-1">
                    {formatCurrency(summary.totalCompleted)}
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                {summary.completedCount} أمر مكتمل
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-amber-700">المبالغ المدفوعة</p>
                  <h3 className="text-xl font-bold text-amber-800 mt-1">
                    {formatCurrency(summary.totalPaid)}
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                {summary.paidCount} أمر مدفوع
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
                {summary.unpaidCount} أمر غير مدفوع
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
                <TabsTrigger value="orders">أوامر الشراء</TabsTrigger>
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
                <Button className="h-9" onClick={() => setShowNewOrder(true)}>
                  <Plus className="h-4 w-4 ml-1" />
                  أمر شراء جديد
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
              <TabsContent value="orders" className="h-full m-0 overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white">
                    <TableRow>
                      <TableHead>رقم أمر الشراء</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المورد</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>حالة الدفع</TableHead>
                      <TableHead>عدد الأصناف</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPurchases.length > 0 ? (
                      filteredPurchases.map((purchase) => (
                        <TableRow
                          key={purchase.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">
                            {purchase.id}
                          </TableCell>
                          <TableCell>{formatDate(purchase.date)}</TableCell>
                          <TableCell>{purchase.supplier}</TableCell>
                          <TableCell>
                            {formatCurrency(purchase.amount)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={purchase.status} />
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${purchase.paymentStatus === "مدفوع" ? "bg-green-50 text-green-700 border-green-200" : purchase.paymentStatus === "غير مدفوع" ? "bg-red-50 text-red-700 border-red-200" : purchase.paymentStatus === "جزئي" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
                            >
                              {purchase.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{purchase.items}</TableCell>
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
                      المشتريات الشهرية
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني للمشتريات الشهرية هنا
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      توزيع المشتريات حسب الموردين
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني لتوزيع المشتريات حسب الموردين هنا
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">
                      توزيع المشتريات حسب المنتجات
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        سيتم عرض رسم بياني لتوزيع المشتريات حسب المنتجات هنا
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
                          متوسط قيمة أمر الشراء
                        </p>
                        <p className="text-xl font-bold">
                          {formatCurrency(
                            summary.totalPurchases / summary.totalOrders,
                          )}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          نسبة الدفع
                        </p>
                        <p className="text-xl font-bold">
                          {Math.round(
                            (summary.totalPaid / summary.totalPurchases) * 100,
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
                            (summary.completedCount / summary.totalOrders) *
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
                            purchasesData.reduce(
                              (sum, purchase) => sum + purchase.items,
                              0,
                            ) / purchasesData.length,
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

      {/* New Purchase Order Dialog */}
      <Dialog
        open={showNewOrder}
        onOpenChange={(open) => !open && setShowNewOrder(false)}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                أمر شراء جديد
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewOrder(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>إنشاء أمر شراء جديد</DialogDescription>
          </DialogHeader>

          <PurchaseOrderForm onSave={handleSaveOrder} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchasesPopup;
