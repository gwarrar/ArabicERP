import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Check, Palette, Moon, Sun, Monitor } from "lucide-react";

const UISettings = () => {
  const [logoPreview, setLogoPreview] = useState("/logo.svg");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [accentColor, setAccentColor] = useState("#8b5cf6");
  const [theme, setTheme] = useState("light");
  const [rtlEnabled, setRtlEnabled] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState("right");
  const [fontFamily, setFontFamily] = useState("Cairo");
  const [fontSize, setFontSize] = useState(14);
  const [borderRadius, setBorderRadius] = useState(8);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="branding">العلامة التجارية</TabsTrigger>
            <TabsTrigger value="colors">الألوان</TabsTrigger>
            <TabsTrigger value="layout">التخطيط</TabsTrigger>
            <TabsTrigger value="typography">الخطوط</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">شعار الشركة</h3>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 border rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                  <img
                    src={logoPreview}
                    alt="Company Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>تغيير الشعار</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <Upload className="ml-2 h-4 w-4" />
                        رفع شعار جديد
                      </Button>
                      <Button variant="outline">استعادة الافتراضي</Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    يفضل استخدام صورة بصيغة SVG أو PNG بخلفية شفافة بأبعاد
                    200×200 بكسل على الأقل.
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">اسم التطبيق</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">اسم التطبيق</Label>
                  <Input id="app-name" defaultValue="ERPmax" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input
                    id="company-name"
                    defaultValue="شركة التقنية المتطورة"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">أيقونة التطبيق</h3>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 border rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                  <img
                    src="/logo.svg"
                    alt="App Icon"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>تغيير الأيقونة</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <Upload className="ml-2 h-4 w-4" />
                        رفع أيقونة جديدة
                      </Button>
                      <Button variant="outline">استعادة الافتراضي</Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    يفضل استخدام صورة مربعة بصيغة PNG بأبعاد 512×512 بكسل.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">نظام الألوان</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">اللون الرئيسي</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <Input
                      id="primary-color"
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">اللون الثانوي</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <Input
                      id="secondary-color"
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">لون التمييز</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <Input
                      id="accent-color"
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>سمة النظام</Label>
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border cursor-pointer ${theme === "light" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6 text-amber-500" />
                    </div>
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border cursor-pointer ${theme === "dark" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-lg border cursor-pointer ${theme === "system" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">معاينة الألوان</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  اللون الرئيسي
                </div>
                <div
                  className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: secondaryColor }}
                >
                  اللون الثانوي
                </div>
                <div
                  className="h-20 rounded-lg flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: accentColor }}
                >
                  لون التمييز
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">تخطيط الواجهة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rtl-mode">
                    وضع RTL (من اليمين إلى اليسار)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="rtl-mode"
                      checked={rtlEnabled}
                      onCheckedChange={setRtlEnabled}
                    />
                    <span>{rtlEnabled ? "مفعل" : "معطل"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sidebar-collapsed">
                    القائمة الجانبية المطوية
                  </Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="sidebar-collapsed"
                      checked={sidebarCollapsed}
                      onCheckedChange={setSidebarCollapsed}
                    />
                    <span>{sidebarCollapsed ? "مفعل" : "معطل"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sidebar-position">
                    موضع القائمة الجانبية
                  </Label>
                  <Select
                    value={sidebarPosition}
                    onValueChange={setSidebarPosition}
                  >
                    <SelectTrigger id="sidebar-position">
                      <SelectValue placeholder="اختر موضع القائمة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="right">يمين</SelectItem>
                      <SelectItem value="left">يسار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="border-radius">
                    نصف قطر الحواف ({borderRadius}px)
                  </Label>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={16}
                    step={1}
                    value={[borderRadius]}
                    onValueChange={(value) => setBorderRadius(value[0])}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                تخصيص الصفحة الرئيسية
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>الوحدات المعروضة في الصفحة الرئيسية</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-sales" defaultChecked />
                      <Label htmlFor="show-sales">المبيعات</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-purchases" defaultChecked />
                      <Label htmlFor="show-purchases">المشتريات</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-inventory" defaultChecked />
                      <Label htmlFor="show-inventory">المخزون</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-accounting" defaultChecked />
                      <Label htmlFor="show-accounting">المحاسبة</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-crm" defaultChecked />
                      <Label htmlFor="show-crm">إدارة العملاء</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="show-manufacturing" defaultChecked />
                      <Label htmlFor="show-manufacturing">التصنيع</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات الخطوط</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="font-family">نوع الخط</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="اختر نوع الخط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="Tajawal">Tajawal</SelectItem>
                      <SelectItem value="Almarai">Almarai</SelectItem>
                      <SelectItem value="IBM Plex Sans Arabic">
                        IBM Plex Sans Arabic
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">
                    حجم الخط الأساسي ({fontSize}px)
                  </Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={18}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">معاينة الخط</h3>
              <div
                className="p-4 border rounded-lg"
                style={{ fontFamily: fontFamily, fontSize: `${fontSize}px` }}
              >
                <h1 className="text-2xl font-bold mb-2">عنوان رئيسي</h1>
                <h2 className="text-xl font-semibold mb-2">عنوان فرعي</h2>
                <p className="mb-2">
                  هذا نص تجريبي لمعاينة شكل الخط المختار. يمكنك من خلال هذه
                  المعاينة التأكد من مناسبة الخط لاحتياجاتك.
                </p>
                <p className="text-sm">
                  نص بحجم أصغر: 123456789 - ABCDEFGHIJKLM - abcdefghijklm
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UISettings;
