import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DollarSign,
  Plus,
  Edit,
  Trash,
  ShoppingCart,
  Warehouse,
  Percent,
  Tag,
  Package,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  priceTiers,
  customerTypes,
  productPrices,
  promotions,
} from "@/data/pricingData";
import { products } from "@/data/products";

interface ProductPricingDetailsProps {
  productId: string;
  onSave?: () => void;
}

const ProductPricingDetails: React.FC<ProductPricingDetailsProps> = ({
  productId,
  onSave,
}) => {
  const [showAddPriceDialog, setShowAddPriceDialog] = useState(false);
  const [showPromotionsDialog, setShowPromotionsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [newPrice, setNewPrice] = useState({
    tierId: "",
    price: 0,
    minQuantity: 1,
  });
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);

  // Get product details
  const productDetails = products.find((product) => product.id === productId);

  // Filter prices for this product
  const productSpecificPrices = productPrices.filter(
    (price) => price.productId === productId,
  );

  // Get all active promotions
  const allPromotions = promotions.filter((promo) => promo.status === "active");

  // Get promotions for this product
  const productPromotions = promotions.filter((promo) =>
    promo.productIds?.includes(productId),
  );

  // Initialize selected promotions
  useEffect(() => {
    if (productId) {
      const currentPromotionIds = productPromotions.map((promo) => promo.id);
      setSelectedPromotions(currentPromotionIds);
    }
  }, [productId]);

  // Handle promotion selection
  const handlePromotionToggle = (promotionId: string) => {
    setSelectedPromotions((prev) => {
      if (prev.includes(promotionId)) {
        return prev.filter((id) => id !== promotionId);
      } else {
        return [...prev, promotionId];
      }
    });
  };

  // Save selected promotions
  const saveSelectedPromotions = () => {
    // Here you would update the promotions in the database
    console.log("Saving promotions for product", productId, selectedPromotions);
    setShowPromotionsDialog(false);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-[#1e1e2d] dark:text-white p-4 rounded-md h-full overflow-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">
            {productDetails?.name || "تفاصيل المنتج"}
          </h3>
          {productDetails?.barcode && (
            <Badge variant="outline" className="mr-2">
              {productDetails.barcode}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowPromotionsDialog(true)}>
            <Percent className="ml-2 h-4 w-4" />
            إدارة العروض
          </Button>
          <Button size="sm" onClick={() => setShowAddPriceDialog(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة سعر
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="details">
            <Tag className="h-4 w-4 ml-2" />
            تفاصيل المنتج
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="h-4 w-4 ml-2" />
            التسعير
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Percent className="h-4 w-4 ml-2" />
            العروض
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          {/* معلومات أساسية عن المنتج */}
          <Card>
            <CardHeader>
              <CardTitle className="text-md">معلومات المنتج</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <div className="w-24 h-24 rounded-md overflow-hidden ml-4">
                  {productDetails?.image ? (
                    <img
                      src={productDetails.image}
                      alt={productDetails.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">الفئة</div>
                      <div className="font-medium">
                        {productDetails?.category || "غير مصنف"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        المخزون
                      </div>
                      <div className="font-medium">
                        {productDetails?.stock || 0} وحدة
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">السعر</div>
                      <div className="font-medium">
                        {productDetails?.price?.toLocaleString() || "غير محدد"}{" "}
                        ₴
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* معلومات أساسية عن أسعار المنتج */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-md">
                معلومات الأسعار الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 border rounded-md">
                  <ShoppingCart className="h-5 w-5 ml-2 text-blue-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      سعر الشراء
                    </div>
                    <div className="font-medium">
                      {productDetails?.cost?.toLocaleString() || "غير محدد"} ₴
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <Warehouse className="h-5 w-5 ml-2 text-orange-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      سعر البيع
                    </div>
                    <div className="font-medium">
                      {productDetails?.price?.toLocaleString() || "غير محدد"} ₴
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 border rounded-md">
                  <DollarSign className="h-5 w-5 ml-2 text-green-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      هامش الربح
                    </div>
                    <div className="font-medium">
                      {productDetails?.cost && productDetails?.price
                        ? `${Math.round(((productDetails.price - productDetails.cost) / productDetails.cost) * 100)}%`
                        : "غير محدد"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-4">
          {/* أسعار المنتج */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-md">أسعار المنتج</CardTitle>
              <Button size="sm" onClick={() => setShowAddPriceDialog(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة سعر
              </Button>
            </CardHeader>
            <CardContent>
              {productSpecificPrices.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>مستوى السعر</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>الحد الأدنى للكمية</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="w-[100px]">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productSpecificPrices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell>
                          {priceTiers.find((t) => t.id === price.tierId)
                            ?.name || price.tierId}
                        </TableCell>
                        <TableCell>{price.price.toLocaleString()} ₴</TableCell>
                        <TableCell>{price.minQuantity || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              price.status === "active"
                                ? "default"
                                : "secondary"
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
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  لا توجد أسعار مخصصة لهذا المنتج
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="mt-4">
          {/* العروض المطبقة على المنتج */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-md">العروض المطبقة</CardTitle>
              <Button size="sm" onClick={() => setShowPromotionsDialog(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إدارة العروض
              </Button>
            </CardHeader>
            <CardContent>
              {productPromotions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم العرض</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>القيمة</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productPromotions.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell className="font-medium">
                          {promo.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {promo.type === "percentage"
                              ? "نسبة مئوية"
                              : promo.type === "fixed"
                                ? "مبلغ ثابت"
                                : promo.type === "second_unit"
                                  ? "الوحدة الثانية"
                                  : "عرض آخر"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {promo.type === "percentage"
                            ? `${promo.value}%`
                            : promo.type === "fixed"
                              ? `${promo.value} ₴`
                              : promo.type === "second_unit"
                                ? `${promo.value}%`
                                : "-"}
                        </TableCell>
                        <TableCell>
                          {new Date(promo.endDate).toLocaleDateString("ar-EG")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  لا توجد عروض مطبقة على هذا المنتج
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* إضافة سعر جديد */}
      <Dialog open={showAddPriceDialog} onOpenChange={setShowAddPriceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة سعر جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>مستوى السعر</Label>
              <Select
                value={newPrice.tierId}
                onValueChange={(value) =>
                  setNewPrice({ ...newPrice, tierId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مستوى السعر" />
                </SelectTrigger>
                <SelectContent>
                  {priceTiers.map((tier) => (
                    <SelectItem key={tier.id} value={tier.id}>
                      {tier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>السعر</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={newPrice.price}
                onChange={(e) =>
                  setNewPrice({
                    ...newPrice,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>الحد الأدنى للكمية</Label>
              <Input
                type="number"
                min="1"
                value={newPrice.minQuantity}
                onChange={(e) =>
                  setNewPrice({
                    ...newPrice,
                    minQuantity: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddPriceDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // Here you would add the new price to the product
                // For now we just close the dialog
                setShowAddPriceDialog(false);
              }}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* إدارة العروض */}
      <Dialog
        open={showPromotionsDialog}
        onOpenChange={setShowPromotionsDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إدارة العروض للمنتج</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 flex items-center">
              <Info className="h-4 w-4 ml-2 text-blue-500" />
              <p className="text-sm text-muted-foreground">
                اختر العروض التي تريد تطبيقها على هذا المنتج
              </p>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {allPromotions.length > 0 ? (
                allPromotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="flex items-start space-x-2 space-x-reverse border-b pb-3"
                  >
                    <Checkbox
                      id={`promo-${promo.id}`}
                      checked={selectedPromotions.includes(promo.id)}
                      onCheckedChange={() => handlePromotionToggle(promo.id)}
                    />
                    <div className="grid gap-1.5 mr-2 flex-1">
                      <Label
                        htmlFor={`promo-${promo.id}`}
                        className="font-medium"
                      >
                        {promo.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {promo.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="ml-2">
                          {promo.type === "percentage"
                            ? "نسبة مئوية"
                            : promo.type === "fixed"
                              ? "مبلغ ثابت"
                              : promo.type === "second_unit"
                                ? "الوحدة الثانية"
                                : "عرض آخر"}
                        </Badge>
                        <Badge variant="outline">
                          {promo.type === "percentage"
                            ? `${promo.value}%`
                            : promo.type === "fixed"
                              ? `${promo.value} ₴`
                              : promo.type === "second_unit"
                                ? `${promo.value}%`
                                : "-"}
                        </Badge>
                        <span className="text-xs text-muted-foreground mr-auto">
                          ينتهي:{" "}
                          {new Date(promo.endDate).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  لا توجد عروض متاحة حالياً
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPromotionsDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={saveSelectedPromotions}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPricingDetails;
