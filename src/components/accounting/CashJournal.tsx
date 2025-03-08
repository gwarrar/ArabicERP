import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Calendar, FileText } from "lucide-react";
import { Account } from "@/types/accounting";

interface CashJournalProps {
  accounts: Account[];
}

interface CashJournalEntry {
  id: string;
  account: string;
  description: string;
  costCenter: string;
  receipts: number;
  payments: number;
}

export const CashJournal: React.FC<CashJournalProps> = ({ accounts }) => {
  const [selectedCashAccount, setSelectedCashAccount] = useState("cash-main");
  const [journalDate, setJournalDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [generalDescription, setGeneralDescription] = useState("");
  const [entries, setEntries] = useState<CashJournalEntry[]>([
    {
      id: "1",
      account: "الصندوق الرئيسي",
      description: "إيداع نقدي",
      costCenter: "المركز الرئيسي",
      receipts: 5000,
      payments: 0,
    },
    {
      id: "2",
      account: "مصروفات إيجار",
      description: "دفع إيجار المكتب",
      costCenter: "المركز الرئيسي",
      receipts: 0,
      payments: 2000,
    },
    {
      id: "3",
      account: "مبيعات نقدية",
      description: "مبيعات اليوم",
      costCenter: "فرع كييف",
      receipts: 3500,
      payments: 0,
    },
    {
      id: "4",
      account: "مصروفات رواتب",
      description: "دفع رواتب الموظفين",
      costCenter: "المركز الرئيسي",
      receipts: 0,
      payments: 8000,
    },
    {
      id: "5",
      account: "إيرادات متنوعة",
      description: "إيرادات خدمات",
      costCenter: "فرع أوديسا",
      receipts: 1200,
      payments: 0,
    },
  ]);

  const addNewEntry = () => {
    const newEntry: CashJournalEntry = {
      id: `${entries.length + 1}`,
      account: "",
      description: "",
      costCenter: "المركز الرئيسي",
      receipts: 0,
      payments: 0,
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (
    id: string,
    field: keyof CashJournalEntry,
    value: any,
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const totalReceipts = entries.reduce(
    (sum, entry) => sum + (entry.receipts || 0),
    0,
  );

  const totalPayments = entries.reduce(
    (sum, entry) => sum + (entry.payments || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">الصندوق / البنك</label>
          <Select
            value={selectedCashAccount}
            onValueChange={setSelectedCashAccount}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الصندوق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash-main">الصندوق الرئيسي</SelectItem>
              <SelectItem value="bank-1">البنك الأول</SelectItem>
              <SelectItem value="bank-2">البنك الثاني</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">التاريخ</label>
          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pr-10"
              value={journalDate}
              onChange={(e) => setJournalDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">البيان العام</label>
          <Input
            placeholder="وصف عام للقيود..."
            value={generalDescription}
            onChange={(e) => setGeneralDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>الحساب</TableHead>
              <TableHead>البيان</TableHead>
              <TableHead>مركز التكلفة</TableHead>
              <TableHead className="text-left">مقبوضات</TableHead>
              <TableHead className="text-left">مدفوعات</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Select
                    value={entry.account}
                    onValueChange={(value) =>
                      updateEntry(entry.id, "account", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الصندوق الرئيسي">
                        الصندوق الرئيسي
                      </SelectItem>
                      <SelectItem value="مصروفات إيجار">
                        مصروفات إيجار
                      </SelectItem>
                      <SelectItem value="مبيعات نقدية">مبيعات نقدية</SelectItem>
                      <SelectItem value="مصروفات رواتب">
                        مصروفات رواتب
                      </SelectItem>
                      <SelectItem value="إيرادات متنوعة">
                        إيرادات متنوعة
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={entry.description}
                    onChange={(e) =>
                      updateEntry(entry.id, "description", e.target.value)
                    }
                    placeholder="وصف الحركة"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={entry.costCenter}
                    onValueChange={(value) =>
                      updateEntry(entry.id, "costCenter", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر مركز التكلفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="المركز الرئيسي">
                        المركز الرئيسي
                      </SelectItem>
                      <SelectItem value="فرع كييف">فرع كييف</SelectItem>
                      <SelectItem value="فرع أوديسا">فرع أوديسا</SelectItem>
                      <SelectItem value="فرع خاركيف">فرع خاركيف</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={entry.receipts || ""}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "receipts",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="text-left"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={entry.payments || ""}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "payments",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="text-left"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={addNewEntry}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة سطر جديد
        </Button>

        <div className="flex gap-4">
          <div className="text-sm font-medium">
            مجموع المقبوضات:{" "}
            <span className="text-green-600">
              {totalReceipts.toLocaleString()} ₴
            </span>
          </div>
          <div className="text-sm font-medium">
            مجموع المدفوعات:{" "}
            <span className="text-red-600">
              {totalPayments.toLocaleString()} ₴
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <FileText className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button>حفظ</Button>
      </div>
    </div>
  );
};

export default CashJournal;
