import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import FabricRollDetails from "./FabricRollDetails";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  QrCode,
  MapPin,
  Printer,
  Download,
} from "lucide-react";
import { FabricRoll } from "@/types/inventory";

const FabricRollsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showRollDetails, setShowRollDetails] = useState(false);
  const [selectedRoll, setSelectedRoll] = useState<FabricRoll | null>(null);
  const [showNewRollDialog, setShowNewRollDialog] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // بيانات تجريبية لرولونات القماش
  const fabricRolls: FabricRoll[] = [
    {
      id: "FR-001",
      serialNumber: "SN12345678",
      barcode: "BC12345678",
      name: "قطن مصري فاخر",
      type: "قطن",
      color: "أبيض",
      weight: 25,
      length: 50,
      width: 150,
      supplier: "شركة الأمل للتوريدات",
      receivedDate: "2023-06-15",
      warehouseId: "WH-001",
      shelfNumber: "1",
      sectionNumber: "1",
      aisleNumber: "A",
      floorNumber: "1",
      status: "available",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-15",
      updatedAt: "2023-06-15",
    },
    {
      id: "FR-002",
      serialNumber: "SN12345679",
      barcode: "BC12345679",
      name: "قطن أمريكي متوسط",
      type: "قطن",
      color: "أبيض",
      weight: 20,
      length: 45,
      width: 150,
      supplier: "شركة الأمل للتوريدات",
      receivedDate: "2023-06-16",
      warehouseId: "WH-001",
      shelfNumber: "1",
      sectionNumber: "1",
      aisleNumber: "A",
      floorNumber: "1",
      status: "available",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-16",
      updatedAt: "2023-06-16",
    },
    {
      id: "FR-003",
      serialNumber: "SN12345680",
      barcode: "BC12345680",
      name: "حرير طبيعي",
      type: "حرير",
      color: "أحمر",
      weight: 15,
      length: 30,
      width: 120,
      supplier: "مؤسسة النور للتجارة",
      receivedDate: "2023-06-17",
      warehouseId: "WH-001",
      shelfNumber: "2",
      sectionNumber: "1",
      aisleNumber: "A",
      floorNumber: "1",
      status: "reserved",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-17",
      updatedAt: "2023-06-17",
    },
    {
      id: "FR-004",
      serialNumber: "SN12345681",
      barcode: "BC12345681",
      name: "قطن مصري فاخر",
      type: "قطن",
      color: "أزرق",
      weight: 25,
      length: 50,
      width: 150,
      supplier: "شركة الأمل للتوريدات",
      receivedDate: "2023-06-18",
      warehouseId: "WH-001",
      shelfNumber: "3",
      sectionNumber: "2",
      aisleNumber: "B",
      floorNumber: "1",
      status: "available",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-18",
      updatedAt: "2023-06-18",
    },
    {
      id: "FR-005",
      serialNumber: "SN12345682",
      barcode: "BC12345682",
      name: "كتان طبيعي",
      type: "كتان",
      color: "بيج",
      weight: 18,
      length: 40,
      width: 140,
      supplier: "شركة الفجر للمعدات",
      receivedDate: "2023-06-19",
      warehouseId: "WH-001",
      shelfNumber: "1",
      sectionNumber: "3",
      aisleNumber: "C",
      floorNumber: "2",
      status: "damaged",
      currentStock: 1,
      minStock: 1,
      createdAt: "2023-06-19",
      updatedAt: "2023-06-19",
    },
  ];

  // الأنواع الفريدة للقماش
  const fabricTypes = ["all", ...new Set(fabricRolls.map((roll) => roll.type))];

  // تصفية الرولونات بناءً على البحث والنوع
  const filteredRolls = fabricRolls.filter((roll) => {
    const matchesSearch = searchTerm
      ? roll.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roll.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roll.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesType = selectedType === "all" || roll.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleRollClick = (roll: FabricRoll) => {
    setSelectedRoll(roll);
    setShowRollDetails(true);
  };

  const handleShowQRCode = (roll: FabricRoll, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRoll(roll);
    setShowQRCode(true);
  };

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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-blue-100 text-blue-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "damaged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">رولونات القماش</h2>
        <Button onClick={() => setShowNewRollDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          رولون جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث بالرقم التسلسلي، الباركود، أو الاسم..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">جميع الأنواع</option>
              {fabricTypes.slice(1).map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الرقم التسلسلي</TableHead>
              <TableHead>الباركود</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>اللون</TableHead>
              <TableHead>الوزن (كغ)</TableHead>
              <TableHead>الطول (م)</TableHead>
              <TableHead>المورد</TableHead>
              <TableHead>الموقع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <QrCode className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد رولونات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRolls.map((roll) => (
                <TableRow
                  key={roll.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRollClick(roll)}
                >
                  <TableCell className="font-medium">
                    {roll.serialNumber}
                  </TableCell>
                  <TableCell>{roll.barcode}</TableCell>
                  <TableCell>{roll.name}</TableCell>
                  <TableCell>{roll.type}</TableCell>
                  <TableCell>{roll.color}</TableCell>
                  <TableCell>{roll.weight}</TableCell>
                  <TableCell>{roll.length}</TableCell>
                  <TableCell>{roll.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                      <span>
                        {roll && roll.floorNumber
                          ? `${roll.floorNumber}-${roll.aisleNumber || "-"}-${roll.sectionNumber || "-"}-${roll.shelfNumber || "-"}`
                          : "-"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${getStatusClass(roll.status)} rounded-full`}
                    >
                      {getStatusText(roll.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleShowQRCode(roll, e)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* تفاصيل الرولون */}
      {selectedRoll && (
        <FabricRollDetails
          open={showRollDetails}
          onClose={() => setShowRollDetails(false)}
          roll={selectedRoll}
          onShowQRCode={(roll) => {
            setShowRollDetails(false);
            setSelectedRoll(roll);
            setShowQRCode(true);
          }}
        />
      )}

      {/* عرض الباركود */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>باركود رولون القماش</DialogTitle>
          </DialogHeader>
          {selectedRoll && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                {/* هنا يمكن استخدام مكتبة لتوليد QR Code */}
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
                <p className="text-center font-medium">
                  {selectedRoll.serialNumber}
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  {selectedRoll.name}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={() => setShowQRCode(false)}>
                  إغلاق
                </Button>
                <Button>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button variant="outline">
                  <Download className="ml-2 h-4 w-4" />
                  تحميل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* نموذج إضافة رولون جديد */}
      <Dialog open={showNewRollDialog} onOpenChange={setShowNewRollDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>إضافة رولون قماش جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الرقم التسلسلي</label>
                <Input placeholder="الرقم التسلسلي" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الباركود</label>
                <Input placeholder="الباركود" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الاسم</label>
                <Input placeholder="اسم القماش" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">النوع</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر النوع</option>
                  <option value="قطن">قطن</option>
                  <option value="حرير">حرير</option>
                  <option value="صوف">صوف</option>
                  <option value="كتان">كتان</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">اللون</label>
                <Input placeholder="اللون" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوزن (كغ)</label>
                <Input type="number" placeholder="الوزن" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الطول (م)</label>
                <Input type="number" placeholder="الطول" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">العرض (سم)</label>
                <Input type="number" placeholder="العرض" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المورد</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر المورد</option>
                  <option value="شركة الأمل للتوريدات">
                    شركة الأمل للتوريدات
                  </option>
                  <option value="مؤسسة النور للتجارة">
                    مؤسسة النور للتجارة
                  </option>
                  <option value="شركة الفجر للمعدات">شركة الفجر للمعدات</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تاريخ الاستلام</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  تاريخ انتهاء الصلاحية (اختياري)
                </label>
                <Input type="date" />
              </div>
            </div>

            <h3 className="text-md font-semibold mt-4 mb-2">موقع التخزين</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">المستودع</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر المستودع</option>
                  <option value="WH-001">المستودع الرئيسي</option>
                  <option value="WH-002">مستودع المواد الخام</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الطابق</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الطابق</option>
                  <option value="1">الطابق الأول</option>
                  <option value="2">الطابق الثاني</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الممر</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الممر</option>
                  <option value="A">ممر A</option>
                  <option value="B">ممر B</option>
                  <option value="C">ممر C</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">القسم</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر القسم</option>
                  <option value="1">قسم 1</option>
                  <option value="2">قسم 2</option>
                  <option value="3">قسم 3</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الرف</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الرف</option>
                  <option value="1">رف 1</option>
                  <option value="2">رف 2</option>
                  <option value="3">رف 3</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="available">متاح</option>
                  <option value="reserved">محجوز</option>
                  <option value="used">مستخدم</option>
                  <option value="damaged">تالف</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ملاحظات</label>
              <Input placeholder="ملاحظات إضافية" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewRollDialog(false)}
              >
                إلغاء
              </Button>
              <Button
                onClick={() => {
                  setShowNewRollDialog(false);
                  // هنا يمكن إضافة منطق لتوليد باركود تلقائي وعرضه
                  // setShowQRCode(true);
                }}
              >
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FabricRollsList;
