import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Ship,
  Package,
  Calendar,
  Eye,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/types/inventory";

const ReceiveContainersTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("cleared");
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null,
  );
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);

  // بيانات تجريبية للكونتينرات الجاهزة للاستلام
  const containers = [
    {
      id: "CNT-001",
      name: "كونتينر الملابس الشتوية",
      trackingNumber: "SHIP123456789",
      arrivalDate: "2023-12-15",
      expectedArrivalDate: "2023-12-10",
      status: "cleared",
      supplier: "شركة الصين للملابس",
      supplierId: "SUP-001",
      origin: "الصين",
      destination: "مستودع الرياض",
      shippingCompany: "شركة الشحن العالمية",
      containerType: "Standard",
      containerSize: "40ft",
      expectedItems: [
        {
          id: "ITEM-001",
          productId: "PROD-001",
          productName: "معطف شتوي رجالي",
          expectedQuantity: 500,
          unit: "قطعة",
          unitPrice: 120,
          totalPrice: 60000,
        },
        {
          id: "ITEM-002",
          productId: "PROD-002",
          productName: "سترة نسائية",
          expectedQuantity: 300,
          unit: "قطعة",
          unitPrice: 150,
          totalPrice: 45000,
        },
      ],
      createdBy: "أحمد محمد",
      createdAt: "2023-11-01",
      updatedAt: "2023-12-15",
    },
    {
      id: "CNT-004",
      name: "كونتينر الأقمشة",
      trackingNumber: "SHIP789456123",
      arrivalDate: "2024-01-20",
      expectedArrivalDate: "2024-01-15",
      status: "cleared",
      supplier: "شركة الأقمشة العالمية",
      supplierId: "SUP-004",
      origin: "الهند",
      destination: "مستودع المواد الخام",
      shippingCompany: "شركة الشحن الدولية",
      containerType: "Standard",
      containerSize: "40ft",
      expectedItems: [
        {
          id: "ITEM-007",
          productId: "FAB-001",
          productName: "قماش قطني أبيض",
          expectedQuantity: 5000,
          unit: "متر",
          unitPrice: 15,
          totalPrice: 75000,
        },
        {
          id: "ITEM-008",
          productId: "FAB-002",
          productName: "قماش صوف أسود",
          expectedQuantity: 3000,
          unit: "متر",
          unitPrice: 25,
          totalPrice: 75000,
        },
        {
          id: "ITEM-009",
          productId: "FAB-003",
          productName: "قماش جينز أزرق",
          expectedQuantity: 4000,
          unit: "متر",
          unitPrice: 20,
          totalPrice: 80000,
        },
      ],
      createdBy: "محمد علي",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-20",
    },
  ];

  // تصفية الكونتينرات حسب البحث والفلتر
  const filteredContainers = containers.filter((container) => {
    // فلتر الحالة
    if (statusFilter !== "all" && container.status !== statusFilter) {
      return false;
    }

    // فلتر البحث
    if (searchTerm === "") {
      return true;
    }

    // البحث في الاسم ورقم التتبع والمورد
    return (
      container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (container.trackingNumber &&
        container.trackingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      container.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // تحويل حالة الكونتينر إلى نص عربي
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "in_transit":
        return "في الطريق";
      case "arrived":
        return "وصل";
      case "cleared":
        return "تم التخليص";
      case "received":
        return "تم الاستلام";
      case "completed":
        return "مكتمل";
      default:
        return status;
    }
  };

  // تحديد لون حالة الكونتينر
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "in_transit":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "arrived":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "cleared":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case "received":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // عرض تفاصيل الكونتينر
  const handleViewContainer = (container: any) => {
    setSelectedContainer(container);
    // في التطبيق الحقيقي، هنا سيتم فتح نافذة تفاصيل الكونتينر أو الانتقال إلى صفحة تفاصيل الكونتينر
    console.log("View container:", container.id);

    // يمكن هنا فتح نافذة استلام الكونتينر مباشرة
    // setShowReceiveDialog(true);

    // أو الانتقال إلى صفحة تفاصيل الكونتينر
    window.location.href = `/purchases?container=${container.id}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">استلام الكونتينرات في المخزون</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث برقم الكونتينر أو اسم المورد..."
            className="pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="cleared">تم التخليص</SelectItem>
            <SelectItem value="received">تم الاستلام</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            الكونتينرات الجاهزة للاستلام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">رقم الكونتينر</TableHead>
                  <TableHead>اسم الكونتينر</TableHead>
                  <TableHead>المورد</TableHead>
                  <TableHead>تاريخ الوصول</TableHead>
                  <TableHead>عدد الأصناف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContainers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      لا توجد كونتينرات جاهزة للاستلام
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContainers.map((container) => (
                    <TableRow
                      key={container.id}
                      className="cursor-pointer hover:bg-muted/30"
                    >
                      <TableCell className="font-medium">
                        {container.id}
                      </TableCell>
                      <TableCell>{container.name}</TableCell>
                      <TableCell>{container.supplier}</TableCell>
                      <TableCell>{container.arrivalDate}</TableCell>
                      <TableCell>{container.expectedItems.length}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(container.status)}
                          variant="outline"
                        >
                          {getStatusText(container.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewContainer(container)}
                            className="flex items-center"
                          >
                            <Eye className="h-4 w-4 ml-1" />
                            عرض
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleViewContainer(container)}
                            className="flex items-center bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
                          >
                            <Warehouse className="h-4 w-4 ml-1" />
                            استلام
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* معلومات إضافية */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <div className="flex items-start">
          <Ship className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
          <div>
            <h3 className="font-medium mb-1">استلام الكونتينرات في المخزون</h3>
            <p className="text-sm">
              يمكنك استلام الكونتينرات التي تم تخليصها جمركياً وإضافة محتوياتها
              إلى المخزون. عند استلام الكونتينر، سيتم تحديث حالته تلقائياً إلى
              "تم الاستلام" وإنشاء حركة مخزون جديدة.
            </p>
            <div className="mt-2 flex items-center">
              <ArrowRight className="h-4 w-4 ml-1 text-blue-600" />
              <span className="text-sm font-medium">
                للاطلاع على تفاصيل الكونتينر، انقر على زر "عرض".
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveContainersTab;
