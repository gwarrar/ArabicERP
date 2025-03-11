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
  Server,
  Users,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  Info,
} from "lucide-react";
import { RestoreOperation } from "@/types/backup";
import { restoreOperations } from "@/data/backups";

const RestoreOperationsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // تصفية عمليات الاستعادة بناءً على البحث والفلترة
  const filteredOperations = restoreOperations.filter((operation) => {
    const matchesSearch =
      searchTerm === "" ||
      operation.backupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (operation.customerName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "platform" && operation.type === "platform") ||
      (typeFilter === "customer" && operation.type === "customer");

    const matchesStatus =
      statusFilter === "all" || operation.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

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

  // حساب المدة المستغرقة للعملية
  const calculateDuration = (startDate: string, endDate?: string) => {
    if (!endDate) return "جارية...";

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const durationMs = end - start;

    // تحويل المدة إلى دقائق وثواني
    const minutes = Math.floor(durationMs / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${minutes} دقيقة و ${seconds} ثانية`;
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
        <h2 className="text-xl font-semibold">عمليات الاستعادة</h2>
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
            <SelectValue placeholder="نوع الاستعادة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="platform">استعادة النظام</SelectItem>
            <SelectItem value="customer">استعادة عميل</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="حالة العملية" />
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

      {/* جدول عمليات الاستعادة */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النوع</TableHead>
                <TableHead>النسخة الاحتياطية</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>تاريخ البدء</TableHead>
                <TableHead>تاريخ الانتهاء</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الخطأ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperations.length > 0 ? (
                filteredOperations.map((operation) => (
                  <TableRow key={operation.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {operation.type === "platform" ? (
                          <Server className="h-5 w-5 text-purple-500" />
                        ) : (
                          <Users className="h-5 w-5 text-blue-500" />
                        )}
                        <span>
                          {operation.type === "platform" ? "النظام" : "عميل"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {operation.backupName}
                    </TableCell>
                    <TableCell>
                      {operation.type === "customer"
                        ? operation.customerName
                        : "-"}
                    </TableCell>
                    <TableCell>{formatDate(operation.startedAt)}</TableCell>
                    <TableCell>
                      {operation.completedAt
                        ? formatDate(operation.completedAt)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {calculateDuration(
                        operation.startedAt,
                        operation.completedAt,
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(operation.status)}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusClass(operation.status)}`}
                        >
                          {getStatusText(operation.status)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {operation.error ? (
                        <span className="text-red-600">{operation.error}</span>
                      ) : (
                        "-"
                      )}
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
                      <RotateCcw className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد عمليات استعادة مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RestoreOperationsList;
