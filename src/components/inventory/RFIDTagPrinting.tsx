import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Printer,
  Tag,
  Package,
  Warehouse,
  ArrowRightLeft,
  Plus,
  Download,
  QrCode,
  Settings,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const RFIDTagPrinting = () => {
  const [tagType, setTagType] = useState("product");
  const [quantity, setQuantity] = useState("10");
  const [printStatus, setPrintStatus] = useState<
    "idle" | "printing" | "success" | "error"
  >("idle");
  const [printJobs, setPrintJobs] = useState<any[]>([
    {
      id: "PJ-001",
      type: "product",
      quantity: 50,
      status: "completed",
      createdAt: "2024-08-20 14:30",
      createdBy: "أحمد محمد",
    },
    {
      id: "PJ-002",
      type: "location",
      quantity: 30,
      status: "completed",
      createdAt: "2024-08-18 10:15",
      createdBy: "محمد علي",
    },
    {
      id: "PJ-003",
      type: "shipment",
      quantity: 25,
      status: "error",
      createdAt: "2024-08-15 09:45",
      createdBy: "خالد العبدالله",
    },
  ]);

  // Handle print job creation
  const handleCreatePrintJob = () => {
    setPrintStatus("printing");

    // Simulate printing process
    setTimeout(() => {
      setPrintStatus("success");

      // Add new print job to the list
      const newPrintJob = {
        id: `PJ-${Math.floor(1000 + Math.random() * 9000)}`,
        type: tagType,
        quantity: parseInt(quantity),
        status: "completed",
        createdAt: new Date().toLocaleString(),
        createdBy: "أحمد محمد",
      };

      setPrintJobs([newPrintJob, ...printJobs]);

      // Reset status after a delay
      setTimeout(() => {
        setPrintStatus("idle");
      }, 3000);
    }, 2000);
  };

  // Get tag type icon
  const getTagTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Package className="h-4 w-4 text-blue-600" />;
      case "location":
        return <Warehouse className="h-4 w-4 text-purple-600" />;
      case "shipment":
        return <ArrowRightLeft className="h-4 w-4 text-amber-600" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">مكتمل</Badge>;
      case "printing":
        return (
          <Badge className="bg-blue-100 text-blue-800">جاري الطباعة</Badge>
        );
      case "error":
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "printing":
        return <Printer className="h-4 w-4 text-blue-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">طباعة تاجات RFID</h2>
        <Button variant="outline">
          <Settings className="ml-2 h-4 w-4" />
          إعدادات الطباعة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Print Form */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>إنشاء مهمة طباعة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tag-type">نوع التاج</Label>
                <Select value={tagType} onValueChange={setTagType}>
                  <SelectTrigger id="tag-type">
                    <SelectValue placeholder="اختر نوع التاج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>تاجات المنتجات</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="location">
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-4 w-4" />
                        <span>تاجات المواقع</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="shipment">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="h-4 w-4" />
                        <span>تاجات الشحنات</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">الكمية</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {tagType === "product" && (
                <div className="space-y-2">
                  <Label htmlFor="product-category">فئة المنتج</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="اختر فئة المنتج" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      <SelectItem value="fabrics">أقمشة</SelectItem>
                      <SelectItem value="accessories">إكسسوارات</SelectItem>
                      <SelectItem value="finished">منتجات نهائية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {tagType === "location" && (
                <div className="space-y-2">
                  <Label htmlFor="warehouse">المستودع</Label>
                  <Select defaultValue="main">
                    <SelectTrigger id="warehouse">
                      <SelectValue placeholder="اختر المستودع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">المستودع الرئيسي</SelectItem>
                      <SelectItem value="raw">مستودع المواد الخام</SelectItem>
                      <SelectItem value="finished">
                        مستودع المنتجات النهائية
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="printer">الطابعة</Label>
                <Select defaultValue="zebra">
                  <SelectTrigger id="printer">
                    <SelectValue placeholder="اختر الطابعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zebra">Zebra ZT411</SelectItem>
                    <SelectItem value="tsc">TSC TTP-244 Pro</SelectItem>
                    <SelectItem value="sato">SATO CL4NX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={handleCreatePrintJob}
                disabled={printStatus !== "idle"}
              >
                {printStatus === "printing" ? (
                  <>
                    <Printer className="ml-2 h-4 w-4 animate-spin" />
                    جاري الطباعة...
                  </>
                ) : (
                  <>
                    <Printer className="ml-2 h-4 w-4" />
                    طباعة
                  </>
                )}
              </Button>

              {printStatus === "success" && (
                <div className="p-3 bg-green-50 text-green-800 rounded-md flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>تمت الطباعة بنجاح</span>
                </div>
              )}

              {printStatus === "error" && (
                <div className="p-3 bg-red-50 text-red-800 rounded-md flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>حدث خطأ أثناء الطباعة</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tag Preview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>معاينة التاج</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 border rounded-md">
              <div className="mb-4">
                <QrCode className="h-32 w-32 text-gray-800" />
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {getTagTypeIcon(tagType)}
                  <span className="font-bold">
                    {tagType === "product"
                      ? "تاج منتج"
                      : tagType === "location"
                        ? "تاج موقع"
                        : "تاج شحنة"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tagType === "product"
                    ? "يستخدم لتعريف وتتبع المنتجات في المخزون"
                    : tagType === "location"
                      ? "يستخدم لتعريف مواقع التخزين في المستودع"
                      : "يستخدم لتتبع الشحنات والمناقلات"}
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">
                    RFID-{tagType.toUpperCase()}-
                    {Math.floor(10000 + Math.random() * 90000)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Jobs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>مهام الطباعة</CardTitle>
            <Button variant="outline" size="sm">
              <FileText className="ml-2 h-4 w-4" />
              تقرير الطباعة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المهمة</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>المستخدم</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {printJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTagTypeIcon(job.type)}
                        <span>
                          {job.type === "product"
                            ? "تاجات منتجات"
                            : job.type === "location"
                              ? "تاجات مواقع"
                              : "تاجات شحنات"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{job.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(job.status)}
                        {getStatusBadge(job.status)}
                      </div>
                    </TableCell>
                    <TableCell>{job.createdAt}</TableCell>
                    <TableCell>{job.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFIDTagPrinting;
