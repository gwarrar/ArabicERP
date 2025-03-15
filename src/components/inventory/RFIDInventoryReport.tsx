import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  PieChart,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUpDown,
  Filter,
  Smartphone,
  Calendar,
  Clock,
  User,
  Zap,
  Tag,
} from "lucide-react";
import { analyzeRFIDData, exportRFIDDataToCSV } from "@/utils/rfidUtils";

interface RFIDInventoryReportProps {
  sessionId: string;
  sessionName: string;
  date: string;
  startTime: string;
  endTime: string;
  scannedItems: any[];
  expectedInventory: any[];
  operator: string;
}

const RFIDInventoryReport: React.FC<RFIDInventoryReportProps> = ({
  sessionId,
  sessionName,
  date,
  startTime,
  endTime,
  scannedItems,
  expectedInventory,
  operator,
}) => {
  const [activeTab, setActiveTab] = useState<"summary" | "details">("summary");

  // تحليل البيانات
  const stats = analyzeRFIDData(scannedItems, expectedInventory);

  // حساب مدة الجرد
  const calculateDuration = () => {
    if (!startTime || !endTime) return "غير متوفر";

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const durationMs = end.getTime() - start.getTime();

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // حساب سرعة المسح
  const calculateScanSpeed = () => {
    if (stats.scanDuration === 0) return 0;
    return (scannedItems.length / stats.scanDuration).toFixed(2);
  };

  // معالجة البيانات للعرض
  const processedItems = expectedInventory.map((item) => {
    const scannedCount = scannedItems.filter(
      (scanned) => scanned.productId === item.productId,
    ).length;
    const difference = scannedCount - item.expectedQty;
    const status =
      difference === 0
        ? "مطابق"
        : Math.abs(difference) <= Math.max(1, item.expectedQty * 0.05)
          ? "فرق بسيط"
          : "فرق كبير";

    return {
      ...item,
      actualQty: scannedCount,
      difference,
      status,
      tagsScanned: scannedCount,
    };
  });

  // الحصول على لون حالة الجرد
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "مطابق":
        return "bg-green-100 text-green-800";
      case "فرق بسيط":
        return "bg-amber-100 text-amber-800";
      case "فرق كبير":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة حالة الجرد
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مطابق":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "فرق بسيط":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "فرق كبير":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  // حساب النسب المئوية
  const matchingCount = processedItems.filter(
    (item) => item.status === "مطابق",
  ).length;
  const minorDiscrepancyCount = processedItems.filter(
    (item) => item.status === "فرق بسيط",
  ).length;
  const majorDiscrepancyCount = processedItems.filter(
    (item) => item.status === "فرق كبير",
  ).length;

  const matchingPercentage = (matchingCount / processedItems.length) * 100;
  const minorDiscrepancyPercentage =
    (minorDiscrepancyCount / processedItems.length) * 100;
  const majorDiscrepancyPercentage =
    (majorDiscrepancyCount / processedItems.length) * 100;

  // تصدير البيانات
  const handleExportData = () => {
    exportRFIDDataToCSV(scannedItems, `rfid-scan-${sessionId}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">تقرير الجرد باستخدام RFID</h2>
          <p className="text-muted-foreground">
            نتائج وتحليل عملية الجرد باستخدام تقنية RFID
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* بطاقة معلومات الجلسة */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>معلومات جلسة الجرد</CardTitle>
            <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
              <Smartphone className="h-3 w-3" />
              RFID
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  رقم الجلسة:
                </span>
                <span className="font-medium">{sessionId}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  اسم الجلسة:
                </span>
                <span className="font-medium">{sessionName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">التاريخ:</span>
                <span className="font-medium">{date}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  وقت البدء:
                </span>
                <span className="font-medium">{startTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  وقت الانتهاء:
                </span>
                <span className="font-medium">{endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">المدة:</span>
                <span className="font-medium">{calculateDuration()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">المنفذ:</span>
                <span className="font-medium">{operator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  سرعة المسح:
                </span>
                <span className="font-medium">
                  {calculateScanSpeed()} عنصر/ثانية
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  إجمالي العناصر الممسوحة:
                </span>
                <span className="font-medium">{scannedItems.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* تبويبات التقرير */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "summary" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("summary")}
        >
          ملخص النتائج
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("details")}
        >
          تفاصيل العناصر
        </button>
      </div>

      {/* ملخص النتائج */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          {/* إحصائيات النتائج */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      المنتجات الفريدة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {processedItems.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      العناصر الممسوحة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {scannedItems.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      نسبة التطابق
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {matchingPercentage.toFixed(1)}%
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* رسم بياني للنتائج */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع نتائج الجرد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                <div className="text-center">
                  <PieChart className="h-40 w-40 mx-auto text-muted-foreground" />
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">
                        مطابق: {matchingCount} ({matchingPercentage.toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">
                        فرق بسيط: {minorDiscrepancyCount} (
                        {minorDiscrepancyPercentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">
                        فرق كبير: {majorDiscrepancyCount} (
                        {majorDiscrepancyPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-md">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">مطابق</span>
                        <span className="text-sm">
                          {matchingPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={matchingPercentage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">فرق بسيط</span>
                        <span className="text-sm">
                          {minorDiscrepancyPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={minorDiscrepancyPercentage}
                        className="h-2 bg-gray-200"
                      >
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${minorDiscrepancyPercentage}%` }}
                        ></div>
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">فرق كبير</span>
                        <span className="text-sm">
                          {majorDiscrepancyPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={majorDiscrepancyPercentage}
                        className="h-2 bg-gray-200"
                      >
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${majorDiscrepancyPercentage}%` }}
                        ></div>
                      </Progress>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أكثر العناصر اختلافاً */}
          <Card>
            <CardHeader>
              <CardTitle>أكثر العناصر اختلافاً</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الكمية المتوقعة</TableHead>
                    <TableHead>الكمية الفعلية</TableHead>
                    <TableHead>الفرق</TableHead>
                    <TableHead>النسبة</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedItems
                    .filter((item) => item.status !== "مطابق")
                    .sort(
                      (a, b) => Math.abs(b.difference) - Math.abs(a.difference),
                    )
                    .slice(0, 3)
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell>{item.expectedQty}</TableCell>
                        <TableCell>{item.actualQty}</TableCell>
                        <TableCell
                          className={
                            item.difference > 0
                              ? "text-blue-600"
                              : "text-red-600"
                          }
                        >
                          {item.difference > 0 ? "+" : ""}
                          {item.difference}
                        </TableCell>
                        <TableCell>
                          {Math.abs(
                            (item.difference / item.expectedQty) * 100,
                          ).toFixed(1)}
                          %
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* تفاصيل العناصر */}
      {activeTab === "details" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">تفاصيل العناصر الممسوحة</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="ml-2 h-4 w-4" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="ml-2 h-4 w-4" />
                ترتيب
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم المنتج</TableHead>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الكمية المتوقعة</TableHead>
                    <TableHead>الكمية الفعلية</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead>الفرق</TableHead>
                    <TableHead>التاجات الممسوحة</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.productId}
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.expectedQty}</TableCell>
                      <TableCell>{item.actualQty}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell
                        className={`font-medium ${item.difference === 0 ? "text-green-600" : item.difference > 0 ? "text-blue-600" : "text-red-600"}`}
                      >
                        {item.difference > 0 ? "+" : ""}
                        {item.difference}
                      </TableCell>
                      <TableCell>{item.tagsScanned}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          <Badge className={getStatusBadgeClass(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">مطابق: {matchingCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">
                  فرق بسيط: {minorDiscrepancyCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">
                  فرق كبير: {majorDiscrepancyCount}
                </span>
              </div>
            </div>
            <Button onClick={handleExportData}>
              <Download className="ml-2 h-4 w-4" />
              تصدير البيانات
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFIDInventoryReport;
