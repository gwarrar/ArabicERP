import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  Plus,
  Download,
  QrCode,
  Truck,
  Package,
  Boxes,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash,
  BarChart,
  Printer,
  FileText,
  RefreshCw,
  Warehouse,
  Layers,
  Tag,
  Clipboard,
  AlertCircle,
  CheckCircle,
  Clock,
  Forklift,
  Scan,
  Repeat,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Sample inventory data
const inventoryData = [
  {
    id: "INV-001",
    name: "قماش قطني",
    category: "مواد خام",
    quantity: 1500,
    unit: "متر",
    location: "مستودع المواد الخام - رف A1",
    minStock: 500,
    status: "متوفر",
    lastUpdated: "2024-07-15",
    trackingMethod: "qr",
    supplier: "شركة النسيج المتحد",
    price: 25,
  },
  {
    id: "INV-002",
    name: "خيوط قطنية",
    category: "مواد خام",
    quantity: 350,
    unit: "بكرة",
    location: "مستودع المواد الخام - رف B3",
    minStock: 100,
    status: "متوفر",
    lastUpdated: "2024-07-14",
    trackingMethod: "qr",
    supplier: "مصنع الخيوط الحديثة",
    price: 15,
  },
  {
    id: "INV-003",
    name: "أزرار بلاستيكية",
    category: "مواد خام",
    quantity: 8000,
    unit: "قطعة",
    location: "مستودع المواد الخام - رف C2",
    minStock: 2000,
    status: "متوفر",
    lastUpdated: "2024-07-13",
    trackingMethod: "rfid",
    supplier: "شركة الإكسسوارات الأولى",
    price: 0.5,
  },
  {
    id: "INV-004",
    name: "قميص قطني (قيد التصنيع)",
    category: "منتجات قيد التصنيع",
    quantity: 250,
    unit: "قطعة",
    location: "قسم الخياطة",
    minStock: 0,
    status: "قيد التصنيع",
    lastUpdated: "2024-07-12",
    trackingMethod: "qr",
    supplier: "-",
    price: 45,
  },
  {
    id: "INV-005",
    name: "قميص قطني",
    category: "منتجات نهائية",
    quantity: 325,
    unit: "قطعة",
    location: "مستودع المنتجات النهائية - رف D1",
    minStock: 100,
    status: "متوفر",
    lastUpdated: "2024-07-11",
    trackingMethod: "rfid",
    supplier: "-",
    price: 120,
  },
  {
    id: "INV-006",
    name: "بنطلون جينز",
    category: "منتجات نهائية",
    quantity: 180,
    unit: "قطعة",
    location: "مستودع المنتجات النهائية - رف D2",
    minStock: 50,
    status: "متوفر",
    lastUpdated: "2024-07-10",
    trackingMethod: "rfid",
    supplier: "-",
    price: 150,
  },
  {
    id: "INV-007",
    name: "سحابات معدنية",
    category: "مواد خام",
    quantity: 50,
    unit: "قطعة",
    location: "مستودع المواد الخام - رف B5",
    minStock: 200,
    status: "منخفض",
    lastUpdated: "2024-07-09",
    trackingMethod: "qr",
    supplier: "مصنع المستلزمات المعدنية",
    price: 2,
  },
];

// Sample shipment data
const shipmentData = [
  {
    id: "SHP-001",
    type: "وارد",
    date: "2024-07-20",
    status: "مجدول",
    source: "شركة النسيج المتحد",
    destination: "مستودع المواد الخام",
    items: [
      { id: "INV-001", name: "قماش قطني", quantity: 500, unit: "متر" },
      { id: "INV-002", name: "خيوط قطنية", quantity: 100, unit: "بكرة" },
    ],
    trackingNumber: "TRK12345678",
    carrier: "شركة النقل السريع",
    notes: "شحنة مواد خام شهرية",
  },
  {
    id: "SHP-002",
    type: "صادر",
    date: "2024-07-18",
    status: "تم الشحن",
    source: "مستودع المنتجات النهائية",
    destination: "متجر الملابس الرجالية",
    items: [
      { id: "INV-005", name: "قميص قطني", quantity: 50, unit: "قطعة" },
      { id: "INV-006", name: "بنطلون جينز", quantity: 30, unit: "قطعة" },
    ],
    trackingNumber: "TRK87654321",
    carrier: "شركة التوصيل المتحدة",
    notes: "طلبية عميل رقم ORD-2024-002",
  },
  {
    id: "SHP-003",
    type: "وارد",
    date: "2024-07-25",
    status: "مجدول",
    source: "مصنع المستلزمات المعدنية",
    destination: "مستودع المواد الخام",
    items: [
      { id: "INV-007", name: "سحابات معدنية", quantity: 300, unit: "قطعة" },
    ],
    trackingNumber: "TRK23456789",
    carrier: "شركة النقل السريع",
    notes: "طلبية عاجلة لتعويض النقص",
  },
  {
    id: "SHP-004",
    type: "داخلي",
    date: "2024-07-16",
    status: "مكتمل",
    source: "مستودع المواد الخام",
    destination: "قسم القص",
    items: [{ id: "INV-001", name: "قماش قطني", quantity: 200, unit: "متر" }],
    trackingNumber: "-",
    carrier: "نقل داخلي",
    notes: "نقل مواد لأمر الإنتاج PO-2024-001",
  },
  {
    id: "SHP-005",
    type: "صادر",
    date: "2024-07-30",
    status: "مجدول",
    source: "مستودع المنتجات النهائية",
    destination: "متجر الملابس النسائية",
    items: [{ id: "INV-005", name: "قميص قطني", quantity: 75, unit: "قطعة" }],
    trackingNumber: "TRK34567890",
    carrier: "شركة التوصيل المتحدة",
    notes: "طلبية عميل رقم ORD-2024-005",
  },
];

// Sample warehouses data
const warehousesData = [
  {
    id: "WH-001",
    name: "مستودع المواد الخام",
    location: "المنطقة الصناعية - مبنى A",
    capacity: 5000,
    utilized: 3200,
    sections: [
      { id: "A", name: "قسم الأقمشة", capacity: 2000, utilized: 1500 },
      {
        id: "B",
        name: "قسم الخيوط والإكسسوارات",
        capacity: 1500,
        utilized: 1000,
      },
      { id: "C", name: "قسم المواد المساعدة", capacity: 1500, utilized: 700 },
    ],
    manager: "خالد عبدالله",
    trackingSystem: "QR/RFID مختلط",
  },
  {
    id: "WH-002",
    name: "مستودع المنتجات النهائية",
    location: "المنطقة الصناعية - مبنى B",
    capacity: 3000,
    utilized: 1200,
    sections: [
      { id: "D", name: "قسم الملابس الرجالية", capacity: 1000, utilized: 500 },
      { id: "E", name: "قسم الملابس النسائية", capacity: 1000, utilized: 400 },
      { id: "F", name: "قسم ملابس الأطفال", capacity: 1000, utilized: 300 },
    ],
    manager: "سارة أحمد",
    trackingSystem: "RFID",
  },
  {
    id: "WH-003",
    name: "مستودع المنتجات قيد التصنيع",
    location: "المنطقة الصناعية - مبنى A (الطابق الثاني)",
    capacity: 1000,
    utilized: 400,
    sections: [
      { id: "G", name: "قسم القص", capacity: 300, utilized: 150 },
      { id: "H", name: "قسم الخياطة", capacity: 400, utilized: 200 },
      { id: "I", name: "قسم التشطيب", capacity: 300, utilized: 50 },
    ],
    manager: "محمد علي",
    trackingSystem: "QR",
  },
];

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddShipment, setShowAddShipment] = useState(false);
  const [showShipmentDetails, setShowShipmentDetails] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  // Filter inventory items based on search, category and status
  const filteredInventory = inventoryData
    .filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "quantity") {
        comparison = a.quantity - b.quantity;
      } else if (sortField === "lastUpdated") {
        comparison = new Date(a.lastUpdated) - new Date(b.lastUpdated);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Filter shipments based on search
  const filteredShipments = shipmentData.filter((shipment) => {
    return (
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "متوفر":
        return "bg-green-100 text-green-800";
      case "منخفض":
        return "bg-amber-100 text-amber-800";
      case "نفذ":
        return "bg-red-100 text-red-800";
      case "قيد التصنيع":
        return "bg-blue-100 text-blue-800";
      case "مجدول":
        return "bg-purple-100 text-purple-800";
      case "تم الشحن":
        return "bg-blue-100 text-blue-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle item selection for details view
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  // Handle shipment selection for details view
  const handleShipmentSelect = (shipment) => {
    setSelectedShipment(shipment);
    setShowShipmentDetails(true);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // Handle add new item
  const handleAddItem = () => {
    setShowAddItem(false);
    toast({
      title: "تم إضافة العنصر",
      description: "تم إضافة العنصر الجديد بنجاح",
    });
  };

  // Handle add new shipment
  const handleAddShipment = () => {
    setShowAddShipment(false);
    toast({
      title: "تم إضافة الشحنة",
      description: "تم إضافة الشحنة الجديدة بنجاح",
    });
  };

  // Handle generate QR code
  const handleGenerateQR = (itemId) => {
    toast({
      title: "تم إنشاء رمز QR",
      description: `تم إنشاء رمز QR للعنصر ${itemId} بنجاح`,
    });
  };

  // Handle delete item
  const handleDeleteItem = (itemId) => {
    toast({
      title: "تم حذف العنصر",
      description: `تم حذف العنصر ${itemId} بنجاح`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="inventory">
            <Package className="h-4 w-4 ml-2" />
            المخزون
          </TabsTrigger>
          <TabsTrigger value="shipments">
            <Truck className="h-4 w-4 ml-2" />
            الشحنات والتوزيع
          </TabsTrigger>
          <TabsTrigger value="warehouses">
            <Warehouse className="h-4 w-4 ml-2" />
            المستودعات
          </TabsTrigger>
          <TabsTrigger value="tracking">
            <QrCode className="h-4 w-4 ml-2" />
            نظام التتبع
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 ml-2" />
            تحليلات المخزون
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في المخزون..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="مواد خام">مواد خام</SelectItem>
                  <SelectItem value="منتجات قيد التصنيع">
                    قيد التصنيع
                  </SelectItem>
                  <SelectItem value="منتجات نهائية">منتجات نهائية</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="متوفر">متوفر</SelectItem>
                  <SelectItem value="منخفض">منخفض</SelectItem>
                  <SelectItem value="نفذ">نفذ</SelectItem>
                  <SelectItem value="قيد التصنيع">قيد التصنيع</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button onClick={() => setShowAddItem(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة عنصر
              </Button>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي العناصر
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {inventoryData.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      المواد الخام
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        inventoryData.filter(
                          (item) => item.category === "مواد خام",
                        ).length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Layers className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      المنتجات النهائية
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        inventoryData.filter(
                          (item) => item.category === "منتجات نهائية",
                        ).length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Boxes className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      عناصر منخفضة
                    </p>
                    <h3 className="text-2xl font-bold mt-2 text-amber-600">
                      {
                        inventoryData.filter((item) => item.status === "منخفض")
                          .length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    المخزون
                  </CardTitle>
                  <CardDescription>
                    قائمة بجميع العناصر في المخزون
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredInventory.length} عنصر
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    <Printer className="ml-1 h-3 w-3" />
                    طباعة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSortChange("id")}
                      >
                        <div className="flex items-center">
                          الرمز {getSortIcon("id")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSortChange("name")}
                      >
                        <div className="flex items-center">
                          الاسم {getSortIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSortChange("quantity")}
                      >
                        <div className="flex items-center">
                          الكمية {getSortIcon("quantity")}
                        </div>
                      </TableHead>
                      <TableHead>الوحدة</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSortChange("lastUpdated")}
                      >
                        <div className="flex items-center">
                          آخر تحديث {getSortIcon("lastUpdated")}
                        </div>
                      </TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.length > 0 ? (
                      filteredInventory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeClass(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleItemSelect(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleGenerateQR(item.id)}
                              >
                                <QrCode className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteItem(item.id)}
                              >
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
                            <Search className="h-8 w-8 mb-2" />
                            <p>لا توجد عناصر تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
                                setCategoryFilter("all");
                                setStatusFilter("all");
                              }}
                            >
                              إعادة تعيين المرشحات
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipments Tab */}
        <TabsContent value="shipments" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث في الشحنات..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="نوع الشحنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="وارد">وارد</SelectItem>
                  <SelectItem value="صادر">صادر</SelectItem>
                  <SelectItem value="داخلي">داخلي</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="مجدول">مجدول</SelectItem>
                  <SelectItem value="تم الشحن">تم الشحن</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير
              </Button>
              <Button onClick={() => setShowAddShipment(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة شحنة
              </Button>
            </div>
          </div>

          {/* Shipments Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الشحنات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {shipmentData.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">شحنات واردة</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        shipmentData.filter((item) => item.type === "وارد")
                          .length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">شحنات صادرة</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        shipmentData.filter((item) => item.type === "صادر")
                          .length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      شحنات مجدولة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {
                        shipmentData.filter((item) => item.status === "مجدول")
                          .length
                      }
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipments Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    الشحنات
                  </CardTitle>
                  <CardDescription>
                    قائمة بجميع الشحنات الواردة والصادرة
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredShipments.length} شحنة
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    <Printer className="ml-1 h-3 w-3" />
                    طباعة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الشحنة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المصدر</TableHead>
                      <TableHead>الوجهة</TableHead>
                      <TableHead>رقم التتبع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.length > 0 ? (
                      filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">
                            {shipment.id}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                shipment.type === "وارد"
                                  ? "bg-green-100 text-green-800"
                                  : shipment.type === "صادر"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {shipment.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(shipment.date)}</TableCell>
                          <TableCell>{shipment.source}</TableCell>
                          <TableCell>{shipment.destination}</TableCell>
                          <TableCell>{shipment.trackingNumber}</TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeClass(shipment.status)}
                            >
                              {shipment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleShipmentSelect(shipment)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Search className="h-8 w-8 mb-2" />
                            <p>لا توجد شحنات تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
                              }}
                            >
                              إعادة تعيين البحث
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warehouses Tab */}
        <TabsContent value="warehouses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warehousesData.map((warehouse) => {
              const utilizationPercentage = Math.round(
                (warehouse.utilized / warehouse.capacity) * 100,
              );
              return (
                <Card key={warehouse.id} className="overflow-hidden">
                  <div
                    className={`h-1 ${utilizationPercentage > 80 ? "bg-red-500" : utilizationPercentage > 60 ? "bg-amber-500" : "bg-green-500"}`}
                  ></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          {warehouse.name}
                        </CardTitle>
                        <CardDescription>{warehouse.location}</CardDescription>
                      </div>
                      <Badge
                        className={
                          utilizationPercentage > 80
                            ? "bg-red-100 text-red-800"
                            : utilizationPercentage > 60
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {utilizationPercentage}% مستخدم
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>السعة المستخدمة</span>
                        <span>
                          {warehouse.utilized} / {warehouse.capacity}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${utilizationPercentage > 80 ? "bg-red-500" : utilizationPercentage > 60 ? "bg-amber-500" : "bg-green-500"}`}
                          style={{ width: `${utilizationPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">المشرف:</span>
                        <p className="font-medium">{warehouse.manager}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          نظام التتبع:
                        </span>
                        <p className="font-medium">
                          {warehouse.trackingSystem}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">الأقسام</h4>
                      <div className="space-y-2">
                        {warehouse.sections.map((section) => {
                          const sectionUtilization = Math.round(
                            (section.utilized / section.capacity) * 100,
                          );
                          return (
                            <div key={section.id} className="text-sm">
                              <div className="flex justify-between mb-1">
                                <span>
                                  {section.name} ({section.utilized}/
                                  {section.capacity})
                                </span>
                                <span
                                  className={
                                    sectionUtilization > 80
                                      ? "text-red-600"
                                      : sectionUtilization > 60
                                        ? "text-amber-600"
                                        : "text-green-600"
                                  }
                                >
                                  {sectionUtilization}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${sectionUtilization > 80 ? "bg-red-500" : sectionUtilization > 60 ? "bg-amber-500" : "bg-green-500"}`}
                                  style={{ width: `${sectionUtilization}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="ml-1 h-3 w-3" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="ml-1 h-3 w-3" />
                        تعديل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Tracking System Tab */}
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                نظام التتبع
              </CardTitle>
              <CardDescription>
                إدارة أنظمة تتبع المخزون باستخدام QR و RFID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <QrCode className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">نظام رموز QR</h3>
                      <p className="text-sm text-muted-foreground">
                        تتبع العناصر باستخدام رموز QR
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      يستخدم نظام رموز QR لتتبع المواد الخام والمنتجات قيد
                      التصنيع والمنتجات النهائية. يمكن مسح الرموز باستخدام أي
                      جهاز محمول مزود بكاميرا.
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>سهولة الاستخدام والتطبيق</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>تكلفة منخفضة</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>يمكن طباعتها على أي سطح تقريباً</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <QrCode className="ml-2 h-4 w-4" />
                      إنشاء رمز QR
                    </Button>
                    <Button variant="outline">
                      <Scan className="ml-2 h-4 w-4" />
                      مسح رمز QR
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Tag className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">نظام RFID</h3>
                      <p className="text-sm text-muted-foreground">
                        تتبع العناصر باستخدام تقنية RFID
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      يستخدم نظام RFID لتتبع المنتجات النهائية والشحنات. يوفر
                      تتبعاً آلياً ودقيقاً للمخزون دون الحاجة إلى خط رؤية مباشر.
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>تتبع آلي بدون تدخل بشري</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>قراءة متعددة في وقت واحد</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>مقاومة للظروف البيئية القاسية</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Tag className="ml-2 h-4 w-4" />
                      برمجة بطاقة RFID
                    </Button>
                    <Button variant="outline">
                      <Scan className="ml-2 h-4 w-4" />
                      فحص بطاقات RFID
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">إحصائيات التتبع</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        عناصر بنظام QR
                      </span>
                      <span className="text-sm font-medium">
                        {
                          inventoryData.filter(
                            (item) => item.trackingMethod === "qr",
                          ).length
                        }{" "}
                        عنصر
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(inventoryData.filter((item) => item.trackingMethod === "qr").length / inventoryData.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        عناصر بنظام RFID
                      </span>
                      <span className="text-sm font-medium">
                        {
                          inventoryData.filter(
                            (item) => item.trackingMethod === "rfid",
                          ).length
                        }{" "}
                        عنصر
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{
                          width: `${(inventoryData.filter((item) => item.trackingMethod === "rfid").length / inventoryData.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        نسبة تغطية التتبع
                      </span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  توزيع المخزون حسب الفئة
                </CardTitle>
                <CardDescription>
                  نسبة توزيع المخزون بين المواد الخام والمنتجات
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  هنا سيتم عرض رسم بياني دائري لتوزيع المخزون حسب الفئة
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  حركة المخزون
                </CardTitle>
                <CardDescription>
                  تحليل حركة المخزون خلال الفترة الأخيرة
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  هنا سيتم عرض رسم بياني خطي لحركة المخزون
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                تحليل الشحنات
              </CardTitle>
              <CardDescription>
                مقارنة بين الشحنات الواردة والصادرة
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                هنا سيتم عرض رسم بياني عمودي للشحنات
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Item Details Dialog */}
      {selectedItem && (
        <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل العنصر</DialogTitle>
              <DialogDescription>
                عرض تفاصيل العنصر {selectedItem.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات أساسية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">الرمز:</div>
                    <div>{selectedItem.id}</div>
                    <div className="font-medium">الاسم:</div>
                    <div>{selectedItem.name}</div>
                    <div className="font-medium">الفئة:</div>
                    <div>{selectedItem.category}</div>
                    <div className="font-medium">الكمية:</div>
                    <div>
                      {selectedItem.quantity} {selectedItem.unit}
                    </div>
                    <div className="font-medium">الحد الأدنى:</div>
                    <div>
                      {selectedItem.minStock} {selectedItem.unit}
                    </div>
                    <div className="font-medium">الحالة:</div>
                    <div>
                      <Badge
                        className={getStatusBadgeClass(selectedItem.status)}
                      >
                        {selectedItem.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات الموقع
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">الموقع:</div>
                    <div>{selectedItem.location}</div>
                    <div className="font-medium">نظام التتبع:</div>
                    <div>
                      {selectedItem.trackingMethod === "qr" ? "رمز QR" : "RFID"}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات إضافية
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">المورد:</div>
                    <div>{selectedItem.supplier}</div>
                    <div className="font-medium">السعر:</div>
                    <div>{selectedItem.price} ₴</div>
                    <div className="font-medium">آخر تحديث:</div>
                    <div>{formatDate(selectedItem.lastUpdated)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    حالة المخزون
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>المستوى الحالي:</span>
                      <span>
                        {Math.round(
                          (selectedItem.quantity / selectedItem.minStock) * 100,
                        )}
                        % من الحد الأدنى
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${selectedItem.quantity < selectedItem.minStock ? "bg-red-500" : selectedItem.quantity < selectedItem.minStock * 2 ? "bg-amber-500" : "bg-green-500"}`}
                        style={{
                          width: `${Math.min(
                            (selectedItem.quantity /
                              (selectedItem.minStock * 3)) *
                              100,
                            100,
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    رمز التتبع
                  </h3>
                  <div className="border rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-gray-100 w-32 h-32 mx-auto flex items-center justify-center rounded-lg mb-2">
                        <QrCode className="h-16 w-16 text-gray-500" />
                      </div>
                      <Button size="sm">
                        <QrCode className="ml-1 h-3 w-3" />
                        إنشاء رمز QR
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">
                      <Edit className="ml-1 h-3 w-3" />
                      تعديل
                    </Button>
                    <Button variant="outline">
                      <Repeat className="ml-1 h-3 w-3" />
                      تحديث الكمية
                    </Button>
                    <Button variant="outline">
                      <Truck className="ml-1 h-3 w-3" />
                      طلب توريد
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Shipment Details Dialog */}
      {selectedShipment && (
        <Dialog
          open={showShipmentDetails}
          onOpenChange={setShowShipmentDetails}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل الشحنة</DialogTitle>
              <DialogDescription>
                عرض تفاصيل الشحنة {selectedShipment.id}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات الشحنة
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">رقم الشحنة:</div>
                    <div>{selectedShipment.id}</div>
                    <div className="font-medium">النوع:</div>
                    <div>
                      <Badge
                        className={
                          selectedShipment.type === "وارد"
                            ? "bg-green-100 text-green-800"
                            : selectedShipment.type === "صادر"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {selectedShipment.type}
                      </Badge>
                    </div>
                    <div className="font-medium">التاريخ:</div>
                    <div>{formatDate(selectedShipment.date)}</div>
                    <div className="font-medium">الحالة:</div>
                    <div>
                      <Badge
                        className={getStatusBadgeClass(selectedShipment.status)}
                      >
                        {selectedShipment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    معلومات النقل
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">المصدر:</div>
                    <div>{selectedShipment.source}</div>
                    <div className="font-medium">الوجهة:</div>
                    <div>{selectedShipment.destination}</div>
                    <div className="font-medium">رقم التتبع:</div>
                    <div>{selectedShipment.trackingNumber}</div>
                    <div className="font-medium">شركة النقل:</div>
                    <div>{selectedShipment.carrier}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  العناصر المشمولة
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الرمز</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>الوحدة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedShipment.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  ملاحظات
                </h3>
                <div className="p-2 bg-gray-50 rounded border text-sm">
                  {selectedShipment.notes}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline">
                  <Edit className="ml-1 h-3 w-3" />
                  تعديل
                </Button>
                <Button variant="outline">
                  <FileText className="ml-1 h-3 w-3" />
                  طباعة بوليصة الشحن
                </Button>
                {selectedShipment.status === "مجدول" && (
                  <Button>
                    <Truck className="ml-1 h-3 w-3" />
                    تأكيد الشحن
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Item Dialog */}
      <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عنصر جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل العنصر الجديد في المخزون
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="item-name" className="text-sm font-medium">
                اسم العنصر *
              </label>
              <Input id="item-name" placeholder="أدخل اسم العنصر" />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                الفئة *
              </label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مواد خام">مواد خام</SelectItem>
                  <SelectItem value="منتجات قيد التصنيع">
                    منتجات قيد التصنيع
                  </SelectItem>
                  <SelectItem value="منتجات نهائية">منتجات نهائية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                الكمية *
              </label>
              <Input id="quantity" type="number" placeholder="أدخل الكمية" />
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                الوحدة *
              </label>
              <Select>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="اختر الوحدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قطعة">قطعة</SelectItem>
                  <SelectItem value="متر">متر</SelectItem>
                  <SelectItem value="كجم">كجم</SelectItem>
                  <SelectItem value="بكرة">بكرة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                الموقع *
              </label>
              <Input id="location" placeholder="أدخل موقع التخزين" />
            </div>

            <div className="space-y-2">
              <label htmlFor="min-stock" className="text-sm font-medium">
                الحد الأدنى للمخزون *
              </label>
              <Input
                id="min-stock"
                type="number"
                placeholder="أدخل الحد الأدنى"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tracking-method" className="text-sm font-medium">
                طريقة التتبع *
              </label>
              <Select>
                <SelectTrigger id="tracking-method">
                  <SelectValue placeholder="اختر طريقة التتبع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qr">رمز QR</SelectItem>
                  <SelectItem value="rfid">RFID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="supplier" className="text-sm font-medium">
                المورد
              </label>
              <Input id="supplier" placeholder="أدخل اسم المورد" />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                السعر
              </label>
              <Input id="price" type="number" placeholder="أدخل سعر الوحدة" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddItem(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddItem}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Shipment Dialog */}
      <Dialog open={showAddShipment} onOpenChange={setShowAddShipment}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة شحنة جديدة</DialogTitle>
            <DialogDescription>أدخل تفاصيل الشحنة الجديدة</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="shipment-type" className="text-sm font-medium">
                نوع الشحنة *
              </label>
              <Select>
                <SelectTrigger id="shipment-type">
                  <SelectValue placeholder="اختر نوع الشحنة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="وارد">وارد</SelectItem>
                  <SelectItem value="صادر">صادر</SelectItem>
                  <SelectItem value="داخلي">داخلي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="shipment-date" className="text-sm font-medium">
                تاريخ الشحنة *
              </label>
              <Input
                id="shipment-date"
                type="date"
                placeholder="اختر تاريخ الشحنة"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="source" className="text-sm font-medium">
                المصدر *
              </label>
              <Input id="source" placeholder="أدخل مصدر الشحنة" />
            </div>

            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                الوجهة *
              </label>
              <Input id="destination" placeholder="أدخل وجهة الشحنة" />
            </div>

            <div className="space-y-2">
              <label htmlFor="tracking-number" className="text-sm font-medium">
                رقم التتبع
              </label>
              <Input id="tracking-number" placeholder="أدخل رقم التتبع" />
            </div>

            <div className="space-y-2">
              <label htmlFor="carrier" className="text-sm font-medium">
                شركة النقل
              </label>
              <Input id="carrier" placeholder="أدخل اسم شركة النقل" />
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="items" className="text-sm font-medium">
                العناصر المشمولة *
              </label>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground mb-2">
                  أضف العناصر المشمولة في الشحنة
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="ml-1 h-3 w-3" />
                  إضافة عنصر
                </Button>
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                ملاحظات
              </label>
              <Input id="notes" placeholder="أدخل أي ملاحظات إضافية" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddShipment(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddShipment}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
