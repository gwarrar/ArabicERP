import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, DollarSign, Users, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SaleItem {
  id: string;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  trend: "up" | "down" | "neutral";
}

interface ActiveCustomer {
  id: string;
  name: string;
  email: string;
  purchases: number;
  lastPurchase: string;
  totalSpent: number;
}

interface QuickReportsProps {
  latestSales?: SaleItem[];
  topProducts?: TopProduct[];
  activeCustomers?: ActiveCustomer[];
}

const QuickReports = ({
  latestSales = [
    {
      id: "1",
      customer: "شركة الأمل للتجارة",
      product: "برنامج المحاسبة المتكامل",
      amount: 5999,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "2",
      customer: "مؤسسة النور",
      product: "نظام إدارة المخزون",
      amount: 3499,
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: "3",
      customer: "شركة البناء الحديث",
      product: "وحدة التصنيع",
      amount: 4299,
      date: "2023-06-13",
      status: "pending",
    },
    {
      id: "4",
      customer: "مجموعة الفارس",
      product: "نظام إدارة علاقات العملاء",
      amount: 2999,
      date: "2023-06-12",
      status: "completed",
    },
    {
      id: "5",
      customer: "مؤسسة الصفا",
      product: "برنامج المحاسبة الأساسي",
      amount: 1999,
      date: "2023-06-11",
      status: "cancelled",
    },
  ],
  topProducts = [
    {
      id: "1",
      name: "برنامج المحاسبة المتكامل",
      category: "برمجيات",
      sales: 145,
      revenue: 869550,
      trend: "up",
    },
    {
      id: "2",
      name: "نظام إدارة المخزون",
      category: "برمجيات",
      sales: 98,
      revenue: 342902,
      trend: "up",
    },
    {
      id: "3",
      name: "وحدة التصنيع",
      category: "برمجيات",
      sales: 76,
      revenue: 326724,
      trend: "down",
    },
    {
      id: "4",
      name: "نظام إدارة علاقات العملاء",
      category: "برمجيات",
      sales: 65,
      revenue: 194935,
      trend: "up",
    },
  ],
  activeCustomers = [
    {
      id: "1",
      name: "شركة الأمل للتجارة",
      email: "info@alamal.com",
      purchases: 12,
      lastPurchase: "2023-06-15",
      totalSpent: 78500,
    },
    {
      id: "2",
      name: "مؤسسة النور",
      email: "contact@alnoor.com",
      purchases: 8,
      lastPurchase: "2023-06-14",
      totalSpent: 45200,
    },
    {
      id: "3",
      name: "شركة البناء الحديث",
      email: "info@modernbuild.com",
      purchases: 6,
      lastPurchase: "2023-06-13",
      totalSpent: 32800,
    },
  ],
}: QuickReportsProps) => {
  const getStatusBadge = (status: SaleItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">مكتمل</Badge>;
      case "pending":
        return <Badge variant="default">قيد الانتظار</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "UAH",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" dir="rtl">
      {/* أحدث المبيعات */}
      <Card className="bg-white border border-[#e2e8f0] rounded-[0.5rem] shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[1.125rem] font-semibold text-[#1e293b]">
              أحدث المبيعات
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#3b82f6] hover:bg-[#f8fafc]"
            >
              <span className="text-[0.875rem]">عرض الكل</span>
              <ArrowRight className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  العميل
                </TableHead>
                <TableHead className="text-left text-[0.75rem] text-[#64748b]">
                  المبلغ
                </TableHead>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  الحالة
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestSales.slice(0, 4).map((sale) => (
                <TableRow key={sale.id} className="hover:bg-[#f8fafc]">
                  <TableCell className="font-medium text-[0.875rem] text-[#1e293b]">
                    {sale.customer}
                  </TableCell>
                  <TableCell className="text-left text-[0.875rem] text-[#1e293b]">
                    {formatCurrency(sale.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(sale.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* المنتجات الأكثر مبيعاً */}
      <Card className="bg-white border border-[#e2e8f0] rounded-[0.5rem] shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[1.125rem] font-semibold text-[#1e293b]">
              المنتجات الأكثر مبيعاً
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#3b82f6] hover:bg-[#f8fafc]"
            >
              <span className="text-[0.875rem]">عرض الكل</span>
              <ArrowRight className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  المنتج
                </TableHead>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  المبيعات
                </TableHead>
                <TableHead className="text-left text-[0.75rem] text-[#64748b]">
                  الإيرادات
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.slice(0, 4).map((product) => (
                <TableRow key={product.id} className="hover:bg-[#f8fafc]">
                  <TableCell className="font-medium text-[0.875rem] text-[#1e293b]">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-right text-[0.875rem] text-[#1e293b]">
                    {product.sales}
                  </TableCell>
                  <TableCell className="text-left text-[0.875rem] text-[#1e293b]">
                    {product.revenue.toLocaleString()} ₴
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* العملاء النشطين */}
      <Card className="bg-white border border-[#e2e8f0] rounded-[0.5rem] shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[1.125rem] font-semibold text-[#1e293b]">
              العملاء النشطين
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#3b82f6] hover:bg-[#f8fafc]"
            >
              <span className="text-[0.875rem]">عرض الكل</span>
              <ArrowRight className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  العميل
                </TableHead>
                <TableHead className="text-right text-[0.75rem] text-[#64748b]">
                  المشتريات
                </TableHead>
                <TableHead className="text-left text-[0.75rem] text-[#64748b]">
                  آخر شراء
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCustomers.slice(0, 3).map((customer) => (
                <TableRow key={customer.id} className="hover:bg-[#f8fafc]">
                  <TableCell className="font-medium text-[0.875rem] text-[#1e293b]">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-right text-[0.875rem] text-[#1e293b]">
                    {customer.purchases}
                  </TableCell>
                  <TableCell className="text-left text-[0.875rem] text-[#1e293b]">
                    {formatDate(customer.lastPurchase)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickReports;
