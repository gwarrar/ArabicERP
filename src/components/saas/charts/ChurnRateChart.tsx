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
  ReferenceLine,
} from "recharts";

interface ChurnRateChartProps {
  data?: any[];
  onPointClick?: (period: string) => void;
}

const ChurnRateChart: React.FC<ChurnRateChartProps> = ({
  data,
  onPointClick,
}) => {
  // بيانات تجريبية لمعدل التسرب
  const defaultData = [
    { month: "يناير", churnRate: 3.5, retentionRate: 96.5, target: 3.0 },
    { month: "فبراير", churnRate: 3.2, retentionRate: 96.8, target: 3.0 },
    { month: "مارس", churnRate: 2.8, retentionRate: 97.2, target: 3.0 },
    { month: "أبريل", churnRate: 2.5, retentionRate: 97.5, target: 3.0 },
    { month: "مايو", churnRate: 2.3, retentionRate: 97.7, target: 3.0 },
    { month: "يونيو", churnRate: 2.0, retentionRate: 98.0, target: 3.0 },
  ];

  const chartData = data || defaultData;

  const formatYAxis = (value: number) => {
    return `${value}%`;
  };

  const formatTooltip = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onClick={(data) => {
          if (data.activePayload && onPointClick) {
            onPointClick(data.activePayload[0].payload.month);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fill: "#888" }}
          axisLine={false}
          domain={[0, 5]}
        />
        <Tooltip
          formatter={(value: number) => [formatTooltip(value), "النسبة"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <ReferenceLine y={3} stroke="#ff0000" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="churnRate"
          name="معدل التسرب"
          stroke="#ff8042"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{
            r: 8,
            onClick: (e: any) => onPointClick && onPointClick(e.payload.month),
          }}
        />
        <Line
          type="monotone"
          dataKey="target"
          name="الهدف"
          stroke="#ff0000"
          strokeWidth={1}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChurnRateChart;
