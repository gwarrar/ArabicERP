import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { FileText, CreditCard, ShoppingCart } from "lucide-react";

interface CustomerDetailsProps {
  customer: any;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
}) => {
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
  ];

  // Sample pending invoices
  const pendingInvoices = [
    {
      id: "INV-2024-0125",
      date: "2024-07-15",
      dueDate: "2024-07-22",
      amount: 12500,
      status: "pending",
    },
  ];

  // Sample payments
  const payments = [
    {
      id: "PMT-2024-0098",
      date: "2024-07-10",
      method: "نقدي",
      amount: 8000,
      status: "completed",
    },
  ];

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="customer-info mb-4 p-4 border rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">الاسم</p>
            <p className="font-medium">{customer.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">رقم الهاتف</p>
            <p className="font-medium">{customer.phone || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
            <p className="font-medium">{customer.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">العنوان</p>
            <p className="font-medium">{customer.address || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
            <p className="font-medium text-blue-600">
              {customer.balance?.toLocaleString() || "0"} ₴
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">آخر معاملة</p>
            <p className="font-medium">{customer.lastOrder || "-"}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="transactions">المعاملات</TabsTrigger>
          <TabsTrigger value="pending-invoices">الفواتير المعلقة</TabsTrigger>
          <TabsTrigger value="payments">المدفوعات</TabsTrigger>
          <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>رقم المستند</TableHead>
                  <TableHead>البيان</TableHead>
                  <TableHead className="text-left">مدين</TableHead>
                  <TableHead className="text-left">دائن</TableHead>
                  <TableHead className="text-left">الرصيد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.documentNo}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.documentNo}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending-invoices">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الفاتورة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>تاريخ الاستحقاق</TableHead>
                  <TableHead className="text-left">المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد فواتير معلقة</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-muted/50">
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-left">
                        {invoice.amount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          معلقة
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <CreditCard className="ml-1 h-4 w-4" />
                            تسجيل دفعة
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم السند</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>طريقة الدفع</TableHead>
                  <TableHead className="text-left">المبلغ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد مدفوعات</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-left">
                        {payment.amount.toLocaleString()} ₴
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          مكتملة
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="ml-1 h-4 w-4" />
                            عرض
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">إحصائيات المشتريات</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    إجمالي المشتريات:
                  </span>
                  <span className="font-medium">
                    {customer.totalSpent?.toLocaleString() || "0"} ₴
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الطلبات:</span>
                  <span className="font-medium">
                    {customer.orderCount || "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    متوسط قيمة الطلب:
                  </span>
                  <span className="font-medium">
                    {customer.orderCount
                      ? Math.round(
                          (customer.totalSpent || 0) / customer.orderCount,
                        ).toLocaleString()
                      : "0"}{" "}
                    ₴
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">أول طلب:</span>
                  <span className="font-medium">
                    {customer.firstOrder || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">آخر طلب:</span>
                  <span className="font-medium">
                    {customer.lastOrder || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">المنتجات الأكثر شراءً</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border-b">
                  <span>قميص قطني</span>
                  <span className="font-medium">15 وحدة</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <span>بنطلون جينز</span>
                  <span className="font-medium">8 وحدات</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <span>حذاء رياضي</span>
                  <span className="font-medium">5 وحدات</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span>حقيبة يد</span>
                  <span className="font-medium">3 وحدات</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <FileText className="ml-2 h-4 w-4" />
          تقرير كامل
        </Button>
        <Button>
          <ShoppingCart className="ml-2 h-4 w-4" />
          إنشاء طلب جديد
        </Button>
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
    </div>
  );
};

export default CustomerDetails;
