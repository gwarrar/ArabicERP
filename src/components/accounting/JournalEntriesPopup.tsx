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
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Printer,
  X,
  Calendar,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// Sample data for journal entries
const journalEntriesData = [
  {
    id: "JE-1001",
    date: "2024-07-20",
    reference: "INV-1234",
    description: "تسجيل فاتورة مبيعات - شركة الأمل للتجارة",
    status: "مرحل",
    debitTotal: 15000,
    creditTotal: 15000,
    createdBy: "أحمد محمد",
    entries: [
      { account: "ذمم مدينة", debit: 15000, credit: 0 },
      { account: "إيرادات المبيعات", debit: 0, credit: 15000 },
    ],
  },
  {
    id: "JE-1002",
    date: "2024-07-19",
    reference: "EXP-2001",
    description: "تسجيل مصاريف إيجار المكتب",
    status: "مرحل",
    debitTotal: 8000,
    creditTotal: 8000,
    createdBy: "سارة خالد",
    entries: [
      { account: "مصاريف إيجار", debit: 8000, credit: 0 },
      { account: "الصندوق", debit: 0, credit: 8000 },
    ],
  },
  {
    id: "JE-1003",
    date: "2024-07-18",
    reference: "INV-1235",
    description: "تسجيل فاتورة مبيعات - مؤسسة النور",
    status: "مرحل",
    debitTotal: 12500,
    creditTotal: 12500,
    createdBy: "أحمد محمد",
    entries: [
      { account: "ذمم مدينة", debit: 12500, credit: 0 },
      { account: "إيرادات المبيعات", debit: 0, credit: 12500 },
    ],
  },
  {
    id: "JE-1004",
    date: "2024-07-17",
    reference: "SAL-2002",
    description: "تسجيل رواتب الموظفين",
    status: "مرحل",
    debitTotal: 25000,
    creditTotal: 25000,
    createdBy: "سارة خالد",
    entries: [
      { account: "مصاريف رواتب", debit: 25000, credit: 0 },
      { account: "الصندوق", debit: 0, credit: 25000 },
    ],
  },
  {
    id: "JE-1005",
    date: "2024-07-16",
    reference: "INV-1236",
    description: "تسجيل فاتورة مبيعات - شركة البناء الحديث",
    status: "معلق",
    debitTotal: 18000,
    creditTotal: 18000,
    createdBy: "أحمد محمد",
    entries: [
      { account: "ذمم مدينة", debit: 18000, credit: 0 },
      { account: "إيرادات المبيعات", debit: 0, credit: 18000 },
    ],
  },
  {
    id: "JE-1006",
    date: "2024-07-15",
    reference: "UTIL-2003",
    description: "تسجيل فاتورة الكهرباء",
    status: "مرحل",
    debitTotal: 3500,
    creditTotal: 3500,
    createdBy: "سارة خالد",
    entries: [
      { account: "مصاريف خدمات", debit: 3500, credit: 0 },
      { account: "الصندوق", debit: 0, credit: 3500 },
    ],
  },
  {
    id: "JE-1007",
    date: "2024-07-14",
    reference: "INV-1237",
    description: "تسجيل فاتورة مبيعات - مؤسسة الصفا التجارية",
    status: "معلق",
    debitTotal: 9500,
    creditTotal: 9500,
    createdBy: "أحمد محمد",
    entries: [
      { account: "ذمم مدينة", debit: 9500, credit: 0 },
      { account: "إيرادات المبيعات", debit: 0, credit: 9500 },
    ],
  },
];

interface JournalEntriesPopupProps {
  open: boolean;
  onClose: () => void;
}

const JournalEntriesPopup: React.FC<JournalEntriesPopupProps> = ({
  open,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  // Filter entries
  const filteredEntries = journalEntriesData.filter((entry) => {
    const matchesSearch =
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || entry.status === statusFilter;
    const matchesDate = dateFilter === "all" || true; // Implement date filtering as needed

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  // Toggle entry details
  const toggleEntryDetails = (entryId: string) => {
    if (selectedEntry === entryId) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry(entryId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              القيود المحاسبية
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
            عرض وإدارة القيود المحاسبية في النظام
          </DialogDescription>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-700">إجمالي القيود</p>
                <h3 className="text-xl font-bold text-blue-800 mt-1">
                  {journalEntriesData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-700">قيود مرحلة</p>
                <h3 className="text-xl font-bold text-green-800 mt-1">
                  {
                    journalEntriesData.filter(
                      (entry) => entry.status === "مرحل",
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-700">قيود معلقة</p>
                <h3 className="text-xl font-bold text-amber-800 mt-1">
                  {
                    journalEntriesData.filter(
                      (entry) => entry.status === "معلق",
                    ).length
                  }
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="مرحل">مرحل</SelectItem>
                <SelectItem value="معلق">معلق</SelectItem>
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
                setStatusFilter("all");
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
                    defaultTab="new-entry"
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
              إضافة قيد جديد
            </Button>
          </div>
        </div>

        {/* Journal Entries Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead>رقم القيد</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead className="w-[300px]">البيان</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المدين</TableHead>
                <TableHead>الدائن</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <React.Fragment key={entry.id}>
                    <TableRow
                      className={`hover:bg-gray-50 cursor-pointer ${selectedEntry === entry.id ? "bg-gray-50" : ""}`}
                      onClick={() => toggleEntryDetails(entry.id)}
                    >
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{formatDate(entry.date)}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${entry.status === "مرحل" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
                        >
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.debitTotal.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.creditTotal.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>{entry.createdBy}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Entry Details */}
                    {selectedEntry === entry.id && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={9} className="p-0">
                          <div className="p-4">
                            <h4 className="text-sm font-medium mb-2">
                              تفاصيل القيد
                            </h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>الحساب</TableHead>
                                  <TableHead>مدين</TableHead>
                                  <TableHead>دائن</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {entry.entries.map((line, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{line.account}</TableCell>
                                    <TableCell className="text-red-600">
                                      {line.debit > 0
                                        ? line.debit.toLocaleString()
                                        : "-"}
                                    </TableCell>
                                    <TableCell className="text-green-600">
                                      {line.credit > 0
                                        ? line.credit.toLocaleString()
                                        : "-"}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="border-t-2">
                                  <TableCell className="font-bold">
                                    الإجمالي
                                  </TableCell>
                                  <TableCell className="font-bold text-red-600">
                                    {entry.debitTotal.toLocaleString()} ₴
                                  </TableCell>
                                  <TableCell className="font-bold text-green-600">
                                    {entry.creditTotal.toLocaleString()} ₴
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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

export default JournalEntriesPopup;
