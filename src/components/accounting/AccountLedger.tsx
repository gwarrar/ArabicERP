import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Printer, X, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Account } from "@/types/accounting";

// Sample data for account ledger entries
const sampleLedgerEntries = [
  {
    id: "1",
    date: "2024-07-20",
    reference: "JE-1001",
    description: "تسجيل فاتورة مبيعات - شركة الأمل للتجارة",
    debit: 15000,
    credit: 0,
    balance: 15000,
    journalId: "JE-1001",
  },
  {
    id: "2",
    date: "2024-07-18",
    reference: "JE-1003",
    description: "تسجيل فاتورة مبيعات - مؤسسة النور",
    debit: 12500,
    credit: 0,
    balance: 27500,
    journalId: "JE-1003",
  },
  {
    id: "3",
    date: "2024-07-16",
    reference: "JE-1005",
    description: "تسجيل فاتورة مبيعات - شركة البناء الحديث",
    debit: 18000,
    credit: 0,
    balance: 45500,
    journalId: "JE-1005",
  },
  {
    id: "4",
    date: "2024-07-14",
    reference: "JE-1007",
    description: "تسجيل فاتورة مبيعات - مؤسسة الصفا التجارية",
    debit: 9500,
    credit: 0,
    balance: 55000,
    journalId: "JE-1007",
  },
  {
    id: "5",
    date: "2024-07-10",
    reference: "PMT-1001",
    description: "استلام دفعة من العميل - شركة الأمل للتجارة",
    debit: 0,
    credit: 10000,
    balance: 45000,
    journalId: "JE-1008",
  },
];

interface AccountLedgerProps {
  open: boolean;
  onClose: () => void;
  account: Account;
}

const AccountLedger: React.FC<AccountLedgerProps> = ({
  open,
  onClose,
  account,
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
  };

  // Get account type in Arabic
  const getAccountTypeArabic = (type: string) => {
    switch (type) {
      case "asset":
        return "أصول";
      case "liability":
        return "خصوم";
      case "equity":
        return "حقوق ملكية";
      case "income":
        return "إيرادات";
      case "expense":
        return "مصروفات";
      case "bank":
        return "بنك";
      case "cash":
        return "نقد";
      case "receivable":
        return "ذمم مدينة";
      case "payable":
        return "ذمم دائنة";
      default:
        return type;
    }
  };

  // Calculate totals
  const totalDebit = sampleLedgerEntries.reduce(
    (sum, entry) => sum + entry.debit,
    0,
  );
  const totalCredit = sampleLedgerEntries.reduce(
    (sum, entry) => sum + entry.credit,
    0,
  );
  const balance = totalDebit - totalCredit;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[50vw] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {account.nameAr} - دفتر الأستاذ
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
            عرض حركات وتفاصيل الحساب {account.nameAr}
          </DialogDescription>
        </DialogHeader>

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="space-y-2">
              <p className="text-sm text-blue-700">معلومات الحساب</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">رقم الحساب:</span>
                  <span className="text-sm font-medium">{account.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">نوع الحساب:</span>
                  <span className="text-sm font-medium">
                    {getAccountTypeArabic(account.type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">الاسم الإنجليزي:</span>
                  <span className="text-sm font-medium">{account.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="space-y-2">
              <p className="text-sm text-green-700">الرصيد الحالي</p>
              <h3 className="text-xl font-bold text-green-800">
                {account.balance.toLocaleString()} ₴
              </h3>
              <div className="flex justify-between">
                <span className="text-sm">إجمالي المدين:</span>
                <span className="text-sm font-medium text-red-600">
                  {totalDebit.toLocaleString()} ₴
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">إجمالي الدائن:</span>
                <span className="text-sm font-medium text-green-600">
                  {totalCredit.toLocaleString()} ₴
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <p className="text-sm text-gray-700">إحصائيات الحساب</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">عدد الحركات:</span>
                  <span className="text-sm font-medium">
                    {sampleLedgerEntries.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">آخر حركة:</span>
                  <span className="text-sm font-medium">
                    {formatDate(sampleLedgerEntries[0].date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">حساب رئيسي:</span>
                  <Badge
                    variant="outline"
                    className={
                      account.isGroup
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-50 text-gray-700"
                    }
                  >
                    {account.isGroup ? "نعم" : "لا"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 ml-1" />
            طباعة
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 ml-1" />
            تقرير مفصل
          </Button>
        </div>

        {/* Ledger Entries Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead>التاريخ</TableHead>
                <TableHead>المرجع</TableHead>
                <TableHead className="w-[300px]">البيان</TableHead>
                <TableHead>مدين</TableHead>
                <TableHead>دائن</TableHead>
                <TableHead>الرصيد</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleLedgerEntries.length > 0 ? (
                sampleLedgerEntries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50">
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell className="font-medium">
                      {entry.reference}
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell className="text-red-600">
                      {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {entry.balance.toLocaleString()} ₴
                    </TableCell>
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
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    لا توجد حركات لهذا الحساب
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

export default AccountLedger;
