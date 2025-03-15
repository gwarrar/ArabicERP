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

interface SubscriptionTrendChartProps {
  onBarClick?: (period: string) => void;
}

const SubscriptionTrendChart: React.FC<SubscriptionTrendChartProps> = ({
  onBarClick,
}) => {
  // بيانات تجريبية للرسم البياني
  const data = [
    { month: "يناير", value: 45 },
    { month: "فبراير", value: 56 },
    { month: "مارس", value: 69 },
    { month: "أبريل", value: 85 },
    { month: "مايو", value: 106 },
    { month: "يونيو", value: 129 },
  ];

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
        <YAxis tick={{ fill: "#888" }} axisLine={false} />
        <Tooltip
          formatter={(value: number) => [value, "عدد الاشتراكات"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="value"
          name="عدد الاشتراكات"
          fill="#0088FE"
          onClick={(data) => onBarClick && onBarClick(data.month)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SubscriptionTrendChart;
