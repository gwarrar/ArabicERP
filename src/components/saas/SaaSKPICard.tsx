import React from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertCircle,
  CreditCard,
} from "lucide-react";

interface SaaSKPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: "blue" | "green" | "red" | "amber";
  onClick?: () => void;
}

const SaaSKPICard: React.FC<SaaSKPICardProps> = ({
  title,
  value,
  change,
  trend,
  color,
  onClick,
}) => {
  // تحديد الألوان بناءً على المعامل color
  const bgColor = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    red: "bg-red-50 border-red-100",
    amber: "bg-amber-50 border-amber-100",
  }[color];

  const textColor = {
    blue: "text-blue-700",
    green: "text-green-700",
    red: "text-red-700",
    amber: "text-amber-700",
  }[color];

  const headingColor = {
    blue: "text-blue-800",
    green: "text-green-800",
    red: "text-red-800",
    amber: "text-amber-800",
  }[color];

  const iconBgColor = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    red: "bg-red-100",
    amber: "bg-amber-100",
  }[color];

  const iconColor = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    amber: "text-amber-600",
  }[color];

  // تحديد الأيقونة المناسبة
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case "الاشتراكات النشطة":
        return <Users className={`h-5 w-5 ${iconColor}`} />;
      case "الإيراد الشهري المتكرر":
      case "متوسط الإيراد لكل مستخدم":
        return <DollarSign className={`h-5 w-5 ${iconColor}`} />;
      case "معدل التسرب":
        return <AlertCircle className={`h-5 w-5 ${iconColor}`} />;
      default:
        return <CreditCard className={`h-5 w-5 ${iconColor}`} />;
    }
  };

  return (
    <Card
      className={`p-4 ${bgColor} cursor-pointer transition-all hover:shadow-md`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm ${textColor}`}>{title}</p>
          <h3 className={`text-xl font-bold ${headingColor} mt-1`}>{value}</h3>
          <p className={`text-xs ${textColor} mt-2 flex items-center`}>
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{change} مقارنة بالشهر السابق</span>
          </p>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-full`}>{getIcon()}</div>
      </div>
    </Card>
  );
};

export default SaaSKPICard;
