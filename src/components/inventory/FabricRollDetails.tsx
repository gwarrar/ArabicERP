import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Scissors,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  Edit,
  QrCode,
  MapPin,
  Weight,
  Ruler,
  Printer,
  Download,
} from "lucide-react";
import { FabricRoll } from "@/types/inventory";

interface FabricRollDetailsProps {
  open: boolean;
  onClose: () => void;
  roll: FabricRoll;
  onShowQRCode: (roll: FabricRoll) => void;
}

const FabricRollDetails: React.FC<FabricRollDetailsProps> = ({
  open,
  onClose,
  roll,
  onShowQRCode,
}) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [cityFilter, setCityFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("uah");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for warehouse quantities
  const warehouseQuantities = [
    {
      id: "WH-001",
      name: "المستودع الرئيسي",
      city: "كييف",
      quantity: 1,
      location: `${roll.floorNumber}-${roll.aisleNumber}-${roll.sectionNumber}-${roll.shelfNumber}`,
      status: "متوفر",
    },
  ];

  // Sample data for fabric roll movements
  const rollMovements = [
    {
      id: "MOV-001",
      date: "2023-06-15",
      type: "استلام",
      document: "RCV-2023-001",
      warehouse: "المستودع الرئيسي",
      city: "كييف",
      length: roll.length,
      remainingLength: roll.length,
      currency: "UAH",
      user: "أحمد محمد",
    },
    {
      id: "MOV-002",
      date: "2023-07-10",
      type: "قص",
      document: "CUT-2023-005",
      warehouse: "المستودع الرئيسي",
      city: "كييف",
      length: -5,
      remainingLength: roll.length - 5,
      currency: "UAH",
      user: "سارة خالد",
    },
    {
      id: "MOV-003",
      date: "2023-08-05",
      type: "تحويل",
      document: "TR-2023-002",
      warehouse: "مستودع المواد الخام",
      city: "خاركيف",
      length: 0,
      remainingLength: roll.length - 5,
      currency: "UAH",
      user: "محمد علي",
    },
    {
      id: "MOV-004",
      date: "2023-09-15",
      type: "قص",
      document: "CUT-2023-010",
      warehouse: "مستودع المواد الخام",
      city: "خاركيف",
      length: -10,
      remainingLength: roll.length - 15,
      currency: "USD",
      user: "أحمد محمد",
    },
    {
      id: "MOV-005",
      date: "2023-10-20",
      type: "تحويل",
      document: "TR-2023-008",
      warehouse: "المستودع الرئيسي",
      city: "كييف",
      length: 0,
      remainingLength: roll.length - 15,
      currency: "UAH",
      user: "سارة خالد",
    },
  ];

  // Filter roll movements based on selected filters
  const filteredMovements = rollMovements.filter((movement) => {
    const matchesCity = cityFilter === "all" || movement.city === cityFilter;
    const matchesCurrency =
      currencyFilter === "all" ||
      movement.currency.toLowerCase() === currencyFilter;
    const matchesSearch =
      searchTerm === "" ||
      movement.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
    // Add date filtering logic if needed
    const matchesDate = dateFilter === "all" || true;

    return matchesCity && matchesCurrency && matchesSearch && matchesDate;
  });

  // Get unique cities and currencies for filters
  const cities = ["all", ...new Set(rollMovements.map((m) => m.city))];
  const currencies = [
    "all",
    ...new Set(rollMovements.map((m) => m.currency.toLowerCase())),
  ];

  // Calculate remaining length
  const remainingLength =
    rollMovements[rollMovements.length - 1].remainingLength;

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "متاح";
      case "reserved":
        return "محجوز";
      case "used":
        return "مستخدم";
      case "damaged":
        return "تالف";
      default:
        return status;
    }
  };

  if (!roll) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex justify-between items-center">
            <span>{roll.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              الرقم التسلسلي: {roll.serialNumber}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="mb-6 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="summary">
              <Scissors className="h-4 w-4 ml-2" />
              ملخص الرولون
            </TabsTrigger>
            <TabsTrigger value="warehouses">
              <Warehouse className="h-4 w-4 ml-2" />
              المستودعات
            </TabsTrigger>
            <TabsTrigger value="movements">
              <TrendingUp className="h-4 w-4 ml-2" />
              حركة المادة
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    تفاصيل الرولون
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      النوع:
                    </span>
                    <span>{roll.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      اللون:
                    </span>
                    <span>{roll.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الباركود:
                    </span>
                    <span>{roll.barcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      المورد:
                    </span>
                    <span>{roll.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      تاريخ الاستلام:
                    </span>
                    <span>{roll.receivedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الحالة:
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs ${roll.status === "available" ? "bg-green-100 text-green-800" : roll.status === "reserved" ? "bg-blue-100 text-blue-800" : roll.status === "used" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {getStatusText(roll.status)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    المواصفات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      <Weight className="h-4 w-4 inline ml-1" /> الوزن:
                    </span>
                    <span className="font-medium">{roll.weight} كغ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      <Ruler className="h-4 w-4 inline ml-1" /> الطول الأصلي:
                    </span>
                    <span>{roll.length} م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      <Ruler className="h-4 w-4 inline ml-1" /> الطول المتبقي:
                    </span>
                    <span
                      className={`${remainingLength < roll.length / 2 ? "text-amber-600 font-medium" : ""}`}
                    >
                      {remainingLength} م
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      <Ruler className="h-4 w-4 inline ml-1" /> العرض:
                    </span>
                    <span>{roll.width} سم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 inline ml-1" /> موقع التخزين:
                    </span>
                    <span>
                      {roll.floorNumber}-{roll.aisleNumber}-{roll.sectionNumber}
                      -{roll.shelfNumber}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  آخر الحركات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المستند</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead>الطول (م)</TableHead>
                      <TableHead>الطول المتبقي (م)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rollMovements.slice(0, 3).map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 text-xs ${movement.type === "استلام" ? "bg-green-100 text-green-800" : movement.type === "قص" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"} rounded-full`}
                          >
                            {movement.type}
                          </span>
                        </TableCell>
                        <TableCell>{movement.document}</TableCell>
                        <TableCell>{movement.warehouse}</TableCell>
                        <TableCell
                          className={`${movement.length > 0 ? "text-green-600" : movement.length < 0 ? "text-red-600" : ""} font-medium`}
                        >
                          {movement.length > 0
                            ? `+${movement.length}`
                            : movement.length < 0
                              ? movement.length
                              : "-"}
                        </TableCell>
                        <TableCell>{movement.remainingLength}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses" className="mt-0">
            <Card>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Warehouse className="h-4 w-4 ml-2" />
                  موقع التخزين
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>رمز المستودع</TableHead>
                      <TableHead>اسم المستودع</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>الموقع</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouseQuantities.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell>{warehouse.id}</TableCell>
                        <TableCell>{warehouse.name}</TableCell>
                        <TableCell>{warehouse.city}</TableCell>
                        <TableCell>{warehouse.quantity}</TableCell>
                        <TableCell>{warehouse.location}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 text-xs ${warehouse.status === "متوفر" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                          >
                            {warehouse.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-4">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    تفاصيل موقع التخزين
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        المستودع
                      </p>
                      <p className="font-medium">المستودع الرئيسي</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">الطابق</p>
                      <p className="font-medium">{roll.floorNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">الممر</p>
                      <p className="font-medium">{roll.aisleNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">القسم</p>
                      <p className="font-medium">{roll.sectionNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">الرف</p>
                      <p className="font-medium">{roll.shelfNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Movements Tab */}
          <TabsContent value="movements" className="mt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="w-[200px] pr-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city === "all" ? "جميع المدن" : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="العملة" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency === "all"
                        ? "جميع العملات"
                        : currency.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCityFilter("all");
                  setCurrencyFilter("all");
                  setDateFilter("all");
                }}
                className="h-10"
              >
                <Filter className="h-4 w-4 ml-1" />
                إعادة ضبط
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المستند</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>الطول (م)</TableHead>
                      <TableHead>الطول المتبقي (م)</TableHead>
                      <TableHead>العملة</TableHead>
                      <TableHead>المستخدم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.length > 0 ? (
                      filteredMovements.map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-0.5 text-xs ${movement.type === "استلام" ? "bg-green-100 text-green-800" : movement.type === "قص" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"} rounded-full`}
                            >
                              {movement.type}
                            </span>
                          </TableCell>
                          <TableCell>{movement.document}</TableCell>
                          <TableCell>{movement.warehouse}</TableCell>
                          <TableCell>{movement.city}</TableCell>
                          <TableCell
                            className={`${movement.length > 0 ? "text-green-600" : movement.length < 0 ? "text-red-600" : ""} font-medium`}
                          >
                            {movement.length > 0
                              ? `+${movement.length}`
                              : movement.length < 0
                                ? movement.length
                                : "-"}
                          </TableCell>
                          <TableCell>{movement.remainingLength}</TableCell>
                          <TableCell>{movement.currency}</TableCell>
                          <TableCell>{movement.user}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="h-24 text-center text-muted-foreground"
                        >
                          لا توجد نتائج مطابقة للبحث
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button variant="outline">
            <Edit className="ml-2 h-4 w-4" />
            تعديل
          </Button>
          <Button onClick={() => onShowQRCode(roll)}>
            <QrCode className="ml-2 h-4 w-4" />
            طباعة الباركود
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FabricRollDetails;
