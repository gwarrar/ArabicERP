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
  Edit,
  Trash,
  MapPin,
  Package,
  Warehouse,
} from "lucide-react";

const WarehousesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWarehouseDetails, setShowWarehouseDetails] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [showNewWarehouseDialog, setShowNewWarehouseDialog] = useState(false);

  // Sample warehouses data
  const warehouses = [
    {
      id: "WH-001",
      name: "المستودع الرئيسي",
      location: "كييف، شارع الصناعة 45",
      manager: "أحمد محمد",
      itemCount: 500,
      capacity: 1000,
      status: "active",
      description: "المستودع الرئيسي للشركة",
    },
    {
      id: "WH-002",
      name: "مستودع المواد الخام",
      location: "كييف، شارع التجارة 23",
      manager: "محمد علي",
      itemCount: 350,
      capacity: 500,
      status: "active",
      description: "مستودع خاص بالمواد الخام",
    },
    {
      id: "WH-003",
      name: "مستودع المنتجات النهائية",
      location: "خاركيف، شارع المعدات 12",
      manager: "سمير حسن",
      itemCount: 250,
      capacity: 400,
      status: "active",
      description: "مستودع خاص بالمنتجات النهائية",
    },
    {
      id: "WH-004",
      name: "مستودع قطع الغيار",
      location: "دنيبرو، شارع السلام 34",
      manager: "خالد عبدالله",
      itemCount: 150,
      capacity: 300,
      status: "active",
      description: "مستودع خاص بقطع الغيار",
    },
    {
      id: "WH-005",
      name: "مستودع الفرع الشرقي",
      location: "أوديسا، شارع البركة 56",
      manager: "عمر فاروق",
      itemCount: 100,
      capacity: 200,
      status: "inactive",
      description: "مستودع فرعي في المنطقة الشرقية",
    },
  ];

  // Filter warehouses based on search term
  const filteredWarehouses = warehouses.filter((warehouse) => {
    return searchTerm
      ? warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          warehouse.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  const handleWarehouseClick = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setShowWarehouseDetails(true);
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">المستودعات</h2>
        <Button onClick={() => setShowNewWarehouseDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          مستودع جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث باسم المستودع، الموقع، أو المدير..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رمز المستودع</TableHead>
              <TableHead>اسم المستودع</TableHead>
              <TableHead>الموقع</TableHead>
              <TableHead>المدير المسؤول</TableHead>
              <TableHead className="text-center">عدد الأصناف</TableHead>
              <TableHead className="text-center">السعة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWarehouses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Warehouse className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد مستودعات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredWarehouses.map((warehouse) => (
                <TableRow
                  key={warehouse.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleWarehouseClick(warehouse)}
                >
                  <TableCell className="font-medium">{warehouse.id}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>{warehouse.manager}</TableCell>
                  <TableCell className="text-center">
                    {warehouse.itemCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {warehouse.capacity}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${warehouse.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {warehouse.status === "active" ? "نشط" : "غير نشط"}
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Warehouse Details Dialog */}
      <Dialog
        open={showWarehouseDetails}
        onOpenChange={setShowWarehouseDetails}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل المستودع</DialogTitle>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">رمز المستودع</p>
                  <p className="font-medium">{selectedWarehouse.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">اسم المستودع</p>
                  <p className="font-medium">{selectedWarehouse.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الموقع</p>
                  <p className="font-medium">{selectedWarehouse.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    المدير المسؤول
                  </p>
                  <p className="font-medium">{selectedWarehouse.manager}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">عدد الأصناف</p>
                  <p className="font-medium">{selectedWarehouse.itemCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">السعة</p>
                  <p className="font-medium">{selectedWarehouse.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <span
                    className={`px-2 py-1 text-xs ${selectedWarehouse.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                  >
                    {selectedWarehouse.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نسبة الإشغال</p>
                  <p className="font-medium">
                    {Math.round(
                      (selectedWarehouse.itemCount /
                        selectedWarehouse.capacity) *
                        100,
                    )}
                    %
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">الوصف</p>
                <p className="font-medium">{selectedWarehouse.description}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowWarehouseDetails(false)}
                >
                  إغلاق
                </Button>
                <Button variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Warehouse Dialog */}
      <Dialog
        open={showNewWarehouseDialog}
        onOpenChange={setShowNewWarehouseDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مستودع جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المستودع</label>
                <Input placeholder="اسم المستودع" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الموقع</label>
                <Input placeholder="موقع المستودع" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المدير المسؤول</label>
                <Input placeholder="اسم المدير المسؤول" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">السعة</label>
                <Input type="number" placeholder="سعة المستودع" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Input placeholder="وصف المستودع" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewWarehouseDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewWarehouseDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WarehousesList;
