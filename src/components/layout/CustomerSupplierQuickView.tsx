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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Printer,
  Edit,
  X,
  FileText,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Receipt,
  BarChart2,
  ArrowRight,
  Download,
  ExternalLink,
  Plus,
} from "lucide-react";

interface CustomerSupplierQuickViewProps {
  open: boolean;
  onClose: () => void;
  data: any;
  type: "customer" | "supplier";
}

const CustomerSupplierQuickView: React.FC<CustomerSupplierQuickViewProps> = ({
  open,
  onClose,
  data,
  type,
}) => {
  const [activeTab, setActiveTab] = useState("ledger");

  // بيانات تجريبية للمعاملات
  const transactions = [
    {
      id: "TRX-001",
      date: "2023-12-01",
      type: "فاتورة",
      reference: "INV-2023-0123",
      description: type === "customer" ? "فاتورة مبيعات" : "فاتورة مشتريات",
      debit: type === "customer" ? 0 : 105000,
      credit: type === "customer" ? 105000 : 0,
      balance: type === "customer" ? -105000 : 105000,
    },
    {
      id: "TRX-002",
      date: "2023-12-05",
      type: "دفعة",
      reference: "PAY-2023-0089",
      description: "دفعة جزئية - فاتورة INV-2023-0123",
      debit: type === "customer" ? 50000 : 0,
      credit: type === "customer" ? 0 : 50000,
      balance: type === "customer" ? -55000 : 55000,
    },
    {
      id: "TRX-003",
      date: "2023-12-20",
      type: "فاتورة",
      reference: "INV-2023-0145",
      description: type === "customer" ? "فاتورة مبيعات" : "فاتورة مشتريات",
      debit: type === "customer" ? 0 : 35000,
      credit: type === "customer" ? 35000 : 0,
      balance: type === "customer" ? -90000 : 90000,
    },
  ];

  // بيانات تجريبية للفواتير
  const invoices = [
    {
      id: "INV-2023-0123",
      date: "2023-12-01",
      dueDate: "2023-12-31",
      amount: 105000,
      status: "مدفوعة",
      items: 12,
      paymentStatus: "paid",
    },
    {
      id: "INV-2023-0145",
      date: "2023-12-20",
      dueDate: "2024-01-19",
      amount: 35000,
      status: "مدفوعة",
      items: 5,
      paymentStatus: "paid",
    },
  ];

  // بيانات تجريبية للمدفوعات
  const payments = [
    {
      id: "PAY-2023-0089",
      date: "2023-12-05",
      amount: 50000,
      method: "تحويل بنكي",
      reference: "INV-2023-0123",
      notes: "دفعة جزئية",
    },
  ];

  // حساب إجماليات
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = payments.reduce((sum, pay) => sum + pay.amount, 0);
  const balance = totalAmount - totalPaid;

  // تحديد لون حالة الدفع
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partially_paid":
        return "bg-amber-100 text-amber-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // تحديد نص حالة الدفع
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "مدفوعة";
      case "partially_paid":
        return "مدفوعة جزئياً";
      case "pending":
        return "قيد الانتظار";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {type === "customer" ? "بيانات العميل" : "بيانات المورد"}
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

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 ml-2" />
                معلومات {type === "customer" ? "العميل" : "المورد"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الاسم:</span>
                <span className="font-medium">{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الرقم المرجعي:</span>
                <span>{data.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">البلد:</span>
                <span>{data.country || "غير محدد"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المدينة:</span>
                <span>{data.city || "غير محدد"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge
                  className={
                    data.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {data.status === "active" ? "نشط" : "غير نشط"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                معلومات الاتصال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">جهة الاتصال:</span>
                <span>{data.contactPerson || "غير محدد"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  البريد الإلكتروني:
                </span>
                <span className="text-blue-600 hover:underline">
                  {data.email || "غير محدد"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الهاتف:</span>
                <span dir="ltr">{data.phone || "غير محدد"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">العنوان:</span>
                <span>{data.address || "غير محدد"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  الموقع الإلكتروني:
                </span>
                <span className="text-blue-600 hover:underline">
                  {data.website || "-"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <DollarSign className="h-4 w-4 ml-2" />
                ملخص الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  إجمالي {type === "customer" ? "المبيعات" : "المشتريات"}:
                </span>
                <span className="font-medium">
                  {totalAmount.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المدفوعات:</span>
                <span className="text-green-600">
                  {totalPaid.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">الرصيد الحالي:</span>
                <span
                  className={balance > 0 ? "text-red-600" : "text-green-600"}
                >
                  {balance.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شروط الدفع:</span>
                <span>{data.paymentTerms || "30 يوم"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">العملة:</span>
                <span>₴ (هريفنيا أوكرانية)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="ledger">
              <FileText className="h-4 w-4 ml-2" />
              دفتر الأستاذ
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <Receipt className="h-4 w-4 ml-2" />
              الفواتير
            </TabsTrigger>
            <TabsTrigger value="payments">
              <DollarSign className="h-4 w-4 ml-2" />
              المدفوعات
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart2 className="h-4 w-4 ml-2" />
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          {/* دفتر الأستاذ */}
          <TabsContent value="ledger" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">دفتر الأستاذ</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead className="text-center">مدين</TableHead>
                    <TableHead className="text-center">دائن</TableHead>
                    <TableHead className="text-center">الرصيد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className="text-center">
                        {transaction.debit > 0
                          ? transaction.debit.toLocaleString() + " ₴"
                          : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {transaction.credit > 0
                          ? transaction.credit.toLocaleString() + " ₴"
                          : "-"}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {Math.abs(transaction.balance).toLocaleString()}{" "}
                        {transaction.balance < 0 ? "لنا" : "علينا"} ₴
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* الفواتير */}
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                فواتير {type === "customer" ? "المبيعات" : "المشتريات"}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  فاتورة جديدة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>تاريخ الاستحقاق</TableHead>
                    <TableHead className="text-center">عدد الأصناف</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-center">
                        {invoice.items}
                      </TableCell>
                      <TableCell className="text-center">
                        {invoice.amount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={getPaymentStatusColor(
                            invoice.paymentStatus,
                          )}
                        >
                          {getPaymentStatusText(invoice.paymentStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* المدفوعات */}
          <TabsContent value="payments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">المدفوعات</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4 ml-1" />
                  دفعة جديدة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الدفعة</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>المرجع</TableHead>
                    <TableHead>طريقة الدفع</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead>ملاحظات</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {payment.id}
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-center">
                        {payment.amount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>{payment.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* الإحصائيات */}
          <TabsContent value="stats" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                إحصائيات {type === "customer" ? "العميل" : "المورد"}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 ml-1" />
                  طباعة
                </Button>
              </div>
            </div>

            <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
              <span className="text-muted-foreground">
                رسم بياني للمعاملات الشهرية
              </span>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <div className="flex items-start">
                <FileText className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
                <div>
                  <h3 className="font-medium mb-1">معلومات إضافية</h3>
                  <p className="text-sm">
                    يمكنك الحصول على تقارير مفصلة عن هذا{" "}
                    {type === "customer" ? "العميل" : "المورد"} من خلال قسم
                    التقارير. تتضمن التقارير تحليلات للمعاملات والمدفوعات على
                    مدار فترات زمنية مختلفة.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={onClose}>
              <X className="ml-2 h-4 w-4" />
              إغلاق
            </Button>
            <Button
              onClick={() => {
                window.location.href =
                  type === "customer" ? "/sales" : "/purchases";
              }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              الانتقال إلى صفحة {type === "customer" ? "المبيعات" : "المشتريات"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSupplierQuickView;
