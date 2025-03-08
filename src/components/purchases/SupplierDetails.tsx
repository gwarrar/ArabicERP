import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Edit,
  AlertTriangle,
  Star,
  FileText,
  Calendar,
  Filter,
  Eye,
  Download,
  Printer,
} from "lucide-react";

interface SupplierDetailsProps {
  supplier: any;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ supplier }) => {
  const [activeTab, setActiveTab] = useState("info");

  // Sample purchase orders for this supplier
  const purchaseOrders = [
    {
      id: "PO-2024-0125",
      date: "2024-07-15",
      expectedDelivery: "2024-07-22",
      amount: 45000,
      status: "approved",
    },
    {
      id: "PO-2024-0110",
      date: "2024-07-01",
      expectedDelivery: "2024-07-08",
      amount: 38000,
      status: "fully_received",
    },
    {
      id: "PO-2024-0095",
      date: "2024-06-15",
      expectedDelivery: "2024-06-22",
      amount: 42000,
      status: "fully_received",
    },
  ];

  // Sample invoices for this supplier
  const invoices = [
    {
      id: "INV-2024-0125",
      date: "2024-07-15",
      dueDate: "2024-08-15",
      amount: 45000,
      status: "pending",
    },
    {
      id: "INV-2024-0110",
      date: "2024-07-01",
      dueDate: "2024-08-01",
      amount: 38000,
      status: "paid",
    },
    {
      id: "INV-2024-0095",
      date: "2024-06-15",
      dueDate: "2024-07-15",
      amount: 42000,
      status: "paid",
    },
  ];

  // Sample payments for this supplier
  const payments = [
    {
      id: "PAY-2024-0085",
      date: "2024-07-10",
      method: "bank_transfer",
      amount: 38000,
      reference: "TRF-123456",
    },
    {
      id: "PAY-2024-0072",
      date: "2024-06-25",
      method: "check",
      amount: 42000,
      reference: "CHK-789012",
    },
  ];

  // Sample evaluations for this supplier
  const evaluations = [
    {
      date: "2024-06-01",
      qualityScore: 4.5,
      deliveryScore: 4.0,
      priceScore: 3.5,
      communicationScore: 4.2,
      overallScore: 4.05,
      evaluator: "أحمد محمد",
    },
    {
      date: "2024-03-01",
      qualityScore: 4.2,
      deliveryScore: 3.8,
      priceScore: 3.5,
      communicationScore: 4.0,
      overallScore: 3.88,
      evaluator: "سارة أحمد",
    },
  ];

  // Sample products supplied by this supplier
  const products = [
    {
      name: "مادة خام أ",
      category: "مواد خام",
      price: 50,
      lastPurchase: "2024-07-15",
    },
    {
      name: "مادة خام ب",
      category: "مواد خام",
      price: 100,
      lastPurchase: "2024-07-15",
    },
    {
      name: "قطع غيار س",
      category: "قطع غيار",
      price: 500,
      lastPurchase: "2024-07-01",
    },
  ];

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
      case "pending":
        return "معلق";
      case "paid":
        return "مدفوع";
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
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "cash":
        return "نقدي";
      case "bank_transfer":
        return "تحويل بنكي";
      case "check":
        return "شيك";
      case "credit_card":
        return "بطاقة ائتمان";
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="info">المعلومات الأساسية</TabsTrigger>
          <TabsTrigger value="orders">طلبات الشراء</TabsTrigger>
          <TabsTrigger value="invoices">الفواتير والمدفوعات</TabsTrigger>
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="evaluation">التقييم</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="info">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">اسم المورد</p>
                    <p className="font-medium">{supplier.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                    <p className="font-medium">{supplier.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      البريد الإلكتروني
                    </p>
                    <p className="font-medium">{supplier.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">العنوان</p>
                    <p className="font-medium">{supplier.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الرقم الضريبي
                    </p>
                    <p className="font-medium">{supplier.taxNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">فئة المورد</p>
                    <p className="font-medium">{supplier.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      تاريخ التسجيل
                    </p>
                    <p className="font-medium">{supplier.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">آخر معاملة</p>
                    <p className="font-medium">{supplier.lastTransaction}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Financial Information */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-6">المعلومات المالية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الرصيد الحالي
                    </p>
                    <p
                      className={`font-medium ${supplier.balance < 0 ? "text-red-600" : supplier.balance > 0 ? "text-green-600" : ""}`}
                    >
                      {Math.abs(supplier.balance).toLocaleString()} ₴
                      {supplier.balance < 0
                        ? " (مستحق للمورد)"
                        : supplier.balance > 0
                          ? " (مستحق على المورد)"
                          : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      حد الائتمان المسموح
                    </p>
                    <p className="font-medium">
                      {supplier.creditLimit.toLocaleString()} ₴
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      فترة السداد الافتراضية
                    </p>
                    <p className="font-medium">{supplier.paymentTerms} يوم</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {supplier.balance < 0 &&
                  Math.abs(supplier.balance) > supplier.creditLimit * 0.8 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <p className="text-amber-800 font-medium">
                          تنبيه: المورد يقترب من حد الائتمان
                        </p>
                      </div>
                      <p className="text-sm text-amber-700 mt-1">
                        الرصيد الحالي يمثل{" "}
                        {Math.round(
                          (Math.abs(supplier.balance) / supplier.creditLimit) *
                            100,
                        )}
                        % من حد الائتمان المسموح
                      </p>
                    </div>
                  )}

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي المشتريات
                    </p>
                    <p className="font-medium">125,000 ₴</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                    <p className="font-medium">12 طلب</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      تقييم المورد
                    </p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="ml-2 font-medium">4.2/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Button>
              <ShoppingCart className="ml-2 h-4 w-4" />
              طلب شراء جديد
            </Button>
            <Button variant="outline">
              <DollarSign className="ml-2 h-4 w-4" />
              تسجيل دفعة
            </Button>
            <Button variant="outline">
              <Phone className="ml-2 h-4 w-4" />
              اتصال
            </Button>
            <Button variant="outline">
              <Mail className="ml-2 h-4 w-4" />
              إرسال بريد إلكتروني
            </Button>
          </div>
        </TabsContent>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">طلبات الشراء</h3>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير
                </Button>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  طلب جديد
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الطلب</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>تاريخ التسليم المتوقع</TableHead>
                    <TableHead className="text-left">المبلغ</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد طلبات شراء</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    purchaseOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.expectedDelivery}</TableCell>
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
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Invoices and Payments Tab */}
        <TabsContent value="invoices">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">الفواتير</h3>
                <Button variant="outline">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>تاريخ الاستحقاق</TableHead>
                      <TableHead className="text-left">المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا توجد فواتير</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      invoices.map((invoice) => (
                        <TableRow
                          key={invoice.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {invoice.id}
                          </TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell className="text-left">
                            {invoice.amount.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs ${getStatusClass(invoice.status)} rounded-full`}
                            >
                              {getStatusText(invoice.status)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">المدفوعات</h3>
                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  تسجيل دفعة
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم المرجع</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>طريقة الدفع</TableHead>
                      <TableHead className="text-left">المبلغ</TableHead>
                      <TableHead>رقم المرجع</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا توجد مدفوعات</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      payments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {payment.id}
                          </TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            {getPaymentMethodText(payment.method)}
                          </TableCell>
                          <TableCell className="text-left">
                            {payment.amount.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>{payment.reference}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">المنتجات الموردة</h3>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead className="text-left">السعر</TableHead>
                    <TableHead>آخر شراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد منتجات</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-left">
                          {product.price} ₴
                        </TableCell>
                        <TableCell>{product.lastPurchase}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Evaluation Tab */}
        <TabsContent value="evaluation">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">تقييم المورد</h3>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                تقييم جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">التقييم الإجمالي</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                    <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                    <Star className="h-6 w-6 text-amber-400" />
                  </div>
                  <span className="text-2xl font-bold">4.2</span>
                  <span className="text-muted-foreground">/5</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">الجودة</span>
                      <span className="text-sm font-medium">4.5/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">الالتزام بالمواعيد</span>
                      <span className="text-sm font-medium">4.0/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">السعر</span>
                      <span className="text-sm font-medium">3.5/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">التواصل</span>
                      <span className="text-sm font-medium">4.2/5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ width: "84%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">إحصائيات الأداء</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      نسبة التسليم في الموعد
                    </span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      نسبة المطابقة للمواصفات
                    </span>
                    <span className="font-medium text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">متوسط التأخير</span>
                    <span className="font-medium">2.3 يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      نسبة المرتجعات
                    </span>
                    <span className="font-medium text-green-600">1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      سرعة الاستجابة للاستفسارات
                    </span>
                    <span className="font-medium">1.5 يوم</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead className="text-center">الجودة</TableHead>
                    <TableHead className="text-center">
                      الالتزام بالمواعيد
                    </TableHead>
                    <TableHead className="text-center">السعر</TableHead>
                    <TableHead className="text-center">التواصل</TableHead>
                    <TableHead className="text-center">
                      التقييم الإجمالي
                    </TableHead>
                    <TableHead>المقيم</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <FileText className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد تقييمات</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    evaluations.map((evaluation, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell>{evaluation.date}</TableCell>
                        <TableCell className="text-center">
                          {evaluation.qualityScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {evaluation.deliveryScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {evaluation.priceScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {evaluation.communicationScore}
                        </TableCell>
                        <TableCell className="text-center">
                          {evaluation.overallScore}
                        </TableCell>
                        <TableCell>{evaluation.evaluator}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDetails;
