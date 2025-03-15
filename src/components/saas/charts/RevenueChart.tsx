import React from "react";
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

interface RevenueChartProps {
  onBarClick?: (period: string) => void;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ onBarClick }) => {
  // بيانات تجريبية للرسم البياني
  const data = [
    { month: "يناير", value: 35000 },
    { month: "فبراير", value: 37500 },
    { month: "مارس", value: 40000 },
    { month: "أبريل", value: 42500 },
    { month: "مايو", value: 45000 },
    { month: "يونيو", value: 47500 },
  ];

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  const formatTooltip = (value: number) => {
    return `₴ ${value.toLocaleString()}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(data) => {
          if (data.activePayload && onBarClick) {
            onBarClick(data.activePayload[0].payload.month);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fill: "#888" }}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number) => [formatTooltip(value), "الإيرادات"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="value"
          name="الإيرادات"
          fill="#00C49F"
          onClick={(data) => onBarClick && onBarClick(data.month)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
