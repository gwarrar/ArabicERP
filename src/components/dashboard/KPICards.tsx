import React, { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KPIDetailsPopup from "./KPIDetailsPopup";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
  kpiType?: string;
  onClick?: (kpiType: string) => void;
  badge?: number;
}

const KPICard = ({
  title = "العنوان",
  value = "0",
  change = 0,
  icon = <Users />,
  color = "bg-blue-500",
  subtitle = "منذ الشهر الماضي",
  kpiType = "default",
  onClick,
  badge,
}: KPICardProps) => {
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
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-[0.875rem] font-medium text-[#64748b] text-right flex items-center gap-2">
          {title}
          {badge && (
            <Badge variant="destructive" className="h-5 px-1">
              {badge}
            </Badge>
          )}
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
  onCardClick?: (kpiType: string) => void;
}

const KPICards = ({ cards = [], onCardClick }: KPICardsProps) => {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<KPICardProps | null>(
    null,
  );

  const defaultCards: KPICardProps[] = [
    {
      title: "إجمالي المبيعات",
      value: "٥٤٣,٧٦٠ ₴",
      change: 12.5,
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-[#3b82f6]",
      kpiType: "sales",
    },
    {
      title: "الأرباح",
      value: "١٢٣,٤٥٦ ₴",
      change: 8.2,
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-[#10b981]",
      kpiType: "profits",
    },
    {
      title: "العملاء الجدد",
      value: "٥٤",
      change: -2.4,
      icon: <Users className="h-4 w-4" />,
      color: "bg-[#8b5cf6]",
      kpiType: "customers",
    },
    {
      title: "فواتير مستحقة",
      value: "١٨,٧٥٠ ₴",
      change: 0,
      icon: <FileText className="h-4 w-4" />,
      color: "bg-[#f59e0b]",
      kpiType: "invoices",
      subtitle: "تحتاج إلى مراجعة",
      badge: 3,
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
          <KPICard key={index} {...card} onClick={handleCardClick} />
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

export default KPICards;
