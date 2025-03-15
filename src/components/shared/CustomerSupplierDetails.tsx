import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  ShoppingCart,
  Truck,
  Package,
  Clock,
  X,
  Download,
  Printer,
  Edit,
  Trash,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  Tag,
} from "lucide-react";
import { Customer, Supplier, Statistics } from "@/types/customer-supplier";
import {
  generateLedgerEntries,
  bookingsData,
  generateStatistics,
} from "@/data/customers-suppliers";
import {
  formatDate,
  formatCurrency,
  getStatusBadgeClass,
  getBalanceTextClass,
  getCreditLimitUsageColor,
} from "@/utils/formatters";
import StatusBadge from "./StatusBadge";

interface CustomerSupplierDetailsProps {
  open: boolean;
  onClose: () => void;
  data: Customer | Supplier;
  type: "customer" | "supplier";
}

const CustomerSupplierDetails: React.FC<CustomerSupplierDetailsProps> = ({
  open,
  onClose,
  data,
  type,
}) => {
  const [activeTab, setActiveTab] = useState("info");

  // Get ledger entries and statistics
  const ledgerEntries = useMemo(() => generateLedgerEntries(type), [type]);
  const statistics = useMemo(() => generateStatistics(type), [type]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">{data.name}</DialogTitle>
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
            {type === "customer" ? "بيانات الزبون" : "بيانات المورد"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="info">
                <User className="h-4 w-4 ml-1" />
                المعلومات الأساسية
              </TabsTrigger>
              <TabsTrigger value="ledger">
                <FileText className="h-4 w-4 ml-1" />
                دفتر الأستاذ
              </TabsTrigger>
              <TabsTrigger value="bookings">
                {type === "customer" ? (
                  <ShoppingCart className="h-4 w-4 ml-1" />
                ) : (
                  <Truck className="h-4 w-4 ml-1" />
                )}
                {type === "customer" ? "الطلبات" : "أوامر الشراء"}
              </TabsTrigger>
              <TabsTrigger value="stats">
                <CreditCard className="h-4 w-4 ml-1" />
                الإحصائيات
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="info" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      جهة الاتصال: {data.contactName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">الهاتف: {data.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      البريد الإلكتروني: {data.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">المدينة: {data.city}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">التصنيف: {data.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      الحالة: <StatusBadge status={data.status} />
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">المعلومات المالية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      الرصيد الحالي:{" "}
                      <span
                        className={`${type === "customer" && (data as Customer).balanceType === "دائن" ? "text-green-600" : type === "customer" && (data as Customer).balanceType === "مدين" ? "text-red-600" : "text-gray-600"}`}
                      >
                        {formatCurrency(data.balance)}
                        {type === "customer" &&
                          (data as Customer).balanceType !== "متوازن" &&
                          ` (${(data as Customer).balanceType})`}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      آخر معاملة: {formatDate(data.lastTransaction)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">شروط الدفع: 30 يوم</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      الحد الائتماني: {formatCurrency(50000)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ملخص النشاط</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <ShoppingCart className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      إجمالي {type === "customer" ? "المبيعات" : "المشتريات"}:
                      15
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      {type === "customer" ? "طلبات" : "أوامر شراء"} نشطة: 2
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      {type === "customer" ? "طلبات" : "أوامر شراء"} مكتملة: 13
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span className="text-sm">
                      متوسط وقت {type === "customer" ? "التسليم" : "التوريد"}: 5
                      أيام
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ledger" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>دفتر الأستاذ</CardTitle>
                <CardDescription>
                  سجل المعاملات المالية مع{" "}
                  {type === "customer" ? "الزبون" : "المورد"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المرجع</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>مدين</TableHead>
                      <TableHead>دائن</TableHead>
                      <TableHead>الرصيد</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ledgerEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{formatDate(entry.date)}</TableCell>
                        <TableCell>{entry.reference}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell className="text-red-600">
                          {entry.debit > 0
                            ? formatCurrency(entry.debit).replace(" ₴", "")
                            : "-"}
                        </TableCell>
                        <TableCell className="text-green-600">
                          {entry.credit > 0
                            ? formatCurrency(entry.credit).replace(" ₴", "")
                            : "-"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(entry.balance)}
                        </TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    إجمالي المعاملات: {ledgerEntries.length}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير السجل
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>
                  {type === "customer" ? "طلبات الزبون" : "أوامر الشراء"}
                </CardTitle>
                <CardDescription>
                  سجل {type === "customer" ? "طلبات" : "أوامر شراء"}{" "}
                  {type === "customer" ? "الزبون" : "المورد"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        رقم {type === "customer" ? "الطلب" : "أمر الشراء"}
                      </TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>عدد الأصناف</TableHead>
                      <TableHead>
                        تاريخ {type === "customer" ? "التسليم" : "الاستلام"}
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingsData.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.id}
                        </TableCell>
                        <TableCell>{formatDate(booking.date)}</TableCell>
                        <TableCell>
                          <StatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell>{formatCurrency(booking.amount)}</TableCell>
                        <TableCell>{booking.items}</TableCell>
                        <TableCell>
                          {formatDate(booking.deliveryDate)}
                        </TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">
                    إجمالي {type === "customer" ? "الطلبات" : "أوامر الشراء"}:{" "}
                    {bookingsData.length}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير السجل
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>الإحصائيات المالية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        إجمالي المعاملات
                      </p>
                      <p className="text-xl font-bold">
                        {statistics.totalTransactions}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        إجمالي {type === "customer" ? "المبيعات" : "المشتريات"}
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(statistics.totalAmount)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        متوسط قيمة{" "}
                        {type === "customer" ? "الطلب" : "أمر الشراء"}
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(statistics.averageOrderValue)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        الحد الائتماني
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(statistics.creditLimit)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">
                      استخدام الحد الائتماني
                    </h3>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getCreditLimitUsageColor((data.balance / statistics.creditLimit) * 100)}`}
                        style={{
                          width: `${(data.balance / statistics.creditLimit) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>
                        {formatCurrency(data.balance)} (
                        {Math.round(
                          (data.balance / statistics.creditLimit) * 100,
                        )}
                        %)
                      </span>
                      <span>{formatCurrency(statistics.creditLimit)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الأداء</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">آخر نشاط</p>
                      <p className="text-xl font-bold">
                        {formatDate(statistics.lastActivity)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        شروط الدفع
                      </p>
                      <p className="text-xl font-bold">
                        {statistics.paymentTerms}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        معدل {type === "customer" ? "المرتجعات" : "المرتجعات"}
                      </p>
                      <p className="text-xl font-bold">
                        {statistics.returnRate}
                      </p>
                    </div>
                    {type === "supplier" && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          التسليم في الموعد
                        </p>
                        <p className="text-xl font-bold">
                          {statistics.onTimeDelivery}
                        </p>
                      </div>
                    )}
                    {type === "supplier" && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          تقييم الجودة
                        </p>
                        <p className="text-xl font-bold">
                          {statistics.qualityRating}
                        </p>
                      </div>
                    )}
                    {type === "customer" && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          معدل تكرار الشراء
                        </p>
                        <p className="text-xl font-bold">75%</p>
                      </div>
                    )}
                    {type === "customer" && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          قيمة العميل
                        </p>
                        <p className="text-xl font-bold">عالية</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerSupplierDetails;
