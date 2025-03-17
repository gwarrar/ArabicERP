import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  ShoppingCart,
  Download,
  Printer,
  MoreHorizontal,
  Package,
  Tag,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/types/reservation";
import ReservationDetails from "./ReservationDetails";

// Sample data for reservations
const sampleReservations: Reservation[] = [
  {
    id: "res-001",
    reservationNumber: "RES-2024-001",
    createdAt: "2024-08-01T10:30:00",
    expiresAt: "2024-08-08T10:30:00",
    status: "pending",
    type: "customer",
    customerId: "cust-001",
    customerName: "شركة الأمل للتجارة",
    notes: "طلب عاجل للعميل",
    items: [
      {
        id: "item-001",
        productId: "prod-001",
        productName: "قماش قطني أبيض",
        productSku: "FAB-COT-WHT-001",
        quantity: 50,
        unit: "متر",
        price: 25.5,
        warehouseId: "wh-001",
        warehouseName: "المستودع الرئيسي",
        fabricRollIds: ["FR-001", "FR-002"],
        totalAmount: 1275,
      },
      {
        id: "item-002",
        productId: "prod-003",
        productName: "قماش صوف رمادي",
        productSku: "FAB-WOL-GRY-001",
        quantity: 30,
        unit: "متر",
        price: 45.0,
        warehouseId: "wh-001",
        warehouseName: "المستودع الرئيسي",
        fabricRollIds: ["FR-003"],
        totalAmount: 1350,
      },
    ],
    totalAmount: 2625,
  },
  {
    id: "res-002",
    reservationNumber: "RES-2024-002",
    createdAt: "2024-08-02T14:15:00",
    expiresAt: "2024-08-09T14:15:00",
    status: "approved",
    type: "manager",
    managerId: "mgr-001",
    managerName: "أحمد محمد",
    approvedById: "mgr-002",
    approvedByName: "خالد عمر",
    approvedAt: "2024-08-03T09:30:00",
    notes: "حجز للمعرض الجديد",
    items: [
      {
        id: "item-003",
        productId: "prod-004",
        productName: "حرير طبيعي أحمر",
        productSku: "FAB-SLK-RED-001",
        quantity: 20,
        unit: "متر",
        price: 75.0,
        warehouseId: "wh-001",
        warehouseName: "المستودع الرئيسي",
        fabricRollIds: ["FR-004"],
        totalAmount: 1500,
      },
    ],
    totalAmount: 1500,
  },
  {
    id: "res-003",
    reservationNumber: "RES-2024-003",
    createdAt: "2024-08-03T11:45:00",
    expiresAt: "2024-08-10T11:45:00",
    status: "rejected",
    type: "customer",
    customerId: "cust-002",
    customerName: "مؤسسة النور للأقمشة",
    rejectedById: "mgr-001",
    rejectedByName: "أحمد محمد",
    rejectedAt: "2024-08-04T10:15:00",
    rejectionReason: "المنتج غير متوفر بالكمية المطلوبة",
    notes: "طلب خاص للعميل",
    items: [
      {
        id: "item-004",
        productId: "prod-002",
        productName: "قماش قطني أسود",
        productSku: "FAB-COT-BLK-001",
        quantity: 100,
        unit: "متر",
        price: 25.5,
        warehouseId: "wh-001",
        warehouseName: "المستودع الرئيسي",
        totalAmount: 2550,
      },
    ],
    totalAmount: 2550,
  },
  {
    id: "res-004",
    reservationNumber: "RES-2024-004",
    createdAt: "2024-08-04T09:30:00",
    expiresAt: "2024-08-11T09:30:00",
    status: "completed",
    type: "customer",
    customerId: "cust-003",
    customerName: "شركة الخليج للملابس",
    approvedById: "mgr-001",
    approvedByName: "أحمد محمد",
    approvedAt: "2024-08-04T14:00:00",
    notes: "تم التسليم للعميل",
    items: [
      {
        id: "item-005",
        productId: "prod-001",
        productName: "قماش قطني أبيض",
        productSku: "FAB-COT-WHT-001",
        quantity: 40,
        unit: "متر",
        price: 25.5,
        warehouseId: "wh-001",
        warehouseName: "المستودع الرئيسي",
        fabricRollIds: ["FR-005"],
        totalAmount: 1020,
      },
    ],
    totalAmount: 1020,
  },
  {
    id: "res-005",
    reservationNumber: "RES-2024-005",
    createdAt: "2024-08-05T13:20:00",
    expiresAt: "2024-08-12T13:20:00",
    status: "canceled",
    type: "manager",
    managerId: "mgr-003",
    managerName: "سارة أحمد",
    notes: "تم إلغاء الحجز بناءً على طلب المدير",
    items: [
      {
        id: "item-006",
        productId: "prod-005",
        productName: "أزرار بلاستيكية بيضاء",
        productSku: "ACC-BTN-WHT-001",
        quantity: 500,
        unit: "قطعة",
        price: 0.5,
        warehouseId: "wh-002",
        warehouseName: "مستودع الإكسسوارات",
        totalAmount: 250,
      },
      {
        id: "item-007",
        productId: "prod-006",
        productName: "سحاب معدني فضي",
        productSku: "ACC-ZIP-SLV-001",
        quantity: 200,
        unit: "قطعة",
        price: 2.0,
        warehouseId: "wh-002",
        warehouseName: "مستودع الإكسسوارات",
        totalAmount: 400,
      },
    ],
    totalAmount: 650,
  },
];

interface ReservationsListProps {
  open: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  open,
  onClose,
}) => {
  const [reservations, setReservations] =
    useState<Reservation[]>(sampleReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  // Filter reservations based on search term, status, type, and date
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.reservationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (reservation.customerName &&
        reservation.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (reservation.managerName &&
        reservation.managerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    const matchesType = typeFilter === "all" || reservation.type === typeFilter;

    // Date filtering logic (simplified for demo)
    const reservationDate = new Date(reservation.createdAt);
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        reservationDate.toDateString() === today.toDateString()) ||
      (dateFilter === "week" && reservationDate >= weekAgo) ||
      (dateFilter === "month" && reservationDate >= monthAgo);

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Handle reservation click to show details
  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowDetails(true);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateFilter("all");
  };

  // Get status badge class
  const getStatusBadgeClass = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "canceled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status: ReservationStatus) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "approved":
        return "تمت الموافقة";
      case "rejected":
        return "مرفوض";
      case "canceled":
        return "ملغي";
      case "completed":
        return "مكتمل";
      default:
        return status;
    }
  };

  // Get type text in Arabic
  const getTypeText = (type: "customer" | "manager") => {
    return type === "customer" ? "عميل" : "مدير";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            قائمة الحجوزات
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="w-[200px] pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="approved">تمت الموافقة</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
                <SelectItem value="canceled">ملغي</SelectItem>
                <SelectItem value="completed">مكتمل</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="customer">عميل</SelectItem>
                <SelectItem value="manager">مدير</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفترات</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={resetFilters}>
              <Filter className="h-4 w-4 ml-1" />
              إعادة ضبط
            </Button>
          </div>

          <div className="flex gap-2 w-full md:w-auto justify-end">
            <Button variant="outline" size="sm" className="h-10">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الحجز</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>العميل/المدير</TableHead>
                <TableHead>المنتجات</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleReservationClick(reservation)}
                  >
                    <TableCell className="font-medium">
                      {reservation.reservationNumber}
                    </TableCell>
                    <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                    <TableCell>
                      {reservation.type === "customer"
                        ? reservation.customerName
                        : reservation.managerName}
                      <Badge
                        variant="outline"
                        className="mr-2 text-xs bg-gray-100"
                      >
                        {getTypeText(reservation.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{reservation.items.length} منتج</TableCell>
                    <TableCell className="font-bold">
                      {reservation.totalAmount.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeClass(reservation.status)}
                      >
                        {getStatusText(reservation.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReservationClick(reservation);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد حجوزات مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Reservation Details Dialog */}
        {selectedReservation && showDetails && (
          <ReservationDetails
            open={showDetails}
            onClose={() => setShowDetails(false)}
            reservation={selectedReservation}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationsList;
