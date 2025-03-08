import React, { useState } from "react";
import { Card } from "@/components/ui/card";
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
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash,
  CreditCard,
  User,
  Barcode,
} from "lucide-react";
import { products } from "@/data/products";
import { customers } from "@/data/salesData";

interface POSInterfaceProps {
  onSave: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}

export const POSInterface: React.FC<POSInterfaceProps> = ({ onSave }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState("cash-customer");
  const [barcodeInput, setBarcodeInput] = useState("");

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.barcode.includes(searchTerm)
      : true;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Add product to cart
  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * (item.price - item.discount),
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          discount: 0,
          total: product.price,
        },
      ]);
    }
  };

  // Handle barcode scan
  const handleBarcodeScan = () => {
    if (!barcodeInput) return;

    const product = products.find((p) => p.barcode === barcodeInput);
    if (product) {
      addToCart(product);
      setBarcodeInput("");
    } else {
      alert("المنتج غير موجود!");
    }
  };

  // Update cart item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              total: newQuantity * (item.price - item.discount),
            }
          : item,
      ),
    );
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  // Process payment
  const processPayment = () => {
    if (cart.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    // Here you would typically process the payment
    // and create an invoice in the database
    alert("تم إتمام عملية الدفع بنجاح!");
    setCart([]);
    onSave();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Products Panel */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Barcode Scanner Input */}
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="مسح الباركود..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBarcodeScan();
                  }}
                  className="pl-10"
                />
                <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              <Button size="icon" onClick={handleBarcodeScan}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <Input
                placeholder="بحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "الكل" : category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-2">
                  <div className="font-medium truncate">{product.name}</div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-primary font-bold">
                      {product.price} ₴
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {product.stock} قطعة
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Cart Panel */}
      <div className="space-y-4">
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          {/* Customer Info */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">العميل</h3>
              <div className="text-sm text-muted-foreground">
                {customer === "cash-customer" ? "عميل نقدي" : customer}
              </div>
            </div>
            <div className="flex items-center gap-2">
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

          {/* Cart Items */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>سلة المشتريات فارغة</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.price} ₴ × {item.quantity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-bold">{item.total} ₴</div>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>{subtotal.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الضريبة (15%)</span>
              <span>{tax.toLocaleString()} ₴</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>الإجمالي</span>
              <span>{total.toLocaleString()} ₴</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="outline"
              disabled={cart.length === 0}
              onClick={() => setCart([])}
            >
              <Trash className="ml-2 h-4 w-4" />
              إلغاء
            </Button>
            <Button disabled={cart.length === 0} onClick={processPayment}>
              <CreditCard className="ml-2 h-4 w-4" />
              دفع
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <h3 className="font-medium mb-3">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <ShoppingCart className="ml-2 h-4 w-4" />
              حفظ كمسودة
            </Button>
            <Button variant="outline">
              <CreditCard className="ml-2 h-4 w-4" />
              خصم شامل
            </Button>
            <Button variant="outline">
              <User className="ml-2 h-4 w-4" />
              عميل جديد
            </Button>
            <Button variant="outline">
              <Plus className="ml-2 h-4 w-4" />
              منتج جديد
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default POSInterface;
