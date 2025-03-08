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
import {
  Search,
  Plus,
  Filter,
  Eye,
  Calendar,
  ArrowRightLeft,
  ArrowUp,
  ArrowDown,
  Package,
  Warehouse,
  X,
} from "lucide-react";

const StockMovements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showMovementDetails, setShowMovementDetails] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<any>(null);
  const [showNewMovementDialog, setShowNewMovementDialog] = useState(false);

  // Sample stock movements data
  const stockMovements = [
    {
      id: "MOV-001",
      date: "2023-06-15",
      type: "استلام",
      reference: "PO-2023-0125",
      sourceWarehouse: "-",
      destinationWarehouse: "مستودع المواد الخام",
      items: [
        { product: "مادة خام أ", quantity: 100, unit: "كغ" },
        { product: "مادة خام ب", quantity: 50, unit: "لتر" },
      ],
      notes: "استلام مواد خام من المورد",
      createdBy: "أحمد محمد",
    },
    {
      id: "MOV-002",
      date: "2023-06-14",
      type: "نقل",
      reference: "TRF-2023-0056",
      sourceWarehouse: "مستودع المواد الخام",
      destinationWarehouse: "المستودع الرئيسي",
      items: [{ product: "مادة خام أ", quantity: 50, unit: "كغ" }],
      notes: "نقل مواد خام للإنتاج",
      createdBy: "محمد علي",
    },
    {
      id: "MOV-003",
      date: "2023-06-13",
      type: "صرف",
      reference: "REQ-2023-0078",
      sourceWarehouse: "مستودع المنتجات النهائية",
      destinationWarehouse: "-",
      items: [{ product: "منتج نهائي ج", quantity: 75, unit: "قطعة" }],
      notes: "صرف منتجات للعميل",
      createdBy: "سمير حسن",
    },
    {
      id: "MOV-004",
      date: "2023-06-12",
      type: "استلام",
      reference: "PO-2023-0124",
      sourceWarehouse: "-",
      destinationWarehouse: "مستودع قطع الغيار",
      items: [{ product: "قطع غيار س", quantity: 30, unit: "قطعة" }],
      notes: "استلام قطع غيار من المورد",
      createdBy: "خالد عبدالله",
    },
    {
      id: "MOV-005",
      date: "2023-06-11",
      type: "تعديل",
      reference: "ADJ-2023-0034",
      sourceWarehouse: "المستودع الرئيسي",
      destinationWarehouse: "المستودع الرئيسي",
      items: [{ product: "مستهلكات د", quantity: -5, unit: "علبة" }],
      notes: "تعديل مخزون بعد الجرد",
      createdBy: "عمر فاروق",
    },
  ];

  // Filter stock movements based on search term, type, and date range
  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch = searchTerm
      ? movement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.reference.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesType =
      selectedType === "all" || movement.type === selectedType;

    const movementDate = new Date(movement.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set to end of day

    const matchesDateRange = movementDate >= start && movementDate <= end;

    return matchesSearch && matchesType && matchesDateRange;
  });

  const handleMovementClick = (movement: any) => {
    setSelectedMovement(movement);
    setShowMovementDetails(true);
  };

  const getMovementTypeIcon = (type: string) => {
    switch (type) {
      case "استلام":
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case "صرف":
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      case "نقل":
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
      case "تعديل":
        return <Package className="h-4 w-4 text-amber-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">حركة المخزون</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowNewMovementDialog(true)}>
            <Plus className="ml-2 h-4 w-4" />
            حركة جديدة
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث برقم الحركة أو المرجع..."
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
              <option value="استلام">استلام</option>
              <option value="صرف">صرف</option>
              <option value="نقل">نقل</option>
              <option value="تعديل">تعديل</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="w-[150px] pr-10"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="w-[150px] pr-10"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الحركة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>المرجع</TableHead>
              <TableHead>المستودع المصدر</TableHead>
              <TableHead>المستودع الوجهة</TableHead>
              <TableHead>المنشئ</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ArrowRightLeft className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد حركات مخزون مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredMovements.map((movement) => (
                <TableRow
                  key={movement.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleMovementClick(movement)}
                >
                  <TableCell className="font-medium">{movement.id}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getMovementTypeIcon(movement.type)}
                      <span>{movement.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{movement.reference}</TableCell>
                  <TableCell>{movement.sourceWarehouse}</TableCell>
                  <TableCell>{movement.destinationWarehouse}</TableCell>
                  <TableCell>{movement.createdBy}</TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Movement Details Dialog */}
      <Dialog open={showMovementDetails} onOpenChange={setShowMovementDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل حركة المخزون</DialogTitle>
          </DialogHeader>
          {selectedMovement && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">رقم الحركة</p>
                  <p className="font-medium">{selectedMovement.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">التاريخ</p>
                  <p className="font-medium">{selectedMovement.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">النوع</p>
                  <div className="flex items-center gap-1">
                    {getMovementTypeIcon(selectedMovement.type)}
                    <span className="font-medium">{selectedMovement.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المرجع</p>
                  <p className="font-medium">{selectedMovement.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    المستودع المصدر
                  </p>
                  <p className="font-medium">
                    {selectedMovement.sourceWarehouse}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    المستودع الوجهة
                  </p>
                  <p className="font-medium">
                    {selectedMovement.destinationWarehouse}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">الأصناف</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead>وحدة القياس</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMovement.items.map(
                        (item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.product}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.quantity < 0
                                ? `(${Math.abs(item.quantity)})`
                                : item.quantity}
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">ملاحظات</p>
                <p className="font-medium">{selectedMovement.notes}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">المنشئ</p>
                  <p className="font-medium">{selectedMovement.createdBy}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowMovementDetails(false)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Movement Dialog */}
      <Dialog
        open={showNewMovementDialog}
        onOpenChange={setShowNewMovementDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء حركة مخزون جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الحركة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر نوع الحركة</option>
                  <option value="استلام">استلام</option>
                  <option value="صرف">صرف</option>
                  <option value="نقل">نقل</option>
                  <option value="تعديل">تعديل</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المرجع</label>
                <Input placeholder="رقم المرجع" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المستودع المصدر</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر المستودع المصدر</option>
                  <option value="المستودع الرئيسي">المستودع الرئيسي</option>
                  <option value="مستودع المواد الخام">
                    مستودع المواد الخام
                  </option>
                  <option value="مستودع قطع الغيار">مستودع قطع الغيار</option>
                  <option value="مستودع المنتجات النهائية">
                    مستودع المنتجات النهائية
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المستودع الوجهة</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر المستودع الوجهة</option>
                  <option value="المستودع الرئيسي">المستودع الرئيسي</option>
                  <option value="مستودع المواد الخام">
                    مستودع المواد الخام
                  </option>
                  <option value="مستودع قطع الغيار">مستودع قطع الغيار</option>
                  <option value="مستودع المنتجات النهائية">
                    مستودع المنتجات النهائية
                  </option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">ملاحظات</label>
                <Input placeholder="ملاحظات" />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">الأصناف</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-5">
                    <label className="text-sm font-medium">المنتج</label>
                  </div>
                  <div className="col-span-3">
                    <label className="text-sm font-medium">الكمية</label>
                  </div>
                  <div className="col-span-3">
                    <label className="text-sm font-medium">وحدة القياس</label>
                  </div>
                  <div className="col-span-1"></div>
                </div>

                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                      <option value="">اختر المنتج</option>
                      <option value="مادة خام أ">مادة خام أ</option>
                      <option value="مادة خام ب">مادة خام ب</option>
                      <option value="منتج نهائي ج">منتج نهائي ج</option>
                      <option value="قطع غيار س">قطع غيار س</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <Input type="number" placeholder="الكمية" />
                  </div>
                  <div className="col-span-3">
                    <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                      <option value="">الوحدة</option>
                      <option value="كغ">كغ</option>
                      <option value="لتر">لتر</option>
                      <option value="قطعة">قطعة</option>
                      <option value="علبة">علبة</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة صنف
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewMovementDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewMovementDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StockMovements;
