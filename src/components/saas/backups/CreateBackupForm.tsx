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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Server, Users } from "lucide-react";
import { customers } from "@/data/backups";

interface CreateBackupFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (backupData: any) => void;
}

const CreateBackupForm: React.FC<CreateBackupFormProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "platform",
    customerId: "",
    retentionDays: 30,
  });

  // تحديث حالة النموذج
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // حفظ النسخة الاحتياطية
  const handleSave = () => {
    // تحضير البيانات للحفظ
    const backupToSave = {
      ...formData,
      id: `bkp-${Date.now()}`,
      customerName:
        formData.type === "customer" && formData.customerId
          ? customers.find((c) => c.id === formData.customerId)?.name
          : undefined,
      size: "0", // سيتم تحديثه بعد إنشاء النسخة الاحتياطية
      createdAt: new Date().toISOString(),
      status: "in_progress",
      location:
        formData.type === "platform"
          ? `/backups/platform/full_${new Date().toISOString().split("T")[0].replace(/-/g, "")}.zip`
          : `/backups/customers/${formData.customerId}/backup_${new Date().toISOString().split("T")[0].replace(/-/g, "")}.zip`,
    };

    onSave(backupToSave);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              إنشاء نسخة احتياطية جديدة
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
            <Label htmlFor="type">نوع النسخة الاحتياطية</Label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="platform"
                  name="type"
                  value="platform"
                  checked={formData.type === "platform"}
                  onChange={() => handleChange("type", "platform")}
                  className="h-4 w-4"
                />
                <div className="flex items-center gap-1">
                  <Server className="h-4 w-4 text-purple-500" />
                  <Label htmlFor="platform">نسخة النظام</Label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="customer"
                  name="type"
                  value="customer"
                  checked={formData.type === "customer"}
                  onChange={() => handleChange("type", "customer")}
                  className="h-4 w-4"
                />
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="customer">نسخة عميل</Label>
                </div>
              </div>
            </div>
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
            <Label htmlFor="name">اسم النسخة الاحتياطية</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={
                formData.type === "platform"
                  ? "نسخة احتياطية كاملة للنظام"
                  : "نسخة احتياطية للعميل"
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف (اختياري)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="أدخل وصفاً مختصراً للنسخة الاحتياطية"
              rows={3}
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
                <SelectItem value="7">أسبوع</SelectItem>
                <SelectItem value="14">أسبوعين</SelectItem>
                <SelectItem value="30">شهر</SelectItem>
                <SelectItem value="90">3 أشهر</SelectItem>
                <SelectItem value="180">6 أشهر</SelectItem>
                <SelectItem value="365">سنة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              !formData.name ||
              (formData.type === "customer" && !formData.customerId)
            }
          >
            إنشاء النسخة الاحتياطية
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBackupForm;
