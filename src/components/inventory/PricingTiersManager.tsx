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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash, Percent } from "lucide-react";

import { priceTiers, customerTypes } from "@/data/pricingData";

interface PricingTiersManagerProps {
  onSave?: () => void;
}

const PricingTiersManager: React.FC<PricingTiersManagerProps> = ({
  onSave,
}) => {
  const [showAddTierDialog, setShowAddTierDialog] = useState(false);
  const [showAddCustomerTypeDialog, setShowAddCustomerTypeDialog] =
    useState(false);
  const [newTier, setNewTier] = useState({
    name: "",
    description: "",
    markup: 1.5,
    minQuantity: 0,
    status: "active",
  });
  const [newCustomerType, setNewCustomerType] = useState({
    name: "",
    description: "",
    defaultPriceTierId: "retail",
    discountPercentage: 0,
    status: "active",
  });

  return (
    <div className="space-y-6">
      {/* Price Tiers Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">مستويات الأسعار</h3>
          <Button size="sm" onClick={() => setShowAddTierDialog(true)}>
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
      </div>

      {/* Customer Types Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">أنواع العملاء</h3>
          <Button size="sm" onClick={() => setShowAddCustomerTypeDialog(true)}>
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
                      {priceTiers.find((t) => t.id === type.defaultPriceTierId)
                        ?.name || "-"}
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
      </div>

      {/* Add Price Tier Dialog */}
      <Dialog open={showAddTierDialog} onOpenChange={setShowAddTierDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة مستوى سعر جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم المستوى</Label>
              <Input
                value={newTier.name}
                onChange={(e) =>
                  setNewTier({ ...newTier, name: e.target.value })
                }
                placeholder="مثال: سعر الجملة"
              />
            </div>

            <div className="space-y-2">
              <Label>الوصف</Label>
              <Input
                value={newTier.description}
                onChange={(e) =>
                  setNewTier({ ...newTier, description: e.target.value })
                }
                placeholder="وصف مختصر للمستوى"
              />
            </div>

            <div className="space-y-2">
              <Label>نسبة الهامش (%)</Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  step="5"
                  value={((newTier.markup - 1) * 100).toString()}
                  onChange={(e) =>
                    setNewTier({
                      ...newTier,
                      markup: 1 + parseInt(e.target.value) / 100 || 1,
                    })
                  }
                />
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>الحد الأدنى للكمية</Label>
              <Input
                type="number"
                min="0"
                value={newTier.minQuantity}
                onChange={(e) =>
                  setNewTier({
                    ...newTier,
                    minQuantity: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="اترك 0 إذا لم يكن هناك حد أدنى"
              />
            </div>

            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select
                value={newTier.status}
                onValueChange={(value) =>
                  setNewTier({
                    ...newTier,
                    status: value as "active" | "inactive",
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
              onClick={() => setShowAddTierDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // Here you would add the new tier to the database
                console.log("New tier:", newTier);
                setShowAddTierDialog(false);
                if (onSave) onSave();
              }}
            >
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Customer Type Dialog */}
      <Dialog
        open={showAddCustomerTypeDialog}
        onOpenChange={setShowAddCustomerTypeDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة نوع عميل جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>اسم نوع العميل</Label>
              <Input
                value={newCustomerType.name}
                onChange={(e) =>
                  setNewCustomerType({
                    ...newCustomerType,
                    name: e.target.value,
                  })
                }
                placeholder="مثال: تاجر جملة"
              />
            </div>

            <div className="space-y-2">
              <Label>الوصف</Label>
              <Input
                value={newCustomerType.description}
                onChange={(e) =>
                  setNewCustomerType({
                    ...newCustomerType,
                    description: e.target.value,
                  })
                }
                placeholder="وصف مختصر لنوع العميل"
              />
            </div>

            <div className="space-y-2">
              <Label>مستوى السعر الافتراضي</Label>
              <Select
                value={newCustomerType.defaultPriceTierId}
                onValueChange={(value) =>
                  setNewCustomerType({
                    ...newCustomerType,
                    defaultPriceTierId: value,
                  })
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
              <Label>نسبة الخصم الإضافي (%)</Label>
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={newCustomerType.discountPercentage}
                  onChange={(e) =>
                    setNewCustomerType({
                      ...newCustomerType,
                      discountPercentage: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select
                value={newCustomerType.status}
                onValueChange={(value) =>
                  setNewCustomerType({
                    ...newCustomerType,
                    status: value as "active" | "inactive",
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
              onClick={() => setShowAddCustomerTypeDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // Here you would add the new customer type to the database
                console.log("New customer type:", newCustomerType);
                setShowAddCustomerTypeDialog(false);
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

export default PricingTiersManager;
