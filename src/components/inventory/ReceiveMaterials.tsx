import React, { useState, useRef, useEffect } from "react";
import ReceivingReport from "./ReceivingReport";
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
import { QRCodeSVG } from "qrcode.react";
import {
  Package,
  Truck,
  Tag,
  Printer,
  Save,
  Trash,
  Edit,
  Plus,
  ArrowLeft,
  Ruler,
  Palette,
  Barcode,
  FileText,
  Download,
  RefreshCw,
  Search,
  Filter,
  Warehouse,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

// Sample data for containers
const containersData = [
  {
    id: "CNT-2024-001",
    name: "كونتينر الأقمشة القطنية",
    arrivalDate: "2024-07-15",
    status: "وصل للجمارك",
    supplier: "شركة النسيج المتحد",
    expectedItems: 120,
    expectedMaterials: [
      {
        materialId: "MAT-001",
        colorId: "COL-001",
        expectedCount: 30,
        expectedLength: 600,
      },
      {
        materialId: "MAT-001",
        colorId: "COL-002",
        expectedCount: 25,
        expectedLength: 500,
      },
      {
        materialId: "MAT-002",
        colorId: "COL-001",
        expectedCount: 35,
        expectedLength: 700,
      },
      {
        materialId: "MAT-002",
        colorId: "COL-002",
        expectedCount: 30,
        expectedLength: 600,
      },
    ],
  },
  {
    id: "CNT-2024-002",
    name: "كونتينر الأقمشة الحريرية",
    arrivalDate: "2024-07-18",
    status: "في الطريق",
    supplier: "مصنع الحرير العالمي",
    expectedItems: 85,
    expectedMaterials: [
      {
        materialId: "MAT-003",
        colorId: "COL-007",
        expectedCount: 20,
        expectedLength: 400,
      },
      {
        materialId: "MAT-003",
        colorId: "COL-008",
        expectedCount: 25,
        expectedLength: 500,
      },
      {
        materialId: "MAT-003",
        colorId: "COL-009",
        expectedCount: 20,
        expectedLength: 400,
      },
      {
        materialId: "MAT-003",
        colorId: "COL-010",
        expectedCount: 20,
        expectedLength: 400,
      },
    ],
  },
  {
    id: "CNT-2024-003",
    name: "كونتينر الأقمشة الصوفية",
    arrivalDate: "2024-07-20",
    status: "وصل للجمارك",
    supplier: "شركة الصوف الممتاز",
    expectedItems: 95,
    expectedMaterials: [
      {
        materialId: "MAT-004",
        colorId: "COL-005",
        expectedCount: 25,
        expectedLength: 500,
      },
      {
        materialId: "MAT-004",
        colorId: "COL-006",
        expectedCount: 25,
        expectedLength: 500,
      },
      {
        materialId: "MAT-004",
        colorId: "COL-011",
        expectedCount: 25,
        expectedLength: 500,
      },
      {
        materialId: "MAT-004",
        colorId: "COL-012",
        expectedCount: 20,
        expectedLength: 400,
      },
    ],
  },
];

// Sample data for warehouses
const warehousesData = [
  {
    id: "WH-001",
    name: "المستودع الرئيسي",
    location: "المنطقة الصناعية - مبنى A",
    type: "مستودع مواد خام",
  },
  {
    id: "WH-002",
    name: "مستودع المنتجات النهائية",
    location: "المنطقة الصناعية - مبنى B",
    type: "مستودع منتجات",
  },
  {
    id: "WH-003",
    name: "مستودع الإنتاج",
    location: "المنطقة الصناعية - مبنى C",
    type: "مستودع إنتاج",
  },
];

// Sample data for materials
const materialsData = [
  {
    id: "MAT-001",
    name: "قطن نسائي",
    category: "أقمشة قطنية",
    colors: [
      { id: "COL-001", name: "أبيض", code: "#FFFFFF" },
      { id: "COL-002", name: "أسود", code: "#000000" },
      { id: "COL-003", name: "أزرق", code: "#0000FF" },
      { id: "COL-004", name: "أحمر", code: "#FF0000" },
    ],
  },
  {
    id: "MAT-002",
    name: "قطن رجالي",
    category: "أقمشة قطنية",
    colors: [
      { id: "COL-001", name: "أبيض", code: "#FFFFFF" },
      { id: "COL-002", name: "أسود", code: "#000000" },
      { id: "COL-005", name: "رمادي", code: "#808080" },
      { id: "COL-006", name: "بني", code: "#A52A2A" },
    ],
  },
  {
    id: "MAT-003",
    name: "حرير طبيعي",
    category: "أقمشة حريرية",
    colors: [
      { id: "COL-007", name: "ذهبي", code: "#FFD700" },
      { id: "COL-008", name: "فضي", code: "#C0C0C0" },
      { id: "COL-009", name: "أخضر", code: "#008000" },
      { id: "COL-010", name: "بنفسجي", code: "#800080" },
    ],
  },
  {
    id: "MAT-004",
    name: "صوف خالص",
    category: "أقمشة صوفية",
    colors: [
      { id: "COL-005", name: "رمادي", code: "#808080" },
      { id: "COL-006", name: "بني", code: "#A52A2A" },
      { id: "COL-011", name: "كحلي", code: "#000080" },
      { id: "COL-012", name: "زيتي", code: "#556B2F" },
    ],
  },
];

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

const ReceiveMaterials = () => {
  // State for operation type (container receipt or initial inventory)
  const [operationType, setOperationType] = useState<"container" | "inventory">(
    "container",
  );

  // State for selected container
  const [selectedContainer, setSelectedContainer] = useState<string>("");
  const [selectedContainerData, setSelectedContainerData] = useState<any>(null);

  // State for selected warehouse
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const [selectedWarehouseData, setSelectedWarehouseData] = useState<any>(null);

  // State for selected material and color
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedMaterialData, setSelectedMaterialData] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedColorData, setSelectedColorData] = useState<any>(null);

  // State for roll length
  const [rollLength, setRollLength] = useState<string>("");

  // State for rolls data
  const [rolls, setRolls] = useState<RollData[]>([]);

  // State for selected roll for printing
  const [selectedRoll, setSelectedRoll] = useState<RollData | null>(null);

  // State for showing print preview
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);

  // State for showing report
  const [showReport, setShowReport] = useState<boolean>(false);

  // State for showing discrepancy dialog
  const [showDiscrepancyDialog, setShowDiscrepancyDialog] =
    useState<boolean>(false);

  // State for discrepancy reasons
  const [discrepancyReasons, setDiscrepancyReasons] = useState<
    Record<string, string>
  >({});

  // State for shortages
  const [shortages, setShortages] = useState<SummaryItem[]>([]);

  // Ref for roll length input to focus after adding a roll
  const rollLengthInputRef = useRef<HTMLInputElement>(null);

  // Add keyboard event listener for print preview dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showPrintPreview) {
        e.preventDefault();
        printLabel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPrintPreview]);

  // Reset selections when operation type changes
  useEffect(() => {
    setSelectedContainer("");
    setSelectedContainerData(null);
    setSelectedWarehouse("");
    setSelectedWarehouseData(null);
    setSelectedMaterial("");
    setSelectedMaterialData(null);
    setSelectedColor("");
    setSelectedColorData(null);
    setRollLength("");
  }, [operationType]);

  // Effect to update selected container data when container is selected
  useEffect(() => {
    if (selectedContainer) {
      const container = containersData.find((c) => c.id === selectedContainer);
      setSelectedContainerData(container);
    } else {
      setSelectedContainerData(null);
    }
  }, [selectedContainer]);

  // Effect to update selected warehouse data when warehouse is selected
  useEffect(() => {
    if (selectedWarehouse) {
      const warehouse = warehousesData.find((w) => w.id === selectedWarehouse);
      setSelectedWarehouseData(warehouse);
    } else {
      setSelectedWarehouseData(null);
    }
  }, [selectedWarehouse]);

  // Effect to update selected material data when material is selected
  useEffect(() => {
    if (selectedMaterial) {
      const material = materialsData.find((m) => m.id === selectedMaterial);
      setSelectedMaterialData(material);
      setSelectedColor(""); // Reset color when material changes
      setSelectedColorData(null);
    } else {
      setSelectedMaterialData(null);
    }
  }, [selectedMaterial]);

  // Effect to update selected color data when color is selected
  useEffect(() => {
    if (selectedColor && selectedMaterialData) {
      const color = selectedMaterialData.colors.find(
        (c: any) => c.id === selectedColor,
      );
      setSelectedColorData(color);
    } else {
      setSelectedColorData(null);
    }
  }, [selectedColor, selectedMaterialData]);

  // Function to generate a unique ID for a roll
  const generateRollId = () => {
    const timestamp = new Date().getTime();
    return `ROLL-${timestamp}-${Math.floor(Math.random() * 1000)}`;
  };

  // Function to generate QR code data
  const generateQRCodeData = (
    roll: Omit<RollData, "id" | "qrCode" | "timestamp">,
  ) => {
    return JSON.stringify({
      materialId: roll.materialId,
      materialName: roll.materialName,
      colorId: roll.colorId,
      colorName: roll.colorName,
      length: roll.length,
      containerId: roll.containerId,
      warehouseId: roll.warehouseId,
      operationType: roll.operationType,
      timestamp: new Date().toISOString(),
    });
  };

  // Function to handle adding a new roll
  const handleAddRoll = () => {
    // Validate inputs
    if (
      (operationType === "container" &&
        (!selectedContainer || !selectedWarehouse)) ||
      (operationType === "inventory" && !selectedWarehouse) ||
      !selectedMaterial ||
      !selectedColor ||
      !rollLength ||
      isNaN(parseFloat(rollLength)) ||
      parseFloat(rollLength) <= 0
    ) {
      // Show validation error
      alert("يرجى إدخال جميع البيانات المطلوبة بشكل صحيح");
      return;
    }

    const newRoll: RollData = {
      id: generateRollId(),
      materialId: selectedMaterial,
      materialName: selectedMaterialData.name,
      colorId: selectedColor,
      colorName: selectedColorData.name,
      colorCode: selectedColorData.code,
      length: parseFloat(rollLength),
      timestamp: new Date(),
      operationType: operationType,
      qrCode: "", // Will be set below
    };

    // Set container or warehouse ID based on operation type
    if (operationType === "container") {
      newRoll.containerId = selectedContainer;
      newRoll.warehouseId = selectedWarehouse; // Set warehouse ID for container receipts
    } else {
      newRoll.warehouseId = selectedWarehouse;
    }

    // Generate QR code data
    newRoll.qrCode = generateQRCodeData(newRoll);

    // Add the new roll to the beginning of the rolls array
    setRolls([newRoll, ...rolls]);

    // Clear the roll length input and focus on it for the next entry
    setRollLength("");
    if (rollLengthInputRef.current) {
      rollLengthInputRef.current.focus();
    }

    // Show print preview for the new roll
    setSelectedRoll(newRoll);
    setShowPrintPreview(true);
  };

  // Function to handle roll length input keypress
  const handleRollLengthKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      handleAddRoll();
    }
  };

  // Function to handle printing a roll label
  const handlePrintLabel = (roll: RollData) => {
    setSelectedRoll(roll);
    setShowPrintPreview(true);
  };

  // Function to actually print the label
  const printLabel = () => {
    // In a real application, this would send the data to a printer
    // For now, we'll just close the preview
    setShowPrintPreview(false);

    // Focus back on the roll length input after closing the preview
    setTimeout(() => {
      if (rollLengthInputRef.current) {
        rollLengthInputRef.current.focus();
      }
    }, 100);
  };

  // Function to delete a roll
  const handleDeleteRoll = (rollId: string) => {
    setRolls(rolls.filter((roll) => roll.id !== rollId));
  };

  // Calculate summary data with expected quantities
  const calculateSummary = () => {
    const summary: Record<string, SummaryItem> = {};

    // Initialize summary with expected quantities from container data if available
    if (
      operationType === "container" &&
      selectedContainerData?.expectedMaterials
    ) {
      selectedContainerData.expectedMaterials.forEach((expected: any) => {
        const material = materialsData.find(
          (m) => m.id === expected.materialId,
        );
        const color = material?.colors.find(
          (c: any) => c.id === expected.colorId,
        );

        if (material && color) {
          const key = `${expected.materialId}-${expected.colorId}`;
          summary[key] = {
            materialId: expected.materialId,
            colorId: expected.colorId,
            materialName: material.name,
            colorName: color.name,
            count: 0,
            totalLength: 0,
            expectedCount: expected.expectedCount,
            expectedLength: expected.expectedLength,
            countDiff: -expected.expectedCount,
            lengthDiff: -expected.expectedLength,
          };
        }
      });
    }

    // Add actual roll data to summary
    rolls.forEach((roll) => {
      // Only include rolls that match the current operation type and container/warehouse
      if (
        (operationType === "container" &&
          (roll.containerId !== selectedContainer ||
            roll.warehouseId !== selectedWarehouse)) ||
        (operationType === "inventory" &&
          roll.warehouseId !== selectedWarehouse)
      ) {
        return;
      }

      const key = `${roll.materialId}-${roll.colorId}`;
      if (!summary[key]) {
        summary[key] = {
          materialId: roll.materialId,
          colorId: roll.colorId,
          materialName: roll.materialName,
          colorName: roll.colorName,
          count: 0,
          totalLength: 0,
          expectedCount: 0,
          expectedLength: 0,
          countDiff: 0,
          lengthDiff: 0,
        };
      }
      summary[key].count += 1;
      summary[key].totalLength += roll.length;

      // Update differences
      summary[key].countDiff = summary[key].count - summary[key].expectedCount;
      summary[key].lengthDiff =
        summary[key].totalLength - summary[key].expectedLength;
    });

    return Object.values(summary);
  };

  const summaryData = calculateSummary();

  // Calculate total rolls and total length
  const filteredRolls = rolls.filter(
    (roll) =>
      (operationType === "container" &&
        roll.containerId === selectedContainer &&
        roll.warehouseId === selectedWarehouse) ||
      (operationType === "inventory" && roll.warehouseId === selectedWarehouse),
  );

  const totalRolls = filteredRolls.length;
  const totalLength = filteredRolls.reduce((sum, roll) => sum + roll.length, 0);

  // Calculate expected totals
  const expectedTotalRolls =
    operationType === "container" && selectedContainerData?.expectedMaterials
      ? selectedContainerData.expectedMaterials.reduce(
          (sum: number, item: any) => sum + item.expectedCount,
          0,
        )
      : 0;

  const expectedTotalLength =
    operationType === "container" && selectedContainerData?.expectedMaterials
      ? selectedContainerData.expectedMaterials.reduce(
          (sum: number, item: any) => sum + item.expectedLength,
          0,
        )
      : 0;

  // Calculate differences
  const totalRollsDiff = totalRolls - expectedTotalRolls;
  const totalLengthDiff = totalLength - expectedTotalLength;

  // Check if inputs are valid for adding a roll
  const isInputValid =
    (operationType === "container"
      ? !!selectedContainer && !!selectedWarehouse
      : !!selectedWarehouse) &&
    !!selectedMaterial &&
    !!selectedColor;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {operationType === "container"
            ? "استلام المواد - كونتينر الأقمشة"
            : "جرد أول المدة - المخزون"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="ml-1 h-3 w-3" />
            تقرير الاستلام
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-1 h-3 w-3" />
            تصدير البيانات
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="ml-1 h-3 w-3" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Operation Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="ml-2 h-5 w-5" />
            نوع العملية
          </CardTitle>
          <CardDescription>
            اختر نوع العملية: استلام كونتينر أو جرد أول المدة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center">
              <Button
                variant={operationType === "container" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setOperationType("container")}
              >
                <Truck className="h-4 w-4" />
                استلام كونتينر
              </Button>
            </div>
            <div className="flex items-center">
              <Button
                variant={operationType === "inventory" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setOperationType("inventory")}
              >
                <ClipboardList className="h-4 w-4" />
                جرد أول المدة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Container/Warehouse Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {operationType === "container" ? (
                <>
                  <Truck className="ml-2 h-5 w-5" />
                  اختيار الكونتينر
                </>
              ) : (
                <>
                  <Warehouse className="ml-2 h-5 w-5" />
                  اختيار المستودع
                </>
              )}
            </CardTitle>
            <CardDescription>
              {operationType === "container"
                ? "اختر الكونتينر الوارد لاستلامه بعد الجمركة"
                : "اختر المستودع لجرد البضائع الموجودة فيه"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationType === "container" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="container">الكونتينر</Label>
                    <Select
                      value={selectedContainer}
                      onValueChange={setSelectedContainer}
                    >
                      <SelectTrigger id="container">
                        <SelectValue placeholder="اختر الكونتينر" />
                      </SelectTrigger>
                      <SelectContent>
                        {containersData.map((container) => (
                          <SelectItem key={container.id} value={container.id}>
                            {container.name} ({container.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedContainerData && (
                    <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          رقم الكونتينر:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedContainerData.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">المورد:</span>
                        <span className="text-sm font-medium">
                          {selectedContainerData.supplier}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          تاريخ الوصول:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedContainerData.arrivalDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">الحالة:</span>
                        <Badge
                          variant="outline"
                          className={`${selectedContainerData.status === "وصل للجمارك" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {selectedContainerData.status}
                        </Badge>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="warehouse">المستودع</Label>
                    <Select
                      value={selectedWarehouse}
                      onValueChange={setSelectedWarehouse}
                    >
                      <SelectTrigger id="warehouse">
                        <SelectValue placeholder="اختر المستودع" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehousesData.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} ({warehouse.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedWarehouseData && (
                    <div className="border rounded-md p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          رقم المستودع:
                        </span>
                        <span className="text-sm font-medium">
                          {selectedWarehouseData.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">الموقع:</span>
                        <span className="text-sm font-medium">
                          {selectedWarehouseData.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">النوع:</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {selectedWarehouseData.type}
                        </Badge>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Warehouse Selection for Container Receipt */}
              {operationType === "container" && selectedContainer && (
                <div className="space-y-2 mt-4 pt-4 border-t">
                  <Label
                    htmlFor="receiving-warehouse"
                    className="flex items-center font-semibold text-blue-700"
                  >
                    <Warehouse className="ml-1 h-4 w-4" /> المستودع المستلم
                    (مطلوب)
                  </Label>
                  <Select
                    value={selectedWarehouse}
                    onValueChange={setSelectedWarehouse}
                  >
                    <SelectTrigger id="receiving-warehouse">
                      <SelectValue placeholder="اختر المستودع المستلم" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehousesData.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} ({warehouse.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-blue-600 mt-1">
                    <AlertCircle className="inline-block h-3 w-3 ml-1" />
                    يجب تحديد المستودع الذي سيستلم الكونتينر لإدخاله وتحديث
                    الكميات في جرد المستودع
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Material and Color Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="ml-2 h-5 w-5" />
              بيانات المادة
            </CardTitle>
            <CardDescription>
              اختر المادة واللون أو أدخل الكود مباشرة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material" className="flex items-center">
                  <Tag className="ml-1 h-4 w-4" /> المادة
                </Label>
                <Select
                  value={selectedMaterial}
                  onValueChange={setSelectedMaterial}
                  disabled={
                    !(
                      (operationType === "container" && selectedContainer) ||
                      (operationType === "inventory" && selectedWarehouse)
                    )
                  }
                >
                  <SelectTrigger id="material">
                    <SelectValue placeholder="اختر المادة" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialsData.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        {material.name} - {material.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color" className="flex items-center">
                  <Palette className="ml-1 h-4 w-4" /> اللون
                </Label>
                <Select
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  disabled={!selectedMaterial}
                >
                  <SelectTrigger id="color">
                    <SelectValue placeholder="اختر اللون" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMaterialData?.colors.map((color: any) => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full mr-2"
                            style={{ backgroundColor: color.code }}
                          />
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMaterialData && selectedColorData && (
                <div className="flex items-center space-x-2 space-x-reverse mt-2">
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: selectedColorData.code }}
                  />
                  <span className="text-sm font-medium">
                    {selectedMaterialData.name} - {selectedColorData.name}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Roll Length Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ruler className="ml-2 h-5 w-5" />
              طول الرولون
            </CardTitle>
            <CardDescription>
              أدخل طول الرولون بالأمتار واضغط Enter للإضافة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="length">الطول (متر)</Label>
                <div className="flex">
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="أدخل طول الرولون"
                    value={rollLength}
                    onChange={(e) => setRollLength(e.target.value)}
                    onKeyPress={handleRollLengthKeyPress}
                    ref={rollLengthInputRef}
                    className="ml-2"
                    disabled={!isInputValid}
                  />
                  <Button
                    onClick={handleAddRoll}
                    disabled={!isInputValid || !rollLength}
                  >
                    <Plus className="ml-1 h-4 w-4" />
                    إضافة
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-gray-50">
                <p className="text-sm text-gray-500 mb-2">
                  بعد إدخال الطول والضغط على Enter:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>سيتم إضافة بيانات الرول إلى الجدول</li>
                  <li>سيتم طباعة لصاقة تحتوي على بيانات الرول وكود QR</li>
                  <li>سيعود المؤشر تلقائياً لإدخال رول جديد</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Two Rolls Summary */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                آخر رولونين{" "}
                {operationType === "container" ? "مستلمين" : "مجرودين"}
              </CardTitle>
              <CardDescription>
                ملخص سريع لآخر رولونين تم إدخالهما للتأكد من صحة البيانات
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              تم التحديث: {new Date().toLocaleTimeString("ar-SA")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الرول</TableHead>
                  <TableHead>المادة</TableHead>
                  <TableHead>اللون</TableHead>
                  <TableHead>الطول (متر)</TableHead>
                  <TableHead>وقت الإدخال</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRolls.length > 0 ? (
                  filteredRolls.slice(0, 2).map((roll) => (
                    <TableRow key={roll.id} className="bg-blue-50">
                      <TableCell className="font-medium">{roll.id}</TableCell>
                      <TableCell>{roll.materialName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full ml-2"
                            style={{ backgroundColor: roll.colorCode }}
                          />
                          {roll.colorName}
                        </div>
                      </TableCell>
                      <TableCell>{roll.length} متر</TableCell>
                      <TableCell>
                        {roll.timestamp.toLocaleTimeString("ar-SA")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePrintLabel(roll)}
                          >
                            <Printer className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRoll(roll.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Package className="h-6 w-6 mb-1" />
                        <p>
                          {operationType === "container"
                            ? "لم يتم إدخال أي رولونات بعد"
                            : "لم يتم جرد أي رولونات بعد"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>
            {operationType === "container" ? "ملخص الاستلام" : "ملخص الجرد"}
          </CardTitle>
          <CardDescription>
            {operationType === "container"
              ? "ملخص إجمالي للرولونات المستلمة حسب المادة واللون مع مقارنة بالكميات المتوقعة"
              : "ملخص إجمالي للرولونات المجرودة حسب المادة واللون"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المادة</TableHead>
                    <TableHead>اللون</TableHead>
                    {operationType === "container" && (
                      <>
                        <TableHead>العدد المتوقع</TableHead>
                        <TableHead>الأمتار المتوقعة</TableHead>
                      </>
                    )}
                    <TableHead>العدد المستلم</TableHead>
                    <TableHead>الأمتار المستلمة</TableHead>
                    {operationType === "container" && (
                      <>
                        <TableHead>الفرق (العدد)</TableHead>
                        <TableHead>الفرق (الأمتار)</TableHead>
                        <TableHead>الحالة</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData.length > 0 ? (
                    summaryData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.materialName}</TableCell>
                        <TableCell>{item.colorName}</TableCell>
                        {operationType === "container" && (
                          <>
                            <TableCell>{item.expectedCount} رولون</TableCell>
                            <TableCell>{item.expectedLength} متر</TableCell>
                          </>
                        )}
                        <TableCell>{item.count} رولون</TableCell>
                        <TableCell>{item.totalLength} متر</TableCell>
                        {operationType === "container" && (
                          <>
                            <TableCell
                              className={
                                item.countDiff < 0
                                  ? "text-red-600"
                                  : item.countDiff > 0
                                    ? "text-green-600"
                                    : ""
                              }
                            >
                              {item.countDiff > 0 ? "+" : ""}
                              {item.countDiff} رولون
                            </TableCell>
                            <TableCell
                              className={
                                item.lengthDiff < 0
                                  ? "text-red-600"
                                  : item.lengthDiff > 0
                                    ? "text-green-600"
                                    : ""
                              }
                            >
                              {item.lengthDiff > 0 ? "+" : ""}
                              {item.lengthDiff} متر
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  item.countDiff < 0
                                    ? "bg-red-100 text-red-800"
                                    : item.countDiff > 0
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                {item.countDiff < 0
                                  ? "ناقص"
                                  : item.countDiff > 0
                                    ? "زائد"
                                    : "مطابق"}
                              </Badge>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={operationType === "container" ? 9 : 4}
                        className="text-center py-4"
                      >
                        لا توجد بيانات للعرض
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operationType === "container" ? (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">الرولونات:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">
                            {totalRolls} / {expectedTotalRolls}
                          </span>
                          <span
                            className={
                              totalRollsDiff < 0
                                ? "text-red-600"
                                : totalRollsDiff > 0
                                  ? "text-green-600"
                                  : "text-blue-600"
                            }
                          >
                            ({totalRollsDiff > 0 ? "+" : ""}
                            {totalRollsDiff})
                            {totalRollsDiff < 0 ? (
                              <TrendingDown className="h-4 w-4 inline ml-1" />
                            ) : totalRollsDiff > 0 ? (
                              <TrendingUp className="h-4 w-4 inline ml-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 inline ml-1" />
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">الأمتار:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">
                            {totalLength} / {expectedTotalLength}
                          </span>
                          <span
                            className={
                              totalLengthDiff < 0
                                ? "text-red-600"
                                : totalLengthDiff > 0
                                  ? "text-green-600"
                                  : "text-blue-600"
                            }
                          >
                            ({totalLengthDiff > 0 ? "+" : ""}
                            {totalLengthDiff})
                            {totalLengthDiff < 0 ? (
                              <TrendingDown className="h-4 w-4 inline ml-1" />
                            ) : totalLengthDiff > 0 ? (
                              <TrendingUp className="h-4 w-4 inline ml-1" />
                            ) : (
                              <CheckCircle className="h-4 w-4 inline ml-1" />
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">
                          إجمالي عدد الرولونات:
                        </span>
                        <span className="text-xl font-bold">
                          {totalRolls} رولون
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">إجمالي الأمتار:</span>
                        <span className="text-xl font-bold">
                          {totalLength} متر
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                className="ml-2"
                onClick={() => {
                  // In a real application, this would save the data to a database
                  if (operationType === "container") {
                    // Check for discrepancies
                    const discrepancies = summaryData.filter(
                      (item) => item.countDiff !== 0 || item.lengthDiff !== 0,
                    );

                    if (discrepancies.length > 0) {
                      // There are discrepancies, show the dialog
                      setShortages(
                        discrepancies.filter(
                          (item) => item.countDiff < 0 || item.lengthDiff < 0,
                        ),
                      );
                      setShowDiscrepancyDialog(true);
                    } else {
                      // No discrepancies, show the report directly
                      setShowReport(true);
                    }
                  } else {
                    // Handle inventory save
                    alert("تم حفظ بيانات الجرد بنجاح");
                  }
                }}
                disabled={filteredRolls.length === 0}
              >
                <Save className="ml-1 h-4 w-4" />
                {operationType === "container"
                  ? "حفظ وإنهاء الاستلام"
                  : "حفظ وإنهاء الجرد"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Rolls Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {operationType === "container"
                  ? "الرولونات المستلمة"
                  : "الرولونات المجرودة"}
              </CardTitle>
              <CardDescription>
                {operationType === "container"
                  ? "قائمة بجميع الرولونات التي تم استلامها من الكونتينر"
                  : "قائمة بجميع الرولونات التي تم جردها في المستودع"}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {filteredRolls.length} رولون
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الرول</TableHead>
                  <TableHead>المادة</TableHead>
                  <TableHead>اللون</TableHead>
                  <TableHead>الطول (متر)</TableHead>
                  <TableHead>وقت الإدخال</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRolls.length > 0 ? (
                  filteredRolls.map((roll) => (
                    <TableRow key={roll.id}>
                      <TableCell className="font-medium">{roll.id}</TableCell>
                      <TableCell>{roll.materialName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full ml-2"
                            style={{ backgroundColor: roll.colorCode }}
                          />
                          {roll.colorName}
                        </div>
                      </TableCell>
                      <TableCell>{roll.length} متر</TableCell>
                      <TableCell>
                        {roll.timestamp.toLocaleTimeString("ar-SA")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePrintLabel(roll)}
                          >
                            <Printer className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRoll(roll.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Package className="h-8 w-8 mb-2" />
                        <p>
                          {operationType === "container"
                            ? "لم يتم إدخال أي رولونات بعد"
                            : "لم يتم جرد أي رولونات بعد"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Print Preview Dialog */}
      {showPrintPreview && selectedRoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">معاينة اللصاقة</h3>
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">رقم الرول:</span>
                <span className="text-sm font-medium">{selectedRoll.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">المادة:</span>
                <span className="text-sm font-medium">
                  {selectedRoll.materialName}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">اللون:</span>
                <div className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full ml-1"
                    style={{ backgroundColor: selectedRoll.colorCode }}
                  />
                  <span className="text-sm font-medium">
                    {selectedRoll.colorName}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">الطول:</span>
                <span className="text-sm font-medium">
                  {selectedRoll.length} متر
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {selectedRoll.operationType === "container"
                    ? "الكونتينر:"
                    : "المستودع:"}
                </span>
                <span className="text-sm font-medium">
                  {selectedRoll.operationType === "container"
                    ? containersData.find(
                        (c) => c.id === selectedRoll.containerId,
                      )?.name
                    : warehousesData.find(
                        (w) => w.id === selectedRoll.warehouseId,
                      )?.name}
                </span>
              </div>
              <div className="flex justify-center mb-2">
                <QRCodeSVG
                  value={selectedRoll.qrCode}
                  size={150}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="text-center text-xs text-gray-500">
                تم{" "}
                {selectedRoll.operationType === "container"
                  ? "الاستلام"
                  : "الجرد"}
                : {selectedRoll.timestamp.toLocaleString("ar-SA")}
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button
                variant="outline"
                onClick={() => setShowPrintPreview(false)}
              >
                إغلاق
              </Button>
              <Button onClick={printLabel}>
                <Printer className="ml-1 h-4 w-4" />
                طباعة
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Discrepancy Dialog */}
      {showDiscrepancyDialog && operationType === "container" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-600">
                تنبيه: اختلاف في الكميات المستلمة
              </h2>
            </div>

            <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-amber-800 flex items-center">
                <AlertCircle className="ml-2 h-5 w-5" />
                توجد اختلافات بين الكميات المتوقعة والكميات المستلمة. يرجى توضيح
                سبب الاختلاف لكل مادة.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المادة</TableHead>
                    <TableHead>اللون</TableHead>
                    <TableHead>العدد المتوقع</TableHead>
                    <TableHead>العدد المستلم</TableHead>
                    <TableHead>الفرق</TableHead>
                    <TableHead>سبب الاختلاف</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData
                    .filter(
                      (item) => item.countDiff !== 0 || item.lengthDiff !== 0,
                    )
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        className={
                          item.countDiff < 0
                            ? "bg-red-50"
                            : item.countDiff > 0
                              ? "bg-green-50"
                              : ""
                        }
                      >
                        <TableCell>{item.materialName}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className="h-3 w-3 rounded-full ml-2"
                              style={{
                                backgroundColor:
                                  materialsData
                                    .find((m) => m.id === item.materialId)
                                    ?.colors.find(
                                      (c: any) => c.id === item.colorId,
                                    )?.code || "#000000",
                              }}
                            />
                            {item.colorName}
                          </div>
                        </TableCell>
                        <TableCell>{item.expectedCount} رولون</TableCell>
                        <TableCell>{item.count} رولون</TableCell>
                        <TableCell
                          className={
                            item.countDiff < 0
                              ? "text-red-600"
                              : item.countDiff > 0
                                ? "text-green-600"
                                : ""
                          }
                        >
                          {item.countDiff > 0 ? "+" : ""}
                          {item.countDiff} رولون
                        </TableCell>
                        <TableCell>
                          <textarea
                            className="w-full p-2 border rounded-md text-sm"
                            rows={2}
                            placeholder="أدخل سبب الاختلاف هنا..."
                            value={
                              discrepancyReasons[
                                `${item.materialId}-${item.colorId}`
                              ] || ""
                            }
                            onChange={(e) => {
                              setDiscrepancyReasons({
                                ...discrepancyReasons,
                                [`${item.materialId}-${item.colorId}`]:
                                  e.target.value,
                              });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {shortages.length > 0 && (
              <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                  <AlertCircle className="ml-2 h-5 w-5" />
                  نواقص في الكونتينر
                </h3>
                <p className="text-red-700 mb-4">
                  سيتم إنشاء ملف نواقص لمطالبة المورد بالكميات الناقصة. يرجى
                  التأكد من إدخال سبب النقص لكل مادة.
                </p>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المادة</TableHead>
                        <TableHead>اللون</TableHead>
                        <TableHead>العدد الناقص</TableHead>
                        <TableHead>الأمتار الناقصة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shortages.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.materialName}</TableCell>
                          <TableCell>{item.colorName}</TableCell>
                          <TableCell className="text-red-600">
                            {Math.abs(item.countDiff)} رولون
                          </TableCell>
                          <TableCell className="text-red-600">
                            {Math.abs(item.lengthDiff)} متر
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDiscrepancyDialog(false)}
              >
                إلغاء
              </Button>
              <Button
                onClick={() => {
                  // Update summary data with reasons
                  const updatedSummaryData = summaryData.map((item) => {
                    const key = `${item.materialId}-${item.colorId}`;
                    if (discrepancyReasons[key]) {
                      return {
                        ...item,
                        discrepancyReason: discrepancyReasons[key],
                        shortageFileGenerated:
                          item.countDiff < 0 || item.lengthDiff < 0,
                      };
                    }
                    return item;
                  });

                  // Check if all discrepancies have reasons
                  const missingReasons = updatedSummaryData.filter(
                    (item) =>
                      (item.countDiff !== 0 || item.lengthDiff !== 0) &&
                      !item.discrepancyReason,
                  );

                  if (missingReasons.length > 0) {
                    alert("يرجى إدخال سبب الاختلاف لجميع المواد");
                    return;
                  }

                  // Close discrepancy dialog and show report
                  setShowDiscrepancyDialog(false);
                  setShowReport(true);
                }}
              >
                حفظ ومتابعة
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Receiving Report Dialog - Always render but control visibility with isOpen prop */}
      <ReceivingReport
        isOpen={
          showReport &&
          operationType === "container" &&
          !!selectedContainerData &&
          !!selectedWarehouseData
        }
        containerId={selectedContainer}
        containerName={selectedContainerData?.name || ""}
        warehouseId={selectedWarehouse}
        warehouseName={selectedWarehouseData?.name || ""}
        rolls={filteredRolls}
        summaryData={summaryData.map((item) => {
          const key = `${item.materialId}-${item.colorId}`;
          return {
            ...item,
            discrepancyReason: discrepancyReasons[key] || "",
            shortageFileGenerated:
              (item.countDiff < 0 || item.lengthDiff < 0) &&
              !!discrepancyReasons[key],
          };
        })}
        totalRolls={totalRolls}
        totalLength={totalLength}
        expectedTotalRolls={expectedTotalRolls}
        expectedTotalLength={expectedTotalLength}
        receiptDate={new Date()}
        materialsData={materialsData}
        shortages={shortages.map((item) => {
          const key = `${item.materialId}-${item.colorId}`;
          return {
            ...item,
            discrepancyReason: discrepancyReasons[key] || "",
          };
        })}
        onClose={() => {
          setShowReport(false);
          // Reset form after closing report
          setSelectedContainer("");
          setSelectedContainerData(null);
          setSelectedWarehouse("");
          setSelectedWarehouseData(null);
          setSelectedMaterial("");
          setSelectedMaterialData(null);
          setSelectedColor("");
          setSelectedColorData(null);
          setRollLength("");
          setRolls([]);
          setDiscrepancyReasons({});
          setShortages([]);
        }}
      />
    </div>
  );
};

export default ReceiveMaterials;
