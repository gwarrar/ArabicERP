import React from "react";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

const KPICard = ({
  title = "العنوان",
  value = "0",
  change = 0,
  icon = <Users />,
  color = "bg-blue-500",
  subtitle = "منذ الشهر الماضي",
}: KPICardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white overflow-hidden shadow-sm border border-[#e2e8f0] rounded-[0.5rem]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-[0.875rem] font-medium text-[#64748b] text-right">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${color} text-white shadow-sm`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-[1.5rem] font-bold text-right text-[#1e293b]">
          {value}
        </div>
        <div className="flex items-center justify-end mt-2">
          <span
            className={`text-[0.75rem] ${isPositive ? "text-green-600" : "text-red-600"} flex items-center font-medium`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-[0.75rem] text-[#64748b] mr-2">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface KPICardsProps {
  cards?: KPICardProps[];
}

const KPICards = ({ cards = [] }: KPICardsProps) => {
  const defaultCards: KPICardProps[] = [
    {
      title: "إجمالي المبيعات",
      value: "٥٤٣,٧٦٠ ₴",
      change: 12.5,
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-[#3b82f6]",
    },
    {
      title: "الأرباح",
      value: "١٢٣,٤٥٦ ₴",
      change: 8.2,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-[#10b981]",
    },
    {
      title: "العملاء الجدد",
      value: "٥٤",
      change: -2.4,
      icon: <Users className="h-4 w-4" />,
      color: "bg-[#8b5cf6]",
    },
    {
      title: "المخزون",
      value: "١,٢٣٤",
      change: 3.7,
      icon: <Package className="h-4 w-4" />,
      color: "bg-[#f59e0b]",
    },
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="w-[1232px] max-w-full mx-auto mt-[80px] mb-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <KPICard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KPICards;
