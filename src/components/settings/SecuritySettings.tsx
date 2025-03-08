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
import {
  Check,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  FileText,
  Eye,
  EyeOff,
  Smartphone,
  Clock,
  RefreshCw,
} from "lucide-react";

const SecuritySettings = () => {
  const [passwordMinLength, setPasswordMinLength] = useState(8);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="password">سياسة كلمات المرور</TabsTrigger>
            <TabsTrigger value="2fa">المصادقة الثنائية</TabsTrigger>
            <TabsTrigger value="sessions">إدارة الجلسات</TabsTrigger>
            <TabsTrigger value="audit">سجل المراجعة</TabsTrigger>
            <TabsTrigger value="encryption">التشفير</TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">سياسة كلمات المرور</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">
                    الحد الأدنى لطول كلمة المرور ({passwordMinLength} أحرف)
                  </Label>
                  <Slider
                    id="password-min-length"
                    min={6}
                    max={16}
                    step={1}
                    value={[passwordMinLength]}
                    onValueChange={(value) => setPasswordMinLength(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-complexity">تعقيد كلمة المرور</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="password-complexity">
                      <SelectValue placeholder="اختر مستوى التعقيد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفض (أحرف فقط)</SelectItem>
                      <SelectItem value="medium">
                        متوسط (أحرف وأرقام)
                      </SelectItem>
                      <SelectItem value="high">
                        عالي (أحرف، أرقام، رموز خاصة)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">
                    انتهاء صلاحية كلمة المرور ({passwordExpiry} يوم)
                  </Label>
                  <Slider
                    id="password-expiry"
                    min={0}
                    max={365}
                    step={30}
                    value={[passwordExpiry]}
                    onValueChange={(value) => setPasswordExpiry(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    {passwordExpiry === 0
                      ? "لا تنتهي صلاحية كلمات المرور"
                      : `تنتهي صلاحية كلمات المرور بعد ${passwordExpiry} يوم`}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-history">سجل كلمات المرور</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="password-history">
                      <SelectValue placeholder="اختر عدد كلمات المرور السابقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">
                        لا يتم حفظ كلمات المرور السابقة
                      </SelectItem>
                      <SelectItem value="3">آخر 3 كلمات مرور</SelectItem>
                      <SelectItem value="5">آخر 5 كلمات مرور</SelectItem>
                      <SelectItem value="10">آخر 10 كلمات مرور</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    منع إعادة استخدام كلمات المرور السابقة
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="account-lockout">
                      قفل الحساب بعد محاولات فاشلة
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      قفل الحساب بعد عدة محاولات فاشلة لتسجيل الدخول
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="اختر عدد المحاولات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 محاولات</SelectItem>
                        <SelectItem value="5">5 محاولات</SelectItem>
                        <SelectItem value="10">10 محاولات</SelectItem>
                        <SelectItem value="0">تعطيل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="force-change">
                      إجبار تغيير كلمة المرور عند أول تسجيل دخول
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      يجب على المستخدمين الجدد تغيير كلمة المرور عند أول تسجيل
                      دخول
                    </p>
                  </div>
                  <Switch id="force-change" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">تغيير كلمة المرور</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="كلمة المرور الحالية"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-2.5"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="كلمة المرور الجديدة"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-2.5"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="تأكيد كلمة المرور"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-2.5"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
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

          <TabsContent value="2fa" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">المصادقة الثنائية</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-2fa">تفعيل المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">
                      تمكين المصادقة الثنائية لجميع المستخدمين
                    </p>
                  </div>
                  <Switch id="enable-2fa" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa-method">طريقة المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">
                      اختر طريقة المصادقة الثنائية المفضلة
                    </p>
                  </div>
                  <Select defaultValue="app">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الطريقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">تطبيق المصادقة</SelectItem>
                      <SelectItem value="sms">رسائل SMS</SelectItem>
                      <SelectItem value="email">البريد الإلكتروني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="admin-2fa">إلزامية للمسؤولين</Label>
                    <p className="text-sm text-muted-foreground">
                      إلزام المصادقة الثنائية لحسابات المسؤولين
                    </p>
                  </div>
                  <Switch id="admin-2fa" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="remember-device">
                      تذكر الأجهزة الموثوقة
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      السماح للمستخدمين بتذكر الأجهزة الموثوقة لفترة محددة
                    </p>
                  </div>
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">لا تتذكر</SelectItem>
                      <SelectItem value="7days">7 أيام</SelectItem>
                      <SelectItem value="30days">30 يوم</SelectItem>
                      <SelectItem value="90days">90 يوم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                إعداد المصادقة الثنائية
              </h3>
              <div className="p-6 border rounded-lg bg-gray-50 flex flex-col items-center justify-center">
                <Smartphone className="h-16 w-16 text-primary mb-4" />
                <h4 className="text-lg font-medium mb-2">
                  إعداد تطبيق المصادقة
                </h4>
                <p className="text-center text-muted-foreground mb-4">
                  امسح رمز QR ضوئيًا باستخدام تطبيق المصادقة مثل Google
                  Authenticator أو Authy
                </p>
                <div className="w-48 h-48 bg-white p-4 border rounded-lg mb-4">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-xs text-center">رمز QR سيظهر هنا</p>
                  </div>
                </div>
                <div className="space-y-2 w-full max-w-xs">
                  <Label htmlFor="verification-code">أدخل رمز التحقق</Label>
                  <Input
                    id="verification-code"
                    placeholder="أدخل الرمز المكون من 6 أرقام"
                  />
                </div>
                <Button className="mt-4">
                  <Check className="ml-2 h-4 w-4" />
                  تأكيد وتفعيل
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

          <TabsContent value="sessions" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات الجلسات</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    مهلة انتهاء الجلسة ({sessionTimeout} دقيقة)
                  </Label>
                  <Slider
                    id="session-timeout"
                    min={5}
                    max={120}
                    step={5}
                    value={[sessionTimeout]}
                    onValueChange={(value) => setSessionTimeout(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    تسجيل الخروج تلقائيًا بعد {sessionTimeout} دقيقة من عدم
                    النشاط
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="concurrent-sessions">
                      الجلسات المتزامنة
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      السماح بتسجيل الدخول من أجهزة متعددة في نفس الوقت
                    </p>
                  </div>
                  <Select defaultValue="unlimited">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الحد الأقصى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">جلسة واحدة فقط</SelectItem>
                      <SelectItem value="3">3 جلسات كحد أقصى</SelectItem>
                      <SelectItem value="5">5 جلسات كحد أقصى</SelectItem>
                      <SelectItem value="unlimited">غير محدود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="force-logout">
                      تسجيل الخروج عند تغيير كلمة المرور
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      تسجيل الخروج من جميع الجلسات عند تغيير كلمة المرور
                    </p>
                  </div>
                  <Switch id="force-logout" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">الجلسات النشطة</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-muted">
                  <div>الجهاز</div>
                  <div>الموقع</div>
                  <div>آخر نشاط</div>
                  <div>الإجراءات</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 gap-4 p-4 items-center">
                    <div>
                      <p className="font-medium">هذا الجهاز</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome على Windows
                      </p>
                    </div>
                    <div>
                      <p>أوديسا، أوكرانيا</p>
                      <p className="text-xs text-muted-foreground">
                        IP: 192.168.1.1
                      </p>
                    </div>
                    <div>
                      <p>الآن</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" disabled>
                        الجلسة الحالية
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 items-center">
                    <div>
                      <p className="font-medium">iPhone 13</p>
                      <p className="text-xs text-muted-foreground">
                        Safari على iOS
                      </p>
                    </div>
                    <div>
                      <p>كييف، أوكرانيا</p>
                      <p className="text-xs text-muted-foreground">
                        IP: 192.168.1.2
                      </p>
                    </div>
                    <div>
                      <p>منذ 2 ساعة</p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        إنهاء الجلسة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 text-red-600">
                <AlertTriangle className="ml-2 h-4 w-4" />
                إنهاء جميع الجلسات الأخرى
              </Button>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                إعدادات سجل المراجعة
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-audit">تفعيل سجل المراجعة</Label>
                    <p className="text-sm text-muted-foreground">
                      تسجيل جميع الإجراءات المهمة في النظام
                    </p>
                  </div>
                  <Switch id="enable-audit" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-retention">
                      فترة الاحتفاظ بالسجلات
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      المدة التي يتم الاحتفاظ بسجلات المراجعة خلالها
                    </p>
                  </div>
                  <Select defaultValue="1year">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 أشهر</SelectItem>
                      <SelectItem value="6months">6 أشهر</SelectItem>
                      <SelectItem value="1year">سنة واحدة</SelectItem>
                      <SelectItem value="2years">سنتان</SelectItem>
                      <SelectItem value="forever">للأبد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الأحداث المسجلة</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-login" defaultChecked />
                      <Label htmlFor="log-login">تسجيل الدخول/الخروج</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-data" defaultChecked />
                      <Label htmlFor="log-data">تغييرات البيانات</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-settings" defaultChecked />
                      <Label htmlFor="log-settings">تغييرات الإعدادات</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-reports" defaultChecked />
                      <Label htmlFor="log-reports">الوصول إلى التقارير</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-exports" defaultChecked />
                      <Label htmlFor="log-exports">عمليات التصدير</Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch id="log-api" defaultChecked />
                      <Label htmlFor="log-api">استخدام API</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">
                سجل المراجعة الأخير
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-muted">
                  <div>التاريخ والوقت</div>
                  <div>المستخدم</div>
                  <div>الإجراء</div>
                  <div>العنصر</div>
                  <div>التفاصيل</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="text-sm">2024-07-15 14:30</div>
                    <div className="text-sm">أحمد محمد</div>
                    <div className="text-sm">تسجيل دخول</div>
                    <div className="text-sm">النظام</div>
                    <div className="text-sm">تسجيل دخول ناجح</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="text-sm">2024-07-15 14:25</div>
                    <div className="text-sm">سارة أحمد</div>
                    <div className="text-sm">تعديل</div>
                    <div className="text-sm">العميل #1234</div>
                    <div className="text-sm">تحديث معلومات الاتصال</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div className="text-sm">2024-07-15 14:20</div>
                    <div className="text-sm">محمد علي</div>
                    <div className="text-sm">إنشاء</div>
                    <div className="text-sm">فاتورة #5678</div>
                    <div className="text-sm">إنشاء فاتورة جديدة</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                <FileText className="ml-2 h-4 w-4" />
                تصدير سجل المراجعة الكامل
              </Button>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="encryption" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات التشفير</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-encryption">
                      تفعيل تشفير البيانات
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      تشفير البيانات الحساسة في قاعدة البيانات
                    </p>
                  </div>
                  <Switch id="enable-encryption" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="encryption-algorithm">
                      خوارزمية التشفير
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      اختر خوارزمية التشفير المستخدمة
                    </p>
                  </div>
                  <Select defaultValue="aes256">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الخوارزمية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aes128">AES-128</SelectItem>
                      <SelectItem value="aes256">AES-256</SelectItem>
                      <SelectItem value="chacha20">
                        ChaCha20-Poly1305
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="key-rotation">تدوير مفاتيح التشفير</Label>
                    <p className="text-sm text-muted-foreground">
                      تغيير مفاتيح التشفير بشكل دوري لتعزيز الأمان
                    </p>
                  </div>
                  <Select defaultValue="90days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">كل 30 يوم</SelectItem>
                      <SelectItem value="90days">كل 90 يوم</SelectItem>
                      <SelectItem value="180days">كل 180 يوم</SelectItem>
                      <SelectItem value="never">لا تدوير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">البيانات المشفرة</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="encrypt-personal" defaultChecked />
                  <Label htmlFor="encrypt-personal">
                    البيانات الشخصية للعملاء
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="encrypt-payment" defaultChecked />
                  <Label htmlFor="encrypt-payment">معلومات الدفع</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="encrypt-documents" defaultChecked />
                  <Label htmlFor="encrypt-documents">المستندات المرفقة</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="encrypt-communications" />
                  <Label htmlFor="encrypt-communications">
                    سجلات الاتصالات
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="encrypt-backups" defaultChecked />
                  <Label htmlFor="encrypt-backups">النسخ الاحتياطية</Label>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-amber-50 text-amber-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">تحذير هام</h4>
                  <p className="text-sm mt-1">
                    تأكد من الاحتفاظ بنسخة آمنة من مفاتيح التشفير. في حالة فقدان
                    المفاتيح، لن تتمكن من استعادة البيانات المشفرة.
                  </p>
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
