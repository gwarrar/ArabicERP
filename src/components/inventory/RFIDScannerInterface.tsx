import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Smartphone,
  Wifi,
  WifiOff,
  Tag,
  Scan,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Printer,
  Download,
  Save,
  Package,
  Warehouse,
  Zap,
  Battery,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Bluetooth,
  BluetoothOff,
  Settings,
  Info,
  Play,
  Pause,
  StopCircle,
  Plus,
} from "lucide-react";

// Try to import the processRFIDData function, but provide a fallback if it fails
let processRFIDData: any;
try {
  const rfidUtils = require("@/utils/rfidUtils");
  processRFIDData = rfidUtils.processRFIDData;
} catch (error) {
  console.error("Failed to import rfidUtils:", error);
  // Define a fallback function
  processRFIDData = (scannedItems: any[], expectedInventory: any[]) => {
    // Create a map to count scanned items by product ID
    const scannedCounts: Record<string, number> = {};

    // Count scanned items by product ID
    scannedItems.forEach((item) => {
      if (!scannedCounts[item.productId]) {
        scannedCounts[item.productId] = 0;
      }
      scannedCounts[item.productId]++;
    });

    // Process results and compare with expected inventory
    return expectedInventory.map((expected) => {
      const actualQty = scannedCounts[expected.productId] || 0;
      const difference = actualQty - expected.expectedQty;

      // Determine status based on difference
      let status = "مطابق";
      if (difference < 0) {
        // If actual is less than expected
        status =
          Math.abs(difference) > expected.expectedQty * 0.1
            ? "فرق كبير"
            : "فرق بسيط";
      } else if (difference > 0) {
        // If actual is more than expected
        status =
          difference > expected.expectedQty * 0.1 ? "فرق كبير" : "فرق بسيط";
      }

      return {
        productId: expected.productId,
        productName: expected.productName,
        expectedQty: expected.expectedQty,
        actualQty,
        difference,
        status,
        location: expected.location,
      };
    });
  };
}

interface RFIDDevice {
  id: string;
  name: string;
  type: "handheld" | "fixed" | "mobile";
  status: "connected" | "disconnected" | "error";
  batteryLevel?: number;
  lastScan?: string;
  signalStrength?: number;
}

interface ScannedItem {
  tagId: string;
  productId: string;
  productName: string;
  timestamp: string;
  location?: string;
}

const RFIDScannerInterface = () => {
  // State for connected devices
  const [devices, setDevices] = useState<RFIDDevice[]>([
    {
      id: "DEV-001",
      name: "RFID Scanner 1",
      type: "handheld",
      status: "connected",
      batteryLevel: 85,
      lastScan: new Date().toISOString(),
      signalStrength: 90,
    },
    {
      id: "DEV-002",
      name: "RFID Gateway 1",
      type: "fixed",
      status: "connected",
      lastScan: new Date().toISOString(),
      signalStrength: 95,
    },
    {
      id: "DEV-003",
      name: "RFID Scanner 2",
      type: "handheld",
      status: "disconnected",
      batteryLevel: 20,
      lastScan: new Date(Date.now() - 3600000).toISOString(),
      signalStrength: 0,
    },
  ]);

  // State for scanning status
  const [scanningStatus, setScanningStatus] = useState<
    "idle" | "scanning" | "completed" | "error"
  >("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [scanDuration, setScanDuration] = useState<number>(0);
  const [scanStartTime, setScanStartTime] = useState<number | null>(null);
  const [scanInterval, setScanInterval] = useState<NodeJS.Timeout | null>(null);

  // State for scanned items
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [expectedInventory, setExpectedInventory] = useState<any[]>([
    {
      productId: "PROD-001",
      productName: "قماش قطني أبيض",
      expectedQty: 30,
      location: "المستودع الرئيسي - A01",
    },
    {
      productId: "PROD-002",
      productName: "خيط بوليستر أسود",
      expectedQty: 25,
      location: "المستودع الرئيسي - B03",
    },
    {
      productId: "PROD-003",
      productName: "أزرار بلاستيكية",
      expectedQty: 35,
      location: "المستودع الرئيسي - C02",
    },
    {
      productId: "PROD-004",
      productName: "سحابات معدنية",
      expectedQty: 40,
      location: "المستودع الرئيسي - D01",
    },
    {
      productId: "PROD-005",
      productName: "قماش قطني أسود",
      expectedQty: 20,
      location: "المستودع الرئيسي - A02",
    },
  ]);

  // State for scan results
  const [scanResults, setScanResults] = useState<any[]>([]);

  // Sample warehouse locations
  const warehouseLocations = [
    { id: "WH-001-A01", name: "المستودع الرئيسي - A01" },
    { id: "WH-001-A02", name: "المستودع الرئيسي - A02" },
    { id: "WH-001-B03", name: "المستودع الرئيسي - B03" },
    { id: "WH-001-C02", name: "المستودع الرئيسي - C02" },
    { id: "WH-001-D01", name: "المستودع الرئيسي - D01" },
    { id: "WH-002-A01", name: "مستودع المنتجات النهائية - A01" },
  ];

  // Effect to update scan progress
  useEffect(() => {
    if (scanningStatus === "scanning" && scanStartTime) {
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - scanStartTime;
        setScanDuration(Math.floor(elapsedTime / 1000));

        // Simulate scan progress
        const progress = Math.min(Math.floor((elapsedTime / 30000) * 100), 99);
        setScanProgress(progress);

        // Simulate finding new items
        if (elapsedTime % 3000 < 100 && scannedItems.length < 100) {
          const newItem: ScannedItem = {
            tagId: `TAG-${Math.floor(1000 + Math.random() * 9000)}`,
            productId: `PROD-00${Math.floor(1 + Math.random() * 5)}`,
            productName: [
              "قماش قطني أبيض",
              "خيط بوليستر أسود",
              "أزرار بلاستيكية",
              "سحابات معدنية",
              "قماش قطني أسود",
            ][Math.floor(Math.random() * 5)],
            timestamp: new Date().toISOString(),
            location: selectedLocation
              ? warehouseLocations.find((loc) => loc.id === selectedLocation)
                  ?.name
              : undefined,
          };
          setScannedItems((prev) => [...prev, newItem]);
        }
      }, 1000);

      setScanInterval(interval);

      return () => clearInterval(interval);
    }
  }, [scanningStatus, scanStartTime, scannedItems.length, selectedLocation]);

  // Start scanning
  const startScanning = () => {
    if (!selectedDevice) {
      alert("يرجى اختيار جهاز للمسح");
      return;
    }

    try {
      setScanningStatus("scanning");
      setScanStartTime(Date.now());
      setScanProgress(0);
      setScannedItems([]);
      setScanResults([]);

      // Simulate automatic completion after 30 seconds
      setTimeout(() => {
        if (scanningStatus === "scanning") {
          completeScan();
        }
      }, 30000);
    } catch (error) {
      console.error("Error starting scan:", error);
      alert("حدث خطأ أثناء بدء المسح. يرجى المحاولة مرة أخرى.");
      setScanningStatus("idle");
    }
  };

  // Function to pause scanning
  const pauseScanning = () => {
    setScanningStatus("idle");
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
  };

  // Function to resume scanning
  const resumeScanning = () => {
    setScanningStatus("scanning");
    setScanStartTime(Date.now() - scanDuration * 1000);
  };

  // Complete scan
  const completeScan = () => {
    try {
      setScanningStatus("completed");
      setScanProgress(100);
      if (scanInterval) {
        clearInterval(scanInterval);
        setScanInterval(null);
      }

      // Process the scanned data
      if (typeof processRFIDData === "function") {
        const results = processRFIDData(scannedItems, expectedInventory);
        setScanResults(results);
      } else {
        console.error("processRFIDData function is not available");
        // Fallback processing if the function is not available
        const fallbackResults = expectedInventory.map((expected) => ({
          productId: expected.productId,
          productName: expected.productName,
          expectedQty: expected.expectedQty,
          actualQty: scannedItems.filter(
            (item) => item.productId === expected.productId,
          ).length,
          difference:
            scannedItems.filter((item) => item.productId === expected.productId)
              .length - expected.expectedQty,
          status: "مطابق",
          location: expected.location,
        }));
        setScanResults(fallbackResults);
      }

      // Update the last scan time for the selected device
      setDevices(
        devices.map((device) =>
          device.id === selectedDevice
            ? { ...device, lastScan: new Date().toISOString() }
            : device,
        ),
      );
    } catch (error) {
      console.error("Error completing scan:", error);
      alert("حدث خطأ أثناء إكمال المسح. يرجى المحاولة مرة أخرى.");
      setScanningStatus("error");
    }
  };

  // Function to reset scan
  const resetScan = () => {
    setScanningStatus("idle");
    setScanProgress(0);
    setScanDuration(0);
    setScanStartTime(null);
    setScannedItems([]);
    setScanResults([]);
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
  };

  // Function to export scan results
  const exportResults = () => {
    const csvContent = [
      [
        "رقم المنتج",
        "اسم المنتج",
        "الكمية المتوقعة",
        "الكمية الفعلية",
        "الفرق",
        "الحالة",
      ].join(","),
      ...scanResults.map((item) =>
        [
          item.productId,
          item.productName,
          item.expectedQty,
          item.actualQty,
          item.difference,
          item.status,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `rfid-scan-results-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to get battery icon based on level
  const getBatteryIcon = (level?: number) => {
    if (level === undefined) return null;
    if (level <= 20) return <BatteryLow className="h-4 w-4 text-red-500" />;
    if (level <= 50)
      return <BatteryMedium className="h-4 w-4 text-amber-500" />;
    if (level <= 80) return <Battery className="h-4 w-4 text-green-500" />;
    return <BatteryFull className="h-4 w-4 text-green-500" />;
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">متصل</Badge>;
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800">غير متصل</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">خطأ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to get result status badge
  const getResultStatusBadge = (status: string) => {
    switch (status) {
      case "مطابق":
        return <Badge className="bg-green-100 text-green-800">مطابق</Badge>;
      case "فرق بسيط":
        return <Badge className="bg-amber-100 text-amber-800">فرق بسيط</Badge>;
      case "فرق كبير":
        return <Badge className="bg-red-100 text-red-800">فرق كبير</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate scan statistics
  const scanStats = {
    totalScanned: scannedItems.length,
    uniqueProducts: new Set(scannedItems.map((item) => item.productId)).size,
    matchingItems: scanResults.filter((item) => item.status === "مطابق").length,
    minorDiscrepancies: scanResults.filter((item) => item.status === "فرق بسيط")
      .length,
    majorDiscrepancies: scanResults.filter((item) => item.status === "فرق كبير")
      .length,
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">واجهة ماسح RFID</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="ml-1 h-3 w-3" />
            الإعدادات
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="ml-1 h-3 w-3" />
            تحديث الأجهزة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scan">
        <TabsList className="mb-4">
          <TabsTrigger value="scan">
            <Scan className="ml-2 h-4 w-4" />
            المسح
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="ml-2 h-4 w-4" />
            الأجهزة
          </TabsTrigger>
          <TabsTrigger value="results">
            <CheckCircle className="ml-2 h-4 w-4" />
            النتائج
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Device Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="ml-2 h-5 w-5" />
                  اختيار الجهاز
                </CardTitle>
                <CardDescription>اختر جهاز RFID للمسح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="device">الجهاز</Label>
                    <Select
                      value={selectedDevice}
                      onValueChange={setSelectedDevice}
                    >
                      <SelectTrigger id="device">
                        <SelectValue placeholder="اختر جهاز RFID" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices
                          .filter((device) => device.status === "connected")
                          .map((device) => (
                            <SelectItem key={device.id} value={device.id}>
                              {device.name} (
                              {device.type === "handheld" ? "محمول" : "ثابت"})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDevice && (
                    <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">الجهاز:</span>
                        <span className="text-sm font-medium">
                          {devices.find((d) => d.id === selectedDevice)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">النوع:</span>
                        <span className="text-sm font-medium">
                          {devices.find((d) => d.id === selectedDevice)
                            ?.type === "handheld"
                            ? "محمول"
                            : "ثابت"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">الحالة:</span>
                        {getStatusBadge(
                          devices.find((d) => d.id === selectedDevice)
                            ?.status || "",
                        )}
                      </div>
                      {devices.find((d) => d.id === selectedDevice)
                        ?.batteryLevel !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            البطارية:
                          </span>
                          <span className="text-sm font-medium flex items-center">
                            {getBatteryIcon(
                              devices.find((d) => d.id === selectedDevice)
                                ?.batteryLevel,
                            )}
                            <span className="mr-1">
                              {
                                devices.find((d) => d.id === selectedDevice)
                                  ?.batteryLevel
                              }
                              %
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Warehouse className="ml-2 h-5 w-5" />
                  موقع المسح
                </CardTitle>
                <CardDescription>اختر موقع المسح في المستودع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="اختر موقع المسح" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouseLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedLocation && (
                    <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">الموقع:</span>
                        <span className="text-sm font-medium">
                          {
                            warehouseLocations.find(
                              (l) => l.id === selectedLocation,
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          العناصر المتوقعة:
                        </span>
                        <span className="text-sm font-medium">
                          {expectedInventory
                            .filter(
                              (item) =>
                                item.location ===
                                warehouseLocations.find(
                                  (l) => l.id === selectedLocation,
                                )?.name,
                            )
                            .reduce((sum, item) => sum + item.expectedQty, 0)}
                        </span>
                      </div>
                    </div>
                  )}

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle>معلومات المسح</AlertTitle>
                    <AlertDescription className="text-xs">
                      سيتم مسح جميع العناصر في الموقع المحدد. تأكد من أن الجهاز
                      متصل وجاهز للمسح.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Scan Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scan className="ml-2 h-5 w-5" />
                  التحكم بالمسح
                </CardTitle>
                <CardDescription>بدء وإيقاف عملية المسح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanningStatus === "idle" && scanProgress === 0 && (
                    <Button
                      className="w-full"
                      onClick={startScanning}
                      disabled={!selectedDevice}
                    >
                      <Play className="ml-2 h-4 w-4" />
                      بدء المسح
                    </Button>
                  )}

                  {scanningStatus === "idle" && scanProgress > 0 && (
                    <Button
                      className="w-full"
                      onClick={resumeScanning}
                      disabled={!selectedDevice}
                    >
                      <Play className="ml-2 h-4 w-4" />
                      استئناف المسح
                    </Button>
                  )}

                  {scanningStatus === "scanning" && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={pauseScanning}
                    >
                      <Pause className="ml-2 h-4 w-4" />
                      إيقاف مؤقت
                    </Button>
                  )}

                  {scanningStatus === "scanning" && (
                    <Button className="w-full" onClick={completeScan}>
                      <CheckCircle className="ml-2 h-4 w-4" />
                      إنهاء المسح
                    </Button>
                  )}

                  {(scanningStatus === "completed" || scanProgress > 0) && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={resetScan}
                    >
                      <RefreshCw className="ml-2 h-4 w-4" />
                      إعادة ضبط
                    </Button>
                  )}

                  {scanningStatus === "scanning" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>تقدم المسح</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} className="h-2" />
                    </div>
                  )}

                  <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">الحالة:</span>
                      <Badge
                        className={
                          scanningStatus === "scanning"
                            ? "bg-blue-100 text-blue-800"
                            : scanningStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : scanningStatus === "error"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {scanningStatus === "scanning"
                          ? "جاري المسح"
                          : scanningStatus === "completed"
                            ? "اكتمل المسح"
                            : scanningStatus === "error"
                              ? "خطأ في المسح"
                              : "جاهز للمسح"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">مدة المسح:</span>
                      <span className="text-sm font-medium">
                        {Math.floor(scanDuration / 60)}:
                        {(scanDuration % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        العناصر الممسوحة:
                      </span>
                      <span className="text-sm font-medium">
                        {scannedItems.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scan Progress and Results */}
          {(scanningStatus === "scanning" ||
            scanningStatus === "completed") && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>العناصر الممسوحة</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {scannedItems.length} عنصر
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم التاج</TableHead>
                        <TableHead>رقم المنتج</TableHead>
                        <TableHead>اسم المنتج</TableHead>
                        <TableHead>وقت المسح</TableHead>
                        <TableHead>الموقع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scannedItems.length > 0 ? (
                        scannedItems.slice(0, 5).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.tagId}
                            </TableCell>
                            <TableCell>{item.productId}</TableCell>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>
                              {new Date(item.timestamp).toLocaleTimeString(
                                "ar-SA",
                              )}
                            </TableCell>
                            <TableCell>{item.location || "-"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Tag className="h-6 w-6 mb-1" />
                              <p>لم يتم مسح أي عناصر بعد</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                      {scannedItems.length > 5 && (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-2 text-sm text-muted-foreground"
                          >
                            عرض 5 من أصل {scannedItems.length} عنصر...
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scan Summary */}
          {scanningStatus === "completed" && (
            <Card>
              <CardHeader>
                <CardTitle>ملخص المسح</CardTitle>
                <CardDescription>
                  ملخص لنتائج عملية المسح ومقارنتها بالمخزون المتوقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            العناصر الممسوحة
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
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
                          <h3 className="text-2xl font-bold mt-1">
                            {scanStats.uniqueProducts}
                          </h3>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Package className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">مطابق</p>
                          <h3 className="text-2xl font-bold mt-1">
                            {scanStats.matchingItems}
                          </h3>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            فرق بسيط
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {scanStats.minorDiscrepancies}
                          </h3>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            فرق كبير
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {scanStats.majorDiscrepancies}
                          </h3>
                        </div>
                        <div className="p-2 bg-red-100 rounded-full">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم المنتج</TableHead>
                        <TableHead>اسم المنتج</TableHead>
                        <TableHead>الكمية المتوقعة</TableHead>
                        <TableHead>الكمية الفعلية</TableHead>
                        <TableHead>الفرق</TableHead>
                        <TableHead>الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scanResults.length > 0 ? (
                        scanResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {result.productId}
                            </TableCell>
                            <TableCell>{result.productName}</TableCell>
                            <TableCell>{result.expectedQty}</TableCell>
                            <TableCell>{result.actualQty}</TableCell>
                            <TableCell
                              className={
                                result.difference < 0
                                  ? "text-red-600"
                                  : result.difference > 0
                                    ? "text-green-600"
                                    : ""
                              }
                            >
                              {result.difference > 0 ? "+" : ""}
                              {result.difference}
                            </TableCell>
                            <TableCell>
                              {getResultStatusBadge(result.status)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Package className="h-6 w-6 mb-1" />
                              <p>لا توجد نتائج للعرض</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={exportResults}
                    disabled={scanResults.length === 0}
                  >
                    <Download className="ml-1 h-4 w-4" />
                    تصدير النتائج
                  </Button>
                  <Button disabled={scanResults.length === 0}>
                    <Save className="ml-1 h-4 w-4" />
                    حفظ في النظام
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>أجهزة RFID المتاحة</CardTitle>
                <Button variant="outline" size="sm">
                  <Bluetooth className="ml-1 h-4 w-4" />
                  بحث عن أجهزة جديدة
                </Button>
              </div>
              <CardDescription>
                قائمة بجميع أجهزة RFID المتاحة وحالتها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>معرف الجهاز</TableHead>
                      <TableHead>اسم الجهاز</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>البطارية</TableHead>
                      <TableHead>قوة الإشارة</TableHead>
                      <TableHead>آخر مسح</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">
                          {device.id}
                        </TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>
                          {device.type === "handheld"
                            ? "محمول باليد"
                            : device.type === "fixed"
                              ? "ثابت"
                              : "متنقل"}
                        </TableCell>
                        <TableCell>{getStatusBadge(device.status)}</TableCell>
                        <TableCell>
                          {device.batteryLevel !== undefined ? (
                            <div className="flex items-center">
                              {getBatteryIcon(device.batteryLevel)}
                              <span className="mr-1">
                                {device.batteryLevel}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {device.signalStrength !== undefined ? (
                            <div className="flex items-center">
                              {device.signalStrength > 0 ? (
                                <Wifi
                                  className={`h-4 w-4 ${device.signalStrength > 70 ? "text-green-500" : device.signalStrength > 30 ? "text-amber-500" : "text-red-500"}`}
                                />
                              ) : (
                                <WifiOff className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="mr-1">
                                {device.signalStrength}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {device.lastScan
                            ? new Date(device.lastScan).toLocaleString("ar-SA")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={device.status !== "connected"}
                              onClick={() => {
                                setSelectedDevice(device.id);
                                document
                                  .querySelector('[data-value="scan"]')
                                  ?.click();
                              }}
                            >
                              <Scan className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Toggle connection status
                                setDevices(
                                  devices.map((d) =>
                                    d.id === device.id
                                      ? {
                                          ...d,
                                          status:
                                            d.status === "connected"
                                              ? "disconnected"
                                              : "connected",
                                          signalStrength:
                                            d.status === "connected" ? 0 : 90,
                                        }
                                      : d,
                                  ),
                                );
                              }}
                            >
                              {device.status === "connected" ? (
                                <BluetoothOff className="h-4 w-4 text-red-500" />
                              ) : (
                                <Bluetooth className="h-4 w-4 text-blue-500" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة جهاز جديد</CardTitle>
                <CardDescription>
                  إضافة جهاز RFID جديد إلى النظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deviceName">اسم الجهاز</Label>
                    <Input id="deviceName" placeholder="أدخل اسم الجهاز" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceType">نوع الجهاز</Label>
                    <Select defaultValue="handheld">
                      <SelectTrigger id="deviceType">
                        <SelectValue placeholder="اختر نوع الجهاز" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="handheld">محمول باليد</SelectItem>
                        <SelectItem value="fixed">ثابت</SelectItem>
                        <SelectItem value="mobile">متنقل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceId">معرف الجهاز</Label>
                    <Input id="deviceId" placeholder="أدخل معرف الجهاز" />
                  </div>
                  <Button className="w-full">
                    <Plus className="ml-1 h-4 w-4" />
                    إضافة الجهاز
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات الاتصال</CardTitle>
                <CardDescription>معلومات الاتصال بأجهزة RFID</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        الأجهزة المتصلة:
                      </span>
                      <span className="text-sm font-medium">
                        {devices.filter((d) => d.status === "connected").length}{" "}
                        / {devices.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        بروتوكول الاتصال:
                      </span>
                      <span className="text-sm font-medium">
                        Bluetooth LE / USB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">آخر تحديث:</span>
                      <span className="text-sm font-medium">
                        {new Date().toLocaleString("ar-SA")}
                      </span>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle>معلومات الاتصال</AlertTitle>
                    <AlertDescription className="text-xs">
                      تأكد من تشغيل البلوتوث في جهازك وأن أجهزة RFID مشحونة
                      ومشغلة قبل محاولة الاتصال.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline">
                      <RefreshCw className="ml-1 h-4 w-4" />
                      تحديث الحالة
                    </Button>
                    <Button variant="outline">
                      <Settings className="ml-1 h-4 w-4" />
                      إعدادات الاتصال
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {scanResults.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>نتائج المسح</CardTitle>
                      <CardDescription>
                        نتائج آخر عملية مسح RFID
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {new Date().toLocaleDateString("ar-SA")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              إجمالي العناصر
                            </p>
                            <h3 className="text-2xl font-bold mt-1">
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
                              دقة الجرد
                            </p>
                            <h3 className="text-2xl font-bold mt-1">
                              {scanResults.length > 0
                                ? Math.round(
                                    (scanStats.matchingItems /
                                      scanResults.length) *
                                      100,
                                  )
                                : 0}
                              %
                            </h3>
                          </div>
                          <div className="p-2 bg-green-100 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
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
                            <h3 className="text-2xl font-bold mt-1">
                              {Math.floor(scanDuration / 60)}:
                              {(scanDuration % 60).toString().padStart(2, "0")}
                            </h3>
                          </div>
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Zap className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>رقم المنتج</TableHead>
                          <TableHead>اسم المنتج</TableHead>
                          <TableHead>الكمية المتوقعة</TableHead>
                          <TableHead>الكمية الفعلية</TableHead>
                          <TableHead>الفرق</TableHead>
                          <TableHead>الحالة</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scanResults.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {result.productId}
                            </TableCell>
                            <TableCell>{result.productName}</TableCell>
                            <TableCell>{result.expectedQty}</TableCell>
                            <TableCell>{result.actualQty}</TableCell>
                            <TableCell
                              className={
                                result.difference < 0
                                  ? "text-red-600"
                                  : result.difference > 0
                                    ? "text-green-600"
                                    : ""
                              }
                            >
                              {result.difference > 0 ? "+" : ""}
                              {result.difference}
                            </TableCell>
                            <TableCell>
                              {getResultStatusBadge(result.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={exportResults}
                    >
                      <Download className="ml-1 h-4 w-4" />
                      تصدير النتائج
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        // Print the results
                        const printWindow = window.open("", "_blank");
                        printWindow?.document.write(`
                          <html>
                            <head>
                              <title>تقرير مسح RFID</title>
                              <style>
                                body { font-family: Arial, sans-serif; direction: rtl; }
                                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                                th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                                th { background-color: #f2f2f2; }
                                .header { text-align: center; margin-bottom: 20px; }
                                .summary { margin: 20px 0; }
                                .summary div { margin-bottom: 10px; }
                              </style>
                            </head>
                            <body>
                              <div class="header">
                                <h1>تقرير مسح RFID</h1>
                                <p>تاريخ المسح: ${new Date().toLocaleDateString("ar-SA")}</p>
                              </div>
                              
                              <div class="summary">
                                <div>إجمالي العناصر الممسوحة: ${scanStats.totalScanned}</div>
                                <div>دقة الجرد: ${Math.round((scanStats.matchingItems / scanResults.length) * 100)}%</div>
                                <div>مدة المسح: ${Math.floor(scanDuration / 60)}:${(scanDuration % 60).toString().padStart(2, "0")}</div>
                              </div>
                              
                              <table>
                                <thead>
                                  <tr>
                                    <th>رقم المنتج</th>
                                    <th>اسم المنتج</th>
                                    <th>الكمية المتوقعة</th>
                                    <th>الكمية الفعلية</th>
                                    <th>الفرق</th>
                                    <th>الحالة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  ${scanResults
                                    .map(
                                      (result) => `
                                    <tr>
                                      <td>${result.productId}</td>
                                      <td>${result.productName}</td>
                                      <td>${result.expectedQty}</td>
                                      <td>${result.actualQty}</td>
                                      <td>${result.difference > 0 ? "+" : ""}${result.difference}</td>
                                      <td>${result.status}</td>
                                    </tr>
                                  `,
                                    )
                                    .join("")}
                                </tbody>
                              </table>
                            </body>
                          </html>
                        `);
                        printWindow?.document.close();
                      }}
                    >
                      <Printer className="ml-1 h-4 w-4" />
                      طباعة التقرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <Scan className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    لا توجد نتائج بعد
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    قم بإجراء عملية مسح RFID أولاً للحصول على نتائج
                  </p>
                  <Button
                    onClick={() => {
                      document.querySelector('[data-value="scan"]')?.click();
                    }}
                  >
                    <Scan className="ml-2 h-4 w-4" />
                    بدء عملية مسح جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RFIDScannerInterface;
