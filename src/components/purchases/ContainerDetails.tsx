import React, { useState } from "react";
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
  Printer,
  Edit,
  X,
  FileText,
  Truck,
  Ship,
  Package,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  Trash,
  Warehouse,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/utils/formatters";
import ContainerExpenseForm from "./ContainerExpenseForm";
import ContainerDocumentForm from "./ContainerDocumentForm";
import ReceiveContainer from "../inventory/ReceiveContainer";
import ContainerTrackingSystem from "./ContainerTrackingSystem";
import ContainerCostDistribution from "./ContainerCostDistribution";

interface ContainerDetailsProps {
  open: boolean;
  onClose: () => void;
  container: any;
  onSave: (updatedContainer: any) => void;
}

const ContainerDetails: React.FC<ContainerDetailsProps> = ({
  open,
  onClose,
  container,
  onSave,
}) => {
  const [containerData, setContainerData] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showExpensesDialog, setShowExpensesDialog] = useState(false);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showTrackingDialog, setShowTrackingDialog] = useState(false);
  const [showCostDistributionDialog, setShowCostDistributionDialog] =
    useState(false);
  const [activeTab, setActiveTab] = useState<
    "items" | "invoices" | "expenses" | "documents"
  >("items");

  // قائمة المستودعات (بيانات تجريبية)
  const warehouses = [
    { id: "WH-001", name: "المستودع الرئيسي" },
    { id: "WH-002", name: "مستودع المواد الخام" },
    { id: "WH-003", name: "مستودع المنتجات الجاهزة" },
  ];

  React.useEffect(() => {
    if (container) {
      setContainerData(container);
    }
  }, [container]);

  if (!containerData) return null;

  // حساب إجماليات الكونتينر
  const totalItems = containerData.expectedItems.reduce(
    (sum: number, item: any) => sum + item.expectedQuantity,
    0,
  );

  const totalValue = containerData.expectedItems.reduce(
    (sum: number, item: any) => sum + item.totalPrice,
    0,
  );

  // حساب نسبة الاكتمال
  const getCompletionPercentage = () => {
    switch (containerData.status) {
      case "pending":
        return 10;
      case "in_transit":
        return 40;
      case "arrived":
        return 60;
      case "cleared":
        return 80;
      case "received":
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  // تحويل حالة الكونتينر إلى نص عربي
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "in_transit":
        return "في الطريق";
      case "arrived":
        return "وصل";
      case "cleared":
        return "تم التخليص";
      case "received":
        return "تم الاستلام";
      case "completed":
        return "مكتمل";
      default:
        return status;
    }
  };

  // تحديد لون حالة الكونتينر
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "arrived":
        return "bg-purple-100 text-purple-800";
      case "cleared":
        return "bg-indigo-100 text-indigo-800";
      case "received":
        return "bg-cyan-100 text-cyan-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // تحديث حالة الكونتينر
  const updateContainerStatus = (newStatus: string) => {
    const updatedContainer = {
      ...containerData,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    // إضافة تاريخ الوصول إذا كانت الحالة الجديدة هي "وصل"
    if (newStatus === "arrived" && !updatedContainer.arrivalDate) {
      updatedContainer.arrivalDate = new Date().toISOString().split("T")[0];
    }

    setContainerData(updatedContainer);
    onSave(updatedContainer);
  };

  // Handle print container details
  const handlePrint = () => {
    console.log("Printing container details:", containerData?.id);
    window.print();
  };

  // Handle edit container
  const handleEdit = () => {
    setShowEditDialog(true);
  };

  // Handle add expense
  const handleAddExpense = (expense: any) => {
    const updatedContainer = {
      ...containerData,
      expenses: [...(containerData.expenses || []), expense],
      updatedAt: new Date().toISOString(),
    };
    setContainerData(updatedContainer);
    onSave(updatedContainer);
    setShowExpensesDialog(false);
  };

  // Handle add document
  const handleAddDocument = (document: any) => {
    const updatedContainer = {
      ...containerData,
      documents: [...(containerData.documents || []), document],
      updatedAt: new Date().toISOString(),
    };
    setContainerData(updatedContainer);
    onSave(updatedContainer);
    setShowDocumentDialog(false);
  };

  // Handle receive container
  const handleReceiveContainer = (
    updatedContainer: any,
    stockMovement: any,
  ) => {
    setContainerData(updatedContainer);
    onSave(updatedContainer);
    setShowReceiveDialog(false);

    // في التطبيق الحقيقي، هنا سيتم إرسال حركة المخزون إلى الخادم
    console.log("Stock Movement Created:", stockMovement);
  };

  // Handle cost distribution
  const handleCostDistribution = (costDistribution: any) => {
    // في التطبيق الحقيقي، هنا سيتم حفظ توزيع التكاليف وتحديث تكلفة المنتجات
    console.log("Cost Distribution Created:", costDistribution);
    setShowCostDistributionDialog(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              تفاصيل الكونتينر
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
            عرض تفاصيل الكونتينر رقم {containerData.id}
          </DialogDescription>
        </DialogHeader>

        {/* Container Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Ship className="h-4 w-4 ml-2" />
                معلومات الكونتينر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم الكونتينر:</span>
                <span className="font-medium">{containerData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الاسم:</span>
                <span className="font-medium">{containerData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم التتبع:</span>
                <span>{containerData.trackingNumber || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">النوع:</span>
                <span>{containerData.containerType || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحجم:</span>
                <span>{containerData.containerSize || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge className={getStatusColor(containerData.status)}>
                  {getStatusText(containerData.status)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Truck className="h-4 w-4 ml-2" />
                معلومات الشحن
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المورد:</span>
                <span className="font-medium">{containerData.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">بلد المنشأ:</span>
                <span>{containerData.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الوجهة:</span>
                <span>{containerData.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شركة الشحن:</span>
                <span>{containerData.shippingCompany || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  تاريخ الوصول المتوقع:
                </span>
                <span>{containerData.expectedArrivalDate || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  تاريخ الوصول الفعلي:
                </span>
                <span>{containerData.arrivalDate || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Package className="h-4 w-4 ml-2" />
                ملخص المحتويات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">عدد الأصناف:</span>
                <span>{containerData.expectedItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي الكميات:</span>
                <span>{totalItems} قطعة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">القيمة الإجمالية:</span>
                <span className="font-medium">
                  {totalValue.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                <span>{containerData.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخر تحديث:</span>
                <span>{containerData.updatedAt}</span>
              </div>
              <div className="mt-2">
                <span className="text-muted-foreground text-sm">
                  نسبة الاكتمال:
                </span>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${activeTab === "items" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("items")}
            >
              محتويات الكونتينر
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "invoices" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("invoices")}
            >
              الفواتير المرتبطة
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "expenses" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("expenses")}
            >
              المصاريف
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "documents" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => setActiveTab("documents")}
            >
              المستندات
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "items" && (
          <div className="border rounded-lg overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center">#</TableHead>
                  <TableHead>المنتج</TableHead>
                  <TableHead className="text-center">الكمية المتوقعة</TableHead>
                  <TableHead className="text-center">الكمية الفعلية</TableHead>
                  <TableHead className="text-center">سعر الوحدة</TableHead>
                  <TableHead className="text-center">الإجمالي</TableHead>
                  <TableHead className="text-center">ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {containerData.expectedItems.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-center">
                      {item.expectedQuantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.actualQuantity || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.unitPrice.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-center">
                      {item.totalPrice.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>{item.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="border rounded-lg overflow-hidden mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الفاتورة</TableHead>
                  <TableHead>المورد</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead className="text-center">المبلغ</TableHead>
                  <TableHead className="text-center">الحالة</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {containerData.linkedInvoices &&
                containerData.linkedInvoices.length > 0 ? (
                  containerData.linkedInvoices.map(
                    (invoice: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {invoice.id}
                        </TableCell>
                        <TableCell>{invoice.supplier}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell className="text-center">
                          {invoice.amount.toLocaleString()} ₴
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-blue-100 text-blue-800">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4 ml-1" />
                            عرض
                          </Button>
                        </TableCell>
                      </TableRow>
                    ),
                  )
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-4 text-muted-foreground"
                    >
                      لا توجد فواتير مرتبطة بهذا الكونتينر
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">مصاريف الكونتينر</h3>
              <Button size="sm" onClick={() => setShowExpensesDialog(true)}>
                <Plus className="h-4 w-4 ml-1" />
                إضافة مصروف
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-blue-700 flex justify-between items-center">
                    <span>إجمالي المصاريف</span>
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">
                    {(
                      containerData.expenses?.reduce(
                        (sum: number, exp: any) => sum + exp.amount,
                        0,
                      ) || 0
                    ).toLocaleString()}{" "}
                    ₴
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-700 flex justify-between items-center">
                    <span>المصاريف المدفوعة</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {(
                      containerData.expenses
                        ?.filter((exp: any) => exp.paymentStatus === "paid")
                        .reduce(
                          (sum: number, exp: any) => sum + exp.amount,
                          0,
                        ) || 0
                    ).toLocaleString()}{" "}
                    ₴
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-red-700 flex justify-between items-center">
                    <span>المصاريف المستحقة</span>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">
                    {(
                      containerData.expenses
                        ?.filter((exp: any) => exp.paymentStatus === "pending")
                        .reduce(
                          (sum: number, exp: any) => sum + exp.amount,
                          0,
                        ) || 0
                    ).toLocaleString()}{" "}
                    ₴
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>نوع المصروف</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead className="text-center">المبلغ</TableHead>
                    <TableHead className="text-center">حالة الدفع</TableHead>
                    <TableHead className="text-center">المستفيد</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {containerData.expenses &&
                  containerData.expenses.length > 0 ? (
                    containerData.expenses.map(
                      (expense: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{expense.expenseType}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell className="text-center">
                            {expense.amount.toLocaleString()} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                expense.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }
                            >
                              {expense.paymentStatus === "paid"
                                ? "مدفوع"
                                : "قيد الانتظار"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {expense.beneficiary}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        لا توجد مصاريف مسجلة لهذا الكونتينر
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">مستندات الكونتينر</h3>
              <Button size="sm" onClick={() => setShowDocumentDialog(true)}>
                <Plus className="h-4 w-4 ml-1" />
                إضافة مستند
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المستند</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>تاريخ الرفع</TableHead>
                    <TableHead>الحجم</TableHead>
                    <TableHead className="text-center">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {containerData.documents &&
                  containerData.documents.length > 0 ? (
                    containerData.documents.map((doc: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadedAt}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        لا توجد مستندات مرفقة لهذا الكونتينر
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Container Status Update */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">تحديث حالة الكونتينر</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={
                containerData.status === "pending" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("pending")}
              disabled={containerData.status === "pending"}
            >
              قيد الانتظار
            </Button>
            <Button
              variant={
                containerData.status === "in_transit" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("in_transit")}
              disabled={containerData.status === "in_transit"}
            >
              في الطريق
            </Button>
            <Button
              variant={
                containerData.status === "arrived" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("arrived")}
              disabled={containerData.status === "arrived"}
            >
              وصل
            </Button>
            <Button
              variant={
                containerData.status === "cleared" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("cleared")}
              disabled={containerData.status === "cleared"}
            >
              تم التخليص
            </Button>
            {containerData.status === "cleared" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowReceiveDialog(true)}
                className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
              >
                <Warehouse className="h-4 w-4 ml-1" />
                استلام في المخزون
              </Button>
            )}
            <Button
              variant={
                containerData.status === "received" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("received")}
              disabled={
                containerData.status === "received" ||
                containerData.status !== "cleared"
              }
            >
              تم الاستلام
            </Button>
            <Button
              variant={
                containerData.status === "completed" ? "default" : "outline"
              }
              size="sm"
              onClick={() => updateContainerStatus("completed")}
              disabled={containerData.status === "completed"}
            >
              مكتمل
            </Button>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">إجراءات إضافية</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTrackingDialog(true)}
              className="flex items-center"
            >
              <Ship className="h-4 w-4 ml-1" />
              تتبع الشحنة
            </Button>
            {(containerData.status === "received" ||
              containerData.status === "completed") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCostDistributionDialog(true)}
                className="flex items-center"
              >
                <DollarSign className="h-4 w-4 ml-1" />
                توزيع التكاليف
              </Button>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">ملاحظات</h3>
          <div className="border rounded-lg p-3 bg-muted/20">
            <p className="text-muted-foreground">
              {containerData.notes || "لا توجد ملاحظات"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="ml-2 h-4 w-4" />
              طباعة
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

      {/* نافذة إضافة مصروف جديد */}
      <ContainerExpenseForm
        open={showExpensesDialog}
        onClose={() => setShowExpensesDialog(false)}
        onSave={handleAddExpense}
        containerId={containerData.id}
      />

      {/* نافذة إضافة مستند جديد */}
      <ContainerDocumentForm
        open={showDocumentDialog}
        onClose={() => setShowDocumentDialog(false)}
        onSave={handleAddDocument}
        containerId={containerData.id}
      />

      {/* نافذة استلام الكونتينر في المخزون */}
      {containerData && (
        <ReceiveContainer
          open={showReceiveDialog}
          onClose={() => setShowReceiveDialog(false)}
          container={containerData}
          onReceive={handleReceiveContainer}
          warehouses={warehouses}
        />
      )}

      {/* نافذة تتبع الشحنة */}
      {containerData && (
        <ContainerTrackingSystem
          open={showTrackingDialog}
          onClose={() => setShowTrackingDialog(false)}
          container={containerData}
        />
      )}

      {/* نافذة توزيع التكاليف */}
      {containerData && (
        <ContainerCostDistribution
          open={showCostDistributionDialog}
          onClose={() => setShowCostDistributionDialog(false)}
          container={containerData}
          onSave={handleCostDistribution}
        />
      )}
    </Dialog>
  );
};

export default ContainerDetails;
