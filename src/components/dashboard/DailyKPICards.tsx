import React, { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import KPIDetailsPopup from "./KPIDetailsPopup";

interface DailyKPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  kpiType?: string;
  onClick?: (kpiType: string) => void;
}

const DailyKPICard = ({
  title = "العنوان",
  value = "0",
  change = 0,
  icon = <DollarSign className="h-4 w-4" />,
  color = "bg-blue-500",
  subtitle = "من الأمس",
  kpiType = "default",
  onClick,
}: DailyKPICardProps) => {
  const isPositive = change >= 0;

  const handleClick = () => {
    if (onClick) {
      onClick(kpiType);
    }
  };

  return (
    <Card
      className="bg-white overflow-hidden shadow-sm border border-[#e2e8f0] rounded-[0.5rem] cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="text-sm font-medium text-[#64748b] mb-1">{title}</div>
        <div className="text-2xl font-bold text-[#1e293b] mb-1">{value}</div>
        <div className="flex items-center">
          <span
            className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"} flex items-center font-medium`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-[#64748b] mr-2">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface DailyKPICardsProps {
  cards?: DailyKPICardProps[];
  onCardClick?: (kpiType: string) => void;
}

const DailyKPICards = ({ cards = [], onCardClick }: DailyKPICardsProps) => {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedCardData, setSelectedCardData] =
    useState<DailyKPICardProps | null>(null);

  const defaultCards: DailyKPICardProps[] = [
    {
      title: "المبيعات (اليوم)",
      value: "₴ 12,500",
      change: 9.1,
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-[#3b82f6]",
      kpiType: "daily_sales",
      subtitle: "من الأمس",
    },
    {
      title: "المشتريات (اليوم)",
      value: "₴ 8,200",
      change: 4.9,
      icon: <ShoppingCart className="h-4 w-4" />,
      color: "bg-[#f59e0b]",
      kpiType: "daily_purchases",
      subtitle: "من الأمس",
    },
    {
      title: "الأرباح (اليوم)",
      value: "₴ 4,300",
      change: 18.3,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-[#10b981]",
      kpiType: "daily_profits",
      subtitle: "من الأمس",
    },
    {
      title: "المصروفات (اليوم)",
      value: "₴ 2,100",
      change: -9.7,
      icon: <CreditCard className="h-4 w-4" />,
      color: "bg-[#ef4444]",
      kpiType: "daily_expenses",
      subtitle: "من الأمس",
    },
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  const handleCardClick = (kpiType: string) => {
    // إيجاد بيانات البطاقة المحددة
    const cardData =
      displayCards.find((card) => card.kpiType === kpiType) || null;
    setSelectedKPI(kpiType);
    setSelectedCardData(cardData);
    setShowDetailsPopup(true);

    // استدعاء الدالة الخارجية إذا كانت موجودة
    if (onCardClick) {
      onCardClick(kpiType);
    }
  };

  return (
    <div className="w-full" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <DailyKPICard key={index} {...card} onClick={handleCardClick} />
        ))}
      </div>

      {/* نافذة التفاصيل */}
      {showDetailsPopup && selectedCardData && (
        <KPIDetailsPopup
          open={showDetailsPopup}
          onClose={() => setShowDetailsPopup(false)}
          kpiType={selectedKPI || ""}
          title={selectedCardData.title}
          value={selectedCardData.value}
          change={selectedCardData.change}
        />
      )}
    </div>
  );
};

export default DailyKPICards;
