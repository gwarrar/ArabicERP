import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Plus,
  Trash,
  Save,
  ShoppingCart,
  Package,
  Tag,
  Truck,
  User,
  Calendar,
  Clock,
  Printer,
  Download,
  CreditCard,
  DollarSign,
  Percent,
  Scan,
  Bookmark,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Reservation } from "@/types/reservation";
import ReservationForm from "./ReservationForm";
import ReservationsList from "./ReservationsList";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  unit: string;
  inStock: number;
  warehouseId: string;
  warehouseName: string;
  category?: string;
  fabricRollIds?: string[];
}

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  price: number;
  warehouseId: string;
  warehouseName: string;
  totalAmount: number;
  fabricRollIds?: string[];
  isReserved?: boolean;
  reservationId?: string;
}

interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: "prod-001",
    name: "قماش قطني أبيض",
    sku: "FAB-COT-WHT-001",
    price: 25.5,
    unit: "متر",
    inStock: 150,
    warehouseId: "wh-001",
    warehouseName: "المستودع الرئيسي",
    category: "أقمشة قطنية",
    fabricRollIds: ["FR-001", "FR-002"],
  },
  {
    id: "prod-002",
    name: "قماش قطني أسود",
    sku: "FAB-COT-BLK-001",
    price: 25.5,
    unit: "متر",
    inStock: 120,
    warehouseId: "wh-001",
    warehouseName: "المستودع الرئيسي",
    category: "أقمشة قطنية",
    fabricRollIds: ["FR-003"],
  },
  {
    id: "prod-003",
    name: "قماش صوف رمادي",
    sku: "FAB-WOL-GRY-001",
    price: 45.0,
    unit: "متر",
    inStock: 80,
    warehouseId: "wh-001",
    warehouseName: "المستودع الرئيسي",
    category: "أقمشة صوفية",
    fabricRollIds: ["FR-004"],
  },
  {
    id: "prod-004",
    name: "حرير طبيعي أحمر",
    sku: "FAB-SLK-RED-001",
    price: 75.0,
    unit: "متر",
    inStock: 50,
    warehouseId: "wh-001",
    warehouseName: "المستودع الرئيسي",
    category: "أقمشة حريرية",
    fabricRollIds: ["FR-005"],
  },
  {
    id: "prod-005",
    name: "أزرار بلاستيكية بيضاء",
    sku: "ACC-BTN-WHT-001",
    price: 0.5,
    unit: "قطعة",
    inStock: 1000,
    warehouseId: "wh-002",
    warehouseName: "مستودع الإكسسوارات",
    category: "إكسسوارات",
  },
  {
    id: "prod-006",
    name: "سحاب معدني فضي",
    sku: "ACC-ZIP-SLV-001",
    price: 2.0,
    unit: "قطعة",
    inStock: 500,
    warehouseId: "wh-002",
    warehouseName: "مستودع الإكسسوارات",
    category: "إكسسوارات",
  },
];

const sampleCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "شركة الأمل للتجارة",
    phone: "0512345678",
    email: "info@horizon.com",
    address: "الرياض، المملكة العربية السعودية",
  },
  {
    id: "cust-002",
    name: "مؤسسة النور للأقمشة",
    phone: "0523456789",
    email: "contact@noor.com",
    address: "جدة، المملكة العربية السعودية",
  },
  {
    id: "cust-003",
    name: "شركة الخليج للملابس",
    phone: "0534567890",
    email: "info@gulf-clothes.com",
    address: "الدمام، المملكة العربية السعودية",
  },
];

const sampleWarehouses = [
  { id: "wh-001", name: "المستودع الرئيسي" },
  { id: "wh-002", name: "مستودع الإكسسوارات" },
];

const sampleCategories = [
  "الكل",
  "أقمشة قطنية",
  "أقمشة صوفية",
  "أقمشة حريرية",
  "إكسسوارات",
];

const POSWithReservation = () => {
  const [activeTab, setActiveTab] = useState("pos");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(15);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showReservationsList, setShowReservationsList] = useState(false);
  const [showReservedItemsOnly, setShowReservedItemsOnly] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"store" | "delivery">(
    "store",
  );
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [showRollSelection, setShowRollSelection] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedRolls, setSelectedRolls] = useState<string[]>([]);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");

  // Filter products based on search term, category, and warehouse
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "الكل" || product.category === selectedCategory;

    const matchesWarehouse =
      selectedWarehouse === "all" || product.warehouseId === selectedWarehouse;

    return matchesSearch && matchesCategory && matchesWarehouse;
  });

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalAmount, 0);
  };

  // Calculate discount amount
  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * discount) / 100;
  };

  // Calculate tax amount
  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    return ((subtotal - discountAmount) * tax) / 100;
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxAmount = calculateTaxAmount();
    return subtotal - discountAmount + taxAmount;
  };

  // Add product to cart
  const addToCart = (product: Product, quantity: number, rolls?: string[]) => {
    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      quantity,
      unit: product.unit,
      price: product.price,
      warehouseId: product.warehouseId,
      warehouseName: product.warehouseName,
      totalAmount: product.price * quantity,
      fabricRollIds: rolls,
      isReserved: false,
    };

    setCartItems([...cartItems, newItem]);
    setSelectedProduct(null);
    setSelectedRolls([]);
    setQuantityToAdd(1);
    setShowRollSelection(false);
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;

    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalAmount: item.price * newQuantity,
          };
        }
        return item;
      }),
    );
  };

  // Handle product selection for roll selection
  const handleProductSelect = (product: Product) => {
    if (product.fabricRollIds && product.fabricRollIds.length > 0) {
      setSelectedProduct(product);
      setShowRollSelection(true);
    } else {
      addToCart(product, 1);
    }
  };

  // Handle roll selection
  const handleRollSelection = (rollId: string) => {
    setSelectedRolls((prev) =>
      prev.includes(rollId)
        ? prev.filter((id) => id !== rollId)
        : [...prev, rollId],
    );
  };

  // Add selected rolls to cart
  const addSelectedRollsToCart = () => {
    if (selectedProduct && selectedRolls.length > 0) {
      addToCart(selectedProduct, selectedRolls.length, selectedRolls);
    }
  };

  // Create reservation from cart items
  const createReservation = () => {
    if (cartItems.length === 0) {
      alert("لا توجد منتجات في السلة");
      return;
    }

    if (!selectedCustomer) {
      alert("يرجى اختيار العميل");
      return;
    }

    setShowReservationForm(true);
  };

  // Handle barcode scan
  const handleBarcodeScan = () => {
    if (!scannedBarcode) return;

    const product = sampleProducts.find(
      (p) => p.sku.toLowerCase() === scannedBarcode.toLowerCase(),
    );

    if (product) {
      handleProductSelect(product);
    } else {
      alert("المنتج غير موجود");
    }

    setScannedBarcode("");
    setShowBarcodeScanner(false);
  };

  // Create invoice
  const createInvoice = () => {
    if (cartItems.length === 0) {
      alert("لا توجد منتجات في السلة");
      return;
    }

    if (!selectedCustomer) {
      alert("يرجى اختيار العميل");
      return;
    }

    // In a real app, this would create an invoice and possibly send it to a backend
    alert("تم إنشاء الفاتورة بنجاح");

    // Clear cart after creating invoice
    setCartItems([]);
    setSelectedCustomer("");
    setDiscount(0);
    setDeliveryMethod("store");
    setDeliveryAddress("");
    setDeliveryNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">نظام نقطة البيع مع الحجز</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowReservationsList(true)}
          >
            <Bookmark className="ml-2 h-4 w-4" />
            الحجوزات
          </Button>
          <Button variant="outline" onClick={() => setShowBarcodeScanner(true)}>
            <Scan className="ml-2 h-4 w-4" />
            مسح الباركود
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pos">
            <ShoppingCart className="h-4 w-4 ml-2" />
            نقطة البيع
          </TabsTrigger>
          <TabsTrigger value="reserved">
            <Bookmark className="h-4 w-4 ml-2" />
            العناصر المحجوزة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Products Section */}
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">المنتجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث عن منتج..."
                        className="pr-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={selectedWarehouse}
                        onValueChange={setSelectedWarehouse}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="المستودع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع المستودعات</SelectItem>
                          {sampleWarehouses.map((warehouse) => (
                            <SelectItem key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المنتج</TableHead>
                          <TableHead>الرمز</TableHead>
                          <TableHead>السعر</TableHead>
                          <TableHead>المخزون</TableHead>
                          <TableHead>المستودع</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell>{product.sku}</TableCell>
                              <TableCell>
                                {product.price.toLocaleString()} ₴
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${product.inStock > 20 ? "bg-green-100 text-green-800" : product.inStock > 0 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                                >
                                  {product.inStock} {product.unit}
                                </Badge>
                              </TableCell>
                              <TableCell>{product.warehouseName}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleProductSelect(product)}
                                  disabled={product.inStock <= 0}
                                >
                                  <Plus className="h-4 w-4 ml-1" />
                                  إضافة
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="h-24 text-center text-muted-foreground"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <Package className="h-12 w-12 mb-2 opacity-20" />
                                <p>لا توجد منتجات مطابقة للبحث</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">سلة المشتريات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select
                      value={selectedCustomer}
                      onValueChange={setSelectedCustomer}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleCustomers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>المنتج</TableHead>
                            <TableHead>الكمية</TableHead>
                            <TableHead>الإجمالي</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                  <div>
                                    <div>{item.productName}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {item.productSku}
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
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity - 1,
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    <Input
                                      type="number"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        updateItemQuantity(
                                          item.id,
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
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity + 1,
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                  {item.fabricRollIds && (
                                    <div className="mt-1">
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-blue-50 text-blue-700"
                                      >
                                        <Tag className="h-3 w-3 ml-1" />
                                        {item.fabricRollIds.length} رولون
                                      </Badge>
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {item.totalAmount.toLocaleString()} ₴
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="h-24 text-center text-muted-foreground"
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
                                  <p>السلة فارغة</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>المجموع الفرعي:</span>
                          <span className="font-medium">
                            {calculateSubtotal().toLocaleString()} ₴
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>الخصم (%):</span>
                          <Input
                            type="number"
                            value={discount}
                            onChange={(e) =>
                              setDiscount(parseFloat(e.target.value) || 0)
                            }
                            className="w-20 h-8"
                            min="0"
                            max="100"
                          />
                          <span className="text-muted-foreground">
                            ({calculateDiscountAmount().toLocaleString()} ₴)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>الضريبة (%):</span>
                          <Input
                            type="number"
                            value={tax}
                            onChange={(e) =>
                              setTax(parseFloat(e.target.value) || 0)
                            }
                            className="w-20 h-8"
                            min="0"
                            max="100"
                          />
                          <span className="text-muted-foreground">
                            ({calculateTaxAmount().toLocaleString()} ₴)
                          </span>
                        </div>

                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>الإجمالي:</span>
                          <span>{calculateTotal().toLocaleString()} ₴</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <span>طريقة التسليم:</span>
                            <div className="flex gap-2">
                              <Button
                                variant={
                                  deliveryMethod === "store"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setDeliveryMethod("store")}
                              >
                                <ShoppingCart className="h-4 w-4 ml-1" />
                                تسليم في المتجر
                              </Button>
                              <Button
                                variant={
                                  deliveryMethod === "delivery"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setDeliveryMethod("delivery")}
                              >
                                <Truck className="h-4 w-4 ml-1" />
                                توصيل للعميل
                              </Button>
                            </div>
                          </div>

                          {deliveryMethod === "delivery" && (
                            <div className="space-y-2">
                              <Input
                                placeholder="عنوان التوصيل"
                                value={deliveryAddress}
                                onChange={(e) =>
                                  setDeliveryAddress(e.target.value)
                                }
                              />
                              <Input
                                placeholder="ملاحظات التوصيل"
                                value={deliveryNotes}
                                onChange={(e) =>
                                  setDeliveryNotes(e.target.value)
                                }
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={createInvoice}>
                            <CreditCard className="ml-2 h-4 w-4" />
                            إنشاء فاتورة
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={createReservation}
                          >
                            <Bookmark className="ml-2 h-4 w-4" />
                            حجز المنتجات
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reserved" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">العناصر المحجوزة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الحجز</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>المنتجات</TableHead>
                      <TableHead>تاريخ الحجز</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Bookmark className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد حجوزات حالية</p>
                          <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() => setShowReservationsList(true)}
                          >
                            <Bookmark className="ml-2 h-4 w-4" />
                            عرض جميع الحجوزات
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Roll Selection Dialog */}
      <Dialog open={showRollSelection} onOpenChange={setShowRollSelection}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>اختيار الرولونات</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedProduct && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedProduct.sku}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {selectedProduct.inStock} {selectedProduct.unit} متوفر
                  </Badge>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-medium mb-2">الرولونات المتوفرة:</h4>
                  {selectedProduct.fabricRollIds?.map((rollId) => (
                    <div
                      key={rollId}
                      className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${selectedRolls.includes(rollId) ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"}`}
                      onClick={() => handleRollSelection(rollId)}
                    >
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 ml-2 text-blue-600" />
                        <span>{rollId}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          selectedRolls.includes(rollId)
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100"
                        }
                      >
                        {selectedRolls.includes(rollId) ? "محدد" : "غير محدد"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span>
                    تم اختيار {selectedRolls.length} من أصل{" "}
                    {selectedProduct.fabricRollIds?.length} رولون
                  </span>
                  <span className="font-medium">
                    الإجمالي:{" "}
                    {(
                      selectedProduct.price * selectedRolls.length
                    ).toLocaleString()}{" "}
                    ₴
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRollSelection(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={addSelectedRollsToCart}
              disabled={selectedRolls.length === 0}
            >
              <Plus className="ml-2 h-4 w-4" />
              إضافة للسلة ({selectedRolls.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Barcode Scanner Dialog */}
      <Dialog open={showBarcodeScanner} onOpenChange={setShowBarcodeScanner}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>مسح الباركود</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center">
              <Scan className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                قم بتوجيه الماسح الضوئي نحو الباركود
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="barcode-input" className="text-sm font-medium">
                أو أدخل الباركود يدوياً:
              </label>
              <div className="flex gap-2">
                <Input
                  id="barcode-input"
                  value={scannedBarcode}
                  onChange={(e) => setScannedBarcode(e.target.value)}
                  placeholder="أدخل الباركود"
                  className="flex-1"
                />
                <Button onClick={handleBarcodeScan}>
                  <Search className="h-4 w-4 ml-1" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBarcodeScanner(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reservation Form Dialog */}
      {showReservationForm && (
        <ReservationForm
          open={showReservationForm}
          onClose={() => setShowReservationForm(false)}
          onSave={(reservation) => {
            console.log("Reservation created:", reservation);
            setShowReservationForm(false);
            // In a real app, this would save the reservation to a backend
            alert("تم إنشاء الحجز بنجاح");
            // Clear cart after creating reservation
            setCartItems([]);
            setSelectedCustomer("");
            setDiscount(0);
            setDeliveryMethod("store");
            setDeliveryAddress("");
            setDeliveryNotes("");
          }}
          initialReservation={{
            id: "",
            reservationNumber: `RES-${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}`,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(
              new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            status: "pending",
            type: "customer",
            customerId: selectedCustomer,
            customerName: sampleCustomers.find((c) => c.id === selectedCustomer)
              ?.name,
            items: cartItems.map((item) => ({
              id: item.id,
              productId: item.productId,
              productName: item.productName,
              productSku: item.productSku,
              quantity: item.quantity,
              unit: item.unit,
              price: item.price,
              warehouseId: item.warehouseId,
              warehouseName: item.warehouseName,
              fabricRollIds: item.fabricRollIds,
              totalAmount: item.totalAmount,
            })),
            totalAmount: calculateTotal(),
            notes:
              deliveryMethod === "delivery"
                ? `توصيل للعنوان: ${deliveryAddress}. ${deliveryNotes}`
                : "تسليم في المتجر",
          }}
        />
      )}

      {/* Reservations List Dialog */}
      {showReservationsList && (
        <ReservationsList
          open={showReservationsList}
          onClose={() => setShowReservationsList(false)}
        />
      )}
    </div>
  );
};

export default POSWithReservation;
