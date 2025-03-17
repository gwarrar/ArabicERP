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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Calculator,
  Calendar,
  Edit,
  Plus,
  Trash,
  Tag,
  Users,
  Package,
  Percent,
  ShoppingBag,
  DollarSign,
  Save,
} from "lucide-react";

import { products } from "@/data/products";
import {
  priceTiers,
  customerTypes,
  productPrices,
  productGroups,
  promotions,
  calculatePrice,
} from "@/data/pricingData";

interface PricingManagerProps {
  onSave?: () => void;
}

export const PricingManager: React.FC<PricingManagerProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState("price-tiers");
  const [showPriceTierDialog, setShowPriceTierDialog] = useState(false);
  const [showCustomerTypeDialog, setShowCustomerTypeDialog] = useState(false);
  const [showProductPriceDialog, setShowProductPriceDialog] = useState(false);
  const [showProductGroupDialog, setShowProductGroupDialog] = useState(false);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [showPriceCalculatorDialog, setShowPriceCalculatorDialog] =
    useState(false);

  // Estados para el simulador de precios
  const [simulatorProduct, setSimulatorProduct] = useState(
    products[0]?.id || "",
  );
  const [simulatorCustomerType, setSimulatorCustomerType] = useState("regular");
  const [simulatorQuantity, setSimulatorQuantity] = useState(1);
  const [simulatorPrice, setSimulatorPrice] = useState(0);

  // Calcular precio en el simulador
  const calculateSimulatorPrice = () => {
    const price = calculatePrice(
      simulatorProduct,
      simulatorCustomerType,
      simulatorQuantity,
    );
    setSimulatorPrice(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الأسعار والعروض</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPriceCalculatorDialog(true)}
          >
            <Calculator className="ml-2 h-4 w-4" />
            محاكاة الأسعار
          </Button>
          <Button onClick={onSave} size="sm">
            <Save className="ml-2 h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="price-tiers">
            <Tag className="ml-2 h-4 w-4" />
            مستويات الأسعار
          </TabsTrigger>
          <TabsTrigger value="customer-types">
            <Users className="ml-2 h-4 w-4" />
            أنواع العملاء
          </TabsTrigger>
          <TabsTrigger value="product-prices">
            <DollarSign className="ml-2 h-4 w-4" />
            أسعار المنتجات
          </TabsTrigger>
          <TabsTrigger value="product-groups">
            <Package className="ml-2 h-4 w-4" />
            مجموعات المنتجات
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Percent className="ml-2 h-4 w-4" />
            العروض والتخفيضات
          </TabsTrigger>
        </TabsList>

        {/* مستويات الأسعار */}
        <TabsContent value="price-tiers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">مستويات الأسعار</h3>
            <Button size="sm" onClick={() => setShowPriceTierDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مستوى سعر
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>نسبة الهامش</TableHead>
                    <TableHead>الحد الأدنى للكمية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceTiers.map((tier) => (
                    <TableRow key={tier.id}>
                      <TableCell className="font-medium">{tier.name}</TableCell>
                      <TableCell>{tier.description}</TableCell>
                      <TableCell>
                        {((tier.markup - 1) * 100).toFixed(0)}%
                      </TableCell>
                      <TableCell>{tier.minQuantity || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tier.status === "active" ? "default" : "secondary"
                          }
                        >
                          {tier.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* أنواع العملاء */}
        <TabsContent value="customer-types" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">أنواع العملاء</h3>
            <Button size="sm" onClick={() => setShowCustomerTypeDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة نوع عميل
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>مستوى السعر الافتراضي</TableHead>
                    <TableHead>نسبة الخصم الإضافي</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell>{type.description}</TableCell>
                      <TableCell>
                        {priceTiers.find(
                          (t) => t.id === type.defaultPriceTierId,
                        )?.name || "-"}
                      </TableCell>
                      <TableCell>
                        {type.discountPercentage
                          ? `${type.discountPercentage}%`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            type.status === "active" ? "default" : "secondary"
                          }
                        >
                          {type.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* أسعار المنتجات */}
        <TabsContent value="product-prices" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">أسعار المنتجات</h3>
            <Button size="sm" onClick={() => setShowProductPriceDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة سعر منتج
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>مستوى السعر</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>الحد الأدنى للكمية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPrices.map((price) => (
                    <TableRow key={price.id}>
                      <TableCell className="font-medium">
                        {products.find((p) => p.id === price.productId)?.name ||
                          price.productId}
                      </TableCell>
                      <TableCell>
                        {priceTiers.find((t) => t.id === price.tierId)?.name ||
                          price.tierId}
                      </TableCell>
                      <TableCell>{price.price.toLocaleString()} ₴</TableCell>
                      <TableCell>{price.minQuantity || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            price.status === "active" ? "default" : "secondary"
                          }
                        >
                          {price.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* مجموعات المنتجات */}
        <TabsContent value="product-groups" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">مجموعات المنتجات</h3>
            <Button size="sm" onClick={() => setShowProductGroupDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مجموعة منتجات
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>عدد المنتجات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="w-[100px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">
                        {group.name}
                      </TableCell>
                      <TableCell>{group.description}</TableCell>
                      <TableCell>{group.productIds.length}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            group.status === "active" ? "default" : "secondary"
                          }
                        >
                          {group.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العروض والتخفيضات */}
        <TabsContent value="promotions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">العروض والتخفيضات</h3>
            <Button size="sm" onClick={() => setShowPromotionDialog(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة عرض
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <Card key={promo.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{promo.name}</CardTitle>
                      <CardDescription>{promo.description}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        promo.status === "active"
                          ? "default"
                          : promo.status === "expired"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {promo.status === "active"
                        ? "نشط"
                        : promo.status === "expired"
                          ? "منتهي"
                          : "غير نشط"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نوع العرض:</span>
                      <span className="font-medium">
                        {promo.type === "percentage"
                          ? "خصم نسبة مئوية"
                          : promo.type === "fixed"
                            ? "خصم قيمة ثابتة"
                            : promo.type === "buy_x_get_y"
                              ? "اشتر X واحصل على Y"
                              : promo.type === "bundle"
                                ? "حزمة منتجات"
                                : promo.type === "second_unit"
                                  ? "الوحدة الثانية بخصم"
                                  : "شحن مجاني"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">قيمة العرض:</span>
                      <span className="font-medium">
                        {promo.type === "percentage" ||
                        promo.type === "second_unit"
                          ? `${promo.value}%`
                          : `${promo.value} ₴`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ البداية:
                      </span>
                      <span>
                        {new Date(promo.startDate).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        تاريخ الانتهاء:
                      </span>
                      <span>
                        {new Date(promo.endDate).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                    {promo.minPurchaseAmount && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          الحد الأدنى للشراء:
                        </span>
                        <span>{promo.minPurchaseAmount} ₴</span>
                      </div>
                    )}
                    {promo.minQuantity && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          الحد الأدنى للكمية:
                        </span>
                        <span>{promo.minQuantity}</span>
                      </div>
                    )}
                    {promo.customerTierIds &&
                      promo.customerTierIds.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            أنواع العملاء:
                          </span>
                          <span>
                            {promo.customerTierIds
                              .map(
                                (id) =>
                                  customerTypes.find((ct) => ct.id === id)
                                    ?.name || id,
                              )
                              .join(", ")}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="ml-2 h-3.5 w-3.5" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-500"
                    >
                      <Trash className="ml-2 h-3.5 w-3.5" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* محاكاة الأسعار */}
      <Dialog
        open={showPriceCalculatorDialog}
        onOpenChange={setShowPriceCalculatorDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>محاكاة الأسعار</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>المنتج</Label>
              <Select
                value={simulatorProduct}
                onValueChange={setSimulatorProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>نوع العميل</Label>
              <Select
                value={simulatorCustomerType}
                onValueChange={setSimulatorCustomerType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العميل" />
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

            <div className="space-y-2">
              <Label>الكمية</Label>
              <Input
                type="number"
                min="1"
                value={simulatorQuantity}
                onChange={(e) =>
                  setSimulatorQuantity(parseInt(e.target.value) || 1)
                }
              />
            </div>

            <Button className="w-full" onClick={calculateSimulatorPrice}>
              <Calculator className="ml-2 h-4 w-4" />
              حساب السعر
            </Button>

            {simulatorPrice > 0 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    السعر المحسوب:
                  </div>
                  <div className="text-2xl font-bold">
                    {simulatorPrice.toLocaleString()} ₴
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPriceCalculatorDialog(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingManager;
