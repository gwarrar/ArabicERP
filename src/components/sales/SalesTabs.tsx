import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesDashboard from "./SalesDashboard";
import SalesOrderList from "./SalesOrderList";
import SalesReport from "./SalesReport";
import SalesReturn from "./SalesReturn";
import CustomerList from "./CustomerList";
import SalesInvoicesTab from "./SalesInvoicesTab";
import RFIDSalesIntegration from "./RFIDSalesIntegration";
import SalesQuickLinks from "./SalesQuickLinks";
import ReservationsList from "./ReservationsList";
import {
  BarChart3,
  FileText,
  ShoppingCart,
  RotateCcw,
  Users,
  Receipt,
  Tag,
  Bookmark,
} from "lucide-react";

const SalesTabs = () => {
  const [showReservations, setShowReservations] = useState(false);

  // Handlers for quick links
  const handleOpenReservations = () => {
    setShowReservations(true);
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
          <TabsTrigger value="quicklinks">
            <Bookmark className="h-4 w-4 ml-2" />
            روابط سريعة
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="dashboard">
        <SalesDashboard />
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

      <TabsContent value="quicklinks">
        <SalesQuickLinks
          onOpenReservations={handleOpenReservations}
          onCreateInvoice={handleCreateInvoice}
          onCreateOrder={handleCreateOrder}
          onViewCustomers={handleViewCustomers}
          onProcessReturn={handleProcessReturn}
          onViewReports={handleViewReports}
          onOpenRFID={handleOpenRFID}
        />
      </TabsContent>

      {/* Reservations List Dialog */}
      {showReservations && (
        <ReservationsList
          open={showReservations}
          onClose={() => setShowReservations(false)}
        />
      )}
    </Tabs>
  );
};

export default SalesTabs;
