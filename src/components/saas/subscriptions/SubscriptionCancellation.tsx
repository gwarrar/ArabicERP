import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/formatters";

interface SubscriptionCancellationProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  subscription: any;
}

const SubscriptionCancellation: React.FC<SubscriptionCancellationProps> = ({
  open,
  onClose,
  onSave,
  subscription,
}) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    cancellationReason: "",
    cancellationType: "immediate",
    additionalNotes: "",
  });

  // تحديث حالة النموذج
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // حفظ الإلغاء
  const handleSave = () => {
    // هنا يمكن إضافة التحقق من صحة البيانات
    onSave();
  };

  // حساب تاريخ الإلغاء الفعلي
  const getEffectiveCancellationDate = () => {
    if (formData.cancellationType === "immediate") {
      return new Date().toISOString().split("T")[0];
    } else {
      return subscription.endDate;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              إلغاء الاشتراك {subscription.id}
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

        <div className="space-y-4 py-4">
          {/* تنبيه */}
          <div className="flex items-start space-x-4 space-x-reverse p-4 border border-red-200 rounded-md bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800">
                تنبيه: إلغاء الاشتراك
              </h4>
              <p className="text-sm text-red-700 mt-1">
                سيؤدي إلغاء الاشتراك إلى إيقاف الوصول إلى النظام. يرجى التأكد من
                أن هذا هو الإجراء المطلوب.
              </p>
            </div>
          </div>

          {/* معلومات الاشتراك */}
          <div className="bg-muted/30 p-4 rounded-md space-y-2">
            <h3 className="font-medium">معلومات الاشتراك</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">العميل:</span>
                <span className="font-medium mr-1">
                  {subscription.customer}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">الباقة:</span>
                <span className="font-medium mr-1">{subscription.package}</span>
              </div>
              <div>
                <span className="text-muted-foreground">تاريخ البدء:</span>
                <span className="font-medium mr-1">
                  {formatDate(subscription.startDate)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                <span className="font-medium mr-1">
                  {formatDate(subscription.endDate)}
                </span>
              </div>
            </div>
          </div>

          {/* نموذج الإلغاء */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancellationReason">سبب الإلغاء</Label>
              <Select
                value={formData.cancellationReason}
                onValueChange={(value) =>
                  handleChange("cancellationReason", value)
                }
                required
              >
                <SelectTrigger id="cancellationReason">
                  <SelectValue placeholder="اختر سبب الإلغاء" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_cost">تكلفة مرتفعة</SelectItem>
                  <SelectItem value="not_needed">
                    لم يعد هناك حاجة للخدمة
                  </SelectItem>
                  <SelectItem value="competitor">الانتقال إلى منافس</SelectItem>
                  <SelectItem value="features">نقص في الميزات</SelectItem>
                  <SelectItem value="business_closed">إغلاق العمل</SelectItem>
                  <SelectItem value="other">سبب آخر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancellationType">نوع الإلغاء</Label>
              <Select
                value={formData.cancellationType}
                onValueChange={(value) =>
                  handleChange("cancellationType", value)
                }
              >
                <SelectTrigger id="cancellationType">
                  <SelectValue placeholder="اختر نوع الإلغاء" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">إلغاء فوري</SelectItem>
                  <SelectItem value="end_of_term">
                    إلغاء عند انتهاء المدة
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.cancellationType === "immediate"
                  ? "سيتم إلغاء الاشتراك فوراً وإيقاف الوصول إلى النظام."
                  : "سيستمر الاشتراك حتى تاريخ انتهائه ثم يتم إلغاؤه تلقائياً."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) =>
                  handleChange("additionalNotes", e.target.value)
                }
                placeholder="أي ملاحظات إضافية حول سبب الإلغاء"
                rows={3}
              />
            </div>
          </div>

          {/* ملخص الإلغاء */}
          <div className="border p-4 rounded-md bg-muted/20 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">تاريخ الإلغاء الفعلي:</span>
                <span className="font-medium">
                  {formatDate(getEffectiveCancellationDate())}
                </span>
              </div>
              {formData.cancellationType === "immediate" && (
                <p className="text-sm text-red-600">
                  سيتم إلغاء الوصول إلى النظام فوراً بعد تأكيد الإلغاء.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            تراجع
          </Button>
          <Button
            variant="destructive"
            onClick={handleSave}
            disabled={!formData.cancellationReason}
          >
            تأكيد الإلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCancellation;
