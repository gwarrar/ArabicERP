import React from "react";
import { DollarSign, Euro, TrendingUp, TrendingDown } from "lucide-react";

const ExchangeRateHeader = () => {
  // بيانات تجريبية لأسعار الصرف
  const exchangeRates = [
    { currency: "USD", symbol: "$", rate: 3.75, trend: "up" },
    { currency: "EUR", symbol: "€", rate: 4.12, trend: "down" },
  ];

  return (
    <div className="flex items-center gap-6 px-4 py-1 bg-white dark:bg-gray-800 border-b text-sm">
      <div className="text-muted-foreground">أسعار الصرف:</div>
      {exchangeRates.map((rate, index) => (
        <div key={index} className="flex items-center gap-1">
          {rate.currency === "USD" ? (
            <DollarSign className="h-3.5 w-3.5 text-blue-600" />
          ) : (
            <Euro className="h-3.5 w-3.5 text-blue-600" />
          )}
          <span className="font-medium">
            {rate.currency}: {rate.rate} ₴
          </span>
          {rate.trend === "up" ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600" />
          )}
        </div>
      ))}
      <div className="text-xs text-muted-foreground">
        آخر تحديث: 10 أغسطس 09:30
      </div>
    </div>
  );
};

export default ExchangeRateHeader;
