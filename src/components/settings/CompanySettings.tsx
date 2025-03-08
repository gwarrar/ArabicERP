import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
} from "lucide-react";

const CompanySettings = () => {
  const [fiscalYearStart, setFiscalYearStart] = useState("01-01");
  const [defaultCurrency, setDefaultCurrency] = useState("UAH");
  const [defaultLanguage, setDefaultLanguage] = useState("ar");
  const [defaultTimeZone, setDefaultTimeZone] = useState("Europe/Kiev");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24");
  const [numberFormat, setNumberFormat] = useState("1,234.56");

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">معلومات الشركة</TabsTrigger>
            <TabsTrigger value="fiscal">السنة المالية</TabsTrigger>
            <TabsTrigger value="localization">الإعدادات المحلية</TabsTrigger>
            <TabsTrigger value="tax">الضرائب</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                معلومات الشركة الأساسية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input
                    id="company-name"
                    defaultValue="شركة التقنية المتطورة"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legal-name">الاسم القانوني</Label>
                  <Input
                    id="legal-name"
                    defaultValue="شركة التقنية المتطورة ذ.م.م"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">الرقم الضريبي</Label>
                  <Input id="tax-id" defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">رقم السجل التجاري</Label>
                  <Input id="registration-number" defaultValue="987654321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">القطاع</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="اختر القطاع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">
                        تكنولوجيا المعلومات
                      </SelectItem>
                      <SelectItem value="manufacturing">التصنيع</SelectItem>
                      <SelectItem value="retail">تجارة التجزئة</SelectItem>
                      <SelectItem value="services">الخدمات</SelectItem>
                      <SelectItem value="healthcare">الرعاية الصحية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">حجم الشركة</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="اختر حجم الشركة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">صغيرة (1-50 موظف)</SelectItem>
                      <SelectItem value="medium">
                        متوسطة (51-250 موظف)
                      </SelectItem>
                      <SelectItem value="large">
                        كبيرة (أكثر من 250 موظف)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    defaultValue="شارع الاستقلال، حي التكنولوجيا، أوديسا، أوكرانيا"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">الرمز البريدي</Label>
                  <Input id="postal-code" defaultValue="65000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" defaultValue="+380 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="info@techadvanced.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input
                    id="website"
                    defaultValue="https://www.techadvanced.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-media">وسائل التواصل الاجتماعي</Label>
                  <Input
                    id="social-media"
                    placeholder="روابط وسائل التواصل الاجتماعي"
                  />
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

          <TabsContent value="fiscal" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                إعدادات السنة المالية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fiscal-year-start">بداية السنة المالية</Label>
                  <Select
                    value={fiscalYearStart}
                    onValueChange={setFiscalYearStart}
                  >
                    <SelectTrigger id="fiscal-year-start">
                      <SelectValue placeholder="اختر بداية السنة المالية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01-01">1 يناير</SelectItem>
                      <SelectItem value="04-01">1 أبريل</SelectItem>
                      <SelectItem value="07-01">1 يوليو</SelectItem>
                      <SelectItem value="10-01">1 أكتوبر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accounting-method">طريقة المحاسبة</Label>
                  <Select defaultValue="accrual">
                    <SelectTrigger id="accounting-method">
                      <SelectValue placeholder="اختر طريقة المحاسبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accrual">الاستحقاق</SelectItem>
                      <SelectItem value="cash">النقدي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-currency">العملة الافتراضية</Label>
                  <Select
                    value={defaultCurrency}
                    onValueChange={setDefaultCurrency}
                  >
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="اختر العملة الافتراضية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UAH">
                        الهريفنيا الأوكرانية (₴)
                      </SelectItem>
                      <SelectItem value="USD">الدولار الأمريكي ($)</SelectItem>
                      <SelectItem value="EUR">اليورو (€)</SelectItem>
                      <SelectItem value="SAR">الريال السعودي (ر.س)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-period">الفترة الضريبية</Label>
                  <Select defaultValue="quarterly">
                    <SelectTrigger id="tax-period">
                      <SelectValue placeholder="اختر الفترة الضريبية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">شهرية</SelectItem>
                      <SelectItem value="quarterly">ربع سنوية</SelectItem>
                      <SelectItem value="annually">سنوية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">الفترات المحاسبية</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>قفل الفترات المحاسبية السابقة</Label>
                    <p className="text-sm text-muted-foreground">
                      منع التعديل على البيانات المالية للفترات السابقة
                    </p>
                  </div>
                  <Select defaultValue="3months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">بعد شهر واحد</SelectItem>
                      <SelectItem value="3months">بعد 3 أشهر</SelectItem>
                      <SelectItem value="6months">بعد 6 أشهر</SelectItem>
                      <SelectItem value="1year">بعد سنة</SelectItem>
                      <SelectItem value="never">لا تقفل أبدًا</SelectItem>
                    </SelectContent>
                  </Select>
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

          <TabsContent value="localization" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">الإعدادات المحلية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-language">اللغة الافتراضية</Label>
                  <Select
                    value={defaultLanguage}
                    onValueChange={setDefaultLanguage}
                  >
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="اختر اللغة الافتراضية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">الإنجليزية</SelectItem>
                      <SelectItem value="uk">الأوكرانية</SelectItem>
                      <SelectItem value="ru">الروسية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-timezone">المنطقة الزمنية</Label>
                  <Select
                    value={defaultTimeZone}
                    onValueChange={setDefaultTimeZone}
                  >
                    <SelectTrigger id="default-timezone">
                      <SelectValue placeholder="اختر المنطقة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Kiev">
                        أوروبا/كييف (EET)
                      </SelectItem>
                      <SelectItem value="Europe/London">
                        أوروبا/لندن (GMT)
                      </SelectItem>
                      <SelectItem value="Asia/Riyadh">
                        آسيا/الرياض (AST)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        أمريكا/نيويورك (EST)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">تنسيق التاريخ</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="اختر تنسيق التاريخ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">
                        DD/MM/YYYY (31/12/2024)
                      </SelectItem>
                      <SelectItem value="MM/DD/YYYY">
                        MM/DD/YYYY (12/31/2024)
                      </SelectItem>
                      <SelectItem value="YYYY-MM-DD">
                        YYYY-MM-DD (2024-12-31)
                      </SelectItem>
                      <SelectItem value="DD.MM.YYYY">
                        DD.MM.YYYY (31.12.2024)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">تنسيق الوقت</Label>
                  <Select value={timeFormat} onValueChange={setTimeFormat}>
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="اختر تنسيق الوقت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 ساعة (AM/PM)</SelectItem>
                      <SelectItem value="24">24 ساعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number-format">تنسيق الأرقام</Label>
                  <Select value={numberFormat} onValueChange={setNumberFormat}>
                    <SelectTrigger id="number-format">
                      <SelectValue placeholder="اختر تنسيق الأرقام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,234.56">
                        1,234.56 (الإنجليزية)
                      </SelectItem>
                      <SelectItem value="1 234,56">
                        1 234,56 (الأوروبية)
                      </SelectItem>
                      <SelectItem value="1.234,56">
                        1.234,56 (الألمانية)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-day-week">أول يوم في الأسبوع</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="first-day-week">
                      <SelectValue placeholder="اختر أول يوم في الأسبوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">الأحد</SelectItem>
                      <SelectItem value="monday">الاثنين</SelectItem>
                      <SelectItem value="saturday">السبت</SelectItem>
                    </SelectContent>
                  </Select>
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

          <TabsContent value="tax" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات الضرائب</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-tax-rate">
                    معدل الضريبة الافتراضي
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="default-tax-rate"
                      type="number"
                      defaultValue="20"
                      min="0"
                      max="100"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-registration-number">
                    رقم التسجيل الضريبي
                  </Label>
                  <Input
                    id="tax-registration-number"
                    defaultValue="UA123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-office">مكتب الضرائب</Label>
                  <Input id="tax-office" defaultValue="مكتب ضرائب أوديسا" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-filing-frequency">
                    تكرار تقديم الإقرارات الضريبية
                  </Label>
                  <Select defaultValue="quarterly">
                    <SelectTrigger id="tax-filing-frequency">
                      <SelectValue placeholder="اختر تكرار تقديم الإقرارات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      <SelectItem value="annually">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                معدلات الضرائب المخصصة
              </h3>
              <div className="border rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="font-medium">الاسم</div>
                  <div className="font-medium">النسبة</div>
                  <div className="font-medium">الوصف</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <Input defaultValue="ضريبة القيمة المضافة" />
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        defaultValue="20"
                        min="0"
                        max="100"
                      />
                      <span>%</span>
                    </div>
                    <Input defaultValue="ضريبة القيمة المضافة القياسية" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <Input defaultValue="ضريبة مخفضة" />
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="7" min="0" max="100" />
                      <span>%</span>
                    </div>
                    <Input defaultValue="ضريبة مخفضة للسلع الأساسية" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <Input defaultValue="معفى من الضريبة" />
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="0" min="0" max="100" />
                      <span>%</span>
                    </div>
                    <Input defaultValue="معفى من الضريبة" />
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة معدل ضريبي
                </Button>
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

export default CompanySettings;
