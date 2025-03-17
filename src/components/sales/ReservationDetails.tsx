import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Package,
  User,
  Warehouse,
  Tag,
  CheckCircle,
  XCircle,
  Printer,
  Download,
  ShoppingCart,
  Truck,
  AlertTriangle,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/types/reservation";
import { Textarea } from "@/components/ui/textarea";

interface ReservationDetailsProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  open,
  onClose,
  reservation,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Get status badge class
  const getStatusBadgeClass = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "canceled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "approved":
        return "تمت الموافقة";
      case "rejected":
        return "مرفوض";
      case "canceled":
        return "ملغي";
      case "completed":
        return "مكتمل";
      default:
        return status;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle approve reservation
  const handleApprove = () => {
    // In a real app, this would call an API to update the reservation status
    console.log("Approving reservation", reservation.id, approvalNotes);
    setShowApproveDialog(false);
    // Update the reservation status
    // Then close the dialog
    onClose();
  };

  // Handle reject reservation
  const handleReject = () => {
    // In a real app, this would call an API to update the reservation status
    console.log("Rejecting reservation", reservation.id, rejectionReason);
    setShowRejectDialog(false);
    // Update the reservation status
    // Then close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>تفاصيل الحجز: {reservation.reservationNumber}</span>
              <Badge
                variant="outline"
                className={`mr-2 ${getStatusBadgeClass(reservation.status)}`}
              >
                {getStatusText(reservation.status)}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 ml-2" />
              التفاصيل
            </TabsTrigger>
            <TabsTrigger value="items">
              <Package className="h-4 w-4 ml-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 ml-2" />
              سجل الحجز
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="text-lg font-medium mb-3">معلومات الحجز</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">رقم الحجز:</span>
                      <span className="font-medium">
                        {reservation.reservationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نوع الحجز:</span>
                      <span>
                        {reservation.type === "customer" ? "عميل" : "مدير"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ الإنشاء:
                      </span>
                      <span>{formatDate(reservation.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ الانتهاء:
                      </span>
                      <span>{formatDate(reservation.expiresAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحالة:</span>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeClass(reservation.status)}
                      >
                        {getStatusText(reservation.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        إجمالي المبلغ:
                      </span>
                      <span className="font-bold">
                        {reservation.totalAmount
                          ? reservation.totalAmount.toLocaleString()
                          : "0"}{" "}
                        ₴
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="text-lg font-medium mb-3">
                    {reservation.type === "customer"
                      ? "معلومات العميل"
                      : "معلومات المدير"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الاسم:</span>
                      <span>
                        {reservation.type === "customer"
                          ? reservation.customerName
                          : reservation.managerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        الرقم المرجعي:
                      </span>
                      <span>
                        {reservation.type === "customer"
                          ? reservation.customerId
                          : reservation.managerId}
                      </span>
                    </div>
                  </div>
                </div>

                {reservation.notes && (
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h3 className="text-lg font-medium mb-3">ملاحظات</h3>
                    <p>{reservation.notes}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {(reservation.status === "approved" ||
                  reservation.status === "completed") && (
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h3 className="text-lg font-medium mb-3 text-green-800">
                      <CheckCircle className="h-5 w-5 inline-block ml-2 text-green-600" />
                      معلومات الموافقة
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تمت الموافقة بواسطة:
                        </span>
                        <span>{reservation.approvedByName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تاريخ الموافقة:
                        </span>
                        <span>
                          {reservation.approvedAt
                            ? formatDate(reservation.approvedAt)
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {reservation.status === "rejected" && (
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h3 className="text-lg font-medium mb-3 text-red-800">
                      <XCircle className="h-5 w-5 inline-block ml-2 text-red-600" />
                      معلومات الرفض
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تم الرفض بواسطة:
                        </span>
                        <span>{reservation.rejectedByName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          تاريخ الرفض:
                        </span>
                        <span>
                          {reservation.rejectedAt
                            ? formatDate(reservation.rejectedAt)
                            : "-"}
                        </span>
                      </div>
                      {reservation.rejectionReason && (
                        <div>
                          <span className="text-muted-foreground block mb-1">
                            سبب الرفض:
                          </span>
                          <p className="p-2 bg-white rounded">
                            {reservation.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="text-lg font-medium mb-3">ملخص المنتجات</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        عدد المنتجات:
                      </span>
                      <span>{reservation.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        إجمالي الكمية:
                      </span>
                      <span>
                        {reservation.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المستودعات:</span>
                      <span>
                        {Array.from(
                          new Set(
                            reservation.items.map((item) => item.warehouseName),
                          ),
                        ).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {reservation.status === "pending" && (
                  <div className="p-4 border rounded-lg bg-amber-50">
                    <h3 className="text-lg font-medium mb-3 text-amber-800">
                      <AlertTriangle className="h-5 w-5 inline-block ml-2 text-amber-600" />
                      إجراءات الحجز
                    </h3>
                    <p className="text-sm text-amber-700 mb-4">
                      هذا الحجز بانتظار الموافقة. يرجى مراجعة التفاصيل واتخاذ
                      الإجراء المناسب.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => setShowApproveDialog(true)}
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        موافقة
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => setShowRejectDialog(true)}
                      >
                        <XCircle className="h-4 w-4 ml-2" />
                        رفض
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="items">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>المستودع</TableHead>
                    <TableHead>الإجمالي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservation.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell>{item.productSku}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        {item.price ? item.price.toLocaleString() : "0"} ₴
                      </TableCell>
                      <TableCell>{item.warehouseName || "-"}</TableCell>
                      <TableCell className="font-bold">
                        {item.totalAmount
                          ? item.totalAmount.toLocaleString()
                          : "0"}{" "}
                        ₴
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-left font-bold text-lg"
                    >
                      الإجمالي
                    </TableCell>
                    <TableCell className="font-bold text-lg">
                      {reservation.totalAmount
                        ? reservation.totalAmount.toLocaleString()
                        : "0"}{" "}
                      ₴
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {reservation.items.some((item) => item.fabricRollIds?.length) && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  رولونات القماش المحجوزة
                </h3>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservation.items
                      .filter((item) => item.fabricRollIds?.length)
                      .map((item) => (
                        <div
                          key={`rolls-${item.id}`}
                          className="p-3 border rounded-md bg-white"
                        >
                          <div className="font-medium mb-2">
                            {item.productName}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {item.productSku}
                          </div>
                          <div className="space-y-1">
                            {item.fabricRollIds?.map((rollId, index) => (
                              <div
                                key={rollId}
                                className="flex items-center justify-between text-sm p-1 bg-blue-50 rounded"
                              >
                                <div className="flex items-center">
                                  <Tag className="h-3 w-3 ml-1 text-blue-600" />
                                  <span>{rollId}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  محجوز
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="text-lg font-medium mb-3">سجل الإجراءات</h3>
              <div className="space-y-4">
                {/* This would be populated from actual history data */}
                <div className="relative pr-8 pb-4 border-r-2 border-gray-200">
                  <div className="absolute right-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="mb-1 font-medium">إنشاء الحجز</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(reservation.createdAt)}
                  </div>
                  <div className="text-sm mt-1">
                    تم إنشاء الحجز بواسطة{" "}
                    {reservation.type === "customer"
                      ? reservation.customerName
                      : reservation.managerName}
                  </div>
                </div>

                {reservation.status === "approved" && (
                  <div className="relative pr-8 pb-4 border-r-2 border-gray-200">
                    <div className="absolute right-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="mb-1 font-medium">الموافقة على الحجز</div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.approvedAt
                        ? formatDate(reservation.approvedAt)
                        : "-"}
                    </div>
                    <div className="text-sm mt-1">
                      تمت الموافقة على الحجز بواسطة {reservation.approvedByName}
                    </div>
                  </div>
                )}

                {reservation.status === "rejected" && (
                  <div className="relative pr-8 pb-4 border-r-2 border-gray-200">
                    <div className="absolute right-[-8px] top-0 w-4 h-4 rounded-full bg-red-500"></div>
                    <div className="mb-1 font-medium">رفض الحجز</div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.rejectedAt
                        ? formatDate(reservation.rejectedAt)
                        : "-"}
                    </div>
                    <div className="text-sm mt-1">
                      تم رفض الحجز بواسطة {reservation.rejectedByName}
                    </div>
                    {reservation.rejectionReason && (
                      <div className="text-sm mt-1 p-2 bg-red-50 rounded">
                        سبب الرفض: {reservation.rejectionReason}
                      </div>
                    )}
                  </div>
                )}

                {reservation.status === "completed" && (
                  <div className="relative pr-8 pb-4 border-r-2 border-gray-200">
                    <div className="absolute right-[-8px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="mb-1 font-medium">اكتمال الحجز</div>
                    <div className="text-sm text-muted-foreground">
                      {/* This would be the completion date */}
                      {formatDate(new Date().toISOString())}
                    </div>
                    <div className="text-sm mt-1">
                      تم تسليم المنتجات المحجوزة بنجاح
                    </div>
                  </div>
                )}

                {reservation.status === "canceled" && (
                  <div className="relative pr-8 pb-4 border-r-2 border-gray-200">
                    <div className="absolute right-[-8px] top-0 w-4 h-4 rounded-full bg-gray-500"></div>
                    <div className="mb-1 font-medium">إلغاء الحجز</div>
                    <div className="text-sm text-muted-foreground">
                      {/* This would be the cancellation date */}
                      {formatDate(new Date().toISOString())}
                    </div>
                    <div className="text-sm mt-1">
                      تم إلغاء الحجز{" "}
                      {reservation.type === "customer"
                        ? "بواسطة العميل"
                        : "بواسطة المدير"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <div className="flex justify-between w-full">
            <div>
              <Button variant="outline" onClick={onClose}>
                إغلاق
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="ml-2 h-4 w-4" />
                طباعة
              </Button>
              {reservation.status === "approved" && (
                <Button>
                  <ShoppingCart className="ml-2 h-4 w-4" />
                  إنشاء فاتورة
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>

        {/* Approve Dialog */}
        <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>الموافقة على الحجز</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">
                هل أنت متأكد من الموافقة على هذا الحجز؟ سيتم حجز المنتجات
                المطلوبة للعميل.
              </p>
              <div className="space-y-2">
                <label
                  htmlFor="approval-notes"
                  className="text-sm font-medium block"
                >
                  ملاحظات (اختياري)
                </label>
                <Textarea
                  id="approval-notes"
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="أدخل أي ملاحظات إضافية هنا..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApproveDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={handleApprove}>
                <CheckCircle className="ml-2 h-4 w-4" />
                موافقة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>رفض الحجز</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">يرجى تقديم سبب لرفض هذا الحجز.</p>
              <div className="space-y-2">
                <label
                  htmlFor="rejection-reason"
                  className="text-sm font-medium block"
                >
                  سبب الرفض *
                </label>
                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="أدخل سبب الرفض هنا..."
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRejectDialog(false)}
              >
                إلغاء
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
              >
                <XCircle className="ml-2 h-4 w-4" />
                رفض
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetails;
