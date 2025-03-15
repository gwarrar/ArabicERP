import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  User,
  ShoppingCart,
  DollarSign,
  Printer,
  Edit,
  X,
  FileText,
  CheckCircle,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import SalesInvoice from "./SalesInvoice";

// Sample invoice items data
const sampleInvoiceItems = [
  {
    id: "1",
    name: "قميص رجالي",
    sku: "SH-M-001",
    quantity: 3,
    unitPrice: 1500,
    discount: 0,
    tax: 675,
    total: 5175,
  },
  {
    id: "2",
    name: "بنطلون جينز",
    sku: "PT-J-002",
    quantity: 2,
    unitPrice: 2200,
    discount: 200,
    tax: 630,
    total: 4830,
  },
  {
    id: "3",
    name: "حذاء رياضي",
    sku: "SH-S-003",
    quantity: 1,
    unitPrice: 3500,
    discount: 0,
    tax: 525,
    total: 4025,
  },
];

interface SalesInvoiceDetailsProps {
  open: boolean;
  onClose: () => void;
  invoice: any; // Replace with proper type
}

const SalesInvoiceDetails: React.FC<SalesInvoiceDetailsProps> = ({
  open,
  onClose,
  invoice,
}) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Calculate totals
  const subtotal = sampleInvoiceItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const totalDiscount = sampleInvoiceItems.reduce(
    (sum, item) => sum + item.discount,
    0,
  );
  const totalTax = sampleInvoiceItems.reduce((sum, item) => sum + item.tax, 0);
  const total = subtotal - totalDiscount + totalTax;

  // Handle print invoice
  const handlePrint = () => {
    // Implement print functionality
    console.log("Printing invoice:", invoice.id);
    window.print();
  };

  // Handle edit invoice
  const handleEdit = () => {
    setShowEditDialog(true);
  };

  // Handle save edited invoice
  const handleSaveEdit = () => {
    setShowEditDialog(false);
    // In a real app, you would save the edited invoice
    console.log("Saving edited invoice:", invoice.id);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                تفاصيل فاتورة المبيعات
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
            <DialogDescription>
              عرض تفاصيل الفاتورة رقم {invoice.id}
            </DialogDescription>
          </DialogHeader>

          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 ml-2" />
                  معلومات الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الفاتورة:</span>
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>{formatDate(invoice.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحالة:</span>
                  <StatusBadge status={invoice.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">حالة الدفع:</span>
                  <Badge
                    variant="outline"
                    className={`${invoice.paymentStatus === "مدفوع" ? "bg-green-50 text-green-700 border-green-200" : invoice.paymentStatus === "غير مدفوع" ? "bg-red-50 text-red-700 border-red-200" : invoice.paymentStatus === "جزئي" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
                  >
                    {invoice.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <User className="h-4 w-4 ml-2" />
                  معلومات العميل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العميل:</span>
                  <span className="font-medium">{invoice.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span>0501234567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    البريد الإلكتروني:
                  </span>
                  <span>info@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العنوان:</span>
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <DollarSign className="h-4 w-4 ml-2" />
                  ملخص الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    المبلغ الإجمالي:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(invoice.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الأصناف:</span>
                  <span>{invoice.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">طريقة الدفع:</span>
                  <span>نقدي</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المستودع:</span>
                  <span>المستودع الرئيسي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoice Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">بنود الفاتورة</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead>رمز المنتج</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-center">سعر الوحدة</TableHead>
                    <TableHead className="text-center">الخصم</TableHead>
                    <TableHead className="text-center">الضريبة</TableHead>
                    <TableHead className="text-center">الإجمالي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInvoiceItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.unitPrice.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.discount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.tax.toLocaleString()} ₴
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

          {/* Invoice Summary */}
          <div className="flex justify-end mb-6">
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي:</span>
                <span>{subtotal.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي الخصم:</span>
                <span>{totalDiscount.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  إجمالي الضريبة (15%):
                </span>
                <span>{totalTax.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>الإجمالي:</span>
                <span>{total.toLocaleString()} ₴</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">ملاحظات</h3>
            <div className="border rounded-lg p-3 bg-muted/20">
              <p className="text-muted-foreground">
                شكراً لتعاملكم معنا. نأمل أن تكونوا راضين عن خدماتنا.
              </p>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 justify-end w-full">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="ml-2 h-4 w-4" />
                طباعة
              </Button>
              <Button onClick={handleEdit}>
                <Edit className="ml-2 h-4 w-4" />
                تعديل
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => !open && setShowEditDialog(false)}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                تعديل فاتورة المبيعات
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEditDialog(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              تعديل الفاتورة رقم {invoice.id}
            </DialogDescription>
          </DialogHeader>

          <SalesInvoice onSave={handleSaveEdit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesInvoiceDetails;
