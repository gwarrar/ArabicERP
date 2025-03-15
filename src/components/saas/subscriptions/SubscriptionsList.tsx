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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionDetails from "./SubscriptionDetails";

// بيانات تجريبية للاشتراكات
const subscriptionsData = [
  {
    id: "SUB-001",
    customer: "شركة الأمل للتجارة",
    package: "الباقة المتكاملة",
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    status: "نشط",
    value: "₴ 6,000",
    paymentStatus: "مدفوع",
  },
  {
    id: "SUB-002",
    customer: "مؤسسة النور",
    package: "الباقة الأساسية",
    startDate: "2024-02-20",
    endDate: "2025-02-19",
    status: "نشط",
    value: "₴ 3,600",
    paymentStatus: "مدفوع",
  },
  {
    id: "SUB-003",
    customer: "شركة البناء الحديث",
    package: "الباقة المتقدمة",
    startDate: "2024-03-10",
    endDate: "2025-03-09",
    status: "نشط",
    value: "₴ 4,800",
    paymentStatus: "متأخر",
  },
  {
    id: "SUB-004",
    customer: "مؤسسة الصفا التجارية",
    package: "الباقة المتكاملة",
    startDate: "2023-04-05",
    endDate: "2024-04-04",
    status: "منتهي",
    value: "₴ 6,000",
    paymentStatus: "مدفوع",
  },
  {
    id: "SUB-005",
    customer: "شركة الفجر للإلكترونيات",
    package: "الباقة المتقدمة",
    startDate: "2023-05-12",
    endDate: "2024-05-11",
    status: "ملغي",
    value: "₴ 4,800",
    paymentStatus: "مسترجع",
  },
];

const SubscriptionsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // تصفية الاشتراكات بناءً على معايير البحث
  const filteredSubscriptions = subscriptionsData.filter((subscription) => {
    const matchesSearch =
      searchTerm === "" ||
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || subscription.status === statusFilter;

    const matchesPackage =
      packageFilter === "all" || subscription.package === packageFilter;

    return matchesSearch && matchesStatus && matchesPackage;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة الاشتراكات</h2>
        <Button onClick={() => setShowNewSubscription(true)}>
          <Plus className="ml-2 h-4 w-4" />
          اشتراك جديد
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
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
            <SelectItem value="نشط">نشط</SelectItem>
            <SelectItem value="منتهي">منتهي</SelectItem>
            <SelectItem value="ملغي">ملغي</SelectItem>
          </SelectContent>
        </Select>

        <Select value={packageFilter} onValueChange={setPackageFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="الباقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الباقات</SelectItem>
            <SelectItem value="الباقة الأساسية">الباقة الأساسية</SelectItem>
            <SelectItem value="الباقة المتقدمة">الباقة المتقدمة</SelectItem>
            <SelectItem value="الباقة المتكاملة">الباقة المتكاملة</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPackageFilter("all");
          }}
          className="h-10"
        >
          <Filter className="h-4 w-4 ml-1" />
          إعادة ضبط
        </Button>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الاشتراك</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الباقة</TableHead>
                <TableHead>تاريخ البدء</TableHead>
                <TableHead>تاريخ الانتهاء</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>القيمة</TableHead>
                <TableHead>حالة الدفع</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((subscription) => (
                  <TableRow
                    key={subscription.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => setSelectedSubscription(subscription)}
                  >
                    <TableCell className="font-medium">
                      {subscription.id}
                    </TableCell>
                    <TableCell>{subscription.customer}</TableCell>
                    <TableCell>{subscription.package}</TableCell>
                    <TableCell>{formatDate(subscription.startDate)}</TableCell>
                    <TableCell>{formatDate(subscription.endDate)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          subscription.status === "نشط"
                            ? "bg-green-100 text-green-800"
                            : subscription.status === "منتهي"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </TableCell>
                    <TableCell>{subscription.value}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          subscription.paymentStatus === "مدفوع"
                            ? "bg-green-100 text-green-800"
                            : subscription.paymentStatus === "متأخر"
                              ? "bg-amber-100 text-amber-800"
                              : subscription.paymentStatus === "مسترجع"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscription.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubscription(subscription);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
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
      </Card>

      {/* New Subscription Dialog */}
      {showNewSubscription && (
        <SubscriptionForm
          open={showNewSubscription}
          onClose={() => setShowNewSubscription(false)}
          onSave={() => {
            setShowNewSubscription(false);
            // هنا يمكن إضافة منطق لإضافة الاشتراك الجديد إلى القائمة
          }}
        />
      )}

      {/* Subscription Details Dialog */}
      {selectedSubscription && (
        <SubscriptionDetails
          open={!!selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
          subscription={selectedSubscription}
        />
      )}
    </div>
  );
};

export default SubscriptionsList;
