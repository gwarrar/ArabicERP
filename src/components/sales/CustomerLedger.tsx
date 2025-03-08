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
  Calendar,
  FileText,
  Printer,
  Download,
  Filter,
  Eye,
} from "lucide-react";
import { Customer } from "@/types/sales";

interface CustomerLedgerProps {
  customer?: Customer;
}

const CustomerLedger: React.FC<CustomerLedgerProps> = ({ customer }) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(1)).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Sample customer transactions
  const customerTransactions = [
    {
      date: "2024-07-15",
      documentNo: "INV-2024-0125",
      description: "فاتورة مبيعات",
      debit: 12500,
      credit: 0,
      balance: 45000,
      type: "فاتورة مبيعات",
      entries: [
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 12500, credit: 0 },
        { account: "المبيعات", debit: 0, credit: 12500 },
      ],
    },
    {
      date: "2024-07-10",
      documentNo: "PMT-2024-0098",
      description: "دفعة نقدية",
      debit: 0,
      credit: 8000,
      balance: 32500,
      type: "سند قبض",
      entries: [
        { account: "الصندوق", debit: 8000, credit: 0 },
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 0, credit: 8000 },
      ],
    },
    {
      date: "2024-07-05",
      documentNo: "INV-2024-0112",
      description: "فاتورة مبيعات",
      debit: 15000,
      credit: 0,
      balance: 40500,
      type: "فاتورة مبيعات",
      entries: [
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 15000, credit: 0 },
        { account: "المبيعات", debit: 0, credit: 15000 },
      ],
    },
    {
      date: "2024-06-28",
      documentNo: "PMT-2024-0087",
      description: "دفعة نقدية",
      debit: 0,
      credit: 10000,
      balance: 25500,
      type: "سند قبض",
      entries: [
        { account: "الصندوق", debit: 10000, credit: 0 },
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 0, credit: 10000 },
      ],
    },
    {
      date: "2024-06-20",
      documentNo: "INV-2024-0098",
      description: "فاتورة مبيعات",
      debit: 18500,
      credit: 0,
      balance: 35500,
      type: "فاتورة مبيعات",
      entries: [
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 18500, credit: 0 },
        { account: "المبيعات", debit: 0, credit: 18500 },
      ],
    },
    {
      date: "2024-06-15",
      documentNo: "RET-2024-0012",
      description: "مرتجع مبيعات",
      debit: 0,
      credit: 3000,
      balance: 17000,
      type: "مرتجع مبيعات",
      entries: [
        { account: "المبيعات", debit: 3000, credit: 0 },
        { account: "ذمم مدينة - شركة الأفق للتجارة", debit: 0, credit: 3000 },
      ],
    },
  ];

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const today = new Date();
    let start = new Date();

    switch (period) {
      case "today":
        start = today;
        break;
      case "week":
        start = new Date(today.setDate(today.getDate() - 7));
        break;
      case "month":
        start = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case "quarter":
        start = new Date(today.setMonth(today.getMonth() - 3));
        break;
      case "year":
        start = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
      default:
        // Custom period - don't change dates
        return;
    }

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(new Date().toISOString().split("T")[0]);
  };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">
          دفتر الأستاذ - {customer?.name || "العميل"}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="ml-2 h-4 w-4" />
            طباعة كشف حساب
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="bg-transparent border-none text-sm focus:outline-none"
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value)}
          >
            <option value="today">اليوم</option>
            <option value="week">الأسبوع</option>
            <option value="month">الشهر</option>
            <option value="quarter">الربع</option>
            <option value="year">السنة</option>
            <option value="custom">فترة مخصصة</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="w-[150px] pr-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <span className="text-muted-foreground">إلى</span>
            <div className="relative">
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="w-[150px] pr-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <Button>
            <Filter className="ml-2 h-4 w-4" />
            تطبيق
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>التاريخ</TableHead>
              <TableHead>رقم المستند</TableHead>
              <TableHead>نوع المعاملة</TableHead>
              <TableHead>البيان</TableHead>
              <TableHead className="text-left">مدين</TableHead>
              <TableHead className="text-left">دائن</TableHead>
              <TableHead className="text-left">الرصيد</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد معاملات في هذه الفترة</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              customerTransactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.documentNo}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-left">
                    {transaction.debit > 0
                      ? transaction.debit.toLocaleString() + " ₴"
                      : ""}
                  </TableCell>
                  <TableCell className="text-left">
                    {transaction.credit > 0
                      ? transaction.credit.toLocaleString() + " ₴"
                      : ""}
                  </TableCell>
                  <TableCell className="text-left">
                    {transaction.balance.toLocaleString()} ₴
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="text-sm text-muted-foreground mb-1">إجمالي المدين</h4>
          <p className="text-xl font-bold">
            {customerTransactions
              .reduce((sum, t) => sum + t.debit, 0)
              .toLocaleString()}{" "}
            ₴
          </p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm text-muted-foreground mb-1">إجمالي الدائن</h4>
          <p className="text-xl font-bold">
            {customerTransactions
              .reduce((sum, t) => sum + t.credit, 0)
              .toLocaleString()}{" "}
            ₴
          </p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm text-muted-foreground mb-1">الرصيد الحالي</h4>
          <p className="text-xl font-bold">
            {customerTransactions.length > 0
              ? customerTransactions[0].balance.toLocaleString()
              : "0"}{" "}
            ₴
          </p>
        </Card>
      </div>

      {/* Transaction Details Dialog */}
      <Dialog
        open={showTransactionDetails}
        onOpenChange={setShowTransactionDetails}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              تفاصيل المعاملة - {selectedTransaction?.documentNo}
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">التاريخ</p>
                  <p className="font-medium">{selectedTransaction.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نوع المعاملة</p>
                  <p className="font-medium">{selectedTransaction.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">البيان</p>
                  <p className="font-medium">
                    {selectedTransaction.description}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الحساب</TableHead>
                      <TableHead className="text-left">مدين</TableHead>
                      <TableHead className="text-left">دائن</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTransaction.entries.map(
                      (entry: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{entry.account}</TableCell>
                          <TableCell className="text-left">
                            {entry.debit > 0
                              ? entry.debit.toLocaleString() + " ₴"
                              : ""}
                          </TableCell>
                          <TableCell className="text-left">
                            {entry.credit > 0
                              ? entry.credit.toLocaleString() + " ₴"
                              : ""}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowTransactionDetails(false)}
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

export default CustomerLedger;
