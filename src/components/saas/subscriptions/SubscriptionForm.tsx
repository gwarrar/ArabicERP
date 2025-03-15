import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface SubscriptionFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  subscription?: any; // للتعديل على اشتراك موجود
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  open,
  onClose,
  onSave,
  subscription,
}) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    customer: subscription?.customer || "",
    package: subscription?.package || "",
    startDate:
      subscription?.startDate || new Date().toISOString().split("T")[0],
    duration: subscription
      ? getDurationInMonths(subscription.startDate, subscription.endDate)
      : "12",
    paymentMethod: subscription?.paymentMethod || "credit_card",
    notes: subscription?.notes || "",
  });

  // حساب المدة بالأشهر بين تاريخين
  function getDurationInMonths(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return months.toString();
  }

  // حساب تاريخ الانتهاء بناءً على تاريخ البدء والمدة
  function calculateEndDate(startDate: string, durationMonths: number): string {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + durationMonths);
    return date.toISOString().split("T")[0];
  }

  // حساب قيمة الاشتراك بناءً على الباقة والمدة
  function calculateSubscriptionValue(
    packageType: string,
    durationMonths: number,
  ): string {
    let monthlyRate = 0;
    switch (packageType) {
      case "الباقة الأساسية":
        monthlyRate = 300;
        break;
      case "الباقة المتقدمة":
        monthlyRate = 400;
        break;
      case "الباقة المتكاملة":
        monthlyRate = 500;
        break;
      default:
        monthlyRate = 0;
    }

    // خصم 10% للاشتراكات السنوية
    const totalValue =
      durationMonths >= 12
        ? monthlyRate * durationMonths * 0.9
        : monthlyRate * durationMonths;

    return `₴ ${totalValue.toLocaleString()}`;
  }

  // تحديث حالة النموذج
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // حفظ الاشتراك
  const handleSave = () => {
    // هنا يمكن إضافة التحقق من صحة البيانات
    onSave();
  };

  // حساب تاريخ الانتهاء والقيمة للعرض
  const endDate = calculateEndDate(
    formData.startDate,
    parseInt(formData.duration),
  );
  const subscriptionValue = calculateSubscriptionValue(
    formData.package,
    parseInt(formData.duration),
  );

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {subscription ? "تعديل اشتراك" : "اشتراك جديد"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customer">العميل</Label>
            <Select
              value={formData.customer}
              onValueChange={(value) => handleChange("customer", value)}
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="شركة الأمل للتجارة">
                  شركة الأمل للتجارة
                </SelectItem>
                <SelectItem value="مؤسسة النور">مؤسسة النور</SelectItem>
                <SelectItem value="شركة البناء الحديث">
                  شركة البناء الحديث
                </SelectItem>
                <SelectItem value="مؤسسة الصفا التجارية">
                  مؤسسة الصفا التجارية
                </SelectItem>
                <SelectItem value="شركة الفجر للإلكترونيات">
                  شركة الفجر للإلكترونيات
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="package">الباقة</Label>
            <Select
              value={formData.package}
              onValueChange={(value) => handleChange("package", value)}
            >
              <SelectTrigger id="package">
                <SelectValue placeholder="اختر الباقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الباقة الأساسية">
                  الباقة الأساسية - ₴ 300/شهر
                </SelectItem>
                <SelectItem value="الباقة المتقدمة">
                  الباقة المتقدمة - ₴ 400/شهر
                </SelectItem>
                <SelectItem value="الباقة المتكاملة">
                  الباقة المتكاملة - ₴ 500/شهر
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ البدء</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">مدة الاشتراك (بالأشهر)</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => handleChange("duration", value)}
            >
              <SelectTrigger id="duration">
                <SelectValue placeholder="اختر المدة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">شهر واحد</SelectItem>
                <SelectItem value="3">3 أشهر</SelectItem>
                <SelectItem value="6">6 أشهر</SelectItem>
                <SelectItem value="12">سنة (خصم 10%)</SelectItem>
                <SelectItem value="24">سنتان (خصم 10%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ الانتهاء</Label>
            <Input id="endDate" type="date" value={endDate} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">طريقة الدفع</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => handleChange("paymentMethod", value)}
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">بطاقة ائتمان</SelectItem>
                <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                <SelectItem value="cash">نقدي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="أي ملاحظات إضافية"
            />
          </div>

          <div className="col-span-2 border p-4 rounded-md bg-muted/20">
            <div className="flex justify-between items-center">
              <span className="font-medium">قيمة الاشتراك:</span>
              <span className="text-xl font-bold text-primary">
                {subscriptionValue}
              </span>
            </div>
            {parseInt(formData.duration) >= 12 && (
              <p className="text-sm text-muted-foreground mt-1">
                تم تطبيق خصم 10% للاشتراك السنوي
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            {subscription ? "تحديث" : "إضافة"} الاشتراك
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionForm;
