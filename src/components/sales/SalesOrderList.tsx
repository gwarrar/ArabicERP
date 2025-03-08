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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  FileText,
  Eye,
  Printer,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import { ukrainianBranches } from "@/data/branches";
import { recentSalesOrders } from "@/data/salesData";
import { SalesOrderForm } from "./SalesOrderForm";

const SalesOrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Filter orders based on search term, branch, and status
  const filteredOrders = recentSalesOrders.filter((order) => {
    const matchesSearch = searchTerm
      ? order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesBranch =
      selectedBranch === "all" || order.branch === selectedBranch;

    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">طلبات المبيعات</h2>
        <Button onClick={() => setShowNewOrderDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          طلب جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث في الطلبات..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="completed">مكتملة</option>
              <option value="pending">معلقة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>

          <Button variant="outline">
            <FileText className="ml-1 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>تاريخ الاستحقاق</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>حالة الطلب</TableHead>
              <TableHead>حالة الدفع</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد طلبات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleOrderClick(order)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.dueDate}</TableCell>
                  <TableCell>{order.branch}</TableCell>
                  <TableCell>{order.amount.toLocaleString()} ₴</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      } rounded-full`}
                    >
                      {order.status === "completed"
                        ? "مكتملة"
                        : order.status === "pending"
                          ? "معلقة"
                          : "ملغية"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      } rounded-full`}
                    >
                      {order.paymentStatus === "paid"
                        ? "مدفوعة"
                        : order.paymentStatus === "pending"
                          ? "معلقة"
                          : "ملغية"}
                    </span>
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
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* New Order Dialog */}
      <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>طلب مبيعات جديد</DialogTitle>
          </DialogHeader>
          <SalesOrderForm onSave={() => setShowNewOrderDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب المبيعات - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">العميل</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الفرع</p>
                  <p className="font-medium">{selectedOrder.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ الطلب</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الاستحقاق
                  </p>
                  <p className="font-medium">{selectedOrder.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حالة الطلب</p>
                  <span
                    className={`px-2 py-1 text-xs ${
                      selectedOrder.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    } rounded-full`}
                  >
                    {selectedOrder.status === "completed"
                      ? "مكتملة"
                      : selectedOrder.status === "pending"
                        ? "معلقة"
                        : "ملغية"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حالة الدفع</p>
                  <span
                    className={`px-2 py-1 text-xs ${
                      selectedOrder.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    } rounded-full`}
                  >
                    {selectedOrder.paymentStatus === "paid"
                      ? "مدفوعة"
                      : selectedOrder.paymentStatus === "pending"
                        ? "معلقة"
                        : "ملغية"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">بنود الطلب</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">
                          سعر الوحدة
                        </TableHead>
                        <TableHead className="text-center">الخصم</TableHead>
                        <TableHead className="text-center">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.price} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            {item.discount} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            {item.total} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      المجموع الفرعي:
                    </span>
                    <span>
                      {selectedOrder.items
                        .reduce(
                          (sum: number, item: any) =>
                            sum + item.price * item.quantity,
                          0,
                        )
                        .toLocaleString()}{" "}
                      ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">إجمالي الخصم:</span>
                    <span>
                      {selectedOrder.items
                        .reduce(
                          (sum: number, item: any) => sum + item.discount,
                          0,
                        )
                        .toLocaleString()}{" "}
                      ₴
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>الإجمالي:</span>
                    <span>{selectedOrder.amount.toLocaleString()} ₴</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button variant="outline">تحويل إلى فاتورة</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowOrderDetails(false)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SalesOrderList;
