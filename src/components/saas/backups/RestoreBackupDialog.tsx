import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, RotateCcw, Server, Users } from "lucide-react";
import { Backup } from "@/types/backup";

interface RestoreBackupDialogProps {
  open: boolean;
  onClose: () => void;
  backup: Backup;
}

const RestoreBackupDialog: React.FC<RestoreBackupDialogProps> = ({
  open,
  onClose,
  backup,
}) => {
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [notes, setNotes] = useState("");

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ar-SA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // تنفيذ عملية الاستعادة
  const handleRestore = () => {
    // هنا يمكن إضافة منطق استعادة النسخة الاحتياطية
    console.log("Restoring backup:", backup.id, "Notes:", notes);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {backup.type === "platform" ? (
              <Server className="h-5 w-5 text-purple-500" />
            ) : (
              <Users className="h-5 w-5 text-blue-500" />
            )}
            <span>استعادة النسخة الاحتياطية</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-md">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">تحذير هام</p>
              <p className="text-sm">
                ستؤدي استعادة النسخة الاحتياطية إلى استبدال البيانات الحالية
                بالبيانات الموجودة في النسخة الاحتياطية. هذه العملية لا يمكن
                التراجع عنها.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">تفاصيل النسخة الاحتياطية:</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الاسم:</span>
                <span>{backup.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">النوع:</span>
                <span>
                  {backup.type === "platform" ? "نسخة النظام" : "نسخة عميل"}
                </span>
              </div>
              {backup.type === "customer" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العميل:</span>
                  <span>{backup.customerName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                <span>{formatDate(backup.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الحجم:</span>
                <span>{backup.size}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات الاستعادة (اختياري)</Label>
            <Textarea
              id="notes"
              placeholder="أدخل أي ملاحظات متعلقة بعملية الاستعادة"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="confirm"
              checked={confirmRestore}
              onCheckedChange={(checked) =>
                setConfirmRestore(checked as boolean)
              }
            />
            <Label
              htmlFor="confirm"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              أؤكد أنني أفهم أن هذه العملية ستؤدي إلى استبدال البيانات الحالية
              ولا يمكن التراجع عنها.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button
            onClick={handleRestore}
            disabled={!confirmRestore}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <RotateCcw className="ml-2 h-4 w-4" />
            استعادة النسخة الاحتياطية
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreBackupDialog;
