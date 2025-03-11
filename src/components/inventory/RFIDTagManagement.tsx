import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Edit,
  Trash,
  Tag,
  QrCode,
  Link,
  Download,
  Upload,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Smartphone,
  Package,
  Printer,
  RefreshCw,
  FileText,
  Info,
} from "lucide-react";

interface RFIDTag {
  id: string;
  tagId: string;
  productId: string;
  productName: string;
  status: "active" | "inactive" | "linked" | "unlinked" | "damaged";
  location: string;
  lastScan: string;
  batchNumber?: string;
  notes?: string;
}

const RFIDTagManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "tags" | "link" | "print" | "import"
  >("tags");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTagDialog, setShowAddTagDialog] = useState(false);
  const [showLinkTagDialog, setShowLinkTagDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [linkStatus, setLinkStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [printStatus, setPrintStatus] = useState<
    "idle" | "printing" | "success" | "error"
  >("idle");

  // بيانات تجريبية للتاجات
  const [tags, setTags] = useState<RFIDTag[]>([
    {
      id: "1",
      tagId: "RFID-TAG-001",
      productId: "PROD-001",
      productName: "قماش قطني أبيض",
      status: "linked",
      location: "المستودع الرئيسي - A01",
      lastScan: "2024-08-22 10:15",
      batchNumber: "BATCH-2024-001",
    },
    {
      id: "2",
      tagId: "RFID-TAG-002",
      productId: "PROD-002",
      productName: "خيط بوليستر أسود",
      status: "linked",
      location: "المستودع الرئيسي - B03",
      lastScan: "2024-08-22 09:30",
      batchNumber: "BATCH-2024-002",
    },
    {
      id: "3",
      tagId: "RFID-TAG-003",
      productId: "",
      productName: "",
      status: "unlinked",
      location: "المستودع الرئيسي - C02",
      lastScan: "2024-08-21 14:45",
    },
    {
      id: "4",
      tagId: "RFID-TAG-004",
      productId: "PROD-003",
      productName: "أزرار بلاستيكية",
      status: "linked",
      location: "المستودع الرئيسي - D01",
      lastScan: "2024-08-22 11:20",
      batchNumber: "BATCH-2024-003",
    },
    {
      id: "5",
      tagId: "RFID-TAG-005",
      productId: "",
      productName: "",
      status: "damaged",
      location: "المستودع الرئيسي - A04",
      lastScan: "2024-08-20 16:10",
      notes: "تاج تالف - يحتاج إلى استبدال",
    },
  ]);

  // بيانات تجريبية للمنتجات
  const products = [
    { id: "PROD-001", name: "قماش قطني أبيض", category: "أقمشة", unit: "متر" },
    {
      id: "PROD-002",
      name: "خيط بوليستر أسود",
      category: "خيوط",
      unit: "بكرة",
    },
    {
      id: "PROD-003",
      name: "أزرار بلاستيكية",
      category: "إكسسوارات",
      unit: "قطعة",
    },
    {
      id: "PROD-004",
      name: "سحابات معدنية",
      category: "إكسسوارات",
      unit: "قطعة",
    },
    { id: "PROD-005", name: "قماش جينز", category: "أقمشة", unit: "متر" },
  ];

  // تصفية التاجات حسب البحث
  const filteredTags = tags.filter(
    (tag) =>
      tag.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // الحصول على لون حالة التاج
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "linked":
        return <Badge className="bg-green-100 text-green-800">مرتبط</Badge>;
      case "unlinked":
        return <Badge className="bg-amber-100 text-amber-800">غير مرتبط</Badge>;
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">نشط</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      case "damaged":
        return <Badge className="bg-red-100 text-red-800">تالف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // إضافة تاج جديد
  const handleAddTag = () => {
    // محاكاة إضافة تاج جديد
    const newTag: RFIDTag = {
      id: (tags.length + 1).toString(),
      tagId: `RFID-TAG-${(tags.length + 1).toString().padStart(3, "0")}`,
      productId: "",
      productName: "",
      status: "unlinked",
      location: "المستودع الرئيسي",
      lastScan: new Date().toLocaleString(),
    };

    setTags([...tags, newTag]);
    setShowAddTagDialog(false);
  };

  // ربط تاج بمنتج
  const handleLinkTag = () => {
    setLinkStatus("scanning");

    // محاكاة عملية الربط
    setTimeout(() => {
      setLinkStatus("success");

      // تحديث حالة التاج المحدد
      const updatedTags = tags.map((tag) => {
        if (selectedTags.includes(tag.id)) {
          return {
            ...tag,
            productId: "PROD-005",
            productName: "قماش جينز",
            status: "linked" as const,
            lastScan: new Date().toLocaleString(),
          };
        }
        return tag;
      });

      setTags(updatedTags);

      // إعادة تعيين بعد فترة
      setTimeout(() => {
        setLinkStatus("idle");
        setShowLinkTagDialog(false);
        setSelectedTags([]);
      }, 1500);
    }, 2000);
  };

  // طباعة تاجات RFID
  const handlePrintTags = () => {
    setPrintStatus("printing");

    // محاكاة عملية الطباعة
    setTimeout(() => {
      setPrintStatus("success");

      // إعادة تعيين بعد فترة
      setTimeout(() => {
        setPrintStatus("idle");
        setShowPrintDialog(false);
      }, 1500);
    }, 2000);
  };

  // تحديد/إلغاء تحديد جميع التاجات
  const toggleSelectAll = () => {
    if (selectedTags.length === filteredTags.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(filteredTags.map((tag) => tag.id));
    }
  };

  // تحديد/إلغاء تحديد تاج واحد
  const toggleSelectTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // حذف التاجات المحددة
  const deleteSelectedTags = () => {
    if (window.confirm(`هل أنت متأكد من حذف ${selectedTags.length} تاج؟`)) {
      setTags(tags.filter((tag) => !selectedTags.includes(tag.id)));
      setSelectedTags([]);
    }
  };

  // عرض قائمة التاجات
  const renderTagsList = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">إدارة تاجات RFID</h2>
            <Badge className="bg-blue-100 text-blue-800">
              {tags.length} تاج
            </Badge>
          </div>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن تاج..."
                className="pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowAddTagDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة تاج
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    selectedTags.length === filteredTags.length &&
                    filteredTags.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">
                  {selectedTags.length > 0
                    ? `تم تحديد ${selectedTags.length} تاج`
                    : "تحديد الكل"}
                </span>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLinkTagDialog(true)}
                  >
                    <Link className="ml-2 h-4 w-4" />
                    ربط بمنتج
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPrintDialog(true)}
                  >
                    <Printer className="ml-2 h-4 w-4" />
                    طباعة
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={deleteSelectedTags}
                  >
                    <Trash className="ml-2 h-4 w-4" />
                    حذف
                  </Button>
                </div>
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>معرف التاج</TableHead>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الموقع</TableHead>
                  <TableHead>آخر مسح</TableHead>
                  <TableHead>رقم الدفعة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => toggleSelectTag(tag.id)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{tag.tagId}</TableCell>
                      <TableCell>
                        {tag.productId ? (
                          <div>
                            <div>{tag.productName}</div>
                            <div className="text-xs text-muted-foreground">
                              {tag.productId}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{tag.location}</TableCell>
                      <TableCell>{tag.lastScan}</TableCell>
                      <TableCell>{tag.batchNumber || "-"}</TableCell>
                      <TableCell>{getStatusBadge(tag.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {tag.status === "linked" ? (
                            <Button variant="ghost" size="icon">
                              <Tag className="h-4 w-4 text-amber-600" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <Link className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Tag className="h-8 w-8 mb-2" />
                        <p>لا توجد تاجات مطابقة لمعايير البحث</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* إحصائيات التاجات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    إجمالي التاجات
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{tags.length}</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">تاجات مرتبطة</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {tags.filter((tag) => tag.status === "linked").length}
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <Link className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاجات غير مرتبطة
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {tags.filter((tag) => tag.status === "unlinked").length}
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 rounded-full">
                  <Tag className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">تاجات تالفة</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {tags.filter((tag) => tag.status === "damaged").length}
                  </h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // عرض واجهة ربط التاجات
  const renderLinkInterface = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">ربط تاجات RFID بالمنتجات</h2>
          <Button variant="outline" onClick={() => setShowLinkTagDialog(true)}>
            <Smartphone className="ml-2 h-4 w-4" />
            بدء المسح
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>تعليمات الربط</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">1. تحضير التاجات</h3>
                <p className="text-sm text-muted-foreground">
                  قم بتحضير تاجات RFID الجديدة التي ترغب في ربطها بالمنتجات.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">2. اختيار المنتج</h3>
                <p className="text-sm text-muted-foreground">
                  حدد المنتج الذي ترغب في ربط التاجات به من قائمة المنتجات.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">3. مسح التاجات</h3>
                <p className="text-sm text-muted-foreground">
                  استخدم جهاز قراءة RFID لمسح التاجات واحدًا تلو الآخر.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">4. تأكيد الربط</h3>
                <p className="text-sm text-muted-foreground">
                  تأكد من نجاح عملية الربط وتحقق من حالة التاجات في قائمة
                  التاجات.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر عمليات الربط</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المنتج</TableHead>
                  <TableHead>عدد التاجات</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-08-22 10:15</TableCell>
                  <TableCell>قماش قطني أبيض (PROD-001)</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>أحمد محمد</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-08-21 14:30</TableCell>
                  <TableCell>خيط بوليستر أسود (PROD-002)</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>محمد علي</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-08-20 09:45</TableCell>
                  <TableCell>أزرار بلاستيكية (PROD-003)</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>أحمد محمد</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  // عرض واجهة طباعة التاجات
  const renderPrintInterface = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">طباعة تاجات RFID</h2>
          <Button onClick={() => setShowPrintDialog(true)}>
            <Printer className="ml-2 h-4 w-4" />
            طباعة تاجات جديدة
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الطباعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="printer">الطابعة</Label>
                <Select defaultValue="zebra">
                  <SelectTrigger id="printer">
                    <SelectValue placeholder="اختر الطابعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zebra">Zebra ZT411</SelectItem>
                    <SelectItem value="tsc">TSC TTP-244 Pro</SelectItem>
                    <SelectItem value="sato">SATO CL4NX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagType">نوع التاج</Label>
                <Select defaultValue="uhf">
                  <SelectTrigger id="tagType">
                    <SelectValue placeholder="اختر نوع التاج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uhf">UHF RFID</SelectItem>
                    <SelectItem value="hf">HF RFID</SelectItem>
                    <SelectItem value="lf">LF RFID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagSize">حجم التاج</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="tagSize">
                    <SelectValue placeholder="اختر حجم التاج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">صغير (30x15 مم)</SelectItem>
                    <SelectItem value="medium">متوسط (50x25 مم)</SelectItem>
                    <SelectItem value="large">كبير (100x50 مم)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">الكمية</Label>
                <Input id="quantity" type="number" min="1" defaultValue="10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prefix">بادئة معرف التاج</Label>
              <Input id="prefix" defaultValue="RFID-TAG-" />
              <p className="text-xs text-muted-foreground">
                سيتم إضافة هذه البادئة إلى كل معرف تاج
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startNumber">رقم البداية</Label>
              <Input id="startNumber" type="number" min="1" defaultValue="1" />
              <p className="text-xs text-muted-foreground">
                سيبدأ ترقيم التاجات من هذا الرقم
              </p>
            </div>

            <div className="flex justify-end">
              <Button>
                <Printer className="ml-2 h-4 w-4" />
                معاينة الطباعة
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>سجل الطباعة</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>عدد التاجات</TableHead>
                  <TableHead>نوع التاج</TableHead>
                  <TableHead>الطابعة</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-08-22 11:30</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>UHF RFID</TableCell>
                  <TableCell>Zebra ZT411</TableCell>
                  <TableCell>أحمد محمد</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="ml-2 h-4 w-4" />
                      التفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-08-20 09:15</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>UHF RFID</TableCell>
                  <TableCell>TSC TTP-244 Pro</TableCell>
                  <TableCell>محمد علي</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="ml-2 h-4 w-4" />
                      التفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  // عرض واجهة استيراد/تصدير التاجات
  const renderImportInterface = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">استيراد وتصدير تاجات RFID</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تصدير التاجات
            </Button>
            <Button>
              <Upload className="ml-2 h-4 w-4" />
              استيراد التاجات
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>استيراد التاجات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle>معلومات</AlertTitle>
              <AlertDescription>
                يمكنك استيراد بيانات التاجات من ملف CSV أو Excel. تأكد من أن
                الملف يحتوي على الأعمدة المطلوبة: معرف التاج، معرف المنتج،
                الموقع، الحالة.
              </AlertDescription>
            </Alert>

            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium">
                اسحب وأفلت ملف CSV أو Excel هنا
              </p>
              <p className="text-xs text-muted-foreground mt-1">أو</p>
              <Button variant="outline" className="mt-2">
                اختيار ملف
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="importOptions">خيارات الاستيراد</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="updateExisting"
                  className="h-4 w-4"
                />
                <Label htmlFor="updateExisting" className="text-sm font-normal">
                  تحديث التاجات الموجودة
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="skipErrors" className="h-4 w-4" />
                <Label htmlFor="skipErrors" className="text-sm font-normal">
                  تخطي الأخطاء أثناء الاستيراد
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تصدير التاجات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exportFormat">تنسيق التصدير</Label>
                <Select defaultValue="csv">
                  <SelectTrigger id="exportFormat">
                    <SelectValue placeholder="اختر تنسيق التصدير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exportFilter">تصفية التصدير</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="exportFilter">
                    <SelectValue placeholder="اختر تصفية التصدير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التاجات</SelectItem>
                    <SelectItem value="linked">التاجات المرتبطة فقط</SelectItem>
                    <SelectItem value="unlinked">
                      التاجات غير المرتبطة فقط
                    </SelectItem>
                    <SelectItem value="damaged">التاجات التالفة فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>الحقول المراد تصديرها</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_tagId"
                    className="h-4 w-4"
                    checked
                    disabled
                  />
                  <Label htmlFor="field_tagId" className="text-sm font-normal">
                    معرف التاج
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_productId"
                    className="h-4 w-4"
                    checked
                  />
                  <Label
                    htmlFor="field_productId"
                    className="text-sm font-normal"
                  >
                    معرف المنتج
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_productName"
                    className="h-4 w-4"
                    checked
                  />
                  <Label
                    htmlFor="field_productName"
                    className="text-sm font-normal"
                  >
                    اسم المنتج
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_status"
                    className="h-4 w-4"
                    checked
                  />
                  <Label htmlFor="field_status" className="text-sm font-normal">
                    الحالة
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_location"
                    className="h-4 w-4"
                    checked
                  />
                  <Label
                    htmlFor="field_location"
                    className="text-sm font-normal"
                  >
                    الموقع
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_lastScan"
                    className="h-4 w-4"
                    checked
                  />
                  <Label
                    htmlFor="field_lastScan"
                    className="text-sm font-normal"
                  >
                    آخر مسح
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="field_batchNumber"
                    className="h-4 w-4"
                    checked
                  />
                  <Label
                    htmlFor="field_batchNumber"
                    className="text-sm font-normal"
                  >
                    رقم الدفعة
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="field_notes" className="h-4 w-4" />
                  <Label htmlFor="field_notes" className="text-sm font-normal">
                    ملاحظات
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>
                <Download className="ml-2 h-4 w-4" />
                تصدير التاجات
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>سجل الاستيراد والتصدير</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>العملية</TableHead>
                  <TableHead>الملف</TableHead>
                  <TableHead>عدد التاجات</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-08-22 14:30</TableCell>
                  <TableCell>تصدير</TableCell>
                  <TableCell>rfid_tags_export_20240822.csv</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>أحمد محمد</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-08-20 10:15</TableCell>
                  <TableCell>استيراد</TableCell>
                  <TableCell>new_tags_batch.xlsx</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>محمد علي</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                  </TableCell>
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
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="tags">
            <Tag className="ml-2 h-4 w-4" />
            التاجات
          </TabsTrigger>
          <TabsTrigger value="link">
            <Link className="ml-2 h-4 w-4" />
            ربط التاجات
          </TabsTrigger>
          <TabsTrigger value="print">
            <Printer className="ml-2 h-4 w-4" />
            طباعة التاجات
          </TabsTrigger>
          <TabsTrigger value="import">
            <Upload className="ml-2 h-4 w-4" />
            استيراد/تصدير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tags">{renderTagsList()}</TabsContent>

        <TabsContent value="link">{renderLinkInterface()}</TabsContent>

        <TabsContent value="print">{renderPrintInterface()}</TabsContent>

        <TabsContent value="import">{renderImportInterface()}</TabsContent>
      </Tabs>

      {/* نافذة إضافة تاج جديد */}
      <Dialog open={showAddTagDialog} onOpenChange={setShowAddTagDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة تاج RFID جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tagId">معرف التاج</Label>
              <Input
                id="tagId"
                placeholder="أدخل معرف التاج"
                defaultValue={`RFID-TAG-${(tags.length + 1).toString().padStart(3, "0")}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">المنتج (اختياري)</Label>
              <Select>
                <SelectTrigger id="product">
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">الموقع</Label>
              <Input
                id="location"
                placeholder="أدخل موقع التاج"
                defaultValue="المستودع الرئيسي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">الحالة</Label>
              <Select defaultValue="unlinked">
                <SelectTrigger id="status">
                  <SelectValue placeholder="اختر حالة التاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="linked">مرتبط</SelectItem>
                  <SelectItem value="unlinked">غير مرتبط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea id="notes" placeholder="أدخل أي ملاحظات إضافية" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddTagDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleAddTag}>إضافة التاج</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة ربط التاجات */}
      <Dialog open={showLinkTagDialog} onOpenChange={setShowLinkTagDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ربط تاجات RFID بمنتج</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="linkProduct">المنتج</Label>
              <Select defaultValue="PROD-005">
                <SelectTrigger id="linkProduct">
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchNumber">رقم الدفعة (اختياري)</Label>
              <Input
                id="batchNumber"
                placeholder="أدخل رقم الدفعة"
                defaultValue={`BATCH-${new Date().getFullYear()}-${(Math.floor(Math.random() * 999) + 1).toString().padStart(3, "0")}`}
              />
            </div>

            <div className="space-y-2">
              <Label>التاجات المحددة</Label>
              <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
                {selectedTags.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedTags.map((tagId) => {
                      const tag = tags.find((t) => t.id === tagId);
                      return tag ? (
                        <li key={tagId} className="text-sm">
                          {tag.tagId}
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    لم يتم تحديد أي تاجات
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                تم تحديد {selectedTags.length} تاج
              </p>
            </div>

            {linkStatus === "scanning" && (
              <div className="flex flex-col items-center justify-center p-4">
                <Smartphone className="h-12 w-12 text-blue-600 animate-pulse mb-2" />
                <p className="font-medium">جاري مسح التاجات...</p>
                <p className="text-sm text-muted-foreground">يرجى الانتظار</p>
              </div>
            )}

            {linkStatus === "success" && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>تم الربط بنجاح</AlertTitle>
                <AlertDescription>
                  تم ربط {selectedTags.length} تاج بالمنتج بنجاح.
                </AlertDescription>
              </Alert>
            )}

            {linkStatus === "error" && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>فشل الربط</AlertTitle>
                <AlertDescription>
                  حدث خطأ أثناء ربط التاجات. يرجى المحاولة مرة أخرى.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLinkTagDialog(false)}
              disabled={linkStatus === "scanning"}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleLinkTag}
              disabled={
                selectedTags.length === 0 ||
                linkStatus === "scanning" ||
                linkStatus === "success"
              }
            >
              {linkStatus === "scanning" ? (
                <>
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                  جاري الربط...
                </>
              ) : (
                <>ربط التاجات</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة طباعة التاجات */}
      <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>طباعة تاجات RFID</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="printQuantity">عدد التاجات</Label>
              <Input
                id="printQuantity"
                type="number"
                min="1"
                defaultValue="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="printTagType">نوع التاج</Label>
              <Select defaultValue="uhf">
                <SelectTrigger id="printTagType">
                  <SelectValue placeholder="اختر نوع التاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uhf">UHF RFID</SelectItem>
                  <SelectItem value="hf">HF RFID</SelectItem>
                  <SelectItem value="lf">LF RFID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="printPrefix">بادئة معرف التاج</Label>
              <Input id="printPrefix" defaultValue="RFID-TAG-" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="printStartNumber">رقم البداية</Label>
              <Input
                id="printStartNumber"
                type="number"
                min="1"
                defaultValue={tags.length + 1}
              />
            </div>

            {printStatus === "printing" && (
              <div className="flex flex-col items-center justify-center p-4">
                <Printer className="h-12 w-12 text-blue-600 animate-pulse mb-2" />
                <p className="font-medium">جاري طباعة التاجات...</p>
                <p className="text-sm text-muted-foreground">يرجى الانتظار</p>
              </div>
            )}

            {printStatus === "success" && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>تمت الطباعة بنجاح</AlertTitle>
                <AlertDescription>
                  تم إرسال أمر طباعة التاجات إلى الطابعة بنجاح.
                </AlertDescription>
              </Alert>
            )}

            {printStatus === "error" && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>فشل الطباعة</AlertTitle>
                <AlertDescription>
                  حدث خطأ أثناء طباعة التاجات. يرجى التحقق من الطابعة والمحاولة
                  مرة أخرى.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPrintDialog(false)}
              disabled={printStatus === "printing"}
            >
              إلغاء
            </Button>
            <Button
              onClick={handlePrintTags}
              disabled={printStatus === "printing" || printStatus === "success"}
            >
              {printStatus === "printing" ? (
                <>
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                  جاري الطباعة...
                </>
              ) : (
                <>طباعة التاجات</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RFIDTagManagement;
