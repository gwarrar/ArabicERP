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
  LabelList,
} from "recharts";

interface ARPUChartProps {
  data?: any[];
  onBarClick?: (period: string) => void;
}

const ARPUChart: React.FC<ARPUChartProps> = ({ data, onBarClick }) => {
  // بيانات تجريبية لمتوسط الإيراد لكل مستخدم
  const defaultData = [
    {
      month: "يناير",
      arpu: 350,
      arpuBasic: 300,
      arpuAdvanced: 400,
      arpuPremium: 500,
    },
    {
      month: "فبراير",
      arpu: 360,
      arpuBasic: 310,
      arpuAdvanced: 410,
      arpuPremium: 510,
    },
    {
      month: "مارس",
      arpu: 370,
      arpuBasic: 320,
      arpuAdvanced: 420,
      arpuPremium: 520,
    },
    {
      month: "أبريل",
      arpu: 380,
      arpuBasic: 330,
      arpuAdvanced: 430,
      arpuPremium: 530,
    },
    {
      month: "مايو",
      arpu: 390,
      arpuBasic: 340,
      arpuAdvanced: 440,
      arpuPremium: 540,
    },
    {
      month: "يونيو",
      arpu: 400,
      arpuBasic: 350,
      arpuAdvanced: 450,
      arpuPremium: 550,
    },
  ];

  const chartData = data || defaultData;

  const formatYAxis = (value: number) => {
    return `₴ ${value}`;
  };

  const formatTooltip = (value: number) => {
    return `₴ ${value.toLocaleString()}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
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
          formatter={(value: number) => [formatTooltip(value), "القيمة"]}
          labelFormatter={(label) => `شهر: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="arpu"
          name="متوسط الإيراد لكل مستخدم"
          fill="#8884d8"
          onClick={(data) => onBarClick && onBarClick(data.month)}
        >
          <LabelList dataKey="arpu" position="top" formatter={formatTooltip} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ARPUChart;
