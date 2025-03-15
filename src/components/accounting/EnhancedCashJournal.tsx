import React, { useState, useEffect } from "react";
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
import {
  Plus,
  Trash,
  Calendar,
  FileText,
  Save,
  Filter,
  Search,
  ArrowUpDown,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Account } from "@/types/accounting";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

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
  reference?: string;
  date?: string;
}

export const EnhancedCashJournal: React.FC<CashJournalProps> = ({
  accounts = [],
}) => {
  const [selectedCashAccount, setSelectedCashAccount] = useState("cash-main");
  const [journalDate, setJournalDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [generalDescription, setGeneralDescription] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentBalance, setCurrentBalance] = useState(15000); // الرصيد الحالي للصندوق
  const [entries, setEntries] = useState<CashJournalEntry[]>([
    {
      id: "1",
      account: "الصندوق الرئيسي",
      description: "إيداع نقدي",
      costCenter: "المركز الرئيسي",
      receipts: 5000,
      payments: 0,
      reference: "REF-001",
    },
    {
      id: "2",
      account: "مصروفات إيجار",
      description: "دفع إيجار المكتب",
      costCenter: "المركز الرئيسي",
      receipts: 0,
      payments: 2000,
      reference: "REF-002",
    },
    {
      id: "3",
      account: "مبيعات نقدية",
      description: "مبيعات اليوم",
      costCenter: "فرع كييف",
      receipts: 3500,
      payments: 0,
      reference: "REF-003",
    },
  ]);

  const [filteredCostCenters, setFilteredCostCenters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBalanced, setIsBalanced] = useState(false);

  // List of all cost centers
  const costCenters = [
    "المركز الرئيسي",
    "فرع كييف",
    "فرع أوديسا",
    "فرع خاركيف",
    "فرع لفيف",
  ];

  // List of all accounts
  const accountsList = [
    "الصندوق الرئيسي",
    "مصروفات إيجار",
    "مبيعات نقدية",
    "مصروفات رواتب",
    "إيرادات متنوعة",
    "مصروفات نثرية",
    "مصروفات كهرباء",
    "مصروفات مياه",
    "مصروفات صيانة",
    "إيرادات استثمارات",
  ];

  useEffect(() => {
    // Check if journal is balanced (total receipts = total payments)
    const totalReceipts = entries.reduce(
      (sum, entry) => sum + (entry.receipts || 0),
      0,
    );

    const totalPayments = entries.reduce(
      (sum, entry) => sum + (entry.payments || 0),
      0,
    );

    setIsBalanced(totalReceipts === totalPayments);
  }, [entries]);

  const addNewEntry = () => {
    const newEntry: CashJournalEntry = {
      id: `${entries.length + 1}`,
      account: "",
      description: "",
      costCenter: "المركز الرئيسي",
      receipts: 0,
      payments: 0,
      reference: `REF-${String(entries.length + 1).padStart(3, "0")}`,
      date: journalDate,
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

  // Calculate new balance after journal entries
  const newBalance = currentBalance + totalReceipts - totalPayments;

  const handleCostCenterFilterChange = (costCenter: string) => {
    if (filteredCostCenters.includes(costCenter)) {
      setFilteredCostCenters(
        filteredCostCenters.filter((cc) => cc !== costCenter),
      );
    } else {
      setFilteredCostCenters([...filteredCostCenters, costCenter]);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    // Apply cost center filter if any are selected
    const costCenterMatch =
      filteredCostCenters.length === 0 ||
      filteredCostCenters.includes(entry.costCenter);

    // Apply search filter
    const searchMatch =
      searchTerm === "" ||
      entry.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.reference &&
        entry.reference.toLowerCase().includes(searchTerm.toLowerCase()));

    return costCenterMatch && searchMatch;
  });

  const saveJournal = () => {
    // Update the current balance with the new balance after saving
    setCurrentBalance(newBalance);

    // Clear entries or prepare for new entries
    // setEntries([]);

    // Here you would implement the save functionality to database
    alert(`تم حفظ يومية الصندوق بتاريخ ${journalDate} بنجاح`);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">يومية الصندوق</h2>
          <div className="mt-1 text-sm text-muted-foreground">
            رقم القيد:{" "}
            {referenceNumber ||
              "JV-" +
                new Date().toISOString().substring(0, 10).replace(/-/g, "")}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="ml-2 h-4 w-4" />
            عرض السجل
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="ml-2 h-4 w-4" />
            طباعة
          </Button>
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              الرصيد الحالي للصندوق
            </h3>
            <p className="text-sm text-muted-foreground">
              قبل تسجيل القيود الحالية
            </p>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {currentBalance.toLocaleString()} ₴
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
              <SelectItem value="bank-3">البنك الثالث</SelectItem>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">رقم المرجع</label>
          <Input
            placeholder="رقم المرجع..."
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الحسابات والبيانات..."
              className="pr-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="ml-2 h-4 w-4" />
                تصفية
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">تصفية حسب مركز التكلفة</h4>
                <div className="space-y-2">
                  {costCenters.map((center) => (
                    <div
                      key={center}
                      className="flex items-center space-x-2 space-x-reverse"
                    >
                      <Checkbox
                        id={`filter-${center}`}
                        checked={filteredCostCenters.includes(center)}
                        onCheckedChange={() =>
                          handleCostCenterFilterChange(center)
                        }
                      />
                      <Label htmlFor={`filter-${center}`} className="mr-2">
                        {center}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          {isBalanced ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 px-3 py-1"
            >
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              القيود متوازنة
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 px-3 py-1"
            >
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 mr-1" />
              القيود غير متوازنة
            </Badge>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-2">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-muted">
              <TableRow>
                <TableHead className="w-[80px]"></TableHead>
                <TableHead className="text-left">مدفوعات</TableHead>
                <TableHead className="text-left">مقبوضات</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead>مركز التكلفة</TableHead>
                <TableHead>البيان</TableHead>
                <TableHead>الحساب</TableHead>
                <TableHead className="w-[50px]">#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEntry(entry.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
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
                      value={entry.reference || ""}
                      onChange={(e) =>
                        updateEntry(entry.id, "reference", e.target.value)
                      }
                      placeholder="رقم المرجع"
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
                        {costCenters.map((center) => (
                          <SelectItem key={center} value={center}>
                            {center}
                          </SelectItem>
                        ))}
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
                      value={entry.account}
                      onValueChange={(value) =>
                        updateEntry(entry.id, "account", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        {accountsList.map((account) => (
                          <SelectItem key={account} value={account}>
                            {account}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-4">
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
          <div className="text-sm font-medium">
            الرصيد:{" "}
            <span
              className={
                totalReceipts - totalPayments >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {(totalReceipts - totalPayments).toLocaleString()} ₴
            </span>
          </div>
        </div>
      </div>

      {/* New Balance After Journal Entries */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-green-600" />
              الرصيد بعد تسجيل القيود
            </h3>
            <p className="text-sm text-muted-foreground">
              بعد إضافة المقبوضات وخصم المدفوعات
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold text-green-700">
              {newBalance.toLocaleString()} ₴
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              <span
                className={
                  totalReceipts > totalPayments
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {totalReceipts > totalPayments ? "+" : ""}
                {(totalReceipts - totalPayments).toLocaleString()} ₴
              </span>{" "}
              <span>من الرصيد السابق</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline">
          <FileText className="ml-2 h-4 w-4" />
          طباعة
        </Button>
        <Button
          onClick={saveJournal}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="ml-2 h-4 w-4" />
          حفظ القيود
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCashJournal;
