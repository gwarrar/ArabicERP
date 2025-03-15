import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Edit,
  Trash,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  DollarSign,
  FileText,
  Save,
  CalendarDays,
  CalendarRange,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

// نموذج بيانات لحساب نقدي
interface CashAccount {
  id: string;
  name: string;
  type: "bank" | "cash";
  branch: string;
  currency: string;
  balance: number;
  lastTransaction: string;
  status: "active" | "inactive";
}

// نموذج بيانات للمعاملة
interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "payment" | "receipt";
  amount: number;
  reference: string;
  accountId: string;
}

// نموذج بيانات للمعاملة الجديدة
interface NewTransaction {
  type: "payment" | "receipt";
  amount: string;
  description: string;
  reference: string;
}

// أسعار الصرف التقريبية
const EXCHANGE_RATES = {
  USD: 38, // سعر صرف تقريبي للدولار
  EUR: 42, // سعر صرف تقريبي لليورو
  UAH: 1, // العملة المحلية
};

// بيانات تجريبية للحسابات النقدية
const demoCashAccounts: CashAccount[] = [
  {
    id: "1",
    name: "الصندوق الرئيسي",
    type: "cash",
    branch: "أوديسا",
    currency: "UAH",
    balance: 25000,
    lastTransaction: "2024-07-20",
    status: "active",
  },
  {
    id: "2",
    name: "حساب بنك أوكرانيا",
    type: "bank",
    branch: "كييف",
    currency: "UAH",
    balance: 150000,
    lastTransaction: "2024-07-19",
    status: "active",
  },
  {
    id: "3",
    name: "صندوق المبيعات",
    type: "cash",
    branch: "أوديسا",
    currency: "UAH",
    balance: 8500,
    lastTransaction: "2024-07-18",
    status: "active",
  },
  {
    id: "4",
    name: "حساب بنك الدولار",
    type: "bank",
    branch: "كييف",
    currency: "USD",
    balance: 12000,
    lastTransaction: "2024-07-15",
    status: "active",
  },
  {
    id: "5",
    name: "صندوق المشتريات",
    type: "cash",
    branch: "كييف",
    currency: "UAH",
    balance: 5000,
    lastTransaction: "2024-07-17",
    status: "active",
  },
  {
    id: "6",
    name: "حساب بنك اليورو",
    type: "bank",
    branch: "أوديسا",
    currency: "EUR",
    balance: 8000,
    lastTransaction: "2024-07-16",
    status: "inactive",
  },
];

// بيانات تجريبية للمعاملات
const demoTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2024-07-20",
    description: "استلام دفعة من العميل أحمد محمد",
    type: "receipt",
    amount: 5000,
    reference: "INV-2024-001",
    accountId: "1",
  },
  {
    id: "t2",
    date: "2024-07-19",
    description: "تحويل بنكي من شركة النور",
    type: "receipt",
    amount: 15000,
    reference: "TRF-2024-015",
    accountId: "2",
  },
  {
    id: "t3",
    date: "2024-07-18",
    description: "دفع فاتورة الكهرباء",
    type: "payment",
    amount: 1500,
    reference: "BILL-2024-032",
    accountId: "1",
  },
  {
    id: "t4",
    date: "2024-07-18",
    description: "مبيعات نقدية",
    type: "receipt",
    amount: 3500,
    reference: "POS-2024-087",
    accountId: "3",
  },
  {
    id: "t5",
    date: "2024-07-17",
    description: "دفع رواتب الموظفين",
    type: "payment",
    amount: 25000,
    reference: "SAL-2024-007",
    accountId: "2",
  },
  {
    id: "t6",
    date: "2024-07-17",
    description: "شراء مواد خام",
    type: "payment",
    amount: 7000,
    reference: "PO-2024-042",
    accountId: "5",
  },
  {
    id: "t7",
    date: "2024-07-16",
    description: "استلام دفعة من العميل سارة عبدالله",
    type: "receipt",
    amount: 8000,
    reference: "INV-2024-023",
    accountId: "6",
  },
  {
    id: "t8",
    date: "2024-07-15",
    description: "تحويل بنكي من شركة البناء الحديث",
    type: "receipt",
    amount: 12000,
    reference: "TRF-2024-018",
    accountId: "4",
  },
];

// المكونات الفرعية
const SummaryCard = ({
  title,
  subtitle,
  amount,
  currency,
  textColor = "text-primary",
}) => (
  <Card className="bg-muted/30">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
        <span className={`text-xl font-bold ${textColor}`}>
          {amount.toLocaleString()} {currency}
        </span>
      </div>
    </CardContent>
  </Card>
);

const AccountBadge = ({ status }) => (
  <Badge
    variant="outline"
    className={`${status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}`}
  >
    {status === "active" ? "نشط" : "غير نشط"}
  </Badge>
);

const DateFilterBadge = ({ dateFilter, specificDate, dateRange }) => {
  if (dateFilter === "all") return null;

  let content;
  if (dateFilter === "daily") content = "اليوم";
  else if (dateFilter === "monthly") content = "هذا الشهر";
  else if (dateFilter === "yearly") content = "هذه السنة";
  else if (dateFilter === "specific" && specificDate) {
    content = format(specificDate, "dd/MM/yyyy");
  } else if (dateFilter === "range" && dateRange.from) {
    content = (
      <>
        {format(dateRange.from, "dd/MM/yyyy")}
        {dateRange.to && <> - {format(dateRange.to, "dd/MM/yyyy")}</>}
      </>
    );
  } else content = "";

  return (
    <Badge
      variant="outline"
      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
    >
      {content}
    </Badge>
  );
};

const TransactionTypeDisplay = ({ type }) => (
  <div className="flex items-center gap-1">
    {type === "receipt" ? (
      <>
        <ArrowDownLeft className="h-4 w-4 text-green-500" />
        <span className="text-green-600">مقبوضات</span>
      </>
    ) : (
      <>
        <ArrowUpRight className="h-4 w-4 text-red-500" />
        <span className="text-red-600">مدفوعات</span>
      </>
    )}
  </div>
);

const EnhancedCashAccounts = () => {
  // حالة البيانات
  const [cashAccounts, setCashAccounts] =
    useState<CashAccount[]>(demoCashAccounts);
  const [transactions, setTransactions] =
    useState<Transaction[]>(demoTransactions);
  const [selectedAccount, setSelectedAccount] = useState<CashAccount | null>(
    null,
  );

  // حالة الفلاتر
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [specificDate, setSpecificDate] = useState<Date | undefined>(undefined);

  // حالة النوافذ المنبثقة
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    type: "receipt",
    amount: "",
    description: "",
    reference: "",
  });

  // تنسيق المبلغ كعملة
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  // تحويل المبلغ إلى العملة المحلية
  const convertToLocalCurrency = (amount: number, currency: string) => {
    return amount * (EXCHANGE_RATES[currency] || 1);
  };

  // تصفية المعاملات حسب التاريخ
  const getFilteredTransactions = (transactions: Transaction[]) => {
    if (dateFilter === "all") return transactions;

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();

      if (dateFilter === "daily") {
        // اليوم الحالي فقط
        return (
          transactionDate.getDate() === today.getDate() &&
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      } else if (dateFilter === "monthly") {
        // الشهر الحالي
        return (
          transactionDate.getMonth() === today.getMonth() &&
          transactionDate.getFullYear() === today.getFullYear()
        );
      } else if (dateFilter === "yearly") {
        // السنة الحالية
        return transactionDate.getFullYear() === today.getFullYear();
      } else if (dateFilter === "specific" && specificDate) {
        // تاريخ محدد
        return (
          transactionDate.getDate() === specificDate.getDate() &&
          transactionDate.getMonth() === specificDate.getMonth() &&
          transactionDate.getFullYear() === specificDate.getFullYear()
        );
      } else if (dateFilter === "range" && dateRange.from) {
        // نطاق تاريخ
        const from = dateRange.from;
        const to = dateRange.to || from;

        // تحويل التواريخ إلى منتصف الليل للمقارنة الصحيحة
        const fromDate = new Date(
          from.getFullYear(),
          from.getMonth(),
          from.getDate(),
        );
        const toDate = new Date(
          to.getFullYear(),
          to.getMonth(),
          to.getDate(),
          23,
          59,
          59,
        );

        return transactionDate >= fromDate && transactionDate <= toDate;
      }

      return true;
    });
  };

  // الحصول على معاملات حساب معين
  const getAccountTransactions = (accountId: string) => {
    const accountTransactions = transactions.filter(
      (transaction) => transaction.accountId === accountId,
    );
    return getFilteredTransactions(accountTransactions);
  };

  // تصفية الحسابات النقدية
  const filteredAccounts = useMemo(() => {
    return cashAccounts.filter((account) => {
      const matchesSearch = account.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesBranch =
        branchFilter && branchFilter !== "all"
          ? account.branch === branchFilter
          : true;
      const matchesType =
        typeFilter && typeFilter !== "all" ? account.type === typeFilter : true;
      const matchesCurrency =
        currencyFilter && currencyFilter !== "all"
          ? account.currency === currencyFilter
          : true;

      return matchesSearch && matchesBranch && matchesType && matchesCurrency;
    });
  }, [cashAccounts, searchQuery, branchFilter, typeFilter, currencyFilter]);

  // المعاملات المصفاة حسب التاريخ
  const filteredTransactions = useMemo(() => {
    return getFilteredTransactions(transactions);
  }, [transactions, dateFilter, specificDate, dateRange]);

  // حساب إجماليات المقبوضات والمدفوعات
  const { totalReceipts, totalPayments } = useMemo(() => {
    const calculateTotal = (type: "receipt" | "payment") => {
      return filteredTransactions
        .filter((t) => t.type === type)
        .reduce((sum, t) => {
          const account = cashAccounts.find((acc) => acc.id === t.accountId);
          if (!account) return sum;
          return sum + convertToLocalCurrency(t.amount, account.currency);
        }, 0);
    };

    return {
      totalReceipts: calculateTotal("receipt"),
      totalPayments: calculateTotal("payment"),
    };
  }, [filteredTransactions, cashAccounts]);

  // حساب إجمالي الرصيد
  const totalBalance = useMemo(() => {
    return cashAccounts.reduce((sum, account) => {
      return sum + convertToLocalCurrency(account.balance, account.currency);
    }, 0);
  }, [cashAccounts]);

  // إنشاء حساب عام افتراضي
  const generalAccount: CashAccount = useMemo(
    () => ({
      id: "general",
      name: "الحساب العام (جميع الصناديق)",
      type: "cash",
      branch: "جميع الفروع",
      currency: "UAH",
      balance: totalBalance,
      lastTransaction: new Date().toISOString().split("T")[0],
      status: "active",
    }),
    [totalBalance],
  );

  // فتح نافذة إضافة معاملة جديدة
  const handleOpenNewTransaction = () => {
    setIsNewTransactionOpen(true);
  };

  // فتح نافذة إضافة حساب جديد
  const handleOpenNewAccount = () => {
    setIsNewAccountOpen(true);
  };

  // إضافة معاملة جديدة
  const handleAddTransaction = () => {
    if (
      selectedAccount &&
      newTransaction.amount &&
      newTransaction.description
    ) {
      const amount = parseFloat(newTransaction.amount);
      if (isNaN(amount)) return;

      const newTransactionObj: Transaction = {
        id: `t${transactions.length + 1}`,
        date: new Date().toISOString().split("T")[0],
        description: newTransaction.description,
        type: newTransaction.type,
        amount: amount,
        reference: newTransaction.reference || "-",
        accountId: selectedAccount.id,
      };

      // تحديث الرصيد
      const updatedAccounts = cashAccounts.map((account) => {
        if (account.id === selectedAccount.id) {
          const newBalance =
            newTransaction.type === "receipt"
              ? account.balance + amount
              : account.balance - amount;
          return {
            ...account,
            balance: newBalance,
            lastTransaction: newTransactionObj.date,
          };
        }
        return account;
      });

      setTransactions([...transactions, newTransactionObj]);
      setCashAccounts(updatedAccounts);
      setSelectedAccount(
        updatedAccounts.find((a) => a.id === selectedAccount.id) || null,
      );
      setNewTransaction({
        type: "receipt",
        amount: "",
        description: "",
        reference: "",
      });
      setIsNewTransactionOpen(false);
    }
  };

  // مكون عرض الحساب العام
  const renderGeneralAccountView = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">الحساب العام (جميع الصناديق)</h2>
          <Badge variant="outline" className="mr-2 bg-blue-100 text-blue-800">
            عام
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-muted-foreground">الرصيد الإجمالي</span>
                <span className="text-xs text-muted-foreground">بعملة UAH</span>
              </div>
              <span
                className={`text-xl font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatCurrency(totalBalance, "UAH")}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-muted-foreground">إجمالي المقبوضات</span>
                <span className="text-xs text-muted-foreground">بعملة UAH</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(totalReceipts, "UAH")}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-muted-foreground">إجمالي المدفوعات</span>
                <span className="text-xs text-muted-foreground">بعملة UAH</span>
              </div>
              <span className="text-xl font-bold text-red-600">
                {formatCurrency(totalPayments, "UAH")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-3">أرصدة الصناديق والحسابات</h3>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الحساب</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">الفرع</TableHead>
                    <TableHead className="text-right">العملة</TableHead>
                    <TableHead className="text-right">الرصيد الحالي</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashAccounts.map((account) => (
                    <TableRow
                      key={account.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedAccount(account)}
                    >
                      <TableCell className="font-medium">
                        {account.name}
                      </TableCell>
                      <TableCell>
                        {account.type === "cash" ? "صندوق نقدي" : "حساب بنكي"}
                      </TableCell>
                      <TableCell>{account.branch}</TableCell>
                      <TableCell>{account.currency}</TableCell>
                      <TableCell
                        className={`font-medium ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatCurrency(account.balance, account.currency)}
                      </TableCell>
                      <TableCell>
                        <AccountBadge status={account.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  // مكون عرض الحساب الفردي
  const renderIndividualAccountView = () => {
    if (!selectedAccount || selectedAccount.id === "general") return null;

    const accountTransactions = getAccountTransactions(selectedAccount.id);
    const accountReceipts = accountTransactions
      .filter((t) => t.type === "receipt")
      .reduce((sum, t) => sum + t.amount, 0);
    const accountPayments = accountTransactions
      .filter((t) => t.type === "payment")
      .reduce((sum, t) => sum + t.amount, 0);

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {selectedAccount.type === "cash" ? (
              <DollarSign className="h-5 w-5 text-primary" />
            ) : (
              <CreditCard className="h-5 w-5 text-primary" />
            )}
            <h2 className="text-xl font-bold">{selectedAccount.name}</h2>
            <Badge
              variant="outline"
              className={`mr-2 ${selectedAccount.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
              {selectedAccount.status === "active" ? "نشط" : "غير نشط"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4 ml-1" />
              حذف
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">الرصيد الحالي</span>
                <span
                  className={`text-xl font-bold ${selectedAccount.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(
                    selectedAccount.balance,
                    selectedAccount.currency,
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">إجمالي المقبوضات</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(accountReceipts, selectedAccount.currency)}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">إجمالي المدفوعات</span>
                <span className="text-xl font-bold text-red-600">
                  {formatCurrency(accountPayments, selectedAccount.currency)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold">سجل المعاملات</h3>
            <DateFilterBadge
              dateFilter={dateFilter}
              specificDate={specificDate}
              dateRange={dateRange}
            />
          </div>
          <Button onClick={handleOpenNewTransaction}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة معاملة جديدة
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الوصف</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">المرجع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountTransactions.length > 0 ? (
                    accountTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <TransactionTypeDisplay type={transaction.type} />
                        </TableCell>
                        <TableCell
                          className={`font-medium ${transaction.type === "receipt" ? "text-green-600" : "text-red-600"}`}
                        >
                          {formatCurrency(
                            transaction.amount,
                            selectedAccount.currency,
                          )}
                        </TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        لا توجد معاملات لهذا الحساب
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  // مكون عرض فلاتر التاريخ
  const renderDateFilters = () => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <CalendarRange className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">تصفية حسب التاريخ</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="فترة التاريخ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التواريخ</SelectItem>
            <SelectItem value="daily">اليوم</SelectItem>
            <SelectItem value="monthly">هذا الشهر</SelectItem>
            <SelectItem value="yearly">هذه السنة</SelectItem>
            <SelectItem value="specific">تاريخ محدد</SelectItem>
            <SelectItem value="range">نطاق تاريخ</SelectItem>
          </SelectContent>
        </Select>

        {dateFilter === "specific" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right"
              >
                <CalendarDays className="ml-2 h-4 w-4" />
                {specificDate ? (
                  format(specificDate, "dd/MM/yyyy")
                ) : (
                  <span>اختر تاريخ</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={specificDate}
                onSelect={setSpecificDate}
                initialFocus
                locale={ar}
              />
            </PopoverContent>
          </Popover>
        )}

        {dateFilter === "range" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-right col-span-2"
              >
                <CalendarRange className="ml-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>اختر نطاق تاريخ</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range) {
                    setDateRange({
                      from: range.from,
                      to: range.to,
                    });
                  }
                }}
                numberOfMonths={2}
                initialFocus
                locale={ar}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );

  // مكون عرض بطاقة الحساب
  const renderAccountCard = (account: CashAccount) => (
    <Card
      key={account.id}
      className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedAccount?.id === account.id ? "border-primary border-2" : ""}`}
      onClick={() => setSelectedAccount(account)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {account.type === "cash" ? (
                <DollarSign className="h-4 w-4 text-primary" />
              ) : (
                <CreditCard className="h-4 w-4 text-primary" />
              )}
              <span className="font-medium">{account.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {account.branch} |{" "}
              {account.type === "cash" ? "صندوق نقدي" : "حساب بنكي"}
            </div>
          </div>
          <AccountBadge status={account.status} />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`font-bold ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {formatCurrency(account.balance, account.currency)}
          </span>
          <span className="text-xs text-muted-foreground">
            آخر معاملة:{" "}
            {new Date(account.lastTransaction).toLocaleDateString("ar-SA")}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  // مكون عرض بطاقة الحساب العام
  const renderGeneralAccountCard = () => (
    <Card
      key="general"
      className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedAccount?.id === "general" ? "border-primary border-2" : ""}`}
      onClick={() => setSelectedAccount(generalAccount)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium">الحساب العام (جميع الصناديق)</span>
            </div>
            <div className="text-sm text-muted-foreground">
              جميع الفروع | إجمالي الأرصدة
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            عام
          </Badge>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {formatCurrency(totalBalance, "UAH")}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {filteredAccounts.length} حساب
            </span>
            <DateFilterBadge
              dateFilter={dateFilter}
              specificDate={specificDate}
              dateRange={dateRange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // مكون نافذة إضافة معاملة جديدة
  const renderNewTransactionDialog = () => (
    <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة معاملة جديدة</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">نوع المعاملة</Label>
            <Select
              value={newTransaction.type}
              onValueChange={(value: "payment" | "receipt") =>
                setNewTransaction({ ...newTransaction, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع المعاملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receipt">مقبوضات</SelectItem>
                <SelectItem value="payment">مدفوعات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-amount">المبلغ</Label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="transaction-amount"
                type="number"
                placeholder="أدخل المبلغ"
                className="pr-9"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-description">الوصف</Label>
            <Input
              id="transaction-description"
              placeholder="وصف المعاملة"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-reference">المرجع (اختياري)</Label>
            <div className="relative">
              <FileText className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="transaction-reference"
                placeholder="رقم الفاتورة أو المرجع"
                className="pr-9"
                value={newTransaction.reference}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    reference: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsNewTransactionOpen(false)}
          >
            إلغاء
          </Button>
          <Button onClick={handleAddTransaction}>
            <Save className="h-4 w-4 ml-2" />
            حفظ المعاملة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // مكون نافذة إضافة حساب جديد
  const renderNewAccountDialog = () => (
    <Dialog open={isNewAccountOpen} onOpenChange={setIsNewAccountOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة حساب نقدي جديد</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">اسم الحساب</Label>
            <Input id="account-name" placeholder="أدخل اسم الحساب" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-type">نوع الحساب</Label>
            <Select defaultValue="cash">
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الحساب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">صندوق نقدي</SelectItem>
                <SelectItem value="bank">حساب بنكي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-branch">الفرع</Label>
            <Select defaultValue="أوديسا">
              <SelectTrigger>
                <SelectValue placeholder="اختر الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="أوديسا">أوديسا</SelectItem>
                <SelectItem value="كييف">كييف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-currency">العملة</Label>
            <Select defaultValue="UAH">
              <SelectTrigger>
                <SelectValue placeholder="اختر العملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UAH">هريفنيا أوكرانية (UAH)</SelectItem>
                <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                <SelectItem value="EUR">يورو (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-balance">الرصيد الافتتاحي</Label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="account-balance"
                type="number"
                placeholder="أدخل الرصيد الافتتاحي"
                className="pr-9"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsNewAccountOpen(false)}>
            إلغاء
          </Button>
          <Button onClick={() => setIsNewAccountOpen(false)}>
            <Save className="h-4 w-4 ml-2" />
            حفظ الحساب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-full bg-background" dir="rtl">
      {/* ملخص الإجماليات في الأعلى */}
      <div className="w-full mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="إجمالي الرصيد"
            subtitle="بعملة UAH"
            amount={totalBalance}
            currency="UAH"
            textColor="text-primary"
          />
          <SummaryCard
            title="إجمالي المقبوضات"
            subtitle="بعملة UAH"
            amount={totalReceipts}
            currency="UAH"
            textColor="text-green-600"
          />
          <SummaryCard
            title="إجمالي المدفوعات"
            subtitle="بعملة UAH"
            amount={totalPayments}
            currency="UAH"
            textColor="text-red-600"
          />
        </div>
      </div>

      <div className="flex flex-row gap-4">
        {/* قسم الصناديق والحسابات (على اليمين) */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">الصناديق والحسابات</h2>
            <Button size="sm" onClick={handleOpenNewAccount}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة حساب
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الصناديق والحسابات..."
              className="pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Select
              value={branchFilter || "all"}
              onValueChange={setBranchFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفروع</SelectItem>
                <SelectItem value="أوديسا">أوديسا</SelectItem>
                <SelectItem value="كييف">كييف</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter || "all"} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="cash">صندوق نقدي</SelectItem>
                <SelectItem value="bank">حساب بنكي</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={currencyFilter || "all"}
              onValueChange={setCurrencyFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="العملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع العملات</SelectItem>
                <SelectItem value="UAH">هريفنيا أوكرانية (UAH)</SelectItem>
                <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                <SelectItem value="EUR">يورو (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* فلاتر التاريخ */}
          {renderDateFilters()}

          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-400px)]">
            {/* الحساب العام */}
            {renderGeneralAccountCard()}

            {/* الحسابات الفردية */}
            {filteredAccounts.map((account) => renderAccountCard(account))}
          </div>
        </div>

        {/* قسم تفاصيل الحساب وسجل المعاملات (على اليسار) */}
        <div className="w-full md:w-2/3 bg-muted/20 rounded-lg p-4">
          {selectedAccount ? (
            selectedAccount.id === "general" ? (
              renderGeneralAccountView()
            ) : (
              renderIndividualAccountView()
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="text-muted-foreground text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2">
                  اختر حساباً لعرض تفاصيله
                </h3>
                <p>
                  قم باختيار أحد الحسابات من القائمة لعرض تفاصيله وسجل معاملاته
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* نوافذ منبثقة */}
      {renderNewTransactionDialog()}
      {renderNewAccountDialog()}
    </div>
  );
};

export default EnhancedCashAccounts;
