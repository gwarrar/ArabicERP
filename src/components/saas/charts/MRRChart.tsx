import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface MRRChartProps {
  data?: any[];
  onPointClick?: (period: string) => void;
}

const MRRChart: React.FC<MRRChartProps> = ({ data, onPointClick }) => {
  // بيانات تجريبية للإيراد الشهري المتكرر
  const defaultData = [
    { month: "يناير", mrr: 35000, newMRR: 5000, churnMRR: 2000 },
    { month: "فبراير", mrr: 38000, newMRR: 6000, churnMRR: 3000 },
    { month: "مارس", mrr: 41000, newMRR: 5500, churnMRR: 2500 },
    { month: "أبريل", mrr: 44000, newMRR: 6500, churnMRR: 3500 },
    { month: "مايو", mrr: 47000, newMRR: 7000, churnMRR: 4000 },
    { month: "يونيو", mrr: 50000, newMRR: 7500, churnMRR: 4500 },
  ];

  const chartData = data || defaultData;

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
      <AreaChart
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
        />
        <Tooltip
          formatter={(value: number) => [formatTooltip(value), "القيمة"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="mrr"
          name="الإيراد الشهري المتكرر"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          activeDot={{
            r: 8,
            onClick: (e: any) => onPointClick && onPointClick(e.payload.month),
          }}
        />
        <Area
          type="monotone"
          dataKey="newMRR"
          name="إيرادات جديدة"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="churnMRR"
          name="إيرادات مفقودة"
          stroke="#ff8042"
          fill="#ff8042"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MRRChart;
