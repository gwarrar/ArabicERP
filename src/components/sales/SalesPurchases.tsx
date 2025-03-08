import React, { useState } from "react";
import { Card } from "@/components/ui/card";
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
import {
  Calendar,
  FileText,
  Printer,
  Filter,
  Eye,
  Download,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Customer } from "@/types/sales";

interface SalesPurchasesProps {
  customer?: Customer;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const SalesPurchases: React.FC<SalesPurchasesProps> = ({ customer }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Sample invoices data
  const invoices = [
    {
      id: "INV-2024-0125",
      date: "2024-07-15",
      dueDate: "2024-07-22",
      total: 12500,
      status: "paid",
      items: [
        { product: "قميص قطني", quantity: 5, price: 450, total: 2250 },
        { product: "بنطلون جينز", quantity: 3, price: 650, total: 1950 },
        { product: "حذاء رياضي", quantity: 2, price: 850, total: 1700 },
      ],
    },
    {
      id: "INV-2024-0112",
      date: "2024-07-05",
      dueDate: "2024-07-12",
      total: 15000,
      status: "paid",
      items: [
        { product: "سترة", quantity: 2, price: 950, total: 1900 },
        { product: "حذاء كلاسيكي", quantity: 1, price: 950, total: 950 },
        { product: "قميص رسمي", quantity: 3, price: 550, total: 1650 },
      ],
    },
    {
      id: "INV-2024-0098",
      date: "2024-06-20",
      dueDate: "2024-06-27",
      total: 18500,
      status: "paid",
      items: [
        { product: "حقيبة يد", quantity: 2, price: 850, total: 1700 },
        { product: "ساعة يد", quantity: 1, price: 1250, total: 1250 },
        { product: "نظارة شمسية", quantity: 2, price: 550, total: 1100 },
      ],
    },
    {
      id: "INV-2024-0085",
      date: "2024-06-10",
      dueDate: "2024-06-17",
      total: 9500,
      status: "paid",
      items: [
        { product: "تي شيرت", quantity: 4, price: 350, total: 1400 },
        { product: "بنطلون رياضي", quantity: 2, price: 450, total: 900 },
      ],
    },
  ];

  // Sample data for charts
  const monthlySales = [
    { month: "يناير", sales: 25000 },
    { month: "فبراير", sales: 30000 },
    { month: "مارس", sales: 28000 },
    { month: "أبريل", sales: 32000 },
    { month: "مايو", sales: 35000 },
    { month: "يونيو", sales: 40000 },
    { month: "يوليو", sales: 45000 },
  ];

  const categorySales = [
    { name: "ملابس", value: 45000 },
    { name: "أحذية", value: 25000 },
    { name: "إكسسوارات", value: 30000 },
  ];

  const topProducts = [
    { name: "قميص قطني", quantity: 15, sales: 6750 },
    { name: "بنطلون جينز", quantity: 10, sales: 6500 },
    { name: "حذاء رياضي", quantity: 8, sales: 6800 },
    { name: "حقيبة يد", quantity: 5, sales: 4250 },
    { name: "ساعة يد", quantity: 3, sales: 3750 },
  ];

  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  return (
    <div className="space-y-6">
      {/* Invoices Section */}
      <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">فواتير العميل</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-transparent border-none text-sm focus:outline-none"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="month">الشهر الحالي</option>
                <option value="quarter">الربع الحالي</option>
                <option value="year">السنة الحالية</option>
                <option value="all">الكل</option>
              </select>
            </div>
            <Button variant="outline">
              <Download className="ml-1 h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>تاريخ الاستحقاق</TableHead>
                <TableHead className="text-left">المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد فواتير في هذه الفترة</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleInvoiceClick(invoice)}
                  >
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="text-left">
                      {invoice.total.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "partial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        } rounded-full`}
                      >
                        {invoice.status === "paid"
                          ? "مدفوعة"
                          : invoice.status === "partial"
                            ? "مدفوعة جزئياً"
                            : "غير مدفوعة"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Sales Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">المبيعات الشهرية</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>آخر 7 أشهر</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
                <Bar
                  dataKey="sales"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="المبيعات"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">توزيع المشتريات حسب الفئة</h3>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 ml-1" />
              تفاصيل
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categorySales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} ₴`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Products & Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <h3 className="font-medium mb-4">المنتجات الأكثر شراءً</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead className="text-center">الكمية</TableHead>
                  <TableHead className="text-left">المبيعات</TableHead>
                  <TableHead className="text-center">النسبة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.quantity} وحدة
                    </TableCell>
                    <TableCell className="text-left">
                      {product.sales.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-center">
                      {(
                        (product.sales /
                          topProducts.reduce((sum, p) => sum + p.sales, 0)) *
                        100
                      ).toFixed(1)}
                      %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <h3 className="font-medium mb-4">مؤشرات الأداء</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  معدل تكرار الشراء
                </span>
                <span className="font-medium">كل 45 يوم</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  متوسط قيمة الطلب
                </span>
                <span className="font-medium">13,875 ₴</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  معدل النمو (سنوي)
                </span>
                <span className="font-medium text-green-600">+15.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  نسبة الولاء (مقارنة بالمتوسط)
                </span>
                <span className="font-medium text-amber-600">+8.5%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoice Details Dialog */}
      <Dialog open={showInvoiceDetails} onOpenChange={setShowInvoiceDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الفاتورة - {selectedInvoice?.id}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">التاريخ</p>
                  <p className="font-medium">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الاستحقاق
                  </p>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <span
                    className={`px-2 py-1 text-xs ${
                      selectedInvoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : selectedInvoice.status === "partial"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    } rounded-full`}
                  >
                    {selectedInvoice.status === "paid"
                      ? "مدفوعة"
                      : selectedInvoice.status === "partial"
                        ? "مدفوعة جزئياً"
                        : "غير مدفوعة"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    المبلغ الإجمالي
                  </p>
                  <p className="font-medium">
                    {selectedInvoice.total.toLocaleString()} ₴
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">بنود الفاتورة</h4>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">
                          سعر الوحدة
                        </TableHead>
                        <TableHead className="text-left">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.product}</TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.price} ₴
                          </TableCell>
                          <TableCell className="text-left">
                            {item.total} ₴
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowInvoiceDetails(false)}
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

export default SalesPurchases;
