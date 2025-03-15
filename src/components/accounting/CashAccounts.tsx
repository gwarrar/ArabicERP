import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
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
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  Building,
  CreditCard,
  Calendar,
  DollarSign,
  FileText,
  Save,
} from "lucide-react";

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

const CashAccounts = () => {
  const [cashAccounts, setCashAccounts] =
    useState<CashAccount[]>(demoCashAccounts);
  const [transactions, setTransactions] =
    useState<Transaction[]>(demoTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<CashAccount | null>(
    null,
  );
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<{
    type: "payment" | "receipt";
    amount: string;
    description: string;
    reference: string;
  }>({
    type: "receipt",
    amount: "",
    description: "",
    reference: "",
  });

  // تصفية الحسابات النقدية
  const filteredAccounts = cashAccounts.filter((account) => {
    const matchesSearch = account.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter ? account.branch === branchFilter : true;
    const matchesType = typeFilter ? account.type === typeFilter : true;

    return matchesSearch && matchesBranch && matchesType;
  });

  // الحصول على معاملات حساب معين
  const getAccountTransactions = (accountId: string) => {
    return transactions.filter(
      (transaction) => transaction.accountId === accountId,
    );
  };

  // فتح تفاصيل الحساب
  const handleOpenAccountDetails = (account: CashAccount) => {
    setSelectedAccount(account);
    setIsAccountDetailsOpen(true);
  };

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

  // تنسيق المبلغ كعملة
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="space-y-4">
      {/* رأس الصفحة مع البحث والفلترة */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الصناديق والحسابات..."
              className="pr-9 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button className="w-full md:w-auto" onClick={handleOpenNewAccount}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة حساب جديد
          </Button>
          <Select value={branchFilter || "all"} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="الفرع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفروع</SelectItem>
              <SelectItem value="أوديسا">أوديسا</SelectItem>
              <SelectItem value="كييف">كييف</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter || "all"} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="cash">صندوق نقدي</SelectItem>
              <SelectItem value="bank">حساب بنكي</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* جدول الحسابات النقدية */}
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
                  <TableHead className="text-right">آخر معاملة</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow
                    key={account.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleOpenAccountDetails(account)}
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
                      {new Date(account.lastTransaction).toLocaleDateString(
                        "ar-SA",
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${account.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}`}
                      >
                        {account.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAccountDetails(account);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* نافذة منبثقة لعرض تفاصيل الحساب */}
      <Dialog
        open={isAccountDetailsOpen}
        onOpenChange={setIsAccountDetailsOpen}
      >
        <DialogContent className="max-w-4xl">
          {selectedAccount && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  {selectedAccount.type === "cash" ? (
                    <DollarSign className="h-5 w-5 text-primary" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-primary" />
                  )}
                  {selectedAccount.name}
                  <Badge
                    variant="outline"
                    className={`mr-2 ${selectedAccount.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {selectedAccount.status === "active" ? "نشط" : "غير نشط"}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* العمود الأول: معلومات الحساب */}
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">معلومات الحساب</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>الفرع: {selectedAccount.branch}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedAccount.type === "cash" ? (
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>
                          النوع:{" "}
                          {selectedAccount.type === "cash"
                            ? "صندوق نقدي"
                            : "حساب بنكي"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          آخر معاملة:{" "}
                          {new Date(
                            selectedAccount.lastTransaction,
                          ).toLocaleDateString("ar-SA")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">ملخص الحساب</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>الرصيد الحالي:</span>
                        <span
                          className={`font-bold ${selectedAccount.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {formatCurrency(
                            selectedAccount.balance,
                            selectedAccount.currency,
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>إجمالي المقبوضات:</span>
                        <span className="text-green-600">
                          {formatCurrency(
                            getAccountTransactions(selectedAccount.id)
                              .filter((t) => t.type === "receipt")
                              .reduce((sum, t) => sum + t.amount, 0),
                            selectedAccount.currency,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>إجمالي المدفوعات:</span>
                        <span className="text-red-600">
                          {formatCurrency(
                            getAccountTransactions(selectedAccount.id)
                              .filter((t) => t.type === "payment")
                              .reduce((sum, t) => sum + t.amount, 0),
                            selectedAccount.currency,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleOpenNewTransaction}>
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة معاملة جديدة
                  </Button>
                </div>

                {/* العمود الثاني والثالث: سجل المعاملات */}
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">سجل المعاملات</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-right">
                              التاريخ
                            </TableHead>
                            <TableHead className="text-right">الوصف</TableHead>
                            <TableHead className="text-right">النوع</TableHead>
                            <TableHead className="text-right">المبلغ</TableHead>
                            <TableHead className="text-right">المرجع</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getAccountTransactions(selectedAccount.id).map(
                            (transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>
                                  {new Date(
                                    transaction.date,
                                  ).toLocaleDateString("ar-SA")}
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    {transaction.type === "receipt" ? (
                                      <>
                                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                                        <span className="text-green-600">
                                          مقبوضات
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                                        <span className="text-red-600">
                                          مدفوعات
                                        </span>
                                      </>
                                    )}
                                  </div>
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
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
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
                <Button onClick={() => setIsAccountDetailsOpen(false)}>
                  إغلاق
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* نافذة منبثقة لإضافة معاملة جديدة */}
      <Dialog
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
      >
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

      {/* نافذة منبثقة لإضافة حساب جديد */}
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
            <Button
              variant="outline"
              onClick={() => setIsNewAccountOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setIsNewAccountOpen(false)}>
              <Save className="h-4 w-4 ml-2" />
              حفظ الحساب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashAccounts;
