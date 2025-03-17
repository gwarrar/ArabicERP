import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Package,
  ShoppingCart,
  Truck,
  Calendar,
  User,
  DollarSign,
  Percent,
  Save,
  Printer,
  Send,
  Plus,
  Trash,
  Edit,
  Filter,
  ArrowRight,
  Box,
  Layers,
} from "lucide-react";

// Sample data for containers
const containers = [
  {
    id: "CNT-001",
    name: "حاوية أقمشة قطنية",
    arrivalDate: "2024-07-15",
    status: "وصلت",
    location: "المستودع الرئيسي",
    items: [
      {
        id: "ITEM-001",
        name: "قماش قطني أبيض",
        quantity: 1200,
        unit: "متر",
        price: 15,
        totalPrice: 18000,
      },
      {
        id: "ITEM-002",
        name: "قماش قطني أسود",
        quantity: 800,
        unit: "متر",
        price: 16,
        totalPrice: 12800,
      },
      {
        id: "ITEM-003",
        name: "قماش قطني ملون",
        quantity: 500,
        unit: "متر",
        price: 18,
        totalPrice: 9000,
      },
    ],
  },
  {
    id: "CNT-002",
    name: "حاوية أزرار وإكسسوارات",
    arrivalDate: "2024-07-10",
    status: "قيد التفريغ",
    location: "منطقة الاستلام",
    items: [
      {
        id: "ITEM-004",
        name: "أزرار بلاستيكية",
        quantity: 5000,
        unit: "قطعة",
        price: 0.5,
        totalPrice: 2500,
      },
      {
        id: "ITEM-005",
        name: "سحابات معدنية",
        quantity: 2000,
        unit: "قطعة",
        price: 1.2,
        totalPrice: 2400,
      },
    ],
  },
  {
    id: "CNT-003",
    name: "حاوية خيوط",
    arrivalDate: "2024-07-05",
    status: "مستلمة",
    location: "المستودع الرئيسي",
    items: [
      {
        id: "ITEM-006",
        name: "خيط بوليستر أبيض",
        quantity: 300,
        unit: "بكرة",
        price: 25,
        totalPrice: 7500,
      },
      {
        id: "ITEM-007",
        name: "خيط قطني ملون",
        quantity: 200,
        unit: "بكرة",
        price: 30,
        totalPrice: 6000,
      },
    ],
  },
];

// Sample data for customers
const customers = [
  {
    id: "CUST-001",
    name: "شركة الأزياء العصرية",
    contact: "محمد أحمد",
    phone: "0501234567",
    email: "info@modernfashion.com",
    address: "شارع الصناعة، المنطقة الصناعية",
  },
  {
    id: "CUST-002",
    name: "مصنع النسيج الحديث",
    contact: "سارة خالد",
    phone: "0559876543",
    email: "info@moderntextile.com",
    address: "شارع المصانع، المدينة الصناعية",
  },
  {
    id: "CUST-003",
    name: "شركة الملابس الجاهزة",
    contact: "أحمد محمود",
    phone: "0561234567",
    email: "info@readyclothes.com",
    address: "شارع التجارة، وسط المدينة",
  },
];

const ContainerReservationInvoice = () => {
  const [selectedContainer, setSelectedContainer] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showContainerDialog, setShowContainerDialog] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [reservationDetails, setReservationDetails] = useState({
    reservationDate: new Date().toISOString().split("T")[0],
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
    discount: 0,
    tax: 15,
    paymentTerms: "دفع مقدم 50%",
  });

  // Calculate totals
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const discountAmount = (subtotal * reservationDetails.discount) / 100;
  const taxAmount =
    ((subtotal - discountAmount) * reservationDetails.tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Handle container selection
  const handleContainerSelect = (container: any) => {
    setSelectedContainer(container);
    setShowContainerDialog(false);
  };

  // Handle customer selection
  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerDialog(false);
  };

  // Handle item selection
  const handleItemSelect = (item: any) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Handle item quantity change
  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  // Handle item removal
  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  // Handle reservation details change
  const handleDetailsChange = (field: string, value: any) => {
    setReservationDetails({ ...reservationDetails, [field]: value });
  };

  // Handle save reservation
  const handleSaveReservation = () => {
    const reservationData = {
      customer: selectedCustomer,
      container: selectedContainer,
      items: selectedItems,
      details: reservationDetails,
      subtotal,
      discountAmount,
      taxAmount,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("Reservation data:", reservationData);
    // Here you would save the reservation to your database
    alert("تم حفظ الحجز بنجاح");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إنشاء فاتورة حجز من حاوية</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="ml-2 h-4 w-4" />
            طباعة
          </Button>
          <Button variant="outline">
            <Send className="ml-2 h-4 w-4" />
            إرسال
          </Button>
          <Button onClick={handleSaveReservation}>
            <Save className="ml-2 h-4 w-4" />
            حفظ
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>معلومات العميل</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomerDialog(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">اسم العميل:</span>
                  <span className="font-medium">{selectedCustomer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">جهة الاتصال:</span>
                  <span>{selectedCustomer.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    البريد الإلكتروني:
                  </span>
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العنوان:</span>
                  <span>{selectedCustomer.address}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">لم يتم اختيار عميل</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowCustomerDialog(true)}
                >
                  اختيار عميل
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Container Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>معلومات الحاوية</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContainerDialog(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContainer ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الحاوية:</span>
                  <span className="font-medium">{selectedContainer.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">اسم الحاوية:</span>
                  <span>{selectedContainer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاريخ الوصول:</span>
                  <span>{selectedContainer.arrivalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحالة:</span>
                  <Badge
                    variant="outline"
                    className={`${selectedContainer.status === "وصلت" ? "bg-green-100 text-green-800" : selectedContainer.status === "قيد التفريغ" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {selectedContainer.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الموقع:</span>
                  <span>{selectedContainer.location}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Box className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">لم يتم اختيار حاوية</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowContainerDialog(true)}
                >
                  اختيار حاوية
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reservation Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">تفاصيل الحجز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ الحجز</Label>
                  <Input
                    type="date"
                    value={reservationDetails.reservationDate}
                    onChange={(e) =>
                      handleDetailsChange("reservationDate", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ التسليم</Label>
                  <Input
                    type="date"
                    value={reservationDetails.deliveryDate}
                    onChange={(e) =>
                      handleDetailsChange("deliveryDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>شروط الدفع</Label>
                <Select
                  value={reservationDetails.paymentTerms}
                  onValueChange={(value) =>
                    handleDetailsChange("paymentTerms", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر شروط الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دفع كامل">دفع كامل</SelectItem>
                    <SelectItem value="دفع مقدم 50%">دفع مقدم 50%</SelectItem>
                    <SelectItem value="دفع عند التسليم">
                      دفع عند التسليم
                    </SelectItem>
                    <SelectItem value="دفع آجل 30 يوم">
                      دفع آجل 30 يوم
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ملاحظات</Label>
                <Textarea
                  placeholder="أدخل أي ملاحظات إضافية"
                  value={reservationDetails.notes}
                  onChange={(e) => handleDetailsChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Items */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>العناصر المحجوزة</span>
            {selectedContainer && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowContainerDialog(true)}
              >
                <Layers className="ml-2 h-4 w-4" />
                عرض محتويات الحاوية
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الرمز</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الوحدة</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead className="w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value),
                          )
                        }
                        className="w-20"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>{item.price.toLocaleString()} ₴</TableCell>
                    <TableCell>
                      {(item.price * item.quantity).toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لم يتم اختيار أي عناصر</p>
              {selectedContainer ? (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowContainerDialog(true)}
                >
                  اختيار عناصر من الحاوية
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowContainerDialog(true)}
                >
                  اختيار حاوية أولاً
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div></div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ملخص الفاتورة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي:</span>
                <span>{subtotal.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-muted-foreground ml-2">الخصم:</span>
                  <Input
                    type="number"
                    value={reservationDetails.discount}
                    onChange={(e) =>
                      handleDetailsChange(
                        "discount",
                        parseFloat(e.target.value),
                      )
                    }
                    className="w-16 h-8"
                    min="0"
                    max="100"
                  />
                  <span className="mr-1">%</span>
                </div>
                <span>{discountAmount.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-muted-foreground ml-2">الضريبة:</span>
                  <Input
                    type="number"
                    value={reservationDetails.tax}
                    onChange={(e) =>
                      handleDetailsChange("tax", parseFloat(e.target.value))
                    }
                    className="w-16 h-8"
                    min="0"
                    max="100"
                  />
                  <span className="mr-1">%</span>
                </div>
                <span>{taxAmount.toLocaleString()} ₴</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>الإجمالي:</span>
                  <span>{total.toLocaleString()} ₴</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Container Selection Dialog */}
      <Dialog open={showContainerDialog} onOpenChange={setShowContainerDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>اختيار حاوية</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن حاوية..." className="pr-9" />
              </div>
              <Button variant="outline" className="mr-2">
                <Filter className="ml-2 h-4 w-4" />
                تصفية
              </Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم الحاوية</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>تاريخ الوصول</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>عدد العناصر</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {containers.map((container) => (
                    <TableRow key={container.id}>
                      <TableCell className="font-medium">
                        {container.id}
                      </TableCell>
                      <TableCell>{container.name}</TableCell>
                      <TableCell>{container.arrivalDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${container.status === "وصلت" ? "bg-green-100 text-green-800" : container.status === "قيد التفريغ" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {container.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{container.location}</TableCell>
                      <TableCell>{container.items.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleContainerSelect(container)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {selectedContainer && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">
                  محتويات الحاوية: {selectedContainer.name}
                </h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الرمز</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>الوحدة</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الإجمالي</TableHead>
                        <TableHead className="w-[100px]">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedContainer.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.id}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.price.toLocaleString()} ₴</TableCell>
                          <TableCell>
                            {item.totalPrice.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleItemSelect(item)}
                            >
                              <Plus className="h-4 w-4" />
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowContainerDialog(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Selection Dialog */}
      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>اختيار عميل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث عن عميل..." className="pr-9" />
              </div>
              <Button variant="outline" className="mr-2">
                <Filter className="ml-2 h-4 w-4" />
                تصفية
              </Button>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                عميل جديد
              </Button>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم العميل</TableHead>
                    <TableHead>اسم العميل</TableHead>
                    <TableHead>جهة الاتصال</TableHead>
                    <TableHead>رقم الهاتف</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.id}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.contact}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCustomerSelect(customer)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCustomerDialog(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContainerReservationInvoice;
