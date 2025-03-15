import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Euro } from "lucide-react";

const ExchangeRateWidget = () => {
  // بيانات تجريبية لأسعار الصرف
  const exchangeRates = [
    { currency: "USD", name: "الدولار الأمريكي", rate: 3.75, trend: "up" },
    { currency: "EUR", name: "اليورو", rate: 4.12, trend: "down" },
    { currency: "GBP", name: "الجنيه الإسترليني", rate: 4.8, trend: "up" },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="h-1 bg-blue-500"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">أسعار صرف العملات</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {exchangeRates.map((rate, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {rate.currency === "USD" ? (
                  <DollarSign className="h-4 w-4 text-blue-600" />
                ) : rate.currency === "EUR" ? (
                  <Euro className="h-4 w-4 text-blue-600" />
                ) : (
                  <span className="h-4 w-4 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {rate.currency.charAt(0)}
                  </span>
                )}
                <span>{rate.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{rate.rate}</span>
                {rate.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t text-xs text-right text-muted-foreground">
          آخر تحديث: 10 أغسطس 2024 09:30
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeRateWidget;
