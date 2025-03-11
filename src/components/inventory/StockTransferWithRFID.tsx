import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import {
  Trash,
  Plus,
  Save,
  Printer,
  ArrowRightLeft,
  Warehouse,
  Package,
  Scan,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import RFIDInvoiceScanner from "@/components/shared/RFIDInvoiceScanner";

interface ScannedProduct {
  tagId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  timestamp: string;
}

interface Warehouse {
  id: string;
  name: string;
  location: string;
}

const StockTransferWithRFID = () => {
  // حالة استخدام ماسح RFID
  const [useRFID, setUseRFID] = useState(false);

  // حالة المناقلة
  const [transferItems, setTransferItems] = useState<ScannedProduct[]>([]);
  const [transferNumber, setTransferNumber] = useState(
    `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
  );
  const [transferDate, setTransferDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [sourceWarehouse, setSourceWarehouse] = useState<string>("");
  const [destinationWarehouse, setDestinationWarehouse] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // بيانات المستودعات (محاكاة)
  const warehouses: Warehouse[] = [
    {
      id: "WH-001",
      name: "المستودع الرئيسي",
      location: "الرياض - المنطقة الصناعية",
    },
    {
      id: "WH-002",
      name: "مستودع المواد الخام",
      location: "الرياض - المنطقة الصناعية",
    },
    {
      id: "WH-003",
      name: "مستودع المنتجات النهائية",
      location: "الرياض - المنطقة الصناعية",
    },
    { id: "WH-004", name: "مستودع جدة", location: "جدة - المنطقة الصناعية" },
  ];

  // دالة إضافة عنصر ممسوح إلى المناقلة
  const handleScannedItem = (item: ScannedProduct) => {
    // التحقق مما إذا كان المنتج موجوداً بالفعل
    const existingItemIndex = transferItems.findIndex(
      (invItem) => invItem.productId === item.productId,
    );

    if (existingItemIndex >= 0) {
      // زيادة الكمية إذا كان المنتج موجوداً
      const updatedItems = [...transferItems];
      updatedItems[existingItemIndex].quantity += 1;
      setTransferItems(updatedItems);
    } else {
      // إضافة منتج جديد
      setTransferItems([...transferItems, item]);
    }
  };

  // دالة إضافة منتج يدوياً
  const handleAddManualItem = () => {
    const newItem: ScannedProduct = {
      tagId: `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: "منتج جديد",
      price: 0, // السعر غير مهم في المناقلات
      quantity: 1,
      unit: "قطعة",
      timestamp: new Date().toISOString(),
    };
    setTransferItems([...transferItems, newItem]);
  };

  // دالة حذف عنصر من المناقلة
  const removeItem = (index: number) => {
    const updatedItems = [...transferItems];
    updatedItems.splice(index, 1);
    setTransferItems(updatedItems);
  };

  // دالة تعديل كمية منتج
  const updateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    const updatedItems = [...transferItems];
    updatedItems[index].quantity = newQuantity;
    setTransferItems(updatedItems);
  };

  // حفظ المناقلة
  const saveTransfer = () => {
    // التحقق من اختيار المستودعات
    if (!sourceWarehouse || !destinationWarehouse) {
      alert("يرجى اختيار المستودع المصدر والوجهة");
      return;
    }

    // التحقق من وجود عناصر
    if (transferItems.length === 0) {
      alert("يرجى إضافة عناصر للمناقلة");
      return;
    }

    // هنا يمكن إضافة كود لحفظ المناقلة في قاعدة البيانات
    alert("تم حفظ المناقلة بنجاح");
  };

  // طباعة المناقلة
  const printTransfer = () => {
    // هنا يمكن إضافة كود لطباعة المناقلة
    alert("جاري طباعة المناقلة");
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">مناقلة مخزون جديدة</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="rfid-mode"
              checked={useRFID}
              onCheckedChange={setUseRFID}
            />
            <Label htmlFor="rfid-mode">استخدام ماسح RFID</Label>
          </div>
        </div>
      </div>

      {/* معلومات المناقلة */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات المناقلة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="transfer-number">رقم المناقلة</Label>
              <Input
                id="transfer-number"
                value={transferNumber}
                onChange={(e) => setTransferNumber(e.target.value)}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-date">تاريخ المناقلة</Label>
              <Input
                id="transfer-date"
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="source-warehouse">المستودع المصدر</Label>
              <Select
                value={sourceWarehouse}
                onValueChange={setSourceWarehouse}
              >
                <SelectTrigger id="source-warehouse">
                  <SelectValue placeholder="اختر المستودع المصدر" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sourceWarehouse && (
                <div className="text-sm text-muted-foreground mt-1">
                  {warehouses.find((w) => w.id === sourceWarehouse)?.location}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination-warehouse">المستودع الوجهة</Label>
              <Select
                value={destinationWarehouse}
                onValueChange={setDestinationWarehouse}
              >
                <SelectTrigger id="destination-warehouse">
                  <SelectValue placeholder="اختر المستودع الوجهة" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses
                    .filter((w) => w.id !== sourceWarehouse)
                    .map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {destinationWarehouse && (
                <div className="text-sm text-muted-foreground mt-1">
                  {
                    warehouses.find((w) => w.id === destinationWarehouse)
                      ?.location
                  }
                </div>
              )}
            </div>
          </div>

          {sourceWarehouse &&
            destinationWarehouse &&
            sourceWarehouse === destinationWarehouse && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>تنبيه</AlertTitle>
                <AlertDescription>
                  لا يمكن إجراء مناقلة بين نفس المستودع. يرجى اختيار مستودعات
                  مختلفة للمصدر والوجهة.
                </AlertDescription>
              </Alert>
            )}
        </CardContent>
      </Card>

      {/* ماسح RFID */}
      {useRFID && <RFIDInvoiceScanner onItemScanned={handleScannedItem} />}

      {/* عناصر المناقلة */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>عناصر المناقلة</CardTitle>
            <Button size="sm" onClick={handleAddManualItem}>
              <Plus className="ml-1 h-4 w-4" />
              إضافة منتج
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead>رقم التاج</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transferItems.length > 0 ? (
                  transferItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.productName}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.productId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateItemQuantity(index, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(
                                index,
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-16 h-8 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateItemQuantity(index, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.tagId}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      {useRFID ? (
                        <div className="flex flex-col items-center">
                          <Scan className="h-6 w-6 mb-2" />
                          <p>
                            قم بتشغيل الماسح لإضافة منتجات أو أضف منتجات يدوياً
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Package className="h-6 w-6 mb-2" />
                          <p>لم يتم إضافة أي منتجات بعد</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* ملخص المناقلة */}
          {transferItems.length > 0 && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Package className="h-4 w-4 ml-2 text-gray-500" />
                  <span>إجمالي العناصر:</span>
                </div>
                <Badge variant="outline">{transferItems.length} منتج</Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <ArrowRightLeft className="h-4 w-4 ml-2 text-gray-500" />
                  <span>إجمالي الكميات:</span>
                </div>
                <Badge variant="outline">
                  {transferItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  قطعة
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ملاحظات وأزرار الإجراءات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ملاحظات</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-24 p-2 border rounded-md"
              placeholder="أدخل أي ملاحظات إضافية هنا..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إجراءات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button
                className="w-full"
                onClick={saveTransfer}
                disabled={
                  !sourceWarehouse ||
                  !destinationWarehouse ||
                  sourceWarehouse === destinationWarehouse ||
                  transferItems.length === 0
                }
              >
                <Save className="ml-2 h-4 w-4" />
                حفظ المناقلة
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={printTransfer}
                  disabled={transferItems.length === 0}
                >
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button variant="outline" disabled={transferItems.length === 0}>
                  <ArrowRightLeft className="ml-2 h-4 w-4" />
                  معاينة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockTransferWithRFID;
