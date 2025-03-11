import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import EnhancedDashboardTabs from "@/components/dashboard/EnhancedDashboardTabs";
import SmartAlert from "@/components/dashboard/SmartAlert";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div></div> {/* Empty div for spacing */}
          <SmartAlert
            title="تنبيه: فواتير مستحقة"
            message="لديك 3 فواتير مستحقة تحتاج إلى مراجعة"
            type="warning"
          />
        </div>

        <EnhancedDashboardTabs />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
