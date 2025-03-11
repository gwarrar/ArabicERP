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
import { Container, ContainerItem } from "@/types/inventory";
import {
  ContainerCostDistribution as CostDistributionType,
  ContainerCostDistributionItem,
} from "@/types/shipping";
import {
  DollarSign,
  Calculator,
  Save,
  X,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface ContainerCostDistributionProps {
  open: boolean;
  onClose: () => void;
  container: Container;
  onSave: (costDistribution: CostDistributionType) => void;
}

const ContainerCostDistribution: React.FC<ContainerCostDistributionProps> = ({
  open,
  onClose,
  container,
  onSave,
}) => {
  const [distributionMethod, setDistributionMethod] =
    useState<string>("by_value");
  const [distributionItems, setDistributionItems] = useState<
    Record<string, ContainerCostDistributionItem>
  >({});
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // حساب إجمالي مصاريف الكونتينر
  const totalExpenses =
    container?.expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  useEffect(() => {
    if (container) {
      // تهيئة عناصر التوزيع
      const initialItems: Record<string, ContainerCostDistributionItem> = {};

      // استخدام العناصر الفعلية إذا كانت موجودة، وإلا استخدام العناصر المتوقعة
      const items = container.actualItems || container.expectedItems;

      items.forEach((item) => {
        const actualQuantity = item.actualQuantity || item.expectedQuantity;
        const unitCost = item.unitPrice;
        const totalCost = actualQuantity * unitCost;

        initialItems[item.id] = {
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          quantity: actualQuantity,
          unit: item.unit,
          originalUnitCost: unitCost,
          originalTotalCost: totalCost,
          distributionFactor: 0, // سيتم حسابه لاحقاً
          distributionAmount: 0, // سيتم حسابه لاحقاً
          finalUnitCost: unitCost, // سيتم حسابه لاحقاً
          finalTotalCost: totalCost, // سيتم حسابه لاحقاً
        };
      });

      setDistributionItems(initialItems);
      calculateDistribution(initialItems, distributionMethod);
    }
  }, [container, distributionMethod]);

  // حساب توزيع التكاليف بناءً على الطريقة المختارة
  const calculateDistribution = (
    items: Record<string, ContainerCostDistributionItem>,
    method: string,
  ) => {
    if (
      !container ||
      !items ||
      Object.keys(items).length === 0 ||
      totalExpenses === 0
    )
      return;

    const updatedItems = { ...items };
    let totalFactor = 0;

    // حساب العامل الإجمالي حسب طريقة التوزيع
    switch (method) {
      case "by_value":
        // التوزيع حسب القيمة
        totalFactor = Object.values(items).reduce(
          (sum, item) => sum + item.originalTotalCost,
          0,
        );

        // حساب عامل التوزيع لكل عنصر
        Object.keys(items).forEach((itemId) => {
          const item = updatedItems[itemId];
          item.distributionFactor =
            totalFactor > 0 ? item.originalTotalCost / totalFactor : 0;
        });
        break;

      case "by_quantity":
        // التوزيع حسب الكمية
        totalFactor = Object.values(items).reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        // حساب عامل التوزيع لكل عنصر
        Object.keys(items).forEach((itemId) => {
          const item = updatedItems[itemId];
          item.distributionFactor =
            totalFactor > 0 ? item.quantity / totalFactor : 0;
        });
        break;

      case "by_weight":
        // التوزيع حسب الوزن (إذا كان متاحاً)
        const itemsWithWeight = Object.values(items).filter((item) => {
          const containerItem =
            container.actualItems?.find((i) => i.id === item.id) ||
            container.expectedItems.find((i) => i.id === item.id);
          return containerItem && containerItem.actualWeight;
        });

        if (itemsWithWeight.length === 0) {
          // إذا لم تكن هناك أوزان متاحة، استخدم التوزيع حسب القيمة
          calculateDistribution(items, "by_value");
          return;
        }

        totalFactor = itemsWithWeight.reduce((sum, item) => {
          const containerItem =
            container.actualItems?.find((i) => i.id === item.id) ||
            container.expectedItems.find((i) => i.id === item.id);
          return sum + (containerItem?.actualWeight || 0);
        }, 0);

        // حساب عامل التوزيع لكل عنصر
        Object.keys(items).forEach((itemId) => {
          const item = updatedItems[itemId];
          const containerItem =
            container.actualItems?.find((i) => i.id === item.id) ||
            container.expectedItems.find((i) => i.id === item.id);
          const weight = containerItem?.actualWeight || 0;
          item.distributionFactor = totalFactor > 0 ? weight / totalFactor : 0;
        });
        break;

      case "equal":
        // توزيع متساوي
        const itemCount = Object.keys(items).length;
        const equalFactor = 1 / itemCount;

        // تعيين عامل توزيع متساوٍ لكل عنصر
        Object.keys(items).forEach((itemId) => {
          updatedItems[itemId].distributionFactor = equalFactor;
        });
        break;

      default:
        // استخدام التوزيع حسب القيمة كافتراضي
        calculateDistribution(items, "by_value");
        return;
    }

    // حساب مبلغ التوزيع والتكلفة النهائية لكل عنصر
    Object.keys(updatedItems).forEach((itemId) => {
      const item = updatedItems[itemId];
      item.distributionAmount = totalExpenses * item.distributionFactor;
      item.finalTotalCost = item.originalTotalCost + item.distributionAmount;
      item.finalUnitCost =
        item.quantity > 0 ? item.finalTotalCost / item.quantity : 0;
    });

    setDistributionItems(updatedItems);
  };

  // تغيير طريقة التوزيع
  const handleDistributionMethodChange = (method: string) => {
    setDistributionMethod(method);
    calculateDistribution(distributionItems, method);
  };

  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // التحقق من وجود مصاريف للتوزيع
    if (totalExpenses <= 0) {
      newErrors["expenses"] = "لا توجد مصاريف للتوزيع";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // حفظ توزيع التكاليف
  const handleSubmit = () => {
    if (!validateForm()) return;

    // إنشاء كائن توزيع التكاليف
    const costDistribution: CostDistributionType = {
      id: `DIST-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(5, "0")}`,
      containerId: container.id,
      containerName: container.name,
      distributionDate: new Date().toISOString().split("T")[0],
      distributionMethod: distributionMethod as any,
      totalExpenses: totalExpenses,
      currency: "UAH",
      items: Object.values(distributionItems),
      notes: notes,
      createdBy: "المستخدم الحالي", // يجب استبداله بمعرف المستخدم الحالي
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // استدعاء دالة الحفظ
    onSave(costDistribution);
  };

  // الحصول على اسم طريقة التوزيع بالعربية
  const getDistributionMethodName = (method: string) => {
    switch (method) {
      case "by_value":
        return "حسب القيمة";
      case "by_quantity":
        return "حسب الكمية";
      case "by_weight":
        return "حسب الوزن";
      case "equal":
        return "توزيع متساوي";
      default:
        return method;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            توزيع تكاليف الكونتينر {container?.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات الكونتينر والمصاريف */}
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">اسم الكونتينر</p>
                <p className="font-medium">{container?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المورد</p>
                <p className="font-medium">{container?.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المصاريف</p>
                <p className="font-medium text-green-700">
                  {totalExpenses.toLocaleString()} ₴
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">عدد الأصناف</p>
                <p className="font-medium">
                  {Object.keys(distributionItems).length}
                </p>
              </div>
            </div>
          </div>

          {/* اختيار طريقة التوزيع */}
          <div>
            <label className="block text-sm font-medium mb-1">
              طريقة توزيع التكاليف
            </label>
            <Select
              value={distributionMethod}
              onValueChange={handleDistributionMethodChange}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="اختر طريقة التوزيع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="by_value">حسب القيمة</SelectItem>
                <SelectItem value="by_quantity">حسب الكمية</SelectItem>
                <SelectItem value="by_weight">حسب الوزن</SelectItem>
                <SelectItem value="equal">توزيع متساوي</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              {distributionMethod === "by_value" &&
                "توزيع المصاريف على المنتجات بنسبة قيمتها من إجمالي قيمة الكونتينر"}
              {distributionMethod === "by_quantity" &&
                "توزيع المصاريف على المنتجات بنسبة كمياتها من إجمالي كميات الكونتينر"}
              {distributionMethod === "by_weight" &&
                "توزيع المصاريف على المنتجات بنسبة أوزانها من إجمالي وزن الكونتينر"}
              {distributionMethod === "equal" &&
                "توزيع المصاريف بالتساوي على جميع المنتجات بغض النظر عن قيمتها أو كميتها"}
            </p>
            {errors["expenses"] && (
              <p className="text-red-500 text-sm mt-1">{errors["expenses"]}</p>
            )}
          </div>

          {/* جدول توزيع التكاليف */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              توزيع التكاليف على المنتجات
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-center">
                      التكلفة الأصلية للوحدة
                    </TableHead>
                    <TableHead className="text-center">
                      التكلفة الأصلية الإجمالية
                    </TableHead>
                    <TableHead className="text-center">نسبة التوزيع</TableHead>
                    <TableHead className="text-center">مبلغ التوزيع</TableHead>
                    <TableHead className="text-center">
                      التكلفة النهائية للوحدة
                    </TableHead>
                    <TableHead className="text-center">
                      التكلفة النهائية الإجمالية
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(distributionItems).map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.originalUnitCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.originalTotalCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {(item.distributionFactor * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-center">
                        {item.distributionAmount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.finalUnitCost.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.finalTotalCost.toLocaleString()} ₴
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ملخص التوزيع */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <DollarSign className="h-5 w-5 ml-2 mt-0.5 text-blue-600" />
              <div>
                <h3 className="font-medium mb-1">ملخص توزيع التكاليف</h3>
                <p className="text-sm text-blue-800">
                  تم توزيع إجمالي المصاريف ({totalExpenses.toLocaleString()} ₴)
                  على {Object.keys(distributionItems).length} منتج باستخدام
                  طريقة التوزيع "{getDistributionMethodName(distributionMethod)}
                  ". سيؤدي ذلك إلى زيادة تكلفة المنتجات بنسبة{" "}
                  {(
                    (totalExpenses /
                      Object.values(distributionItems).reduce(
                        (sum, item) => sum + item.originalTotalCost,
                        0,
                      )) *
                    100
                  ).toFixed(2)}
                  % في المتوسط.
                </p>
              </div>
            </div>
          </div>

          {/* ملاحظات */}
          <div>
            <label className="block text-sm font-medium mb-1">ملاحظات</label>
            <Textarea
              placeholder="أي ملاحظات إضافية حول توزيع التكاليف"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* تنبيه */}
          <div className="flex items-center p-4 text-amber-800 border border-amber-200 rounded-lg bg-amber-50">
            <AlertCircle className="h-5 w-5 ml-2 text-amber-600" />
            <div>
              <p className="text-sm">
                سيتم تحديث تكلفة المنتجات في المخزون بناءً على التكاليف النهائية
                بعد التوزيع. هذا سيؤثر على تقارير الربحية وتقييم المخزون.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 ml-1" />
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={totalExpenses <= 0}>
            <Save className="h-4 w-4 ml-1" />
            حفظ توزيع التكاليف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContainerCostDistribution;
