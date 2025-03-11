import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

interface SalesData {
  month: string;
  sales: number;
  target: number;
}

interface SalesChartProps {
  data?: SalesData[];
  title?: string;
  percentageChange?: number;
  period?: string;
  onChartClick?: (chartType: string, period?: string) => void;
}

const SalesChart = ({
  data = [
    { month: "يناير", sales: 4000, target: 4500 },
    { month: "فبراير", sales: 5000, target: 4500 },
    { month: "مارس", sales: 3500, target: 4500 },
    { month: "أبريل", sales: 6000, target: 5000 },
    { month: "مايو", sales: 5500, target: 5000 },
    { month: "يونيو", sales: 7000, target: 5500 },
  ],
  title = "تحليل المبيعات",
  percentageChange = 12.5,
  period = "شهري",
  onChartClick,
}: SalesChartProps) => {
  const [timeFilter, setTimeFilter] = useState("شهري");

  const isPositiveChange = percentageChange >= 0;

  // معالجة النقر على الرسم البياني
  const handleChartClick = (chartType: string, period?: string) => {
    if (onChartClick) {
      onChartClick(chartType, period);
    }
  };

  return (
    <Card
      className="w-full h-full bg-white shadow-sm border border-[#e2e8f0] rounded-[0.5rem] cursor-pointer hover:shadow-md transition-shadow"
      dir="rtl"
      onClick={() => handleChartClick("sales")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div>
          <CardTitle className="text-[1.125rem] font-bold text-[#1e293b]">
            {title}
          </CardTitle>
          <div className="flex items-center mt-1 text-[0.875rem]">
            <span
              className={`flex items-center ${isPositiveChange ? "text-green-600" : "text-red-600"} font-medium`}
            >
              {isPositiveChange ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(percentageChange)}%
            </span>
            <span className="text-[#64748b] mr-2">مقارنة بالفترة السابقة</span>
          </div>
        </div>
        <Select
          value={timeFilter}
          onValueChange={setTimeFilter}
          onOpenChange={(open) => {
            if (open) {
              // منع انتشار الحدث عند فتح القائمة المنسدلة
              event?.stopPropagation();
            }
          }}
        >
          <SelectTrigger
            className="w-[120px] h-9 border-[#e2e8f0]"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-4 w-4 ml-2 text-[#64748b]" />
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent className="border-[#e2e8f0]">
            <SelectItem value="أسبوعي">أسبوعي</SelectItem>
            <SelectItem value="شهري">شهري</SelectItem>
            <SelectItem value="ربع سنوي">ربع سنوي</SelectItem>
            <SelectItem value="سنوي">سنوي</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2 px-4 pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
              onClick={(data) => {
                if (data.activePayload) {
                  handleChartClick(
                    "sales",
                    data.activePayload[0].payload.month,
                  );
                }
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
                tickFormatter={(value) => `${value} ₴`}
              />
              <Tooltip
                formatter={(value) => [`${value} ₴`, ""]}
                labelFormatter={(label) => `شهر ${label}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  textAlign: "right",
                  direction: "rtl",
                  backgroundColor: "#fff",
                  padding: "8px 12px",
                  fontSize: "12px",
                  color: "#1e293b",
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }}
                onClick={(data) =>
                  handleChartClick(
                    "sales",
                    data.dataKey === "sales" ? undefined : undefined,
                  )
                }
              />
              <Bar
                name="المبيعات"
                dataKey="sales"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={30}
                onClick={(data) => handleChartClick("sales", data.month)}
              />
              <Bar
                name="المستهدف"
                dataKey="target"
                fill="#e2e8f0"
                radius={[4, 4, 0, 0]}
                barSize={30}
                onClick={(data) => handleChartClick("sales", data.month)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
