import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Printer,
  Tag,
  QrCode,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  Info,
} from "lucide-react";

interface RFIDPrintServiceProps {
  open: boolean;
  onClose: () => void;
  rollData?: any;
  onPrintSuccess?: (tagId: string) => void;
}

const RFIDPrintService: React.FC<RFIDPrintServiceProps> = ({
  open,
  onClose,
  rollData,
  onPrintSuccess,
}) => {
  const [printStatus, setPrintStatus] = useState<
    "idle" | "printing" | "success" | "error"
  >("idle");
  const [printerType, setPrinterType] = useState("zebra");
  const [tagType, setTagType] = useState("uhf");
  const [tagSize, setTagSize] = useState("medium");
  const [tagId, setTagId] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // إنشاء معرف تاج فريد عند فتح النافذة
  React.useEffect(() => {
    if (open) {
      // إنشاء معرف فريد للتاج
      const uniqueTagId = `RFID-${rollData?.rollNumber || "ROLL"}-${Date.now().toString().slice(-6)}`;
      setTagId(uniqueTagId);
      setPrintStatus("idle");
    }
  }, [open, rollData]);

  // محاكاة عملية الطباعة
  const handlePrint = () => {
    setPrintStatus("printing");

    // محاكاة عملية الطباعة
    setTimeout(() => {
      setPrintStatus("success");

      // استدعاء وظيفة النجاح إذا كانت موجودة
      if (onPrintSuccess) {
        onPrintSuccess(tagId);
      }

      // إعادة تعيين بعد فترة
      setTimeout(() => {
        setPrintStatus("idle");
      }, 3000);
    }, 2000);
  };

  // محاكاة عملية الطباعة الفعلية
  const printRFIDLabel = () => {
    // إنشاء محتوى اللصاقة
    const labelContent = `
      <div style="width: 300px; padding: 10px; font-family: Arial; direction: rtl; text-align: right;">
        <div style="text-align: center; font-weight: bold; font-size: 14px;">
          ${rollData?.materialName || "رولون قماش"}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
          <div>رقم الرولون: ${rollData?.id || "---"}</div>
          <div>الطول: ${rollData?.length || "---"} م</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
          <div>العرض: ${rollData?.width || "150"} سم</div>
          <div>اللون: ${rollData?.colorName || "---"}</div>
        </div>
        <div style="margin-top: 5px;">المورد: ${rollData?.supplier || "---"}</div>
        <div style="margin-top: 5px;">تاريخ الاستلام: ${new Date().toLocaleDateString("ar-SA")}</div>
        <div style="text-align: center; margin-top: 10px;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
            JSON.stringify({
              tagId,
              rollId: rollData?.id,
              materialId: rollData?.materialId,
              materialName: rollData?.materialName,
              colorId: rollData?.colorId,
              colorName: rollData?.colorName,
              length: rollData?.length,
              timestamp: new Date().toISOString(),
            }),
          )}" />
        </div>
        <div style="text-align: center; margin-top: 5px; font-size: 12px;">
          ${tagId}
        </div>
      </div>
    `;

    // إنشاء نافذة طباعة
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
        <head>
          <title>طباعة تاج RFID</title>
        </head>
        <body>
          ${labelContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>طباعة تاج RFID للرولون</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* معلومات الرولون */}
          {rollData && (
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle>معلومات الرولون</AlertTitle>
              <AlertDescription>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="font-medium">رقم الرولون:</span>{" "}
                    {rollData.id}
                  </div>
                  <div>
                    <span className="font-medium">المادة:</span>{" "}
                    {rollData.materialName}
                  </div>
                  <div>
                    <span className="font-medium">الطول:</span>{" "}
                    {rollData.length} م
                  </div>
                  <div>
                    <span className="font-medium">اللون:</span>{" "}
                    {rollData.colorName}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* إعدادات الطباعة */}
          <div className="space-y-2">
            <Label htmlFor="tagId">معرف التاج</Label>
            <Input
              id="tagId"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
              placeholder="أدخل معرف التاج"
            />
            <p className="text-xs text-muted-foreground">
              سيتم استخدام هذا المعرف لربط التاج بالرولون في النظام
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="printerType">الطابعة</Label>
              <Select value={printerType} onValueChange={setPrinterType}>
                <SelectTrigger id="printerType">
                  <SelectValue placeholder="اختر الطابعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zebra">Zebra ZT411</SelectItem>
                  <SelectItem value="tsc">TSC TTP-244 Pro</SelectItem>
                  <SelectItem value="sato">SATO CL4NX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagType">نوع التاج</Label>
              <Select value={tagType} onValueChange={setTagType}>
                <SelectTrigger id="tagType">
                  <SelectValue placeholder="اختر نوع التاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uhf">UHF RFID</SelectItem>
                  <SelectItem value="hf">HF RFID</SelectItem>
                  <SelectItem value="qr">QR Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagSize">حجم التاج</Label>
            <Select value={tagSize} onValueChange={setTagSize}>
              <SelectTrigger id="tagSize">
                <SelectValue placeholder="اختر حجم التاج" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">صغير (30x15 مم)</SelectItem>
                <SelectItem value="medium">متوسط (50x25 مم)</SelectItem>
                <SelectItem value="large">كبير (100x50 مم)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* حالة الطباعة */}
          {printStatus === "printing" && (
            <div className="flex flex-col items-center justify-center p-4">
              <Printer className="h-12 w-12 text-blue-600 animate-pulse mb-2" />
              <p className="font-medium">جاري طباعة التاج...</p>
              <p className="text-sm text-muted-foreground">يرجى الانتظار</p>
            </div>
          )}

          {printStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>تمت الطباعة بنجاح</AlertTitle>
              <AlertDescription>
                تم طباعة تاج RFID للرولون بنجاح وربطه في النظام.
              </AlertDescription>
            </Alert>
          )}

          {printStatus === "error" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>فشل الطباعة</AlertTitle>
              <AlertDescription>
                حدث خطأ أثناء طباعة التاج. يرجى التحقق من الطابعة والمحاولة مرة
                أخرى.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={printStatus === "printing"}
            >
              <QrCode className="ml-2 h-4 w-4" />
              معاينة
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={printStatus === "printing"}
              >
                إلغاء
              </Button>
              <Button
                onClick={handlePrint}
                disabled={
                  printStatus === "printing" || printStatus === "success"
                }
              >
                {printStatus === "printing" ? (
                  <>
                    <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                    جاري الطباعة...
                  </>
                ) : (
                  <>
                    <Printer className="ml-2 h-4 w-4" />
                    طباعة التاج
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>

      {/* نافذة المعاينة */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>معاينة تاج RFID</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-md">
            <div className="text-center font-bold mb-2">
              {rollData?.materialName || "رولون قماش"}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
              <div>رقم الرولون: {rollData?.id || "---"}</div>
              <div>الطول: {rollData?.length || "---"} م</div>
              <div>العرض: {rollData?.width || "150"} سم</div>
              <div>اللون: {rollData?.colorName || "---"}</div>
            </div>
            <div className="text-sm mb-2">
              المورد: {rollData?.supplier || "---"}
            </div>
            <div className="text-sm mb-4">
              تاريخ الاستلام: {new Date().toLocaleDateString("ar-SA")}
            </div>
            <div className="flex justify-center mb-2">
              <QrCode className="h-24 w-24 text-gray-800" />
            </div>
            <div className="text-center text-sm">{tagId}</div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setShowPreview(false);
                printRFIDLabel();
              }}
            >
              <Printer className="ml-2 h-4 w-4" />
              طباعة فعلية
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default RFIDPrintService;
