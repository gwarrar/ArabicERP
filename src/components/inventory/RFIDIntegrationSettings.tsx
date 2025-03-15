import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Smartphone,
  Wifi,
  Settings,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Zap,
  Database,
  Server,
  Shield,
} from "lucide-react";

const RFIDIntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "general" | "devices" | "mapping" | "advanced"
  >("general");
  const [testStatus, setTestStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  // بيانات تجريبية للأجهزة
  const [devices, setDevices] = useState([
    {
      id: "device-001",
      name: "RFID Scanner 1",
      type: "handheld",
      status: "connected",
      lastSeen: "2024-08-22 10:15",
    },
    {
      id: "device-002",
      name: "RFID Gateway 1",
      type: "fixed",
      status: "disconnected",
      lastSeen: "2024-08-21 15:30",
    },
    {
      id: "device-003",
      name: "RFID Scanner 2",
      type: "handheld",
      status: "connected",
      lastSeen: "2024-08-22 09:45",
    },
  ]);

  // إعدادات عامة
  const [generalSettings, setGeneralSettings] = useState({
    apiEndpoint: "https://rfid-api.example.com/v1",
    apiKey: "rfid_api_key_12345",
    refreshInterval: "5",
    enableAutoSync: true,
    enableNotifications: true,
    logLevel: "info",
  });

  // إعدادات ربط البيانات
  const [mappingSettings, setMappingSettings] = useState({
    tagIdField: "tag_id",
    productIdField: "product_id",
    quantityField: "quantity",
    locationField: "location",
    timestampField: "timestamp",
    customMapping: '{\n  "tag_type": "type",\n  "batch_number": "batch"\n}',
  });

  // إعدادات متقدمة
  const [advancedSettings, setAdvancedSettings] = useState({
    connectionTimeout: "30",
    retryAttempts: "3",
    bufferSize: "1000",
    encryptData: true,
    debugMode: false,
    customHeaders:
      '{\n  "X-Client-Version": "1.0.0",\n  "X-Client-ID": "erp-system"\n}',
  });

  // اختبار الاتصال
  const testConnection = () => {
    setTestStatus("testing");

    // محاكاة عملية الاختبار
    setTimeout(() => {
      if (generalSettings.apiEndpoint && generalSettings.apiKey) {
        setTestStatus("success");
      } else {
        setTestStatus("error");
      }
    }, 2000);
  };

  // حفظ الإعدادات
  const saveSettings = () => {
    // محاكاة عملية الحفظ
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
    }, 3000);
  };

  // تحديث حالة الأجهزة
  const refreshDevices = () => {
    // محاكاة تحديث حالة الأجهزة
    const updatedDevices = [...devices];
    updatedDevices[1] = {
      ...updatedDevices[1],
      status: "connected",
      lastSeen: new Date().toLocaleString(),
    };
    setDevices(updatedDevices);
  };

  // الحصول على لون حالة الجهاز
  const getDeviceStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">متصل</Badge>;
      case "disconnected":
        return <Badge className="bg-red-100 text-red-800">غير متصل</Badge>;
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800">قيد الانتظار</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إعدادات تكامل RFID</h2>
          <p className="text-muted-foreground">
            إدارة إعدادات تكامل أجهزة RFID مع النظام
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={testStatus === "testing"}
          >
            {testStatus === "testing" ? (
              <>
                <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                جاري الاختبار...
              </>
            ) : (
              <>
                <Wifi className="ml-2 h-4 w-4" />
                اختبار الاتصال
              </>
            )}
          </Button>
          <Button onClick={saveSettings} disabled={savedStatus}>
            {savedStatus ? (
              <>
                <CheckCircle className="ml-2 h-4 w-4" />
                تم الحفظ
              </>
            ) : (
              <>
                <Save className="ml-2 h-4 w-4" />
                حفظ الإعدادات
              </>
            )}
          </Button>
        </div>
      </div>

      {/* حالة اختبار الاتصال */}
      {testStatus === "success" && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>تم الاتصال بنجاح</AlertTitle>
          <AlertDescription>
            تم التحقق من الاتصال بخدمة RFID بنجاح.
          </AlertDescription>
        </Alert>
      )}

      {testStatus === "error" && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>فشل الاتصال</AlertTitle>
          <AlertDescription>
            تعذر الاتصال بخدمة RFID. يرجى التحقق من الإعدادات والمحاولة مرة
            أخرى.
          </AlertDescription>
        </Alert>
      )}

      {/* تبويبات الإعدادات */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Settings className="ml-2 h-4 w-4" />
            إعدادات عامة
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="ml-2 h-4 w-4" />
            الأجهزة
          </TabsTrigger>
          <TabsTrigger value="mapping">
            <Database className="ml-2 h-4 w-4" />
            ربط البيانات
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Zap className="ml-2 h-4 w-4" />
            إعدادات متقدمة
          </TabsTrigger>
        </TabsList>

        {/* الإعدادات العامة */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">عنوان API</Label>
                  <Input
                    id="apiEndpoint"
                    value={generalSettings.apiEndpoint}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        apiEndpoint: e.target.value,
                      })
                    }
                    placeholder="https://example.com/api"
                  />
                  <p className="text-xs text-muted-foreground">
                    عنوان URL لخدمة RFID API
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">مفتاح API</Label>
                  <Input
                    id="apiKey"
                    value={generalSettings.apiKey}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        apiKey: e.target.value,
                      })
                    }
                    type="password"
                    placeholder="أدخل مفتاح API"
                  />
                  <p className="text-xs text-muted-foreground">
                    مفتاح المصادقة للوصول إلى خدمة RFID
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">
                    فترة التحديث (بالثواني)
                  </Label>
                  <Input
                    id="refreshInterval"
                    value={generalSettings.refreshInterval}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        refreshInterval: e.target.value,
                      })
                    }
                    type="number"
                    min="1"
                    max="60"
                  />
                  <p className="text-xs text-muted-foreground">
                    الفترة الزمنية بين تحديثات حالة الأجهزة
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logLevel">مستوى السجلات</Label>
                  <Select
                    value={generalSettings.logLevel}
                    onValueChange={(value) =>
                      setGeneralSettings({
                        ...generalSettings,
                        logLevel: value,
                      })
                    }
                  >
                    <SelectTrigger id="logLevel">
                      <SelectValue placeholder="اختر مستوى السجلات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">تصحيح (Debug)</SelectItem>
                      <SelectItem value="info">معلومات (Info)</SelectItem>
                      <SelectItem value="warning">تحذير (Warning)</SelectItem>
                      <SelectItem value="error">خطأ (Error)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    مستوى تفاصيل سجلات النظام
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAutoSync">المزامنة التلقائية</Label>
                    <p className="text-xs text-muted-foreground">
                      مزامنة البيانات تلقائياً مع قاعدة البيانات
                    </p>
                  </div>
                  <Switch
                    id="enableAutoSync"
                    checked={generalSettings.enableAutoSync}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableAutoSync: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">الإشعارات</Label>
                    <p className="text-xs text-muted-foreground">
                      تفعيل إشعارات أحداث RFID
                    </p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={generalSettings.enableNotifications}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({
                        ...generalSettings,
                        enableNotifications: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الأجهزة */}
        <TabsContent value="devices">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>الأجهزة المتصلة</CardTitle>
              <Button variant="outline" size="sm" onClick={refreshDevices}>
                <RefreshCw className="ml-2 h-4 w-4" />
                تحديث
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {device.id}
                          </p>
                        </div>
                      </div>
                      {getDeviceStatusBadge(device.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">النوع:</span>{" "}
                        <span>
                          {device.type === "handheld" ? "محمول باليد" : "ثابت"}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">آخر ظهور:</span>{" "}
                        <span>{device.lastSeen}</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        <Settings className="ml-2 h-4 w-4" />
                        إعدادات الجهاز
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">
                  <Smartphone className="ml-2 h-4 w-4" />
                  إضافة جهاز جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ربط البيانات */}
        <TabsContent value="mapping">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات ربط البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tagIdField">حقل معرف التاج</Label>
                  <Input
                    id="tagIdField"
                    value={mappingSettings.tagIdField}
                    onChange={(e) =>
                      setMappingSettings({
                        ...mappingSettings,
                        tagIdField: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    اسم الحقل الذي يحتوي على معرف تاج RFID
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productIdField">حقل معرف المنتج</Label>
                  <Input
                    id="productIdField"
                    value={mappingSettings.productIdField}
                    onChange={(e) =>
                      setMappingSettings({
                        ...mappingSettings,
                        productIdField: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    اسم الحقل الذي يحتوي على معرف المنتج
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantityField">حقل الكمية</Label>
                  <Input
                    id="quantityField"
                    value={mappingSettings.quantityField}
                    onChange={(e) =>
                      setMappingSettings({
                        ...mappingSettings,
                        quantityField: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    اسم الحقل الذي يحتوي على كمية المنتج
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationField">حقل الموقع</Label>
                  <Input
                    id="locationField"
                    value={mappingSettings.locationField}
                    onChange={(e) =>
                      setMappingSettings({
                        ...mappingSettings,
                        locationField: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    اسم الحقل الذي يحتوي على موقع المنتج
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timestampField">حقل الطابع الزمني</Label>
                  <Input
                    id="timestampField"
                    value={mappingSettings.timestampField}
                    onChange={(e) =>
                      setMappingSettings({
                        ...mappingSettings,
                        timestampField: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    اسم الحقل الذي يحتوي على وقت المسح
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customMapping">تخصيص إضافي للحقول (JSON)</Label>
                <Textarea
                  id="customMapping"
                  value={mappingSettings.customMapping}
                  onChange={(e) =>
                    setMappingSettings({
                      ...mappingSettings,
                      customMapping: e.target.value,
                    })
                  }
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  تعيين مخصص للحقول الإضافية بتنسيق JSON
                </p>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle>معلومات</AlertTitle>
                <AlertDescription>
                  يجب أن تتطابق أسماء الحقول مع تلك الموجودة في قاعدة البيانات
                  وفي بيانات RFID.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات متقدمة */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات متقدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>تحذير</AlertTitle>
                <AlertDescription>
                  هذه الإعدادات مخصصة للمستخدمين المتقدمين. قد يؤدي التغيير غير
                  الصحيح إلى مشاكل في النظام.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="connectionTimeout">
                    مهلة الاتصال (بالثواني)
                  </Label>
                  <Input
                    id="connectionTimeout"
                    value={advancedSettings.connectionTimeout}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        connectionTimeout: e.target.value,
                      })
                    }
                    type="number"
                    min="5"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retryAttempts">
                    عدد محاولات إعادة المحاولة
                  </Label>
                  <Input
                    id="retryAttempts"
                    value={advancedSettings.retryAttempts}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        retryAttempts: e.target.value,
                      })
                    }
                    type="number"
                    min="0"
                    max="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bufferSize">حجم المخزن المؤقت</Label>
                  <Input
                    id="bufferSize"
                    value={advancedSettings.bufferSize}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        bufferSize: e.target.value,
                      })
                    }
                    type="number"
                    min="100"
                    max="10000"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="encryptData">تشفير البيانات</Label>
                    <p className="text-xs text-muted-foreground">
                      تشفير البيانات المرسلة والمستلمة
                    </p>
                  </div>
                  <Switch
                    id="encryptData"
                    checked={advancedSettings.encryptData}
                    onCheckedChange={(checked) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        encryptData: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debugMode">وضع التصحيح</Label>
                    <p className="text-xs text-muted-foreground">
                      تفعيل وضع التصحيح لتسجيل المزيد من المعلومات
                    </p>
                  </div>
                  <Switch
                    id="debugMode"
                    checked={advancedSettings.debugMode}
                    onCheckedChange={(checked) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        debugMode: checked,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customHeaders">ترويسات HTTP مخصصة (JSON)</Label>
                <Textarea
                  id="customHeaders"
                  value={advancedSettings.customHeaders}
                  onChange={(e) =>
                    setAdvancedSettings({
                      ...advancedSettings,
                      customHeaders: e.target.value,
                    })
                  }
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  ترويسات HTTP مخصصة لإرسالها مع طلبات API
                </p>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  إعادة تعيين الإعدادات الافتراضية
                </Button>

                <Button variant="outline">
                  <Server className="ml-2 h-4 w-4" />
                  اختبار الإعدادات المتقدمة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RFIDIntegrationSettings;
