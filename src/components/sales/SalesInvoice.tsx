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
  Percent,
} from "lucide-react";
import { customers } from "@/data/salesData";
import { products } from "@/data/products";
import { ukrainianBranches } from "@/data/branches";
import {
  customerTypes,
  calculatePrice,
  applyPromotions,
} from "@/data/pricingData";
import EnhancedProductSearch from "./EnhancedProductSearch";

interface SalesInvoiceProps {
  onSave: () => void;
  invoiceType?: "sales" | "reservation" | "quote";
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

export const SalesInvoice: React.FC<SalesInvoiceProps> = ({
  onSave,
  invoiceType: initialInvoiceType = "sales",
}) => {
  const [invoiceType, setInvoiceType] = useState(initialInvoiceType);
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
  const [customerType, setCustomerType] = useState("regular");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [reservationDays, setReservationDays] = useState(7);
  const [reservationEndDate, setReservationEndDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );

  // Add multiple products to invoice
  const addProducts = (products: any[]) => {
    const newItems = products.map((product) => {
      // Calcular el precio según el tipo de cliente
      const price = calculatePrice(product.id, customerType, 1);

      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        product,
        quantity: 1,
        price: price,
        discount: 0,
        tax: price * 0.15, // 15% tax
        total: price * 1.15, // Price + tax
      };
    });

    setItems([...items, ...newItems]);
    setShowProductSearch(false);
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, quantity);
          // Recalcular el precio según la cantidad
          const newPrice = calculatePrice(
            item.product.id,
            customerType,
            newQuantity,
          );
          const subtotal = newPrice * newQuantity - item.discount;
          const tax = subtotal * 0.15;
          return {
            ...item,
            quantity: newQuantity,
            price: newPrice,
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

  // Aplicar promociones a los items
  const applyPromotionsToItems = () => {
    if (items.length === 0) return;

    const itemsForPromotion = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { items: processedItems, totalDiscount: promoDiscount } =
      applyPromotions(itemsForPromotion, customerType);

    // Actualizar los items con los descuentos aplicados
    setItems(
      items.map((item, index) => {
        const processedItem = processedItems[index];
        const subtotal = item.price * item.quantity - processedItem.discount;
        const tax = subtotal * 0.15;

        return {
          ...item,
          discount: processedItem.discount,
          tax,
          total: subtotal + tax,
        };
      }),
    );
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
      invoiceType,
      ...((invoiceType === "reservation" || invoiceType === "quote") && {
        reservationDays,
        reservationEndDate,
      }),
    });
    onSave();
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Increased bottom padding to make room for the fixed footer */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">
          {invoiceType === "sales"
            ? "فاتورة مبيعات"
            : invoiceType === "reservation"
              ? "فاتورة حجز بضائع"
              : "عرض سعر"}
        </h2>
        <div className="w-56">
          <Select value={invoiceType} onValueChange={setInvoiceType}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="اختر نوع الفاتورة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">فاتورة مبيعات</SelectItem>
              <SelectItem value="reservation">فاتورة حجز بضائع</SelectItem>
              <SelectItem value="quote">عرض سعر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Compact Invoice Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-lg">
        {/* Left Column - Invoice Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <label className="text-xs font-medium block">رقم الفاتورة</label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs font-medium block">
                تاريخ الفاتورة
              </label>
              <div className="relative">
                <Calendar className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-8 h-8 text-sm"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <label className="text-xs font-medium block">المستودع</label>
              <Select value={warehouse} onValueChange={setWarehouse}>
                <SelectTrigger className="h-8 text-sm">
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
            <div className="w-1/2">
              <label className="text-xs font-medium block">طريقة الدفع</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="h-8 text-sm">
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
          </div>

          {paymentMethod !== "cash" && (
            <div className="flex items-center gap-2">
              <div className="w-1/2">
                <label className="text-xs font-medium block">
                  تاريخ الاستحقاق
                </label>
                <div className="relative">
                  <Calendar className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pr-8 h-8 text-sm"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-xs font-medium block">ملاحظات</label>
                <Input
                  placeholder="ملاحظات الفاتورة"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="w-full">
              <label className="text-xs font-medium block">ملاحظات</label>
              <Input
                placeholder="ملاحظات الفاتورة"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          )}
        </div>

        {/* Middle Column - Customer Details */}
        <div className="border-r border-l px-3 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">بيانات العميل</h3>
            <div className="flex gap-1">
              <div className="flex flex-col gap-1">
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger className="w-[150px] h-8 text-sm">
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
                <Select value={customerType} onValueChange={setCustomerType}>
                  <SelectTrigger className="w-[150px] h-8 text-sm">
                    <SelectValue placeholder="نوع العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    {customerTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <User className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            {customer === "cash-customer" ? (
              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">الاسم:</span>
                <span className="font-medium">عميل نقدي</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">الاسم:</span>
                  <span className="font-medium">
                    {customers.find((c) => c.id === customer)?.name ||
                      "عميل نقدي"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">
                    رقم الهاتف:
                  </span>
                  <span>
                    {customers.find((c) => c.id === customer)?.phone || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">
                    البريد الإلكتروني:
                  </span>
                  <span>
                    {customers.find((c) => c.id === customer)?.email || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-xs">
                    العنوان:
                  </span>
                  <span>
                    {customers.find((c) => c.id === customer)?.address || "-"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Reservation/Quote Details */}
        <div>
          {invoiceType === "quote" && (
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 h-full">
              <h3 className="font-medium text-blue-800 text-xs mb-2">
                معلومات عرض السعر
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium block">
                    مدة صلاحية العرض (أيام)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    className="h-7 text-xs"
                    value={reservationDays}
                    onChange={(e) => {
                      const days = parseInt(e.target.value) || 1;
                      setReservationDays(days);
                      // Update end date based on days
                      const endDate = new Date(
                        new Date(invoiceDate).getTime() +
                          days * 24 * 60 * 60 * 1000,
                      );
                      setReservationEndDate(
                        endDate.toISOString().split("T")[0],
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block">
                    تاريخ انتهاء الصلاحية
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pr-7 h-7 text-xs"
                      value={reservationEndDate}
                      onChange={(e) => {
                        setReservationEndDate(e.target.value);
                        // Calculate days based on end date
                        const startDate = new Date(invoiceDate);
                        const endDate = new Date(e.target.value);
                        const diffTime = Math.abs(
                          endDate.getTime() - startDate.getTime(),
                        );
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24),
                        );
                        setReservationDays(diffDays);
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                هذا عرض سعر فقط ولا يؤثر على المخزون. صالح لمدة{" "}
                {reservationDays} يوم من تاريخ الإصدار.
              </p>
            </div>
          )}

          {invoiceType === "reservation" && (
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 h-full">
              <h3 className="font-medium text-amber-800 text-xs mb-2">
                تفاصيل الحجز
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium block">
                    مدة الحجز (أيام)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    className="h-7 text-xs"
                    value={reservationDays}
                    onChange={(e) => {
                      const days = parseInt(e.target.value) || 1;
                      setReservationDays(days);
                      // Update end date based on days
                      const endDate = new Date(
                        new Date(invoiceDate).getTime() +
                          days * 24 * 60 * 60 * 1000,
                      );
                      setReservationEndDate(
                        endDate.toISOString().split("T")[0],
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block">
                    تاريخ انتهاء الحجز
                  </label>
                  <div className="relative">
                    <Calendar className="absolute right-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pr-7 h-7 text-xs"
                      value={reservationEndDate}
                      onChange={(e) => {
                        setReservationEndDate(e.target.value);
                        // Calculate days based on end date
                        const startDate = new Date(invoiceDate);
                        const endDate = new Date(e.target.value);
                        const diffTime = Math.abs(
                          endDate.getTime() - startDate.getTime(),
                        );
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24),
                        );
                        setReservationDays(diffDays);
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                سيتم حجز البضائع للعميل لمدة {reservationDays} يوم من تاريخ
                الفاتورة. يمكن تحويل هذا الحجز إلى فاتورة مبيعات في أي وقت خلال
                فترة الحجز.
              </p>
            </div>
          )}

          {invoiceType === "sales" && (
            <div className="h-full flex flex-col justify-center items-center p-2 bg-gray-100 rounded-lg">
              <div className="flex justify-end w-full space-y-1">
                <div className="w-full space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">
                      المجموع الفرعي:
                    </span>
                    <span className="text-sm">
                      {subtotal.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">
                      إجمالي الخصم:
                    </span>
                    <span className="text-sm">
                      {totalDiscount.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-xs">
                      إجمالي الضريبة (15%):
                    </span>
                    <span className="text-sm">
                      {totalTax.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t">
                    <span>الإجمالي:</span>
                    <span>{total.toLocaleString()} ₴</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Items */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">بنود الفاتورة</h3>
          <Button onClick={() => setShowProductSearch(true)} size="sm">
            <Plus className="ml-1 h-3.5 w-3.5" />
            إضافة منتج
          </Button>
        </div>

        <div
          className="border rounded-lg overflow-hidden"
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-[40px] text-center">#</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead className="text-center">الكمية</TableHead>
                <TableHead className="text-center">سعر الوحدة</TableHead>
                <TableHead className="text-center">الخصم</TableHead>
                <TableHead className="text-center">الضريبة</TableHead>
                <TableHead className="text-center">الإجمالي</TableHead>
                <TableHead className="w-[60px]"></TableHead>
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
                        className="w-16 text-center mx-auto"
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
                        className="w-20 text-center mx-auto"
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
                        className="w-20 text-center mx-auto"
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
                        className="h-7 w-7"
                      >
                        <Trash className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Invoice Summary - Only show for non-sales invoices since sales shows in the header */}
      {invoiceType !== "sales" && (
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                المجموع الفرعي:
              </span>
              <span>{subtotal.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                إجمالي الخصم:
              </span>
              <span>{totalDiscount.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                إجمالي الضريبة (15%):
              </span>
              <span>{totalTax.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-1 border-t">
              <span>الإجمالي:</span>
              <span>{total.toLocaleString()} ₴</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons - Fixed at the bottom with improved layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-2 border-t px-4 z-50 shadow-md">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex-shrink-0 text-sm">
            {invoiceType === "reservation" && (
              <div className="bg-amber-50 px-3 py-1.5 rounded-md border border-amber-200 inline-block">
                <span className="text-amber-800 font-medium">
                  حجز البضائع لمدة: {reservationDays} يوم
                </span>
              </div>
            )}
            {invoiceType === "quote" && (
              <div className="bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200 inline-block">
                <span className="text-blue-800 font-medium">
                  عرض سعر صالح لمدة: {reservationDays} يوم
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={applyPromotionsToItems}
            >
              <Percent className="ml-1 h-3.5 w-3.5" />
              تطبيق العروض
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="ml-1 h-3.5 w-3.5" />
              طباعة
            </Button>
            <Button onClick={saveInvoice} size="sm">
              <Save className="ml-1 h-3.5 w-3.5" />
              حفظ
            </Button>
          </div>
        </div>
      </div>
      {/* Enhanced Product Search Dialog */}
      <Dialog open={showProductSearch} onOpenChange={setShowProductSearch}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إضافة منتجات متعددة</DialogTitle>
          </DialogHeader>
          <EnhancedProductSearch
            onSelect={addProducts}
            onCancel={() => setShowProductSearch(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesInvoice;
