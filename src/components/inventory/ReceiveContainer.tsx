import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Container, ContainerItem } from "@/types/inventory";
import { Ship, Package, AlertCircle, Check, X } from "lucide-react";

interface ReceiveContainerProps {
  open: boolean;
  onClose: () => void;
  container: Container;
  onReceive: (updatedContainer: Container, stockMovement: any) => void;
  warehouses: { id: string; name: string }[];
}

const ReceiveContainer: React.FC<ReceiveContainerProps> = ({
  open,
  onClose,
  container,
  onReceive,
  warehouses,
}) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [receivedItems, setReceivedItems] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // تهيئة بيانات العناصر المستلمة
    if (container) {
      const initialItems: Record<string, any> = {};
      container.expectedItems.forEach((item) => {
        initialItems[item.id] = {
          actualQuantity: item.actualQuantity || item.expectedQuantity,
          actualWeight: item.actualWeight || 0,
          actualLength: item.actualLength || 0,
          notes: item.notes || "",
          location: "", // موقع التخزين داخل المستودع
        };
      });
      setReceivedItems(initialItems);

      // تعيين المستودع الافتراضي إذا كان متاحًا
      if (warehouses.length > 0 && !selectedWarehouse) {
        setSelectedWarehouse(warehouses[0].id);
      }
    }
  }, [container, warehouses, selectedWarehouse]);

  const handleQuantityChange = (itemId: string, field: string, value: any) => {
    setReceivedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));

    // إزالة رسالة الخطأ إذا كانت موجودة
    if (errors[`${itemId}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${itemId}-${field}`];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // التحقق من اختيار المستودع
    if (!selectedWarehouse) {
      newErrors["warehouse"] = "يرجى اختيار المستودع";
      isValid = false;
    }

    // التحقق من صحة الكميات المستلمة
    container.expectedItems.forEach((item) => {
      const receivedItem = receivedItems[item.id];
      if (!receivedItem) return;

      if (!receivedItem.actualQuantity || receivedItem.actualQuantity <= 0) {
        newErrors[`${item.id}-actualQuantity`] =
          "الكمية المستلمة يجب أن تكون أكبر من صفر";
        isValid = false;
      }

      if (receivedItem.actualWeight < 0) {
        newErrors[`${item.id}-actualWeight`] = "الوزن يجب أن يكون صفر أو أكبر";
        isValid = false;
      }

      if (receivedItem.actualLength < 0) {
        newErrors[`${item.id}-actualLength`] = "الطول يجب أن يكون صفر أو أكبر";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // تحديث بيانات الكونتينر
    const updatedContainer = {
      ...container,
      status: "received", // تحديث حالة الكونتينر إلى "مستلم"
      actualItems: container.expectedItems.map((item) => ({
        ...item,
        actualQuantity:
          receivedItems[item.id]?.actualQuantity || item.expectedQuantity,
        actualWeight: receivedItems[item.id]?.actualWeight || 0,
        actualLength: receivedItems[item.id]?.actualLength || 0,
        notes: receivedItems[item.id]?.notes || "",
      })),
      updatedAt: new Date().toISOString(),
    };

    // إنشاء حركة مخزون للاستلام
    const stockMovement = {
      id: `SM-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, "0")}`,
      date: new Date().toISOString().split("T")[0],
      type: "استلام",
      reference: `استلام كونتينر ${container.id}`,
      sourceWarehouse: "", // لا يوجد مستودع مصدر للاستلام
      destinationWarehouse:
        warehouses.find((w) => w.id === selectedWarehouse)?.name || "",
      destinationWarehouseId: selectedWarehouse,
      items: container.expectedItems.map((item) => ({
        product: item.productName,
        productId: item.productId,
        quantity:
          receivedItems[item.id]?.actualQuantity || item.expectedQuantity,
        unit: item.unit,
      })),
      notes: notes,
      createdBy: "المستخدم الحالي", // يجب استبداله بمعرف المستخدم الحالي
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // استدعاء دالة الاستلام
    onReceive(updatedContainer, stockMovement);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Ship className="h-5 w-5" />
            استلام الكونتينر {container?.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات الكونتينر */}
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">اسم الكونتينر</p>
                <p className="font-medium">{container?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المورد</p>
                <p className="font-medium">{container?.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم التتبع</p>
                <p className="font-medium">
                  {container?.trackingNumber || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الحالة</p>
                <Badge className="bg-indigo-100 text-indigo-800">
                  {container?.status === "cleared" ? "تم التخليص" : ""}
                </Badge>
              </div>
            </div>
          </div>

          {/* اختيار المستودع */}
          <div>
            <label className="block text-sm font-medium mb-1">
              المستودع المستلم
            </label>
            <Select
              value={selectedWarehouse}
              onValueChange={setSelectedWarehouse}
            >
              <SelectTrigger
                className={errors["warehouse"] ? "border-red-500" : ""}
              >
                <SelectValue placeholder="اختر المستودع" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["warehouse"] && (
              <p className="text-red-500 text-sm mt-1">{errors["warehouse"]}</p>
            )}
          </div>

          {/* جدول العناصر */}
          <div>
            <h3 className="text-lg font-medium mb-2">محتويات الكونتينر</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-center">
                      الكمية المتوقعة
                    </TableHead>
                    <TableHead className="text-center">
                      الكمية المستلمة
                    </TableHead>
                    <TableHead className="text-center">الوزن (كجم)</TableHead>
                    <TableHead className="text-center">الطول (متر)</TableHead>
                    <TableHead className="text-center">موقع التخزين</TableHead>
                    <TableHead className="text-center">ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {container?.expectedItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-center">
                        {item.expectedQuantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={receivedItems[item.id]?.actualQuantity || 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              "actualQuantity",
                              parseInt(e.target.value),
                            )
                          }
                          className={`w-20 mx-auto text-center ${errors[`${item.id}-actualQuantity`] ? "border-red-500" : ""}`}
                        />
                        {errors[`${item.id}-actualQuantity`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${item.id}-actualQuantity`]}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={receivedItems[item.id]?.actualWeight || 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              "actualWeight",
                              parseFloat(e.target.value),
                            )
                          }
                          className={`w-20 mx-auto text-center ${errors[`${item.id}-actualWeight`] ? "border-red-500" : ""}`}
                        />
                        {errors[`${item.id}-actualWeight`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${item.id}-actualWeight`]}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={receivedItems[item.id]?.actualLength || 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              "actualLength",
                              parseFloat(e.target.value),
                            )
                          }
                          className={`w-20 mx-auto text-center ${errors[`${item.id}-actualLength`] ? "border-red-500" : ""}`}
                        />
                        {errors[`${item.id}-actualLength`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${item.id}-actualLength`]}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="رقم الرف/القسم"
                          value={receivedItems[item.id]?.location || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              "location",
                              e.target.value,
                            )
                          }
                          className="text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="ملاحظات"
                          value={receivedItems[item.id]?.notes || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              "notes",
                              e.target.value,
                            )
                          }
                          className="text-sm"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ملاحظات */}
          <div>
            <label className="block text-sm font-medium mb-1">
              ملاحظات الاستلام
            </label>
            <Textarea
              placeholder="أي ملاحظات إضافية حول عملية الاستلام"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* تنبيه */}
          <div className="flex items-center p-4 text-amber-800 border border-amber-200 rounded-lg bg-amber-50">
            <AlertCircle className="h-5 w-5 ml-2 text-amber-600" />
            <div>
              <p className="text-sm">
                سيتم تحديث حالة الكونتينر إلى "مستلم" وإضافة المنتجات إلى
                المخزون في المستودع المحدد.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 ml-1" />
            إلغاء
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="h-4 w-4 ml-1" />
            تأكيد الاستلام
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveContainer;
