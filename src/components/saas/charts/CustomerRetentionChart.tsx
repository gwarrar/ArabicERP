import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CustomerRetentionChartProps {
  onSegmentClick?: (segment: string) => void;
}

const CustomerRetentionChart: React.FC<CustomerRetentionChartProps> = ({
  onSegmentClick,
}) => {
  // بيانات تجريبية لمعدل الاحتفاظ بالعملاء
  const data = [
    { month: "يناير", retention: 92 },
    { month: "فبراير", retention: 93 },
    { month: "مارس", retention: 91 },
    { month: "أبريل", retention: 94 },
    { month: "مايو", retention: 95 },
    { month: "يونيو", retention: 93 },
  ];

  const formatYAxis = (value: number) => {
    return `${value}%`;
  };

  const formatTooltip = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onClick={(data) => {
          if (data.activePayload && onSegmentClick) {
            onSegmentClick(data.activePayload[0].payload.month);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fill: "#888" }}
          axisLine={false}
          domain={[85, 100]}
        />
        <Tooltip
          formatter={(value: number) => [formatTooltip(value), "معدل الاحتفاظ"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="retention"
          name="معدل الاحتفاظ بالعملاء"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{
            r: 8,
            onClick: (e: any) =>
              onSegmentClick && onSegmentClick(e.payload.month),
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomerRetentionChart;
