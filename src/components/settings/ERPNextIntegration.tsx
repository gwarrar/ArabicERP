import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRightLeft,
  Server,
  Database,
  Users,
  FileText,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Upload,
  Link,
  Unlink,
  Play,
  Pause,
  Shield,
  Key,
  Workflow,
} from "lucide-react";

const ERPNextIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");
  const [erpNextUrl, setErpNextUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [syncSettings, setSyncSettings] = useState({
    customers: true,
    products: true,
    invoices: true,
    accounting: true,
    inventory: true,
    users: false,
    workflows: false,
  });
  const [syncFrequency, setSyncFrequency] = useState("hourly");
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Sample sync logs
  const syncLogs = [
    {
      id: "1",
      timestamp: "2024-08-22 14:30:25",
      status: "success",
      module: "customers",
      details: "تمت مزامنة 150 عميل بنجاح",
    },
    {
      id: "2",
      timestamp: "2024-08-22 14:30:40",
      status: "success",
      module: "products",
      details: "تمت مزامنة 320 منتج بنجاح",
    },
    {
      id: "3",
      timestamp: "2024-08-22 14:31:05",
      status: "warning",
      module: "invoices",
      details:
        "تمت مزامنة 45 فاتورة، 2 فاتورة لم تتم مزامنتها بسبب بيانات غير متطابقة",
    },
    {
      id: "4",
      timestamp: "2024-08-22 14:31:30",
      status: "error",
      module: "accounting",
      details: "فشل في مزامنة القيود المحاسبية: خطأ في الاتصال",
    },
    {
      id: "5",
      timestamp: "2024-08-22 14:32:00",
      status: "success",
      module: "inventory",
      details: "تمت مزامنة 200 صنف مخزون بنجاح",
    },
  ];

  // Sample mapping issues
  const mappingIssues = [
    {
      id: "1",
      entityType: "customer",
      localId: "CUST-001",
      localName: "شركة الأمل للتجارة",
      erpNextId: "CUST0023",
      issue: "اختلاف في بيانات الاتصال",
    },
    {
      id: "2",
      entityType: "product",
      localId: "PROD-042",
      localName: "قماش قطني أبيض",
      erpNextId: "ITM00567",
      issue: "اختلاف في وحدة القياس",
    },
    {
      id: "3",
      entityType: "account",
      localId: "ACC-1020",
      localName: "حساب المبيعات",
      erpNextId: "ACC10045",
      issue: "اختلاف في تصنيف الحساب",
    },
  ];

  // Handle connection to ERPNext
  const handleConnect = () => {
    if (!erpNextUrl || !apiKey || !apiSecret) {
      alert("يرجى إدخال جميع بيانات الاتصال");
      return;
    }

    setConnectionStatus("connecting");

    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus("connected");
      setLastSyncTime(new Date().toISOString());
    }, 2000);
  };

  // Handle disconnection from ERPNext
  const handleDisconnect = () => {
    setConnectionStatus("disconnected");
  };

  // Handle sync now
  const handleSyncNow = () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSyncTime(new Date().toISOString());
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ar-SA");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">تكامل ERPNext</h2>
        <Badge
          variant="outline"
          className={`${connectionStatus === "connected" ? "bg-green-100 text-green-800" : connectionStatus === "connecting" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
        >
          {connectionStatus === "connected"
            ? "متصل"
            : connectionStatus === "connecting"
              ? "جاري الاتصال..."
              : "غير متصل"}
        </Badge>
      </div>

      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">
            <Server className="h-4 w-4 ml-2" />
            الاتصال
          </TabsTrigger>
          <TabsTrigger value="sync-settings">
            <Settings className="h-4 w-4 ml-2" />
            إعدادات المزامنة
          </TabsTrigger>
          <TabsTrigger value="mapping">
            <ArrowRightLeft className="h-4 w-4 ml-2" />
            تخطيط البيانات
          </TabsTrigger>
          <TabsTrigger value="sync-logs">
            <FileText className="h-4 w-4 ml-2" />
            سجلات المزامنة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الاتصال بـ ERPNext</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="erp-url">عنوان خادم ERPNext</Label>
                <Input
                  id="erp-url"
                  placeholder="https://example.erpnext.com"
                  value={erpNextUrl}
                  onChange={(e) => setErpNextUrl(e.target.value)}
                  disabled={connectionStatus === "connected"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">مفتاح API</Label>
                <Input
                  id="api-key"
                  placeholder="أدخل مفتاح API"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={connectionStatus === "connected"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-secret">كلمة سر API</Label>
                <Input
                  id="api-secret"
                  type="password"
                  placeholder="أدخل كلمة سر API"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  disabled={connectionStatus === "connected"}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                {connectionStatus !== "connected" ? (
                  <Button onClick={handleConnect}>
                    <Link className="ml-2 h-4 w-4" />
                    اتصال
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={handleDisconnect}>
                    <Unlink className="ml-2 h-4 w-4" />
                    قطع الاتصال
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {connectionStatus === "connected" && (
            <Card>
              <CardHeader>
                <CardTitle>حالة الاتصال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                    <span>متصل بنجاح بخادم ERPNext</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800"
                  >
                    نشط
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      إصدار ERPNext
                    </div>
                    <div className="text-lg font-medium mt-1">v14.0.0</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      آخر مزامنة
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {lastSyncTime
                        ? formatDate(lastSyncTime)
                        : "لم تتم المزامنة بعد"}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      حالة المزامنة
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {isSyncing ? "جاري المزامنة..." : "مكتمل"}
                    </div>
                  </div>
                </div>

                {isSyncing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>تقدم المزامنة</span>
                      <span>{syncProgress}%</span>
                    </div>
                    <Progress value={syncProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                  >
                    <RefreshCw className="ml-2 h-4 w-4" />
                    مزامنة الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sync-settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المزامنة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">الوحدات المراد مزامنتها</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 ml-2" />
                      <Label htmlFor="sync-customers">العملاء</Label>
                    </div>
                    <Switch
                      id="sync-customers"
                      checked={syncSettings.customers}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, customers: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-green-600 ml-2" />
                      <Label htmlFor="sync-products">المنتجات</Label>
                    </div>
                    <Switch
                      id="sync-products"
                      checked={syncSettings.products}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, products: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-amber-600 ml-2" />
                      <Label htmlFor="sync-invoices">الفواتير</Label>
                    </div>
                    <Switch
                      id="sync-invoices"
                      checked={syncSettings.invoices}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, invoices: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-purple-600 ml-2" />
                      <Label htmlFor="sync-accounting">المحاسبة</Label>
                    </div>
                    <Switch
                      id="sync-accounting"
                      checked={syncSettings.accounting}
                      onCheckedChange={(checked) =>
                        setSyncSettings({
                          ...syncSettings,
                          accounting: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-indigo-600 ml-2" />
                      <Label htmlFor="sync-inventory">المخزون</Label>
                    </div>
                    <Switch
                      id="sync-inventory"
                      checked={syncSettings.inventory}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, inventory: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-rose-600 ml-2" />
                      <Label htmlFor="sync-users">المستخدمين</Label>
                    </div>
                    <Switch
                      id="sync-users"
                      checked={syncSettings.users}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, users: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Workflow className="h-5 w-5 text-cyan-600 ml-2" />
                      <Label htmlFor="sync-workflows">سير العمل</Label>
                    </div>
                    <Switch
                      id="sync-workflows"
                      checked={syncSettings.workflows}
                      onCheckedChange={(checked) =>
                        setSyncSettings({ ...syncSettings, workflows: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">جدولة المزامنة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">تكرار المزامنة</Label>
                    <select
                      id="sync-frequency"
                      className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                      value={syncFrequency}
                      onChange={(e) => setSyncFrequency(e.target.value)}
                    >
                      <option value="manual">يدوي فقط</option>
                      <option value="hourly">كل ساعة</option>
                      <option value="daily">يومياً</option>
                      <option value="weekly">أسبوعياً</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sync-time">
                      وقت المزامنة (للمزامنة اليومية)
                    </Label>
                    <Input
                      id="sync-time"
                      type="time"
                      defaultValue="00:00"
                      disabled={syncFrequency !== "daily"}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">خيارات متقدمة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 ml-2" />
                      <Label htmlFor="conflict-resolution">
                        حل التعارضات تلقائياً
                      </Label>
                    </div>
                    <Switch id="conflict-resolution" />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 text-amber-600 ml-2" />
                      <Label htmlFor="field-mapping">
                        تخطيط الحقول المخصصة
                      </Label>
                    </div>
                    <Switch id="field-mapping" />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 ml-2" />
                      <Label htmlFor="sync-history">
                        الاحتفاظ بسجل المزامنة (30 يوم)
                      </Label>
                    </div>
                    <Switch id="sync-history" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 ml-2" />
                      <Label htmlFor="error-notifications">
                        إشعارات الأخطاء
                      </Label>
                    </div>
                    <Switch id="error-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">إلغاء</Button>
                <Button>حفظ الإعدادات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تخطيط البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">مشاكل التخطيط</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="ml-1 h-4 w-4" />
                    تصدير
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="ml-1 h-4 w-4" />
                    استيراد
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-right py-3 px-4 font-medium">
                        النوع
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        معرف محلي
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الاسم المحلي
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        معرف ERPNext
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        المشكلة
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الإجراء
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingIssues.map((issue) => (
                      <tr key={issue.id} className="border-t hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`${issue.entityType === "customer" ? "bg-blue-100 text-blue-800" : issue.entityType === "product" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}
                          >
                            {issue.entityType === "customer"
                              ? "عميل"
                              : issue.entityType === "product"
                                ? "منتج"
                                : "حساب"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{issue.localId}</td>
                        <td className="py-3 px-4">{issue.localName}</td>
                        <td className="py-3 px-4">{issue.erpNextId}</td>
                        <td className="py-3 px-4">
                          <span className="text-red-600">{issue.issue}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              حل
                            </Button>
                            <Button variant="ghost" size="sm">
                              تجاهل
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">تخطيط الحقول المخصصة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">العملاء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>الرقم الضريبي</span>
                          <span className="text-muted-foreground">
                            tax_id → vat_number
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>فئة العميل</span>
                          <span className="text-muted-foreground">
                            customer_category → customer_group
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>حد الائتمان</span>
                          <span className="text-muted-foreground">
                            credit_limit → credit_limit
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">المنتجات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>الباركود</span>
                          <span className="text-muted-foreground">
                            barcode → barcode
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>وحدة القياس</span>
                          <span className="text-muted-foreground">
                            unit → stock_uom
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded-md">
                          <span>سعر البيع</span>
                          <span className="text-muted-foreground">
                            selling_price → standard_rate
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync-logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجلات المزامنة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800"
                  >
                    نجاح: 3
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800"
                  >
                    تحذير: 1
                  </Badge>
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    خطأ: 1
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="ml-1 h-4 w-4" />
                    تصدير السجل
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="ml-1 h-4 w-4" />
                    تحديث
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-right py-3 px-4 font-medium">
                        التاريخ
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الوحدة
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الحالة
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        التفاصيل
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncLogs.map((log) => (
                      <tr key={log.id} className="border-t hover:bg-muted/30">
                        <td className="py-3 px-4">{log.timestamp}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{log.module}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`${log.status === "success" ? "bg-green-100 text-green-800" : log.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                          >
                            {log.status === "success"
                              ? "نجاح"
                              : log.status === "warning"
                                ? "تحذير"
                                : "خطأ"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  عرض المزيد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ERPNextIntegration;
