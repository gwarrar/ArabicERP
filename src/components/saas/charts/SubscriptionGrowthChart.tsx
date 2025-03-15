import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SubscriptionGrowthChartProps {
  data?: any[];
  onPointClick?: (period: string) => void;
}

const SubscriptionGrowthChart: React.FC<SubscriptionGrowthChartProps> = ({
  data,
  onPointClick,
}) => {
  // بيانات تجريبية لنمو الاشتراكات
  const defaultData = [
    {
      month: "يناير",
      newSubscriptions: 15,
      canceledSubscriptions: 5,
      totalSubscriptions: 45,
      growthRate: 28.6,
    },
    {
      month: "فبراير",
      newSubscriptions: 18,
      canceledSubscriptions: 7,
      totalSubscriptions: 56,
      growthRate: 24.4,
    },
    {
      month: "مارس",
      newSubscriptions: 22,
      canceledSubscriptions: 9,
      totalSubscriptions: 69,
      growthRate: 23.2,
    },
    {
      month: "أبريل",
      newSubscriptions: 25,
      canceledSubscriptions: 9,
      totalSubscriptions: 85,
      growthRate: 23.2,
    },
    {
      month: "مايو",
      newSubscriptions: 30,
      canceledSubscriptions: 9,
      totalSubscriptions: 106,
      growthRate: 24.7,
    },
    {
      month: "يونيو",
      newSubscriptions: 35,
      canceledSubscriptions: 12,
      totalSubscriptions: 129,
      growthRate: 21.7,
    },
  ];

  const chartData = data || defaultData;

  const formatYAxis = (value: number) => {
    return value;
  };

  const formatTooltip = (value: number) => {
    return value;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(data) => {
          if (data.activePayload && onPointClick) {
            onPointClick(data.activePayload[0].payload.month);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey="month" tick={{ fill: "#888" }} axisLine={false} />
        <YAxis
          yAxisId="left"
          tickFormatter={formatYAxis}
          tick={{ fill: "#888" }}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={formatPercentage}
          tick={{ fill: "#888" }}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "معدل النمو") {
              return [`${value}%`, name];
            }
            return [formatTooltip(value), name];
          }}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="newSubscriptions"
          name="اشتراكات جديدة"
          fill="#82ca9d"
          onClick={(data) => onPointClick && onPointClick(data.month)}
        />
        <Bar
          yAxisId="left"
          dataKey="canceledSubscriptions"
          name="اشتراكات ملغاة"
          fill="#ff8042"
          onClick={(data) => onPointClick && onPointClick(data.month)}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="growthRate"
          name="معدل النمو"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{
            r: 8,
            onClick: (e: any) => onPointClick && onPointClick(e.payload.month),
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SubscriptionGrowthChart;
