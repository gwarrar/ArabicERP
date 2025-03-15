import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  Smartphone,
  Warehouse,
  ArrowRightLeft,
  BarChart,
  Settings,
  Scan,
  Package,
  Printer,
} from "lucide-react";

// Import RFID components
import RFIDScannerInterface from "./RFIDScannerInterface";
import RFIDTagManagement from "./RFIDTagManagement";
import RFIDInventoryReport from "./RFIDInventoryReport";
import StockTransferWithRFID from "./StockTransferWithRFID";
import RFIDTagPrinting from "./RFIDTagPrinting";

const RFIDInventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("scanner");

  // Sample data for the demo
  const sessionId = "SCAN-2024-0001";
  const sessionName = "جرد المستودع الرئيسي";
  const date = "2024-08-22";
  const startTime = "10:00:00";
  const endTime = "10:45:30";
  const operator = "أحمد محمد";

  // Sample scanned items
  const scannedItems = Array.from({ length: 120 }, (_, i) => ({
    tagId: `TAG-${1000 + i}`,
    productId: `PROD-00${Math.floor(1 + Math.random() * 5)}`,
    productName: [
      "قماش قطني أبيض",
      "خيط بوليستر أسود",
      "أزرار بلاستيكية",
      "سحابات معدنية",
      "قماش قطني أسود",
    ][Math.floor(Math.random() * 5)],
    timestamp: new Date().toISOString(),
    location: "المستودع الرئيسي - A01",
  }));

  // Sample expected inventory
  const expectedInventory = [
    {
      productId: "PROD-001",
      productName: "قماش قطني أبيض",
      expectedQty: 30,
      unit: "رولون",
      location: "المستودع الرئيسي - A01",
    },
    {
      productId: "PROD-002",
      productName: "خيط بوليستر أسود",
      expectedQty: 25,
      unit: "بكرة",
      location: "المستودع الرئيسي - B03",
    },
    {
      productId: "PROD-003",
      productName: "أزرار بلاستيكية",
      expectedQty: 35,
      unit: "علبة",
      location: "المستودع الرئيسي - C02",
    },
    {
      productId: "PROD-004",
      productName: "سحابات معدنية",
      expectedQty: 40,
      unit: "علبة",
      location: "المستودع الرئيسي - D01",
    },
    {
      productId: "PROD-005",
      productName: "قماش قطني أسود",
      expectedQty: 20,
      unit: "رولون",
      location: "المستودع الرئيسي - A02",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            إدارة المخزون باستخدام RFID
          </CardTitle>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              <span>120 تاج نشط</span>
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 flex items-center gap-1"
            >
              <Smartphone className="h-3 w-3" />
              <span>3 أجهزة متصلة</span>
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
            <TabsTrigger value="tags">
              <Tag className="h-4 w-4 ml-2" />
              إدارة التاجات
            </TabsTrigger>
            <TabsTrigger value="transfer">
              <ArrowRightLeft className="h-4 w-4 ml-2" />
              مناقلة المخزون
            </TabsTrigger>
            <TabsTrigger value="report">
              <BarChart className="h-4 w-4 ml-2" />
              تقرير الجرد
            </TabsTrigger>
            <TabsTrigger value="print">
              <Printer className="h-4 w-4 ml-2" />
              طباعة التاجات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner">
            <RFIDScannerInterface />
          </TabsContent>

          <TabsContent value="tags">
            <RFIDTagManagement />
          </TabsContent>

          <TabsContent value="transfer">
            <StockTransferWithRFID />
          </TabsContent>

          <TabsContent value="report">
            <RFIDInventoryReport
              sessionId={sessionId}
              sessionName={sessionName}
              date={date}
              startTime={startTime}
              endTime={endTime}
              scannedItems={scannedItems}
              expectedInventory={expectedInventory}
              operator={operator}
            />
          </TabsContent>

          <TabsContent value="print">
            <RFIDTagPrinting />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RFIDInventoryManagement;
