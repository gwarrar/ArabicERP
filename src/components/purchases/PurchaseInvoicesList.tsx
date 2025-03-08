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
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Filter,
  FileText,
  Eye,
  Printer,
  MoreHorizontal,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import { ukrainianBranches } from "@/data/branches";

const PurchaseInvoicesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Sample purchase invoices data
  const purchaseInvoices = [
    {
      id: "INV-2024-0125",
      externalId: "S-0458",
      supplier: "شركة الأمل للتوريدات",
      date: "2024-07-15",
      dueDate: "2024-08-15",
      branch: "كييف",
      amount: 45000,
      status: "pending",
      items: [
        { product: "مادة خام أ", quantity: 500, price: 50, total: 25000 },
        { product: "مادة خام ب", quantity: 200, price: 100, total: 20000 },
      ],
      relatedPO: "PO-2024-0125",
    },
    {
      id: "INV-2024-0124",
      externalId: "N-1234",
      supplier: "مؤسسة النور للتجارة",
      date: "2024-07-14",
      dueDate: "2024-08-14",
      branch: "خاركيف",
      amount: 32000,
      status: "pending",
      items: [
        { product: "قطع غيار س", quantity: 40, price: 500, total: 20000 },
        { product: "قطع غيار ص", quantity: 60, price: 200, total: 12000 },
      ],
      relatedPO: "PO-2024-0124",
    },
    {
      id: "INV-2024-0123",
      externalId: "F-5678",
      supplier: "شركة الفجر للمعدات",
      date: "2024-07-01",
      dueDate: "2024-07-31",
      branch: "أوديسا",
      amount: 28500,
      status: "partially_paid",
      items: [
        { product: "معدات إنتاج", quantity: 1, price: 15000, total: 15000 },
        { product: "أدوات صيانة", quantity: 3, price: 4500, total: 13500 },
      ],
      relatedPO: "PO-2024-0123",
    },
    {
      id: "INV-2024-0122",
      externalId: "S-0445",
      supplier: "مؤسسة السلام للتوريدات",
      date: "2024-06-15",
      dueDate: "2024-07-15",
      branch: "دنيبرو",
      amount: 18500,
      status: "paid",
      items: [
        { product: "مواد تعبئة", quantity: 1000, price: 10, total: 10000 },
        { product: "ملصقات", quantity: 5000, price: 1.7, total: 8500 },
      ],
      relatedPO: "PO-2024-0122",
    },
    {
      id: "INV-2024-0121",
      externalId: "B-9012",
      supplier: "شركة البركة للتجارة",
      date: "2024-06-01",
      dueDate: "2024-07-01",
      branch: "كييف",
      amount: 22000,
      status: "paid",
      items: [
        { product: "مواد خام ج", quantity: 300, price: 40, total: 12000 },
        { product: "مواد خام د", quantity: 200, price: 50, total: 10000 },
      ],
      relatedPO: "PO-2024-0121",
    },
  ];

  // Filter invoices based on search term, branch, and status
  const filteredInvoices = purchaseInvoices.filter((invoice) => {
    const matchesSearch = searchTerm
      ? invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.externalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesBranch =
      selectedBranch === "all" || invoice.branch === selectedBranch;

    const matchesStatus =
      selectedStatus === "all" || invoice.status === selectedStatus;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "معلقة";
      case "partially_paid":
        return "مدفوعة جزئياً";
      case "paid":
        return "مدفوعة";
      case "cancelled":
        return "ملغية";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "partially_paid":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">فواتير المشتريات</h2>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          فاتورة جديدة
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث برقم الفاتورة، رقم فاتورة المورد، أو اسم المورد..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">جميع الفروع</option>
              {ukrainianBranches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">معلقة</option>
              <option value="partially_paid">مدفوعة جزئياً</option>
              <option value="paid">مدفوعة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>

          <Button variant="outline">
            <FileText className="ml-1 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الفاتورة</TableHead>
              <TableHead>رقم فاتورة المورد</TableHead>
              <TableHead>المورد</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>تاريخ الاستحقاق</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead className="text-left">المبلغ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد فواتير مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleInvoiceClick(invoice)}
                >
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.externalId}</TableCell>
                  <TableCell>{invoice.supplier}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.branch}</TableCell>
                  <TableCell className="text-left">
                    {invoice.amount.toLocaleString()} ₴
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${getStatusClass(invoice.status)} rounded-full`}
                    >
                      {getStatusText(invoice.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Invoice Details Dialog */}
      <Dialog open={showInvoiceDetails} onOpenChange={setShowInvoiceDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الفاتورة - {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">المورد</p>
                  <p className="font-medium">{selectedInvoice.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    رقم فاتورة المورد
                  </p>
                  <p className="font-medium">{selectedInvoice.externalId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الفرع</p>
                  <p className="font-medium">{selectedInvoice.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الفاتورة
                  </p>
                  <p className="font-medium">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الاستحقاق
                  </p>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">حالة الفاتورة</p>
                  <span
                    className={`px-2 py-1 text-xs ${getStatusClass(selectedInvoice.status)} rounded-full`}
                  >
                    {getStatusText(selectedInvoice.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    طلب الشراء المرتبط
                  </p>
                  <p className="font-medium">{selectedInvoice.relatedPO}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">بنود الفاتورة</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">
                          سعر الوحدة
                        </TableHead>
                        <TableHead className="text-center">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.price} ₴
                          </TableCell>
                          <TableCell className="text-center">
                            {item.total.toLocaleString()} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>الإجمالي:</span>
                    <span>{selectedInvoice.amount.toLocaleString()} ₴</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                {(selectedInvoice.status === "pending" ||
                  selectedInvoice.status === "partially_paid") && (
                  <Button variant="outline">
                    <DollarSign className="ml-2 h-4 w-4" />
                    تسجيل دفعة
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowInvoiceDetails(false)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PurchaseInvoicesList;
