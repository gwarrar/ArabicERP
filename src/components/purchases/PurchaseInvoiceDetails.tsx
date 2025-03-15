import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Calendar,
  User,
  ShoppingBag,
  DollarSign,
  Printer,
  Edit,
  X,
  FileText,
  Truck,
  Building,
  Ship,
  Package,
  Save,
  AlertCircle,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import StatusBadge from "../shared/StatusBadge";
import PurchaseOrderForm from "./PurchaseOrderForm";

interface PurchaseInvoiceDetailsProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
  onSave: (updatedInvoice: any) => void;
}

const PurchaseInvoiceDetails: React.FC<PurchaseInvoiceDetailsProps> = ({
  open,
  onClose,
  invoice,
  onSave,
}) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [showContainerDialog, setShowContainerDialog] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [actualQuantities, setActualQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [actualWeights, setActualWeights] = useState<{ [key: string]: number }>(
    {},
  );
  const [actualLengths, setActualLengths] = useState<{ [key: string]: number }>(
    {},
  );
  const [itemNotes, setItemNotes] = useState<{ [key: string]: string }>({});
  const [isRecordingActuals, setIsRecordingActuals] = useState(false);

  // قائمة الكونتينرات المتاحة (بيانات تجريبية)
  const availableContainers = [
    { id: "CNT-001", name: "كونتينر الملابس الشتوية" },
    { id: "CNT-002", name: "كونتينر الأحذية" },
    { id: "CNT-003", name: "كونتينر الإكسسوارات" },
  ];

  useEffect(() => {
    if (invoice) {
      setInvoiceData(invoice);

      // تهيئة الكميات الفعلية من البيانات الموجودة أو استخدام الكميات المتوقعة كقيم افتراضية
      const initialQuantities: { [key: string]: number } = {};
      const initialWeights: { [key: string]: number } = {};
      const initialLengths: { [key: string]: number } = {};
      const initialNotes: { [key: string]: string } = {};

      invoice.items.forEach((item: any, index: number) => {
        initialQuantities[index] = item.actualQuantity || item.quantity;
        initialWeights[index] = item.actualWeight || 0;
        initialLengths[index] = item.actualLength || 0;
        initialNotes[index] = item.notes || "";
      });

      setActualQuantities(initialQuantities);
      setActualWeights(initialWeights);
      setActualLengths(initialLengths);
      setItemNotes(initialNotes);
    }
  }, [invoice]);

  const handleQuantityChange = (index: number, value: number) => {
    setActualQuantities((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleWeightChange = (index: number, value: number) => {
    setActualWeights((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleLengthChange = (index: number, value: number) => {
    setActualLengths((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleNotesChange = (index: number, value: string) => {
    setItemNotes((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleRecordActuals = () => {
    if (!invoiceData) return;

    // تحديث بيانات الفاتورة بالكميات الفعلية
    const updatedItems = invoiceData.items.map((item: any, index: number) => ({
      ...item,
      actualQuantity: actualQuantities[index],
      actualWeight: actualWeights[index],
      actualLength: actualLengths[index],
      notes: itemNotes[index],
    }));

    const updatedInvoice = {
      ...invoiceData,
      items: updatedItems,
      status: "received", // تحديث حالة الفاتورة إلى "مستلمة"
      receivedDate: new Date().toISOString().split("T")[0], // تاريخ الاستلام
    };

    setInvoiceData(updatedInvoice);
    setIsRecordingActuals(false);
    onSave(updatedInvoice);
  };

  const handleAddToContainer = () => {
    setShowContainerDialog(true);
  };

  const confirmAddToContainer = () => {
    if (!invoiceData || !selectedContainer) return;

    // تحديث بيانات الفاتورة بمعلومات الكونتينر
    const updatedInvoice = {
      ...invoiceData,
      containerId: selectedContainer,
      containerName:
        availableContainers.find((c) => c.id === selectedContainer)?.name || "",
      status: "added_to_container", // تحديث حالة الفاتورة
    };

    setInvoiceData(updatedInvoice);
    setShowContainerDialog(false);
    onSave(updatedInvoice);
  };

  // Calculate totals
  const subtotal =
    invoice?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0,
    ) || 0;
  const totalDiscount = 0; // Can be calculated if discount data is available
  const totalTax = 0; // Can be calculated if tax data is available
  const total = subtotal - totalDiscount + totalTax;

  // Handle print invoice
  const handlePrint = () => {
    console.log("Printing invoice:", invoice?.id);
    window.print();
  };

  // Handle edit invoice
  const handleEdit = () => {
    setShowEditDialog(true);
  };

  // Handle save edited invoice
  const handleSaveEdit = () => {
    setShowEditDialog(false);
    console.log("Saving edited invoice:", invoice?.id);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "approved":
        return "معتمدة";
      case "received":
        return "مستلمة";
      case "added_to_container":
        return "مضافة إلى كونتينر";
      case "completed":
        return "مكتملة";
      case "cancelled":
        return "ملغية";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "received":
        return "bg-purple-100 text-purple-800";
      case "added_to_container":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!invoiceData) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                تفاصيل فاتورة المشتريات
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              عرض تفاصيل الفاتورة رقم {invoiceData.id}
            </DialogDescription>
          </DialogHeader>

          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <FileText className="h-4 w-4 ml-2" />
                  معلومات الفاتورة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الفاتورة:</span>
                  <span className="font-medium">{invoiceData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    رقم فاتورة المورد:
                  </span>
                  <span className="font-medium">{invoiceData.externalId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>{formatDate(invoiceData.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    تاريخ الاستحقاق:
                  </span>
                  <span>{formatDate(invoiceData.dueDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الحالة:</span>
                  <Badge className={getStatusClass(invoiceData.status)}>
                    {getStatusText(invoiceData.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Truck className="h-4 w-4 ml-2" />
                  معلومات المورد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المورد:</span>
                  <span className="font-medium">{invoiceData.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span>0501234567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    البريد الإلكتروني:
                  </span>
                  <span>info@supplier.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العنوان:</span>
                  <span>كييف، أوكرانيا</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Building className="h-4 w-4 ml-2" />
                  معلومات الاستلام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الفرع:</span>
                  <span>{invoiceData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المستودع:</span>
                  <span>المستودع الرئيسي</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    المبلغ الإجمالي:
                  </span>
                  <span className="font-medium">
                    {formatCurrency(invoiceData.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الأصناف:</span>
                  <span>{invoiceData.items.length}</span>
                </div>
                {invoiceData.containerId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الكونتينر:</span>
                    <span>
                      {invoiceData.containerName} ({invoiceData.containerId})
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Invoice Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">بنود الفاتورة</h3>
              {!isRecordingActuals && invoiceData.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRecordingActuals(true)}
                >
                  <Package className="ml-2 h-4 w-4" />
                  تسجيل الكميات الفعلية
                </Button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead className="text-center">
                      الكمية المتوقعة
                    </TableHead>
                    {(isRecordingActuals ||
                      invoiceData.status !== "pending") && (
                      <>
                        <TableHead className="text-center">
                          الكمية الفعلية
                        </TableHead>
                        <TableHead className="text-center">
                          الوزن (كجم)
                        </TableHead>
                        <TableHead className="text-center">
                          الطول (متر)
                        </TableHead>
                      </>
                    )}
                    <TableHead className="text-center">سعر الوحدة</TableHead>
                    <TableHead className="text-center">الإجمالي</TableHead>
                    {(isRecordingActuals ||
                      invoiceData.status !== "pending") && (
                      <TableHead className="text-center">ملاحظات</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.items.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      {(isRecordingActuals ||
                        invoiceData.status !== "pending") && (
                        <>
                          <TableCell className="text-center">
                            {isRecordingActuals ? (
                              <Input
                                type="number"
                                value={actualQuantities[index]}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    parseFloat(e.target.value),
                                  )
                                }
                                className="w-20 mx-auto text-center"
                              />
                            ) : (
                              item.actualQuantity || item.quantity
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {isRecordingActuals ? (
                              <Input
                                type="number"
                                value={actualWeights[index]}
                                onChange={(e) =>
                                  handleWeightChange(
                                    index,
                                    parseFloat(e.target.value),
                                  )
                                }
                                className="w-20 mx-auto text-center"
                              />
                            ) : (
                              item.actualWeight || "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {isRecordingActuals ? (
                              <Input
                                type="number"
                                value={actualLengths[index]}
                                onChange={(e) =>
                                  handleLengthChange(
                                    index,
                                    parseFloat(e.target.value),
                                  )
                                }
                                className="w-20 mx-auto text-center"
                              />
                            ) : (
                              item.actualLength || "-"
                            )}
                          </TableCell>
                        </>
                      )}
                      <TableCell className="text-center">
                        {item.price.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-center">
                        {item.total.toLocaleString()} ₴
                      </TableCell>
                      {(isRecordingActuals ||
                        invoiceData.status !== "pending") && (
                        <TableCell>
                          {isRecordingActuals ? (
                            <Textarea
                              value={itemNotes[index]}
                              onChange={(e) =>
                                handleNotesChange(index, e.target.value)
                              }
                              className="min-h-[60px] text-sm"
                              placeholder="أي ملاحظات عن الجودة أو الاختلافات"
                            />
                          ) : (
                            item.notes || "-"
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end mb-6">
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي:</span>
                <span>{subtotal.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي الخصم:</span>
                <span>{totalDiscount.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  إجمالي الضريبة (15%):
                </span>
                <span>{totalTax.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>الإجمالي:</span>
                <span>{invoiceData.amount.toLocaleString()} ₴</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">ملاحظات</h3>
            <div className="border rounded-lg p-3 bg-muted/20">
              <p className="text-muted-foreground">
                {invoiceData.notes || "لا توجد ملاحظات"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 justify-end w-full">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="ml-2 h-4 w-4" />
                طباعة
              </Button>

              {isRecordingActuals && (
                <Button onClick={handleRecordActuals}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ الكميات الفعلية
                </Button>
              )}

              {invoiceData.status === "received" &&
                !invoiceData.containerId && (
                  <Button variant="secondary" onClick={handleAddToContainer}>
                    <Ship className="ml-2 h-4 w-4" />
                    تجميع في كونتينر
                  </Button>
                )}

              <Button onClick={handleEdit}>
                <Edit className="ml-2 h-4 w-4" />
                تعديل
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => !open && setShowEditDialog(false)}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                تعديل فاتورة المشتريات
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEditDialog(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              تعديل الفاتورة رقم {invoiceData.id}
            </DialogDescription>
          </DialogHeader>

          <PurchaseOrderForm onSave={handleSaveEdit} />
        </DialogContent>
      </Dialog>

      {/* نافذة إضافة الفاتورة إلى كونتينر */}
      <Dialog open={showContainerDialog} onOpenChange={setShowContainerDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة الفاتورة إلى كونتينر</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center p-4 mb-4 text-blue-800 border border-blue-200 rounded-lg bg-blue-50">
              <AlertCircle className="h-5 w-5 ml-2 text-blue-600" />
              <div>
                <p className="text-sm">
                  سيتم إضافة هذه الفاتورة إلى الكونتينر المحدد لتتبع الشحنة بشكل
                  أفضل.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  اختر الكونتينر
                </label>
                <Select
                  value={selectedContainer}
                  onValueChange={setSelectedContainer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الكونتينر" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableContainers.map((container) => (
                      <SelectItem key={container.id} value={container.id}>
                        {container.name} ({container.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="createNew" className="ml-2" />
                <label htmlFor="createNew" className="text-sm">
                  إنشاء كونتينر جديد
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowContainerDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={confirmAddToContainer}
              disabled={!selectedContainer}
            >
              إضافة إلى الكونتينر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchaseInvoiceDetails;
