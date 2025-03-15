import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Ship,
  Calendar,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Package,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Truck,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/types/inventory";
import NewContainerForm from "./NewContainerForm";
import ContainerDetails from "./ContainerDetails";

// بيانات تجريبية للكونتينرات
const dummyContainers: Container[] = [
  {
    id: "CNT-001",
    name: "كونتينر الملابس الشتوية",
    trackingNumber: "SHIP123456789",
    arrivalDate: "2023-12-15",
    expectedArrivalDate: "2023-12-10",
    status: "arrived",
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
    linkedInvoices: [
      {
        id: "INV-2024-0123",
        supplier: "شركة الصين للملابس",
        date: "2023-12-01",
        amount: 105000,
        status: "added_to_container",
      },
    ],
    expenses: [
      {
        id: "EXP-001",
        date: "2023-12-05",
        expenseType: "shipping",
        description: "تكاليف الشحن البحري",
        amount: 15000,
        paymentStatus: "paid",
        beneficiary: "شركة الشحن العالمية",
      },
      {
        id: "EXP-002",
        date: "2023-12-15",
        expenseType: "customs",
        description: "رسوم جمركية",
        amount: 8000,
        paymentStatus: "paid",
        beneficiary: "الجمارك",
      },
      {
        id: "EXP-003",
        date: "2023-12-16",
        expenseType: "transportation",
        description: "نقل من الميناء إلى المستودع",
        amount: 3000,
        paymentStatus: "pending",
        beneficiary: "شركة النقل المحلية",
      },
    ],
    documents: [
      {
        id: "DOC-001",
        name: "بوليصة الشحن",
        type: "PDF",
        uploadedAt: "2023-11-15",
        size: "1.2 MB",
      },
      {
        id: "DOC-002",
        name: "شهادة المنشأ",
        type: "PDF",
        uploadedAt: "2023-11-15",
        size: "0.8 MB",
      },
    ],
    createdBy: "أحمد محمد",
    createdAt: "2023-11-01",
    updatedAt: "2023-12-15",
  },
  {
    id: "CNT-002",
    name: "كونتينر الأحذية",
    trackingNumber: "SHIP987654321",
    arrivalDate: "",
    expectedArrivalDate: "2024-01-15",
    status: "in_transit",
    supplier: "شركة الأحذية العالمية",
    supplierId: "SUP-002",
    origin: "تركيا",
    destination: "مستودع جدة",
    shippingCompany: "شركة النقل البحري",
    containerType: "Standard",
    containerSize: "20ft",
    expectedItems: [
      {
        id: "ITEM-003",
        productId: "PROD-003",
        productName: "حذاء رياضي رجالي",
        expectedQuantity: 1000,
        unit: "زوج",
        unitPrice: 80,
        totalPrice: 80000,
      },
      {
        id: "ITEM-004",
        productId: "PROD-004",
        productName: "حذاء نسائي كعب عالي",
        expectedQuantity: 500,
        unit: "زوج",
        unitPrice: 100,
        totalPrice: 50000,
      },
    ],
    linkedInvoices: [
      {
        id: "INV-2024-0124",
        supplier: "شركة الأحذية العالمية",
        date: "2023-12-20",
        amount: 130000,
        status: "added_to_container",
      },
    ],
    expenses: [
      {
        id: "EXP-004",
        date: "2023-12-25",
        expenseType: "shipping",
        description: "تكاليف الشحن البحري",
        amount: 12000,
        paymentStatus: "paid",
        beneficiary: "شركة النقل البحري",
      },
      {
        id: "EXP-005",
        date: "2023-12-25",
        expenseType: "insurance",
        description: "تأمين الشحنة",
        amount: 5000,
        paymentStatus: "paid",
        beneficiary: "شركة التأمين",
      },
    ],
    documents: [
      {
        id: "DOC-003",
        name: "بوليصة الشحن",
        type: "PDF",
        uploadedAt: "2023-12-10",
        size: "1.5 MB",
      },
    ],
    createdBy: "سارة أحمد",
    createdAt: "2023-12-05",
    updatedAt: "2023-12-20",
  },
  {
    id: "CNT-003",
    name: "كونتينر الإكسسوارات",
    trackingNumber: "SHIP456789123",
    arrivalDate: "",
    expectedArrivalDate: "2024-02-05",
    status: "pending",
    supplier: "شركة الإكسسوارات الفاخرة",
    supplierId: "SUP-003",
    origin: "إيطاليا",
    destination: "مستودع الدمام",
    shippingCompany: "شركة الشحن السريع",
    containerType: "Refrigerated",
    containerSize: "20ft",
    expectedItems: [
      {
        id: "ITEM-005",
        productId: "PROD-005",
        productName: "ساعة يد رجالية",
        expectedQuantity: 200,
        unit: "قطعة",
        unitPrice: 500,
        totalPrice: 100000,
      },
      {
        id: "ITEM-006",
        productId: "PROD-006",
        productName: "حقيبة يد نسائية",
        expectedQuantity: 300,
        unit: "قطعة",
        unitPrice: 350,
        totalPrice: 105000,
      },
    ],
    linkedInvoices: [],
    expenses: [],
    documents: [],
    createdBy: "محمد علي",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10",
  },
];

const ContainersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewContainerDialogOpen, setIsNewContainerDialogOpen] =
    useState(false);
  const [showContainerDetails, setShowContainerDetails] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null,
  );
  const [containers, setContainers] = useState<Container[]>(dummyContainers);

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

  // حساب إحصائيات الكونتينرات
  const containerStats = {
    total: containers.length,
    inTransit: containers.filter((c) => c.status === "in_transit").length,
    arrived: containers.filter((c) => c.status === "arrived").length,
    completed: containers.filter((c) => c.status === "completed").length,
    totalValue: containers.reduce((sum, container) => {
      return (
        sum +
        container.expectedItems.reduce(
          (itemSum, item) => itemSum + item.totalPrice,
          0,
        )
      );
    }, 0),
  };

  // عرض تفاصيل الكونتينر
  const handleViewContainer = (container: Container) => {
    setSelectedContainer(container);
    setShowContainerDetails(true);
  };

  // تحديث بيانات الكونتينر
  const handleUpdateContainer = (updatedContainer: Container) => {
    const updatedContainers = containers.map((container) =>
      container.id === updatedContainer.id ? updatedContainer : container,
    );
    setContainers(updatedContainers);
  };

  // إضافة كونتينر جديد
  const handleAddContainer = (newContainer: Container) => {
    setContainers([...containers, newContainer]);
    setIsNewContainerDialogOpen(false);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة الكونتينرات</h2>
        <Button onClick={() => setIsNewContainerDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          كونتينر جديد
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-700 flex justify-between items-center">
              <span>إجمالي الكونتينرات</span>
              <Ship className="h-5 w-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {containerStats.total}
            </div>
            <p className="text-sm text-blue-600 mt-1">كونتينر</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700 flex justify-between items-center">
              <span>في الطريق</span>
              <Truck className="h-5 w-5 text-amber-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">
              {containerStats.inTransit}
            </div>
            <p className="text-sm text-amber-600 mt-1">كونتينر قيد الشحن</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-purple-700 flex justify-between items-center">
              <span>وصلت</span>
              <MapPin className="h-5 w-5 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {containerStats.arrived}
            </div>
            <p className="text-sm text-purple-600 mt-1">كونتينر وصل</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-700 flex justify-between items-center">
              <span>القيمة الإجمالية</span>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {containerStats.totalValue.toLocaleString()} ₴
            </div>
            <p className="text-sm text-green-600 mt-1">قيمة البضائع</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">قائمة الكونتينرات</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="w-[250px] pr-9"
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
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="in_transit">في الطريق</SelectItem>
                  <SelectItem value="arrived">وصل</SelectItem>
                  <SelectItem value="cleared">تم التخليص</SelectItem>
                  <SelectItem value="received">تم الاستلام</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">رقم الكونتينر</TableHead>
                  <TableHead>اسم الكونتينر</TableHead>
                  <TableHead>رقم التتبع</TableHead>
                  <TableHead>المورد</TableHead>
                  <TableHead>تاريخ الوصول</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContainers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      لا توجد كونتينرات متطابقة مع البحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContainers.map((container) => (
                    <TableRow
                      key={container.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => handleViewContainer(container)}
                    >
                      <TableCell className="font-medium">
                        {container.id}
                      </TableCell>
                      <TableCell>{container.name}</TableCell>
                      <TableCell>{container.trackingNumber || "-"}</TableCell>
                      <TableCell>{container.supplier}</TableCell>
                      <TableCell>{container.arrivalDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(container.status)}`}
                          variant="outline"
                        >
                          {getStatusText(container.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="عرض التفاصيل"
                            onClick={() => handleViewContainer(container)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 ml-2" />
                                المستندات
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ship className="h-4 w-4 ml-2" />
                                تتبع الشحنة
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 ml-2" />
                                تحديث الحالة
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* نافذة إضافة كونتينر جديد */}
      <NewContainerForm
        open={isNewContainerDialogOpen}
        onClose={() => setIsNewContainerDialogOpen(false)}
        onSave={handleAddContainer}
      />

      {/* نافذة تفاصيل الكونتينر */}
      {selectedContainer && (
        <ContainerDetails
          open={showContainerDetails}
          onClose={() => setShowContainerDetails(false)}
          container={selectedContainer}
          onSave={handleUpdateContainer}
        />
      )}
    </div>
  );
};

export default ContainersList;
