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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface PackageFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (packageData: any) => void;
  packageData?: any;
  isEditing: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({
  open,
  onClose,
  onSave,
  packageData,
  isEditing,
}) => {
  // قائمة الوحدات المتاحة في النظام
  const availableModules = [
    { id: "sales", name: "المبيعات" },
    { id: "purchases", name: "المشتريات" },
    { id: "inventory", name: "المخزون" },
    { id: "accounting", name: "المحاسبة" },
    { id: "reports", name: "التقارير" },
    { id: "crm", name: "إدارة العملاء" },
    { id: "hr", name: "الموارد البشرية" },
    { id: "manufacturing", name: "التصنيع" },
  ];

  // حالة النموذج
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    monthlyPrice: 0,
    yearlyDiscount: 10, // نسبة الخصم السنوي
    status: "نشط",
    features: availableModules.map((module) => ({
      id: module.id,
      name: module.name,
      included: false,
    })),
    limits: {
      users: 5,
      storage: "5",
      storageUnit: "GB",
      customers: 100,
      products: 500,
    },
  });

  // تحديث النموذج عند التعديل
  useEffect(() => {
    if (isEditing && packageData) {
      // تحويل بيانات الباقة إلى تنسيق النموذج
      const yearlyDiscount = Math.round(
        100 - (packageData.yearlyPrice / (packageData.monthlyPrice * 12)) * 100,
      );

      // استخراج وحدة التخزين والقيمة
      let storage = "5";
      let storageUnit = "GB";
      if (packageData.limits.storage) {
        const storageMatch =
          packageData.limits.storage.match(/(\d+)\s*([A-Za-z]+)/);
        if (storageMatch) {
          storage = storageMatch[1];
          storageUnit = storageMatch[2];
        }
      }

      // تحويل الميزات إلى التنسيق المطلوب
      const features = availableModules.map((module) => {
        const existingFeature = packageData.features.find(
          (f: any) => f.name === module.name,
        );
        return {
          id: module.id,
          name: module.name,
          included: existingFeature ? existingFeature.included : false,
        };
      });

      setFormData({
        name: packageData.name || "",
        description: packageData.description || "",
        monthlyPrice: packageData.monthlyPrice || 0,
        yearlyDiscount: yearlyDiscount || 10,
        status: packageData.status || "نشط",
        features,
        limits: {
          users: packageData.limits.users || 5,
          storage,
          storageUnit,
          customers:
            packageData.limits.customers === "غير محدود"
              ? "unlimited"
              : packageData.limits.customers || 100,
          products:
            packageData.limits.products === "غير محدود"
              ? "unlimited"
              : packageData.limits.products || 500,
        },
      });
    }
  }, [isEditing, packageData]);

  // تحديث حالة النموذج
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // تحديث حدود الاستخدام
  const handleLimitChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [field]: value,
      },
    }));
  };

  // تحديث حالة تضمين الوحدة
  const handleFeatureToggle = (featureId: string, included: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature) =>
        feature.id === featureId ? { ...feature, included } : feature,
      ),
    }));
  };

  // حساب السعر السنوي بناءً على السعر الشهري والخصم
  const calculateYearlyPrice = () => {
    const monthlyTotal = formData.monthlyPrice * 12;
    const discount = (monthlyTotal * formData.yearlyDiscount) / 100;
    return monthlyTotal - discount;
  };

  // تحضير البيانات للحفظ
  const prepareDataForSave = () => {
    // تحويل حدود الاستخدام إلى التنسيق المطلوب
    const formattedLimits = {
      users: formData.limits.users,
      storage: `${formData.limits.storage} ${formData.limits.storageUnit}`,
      customers:
        formData.limits.customers === "unlimited"
          ? "غير محدود"
          : formData.limits.customers,
      products:
        formData.limits.products === "unlimited"
          ? "غير محدود"
          : formData.limits.products,
    };

    // تحويل الميزات إلى التنسيق المطلوب
    const formattedFeatures = formData.features.map((feature) => ({
      name: feature.name,
      included: feature.included,
    }));

    return {
      id: isEditing && packageData ? packageData.id : `pkg-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      monthlyPrice: formData.monthlyPrice,
      yearlyPrice: calculateYearlyPrice(),
      status: formData.status,
      features: formattedFeatures,
      limits: formattedLimits,
      createdAt:
        isEditing && packageData
          ? packageData.createdAt
          : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  // حفظ الباقة
  const handleSave = () => {
    const packageToSave = prepareDataForSave();
    onSave(packageToSave);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {isEditing ? "تعديل باقة" : "إضافة باقة جديدة"}
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
          {/* معلومات الباقة الأساسية */}
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الباقة</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="أدخل اسم الباقة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الباقة</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="أدخل وصفاً مختصراً للباقة"
                rows={3}
              />
            </div>
          </div>

          {/* معلومات التسعير */}
          <div className="space-y-4">
            <h3 className="font-medium">معلومات التسعير</h3>

            <div className="space-y-2">
              <Label htmlFor="monthlyPrice">السعر الشهري (₴)</Label>
              <Input
                id="monthlyPrice"
                type="number"
                value={formData.monthlyPrice}
                onChange={(e) =>
                  handleChange("monthlyPrice", Number(e.target.value))
                }
                placeholder="أدخل السعر الشهري"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearlyDiscount">نسبة الخصم السنوي (%)</Label>
              <Input
                id="yearlyDiscount"
                type="number"
                value={formData.yearlyDiscount}
                onChange={(e) =>
                  handleChange("yearlyDiscount", Number(e.target.value))
                }
                placeholder="أدخل نسبة الخصم السنوي"
              />
            </div>

            <div className="space-y-2">
              <Label>السعر السنوي (محسوب تلقائياً)</Label>
              <Input
                value={`₴ ${calculateYearlyPrice().toLocaleString()}`}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                خصم {formData.yearlyDiscount}% على الاشتراك السنوي
              </p>
            </div>
          </div>

          {/* حدود الاستخدام */}
          <div className="space-y-4">
            <h3 className="font-medium">حدود الاستخدام</h3>

            <div className="space-y-2">
              <Label htmlFor="users">عدد المستخدمين</Label>
              <Input
                id="users"
                type="number"
                value={formData.limits.users}
                onChange={(e) =>
                  handleLimitChange("users", Number(e.target.value))
                }
                placeholder="أدخل عدد المستخدمين المسموح"
              />
            </div>

            <div className="flex gap-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="storage">مساحة التخزين</Label>
                <Input
                  id="storage"
                  type="number"
                  value={formData.limits.storage}
                  onChange={(e) => handleLimitChange("storage", e.target.value)}
                  placeholder="أدخل مساحة التخزين"
                />
              </div>
              <div className="space-y-2 w-24">
                <Label htmlFor="storageUnit">الوحدة</Label>
                <Select
                  value={formData.limits.storageUnit}
                  onValueChange={(value) =>
                    handleLimitChange("storageUnit", value)
                  }
                >
                  <SelectTrigger id="storageUnit">
                    <SelectValue placeholder="الوحدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MB">MB</SelectItem>
                    <SelectItem value="GB">GB</SelectItem>
                    <SelectItem value="TB">TB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customers">عدد العملاء</Label>
              <Select
                value={String(formData.limits.customers)}
                onValueChange={(value) => handleLimitChange("customers", value)}
              >
                <SelectTrigger id="customers">
                  <SelectValue placeholder="اختر عدد العملاء" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 عميل</SelectItem>
                  <SelectItem value="500">500 عميل</SelectItem>
                  <SelectItem value="1000">1000 عميل</SelectItem>
                  <SelectItem value="5000">5000 عميل</SelectItem>
                  <SelectItem value="unlimited">غير محدود</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">عدد المنتجات</Label>
              <Select
                value={String(formData.limits.products)}
                onValueChange={(value) => handleLimitChange("products", value)}
              >
                <SelectTrigger id="products">
                  <SelectValue placeholder="اختر عدد المنتجات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 منتج</SelectItem>
                  <SelectItem value="2000">2000 منتج</SelectItem>
                  <SelectItem value="5000">5000 منتج</SelectItem>
                  <SelectItem value="10000">10000 منتج</SelectItem>
                  <SelectItem value="unlimited">غير محدود</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* الوحدات المتاحة */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-medium">الوحدات المتاحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <span>{feature.name}</span>
                  <Switch
                    checked={feature.included}
                    onCheckedChange={(checked) =>
                      handleFeatureToggle(feature.id, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* حالة الباقة */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="status">حالة الباقة</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="اختر حالة الباقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="غير نشط">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "تحديث" : "إضافة"} الباقة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageForm;
