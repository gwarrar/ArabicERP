import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PackageDistributionChartProps {
  data?: any[];
  onSliceClick?: (packageName: string) => void;
}

const PackageDistributionChart: React.FC<PackageDistributionChartProps> = ({
  data,
  onSliceClick,
}) => {
  // بيانات تجريبية لتوزيع الباقات
  const defaultData = [
    { name: "الباقة الأساسية", value: 45, color: "#0088FE" },
    { name: "الباقة المتقدمة", value: 35, color: "#00C49F" },
    { name: "الباقة المتكاملة", value: 20, color: "#FFBB28" },
  ];

  const chartData = data || defaultData;
  const COLORS = chartData.map((item) => item.color);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          onClick={(data) => onSliceClick && onSliceClick(data.name)}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value} (${((value / chartData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%)`,
            name,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PackageDistributionChart;
