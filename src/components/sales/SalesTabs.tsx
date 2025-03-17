import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SalesDashboard from "./SalesDashboard";
import SalesOrderList from "./SalesOrderList";
import SalesReport from "./SalesReport";
import SalesReturn from "./SalesReturn";
import CustomerList from "./CustomerList";
import SalesInvoicesTab from "./SalesInvoicesTab";
import RFIDSalesIntegration from "./RFIDSalesIntegration";
import SalesQuickLinks from "./SalesQuickLinks";
import ReservationsList from "./ReservationsList";
import ReservationDetails from "./ReservationDetails";
import ContainerReservationInvoice from "./ContainerReservationInvoice";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  RotateCcw,
  Users,
  Receipt,
  Tag,
  Bookmark,
  Box,
  Eye,
  Plus,
} from "lucide-react";

// Sample data for reservations (simplified version from ReservationsList.tsx)
const sampleReservations = [
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
        quantity: 50,
        totalAmount: 1275,
      },
      {
        id: "item-002",
        productId: "prod-003",
        productName: "قماش صوف رمادي",
        quantity: 30,
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
    items: [
      {
        id: "item-003",
        productId: "prod-004",
        productName: "حرير طبيعي أحمر",
        quantity: 20,
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
    items: [
      {
        id: "item-004",
        productId: "prod-002",
        productName: "قماش قطني أسود",
        quantity: 100,
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
    items: [
      {
        id: "item-005",
        productId: "prod-001",
        productName: "قماش قطني أبيض",
        quantity: 40,
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
    items: [
      {
        id: "item-006",
        productId: "prod-005",
        productName: "أزرار بلاستيكية بيضاء",
        quantity: 500,
        totalAmount: 250,
      },
    ],
    totalAmount: 650,
  },
];

const SalesTabs = () => {
  const [showReservations, setShowReservations] = useState(false);
  const [showContainerReservation, setShowContainerReservation] =
    useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Handlers for quick links
  const handleOpenReservations = () => {
    setShowReservations(true);
  };

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
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
  const getStatusText = (status) => {
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

  const handleOpenContainerReservation = () => {
    setShowContainerReservation(true);
  };

  const handleCreateInvoice = () => {
    // Implement logic to create a new invoice
    console.log("Create new invoice");
  };

  const handleCreateOrder = () => {
    // Implement logic to create a new order
    console.log("Create new order");
  };

  const handleViewCustomers = () => {
    // Implement logic to view customers
    console.log("View customers");
  };

  const handleProcessReturn = () => {
    // Implement logic to process a return
    console.log("Process return");
  };

  const handleViewReports = () => {
    // Implement logic to view reports
    console.log("View reports");
  };

  const handleOpenRFID = () => {
    // Implement logic to open RFID system
    console.log("Open RFID system");
  };

  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <div className="border-b mb-6 bg-muted rounded-md p-2 overflow-x-auto">
        <TabsList className="mb-2">
          <TabsTrigger value="dashboard">
            <BarChart3 className="h-4 w-4 ml-2" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <Receipt className="h-4 w-4 ml-2" />
            المبيعات
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 ml-2" />
            الطلبات
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 ml-2" />
            العملاء
          </TabsTrigger>
          <TabsTrigger value="returns">
            <RotateCcw className="h-4 w-4 ml-2" />
            المرتجعات
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 ml-2" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="rfid">
            <Tag className="h-4 w-4 ml-2" />
            نظام RFID
          </TabsTrigger>
          <TabsTrigger value="reservations">
            <Bookmark className="h-4 w-4 ml-2" />
            الحجوزات
          </TabsTrigger>
          <TabsTrigger value="container-reservation">
            <Box className="h-4 w-4 ml-2" />
            حجز من حاوية
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="dashboard">
        <SalesDashboard />
        <div className="mt-6">
          <SalesQuickLinks
            onOpenReservations={handleOpenReservations}
            onCreateInvoice={handleCreateInvoice}
            onCreateOrder={handleCreateOrder}
            onViewCustomers={handleViewCustomers}
            onProcessReturn={handleProcessReturn}
            onViewReports={handleViewReports}
            onOpenRFID={handleOpenRFID}
            onOpenContainerReservation={handleOpenContainerReservation}
          />
        </div>
      </TabsContent>

      <TabsContent value="invoices">
        <SalesInvoicesTab />
      </TabsContent>

      <TabsContent value="orders">
        <SalesOrderList />
      </TabsContent>

      <TabsContent value="customers">
        <CustomerList />
      </TabsContent>

      <TabsContent value="returns">
        <SalesReturn />
      </TabsContent>

      <TabsContent value="reports">
        <SalesReport />
      </TabsContent>

      <TabsContent value="rfid">
        <RFIDSalesIntegration />
      </TabsContent>

      <TabsContent value="reservations">
        <div className="h-full bg-white dark:bg-[#1e1e2d] dark:text-white p-4 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">إدارة الحجوزات</h3>
            <Button onClick={() => setShowReservations(true)}>
              <Plus className="ml-2 h-4 w-4" />
              حجز جديد
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
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
                  {sampleReservations.map((reservation) => (
                    <TableRow
                      key={reservation.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleReservationClick(reservation)}
                    >
                      <TableCell className="font-medium">
                        {reservation.reservationNumber}
                      </TableCell>
                      <TableCell>
                        {new Date(reservation.createdAt).toLocaleDateString(
                          "ar-SA",
                        )}
                      </TableCell>
                      <TableCell>
                        {reservation.type === "customer"
                          ? reservation.customerName
                          : reservation.managerName}
                      </TableCell>
                      <TableCell>{reservation.items.length} منتج</TableCell>
                      <TableCell className="font-bold">
                        {reservation.totalAmount
                          ? reservation.totalAmount.toLocaleString()
                          : "0"}{" "}
                        ₴
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="container-reservation">
        <ContainerReservationInvoice />
      </TabsContent>

      {/* Reservations List Dialog */}
      {showReservations && (
        <ReservationsList
          open={showReservations}
          onClose={() => setShowReservations(false)}
        />
      )}

      {/* Reservation Details Dialog */}
      {selectedReservation && !showReservations && (
        <ReservationDetails
          open={!!selectedReservation}
          onClose={() => setSelectedReservation(null)}
          reservation={selectedReservation}
        />
      )}

      {/* Container Reservation Dialog */}
      {showContainerReservation && (
        <Dialog
          open={showContainerReservation}
          onOpenChange={setShowContainerReservation}
        >
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                إنشاء فاتورة حجز من حاوية
              </DialogTitle>
            </DialogHeader>
            <ContainerReservationInvoice />
          </DialogContent>
        </Dialog>
      )}
    </Tabs>
  );
};

export default SalesTabs;
