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
  Calendar,
  ChevronDown,
} from "lucide-react";
import { NewJournalEntry } from "./NewJournalEntry";
import { defaultAccounts } from "@/data/accounts";

// Sample journal entries
const journalEntries = [
  {
    id: "1",
    date: "2024-07-15",
    reference: "JE-2024-0001",
    description: "شراء مخزون",
    debitTotal: 5000,
    creditTotal: 5000,
    status: "posted",
    entries: [
      {
        id: "1-1",
        account: { id: "1-1-1", name: "المخزون", nameAr: "المخزون" },
        description: "شراء مخزون",
        debit: 5000,
        credit: 0,
      },
      {
        id: "1-2",
        account: { id: "1-1-2", name: "النقدية", nameAr: "النقدية" },
        description: "شراء مخزون",
        debit: 0,
        credit: 5000,
      },
    ],
  },
  {
    id: "2",
    date: "2024-07-14",
    reference: "JE-2024-0002",
    description: "دفع رواتب الموظفين",
    debitTotal: 35000,
    creditTotal: 35000,
    status: "posted",
    entries: [
      {
        id: "2-1",
        account: {
          id: "2-1-1",
          name: "مصروفات رواتب",
          nameAr: "مصروفات رواتب",
        },
        description: "رواتب شهر يوليو",
        debit: 35000,
        credit: 0,
      },
      {
        id: "2-2",
        account: { id: "2-1-2", name: "النقدية", nameAr: "النقدية" },
        description: "رواتب شهر يوليو",
        debit: 0,
        credit: 35000,
      },
    ],
  },
  {
    id: "3",
    date: "2024-07-12",
    reference: "JE-2024-0003",
    description: "فاتورة مبيعات",
    debitTotal: 8750,
    creditTotal: 8750,
    status: "posted",
    entries: [
      {
        id: "3-1",
        account: {
          id: "3-1-1",
          name: "الذمم المدينة",
          nameAr: "الذمم المدينة",
        },
        description: "فاتورة مبيعات #1233",
        debit: 8750,
        credit: 0,
      },
      {
        id: "3-2",
        account: { id: "3-1-2", name: "المبيعات", nameAr: "المبيعات" },
        description: "فاتورة مبيعات #1233",
        debit: 0,
        credit: 8750,
      },
    ],
  },
];

const JournalEntries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showEntryDetails, setShowEntryDetails] = useState(false);

  // Filter entries based on search term and date
  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch = searchTerm
      ? entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.reference.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesDate = filterDate ? entry.date === filterDate : true;

    return matchesSearch && matchesDate;
  });

  const handleEntryClick = (entry: any) => {
    setSelectedEntry(entry);
    setShowEntryDetails(true);
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">القيود المحاسبية</h2>
        <Button onClick={() => setShowNewEntryDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          قيد جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث في القيود..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              className="bg-transparent border-none text-sm focus:outline-none"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>

          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>التاريخ</TableHead>
              <TableHead>المرجع</TableHead>
              <TableHead>البيان</TableHead>
              <TableHead className="text-left">مدين</TableHead>
              <TableHead className="text-left">دائن</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد قيود مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEntries.map((entry) => (
                <TableRow
                  key={entry.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleEntryClick(entry)}
                >
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.reference}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="text-left">
                    {entry.debitTotal.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-left">
                    {entry.creditTotal.toLocaleString()} ₴
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      مرحّل
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* New Journal Entry Dialog */}
      <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>قيد محاسبي جديد</DialogTitle>
          </DialogHeader>
          <NewJournalEntry
            accounts={defaultAccounts}
            onSave={() => setShowNewEntryDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Entry Details Dialog */}
      <Dialog open={showEntryDetails} onOpenChange={setShowEntryDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              تفاصيل القيد المحاسبي - {selectedEntry?.reference}
            </DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">التاريخ</p>
                  <p className="font-medium">{selectedEntry.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المرجع</p>
                  <p className="font-medium">{selectedEntry.reference}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">البيان</p>
                  <p className="font-medium">{selectedEntry.description}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الحساب</TableHead>
                      <TableHead>البيان</TableHead>
                      <TableHead className="text-left">مدين</TableHead>
                      <TableHead className="text-left">دائن</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedEntry.entries.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.account.nameAr}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-left">
                          {item.debit > 0
                            ? item.debit.toLocaleString() + " ₴"
                            : ""}
                        </TableCell>
                        <TableCell className="text-left">
                          {item.credit > 0
                            ? item.credit.toLocaleString() + " ₴"
                            : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-bold bg-muted/20">
                      <TableCell colSpan={2} className="text-left">
                        الإجمالي
                      </TableCell>
                      <TableCell className="text-left">
                        {selectedEntry.debitTotal.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-left">
                        {selectedEntry.creditTotal.toLocaleString()} ₴
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileText className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEntryDetails(false)}
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

export default JournalEntries;
