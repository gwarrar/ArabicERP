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
import { Calendar, Search, Plus, Trash, Save, FileText } from "lucide-react";
import { customers } from "@/data/salesData";
import { ukrainianBranches } from "@/data/branches";

interface SalesReturnProps {
  onSave?: () => void;
}

interface ReturnItem {
  id: string;
  product: string;
  quantity: number;
  price: number;
  reason: string;
  total: number;
}

const SalesReturn: React.FC<SalesReturnProps> = ({ onSave }) => {
  const [returnNumber, setReturnNumber] = useState("RET-2024-0001");
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [branch, setBranch] = useState("كييف");
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState("cash-customer");
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [showInvoiceSearch, setShowInvoiceSearch] = useState(false);

  // Sample invoice data for search
  const sampleInvoices = [
    {
      id: "INV-2024-0125",
      customer: "شركة الأفق للتجارة",
      date: "2024-07-15",
      amount: 12500,
      items: [
        { id: "1", product: "قميص قطني", quantity: 5, price: 450, total: 2250 },
        {
          id: "2",
          product: "بنطلون جينز",
          quantity: 3,
          price: 650,
          total: 1950,
        },
        {
          id: "3",
          product: "حذاء رياضي",
          quantity: 2,
          price: 850,
          total: 1700,
        },
      ],
    },
    {
      id: "INV-2024-0124",
      customer: "مؤسسة النور",
      date: "2024-07-14",
      amount: 8750,
      items: [
        { id: "4", product: "حقيبة يد", quantity: 2, price: 850, total: 1700 },
        { id: "5", product: "ساعة يد", quantity: 1, price: 1250, total: 1250 },
      ],
    },
  ];

  // Add item to return
  const addItem = (item: any) => {
    const newItem: ReturnItem = {
      id: Date.now().toString(),
      product: item.product,
      quantity: 1,
      price: item.price,
      reason: "",
      total: item.price,
    };

    setItems([...items, newItem]);
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
            total: item.price * newQuantity,
          };
        }
        return item;
      }),
    );
  };

  // Update item reason
  const updateReason = (id: string, reason: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            reason,
          };
        }
        return item;
      }),
    );
  };

  // Remove item from return
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Select invoice
  const selectInvoice = (invoice: any) => {
    setInvoiceNumber(invoice.id);
    setCustomer(
      customers.find((c) => c.name === invoice.customer)?.id || "cash-customer",
    );
    setShowInvoiceSearch(false);
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.total, 0);

  // Save return
  const saveReturn = () => {
    // Here you would typically save the return to the database
    console.log({
      returnNumber,
      returnDate,
      invoiceNumber,
      branch,
      notes,
      customer,
      items,
      total,
    });
    if (onSave) onSave();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Return Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم المرتجع</label>
              <Input
                value={returnNumber}
                onChange={(e) => setReturnNumber(e.target.value)}
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
              <label className="text-sm font-medium">تاريخ المرتجع</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pr-10"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الفاتورة</label>
              <div className="flex gap-2">
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="رقم الفاتورة الأصلية"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowInvoiceSearch(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ملاحظات</label>
            <Input
              placeholder="ملاحظات المرتجع"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
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

      {/* Return Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">بنود المرتجع</h3>
          <Button onClick={() => setShowInvoiceSearch(true)}>
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
                <TableHead>سبب الإرجاع</TableHead>
                <TableHead className="text-center">الإجمالي</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد منتجات في المرتجع</p>
                      <Button
                        variant="link"
                        onClick={() => setShowInvoiceSearch(true)}
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
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-20 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {item.price} ₴
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.reason}
                        onValueChange={(value) => updateReason(item.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر سبب الإرجاع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="defective">منتج معيب</SelectItem>
                          <SelectItem value="wrong-item">منتج خاطئ</SelectItem>
                          <SelectItem value="not-needed">
                            لم يعد مطلوباً
                          </SelectItem>
                          <SelectItem value="other">سبب آخر</SelectItem>
                        </SelectContent>
                      </Select>
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

      {/* Return Summary */}
      <div className="flex justify-end">
        <div className="w-full md:w-1/3 space-y-2">
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>إجمالي المرتجع:</span>
            <span>{total.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <FileText className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button onClick={saveReturn}>
          <Save className="ml-2 h-4 w-4" />
          حفظ
        </Button>
      </div>

      {/* Invoice Search Dialog */}
      <Dialog open={showInvoiceSearch} onOpenChange={setShowInvoiceSearch}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>بحث عن فاتورة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="بحث برقم الفاتورة أو اسم العميل"
              className="mb-4"
            />

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الفاتورة</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead className="text-left">المبلغ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => selectInvoice(invoice)}
                    >
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="text-left">
                        {invoice.amount.toLocaleString()} ₴
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Invoice Items */}
            {invoiceNumber && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">بنود الفاتورة</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">السعر</TableHead>
                        <TableHead className="text-center">الإجمالي</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleInvoices
                        .find((inv) => inv.id === invoiceNumber)
                        ?.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.product}</TableCell>
                            <TableCell className="text-center">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.price} ₴
                            </TableCell>
                            <TableCell className="text-center">
                              {item.total} ₴
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  addItem(item);
                                  setShowInvoiceSearch(false);
                                }}
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
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesReturn;
