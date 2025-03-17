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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Edit,
  Trash,
  Calendar,
  Percent,
  Tag,
  Package,
  Users,
  Search,
  Filter,
} from "lucide-react";

import { promotions, productGroups, customerTypes } from "@/data/pricingData";
import { products } from "@/data/products";

interface PromotionsManagerProps {
  onSave?: () => void;
}

const PromotionsManager: React.FC<PromotionsManagerProps> = ({ onSave }) => {
  const [showAddPromotionDialog, setShowAddPromotionDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    description: "",
    type: "percentage",
    value: 10,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    minPurchaseAmount: 0,
    minQuantity: 0,
    productIds: [] as string[],
    productGroupIds: [] as string[],
    customerTierIds: [] as string[],
    status: "active",
  });

  // Filter promotions based on search and filters
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      searchTerm === "" ||
      promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || promo.status === statusFilter;
    const matchesType = typeFilter === "all" || promo.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get active promotions
  const activePromotions = promotions.filter(
    (promo) => promo.status === "active",
  );

  // Get upcoming promotions
  const upcomingPromotions = promotions.filter((promo) => {
    const now = new Date();
    const startDate = new Date(promo.startDate);
    return promo.status === "active" && startDate > now;
  });

  // Get expiring soon promotions (within 7 days)
  const expiringSoonPromotions = promotions.filter((promo) => {
    const now = new Date();
    const endDate = new Date(promo.endDate);
    const daysUntilExpiry = Math.floor(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return (
      promo.status === "active" && daysUntilExpiry >= 0 && daysUntilExpiry <= 7
    );
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">العروض النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePromotions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">العروض القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingPromotions.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">تنتهي قريباً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {expiringSoonPromotions.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">العروض والتخفيضات</h3>
          <Button size="sm" onClick={() => setShowAddPromotionDialog(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة عرض جديد
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="w-[200px] pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="expired">منتهي</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="نوع العرض" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="percentage">نسبة مئوية</SelectItem>
              <SelectItem value="fixed">مبلغ ثابت</SelectItem>
              <SelectItem value="buy_x_get_y">اشتر X واحصل على Y</SelectItem>
              <SelectItem value="bundle">حزمة منتجات</SelectItem>
              <SelectItem value="second_unit">الوحدة الثانية</SelectItem>
              <SelectItem value="free_shipping">شحن مجاني</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
            className="h-10"
          >
            <Filter className="h-4 w-4 ml-1" />
            إعادة ضبط
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم العرض</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>القيمة</TableHead>
                  <TableHead>تاريخ البدء</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>المنتجات</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="w-[100px]">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.length > 0 ? (
                  filteredPromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{promo.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {promo.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {promo.type === "percentage"
                            ? "نسبة مئوية"
                            : promo.type === "fixed"
                              ? "مبلغ ثابت"
                              : promo.type === "buy_x_get_y"
                                ? "اشتر X واحصل على Y"
                                : promo.type === "bundle"
                                  ? "حزمة منتجات"
                                  : promo.type === "second_unit"
                                    ? "الوحدة الثانية"
                                    : "شحن مجاني"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {promo.type === "percentage" ||
                        promo.type === "second_unit"
                          ? `${promo.value}%`
                          : promo.type === "fixed"
                            ? `${promo.value} ₴`
                            : promo.type === "buy_x_get_y"
                              ? `${promo.minQuantity} + ${promo.freeQuantity || 1}`
                              : "-"}
                      </TableCell>
                      <TableCell>
                        {new Date(promo.startDate).toLocaleDateString("ar-EG")}
                      </TableCell>
                      <TableCell>
                        {new Date(promo.endDate).toLocaleDateString("ar-EG")}
                      </TableCell>
                      <TableCell>
                        {promo.productIds?.length
                          ? `${promo.productIds.length} منتج`
                          : promo.productGroupIds?.length
                            ? `${promo.productGroupIds.length} مجموعة`
                            : "جميع المنتجات"}
                      </TableCell>
                      <TableCell>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Tag className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد عروض مطابقة للبحث</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Promotion Dialog */}
      <Dialog
        open={showAddPromotionDialog}
        onOpenChange={setShowAddPromotionDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عرض جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label>اسم العرض</Label>
              <Input
                value={newPromotion.name}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, name: e.target.value })
                }
                placeholder="مثال: تخفيضات الصيف"
              />
            </div>

            <div className="space-y-2">
              <Label>الوصف</Label>
              <Input
                value={newPromotion.description}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    description: e.target.value,
                  })
                }
                placeholder="وصف مختصر للعرض"
              />
            </div>

            <div className="space-y-2">
              <Label>نوع العرض</Label>
              <Select
                value={newPromotion.type}
                onValueChange={(value) =>
                  setNewPromotion({
                    ...newPromotion,
                    type: value as any,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">نسبة مئوية</SelectItem>
                  <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                  <SelectItem value="second_unit">الوحدة الثانية</SelectItem>
                  <SelectItem value="buy_x_get_y">
                    اشتر X واحصل على Y
                  </SelectItem>
                  <SelectItem value="bundle">حزمة منتجات</SelectItem>
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
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    value={newPromotion.value}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        value: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  {(newPromotion.type === "percentage" ||
                    newPromotion.type === "second_unit") && (
                    <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>تاريخ البدء</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pr-9"
                    value={newPromotion.startDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>تاريخ الانتهاء</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pr-9"
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
            </div>

            {(newPromotion.type === "buy_x_get_y" ||
              newPromotion.type === "second_unit") && (
              <div className="space-y-2">
                <Label>الحد الأدنى للكمية</Label>
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
            )}

            {newPromotion.type !== "free_shipping" && (
              <div className="space-y-2">
                <Label>الحد الأدنى لقيمة المشتريات</Label>
                <Input
                  type="number"
                  min="0"
                  value={newPromotion.minPurchaseAmount}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      minPurchaseAmount: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="اترك 0 إذا لم يكن هناك حد أدنى"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>أنواع العملاء المستهدفة</Label>
              <div className="border rounded-md p-4 space-y-2">
                {customerTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <Checkbox
                      id={`customer-${type.id}`}
                      checked={newPromotion.customerTierIds.includes(type.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewPromotion({
                            ...newPromotion,
                            customerTierIds: [
                              ...newPromotion.customerTierIds,
                              type.id,
                            ],
                          });
                        } else {
                          setNewPromotion({
                            ...newPromotion,
                            customerTierIds:
                              newPromotion.customerTierIds.filter(
                                (id) => id !== type.id,
                              ),
                          });
                        }
                      }}
                    />
                    <Label
                      htmlFor={`customer-${type.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.name}
                    </Label>
                  </div>
                ))}
                <div className="text-xs text-muted-foreground mt-2">
                  إذا لم يتم تحديد أي نوع، سيتم تطبيق العرض على جميع أنواع
                  العملاء
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select
                value={newPromotion.status}
                onValueChange={(value) =>
                  setNewPromotion({
                    ...newPromotion,
                    status: value as "active" | "inactive" | "expired",
                  })
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddPromotionDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // Here you would add the new promotion to the database
                console.log("New promotion:", newPromotion);
                setShowAddPromotionDialog(false);
                if (onSave) onSave();
              }}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromotionsManager;
