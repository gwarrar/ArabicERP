import React, { useState, useEffect } from "react";
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
import { BackupSchedule } from "@/types/backup";
import { customers } from "@/data/backups";

interface BackupScheduleFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (scheduleData: any) => void;
  schedule: BackupSchedule | null;
  isEditing: boolean;
}

const BackupScheduleForm: React.FC<BackupScheduleFormProps> = ({
  open,
  onClose,
  onSave,
  schedule,
  isEditing,
}) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: "",
    type: "platform",
    customerId: "",
    frequency: "daily",
    time: "03:00",
    day: 0,
    retentionDays: 7,
    status: "active",
  });

  // تحديث النموذج عند التعديل
  useEffect(() => {
    if (isEditing && schedule) {
      setFormData({
        name: schedule.name,
        type: schedule.type,
        customerId: schedule.customerId || "",
        frequency: schedule.frequency,
        time: schedule.time,
        day: schedule.day || 0,
        retentionDays: schedule.retentionDays,
        status: schedule.status,
      });
    } else {
      // إعادة تعيين النموذج عند الإضافة
      setFormData({
        name: "",
        type: "platform",
        customerId: "",
        frequency: "daily",
        time: "03:00",
        day: 0,
        retentionDays: 7,
        status: "active",
      });
    }
  }, [isEditing, schedule, open]);

  // تحديث حالة النموذج
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // حفظ جدول النسخ الاحتياطي
  const handleSave = () => {
    // تحضير البيانات للحفظ
    const scheduleToSave = {
      ...formData,
      id: isEditing && schedule ? schedule.id : `sched-${Date.now()}`,
      customerName:
        formData.type === "customer" && formData.customerId
          ? customers.find((c) => c.id === formData.customerId)?.name
          : undefined,
      nextRun: calculateNextRun(),
      createdAt:
        isEditing && schedule ? schedule.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastRun: isEditing && schedule ? schedule.lastRun : undefined,
    };

    onSave(scheduleToSave);
  };

  // حساب موعد التشغيل القادم
  const calculateNextRun = () => {
    const now = new Date();
    const [hours, minutes] = formData.time.split(":").map(Number);
    const nextRun = new Date(now);
    nextRun.setHours(hours, minutes, 0, 0);

    // إذا كان الوقت قد مر اليوم، انتقل إلى اليوم التالي
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    // تعديل التاريخ بناءً على التكرار
    if (formData.frequency === "weekly") {
      // تعيين اليوم من الأسبوع (0 = الأحد، 6 = السبت)
      const currentDay = nextRun.getDay();
      const daysToAdd = (formData.day - currentDay + 7) % 7;
      if (daysToAdd > 0 || (daysToAdd === 0 && nextRun <= now)) {
        nextRun.setDate(nextRun.getDate() + daysToAdd);
      }
    } else if (formData.frequency === "monthly") {
      // تعيين اليوم من الشهر
      const currentDate = nextRun.getDate();
      if (
        currentDate > formData.day ||
        (currentDate === formData.day && nextRun <= now)
      ) {
        // انتقل إلى الشهر التالي
        nextRun.setMonth(nextRun.getMonth() + 1);
      }
      // تعيين اليوم من الشهر
      nextRun.setDate(formData.day);
    }

    return nextRun.toISOString();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {isEditing
                ? "تعديل جدول النسخ الاحتياطي"
                : "إضافة جدول نسخ احتياطي جديد"}
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

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم الجدول</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="أدخل اسم الجدول"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">نوع النسخة الاحتياطية</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="اختر نوع النسخة الاحتياطية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="platform">نسخة النظام</SelectItem>
                <SelectItem value="customer">نسخة عميل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === "customer" && (
            <div className="space-y-2">
              <Label htmlFor="customerId">العميل</Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => handleChange("customerId", value)}
              >
                <SelectTrigger id="customerId">
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => handleChange("frequency", value)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="اختر تكرار النسخ الاحتياطي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">يومي</SelectItem>
                <SelectItem value="weekly">أسبوعي</SelectItem>
                <SelectItem value="monthly">شهري</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.frequency === "weekly" && (
            <div className="space-y-2">
              <Label htmlFor="day">اليوم من الأسبوع</Label>
              <Select
                value={String(formData.day)}
                onValueChange={(value) => handleChange("day", parseInt(value))}
              >
                <SelectTrigger id="day">
                  <SelectValue placeholder="اختر اليوم من الأسبوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">الأحد</SelectItem>
                  <SelectItem value="1">الإثنين</SelectItem>
                  <SelectItem value="2">الثلاثاء</SelectItem>
                  <SelectItem value="3">الأربعاء</SelectItem>
                  <SelectItem value="4">الخميس</SelectItem>
                  <SelectItem value="5">الجمعة</SelectItem>
                  <SelectItem value="6">السبت</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.frequency === "monthly" && (
            <div className="space-y-2">
              <Label htmlFor="day">اليوم من الشهر</Label>
              <Select
                value={String(formData.day)}
                onValueChange={(value) => handleChange("day", parseInt(value))}
              >
                <SelectTrigger id="day">
                  <SelectValue placeholder="اختر اليوم من الشهر" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="time">وقت التنفيذ</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retentionDays">مدة الاحتفاظ (بالأيام)</Label>
            <Select
              value={String(formData.retentionDays)}
              onValueChange={(value) =>
                handleChange("retentionDays", parseInt(value))
              }
            >
              <SelectTrigger id="retentionDays">
                <SelectValue placeholder="اختر مدة الاحتفاظ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">يوم واحد</SelectItem>
                <SelectItem value="7">أسبوع</SelectItem>
                <SelectItem value="14">أسبوعين</SelectItem>
                <SelectItem value="30">شهر</SelectItem>
                <SelectItem value="90">3 أشهر</SelectItem>
                <SelectItem value="180">6 أشهر</SelectItem>
                <SelectItem value="365">سنة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">الحالة</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="اختر حالة الجدول" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "تحديث" : "إضافة"} الجدول
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupScheduleForm;
