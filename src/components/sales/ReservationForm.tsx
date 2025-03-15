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
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Package,
  User,
  Warehouse,
  Tag,
  Search,
  Plus,
  Trash,
  Save,
  X,
  CalendarDays,
} from "lucide-react";
import { Reservation, ReservationItem } from "@/types/reservation";

interface ReservationFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (reservation: Reservation) => void;
  initialReservation?: Reservation;
}

interface Customer {
  id: string;
  name: string;
}

interface Manager {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  unit: string;
  inStock: number;
  warehouseId: string;
  warehouseName: string;
}

interface Warehouse {
  id: string;
  name: string;
}

// Sample data
const sampleCustomers: Customer[] = [
  { id: "cust-001", name: "شركة الأمل للتجارة" },
  { id: "cust-002", name: "مؤسسة النور للأقمشة" },
  { id: "cust-003", name: "شركة الخليج للملابس" },
];

const sampleManagers: Manager[] = [
  { id: "mgr-001", name: "أحمد محمد" },
  { id: "mgr-002", name: "خالد عمر" },
  { id: "mgr-003", name: "سارة أحمد" },
];

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
  },
];

const sampleWarehouses: Warehouse[] = [
  { id: "wh-001", name: "المستودع الرئيسي" },
  { id: "wh-002", name: "مستودع الإكسسوارات" },
];

const ReservationForm: React.FC<ReservationFormProps> = ({
  open,
  onClose,
  onSave,
  initialReservation,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [reservationType, setReservationType] = useState<
    "customer" | "manager"
  >("customer");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [expiryDays, setExpiryDays] = useState(7);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ReservationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState("all");

  // Product selection state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);

  // Initialize form with initial reservation data if provided
  useEffect(() => {
    if (initialReservation) {
      setReservationType(initialReservation.type);
      if (
        initialReservation.type === "customer" &&
        initialReservation.customerId
      ) {
        setSelectedCustomerId(initialReservation.customerId);
      } else if (
        initialReservation.type === "manager" &&
        initialReservation.managerId
      ) {
        setSelectedManagerId(initialReservation.managerId);
      }
      setNotes(initialReservation.notes || "");
      setItems([...initialReservation.items]);

      // Calculate expiry days from createdAt and expiresAt
      const createdDate = new Date(initialReservation.createdAt);
      const expiryDate = new Date(initialReservation.expiresAt);
      const diffTime = Math.abs(expiryDate.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setExpiryDays(diffDays);
    }
  }, [initialReservation]);

  // Filter products based on search term and warehouse filter
  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWarehouse =
      selectedWarehouseFilter === "all" ||
      product.warehouseId === selectedWarehouseFilter;

    return matchesSearch && matchesWarehouse;
  });

  // Add product to reservation items
  const addProduct = () => {
    if (!selectedProduct) return;

    const newItem: ReservationItem = {
      id: `item-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productSku: selectedProduct.sku,
      quantity: quantity,
      unit: selectedProduct.unit,
      price: selectedProduct.price,
      warehouseId: selectedProduct.warehouseId,
      warehouseName: selectedProduct.warehouseName,
      totalAmount: selectedProduct.price * quantity,
    };

    setItems([...items, newItem]);
    setSelectedProduct(null);
    setQuantity(1);
    setShowAddProductDialog(false);
  };

  // Remove product from reservation items
  const removeProduct = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;

    setItems(
      items.map((item) => {
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

  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.totalAmount, 0);
  };

  // Handle save reservation
  const handleSave = () => {
    // Validate form
    if (reservationType === "customer" && !selectedCustomerId) {
      alert("يرجى اختيار العميل");
      return;
    }

    if (reservationType === "manager" && !selectedManagerId) {
      alert("يرجى اختيار المدير");
      return;
    }

    if (items.length === 0) {
      alert("يرجى إضافة منتج واحد على الأقل");
      return;
    }

    // Create reservation object
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setDate(now.getDate() + expiryDays);

    const reservation: Reservation = {
      id: initialReservation?.id || `res-${Date.now()}`,
      reservationNumber:
        initialReservation?.reservationNumber ||
        `RES-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
      createdAt: initialReservation?.createdAt || now.toISOString(),
      expiresAt: expiryDate.toISOString(),
      status: initialReservation?.status || "pending",
      type: reservationType,
      items: items,
      totalAmount: calculateTotal(),
      notes: notes,
    };

    // Add customer or manager details
    if (reservationType === "customer") {
      const customer = sampleCustomers.find((c) => c.id === selectedCustomerId);
      if (customer) {
        reservation.customerId = customer.id;
        reservation.customerName = customer.name;
      }
    } else {
      const manager = sampleManagers.find((m) => m.id === selectedManagerId);
      if (manager) {
        reservation.managerId = manager.id;
        reservation.managerName = manager.name;
      }
    }

    // Save reservation
    onSave(reservation);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {initialReservation ? "تعديل حجز" : "إنشاء حجز جديد"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">
              <User className="h-4 w-4 ml-2" />
              المعلومات الأساسية
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 ml-2" />
              المنتجات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>نوع الحجز</Label>
                  <Select
                    value={reservationType}
                    onValueChange={(value: "customer" | "manager") =>
                      setReservationType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحجز" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">عميل</SelectItem>
                      <SelectItem value="manager">مدير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reservationType === "customer" ? (
                  <div className="space-y-2">
                    <Label>العميل</Label>
                    <Select
                      value={selectedCustomerId}
                      onValueChange={setSelectedCustomerId}
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
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>المدير</Label>
                    <Select
                      value={selectedManagerId}
                      onValueChange={setSelectedManagerId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدير" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleManagers.map((manager) => (
                          <SelectItem key={manager.id} value={manager.id}>
                            {manager.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>مدة الحجز (بالأيام)</Label>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      value={expiryDays}
                      onChange={(e) =>
                        setExpiryDays(parseInt(e.target.value) || 7)
                      }
                    />
                    <div className="mr-2 flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 ml-1" />
                      <span>
                        تاريخ الانتهاء:{" "}
                        {new Date(
                          new Date().getTime() +
                            expiryDays * 24 * 60 * 60 * 1000,
                        ).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>ملاحظات</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أدخل أي ملاحظات إضافية هنا..."
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">المنتجات المحجوزة</h3>
                <Button onClick={() => setShowAddProductDialog(true)}>
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة منتج
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المنتج</TableHead>
                      <TableHead>الرمز</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>الوحدة</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead>الإجمالي</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.productName}
                          </TableCell>
                          <TableCell>{item.productSku}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
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
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.price.toLocaleString()} ₴</TableCell>
                          <TableCell>{item.warehouseName}</TableCell>
                          <TableCell className="font-bold">
                            {item.totalAmount.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProduct(item.id)}
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
                          colSpan={8}
                          className="h-24 text-center text-muted-foreground"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Package className="h-12 w-12 mb-2 opacity-20" />
                            <p>لم يتم إضافة أي منتجات بعد</p>
                            <Button
                              variant="outline"
                              className="mt-2"
                              onClick={() => setShowAddProductDialog(true)}
                            >
                              <Plus className="ml-2 h-4 w-4" />
                              إضافة منتج
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                    {items.length > 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-left font-bold text-lg"
                        >
                          الإجمالي
                        </TableCell>
                        <TableCell className="font-bold text-lg">
                          {calculateTotal().toLocaleString()} ₴
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            <Save className="ml-2 h-4 w-4" />
            {initialReservation ? "حفظ التغييرات" : "إنشاء الحجز"}
          </Button>
        </DialogFooter>

        {/* Add Product Dialog */}
        <Dialog
          open={showAddProductDialog}
          onOpenChange={setShowAddProductDialog}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة منتج</DialogTitle>
            </DialogHeader>
            <div className="py-4">
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

                <Select
                  value={selectedWarehouseFilter}
                  onValueChange={setSelectedWarehouseFilter}
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
                        <TableRow
                          key={product.id}
                          className={`cursor-pointer hover:bg-muted/50 ${selectedProduct?.id === product.id ? "bg-blue-50" : ""}`}
                          onClick={() => setSelectedProduct(product)}
                        >
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
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product);
                              }}
                            >
                              اختيار
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

              {selectedProduct && (
                <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium mb-2">المنتج المختار</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedProduct.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedProduct.sku} - {selectedProduct.warehouseName}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Label htmlFor="quantity" className="ml-2">
                          الكمية:
                        </Label>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          >
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value) || 1)
                            }
                            className="w-16 h-8 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground ml-1">
                          الإجمالي:
                        </span>
                        <span className="font-bold">
                          {(selectedProduct.price * quantity).toLocaleString()}{" "}
                          ₴
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddProductDialog(false)}
              >
                إلغاء
              </Button>
              <Button
                onClick={addProduct}
                disabled={!selectedProduct || quantity <= 0}
              >
                <Plus className="ml-2 h-4 w-4" />
                إضافة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationForm;
