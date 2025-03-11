import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ZoomIn,
  ZoomOut,
  Layers,
  Move,
  Plus,
  Edit,
  Trash,
  Package,
  AlertTriangle,
  CheckCircle,
  Info,
  Warehouse,
  Box,
  Scissors,
  Shirt,
  Ruler,
  Palette,
} from "lucide-react";

// نموذج لبيانات المستودع
interface WarehouseSection {
  id: string;
  name: string;
  type: "raw" | "finished" | "accessories" | "packaging";
  utilization: number; // نسبة الاستخدام (0-100)
  status: "available" | "limited" | "full";
  items: number;
  capacity: number;
}

interface WarehouseRack {
  id: string;
  name: string;
  sectionId: string;
  status: "available" | "limited" | "full";
  utilization: number;
  items: WarehouseItem[];
}

interface WarehouseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  location: string;
  status: "normal" | "low" | "critical";
}

const EnhancedWarehouseMap = () => {
  const [zoom, setZoom] = useState(100);
  const [activeLayer, setActiveLayer] = useState<
    "all" | "raw" | "finished" | "accessories" | "packaging"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] =
    useState<WarehouseSection | null>(null);
  const [selectedRack, setSelectedRack] = useState<WarehouseRack | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WarehouseItem | null>(null);

  // بيانات تجريبية لأقسام المستودع
  const warehouseSections: WarehouseSection[] = [
    {
      id: "section-1",
      name: "قسم المواد الخام",
      type: "raw",
      utilization: 75,
      status: "limited",
      items: 120,
      capacity: 150,
    },
    {
      id: "section-2",
      name: "قسم المنتجات النهائية",
      type: "finished",
      utilization: 60,
      status: "available",
      items: 180,
      capacity: 300,
    },
    {
      id: "section-3",
      name: "قسم الإكسسوارات",
      type: "accessories",
      utilization: 90,
      status: "full",
      items: 450,
      capacity: 500,
    },
    {
      id: "section-4",
      name: "قسم مواد التغليف",
      type: "packaging",
      utilization: 40,
      status: "available",
      items: 80,
      capacity: 200,
    },
  ];

  // بيانات تجريبية للرفوف
  const warehouseRacks: WarehouseRack[] = [
    {
      id: "rack-1",
      name: "رف A-01",
      sectionId: "section-1",
      status: "full",
      utilization: 95,
      items: [
        {
          id: "item-1",
          productId: "PROD-001",
          productName: "قماش قطني أبيض",
          quantity: 1200,
          unit: "متر",
          location: "A-01-01",
          status: "normal",
        },
        {
          id: "item-2",
          productId: "PROD-002",
          productName: "قماش قطني أسود",
          quantity: 800,
          unit: "متر",
          location: "A-01-02",
          status: "normal",
        },
      ],
    },
    {
      id: "rack-2",
      name: "رف A-02",
      sectionId: "section-1",
      status: "limited",
      utilization: 70,
      items: [
        {
          id: "item-3",
          productId: "PROD-003",
          productName: "قماش جينز",
          quantity: 600,
          unit: "متر",
          location: "A-02-01",
          status: "low",
        },
      ],
    },
    {
      id: "rack-3",
      name: "رف B-01",
      sectionId: "section-2",
      status: "available",
      utilization: 50,
      items: [
        {
          id: "item-4",
          productId: "PROD-004",
          productName: "قميص رجالي أبيض",
          quantity: 120,
          unit: "قطعة",
          location: "B-01-01",
          status: "normal",
        },
        {
          id: "item-5",
          productId: "PROD-005",
          productName: "قميص رجالي أسود",
          quantity: 80,
          unit: "قطعة",
          location: "B-01-02",
          status: "low",
        },
      ],
    },
    {
      id: "rack-4",
      name: "رف C-01",
      sectionId: "section-3",
      status: "full",
      utilization: 100,
      items: [
        {
          id: "item-6",
          productId: "PROD-006",
          productName: "أزرار بلاستيكية",
          quantity: 5000,
          unit: "قطعة",
          location: "C-01-01",
          status: "normal",
        },
        {
          id: "item-7",
          productId: "PROD-007",
          productName: "سحابات معدنية",
          quantity: 3000,
          unit: "قطعة",
          location: "C-01-02",
          status: "normal",
        },
      ],
    },
    {
      id: "rack-5",
      name: "رف D-01",
      sectionId: "section-4",
      status: "available",
      utilization: 30,
      items: [
        {
          id: "item-8",
          productId: "PROD-008",
          productName: "أكياس تغليف",
          quantity: 2000,
          unit: "قطعة",
          location: "D-01-01",
          status: "normal",
        },
        {
          id: "item-9",
          productId: "PROD-009",
          productName: "علب كرتون",
          quantity: 500,
          unit: "قطعة",
          location: "D-01-02",
          status: "critical",
        },
      ],
    },
  ];

  // الحصول على لون حالة القسم أو الرف
  const getStatusColor = (status: string, utilization: number) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-500 text-green-800";
      case "limited":
        return "bg-amber-100 border-amber-500 text-amber-800";
      case "full":
        return "bg-red-100 border-red-500 text-red-800";
      case "normal":
        return "bg-green-100 border-green-500 text-green-800";
      case "low":
        return "bg-amber-100 border-amber-500 text-amber-800";
      case "critical":
        return "bg-red-100 border-red-500 text-red-800";
      default:
        if (utilization < 50)
          return "bg-green-100 border-green-500 text-green-800";
        if (utilization < 80)
          return "bg-amber-100 border-amber-500 text-amber-800";
        return "bg-red-100 border-red-500 text-red-800";
    }
  };

  // الحصول على أيقونة نوع القسم
  const getSectionIcon = (type: string) => {
    switch (type) {
      case "raw":
        return <Ruler className="h-5 w-5 text-blue-600" />;
      case "finished":
        return <Shirt className="h-5 w-5 text-green-600" />;
      case "accessories":
        return <Scissors className="h-5 w-5 text-purple-600" />;
      case "packaging":
        return <Box className="h-5 w-5 text-amber-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  // تصفية الأقسام حسب الطبقة النشطة
  const filteredSections = warehouseSections.filter(
    (section) => activeLayer === "all" || section.type === activeLayer,
  );

  // تصفية الرفوف حسب القسم المحدد
  const filteredRacks = selectedSection
    ? warehouseRacks.filter((rack) => rack.sectionId === selectedSection.id)
    : [];

  // البحث عن عنصر في المستودع
  const handleSearch = () => {
    if (!searchQuery) return;

    // البحث في جميع العناصر
    for (const rack of warehouseRacks) {
      const foundItem = rack.items.find(
        (item) =>
          item.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      if (foundItem) {
        // العثور على القسم الذي يحتوي على الرف
        const section = warehouseSections.find((s) => s.id === rack.sectionId);
        if (section) {
          setSelectedSection(section);
          setSelectedRack(rack);
          setSelectedItem(foundItem);
          setShowItemDetails(true);
          return;
        }
      }
    }

    // إذا لم يتم العثور على العنصر
    alert("لم يتم العثور على العنصر");
  };

  // تكبير الخريطة
  const zoomIn = () => {
    setZoom(Math.min(zoom + 10, 150));
  };

  // تصغير الخريطة
  const zoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  // عرض تفاصيل القسم
  const handleSectionClick = (section: WarehouseSection) => {
    setSelectedSection(section);
    setSelectedRack(null);
  };

  // عرض تفاصيل الرف
  const handleRackClick = (rack: WarehouseRack) => {
    setSelectedRack(rack);
  };

  // عرض تفاصيل العنصر
  const handleItemClick = (item: WarehouseItem) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">خريطة المستودع</h2>
          <p className="text-muted-foreground">
            عرض وإدارة مواقع المنتجات في المستودع
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن منتج أو موقع..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>
            <Search className="ml-2 h-4 w-4" />
            بحث
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* أدوات الخريطة */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>أدوات الخريطة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* أدوات التكبير والتصغير */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">التكبير والتصغير</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">{zoom}%</div>
                <Button variant="outline" size="icon" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* طبقات الخريطة */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">طبقات الخريطة</h3>
              <div className="space-y-1">
                <Button
                  variant={activeLayer === "all" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveLayer("all")}
                >
                  <Layers className="ml-2 h-4 w-4" />
                  جميع الأقسام
                </Button>
                <Button
                  variant={activeLayer === "raw" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveLayer("raw")}
                >
                  <Ruler className="ml-2 h-4 w-4" />
                  المواد الخام
                </Button>
                <Button
                  variant={activeLayer === "finished" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveLayer("finished")}
                >
                  <Shirt className="ml-2 h-4 w-4" />
                  المنتجات النهائية
                </Button>
                <Button
                  variant={
                    activeLayer === "accessories" ? "default" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveLayer("accessories")}
                >
                  <Scissors className="ml-2 h-4 w-4" />
                  الإكسسوارات
                </Button>
                <Button
                  variant={activeLayer === "packaging" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveLayer("packaging")}
                >
                  <Box className="ml-2 h-4 w-4" />
                  مواد التغليف
                </Button>
              </div>
            </div>

            {/* إحصائيات المستودع */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">إحصائيات المستودع</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    إجمالي المساحة:
                  </span>
                  <span className="font-medium">1,150 م²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    عدد الأقسام:
                  </span>
                  <span className="font-medium">
                    {warehouseSections.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    عدد الرفوف:
                  </span>
                  <span className="font-medium">{warehouseRacks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    نسبة الإشغال:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">65%</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* مؤشرات الحالة */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">مؤشرات الحالة</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">متاح</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">محدود</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">ممتلئ</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* خريطة المستودع */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>خريطة المستودع التفاعلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative border rounded-md p-4 min-h-[500px] overflow-auto"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top right",
              }}
            >
              {/* أقسام المستودع */}
              <div className="grid grid-cols-2 gap-4">
                {filteredSections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-4 border-2 rounded-md cursor-pointer ${getStatusColor(section.status, section.utilization)} ${selectedSection?.id === section.id ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => handleSectionClick(section)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getSectionIcon(section.type)}
                        <h3 className="font-medium">{section.name}</h3>
                      </div>
                      <Badge
                        className={getStatusColor(
                          section.status,
                          section.utilization,
                        )}
                      >
                        {section.status === "available"
                          ? "متاح"
                          : section.status === "limited"
                            ? "محدود"
                            : "ممتلئ"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>نسبة الإشغال:</span>
                        <span>{section.utilization}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${section.utilization < 50 ? "bg-green-500" : section.utilization < 80 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${section.utilization}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>العناصر:</span>
                        <span>
                          {section.items} / {section.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* الرفوف عند اختيار قسم */}
              {selectedSection && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">
                    رفوف {selectedSection.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {filteredRacks.map((rack) => (
                      <div
                        key={rack.id}
                        className={`p-3 border rounded-md cursor-pointer ${getStatusColor(rack.status, rack.utilization)} ${selectedRack?.id === rack.id ? "ring-2 ring-blue-500" : ""}`}
                        onClick={() => handleRackClick(rack)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{rack.name}</h4>
                          <Badge
                            className={getStatusColor(
                              rack.status,
                              rack.utilization,
                            )}
                          >
                            {rack.utilization}%
                          </Badge>
                        </div>
                        <div className="text-sm">
                          عدد العناصر: {rack.items.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* العناصر عند اختيار رف */}
              {selectedRack && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">
                    محتويات {selectedRack.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRack.items.map((item) => (
                      <TooltipProvider key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`p-3 border rounded-md cursor-pointer ${getStatusColor(item.status, 0)}`}
                              onClick={() => handleItemClick(item)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">
                                    {item.productName}
                                  </h4>
                                  <div className="text-xs text-muted-foreground">
                                    {item.productId} - {item.location}
                                  </div>
                                </div>
                                <Badge
                                  className={getStatusColor(item.status, 0)}
                                >
                                  {item.status === "normal"
                                    ? "عادي"
                                    : item.status === "low"
                                      ? "منخفض"
                                      : "حرج"}
                                </Badge>
                              </div>
                              <div className="mt-2 text-sm">
                                الكمية: {item.quantity} {item.unit}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>انقر لعرض التفاصيل</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تفاصيل العنصر المحدد */}
      <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تفاصيل المنتج</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedItem.productName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.productId}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">
                    التفاصيل
                  </TabsTrigger>
                  <TabsTrigger value="movement" className="flex-1">
                    حركة المخزون
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">الموقع</p>
                      <p className="font-medium">{selectedItem.location}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">الكمية</p>
                      <p className="font-medium">
                        {selectedItem.quantity} {selectedItem.unit}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <Badge className={getStatusColor(selectedItem.status, 0)}>
                        {selectedItem.status === "normal"
                          ? "عادي"
                          : selectedItem.status === "low"
                            ? "منخفض"
                            : "حرج"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">آخر تحديث</p>
                      <p className="font-medium">2024-08-15</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">المواصفات</p>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">اللون</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full bg-white border"></div>
                          <span className="text-sm">أبيض</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ملاحظات</p>
                    <div className="p-3 border rounded-md">
                      <p className="text-sm">
                        تم استلام الشحنة بتاريخ 2024-08-01
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="movement" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">استلام</p>
                          <p className="text-xs text-muted-foreground">
                            2024-08-01
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          +1500 {selectedItem.unit}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">صرف للإنتاج</p>
                          <p className="text-xs text-muted-foreground">
                            2024-08-05
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          -300 {selectedItem.unit}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowItemDetails(false)}>
              إغلاق
            </Button>
            <Button>
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedWarehouseMap;
