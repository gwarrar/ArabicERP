import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, DollarSign, Layers, Activity } from "lucide-react";
import SubscriptionReports from "./SubscriptionReports";
import RevenueReports from "./RevenueReports";
import CustomerReports from "./CustomerReports";
import ModuleUsageReports from "./ModuleUsageReports";
import PerformanceReports from "./PerformanceReports";
import ReportDetailsPopup from "./ReportDetailsPopup";

const SaaSReports = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // معالجة النقر على نقطة بيانية في الرسم البياني
  const handleReportClick = (reportType: string, period?: string) => {
    setSelectedReport(reportType);
    setSelectedPeriod(period || null);
    setIsPopupOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-blue-800">
          مرحباً بك في لوحة التقارير! هنا يمكنك الاطلاع على تقارير مفصلة عن
          الاشتراكات والإيرادات والعملاء واستخدام الوحدات وأداء النظام. يمكنك
          تصفية البيانات حسب الفترة الزمنية وتصدير التقارير بالصيغة المناسبة.
          <strong> انقر على أي رسم بياني لعرض تفاصيل أكثر.</strong>
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subscriptions">
            <Users className="h-4 w-4 ml-2" />
            الاشتراكات
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <DollarSign className="h-4 w-4 ml-2" />
            الإيرادات
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 ml-2" />
            العملاء
          </TabsTrigger>
          <TabsTrigger value="module-usage">
            <Layers className="h-4 w-4 ml-2" />
            استخدام الوحدات
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity className="h-4 w-4 ml-2" />
            أداء النظام
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="mt-0">
          <SubscriptionReports onReportClick={handleReportClick} />
        </TabsContent>

        <TabsContent value="revenue" className="mt-0">
          <RevenueReports onReportClick={handleReportClick} />
        </TabsContent>

        <TabsContent value="customers" className="mt-0">
          <CustomerReports onReportClick={handleReportClick} />
        </TabsContent>

        <TabsContent value="module-usage" className="mt-0">
          <ModuleUsageReports onReportClick={handleReportClick} />
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <PerformanceReports onReportClick={handleReportClick} />
        </TabsContent>
      </Tabs>

      {/* نافذة تفاصيل التقرير */}
      {selectedReport && (
        <ReportDetailsPopup
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          reportType={selectedReport}
          period={selectedPeriod || undefined}
        />
      )}
    </div>
  );
};

export default SaaSReports;
