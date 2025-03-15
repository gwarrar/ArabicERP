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
import WarehouseDetails from "./WarehouseDetails";

const WarehousesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWarehouseDetails, setShowWarehouseDetails] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [showNewWarehouseDialog, setShowNewWarehouseDialog] = useState(false);

  // بيانات تجريبية للمستودعات
  const warehouses = [
    {
      id: "WH-001",
      name: "المستودع الرئيسي",
      code: "MAIN-01",
      type: "رئيسي",
      address: "شارع الصناعة، المنطقة الصناعية",
      city: "الرياض",
      region: "المنطقة الوسطى",
      postalCode: "12345",
      coordinates: "24.7136, 46.6753",
      manager: "أحمد محمد",
      phone: "+966 55 123 4567",
      email: "main.warehouse@example.com",
      employeesCount: 15,
      workingHours: "8:00 - 17:00",
      area: 5000,
      status: "نشط",
      itemsCount: 1250,
      value: 2500000,
    },
    {
      id: "WH-002",
      name: "مستودع المواد الخام",
      code: "RAW-01",
      type: "مواد خام",
      address: "شارع الصناعة، المنطقة الصناعية",
      city: "الرياض",
      region: "المنطقة الوسطى",
      postalCode: "12345",
      coordinates: "24.7136, 46.6753",
      manager: "خالد العبدالله",
      phone: "+966 55 987 6543",
      email: "raw.warehouse@example.com",
      employeesCount: 8,
      workingHours: "8:00 - 17:00",
      area: 3000,
      status: "نشط",
      itemsCount: 450,
      value: 1800000,
    },
    {
      id: "WH-003",
      name: "مستودع المنتجات الجاهزة",
      code: "FIN-01",
      type: "منتجات جاهزة",
      address: "شارع الصناعة، المنطقة الصناعية",
      city: "الرياض",
      region: "المنطقة الوسطى",
      postalCode: "12345",
      coordinates: "24.7136, 46.6753",
      manager: "سارة الأحمد",
      phone: "+966 55 456 7890",
      email: "finished.warehouse@example.com",
      employeesCount: 10,
      workingHours: "8:00 - 17:00",
      area: 4000,
      status: "نشط",
      itemsCount: 800,
      value: 3500000,
    },
    {
      id: "WH-004",
      name: "المستودع الفرعي - جدة",
      code: "BR-JED-01",
      type: "فرعي",
      address: "شارع التحلية، حي الروضة",
      city: "جدة",
      region: "المنطقة الغربية",
      postalCode: "23456",
      coordinates: "21.5433, 39.1728",
      manager: "محمد العلي",
      phone: "+966 55 789 0123",
      email: "jeddah.warehouse@example.com",
      employeesCount: 6,
      workingHours: "8:00 - 17:00",
      area: 2000,
      status: "نشط",
      itemsCount: 350,
      value: 1200000,
    },
    {
      id: "WH-005",
      name: "مستودع قطع الغيار",
      code: "SP-01",
      type: "قطع غيار",
      address: "شارع الصناعة، المنطقة الصناعية",
      city: "الرياض",
      region: "المنطقة الوسطى",
      postalCode: "12345",
      coordinates: "24.7136, 46.6753",
      manager: "فهد السالم",
      phone: "+966 55 321 7654",
      email: "spareparts.warehouse@example.com",
      employeesCount: 4,
      workingHours: "8:00 - 17:00",
      area: 1000,
      status: "غير نشط",
      itemsCount: 200,
      value: 500000,
    },
  ];

  // تصفية المستودعات حسب البحث
  const filteredWarehouses = warehouses.filter((warehouse) => {
    if (searchTerm === "") return true;

    return (
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // عرض تفاصيل المستودع
  const handleViewWarehouse = (warehouse: any) => {
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
                  onClick={() => handleViewWarehouse(warehouse)}
                >
                  <TableCell className="font-medium">{warehouse.id}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.city}</TableCell>
                  <TableCell>{warehouse.manager}</TableCell>
                  <TableCell className="text-center">
                    {warehouse.itemsCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {warehouse.area}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${warehouse.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {warehouse.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewWarehouse(warehouse);
                        }}
                      >
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
      {selectedWarehouse && (
        <WarehouseDetails
          open={showWarehouseDetails}
          onClose={() => setShowWarehouseDetails(false)}
          warehouse={selectedWarehouse}
        />
      )}

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
