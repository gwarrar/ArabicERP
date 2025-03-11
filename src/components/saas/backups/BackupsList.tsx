import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Search,
  Filter,
  Download,
  RotateCcw,
  Trash2,
  Database,
  Server,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Info,
} from "lucide-react";
import { Backup, RestoreOperation } from "@/types/backup";
import { backups, restoreOperations } from "@/data/backups";
import BackupDetails from "./BackupDetails";
import RestoreBackupDialog from "./RestoreBackupDialog";

const BackupsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [showBackupDetails, setShowBackupDetails] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // تصفية النسخ الاحتياطية بناءً على البحث والفلترة
  const filteredBackups = backups.filter((backup) => {
    const matchesSearch =
      searchTerm === "" ||
      backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (backup.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (backup.customerName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "platform" && backup.type === "platform") ||
      (typeFilter === "customer" && backup.type === "customer");

    const matchesStatus =
      statusFilter === "all" || backup.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // التحقق مما إذا كانت النسخة الاحتياطية قيد الاستعادة حالياً
  const isBackupBeingRestored = (backupId: string) => {
    return restoreOperations.some(
      (op) => op.backupId === backupId && op.status === "in_progress",
    );
  };

  // فتح مربع حوار تفاصيل النسخة الاحتياطية
  const handleBackupClick = (backup: Backup) => {
    setSelectedBackup(backup);
    setShowBackupDetails(true);
  };

  // فتح مربع حوار استعادة النسخة الاحتياطية
  const handleRestoreClick = (backup: Backup, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBackup(backup);
    setShowRestoreDialog(true);
  };

  // فتح مربع حوار تأكيد الحذف
  const handleDeleteClick = (backup: Backup, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBackup(backup);
    setShowDeleteConfirm(true);
  };

  // تنفيذ حذف النسخة الاحتياطية
  const confirmDelete = () => {
    // هنا يمكن إضافة منطق حذف النسخة الاحتياطية
    console.log("Deleting backup:", selectedBackup?.id);
    setShowDeleteConfirm(false);
  };

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
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">النسخ الاحتياطية</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير السجل
          </Button>
        </div>
      </div>

      {/* شريط البحث والفلترة */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث..."
            className="w-[200px] pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="نوع النسخة الاحتياطية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="platform">نسخ النظام</SelectItem>
            <SelectItem value="customer">نسخ العملاء</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالة النسخة الاحتياطية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
            <SelectItem value="failed">فشل</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setTypeFilter("all");
            setStatusFilter("all");
          }}
          className="h-10"
        >
          <Filter className="h-4 w-4 ml-1" />
          إعادة ضبط
        </Button>
      </div>

      {/* جدول النسخ الاحتياطية */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النوع</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الحجم</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>مدة الاحتفاظ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBackups.length > 0 ? (
                filteredBackups.map((backup) => (
                  <TableRow
                    key={backup.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => handleBackupClick(backup)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {backup.type === "platform" ? (
                          <Server className="h-5 w-5 text-purple-500" />
                        ) : (
                          <Users className="h-5 w-5 text-blue-500" />
                        )}
                        <span>
                          {backup.type === "platform" ? "النظام" : "عميل"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{backup.name}</TableCell>
                    <TableCell>
                      {backup.type === "customer" ? backup.customerName : "-"}
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>{formatDate(backup.createdAt)}</TableCell>
                    <TableCell>{backup.retentionDays} يوم</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(backup.status)}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusClass(backup.status)}`}
                        >
                          {getStatusText(backup.status)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleRestoreClick(backup, e)}
                          disabled={
                            backup.status !== "completed" ||
                            isBackupBeingRestored(backup.id)
                          }
                          title="استعادة النسخة الاحتياطية"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteClick(backup, e)}
                          disabled={backup.status === "in_progress"}
                          title="حذف النسخة الاحتياطية"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Database className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد نسخ احتياطية مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* مربع حوار تفاصيل النسخة الاحتياطية */}
      {selectedBackup && (
        <BackupDetails
          open={showBackupDetails}
          onClose={() => setShowBackupDetails(false)}
          backup={selectedBackup}
          onRestore={() => {
            setShowBackupDetails(false);
            setShowRestoreDialog(true);
          }}
          onDelete={() => {
            setShowBackupDetails(false);
            setShowDeleteConfirm(true);
          }}
        />
      )}

      {/* مربع حوار استعادة النسخة الاحتياطية */}
      {selectedBackup && (
        <RestoreBackupDialog
          open={showRestoreDialog}
          onClose={() => setShowRestoreDialog(false)}
          backup={selectedBackup}
        />
      )}

      {/* مربع حوار تأكيد الحذف */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p>
                  هل أنت متأكد من رغبتك في حذف النسخة الاحتياطية{" "}
                  <span className="font-bold">
                    {selectedBackup?.name || ""}
                  </span>
                  ؟
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  سيؤدي هذا الإجراء إلى حذف النسخة الاحتياطية بشكل نهائي ولن
                  تتمكن من استعادتها مرة أخرى.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BackupsList;
