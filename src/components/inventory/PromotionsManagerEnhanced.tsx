import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash, Tag, Calendar, Search, Filter } from "lucide-react";
import { promotions, productGroups } from "@/data/pricingData";
import { products } from "@/data/products";
import PromotionProductsDialog from "./PromotionProductsDialog";

const PromotionsManagerEnhanced = () => {
  const [showAddPromotionDialog, setShowAddPromotionDialog] = useState(false);
  const [showProductsDialog, setShowProductsDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [newPromotion, setNewPromotion] = useState({
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minQuantity: 1,
    freeQuantity: 1,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "active",
    productIds: [],
    productGroupIds: [],
  });

  // Filter promotions based on search and filters
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || promo.status === statusFilter;
    const matchesType = typeFilter === "all" || promo.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewProducts = (promotion: any) => {
    setSelectedPromotion(promotion);
    setShowProductsDialog(true);
  };

  const handleSavePromotion = (updatedPromotion: any) => {
    // In a real app, this would update the promotion in the database
    console.log("Saving promotion:", updatedPromotion);
    setSelectedPromotion(updatedPromotion);
  };

  const getPromotionTypeText = (type: string) => {
    switch (type) {
      case "percentage":
        return "خصم نسبة مئوية";
      case "fixed":
        return "خصم مبلغ ثابت";
      case "buy_x_get_y":
        return "اشتر X واحصل على Y";
      case "bundle":
        return "حزمة منتجات";
      case "second_unit":
        return "الوحدة الثانية بخصم";
      case "free_shipping":
        return "شحن مجاني";
      default:
        return type;
    }
  };

  const getPromotionValueText = (promotion: any) => {
    switch (promotion.type) {
      case "percentage":
        return `${promotion.value}%`;
      case "fixed":
        return `${promotion.value} ₴`;
      case "buy_x_get_y":
        return `اشتر ${promotion.minQuantity} واحصل على ${promotion.freeQuantity}`;
      case "second_unit":
        return `${promotion.value}%`;
      default:
        return "-";
    }
  };

  const getProductsCount = (promotion: any) => {
    let count = 0;

    // Count direct products
    if (promotion.productIds) {
      count += promotion.productIds.length;
    }

    // Count products in groups
    if (promotion.productGroupIds) {
      promotion.productGroupIds.forEach((groupId: string) => {
        const group = productGroups.find((g) => g.id === groupId);
        if (group) {
          count += group.productIds.length;
        }
      });
    }

    return count;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">إدارة العروض والتخفيضات</h3>
        <Button onClick={() => setShowAddPromotionDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة عرض جديد
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن عرض..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="expired">منتهي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[200px]">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="percentage">خصم نسبة مئوية</SelectItem>
                  <SelectItem value="fixed">خصم مبلغ ثابت</SelectItem>
                  <SelectItem value="buy_x_get_y">
                    اشتر X واحصل على Y
                  </SelectItem>
                  <SelectItem value="bundle">حزمة منتجات</SelectItem>
                  <SelectItem value="second_unit">
                    الوحدة الثانية بخصم
                  </SelectItem>
                  <SelectItem value="free_shipping">شحن مجاني</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم العرض</TableHead>
                <TableHead>نوع العرض</TableHead>
                <TableHead>القيمة</TableHead>
                <TableHead>تاريخ البدء</TableHead>
                <TableHead>تاريخ الانتهاء</TableHead>
                <TableHead>المنتجات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="w-[120px]">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{promotion.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {promotion.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPromotionTypeText(promotion.type)}</TableCell>
                  <TableCell>{getPromotionValueText(promotion)}</TableCell>
                  <TableCell>
                    {new Date(promotion.startDate).toLocaleDateString("ar-EG")}
                  </TableCell>
                  <TableCell>
                    {new Date(promotion.endDate).toLocaleDateString("ar-EG")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => handleViewProducts(promotion)}
                    >
                      {getProductsCount(promotion)} منتج
                    </Button>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewProducts(promotion)}
                      >
                        <Tag className="h-4 w-4" />
                      </Button>
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
              {filteredPromotions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-muted-foreground"
                  >
                    لا توجد عروض مطابقة للبحث
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Promotion Dialog */}
      <Dialog
        open={showAddPromotionDialog}
        onOpenChange={setShowAddPromotionDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عرض جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>اسم العرض</Label>
                <Input
                  value={newPromotion.name}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, name: e.target.value })
                  }
                  placeholder="مثال: تخفيضات نهاية الموسم"
                />
              </div>

              <div className="space-y-2">
                <Label>وصف العرض</Label>
                <Textarea
                  value={newPromotion.description}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      description: e.target.value,
                    })
                  }
                  placeholder="وصف تفصيلي للعرض"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>نوع العرض</Label>
                  <Select
                    value={newPromotion.type}
                    onValueChange={(value) =>
                      setNewPromotion({ ...newPromotion, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العرض" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">خصم نسبة مئوية</SelectItem>
                      <SelectItem value="fixed">خصم مبلغ ثابت</SelectItem>
                      <SelectItem value="buy_x_get_y">
                        اشتر X واحصل على Y
                      </SelectItem>
                      <SelectItem value="bundle">حزمة منتجات</SelectItem>
                      <SelectItem value="second_unit">
                        الوحدة الثانية بخصم
                      </SelectItem>
                      <SelectItem value="free_shipping">شحن مجاني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(newPromotion.type === "percentage" ||
                  newPromotion.type === "fixed" ||
                  newPromotion.type === "second_unit") && (
                  <div className="space-y-2">
                    <Label>
                      {newPromotion.type === "percentage" ||
                      newPromotion.type === "second_unit"
                        ? "نسبة الخصم (%)"
                        : "قيمة الخصم"}
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step={
                        newPromotion.type === "percentage" ||
                        newPromotion.type === "second_unit"
                          ? "1"
                          : "0.01"
                      }
                      value={newPromotion.value}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          value: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              {newPromotion.type === "buy_x_get_y" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>اشتر (الكمية)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newPromotion.minQuantity}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          minQuantity: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>احصل على (الكمية)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newPromotion.freeQuantity}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          freeQuantity: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ البدء</Label>
                  <Input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ الانتهاء</Label>
                  <Input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select
                  value={newPromotion.status}
                  onValueChange={(value) =>
                    setNewPromotion({ ...newPromotion, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddPromotionDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // Here you would add the new promotion
                console.log("New promotion:", newPromotion);
                setShowAddPromotionDialog(false);
              }}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Products Dialog */}
      {selectedPromotion && (
        <PromotionProductsDialog
          open={showProductsDialog}
          onOpenChange={setShowProductsDialog}
          promotion={selectedPromotion}
          onSave={handleSavePromotion}
        />
      )}
    </div>
  );
};

export default PromotionsManagerEnhanced;
