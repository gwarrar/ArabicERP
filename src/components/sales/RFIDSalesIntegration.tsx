import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tag,
  Smartphone,
  ShoppingCart,
  FileText,
  Settings,
  Scan,
  Printer,
  ArrowRightLeft,
  BarChart,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react";
import RFIDInvoiceScanner from "@/components/shared/RFIDInvoiceScanner";
import SalesInvoiceWithRFID from "./SalesInvoiceWithRFID";

const RFIDSalesIntegration = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedItems, setScannedItems] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStats, setScanStats] = useState({
    totalScanned: 0,
    uniqueProducts: 0,
    scanDuration: 0,
    lastScanTime: "",
  });

  // Handle scanned item from RFID scanner
  const handleScannedItem = (item: any) => {
    setScannedItems((prev) => [item, ...prev]);
    updateScanStats([item, ...scannedItems]);
  };

  // Update scan statistics
  const updateScanStats = (items: any[]) => {
    const uniqueProducts = new Set(items.map((item) => item.productId)).size;
    setScanStats({
      totalScanned: items.length,
      uniqueProducts,
      scanDuration: scanStats.scanDuration + 1, // Increment duration in seconds
      lastScanTime: new Date().toLocaleTimeString(),
    });
  };

  // Toggle scanning state
  const toggleScanning = (isActive: boolean) => {
    setIsScanning(isActive);
    if (!isActive) {
      // Reset scan duration when stopping
      setScanStats({
        ...scanStats,
        scanDuration: 0,
      });
    }
  };

  // Clear scanned items
  const clearScannedItems = () => {
    setScannedItems([]);
    setScanStats({
      totalScanned: 0,
      uniqueProducts: 0,
      scanDuration: 0,
      lastScanTime: "",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            نظام المبيعات مع RFID
          </CardTitle>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              <span>{scanStats.uniqueProducts} منتج فريد</span>
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 flex items-center gap-1"
            >
              <Smartphone className="h-3 w-3" />
              <span>{isScanning ? "جاري المسح" : "جاهز للمسح"}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="scanner">
              <Scan className="h-4 w-4 ml-2" />
              ماسح RFID
            </TabsTrigger>
            <TabsTrigger value="invoice">
              <ShoppingCart className="h-4 w-4 ml-2" />
              فاتورة المبيعات
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="h-4 w-4 ml-2" />
              إحصائيات المسح
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 ml-2" />
              إعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner">
            <div className="space-y-4">
              <RFIDInvoiceScanner
                onItemScanned={handleScannedItem}
                isActive={isScanning}
                onToggleScanning={toggleScanning}
              />

              {scannedItems.length > 0 && (
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium flex items-center">
                      <Tag className="h-4 w-4 ml-2 text-blue-600" />
                      العناصر الممسوحة ({scannedItems.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearScannedItems}
                    >
                      مسح الكل
                    </Button>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    <div className="space-y-2">
                      {scannedItems.slice(0, 10).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-white rounded border"
                        >
                          <div>
                            <div className="font-medium">
                              {item.productName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.productId}
                            </div>
                          </div>
                          <div className="text-sm">
                            {item.price} × {item.quantity} {item.unit}
                          </div>
                        </div>
                      ))}
                      {scannedItems.length > 10 && (
                        <div className="text-center text-sm text-muted-foreground py-2">
                          + {scannedItems.length - 10} عنصر آخر...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setActiveTab("invoice")}>
                      <ShoppingCart className="ml-2 h-4 w-4" />
                      الانتقال إلى الفاتورة
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="invoice">
            <SalesInvoiceWithRFID />
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          إجمالي العناصر
                        </p>
                        <h3 className="text-2xl font-bold mt-2">
                          {scanStats.totalScanned}
                        </h3>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Tag className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          المنتجات الفريدة
                        </p>
                        <h3 className="text-2xl font-bold mt-2">
                          {scanStats.uniqueProducts}
                        </h3>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-full">
                        <ShoppingCart className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          مدة المسح
                        </p>
                        <h3 className="text-2xl font-bold mt-2">
                          {Math.floor(scanStats.scanDuration / 60)}:
                          {(scanStats.scanDuration % 60)
                            .toString()
                            .padStart(2, "0")}
                        </h3>
                      </div>
                      <div className="p-2 bg-green-100 rounded-full">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات المسح</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">آخر مسح:</span>
                      <span>{scanStats.lastScanTime || "لا يوجد"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        متوسط سرعة المسح:
                      </span>
                      <span>
                        {scanStats.scanDuration > 0
                          ? (
                              scanStats.totalScanned / scanStats.scanDuration
                            ).toFixed(2)
                          : "0"}{" "}
                        عنصر/ثانية
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        حالة الماسح:
                      </span>
                      <Badge
                        className={
                          isScanning
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {isScanning ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات RFID</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">تفعيل المسح التلقائي</h3>
                      <p className="text-sm text-muted-foreground">
                        بدء المسح تلقائياً عند فتح الصفحة
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-scan"
                        className="h-4 w-4"
                      />
                      <label htmlFor="auto-scan">تفعيل</label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        إضافة المنتجات تلقائياً للفاتورة
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        إضافة المنتجات الممسوحة تلقائياً إلى الفاتورة
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="auto-add"
                        className="h-4 w-4"
                        checked
                      />
                      <label htmlFor="auto-add">تفعيل</label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">تنبيهات صوتية</h3>
                      <p className="text-sm text-muted-foreground">
                        تشغيل صوت عند مسح منتج
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sound-alerts"
                        className="h-4 w-4"
                        checked
                      />
                      <label htmlFor="sound-alerts">تفعيل</label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">حساسية المسح</h3>
                      <p className="text-sm text-muted-foreground">
                        ضبط حساسية ماسح RFID
                      </p>
                    </div>
                    <div className="w-32">
                      <select className="w-full p-2 border rounded">
                        <option value="high">عالية</option>
                        <option value="medium" selected>
                          متوسطة
                        </option>
                        <option value="low">منخفضة</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button>
                      <RefreshCw className="ml-2 h-4 w-4" />
                      إعادة ضبط الإعدادات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RFIDSalesIntegration;
