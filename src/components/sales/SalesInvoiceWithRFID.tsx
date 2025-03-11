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
  Search,
  Save,
  Printer,
  Download,
  ShoppingCart,
  User,
  Calendar,
  DollarSign,
  Percent,
  Tag,
  Scan,
} from "lucide-react";
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

interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

const SalesInvoiceWithRFID = () => {
  // حالة استخدام ماسح RFID
  const [useRFID, setUseRFID] = useState(false);

  // حالة الفاتورة
  const [invoiceItems, setInvoiceItems] = useState<ScannedProduct[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Math.floor(100000 + Math.random() * 900000)}`,
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(15); // ضريبة القيمة المضافة
  const [notes, setNotes] = useState<string>("");

  // بيانات العملاء (محاكاة)
  const customers: Customer[] = [
    {
      id: "CUST-001",
      name: "شركة الأفق للتجارة",
      phone: "0512345678",
      email: "info@horizon.com",
      address: "الرياض، المملكة العربية السعودية",
    },
    {
      id: "CUST-002",
      name: "مؤسسة النور للأقمشة",
      phone: "0523456789",
      email: "contact@noor.com",
      address: "جدة، المملكة العربية السعودية",
    },
    {
      id: "CUST-003",
      name: "شركة الخليج للملابس",
      phone: "0534567890",
      email: "info@gulf-clothes.com",
      address: "الدمام، المملكة العربية السعودية",
    },
  ];

  // دالة إضافة عنصر ممسوح إلى الفاتورة
  const handleScannedItem = (item: ScannedProduct) => {
    // التحقق مما إذا كان المنتج موجوداً بالفعل
    const existingItemIndex = invoiceItems.findIndex(
      (invItem) => invItem.productId === item.productId,
    );

    if (existingItemIndex >= 0) {
      // زيادة الكمية إذا كان المنتج موجوداً
      const updatedItems = [...invoiceItems];
      updatedItems[existingItemIndex].quantity += 1;
      setInvoiceItems(updatedItems);
    } else {
      // إضافة منتج جديد
      setInvoiceItems([...invoiceItems, item]);
    }
  };

  // دالة إضافة منتج يدوياً
  const handleAddManualItem = () => {
    const newItem: ScannedProduct = {
      tagId: `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: `PROD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: "منتج جديد",
      price: 100,
      quantity: 1,
      unit: "قطعة",
      timestamp: new Date().toISOString(),
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  // دالة حذف عنصر من الفاتورة
  const removeItem = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  // دالة تعديل كمية منتج
  const updateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = newQuantity;
    setInvoiceItems(updatedItems);
  };

  // دالة تعديل سعر منتج
  const updateItemPrice = (index: number, newPrice: number) => {
    if (newPrice < 0) return;
    const updatedItems = [...invoiceItems];
    updatedItems[index].price = newPrice;
    setInvoiceItems(updatedItems);
  };

  // حساب المجموع
  const calculateSubtotal = () => {
    return invoiceItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  };

  // حساب الخصم
  const calculateDiscount = () => {
    return (calculateSubtotal() * discount) / 100;
  };

  // حساب الضريبة
  const calculateTax = () => {
    return ((calculateSubtotal() - calculateDiscount()) * tax) / 100;
  };

  // حساب الإجمالي
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  // حفظ الفاتورة
  const saveInvoice = () => {
    // هنا يمكن إضافة كود لحفظ الفاتورة في قاعدة البيانات
    alert("تم حفظ الفاتورة بنجاح");
  };

  // طباعة الفاتورة
  const printInvoice = () => {
    // هنا يمكن إضافة كود لطباعة الفاتورة
    alert("جاري طباعة الفاتورة");
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">فاتورة مبيعات جديدة</h2>
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

      {/* معلومات الفاتورة */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات الفاتورة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">رقم الفاتورة</Label>
              <Input
                id="invoice-number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-date">تاريخ الفاتورة</Label>
              <Input
                id="invoice-date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">العميل</Label>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCustomer && (
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 ml-2 text-gray-500" />
                  <span className="text-sm">
                    {customers.find((c) => c.id === selectedCustomer)?.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 ml-2 text-gray-500" />
                  <span className="text-sm">
                    {customers.find((c) => c.id === selectedCustomer)?.phone ||
                      "-"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 ml-2 text-gray-500" />
                  <span className="text-sm">
                    {customers.find((c) => c.id === selectedCustomer)?.email ||
                      "-"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ماسح RFID */}
      {useRFID && <RFIDInvoiceScanner onItemScanned={handleScannedItem} />}

      {/* عناصر الفاتورة */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>عناصر الفاتورة</CardTitle>
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
                  <TableHead>السعر</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.length > 0 ? (
                  invoiceItems.map((item, index) => (
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
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItemPrice(
                              index,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-24 h-8"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {(item.price * item.quantity).toFixed(2)}
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
                      colSpan={6}
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
                          <ShoppingCart className="h-6 w-6 mb-2" />
                          <p>لم يتم إضافة أي منتجات بعد</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* ملخص الفاتورة */}
          {invoiceItems.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <div className="flex flex-col space-y-2 md:w-72 mr-auto">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>الخصم (%):</span>
                    <Input
                      type="number"
                      value={discount}
                      onChange={(e) =>
                        setDiscount(parseFloat(e.target.value) || 0)
                      }
                      className="w-16 h-8 mr-2"
                    />
                  </div>
                  <span>{calculateDiscount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>الضريبة (%):</span>
                    <Input
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                      className="w-16 h-8 mr-2"
                    />
                  </div>
                  <span>{calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>الإجمالي:</span>
                  <span>{calculateTotal().toFixed(2)}</span>
                </div>
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
              <Button className="w-full" onClick={saveInvoice}>
                <Save className="ml-2 h-4 w-4" />
                حفظ الفاتورة
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={printInvoice}>
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button variant="outline">
                  <Download className="ml-2 h-4 w-4" />
                  تصدير PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesInvoiceWithRFID;

// استيراد أيقونات إضافية
function Phone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Mail(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
