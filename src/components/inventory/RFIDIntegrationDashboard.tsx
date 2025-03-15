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
  BarChart,
  PieChart,
  ArrowUp,
  ArrowDown,
  Tag,
  Smartphone,
  Warehouse,
  Package,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Clock,
  Calendar,
  Link,
  FileText,
  Download,
  Layers,
  Database,
  Server,
  Cloud,
} from "lucide-react";

const RFIDIntegrationDashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Sample data for the dashboard
  const stats = {
    totalTags: 450,
    activeTags: 425,
    inactiveTags: 25,
    inventoryAccuracy: 97.8,
    systemIntegrations: 5,
    activeDevices: 8,
    lastSyncTime: "2024-08-22 09:15",
    syncStatus: "completed",
  };

  // Sample integration systems
  const integrations = [
    {
      id: "int-001",
      name: "نظام المخزون الرئيسي",
      type: "internal",
      status: "connected",
      lastSync: "2024-08-22 09:15",
      syncFrequency: "كل ساعة",
      dataFlow: "two-way",
    },
    {
      id: "int-002",
      name: "نظام المبيعات",
      type: "internal",
      status: "connected",
      lastSync: "2024-08-22 08:30",
      syncFrequency: "كل ساعة",
      dataFlow: "one-way",
    },
    {
      id: "int-003",
      name: "نظام المشتريات",
      type: "internal",
      status: "connected",
      lastSync: "2024-08-22 08:00",
      syncFrequency: "كل ساعة",
      dataFlow: "one-way",
    },
    {
      id: "int-004",
      name: "نظام التصنيع",
      type: "internal",
      status: "connected",
      lastSync: "2024-08-22 07:45",
      syncFrequency: "كل ساعة",
      dataFlow: "two-way",
    },
    {
      id: "int-005",
      name: "نظام الشحن",
      type: "external",
      status: "connected",
      lastSync: "2024-08-22 06:30",
      syncFrequency: "كل 3 ساعات",
      dataFlow: "one-way",
    },
  ];

  // Sample sync logs
  const syncLogs = [
    {
      id: "sync-001",
      timestamp: "2024-08-22 09:15",
      system: "نظام المخزون الرئيسي",
      status: "completed",
      recordsProcessed: 245,
      duration: "00:01:15",
    },
    {
      id: "sync-002",
      timestamp: "2024-08-22 08:30",
      system: "نظام المبيعات",
      status: "completed",
      recordsProcessed: 120,
      duration: "00:00:45",
    },
    {
      id: "sync-003",
      timestamp: "2024-08-22 08:00",
      system: "نظام المشتريات",
      status: "completed",
      recordsProcessed: 85,
      duration: "00:00:30",
    },
    {
      id: "sync-004",
      timestamp: "2024-08-22 07:45",
      system: "نظام التصنيع",
      status: "warning",
      recordsProcessed: 110,
      duration: "00:01:05",
    },
    {
      id: "sync-005",
      timestamp: "2024-08-22 06:30",
      system: "نظام الشحن",
      status: "error",
      recordsProcessed: 0,
      duration: "00:00:10",
    },
  ];

  // Refresh data
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
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

  // Get sync status badge
  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">تحذير</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">جاري</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get sync status icon
  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "in_progress":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">لوحة تحكم تكامل RFID</h2>
          <p className="text-muted-foreground">
            إدارة ومراقبة تكامل نظام RFID مع أنظمة المؤسسة الأخرى
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={refreshing}>
            {refreshing ? (
              <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="ml-2 h-4 w-4" />
            )}
            تحديث
          </Button>
          <Button>
            <Settings className="ml-2 h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التاجات</p>
                <h3 className="text-2xl font-bold mt-2">{stats.totalTags}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-green-600 flex items-center font-medium">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    5.2% من الشهر الماضي
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
                <p className="text-sm text-muted-foreground">دقة المخزون</p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.inventoryAccuracy}%
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-green-600 flex items-center font-medium">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    1.2% من الشهر الماضي
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
                <p className="text-sm text-muted-foreground">
                  الأنظمة المتكاملة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {stats.systemIntegrations}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-blue-600 flex items-center font-medium">
                    <Link className="h-3 w-3 mr-1" />
                    جميع الأنظمة متصلة
                  </span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Layers className="h-5 w-5 text-purple-600" />
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
                  {stats.activeDevices}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-green-600 flex items-center font-medium">
                    <Zap className="h-3 w-3 mr-1" />
                    جميع الأجهزة متصلة
                  </span>
                </div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Smartphone className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>الأنظمة المتكاملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="p-3 border rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${integration.type === "internal" ? "bg-blue-50" : "bg-purple-50"}`}
                    >
                      {integration.type === "internal" ? (
                        <Database className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Cloud className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>آخر مزامنة: {integration.lastSync}</span>
                        <span>•</span>
                        <span>التكرار: {integration.syncFrequency}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(integration.status)}
                    <Badge
                      variant="outline"
                      className={`${integration.dataFlow === "two-way" ? "bg-blue-50 text-blue-800" : "bg-amber-50 text-amber-800"}`}
                    >
                      {integration.dataFlow === "two-way"
                        ? "ثنائي الاتجاه"
                        : "أحادي الاتجاه"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync Logs */}
        <Card>
          <CardHeader>
            <CardTitle>سجل المزامنة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ والوقت</TableHead>
                    <TableHead>النظام</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>السجلات</TableHead>
                    <TableHead>المدة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.system}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getSyncStatusIcon(log.status)}
                          {getSyncStatusBadge(log.status)}
                        </div>
                      </TableCell>
                      <TableCell>{log.recordsProcessed}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>تدفق البيانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 space-y-8">
            <div className="flex justify-center items-center gap-8 w-full">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-100 rounded-full mb-2">
                  <Tag className="h-8 w-8 text-blue-600" />
                </div>
                <span className="font-medium">نظام RFID</span>
              </div>

              <div className="flex-1 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2">
                  <div className="absolute top-0 left-0 h-full w-3/4 bg-green-500 rounded-full"></div>
                </div>
                <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 -translate-x-1/2">
                  <div className="p-1 bg-green-500 rounded-full">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-4 bg-purple-100 rounded-full mb-2">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <span className="font-medium">أنظمة المؤسسة</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <div className="p-4 border rounded-md flex items-center gap-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">بيانات المنتجات</h4>
                  <p className="text-sm text-muted-foreground">
                    245 منتج متزامن
                  </p>
                </div>
              </div>

              <div className="p-4 border rounded-md flex items-center gap-3">
                <Warehouse className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">بيانات المخزون</h4>
                  <p className="text-sm text-muted-foreground">
                    120 موقع متزامن
                  </p>
                </div>
              </div>

              <div className="p-4 border rounded-md flex items-center gap-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <div>
                  <h4 className="font-medium">بيانات المعاملات</h4>
                  <p className="text-sm text-muted-foreground">
                    85 معاملة متزامنة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
              <RefreshCw className="h-6 w-6" />
              <span>مزامنة يدوية</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Settings className="h-6 w-6" />
              <span>إعدادات المزامنة</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <FileText className="h-6 w-6" />
              <span>تقرير المزامنة</span>
            </Button>
            <Button
              className="h-auto py-4 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Download className="h-6 w-6" />
              <span>تصدير البيانات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFIDIntegrationDashboard;
