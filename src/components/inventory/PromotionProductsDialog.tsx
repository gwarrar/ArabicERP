import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Trash, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

import { products } from "@/data/products";
import { productGroups } from "@/data/pricingData";

interface PromotionProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: any;
  onSave: (updatedPromotion: any) => void;
}

const PromotionProductsDialog: React.FC<PromotionProductsDialogProps> = ({
  open,
  onOpenChange,
  promotion,
  onSave,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Get all products in the promotion (directly or via groups)
  const getPromotionProducts = () => {
    const directProducts = promotion?.productIds || [];

    const groupProducts: string[] = [];
    if (promotion?.productGroupIds) {
      promotion.productGroupIds.forEach((groupId: string) => {
        const group = productGroups.find((g) => g.id === groupId);
        if (group) {
          groupProducts.push(...group.productIds);
        }
      });
    }

    // Get unique product IDs
    const allProductIds = [...new Set([...directProducts, ...groupProducts])];

    // Map to product objects
    return allProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  };

  const promotionProducts = getPromotionProducts();

  // Filter products for the product selector
  const filteredProducts = products.filter((product) => {
    const isAlreadyInPromotion = promotionProducts.some(
      (p) => p.id === product.id,
    );
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    return !isAlreadyInPromotion && matchesSearch;
  });

  const handleAddProducts = () => {
    const updatedPromotion = {
      ...promotion,
      productIds: [...(promotion.productIds || []), ...selectedProductIds],
    };
    onSave(updatedPromotion);
    setSelectedProductIds([]);
    setShowProductSelector(false);
  };

  const handleRemoveProduct = (productId: string) => {
    // Check if product is directly in the promotion
    if (promotion.productIds && promotion.productIds.includes(productId)) {
      const updatedPromotion = {
        ...promotion,
        productIds: promotion.productIds.filter(
          (id: string) => id !== productId,
        ),
      };
      onSave(updatedPromotion);
    } else {
      // Product is in a group, we need to handle this differently
      // For now, we'll just show an alert
      alert("هذا المنتج جزء من مجموعة منتجات. لإزالته، يرجى تعديل المجموعة.");
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>المنتجات المشاركة في {promotion.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">{promotion.name}</h3>
              <p className="text-sm text-muted-foreground">
                {promotion.description}
              </p>
            </div>
            <Badge
              variant={
                promotion.status === "active"
                  ? "default"
                  : promotion.status === "expired"
                    ? "destructive"
                    : "secondary"
              }
            >
              {promotion.status === "active"
                ? "نشط"
                : promotion.status === "expired"
                  ? "منتهي"
                  : "غير نشط"}
            </Badge>
          </div>

          <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800 mb-4">
            <h4 className="font-medium mb-2">تفاصيل العرض</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">نوع العرض</p>
                <p>
                  {promotion.type === "percentage"
                    ? "خصم نسبة مئوية"
                    : promotion.type === "fixed"
                      ? "خصم مبلغ ثابت"
                      : promotion.type === "buy_x_get_y"
                        ? "اشتر X واحصل على Y"
                        : promotion.type === "bundle"
                          ? "حزمة منتجات"
                          : promotion.type === "second_unit"
                            ? "الوحدة الثانية بخصم"
                            : "شحن مجاني"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">قيمة العرض</p>
                <p>
                  {promotion.type === "percentage"
                    ? `${promotion.value}%`
                    : promotion.type === "fixed"
                      ? `${promotion.value} ₴`
                      : promotion.type === "buy_x_get_y"
                        ? `اشتر ${promotion.minQuantity} واحصل على ${promotion.freeQuantity}`
                        : promotion.type === "second_unit"
                          ? `${promotion.value}%`
                          : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ البدء</p>
                <p>
                  {new Date(promotion.startDate).toLocaleDateString("ar-EG")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ الانتهاء</p>
                <p>{new Date(promotion.endDate).toLocaleDateString("ar-EG")}</p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">المنتجات المشاركة</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowProductSelector(true)}
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتجات
              </Button>
            </div>

            {showProductSelector ? (
              <div className="border rounded-md p-4 mb-4">
                <div className="flex items-center mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث عن منتج..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    className="mr-2"
                    size="sm"
                    disabled={selectedProductIds.length === 0}
                    onClick={handleAddProducts}
                  >
                    <Check className="h-4 w-4 ml-2" />
                    إضافة المحدد ({selectedProductIds.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowProductSelector(false);
                      setSelectedProductIds([]);
                    }}
                  >
                    إلغاء
                  </Button>
                </div>

                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>اسم المنتج</TableHead>
                        <TableHead>الرمز</TableHead>
                        <TableHead>الفئة</TableHead>
                        <TableHead>السعر</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow
                          key={product.id}
                          className="cursor-pointer"
                          onClick={() => toggleProductSelection(product.id)}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedProductIds.includes(product.id)}
                              onCheckedChange={() =>
                                toggleProductSelection(product.id)
                              }
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            {product.price?.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProducts.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-4 text-muted-foreground"
                          >
                            لا توجد منتجات متاحة للإضافة
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            ) : null}

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الرمز</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر الأصلي</TableHead>
                    <TableHead>السعر بعد الخصم</TableHead>
                    <TableHead className="w-[80px]">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotionProducts.length > 0 ? (
                    promotionProducts.map((product: any) => {
                      // Calculate discounted price based on promotion type
                      let discountedPrice = product.price;
                      if (promotion.type === "percentage") {
                        discountedPrice =
                          product.price * (1 - promotion.value / 100);
                      } else if (promotion.type === "fixed") {
                        discountedPrice = Math.max(
                          0,
                          product.price - promotion.value,
                        );
                      } else if (
                        promotion.type === "second_unit" &&
                        promotion.value
                      ) {
                        // This is a simplified calculation for display purposes
                        const secondUnitPrice =
                          product.price * (1 - promotion.value / 100);
                        discountedPrice = (product.price + secondUnitPrice) / 2;
                      }

                      return (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            {product.price?.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>
                            {discountedPrice?.toLocaleString()} ₴
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveProduct(product.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        لا توجد منتجات مشاركة في هذا العرض
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
          <Button onClick={() => onOpenChange(false)}>حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionProductsDialog;
