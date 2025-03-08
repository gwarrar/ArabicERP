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
import {
  Calendar,
  User,
  Plus,
  Trash,
  Save,
  Printer,
  Search,
  FileText,
} from "lucide-react";
import { customers } from "@/data/salesData";
import { products } from "@/data/products";
import { ukrainianBranches } from "@/data/branches";
import { ProductSearch } from "./ProductSearch";

interface SalesInvoiceProps {
  onSave: () => void;
}

interface InvoiceItem {
  id: string;
  product: any;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
  total: number;
}

export const SalesInvoice: React.FC<SalesInvoiceProps> = ({ onSave }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2024-0001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [warehouse, setWarehouse] = useState("main-warehouse");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState("cash-customer");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [showProductSearch, setShowProductSearch] = useState(false);

  // Add product to invoice
  const addProduct = (product: any) => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      product,
      quantity: 1,
      price: product.price,
      discount: 0,
      tax: product.price * 0.15, // 15% tax
      total: product.price * 1.15, // Price + tax
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
          const subtotal = item.price * newQuantity - item.discount;
          const tax = subtotal * 0.15;
          return {
            ...item,
            quantity: newQuantity,
            tax,
            total: subtotal + tax,
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
          const subtotal = newPrice * item.quantity - item.discount;
          const tax = subtotal * 0.15;
          return {
            ...item,
            price: newPrice,
            tax,
            total: subtotal + tax,
          };
        }
        return item;
      }),
    );
  };

  // Update item discount
  const updateDiscount = (id: string, discount: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newDiscount = Math.min(
            item.price * item.quantity,
            Math.max(0, discount),
          );
          const subtotal = item.price * item.quantity - newDiscount;
          const tax = subtotal * 0.15;
          return {
            ...item,
            discount: newDiscount,
            tax,
            total: subtotal + tax,
          };
        }
        return item;
      }),
    );
  };

  // Remove item from invoice
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
  const total = subtotal - totalDiscount + totalTax;

  // Save invoice
  const saveInvoice = () => {
    // Here you would typically save the invoice to the database
    console.log({
      invoiceNumber,
      invoiceDate,
      dueDate,
      warehouse,
      paymentMethod,
      notes,
      customer,
      items,
      subtotal,
      totalDiscount,
      totalTax,
      total,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الفاتورة</label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المستودع</label>
              <Select value={warehouse} onValueChange={setWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستودع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-warehouse">
                    المستودع الرئيسي - أوديسا
                  </SelectItem>
                  {ukrainianBranches.slice(1).map((branch) => (
                    <SelectItem
                      key={branch.id}
                      value={`warehouse-${branch.id}`}
                    >
                      مستودع {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الفاتورة</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-10"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ الاستحقاق</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-10"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">طريقة الدفع</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="credit">آجل</SelectItem>
                  <SelectItem value="card">بطاقة ائتمان</SelectItem>
                  <SelectItem value="bank">تحويل بنكي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ملاحظات</label>
              <Input
                placeholder="ملاحظات الفاتورة"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">بيانات العميل</h3>
            <div className="flex gap-2">
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash-customer">عميل نقدي</SelectItem>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {customer === "cash-customer" ? (
              <div className="flex justify-between">
                <span className="text-muted-foreground">الاسم:</span>
                <span className="font-medium">عميل نقدي</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الاسم:</span>
                  <span className="font-medium">
                    {customers.find((c) => c.id === customer)?.name ||
                      "عميل نقدي"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span>
                    {customers.find((c) => c.id === customer)?.phone || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    البريد الإلكتروني:
                  </span>
                  <span>
                    {customers.find((c) => c.id === customer)?.email || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العنوان:</span>
                  <span>
                    {customers.find((c) => c.id === customer)?.address || "-"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">بنود الفاتورة</h3>
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
                <TableHead className="text-center">الكمية</TableHead>
                <TableHead className="text-center">سعر الوحدة</TableHead>
                <TableHead className="text-center">الخصم</TableHead>
                <TableHead className="text-center">الضريبة</TableHead>
                <TableHead className="text-center">الإجمالي</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد منتجات في الفاتورة</p>
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
                    <TableCell>{item.product.name}</TableCell>
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
                        value={item.price}
                        onChange={(e) =>
                          updatePrice(item.id, parseFloat(e.target.value) || 0)
                        }
                        className="w-24 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.discount}
                        onChange={(e) =>
                          updateDiscount(
                            item.id,
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-24 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {item.tax.toLocaleString()} ₴
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

      {/* Invoice Summary */}
      <div className="flex justify-end">
        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">المجموع الفرعي:</span>
            <span>{subtotal.toLocaleString()} ₴</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">إجمالي الخصم:</span>
            <span>{totalDiscount.toLocaleString()} ₴</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">إجمالي الضريبة (15%):</span>
            <span>{totalTax.toLocaleString()} ₴</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>الإجمالي:</span>
            <span>{total.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Printer className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button onClick={saveInvoice}>
          <Save className="ml-2 h-4 w-4" />
          حفظ
        </Button>
      </div>

      {/* Product Search Dialog */}
      <Dialog open={showProductSearch} onOpenChange={setShowProductSearch}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة منتج</DialogTitle>
          </DialogHeader>
          <ProductSearch onSelect={addProduct} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesInvoice;
