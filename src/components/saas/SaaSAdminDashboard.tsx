import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  FileText,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SaaSKPICard from "./SaaSKPICard";
import SaaSKPIDetailsPopup from "./SaaSKPIDetailsPopup";
import SubscriptionTrendChart from "./charts/SubscriptionTrendChart";
import RevenueChart from "./charts/RevenueChart";
import CustomerRetentionChart from "./charts/CustomerRetentionChart";
import MRRChart from "./charts/MRRChart";
import ChurnRateChart from "./charts/ChurnRateChart";
import ARPUChart from "./charts/ARPUChart";
import PackageDistributionChart from "./charts/PackageDistributionChart";
import SubscriptionGrowthChart from "./charts/SubscriptionGrowthChart";

const SaaSAdminDashboard = () => {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dateRange, setDateRange] = useState("last6months");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("standard"); // standard, detailed

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType);
    setIsPopupOpen(true);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">لوحة تحكم SaaS</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 ml-1" />
            يوليو 2024
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 ml-1" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-muted/20 p-3 rounded-md">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث..."
            className="pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الفترة الزمنية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last30days">آخر 30 يوم</SelectItem>
            <SelectItem value="last3months">آخر 3 أشهر</SelectItem>
            <SelectItem value="last6months">آخر 6 أشهر</SelectItem>
            <SelectItem value="lastyear">آخر سنة</SelectItem>
            <SelectItem value="custom">فترة مخصصة</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-1" />
              خيارات العرض
              <ChevronDown className="h-4 w-4 mr-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setViewMode("standard")}>
              عرض قياسي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewMode("detailed")}>
              عرض مفصل
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setDateRange("last6months");
          }}
        >
          <RefreshCw className="h-4 w-4 ml-1" />
          إعادة ضبط
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SaaSKPICard
          title="الاشتراكات النشطة"
          value="120"
          change="+15%"
          trend="up"
          color="blue"
          onClick={() => handleKPIClick("activeSubscriptions")}
        />

        <SaaSKPICard
          title="الإيراد الشهري المتكرر"
          value="₴ 75,000"
          change="+15.4%"
          trend="up"
          color="green"
          onClick={() => handleKPIClick("mrr")}
        />

        <SaaSKPICard
          title="معدل التسرب"
          value="2.0%"
          change="-0.3%"
          trend="down"
          color="red"
          onClick={() => handleKPIClick("churnRate")}
        />

        <SaaSKPICard
          title="متوسط الإيراد لكل مستخدم"
          value="₴ 430"
          change="+1.2%"
          trend="up"
          color="amber"
          onClick={() => handleKPIClick("arpu")}
        />
      </div>

      {/* Charts Section - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">اتجاه الاشتراكات</h3>
          {viewMode === "standard" ? (
            <SubscriptionTrendChart
              onBarClick={(period) => handleKPIClick(`subscriptions_${period}`)}
            />
          ) : (
            <SubscriptionGrowthChart
              onPointClick={(period) =>
                handleKPIClick(`subscriptions_${period}`)
              }
            />
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">الإيرادات</h3>
          {viewMode === "standard" ? (
            <RevenueChart
              onBarClick={(period) => handleKPIClick(`revenue_${period}`)}
            />
          ) : (
            <MRRChart
              onPointClick={(period) => handleKPIClick(`revenue_${period}`)}
            />
          )}
        </Card>
      </div>

      {/* Charts Section - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">معدل الاحتفاظ بالعملاء</h3>
          <CustomerRetentionChart
            onSegmentClick={(segment) => handleKPIClick(`retention_${segment}`)}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">معدل التسرب</h3>
          <ChurnRateChart
            onPointClick={(period) => handleKPIClick(`churn_${period}`)}
          />
        </Card>
      </div>

      {/* Charts Section - Third Row */}
      {viewMode === "detailed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">
              متوسط الإيراد لكل مستخدم
            </h3>
            <ARPUChart
              onBarClick={(period) => handleKPIClick(`arpu_${period}`)}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">توزيع الباقات</h3>
            <PackageDistributionChart
              onSliceClick={(packageName) =>
                handleKPIClick(`package_${packageName}`)
              }
            />
          </Card>
        </div>
      )}

      {/* KPI Details Popup */}
      {selectedKPI && (
        <SaaSKPIDetailsPopup
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          kpiType={selectedKPI}
        />
      )}
    </div>
  );
};

export default SaaSAdminDashboard;
