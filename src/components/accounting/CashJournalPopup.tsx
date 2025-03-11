import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SheetTabs } from "@/components/ui/sheet-tabs";
import { CashTransaction } from "./CashTransaction";
import { NewJournalEntry } from "./NewJournalEntry";
import { CashJournal } from "./CashJournal";
import { defaultAccounts } from "@/data/accounts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  DollarSign,
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Sample data for cash journal entries
const cashJournalData = [
  {
    id: "1",
    date: "2024-07-20",
    reference: "RCT-1001",
    description: "استلام دفعة من العميل - شركة الأمل للتجارة",
    type: "قبض",
    amount: 15000,
    account: "الصندوق",
    relatedAccount: "ذمم مدينة",
    user: "أحمد محمد",
  },
  {
    id: "2",
    date: "2024-07-19",
    reference: "PMT-2001",
    description: "دفع مصاريف إيجار المكتب",
    type: "صرف",
    amount: 8000,
    account: "الصندوق",
    relatedAccount: "مصاريف إيجار",
    user: "سارة خالد",
  },
  {
    id: "3",
    date: "2024-07-18",
    reference: "RCT-1002",
    description: "استلام دفعة من العميل - مؤسسة النور",
    type: "قبض",
    amount: 12500,
    account: "الصندوق",
    relatedAccount: "ذمم مدينة",
    user: "أحمد محمد",
  },
  {
    id: "4",
    date: "2024-07-17",
    reference: "PMT-2002",
    description: "دفع رواتب الموظفين",
    type: "صرف",
    amount: 25000,
    account: "الصندوق",
    relatedAccount: "مصاريف رواتب",
    user: "سارة خالد",
  },
  {
    id: "5",
    date: "2024-07-16",
    reference: "RCT-1003",
    description: "استلام دفعة من العميل - شركة البناء الحديث",
    type: "قبض",
    amount: 18000,
    account: "الصندوق",
    relatedAccount: "ذمم مدينة",
    user: "أحمد محمد",
  },
  {
    id: "6",
    date: "2024-07-15",
    reference: "PMT-2003",
    description: "دفع فاتورة الكهرباء",
    type: "صرف",
    amount: 3500,
    account: "الصندوق",
    relatedAccount: "مصاريف خدمات",
    user: "سارة خالد",
  },
  {
    id: "7",
    date: "2024-07-14",
    reference: "RCT-1004",
    description: "استلام دفعة من العميل - مؤسسة الصفا التجارية",
    type: "قبض",
    amount: 9500,
    account: "الصندوق",
    relatedAccount: "ذمم مدينة",
    user: "أحمد محمد",
  },
];

interface CashJournalPopupProps {
  open: boolean;
  onClose: () => void;
}

const CashJournalPopup: React.FC<CashJournalPopupProps> = ({
  open,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Calculate totals
  const totalReceipts = cashJournalData
    .filter((entry) => entry.type === "قبض")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalPayments = cashJournalData
    .filter((entry) => entry.type === "صرف")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalReceipts - totalPayments;

  // Filter entries
  const filteredEntries = cashJournalData.filter((entry) => {
    const matchesSearch =
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || entry.type === typeFilter;
    const matchesDate = dateFilter === "all" || true; // Implement date filtering as needed

    return matchesSearch && matchesType && matchesDate;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              يومية الصندوق
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            عرض وإدارة حركات الصندوق النقدية
          </DialogDescription>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-700">إجمالي المقبوضات</p>
                <h3 className="text-xl font-bold text-blue-800 mt-1">
                  {totalReceipts.toLocaleString()} ₴
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <ArrowUpCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-red-700">إجمالي المدفوعات</p>
                <h3 className="text-xl font-bold text-red-800 mt-1">
                  {totalPayments.toLocaleString()} ₴
                </h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <ArrowDownCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-700">الرصيد الحالي</p>
                <h3 className="text-xl font-bold text-green-800 mt-1">
                  {balance.toLocaleString()} ₴
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="نوع الحركة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحركات</SelectItem>
                <SelectItem value="قبض">قبض</SelectItem>
                <SelectItem value="صرف">صرف</SelectItem>
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

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setDateFilter("all");
              }}
              className="h-10"
            >
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
            <Button
              className="h-10"
              onClick={() => {
                // Create a container for the sheet
                const container = document.createElement("div");
                container.id = "transaction-sheet";
                document.body.appendChild(container);

                // Render the sheet tabs component
                const root = ReactDOM.createRoot(container);
                root.render(
                  <SheetTabs
                    title="المعاملات المالية"
                    defaultTab="cash-journal"
                    tabs={[
                      {
                        id: "payment",
                        label: "مدفوعات",
                        content: (
                          <CashTransaction
                            type="payment"
                            accounts={defaultAccounts}
                            onSave={() => {}}
                          />
                        ),
                      },
                      {
                        id: "receipt",
                        label: "مقبوضات",
                        content: (
                          <CashTransaction
                            type="receipt"
                            accounts={defaultAccounts}
                            onSave={() => {}}
                          />
                        ),
                      },
                      {
                        id: "new-entry",
                        label: "قيد يومية",
                        content: (
                          <NewJournalEntry
                            accounts={defaultAccounts}
                            onSave={() => {}}
                          />
                        ),
                      },
                      {
                        id: "cash-journal",
                        label: "يومية الصندوق",
                        content: <CashJournal accounts={defaultAccounts} />,
                      },
                    ]}
                    onClose={() => {
                      setTimeout(() => {
                        root.unmount();
                        container.remove();
                      }, 300);
                    }}
                  />,
                );
              }}
            >
              <Plus className="h-4 w-4 ml-1" />
              إضافة حركة جديدة
            </Button>
          </div>
        </div>

        {/* Cash Journal Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead className="w-[300px]">البيان</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحساب</TableHead>
                <TableHead>الحساب المقابل</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50">
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell className="font-medium">
                      {entry.reference}
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${entry.type === "قبض" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-red-50 text-red-700 border-red-200"}`}
                      >
                        {entry.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`${entry.type === "قبض" ? "text-blue-600" : "text-red-600"} font-medium`}
                    >
                      {entry.amount.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>{entry.account}</TableCell>
                    <TableCell>{entry.relatedAccount}</TableCell>
                    <TableCell>{entry.user}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-24 text-center text-muted-foreground"
                  >
                    لا توجد نتائج مطابقة للبحث
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashJournalPopup;
