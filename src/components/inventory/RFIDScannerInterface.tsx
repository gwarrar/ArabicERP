import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, CheckCircle, WifiOff, Wifi } from "lucide-react";

interface RFIDScannerInterfaceProps {
  sessionId: string;
  onScanComplete: (scannedItems: any[]) => void;
  onCancel: () => void;
}

const RFIDScannerInterface: React.FC<RFIDScannerInterfaceProps> = ({
  sessionId,
  onScanComplete,
  onCancel,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState<any[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // محاكاة الاتصال بجهاز RFID
  const connectToScanner = () => {
    setError(null);

    // محاكاة عملية الاتصال
    const connectionTimeout = setTimeout(() => {
      setIsConnected(true);
      clearTimeout(connectionTimeout);
    }, 1500);
  };

  // محاكاة بدء عملية المسح
  const startScanning = () => {
    if (!isConnected) {
      setError("الرجاء الاتصال بالماسح أولاً");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setScannedItems([]);

    // محاكاة استلام البيانات من الماسح
    const mockItems = [
      {
        tagId: "RFID-001",
        productId: "PROD-001",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-002",
        productId: "PROD-002",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-003",
        productId: "PROD-003",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-004",
        productId: "PROD-004",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-005",
        productId: "PROD-005",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-006",
        productId: "PROD-001",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-007",
        productId: "PROD-002",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-008",
        productId: "PROD-003",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-009",
        productId: "PROD-001",
        timestamp: new Date().toISOString(),
      },
      {
        tagId: "RFID-010",
        productId: "PROD-005",
        timestamp: new Date().toISOString(),
      },
    ];

    let progress = 0;
    let itemsReceived: any[] = [];
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);

      // إضافة عنصر جديد كل مرة يزداد فيها التقدم
      if (progress <= 100 && mockItems[itemsReceived.length]) {
        const newItem = mockItems[itemsReceived.length];
        itemsReceived.push(newItem);
        setScannedItems([...itemsReceived]);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 500);
  };

  // إنهاء عملية المسح وإرسال البيانات
  const handleComplete = () => {
    onScanComplete(scannedItems);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ماسح RFID</CardTitle>
        <CardDescription>قم بتوصيل جهاز RFID وابدأ عملية المسح</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">متصل</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-600">غير متصل</span>
              </>
            )}
          </div>
          <Button
            variant={isConnected ? "outline" : "default"}
            onClick={connectToScanner}
            disabled={isConnected || isScanning}
          >
            {isConnected ? "تم الاتصال" : "اتصال بالماسح"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isConnected && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>تقدم المسح:</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium">
                العناصر الممسوحة: {scannedItems.length}
              </span>
              <Button onClick={startScanning} disabled={isScanning}>
                {isScanning ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري المسح...
                  </>
                ) : (
                  "بدء المسح"
                )}
              </Button>
            </div>

            {scannedItems.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  آخر العناصر التي تم مسحها:
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم التاج</TableHead>
                        <TableHead>رقم المنتج</TableHead>
                        <TableHead>وقت المسح</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scannedItems.slice(-5).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.tagId}</TableCell>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell>
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button
          disabled={scannedItems.length === 0 || isScanning}
          onClick={handleComplete}
        >
          <CheckCircle className="ml-2 h-4 w-4" />
          إكمال المسح
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RFIDScannerInterface;
