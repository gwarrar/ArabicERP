import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clipboard,
  ClipboardCheck,
  Search,
  Plus,
  Calendar,
  Filter,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Edit,
  Trash,
  ArrowUpDown,
  BarChart,
  Download,
  Smartphone,
  QrCode,
} from "lucide-react";
import RFIDScannerInterface from "./RFIDScannerInterface";
import RFIDInventoryReport from "./RFIDInventoryReport";
import { processRFIDData } from "@/utils/rfidUtils";

// نموذج لبيانات الجرد
interface InventoryCountItem {
  id: string;
  productId: string;
  productName: string;
  location: string;
  expectedQty: number;
  actualQty: number;
  unit: string;
  difference: number;
  status: "مطابق" | "فرق بسيط" | "فرق كبير";
  notes?: string;
  lastCount?: string;
}

interface InventoryCountSession {
  id: string;
  name: string;
  date: string;
  status: "مخطط" | "جاري" | "مكتمل";
  type: "كامل" | "جزئي" | "دوري";
  location: string;
  itemsCount: number;
  progress: number;
  assignedTo: string;
  discrepancies: number;
}

const InventoryCount = () => {
  const [activeTab, setActiveTab] = useState<
    "sessions" | "current" | "reports" | "rfid-report"
  >("sessions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [showCountDialog, setShowCountDialog] = useState(false);
  const [showRFIDScanner, setShowRFIDScanner] = useState(false);
  const [inventoryMethod, setInventoryMethod] = useState<
    "manual" | "rfid" | "barcode"
  >("manual");
  const [selectedSession, setSelectedSession] =
    useState<InventoryCountSession | null>(null);
  const [scannedRFIDItems, setScannedRFIDItems] = useState<any[]>([]);
  const [rfidSessionInfo, setRfidSessionInfo] = useState({
    sessionId: "",
    sessionName: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    operator: "أحمد محمد",
  });

  // بيانات تجريبية لجلسات الجرد
  const inventoryCountSessions: InventoryCountSession[] = [
    {
      id: "INV-COUNT-001",
      name: "الجرد الشهري - أغسطس 2024",
      date: "2024-08-15",
      status: "مكتمل",
      type: "كامل",
      location: "المستودع الرئيسي",
      itemsCount: 245,
      progress: 100,
      assignedTo: "أحمد محمد",
      discrepancies: 12,
    },
    {
      id: "INV-COUNT-002",
      name: "جرد المواد الخام",
      date: "2024-08-20",
      status: "جاري",
      type: "جزئي",
      location: "مستودع المواد الخام",
      itemsCount: 120,
      progress: 65,
      assignedTo: "محمد علي",
      discrepancies: 5,
    },
    {
      id: "INV-COUNT-003",
      name: "جرد المنتجات النهائية",
      date: "2024-08-25",
      status: "مخطط",
      type: "جزئي",
      location: "مستودع المنتجات النهائية",
      itemsCount: 180,
      progress: 0,
      assignedTo: "فاطمة أحمد",
      discrepancies: 0,
    },
    {
      id: "INV-COUNT-004",
      name: "الجرد الربع سنوي - Q3 2024",
      date: "2024-09-30",
      status: "مخطط",
      type: "كامل",
      location: "جميع المستودعات",
      itemsCount: 450,
      progress: 0,
      assignedTo: "خالد العبدالله",
      discrepancies: 0,
    },
  ];

  // بيانات تجريبية لعناصر الجرد الحالي
  const currentCountItems: InventoryCountItem[] = [
    {
      id: "COUNT-ITEM-001",
      productId: "PROD-001",
      productName: "قماش قطني أبيض",
      location: "A-01-01",
      expectedQty: 1200,
      actualQty: 1195,
      unit: "متر",
      difference: -5,
      status: "فرق بسيط",
      lastCount: "2024-07-15",
    },
    {
      id: "COUNT-ITEM-002",
      productId: "PROD-002",
      productName: "خيط بوليستر أسود",
      location: "A-02-03",
      expectedQty: 500,
      actualQty: 500,
      unit: "بكرة",
      difference: 0,
      status: "مطابق",
      lastCount: "2024-07-15",
    },
    {
      id: "COUNT-ITEM-003",
      productId: "PROD-003",
      productName: "أزرار بلاستيكية",
      location: "B-01-02",
      expectedQty: 5000,
      actualQty: 4750,
      unit: "قطعة",
      difference: -250,
      status: "فرق كبير",
      lastCount: "2024-07-15",
    },
    {
      id: "COUNT-ITEM-004",
      productId: "PROD-004",
      productName: "سحابات معدنية",
      location: "B-02-01",
      expectedQty: 800,
      actualQty: 820,
      unit: "قطعة",
      difference: 20,
      status: "فرق بسيط",
      lastCount: "2024-07-15",
    },
    {
      id: "COUNT-ITEM-005",
      productId: "PROD-005",
      productName: "قماش جينز",
      location: "C-01-01",
      expectedQty: 600,
      actualQty: 580,
      unit: "متر",
      difference: -20,
      status: "فرق بسيط",
      lastCount: "2024-07-15",
    },
  ];

  // تصفية جلسات الجرد حسب البحث
  const filteredSessions = inventoryCountSessions.filter(
    (session) =>
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // الحصول على لون حالة الجرد
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "جاري":
        return "bg-blue-100 text-blue-800";
      case "مخطط":
        return "bg-amber-100 text-amber-800";
      case "مطابق":
        return "bg-green-100 text-green-800";
      case "فرق بسيط":
        return "bg-amber-100 text-amber-800";
      case "فرق كبير":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة حالة الجرد
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتمل":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "جاري":
        return <Clipboard className="h-4 w-4 text-blue-600" />;
      case "مخطط":
        return <Calendar className="h-4 w-4 text-amber-600" />;
      case "مطابق":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "فرق بسيط":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "فرق كبير":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // فتح نافذة الجرد الحالي
  const handleOpenCountSession = (session: InventoryCountSession) => {
    setSelectedSession(session);
    setActiveTab("current");
  };

  // عرض جلسات الجرد
  const renderInventoryCountSessions = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">جلسات الجرد</h2>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن جلسة جرد..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowNewSessionDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              جلسة جرد جديدة
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الجلسة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>العناصر</TableHead>
                  <TableHead>التقدم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {session.id}
                      </TableCell>
                      <TableCell>{session.name}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.type}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.itemsCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${session.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{session.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(session.status)}
                          <Badge
                            className={getStatusBadgeClass(session.status)}
                          >
                            {session.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenCountSession(session)}
                            disabled={session.status === "مخطط"}
                          >
                            <ClipboardCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Clipboard className="h-8 w-8 mb-2" />
                        <p>لا توجد جلسات جرد مطابقة لمعايير البحث</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* إحصائيات الجرد */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">حالة الجرد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">مكتمل</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">1</span>
                    <Badge className="bg-green-100 text-green-800">25%</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">جاري</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">1</span>
                    <Badge className="bg-blue-100 text-blue-800">25%</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">مخطط</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">2</span>
                    <Badge className="bg-amber-100 text-amber-800">50%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">نتائج الجرد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">مطابق</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">215</span>
                    <Badge className="bg-green-100 text-green-800">87.8%</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    فرق بسيط
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">18</span>
                    <Badge className="bg-amber-100 text-amber-800">7.3%</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    فرق كبير
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">12</span>
                    <Badge className="bg-red-100 text-red-800">4.9%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">الجرد القادم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">جرد المنتجات النهائية</span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">مخطط</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    25 أغسطس 2024 - مستودع المنتجات النهائية
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">
                        الجرد الربع سنوي - Q3 2024
                      </span>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">مخطط</Badge>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    30 سبتمبر 2024 - جميع المستودعات
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // عرض الجرد الحالي
  const renderCurrentCount = () => {
    if (!selectedSession) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
          <Clipboard className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium mb-2">لم يتم اختيار جلسة جرد</h3>
          <p>اختر جلسة جرد من القائمة لعرض تفاصيلها</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveTab("sessions")}
          >
            العودة إلى قائمة الجلسات
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{selectedSession.name}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>رقم الجلسة: {selectedSession.id}</span>
              <span>•</span>
              <span>التاريخ: {selectedSession.date}</span>
              <span>•</span>
              <span>الموقع: {selectedSession.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="ml-2 h-4 w-4" />
              تصفية
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير
            </Button>
            <Button onClick={() => setShowCountDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة عنصر
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المنتج</TableHead>
                  <TableHead>اسم المنتج</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>الكمية المتوقعة</TableHead>
                  <TableHead>الكمية الفعلية</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead>الفرق</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCountItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.productId}
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.expectedQty}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.actualQty}
                        className="w-24 h-8"
                        min={0}
                      />
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell
                      className={`font-medium ${item.difference === 0 ? "text-green-600" : item.difference > 0 ? "text-blue-600" : "text-red-600"}`}
                    >
                      {item.difference > 0 ? "+" : ""}
                      {item.difference}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">مطابق: 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">فرق بسيط: 3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">فرق كبير: 1</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("sessions")}>
              إلغاء
            </Button>
            <Button>
              <CheckCircle className="ml-2 h-4 w-4" />
              حفظ الجرد
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // عرض تقارير الجرد
  const renderInventoryReports = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">تقارير الجرد</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="ml-2 h-4 w-4" />
              تحديد الفترة
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>ملخص نتائج الجرد</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-6">
              <div className="text-center">
                <BarChart className="h-32 w-32 mx-auto text-muted-foreground" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">مطابق (215)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">فرق بسيط (18)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">فرق كبير (12)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أكثر العناصر اختلافاً</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الفرق</TableHead>
                    <TableHead>النسبة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>أزرار بلاستيكية</TableCell>
                    <TableCell className="text-red-600">-250</TableCell>
                    <TableCell>5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>قماش جينز</TableCell>
                    <TableCell className="text-red-600">-20</TableCell>
                    <TableCell>3.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>سحابات معدنية</TableCell>
                    <TableCell className="text-blue-600">+20</TableCell>
                    <TableCell>2.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>قماش قطني أبيض</TableCell>
                    <TableCell className="text-red-600">-5</TableCell>
                    <TableCell>0.4%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>سجل عمليات الجرد</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الجلسة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>العناصر</TableHead>
                  <TableHead>المطابق</TableHead>
                  <TableHead>الفروقات</TableHead>
                  <TableHead>المنفذ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV-COUNT-001</TableCell>
                  <TableCell>الجرد الشهري - أغسطس 2024</TableCell>
                  <TableCell>2024-08-15</TableCell>
                  <TableCell>كامل</TableCell>
                  <TableCell>المستودع الرئيسي</TableCell>
                  <TableCell>245</TableCell>
                  <TableCell>233</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>أحمد محمد</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV-COUNT-002</TableCell>
                  <TableCell>جرد المواد الخام</TableCell>
                  <TableCell>2024-08-20</TableCell>
                  <TableCell>جزئي</TableCell>
                  <TableCell>مستودع المواد الخام</TableCell>
                  <TableCell>120</TableCell>
                  <TableCell>115</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>محمد علي</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">نظام الجرد</h2>
          <p className="text-muted-foreground">
            إدارة ومتابعة عمليات الجرد في المستودعات
          </p>
        </div>
      </div>

      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "sessions" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("sessions")}
        >
          جلسات الجرد
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "current" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("current")}
        >
          الجرد الحالي
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "reports" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("reports")}
        >
          تقارير الجرد
        </button>
        {scannedRFIDItems.length > 0 && (
          <button
            className={`px-4 py-2 font-medium ${activeTab === "rfid-report" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("rfid-report")}
          >
            تقرير RFID
          </button>
        )}
      </div>

      {activeTab === "sessions" &&
        !showRFIDScanner &&
        renderInventoryCountSessions()}
      {activeTab === "current" && !showRFIDScanner && renderCurrentCount()}
      {activeTab === "reports" && !showRFIDScanner && renderInventoryReports()}
      {activeTab === "rfid-report" && !showRFIDScanner && (
        <RFIDInventoryReport
          sessionId={rfidSessionInfo.sessionId}
          sessionName={rfidSessionInfo.sessionName}
          date={rfidSessionInfo.date}
          startTime={rfidSessionInfo.startTime}
          endTime={rfidSessionInfo.endTime}
          scannedItems={scannedRFIDItems}
          expectedInventory={currentCountItems}
          operator={rfidSessionInfo.operator}
        />
      )}

      {/* واجهة ماسح RFID */}
      {showRFIDScanner && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">جرد المخزون باستخدام RFID</h2>
            <Button variant="outline" onClick={() => setShowRFIDScanner(false)}>
              إلغاء
            </Button>
          </div>
          <RFIDScannerInterface
            sessionId={`INV-RFID-${Date.now().toString().slice(-6)}`}
            onScanComplete={(scannedItems) => {
              // تخزين بيانات الجلسة
              const sessionId = `INV-RFID-${Date.now().toString().slice(-6)}`;
              const now = new Date();
              const startTime = new Date(now.getTime() - 90000)
                .toTimeString()
                .slice(0, 5); // 1.5 دقيقة قبل الآن
              const endTime = now.toTimeString().slice(0, 5);

              setRfidSessionInfo({
                sessionId,
                sessionName: "جرد المواد الخام - RFID",
                date: now.toISOString().split("T")[0],
                startTime,
                endTime,
                operator: "أحمد محمد",
              });

              // حفظ العناصر الممسوحة
              setScannedRFIDItems(scannedItems);

              // معالجة البيانات الممسوحة
              const processedData = processRFIDData(
                scannedItems,
                currentCountItems,
              );

              // تحديث بيانات الجرد
              setCurrentCountItems(processedData);

              // إخفاء واجهة الماسح والانتقال إلى تقرير RFID
              setShowRFIDScanner(false);
              setActiveTab("rfid-report");
            }}
            onCancel={() => {
              setShowRFIDScanner(false);
              setActiveTab("sessions");
            }}
          />
        </div>
      )}

      {/* نافذة إنشاء جلسة جرد جديدة */}
      <Dialog
        open={showNewSessionDialog}
        onOpenChange={setShowNewSessionDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إنشاء جلسة جرد جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم الجلسة</label>
              <Input placeholder="أدخل اسم جلسة الجرد" />
            </div>

            {/* إضافة خيار طريقة الجرد */}
            <div className="space-y-2">
              <label className="text-sm font-medium">طريقة الجرد</label>
              <Select
                defaultValue="manual"
                onValueChange={(value) =>
                  setInventoryMethod(value as "manual" | "rfid" | "barcode")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الجرد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      <span>جرد يدوي</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rfid">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>جرد بتقنية RFID</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="barcode">
                    <div className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      <span>جرد بالباركود</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الجرد</label>
              <Select defaultValue="partial">
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الجرد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">كامل</SelectItem>
                  <SelectItem value="partial">جزئي</SelectItem>
                  <SelectItem value="cycle">دوري</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الجرد</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الموقع</label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue placeholder="اختر موقع الجرد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">المستودع الرئيسي</SelectItem>
                  <SelectItem value="raw">مستودع المواد الخام</SelectItem>
                  <SelectItem value="finished">
                    مستودع المنتجات النهائية
                  </SelectItem>
                  <SelectItem value="all">جميع المستودعات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المسؤول عن الجرد</label>
              <Select defaultValue="ahmed">
                <SelectTrigger>
                  <SelectValue placeholder="اختر المسؤول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmed">أحمد محمد</SelectItem>
                  <SelectItem value="mohamed">محمد علي</SelectItem>
                  <SelectItem value="fatima">فاطمة أحمد</SelectItem>
                  <SelectItem value="khaled">خالد العبدالله</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewSessionDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                setShowNewSessionDialog(false);

                // إذا كانت طريقة الجرد هي RFID، عرض واجهة الماسح
                if (inventoryMethod === "rfid") {
                  setShowRFIDScanner(true);
                } else {
                  // الانتقال إلى واجهة الجرد اليدوي
                  setActiveTab("current");
                }
              }}
            >
              إنشاء جلسة الجرد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة إضافة عنصر للجرد */}
      <Dialog open={showCountDialog} onOpenChange={setShowCountDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة عنصر للجرد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">المنتج</label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROD-006">قماش قطني ملون</SelectItem>
                  <SelectItem value="PROD-007">خيط بوليستر أبيض</SelectItem>
                  <SelectItem value="PROD-008">أزرار معدنية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الموقع</label>
              <Input placeholder="أدخل موقع المنتج في المستودع" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الكمية المتوقعة</label>
              <Input type="number" min="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الكمية الفعلية</label>
              <Input type="number" min="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الوحدة</label>
              <Select defaultValue="piece">
                <SelectTrigger>
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meter">متر</SelectItem>
                  <SelectItem value="piece">قطعة</SelectItem>
                  <SelectItem value="roll">بكرة</SelectItem>
                  <SelectItem value="kg">كيلوجرام</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ملاحظات</label>
              <Input placeholder="أدخل أي ملاحظات إضافية" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCountDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setShowCountDialog(false)}>
              إضافة العنصر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryCount;
