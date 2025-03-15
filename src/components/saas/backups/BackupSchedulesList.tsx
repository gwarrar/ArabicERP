import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  Plus,
  Edit,
  Trash2,
  Calendar,
  Server,
  Users,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { BackupSchedule } from "@/types/backup";
import { backupSchedules } from "@/data/backups";
import BackupScheduleForm from "./BackupScheduleForm";

const BackupSchedulesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSchedule, setSelectedSchedule] =
    useState<BackupSchedule | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // تصفية جداول النسخ الاحتياطي بناءً على البحث والفلترة
  const filteredSchedules = backupSchedules.filter((schedule) => {
    const matchesSearch =
      searchTerm === "" ||
      schedule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (schedule.customerName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "platform" && schedule.type === "platform") ||
      (typeFilter === "customer" && schedule.type === "customer");

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && schedule.status === "active") ||
      (statusFilter === "inactive" && schedule.status === "inactive");

    return matchesSearch && matchesType && matchesStatus;
  });

  // فتح نموذج إضافة جدول نسخ احتياطي جديد
  const handleAddSchedule = () => {
    setIsEditing(false);
    setSelectedSchedule(null);
    setShowScheduleForm(true);
  };

  // فتح نموذج تعديل جدول نسخ احتياطي
  const handleEditSchedule = (
    schedule: BackupSchedule,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setIsEditing(true);
    setSelectedSchedule(schedule);
    setShowScheduleForm(true);
  };

  // فتح مربع حوار تأكيد الحذف
  const handleDeleteClick = (schedule: BackupSchedule, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSchedule(schedule);
    setShowDeleteConfirm(true);
  };

  // تنفيذ حذف جدول النسخ الاحتياطي
  const confirmDelete = () => {
    // هنا يمكن إضافة منطق حذف جدول النسخ الاحتياطي
    console.log("Deleting schedule:", selectedSchedule?.id);
    setShowDeleteConfirm(false);
  };

  // تبديل حالة جدول النسخ الاحتياطي (نشط/غير نشط)
  const toggleScheduleStatus = (
    schedule: BackupSchedule,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    // هنا يمكن إضافة منطق تبديل حالة جدول النسخ الاحتياطي
    console.log(
      "Toggling schedule status:",
      schedule.id,
      "Current status:",
      schedule.status,
    );
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

  // الحصول على نص التكرار المناسب
  const getFrequencyText = (frequency: string, day?: number) => {
    switch (frequency) {
      case "daily":
        return "يومي";
      case "weekly":
        return `أسبوعي (${getDayName(day || 0)})`;
      case "monthly":
        return `شهري (اليوم ${day})`;
      default:
        return frequency;
    }
  };

  // الحصول على اسم اليوم بناءً على رقمه
  const getDayName = (day: number) => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[day];
  };

  // حفظ جدول النسخ الاحتياطي (إضافة أو تعديل)
  const handleSaveSchedule = (scheduleData: any) => {
    // هنا يمكن إضافة منطق حفظ جدول النسخ الاحتياطي
    console.log("Saving schedule:", scheduleData);
    setShowScheduleForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">جداول النسخ الاحتياطي</h2>
        <Button onClick={handleAddSchedule}>
          <Plus className="ml-2 h-4 w-4" />
          جدول جديد
        </Button>
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
            <SelectValue placeholder="نوع الجدول" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="platform">جداول النظام</SelectItem>
            <SelectItem value="customer">جداول العملاء</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالة الجدول" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="inactive">غير نشط</SelectItem>
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

      {/* جدول جداول النسخ الاحتياطي */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النوع</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>التكرار</TableHead>
                <TableHead>الوقت</TableHead>
                <TableHead>مدة الاحتفاظ</TableHead>
                <TableHead>التشغيل القادم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {schedule.type === "platform" ? (
                          <Server className="h-5 w-5 text-purple-500" />
                        ) : (
                          <Users className="h-5 w-5 text-blue-500" />
                        )}
                        <span>
                          {schedule.type === "platform" ? "النظام" : "عميل"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {schedule.name}
                    </TableCell>
                    <TableCell>
                      {schedule.type === "customer"
                        ? schedule.customerName
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {getFrequencyText(schedule.frequency, schedule.day)}
                    </TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.retentionDays} يوم</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{formatDate(schedule.nextRun)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Switch
                          checked={schedule.status === "active"}
                          onCheckedChange={() => {}}
                          onClick={(e) => toggleScheduleStatus(schedule, e)}
                        />
                        <span
                          className={`text-sm ${schedule.status === "active" ? "text-green-600" : "text-red-600"}`}
                        >
                          {schedule.status === "active" ? "نشط" : "غير نشط"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEditSchedule(schedule, e)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteClick(schedule, e)}
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
                    colSpan={9}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد جداول نسخ احتياطي مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* نموذج إضافة/تعديل جدول نسخ احتياطي */}
      <BackupScheduleForm
        open={showScheduleForm}
        onClose={() => setShowScheduleForm(false)}
        onSave={handleSaveSchedule}
        schedule={isEditing ? selectedSchedule : null}
        isEditing={isEditing}
      />

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
                  هل أنت متأكد من رغبتك في حذف جدول النسخ الاحتياطي{" "}
                  <span className="font-bold">
                    {selectedSchedule?.name || ""}
                  </span>
                  ؟
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  سيؤدي هذا الإجراء إلى حذف جدول النسخ الاحتياطي بشكل نهائي ولن
                  يتم إنشاء نسخ احتياطية جديدة وفقاً لهذا الجدول.
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

export default BackupSchedulesList;
