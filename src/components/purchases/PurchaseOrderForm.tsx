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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Plus, Trash, Save, Search } from "lucide-react";
import { ukrainianBranches } from "@/data/branches";
import { suppliers } from "@/data/purchasesData";

interface PurchaseOrderFormProps {
  onSave: () => void;
}

interface OrderItem {
  id: string;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({ onSave }) => {
  const [orderNumber, setOrderNumber] = useState(
    `PO-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000),
    ).padStart(4, "0")}`,
  );
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [supplier, setSupplier] = useState("");
  const [branch, setBranch] = useState("كييف");
  const [warehouse, setWarehouse] = useState("المستودع الرئيسي");
  const [paymentTerms, setPaymentTerms] = useState("30 يوم");
  const [shippingTerms, setShippingTerms] = useState("تسليم المستودع");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [showProductSearch, setShowProductSearch] = useState(false);

  // Sample products for search
  const products = [
    { id: "1", name: "مادة خام أ", price: 50 },
    { id: "2", name: "مادة خام ب", price: 100 },
    { id: "3", name: "مادة خام ج", price: 40 },
    { id: "4", name: "مادة خام د", price: 50 },
    { id: "5", name: "قطع غيار س", price: 500 },
    { id: "6", name: "قطع غيار ص", price: 200 },
    { id: "7", name: "معدات إنتاج", price: 15000 },
    { id: "8", name: "أدوات صيانة", price: 4500 },
    { id: "9", name: "مواد تعبئة", price: 10 },
    { id: "10", name: "ملصقات", price: 1.7 },
  ];

  // Add product to order
  const addProduct = (product: any) => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      product: product.name,
      description: "",
      quantity: 1,
      unitPrice: product.price,
      total: product.price,
    };

    setItems([...items, newItem]);
    setShowProductSearch(false);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, quantity);
          return {
            ...item,
            quantity: newQuantity,
            total: item.unitPrice * newQuantity,
          };
        }
        return item;
      }),
    );
  };

  // Update item price
  const updatePrice = (id: string, price: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newPrice = Math.max(0, price);
          return {
            ...item,
            unitPrice: newPrice,
            total: newPrice * item.quantity,
          };
        }
        return item;
      }),
    );
  };

  // Update item description
  const updateDescription = (id: string, description: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            description,
          };
        }
        return item;
      }),
    );
  };

  // Remove item from order
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.total, 0);

  // Save order
  const saveOrder = () => {
    // Here you would typically save the order to the database
    console.log({
      orderNumber,
      orderDate,
      expectedDeliveryDate,
      supplier,
      branch,
      warehouse,
      paymentTerms,
      shippingTerms,
      notes,
      items,
      total,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الطلب</label>
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الفرع</label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {ukrainianBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الطلب</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-10"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                تاريخ التسليم المتوقع
              </label>
              <div className="relative">
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-10"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">المستودع</label>
              <Select value={warehouse} onValueChange={setWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستودع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="المستودع الرئيسي">
                    المستودع الرئيسي
                  </SelectItem>
                  <SelectItem value="مستودع المواد الخام">
                    مستودع المواد الخام
                  </SelectItem>
                  <SelectItem value="مستودع قطع الغيار">
                    مستودع قطع الغيار
                  </SelectItem>
                  <SelectItem value="مستودع المنتجات النهائية">
                    مستودع المنتجات النهائية
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">شروط الدفع</label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر شروط الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نقداً">نقداً</SelectItem>
                  <SelectItem value="15 يوم">15 يوم</SelectItem>
                  <SelectItem value="30 يوم">30 يوم</SelectItem>
                  <SelectItem value="45 يوم">45 يوم</SelectItem>
                  <SelectItem value="60 يوم">60 يوم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">شروط الشحن</label>
            <Select value={shippingTerms} onValueChange={setShippingTerms}>
              <SelectTrigger>
                <SelectValue placeholder="اختر شروط الشحن" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="تسليم المستودع">تسليم المستودع</SelectItem>
                <SelectItem value="تسليم موقع العمل">
                  تسليم موقع العمل
                </SelectItem>
                <SelectItem value="استلام من المورد">
                  استلام من المورد
                </SelectItem>
                <SelectItem value="شحن بحري">شحن بحري</SelectItem>
                <SelectItem value="شحن جوي">شحن جوي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ملاحظات</label>
            <Input
              placeholder="ملاحظات الطلب"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Supplier Details */}
        <div className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">بيانات المورد</h3>
            <div className="flex gap-2">
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="اختر المورد" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {!supplier ? (
              <div className="flex justify-center items-center h-32 text-muted-foreground">
                الرجاء اختيار المورد
              </div>
            ) : (
              <>
                {(() => {
                  const selectedSupplier = suppliers.find(
                    (s) => s.id === supplier,
                  );
                  if (!selectedSupplier) return null;

                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الاسم:</span>
                        <span className="font-medium">
                          {selectedSupplier.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          رقم الهاتف:
                        </span>
                        <span>{selectedSupplier.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          البريد الإلكتروني:
                        </span>
                        <span>{selectedSupplier.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">العنوان:</span>
                        <span>{selectedSupplier.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          الرصيد الحالي:
                        </span>
                        <span
                          className={
                            selectedSupplier.balance < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }
                        >
                          {Math.abs(selectedSupplier.balance).toLocaleString()}{" "}
                          ₴
                          {selectedSupplier.balance < 0
                            ? " (مستحق للمورد)"
                            : " (مستحق على المورد)"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          شروط الدفع:
                        </span>
                        <span>{selectedSupplier.paymentTerms} يوم</span>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">بنود الطلب</h3>
          <Button onClick={() => setShowProductSearch(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة منتج
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">#</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead className="text-center">الكمية</TableHead>
                <TableHead className="text-center">سعر الوحدة</TableHead>
                <TableHead className="text-center">الإجمالي</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <p>لا توجد منتجات في الطلب</p>
                      <Button
                        variant="link"
                        onClick={() => setShowProductSearch(true)}
                      >
                        إضافة منتج
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          updateDescription(item.id, e.target.value)
                        }
                        placeholder="وصف إضافي"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-20 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updatePrice(item.id, parseFloat(e.target.value) || 0)
                        }
                        className="w-24 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {item.total.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex justify-end">
        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>الإجمالي:</span>
            <span>{total.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          إلغاء
        </Button>
        <Button variant="outline">حفظ كمسودة</Button>
        <Button onClick={saveOrder}>
          <Save className="ml-2 h-4 w-4" />
          حفظ واعتماد
        </Button>
      </div>

      {/* Product Search Dialog */}
      <Dialog open={showProductSearch} onOpenChange={setShowProductSearch}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة منتج</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="بحث عن منتج..." className="pr-10" />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-left">السعر</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-left">
                        {product.price} ₴
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addProduct(product)}
                        >
                          <Plus className="h-4 w-4" />
                          إضافة
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrderForm;
