import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Calendar,
  Clock,
  AlertCircle,
  Settings,
  Plus,
  Trash,
} from "lucide-react";
import { useToastContext } from "@/components/ui/toast/ToastContext";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const { success } = useToastContext();

  const handleSaveChanges = () => {
    success({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="channels">قنوات الإشعارات</TabsTrigger>
            <TabsTrigger value="events">أحداث الإشعارات</TabsTrigger>
            <TabsTrigger value="templates">قوالب الإشعارات</TabsTrigger>
            <TabsTrigger value="schedule">جدولة الإشعارات</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">قنوات الإشعارات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">إشعارات داخل التطبيق</h4>
                      <p className="text-sm text-muted-foreground">
                        إشعارات تظهر داخل التطبيق أثناء استخدامه
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={inAppNotifications}
                    onCheckedChange={setInAppNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                      <p className="text-sm text-muted-foreground">
                        إرسال إشعارات عبر البريد الإلكتروني
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">إشعارات SMS</h4>
                      <p className="text-sm text-muted-foreground">
                        إرسال إشعارات عبر رسائل SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">إشعارات الدفع</h4>
                      <p className="text-sm text-muted-foreground">
                        إرسال إشعارات عبر متصفح الويب
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات البريد الإلكتروني</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email-from">البريد المرسل منه</Label>
                    <Input
                      id="email-from"
                      defaultValue="notifications@erp-system.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-reply-to">بريد الرد</Label>
                    <Input
                      id="email-reply-to"
                      defaultValue="support@erp-system.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-footer">تذييل البريد الإلكتروني</Label>
                    <Input
                      id="email-footer"
                      defaultValue="© 2024 ERPmax. جميع الحقوق محفوظة."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-logo">شعار البريد الإلكتروني</Label>
                    <div className="flex items-center gap-2">
                      <Input id="email-logo" type="file" />
                      <Button variant="outline" size="sm">
                        استعادة الافتراضي
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button onClick={handleSaveChanges}>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">أحداث الإشعارات</h3>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-muted">
                    <div>الحدث</div>
                    <div className="text-center">داخل التطبيق</div>
                    <div className="text-center">البريد الإلكتروني</div>
                    <div className="text-center">SMS</div>
                    <div className="text-center">الدفع</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>
                        <p className="font-medium">إنشاء عميل جديد</p>
                        <p className="text-xs text-muted-foreground">عند إضافة عميل جديد</p>
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>
                        <p className="font-medium">إنشاء فاتورة جديدة</p>
                        <p className="text-xs text-muted-foreground">عند إنشاء فاتورة جديدة</p>
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>
                        <p className="font-medium">استلام دفعة</p>
                        <p className="text-xs text-muted-foreground">عند استلام دفعة من العميل</p>
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>
                        <p className="font-medium">انخفاض المخزون</p>
                        <p className="text-xs text-muted-foreground">عند وصول المخزون للحد الأدنى</p>
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>
                        <p className="font-medium">تذكير بالمهام</p>
                        <p className="text-xs text-muted-foreground">تذكير بالمهام المستحقة</p>
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked />
                      </div>
                      <div className="text-center">
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات متقدمة</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digest-mode">وضع الملخص</Label>
                    <p className="text-sm text-muted-foreground">تجميع الإشعارات المتعددة في رسالة واحدة</p>
                  </div>
                  <Switch id="digest-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digest-frequency">تكرار الملخص</Label>
                    <p className="text-sm text-muted-foreground">عدد مرات إرسال ملخص الإشعارات</p>
                  </div>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر التكرار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">كل ساعة</SelectItem>
                      <SelectItem value="daily">يومي</SelectItem>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="quiet-hours">ساعات الهدوء</Label>
                    <p className="text-sm text-muted-foreground">عدم إرسال إشعارات خلال هذه الفترة</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      defaultValue="22:00"
                      className="w-24"
                    />
                    <span>إلى</span>
                    <Input
                      type="time"
                      defaultValue="08:00"
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button onClick={handleSaveChanges}>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">قوالب الإشعارات</h3>
              <Button onClick={() => setShowAddTemplate(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة قالب جديد
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium bg-muted">
                <div>اسم القالب</div>
                <div>نوع الإشعار</div>
                <div>آخر تحديث</div>
                <div>الإجراءات</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  <div className="font-medium">ترحيب بالعميل الجديد</div>
                  <div>البريد الإلكتروني</div>
                  <div>2024-07-10</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  <div className="font-medium">تأكيد الطلب</div>
                  <div>البريد الإلكتروني، SMS</div>
                  <div>2024-07-12</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 items-center">
                  <div className="font-medium">تذكير بالفاتورة</div>
                  <div>البريد الإلكتروني، داخل التطبيق</div>
                  <div>2024-07-15</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {showAddTemplate && (
              <div className="border rounded-lg p-6 mt-6">
                <h4 className="text-lg font-semibold mb-4">إضافة قالب جديد</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">اسم القالب</Label>
                      <Input id="template-name" placeholder="اسم القالب" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-type">نوع الإشعار</Label>
                      <Select defaultValue="email">
                        <SelectTrigger id="template-type">
                          <SelectValue placeholder="اختر نوع الإشعار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">البريد الإلكتروني</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="in-app">داخل التطبيق</SelectItem>
                          <SelectItem value="push">الدفع</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-subject">عنوان الإشعار</Label>
                    <Input id="template-subject" placeholder="عنوان الإشعار" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-content">محتوى الإشعار</Label>
                    <div className="border rounded-lg p-2">
                      <div className="border-b p-2 mb-2 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          عنوان
                        </Button>
                        <Button variant="outline" size="sm">
                          فقرة
                        </Button>
                        <Button variant="outline" size="sm">
                          رابط
                        </Button>
                        <Button variant="outline" size="sm">
                          صورة
                        </Button>
                        <Button variant="outline" size="sm">
                          متغير
                        </Button>
                      </div>
                      <textarea
                        id="template-content"
                        className="w-full h-40 p-2 border-0 focus:outline-none resize-none"
                        placeholder="أدخل محتوى الإشعار هنا..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>المتغيرات المتاحة</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        {"{{customer_name}}"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {"{{order_number}}"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {"{{invoice_number}}"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {"{{amount}}"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {"{{date}}"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {"{{company_name}}"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddTemplate(false)}
                    >
                      إلغاء
                    </Button>
                    <Button onClick={() => setShowAddTemplate(false)}>
                      <Check className="ml-2 h-4 w-4" />
                      حفظ القالب
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">إلغاء</Button>
              <Button onClick={handleSaveChanges}>
                <Check className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">جدولة الإشعارات</h3>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-muted">
                    <div>اسم الإشعار</div>
                    <div>النوع</div>
                    <div>التكرار</div>
                    <div>الحالة</div>
                    <div>الإجراءات</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">تقرير المبيعات الأسبوعي</div>
                      <div>البريد الإلكتروني</div>
                      <div>أسبوعي (الاثنين 09:00)</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          نشط
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">تذكير بالفواتير المستحقة</div>
                      <div>البريد الإلكتروني، SMS</div>
                      <div>يومي (08:00)</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          نشط
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium">تقرير المخزون الشهري</div>
                      <div>البريد الإلكتروني</div>
                      <div>شهري (أول يوم 10:00)</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          معطل
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة إشعار مجدول
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">إعدادات الجدولة</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="time-zone">المنطقة الزمنية للجدولة</Label>
                    <p className="text-sm text-muted-foreground">المنطقة الزمنية التي سيتم استخدامها لجدولة الإشعارات</p>
                  </div>
                  <Select defaultValue="Europe/Kiev">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر المنطقة الزمنية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Kiev">أوروبا/كييف (EET)</SelectItem>
                      <SelectItem value="Europe/London">أوروبا/لندن (GMT)</SelectItem>
                      <SelectItem value="Asia/Riyadh">آسيا/الرياض (AST)</SelectItem>
                      <SelectItem value="America/New_York">أمريكا/نيويورك (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="retry-failed">إعادة محاولة الإشعارات الفاشلة</Label>
                    <p className="text-sm text-muted-foreground">إعادة محاولة إرسال الإشعارات التي فشل إرسالها</p>
                  </div>
                  <Switch id="retry-failed" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="max-retries">الحد الأقصى لمحاولات الإعادة</Label>
                    <p className="text-sm text-muted-foreground">عدد مرات إعادة المحاولة قبل التوقف</p>
                  </div>
                  <Select defaultValue="3">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر العدد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 محاولة</SelectItem>
                      <SelectItem value="3">3 محاولات</SelectItem>
                      <SelectItem value="5">5 محاولات</SelectItem>
                      <SelectItem value="10">10 محاولات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6"