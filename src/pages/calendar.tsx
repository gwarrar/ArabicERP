import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import CalendarDashboard from "@/components/calendar/CalendarDashboard";

const Calendar = () => {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-6">
        <CalendarDashboard />
      </div>
    </MainLayout>
  );
};

export default Calendar;
