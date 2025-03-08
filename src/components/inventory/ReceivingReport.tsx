import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QRCodeSVG } from "qrcode.react";
import {
  Package,
  Truck,
  Printer,
  Download,
  FileText,
  ArrowLeft,
  Warehouse,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Layers,
  ListFilter,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface RollData {
  id: string;
  materialId: string;
  materialName: string;
  colorId: string;
  colorName: string;
  colorCode: string;
  length: number;
  timestamp: Date;
  containerId?: string;
  warehouseId?: string;
  operationType: "container" | "inventory";
  qrCode: string;
}

interface SummaryItem {
  materialId: string;
  colorId: string;
  materialName: string;
  colorName: string;
  count: number;
  totalLength: number;
  expectedCount: number;
  expectedLength: number;
  countDiff: number;
  lengthDiff: number;
  discrepancyReason?: string;
  shortageFileGenerated?: boolean;
}

interface ReceivingReportProps {
  isOpen: boolean;
  containerId: string;
  containerName: string;
  warehouseId: string;
  warehouseName: string;
  rolls: RollData[];
  summaryData: SummaryItem[];
  totalRolls: number;
  totalLength: number;
  expectedTotalRolls: number;
  expectedTotalLength: number;
  receiptDate: Date;
  shortages?: SummaryItem[];
  materialsData: any[];
  onClose: () => void;
}

const ReceivingReport = ({
  isOpen,
  containerId,
  containerName,
  warehouseId,
  warehouseName,
  rolls,
  summaryData,
  totalRolls,
  totalLength,
  expectedTotalRolls,
  expectedTotalLength,
  receiptDate,
  shortages = [],
  materialsData = [],
  onClose,
}: ReceivingReportProps) => {
  const [viewMode, setViewMode] = useState<"summary" | "full">("summary");
  const reportRef = useRef<HTMLDivElement>(null);

  // Generate a unique receipt ID
  const receiptId = `REC-${format(receiptDate, "yyyyMMdd")}-${containerId.split("-")[1]}`;

  // Calculate differences
  const totalRollsDiff = totalRolls - expectedTotalRolls;
  const totalLengthDiff = totalLength - expectedTotalLength;

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return format(date, "HH:mm:ss", { locale: ar });
  };

  // Handle printing the report
  const handlePrint = () => {
    window.print();
  };

  // Handle downloading the report as PDF
  const handleDownload = () => {
    // In a real application, this would generate a PDF file
    alert("سيتم تنزيل التقرير كملف PDF");
  };

  // Handle downloading the shortages file
  const handleDownloadShortages = () => {
    // In a real application, this would generate a PDF or Excel file
    alert("سيتم تنزيل ملف النواقص");
  };

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto print:p-0 print:max-w-none print:overflow-visible print:shadow-none">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">تقرير استلام المواد</h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "summary" ? "default" : "outline"}
              onClick={() => setViewMode("summary")}
              size="sm"
            >
              <ListFilter className="ml-1 h-3 w-3" />
              عرض ملخص
            </Button>
            <Button
              variant={viewMode === "full" ? "default" : "outline"}
              onClick={() => setViewMode("full")}
              size="sm"
            >
              <Layers className="ml-1 h-3 w-3" />
              عرض تفصيلي
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="ml-1 h-3 w-3" />
              تنزيل PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="ml-1 h-3 w-3" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <ArrowLeft className="ml-1 h-3 w-3" />
              عودة
            </Button>
          </div>
        </div>

        <div ref={reportRef}>
          {/* Report Header */}
          <div className="mb-6 border-b pb-6 print:border-b-2 print:border-gray-800">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl print:border print:border-blue-800">
                  ERP
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-800 mb-1">
                    شركة الأقمشة المتحدة
                  </h1>
                  <p className="text-sm text-gray-600">
                    المملكة العربية السعودية - الرياض
                  </p>
                  <p className="text-sm text-gray-600">
                    هاتف: 0112345678 - البريد الإلكتروني: info@example.com
                  </p>
                </div>
              </div>
              <div className="text-center">
                <QRCodeSVG
                  value={JSON.stringify({
                    receiptId,
                    containerId,
                    warehouseId,
                    date: receiptDate.toISOString(),
                    totalRolls,
                    totalLength,
                  })}
                  size={100}
                  level="M"
                />
                <p className="text-xs text-gray-500 mt-1">رمز مرجعي للمستند</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-200 print:bg-gray-50 print:border-2">
              <h2 className="text-xl font-bold text-center mb-4 text-blue-800 border-b pb-2 print:border-b-2 print:border-gray-400">
                تقرير استلام مواد - {receiptId}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">تاريخ الاستلام:</span>
                    <span>{formatDate(receiptDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">وقت الاستلام:</span>
                    <span>{formatTime(receiptDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">الكونتينر:</span>
                    <span>
                      {containerName} ({containerId})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">المستودع المستلم:</span>
                    <span>
                      {warehouseName} ({warehouseId})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">إجمالي الرولونات:</span>
                    <span>
                      {totalRolls} / {expectedTotalRolls}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">إجمالي الأمتار:</span>
                    <span>
                      {totalLength} / {expectedTotalLength}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center print:bg-white print:border-2">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Package className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">إجمالي الرولونات</p>
                  <p className="text-xl font-bold">
                    {totalRolls} / {expectedTotalRolls}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-full flex items-center ${totalRollsDiff < 0 ? "bg-red-100 text-red-700" : totalRollsDiff > 0 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {totalRollsDiff < 0 ? (
                    <>
                      <TrendingDown className="h-4 w-4 ml-1" />
                      {totalRollsDiff}
                    </>
                  ) : totalRollsDiff > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 ml-1" />+{totalRollsDiff}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 ml-1" />
                      مطابق
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex justify-between items-center print:bg-white print:border-2">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Truck className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">إجمالي الأمتار</p>
                  <p className="text-xl font-bold">
                    {totalLength} / {expectedTotalLength}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-full flex items-center ${totalLengthDiff < 0 ? "bg-red-100 text-red-700" : totalLengthDiff > 0 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {totalLengthDiff < 0 ? (
                    <>
                      <TrendingDown className="h-4 w-4 ml-1" />
                      {totalLengthDiff}
                    </>
                  ) : totalLengthDiff > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 ml-1" />+{totalLengthDiff}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 ml-1" />
                      مطابق
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary View */}
          {viewMode === "summary" && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden print:border-2">
              <div className="bg-gray-50 p-4 border-b border-gray-200 print:bg-gray-100 print:border-b-2">
                <div className="flex items-center">
                  <FileText className="ml-2 h-5 w-5 text-blue-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    ملخص المواد المستلمة
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1 pr-7">
                  ملخص إجمالي للرولونات المستلمة حسب المادة واللون
                </p>
              </div>
              <div className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 print:bg-blue-100">
                        <TableHead className="font-bold text-blue-900">
                          المادة
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          اللون
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          العدد المتوقع
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          الأمتار المتوقعة
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          العدد المستلم
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          الأمتار المستلمة
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          الفرق (العدد)
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          الفرق (الأمتار)
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          الحالة
                        </TableHead>
                        <TableHead className="font-bold text-blue-900">
                          سبب الاختلاف
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaryData.length > 0 ? (
                        summaryData.map((item, index) => (
                          <TableRow
                            key={index}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${item.countDiff !== 0 || item.lengthDiff !== 0 ? (item.countDiff < 0 ? "bg-red-50 print:bg-red-100" : "bg-green-50 print:bg-green-100") : ""}`}
                          >
                            <TableCell className="font-medium">
                              {item.materialName}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div
                                  className="h-3 w-3 rounded-full ml-2 border"
                                  style={{
                                    backgroundColor:
                                      materialsData
                                        ?.find((m) => m.id === item.materialId)
                                        ?.colors.find(
                                          (c: any) => c.id === item.colorId,
                                        )?.code || "#000000",
                                  }}
                                />
                                {item.colorName}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.expectedCount} رولون
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.expectedLength} متر
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.count} رولون
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.totalLength} متر
                            </TableCell>
                            <TableCell
                              className={
                                item.countDiff < 0
                                  ? "text-red-600 font-bold"
                                  : item.countDiff > 0
                                    ? "text-green-600 font-bold"
                                    : "font-medium"
                              }
                            >
                              {item.countDiff > 0 ? "+" : ""}
                              {item.countDiff} رولون
                            </TableCell>
                            <TableCell
                              className={
                                item.lengthDiff < 0
                                  ? "text-red-600 font-bold"
                                  : item.lengthDiff > 0
                                    ? "text-green-600 font-bold"
                                    : "font-medium"
                              }
                            >
                              {item.lengthDiff > 0 ? "+" : ""}
                              {item.lengthDiff} متر
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  item.countDiff < 0
                                    ? "bg-red-100 text-red-800 print:bg-white print:border print:border-red-500"
                                    : item.countDiff > 0
                                      ? "bg-green-100 text-green-800 print:bg-white print:border print:border-green-500"
                                      : "bg-blue-100 text-blue-800 print:bg-white print:border print:border-blue-500"
                                }
                              >
                                {item.countDiff < 0
                                  ? "ناقص"
                                  : item.countDiff > 0
                                    ? "زائد"
                                    : "مطابق"}
                              </Badge>
                              {item.shortageFileGenerated && (
                                <Badge className="mr-1 bg-red-100 text-red-800 print:bg-white print:border print:border-red-500">
                                  تم إنشاء ملف نواقص
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {item.discrepancyReason
                                ? item.discrepancyReason
                                : item.countDiff !== 0 || item.lengthDiff !== 0
                                  ? "لم يتم تحديد سبب"
                                  : ""}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-4">
                            لا توجد بيانات للعرض
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Full Report View */}
          {viewMode === "full" && (
            <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden print:border-2">
              <div className="bg-gray-50 p-4 border-b border-gray-200 print:bg-gray-100 print:border-b-2">
                <div className="flex items-center">
                  <Layers className="ml-2 h-5 w-5 text-purple-700" />
                  <h3 className="text-lg font-bold text-gray-800">
                    تفاصيل الرولونات المستلمة
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1 pr-7">
                  قائمة تفصيلية بجميع الرولونات التي تم استلامها
                </p>
              </div>
              <div className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-purple-50 print:bg-purple-100">
                        <TableHead className="font-bold text-purple-900">
                          رقم الرول
                        </TableHead>
                        <TableHead className="font-bold text-purple-900">
                          المادة
                        </TableHead>
                        <TableHead className="font-bold text-purple-900">
                          اللون
                        </TableHead>
                        <TableHead className="font-bold text-purple-900">
                          الطول (متر)
                        </TableHead>
                        <TableHead className="font-bold text-purple-900">
                          وقت الإدخال
                        </TableHead>
                        <TableHead className="font-bold text-purple-900">
                          رمز QR
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rolls.length > 0 ? (
                        rolls.map((roll, index) => (
                          <TableRow
                            key={roll.id}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <TableCell className="font-medium">
                              {roll.id}
                            </TableCell>
                            <TableCell>{roll.materialName}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div
                                  className="h-3 w-3 rounded-full ml-2 border"
                                  style={{ backgroundColor: roll.colorCode }}
                                />
                                {roll.colorName}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {roll.length} متر
                            </TableCell>
                            <TableCell>{formatTime(roll.timestamp)}</TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <QRCodeSVG
                                  value={roll.qrCode}
                                  size={50}
                                  level="M"
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            لا توجد بيانات للعرض
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Shortages Section */}
          {shortages && shortages.length > 0 && (
            <div className="mb-6 border border-red-200 rounded-lg overflow-hidden print:border-2 print:border-red-500">
              <div className="bg-red-50 p-4 border-b border-red-200 print:bg-red-100 print:border-b-2 flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <AlertCircle className="ml-2 h-5 w-5 text-red-700" />
                    <h3 className="text-lg font-bold text-red-800">
                      ملف النواقص
                    </h3>
                  </div>
                  <p className="text-sm text-red-700 mt-1 pr-7">
                    قائمة بالمواد الناقصة في الكونتينر لمطالبة المورد بها
                  </p>
                </div>
                <div className="print:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadShortages}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Download className="ml-1 h-3 w-3" />
                    تنزيل ملف النواقص
                  </Button>
                </div>
              </div>
              <div className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-red-50 print:bg-red-100">
                        <TableHead className="font-bold text-red-900">
                          المادة
                        </TableHead>
                        <TableHead className="font-bold text-red-900">
                          اللون
                        </TableHead>
                        <TableHead className="font-bold text-red-900">
                          العدد الناقص
                        </TableHead>
                        <TableHead className="font-bold text-red-900">
                          الأمتار الناقصة
                        </TableHead>
                        <TableHead className="font-bold text-red-900">
                          سبب النقص
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shortages.map((item, index) => (
                        <TableRow
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-red-50 print:bg-white"
                          }
                        >
                          <TableCell className="font-medium">
                            {item.materialName}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className="h-3 w-3 rounded-full ml-2 border"
                                style={{
                                  backgroundColor:
                                    materialsData
                                      ?.find((m) => m.id === item.materialId)
                                      ?.colors.find(
                                        (c: any) => c.id === item.colorId,
                                      )?.code || "#000000",
                                }}
                              />
                              {item.colorName}
                            </div>
                          </TableCell>
                          <TableCell className="text-red-600 font-bold">
                            {Math.abs(item.countDiff)} رولون
                          </TableCell>
                          <TableCell className="text-red-600 font-bold">
                            {Math.abs(item.lengthDiff)} متر
                          </TableCell>
                          <TableCell>{item.discrepancyReason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Signatures Section */}
          <div className="mb-6 border-t-2 border-gray-300 pt-6 print:mt-8">
            <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
              التوقيعات
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="border-2 rounded-lg p-4 text-center">
                <p className="font-medium mb-12">مسؤول الاستلام</p>
                <div className="border-t-2 pt-2">
                  <p className="text-sm text-gray-500">الاسم والتوقيع</p>
                </div>
              </div>
              <div className="border-2 rounded-lg p-4 text-center">
                <p className="font-medium mb-12">مسؤول المستودع</p>
                <div className="border-t-2 pt-2">
                  <p className="text-sm text-gray-500">الاسم والتوقيع</p>
                </div>
              </div>
              <div className="border-2 rounded-lg p-4 text-center">
                <p className="font-medium mb-12">المدير المسؤول</p>
                <div className="border-t-2 pt-2">
                  <p className="text-sm text-gray-500">الاسم والتوقيع</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 print:mt-12">
              <p>
                تم إنشاء هذا المستند بواسطة نظام إدارة المخزون -{" "}
                {format(new Date(), "yyyy/MM/dd HH:mm:ss")}
              </p>
              <p className="mt-1">رقم المستند: {receiptId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivingReport;
