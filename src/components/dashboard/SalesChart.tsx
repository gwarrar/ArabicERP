import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import DashboardDetailsPopup from "./DashboardDetailsPopup";

interface SalesChartProps {
  title?: string;
  data?: any[];
}

const SalesChart = ({
  title = "تحليل المبيعات",
  data = [
    { name: "يناير", sales: 45000, target: 40000 },
    { name: "فبراير", sales: 52000, target: 45000 },
    { name: "مارس", sales: 48000, target: 50000 },
    { name: "أبريل", sales: 61000, target: 55000 },
    { name: "مايو", sales: 55000, target: 60000 },
    { name: "يونيو", sales: 67000, target: 65000 },
  ],
}: SalesChartProps) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedDataPoint(data.activePayload[0].payload);
      setShowDetailsPopup(true);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="ml-2 h-4 w-4" />
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend
                onClick={(e) => {
                  setShowDetailsPopup(true);
                }}
              />
              <Bar dataKey="sales" name="المبيعات" fill="#3b82f6" />
              <Bar dataKey="target" name="الهدف" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      {/* نافذة التفاصيل */}
      <DashboardDetailsPopup
        open={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        chartType="sales"
        title={title}
        dataPoint={selectedDataPoint}
      />
    </Card>
  );
};

export default SalesChart;
