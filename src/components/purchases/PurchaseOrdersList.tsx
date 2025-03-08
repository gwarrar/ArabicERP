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
  Calendar,
} from "lucide-react";
import { ukrainianBranches } from "@/data/branches";
import PurchaseOrderForm from "./PurchaseOrderForm";

const PurchaseOrdersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Sample purchase orders data
  const purchaseOrders = [
    {
      id: "PO-2024-0125",
      supplier: "شركة الأمل للتوريدات",
      date: "2024-07-15",
      expectedDelivery: "2024-07-22",
      branch: "كييف",
      amount: 45000,
      status: "approved",
      items: [
        { product: "مادة خام أ", quantity: 500, price: 50, total: 25000 },
        { product: "مادة خام ب", quantity: 200, price: 100, total: 20000 },
      ],
    },
    {
      id: "PO-2024-0124",
      supplier: "مؤسسة النور للتجارة",
      date: "2024-07-14",
      expectedDelivery: "2024-07-21",
      branch: "خاركيف",
      amount: 32000,
      status: "sent",
      items: [
        { product: "قطع غيار س", quantity: 40, price: 500, total: 20000 },
        { product: "قطع غيار ص", quantity: 60, price: 200, total: 12000 },
      ],
    },
    {
      id: "PO-2024-0123",
      supplier: "شركة الفجر للمعدات",
      date: "2024-07-12",
      expectedDelivery: "2024-07-19",
      branch: "أوديسا",
      amount: 28500,
      status: "draft",
      items: [
        { product: "معدات إنتاج", quantity: 1, price: 15000, total: 15000 },
        { product: "أدوات صيانة", quantity: 3, price: 4500, total: 13500 },
      ],
    },
    {
      id: "PO-2024-0122",
      supplier: "مؤسسة السلام للتوريدات",
      date: "2024-07-10",
      expectedDelivery: "2024-07-17",
      branch: "دنيبرو",
      amount: 18500,
      status: "partially_received",
      items: [
        { product: "مواد تعبئة", quantity: 1000, price: 10, total: 10000 },
        { product: "ملصقات", quantity: 5000, price: 1.7, total: 8500 },
      ],
    },
    {
      id: "PO-2024-0121",
      supplier: "شركة البركة للتجارة",
      date: "2024-07-08",
      expectedDelivery: "2024-07-15",
      branch: "كييف",
      amount: 22000,
      status: "fully_received",
      items: [
        { product: "مواد خام ج", quantity: 300, price: 40, total: 12000 },
        { product: "مواد خام د", quantity: 200, price: 50, total: 10000 },
      ],
    },
  ];

  // Filter orders based on search term, branch, and status
  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch = searchTerm
      ? order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "مسودة";
      case "approved":
        return "معتمد";
      case "sent":
        return "مرسل";
      case "partially_received":
        return "مستلم جزئياً";
      case "fully_received":
        return "مستلم بالكامل";
      case "cancelled":
        return "ملغي";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-amber-100 text-amber-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "partially_received":
        return "bg-purple-100 text-purple-800";
      case "fully_received":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">طلبات الشراء</h2>
        <Button onClick={() => setShowNewOrderDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          طلب شراء جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث برقم الطلب أو اسم المورد..."
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
              <option value="draft">مسودة</option>
              <option value="approved">معتمد</option>
              <option value="sent">مرسل</option>
              <option value="partially_received">مستلم جزئياً</option>
              <option value="fully_received">مستلم بالكامل</option>
              <option value="cancelled">ملغي</option>
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
              <TableHead>المورد</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>تاريخ التسليم المتوقع</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead className="text-left">المبلغ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
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
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell>{order.branch}</TableCell>
                  <TableCell className="text-left">
                    {order.amount.toLocaleString()} ₴
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${getStatusClass(order.status)} rounded-full`}
                    >
                      {getStatusText(order.status)}
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

      {/* New Purchase Order Dialog */}
      <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>طلب شراء جديد</DialogTitle>
          </DialogHeader>
          <PurchaseOrderForm onSave={() => setShowNewOrderDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Purchase Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب الشراء - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">المورد</p>
                  <p className="font-medium">{selectedOrder.supplier}</p>
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
                    تاريخ التسليم المتوقع
                  </p>
                  <p className="font-medium">
                    {selectedOrder.expectedDelivery}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حالة الطلب</p>
                  <span
                    className={`px-2 py-1 text-xs ${getStatusClass(selectedOrder.status)} rounded-full`}
                  >
                    {getStatusText(selectedOrder.status)}
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
                            {item.total.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                  <div className="flex justify-between font-bold text-lg pt-2">
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
                {selectedOrder.status === "draft" && (
                  <Button variant="outline">تعديل</Button>
                )}
                {selectedOrder.status === "approved" && (
                  <Button variant="outline">إرسال للمورد</Button>
                )}
                {(selectedOrder.status === "sent" ||
                  selectedOrder.status === "partially_received") && (
                  <Button variant="outline">تسجيل استلام</Button>
                )}
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

export default PurchaseOrdersList;
