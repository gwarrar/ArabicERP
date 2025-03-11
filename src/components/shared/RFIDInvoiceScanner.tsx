import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, Tag, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ScannedProduct {
  tagId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  timestamp: string;
}

interface RFIDInvoiceScannerProps {
  onItemScanned: (item: ScannedProduct) => void;
  isActive?: boolean;
  onToggleScanning?: (isScanning: boolean) => void;
}

const RFIDInvoiceScanner: React.FC<RFIDInvoiceScannerProps> = ({
  onItemScanned,
  isActive = false,
  onToggleScanning,
}) => {
  const [scanning, setScanning] = useState(false);
  const [lastScannedItem, setLastScannedItem] = useState<ScannedProduct | null>(
    null,
  );
  const [scannedCount, setScannedCount] = useState(0);
  const [scanInterval, setScanInterval] = useState<NodeJS.Timeout | null>(null);

  // محاكاة عملية المسح
  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        // محاكاة مسح منتج جديد
        const mockItem: ScannedProduct = {
          tagId: `TAG-${Math.floor(1000 + Math.random() * 9000)}`,
          productId: `PROD-00${Math.floor(1 + Math.random() * 5)}`,
          productName: [
            "قماش قطني أبيض",
            "خيط بوليستر أسود",
            "أزرار بلاستيكية",
            "سحابات معدنية",
            "قماش قطني أسود",
          ][Math.floor(Math.random() * 5)],
          price: Math.floor(50 + Math.random() * 200),
          quantity: 1,
          unit: ["قطعة", "متر", "كيلوغرام", "علبة"][
            Math.floor(Math.random() * 4)
          ],
          timestamp: new Date().toISOString(),
        };

        setLastScannedItem(mockItem);
        setScannedCount((prev) => prev + 1);
        onItemScanned(mockItem);
      }, 2000);

      setScanInterval(interval);

      return () => {
        clearInterval(interval);
        setScanInterval(null);
      };
    }
  }, [scanning, onItemScanned]);

  const toggleScanning = () => {
    const newScanningState = !scanning;
    setScanning(newScanningState);
    if (onToggleScanning) {
      onToggleScanning(newScanningState);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center">
            <Tag className="ml-2 h-5 w-5 text-blue-600" />
            ماسح RFID للفاتورة
          </CardTitle>
          <Badge
            className={
              scanning
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }
          >
            {scanning ? "نشط" : "غير نشط"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Zap className="h-4 w-4 ml-2 text-blue-600" />
              <span className="text-sm">العناصر الممسوحة: {scannedCount}</span>
            </div>
            <Button
              size="sm"
              variant={scanning ? "destructive" : "default"}
              onClick={toggleScanning}
            >
              {scanning ? "إيقاف المسح" : "بدء المسح"}
              <Scan className="mr-2 h-4 w-4" />
            </Button>
          </div>

          {lastScannedItem && (
            <div className="border rounded-md p-2 bg-blue-50 text-sm">
              <div className="flex items-center mb-1">
                <CheckCircle className="h-4 w-4 ml-1 text-green-600" />
                <span className="font-medium">آخر عنصر تم مسحه:</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span>المنتج: {lastScannedItem.productName}</span>
                <span>
                  الكمية: {lastScannedItem.quantity} {lastScannedItem.unit}
                </span>
                <span>السعر: {lastScannedItem.price}</span>
                <span>رقم التاغ: {lastScannedItem.tagId}</span>
              </div>
            </div>
          )}

          <Alert className="bg-blue-50 border-blue-200">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertTitle>تعليمات المسح</AlertTitle>
            <AlertDescription className="text-xs">
              قرّب الماسح من المنتجات لمسح تاغات RFID. سيتم إضافة المنتجات
              تلقائياً إلى الفاتورة.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFIDInvoiceScanner;
