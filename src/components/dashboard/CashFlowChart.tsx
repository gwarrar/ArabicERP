import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
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

interface CashFlowChartProps {
  title?: string;
  data?: any[];
}

const CashFlowChart = ({
  title = "التدفق النقدي",
  data = [
    { name: "يناير", income: 45000, expenses: 35000 },
    { name: "فبراير", income: 52000, expenses: 38000 },
    { name: "مارس", income: 48000, expenses: 42000 },
    { name: "أبريل", income: 61000, expenses: 45000 },
    { name: "مايو", income: 55000, expenses: 48000 },
    { name: "يونيو", income: 67000, expenses: 52000 },
  ],
}: CashFlowChartProps) => {
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
            <LineChart
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
              <Line
                type="monotone"
                dataKey="income"
                name="الإيرادات"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="المصروفات"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      {/* نافذة التفاصيل */}
      <DashboardDetailsPopup
        open={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        chartType="cashflow"
        title={title}
        dataPoint={selectedDataPoint}
      />
    </Card>
  );
};

export default CashFlowChart;
