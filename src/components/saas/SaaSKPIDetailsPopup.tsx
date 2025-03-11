import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Search, Filter, Download, Printer, BarChart2, X } from "lucide-react";

interface SaaSKPIDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  kpiType: string;
}

const SaaSKPIDetailsPopup: React.FC<SaaSKPIDetailsPopupProps> = ({
  open,
  onClose,
  kpiType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageFilter, setPackageFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [showChart, setShowChart] = useState(false);

  // تحديد عنوان النافذة بناءً على نوع المؤشر
  const getTitle = () => {
    switch (kpiType) {
      case "activeSubscriptions":
        return "تفاصيل الاشتراكات النشطة";
      case "mrr":
        return "تفاصيل الإيراد الشهري المتكرر";
      case "churnRate":
        return "تفاصيل معدل التسرب";
      case "arpu":
        return "تفاصيل متوسط الإيراد لكل مستخدم";
      default:
        if (kpiType.startsWith("subscriptions_")) {
          return "تفاصيل اتجاه الاشتراكات";
        } else if (kpiType.startsWith("revenue_")) {
          return "تفاصيل الإيرادات";
        } else if (kpiType.startsWith("retention_")) {
          return "تفاصيل معدل الاحتفاظ بالعملاء";
        }
        return "تفاصيل المؤشر";
    }
  };

  // بيانات تجريبية للاشتراكات النشطة
  const getActiveSubscriptionsData = () => [
    {
      id: "SUB-001",
      customer: "شركة الأمل للتجارة",
      package: "الباقة المتكاملة",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      status: "نشط",
      value: "₴ 500",
    },
    {
      id: "SUB-002",
      customer: "مؤسسة النور",
      package: "الباقة الأساسية",
      startDate: "2024-02-20",
      endDate: "2025-02-19",
      status: "نشط",
      value: "₴ 300",
    },
    {
      id: "SUB-003",
      customer: "شركة البناء الحديث",
      package: "الباقة المتقدمة",
      startDate: "2024-03-10",
      endDate: "2025-03-09",
      status: "نشط",
      value: "₴ 400",
    },
    {
      id: "SUB-004",
      customer: "مؤسسة الصفا التجارية",
      package: "الباقة المتكاملة",
      startDate: "2024-04-05",
      endDate: "2025-04-04",
      status: "نشط",
      value: "₴ 500",
    },
    {
      id: "SUB-005",
      customer: "شركة الفجر للإلكترونيات",
      package: "الباقة المتقدمة",
      startDate: "2024-05-12",
      endDate: "2025-05-11",
      status: "نشط",
      value: "₴ 400",
    },
  ];

  // بيانات تجريبية للإيراد الشهري المتكرر
  const getMRRData = () => [
    {
      month: "يناير 2024",
      revenue: "₴ 35,000",
      subscriptions: 70,
      newCustomers: 10,
      churnedCustomers: 5,
      growth: "+14%",
    },
    {
      month: "فبراير 2024",
      revenue: "₴ 37,500",
      subscriptions: 75,
      newCustomers: 8,
      churnedCustomers: 3,
      growth: "+7%",
    },
    {
      month: "مارس 2024",
      revenue: "₴ 40,000",
      subscriptions: 80,
      newCustomers: 12,
      churnedCustomers: 7,
      growth: "+6.7%",
    },
    {
      month: "أبريل 2024",
      revenue: "₴ 42,500",
      subscriptions: 85,
      newCustomers: 9,
      churnedCustomers: 4,
      growth: "+6.3%",
    },
    {
      month: "مايو 2024",
      revenue: "₴ 45,000",
      subscriptions: 90,
      newCustomers: 11,
      churnedCustomers: 6,
      growth: "+5.9%",
    },
  ];

  // بيانات تجريبية لمعدل التسرب
  const getChurnRateData = () => [
    {
      month: "يناير 2024",
      churnRate: "3.5%",
      totalCustomers: 70,
      churnedCustomers: 3,
      reason: "تكلفة مرتفعة",
    },
    {
      month: "فبراير 2024",
      churnRate: "3.0%",
      totalCustomers: 75,
      churnedCustomers: 2,
      reason: "ميزات غير كافية",
    },
    {
      month: "مارس 2024",
      churnRate: "2.8%",
      totalCustomers: 80,
      churnedCustomers: 2,
      reason: "تكلفة مرتفعة",
    },
    {
      month: "أبريل 2024",
      churnRate: "2.6%",
      totalCustomers: 85,
      churnedCustomers: 2,
      reason: "انتقال لمنافس",
    },
    {
      month: "مايو 2024",
      churnRate: "2.5%",
      totalCustomers: 90,
      churnedCustomers: 2,
      reason: "إغلاق الشركة",
    },
  ];

  // بيانات تجريبية لمتوسط الإيراد لكل مستخدم
  const getARPUData = () => [
    {
      month: "يناير 2024",
      arpu: "₴ 350",
      totalRevenue: "₴ 35,000",
      totalCustomers: 70,
      topPackage: "الباقة المتكاملة",
    },
    {
      month: "فبراير 2024",
      arpu: "₴ 355",
      totalRevenue: "₴ 37,500",
      totalCustomers: 75,
      topPackage: "الباقة المتكاملة",
    },
    {
      month: "مارس 2024",
      arpu: "₴ 360",
      totalRevenue: "₴ 40,000",
      totalCustomers: 80,
      topPackage: "الباقة المتكاملة",
    },
    {
      month: "أبريل 2024",
      arpu: "₴ 365",
      totalRevenue: "₴ 42,500",
      totalCustomers: 85,
      topPackage: "الباقة المتقدمة",
    },
    {
      month: "مايو 2024",
      arpu: "₴ 375",
      totalRevenue: "₴ 45,000",
      totalCustomers: 90,
      topPackage: "الباقة المتكاملة",
    },
  ];

  // تحديد البيانات المناسبة بناءً على نوع المؤشر
  const getData = () => {
    switch (kpiType) {
      case "activeSubscriptions":
        return getActiveSubscriptionsData();
      case "mrr":
        return getMRRData();
      case "churnRate":
        return getChurnRateData();
      case "arpu":
        return getARPUData();
      default:
        return [];
    }
  };

  // تصفية البيانات بناءً على معايير البحث
  const filteredData = getData().filter((item) => {
    // تنفيذ منطق التصفية حسب نوع المؤشر
    return true; // تنفيذ منطق التصفية الفعلي هنا
  });

  // تحديد أعمدة الجدول بناءً على نوع المؤشر
  const renderTableHeaders = () => {
    switch (kpiType) {
      case "activeSubscriptions":
        return (
          <TableRow>
            <TableHead>رقم الاشتراك</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>الباقة</TableHead>
            <TableHead>تاريخ البدء</TableHead>
            <TableHead>تاريخ الانتهاء</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>القيمة</TableHead>
          </TableRow>
        );
      case "mrr":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الإيراد</TableHead>
            <TableHead>عدد الاشتراكات</TableHead>
            <TableHead>عملاء جدد</TableHead>
            <TableHead>عملاء متسربين</TableHead>
            <TableHead>النمو</TableHead>
          </TableRow>
        );
      case "churnRate":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>معدل التسرب</TableHead>
            <TableHead>إجمالي العملاء</TableHead>
            <TableHead>العملاء المتسربين</TableHead>
            <TableHead>سبب التسرب الرئيسي</TableHead>
          </TableRow>
        );
      case "arpu":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>متوسط الإيراد لكل مستخدم</TableHead>
            <TableHead>إجمالي الإيرادات</TableHead>
            <TableHead>إجمالي العملاء</TableHead>
            <TableHead>الباقة الأكثر شيوعًا</TableHead>
          </TableRow>
        );
      default:
        return <TableRow></TableRow>;
    }
  };

  // عرض صفوف الجدول بناءً على نوع المؤشر
  const renderTableRows = () => {
    if (filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="h-24 text-center text-muted-foreground"
          >
            لا توجد بيانات متاحة
          </TableCell>
        </TableRow>
      );
    }

    switch (kpiType) {
      case "activeSubscriptions":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.customer}</TableCell>
            <TableCell>{item.package}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {item.status}
              </span>
            </TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ));
      case "mrr":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.revenue}</TableCell>
            <TableCell>{item.subscriptions}</TableCell>
            <TableCell>{item.newCustomers}</TableCell>
            <TableCell>{item.churnedCustomers}</TableCell>
            <TableCell>
              <span className="text-green-600">{item.growth}</span>
            </TableCell>
          </TableRow>
        ));
      case "churnRate":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.churnRate}</TableCell>
            <TableCell>{item.totalCustomers}</TableCell>
            <TableCell>{item.churnedCustomers}</TableCell>
            <TableCell>{item.reason}</TableCell>
          </TableRow>
        ));
      case "arpu":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.arpu}</TableCell>
            <TableCell>{item.totalRevenue}</TableCell>
            <TableCell>{item.totalCustomers}</TableCell>
            <TableCell>{item.topPackage}</TableCell>
          </TableRow>
        ));
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {getTitle()}
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
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
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

            <Select value={packageFilter} onValueChange={setPackageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الباقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الباقات</SelectItem>
                <SelectItem value="basic">الباقة الأساسية</SelectItem>
                <SelectItem value="advanced">الباقة المتقدمة</SelectItem>
                <SelectItem value="premium">الباقة المتكاملة</SelectItem>
              </SelectContent>
            </Select>

            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفترات</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
                <SelectItem value="quarter">هذا الربع</SelectItem>
                <SelectItem value="year">هذه السنة</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setPackageFilter("all");
                setPeriodFilter("all");
              }}
              className="h-10"
            >
              <Filter className="h-4 w-4 ml-1" />
              إعادة ضبط
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChart(!showChart)}
              className="h-10"
            >
              <BarChart2 className="h-4 w-4 ml-1" />
              {showChart ? "إخفاء الرسم البياني" : "عرض الرسم البياني"}
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Chart (if enabled) */}
        {showChart && (
          <div className="h-64 mb-4 border rounded-md flex items-center justify-center bg-gray-50">
            <BarChart2 className="h-16 w-16 text-gray-300" />
            <p className="text-gray-500 mr-2">الرسم البياني للبيانات</p>
          </div>
        )}

        {/* Data Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaaSKPIDetailsPopup;
