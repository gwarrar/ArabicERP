import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Euro,
  TrendingUp,
  TrendingDown,
  X,
  ExternalLink,
} from "lucide-react";

const ExchangeRateFloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(true);

  // بيانات تجريبية لأسعار الصرف
  const exchangeRates = [
    { currency: "USD", symbol: "$", rate: 3.75, trend: "up" },
    { currency: "EUR", symbol: "€", rate: 4.12, trend: "down" },
  ];

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 left-4 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <DollarSign className="h-4 w-4 ml-2" />
        أسعار الصرف
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 shadow-lg z-50 w-64">
      <div className="absolute top-2 right-2 flex gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
          <a href="/accounting?tab=exchange">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <CardContent className="p-4 pt-8">
        <h3 className="text-sm font-medium mb-2">أسعار صرف العملات</h3>
        <div className="space-y-3">
          {exchangeRates.map((rate, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                {rate.currency === "USD" ? (
                  <DollarSign className="h-4 w-4 text-blue-600" />
                ) : (
                  <Euro className="h-4 w-4 text-blue-600" />
                )}
                <span>{rate.currency}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{rate.rate} ₴</span>
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
          آخر تحديث: 10 أغسطس 09:30
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeRateFloatingWidget;
