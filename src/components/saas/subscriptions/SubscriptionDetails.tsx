import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Package,
  User,
  CreditCard,
  Clock,
  FileText,
  Edit,
  RefreshCw,
  X,
  AlertTriangle,
} from "lucide-react";
import { formatDate } from "@/utils/formatters";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionRenewal from "./SubscriptionRenewal";
import SubscriptionCancellation from "./SubscriptionCancellation";

interface SubscriptionDetailsProps {
  open: boolean;
  onClose: () => void;
  subscription: any;
}

// بيانات تجريبية لسجل المدفوعات
const paymentHistoryData = [
  {
    id: "PAY-001",
    date: "2024-01-15",
    amount: "₴ 6,000",
    method: "بطاقة ائتمان",
    status: "مكتمل",
    reference: "TRX-123456",
  },
  {
    id: "PAY-002",
    date: "2023-01-15",
    amount: "₴ 6,000",
    method: "بطاقة ائتمان",
    status: "مكتمل",
    reference: "TRX-123123",
  },
];

// بيانات تجريبية لسجل الأنشطة
const activityLogData = [
  {
    id: "ACT-001",
    date: "2024-01-15",
    action: "إنشاء الاشتراك",
    user: "أحمد محمد",
    details: "تم إنشاء الاشتراك بنجاح",
  },
  {
    id: "ACT-002",
    date: "2024-01-15",
    action: "تفعيل الاشتراك",
    user: "أحمد محمد",
    details: "تم تفعيل الاشتراك بعد تأكيد الدفع",
  },
  {
    id: "ACT-003",
    date: "2024-01-20",
    action: "تعديل الاشتراك",
    user: "سارة أحمد",
    details: "تم تعديل ملاحظات الاشتراك",
  },
];

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  open,
  onClose,
  subscription,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showRenewalForm, setShowRenewalForm] = useState(false);
  const [showCancellationForm, setShowCancellationForm] = useState(false);

  // حساب الوقت المتبقي للاشتراك
  const calculateRemainingTime = () => {
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingTime();
  const isExpired = remainingDays <= 0;
  const isExpiring = remainingDays > 0 && remainingDays <= 30;

  // تحديد حالة الاشتراك بناءً على التواريخ
  const getStatusDetails = () => {
    if (subscription.status === "ملغي") {
      return {
        text: "ملغي",
        class: "bg-red-100 text-red-800",
      };
    } else if (isExpired) {
      return {
        text: "منتهي",
        class: "bg-amber-100 text-amber-800",
      };
    } else if (isExpiring) {
      return {
        text: "ينتهي قريباً",
        class: "bg-amber-100 text-amber-800",
      };
    } else {
      return {
        text: "نشط",
        class: "bg-green-100 text-green-800",
      };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                تفاصيل الاشتراك {subscription.id}
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

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="details">
                <FileText className="h-4 w-4 ml-2" />
                التفاصيل
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 ml-2" />
                سجل المدفوعات
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Clock className="h-4 w-4 ml-2" />
                سجل الأنشطة
              </TabsTrigger>
            </TabsList>

            {/* تفاصيل الاشتراك */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <span className="font-medium">
                        {subscription.customer}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        البريد الإلكتروني:
                      </span>
                      <span>info@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">رقم الهاتف:</span>
                      <span>+123456789</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Package className="h-4 w-4 ml-2" />
                      معلومات الباقة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الباقة:</span>
                      <span className="font-medium">
                        {subscription.package}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">القيمة:</span>
                      <span>{subscription.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">حالة الدفع:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${subscription.paymentStatus === "مدفوع" ? "bg-green-100 text-green-800" : subscription.paymentStatus === "متأخر" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                      >
                        {subscription.paymentStatus}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="h-4 w-4 ml-2" />
                      معلومات المدة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ البدء:
                      </span>
                      <span>{formatDate(subscription.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ الانتهاء:
                      </span>
                      <span>{formatDate(subscription.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${statusDetails.class}`}
                      >
                        {statusDetails.text}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* معلومات إضافية */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">الوحدات المفعلة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      المبيعات
                    </div>
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      المشتريات
                    </div>
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      المخزون
                    </div>
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      المحاسبة
                    </div>
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      التقارير
                    </div>
                    <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                      إدارة العملاء
                    </div>
                    {subscription.package === "الباقة المتكاملة" && (
                      <>
                        <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                          الموارد البشرية
                        </div>
                        <div className="border rounded-md p-2 text-center bg-green-50 text-green-800">
                          التصنيع
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* تنبيه انتهاء الاشتراك */}
              {isExpiring && (
                <div className="flex items-start space-x-4 space-x-reverse p-4 border border-amber-200 rounded-md bg-amber-50">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      تنبيه: الاشتراك ينتهي قريباً
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                      سينتهي هذا الاشتراك خلال {remainingDays} يوم. يرجى تجديد
                      الاشتراك لتجنب انقطاع الخدمة.
                    </p>
                  </div>
                </div>
              )}

              {/* ملاحظات */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">ملاحظات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {subscription.notes || "لا توجد ملاحظات"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* سجل المدفوعات */}
            <TabsContent value="payments">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">سجل المدفوعات</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم العملية</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>طريقة الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>رقم المرجع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistoryData.length > 0 ? (
                        paymentHistoryData.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">
                              {payment.id}
                            </TableCell>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${payment.status === "مكتمل" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                              >
                                {payment.status}
                              </span>
                            </TableCell>
                            <TableCell>{payment.reference}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-4 text-muted-foreground"
                          >
                            لا توجد مدفوعات مسجلة
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* سجل الأنشطة */}
            <TabsContent value="activity">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">سجل الأنشطة</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الإجراء</TableHead>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>التفاصيل</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogData.length > 0 ? (
                        activityLogData.map((activity) => (
                          <TableRow key={activity.id}>
                            <TableCell>{formatDate(activity.date)}</TableCell>
                            <TableCell>{activity.action}</TableCell>
                            <TableCell>{activity.user}</TableCell>
                            <TableCell>{activity.details}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-4 text-muted-foreground"
                          >
                            لا توجد أنشطة مسجلة
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <div className="flex gap-2 w-full justify-end">
              {subscription.status !== "ملغي" && (
                <Button
                  variant="destructive"
                  onClick={() => setShowCancellationForm(true)}
                >
                  <X className="ml-2 h-4 w-4" />
                  إلغاء الاشتراك
                </Button>
              )}
              {(subscription.status === "منتهي" || isExpiring) && (
                <Button
                  variant="default"
                  onClick={() => setShowRenewalForm(true)}
                >
                  <RefreshCw className="ml-2 h-4 w-4" />
                  تجديد الاشتراك
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowEditForm(true)}>
                <Edit className="ml-2 h-4 w-4" />
                تعديل
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نموذج تعديل الاشتراك */}
      {showEditForm && (
        <SubscriptionForm
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          onSave={() => {
            setShowEditForm(false);
            // هنا يمكن إضافة منطق لتحديث الاشتراك
          }}
          subscription={subscription}
        />
      )}

      {/* نموذج تجديد الاشتراك */}
      {showRenewalForm && (
        <SubscriptionRenewal
          open={showRenewalForm}
          onClose={() => setShowRenewalForm(false)}
          onSave={() => {
            setShowRenewalForm(false);
            // هنا يمكن إضافة منطق لتجديد الاشتراك
          }}
          subscription={subscription}
        />
      )}

      {/* نموذج إلغاء الاشتراك */}
      {showCancellationForm && (
        <SubscriptionCancellation
          open={showCancellationForm}
          onClose={() => setShowCancellationForm(false)}
          onSave={() => {
            setShowCancellationForm(false);
            // هنا يمكن إضافة منطق لإلغاء الاشتراك
          }}
          subscription={subscription}
        />
      )}
    </>
  );
};

export default SubscriptionDetails;
