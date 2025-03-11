import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Server,
  Users,
  Database,
  Calendar,
  HardDrive,
  Clock,
  RotateCcw,
  Trash2,
  Download,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Backup } from "@/types/backup";

interface BackupDetailsProps {
  open: boolean;
  onClose: () => void;
  backup: Backup;
  onRestore: () => void;
  onDelete: () => void;
}

const BackupDetails: React.FC<BackupDetailsProps> = ({
  open,
  onClose,
  backup,
  onRestore,
  onDelete,
}) => {
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

  // الحصول على أيقونة الحالة المناسبة
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // الحصول على نص الحالة المناسب
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتمل";
      case "in_progress":
        return "قيد التنفيذ";
      case "failed":
        return "فشل";
      default:
        return status;
    }
  };

  // الحصول على لون الحالة المناسب
  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {backup.type === "platform" ? (
              <Server className="h-5 w-5 text-purple-500" />
            ) : (
              <Users className="h-5 w-5 text-blue-500" />
            )}
            <span>{backup.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* معلومات النسخة الاحتياطية */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                معلومات النسخة الاحتياطية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المعرف:</span>
                    <span className="font-mono text-sm">{backup.id}</span>
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
                    <span className="text-muted-foreground">الحجم:</span>
                    <span>{backup.size}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      تاريخ الإنشاء:
                    </span>
                    <span>{formatDate(backup.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">مدة الاحتفاظ:</span>
                    <span>{backup.retentionDays} يوم</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة:</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(backup.status)}
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusClass(backup.status)}`}
                      >
                        {getStatusText(backup.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {backup.description && (
                <div>
                  <span className="text-muted-foreground">الوصف:</span>
                  <p className="mt-1">{backup.description}</p>
                </div>
              )}

              <div>
                <span className="text-muted-foreground">موقع التخزين:</span>
                <p className="mt-1 font-mono text-sm">{backup.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* معلومات إضافية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">تاريخ الإنشاء</p>
                <p className="font-medium">{formatDate(backup.createdAt)}</p>
              </div>
            </div>

            <div className="border rounded-md p-4 flex items-center gap-3">
              <HardDrive className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">حجم النسخة</p>
                <p className="font-medium">{backup.size}</p>
              </div>
            </div>

            <div className="border rounded-md p-4 flex items-center gap-3">
              <Database className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">نوع النسخة</p>
                <p className="font-medium">
                  {backup.type === "platform" ? "نسخة النظام" : "نسخة عميل"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 w-full justify-end">
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={backup.status === "in_progress"}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              حذف
            </Button>
            <Button
              variant="default"
              onClick={onRestore}
              disabled={backup.status !== "completed"}
            >
              <RotateCcw className="ml-2 h-4 w-4" />
              استعادة
            </Button>
            <Button variant="outline">
              <Download className="ml-2 h-4 w-4" />
              تحميل
            </Button>
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupDetails;
