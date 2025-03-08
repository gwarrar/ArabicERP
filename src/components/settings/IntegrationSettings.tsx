import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Mail,
  MessageSquare,
  FileText,
  Database,
  CreditCard,
  Calendar,
  Link,
  Check,
  X,
  Plus,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected";
  lastSync?: string;
}

const IntegrationSettings = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [showAddIntegration, setShowAddIntegration] = useState(false);

  // Sample integrations data
  const emailIntegrations: Integration[] = [
    {
      id: "gmail",
      name: "Gmail",
      description: "ربط مع حساب Gmail لإرسال واستقبال البريد الإلكتروني",
      icon: <Mail className="h-6 w-6 text-red-500" />,
      status: "connected",
      lastSync: "2024-07-15 10:30",
    },
    {
      id: "outlook",
      name: "Outlook",
      description: "ربط مع حساب Outlook لإرسال واستقبال البريد الإلكتروني",
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  const chatIntegrations: Integration[] = [
    {
      id: "slack",
      name: "Slack",
      description: "ربط مع Slack لإرسال التنبيهات والإشعارات",
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      status: "connected",
      lastSync: "2024-07-14 14:15",
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "ربط مع Microsoft Teams لإرسال التنبيهات والإشعارات",
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  const documentIntegrations: Integration[] = [
    {
      id: "gdrive",
      name: "Google Drive",
      description: "ربط مع Google Drive لتخزين ومشاركة المستندات",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      status: "connected",
      lastSync: "2024-07-12 11:00",
    },
    {
      id: "onedrive",
      name: "OneDrive",
      description: "ربط مع OneDrive لتخزين ومشاركة المستندات",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  const erpIntegrations: Integration[] = [
    {
      id: "quickbooks",
      name: "QuickBooks",
      description: "ربط مع QuickBooks لمزامنة البيانات المالية",
      icon: <Database className="h-6 w-6 text-green-500" />,
      status: "disconnected",
    },
    {
      id: "xero",
      name: "Xero",
      description: "ربط مع Xero لمزامنة البيانات المالية",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  const paymentIntegrations: Integration[] = [
    {
      id: "stripe",
      name: "Stripe",
      description: "ربط مع Stripe لمعالجة المدفوعات",
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      status: "connected",
      lastSync: "2024-07-10 09:45",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "ربط مع PayPal لمعالجة المدفوعات",
      icon: <CreditCard className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  const calendarIntegrations: Integration[] = [
    {
      id: "gcalendar",
      name: "Google Calendar",
      description: "ربط مع Google Calendar لمزامنة المواعيد والأحداث",
      icon: <Calendar className="h-6 w-6 text-red-500" />,
      status: "connected",
      lastSync: "2024-07-13 12:30",
    },
    {
      id: "outlook-calendar",
      name: "Outlook Calendar",
      description: "ربط مع Outlook Calendar لمزامنة المواعيد والأحداث",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      status: "disconnected",
    },
  ];

  // Function to get integrations based on active tab
  const getIntegrations = () => {
    switch (activeTab) {
      case "email":
        return emailIntegrations;
      case "chat":
        return chatIntegrations;
      case "documents":
        return documentIntegrations;
      case "erp":
        return erpIntegrations;
      case "payment":
        return paymentIntegrations;
      case "calendar":
        return calendarIntegrations;
      default:
        return emailIntegrations;
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 ml-2" />
              البريد الإلكتروني
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 ml-2" />
              الدردشة
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 ml-2" />
              المستندات
            </TabsTrigger>
            <TabsTrigger value="erp">
              <Database className="h-4 w-4 ml-2" />
              أنظمة ERP
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4 ml-2" />
              المدفوعات
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 ml-2" />
              التقويم
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {activeTab === "email" && "تكامل البريد الإلكتروني"}
                {activeTab === "chat" && "تكامل أنظمة الدردشة"}
                {activeTab === "documents" && "تكامل أنظمة المستندات"}
                {activeTab === "erp" && "تكامل أنظمة ERP"}
                {activeTab === "payment" && "تكامل أنظمة المدفوعات"}
                {activeTab === "calendar" && "تكامل أنظمة التقويم"}
              </h3>
              <Button onClick={() => setShowAddIntegration(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة تكامل جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getIntegrations().map((integration) => (
                <div
                  key={integration.id}
                  className="border rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {integration.description}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${integration.status === "connected" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {integration.status === "connected"
                          ? "متصل"
                          : "غير متصل"}
                      </span>
                    </div>
                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground mt-2">
                        آخر مزامنة: {integration.lastSync}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      {integration.status === "connected" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="ml-1 h-3 w-3" />
                            مزامنة
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="ml-1 h-3 w-3" />
                            إعدادات
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <X className="ml-1 h-3 w-3" />
                            فصل
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Link className="ml-1 h-3 w-3" />
                          اتصال
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">إعدادات المزامنة</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-sync">مزامنة تلقائية</Label>
                    <p className="text-sm text-muted-foreground">
                      مزامنة البيانات تلقائيًا مع الخدمات المتصلة
                    </p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-interval">فترة المزامنة</Label>
                    <p className="text-sm text-muted-foreground">
                      تحديد الفترة الزمنية بين عمليات المزامنة التلقائية
                    </p>
                  </div>
                  <div className="w-32">
                    <Input
                      id="sync-interval"
                      type="number"
                      defaultValue="30"
                      min="5"
                      className="text-left"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-notifications">إشعارات المزامنة</Label>
                    <p className="text-sm text-muted-foreground">
                      إظهار إشعارات عند اكتمال المزامنة أو حدوث خطأ
                    </p>
                  </div>
                  <Switch id="sync-notifications" defaultChecked />
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

        {/* Add Integration Dialog */}
        <Dialog open={showAddIntegration} onOpenChange={setShowAddIntegration}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة تكامل جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>نوع التكامل</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <Mail className="h-8 w-8 text-blue-500" />
                    <span className="text-sm font-medium">بريد إلكتروني</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <MessageSquare className="h-8 w-8 text-purple-500" />
                    <span className="text-sm font-medium">دردشة</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <FileText className="h-8 w-8 text-green-500" />
                    <span className="text-sm font-medium">مستندات</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <Database className="h-8 w-8 text-amber-500" />
                    <span className="text-sm font-medium">ERP</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <CreditCard className="h-8 w-8 text-red-500" />
                    <span className="text-sm font-medium">مدفوعات</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                    <Calendar className="h-8 w-8 text-indigo-500" />
                    <span className="text-sm font-medium">تقويم</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>الخدمة</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Gmail</h4>
                      <p className="text-xs text-muted-foreground">
                        ربط مع حساب Gmail
                      </p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Outlook</h4>
                      <p className="text-xs text-muted-foreground">
                        ربط مع حساب Outlook
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">مفتاح API (اختياري)</Label>
                <Input id="api-key" placeholder="أدخل مفتاح API" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">عنوان Webhook (اختياري)</Label>
                <Input id="webhook-url" placeholder="أدخل عنوان Webhook" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync-new">مزامنة تلقائية</Label>
                  <Switch id="auto-sync-new" defaultChecked />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddIntegration(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowAddIntegration(false)}>
                إضافة التكامل
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
