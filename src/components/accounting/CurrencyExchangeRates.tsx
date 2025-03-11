import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Edit,
  Save,
  DollarSign,
  Euro,
} from "lucide-react";

// بيانات تجريبية لأسعار الصرف
const initialRates = [
  {
    id: 1,
    currency: "USD",
    symbol: "$",
    buyRate: 3.75,
    sellRate: 3.77,
    previousBuyRate: 3.74,
    previousSellRate: 3.76,
    lastUpdated: "2024-08-10 09:30",
  },
  {
    id: 2,
    currency: "EUR",
    symbol: "€",
    buyRate: 4.12,
    sellRate: 4.15,
    previousBuyRate: 4.13,
    previousSellRate: 4.16,
    lastUpdated: "2024-08-10 09:30",
  },
  {
    id: 3,
    currency: "GBP",
    symbol: "£",
    buyRate: 4.8,
    sellRate: 4.85,
    previousBuyRate: 4.78,
    previousSellRate: 4.83,
    lastUpdated: "2024-08-10 09:30",
  },
  {
    id: 4,
    currency: "JPY",
    symbol: "¥",
    buyRate: 0.026,
    sellRate: 0.027,
    previousBuyRate: 0.025,
    previousSellRate: 0.026,
    lastUpdated: "2024-08-10 09:30",
  },
  {
    id: 5,
    currency: "CNY",
    symbol: "¥",
    buyRate: 0.52,
    sellRate: 0.53,
    previousBuyRate: 0.51,
    previousSellRate: 0.52,
    lastUpdated: "2024-08-10 09:30",
  },
];

const CurrencyExchangeRates = () => {
  const [rates, setRates] = useState(initialRates);
  const [editMode, setEditMode] = useState(false);
  const [editedRates, setEditedRates] = useState([...initialRates]);
  const localCurrency = "₴"; // أو رمز العملة المحلية الخاصة بك

  // معالجة تغيير سعر الصرف
  const handleRateChange = (id, field, value) => {
    const updatedRates = editedRates.map((rate) =>
      rate.id === id ? { ...rate, [field]: parseFloat(value) } : rate,
    );
    setEditedRates(updatedRates);
  };

  // حفظ أسعار الصرف المعدلة
  const saveRates = () => {
    setRates(editedRates);
    setEditMode(false);
    // هنا عادة ما تقوم بحفظ البيانات في الخادم الخلفي
  };

  // الحصول على مؤشر الاتجاه
  const getTrend = (current, previous) => {
    if (current > previous)
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous)
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">أسعار صرف العملات</h2>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                إلغاء
              </Button>
              <Button onClick={saveRates}>
                <Save className="ml-2 h-4 w-4" />
                حفظ
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">
                <RefreshCw className="ml-2 h-4 w-4" />
                تحديث
              </Button>
              <Button
                onClick={() => {
                  setEditedRates([...rates]);
                  setEditMode(true);
                }}
              >
                <Edit className="ml-2 h-4 w-4" />
                تعديل
              </Button>
            </>
          )}
        </div>
      </div>

      {/* بطاقات أسعار الصرف للوحة التحكم */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {rates.slice(0, 3).map((rate) => (
          <Card key={rate.id} className="overflow-hidden">
            <div
              className={`h-1 ${rate.buyRate >= rate.previousBuyRate ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {rate.currency === "USD" ? (
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  ) : rate.currency === "EUR" ? (
                    <Euro className="h-6 w-6 text-blue-600" />
                  ) : (
                    <span className="h-6 w-6 text-blue-600 flex items-center justify-center font-bold">
                      {rate.symbol}
                    </span>
                  )}
                  <div>
                    <h3 className="font-semibold">{rate.currency}</h3>
                    <p className="text-sm text-muted-foreground">
                      آخر تحديث: {rate.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-lg font-bold">{rate.buyRate}</span>
                    <span className="text-sm text-muted-foreground">
                      {localCurrency}
                    </span>
                    {getTrend(rate.buyRate, rate.previousBuyRate)}
                  </div>
                  <p className="text-sm text-muted-foreground">سعر الشراء</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* جدول أسعار الصرف التفصيلي */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            جدول أسعار الصرف التفصيلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead>العملة</TableHead>
                <TableHead>الرمز</TableHead>
                <TableHead className="text-center">سعر الشراء</TableHead>
                <TableHead className="text-center">سعر البيع</TableHead>
                <TableHead className="text-center">التغيير</TableHead>
                <TableHead>آخر تحديث</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(editMode ? editedRates : rates).map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.currency}</TableCell>
                  <TableCell>{rate.symbol}</TableCell>
                  <TableCell className="text-center">
                    {editMode ? (
                      <Input
                        type="number"
                        value={rate.buyRate}
                        onChange={(e) =>
                          handleRateChange(rate.id, "buyRate", e.target.value)
                        }
                        className="w-24 mx-auto"
                        step="0.01"
                      />
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        {rate.buyRate} {localCurrency}
                        {getTrend(rate.buyRate, rate.previousBuyRate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editMode ? (
                      <Input
                        type="number"
                        value={rate.sellRate}
                        onChange={(e) =>
                          handleRateChange(rate.id, "sellRate", e.target.value)
                        }
                        className="w-24 mx-auto"
                        step="0.01"
                      />
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        {rate.sellRate} {localCurrency}
                        {getTrend(rate.sellRate, rate.previousSellRate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        rate.buyRate > rate.previousBuyRate
                          ? "bg-green-100 text-green-800"
                          : rate.buyRate < rate.previousBuyRate
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {(
                        ((rate.buyRate - rate.previousBuyRate) /
                          rate.previousBuyRate) *
                        100
                      ).toFixed(2)}
                      %
                    </Badge>
                  </TableCell>
                  <TableCell>{rate.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* إعدادات أسعار الصرف */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            إعدادات أسعار الصرف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium">العملات الافتراضية</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>العملة المحلية</span>
                  <Badge>₴</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>العملات المعروضة في لوحة التحكم</span>
                  <div className="flex gap-1">
                    <Badge>USD</Badge>
                    <Badge>EUR</Badge>
                    <Badge>GBP</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium">تحديث الأسعار</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>تحديث تلقائي</span>
                  <Badge className="bg-green-100 text-green-800">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>تكرار التحديث</span>
                  <Badge>كل يوم</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>مصدر البيانات</span>
                  <Badge>API البنك المركزي</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyExchangeRates;
