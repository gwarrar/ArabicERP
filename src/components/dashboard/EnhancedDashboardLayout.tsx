import React from "react";
import KPICards from "@/components/dashboard/KPICards";
import DailyKPICards from "@/components/dashboard/DailyKPICards";
import SalesChart from "@/components/dashboard/SalesChart";
import CashFlowChart from "@/components/dashboard/CashFlowChart";
import QuickReports from "@/components/dashboard/QuickReports";

const EnhancedDashboardLayout = () => {
  return (
    <div className="container mx-auto p-4 space-y-8" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء النظام</p>
      </div>

      {/* بطاقات مؤشرات الأداء */}
      <div className="mb-8">
        <KPICards />
      </div>

      {/* بطاقات مؤشرات الأداء اليومية */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">ملخص اليوم</h3>
        <DailyKPICards />
      </div>

      {/* الرسومات البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <SalesChart />
        </div>
        <div>
          <CashFlowChart />
        </div>
      </div>

      {/* التقارير السريعة */}
      <div className="mb-8">
        <QuickReports />
      </div>
    </div>
  );
};

export default EnhancedDashboardLayout;
