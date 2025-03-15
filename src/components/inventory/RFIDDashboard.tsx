import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Smartphone,
  Tag,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart,
  PieChart,
  Package,
  Warehouse,
  Clock,
  Calendar,
  ArrowRight,
  Link,
  Printer,
  RefreshCw,
  Zap,
  Wifi,
  WifiOff,
} from "lucide-react";

const RFIDDashboard = () => {
  const [deviceStatus, setDeviceStatus] = useState<
    "connected" | "disconnected"
  >("connected");
  const [refreshing, setRefreshing] = useState(false);

  // بيانات تجريبية للإحصائيات
  const stats = {
    totalTags: 245,
    linkedTags: 210,
    unlinkedTags: 30,
    damagedTags: 5,
    lastScanDate: "2024-08-22 10:15",
    lastScanItems: 45,
    scanAccuracy: 98.5,
    inventoryAccuracy: 96.2,
    activeDevices: 3,
    totalDevices: 4,
  };

  // بيانات تجريبية للأجهزة
  const devices = [
    {
      id: "device-001",
      name: "RFID Scanner 1",
      type: "handheld",
      status: "connected",
      battery: 85,
      lastSeen: "2024-08-22 10:15",
    },
    {
      id: "device-002",
      name: "RFID Gateway 1",
      type: "fixed",
      status: "connected",
      battery: null,
      lastSeen: "2024-08-22 10:10",
    },
    {
      id: "device-003",
      name: "RFID Scanner 2",
      type: "handheld",
      status: "connected",
      battery: 45,
      lastSeen: "2024-08-22 09:45",
    },
    {
      id: "device-004",
      name: "RFID Gateway 2",
      type: "fixed",
      status: "disconnected",
      battery: null,
      lastSeen: "2024-08-21 15:30",
    },
  ];

  // بيانات تجريبية للنشاطات الأخيرة
  const recentActivities = [
    {
      id: "act-001",
      type: "scan",
      description: "مسح مخزون المستودع الرئيسي",
      items: 45,
      user: "أحمد محمد",
      date: "2024-08-22 10:15",
      status: "completed",
    },
    {
      id: "act-002",
      type: "link",
      description: "ربط تاجات RFID بمنتج قماش جينز",
      items: 20,
      user: "محمد علي",
      date: "2024-08-22 09:30",
      status: "completed",
    },
    {
      id: "act-003",
      type: "print",
      description: "طباعة تاجات RFID جديدة",
      items: 50,
      user: "أحمد محمد",
      date: "2024-08-21 14:45",
      status: "completed",
    },
    {
      id: "act-004",
      type: "inventory",
      description: "جرد مستودع المواد الخام",
      items: 120,
      user: "فاطمة أحمد",
      date: "2024-08-21 11:20",
      status: "completed",
    },
    {
      id: "act-005",
      type: "scan",
      description: "مسح مخزون مستودع المنتجات النهائية",
      items: 75,
      user: "خالد العبدالله",
      date: "2024-08-20 15:10",
      status: "completed",
    },
  ];

  // بيانات تجريبية للتنبيهات
  const alerts = [
    {
      id: "alert-001",
      type: "warning",
      description: "بطارية جهاز RFID Scanner 2 منخفضة (45%)",
      date: "2024-08-22 09:45",
    },
    {
      id: "alert-002",
      type: "error",
      description: "جهاز RFID Gateway 2 غير متصل",
      date: "2024-08-21 15:30",
    },
    {
      id: "alert-003",
      type: "warning",
      description: "5 تاجات RFID تالفة تحتاج إلى استبدال",
      date: "2024-08-20 16:10",
    },
  ];

  // تحديث حالة الأجهزة
  const refreshDeviceStatus = () => {
    setRefreshing(true);

    // محاكاة عملية التحديث
    setTimeout(() => {
      setDeviceStatus(Math.random() > 0.3 ? "connected" : "disconnected");
      setRefreshing(false);
    }, 1500);
  };

  // الحصول على لون حالة النشاط
  const getActivityStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">جاري</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">فشل</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // الحصول على أيقونة نوع النشاط
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "scan":
        return <Smartphone className="h-4 w-4 text-blue-600" />;
      case "link":
        return <Link className="h-4 w-4 text-green-600" />;
      case "print":
        return <Printer className="h-4 w-4 text-purple-600" />;
      case "inventory":
        return <Package className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  // الحصول على أيقونة نوع التنبيه
  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">لوحة تحكم RFID</h2>
          <p className="text-muted-foreground">
            نظرة عامة على نظام RFID وإحصائياته
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {deviceStatus === "connected" ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">متصل</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-600">غير متصل</span>
              </>
            )}
          </div>
          <Button
            variant="outline"
            onClick={refreshDeviceStatus}
            disabled={refreshing}
          >
            {refreshing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            تحديث
          </Button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التاجات</p>
                <h3 className="text-2xl font-bold mt-2">{stats.totalTags}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-green-600 flex items-center font-medium">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {Math.round((stats.linkedTags / stats.totalTags) * 100)}%
                    مرتبطة
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">دقة الجرد</p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.inventoryAccuracy}%
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-blue-600 flex items-center font-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    آخر تحديث: اليوم
                  </span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">آخر مسح</p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.lastScanItems} عنصر
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {stats.lastScanDate}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Smartphone className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">الأجهزة النشطة</p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.activeDevices}/{stats.totalDevices}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-amber-600 flex items-center font-medium">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    جهاز واحد غير متصل
                  </span>
                </div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الرسم البياني لتوزيع التاجات */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع تاجات RFID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="text-center">
                <PieChart className="h-40 w-40 mx-auto text-muted-foreground" />
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">
                      مرتبطة: {stats.linkedTags} (
                      {Math.round((stats.linkedTags / stats.totalTags) * 100)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">
                      غير مرتبطة: {stats.unlinkedTags} (
                      {Math.round((stats.unlinkedTags / stats.totalTags) * 100)}
                      %)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">
                      تالفة: {stats.damagedTags} (
                      {Math.round((stats.damagedTags / stats.totalTags) * 100)}
                      %)
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-md">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">مرتبطة</span>
                      <span className="text-sm">
                        {Math.round((stats.linkedTags / stats.totalTags) * 100)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={Math.round(
                        (stats.linkedTags / stats.totalTags) * 100,
                      )}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">غير مرتبطة</span>
                      <span className="text-sm">
                        {Math.round(
                          (stats.unlinkedTags / stats.totalTags) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={Math.round(
                        (stats.unlinkedTags / stats.totalTags) * 100,
                      )}
                      className="h-2 bg-gray-200"
                    >
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${Math.round((stats.unlinkedTags / stats.totalTags) * 100)}%`,
                        }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">تالفة</span>
                      <span className="text-sm">
                        {Math.round(
                          (stats.damagedTags / stats.totalTags) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={Math.round(
                        (stats.damagedTags / stats.totalTags) * 100,
                      )}
                      className="h-2 bg-gray-200"
                    >
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{
                          width: `${Math.round((stats.damagedTags / stats.totalTags) * 100)}%`,
                        }}
                      ></div>
                    </Progress>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* حالة الأجهزة */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>حالة أجهزة RFID</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshDeviceStatus}
              disabled={refreshing}
            >
              {refreshing ? (
                <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="ml-2 h-4 w-4" />
              )}
              تحديث
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{device.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {device.type === "handheld" ? "محمول باليد" : "ثابت"}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        device.status === "connected"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {device.status === "connected" ? "متصل" : "غير متصل"}
                    </Badge>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      آخر ظهور: {device.lastSeen}
                    </span>
                    {device.battery !== null && (
                      <div className="flex items-center gap-1">
                        <span
                          className={
                            device.battery < 50
                              ? "text-amber-600"
                              : "text-green-600"
                          }
                        >
                          البطارية: {device.battery}%
                        </span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${device.battery < 20 ? "bg-red-500" : device.battery < 50 ? "bg-amber-500" : "bg-green-500"}`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* النشاطات الأخيرة */}
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 border-b last:border-0"
                >
                  <div className="p-2 rounded-full bg-blue-50">
                    {getActivityTypeIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{activity.description}</h3>
                      {getActivityStatusBadge(activity.status)}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">
                        {activity.user} • {activity.items} عنصر
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  عرض المزيد
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التنبيهات */}
        <Card>
          <CardHeader>
            <CardTitle>التنبيهات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 border-b last:border-0"
                  >
                    <div
                      className={`p-2 rounded-full ${alert.type === "warning" ? "bg-amber-50" : alert.type === "error" ? "bg-red-50" : "bg-blue-50"}`}
                    >
                      {getAlertTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{alert.description}</h3>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-sm text-muted-foreground">
                          {alert.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mb-2 text-green-500" />
                  <p>لا توجد تنبيهات حالية</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الإجراءات السريعة */}
      <Card>
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
              <Smartphone className="h-6 w-6" />
              <span>بدء مسح RFID</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Tag className="h-6 w-6" />
              <span>إدارة التاجات</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Link className="h-6 w-6" />
              <span>ربط تاجات جديدة</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Printer className="h-6 w-6" />
              <span>طباعة تاجات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFIDDashboard;
